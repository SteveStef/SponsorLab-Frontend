"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign, Search, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-black via-black to-green-950 text-gray-100">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-6 py-4 flex justify-between items-center"
      >
        <div className="text-2xl font-bold text-green-400">SponsorLab</div>
        <div className="space-x-4">

                <Link href="/login">
          <Button variant="ghost" className="text-gray-300 hover:text-white">
            Login
          </Button>

                </Link>
                <Link href="/signup">
    <Button className="bg-green-500 hover:bg-green-600 text-white">Sign Up</Button>
                </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 py-1 pb-16"
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <motion.h1 variants={itemVariants} className="text-5xl font-bold">
              Connect Creators with Brands
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-gray-400">
              SponsorLab is the innovative platform streamlining sponsorships for content creators and brands.
            </motion.p>
            <motion.div variants={itemVariants}>

                <Link href="/signup">
              <Button className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-6">
                Get Started <ArrowRight className="ml-2" />
              </Button>
                </Link>
            </motion.div>
          </div>
          <motion.div
            variants={itemVariants}
            className="relative h-[600px] w-full"
          >
            <NetworkAnimation />
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="bg-black bg-opacity-50 py-16">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-12 text-center"
          >
            Why Choose SponsorLab?
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            <FeatureCard
              icon={<Search className="w-12 h-12 text-green-400" />}
              title="Open Marketplace"
              description="Browse and select content that aligns perfectly with your brand's goals."
            />
            <FeatureCard
              icon={<Zap className="w-12 h-12 text-green-400" />}
              title="Streamlined Process"
              description="Cut out inefficiencies and long negotiations with our automated matching."
            />
            <FeatureCard
              icon={<DollarSign className="w-12 h-12 text-green-400" />}
              title="Cost-Effective"
              description="Direct partnerships mean fewer fees and more value for both parties."
            />
          </motion.div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="bg-black bg-opacity-30 py-16">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-12 text-center"
          >
            See SponsorLab in Action
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="aspect-video w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-2xl"
          >
            <div className="relative w-full h-full bg-gray-800 flex items-center justify-center">
            <iframe
            src="https://www.youtube.com/embed/So4xsqEIhsM"
            className="w-full h-full object-cover rounded-lg"
          >
            Your browser does not support the video tag.
          </iframe>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-black bg-opacity-50 py-16">
        <div className="container mx-auto px-6">
          <h2
            className="text-3xl font-bold mb-12 text-center"
          >
            Frequently Asked Questions
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <FAQItem
              question="How does SponsorLab work?"
              answer="SponsorLab is an open marketplace where content creators list their upcoming content, and brands can browse and select the videos or content that align with their marketing goals. Our platform uses automated matching algorithms to connect the right creators with the right brands."
            />
            <FAQItem
              question="Is SponsorLab only for YouTube creators?"
              answer="While we primarily focus on YouTube creators, SponsorLab is designed to support content creators across various platforms. If you create content on other platforms, you're welcome to join and explore sponsorship opportunities."
            />
            <FAQItem
              question="How does SponsorLab ensure fair deals for both creators and brands?"
              answer="SponsorLab provides a transparent marketplace where both creators and brands can see the terms of the deal upfront. We also offer guidelines and tools to help both parties negotiate fair terms, ensuring a win-win situation for everyone involved."
            />
            <FAQItem
              question="What fees does SponsorLab charge?"
              answer="SponsorLab charges a small percentage fee on successful sponsorship deals. Our fee structure is transparent and competitive, ensuring that both creators and brands get maximum value from our platform. For detailed pricing, please check our pricing page."
            />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-6 py-16 text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Revolutionize Your Sponsorships?</h2>
        <p className="text-xl mb-8 text-gray-400">
          Join SponsorLab today and experience the future of content creator partnerships.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/signup/youtuber">
          <Button className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-6">
            I am a Creator
          </Button>
          </Link>
          <Link href="/signup/sponsor">
          <Button className="bg-gray-700 hover:bg-gray-600 text-white text-lg px-8 py-6">
            I am a Brand
          </Button>
          </Link>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-black bg-opacity-50 py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center space-x-4">
            <Link href="/terms-of-service" className="text-gray-400 hover:text-green-400">Terms of Service</Link>
            <Link href="/privacy" className="text-gray-400 hover:text-green-400">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className="bg-green-900 bg-opacity-20 p-6 rounded-lg flex flex-col items-center text-center"
    >
      {icon}
      <h3 className="text-xl font-semibold mt-4 mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  )
}

function FAQItem({ question, answer }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className="bg-green-900 bg-opacity-10 p-6 rounded-lg"
    >
      <h3 className="text-xl font-semibold mb-2">{question}</h3>
      <p className="text-gray-400">{answer}</p>
    </motion.div>
  )
}

function NetworkAnimation() {
  return (
    <svg
      viewBox="0 0 800 600"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
      </defs>
      
      {/* Central SponsorLab node */}
      <circle cx="400" cy="300" r="60" fill="url(#nodeGradient)" stroke="#fff" strokeWidth="3">
        <animate attributeName="r" values="60;65;60" dur="3s" repeatCount="indefinite" />
      </circle>
      <text x="400" y="305" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">SponsorLab</text>

      {/* Creator nodes */}
      <g>
        <circle cx="150" cy="150" r="40" fill="#4ade80" stroke="#fff" strokeWidth="3" />
        <text x="150" y="155" textAnchor="middle" fill="white" fontSize="14">Creator 1</text>
        <motion.path
          d="M190 170 Q295 235 360 290"
          fill="none"
          stroke="#4ade80"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
      </g>
      <g>
        <circle cx="200" cy="500" r="40" fill="#4ade80" stroke="#fff" strokeWidth="3" />
        <text x="200" y="505" textAnchor="middle" fill="white" fontSize="14">Creator 2</text>
        <motion.path
          d="M240 480 Q320 390 370 340"
          fill="none"
          stroke="#4ade80"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
        />
      </g>
      <g>
        <circle cx="100" cy="350" r="40" fill="#4ade80" stroke="#fff" strokeWidth="3" />
        <text x="100" y="355" textAnchor="middle" fill="white" fontSize="14">Creator 3</text>
        <motion.path
          d="M140 350 Q270 325 340 310"
          fill="none"
          stroke="#4ade80"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 1 }}
        />
      </g>

      {/* Brand nodes */}
      <g>
        <circle cx="650" cy="150" r="40" fill="#22c55e" stroke="#fff" strokeWidth="3" />
        <text x="650" y="155" textAnchor="middle" fill="white" fontSize="14">Brand 1</text>
        <motion.path
          d="M610 170 Q505 235 440 290"
          fill="none"
          stroke="#22c55e"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.7 }}
        />
      </g>
      <g>
        <circle cx="600" cy="500" r="40" fill="#22c55e" stroke="#fff" strokeWidth="3" />
        <text x="600" y="505" textAnchor="middle" fill="white" fontSize="14">Brand 2</text>
        <motion.path
          d="M560 480 Q480 390 430 340"
          fill="none"
          
          stroke="#22c55e"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 1.2 }}
        />
      </g>
      <g>
        <circle cx="700" cy="350" r="40" fill="#22c55e" stroke="#fff" strokeWidth="3" />
        <text x="700" y="355" textAnchor="middle" fill="white" fontSize="14">Brand 3</text>
        <motion.path
          d="M660 350 Q530 325 460 310"
          fill="none"
          stroke="#22c55e"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 1.7 }}
        />
      </g>
    </svg>
  )
}

/*
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
*/
