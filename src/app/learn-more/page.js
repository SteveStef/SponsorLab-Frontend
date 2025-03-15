"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, DollarSign, Percent, Zap, ChevronDown } from "lucide-react";
import Header from "../components/nav";
import Link from "next/link";
import { useState } from "react";

export default function Component() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  }

  return (
    <>
      <br></br>
      <Header />
      <div className="min-h-screen bg-gradient-to-tr from-black via-black to-green-950 text-gray-100">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">SponsorLab Pricing</h1>
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-xl text-gray-300 mb-6 text-center">
              At SponsorLab, we believe in transparent and fair pricing. Our fee structure is designed to ensure that
              both creators and brands get maximum value from our platform.
            </p>
            <p className="text-xl text-gray-300 text-center">
              We only charge a fee when a successful match is made and a sponsorship deal is completed. This way, you
              only pay for results.
            </p>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Creator Card */}
            <Card className="border-green-500/20 bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-green-400">For Creators</CardTitle>
                <CardDescription className="text-gray-300">Our pricing structure for content creators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Percent className="mr-3 h-5 w-5 text-green-400" />
                  <span className="text-lg">5% fee on successful sponsorship deals</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="mr-3 h-5 w-5 text-green-400" />
                  <span className="text-lg">No upfront costs or monthly fees</span>
                </div>
                <div className="flex items-center">
                  <Zap className="mr-3 h-5 w-5 text-green-400" />
                  <span className="text-lg">Access to all platform features included</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/signup/youtuber" className="w-full">
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                    Get Started as a Creator <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Brand Card */}
            <Card className="border-green-500/20 bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-green-400">For Brands</CardTitle>
                <CardDescription className="text-gray-300">
                  Our pricing structure for brands and sponsors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Percent className="mr-3 h-5 w-5 text-green-400" />
                  <span className="text-lg">2% fee on successful sponsorship deals</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="mr-3 h-5 w-5 text-green-400" />
                  <span className="text-lg">No upfront costs or monthly fees</span>
                </div>
                <div className="flex items-center">
                  <Zap className="mr-3 h-5 w-5 text-green-400" />
                  <span className="text-lg">Advanced analytics and reporting included</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/signup/sponsor" className="w-full">
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                    Get Started as a Brand <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="container mx-auto px-6 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <Card className="border-green-500/20 bg-black/40 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-12 h-12 bg-green-500 flex items-center justify-center rounded-br-lg">
                <span className="font-bold text-black">1</span>
              </div>
              <CardHeader className="pt-14">
                <CardTitle className="text-green-400">Connect</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Creators list their content and brands browse for opportunities. Our algorithm suggests perfect
                  matches.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-500/20 bg-black/40 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-12 h-12 bg-green-500 flex items-center justify-center rounded-br-lg">
                <span className="font-bold text-black">2</span>
              </div>
              <CardHeader className="pt-14">
                <CardTitle className="text-green-400">Collaborate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Once a match is made, use our platform to negotiate terms, share content, and approve final
                  deliverables.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-500/20 bg-black/40 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-12 h-12 bg-green-500 flex items-center justify-center rounded-br-lg">
                <span className="font-bold text-black">3</span>
              </div>
              <CardHeader className="pt-14">
                <CardTitle className="text-green-400">Secure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Sponsorship funds are held securely in escrow by SponsorLab until the agreed terms are met, protecting
                  both parties.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-500/20 bg-black/40 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-12 h-12 bg-green-500 flex items-center justify-center rounded-br-lg">
                <span className="font-bold text-black">4</span>
              </div>
              <CardHeader className="pt-14">
                <CardTitle className="text-green-400">Complete</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  After the sponsored content is published and approved, payment is released to the creator, minus our
                  small platform fee.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pricing Models Section */}
        <section className="container mx-auto px-6 py-16 md:py-24 bg-black/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Pricing Models</h2>
            <p className="text-xl text-center mb-12 text-gray-300">
              Choose the pricing model that works best for your content and audience
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Flat Rate Table */}
              <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg overflow-hidden">
                <div className="p-6 border-b border-green-500/20">
                  <h3 className="text-2xl text-green-400 font-bold">Flat Rate</h3>
                  <p className="text-gray-300 mt-2">Fixed payment regardless of performance</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-black/60">
                        <th className="text-left p-4 font-medium text-green-400">Feature</th>
                        <th className="text-left p-4 font-medium text-green-400">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-green-500/10">
                        <td className="p-4 font-medium">Payment Structure</td>
                        <td className="p-4 text-gray-300">One-time, fixed amount</td>
                      </tr>
                      <tr className="border-t border-green-500/10">
                        <td className="p-4 font-medium">Risk Level</td>
                        <td className="p-4 text-gray-300">Lower risk for creators</td>
                      </tr>
                      <tr className="border-t border-green-500/10">
                        <td className="p-4 font-medium">Payment Timing</td>
                        <td className="p-4 text-gray-300">Upon content approval</td>
                      </tr>
                      <tr className="border-t border-green-500/10">
                        <td className="p-4 font-medium">Sponsor Control</td>
                        <td className="p-4 text-gray-300">Fixed cost, easy to budget</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CPM Table */}
              <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg overflow-hidden">
                <div className="p-6 border-b border-green-500/20">
                  <h3 className="text-2xl text-green-400 font-bold">CPM (Cost Per Mille)</h3>
                  <p className="text-gray-300 mt-2">Based on video views (per 1,000 views)</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-black/60">
                        <th className="text-left p-4 font-medium text-green-400">Feature</th>
                        <th className="text-left p-4 font-medium text-green-400">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-green-500/10">
                        <td className="p-4 font-medium">Payment Structure</td>
                        <td className="p-4 text-gray-300">Based on video views (per 1,000 views)</td>
                      </tr>
                      <tr className="border-t border-green-500/10">
                        <td className="p-4 font-medium">Risk Level</td>
                        <td className="p-4 text-gray-300">Higher potential earnings, but dependent on performance</td>
                      </tr>
                      <tr className="border-t border-green-500/10">
                        <td className="p-4 font-medium">Payment Timing</td>
                        <td className="p-4 text-gray-300">Evaluated 1 month after posting</td>
                      </tr>
                      <tr className="border-t border-green-500/10">
                        <td className="p-4 font-medium">Sponsor Control</td>
                        <td className="p-4 text-gray-300">Can set payment caps to control spending</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-6 bg-black/20 p-8 rounded-lg border border-green-500/10">
              <h3 className="text-2xl font-semibold text-green-400">Additional Information</h3>
              <div className="space-y-4">
                <h4 className="text-xl font-medium">CPM Evaluation Process</h4>
                <p className="text-gray-300">
                  For sponsorships using the CPM model, SponsorLab evaluates the video&apos;s performance one month
                  after it&apos;s posted. The final payment is calculated based on the number of views achieved during
                  this period, ensuring fair compensation for creators based on their content&apos;s reach.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-medium">Sponsor Payment Caps</h4>
                <p className="text-gray-300">
                  To give sponsors more control over their budgets, especially when using the CPM model, SponsorLab
                  allows sponsors to set payment caps. This feature ensures that sponsors can participate in
                  performance-based pricing while still maintaining control over their maximum spend.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-6 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {[
              {
                question: "Is SponsorLab really free to use?",
                answer:
                  "Yes, SponsorLab is completely free to use for both creators and brands. We only charge a small fee when a sponsorship deal is successfully completed.",
              },
              {
                question: "How does the escrow service work?",
                answer:
                  "When a sponsorship deal is agreed upon, the brand's payment is held securely by SponsorLab. Once the creator fulfills the agreed terms and the content is approved, the funds are released to the creator. This protects both parties from potential issues.",
              },
              {
                question: "What happens if a creator doesn't fulfill the sponsorship terms?",
                answer:
                  "If a creator fails to post the agreed content or comply with the sponsor's terms, the sponsorship funds held in escrow are refunded to the sponsor. This ensures that brands are protected from potential losses.",
              },
              {
                question: "Are there any hidden fees?",
                answer:
                  "No, there are no hidden fees. We only charge the percentage fee on successful deals. All other features of the platform, including the escrow service, are included at no extra cost.",
              },
              {
                question: "How do you ensure fair pricing for both parties?",
                answer:
                  "Our platform provides market insights and suggested price ranges based on content type, audience size, and engagement rates. This helps both creators and brands agree on fair compensation. Additionally, our escrow service ensures that both parties are protected throughout the process.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className={`border border-green-500/20 rounded-lg overflow-hidden bg-black/40 backdrop-blur-sm transition-all duration-300 ${openFaq === index ? "shadow-lg shadow-green-500/10" : ""}`}
              >
                <button
                  className="flex justify-between items-center w-full p-6 text-left font-medium text-lg focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openFaq === index ? "max-h-96" : "max-h-0"}`}
                >
                  <p className="p-6 pt-0 text-gray-300">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-10 md:py-16 text-center">
          <div className="max-w-6xl mx-auto bg-gradient-to-r from-green-900/40 to-green-800/40 p-6 rounded-lg border border-green-500/20 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="md:text-left mb-4 md:mb-0 md:pr-8">
                <h2 className="text-2xl md:text-3xl font-bold">Ready to Get Started?</h2>
                <p className="text-gray-300 mt-2">
                  Join SponsorLab today and start connecting with the perfect partners for your content or brand.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup/youtuber">
                  <Button className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-6 py-2 h-auto">
                    Join as a Creator
                  </Button>
                </Link>
                <Link href="/signup/sponsor">
                  <Button className="w-full sm:w-auto bg-black hover:bg-black/80 text-white border border-green-500 px-6 py-2 h-auto">
                    Join as a Brand
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

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
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

