"use client";
import Header from "../../components/nav"
import Profile from "@/app/components/profile";
import SponsorProfileCreate from "@/app/components/sub-component/sponsorProfileCreate";
import SponsorProfile from "@/app/components/sponsorProfile"; 
import { useAppContext } from "@/context";
import {useState,useEffect} from "react";

export default function ListingDetail({params}) {
  const { role, company } = useAppContext();
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    if(company && params) {
      setOwner(company.id === params.id);
    }
  },[company, params])

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
          company && owner &&!company.setup ? 
        <SponsorProfileCreate />
          : company && !owner && !company.setup ? 
          <div>Not Found</div> :
            company && company.setup &&
            <SponsorProfile params={params}/>
        }
      </div>
    )
  }
}
