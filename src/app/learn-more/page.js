import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, DollarSign, Percent, Zap } from "lucide-react";
import Header from "../components/nav";

import Link from "next/link"

export default function Component() {
  return (
    <>
    <Header />
    <br></br>
    <br></br>
    <br></br>
    <div className="min-h-screen bg-gradient-to-tr from-black via-black to-green-950 text-gray-100">

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">SponsorLab - Learn More</h1>
        
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-xl text-gray-300 mb-6">
            At SponsorLab, we believe in transparent and fair pricing. Our fee structure is designed to ensure that both creators and brands get maximum value from our platform.
          </p>
          <p className="text-xl text-gray-300">
            We only charge a fee when a successful match is made and a sponsorship deal is completed. This way, you only pay for results.
          </p>
        </div>

        <Tabs defaultValue="creators" className="max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="creators">For Creators</TabsTrigger>
            <TabsTrigger value="brands">For Brands</TabsTrigger>
          </TabsList>
          <TabsContent value="creators">
            <Card>
              <CardHeader>
                <CardTitle>Youtubers</CardTitle>
                <CardDescription>Our pricing structure for content creators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Percent className="mr-2 h-4 w-4 text-green-400" />
                  <span>5% fee on successful sponsorship deals</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4 text-green-400" />
                  <span>No upfront costs or monthly fees</span>
                </div>
                <div className="flex items-center">
                  <Zap className="mr-2 h-4 w-4 text-green-400" />
                  <span>Access to all platform features included</span>
                </div>
              </CardContent>
              <CardFooter>
                  <Link href="/signup/youtuber" className="flex items-center justify-center w-full bg-green-500 hover:bg-green-600">
                <Button className="w-full bg-green-500 hover:bg-green-600">
                    Get Started as a Creator <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                  </Link>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="brands">
            <Card>
              <CardHeader>
                <CardTitle>Brands</CardTitle>
                <CardDescription>Our pricing structure for brands and sponsors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Percent className="mr-2 h-4 w-4 text-green-400" />
                  <span>2% fee on successful sponsorship deals</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4 text-green-400" />
                  <span>No upfront costs or monthly fees</span>
                </div>
                <div className="flex items-center">
                  <Zap className="mr-2 h-4 w-4 text-green-400" />
                  <span>Advanced analytics and reporting included</span>
                </div>
              </CardContent>
              <CardFooter>
                  <Link href="/signup/sponsor" className="flex items-center justify-center w-full bg-green-500 hover:bg-green-600">
                <Button className="w-full bg-green-500 hover:bg-green-600">
                    Get Started as a Brand <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                  </Link>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

 <section className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <Card className="text-gray-100">
            <CardHeader>
              <CardTitle className="text-green-400">1. Connect</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Creators list their content and brands browse for opportunities. Our algorithm suggests perfect matches.</p>
            </CardContent>
          </Card>
          <Card className="text-gray-100">
            <CardHeader>
              <CardTitle className="text-green-400">2. Collaborate</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Once a match is made, use our platform to negotiate terms, share content, and approve final deliverables.</p>
            </CardContent>
          </Card>
          <Card className="text-gray-100">
            <CardHeader>
              <CardTitle className="text-green-400">3. Secure</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Sponsorship funds are held securely in escrow by SponsorLab until the agreed terms are met, protecting both parties.</p>
            </CardContent>
          </Card>
          <Card className="text-gray-100">
            <CardHeader>
              <CardTitle className="text-green-400">4. Complete</CardTitle>
            </CardHeader>
            <CardContent>
              <p>After the sponsored content is published and approved, payment is released to the creator, minus our small platform fee.</p>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Pricing Models (for when youtubers create their listings)</h3>
          <p className="mb-6 text-gray-300">
            SponsorLab offers two pricing models for sponsorships: Flat Rate and CPM (Cost Per Mille). Creators can choose the model that works best for their content and audience.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-800">
                  <th className="border border-gray-600 px-4 py-2 text-left">Feature</th>
                  <th className="border border-gray-600 px-4 py-2 text-left">Flat Rate</th>
                  <th className="border border-gray-600 px-4 py-2 text-left">CPM (Cost Per Mille)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">Payment Structure</td>
                  <td className="border border-gray-600 px-4 py-2">One-time, fixed amount</td>
                  <td className="border border-gray-600 px-4 py-2">Based on video views (per 1,000 views)</td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">Risk Level</td>
                  <td className="border border-gray-600 px-4 py-2">Lower risk for creators</td>
                  <td className="border border-gray-600 px-4 py-2">Higher potential earnings, but dependent on performance</td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">Payment Timing</td>
                  <td className="border border-gray-600 px-4 py-2">Upon content approval</td>
                  <td className="border border-gray-600 px-4 py-2">Evaluated 1 month after posting</td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">Sponsor Control</td>
                  <td className="border border-gray-600 px-4 py-2">Fixed cost, easy to budget</td>
                  <td className="border border-gray-600 px-4 py-2">Can set payment caps to control spending</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 space-y-4">
            <h4 className="text-xl font-semibold">CPM Evaluation Process</h4>
            <p className="text-gray-300">
              For sponsorships using the CPM model, SponsorLab evaluates the video&apos;s performance one month after it&apos;s posted. The final payment is calculated based on the number of views achieved during this period, ensuring fair compensation for creators based on their content&apos;s reach.
            </p>
            <h4 className="text-xl font-semibold">Sponsor Payment Caps</h4>
            <p className="text-gray-300">
              To give sponsors more control over their budgets, especially when using the CPM model, SponsorLab allows sponsors to set payment caps. This feature ensures that sponsors can participate in performance-based pricing while still maintaining control over their maximum spend.
            </p>
          </div>
        </div>
      </section>
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span>Is SponsorLab really free to use?</span>
                <span className="transition group-open:rotate-180">
                  <ArrowRight />
                </span>
              </summary>
              <p className="text-gray-300 mt-3 group-open:animate-fadeIn">
                Yes, SponsorLab is completely free to use for both creators and brands. We only charge a small fee when a sponsorship deal is successfully completed.
              </p>
            </details>
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span>How does the escrow service work?</span>
                <span className="transition group-open:rotate-180">
                  <ArrowRight />
                </span>
              </summary>
              <p className="text-gray-300 mt-3 group-open:animate-fadeIn">
                When a sponsorship deal is agreed upon, the brand&apos;s payment is held securely by SponsorLab. Once the creator fulfills the agreed terms and the content is approved, the funds are released to the creator. This protects both parties from potential issues.
              </p>
            </details>
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span>What happens if a creator doesn&apos;t fulfill the sponsorship terms?</span>
                <span className="transition group-open:rotate-180">
                  <ArrowRight />
                </span>
              </summary>
              <p className="text-gray-300 mt-3 group-open:animate-fadeIn">
                If a creator fails to post the agreed content or comply with the sponsor&apos;s terms, the sponsorship funds held in escrow are refunded to the sponsor. This ensures that brands are protected from potential losses.
              </p>
            </details>
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span>Are there any hidden fees?</span>
                <span className="transition group-open:rotate-180">
                  <ArrowRight />
                </span>
              </summary>
              <p className="text-gray-300 mt-3 group-open:animate-fadeIn">
                No, there are no hidden fees. We only charge the percentage fee on successful deals. All other features of the platform, including the escrow service, are included at no extra cost.
              </p>
            </details>
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span>How do you ensure fair pricing for both parties?</span>
                <span className="transition group-open:rotate-180">
                  <ArrowRight />
                </span>
              </summary>
              <p className="text-gray-300 mt-3 group-open:animate-fadeIn">
                Our platform provides market insights and suggested price ranges based on content type, audience size, and engagement rates. This helps both creators and brands agree on fair compensation. Additionally, our escrow service ensures that both parties are protected throughout the process.
              </p>
            </details>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black bg-opacity-50 py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center space-x-4">
            <Link href="/terms-of-service" className="text-gray-400 hover:text-green-400">Terms of Service</Link>
            <Link href="/privacy" className="text-gray-400 hover:text-green-400">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
    </>
  )
}
