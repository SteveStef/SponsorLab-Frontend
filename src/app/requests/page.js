"use client";
import Header from "../components/nav"
import Request from "../components/requests";
import SponsorRequest from "../components/sponsorRequest";
import { useAppContext } from "@/context";

export default function Listings() {

  const { role } = useAppContext();

  return (
    <div className="py-20">
      <Header />
      {
        role === "CREATOR" ?
        <Request />
        :<SponsorRequest />
      }
    </div>
  )
}
