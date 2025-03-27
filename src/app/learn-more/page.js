"use client"

import Header from "../components/nav"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  MessageSquare,
  Search,
  Shield,
  Zap,
  BarChart,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-gradient-to-br from-green-900/30 to-green-900/10 p-6 rounded-xl border border-green-900/30 backdrop-blur-sm flex flex-col items-center text-center h-full"
    >
      <div className="p-3 rounded-full bg-green-900/30 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  )
}

// Process Step Component
const ProcessStep = ({ icon, title, step, description }) => {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-gradient-to-br from-green-900/30 to-green-900/10 p-6 rounded-xl border border-green-900/30 backdrop-blur-sm flex flex-col items-center text-center relative overflow-hidden h-full"
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

// Pricing Card Component
const PricingCard = ({ title, description, fee, features, buttonText, forCreators = true }) => {
  return (
    <motion.div
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-xl border border-green-900/40 overflow-hidden shadow-xl"
    >
      <div className={`p-6 ${forCreators ? "bg-green-900/30" : "bg-blue-900/30"}`}>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
      <div className="p-6">
        <div className="mb-6">
          <p className="text-gray-400 text-sm uppercase font-semibold">Platform Fee</p>
          <p className="text-4xl font-bold text-white">{fee}</p>
          <p className="text-gray-400 mt-1">on successful deals</p>
        </div>
        <div className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-gray-300">{feature}</p>
            </div>
          ))}
        </div>
    {
      title === "For Creators" ? 
        <Link href="signup/youtuber">
        <Button
          className={`w-full ${forCreators ? "bg-green-500 hover:bg-green-600" : "bg-blue-600 hover:bg-blue-700"} text-white`}
        >
          {buttonText}
        </Button>
      </Link>:
        <Link href="signup/sponsor">
        <Button
          className={`w-full ${forCreators ? "bg-green-500 hover:bg-green-600" : "bg-blue-600 hover:bg-blue-700"} text-white`}
        >
          {buttonText}
        </Button>
      </Link>
    }
      </div>
    </motion.div>
  )
}

// Pricing Model Card Component
const PricingModelCard = ({ title, description, features, icon }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-xl border border-green-900/40 overflow-hidden shadow-xl">
      <div className="p-6 border-b border-green-900/30 flex items-center">
        <div className="p-3 rounded-full bg-green-900/30 mr-4">{icon}</div>
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-gray-300 text-sm">{description}</p>
        </div>
      </div>
      <div className="p-6">
        <table className="w-full text-left">
          <tbody>
            {features.map((feature, index) => (
              <tr key={index} className={index !== features.length - 1 ? "border-b border-gray-800" : ""}>
                <td className="py-3 pr-4 font-medium text-white">{feature.name}</td>
                <td className="py-3 text-gray-300">{feature.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Benefit Item Component
const BenefitItem = ({ icon, title, description }) => {
  return (
    <div className="flex items-start mb-6">
      <div className="p-2 rounded-full bg-green-900/30 mr-4 mt-1 flex-shrink-0">{icon}</div>
      <div>
        <h4 className="text-lg font-semibold text-white mb-1">{title}</h4>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  )
}

export default function LearnMorePage() {
  // State for FAQ
  const [openFAQ, setOpenFAQ] = useState(null)

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  // FAQ Data
  const faqData = [
    {
      question: "How does SponsorLab's fee structure work?",
      answer:
        "SponsorLab only charges a fee when a successful match is made and a sponsorship deal is completed. For creators, we charge a 5% fee on successful deals, and for brands, we charge a 2% fee. There are no upfront costs or monthly fees for either party.",
    },
    {
      question: "What's the difference between Flat Rate and CPM pricing models?",
      answer:
        "The Flat Rate model provides a fixed payment regardless of performance, offering lower risk for creators and predictable costs for sponsors. The CPM model bases payment on video views (per 1,000 views), offering higher potential earnings for creators but with performance-dependent results. Sponsors can set payment caps to control spending with the CPM model.",
    },
    {
      question: "How does SponsorLab ensure secure transactions?",
      answer:
        "SponsorLab uses an escrow system where sponsorship funds are held securely until the agreed terms are met. This protects both creators and brands throughout the process. Once the sponsored content is published and approved, payment is released to the creator, minus our small platform fee.",
    },
    {
      question: "Can I use SponsorLab if I'm a small creator or a new brand?",
      answer:
        "SponsorLab is designed for creators and brands of all sizes. Our platform helps match the right creators with the right brands based on content alignment, not just audience size. This creates opportunities for meaningful partnerships regardless of your current reach or market presence.",
    },
    {
      question: "How long does the sponsorship process typically take?",
      answer:
        "The sponsorship process on SponsorLab is significantly faster than traditional methods. While timing can vary based on specific requirements, most deals are completed within 48 hours from initial match to agreement. This is compared to weeks or even months with traditional sponsorship methods.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-tr from-black via-black to-green-950 text-gray-100">
      <Header />
      <br></br>
      <br></br>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block px-3 py-1 mb-4 bg-green-900/30 rounded-full">
              <span className="text-green-400 font-medium">Revolutionizing Sponsorships</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-300">
              The Future of Creator-Brand Partnerships
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              SponsorLab is transforming how creators and brands collaborate, making sponsorships faster, safer, and
              more profitable for everyone involved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/signup">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-6">
                Get Started Free
                <ArrowRight className="ml-2" />
              </Button>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block px-3 py-1 mb-4 bg-green-900/30 rounded-full">
              <span className="text-green-400 font-medium">The Challenge</span>
            </div>
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-300">
              Why Sponsorships Are Broken
            </h2>
            <p className="text-xl text-gray-300">
              The current sponsorship landscape is filled with inefficiencies, security risks, and missed opportunities
              for both creators and brands.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Clock className="w-10 h-10 text-green-400" />}
              title="Time-Consuming Process"
              description="Creators and brands spend weeks on email exchanges and negotiations, delaying content creation and campaign launches."
            />
            <FeatureCard
              icon={<Shield className="w-10 h-10 text-red-400" />}
              title="Security Risks"
              description="Direct payments and informal agreements leave both parties vulnerable to scams, non-payment, and contract disputes."
            />
            <FeatureCard
              icon={<DollarSign className="w-10 h-10 text-yellow-400" />}
              title="High Agency Fees"
              description="Traditional agencies charge 20-30% commission, significantly reducing creator earnings and increasing brand costs."
            />
            <FeatureCard
              icon={<Search className="w-10 h-10 text-blue-400" />}
              title="Discovery Challenges"
              description="Brands struggle to find the right creators for their campaigns, while creators miss opportunities with brands that would be perfect matches."
            />
            <FeatureCard
              icon={<MessageSquare className="w-10 h-10 text-purple-400" />}
              title="Communication Barriers"
              description="Fragmented communication across multiple platforms leads to misunderstandings, missed messages, and collaboration friction."
            />
            <FeatureCard
              icon={<BarChart className="w-10 h-10 text-orange-400" />}
              title="Performance Tracking"
              description="Lack of standardized metrics makes it difficult to measure campaign success and determine fair compensation for creators."
            />
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-green-500 rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-500 rounded-full filter blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block px-3 py-1 mb-4 bg-green-900/30 rounded-full">
              <span className="text-green-400 font-medium">Our Solution</span>
            </div>
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-300">
              How SponsorLab Transforms Sponsorships
            </h2>
            <p className="text-xl text-gray-300">
              SponsorLab&apos;s innovative platform creates a seamless, secure, and efficient marketplace for creators and
              brands to connect and collaborate.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">For Content Creators</h3>
              <div className="space-y-6">
                <BenefitItem
                  icon={<DollarSign className="w-5 h-5 text-green-400" />}
                  title="Keep More of Your Earnings"
                  description="With only a 5% platform fee, you keep significantly more of your sponsorship revenue compared to traditional agencies that charge 20-30%."
                />
                <BenefitItem
                  icon={<Shield className="w-5 h-5 text-green-400" />}
                  title="Secure Payment Protection"
                  description="Our escrow system ensures you get paid for your work, eliminating the risk of non-payment after content delivery."
                />
                <BenefitItem
                  icon={<Zap className="w-5 h-5 text-green-400" />}
                  title="Faster Deal Completion"
                  description="Close sponsorship deals in days instead of weeks, with streamlined negotiations and automated contract generation."
                />
                <BenefitItem
                  icon={<Search className="w-5 h-5 text-green-400" />}
                  title="Better Brand Matches"
                  description="Our algorithm connects you with brands that align with your content and audience, creating more authentic partnerships."
                />
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-xl border border-green-900/40">
              <Image
                src="/placeholder.svg?height=600&width=800"
                width={800}
                height={600}
                alt="Creator Dashboard"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <h4 className="text-xl font-bold text-white mb-1">Creator Dashboard</h4>
                <p className="text-gray-300 text-sm">Manage all your sponsorships in one place</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative rounded-xl overflow-hidden shadow-xl border border-green-900/40">
              <Image
                src="/placeholder.svg?height=600&width=800"
                width={800}
                height={600}
                alt="Brand Campaign Manager"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <h4 className="text-xl font-bold text-white mb-1">Brand Campaign Manager</h4>
                <p className="text-gray-300 text-sm">Find and manage creator partnerships efficiently</p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-2xl font-bold text-white mb-6">For Brands and Sponsors</h3>
              <div className="space-y-6">
                <BenefitItem
                  icon={<Eye className="w-5 h-5 text-green-400" />}
                  title="Discover Perfect Content Matches"
                  description="Browse upcoming videos and content opportunities that align perfectly with your brand's marketing goals and target audience."
                />
                <BenefitItem
                  icon={<BarChart className="w-5 h-5 text-green-400" />}
                  title="AI-Powered Deal Evaluation"
                  description="Our platform evaluates each listing and provides view range probabilities, helping you make data-driven sponsorship decisions."
                />
                <BenefitItem
                  icon={<DollarSign className="w-5 h-5 text-green-400" />}
                  title="Lower Fees, Better ROI"
                  description="With just a 2% platform fee, you can invest more of your budget in the actual sponsorship, maximizing your marketing ROI."
                />
                <BenefitItem
                  icon={<Clock className="w-5 h-5 text-green-400" />}
                  title="Faster Campaign Execution"
                  description="Launch campaigns in days instead of weeks or months, with streamlined workflows and direct creator communication."
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Pricing Section */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block px-3 py-1 mb-4 bg-green-900/30 rounded-full">
              <span className="text-green-400 font-medium">Transparent Pricing</span>
            </div>
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-300">
              Simple, Fair Pricing
            </h2>
            <p className="text-xl text-gray-300">
              At SponsorLab, we believe in transparent and fair pricing. Our fee structure is designed to ensure that
              both creators and brands get maximum value from our platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <PricingCard
              title="For Creators"
              description="Perfect for content creators of all sizes"
              fee="5%"
              features={[
                "No upfront costs or monthly fees",
                "Access to all platform features included",
                "Secure payment protection via escrow",
                "Direct communication with brands",
                "Automated contract generation",
              ]}
              buttonText="Get Started as a Creator"
              forCreators={true}
            />
            <PricingCard
              title="For Brands"
              description="Ideal for businesses seeking creator partnerships"
              fee="2%"
              features={[
                "No upfront costs or monthly fees",
                "Advanced analytics and reporting included",
                "AI-powered creator matching",
                "Campaign management tools",
                "Content approval workflow",
              ]}
              buttonText="Get Started as a Brand"
              forCreators={false}
            />
          </div>

          <h3 className="text-2xl font-bold text-center text-white mb-8">Pricing Models</h3>
          <p className="text-center text-gray-300 max-w-3xl mx-auto mb-12">
            Choose the pricing model that works best for your content and audience. SponsorLab supports both fixed-rate
            and performance-based sponsorship arrangements.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <PricingModelCard
              title="Flat Rate"
              description="Fixed payment regardless of performance"
              icon={<DollarSign className="w-6 h-6 text-green-400" />}
              features={[
                { name: "Payment Structure", value: "One-time, fixed amount" },
                { name: "Risk Level", value: "Lower risk for creators" },
                { name: "Payment Timing", value: "Upon content approval" },
                { name: "Sponsor Control", value: "Fixed cost, easy to budget" },
              ]}
            />
            <PricingModelCard
              title="CPM (Cost Per Mille)"
              description="Based on video views (per 1,000 views)"
              icon={<Eye className="w-6 h-6 text-green-400" />}
              features={[
                { name: "Payment Structure", value: "Based on video views (per 1,000 views)" },
                { name: "Risk Level", value: "Higher potential earnings, but dependent on performance" },
                { name: "Payment Timing", value: "Evaluated 1 month after posting" },
                { name: "Sponsor Control", value: "Can set payment caps to control spending" },
              ]}
            />
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-xl border border-green-900/40 p-6 max-w-3xl mx-auto">
            <h4 className="text-xl font-bold text-white mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 text-green-400 mr-2" />
              Additional Information
            </h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-white mb-2">CPM Evaluation Process</h5>
                <p className="text-gray-300">
                  For sponsorships using the CPM model, SponsorLab evaluates the video&apos;s performance one month after
                  it&apos;s posted. The final payment is calculated based on the number of views achieved during this period,
                  ensuring fair compensation for creators based on their content&apos;s reach.
                </p>
              </div>
              <div>
                <h5 className="font-semibold text-white mb-2">Sponsor Payment Caps</h5>
                <p className="text-gray-300">
                  To give sponsors more control over their budgets, especially when using the CPM model, SponsorLab
                  allows sponsors to set payment caps. This feature ensures that sponsors can participate in
                  performance-based pricing while still maintaining control over their maximum spend.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-900/30 to-green-800/10">
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
      </section>

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

