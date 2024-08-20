"use client";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link";
import { useState, useEffect } from "react";
import request from "@/request";
import Image from "next/image";
import SponsorForm from "../components/sponsorForm";
import { PlayIcon, ThumbsUpIcon, UserIcon, VideoIcon } from "lucide-react"

export default function Component({ params }) {

  const [listing, setListing] = useState(null);
  const [showSponsorForm, setShowSponsorForm] = useState(false);
  const [viewRanges, setViewRanges] = useState([]);

  async function fetchListing() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/posts/${params.id}`;
    const response = await request(url, "GET", null);
    if(response && response.success) {
      setListing(response.body);
      let tmp = [];
      let dev = response.body.user.channel.viewDeviations;
      const normalDist = [2.2, 13.6, 68.2, 13.6, 2.1, 0.1];

      const skips = 6 - dev.length;
      let start = 0;

      for(let i = 0; i < skips; i++) {
        start += normalDist[i];
      }

      for(let i = 0; i < dev.length - 1; i++) {
        let range = dev[i] + "-" + dev[i + 1];
        tmp.push({ range, probability: (normalDist[i + skips] + start).toFixed(1)});
        start = 0;
      }

      tmp.push({ range: ">"+dev[dev.length-1], probability: normalDist[normalDist.length-1]})

      setViewRanges(tmp);
    }
    console.log(response);
  }

  useEffect(() => {
    if(params.id) fetchListing();
  }, [params]);

  if(listing && showSponsorForm) return <SponsorForm listing={listing} />

  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-7xl px-4 mx-auto py-6">
      <div className="grid gap-4">
        <div className="rounded-xl overflow-hidden">
          <Image
            src={listing && listing.thumbnailName || "/place.svg"}
            alt="Video Thumbnail"
            width={800}
            height={450}
            className="w-full aspect-video object-cover"
          />
        </div>
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold">{listing && listing.title}</h1>
          <div className="text-xs text-muted-foreground"> 
            Due on {listing && new Date(listing.uploadDate).toDateString()}
            </div>
          <div className="text-muted-foreground">
            {listing && listing.description}

          </div>
          <div className="flex items-center gap-4">
            {
              listing && 
                displayBadge(listing)
            }

            <div className="text-4xl font-bold">
              ${listing && (listing.estimatedPrice||0).toLocaleString()}
            </div>

            <div className="flex items-center text-muted-foreground">
              <Eye className="w-4 h-4 mr-1" />
              <span>Est. {listing && (listing.estimatedViews || 0).toLocaleString()} views</span>
            </div>

          </div>
        </div>
        <div className="flex flex-wrap gap-2">

          {
            listing && listing.tag && 
            <Badge variant="secondary">{listing.tag}</Badge>
          }

        </div>
        <Button onClick={() => setShowSponsorForm(true)} className="mt-4">Sponsor this listing</Button>
      </div>
      <div className="grid gap-4">
        {/* New section: View Range Probabilities */}
        <Card className="p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">View Range Probabilities</h2>
          <div className="space-y-2">
            {viewRanges.map((item, index) => (
              <div key={index} className="flex items-center">
                <span className="w-24 text-sm">{item.range}</span>
                <div className="flex-1 h-6 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${item.probability}%` }}
                  ></div>
                </div>
                <span className="w-12 text-right text-sm">{item.probability}%</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>About the Author</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="flex items-center space-x-2">
              <UserIcon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-semibold text-gray-300">Subscribers</p>
                <p className="text-lg font-bold text-gray-100">{listing && (listing.user.channel.subscribersCount || 0).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <PlayIcon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-semibold text-gray-300">Avg. Views</p>
                <p className="text-lg font-bold text-gray-100">
                    {listing && (((listing.user.channel.totalViews / listing.user.channel.videoCount) || 0).toLocaleString())}
                  </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <VideoIcon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-semibold text-gray-300">Total Videos</p>
                <p className="text-lg font-bold text-gray-100">{listing && (listing.user.channel.videoCount || 0).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <ThumbsUpIcon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-semibold text-gray-300">Engagement Rate</p>
                <p className="text-lg font-bold text-gray-100">8.5%</p>
              </div>
            </div>
          </div>
            <Separator />
            <div className="flex items-center gap-4">
              <Image
                src={listing && listing.user.googleImage || listing && listing.user.channel.imageUrl || "/place.svg"}
                alt="Author"
                width={40}
                height={40}
                className="rounded-full object-cover aspect-square"
              />
              <div>
                <div className="font-semibold">{listing && listing.user.name}</div>
                <div className="text-xs text-muted-foreground">
                  {listing && (listing.user.channel.subscribersCount || 0).toLocaleString()} subscribers</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Related Videos</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-start gap-4 relative">
              <Link href="#" className="absolute inset-0" prefetch={false}>
                <span className="sr-only">View</span>
              </Link>
              <img
                src="/placeholder.svg"
                alt="Thumbnail"
                width={168}
                height={94}
                className="aspect-video rounded-lg object-cover"
              />
              <div className="text-sm">
                <div className="font-medium line-clamp-2">Introducing v0: Generative UI</div>
                <div className="text-xs text-muted-foreground line-clamp-1">Vercel</div>
                <div className="text-xs text-muted-foreground line-clamp-1">300K views &middot; 5 days ago</div>
              </div>
            </div>
            <div className="flex items-start gap-4 relative">
              <Link href="#" className="absolute inset-0" prefetch={false}>
                <span className="sr-only">View</span>
              </Link>
              <img
                src="/placeholder.svg"
                alt="Thumbnail"
                width={168}
                height={94}
                className="aspect-video rounded-lg object-cover"
              />
              <div className="text-sm">
                <div className="font-medium line-clamp-2">Using Vercel KV with Svelte</div>
                <div className="text-xs text-muted-foreground line-clamp-1">Lee Robinson</div>
                <div className="text-xs text-muted-foreground line-clamp-1">21K views &middot; 1 week ago</div>
              </div>
            </div>
            <div className="flex items-start gap-4 relative">
              <Link href="#" className="absolute inset-0" prefetch={false}>
                <span className="sr-only">View</span>
              </Link>
              <img
                src="/placeholder.svg"
                alt="Thumbnail"
                width={168}
                height={94}
                className="aspect-video rounded-lg object-cover"
              />
              <div className="text-sm">
                <div className="font-medium line-clamp-2">Loading UI with Next.js 13</div>
                <div className="text-xs text-muted-foreground line-clamp-1">Delba</div>
                <div className="text-xs text-muted-foreground line-clamp-1">12K views &middot; 10 days ago</div>
              </div>
            </div>
          </CardContent>
        </Card>


      </div>
    </div>
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

function Eye(props) {
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
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
    "Low Risk",
    "Medium Risk",
    "High Risk",
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

