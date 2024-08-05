/**
 * v0 by Vercel.
 * @see https://v0.dev/t/TK7UVQPbP2b
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import Header from "../components/nav";
import Footer from "../components/footer";

export default function Component() {
  const [isSponsor, setIsSponsor] = useState(null);

  if(isSponsor === true) {
    return <div>
      <Header />
      <Signup />
    </div>
  } else if(isSponsor === false) { // this will return the link for google
    return <div>
      <Header />
      <SignupYoutuber />
    </div>
  }

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
          href="#"
          className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
          onClick={() => setIsSponsor(false)}
        >
          Sign Up as YouTuber
        </Link>
        <Link
          href="#"
          className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
          onClick={() => setIsSponsor(true)}
        >
          Sign Up as Sponsor
        </Link>
      </div>
      <div>
        <Link
          href="./Login"
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

function Signup(props) {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in to your account</h1>
          <p className="mt-2 text-muted-foreground">Enter your email and password below to access your account.</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input id="password" type="password" required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Confirm Password</Label>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <Button variant="outline" className="w-full">
          <ChromeIcon className="mr-2 h-4 w-4" />
          Sign up with Google
        </Button>
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="./Login" className="font-medium hover:underline" prefetch={false}>
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

function ChromeIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  )
}

function SignupYoutuber() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign up for an account</h1>
          <p className="mt-2 text-muted-foreground">Create your account by signing in with Google, Be sure to use the same google account as your youtube channel</p>
        </div>
        <div className="space-y-4">
          <Button variant="outline" className="w-full">
            <ChromeIcon className="mr-2 h-4 w-4" />
            Sign up with Google
          </Button>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="./Login" className="font-medium hover:underline" prefetch={false}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
