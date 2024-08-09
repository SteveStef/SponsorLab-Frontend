"use client";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import request from "@/request";
import Header from "../../../components/nav";
import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup({ params }) {

  const router = useRouter();

  const email = useRef("");
  const orginization = useRef("");
  const name = useRef("");

  const { setAuth, setName, setOrganization, setEmail, setRole, setAccountType } = useAppContext();
  const [loading, setLoading] = useState(true);

  async function loadInfo() {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/google/sponsor-info/${params.id}`;
      const opt = { method: "GET" };
      const response = await fetch(url, opt);
      const data = await response.json();
      if(data && data.success) {
        email.current.value = data.body.email;
        name.current.value = data.body.name;
      } else {
        router.push("/login");
      }
    } catch(err) {
      toast.error("unknown code");
      router.push("/login");
      console.log(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    if(params) loadInfo();
  },[params]);

  async function signup(e) {
    e.preventDefault();
    setLoading(true);
    let em = email.current.value;
    let org = orginization.current.value;
    let n = name.current.value;
    if(!n || !org) {
      toast.error("Organization and/or name can't be empty");
      setLoading(false);
      return;
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/sponsor/sign-up`;
    const body = { email: em, password: "google", name: n, role:"SPONSOR", orginizationName: org, accountType: "GOOGLE" };
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
      setAccountType("GOOGLE");
      setOrganization(org);
      router.push("/listings");
    }
    setLoading(false);
  }

  return (
    <>
    <Header />
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md w-full space-y-6">
        <form disabled={loading} onSubmit={signup} className="space-y-6" >
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign up as a sponsor</h1>
            <p className="mt-2 text-muted-foreground">One More Step!</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input ref={name} id="name" type="text" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input disabled ref={email} type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="orginization">Organization</Label>
              <Input ref={orginization} id="orginization" type="text" required />
            </div>
            <Button disabled={loading} onClick={signup} type="submit" className="w-full">
              Create Account
            </Button>
          </div>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="../../login" className="font-medium hover:underline" prefetch={false}>
            Login
          </Link>
        </div>
        </form>
      </div>
    </div>

    </>
  )
}
