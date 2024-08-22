import Header from "../../components/nav"
import ListingDetails from "@/app/components/listingDetails";

export default function ListingDetail({params}) {
  return (
    <div style={{marginTop: "4%"}}>
      <Header />
      <ListingDetails params={params}/>
    </div>
  )
}
