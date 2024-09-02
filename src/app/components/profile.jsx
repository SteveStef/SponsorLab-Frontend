"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"
import black from "../../../public/black.png";
import { useState, useEffect } from "react";
import request from "@/request";
import Image from "next/image";
import { useAppContext } from "@/context";
import Editor from "../components/editListing";
import { useRouter }from "next/navigation";
import Link from "next/link";
import NotFound from "./NotFound";
import { convertFromUtcToLocal } from "@/utils";
import { Badge } from "@/components/ui/badge";
import { FileIcon, CheckCircle2, CheckCircle,XCircle, Play, ThumbsUp, Video, Users, DollarSign, Clock, Eye, Share2, Edit, Building2 } from "lucide-react";

export default function Component({id}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const { organization, description } = useAppContext();
  const [owner, setOwner] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [viewRanges, setViewRanges] = useState([]);
  const [sponsors, setSponsors] = useState([]);

  const router = useRouter();

  async function fetchUser(id) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/${id.replace("%40","@")}`;
    const response = await request(url, "GET", null);
    if(response && response.success) {
      setUser(response.body);
      setSponsors(response.body.requestsReceived);
      let tmp = [];
      let dev = response.body.channel.viewDeviations;
      const normalDist = [2.2, 13.6, 68.2, 13.6, 2.1, 0.1];
      const skips = 6 - dev.length;
      let start = 0;
      for(let i = 0; i < skips; i++) start += normalDist[i];
      for(let i = 0; i < dev.length - 1; i++) {
        let range = dev[i] + "-" + dev[i + 1];
        tmp.push({ range, probability: (normalDist[i + skips] + start).toFixed(1)});
        start = 0;
      }
      tmp.push({ range: ">"+dev[dev.length-1], probability: normalDist[normalDist.length-1]})
      setViewRanges(tmp);
      setListings(response.body.posts);
      setOwner(response.body.owner);
    } else {
      setNotFound(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    if(id) fetchUser(id);
  },[id]);

  console.log(user);

  function handleListingClick(listing) {
    router.push(`../../listings/${listing.id}`);
  }

  if(notFound) {
    return <NotFound />
  }
  if(selectedListing) return <Editor listing={selectedListing} viewDeviations={user.channel.viewDeviations} setSelectedListing={setSelectedListing}/>

  return (
    <div className={`w-full max-w-6xl mx-auto ${loading ? "animate-pulse rounded" : ""}`}>
    <div className="relative h-32 md:h-40 lg:h-48 flex items-center justify-center overflow-hidden">
        <Image
          src={user && user.channel.bannerUrl || black}
          alt="Channel Banner"
          width={1280}
          height={192}
          className="object-cover w-full"
        />
      </div>

      {/* Profile Info */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="w-32 h-32 ring-4 ring-background">
              <AvatarImage src={user && user.googleImage || ""} alt="Profile Picture" />
              <AvatarFallback>{user && user.name[0]}</AvatarFallback>
            </Avatar>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold flex items-center justify-center md:justify-start gap-2">
              {user && user.name}
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </h1>
            <p className="text-gray-400">{user && user.channel.name}</p>
            <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
              <span>{user && (user.channel.subscribersCount).toLocaleString()} Subscribers</span>
              <span>{listings.length} {listings.length == 1 ? "Listing" : "Listings"}</span>
            </div>
            <p className="mt-2 max-w-2xl">
              {description || (user && user.channel.description)}
            </p>
          </div>
            {
              organization === id.replace("%40", "@") &&
                <Link  href="../../settings">
                  <Button variant="outline" className="shrink-0">
                    Edit Profile
                  </Button>
                </Link>
            }
        </div>


        {/* Channel Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-8">
          <Card className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <h3 className="text-xl font-bold">{user && user.channel.subscribersCount}</h3>
            <p className="text-gray-400">Subscribers</p>
          </Card>
          <Card className="p-4 text-center">
            <Play className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <h3 className="text-xl font-bold">{user && user.channel.totalViews}</h3>
            <p className="text-gray-400">Views</p>
          </Card>
          <Card className="p-4 text-center">
            <ThumbsUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <h3 className="text-xl font-bold">2.5M</h3>
            <p className="text-gray-400">Likes</p>
          </Card>
          <Card className="p-4 text-center">
            <Share2 className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <h3 className="text-xl font-bold">100K</h3>
            <p className="text-gray-400">Shares</p>
          </Card>
          <Card className="p-4 text-center">
            <Video className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <h3 className="text-xl font-bold">{user && user.channel.videoCount}</h3>
            <p className="text-gray-400">Videos</p>
          </Card>
          <Card className="p-4 text-center">
            <Eye className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <h3 className="text-xl font-bold">{user && (user.channel.totalViews / user.channel.videoCount).toLocaleString()}</h3>
            <p className="text-gray-400">Average Views</p>
          </Card>
        </div>
        
        <div className="flex">
        <Card className="w-3/5 p-6 rounded-lg mt-5 mr-2">
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
<Card className="w-full md:w-2/5 p-4 rounded-lg mt-5">
      <h2 className="text-lg font-semibold mb-3 flex items-center">
        <DollarSign className="w-5 h-5 mr-2 text-green-500" />
        Recent Sponsors
      </h2>
        {
          !loading && sponsors.length === 0 && <NoRequests />
        }
      <div className="grid grid-cols-2 gap-3">
        {sponsors.map((sponsor, index) => (
          <div key={index} className="border rounded-md p-2 flex flex-col justify-between text-xs">
            <div>
              <p className="font-medium text-gray-100 truncate dark:text-white">
                {sponsor.sponsorName}
              </p>
              <p className="text-gray-500 truncate dark:text-gray-400 flex items-center mt-0.5">
                <Building2 className="w-3 h-3 mr-1" />
                {sponsor.sponsorCompany}
              </p>
            </div>
            <div className="flex items-center justify-between mt-1">
              <Badge variant="secondary" className={`text-[10px] px-1 py-0 my-1 ${getStatusColor(sponsor.transaction.status)}`}>
                {getStatusIcon(sponsor.transaction.status)}
                <span className="ml-0.5 capitalize">{sponsor.transaction.status}</span>
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
        </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
        {
          listings.length === 0 && organization === id.replace("%40", "@") ?
          <Link href="../../create">
          <Button style={{marginLeft: "140%"}}>Create Listing</Button>
          </Link> : listings.length === 0 && <div className="font-semibold" style={{marginLeft: "140%"}} >No Listings Yet...</div>
        }
        {
          listings.map((listing, idx) => {
            return (
              <div  key={idx}className=" bg-background rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-48 sm:h-46 md:h-54 lg:h-52 overflow-hidden">
                  <Image
                    onClick={() => handleListingClick(listing)}
                    src={listing.thumbnailName || black}
                    alt="Post Thumbnail"
                    className="w-full h-full object-cover cursor-pointer"
                    width="576"
                    height="284"
                    style={{ aspectRatio: "576/284", objectFit: "cover" }}
                  />
              <div className={`absolute top-2 left-2 bg-primary-foreground text-primary px-2 py-1 rounded-md text-xs`}>
              {listing.tag}
              </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-muted-foreground">
                      <EyeIcon className="w-4 h-4 inline-block mr-1" />
                      {new Intl.NumberFormat().format(listing.estimatedViews)}
                    </div>

                  {
                    owner &&
                        <Badge
                          variant="solid"
                          className="px-3 py-1 rounded-md text-xs font-medium"
                          style={{ backgroundColor: listing.purchased ? "green" : listing.expired ? "darkred" : listing.published ? "green" : "gray", color: "white" }}
                        >
                          {listing.purchased ? "Purchased" : listing.expired ? "Expired" : listing.published ? "Public" : "Private"}
                        </Badge>
                  }
                  </div>
                  <h3 onClick={() => handleListingClick(listing)} className="text-lg font-semibold mb-2 cursor-pointer">
                    {listing.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      <CalendarIcon className="w-4 h-4 inline-block mr-1" />
                      {convertFromUtcToLocal(listing.uploadDate)}
                    </div>
                    <div className="text-primary font-semibold">${(listing.estimatedPrice / 100).toLocaleString() }
                      {
                        owner &&
                      <Button onClick={() => setSelectedListing(listing)} variant="outline" className="shrink-0 ml-4">
                        Edit  Listing
                      </Button>
                      }
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      </div>
    </div>
  )
}

function CalendarIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
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

const getStatusIcon = (status) => {
  switch (status) {
    case 'ACCEPTED':
      return <CheckCircle className="w-4 h-4 text-green-500" />
    case 'PENDING':
      return <Clock className="w-4 h-4 text-yellow-500" />
    case 'FAILED':
      return <XCircle className="w-4 h-4 text-red-500" />
    case 'CANCELED':
      return <XCircle className="w-4 h-4 text-red-500" />
    default:
      return null
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case 'ACCEPTED':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    case 'FAILED':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    case 'CANCELED':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    default:
      return ''
  }
}

function NoRequests() {
  return <div className="mt-10 text-center ml-auto mr-auto">
        <div className="mb-4 flex justify-center">
          <FileIcon className="h-10 w-10 text-muted-foreground" />
        </div>
        <p className="mb-2 text-md font-semibold tracking-tight">No Sponsors Yet</p>
      </div>
}
