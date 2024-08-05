/**
 * v0 by Vercel.
 * @see https://v0.dev/t/1TVytj6Dt4N
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Pricing() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container grid gap-8 px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center space-y-4">
          <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">Pricing</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Want More Attention?
          </h2>
          <p className="text-muted-foreground md:text-xl/relaxed">
            Choose the plan that fits your YouTube channels needs and start connecting with sponsors today.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-background p-6 grid gap-6">
            <CardHeader>
              <CardTitle>Basic</CardTitle>
              <CardDescription>Get started with sponsored placements for your channel.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="text-4xl font-bold">
                $99<span className="text-sm font-normal text-muted-foreground">/mo</span>
              </div>
              <ul className="grid gap-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 fill-primary" />
                  Up to 3 sponsored placements per month
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 fill-primary" />
                  Basic analytics
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 fill-primary" />
                  Email support
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get Started</Button>
            </CardFooter>
          </Card>
          <Card className="bg-background p-6 grid gap-6">
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <CardDescription>Expand your reach with more sponsored placements.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="text-4xl font-bold">
                $199<span className="text-sm font-normal text-muted-foreground">/mo</span>
              </div>
              <ul className="grid gap-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 fill-primary" />
                  Up to 8 sponsored placements per month
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 fill-primary" />
                  Advanced analytics
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 fill-primary" />
                  Email and chat support
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get Started</Button>
            </CardFooter>
          </Card>
          <Card className="bg-background p-6 grid gap-6">
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>Unlock maximum growth with our enterprise plan.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="text-4xl font-bold">
                $499<span className="text-sm font-normal text-muted-foreground">/mo</span>
              </div>
              <ul className="grid gap-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 fill-primary" />
                  Unlimited sponsored placements
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 fill-primary" />
                  Dedicated account manager
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 fill-primary" />
                  Premium analytics and reporting
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get Started</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}