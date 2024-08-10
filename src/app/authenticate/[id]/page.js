"use client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppContext } from "@/context";
import request from "@/request";

export default function Authenticating({params}) {
  const router = useRouter();
  const { setEmail, setAccountType, setName, setRole, setOrganization, setAuth, setProfilePic } = useAppContext();

  async function authenticateUser(id) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/google/account/${id}`;
    const response = await request(url, "GET", null);
    //console.log(response);
    if(!response || response.status === 500) toast.error("Internal server error, please try again later");
    if(!response.success && response.status !== 400) {
      toast.error(response.message);
    } else if(response && response.success) {
      document.cookie = `token=${response.token}; SameSite=None; Secure; Path=/`;
      setAuth(true);
      setRole(response.body.role);
      setName(response.body.name);
      setEmail(response.body.email);
      setAccountType(response.body.accountType);
      if(response.body.role === "SPONSOR") {
        setProfilePic(response.body.profileImage || "");
        setOrganization(response.body.company.orginization);
      } else {
        setOrganization(response.body.channel.name);
        setProfilePic(response.body.channel.imageUrl || "");
      }
    }
    router.push("/listings");
  }

  useEffect(() => {
    const { id } = params;
    if(id) authenticateUser(id);
  },[params]);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-6">
        <div className="animate-spin rounded-full border-4 border-primary border-t-transparent h-16 w-16" />
        <h2 className="text-2xl font-bold text-foreground">Syncing with Google...</h2>
        <p className="text-muted-foreground">Please wait while we connect your account.</p>
      </div>
    </div>
  )
}
