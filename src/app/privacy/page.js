import Header from "../components/nav";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link"

export default function PrivacyPolicy() {
  return (
    <>
    <Header />
    <br></br>
    <br></br>
    <br></br>
    <div className="container mx-auto max-w-4xl py-12 px-4 md:px-0">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">SponsorLab Policies</h1>
      <Accordion type="single" collapsible className="w-full space-y-4">
        
        <AccordionItem value="privacy-policy">
          <AccordionTrigger className="text-xl font-semibold">Privacy Policy</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <section>
              <h2 className="text-lg font-semibold mb-2">1. Introduction</h2>
              <p>SponsorLab, Inc. (&quot;SponsorLab,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our website, platform, and services (collectively, the &quot;Services&quot;). By accessing or using our Services, you agree to this Privacy Policy.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-2">2. Information We Collect</h2>
              <h3>2.1 Personal Information</h3>
              <p><strong>Creators:</strong> We collect information such as email, name, channel ID, subscriber count, YouTube description, video count, total views, joined date, Google profile picture, YouTube banner, and banking details managed through Stripe. <br /><strong>Sponsors:</strong> We collect information such as name, email, organization, website, description, audience age, budget range, goals, and credit card information managed through Stripe.</p>
              <h3>2.2 Automatically Collected Information</h3>
              <ul>
                <li>Usage Data: Information about interactions with our Services, including content viewed, features used, content listed, and engagement metrics. This data aligns our algorithm to match sponsors with creators effectively.</li>
                <li>Device Information: Data about devices used to access our Services, including IP address, browser type, operating system, and device identifiers.</li>
                <li>Cookies and Tracking Technologies: Session cookies (JWT), web beacons, and similar technologies are used to collect data on usage patterns and personalize the user experience.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-2">3. Data Collection and Usage</h2>
              <p>3.1 How We Collect Personal Information: We collect data through forms, user interactions, and third-party services like Google OAuth2.0 API.<br />3.2 Why We Collect Personal Information: We collect data to enable account creation, recommend sponsors to creators, personalize user experience, process transactions, send updates, and improve our Services.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-2">4. Data Sharing</h2>
              <p>4.1 Sharing with Third Parties: We only share your information with third-party service providers, such as Stripe, necessary for payment processing and related services.<br />4.2 Data Sharing Specifics: We share your name and email with Stripe for secure payment processing.<br />4.3 Data Sales: We do not sell your personal information to third parties.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-2">5. Data Storage and Security</h2>
              <p>Our database is hosted on Railway, with image storage on AWS, and Google Cloud for managing login information. We use industry-standard encryption, firewalls, and access controls to protect your data, with all passwords encrypted and strict login session controls in place.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-2">6. User Rights</h2>
              <p>You have the right to access, correct, and delete your personal information. Contact us at support@sponsorlab.co to exercise your rights.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-2">7. International Users</h2>
              <p>We currently do not have users outside the USA and do not engage in international data transfers.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-2">8. Children&#8217;s Privacy</h2>
              <p>Our Services are not intended for children under 13. We do not knowingly collect personal information from children under 13. Age verification is conducted via a consent screen.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-2">13. Google User Data and OAuth Compliance</h2>
              <p>SponsorLab uses Google OAuth2.0 API to facilitate access to specific YouTube data for content creators using our platform. We are committed to complying with Google’s privacy and security standards when accessing, storing, and using user data obtained via Google services.</p>
            </section>
          </AccordionContent>
        </AccordionItem>


        <AccordionItem value="content-guidelines">
          <AccordionTrigger className="text-xl font-semibold">Content Guidelines</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <section>
              <h2 className="text-lg font-semibold mb-2">13.1 General Content Standards</h2>
              <ul>
                <li>Professionalism: All content uploaded to SponsorLab must be of professional quality.</li>
                <li>Accuracy: Ensure all information in your content is accurate and not misleading.</li>
                <li>Respectful and Inclusive: Content must promote a positive and inclusive environment.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-2">13.2 Content Restrictions</h2>
              <ul>
                <li>Inappropriate Material: Do not upload content that is obscene, pornographic, or otherwise inappropriate.</li>
                <li>Hate Speech: Content that promotes violence or hatred is strictly prohibited.</li>
              </ul>
            </section>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="refund-cancellation">
          <AccordionTrigger className="text-xl font-semibold">Refund and Cancellation Policy</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p>At SponsorLab, we aim to facilitate successful collaborations between sponsors and creators. This Refund and Cancellation Policy outlines the terms and conditions under which sponsors may request a cancellation and receive a refund.</p>
            <section>
              <h2 className="text-lg font-semibold mb-2">14.1 Confirmation Process</h2>
              <ul>
                <li>Initial Request: Once a sponsor submits a sponsorship request, the creator must confirm willingness to proceed.</li>
                <li>Final Confirmation: After the sponsor confirms, the sponsorship deal is locked in, and funds are held in our system.</li>
              </ul>
            </section>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="community-guidelines">
          <AccordionTrigger className="text-xl font-semibold">Community Guidelines</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p>These guidelines ensure everyone has a positive experience on SponsorLab. By using SponsorLab, you agree to follow these Community Guidelines.</p>
            <section>
              <h2 className="text-lg font-semibold mb-2">15.1 Respectful Communication</h2>
              <ul>
                <li>Be Respectful: Treat all members of the community with respect. Harassment, bullying, and hate speech are strictly prohibited.</li>
                <li>Constructive Feedback: Provide feedback constructively.</li>
              </ul>
            </section>
          </AccordionContent>
        </AccordionItem>

      </Accordion>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Contact Us</h2>
        <p>If you have any questions about these policies or need to contact us for any reason, please reach out to us at:</p>
        <address>SponsorLab, Inc., Villanova, PA, 19085, support@sponsorlab.co, 610-781-7003</address>
      </div>
    </div>
     <footer className="fixed bottom-0 w-full bg-black bg-opacity-50 py-4">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center space-x-4">
            <Link href="/terms-of-service" className="text-gray-400 hover:text-green-400">Terms of Service</Link>
            <Link href="/privacy" className="text-gray-400 hover:text-green-400">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
