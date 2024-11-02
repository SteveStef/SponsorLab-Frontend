import Header from "../components/nav";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto max-w-4xl py-12 px-4 md:px-0">
        <h1 className="mb-8 text-3xl font-bold tracking-tight">SponsorLab Terms of Service</h1>
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="introduction">
            <AccordionTrigger className="text-xl font-semibold">1. Introduction</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <p>Welcome to SponsorLab! These Terms of Service (&quot;Terms&quot;) govern your access to and use of our website, platform, and services (collectively, the &quot;Services&quot;). By accessing or using our Services, you agree to comply with and be bound by these Terms. This Agreement is between you (&quot;you&quot; or &quot;User&quot;) and SponsorLab, Inc. (&quot;SponsorLab,&quot; &quot;we,&quot; or &quot;us&quot;), a company incorporated in Pennsylvania, USA.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="overview-of-services">
            <AccordionTrigger className="text-xl font-semibold">2. Overview of Services</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <p>SponsorLab is an online marketplace designed to connect video content creators (&quot;Creators&quot;) with sponsors (&quot;Sponsors&quot;). Through our platform, Creators can list their upcoming video content, and Sponsors can browse, purchase, and sponsor this content. SponsorLab facilitates these transactions by providing a platform that supports secure payments, content delivery, and dispute resolution.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="user-accounts">
            <AccordionTrigger className="text-xl font-semibold">3. User Accounts</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <h3 className="text-lg font-semibold">3.1 Eligibility</h3>
              <p>To use our Services, you must be at least 18 years old and capable of entering into legally binding contracts under applicable law. By registering for an account, you represent and warrant that you meet these requirements.</p>
              
              <h3 className="text-lg font-semibold">3.2 Account Registration</h3>
              <p>To access certain features of our Services, you must create an account. During registration, you agree to provide accurate, current, and complete information, and to update such information to keep it accurate, current, and complete. Creators must provide the email associated with their YouTube account to sync channel performance data.</p>
              
              <h3 className="text-lg font-semibold">3.3 Account Security</h3>
              <p>You are responsible for maintaining the confidentiality of your account credentials and are fully responsible for all activities that occur under your account. You agree to notify SponsorLab immediately if you suspect any unauthorized use of your account or any other security breach.</p>
              
              <h3 className="text-lg font-semibold">3.4 Account Termination</h3>
              <p>SponsorLab reserves the right to suspend or terminate your account, with or without notice, for any violation of these Terms or for any other reason at our sole discretion.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="listing-and-purchasing-content">
            <AccordionTrigger className="text-xl font-semibold">4. Listing and Purchasing Content</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <h3 className="text-lg font-semibold">4.1 Listing Content</h3>
              <p>Creators can list upcoming video content on SponsorLab&apos;s platform. Each listing must accurately describe the content, including any relevant details such as content type, intended audience, delivery timeline, licensing terms, and promised performance metrics (e.g., views, engagement). Listings must comply with our Content Guidelines and all applicable laws.</p>
              
              <h3 className="text-lg font-semibold">4.2 Syncing YouTube Data</h3>
              <p>By providing your YouTube email during registration, you authorize SponsorLab to access and sync your YouTube channel&apos;s performance data. This data will be used to verify the information provided in your listings and to ensure that promised metrics are met after content delivery.</p>
              
              <h3 className="text-lg font-semibold">4.3 Purchasing Content</h3>
              <p>Sponsors may browse and purchase content listed by Creators. Once a purchase is made, the transaction is binding, and the Creator is obligated to deliver the content as described in the listing, including meeting any promised performance metrics such as views.</p>
              
              <h3 className="text-lg font-semibold">4.4 Licensing and Ownership</h3>
              <p>By purchasing content, Sponsors obtain a license to use the content in accordance with the terms specified by the Creator. The Creator retains ownership of the content unless otherwise agreed in writing. The specific licensing terms must be clearly outlined in the listing and agreed upon by both parties.</p>
              
              <h3 className="text-lg font-semibold">4.5 Modifications and Cancellations</h3>
              <p>Any modifications to the content or cancellations of a purchase must be mutually agreed upon by the Creator and the Sponsor. SponsorLab provides tools for communication and modification requests, but all changes must be finalized before content delivery. Cancellation policies are subject to the Refund and Cancellation Policy outlined in Section 7.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="fees-and-payments">
            <AccordionTrigger className="text-xl font-semibold">5. Fees and Payments</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <h3 className="text-lg font-semibold">5.1 Service Fees</h3>
              <p>SponsorLab charges a service fee for each transaction facilitated through our platform. The fee structure is detailed on our Fees and Charges page. Service fees are deducted from the payment made by the Sponsor before the Creator is paid.</p>
              
              <h3 className="text-lg font-semibold">5.2 Payment Processing with Stripe</h3>
              <p>All payments are processed through Stripe, a third-party payment processor. By using our Services, you agree to comply with Stripe&apos;s terms and conditions. Sponsors must provide valid payment information at the time of purchase, which will be securely processed by Stripe.</p>
              
              <h3 className="text-lg font-semibold">5.3 Holding Payments</h3>
              <p>To ensure both parties are satisfied, SponsorLab holds payments in escrow until the content is delivered and the agreed-upon performance metrics (e.g., views, engagement) are verified. Payments will only be released to the Creator once the Sponsor confirms satisfaction with the delivery and the content&apos;s performance.</p>
              
              <h3 className="text-lg font-semibold">5.4 Payouts to Creators</h3>
              <p>Creators will receive payments after the content is delivered, approved by the Sponsor, and any promised metrics are met. Payouts will be made according to the payout schedule outlined on our Payouts page. SponsorLab reserves the right to withhold payments if there is a dispute regarding the content or if the Creator violates these Terms.</p>
              
              <h3 className="text-lg font-semibold">5.5 Taxes and Reporting</h3>
              <p>Each User is responsible for determining any applicable taxes arising from the use of our Services. SponsorLab is not responsible for collecting, reporting, or remitting any taxes arising from transactions made on our platform, except where required by law.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="content-and-conduct">
            <AccordionTrigger className="text-xl font-semibold">6. Content and Conduct</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <h3 className="text-lg font-semibold">6.1 User Conduct</h3>
              <p>Users agree to use the Services in a lawful, respectful, and responsible manner. You must not use the Services to engage in any illegal activities, fraudulent activities, or activities that violate the rights of others. You agree not to interfere with or disrupt the operation of the Services or the servers or networks used to make the Services available.</p>
              
              <h3 className="text-lg font-semibold">6.2 Prohibited Content</h3>
              <p>Users are prohibited from posting, uploading, or sharing any content that:</p>
              <ul className="list-disc pl-6">
                <li>Violates any law or regulation.</li>
                <li>Infringes upon the intellectual property rights of others.</li>
                <li>Contains hate speech, threats, harassment, or any form of discrimination.</li>
                <li>Is obscene, pornographic, or otherwise offensive.</li>
                <li>Contains malicious software, viruses, or any other harmful content.</li>
              </ul>
              <p>SponsorLab reserves the right to remove any content that violates these Terms or our Content Guidelines and to take appropriate action, including account suspension or termination.</p>
              
              <h3 className="text-lg font-semibold">6.3 Content Ownership and Rights</h3>
              <p>Creators retain ownership of the content they create and list on SponsorLab, subject to the license granted to the Sponsor upon purchase. By listing content, you represent and warrant that you have the necessary rights and permissions to offer and sell the content, and that the content does not infringe the rights of any third party.</p>
              
              <h3 className="text-lg font-semibold">6.4 Content Moderation</h3>
              <p>SponsorLab may, but is not obligated to, monitor and review content submitted by Users. We reserve the right to remove or modify any content that violates these Terms or our Content Guidelines. SponsorLab is not responsible for any failure to monitor or review content.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="refund-and-cancellation-policy">
            <AccordionTrigger className="text-xl font-semibold">7. Refund and Cancellation Policy</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <h3 className="text-lg font-semibold">7.1 Refund Eligibility</h3>
              <p>Refunds may be issued to Sponsors under specific circumstances, such as non-delivery of content, content that significantly deviates from the listing description, or mutual agreement between the Creator and the Sponsor. Refund requests must be made through SponsorLab&apos;s platform and are subject to approval.</p>
              
              <h3 className="text-lg font-semibold">7.2 Cancellation Policy</h3>
              <p>Cancellations of transactions must be mutually agreed upon by both the Creator and the Sponsor before the content is delivered. Once content has been delivered, cancellations are not permitted unless there is a clear breach of the terms outlined in the listing. SponsorLab reserves the right to charge cancellation fees as outlined on our Fees and Charges page.</p>
              
              <h3 className="text-lg font-semibold">7.3 Dispute Resolution for Refunds</h3>
              <p>In the event of a dispute regarding refunds, SponsorLab will act as a mediator. Both parties agree to follow the dispute resolution process outlined in Section 8. Refund decisions made by SponsorLab are final and binding.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="dispute-resolution">
            <AccordionTrigger className="text-xl font-semibold">8. Dispute Resolution</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <h3 className="text-lg font-semibold">8.1 Internal Resolution Process</h3>
              <p>SponsorLab encourages Users to resolve disputes directly through our platform&apos;s communication tools. If a resolution cannot be reached, either party may escalate the dispute to SponsorLab&apos;s support team.</p>
              
              <h3 className="text-lg font-semibold">8.2 Mediation</h3>
              <p>If a dispute arises between a Creator and a Sponsor, SponsorLab will provide mediation services to help resolve the issue. Both parties agree to participate in good faith in the mediation process.</p>
              
              <h3 className="text-lg font-semibold">8.3 Binding Arbitration</h3>
              <p>If a dispute cannot be resolved through mediation, it will be submitted to binding arbitration in accordance with the rules of the American Arbitration Association (AAA). The arbitration will take place in Pennsylvania, USA, and will be conducted in English. The arbitrator&apos;s decision will be final and binding on all parties.</p>
              
              <h3 className="text-lg font-semibold">8.4 Class Action Waiver</h3>
              <p>Users agree to waive any right to participate in a class action lawsuit or class-wide arbitration against SponsorLab. All disputes must be resolved on an individual basis.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="limitation-of-liability">
            <AccordionTrigger className="text-xl font-semibold">9. Limitation of Liability</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <p>To the fullest extent permitted by law, SponsorLab, its affiliates, and its officers, directors, employees, agents, and licensors will not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from:</p>
              <ul className="list-disc pl-6">
                <li>Your use of or inability to use the Services.</li>
                <li>Any unauthorized access to or use of our servers and/or any personal information stored therein.</li>
                <li>Any interruption or cessation of transmission to or from the Services.</li>
                <li>Any bugs, viruses, Trojan horses, or the like that may be transmitted to or through our Services by any third party.</li>
                <li>Any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made available through the Services.</li>
              </ul>
              <p>In no event shall SponsorLab&apos;s total liability to you for all damages, losses, and causes of action exceed the amount you have paid to SponsorLab in the last six (6) months, or fifty dollars ($50), whichever is greater.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="governing-law">
            <AccordionTrigger className="text-xl font-semibold">10. Governing Law</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <p>These Terms will be governed by and construed in accordance with the laws of the State of Pennsylvania, USA, without regard to its conflict of law principles. You agree to submit to the personal jurisdiction of the state and federal courts located in Pennsylvania for the purpose of litigating any disputes.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="changes-to-terms">
            <AccordionTrigger className="text-xl font-semibold">11. Changes to the Terms</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <p>SponsorLab reserves the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on our website. Your continued use of the Services after any changes constitutes your acceptance of the new Terms. It is your responsibility to review these Terms periodically for any updates.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="privacy-policy">
            <AccordionTrigger className="text-xl font-semibold">12. Privacy Policy</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <p>Your use of the Services is also governed by our Privacy Policy, which is incorporated by reference into these Terms. Our Privacy Policy explains how we collect, use, and share your personal information. By using our Services, you consent to the collection, use, and sharing of information as described in our Privacy Policy.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="content-guidelines">
            <AccordionTrigger className="text-xl font-semibold">13. Content Guidelines</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <p>At SponsorLab, we are committed to fostering a creative, respectful, and professional environment where sponsors and creators can collaborate effectively. These Content Guidelines outline the standards that all content must adhere to when using our platform. By participating on SponsorLab, you agree to comply with these guidelines.</p>
              
              <h3 className="text-lg font-semibold">13.1 General Content Standards</h3>
              <ul className="list-disc pl-6">
                <li><strong>Professionalism:</strong> All content uploaded to SponsorLab must be of professional quality, reflecting the creator&apos;s best work. Content should be well-produced, relevant, and in line with the standards expected by sponsors.</li>
                <li><strong>Accuracy:</strong> Ensure that all information provided in your content is accurate and not misleading. Misrepresenting facts, spreading false information, or manipulating data is strictly prohibited.</li>
                <li><strong>Respectful and Inclusive:</strong> Content must be respectful and inclusive, promoting a positive and welcoming environment for all users. Discriminatory, hateful, or offensive content based on race, ethnicity, gender, sexual orientation, religion, disability, or any other protected characteristic is not allowed.</li>
              </ul>
              
              <h3 className="text-lg font-semibold">13.2 Content Restrictions</h3>
              <ul className="list-disc pl-6">
                <li><strong>Inappropriate Material:</strong> Do not upload content that is obscene, pornographic, violent, or otherwise inappropriate.</li>
                <li><strong>Hate Speech:</strong> Content that promotes violence, hatred, or discrimination against individuals or groups based on protected characteristics is strictly prohibited.</li>
                <li><strong>Harassment:</strong> Any form of harassment, including bullying, stalking, or intimidation, will not be tolerated.</li>
              </ul>
              
              <h3 className="text-lg font-semibold">13.3 Intellectual Property</h3>
              <ul className="list-disc pl-6">
                <li><strong>Original Work:</strong> Only upload content that you have created or have the legal right to use. Respect the intellectual property rights of others, including copyrights, trademarks, and patents.</li>
                <li><strong>Proper Attribution:</strong> If your content includes third-party material (such as music, images, or videos), ensure that you have the necessary licenses and provide proper attribution where required.</li>
              </ul>
              
              <h3 className="text-lg font-semibold">13.4 Sponsorship-Specific Guidelines</h3>
              <ul className="list-disc pl-6">
                <li><strong>Clear and Transparent Promotions:</strong> Creators must clearly disclose any sponsorships or paid promotions within their content. Transparency is key to maintaining trust with your audience.</li>
                <li><strong>Consistency with Sponsor Guidelines:</strong> Ensure that your content aligns with the sponsor&apos;s brand values and adheres to any specific guidelines provided by the sponsor.</li>
                <li><strong>No Misleading Content:</strong> Do not make false claims or exaggerate the benefits of a sponsor&apos;s product or service.</li>
              </ul>
              
              <h3 className="text-lg font-semibold">13.5 Quality Assurance</h3>
              <p>SponsorLab reserves the right to review all content submitted through the platform. We may remove or request edits to content that does not meet our guidelines. Sponsors also have the right to review the content to ensure it meets their standards before approving it for publication.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="refund-and-cancellation-policy-detailed">
            <AccordionTrigger className="text-xl font-semibold">14. Refund and Cancellation Policy</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <p>At SponsorLab, we aim to facilitate successful collaborations between sponsors and creators. This Refund and Cancellation Policy outlines the terms and conditions under which sponsors may request a cancellation and receive a refund.</p>
              
              <h3 className="text-lg font-semibold">14.1 Confirmation Process</h3>
              <ul className="list-disc pl-6">
                <li><strong>Initial Request:</strong> Once a sponsor has submitted a sponsorship request to a creator, the creator must confirm their willingness to proceed. After this initial confirmation from the creator, a final confirmation is sent to the sponsor.</li>
                <li><strong>Final Confirmation:</strong> After the sponsor confirms, the sponsorship deal is locked in, and the sponsor&apos;s funds will be charged and held in our system. At this point, the creator will begin working on the sponsor&apos;s ad.</li>
              </ul>
              
              <h3 className="text-lg font-semibold">14.2 Cancellation Requests</h3>
              <ul className="list-disc pl-6">
                <li><strong>Sponsor-Initiated Cancellation:</strong> Sponsors may request to cancel the sponsorship after final confirmation, but this cancellation is not guaranteed. It is solely up to the creator to approve or decline the cancellation request.</li>
                <li><strong>Creator&apos;s Decision:</strong> If the creator approves the cancellation request, the sponsor will receive a full refund. If declined, the sponsorship will proceed as originally agreed, and no refund will be issued.</li>
              </ul>
              
              <h3 className="text-lg font-semibold">14.3 Late Delivery by Creator</h3>
              <p>If the creator fails to deliver the initial draft of the ad within the agreed-upon time frame (with a 24-hour grace period), an automatic refund and cancellation will be triggered.</p>
              
              <h3 className="text-lg font-semibold">14.4 Refund Process</h3>
              <p>Refunds will be processed within 5-7 business days after approval by the creator or when triggered automatically due to late delivery.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="community-guidelines">
            <AccordionTrigger className="text-xl font-semibold">15. Community Guidelines</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <p>These guidelines ensure everyone has a positive experience on SponsorLab. By using SponsorLab, you agree to follow these Community Guidelines. Violation of these guidelines may result in content removal, account suspension, or other actions as deemed necessary by SponsorLab.</p>
              
              <h3 className="text-lg font-semibold">15.1 Respectful Communication</h3>
              <ul className="list-disc pl-6">
                <li><strong>Be Respectful:</strong> Treat all members of the community with respect. Harassment, bullying, and hate speech are strictly prohibited.</li>
                <li><strong>Constructive Feedback:</strong> Provide feedback in a constructive manner.</li>
              </ul>
              
              <h3 className="text-lg font-semibold">15.2 Honest and Transparent Practices</h3>
              <ul className="list-disc pl-6">
                <li><strong>Accurate Information:</strong> Ensure all information you provide is truthful.</li>
                <li><strong>Disclosure:</strong> Disclose any sponsorships or affiliations.</li>
              </ul>
              
              <h3 className="text-lg font-semibold">15.3 Privacy and Security</h3>
              <ul className="list-disc pl-6">
                <li><strong>Respect Privacy:</strong> Do not share personal information publicly.</li>
                <li><strong>Security Practices:</strong> Do not engage in activities that compromise the platform&apos;s security.</li>
              </ul>
              
              <h3 className="text-lg font-semibold">15.4 Reporting Violations</h3>
              <p>Report any behavior or content that violates these guidelines to SponsorLab.</p>
            </AccordionContent>
          </AccordionItem>

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
        </Accordion>
      </div>
      <footer className="w-full bg-black bg-opacity-50 py-4">
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
