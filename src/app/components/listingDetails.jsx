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

export default function Component({ params }) {

  const [listing, setListing] = useState(null);
  const [showSponsorForm, setShowSponsorForm] = useState(false);

  async function fetchListing() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/posts/${params.id}`;
    const response = await request(url, "GET", null);
    if(response && response.success) setListing(response.body);
    console.log(response);
  }

  useEffect(() => {
    if(params.id) fetchListing();
  }, [params]);

  if(showSponsorForm) return <SponsorForm />

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
            Due on {listing && new Date(listing.uploadDate).toDateString()} {' | '}
            Estimated {' '} <EyeIcon className="w-4 h-6 inline-block mr-1" />
              {new Intl.NumberFormat().format(listing && listing.estimatedViews || 0)}
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
              ${listing && (listing.estimatedPrice || 0).toLocaleString()}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {
            listing && listing.tags.map((tag, idx) => {
              return <Badge key={idx} variant="secondary">{tag}</Badge>
            })
          }
        </div>
        <Button onClick={() => setShowSponsorForm(true)} className="mt-4">Sponsor this listing</Button>
      </div>
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Author Stats</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <div>Subscribers</div>
              <div className="font-bold">{listing && (listing.user.channel.subscribersCount || 0).toLocaleString()
              }</div>
            </div>
            <div className="flex items-center justify-between">
              <div>Total Views</div>
              <div className="font-bold">{listing && (listing.user.channel.totalViews || 0).toLocaleString()
              }</div>
            </div>
            <div className="flex items-center justify-between">
              <div>Total Videos</div>
              <div className="font-bold">{listing && (listing.user.channel.videoCount || 0).toLocaleString()
              }</div>
            </div>
            <div className="flex items-center justify-between">
              <div>Avg. Views per Video</div>
              <div className="font-bold">{listing && ((listing.user.channel.totalViews / listing.user.channel.videoCount)||0).toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>About the Author</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <div className="text-sm font-semibold">{listing && listing.user.name}</div>
              <div className="text-muted-foreground text-sm">
                {listing && listing.user.channel.description}
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

function EyeIcon(props) {
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

