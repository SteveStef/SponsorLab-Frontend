
"use client";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Header from "../components/nav";
import request from "@/request";
import { useRef } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context";

export default function Component() {
  const email = useRef("");
  const password = useRef("");
  const { setDescription, setEmail, setAccountType, setName, setRole, setOrganization, setAuth, setProfilePic } = useAppContext();
  const router = useRouter();

  async function login(e) {
    e.preventDefault();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/sponsor/sign-in`;
    const body = {
      email: email.current.value,
      password: password.current.value
    };

    if(!body.email || !body.password) {
      toast.error("Please enter a valid email and password");
      return;
    }

    const response = await request(url, "POST", body);
    console.log(response);
    if(!response || response.status === 500) toast.error("Internal server error, please try again later");
    else if(!response.success) {
      toast.error(response.message);
    } else if(response && response.success) {
      document.cookie = `token=${response.token}; SameSite=None; Secure; Path=/`;
      setAuth(true);
      setRole("SPONSOR");
      setName(response.body.name);
      setEmail(email.current.value);
      setProfilePic(response.body.profileImage);
      setAccountType(response.body.accountType);
      setOrganization(response.body.company.orginization);
      setDescription(response.body.bio);
      router.push("/listings");
    }
  }

  const googleLoginSponsor = () => window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/google/auth/sponsor`;
  const googleLoginYoutuber = () => window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/google/auth/creator`;

  return (
    <div>
      <Header />
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md w-full space-y-6">
    <form onSubmit={login} className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in to your account</h1>
          <p className="mt-2 text-muted-foreground">Enter your email and password below to access your account.</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input ref={email} id="email" type="email" required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="text-sm text-muted-foreground hover:underline" prefetch={false}>
                Forgot password?
              </Link>
            </div>
            <Input ref={password} id="password" type="password" required />
          </div>
          <Button onClick={login} type="submit" className="w-full">
            Sign in
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
<div className="relative flex justify-center text-sm">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
      </form>
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={googleLoginYoutuber}
            variant="outline"
            className="flex w-full items-center justify-center rounded-md border border-muted py-2 px-4 text-sm font-medium text-muted-foreground hover:bg-muted"
          >
            <ChromeIcon className="mr-2 h-5 w-5" />
            Google (YouTuber)
          </Button>
          <Button
            onClick={googleLoginSponsor}
            variant="outline"
            className="flex w-full items-center justify-center rounded-md border border-muted py-2 px-4 text-sm font-medium text-muted-foreground hover:bg-muted"
          >
            <ChromeIcon className="mr-2 h-5 w-5" />
            Google (Sponsor)
          </Button>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          Dont have an account?{" "}
          <Link href="./signup" className="font-medium hover:underline" prefetch={false}>
            Create account
          </Link>
    </div></div>
    </div></div>
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
