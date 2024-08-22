import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DollarSign, Search, TrendingUp, Users, CheckCircle, BarChart } from "lucide-react";
import Black from "../../../public/connect.jpg";
import Image from "next/image";

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen text-gray-100">
      <br></br>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={Black}
              alt="YouTube creators collaborating"
              className="object-cover w-full h-full opacity-20"
            />
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Connect YouTubers with Sponsors
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  SponsorLab is the platform where YouTubers showcase future content and sponsors find their perfect match.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-green-500 text-gray-900 hover:bg-green-600 transition-colors">Get Started</Button>
                <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500 hover:text-gray-900 transition-colors">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3" >
              <div className="flex flex-col items-center space-y-4 text-center p-6 bg-gray-700 rounded-lg transition-transform hover:scale-105" style={{backgroundColor: "#171717"}}>
                <DollarSign className="h-10 w-10 text-green-500" />
                <h2 className="text-xl font-bold">Monetize Future Content</h2>
                <p className="text-gray-400">YouTubers can secure sponsorships for videos before they are even created.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 bg-gray-700 rounded-lg transition-transform hover:scale-105" style={{backgroundColor: "#171717"}}>
                <Search className="h-10 w-10 text-green-500" />
                <h2 className="text-xl font-bold">Discover Opportunities</h2>
                <p className="text-gray-400">Sponsors can browse and find content creators that align with their brand.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 bg-gray-700 rounded-lg transition-transform hover:scale-105" style={{backgroundColor: "#171717"}}>
                <TrendingUp className="h-10 w-10 text-green-500" />
                <h2 className="text-xl font-bold">Grow Your Reach</h2>
                <p className="text-gray-400">Both parties benefit from increased exposure and targeted collaborations.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32" style={{backgroundColor: "#171717"}}>
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">For YouTubers</h2>
                  <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Showcase your upcoming content and attract sponsors before you even hit record.
                  </p>
                </div>
                <ul className="grid gap-2 py-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Post future video ideas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Get discovered by relevant sponsors</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Secure funding for your content</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">For Sponsors</h2>
                  <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Find and collaborate with content creators that align perfectly with your brand.
                  </p>
                </div>
                <ul className="grid gap-2 py-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Browse upcoming video ideas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Connect with relevant YouTubers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Secure sponsorships early</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-8 text-center">SponsorLab by the Numbers</h2>
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Active YouTubers</span>
                  <span className="text-2xl font-bold text-green-500">10,000+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Sponsor Brands</span>
                  <span className="text-2xl font-bold text-green-500">500+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Successful Matches</span>
                  <span className="text-2xl font-bold text-green-500">25,000+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Avg. Sponsorship Value</span>
                  <span className="text-2xl font-bold text-green-500">$2,500</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <svg className="w-full h-64" viewBox="0 0 300 200">
                  <g className="grid">
                    <line x1="0" y1="0" x2="300" y2="0" stroke="#4B5563" strokeWidth="1" />
                    <line x1="0" y1="50" x2="300" y2="50" stroke="#4B5563" strokeWidth="1" />
                    <line x1="0" y1="100" x2="300" y2="100" stroke="#4B5563" strokeWidth="1" />
                    <line x1="0" y1="150" x2="300" y2="150" stroke="#4B5563" strokeWidth="1" />
                  </g>
                  <g className="bars">
                    <rect x="45" y="150" width="30" height="50" fill="#10B981" />
                    <rect x="115" y="100" width="30" height="100" fill="#10B981" />
                    <rect x="185" y="50" width="30" height="150" fill="#10B981" />
                    <rect x="255" y="0" width="30" height="200" fill="#10B981" />
                  </g>
                  <g className="labels" fill="#D1D5DB" fontSize="12">
                    <text x="60" y="170" textAnchor="middle">Q1</text>
                    <text x="130" y="170" textAnchor="middle">Q2</text>
                    <text x="200" y="170" textAnchor="middle">Q3</text>
                    <text x="270" y="170" textAnchor="middle">Q4</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32" style={{backgroundColor: "#171717"}}>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Join SponsorLab Today</h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Whether you are a content creator looking to monetize your ideas or a brand seeking the perfect partnership,
                  SponsorLab is your gateway to successful collaborations.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-gray-700 text-gray-100 border-gray-600"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button className="bg-green-500 text-gray-900 hover:bg-green-600 transition-colors" type="submit">
                    Sign Up
                  </Button>
                </form>
                <p className="text-xs text-gray-400">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2 hover:text-green-500 transition-colors" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-700">
        <p className="text-xs text-gray-400">© 2024 SponsorLab. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-green-500 transition-colors" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-green-500 transition-colors" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
