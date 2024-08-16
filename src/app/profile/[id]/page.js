import Header from "../../components/nav"
import Profile from "@/app/components/profile";
//import { useAppContext } from "@/context";

export default function ListingDetail({params}) {
  return (
    <div style={{marginTop: "5%", marginBottom: "5%"}}>
      <Header />
      <Profile id={params.id}/>
      <br></br>
    </div>
  )
}
