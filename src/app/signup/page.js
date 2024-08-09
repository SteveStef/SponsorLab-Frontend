"use client";
import Link from "next/link"
import Header from "../components/nav";

export default function Component() {
  return (
    <div>
      <Header />
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Join Our Platform</h1>
        <p className="text-muted-foreground">Choose your role to get started.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <Link
          href="./signup/youtuber"
          className="cursor-pointer inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Sign Up as YouTuber
        </Link>
        <Link
          href="./signup/sponsor"
          className="cursor-pointer inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Sign Up as Sponsor
        </Link>
      </div>
      <div>
        <Link
          href="./login"
          className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Already have an account? Login
        </Link>
      </div>
    </div>
    </div>
  )
}
