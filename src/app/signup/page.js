"use client";
import { motion } from 'framer-motion';
import { Youtube, Briefcase, LogIn, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";

export default function Component() {
  const router = useRouter();
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
<div className="min-h-screen flex items-center justify-center text-white p-4 bg-gradient-to-br from-black to-green-950">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold mb-4">
            Welcome to <span className="text-green-500">SponsorLab</span>
          </h1>
          <p className="text-xl text-gray-400">
            Connect YouTubers with Sponsors and Revolutionize Content Partnerships
          </p>
        </motion.div>

        <div className="space-y-12">
          <motion.div 
            className="grid grid-cols-1 gap-6 sm:grid-cols-2" 
            initial="hidden" 
            animate="visible" 
            variants={formVariants}
          >
            <motion.div variants={itemVariants}>
              <Button
                onClick={() => {router.push("/signup/youtuber")}}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center space-x-3 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <Youtube size={24} />
                <span>Sign Up as YouTuber</span>
                <ChevronRight size={20} className="ml-2" />
              </Button>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button
                onClick={() => {router.push("/signup/sponsor")}}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center space-x-3 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <Briefcase size={24} />
                <span>Sign Up as Sponsor</span>
                <ChevronRight size={20} className="ml-2" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={formVariants}>
            <Button
              onClick={() => {router.push("/login")}}
              className="w-full bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white flex items-center justify-center space-x-3 py-4 text-lg rounded-lg transition-all duration-300"
            >
              <LogIn size={24} />
              <span>Log In to Existing Account</span>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 text-center text-gray-400"
        >
          <p>Discover the power of targeted collaborations and grow your brand with SponsorLab</p>
        </motion.div>
      </div>
    </div>
  )
}
