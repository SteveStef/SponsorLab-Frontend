"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"
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
import { Badge } from "@/components/ui/badge"
import { Users, Eye, ThumbsUp, PlaySquare, DollarSign, Clock, TrendingUp, Award, Share2, Edit } from "lucide-react"



export default function Component({id}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const { organization, description } = useAppContext();
  const [owner, setOwner] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const router = useRouter();

  async function fetchUser(id) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/${id.replace("%40","@")}`;
    const response = await request(url, "GET", null);
    if(response && response.success) {
      setUser(response.body);
      setListings(response.body.posts);
      setOwner(response.body.owner);
    } else {
      setNotFound(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    if(id) {
      fetchUser(id);
    }
  },[id]);



  function handleListingClick(listing) {
    router.push(`../../listings/${listing.id}`);
  }

  if(notFound) {
    return <NotFound />
  }
  if(selectedListing) return <Editor listing={selectedListing} viewDeviations={user.channel.viewDeviations} setSelectedListing={setSelectedListing}/>

  return (
    <div className={`w-full max-w-6xl mx-auto ${loading ? "animate-pulse rounded" : ""}`}>
      <div className="relative h-48 sm:h-64 md:h-70 lg:h-40 overflow-hidden rounded-t-lg">
        <Image
          src={user && user.channel.bannerUrl || black}
          priority={false}
          alt="Banner Image"
          className="w-full h-full object-cover"
          width="800"
          height="320"
          style={{ aspectRatio: "800/320", objectFit: "cover" }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 text-white">
          <div className="flex items-center gap-4">
            <Avatar className="ring-4 ring-background">
              <AvatarImage src={user && user.googleImage || ""} alt="Profile Picture" />
              <AvatarFallback>{user && user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{user && user.name}</h2>
              <div className="text-sm text-muted-foreground">{id.replace("%40","@")}</div>
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
        </div>
      </div>

      {/* Statistics Section */}
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold mb-4">Channel Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatCard icon={<Users />} title="Subscribers" value="111M" />
          <StatCard icon={<Eye />} title="Avg. Views" value="5.2M" />
          <StatCard icon={<ThumbsUp />} title="Avg. Likes" value="412K" />
          <StatCard icon={<PlaySquare />} title="Total Videos" value="4,572" />
          <StatCard icon={<DollarSign />} title="Est. Earnings" value="$52M" />
          <StatCard icon={<Clock />} title="Watch Time" value="1.2B hrs" />
          <StatCard icon={<TrendingUp />} title="Growth Rate" value="2.5%/mo" />
          <StatCard icon={<Award />} title="Awards" value="14" />
          <StatCard icon={<Share2 />} title="Shares/Video" value="105K" />
          <StatCard icon={<Eye />} title="Total Views" value="26B" />
        </div>
      </div>

      <div className="bg-background p-6 sm:p-8 rounded-b-lg">
        <div className="grid gap-6">
          <div>
            <h3 className="text-lg font-semibold">About Me</h3>
            <p className="text-muted-foreground">
            {user && user.channel.description || description ||  "This user has no description"}
            </p>
          </div>

      <div className="w-full bg-gray-500 h-0.5"></div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold">{user && user.channel.subscribersCount.toLocaleString()
               || 0}</div>
              <div className="text-sm text-muted-foreground">Subscribers</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold">{user && user.channel.totalViews}</div>
              <div className="text-sm text-muted-foreground">Total Views</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold">{user && (parseInt(user.channel.totalViews / user.channel.videoCount)) || 0}</div>
              <div className="text-sm text-muted-foreground">Avg. Views</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold">{user && new Date(user.channel.joinedDate).toLocaleDateString()}</div>
              <div className="text-sm text-muted-foreground">Joined</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold">{user && user.posts.length}</div>
              <div className="text-sm text-muted-foreground">Listings</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-500 h-0.5"></div>

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
function StatCard({ icon, title, value }) {
  return (
    <Card className="w-150">
      <CardContent className="flex items-center p-3">
        <div className="mr-3 text-green-500">{icon}</div>
        <div>
          <p className="text-xs text-gray-400">{title}</p>
          <p className="text-sm font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function SponsorLogo({ name, logo }) {
  return (
    <div className="flex flex-col items-center">
      <img src={logo} alt={`${name} logo`} className="h-12 w-24 object-contain" />
      <span className="text-xs text-gray-400 mt-1">{name}</span>
    </div>
  )
}

function VideoCard({ title, views, timestamp, thumbnail, category }) {
  return (
    <Card className="border-gray-700 overflow-hidden">
      <img src={thumbnail} alt={title} className="w-full h-40 object-cover" />
      <CardContent className="p-3">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-sm">{title}</h3>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit listing</span>
          </Button>
        </div>
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>{views}</span>
          <span>{timestamp}</span>
        </div>
        <Badge variant="secondary" className="mt-2 bg-green-800 text-green-100">
          {category}
        </Badge>
      </CardContent>
    </Card>
  )
}
