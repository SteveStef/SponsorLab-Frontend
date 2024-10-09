'use client';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react";
import { toast } from "sonner";
import request from "@/request";
import { useRouter } from 'next/navigation';
import { useAppContext } from "@/context";
import { useSearchParams } from 'next/navigation';
import { UserPlus, Mail, Lock, Eye, EyeOff, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function EnhancedSignUpForm() {
  const { setCompany, setOrganization, setAuth, setName, setEmail, setRole, setAccountType } = useAppContext();

  const [showVerification, setShowVerification] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setTName] = useState('');
  const [email, setCompanyEmail] = useState("");

  const params = useSearchParams();
  const [err, setErr] = useState("");

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(!params || !params.get("error")) return;
    setErr(params.get("error").replaceAll("_"," "));
  }, [params]);

  useEffect(() => {
    if(err) toast.error(err);
  }, [err]);

  function validateInputs() {
    let isValid = true;
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid Email");
      isValid = false;
    }
    if (password.length < 8) {
      toast.error("Password must be 8 character long");
      isValid = false;
    }
    if (!password.trim()) {
      toast.error("Invalid Password");
      isValid = false;
    }
    if (password !== confirmPassword) {
      toast.error("passwords do not match");
      isValid = false;
    }

    if (!name.trim()) {
      toast.error("name is required");
      isValid = false;
    }

    setLoading(false);
    return isValid;
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    if(!validateInputs()) return;
    setLoading(true);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/create-sescode`;
    const body = { email };
    const response = await request(url, "POST", body);
    if(!response || !response.success) {
      toast.error("There was a problem sending the verification code, try again later");
      setLoading(false);
      return;
    }

    if(response.success) {
      toast.success("The verificaion code was send to " + email);
      setShowVerification(true);
      setLoading(false);
    }
  }

  const handleVerification = async (e) => {
    setLoading(true);
    e.preventDefault()

    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/check-sescode`;
    const body = { email, code: verificationCode};
    const response = await request(url, "POST", body);

    if(!response || !response.success) {
      toast.error(response.message);
      setLoading(false);
      return;
    }

    if(response.success) {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/sponsor/sign-up`;
      const body = { email, password, name, role:"SPONSOR", accountType: "EMAIL"};
      const response = await request(url, "POST", body);

      if(!response || response.status === 500) toast.error("Internal server error, please try again later");
      if(!response.success) {
        toast.error(response.message);
      } else if(response && response.success) {
        console.log(response);
        document.cookie = `token=${response.token}; SameSite=None; Secure; Path=/`;
        setAuth(true);
        setRole(response.body.role);
        setName(response.body.name);
        setEmail(response.body.email);
        setAccountType(response.body.accountType);
        setCompany(response.body.company);
        setOrganization(response.body.company.id);
        router.push("/organizations/"+response.body.company.id);
      }
    }
    setLoading(false);
  }

  const handleGoogleSignUp = () => window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/google/auth/sponsor`;

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

  return (
    <>
<motion.div
className="min-h-screen flex items-center justify-center text-white p-4 bg-gradient-to-br from-black to-green-950"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="w-full max-w-lg space-y-8 rounded-xl shadow-2xl overflow-hidden " variants={containerVariants}>
        <motion.div className="px-8 pt-8 pb-4" variants={itemVariants}>
          <motion.div className="flex items-center justify-center space-x-2" variants={itemVariants}>
            <motion.div
              className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <UserPlus className="text-white" size={24} />
            </motion.div>
            <h2 className="text-3xl font-bold text-white">SponsorLab</h2>
          </motion.div>
          <motion.p className="mt-2 text-center text-sm text-gray-400" variants={itemVariants}>
            Connect with YouTubers
          </motion.p>
        </motion.div>
        
        <div className="px-8 py-6">
          {!showVerification ? (
            <motion.form className="space-y-6" onSubmit={handleSignUp} variants={formVariants} initial="hidden" animate="visible">
              <motion.div className="space-y-4" variants={formVariants}>
                <motion.div className="relative" variants={itemVariants}>
                  <Label htmlFor="name" className="text-white">Name</Label>
                  <Input onChange={(e) => setTName(e.target.value)} id="name" name="name" type="text" required className="pl-10 mt-1 text-white focus:border-green-500 focus:ring-green-500 transition-all duration-300" />
                  <UserPlus className="absolute left-3 top-9 text-gray-400" size={18} />
                </motion.div>
                <motion.div className="relative" variants={itemVariants}>
                  <Label htmlFor="email" className="text-white">Company Email</Label>
                  <Input onChange={(e) => setCompanyEmail(e.target.value)} id="email" name="email" type="email" required className="pl-10 mt-1 text-white focus:border-green-500 focus:ring-green-500 transition-all duration-300" />
                  <Mail className="absolute left-3 top-9 text-gray-400" size={18} />
                </motion.div>
                <motion.div className="relative" variants={itemVariants}>
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <Input 
                    id="password" 
                    name="password" 
                    type={showPassword ? "text" : "password"} 
                    required 
                    className="pl-10 pr-10 mt-1 text-white focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                <motion.div className="relative" variants={itemVariants}>
                  <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    type="password" 
                    required 
                    className="pl-10 mt-1 text-white focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Lock className="absolute left-3 top-9 text-gray-400" size={18} />
                  {password && confirmPassword && (
                    password === confirmPassword ? 
                      <CheckCircle className="absolute right-3 top-9 text-green-500" size={18} /> : 
                      <AlertCircle className="absolute right-3 top-9 text-red-500" size={18} />
                  )}
                </motion.div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button disabled={loading} type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors duration-300 flex items-center justify-center">
                  Sign Up <ArrowRight className="ml-2" size={18} />
                </Button>
              </motion.div>
            </motion.form>
          ) : (
            <motion.form className="space-y-6" onSubmit={handleVerification} variants={formVariants} initial="hidden" animate="visible">
              <motion.div className="relative" variants={itemVariants}>
                <Label htmlFor="verificationCode" className="text-white">Verification code sent to {email}</Label>
                <Input 
                  id="verificationCode" 
                  name="verificationCode" 
                  type="text" 
                  required 
                  className="pl-10 mt-1 text-white border-gray-600 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <CheckCircle className="absolute left-3 top-9 text-gray-400" size={18} />
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors duration-300 flex items-center justify-center"
                  disabled={!verificationCode || loading}
                >
                  Verify and Sign Up <ArrowRight className="ml-2" size={18} />
                </Button>
              </motion.div>
            </motion.form>
          )}
          
          <motion.div className="mt-6" variants={itemVariants}>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
              </div>
            </div>

            <motion.div className="mt-6" variants={itemVariants}>
              <Button 
                onClick={handleGoogleSignUp}
                className="w-full bg-white hover:bg-gray-200 text-gray-900 transition-colors duration-300 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                  />
                  <path
                    fill="#34A853"
                    d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                  />
                  <path
                    fill="#4A90E2"
                    d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5818182 23.1818182,9.90909091 L12,9.90909091 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                  />
                </svg>
                Continue with Google
              </Button>
            </motion.div>
          </motion.div>

          <motion.div className="mt-6 text-center" variants={itemVariants}>
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-green-500 hover:text-green-400 transition-colors duration-300">
                Login
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
    </>
  )
}


