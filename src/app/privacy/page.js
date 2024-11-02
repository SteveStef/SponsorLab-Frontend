import Header from "../components/nav"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
    <br></br>
    <br></br>
      <div className="container mx-auto max-w-4xl py-12 px-4 md:px-0">
        <h1 className="mb-8 text-3xl font-bold tracking-tight">SponsorLab Privacy Policy</h1>
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="introduction">
            <AccordionTrigger className="text-xl font-semibold">1. Introduction</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <p>SponsorLab, Inc. (&quot;SponsorLab,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our website, platform, and services (collectively, the &quot;Services&quot;). By accessing or using our Services, you agree to this Privacy Policy.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="information-we-collect">
            <AccordionTrigger className="text-xl font-semibold">2. Information We Collect</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <p>We collect various types of information from and about users of our Services, including:</p>
              <h3 className="text-lg font-semibold">2.1 Personal Information</h3>
              <h4 className="font-semibold">Creators Information:</h4>
              <ul className="list-disc pl-6">
                <li>What We Collect: Email, name, channel ID, subscriber count, YouTube description, video count, total views, joined date, Google profile picture, YouTube banner, banking details managed through Stripe.</li>
                <li>Sensitive Information: Credit card numbers and banking details are collected but managed securely through Stripe.</li>
              </ul>
              <h4 className="font-semibold">Sponsor Information:</h4>
              <ul className="list-disc pl-6">
                <li>What We Collect: Name, email, organization, website, description, audience age, budget range, goals, and credit card information managed through Stripe.</li>
              </ul>
              <h4 className="font-semibold">Automatic Collection:</h4>
              <ul className="list-disc pl-6">
                <li>YouTube Data: Automatically collected performance metrics from creators&apos; YouTube accounts.</li>
              </ul>
              <h3 className="text-lg font-semibold">2.2 Automatically Collected Information</h3>
              <ul className="list-disc pl-6">
                <li>Usage Data: Information about interactions with our Services, including content viewed, features used, content listed, and engagement metrics. This data aligns our algorithm to match sponsors with creators effectively.</li>
                <li>Device Information: Data about devices used to access our Services, including IP address, browser type, operating system, and device identifiers.</li>
                <li>Cookies and Tracking Technologies: Session cookies (JWT), web beacons, and similar technologies are used to collect data on usage patterns and personalize the user experience.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data-collection-and-usage">
            <AccordionTrigger className="text-xl font-semibold">3. Data Collection and Usage</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <h3 className="text-lg font-semibold">3.1 How We Collect Personal Information</h3>
              <p>Methods: Through forms, user interactions, and third-party services like Google OAuth2.0 API.</p>
              <h3 className="text-lg font-semibold">3.2 Why We Collect Personal Information</h3>
              <p>Purpose: For account creation, recommending sponsors to creators, personalizing user experience, processing transactions, sending updates, and improving our Services.</p>
              <h3 className="text-lg font-semibold">3.3 Use of Cookies and Tracking Technologies</h3>
              <p>Types Used: Session cookies (JWT) for managing sessions and security.</p>
              <h3 className="text-lg font-semibold">3.4 How We Use the Data Collected</h3>
              <ul className="list-disc pl-6">
                <li>Account Creation: To create and manage user accounts.</li>
                <li>Recommendation Engine: To match sponsors with creators based on content and audience data.</li>
                <li>Personalization: To tailor recommendations and user experience.</li>
                <li>Transaction Processing: To securely process payments via Stripe.</li>
                <li>Service Updates: To send important updates about our Services.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data-sharing">
            <AccordionTrigger className="text-xl font-semibold">4. Data Sharing</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <h3 className="text-lg font-semibold">4.1 Sharing with Third Parties</h3>
              <p>Service Providers: We share your information with third-party service providers, such as Stripe, for payment processing and other services.</p>
              <h3 className="text-lg font-semibold">4.2 Data Sharing Specifics</h3>
              <p>Stripe: We share your name and email with Stripe for payment processing.</p>
              <h3 className="text-lg font-semibold">4.3 Data Sales</h3>
              <p>No Sale of Data: We do not sell your personal information to third parties.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data-storage-and-security">
            <AccordionTrigger className="text-xl font-semibold">5. Data Storage and Security</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <h3 className="text-lg font-semibold">5.1 Data Storage</h3>
              <p>Location: Our database is hosted on Railway, with image storage on AWS, and Google Cloud for managing login information.</p>
              <h3 className="text-lg font-semibold">5.2 Data Protection</h3>
              <p>Security Measures: All passwords are encrypted, with strict login session controls. We use industry-standard encryption, firewalls, and access controls to protect your data.</p>
              <h3 className="text-lg font-semibold">5.3 Data Retention</h3>
              <p>Duration: Personal information is retained until you delete your account or as necessary to fulfill legal and service-related obligations.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="user-rights">
            <AccordionTrigger className="text-xl font-semibold">6. User Rights</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <h3 className="text-lg font-semibold">6.1 Rights Regarding Data</h3>
              <p>Access, Correction, Deletion: You have the right to access, correct, and delete your personal information.</p>
              <h3 className="text-lg font-semibold">6.2 Exercising Rights</h3>
              <p>How: Contact us at support@sponsorlab.co to exercise your rights.</p>
              <h3 className="text-lg font-semibold">6.3 Opt-Out Rights</h3>
              <p>Marketing Communications: Opt-out by following unsubscribe instructions in emails or contacting us at support@sponsorlab.co.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="international-users">
            <AccordionTrigger className="text-xl font-semibold">7. International Users</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <h3 className="text-lg font-semibold">7.1 International Data Compliance</h3>
              <p>No International Data Transfers: We currently do not have users outside the USA and do not engage in international data transfers.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="childrens-privacy">
            <AccordionTrigger className="text-xl font-semibold">8. Children&apos;s Privacy</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <p>SponsorLab is not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have inadvertently collected such information, we will take steps to delete it promptly.</p>
              <ul className="list-disc pl-6">
                <li>Age Screening: We implement an age verification mechanism to prevent children under 13 from signing up.</li>
                <li>Parental Consent: If we inadvertently collect information from users under 13, we will obtain verifiable parental consent before any data collection.</li>
                <li>Notice to Parents: We provide clear notice to parents about our data practices if information from children under 13 is collected.</li>
                <li>Data Deletion: We have a process in place to promptly delete any data collected from children under 13.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data-breach-response">
            <AccordionTrigger className="text-xl font-semibold">9. Data Breach Response</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <h3 className="text-lg font-semibold">9.1 Response Plan</h3>
              <p>Actions: In case of a data breach, we will investigate promptly, take appropriate action, and notify affected users and authorities as required by law.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="third-party-services">
            <AccordionTrigger className="text-xl font-semibold">10. Third-Party Services</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <h3 className="text-lg font-semibold">10.1 Third-Party Integrations</h3>
              <p>Services Used: We integrate with services like Stripe for payment processing.</p>
              <h3 className="text-lg font-semibold">10.2 Compliance with Privacy Standards</h3>
              <p>Contracts and Agreements: We ensure third-party compliance through contracts and privacy agreements.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="updates-to-policy">
            <AccordionTrigger className="text-xl font-semibold">11. Updates to This Privacy Policy</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <h3 className="text-lg font-semibold">11.1 Notification of Changes</h3>
              <p>How: We may update this Privacy Policy and will notify you of significant changes through the website or via email.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="google-user-data">
            <AccordionTrigger className="text-xl font-semibold">12. Google User Data and OAuth Compliance</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <p>SponsorLab uses Google OAuth2.0 API to facilitate access to specific YouTube data for content creators using our platform. We are committed to complying with Google&apos;s privacy and security standards when accessing, storing, and using user data obtained via Google services.</p>
              <h3 className="text-lg font-semibold">12.1 Access and Use of Google User Data</h3>
              <ul className="list-disc pl-6">
                <li>Scope of Access: SponsorLab accesses YouTube performance metrics (such as views, likes, and other relevant video data) and user information through Google OAuth2.0 API for the purpose of verifying creator information and supporting the platform&apos;s recommendation engine.</li>
                <li>Use of Data: The Google user data we collect is used exclusively for facilitating interactions between content creators and sponsors. We do not use this data for any purposes beyond those disclosed in this Privacy Policy and in accordance with Google&apos;s Limited Use Requirements.</li>
                <li>Data Storage: Any data collected from Google is stored securely within our system, using industry-standard encryption and security practices.</li>
              </ul>
              <h3 className="text-lg font-semibold">12.2 Google API Compliance</h3>
              <ul className="list-disc pl-6">
                <li>OAuth Consent Screen: SponsorLab uses an OAuth consent screen that clearly explains what Google user data is accessed and how it will be used. The Privacy Policy linked on this consent screen is identical to the one provided on our homepage.</li>
                <li>Privacy Policy Alignment: The same Privacy Policy is linked on both the OAuth consent screen and SponsorLab&apos;s homepage, ensuring consistency in the information provided to users.</li>
                <li>Limited Use Requirement Compliance: SponsorLab adheres to Google&apos;s Limited Use requirements by ensuring that Google user data is not shared with third parties without user consent, is not used for marketing purposes outside the functionality of our platform, and is handled only in ways disclosed in this Privacy Policy.</li>
              </ul>
              <h3 className="text-lg font-semibold">12.3 Transparency and Updates</h3>
              <ul className="list-disc pl-6">
                <li>In-Product Privacy Notifications: SponsorLab provides in-app privacy notifications that are prominently displayed within the user interface. These notifications are updated to reflect any changes in how we handle Google user data.</li>
                <li>Keeping Data Up to Date: We regularly review and update our Privacy Policy and in-product privacy notifications to ensure they accurately reflect how we collect, use, and share Google user data.</li>
              </ul>
              <h3 className="text-lg font-semibold">12.4 User Control and Data Deletion</h3>
              <ul className="list-disc pl-6">
                <li>User Control: Users can revoke SponsorLab&apos;s access to their Google data at any time via their Google account settings. Upon revocation, we will no longer have access to this data and will promptly remove it from our systems, except where retention is required by law.</li>
                <li>Data Deletion: If a user chooses to delete their account with SponsorLab, any associated Google data will be permanently deleted from our systems.</li>
              </ul>
              <h3 className="text-lg font-semibold">12.5 Data Security</h3>
              <p>Security Measures: SponsorLab implements strict security measures, including encryption and secure storage practices, to protect Google user data from unauthorized access, loss, or misuse.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
          <address className="not-italic">
            
            SponsorLab, Inc.<br />
            Villanova, PA, 19085<br />
            <a href="mailto:Support@sponsorlab.co" className="text-blue-600 hover:underline">Support@sponsorlab.co</a><br />
            <a href="tel:+16107817003" className="text-blue-600 hover:underline">610-781-7003</a>
          </address>
        </div>
      </div>
      <footer className="w-full bg-black bg-opacity-50 py-4">
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
