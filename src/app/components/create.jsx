/**
 * v0 by Vercel.
 * @see https://v0.dev/t/qxH2gYJMqmd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import cuphead from "../../../public/headcup.jpg"

export default function Component() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
            <CardDescription>Fill out the form to create a new post.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter a title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="caption">Caption</Label>
                <Textarea id="caption" placeholder="Enter a caption" rows={3} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Upload Image</Label>
                <Input id="image" type="file" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="views">Estimated Views</Label>
                  <Input id="views" type="number" placeholder="1000" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Upload Date</Label>
                  <Input id="date" type="date" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" placeholder="Enter tags separated by commas" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Estimated Price</Label>
                <Input id="price" type="number" placeholder="$99.99" />
              </div>
              <Button type="submit" className="w-full">
                Create Post
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Post Preview</CardTitle>
            <CardDescription>This is how your post will look.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Image
                src={cuphead}
                alt="Post Image"
                width={600}
                height={400}
                className="aspect-[3/2] w-full rounded-md object-cover"
              />
              <div className="grid gap-2">
                <h3 className="text-2xl font-bold">Post Title</h3>
                <p>Post caption goes here. This is a preview of how the post will look.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <EyeIcon className="h-4 w-4" />
                  <span>1.2K views</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Aug 5, 2024</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <TagIcon className="h-4 w-4" />
                  <span>photography, nature</span>
                </div>
                <div className="ml-auto text-2xl font-bold">$99.99</div>
              </div>
            </div>
          </CardContent>
        </Card>
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


function TagIcon(props) {
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
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  )
}