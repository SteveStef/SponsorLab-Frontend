"use client";
import Link from "next/link";
import { motion } from 'framer-motion';
import { Youtube, Briefcase, LogIn, ChevronRight } from 'lucide-react';
import Header from "../components/nav";
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";

export default function Component() {
  const router = useRouter();

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-white p-4">
      <Header />
      <div>
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            Welcome to <span className="text-green-500">SponsorLab</span>
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Connect YouTubers with Sponsors
          </p>
        </motion.div>

        <div className="mt-8 space-y-6">
            <motion.div className="grid grid-cols-1 gap-4 sm:grid-cols-2" initial="hidden" animate="visible" variants={formVariants}>
              <Button
                onClick={() => {router.push("/signup/youtuber")}}
                className="bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center space-x-2 py-4"
              >
                <Youtube size={20} />
                <span>Sign Up as YouTuber</span>
                <ChevronRight size={16} className="ml-2" />
              </Button>
              <Button
                onClick={() => {router.push("signup/sponsor")}}
                className="bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center space-x-2 py-4"
              >
                <Briefcase size={20} />
                <span>Sign Up as Sponsor</span>
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={formVariants}>
              <Button
                onClick={() => {router.push("/login")}}
                className="w-full bg-transparent border border-green-500 text-green-500 hover:bg-green-500 hover:text-white flex items-center justify-center space-x-2 py-2 mt-4"
              >
                  <LogIn size={20} />
                  <span>Log In to Existing Account</span>
              </Button>
            </motion.div>
        </div>
      </div>
    </div>
    </div>
  )
}
