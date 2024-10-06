"use client";
import { ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import request from "@/request";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context";
import { motion } from 'framer-motion';
import { useState } from "react";


export default function Component() {
  const [email, setTheEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [step, setStep] = useState(1);

  const { setEmail, setName, setRole, setAuth, } = useAppContext();

  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const formVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  async function login() {
    setLoading(true);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/admin/sign-in`;
    const body = {
      email: email,
      password: password
    };

    if(!body.email || !body.password) {
      toast.error("Please enter a valid email and password");
      setLoading(false);
      return;
    }

    const response = await request(url, "POST", body);
    if(!response || response.status === 500) toast.error("Internal server error, please try again later");
    else if(!response.success) {
      toast.error(response.message);
    } else if(response && response.success) {
      document.cookie = `token=${response.token}; SameSite=None; Secure; Path=/`;
      setAuth(true);
      setRole("ADMIN");
      setName(response.body.name);
      setEmail(email);
      router.push("/admin/data");
    }
    setLoading(false);
  }

  async function sendSESCode() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/create-admin-sescode`;
    const body = { email };
    const response = await request(url, "POST", body);
    if(!response || !response.success) {
      toast.error("You are not an admin, that email is now under suspicion");
      setLoading(false);
      return;
    }
    if(response.success) {
      setStep(2);
      toast.success(response.message);
    } else {
      toast.error("Failed to sign-in try again later");
    }
  }

  async function verifyCode() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/check-sescode`;
    const body = { email, code: twoFactorCode };
    const response = await request(url, "POST", body);
    if(!response || !response.success) {
      toast.error("Incorrect Code");
      setLoading(false);
      return;
    }
    if(response.success) {
      setStep(3);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (step === 1) {
      await sendSESCode();
    } else if (step === 2) {
      await verifyCode();
    } else if(step === 3) {
      await login();
    }

    setLoading(false);
  }

  return (
<div className="min-h-screen flex items-center justify-center text-white p-4 bg-gradient-to-br from-black to-green-950">
      <motion.div
        className="w-full max-w-xl space-y-8 rounded-xl shadow-2xl overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="px-8 pt-8 pb-4" variants={itemVariants}>
          <motion.div className="flex items-center justify-center space-x-2" variants={itemVariants}>
            <motion.div
              className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowRight className="text-white" size={32} />
            </motion.div>
            <h2 className="text-4xl font-bold text-white">Admin Portal</h2>
          </motion.div>
          <motion.p className="mt-4 text-center text-lg text-gray-400" variants={itemVariants}>
            Login as a root user with enhanced security.
          </motion.p>
        </motion.div>
        
        <div className="px-8 py-8">
          <motion.form className="space-y-6" onSubmit={handleSubmit} variants={formVariants} initial="hidden" animate="visible">
            {step === 1 && (
              <motion.div className="space-y-6" variants={formVariants}>
                <motion.div className="relative" variants={itemVariants}>
                  <Label htmlFor="email" className="text-white text-lg">SponsorLab Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setTheEmail(e.target.value)}
                    className="pl-12 mt-2 text-white text-lg h-14 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                  />
                  <Mail className="absolute left-4 top-12 text-gray-400" size={24} />
                </motion.div>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div className="space-y-6" variants={formVariants}>
                <motion.div className="relative" variants={itemVariants}>
                  <Label htmlFor="verificationCode" className="text-white text-lg">Verification Code</Label>
                  <Input
                    id="verificationCode"
                    name="verificationCode"
                    type="text"
                    required
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value)}
                    className="pl-12 mt-2 text-white text-lg h-14 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                    placeholder="Enter the code sent to your email"
                  />
                  <Lock className="absolute left-4 top-12 text-gray-400" size={24} />
                </motion.div>
              </motion.div>
            )}
            {step === 3 && (
              <motion.div className="space-y-6" variants={formVariants}>
                <motion.div className="relative" variants={itemVariants}>
                  <Label htmlFor="password" className="text-white text-lg">Password</Label>
                  <Input 
                    id="password" 
                    name="password" 
                    type={showPassword ? "text" : "password"} 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-12 mt-2 text-white text-lg h-14 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                  />
                  <Lock className="absolute left-4 top-12 text-gray-400" size={24} />
                  <motion.button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-4 top-12 text-gray-400 hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white text-lg h-14 transition-colors duration-300 flex items-center justify-center"
              >
                {loading ? 'Processing...' : step === 3 ? 'Log In' : 'Next'} <ArrowRight className="ml-2" size={24} />
              </Button>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  )
}
