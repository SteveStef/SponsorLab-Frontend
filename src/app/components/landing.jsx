/**
 * v0 by Vercel.
 * @see https://v0.dev/t/WZWdYxiHhlz
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import Image from "next/image"
import Link from "next/link"
import Footer from "./footer";
import cuphead from "../../../public/black.png"
import SponsorLabLogo from "../../../public/SponsorLab.png"

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
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl" style={{color: "white"}}>
<Image src={SponsorLabLogo} alt="LOGO" style={{ width: '700px' }} />
            </h1>
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
      <section className="py-12 md:py-14 lg:py-22 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Posts</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our latest blog posts and articles.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
        <div className="cursor-pointer bg-background rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
          <div className="relative h-48 sm:h-46 md:h-54 lg:h-52 overflow-hidden">
            <Image
              src={cuphead}
              alt="Post Thumbnail"
              className="w-full h-full object-cover"
              width="576"
              height="284"
              style={{ aspectRatio: "576/284", objectFit: "cover" }}
            />
            <div className="absolute top-2 left-2 bg-primary-foreground text-primary px-2 py-1 rounded-md text-xs">
              Tech
            </div>
            <div className="absolute bottom-2 right-2 bg-primary-foreground text-primary px-2 py-1 rounded-md text-xs">
              Available
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">
                <EyeIcon className="w-4 h-4 inline-block mr-1" />
                50K views
              </div>
              <div className="flex items-center gap-1">
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Mastering the Latest AI Trends</h3>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                <CalendarIcon className="w-4 h-4 inline-block mr-1" />
                November 20, 2023
              </div>
              <div className="text-primary font-semibold">$29.99</div>
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


function CalendarIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}



function StarIcon(props) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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
