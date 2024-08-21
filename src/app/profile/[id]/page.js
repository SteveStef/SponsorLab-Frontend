"use client";
import Header from "../../components/nav"
import Profile from "@/app/components/profile";
import SponsorProfileCreate from "@/app/components/sub-component/sponsorProfileCreate";
import { useAppContext } from "@/context";

export default function ListingDetail({params}) {
  const { role, company } = useAppContext();
  if(role === "CREATOR") {
    return (
      <div style={{marginTop: "5%", marginBottom: "5%"}}>
        <Header />
        <Profile id={params.id}/>
        <br></br>
      </div>
    )
  } else {
    return (
      <div style={{marginTop: "5%", marginBottom: "5%"}}>
        <Header />
        {
          !company.setup ? 
        <SponsorProfileCreate />
          : <div></div>
        }
      </div>
    )
  }
}
