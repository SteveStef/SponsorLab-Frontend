"use client";
import Link from "next/link"
import Header from "../../components/nav";
import { Button } from "@/components/ui/button"

export default function SignupYoutuber() {
  const handleYoutuberSignup = () => window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/google/auth/creator`;
  return (
    <>
    <Header />
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign up for an account</h1>
          <p className="mt-2 text-muted-foreground">Create your account by signing in with Google, Be sure to use the same google account as your youtube channel</p>
        </div>
        <div className="space-y-4">
          <Button onClick={handleYoutuberSignup} variant="outline" className="w-full">
            <ChromeIcon className="mr-2 h-4 w-4" />
            Sign up with Google
          </Button>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="./login" className="font-medium hover:underline" prefetch={false}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
    </>
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