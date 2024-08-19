import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button"
import { useState, useRef } from 'react';
import { toast } from "sonner";
import request from "@/request";

export default function Component({listing}) {

  const titleRef = useRef("");
  const timeStampRef = useRef("");
  const estPriceRef = useRef("");
  const durationRef = useRef(0);
  const adTypeRef = useRef("");

  //const sendingSampleRef = useRef(false);

  const descriptionRef = useRef("");
  const speechRef = useRef("");
  const [agreed, setAgreed] = useState(false);

  function validate(body) {
    return true;
  }

  async function sendRequest(e) {
    e.preventDefault()

    const body = { 
      title: titleRef.current.value, 
      creatorSpeach: speechRef.current.value,
      timeStampOfAdvertisement: timeStampRef.current.value,
      duration: durationRef.current.value,
      price: estPriceRef.current.value,
      creatorName: listing.user.channel.name,
      postId: listing.id 
    };

    if(validate(body)) {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/requests`;
      const response = await request(url, "POST", body);
      console.log(response);
      if(response && response.success) {
        toast.success("Request Sent");
      } else {
        toast.error("Request Failed To Send");
      }
    }

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
              <Input ref={titleRef} id="name" placeholder="Dog toy" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ad">Timestamp of advertisement</Label>
              <Input ref={timeStampRef} id="penguins" type="text" placeholder="First 2 minutes of the video" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">How much are you willing to pay?</Label>
              <Input ref={estPriceRef} id="price" type="number" placeholder="$" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ad-duration">Ad Duration</Label>
              <Input ref={durationRef} id="ad-duration" type="number" placeholder="Enter ad duration in seconds" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ad-type">Ad Type</Label>
              <Input ref={adTypeRef} id="ad-type" placeholder="Enter type of advertisement" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sample">Are you sending the Youtuber a sample product/service</Label>
              <Input id="sample" placeholder="yes" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="feedback">Description of Product/Service</Label>
            <Textarea ref={descriptionRef} id="desc" placeholder="" rows={4} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="feedback">Advertisement Speech Requirements</Label>
            <Textarea ref={speechRef} id="feedback" placeholder="" rows={4} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newsletter">
              <div onClick={() => setAgreed(!agreed)} className="flex items-center gap-2">
                <Checkbox id="newsletter" />
                <span>I have read and accept the <Link href="../../terms-of-service" style={{color: "lightgreen"}}>Terms of Service</Link></span>
              </div>
            </Label>
          </div>
          <div className="flex justify-end">
            <Button onClick={(e) => sendRequest(e)} type="submit">Submit Feedback</Button>
          </div>
        </form>
      </div>
      <div className="bg-background rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Deal Highlights</h2>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground">Discount</div>
            <div className="font-medium">25% off</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground">Reviews</div>
            <div className="flex items-center gap-1 text-primary">
              <StarIcon className="w-4 h-4" />
              <StarIcon className="w-4 h-4" />
              <StarIcon className="w-4 h-4" />
              <StarIcon className="w-4 h-4" />
              <StarIcon className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">(4.2)</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground">Availability</div>
            <div className="font-medium text-green-500">In Stock</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground">Shipping</div>
            <div className="font-medium">Free Shipping</div>
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


function StarIcon(props) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}






