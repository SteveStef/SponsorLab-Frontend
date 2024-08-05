/**
 * v0 by Vercel.
 * @see https://v0.dev/t/5ZpgAUnY6DX
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import Image from "next/image"
import cuphead from "../../../public/headcup.jpg"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { CartesianGrid, XAxis, Line, LineChart } from "recharts"
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart"

export default function ListingDetails() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src={cuphead}
            alt="Post Image"
            width={800}
            height={500}
            className="w-full h-auto rounded-lg object-cover"
            style={{ aspectRatio: "800/500", objectFit: "cover" }}
          />
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Exclusive NFT Drop</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-0.5">
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              </div>
              <span className="text-muted-foreground text-sm">(4.2)</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="secondary">Art</Badge>
              <Badge variant="secondary">Digital</Badge>
              <Badge variant="secondary">Collectible</Badge>
            </div>
            <p className="text-muted-foreground mt-2">
              Dont miss out on this limited edition NFT drop. Get yours before theyre gone!
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">$99</p>
              <p className="text-muted-foreground">Due: August 31, 2023</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Sponsor Post</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Sponsor This Post</DialogTitle>
                  <DialogDescription>Fill out the form below to sponsor this post.</DialogDescription>
                </DialogHeader>
                <form className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" type="text" placeholder="Enter your name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="amount">How much are you willing to pay for the advertisement? (in USD)</Label>
                    <Input id="amount" type="number" placeholder="Enter the amount" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" type="text" placeholder="Enter the title" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">What do you want the sponsor to say in the advertisement?</Label>
                    <Textarea id="message" rows={4} placeholder="Enter your message" />
                  </div>
                </form>
                <DialogFooter>
                  <div>
                    <Button type="button" variant="ghost">
                      Cancel
                    </Button>
                  </div>
                  <Button type="submit">Submit</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div className="mt-12 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="Author" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-bold">John Doe</h3>
                <p className="text-muted-foreground">Author</p>
              </div>
            </div>
            <p className="text-4xl font-bold mt-4">12.5K</p>
          </div>
          <div className="bg-muted rounded-lg p-4">
            <h3 className="text-lg font-bold">Average Views</h3>
            <p className="text-4xl font-bold">15.2K</p>
          </div>
          <div className="bg-muted rounded-lg p-4">
            <h3 className="text-lg font-bold">View Trend</h3>
            <LinechartChart className="aspect-[9/4]" />
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardContent>
              <img
                src="/placeholder.svg"
                alt="Related Post Image"
                width={400}
                height={300}
                className="w-full h-auto rounded-lg object-cover"
                style={{ aspectRatio: "400/300", objectFit: "cover" }}
              />
              <div className="mt-4">
                <h3 className="text-lg font-bold">Exclusive Digital Art</h3>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                    <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                  </div>
                  <span className="text-muted-foreground text-sm">(4.1)</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary">Art</Badge>
                  <Badge variant="secondary">Digital</Badge>
                  <Badge variant="secondary">Collectible</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <img
                src="/placeholder.svg"
                alt="Related Post Image"
                width={400}
                height={300}
                className="w-full h-auto rounded-lg object-cover"
                style={{ aspectRatio: "400/300", objectFit: "cover" }}
              />
              <div className="mt-4">
                <h3 className="text-lg font-bold">Metaverse Landscapes</h3>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                  </div>
                  <span className="text-muted-foreground text-sm">(4.7)</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary">Art</Badge>
                  <Badge variant="secondary">Digital</Badge>
                  <Badge variant="secondary">Metaverse</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <img
                src="/placeholder.svg"
                alt="Related Post Image"
                width={400}
                height={300}
                className="w-full h-auto rounded-lg object-cover"
                style={{ aspectRatio: "400/300", objectFit: "cover" }}
              />
              <div className="mt-4">
                <h3 className="text-lg font-bold">Generative NFT Avatars</h3>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                  </div>
                  <span className="text-muted-foreground text-sm">(5.0)</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary">Art</Badge>
                  <Badge variant="secondary">Digital</Badge>
                  <Badge variant="secondary">Avatar</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function LinechartChart(props) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <LineChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
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