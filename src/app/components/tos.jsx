export default function Component() {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 md:px-0">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Terms of Service</h1>
      <div className="space-y-8">
        <section>
          <h2 className="mb-4 text-xl font-semibold">User Conduct</h2>
          <p className="text-muted-foreground">
            By using our platform, you agree to use the service in a lawful and ethical manner. This includes refraining
            from activities that infringe on the rights of others, such as harassment, hate speech, or the distribution
            of illegal content. We reserve the right to suspend or terminate accounts that violate these terms.
          </p>
        </section>
        <section>
          <h2 className="mb-4 text-xl font-semibold">Intellectual Property</h2>
          <p className="text-muted-foreground">
            All content and materials on our platform, including but not limited to text, images, logos, and software,
            are the property of our company or our licensors. You may not reproduce, modify, or distribute this content
            without our express written permission.
          </p>
        </section>
        <section>
          <h2 className="mb-4 text-xl font-semibold">Privacy</h2>
          <p className="text-muted-foreground">
            We take the privacy of our users seriously. We collect and use personal information in accordance with our
            Privacy Policy, which you can access at [privacy-policy-link]. By using our platform, you consent to the
            collection and use of your personal data as described in the policy.
          </p>
        </section>
        <section>
          <h2 className="mb-4 text-xl font-semibold">Termination</h2>
          <p className="text-muted-foreground">
            We reserve the right to suspend or terminate your account at any time, with or without cause, and with or
            without notice. Upon termination, you will no longer have access to your account or any content or data
            associated with it. We are not responsible for any loss of data or content resulting from account
            termination.
          </p>
        </section>
      </div>
    </div>
  )
}
