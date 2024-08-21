"use client";

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import request from "@/request";
import { useRouter } from 'next/navigation';
import { useAppContext } from "@/context";
import { useSearchParams } from 'next/navigation';

export default function Signup() {

  const params = useSearchParams();
  const [err, setErr] = useState("");
  
  useEffect(() => {
    if(!params || !params.get("error")) return;
    setErr(params.get("error").replaceAll("_"," "));
  }, [params]);

  useEffect(() => {
    if(err) toast.error(err);
  }, [err]);

  const email = useRef("");
  const password = useRef("");
  const confirmPassword = useRef("");
  const name = useRef("");

  const router = useRouter();
  const { setOrganization, setAuth, setName, setEmail, setRole, setAccountType } = useAppContext();
  const [loading, setLoading] = useState(false);

  function validateInputs(email, password, confirmPassword, name) {
    let isValid = true;
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid Email");
      isValid = false;
    }
    if (password.length < 8) {
      toast.error("Password must be 8 character long");
      isValid = false;
    }
    if (!password.trim()) {
      toast.error("Invalid Password");
      isValid = false;
    }
    if (password !== confirmPassword) {
      toast.error("passwords do not match");
      isValid = false;
    }

    if (!name.trim()) {
      toast.error("name is required");
      isValid = false;
    }
    setLoading(false);
    return isValid;
  }

  async function signup(e) {
    e.preventDefault();
    setLoading(true);
    let em = email.current.value;
    let pass = password.current.value;
    let confirmPass = confirmPassword.current.value;
    let n = name.current.value;

    if(!validateInputs(em,pass,confirmPass, n)) return;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/sponsor/sign-up`;
    const body = { email: em, password: pass, name: n, role:"SPONSOR", accountType: "EMAIL"};
    const response = await request(url, "POST", body);

    if(!response || response.status === 500) toast.error("Internal server error, please try again later");
    if(!response.success) {
      toast.error(response.message);
    } else if(response && response.success) {
      document.cookie = `token=${response.token}; SameSite=None; Secure; Path=/`;
      setAuth(true);
      setRole("SPONSOR");
      setName(n);
      setEmail(em);
      setAccountType("EMAIL");
      setOrganization(response.oranization); // change this 
      router.push("/listings");
    }
    setLoading(false);
  }

  const handleSponsorSignup = () => window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/google/auth/sponsor`;

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md w-full space-y-6">
        <form disabled={loading} onSubmit={signup} className="space-y-6" >
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign up as a sponsor</h1>
            <p className="mt-2 text-muted-foreground">Sign up to get started today!</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input ref={name} id="name" type="text" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Company Email (Prefered)</Label>
              <Input ref={email} type="email" placeholder="example@company.com" required />
            </div>
            <div className="space-y-4">

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Password</Label>
                </div>
                <Input ref={password} id="password" type="password" required />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Confirm Password</Label>
                </div>
                <Input ref={confirmPassword} id="confirm-password" type="password" required />
              </div>
            </div>
            <Button disabled={loading} onClick={signup} type="submit" className="w-full">
              { loading? "working..." : "Sign Up" }
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

        </form>

        <Button onClick={handleSponsorSignup} variant="outline" className="w-full">
          <ChromeIcon className="mr-2 h-4 w-4" />
          Sign up with Google
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="../login" className="font-medium hover:underline" prefetch={false}>
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
