
"use client";
import Organizations from "../../components/organization";
import EditProfileOrg from "../../components/editSponsorProfile";
import Header from "../../components/nav"
import SponsorProfile from "@/app/components/sponsorProfile";

export default function ListingDetail({params}) {
  return (
    <div style={{ marginTop: "5%", marginBottom: "5%" }}>
      <Header />
    <SponsorProfile params={params} />
    </div>
  )
}
