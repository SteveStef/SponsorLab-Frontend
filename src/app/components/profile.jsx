/**
 * v0 by Vercel.
 * @see https://v0.dev/t/REerwT0PZBe
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import black from "../../../public/black.png";
import { useState, useEffect } from "react";
import request from "@/request";
import Image from "next/image";

export default function Component({id}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);

  async function fetchUser(id) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/${id.replace("%40","@")}`;
    const response = await request(url, "GET", null);
    console.log(response);
    if(response && response.success) {
      setUser(response.body);
      setListings(response.body.posts);
    }
    setLoading(false);
  }

  useEffect(() => {
    if(id) fetchUser(id);
  },[id]);

  return (
    <div className={`w-full max-w-6xl mx-auto ${loading ? "animate-pulse rounded" : ""}`}>
      <div className="relative h-48 sm:h-64 md:h-70 overflow-hidden rounded-t-lg">
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
            <Button variant="outline" className="shrink-0">
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-background p-6 sm:p-8 rounded-b-lg">
        <div className="grid gap-6">
          <div>
            <h3 className="text-lg font-semibold">About Me</h3>
            <p className="text-muted-foreground">
            {user && user.channel.description || "This user has no description"}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold">{user && user.channel.subscribersCount || 0}</div>
              <div className="text-sm text-muted-foreground">Subscribers</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold">{50 || 0}</div>
              <div className="text-sm text-muted-foreground">Avg. Views</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold">{user && new Date(user.createdAt).toDateString()}</div>
              <div className="text-sm text-muted-foreground">Joined</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold">24</div>
              <div className="text-sm text-muted-foreground">Posts</div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <div class="w-full bg-gray-500 h-0.5"></div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
        {
          listings.map((listing, idx) => {
            return (
              <div key={idx}className="cursor-pointer bg-background rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-48 sm:h-46 md:h-54 lg:h-52 overflow-hidden">
                  <Image
                    src={black}
                    alt="Post Thumbnail"
                    className="w-full h-full object-cover"
                    width="576"
                    height="284"
                    style={{ aspectRatio: "576/284", objectFit: "cover" }}
                  />
                  {
                    listing.tags.map((tag, i) => {
                      let pos = 2;
                      if(i == 1)  pos = 12;
                      return (
                        <div key={i}className={`absolute top-2 left-${pos} bg-primary-foreground text-primary px-2 py-1 rounded-md text-xs`}>
                          {tag}
                        </div>
                      )
                    })
                  }
                  {/*<div className="absolute bottom-2 right-2 bg-primary-foreground text-primary px-2 py-1 rounded-md text-xs">
                    Available
                  </div>*/}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-muted-foreground">
                      <EyeIcon className="w-4 h-4 inline-block mr-1" />
                      {new Intl.NumberFormat().format(listing.estimatedViews)}
                    </div>
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{listing.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      <CalendarIcon className="w-4 h-4 inline-block mr-1" />
                      {new Date(listing.uploadDate).toDateString()}
                    </div>
                    <div className="text-primary font-semibold">${listing.estimatedPrice}</div>
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
