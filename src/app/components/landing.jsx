'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight, DollarSign, Search, Zap } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState, useEffect } from "react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile
}

function AnimatedBackground() {
  const lines = Array.from({ length: 10 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute bg-green-500 opacity-20"
      initial={{
        left: `${Math.random() * 100}%`,
        top: "-5%",
        width: `${Math.random() * 2 + 1}px`,
        height: "0%",
      }}
      animate={{
        top: "105%",
        height: "110%",
        transition: {
          duration: Math.random() * 2 + 3,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        },
      }}
    />
  ))

  const glowingDots = Array.from({ length: 20 }, (_, i) => (
    <motion.div
      key={`dot-${i}`}
      className="absolute rounded-full bg-green-400"
      initial={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: "2px",
        height: "2px",
      }}
      animate={{
        opacity: [0.2, 1, 0.2],
        scale: [1, 1.5, 1],
        transition: {
          duration: Math.random() * 2 + 1,
          repeat: Infinity,
          repeatType: "reverse",
        },
      }}
    />
  ))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lines}
      {glowingDots}
    </div>
  )
}

function ConnectAnimation() {
  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1,
      transition: { 
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 0.5
      }
    }
  }

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut",
        delay: 1
      }
    }
  }

  return (
    <svg width="200" height="200" viewBox="0 0 200 200" className="w-full h-full">
      {/* Circles */}
      <motion.circle cx="50" cy="40" r="20" fill="#10B981" variants={circleVariants} initial="hidden" animate="visible" />
      <motion.circle cx="20" cy="160" r="20" fill="#10B981" variants={circleVariants} initial="hidden" animate="visible" />
      <motion.circle cx="170" cy="160" r="20" fill="#10B981" variants={circleVariants} initial="hidden" animate="visible" />
      
      {/* Labels outside each node */}
      <text x="50" y="15" textAnchor="middle" fill="#FFF" fontSize="12px">SponsorLab</text>
      <text x="20" y="195" textAnchor="middle" fill="#FFF" fontSize="12px">Sponsors</text>
      <text x="170" y="195" textAnchor="middle" fill="#FFF" fontSize="12px">Youtubers</text>

      {/* Curved Paths connecting all circles */}
      <motion.path
        d="M 50 40 Q 35 100 20 160"  // Curved path from first circle to second
        stroke="#10B981"
        strokeWidth="4"
        fill="none"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
      />
      <motion.path
        d="M 50 40 Q 110 50 170 160"  // Curved path from first circle to third
        stroke="#10B981"
        strokeWidth="4"
        fill="none"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
      />
      <motion.path
        d="M 20 160 Q 95 200 170 160"  // Curved path from second circle to third
        stroke="#10B981"
        strokeWidth="4"
        fill="none"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
      />
    </svg>
  )
}

export default function LandingPage() {
  const isMobile = useIsMobile()

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
        className="container mx-auto px-6 py-1 pb-16 relative overflow-hidden"
      >
        <AnimatedBackground />
        <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
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
            className="relative h-[400px] w-full"
          >
            <ConnectAnimation />
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
          <h2 className="text-3xl font-bold mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
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
          </div>
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
    <div className="bg-green-900 bg-opacity-10 p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-2">{question}</h3>
      <p className="text-gray-400">{answer}</p>
    </div>
  )
}
