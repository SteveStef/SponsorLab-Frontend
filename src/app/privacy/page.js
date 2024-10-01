
import Header from "../components/nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Privacy() {
  return (
    <div style={{ marginTop: "5%", marginBottom: "5%" }}>
      <Header />
<div className="container mx-auto max-w-3xl py-12 px-4 md:px-0">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">SponsorLab Privacy Policy</h1>
      <div className="space-y-8">
        <section>
          <h2 className="mb-4 text-xl font-semibold">1. Introduction</h2>
          <p className="text-muted-foreground">
            SponsorLab, Inc. (&quot;SponsorLab,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our website, platform, and services (collectively, the &quot;Services&quot;). By accessing or using our Services, you agree to this Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">2. Information We Collect</h2>
          <h3 className="mb-2 text-lg font-medium">2.1 Personal Information</h3>
          <h4 className="mb-1 font-medium">Creators Information:</h4>
          <p className="text-muted-foreground">
            Email, name, channel ID, subscriber count, YouTube description, video count, total views, joined date, Google profile picture, YouTube banner, banking details managed through Stripe.
          </p>
          <h4 className="mt-2 mb-1 font-medium">Sponsor Information:</h4>
          <p className="text-muted-foreground">
            Name, email, organization, website, description, audience age, budget range, goals, and credit card information managed through Stripe.
          </p>
          <h3 className="mt-4 mb-2 text-lg font-medium">2.2 Automatically Collected Information</h3>
          <ul className="list-disc list-inside text-muted-foreground">
            <li>Usage Data: Information about interactions with our Services.</li>
            <li>Device Information: Data about devices used to access our Services.</li>
            <li>Cookies and Tracking Technologies: Session cookies (JWT), web beacons, and similar technologies.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">3. Data Collection and Usage</h2>
          <h3 className="mb-2 text-lg font-medium">3.1 How We Collect Personal Information</h3>
          <p className="text-muted-foreground">
            Through forms, user interactions, and third-party services like Google OAuth2.0 API.
          </p>
          <h3 className="mt-4 mb-2 text-lg font-medium">3.2 Why We Collect Personal Information</h3>
          <p className="text-muted-foreground">
            For account creation, recommending sponsors to creators, personalizing user experience, processing transactions, sending updates, and improving our Services.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">4. Data Sharing</h2>
          <h3 className="mb-2 text-lg font-medium">4.1 Sharing with Third Parties</h3>
          <p className="text-muted-foreground">
            We share your information with third-party service providers, such as Stripe, for payment processing and other services.
          </p>
          <h3 className="mt-4 mb-2 text-lg font-medium">4.2 Data Sales</h3>
          <p className="text-muted-foreground">
            We do not sell your personal information to third parties.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">5. Data Storage and Security</h2>
          <p className="text-muted-foreground">
            Our database is hosted on Railway, with image storage on AWS, and Google Cloud for managing login information. All passwords are encrypted, with strict login session controls. We use industry-standard encryption, firewalls, and access controls to protect your data.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">6. User Rights</h2>
          <p className="text-muted-foreground">
            You have the right to access, correct, and delete your personal information. Contact us at support@sponsorlab.co to exercise your rights.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">7. International Users</h2>
          <p className="text-muted-foreground">
            We currently do not have users outside the USA and do not engage in international data transfers.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">8. Children&apos;s Privacy</h2>
          <p className="text-muted-foreground">
            Our Services are not intended for children under 13. We do not knowingly collect personal information from children under 13. Age verification is conducted via a consent screen.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">9. Updates to This Privacy Policy</h2>
          <p className="text-muted-foreground">
            We may update this Privacy Policy and will notify you of significant changes through the website or via email.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">10. Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about this Privacy Policy or our data practices, please contact us at:
          </p>
          <address className="mt-2 text-muted-foreground not-italic">
            SponsorLab, Inc.<br />
            Villanova, PA, 19085<br />
            Support@sponsorlab.co<br />
            610-781-7003
          </address>
        </section>
      </div>
    </div>
    </div>
  )
}
