/**
 * v0 by Vercel.
 * @see https://v0.dev/t/WZWdYxiHhlz
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import Image from "next/image"
import Link from "next/link"
import Footer from "./footer";
import cuphead from "../../../public/connect.jpg"

export default function Component() {
  return (
    <div className="flex flex-col min-h-dvh">
      <header className="relative w-full h-[70vh] overflow-hidden">
        <Image
          src={cuphead}
          alt="Banner"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ aspectRatio: "1920/1080", objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-primary-foreground">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl" style={{color: "white"}}>SponsorLab</h1>
          <p className="max-w-[700px] mt-4 text-lg md:text-xl" style={{color: "white"}}>
            The future of connecting Youtubers and Sponsors!
          </p>
          <Link
            href="./signup"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 mt-8"
            prefetch={false}
          >
            Get Started
          </Link>
        </div>
      </header>
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-16">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Us</h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We are a team of passionate individuals dedicated to empowering people to reach their full potential.
                Our mission is to provide the tools, resources, and support you need to achieve your goals and live your
                best life.
              </p>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Learn More
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-muted p-4">
                <UsersIcon className="h-8 w-8 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">Community</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with like-minded individuals and share your journey.
                </p>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <RocketIcon className="h-8 w-8 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">Resources</h3>
                <p className="text-sm text-muted-foreground">Explore our library of guides, tutorials, and tools.</p>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <BriefcaseIcon className="h-8 w-8 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">Coaching</h3>
                <p className="text-sm text-muted-foreground">Get personalized guidance from our team of experts.</p>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <LayersIcon className="h-8 w-8 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">Workshops</h3>
                <p className="text-sm text-muted-foreground">Attend our interactive workshops to learn new skills.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Posts</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our latest blog posts and articles.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
            <div className="rounded-lg bg-background p-4 shadow-sm transition-all hover:shadow-md">
              <Image
                src={cuphead}
                alt="Post Thumbnail"
                width={400}
                height={225}
                className="rounded-lg object-cover"
                style={{ aspectRatio: "400/225", objectFit: "cover" }}
              />
              <div className="mt-4 space-y-2">
                <h3 className="text-lg font-medium">Unlocking the Power of Mindfulness</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div>
                    <EyeIcon className="h-4 w-4 mr-1 inline" />
                    <span>2.3K views</span>
                  </div>
                  <div>
                    <UserIcon className="h-4 w-4 mr-1 inline" />
                    <span>Jane Doe</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-background p-4 shadow-sm transition-all hover:shadow-md">
              <Image
                src={cuphead}
                alt="Post Thumbnail"
                width={400}
                height={225}
                className="rounded-lg object-cover"
                style={{ aspectRatio: "400/225", objectFit: "cover" }}
              />
              <div className="mt-4 space-y-2">
                <h3 className="text-lg font-medium">Mastering the Art of Productivity</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div>
                    <EyeIcon className="h-4 w-4 mr-1 inline" />
                    <span>1.7K views</span>
                  </div>
                  <div>
                    <UserIcon className="h-4 w-4 mr-1 inline" />
                    <span>John Smith</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-background p-4 shadow-sm transition-all hover:shadow-md">
              <Image
                src={cuphead}
                alt="Post Thumbnail"
                width={400}
                height={225}
                className="rounded-lg object-cover"
                style={{ aspectRatio: "400/225", objectFit: "cover" }}
              />
              <div className="mt-4 space-y-2">
                <h3 className="text-lg font-medium">The Power of Positive Thinking</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div>
                    <EyeIcon className="h-4 w-4 mr-1 inline" />
                    <span>3.1K views</span>
                  </div>
                  <div>
                    <UserIcon className="h-4 w-4 mr-1 inline" />
                    <span>Sarah Lee</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-background p-4 shadow-sm transition-all hover:shadow-md">
              <Image
                src={cuphead}
                alt="Post Thumbnail"
                width={400}
                height={225}
                className="rounded-lg object-cover"
                style={{ aspectRatio: "400/225", objectFit: "cover" }}
              />
              <div className="mt-4 space-y-2">
                <h3 className="text-lg font-medium">Navigating the Entrepreneurial Journey</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div>
                    <EyeIcon className="h-4 w-4 mr-1 inline" />
                    <span>4.5K views</span>
                  </div>
                  <div>
                    <UserIcon className="h-4 w-4 mr-1 inline" />
                    <span>Michael Johnson</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

function BriefcaseIcon(props) {
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
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  )
}


function EyeIcon(props) {
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function LayersIcon(props) {
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
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  )
}


function RocketIcon(props) {
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
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}


function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}


function UsersIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
