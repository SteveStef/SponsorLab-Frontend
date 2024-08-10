/**
 * v0 by Vercel.
 * @see https://v0.dev/t/cOax5F2jfNU
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import cuphead from "../../../public/headcup.jpg"

export default function Component() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto p-4 md:p-8">
      <div className="grid gap-6">
        <h1 className="text-3xl font-bold">Create New Listing</h1>
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
            <Label htmlFor="image">Image</Label>
            <Input id="image" type="file" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="views">Estimated Views</Label>
              <Input id="views" type="number" placeholder="Enter estimated views" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="upload-date">Upload Date</Label>
              <Input id="upload-date" type="date" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tags">Tags</Label>
            <Select id="tags" multiple>
              <SelectTrigger>
                <SelectValue placeholder="Select tags" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nature">Nature</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="architecture">Architecture</SelectItem>
                <SelectItem value="portrait">Portrait</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input id="price" type="number" placeholder="Enter a price" />
          </div>
          <Button type="submit" className="justify-self-start">
            Create Listing
          </Button>
        </form>
      </div>
      <div className="bg-muted p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Preview</h2>
        <div className="grid gap-4">
          <Image
            src={cuphead}
            alt="Listing Image"
            width={600}
            height={400}
            className="rounded-lg w-full aspect-[3/2] object-cover"
          />
          <div className="grid gap-2">
            <h3 className="text-xl font-bold">Stunning Nature Landscape</h3>
            <p className="text-muted-foreground">
              Capture the beauty of the great outdoors in this breathtaking nature photograph.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1">
              <div className="font-semibold">Estimated Views</div>
              <div>10,000</div>
            </div>
            <div className="grid gap-1">
              <div className="font-semibold">Upload Date</div>
              <div>2023-08-10</div>
            </div>
            <div className="grid gap-1">
              <div className="font-semibold">Tags</div>
              <div className="flex gap-2">
                <Badge variant="outline">Nature</Badge>
                <Badge variant="outline">Landscape</Badge>
              </div>
            </div>
            <div className="grid gap-1">
              <div className="font-semibold">Price</div>
              <div>$99.99</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}