"use client";
import Link from "next/link"
import Header from "../../components/nav";
import { Button } from "@/components/ui/button"
import { useSearchParams } from 'next/navigation';
import { toast } from "sonner";
import { useState, useEffect } from "react";

import { motion } from 'framer-motion'
import { Youtube, ArrowRight } from 'lucide-react'

export default function SignupYoutuber() {
  const params = useSearchParams();
  const handleYoutuberSignup = () => window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/google/auth/creator`;
  const [err, setErr] = useState("");

  
  useEffect(() => {
    if(!params || !params.get("error")) return;
    setErr(params.get("error").replaceAll("_"," "));
  }, [params]);

  useEffect(() => {
    if(err) toast.error(err);
  }, [err]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <>
    <Header />
    <motion.div
      className="min-h-screen flex items-center justify-center p-4 "
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="w-full max-w-lg space-y-8 rounded-xl shadow-2xl overflow-hidden p-8" variants={containerVariants}>
        <motion.div variants={contentVariants} initial="hidden" animate="visible">
          <motion.div className="flex items-center justify-center space-x-2 mb-6" variants={itemVariants}>
            <motion.div
              className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Youtube className="text-white" size={24} />
            </motion.div>
            <h2 className="text-3xl font-bold text-white">SponsorLab</h2>
          </motion.div>

          <motion.h3 className="text-2xl font-semibold text-white text-center mb-4" variants={itemVariants}>
            YouTuber Sign Up
          </motion.h3>

          <motion.p className="text-gray-300 text-center mb-6" variants={itemVariants}>
To sign up as a YouTuber, use the Google account linked to your YouTube channel. This helps us verify your channel and offer the best experience on SponsorLab.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Button
              onClick={handleYoutuberSignup}
              className="w-full bg-red-600 hover:bg-red-700 text-white transition-colors duration-300 flex items-center justify-center py-6 text-lg"
            >
              <Youtube className="mr-2" size={24} />
              Sign Up with YouTube
            </Button>
          </motion.div>

          <motion.p className="text-gray-400 text-center mt-6" variants={itemVariants}>
            By signing up, you agree to our{' '}
            <Link href="/terms-of-service" className="text-green-500 hover:text-green-400 transition-colors duration-300">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-green-500 hover:text-green-400 transition-colors duration-300">
              Privacy Policy
            </Link>
            .
          </motion.p>

          <motion.div className="mt-8 text-center" variants={itemVariants}>
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-green-500 hover:text-green-400 transition-colors duration-300">
                Log in
              </Link>
            </p>
          </motion.div>

          <motion.div className="mt-4 text-center" variants={itemVariants}>
            <p className="text-sm text-gray-400">
              Are you a sponsor?{' '}
              <Link href="/signup/sponsor" className="font-medium text-green-500 hover:text-green-400 transition-colors duration-300">
                Sign up as a Sponsor
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
    </>
  )
}
