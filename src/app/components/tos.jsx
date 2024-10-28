
import Link from "next/link";
export default function Component() {
  return (
    <>
<div className="container mx-auto max-w-3xl py-12 px-4 md:px-0">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">SponsorLab Terms of Service</h1>
      <div className="space-y-8">
        <section>
          <h2 className="mb-4 text-xl font-semibold">1. Introduction</h2>
          <p className="text-muted-foreground">
            Welcome to SponsorLab! These Terms of Service (&quot;Terms&quot;) govern your access to and use of our website, platform, and services (collectively, the &quot;Services&quot;). By accessing or using our Services, you agree to comply with and be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.
          </p>
          <p className="mt-4 text-muted-foreground">
            This Agreement is between you (&quot;you&quot; or &quot;User&quot;) and SponsorLab, Inc. (&quot;SponsorLab,&quot; &quot;we,&quot; or &quot;us&quot;), a company incorporated in Pennsylvania, USA. Please read these Terms carefully before using our Services.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">2. Overview of Services</h2>
          <p className="text-muted-foreground">
            SponsorLab is an online marketplace designed to connect video content creators (&quot;Creators&quot;) with sponsors (&quot;Sponsors&quot;). Through our platform, Creators can list their upcoming video content, and Sponsors can browse, purchase, and sponsor this content. SponsorLab facilitates these transactions by providing a platform that supports secure payments, content delivery, and dispute resolution.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">3. User Accounts</h2>
          <h3 className="mb-2 text-lg font-medium">3.1 Eligibility</h3>
          <p className="text-muted-foreground">
            To use our Services, you must be at least 18 years old and capable of entering into legally binding contracts under applicable law. By registering for an account, you represent and warrant that you meet these requirements.
          </p>
          <h3 className="mt-4 mb-2 text-lg font-medium">3.2 Account Registration</h3>
          <p className="text-muted-foreground">
            To access certain features of our Services, you must create an account. During registration, you agree to provide accurate, current, and complete information, and to update such information to keep it accurate, current, and complete.
          </p>
          <p className="mt-2 text-muted-foreground">
            <strong>YouTube Email:</strong> For Creators, registration requires the use of the email address associated with your YouTube account. This is necessary to sync your YouTube data with our platform and to pull channel performance data such as views, subscribers, and engagement metrics.
          </p>
          <h3 className="mt-4 mb-2 text-lg font-medium">3.3 Account Security</h3>
          <p className="text-muted-foreground">
            You are responsible for maintaining the confidentiality of your account credentials and are fully responsible for all activities that occur under your account. You agree to notify SponsorLab immediately if you suspect any unauthorized use of your account or any other security breach. SponsorLab is not liable for any loss or damage arising from your failure to safeguard your account information.
          </p>
          <h3 className="mt-4 mb-2 text-lg font-medium">3.4 Account Termination</h3>
          <p className="text-muted-foreground">
            SponsorLab reserves the right to suspend or terminate your account, with or without notice, for any violation of these Terms or for any other reason at our sole discretion.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">4. Listing and Purchasing Content</h2>
          <h3 className="mb-2 text-lg font-medium">4.1 Listing Content</h3>
          <p className="text-muted-foreground">
            Creators can list upcoming video content on SponsorLab&apos;s platform. Each listing must accurately describe the content, including any relevant details such as content type, intended audience, delivery timeline, licensing terms, and promised performance metrics (e.g., views, engagement). Listings must comply with our Content Guidelines and all applicable laws.
          </p>
          <h3 className="mt-4 mb-2 text-lg font-medium">4.2 Syncing YouTube Data</h3>
          <p className="text-muted-foreground">
            By providing your YouTube email during registration, you authorize SponsorLab to access and sync your YouTube channel&apos;s performance data. This data will be used to verify the information provided in your listings and to ensure that promised metrics are met after content delivery.
          </p>
          <h3 className="mt-4 mb-2 text-lg font-medium">4.3 Purchasing Content</h3>
          <p className="text-muted-foreground">
            Sponsors may browse and purchase content listed by Creators. Once a purchase is made, the transaction is binding, and the Creator is obligated to deliver the content as described in the listing, including meeting any promised performance metrics such as views.
          </p>
          <h3 className="mt-4 mb-2 text-lg font-medium">4.4 Licensing and Ownership</h3>
          <p className="text-muted-foreground">
            By purchasing content, Sponsors obtain a license to use the content in accordance with the terms specified by the Creator. The Creator retains ownership of the content unless otherwise agreed in writing. The specific licensing terms must be clearly outlined in the listing and agreed upon by both parties.
          </p>
          <h3 className="mt-4 mb-2 text-lg font-medium">4.5 Modifications and Cancellations</h3>
          <p className="text-muted-foreground">
            Any modifications to the content or cancellations of a purchase must be mutually agreed upon by the Creator and the Sponsor. SponsorLab provides tools for communication and modification requests, but all changes must be finalized before content delivery. Cancellation policies are subject to the Refund and Cancellation Policy outlined in Section 7.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">5. Fees and Payments</h2>
          <h3 className="mb-2 text-lg font-medium">5.1 Service Fees</h3>
          <p className="text-muted-foreground">
            SponsorLab charges a service fee for each transaction facilitated through our platform. The fee structure is detailed on our Fees and Charges page. Service fees are deducted from the payment made by the Sponsor before the Creator is paid.
          </p>
          <h3 className="mt-4 mb-2 text-lg font-medium">5.2 Payment Processing with Stripe</h3>
          <p className="text-muted-foreground">
            All payments are processed through Stripe, a third-party payment processor. By using our Services, you agree to comply with Stripe&apos;s terms and conditions. Sponsors must provide valid payment information at the time of purchase, which will be securely processed by Stripe.
          </p>
          <h3 className="mt-4 mb-2 text-lg font-medium">5.3 Holding Payments</h3>
          <p className="text-muted-foreground">
            To ensure both parties are satisfied, SponsorLab holds payments in escrow until the content is delivered and the agreed-upon performance metrics (e.g., views, engagement) are verified. Payments will only be released to the Creator once the Sponsor confirms satisfaction with the delivery and the content&apos;s performance.
          </p>
          <h3 className="mt-4 mb-2 text-lg font-medium">5.4 Payouts to Creators</h3>
          <p className="text-muted-foreground">
            Creators will receive payments after the content is delivered, approved by the Sponsor, and any promised metrics are met. Payouts will be made according to the payout schedule outlined on our Payouts page. SponsorLab reserves the right to withhold payments if there is a dispute regarding the content or if the Creator violates these Terms.
          </p>
          <h3 className="mt-4 mb-2 text-lg font-medium">5.5 Taxes and Reporting</h3>
          <p className="text-muted-foreground">
            Each User is responsible for determining any applicable taxes arising from the use of our Services. SponsorLab is not responsible for collecting, reporting, or remitting any taxes arising from transactions made on our platform, except where required by law.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">6. Content and Conduct</h2>
          <h3 className="mb-2 text-lg font-medium">6.1 User Conduct</h3>
          <p className="text-muted-foreground">
            Users agree to use the Services in a lawful, respectful, and responsible manner. You must not use the Services to engage in any illegal activities, fraudulent activities, or activities that violate the rights of others. You agree not to interfere with or disrupt the operation of the Services or the servers or networks used to make the Services available.
          </p>
          <h3 className="mt-4 mb-2 text-lg font-medium">6.2 Prohibited Content</h3>
          <p className="text-muted-foreground">
            Users are prohibited from posting, uploading, or sharing any content that:
          </p>
          <ul className="list-disc list-inside text-muted-foreground ml-4">
            <li>Violates any law or regulation.</li>
            <li>Infringes upon the intellectual property rights of others.</li>
            <li>Contains hate speech, threats, harassment, or any form of discrimination.</li>
            <li>Is obscene, pornographic, or otherwise offensive.</li>
            <li>Contains malicious software, viruses, or any other harmful content.</li>
          </ul>
          <p className="mt-2 text-muted-foreground">
            SponsorLab reserves the right to remove any content that violates these Terms or our Content Guidelines and to take appropriate action, including account suspension or termination.
          </p>
          <h3 className="mt-4 mb-2 text-lg font-medium">6.3 Content Ownership and Rights</h3>
          <p className="text-muted-foreground">
            Creators retain ownership of the content they create and list on SponsorLab, subject to the license granted to the Sponsor upon purchase. By listing content, you represent and warrant that you have the necessary rights and permissions to offer and sell the content, and that the content does not infringe the rights of any third party.
          </p>
          <h3 className="mt-4 mb-2 text-lg font-medium">6.4 Content Moderation</h3>
          <p className="text-muted-foreground">
            SponsorLab may, but is not obligated to, monitor and review content submitted by Users. We reserve the right to remove or modify any content that violates these Terms or our Content Guidelines. SponsorLab is not responsible for any failure to monitor or review content.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">7. Refund and Cancellation Policy</h2>
          <h3 className="mb-2 text-lg font-medium">7.1 Refund Eligibility</h3>
          <p className="text-muted-foreground">
            Refunds may be issued to Sponsors under specific circumstances, such as non-delivery of content, content that significantly deviates from the listing description, or mutual agreement between the Creator and the Sponsor. Refund requests must be made through SponsorLab&apos;s platform and are subject to approval.
          </p>
          <h3 className="mt-4 mb-2 text-lg font-medium">7.2 Cancellation Policy</h3>
          <p className="text-muted-foreground">
            Cancellations of transactions must be mutually agreed upon by both the Creator and the Sponsor before the content is delivered. Once content has been delivered, cancellations are not permitted unless there is a clear breach of the terms outlined in the listing. SponsorLab reserves the right to charge cancellation fees as outlined on our Fees and Charges page.
          </p>
          <h3 className="mt-4 mb-2 text-lg font-medium">7.3 Dispute Resolution for Refunds</h3>
          <p className="text-muted-foreground">
            In the event of a dispute regarding refunds, SponsorLab will act as a mediator. Both parties agree to follow the dispute resolution process outlined in Section 8. Refund decisions made by SponsorLab are final and binding.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">8. Dispute Resolution</h2>
          <h3 className="mb-2 text-lg font-medium">8.1 Internal Resolution Process</h3>
          <p className="text-muted-foreground">
            SponsorLab encourages Users to resolve disputes directly through our platform&apos;s communication tools. If a resolution cannot be reached, either party may escalate the dispute to SponsorLab&apos;s support team.
          </p>
          <h3 className="mt-4 mb-2 text-lg font-medium">8.2 Mediation</h3>
          <p className="text-muted-foreground">
            If a dispute arises between a Creator and a Sponsor, SponsorLab will provide mediation services to help resolve the issue. Both parties agree to participate in good faith in the mediation process.
          </p>
          <h3 className="mt-4 mb-2 text-lg font-medium">8.3 Binding Arbitration</h3>
          <p className="text-muted-foreground">
            If a dispute cannot be resolved through mediation, it will be submitted to binding arbitration in accordance with the rules of the American Arbitration Association (AAA). The arbitration will take place in Pennsylvania, USA, and will be conducted in English. The arbitrator&apos;s decision will be final and binding on all parties.
          </p>
          <h3 className="mt-4 mb-2 text-lg font-medium">8.4 Class Action Waiver</h3>
          <p className="text-muted-foreground">
            Users agree to waive any right to participate in a class action lawsuit or class-wide arbitration against SponsorLab. All disputes must be resolved on an individual basis.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">9. Limitation of Liability</h2>
          <p className="text-muted-foreground">
            To the fullest extent permitted by law, SponsorLab, its affiliates, and its officers, directors, employees, agents, and licensors will not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="list-disc list-inside text-muted-foreground ml-4">
            <li>Your use of or inability to use the Services.</li>
            <li>Any unauthorized access to or use of our servers and/or any personal information stored therein.</li>
            <li>Any interruption or cessation of transmission to or from the Services.</li>
            <li>Any bugs, viruses, Trojan horses, or the like that may be transmitted to or through our Services by any third party.</li>
            <li>Any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made available through the Services.</li>
          </ul>
          <p className="mt-2 text-muted-foreground">
            In no event shall SponsorLab&apos;s total liability to you for all damages, losses, and causes of action exceed the amount you have paid to SponsorLab in the last six (6) months, or fifty dollars ($50), whichever is greater.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">10. Governing Law</h2>
          <p className="text-muted-foreground">
            These Terms will be governed by and construed in accordance with the laws of the State of Pennsylvania, USA, without regard to its conflict of law principles. You agree to submit to the personal jurisdiction of the state and federal courts located in Pennsylvania for the purpose of litigating any disputes.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">11. Changes to the Terms</h2>
          <p className="text-muted-foreground">
            SponsorLab reserves the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on our website. Your continued use of the Services after any changes constitutes your acceptance of the new Terms. It is your responsibility to review these Terms periodically for any updates.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">12. Privacy Policy</h2>
          <p className="text-muted-foreground">
            Your use of the Services is also governed by our Privacy Policy, which is incorporated by reference into these Terms. Our Privacy Policy explains how we collect, use, and share your personal information. By using our Services, you consent to the collection, use, and sharing of information as described in our Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">13. User Responsibilities and Obligations</h2>
          <h3 className="mb-2 text-lg font-medium">13.1 Compliance with Laws</h3>
          <p className="text-muted-foreground">
            You agree to comply with all applicable laws, rules, and regulations in connection with your use of the Services. You are solely responsible for ensuring that your use of the Services, including any content you provide, does not violate any laws or infringe upon the rights of others.
          </p>
          <h3 className="mt-4 mb-2 text-lg font-medium">13.2 Reporting Violations</h3>
          <p className="text-muted-foreground">
            If you become aware of any violation of these Terms, including any prohibited content or unlawful activity, you must report it to SponsorLab immediately. SponsorLab reserves the right to investigate any reported violations and take appropriate action, including removing content and terminating accounts.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">14. Intellectual Property Rights</h2>
          <h3 className="mb-2 text-lg font-medium">14.1 SponsorLab&apos;s Intellectual Property</h3>
          <p className="text-muted-foreground">
            The Services, including the SponsorLab website, logo, design, software, and content, are the property of SponsorLab and are protected by copyright, trademark, and other intellectual property laws. You may not use, reproduce, distribute, or create derivative works from any part of the Services without SponsorLab&apos;s express written permission.
          </p>
          <h3 className="mt-4 mb-2 text-lg font-medium">14.2 User-Generated Content</h3>
          <p className="text-muted-foreground">
            By posting or uploading content to the Services, you grant SponsorLab a worldwide, non-exclusive, royalty-free, transferable, sublicensable license to use, reproduce, distribute, prepare derivative works of, display, and perform the content in connection with the operation of the Services and SponsorLab&apos;s business.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">15. Third-Party Services</h2>
          <h3 className="mb-2 text-lg font-medium">15.1 Integration with Third-Party Services</h3>
          <p className="text-muted-foreground">
            The Services may integrate with or provide links to third-party services, such as Stripe for payment processing. Your use of such third-party services is subject to the terms and conditions of those third parties. SponsorLab is not responsible for the actions, content, or services provided by any third party.
          </p>
          <h3 className="mt-4 mb-2 text-lg font-medium">15.2 No Endorsement</h3>
          <p className="text-muted-foreground">
            The inclusion of any third-party service or link on the Services does not imply endorsement or recommendation by SponsorLab. You use such third-party services at your own risk.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">16. Miscellaneous</h2>
          <h3 className="mb-2 text-lg font-medium">16.1 Entire Agreement</h3>
          <p className="text-muted-foreground">
            These Terms, together with the Privacy Policy and any other legal notices published by SponsorLab, constitute the entire agreement between you and SponsorLab regarding the use of the Services. These Terms supersede any prior agreements or understandings, whether written or oral.
          </p>
          <h3 className="mt-4 mb-2 text-lg font-medium">16.2 Severability</h3>
          <p className="text-muted-foreground">
            If any provision of these Terms is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions will remain in full force and effect. The invalid or unenforceable provision will be deemed modified to the extent necessary to make it valid and enforceable.
          </p>
          <h3 className="mt-4 mb-2 text-lg font-medium">16.3 No Waiver</h3>
          <p className="text-muted-foreground">
            The failure of SponsorLab to enforce any right or provision of these Terms will not be deemed a waiver of such right or provision. Any waiver of any provision of these Terms will be effective only if in writing and signed by an authorized representative of SponsorLab.
          </p>
          <h3 className="mt-4 mb-2 text-lg font-medium">16.4 Assignment</h3>
          <p className="text-muted-foreground">
            You may not assign or transfer these Terms, by operation of law or otherwise, without SponsorLab&apos;s prior written consent. Any attempt by you to assign or transfer these Terms without such consent will be null and void. SponsorLab may assign or transfer these Terms, in whole or in part, without restriction.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">17. Contact Information</h2>
          <p className="text-muted-foreground">
            If you have any questions about these Terms or need to contact us for any reason, please reach out to us at:
          </p>
          <address className="mt-2 text-muted-foreground not-italic">
            SponsorLab LLC, Inc.<br />
            Villanova, PA, 19085<br />
            support@sponsorlab.co<br />
            610-781-7003
          </address>
        </section>
      </div>
    </div>
     <footer className="fixed bottom-0 w-full bg-black py-4">
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
