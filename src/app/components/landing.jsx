
"use client";
import BG from "../../../public/SponsorLab-Background.png";
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Play, Upload, Users, BarChart, Search, Zap, Star, Shield, DollarSign, TrendingUp } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

const FeatureCard = ({ icon, title, description, items }) => (
  <div className="bg-green-900/20 p-6 rounded-lg">
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold ml-2">{title}</h3>
    </div>
    <p className="text-gray-300 mb-4">{description}</p>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-center">
          {item.icon}
          <span className="ml-2">{item.text}</span>
        </li>
      ))}
    </ul>
  </div>
)

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-950 via-background to-background text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-5 mix-blend-soft-light"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-green-900/20 via-green-950/10 to-transparent"></div>
      <div className="relative">
        <main>
          <motion.section
            className="container mx-auto px-4 py-20 text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 className="text-5xl font-bold mb-6" variants={itemVariants}>
              Connect Creators with Sponsors
            </motion.h1>
            <motion.p className="text-xl mb-8 text-gray-300" variants={itemVariants}>
              SponsorLab: Where Content Meets Opportunity
            </motion.p>
            <motion.div className="flex justify-center space-x-4" variants={itemVariants}>
              <Link href="/signup">
              <Button className="bg-green-500 hover:bg-green-600 text-gray-900">Get Started</Button>
              </Link>
            </motion.div>
          </motion.section>

          <div className="border-t border-green-800 opacity-30"></div>

          <motion.section
            className="container mx-auto px-4 py-20"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold mb-6">Revolutionize Your Content Partnerships</h2>
                <p className="text-xl mb-8 text-gray-300">
                  SponsorLab provides a unique platform where creators and sponsors can connect, collaborate, and grow together. Our innovative approach streamlines the sponsorship process, making it easier than ever to create meaningful partnerships.
                </p>
              </motion.div>
              <motion.div variants={itemVariants} className="relative h-[400px] rounded-lg overflow-hidden">

            <iframe
            src="https://www.youtube.com/embed/So4xsqEIhsM"
            className="w-full h-full object-cover rounded-lg"
          >
            Your browser does not support the video tag.
          </iframe>

              </motion.div>
            </div>
          </motion.section>

          <div className="border-t border-green-800 opacity-30"></div>

          <motion.section
            className="container mx-auto px-4 py-20"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h2 className="text-3xl font-bold mb-12 text-center" variants={itemVariants}>
              How It Works
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FeatureCard
                icon={<Play className="w-8 h-8 text-green-400" />}
                title="List Your Content"
                description="Creators showcase upcoming videos with title previews and projected views."
                items={[
                  { icon: <Upload className="w-4 h-4" />, text: "Upload video details" },
                  { icon: <Users className="w-4 h-4" />, text: "Set target audience" },
                  { icon: <BarChart className="w-4 h-4" />, text: "Estimate view count" }
                ]}
              />
              <FeatureCard
                icon={<Search className="w-8 h-8 text-green-400" />}
                title="Browse Opportunities"
                description="Sponsors explore a marketplace of upcoming content from various creators."
                items={[
                  { icon: <Zap className="w-4 h-4" />, text: "Filter by niche" },
                  { icon: <Star className="w-4 h-4" />, text: "Sort by popularity" },
                  { icon: <Shield className="w-4 h-4" />, text: "Verify creator credentials" }
                ]}
              />
              <FeatureCard
                icon={<DollarSign className="w-8 h-8 text-green-400" />}
                title="Secure Sponsorships"
                description="Sponsors purchase sponsorship slots in an ecommerce-style format."
                items={[
                  { icon: <TrendingUp className="w-4 h-4" />, text: "Send competitive requests" },
                  { icon: <Zap className="w-4 h-4" />, text: "Buy Now options available" },
                  { icon: <Shield className="w-4 h-4" />, text: "Secure payment processing" }
                ]}
              />
              <FeatureCard
                icon={<TrendingUp className="w-8 h-8 text-green-400" />}
                title="Grow Together"
                description="Creators and sponsors benefit from targeted, efficient partnerships."
                items={[
                  { icon: <BarChart className="w-4 h-4" />, text: "Track campaign performance" },
                  { icon: <Users className="w-4 h-4" />, text: "Expand audience reach" },
                  { icon: <Star className="w-4 h-4" />, text: "Build long-term relationships" }
                ]}
              />
            </div>
          </motion.section>

          <div className="border-t border-green-800 opacity-30"></div>

          <motion.section
            className="container mx-auto px-4 py-20 text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h2 className="text-3xl font-bold mb-6" variants={itemVariants}>
              Ready to Get Started?
            </motion.h2>
            <motion.p className="text-xl mb-8 text-gray-300" variants={itemVariants}>
              Join SponsorLab today and revolutionize your content partnerships.
            </motion.p>
            <motion.div className="max-w-md mx-auto" variants={itemVariants}>
              <form className="flex space-x-4 justify-center">
                <Link href="/signup">
                  <Button type="submit" className="bg-green-500 hover:bg-green-600 text-gray-900">
                    Sign Up
                  </Button>
                </Link>
              </form>
            </motion.div>
          </motion.section>
        </main>

        <div className="border-t border-green-800 opacity-30"></div>

        <footer className="container mx-auto px-4 py-6 text-center text-gray-400">
          <Link href="/terms-of-service" className="underline mr-5 font-bold">Terms of Service</Link>
          <Link href="/privacy" className="underline mr-5 font-bold">Privacy Policy</Link>
        </footer>
      </div>
    </div>
  )
}
