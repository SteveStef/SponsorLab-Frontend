
"use client";
import { ArrowRight, Mail, Lock, Eye, EyeOff, Youtube, Briefcase } from 'lucide-react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import request from "@/request";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppContext } from "@/context";
import { motion } from 'framer-motion'
import { useState, useEffect } from "react";

export default function Component() {
  const [email, setTheEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const searchParams = useSearchParams();

  const { setDescription, setEmail, setAccountType, setName, setDeactivated,
    setRole, setOrganization, setAuth, setProfilePic } = useAppContext();

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


  useEffect(() => {
    if(searchParams.get("error")) {
      const msg = (searchParams.get("error") || "").replaceAll("_", " ");
      setErrMsg(msg);
      toast.error(msg);
    }
  }, [searchParams]);

  async function login(e) {
    e.preventDefault();
    setLoading(true);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/sponsor/sign-in`;
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
      setRole("SPONSOR");
      setName(response.body.name);
      setEmail(email);
      setProfilePic(response.body.profileImage);
      setAccountType(response.body.accountType);
      setOrganization(response.body.company.id);
      setDescription(response.body.bio);
      setDeactivated(response.body.deactivated);
      router.push("/listings");
    }
    setLoading(false);
  }

  const googleLoginSponsor = () => window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/google/auth/sponsor`;
  const googleLoginYoutuber = () => window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/google/auth/creator`;

  return (
    <div>
    <motion.div
className="min-h-screen flex items-center justify-center text-white p-4 bg-gradient-to-br from-black to-green-950"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="w-full max-w-md space-y-8 rounded-xl shadow-2xl overflow-hidden " variants={containerVariants}>
        <motion.div className="px-8 pt-8 " variants={itemVariants}>
          <motion.div className="flex items-center justify-center space-x-2" variants={itemVariants}>
            <motion.div
              className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowRight className="text-white" size={24} />
            </motion.div>
            <h2 className="text-3xl font-bold text-white">SponsorLab</h2>
          </motion.div>
          {
            errMsg ? 
          <motion.p className="mt-2 text-center text-md text-red-400" variants={itemVariants}>
            {errMsg}
          </motion.p>
            :
          <motion.p className="mt-2 text-center text-sm text-gray-400" variants={itemVariants}>
            Log in to your account
          </motion.p>
          }

        </motion.div>
        
        <div className="px-8 py-6">
          <motion.form className="space-y-6" onSubmit={login} variants={formVariants} initial="hidden" animate="visible">
            <motion.div className="space-y-4" variants={formVariants}>
              <motion.div className="relative" variants={itemVariants}>
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setTheEmail(e.target.value)}
                  className="pl-10 mt-1 text-white focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                />
                <Mail className="absolute left-3 top-9 text-gray-400" size={18} />
              </motion.div>
              <motion.div className="relative" variants={itemVariants}>
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input 
                  id="password" 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 mt-1 text-white focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                />
                <Lock className="absolute left-3 top-9 text-gray-400" size={18} />
                <motion.button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-3 top-9 text-gray-400 hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </motion.button>
              </motion.div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors duration-300 flex items-center justify-center"
              >
                {loading ? 'Logging in...' : 'Log In'} <ArrowRight className="ml-2" size={18} />
              </Button>
            </motion.div>
          </motion.form>
          
          <motion.div className="mt-6" variants={itemVariants}>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">Or continue with Google</span>
              </div>
            </div>

            <motion.div className="mt-6 space-y-4" variants={formVariants}>
              <motion.div variants={itemVariants}>
                <Button 
                  onClick={googleLoginYoutuber}
                  className="w-full bg-red-600 hover:bg-red-700 text-white transition-colors duration-300 flex items-center justify-center"
                >
                  <Youtube className="mr-2" size={18} />
                  Log in as YouTuber
                </Button>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button 
                  onClick={googleLoginSponsor}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300 flex items-center justify-center"
                >
                  <Briefcase className="mr-2" size={18} />
                  Log in as Sponsor
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div className="mt-6 text-center" variants={itemVariants}>
            <p className="text-sm text-gray-400">
              Don&rsquo;t have an account?{' '}
              <Link href="/signup" className="font-medium text-green-500 hover:text-green-400 transition-colors duration-300">
                Sign up
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
    </div>
  )
}
