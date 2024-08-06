/**
 * v0 by Vercel.
 * @see https://v0.dev/t/vS2ZQjonnve
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import Image from "next/image"
import cuphead from "../../../public/headcup.jpg"
import { useState } from "react"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Component() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-8 max-w-7xl mx-auto p-4 md:p-8">
      <div className="bg-background rounded-lg shadow-lg p-6 flex flex-col items-center gap-4">
        <Avatar className="w-24 h-24 border-4 border-primary">
          <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
          {/* <Image src={cuphead}/>*/}
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="text-2xl font-bold">John Doe</h2>
          <p className="text-muted-foreground">Creative Director, Acme Inc.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="bg-muted rounded-lg p-4 text-center">
            <div className="text-4xl font-bold counter">10K</div>
            <div className="text-sm text-muted-foreground">Subscribers</div>
          </div>
          <div className="bg-muted rounded-lg p-4 text-center">
            <div className="text-4xl font-bold counter">1.2M</div>
            <div className="text-sm text-muted-foreground">Average Views</div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">Joined on June 15, 2021</div>
        <Link href="../settings" prefetch={false}>
          <Button variant="outline" className="w-full">
            Edit Profile
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <StarIcon className="w-5 h-5 fill-primary" />
          <StarIcon className="w-5 h-5 fill-primary" />
          <StarIcon className="w-5 h-5 fill-primary" />
          <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
          <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
        </div>
      </div>
      <div className="grid gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-background rounded-lg shadow-lg overflow-hidden group">
            <Link href="#" prefetch={false}>
              <Image
                src={cuphead}
                alt="Post Thumbnail"
                width={400}
                height={225}
                className="object-cover w-full aspect-video group-hover:opacity-80 transition-opacity"
              />
              <div className="p-4 group-hover:bg-muted transition-colors">
                <h3 className="text-lg font-semibold">Mastering Tailwind CSS: A Comprehensive Guide</h3>
                <div className="text-sm text-muted-foreground">
                  <span>120K views</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="bg-background rounded-lg shadow-lg overflow-hidden group">
            <Link href="#" prefetch={false}>
              <Image
                src={cuphead}
                alt="Post Thumbnail"
                width={400}
                height={225}
                className="object-cover w-full aspect-video group-hover:opacity-80 transition-opacity"
              />
              <div className="p-4 group-hover:bg-muted transition-colors">
                <h3 className="text-lg font-semibold">Building a Responsive React App with Shadcn UI</h3>
                <div className="text-sm text-muted-foreground">
                  <span>80K views</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="bg-background rounded-lg shadow-lg overflow-hidden group">
            <Link href="#" prefetch={false}>
              <Image
                src={cuphead}
                alt="Post Thumbnail"
                width={400}
                height={225}
                className="object-cover w-full aspect-video group-hover:opacity-80 transition-opacity"
              />
              <div className="p-4 group-hover:bg-muted transition-colors">
                <h3 className="text-lg font-semibold">Optimizing Your Next.js Application for Performance</h3>
                <div className="text-sm text-muted-foreground">
                  <span>150K views</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="bg-background rounded-lg shadow-lg overflow-hidden group">
            <Link href="#" prefetch={false}>
              <Image
                src={cuphead}
                alt="Post Thumbnail"
                width={400}
                height={225}
                className="object-cover w-full aspect-video group-hover:opacity-80 transition-opacity"
              />
              <div className="p-4 group-hover:bg-muted transition-colors">
                <h3 className="text-lg font-semibold">Exploring the Power of React Hooks</h3>
                <div className="text-sm text-muted-foreground">
                  <span>90K views</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="bg-background rounded-lg shadow-lg overflow-hidden group">
            <Link href="#" prefetch={false}>
              <Image
                src={cuphead}
                alt="Post Thumbnail"
                width={400}
                height={225}
                className="object-cover w-full aspect-video group-hover:opacity-80 transition-opacity"
              />
              <div className="p-4 group-hover:bg-muted transition-colors">
                <h3 className="text-lg font-semibold">Unleashing the Potential of Vercel Serverless Functions</h3>
                <div className="text-sm text-muted-foreground">
                  <span>110K views</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="bg-background rounded-lg shadow-lg overflow-hidden group">
            <Link href="#" prefetch={false}>
              <Image
                src={cuphead}
                alt="Post Thumbnail"
                width={400}
                height={225}
                className="object-cover w-full aspect-video group-hover:opacity-80 transition-opacity"
              />
              <div className="p-4 group-hover:bg-muted transition-colors">
                <h3 className="text-lg font-semibold">Mastering TypeScript for Enterprise-Level Applications</h3>
                <div className="text-sm text-muted-foreground">
                  <span>130K views</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
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