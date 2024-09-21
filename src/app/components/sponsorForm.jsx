import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button"
import { useState, useRef } from 'react';
import { toast } from "sonner";
import request from "@/request";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge";
import { InfoIcon , CheckCircleIcon, TrendingUpIcon } from "lucide-react"
import { useRouter } from "next/navigation";
import { convertFromUtcToLocal } from "@/utils";
import { useAppContext } from "@/context";

export default function Component({listing, setShowSponsorForm}) {
  const titleRef = useRef("");
  const timeStampRef = useRef("");
  const estPriceRef = useRef("");
  const durationRef = useRef(0);
  const [sendingProduct, setSendingProduct] = useState("NO");
  const [load, setLoad] = useState(false);
  const descriptionRef = useRef("");
  const speechRef = useRef("");
  const proposalRef = useRef("");
  const [agreed, setAgreed] = useState(false);
  const { name, company } = useAppContext();

  const router = useRouter();

  function validate(body) {
    let error = "";
    if(!body.title) error = "Purchase must have a title";
    else if(!body.timeStampOfAdvertisement) error = "Purchase must have a title";
    else if((parseInt(body.duration) <= 0)) error = "duration must be creater than 0 seconds";
    else if((parseFloat(body.price) <= 0)) error = "Price must be creater than $0.00";
    else if(!agreed) error = "Please accept the terms of service";
    else if(!body.proposal) error = "Please enter something for the proposal";

    if(error) {
      toast.error(error);
      setLoad(false);
      return false;
    }
    setLoad(false);
    return true;
  }

  async function sendRequest(e) {
    e.preventDefault()
    setLoad(true);

    const body = { 
      title: titleRef.current.value, 
      creatorSpeach: speechRef.current.value,
      timeStampOfAdvertisement: timeStampRef.current.value,
      productDescription: descriptionRef.current.value,
      duration: durationRef.current.value,
      price: estPriceRef.current.value,
      creatorName: listing.user.channel.name,
      proposal: proposalRef.current.value,
      sendingProduct: sendingProduct,
      postId: listing.id,
      pricingModel: listing.pricingModel,
      sponsorName: name,
      sponsorCompany: company.orginization
    };

    if(validate(body)) {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/requests`;
      const response = await request(url, "POST", body);

      if(response.status === 403 && response.error) { // this is they dont have stripe customer account
        toast.error("Please connect a payment method before making request. Go to settings to manage this.");
        return ;
      }

      //console.log(response);
      if(response && response.success) {
        toast.success("Request Sent");
        router.push("../../requests");
      } else {
        toast.error("Request Failed To Send");
      }
    }

    setLoad(false);
  }

  return (
    <div className="grid md:grid-cols-[1fr_300px] gap-8 w-full max-w-6xl mx-auto py-12 px-4 md:px-6">
    <div>
    <div className="space-y-4">
    <div className="flex items-center gap-4">
    <Link
    href="#"
    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              prefetch={false}
              onClick={() => setShowSponsorForm(false)}
            >
              <ChevronLeftIcon className="w-4 h-4" />
              Back
            </Link>
            <h1 className="text-3xl font-bold">Sponsor Listing</h1>
          </div>
          <p className="text-muted-foreground">
            Please take a few minutes to answer the following questions about your request.
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Title of Product/Service</Label>
              <Input ref={titleRef} id="name" placeholder="Enter product/service title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ad">Timestamp of advertisement (optional)</Label>
              <Input ref={timeStampRef} id="penguins" type="text" placeholder="First 2 minutes of the video" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">
                {listing.pricingModel === "FLAT" ? "How much are you willing to pay?"
                : "How much are you willing to pay per 1,000 views?"}
              </Label>
              <Input ref={estPriceRef} id="price" type="number" placeholder="$" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ad-duration">Ad Duration (seconds)</Label>
              <Input ref={durationRef} id="ad-duration" type="number" placeholder="Enter ad duration in seconds" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sample">Are you sending the Youtuber a sample product/service</Label>
                <Select value={sendingProduct} onValueChange={setSendingProduct}>
                      <SelectTrigger className="border-gray-600 text-gray-100">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NO">No</SelectItem>
                        <SelectItem value="YES">Yes</SelectItem>
                      </SelectContent>
                    </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="feedback">Product/Service</Label>
              <Input ref={descriptionRef} id="price" type="text" placeholder="Short Description of Product/Service" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="feedback">Request Proposal</Label>
            <Textarea ref={proposalRef} id="feedback" placeholder="Dear Youtuber, I would like to sponsor you..." rows={4} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="feedback">Advertisement Speech Requirements</Label>
            <Textarea ref={speechRef} id="feedback" placeholder="" rows={1} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newsletter">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="newsletter" 
                  checked={agreed}
                  onCheckedChange={(agree) => setAgreed(agree)}
                />
                <span>I have read and accept the <span onClick={()=>window.open(`${process.env.NEXT_PUBLIC_CLIENT_URL}/terms-of-service`, '_blank')}style={{color: "lightgreen", cursor: "pointer"}}>Terms of Service</span></span>
              </div>
            </Label>
          </div>
          <div className="flex justify-end">
            <Button disabled={load} onClick={(e) => sendRequest(e)} type="submit">Send Request</Button>
          </div>
        </form>
      </div>
      <div className="bg-background rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Summary</h2>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground">Pricing</div>
            <div className="font-medium">
    ${listing.estimatedPrice/100}{listing.pricingModel === "FLAT"? " flat rate" : " / 1K views"}
    </div>
          </div>
          {
            listing.pricingModel === "CPM" && 
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground">Estimated Price</div>
                <div className="font-medium">${(listing.estimatedViews / 1000 * listing.estimatedPrice/100).toLocaleString()}</div>
              </div>
          }
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground">Risk</div>
            {displayBadge(listing)}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground">Estimated Views</div>
            <div className="font-medium">
    <span className="flex">
    <EyeIcon className="mt-1 mr-1"/>{listing.estimatedViews}
    </span></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground">Category</div>
            <div className="font-medium">{listing.tag}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground">Upload date</div>
            <div className="font-medium">{convertFromUtcToLocal(listing.uploadDate)}</div>
          </div>
          <div className="flex items-center justify-between">

            <div className="font-small flex"style={{fontSize:"12px"}}>

            <InfoIcon className="w-4 h-4 mr-2 mt-1 text-green-400 flex-shrink-0" />
              Keep in mind you will not be charged after sending a request! Only after the request is accepted and you confirm the accept will you be charged.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChevronLeftIcon(props) {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

function displayBadge(listing) {
  const deviations = listing.user.channel.viewDeviations;
  const views = listing.estimatedViews;
  const details = [
    {backgroundColor: "green", color: "white"},
    {backgroundColor: "#FDDA0D", color: "black"},
    {backgroundColor: "red", color: "white"}
  ];
  const text = [
    "Low",
    "Medium",
    "High",
  ];
  for(let i = 0; i < deviations.length - 1; i++) {
    if(views >= deviations[i] && views <= deviations[i + 1]) {
      return <Badge
        variant="solid"
        className="px-3 py-1 rounded-md text-xs font-medium"
        style={details[i]}
      >
        { text[i] }
      </Badge>
    }
  }
  return <Badge
    variant="solid"
    className="px-3 py-1 rounded-md text-xs font-medium"
    style={{ backgroundColor: "red", color: "white" }}
  >
    High Risk
  </Badge>
}

function EyeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
