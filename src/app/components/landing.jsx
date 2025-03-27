"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, DollarSign, Home, Lightbulb, Search, Shield, Users, Zap } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Header from "../components/nav"
import { useAppContext } from "@/context"
import VideoSection from "./sub-component/video-section.jsx";

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
          repeat: Number.POSITIVE_INFINITY,
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
          repeat: Number.POSITIVE_INFINITY,
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
  // State for screen size detection
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    mounted: false,
  })

  // Effect for handling responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        isMobile: window.innerWidth < 640,
        isTablet: window.innerWidth >= 640 && window.innerWidth < 1024,
        mounted: true,
      })
    }

    // Set initial size
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Animation variants
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0.3 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        repeatDelay: 0.5,
      },
    },
  }

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.5,
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 1.2,
      },
    },
  }

  const particleVariants = {
    hidden: { pathOffset: 0, opacity: 0 },
    visible: {
      pathOffset: 1,
      opacity: [0, 1, 0],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 0.2,
      },
    },
  }

  const pulseVariants = {
    hidden: { scale: 1, opacity: 0.7 },
    visible: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 0.9, 0.7],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    },
  }

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 1.5,
      },
    },
  }

  // Responsive configurations
  const defaultConfig = {
    viewBox: "0 0 240 200",
    sponsorLab: { x: 120, y: 80, textY: 50, fontSize: 14 },
    sponsors: { x: 40, y: 140, textY: 170, fontSize: 14 },
    youtubers: { x: 200, y: 140, textY: 170, fontSize: 14 },
    paths: {
      path1: "M 40 140 Q 80 110 120 80",
      path2: "M 120 80 Q 160 110 200 140",
      path3: "M 40 140 Q 120 180 200 140",
    },
    nodeRadius: 18,
    iconScale: 0.9,
  }

  const tabletConfig = {
    viewBox: "0 0 240 220",
    sponsorLab: { x: 120, y: 80, textY: 50, fontSize: 13 },
    sponsors: { x: 40, y: 150, textY: 180, fontSize: 13 },
    youtubers: { x: 200, y: 150, textY: 180, fontSize: 13 },
    paths: {
      path1: "M 40 150 Q 80 115 120 80",
      path2: "M 120 80 Q 160 115 200 150",
      path3: "M 40 150 Q 120 190 200 150",
    },
    nodeRadius: 16,
    iconScale: 0.8,
  }

  const mobileConfig = {
    viewBox: "0 0 240 240",
    sponsorLab: { x: 120, y: 80, textY: 50, fontSize: 12 },
    sponsors: { x: 40, y: 160, textY: 190, fontSize: 12 },
    youtubers: { x: 200, y: 160, textY: 190, fontSize: 12 },
    paths: {
      path1: "M 40 160 Q 80 120 120 80",
      path2: "M 120 80 Q 160 120 200 160",
      path3: "M 40 160 Q 120 200 200 160",
    },
    nodeRadius: 14,
    iconScale: 0.7,
  }

  // Select the appropriate config based on screen size
  let config = defaultConfig
  if (screenSize.mounted) {
    if (screenSize.isMobile) {
      config = mobileConfig
    } else if (screenSize.isTablet) {
      config = tabletConfig
    }
  }

  // If not mounted yet, return a placeholder to prevent layout shift
  if (!screenSize.mounted) {
    return <div className="w-full h-full" />
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        width="100%"
        height="100%"
        viewBox={config.viewBox}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background glow effect */}
        <defs>
          <radialGradient id="sponsorGlow" cx="50%" cy="40%" r="50%" fx="50%" fy="40%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </radialGradient>

          {/* Gradients for nodes */}
          <linearGradient id="sponsorLabGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          <linearGradient id="sponsorsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          <linearGradient id="youtubersGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#B91C1C" />
          </linearGradient>

          <linearGradient id="pathGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>

          <linearGradient id="pathGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>

          <linearGradient id="pathGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#6B7280" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Background glow */}
        <circle
          cx={Number.parseInt(config.viewBox.split(" ")[2]) / 2}
          cy={Number.parseInt(config.viewBox.split(" ")[3]) / 2}
          r={Number.parseInt(config.viewBox.split(" ")[2]) * 0.35}
          fill="url(#sponsorGlow)"
        />

        {/* Paths connecting all nodes with enhanced styling */}
        <motion.path
          d={config.paths.path1}
          stroke="url(#pathGradient1)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow)"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />

        <motion.path
          d={config.paths.path2}
          stroke="url(#pathGradient2)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow)"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />

        <motion.path
          d={config.paths.path3}
          stroke="url(#pathGradient3)"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          fill="none"
          opacity="0.6"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 0.6,
              transition: {
                duration: 1.5,
                delay: 2,
              },
            },
          }}
          initial="hidden"
          animate="visible"
        />

        {/* Animated particles along the paths */}
        <motion.circle r="2" fill="#34D399" variants={particleVariants} initial="hidden" animate="visible">
          <motion.animateMotion path={config.paths.path1} dur="3s" repeatCount="indefinite" />
        </motion.circle>

        <motion.circle r="2" fill="#34D399" variants={particleVariants} initial="hidden" animate="visible">
          <motion.animateMotion path={config.paths.path2} dur="3.5s" repeatCount="indefinite" />
        </motion.circle>

        <motion.circle r="2" fill="#9CA3AF" variants={particleVariants} initial="hidden" animate="visible">
          <motion.animateMotion path={config.paths.path3} dur="4s" repeatCount="indefinite" />
        </motion.circle>

        {/* Sponsors Node - Black Square with Rounded Corners */}
        <motion.rect
          x={config.sponsors.x - config.nodeRadius}
          y={config.sponsors.y - config.nodeRadius}
          width={config.nodeRadius * 2}
          height={config.nodeRadius * 2}
          rx="4"
          ry="4"
          fill="url(#sponsorsGradient)"
          filter="url(#dropShadow)"
          variants={nodeVariants}
          initial="hidden"
          animate="visible"
        />

        {/* Youtubers Node - Red Triangle */}
        <motion.polygon
          points={`${config.youtubers.x},${config.youtubers.y - config.nodeRadius} ${config.youtubers.x + config.nodeRadius * 0.866},${config.youtubers.y + config.nodeRadius / 2} ${config.youtubers.x - config.nodeRadius * 0.866},${config.youtubers.y + config.nodeRadius / 2}`}
          fill="url(#youtubersGradient)"
          filter="url(#dropShadow)"
          variants={nodeVariants}
          initial="hidden"
          animate="visible"
        />

        {/* SponsorLab Node - Green Hexagon (Intermediary Shape) */}
        <motion.path
          d={`M ${config.sponsorLab.x} ${config.sponsorLab.y - config.nodeRadius * 1.2}
            L ${config.sponsorLab.x + config.nodeRadius} ${config.sponsorLab.y - config.nodeRadius * 0.6}
            L ${config.sponsorLab.x + config.nodeRadius} ${config.sponsorLab.y + config.nodeRadius * 0.6}
            L ${config.sponsorLab.x} ${config.sponsorLab.y + config.nodeRadius * 1.2}
            L ${config.sponsorLab.x - config.nodeRadius} ${config.sponsorLab.y + config.nodeRadius * 0.6}
            L ${config.sponsorLab.x - config.nodeRadius} ${config.sponsorLab.y - config.nodeRadius * 0.6}
            Z`}
          fill="url(#sponsorLabGradient)"
          filter="url(#dropShadow)"
          variants={nodeVariants}
          initial="hidden"
          animate="visible"
        />

        {/* Pulse effect behind the main SponsorLab node */}
        <motion.path
          d={`M ${config.sponsorLab.x} ${config.sponsorLab.y - (config.nodeRadius + 3) * 1.2}
            L ${config.sponsorLab.x + (config.nodeRadius + 3)} ${config.sponsorLab.y - (config.nodeRadius + 3) * 0.6}
            L ${config.sponsorLab.x + (config.nodeRadius + 3)} ${config.sponsorLab.y + (config.nodeRadius + 3) * 0.6}
            L ${config.sponsorLab.x} ${config.sponsorLab.y + (config.nodeRadius + 3) * 1.2}
            L ${config.sponsorLab.x - (config.nodeRadius + 3)} ${config.sponsorLab.y + (config.nodeRadius + 3) * 0.6}
            L ${config.sponsorLab.x - (config.nodeRadius + 3)} ${config.sponsorLab.y - (config.nodeRadius + 3) * 0.6}
            Z`}
          fill="#10B981"
          opacity="0.3"
          variants={pulseVariants}
          initial="hidden"
          animate="visible"
        />

        {/* Enhanced text labels with animations */}
        <motion.g variants={textVariants} initial="hidden" animate="visible">
          <text
            x={config.sponsorLab.x}
            y={config.sponsorLab.textY}
            textAnchor="middle"
            fill="#FFF"
            fontSize={config.sponsorLab.fontSize}
            fontWeight="600"
            filter="url(#dropShadow)"
          >
            SponsorLab
          </text>
          <text
            x={config.sponsorLab.x}
            y={config.sponsorLab.textY + 16}
            textAnchor="middle"
            fill="#A7F3D0"
            fontSize={config.sponsorLab.fontSize - 2}
            fontWeight="400"
          >
            Intermediary
          </text>
        </motion.g>

        <motion.g variants={textVariants} initial="hidden" animate="visible">
          <text
            x={config.sponsors.x}
            y={config.sponsors.textY}
            textAnchor="middle"
            fill="#FFF"
            fontSize={config.sponsors.fontSize}
            fontWeight="500"
            filter="url(#dropShadow)"
          >
            Sponsors
          </text>
        </motion.g>

        <motion.g variants={textVariants} initial="hidden" animate="visible">
          <text
            x={config.youtubers.x}
            y={config.youtubers.textY}
            textAnchor="middle"
            fill="#FFF"
            fontSize={config.youtubers.fontSize}
            fontWeight="500"
            filter="url(#dropShadow)"
          >
            Youtubers
          </text>
        </motion.g>

        {/* SponsorLab Network/Connection Icon */}
        <motion.g
          variants={iconVariants}
          initial="hidden"
          animate="visible"
          style={{
            transformOrigin: `${config.sponsorLab.x}px ${config.sponsorLab.y}px`,
            transform: `scale(${config.iconScale})`,
          }}
        >
          <circle
            cx={config.sponsorLab.x}
            cy={config.sponsorLab.y}
            r="8"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          <line
            x1={config.sponsorLab.x - 8}
            y1={config.sponsorLab.y}
            x2={config.sponsorLab.x + 8}
            y2={config.sponsorLab.y}
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          <line
            x1={config.sponsorLab.x}
            y1={config.sponsorLab.y - 8}
            x2={config.sponsorLab.x}
            y2={config.sponsorLab.y + 8}
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          <circle cx={config.sponsorLab.x} cy={config.sponsorLab.y} r="3" fill="#FFFFFF" />
        </motion.g>

        {/* Sponsors Icon - Briefcase/Money */}
        <motion.g
          variants={iconVariants}
          initial="hidden"
          animate="visible"
          style={{
            transformOrigin: `${config.sponsors.x}px ${config.sponsors.y}px`,
            transform: `scale(${config.iconScale})`,
          }}
        >
          <rect
            x={config.sponsors.x - 8}
            y={config.sponsors.y - 5}
            width="16"
            height="12"
            rx="2"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx={config.sponsors.x} cy={config.sponsors.y} r="4" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
          <path
            d={`M${config.sponsors.x} ${config.sponsors.y - 2} L${config.sponsors.x} ${config.sponsors.y + 2}`}
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          <path
            d={`M${config.sponsors.x - 2} ${config.sponsors.y} L${config.sponsors.x + 2} ${config.sponsors.y}`}
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
        </motion.g>

        {/* Youtubers Icon - Play Button */}
        <motion.g
          variants={iconVariants}
          initial="hidden"
          animate="visible"
          style={{
            transformOrigin: `${config.youtubers.x}px ${config.youtubers.y}px`,
            transform: `scale(${config.iconScale})`,
          }}
        >
          <polygon
            points={`${config.youtubers.x - 5},${config.youtubers.y - 5} ${config.youtubers.x - 5},${config.youtubers.y + 5} ${config.youtubers.x + 5},${config.youtubers.y}`}
            fill="#FFFFFF"
          />
        </motion.g>

        {/* Connection indicators */}
        <motion.g
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delay: 2.5,
                duration: 0.8,
              },
            },
          }}
          initial="hidden"
          animate="visible"
        >
          <circle
            cx={(config.sponsorLab.x + config.sponsors.x) / 2}
            cy={(config.sponsorLab.y + config.sponsors.y) / 2}
            r="3"
            fill="#34D399"
          />
          <circle
            cx={(config.sponsorLab.x + config.youtubers.x) / 2}
            cy={(config.sponsorLab.y + config.youtubers.y) / 2}
            r="3"
            fill="#34D399"
          />
        </motion.g>
      </svg>
    </div>
  )
}

export default function LandingPage() {
  const { auth } = useAppContext()
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
      {auth ? (
        <>
          <Header />
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </>
      ) : (
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
      )}

      {/* Navigation */}
      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 py-8 pb-24 relative overflow-hidden"
      >
        <AnimatedBackground />
        <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
          <div className="space-y-8">
            <motion.h1 variants={itemVariants} className="text-6xl font-bold">
              Connect Creators with Brands
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-gray-400">
              SponsorLab is the innovative platform streamlining sponsorships for content creators and brands.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link href="/learn-more">
                <Button className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-6">
                  Learn More
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
          <motion.div variants={itemVariants} className="relative h-[450px] w-full">
            <ConnectAnimation />
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="bg-black bg-opacity-50 py-12">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="mb-10 text-center"
          >
            <div className="inline-block px-3 py-1 mb-4 bg-green-900/30 rounded-full">
              <span className="text-green-400 font-medium">Our Advantages</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-300"
            >
              Why Choose SponsorLab?
            </motion.h2>
            <p className="max-w-2xl mx-auto text-gray-400 text-lg">
              Our platform offers unique advantages for both creators and brands looking to form meaningful
              partnerships.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <EnhancedFeatureCard
              icon={<Search className="w-10 h-10 text-green-400" />}
              title="Open Marketplace"
              description="Browse and select content that aligns perfectly with your brand&apos;s goals."
              index={0}
            />
            <EnhancedFeatureCard
              icon={<Zap className="w-10 h-10 text-green-400" />}
              title="Streamlined Process"
              description="Cut out inefficiencies and long negotiations with our automated matching."
              index={1}
            />
            <EnhancedFeatureCard
              icon={<DollarSign className="w-10 h-10 text-green-400" />}
              title="Cost-Effective"
              description="Direct partnerships mean fewer fees and more value for both parties."
              index={2}
            />
          </motion.div>
        </div>
      </section>

      {/* About SponsorLab Section */}
      <section className="bg-black bg-opacity-30 py-20 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-green-500 rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-500 rounded-full filter blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="mb-12 text-center"
          >
            <div className="inline-block px-3 py-1 mb-4 bg-green-900/30 rounded-full">
              <span className="text-green-400 font-medium">Our Story</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-300"
            >
              About SponsorLab
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                SponsorLab was born in Pennsylvania from a simple idea:{" "}
                <span className="text-green-400 font-medium">
                  creators and brands deserve better tools to work together
                </span>
                . Currently in beta, our platform is the result of a small team&apos;s passion for solving real problems in
                the content creation ecosystem.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                We&apos;re not just building software; we&apos;re creating a community where meaningful partnerships can flourish.
                Our mission is to eliminate the friction in sponsorship management, allowing creators to focus on what
                they do best—creating amazing content.
              </p>
              <div className="pt-4 flex flex-wrap gap-6">
                <TeamValue icon={<Lightbulb className="w-5 h-5 text-green-400" />} title="Innovation" />
                <TeamValue icon={<Users className="w-5 h-5 text-green-400" />} title="Community" />
                <TeamValue icon={<Shield className="w-5 h-5 text-green-400" />} title="Trust" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-900/20 rounded-2xl transform rotate-3"></div>
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 p-8 rounded-2xl border border-green-900/40 backdrop-blur-sm">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-green-900/50 flex items-center justify-center mr-4">
                    <Code className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Built by Creators, for Creators</h3>
                    <p className="text-green-400/80 text-sm">Beta Version</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <AboutFeature
                    icon={<Home className="w-5 h-5 text-green-400" />}
                    title="Pennsylvania-based"
                    description="Founded and developed in the Keystone State"
                  />
                  <AboutFeature
                    icon={<Users className="w-5 h-5 text-green-400" />}
                    title="Small, Dedicated Team"
                    description="Passionate developers focused on your success"
                  />
                  <AboutFeature
                    icon={<Zap className="w-5 h-5 text-green-400" />}
                    title="Constantly Evolving"
                    description="Regular updates based on user feedback"
                  />
                </div>

                <div className="mt-8 pt-6 border-t border-green-900/30">
                  <p className="text-gray-400 text-sm italic">
                    &quot;We believe that when creators thrive, the entire digital ecosystem benefits. That&apos;s why we&apos;re
                    committed to building tools that empower both sides of the sponsorship equation.&quot;
                  </p>
                  <p className="text-right text-green-400 mt-2 text-sm font-medium">— The SponsorLab Team</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Demo & Process Section */}
      <VideoSection />

      {/* FAQ Section */}
      <section className="bg-black bg-opacity-50 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center"
          >
            <div className="inline-block px-3 py-1 mb-4 bg-green-900/30 rounded-full">
              <span className="text-green-400 font-medium">Got Questions?</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-300"
            >
              Frequently Asked Questions
            </motion.h2>
            <p className="max-w-2xl mx-auto text-gray-400 text-lg">
              Everything you need to know about SponsorLab and how it can transform your sponsorship experience.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <EnhancedFAQItem
              question="How does SponsorLab work?"
              answer="SponsorLab is an open marketplace where content creators list their upcoming content, and brands can browse and select the videos or content that align with their marketing goals. Our platform uses automated matching algorithms to connect the right creators with the right brands."
              index={0}
            />
            <EnhancedFAQItem
              question="How does SponsorLab benefit content creators and brands?"
              answer="Creators can showcase their upcoming projects, gain visibility to potential sponsors, and manage sponsorships seamlessly. The platform simplifies negotiations and ensures secure, timely payments."
              index={1}
            />
            <EnhancedFAQItem
              question="How does SponsorLab ensure fair deals for both creators and brands?"
              answer="SponsorLab provides creators with a platform to showcase upcoming projects, attract sponsors, and manage sponsorships seamlessly, with simplified negotiations and secure, timely payments. For brands, SponsorLab offers access to a diverse pool of creators, advanced matching algorithms to find ideal partnerships, and detailed analytics to track campaign performance—enabling more effective, targeted marketing."
              index={2}
            />
            <EnhancedFAQItem
              question="What fees does SponsorLab charge?"
              answer="SponsorLab charges a small percentage fee on successful sponsorship deals. Our fee structure is transparent and competitive, ensuring that both creators and brands get maximum value from our platform. For detailed pricing, please check our terms of service."
              index={3}
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
            <Button className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-6">I am a Creator</Button>
          </Link>
          <Link href="/signup/sponsor">
            <Button className="bg-gray-700 hover:bg-gray-600 text-white text-lg px-8 py-6">I am a Brand</Button>
          </Link>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-black bg-opacity-50 py-12 mt-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-green-400 mb-2">SponsorLab</h3>
              <p className="text-gray-400">Connecting creators and brands seamlessly</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <Link href="/terms-of-service" className="text-gray-400 hover:text-green-400">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-green-400">
                Privacy Policy
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500"></div>
        </div>
      </footer>
    </div>
  )
}

function EnhancedFeatureCard({ icon, title, description, index }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            delay: index * 0.2,
            duration: 0.5,
          },
        },
      }}
      whileHover={{
        y: -10,
        boxShadow: "0 10px 30px -10px rgba(16, 185, 129, 0.3)",
        transition: { duration: 0.3 },
      }}
      className="bg-gradient-to-br from-green-900/30 to-green-900/10 p-6 rounded-xl flex flex-col items-center text-center border border-green-900/30 backdrop-blur-sm"
    >
      <div className="p-3 rounded-full bg-green-900/30 mb-3">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  )
}

function EnhancedFAQItem({ question, answer, index }) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            delay: index * 0.1,
            duration: 0.4,
          },
        },
      }}
      className="border border-green-900/40 rounded-xl overflow-hidden"
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-6 flex justify-between items-center text-left transition-colors ${isOpen ? "bg-green-900/30" : "bg-green-900/10 hover:bg-green-900/20"}`}
        whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.2)" }}
      >
        <h3 className="text-xl font-semibold text-white">{question}</h3>
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0 ml-4">
          <div className="w-6 h-6 flex items-center justify-center">
            <div className="w-5 h-0.5 bg-green-400 absolute"></div>
            <div className="h-5 w-0.5 bg-green-400 absolute"></div>
          </div>
        </motion.div>
      </motion.button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-6 pt-0 border-t border-green-900/30">
          <p className="text-gray-300 leading-relaxed">{answer}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProcessStep({ icon, title, step, description }) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-gradient-to-br from-green-900/30 to-green-900/10 p-6 rounded-xl border border-green-900/30 backdrop-blur-sm flex flex-col items-center text-center relative overflow-hidden"
    >
      <div className="absolute -top-6 -left-6 w-16 h-16 bg-green-500/10 rounded-full flex items-end justify-end">
        <span className="text-green-400/40 text-4xl font-bold mr-1 mb-1">{step}</span>
      </div>
      <div className="p-4 rounded-full bg-green-900/30 mb-4 z-10">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </motion.div>
  )
}

function TeamValue({ icon, title }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="p-2 rounded-full bg-green-900/30">{icon}</div>
      <span className="text-white font-medium">{title}</span>
    </div>
  )
}

function AboutFeature({ icon, title, description }) {
  return (
    <div className="flex items-start">
      <div className="p-2 rounded-full bg-green-900/30 mr-3 mt-0.5">{icon}</div>
      <div>
        <h4 className="text-white font-medium">{title}</h4>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  )
}

