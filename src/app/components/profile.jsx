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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

export default function Component() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [description, setDescription] = useState(
    "Hi, I'm a passionate content creator who loves to share my knowledge and experiences with the world. I'm always eager to learn new things and connect with like-minded individuals.",
  )
  const [profilePicture, setProfilePicture] = useState("/placeholder-user.jpg")
  const handleEditProfile = () => {
    setIsEditModalOpen(true)
  }
  const handleSaveChanges = () => {
    setIsEditModalOpen(false)
  }
  const handleCancelChanges = () => {
    setIsEditModalOpen(false)
  }
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center gap-6">
          <Avatar className="w-32 h-32">
            <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">John Doe</h1>
            <p className="text-muted-foreground">{description}</p>
            <Button onClick={handleEditProfile}>Edit Profile</Button>
          </div>
        </div>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>User Stats</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col items-center gap-2">
                <div className="text-4xl font-bold">4.8</div>
                <div className="text-muted-foreground">Trustworthiness</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="text-4xl font-bold">12.3K</div>
                <div className="text-muted-foreground">Subscribers</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="text-4xl font-bold">2 years</div>
                <div className="text-muted-foreground">Join Date</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="text-4xl font-bold">45.2K</div>
                <div className="text-muted-foreground">Average Views</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="relative flex flex-col gap-2 group">
            <Link href="#" className="absolute inset-0" prefetch={false}>
              <span className="sr-only">View Post</span>
            </Link>
            <Image
              src={cuphead}
              alt="Post Thumbnail"
              width={600}
              height={400}
              className="object-cover rounded-lg aspect-[4/3]"
            />
            <div className="font-medium line-clamp-2">Introducing the Frontend Cloud: Vercels Next-Gen Platform</div>
          </div>
          <div className="relative flex flex-col gap-2 group">
            <Link href="#" className="absolute inset-0" prefetch={false}>
              <span className="sr-only">View Post</span>
            </Link>
            <Image
              src={cuphead}
              alt="Post Thumbnail"
              width={600}
              height={400}
              className="object-cover rounded-lg aspect-[4/3]"
            />
            <div className="font-medium line-clamp-2">Mastering Serverless Functions with Vercel</div>
          </div>
          <div className="relative flex flex-col gap-2 group">
            <Link href="#" className="absolute inset-0" prefetch={false}>
              <span className="sr-only">View Post</span>
            </Link>
            <Image
              src={cuphead}
              alt="Post Thumbnail"
              width={600}
              height={400}
              className="object-cover rounded-lg aspect-[4/3]"
            />
            <div className="font-medium line-clamp-2">Optimizing Next.js for Blazing-Fast Performance</div>
          </div>
          <div className="relative flex flex-col gap-2 group">
            <Link href="#" className="absolute inset-0" prefetch={false}>
              <span className="sr-only">View Post</span>
            </Link>
            <Image
              src={cuphead}
              alt="Post Thumbnail"
              width={600}
              height={400}
              className="object-cover rounded-lg aspect-[4/3]"
            />
            <div className="font-medium line-clamp-2">Building a Headless CMS with Sanity and Next.js</div>
          </div>
          <div className="relative flex flex-col gap-2 group">
            <Link href="#" className="absolute inset-0" prefetch={false}>
              <span className="sr-only">View Post</span>
            </Link>
            <Image
              src={cuphead}
              alt="Post Thumbnail"
              width={600}
              height={400}
              className="object-cover rounded-lg aspect-[4/3]"
            />
            <div className="font-medium line-clamp-2">Deploying a Full-Stack App with Vercel and Prisma</div>
          </div>
          <div className="relative flex flex-col gap-2 group">
            <Link href="#" className="absolute inset-0" prefetch={false}>
              <span className="sr-only">View Post</span>
            </Link>
            <Image
              src={cuphead}
              alt="Post Thumbnail"
              width={600}
              height={400}
              className="object-cover rounded-lg aspect-[4/3]"
            />
            <div className="font-medium line-clamp-2">Integrating Stripe Payments into a Next.js App</div>
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <Dialog>
          <DialogContent className="p-6 sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="profile-picture">Profile Picture</Label>
                <Input
                  id="profile-picture"
                  type="file"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                  className="mt-2"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSaveChanges}>Save Changes</Button>
              <Button variant="outline" onClick={handleCancelChanges}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}