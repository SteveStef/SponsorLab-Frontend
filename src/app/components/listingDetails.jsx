"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useState, useEffect } from "react";
import request from "@/request";
import Image from "next/image";
import SponsorForm from "../components/sponsorForm";
import { PlayIcon, FileWarning, CalendarIcon, VideoIcon, EyeIcon } from "lucide-react";
import { convertFromUtcToLocal } from "@/utils";
import { useAppContext } from "@/context";

import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const contentTypesMap = [
  { category: "Technology", cpm: 20 },
  { category: "Gaming", cpm: 15 },
  { category: "Fashion", cpm: 25 },
  { category: "Education", cpm: 18 },
  { category: "Finance", cpm: 30 },
  { category: "Lifestyle", cpm: 12 },
  { category: "Food/Cooking", cpm: 10 },
  { category: "Family", cpm: 8 },
  { category: "Music", cpm: 10 },
  { category: "Vlogs", cpm: 8 },
  { category: "Business", cpm: 25 },
  { category: "DIY/Crafts", cpm: 12 },
  { category: "Travel", cpm: 15 },
  { category: "Religion", cpm: 8 },
  { category: "Nature", cpm: 10 },
  { category: "Garden", cpm: 8 },
  { category: "Wellness", cpm: 15 }
];

function evaluateDeal(category, pricingModel, offeredPrice, impressions = null) {
  const standard = contentTypesMap.find(item => item.category === category)?.cpm;

  if (standard === undefined) {
    return { text: "Category not found", color: "bg-gray-500" };
  }

  if (pricingModel === "CPM") {
    if (offeredPrice < standard * 0.7) {
      return { text: "Great Deal", color: "bg-green-500" };
    } else if (offeredPrice >= standard * 0.3 && offeredPrice <= standard * 1.3) {
      return { text: "Good Deal", color: "bg-blue-500" };
    } else {
      return { text: "Bad Deal", color: "bg-red-500" };
    }
  } else if (pricingModel === "FLAT") {
    if (!impressions) {
      return { text: "Impressions required for Flat Rate", color: "bg-gray-500" };
    }

    const effectiveCPM = (offeredPrice / impressions) * 1000;

    if (effectiveCPM < standard * 0.7) {
      return { text: "Great Deal", color: "bg-green-500" };
    } else if (effectiveCPM >= standard * 0.7 && effectiveCPM <= standard * 1.3) {
      return { text: "Good Deal", color: "bg-blue-500" };
    } else {
      return { text: "Bad Deal", color: "bg-red-500" };
    }
  } else {
    return { text: "Invalid pricing model", color: "bg-gray-500" };
  }
}

export default function Component({ params }) {

  const [listing, setListing] = useState(null);
  const [relatedListings, setRelatedListings] = useState([]);
  const [showSponsorForm, setShowSponsorForm] = useState(false);
  const [viewRanges, setViewRanges] = useState([]);
  const [dealBadge, setDealBadge] = useState(null);
  const [isStripeCustomer, setIsStripeCustomer] = useState(false);
  const [loadingRedirect, setLoadingRedirect] = useState(false);

  const { role, company, name, email } = useAppContext();

  useEffect(() => {
    async function fetchListing() {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/posts/${params.id}`;
      const response = await request(url, "GET", null);
      if(response && response.success) {
        setListing(response.body);
        let tmp = [];
        let dev = response.body.user.channel.viewDeviations;
        const normalDist = [21, 63, 13.6, 2.1, 0];
        for(let i = 0; i < dev.length - 1; i++) {
          let range = dev[i] + "-" + dev[i + 1] + (i === dev.length - 2? "+":"");
          tmp.push({ range, probability: (normalDist[i]).toFixed(1)});
        }
        setViewRanges(tmp);
        setDealBadge(evaluateDeal(response.body.tag, response.body.pricingModel, response.body.estimatedPrice/100, response.body.estimatedViews));
      }
    }

    async function fetchRelated() {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/posts/sponsor/recommended`;
      const response = await request(url, "GET", null);
      if(response && response.success) {
        setRelatedListings(response.body);
      }
    }

    async function fullyAuth() {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/fullAuth`;
      const response = await request(url, "GET", null);
      if(response && response.success) {
        setIsStripeCustomer(true);
      }
    }

    if(params.id) {
      fetchListing();
      fetchRelated();
      if(role === "SPONSOR") {
        fullyAuth();
      }
    }

  }, [params, role]);


  const addPaymentMethod = async () => {
    setLoadingRedirect(true)
    const url = `${process.env.NEXT_PUBLIC_API_URL}/stripe/manage-customer`
    const body = { email: email, name: name, prevUrl: "listings/"+listing.id}
    const response = await request(url, "POST", body)

    if (!response) {
      toast({ title: "Error creating customer" })
      setLoadingRedirect(false)
      return
    }

    if (response.url) {
      window.location.href = response.url;
      //window.open(response.url, '_blank');
      return
    }

    if (!response.sessionId) {
      setLoadingRedirect(false)
      return
    }

    const stripe = await stripePromise
    const data = await stripe.redirectToCheckout({ sessionId: response.sessionId })
    if (data.error) {
      setLoadingRedirect(false)
      return
    }
  }

  if(listing && showSponsorForm) {
    return <SponsorForm listing={listing} setShowSponsorForm={setShowSponsorForm}/>
  }
  return (
    <div className="grid lg:grid-cols-3 gap-6 lg:gap-12 items-start max-w-7xl px-4 mx-auto py-6">
      <div className="lg:col-span-2 grid gap-4">
        <div className="rounded-xl overflow-hidden">
          <Image
            src={listing?.thumbnailName}
            alt="Video Thumbnail"
            width={800}
            height={450}
            className="w-full aspect-video object-cover"
          />
        </div>
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold">{listing?.title}</h1>
          <div className="text-muted-foreground">{listing?.description}</div>
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <div className="text-4xl font-bold">
              {listing?.pricingModel === "FLAT" ? (
                <span>${((listing.estimatedPrice || 0) / 100).toLocaleString()} FLAT</span>
              ) : (
                <span className="text-2xl flex">
                  ${((listing?.estimatedPrice || 0) / 100).toLocaleString()} CPM
                </span>
              )}
            </div>
          </div>
        </div>
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <EyeIcon className="h-6 w-6 text-primary" />
              <div>
                <span className="text-sm font-semibold block">Estimated Views</span>
                <span className="text-2xl font-bold">{(listing?.estimatedViews || 0).toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FileWarning className="h-6 w-6 text-primary" />
              <div>
                <span className="text-sm font-semibold block">Risk Evaluation</span>
                <span className="text-2xl font-bold">

            {listing && displayBadge(listing.riskEvaluation)}
  </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-6 w-6 text-primary" />
              <div>
                <span className="text-sm font-semibold block">Upload Date</span>
                <span className="text-2xl font-bold">{listing && convertFromUtcToLocal(listing.uploadDate)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <div>
                <span className="text-sm font-semibold block">Deal Evaluation</span>
                <span className={`text-sm font-semibold px-2 rounded-full text-black ${dealBadge?.color}`}>
                    {dealBadge?.text}
                </span>
              </div>
            </div>
          </div>
          {listing?.pricingModel === "CPM" && (
            <div className="mt-4 text-muted-foreground">
              Estimated total cost: ${((listing?.estimatedViews / 1000) * (listing?.estimatedPrice / 100)).toLocaleString()}
            </div>
          )}
        </Card>
        <div className="flex flex-wrap gap-2">
          {listing?.tag && <Badge variant="secondary">{listing.tag}</Badge>}
        </div>
        <Button
          disabled={loadingRedirect || !listing || (role !== "SPONSOR" || listing.purchased || !listing.published || !company?.setup)}
          onClick={() => {
            if(isStripeCustomer) {
              setShowSponsorForm(true);
            } else {
              addPaymentMethod();
            }
          }}
          className="mt-4"
        >
          {role === "SPONSOR" && !company?.setup ? "Please finish creating your profile to sponsor this listing" : "Sponsor this listing"}
        </Button>
      </div>
      <div className="grid gap-6">
        <Card className="p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">View Range Probabilities</h2>
          <div className="space-y-2">
            {viewRanges.map((item, index) => (
              <div key={index} className="flex items-center">
                <span className="w-24 text-sm">{item.range}</span>
                <div className="flex-1 h-6 bg-secondary rounded-full overflow-hidden">
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
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <PlayIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-semibold">Avg. Views</p>
                  <p className="text-lg font-bold">
                    {(((listing?.user.channel.totalViews || 0) / (listing?.user.channel.videoCount || 1)).toLocaleString())}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <VideoIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-semibold">Total Videos</p>
                  <p className="text-lg font-bold">{(listing?.user.channel.videoCount || 0).toLocaleString()}</p>
                </div>
              </div>
            </div>
            <Separator />
            <Link href={`/profile/${listing?.user.channel.name}`} className="flex items-center gap-4">
              <Image
                src={listing?.user.googleImage || listing?.user.channel.imageUrl }
                alt="Author"
                width={40}
                height={40}
                className="rounded-full object-cover aspect-square"
              />
              <div>
                <div className="font-semibold">{listing?.user.name}</div>
                <div className="text-xs text-muted-foreground">
                  {(listing?.user.channel.subscribersCount || 0).toLocaleString()} subscribers
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recommended Listings</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {relatedListings.length === 0 && 
              <div> No recommended listings available </div>
            }
            {relatedListings.map((list, index) => (
              <div key={index} className="flex items-start gap-4 relative ">
                <Link href={`/listings/${list.id}`} className="absolute inset-0" prefetch={false}>
                  <span className="sr-only">View</span>
                </Link>
                <Image
                  src={list?.thumbnailName }
                  alt="Thumbnail"
                  width={120}
                  height={67}
                  className="aspect-video rounded-lg object-cover"
                />
                <div className="text-sm flex-1">
                  <div className="font-medium line-clamp-2">{list.title}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1">{list.user.channel.name}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1">{list.estimatedViews} views</div>
                </div>
              </div>
            ))}
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

function displayBadge(riskEval) {
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
  for(let i = 0; i < text.length; i++) {
    if(text[i] === riskEval) {
      return <Badge
      variant="solid"
      className="px-3 py-1 rounded-md text-xs font-medium"
      style={{ backgroundColor: details[i].backgroundColor, color: details[i].color}}>
        {text[i]} Risk
      </Badge>
    }
  }
  return <></>
}

