import { useState } from "react"
import { toast } from "sonner"
import { addLocalTimezone, convertFromUtcToLocal, inPast } from "@/utils"
import request, { axiosRequest } from "@/request"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Calendar, CheckCircle, ChevronLeft, DollarSign, Eye, Image as ImageIcon, Info, ListIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const contentTypes = [
  "Technology", "Gaming", "Fashion", "Education", "Finance", "Lifestyle",
  "Food/Cooking", "Family", "Music", "Vlogs", "Business", "DIY/Crafts",
  "Travel", "Religion", "Nature", "Garden", "Wellness"
]

export default function Component({ listing, setSelectedListing }) {
  const [title, setTitle] = useState(listing.title)
  const [estimatedPrice, setEstimatedPrice] = useState(listing.estimatedPrice / 100)
  const [estimatedViews, setEstimatedViews] = useState(listing.estimatedViews)
  const [description, setDescription] = useState(listing.description)
  const [uploadDate, setUploadDate] = useState(formatDate(new Date(convertFromUtcToLocal(listing.uploadDate))))
  const [published, setPublished] = useState(listing.published)
  const [image, setImage] = useState(null)
  const [load, setLoad] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(listing.tag)

  const handleImageChange = (event) => {
    const validImageTypes = ["image/png", "image/jpg", "image/jpeg"]
    if (!event.target.files || !event.target.files[0]) return

    if (!validImageTypes.includes(event.target.files[0].type)) {
      toast.error("Invalid image type, we only accept PNG/JPG/JPEG")
      return
    }

    const file = event.target.files[0]
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2)
    if (sizeInMB > 5) {
      toast.error("The image is over 5MB in size, please select an image under 5MB")
      return
    }

    setImage(event.target.files[0])
  }

  function formatDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  function validate() {
    let message = ""

    if (!title) {
      message = "Listing must have a title"
    } else if (!description) {
      message = "Listing must have a caption"
    } else if (estimatedPrice <= 0) {
      message = "Price must be greater than $0.00"
    } else if (estimatedViews < 0) {
      message = "Estimated views can not be negative"
    } else if (inPast(uploadDate)) {
      message = "Upload date must be in the future"
    }

    if (message) {
      toast.error(message)
      setLoad(false)
      return false
    }

    return true
  }

  async function uploadListing(e) {
    e.preventDefault()
    setLoad(true)
    if (!validate()) return

    const url = `${process.env.NEXT_PUBLIC_API_URL}/posts/${listing.id}`
    const formData = new FormData()
    formData.append("tag", selectedCategory)
    formData.append("estimatedPrice", estimatedPrice)
    formData.append("uploadDate", addLocalTimezone(uploadDate))
    formData.append("estimatedViews", estimatedViews)
    formData.append("description", description)
    formData.append("title", title)
    formData.append("published", published)
    formData.append("file", image)

    try {
      const response = await axiosRequest(url, "PUT", formData)
      if (response.status === 200) {
        window.location.href = ""
      } else if (response.status === 403) {
        toast.error(response.data.message)
      } else {
        toast.error("Something went wrong, try again later")
      }
    } catch (error) {
      toast.error("An error occurred while updating the listing")
    } finally {
      setLoad(false)
    }
  }

  async function deleteListing() {
    setLoad(true);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/posts/${listing.id}`
    try {
      const response = await request(url, "DELETE", null)
      if (response && response.success) {
        window.location.href = ""
      } else {
        if (response.status === 401) toast.error(response.message)
        else toast.error("Something went wrong, try again later")
      }
    } catch (error) {
      toast.error("An error occurred while deleting the listing")
    } finally {
      setLoad(false)
    }
  }
  console.log(listing);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 max-w-7xl mx-auto p-4 lg:p-8">
      <div className="space-y-6">
        <header className="flex items-center gap-4 mb-6">
          <Button onClick={() => setSelectedListing(null)} variant="outline" size="icon" className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-3xl font-bold">Edit Listing</h1>
        </header>
        {listing.purchased && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Editing Restricted</AlertTitle>
            <AlertDescription>
              You cannot edit this listing because it has an associated partnership deal.
            </AlertDescription>
          </Alert>
        )}
        <form onSubmit={uploadListing} className="space-y-8" {...(listing.purchased && { 'aria-disabled': true })}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center text-sm font-medium text-gray-300">
                <Info className="mr-2 h-4 w-4 text-primary" />
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-background border-gray-700"
                disabled={listing.purchased}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price" className="flex items-center text-sm font-medium text-gray-300">
                <DollarSign className="mr-2 h-4 w-4 text-primary" />
                Estimated Price ({listing.pricingModel})
              </Label>
              <Input
                id="price"
                type="number"
                value={estimatedPrice}
                onChange={(e) => setEstimatedPrice(e.target.value)}
                className="bg-background border-gray-700"
                disabled={listing.purchased}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="views" className="flex items-center text-sm font-medium text-gray-300">
                <Eye className="mr-2 h-4 w-4 text-primary" />
                Views
              </Label>
              <Input
                id="views"
                type="number"
                value={estimatedViews}
                onChange={(e) => setEstimatedViews(e.target.value)}
                className="bg-background border-gray-700"
                disabled={listing.purchased}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="thumbnail" className="flex items-center text-sm font-medium text-gray-300">
                <ImageIcon className="mr-2 h-4 w-4 text-primary" />
                Change Thumbnail
              </Label>
              <Input
                id="thumbnail"
                type="file"
                onChange={handleImageChange}
                className="bg-background border-gray-700"
                disabled={listing.purchased}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="flex items-center text-sm font-medium text-gray-300">
                <ListIcon className="mr-2 h-4 w-4 text-primary" />
                Category
              </Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory} disabled={listing.purchased}>
                <SelectTrigger className="bg-background border-gray-700">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.map((item) => (
                    <SelectItem key={item} value={item}>{item}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="upload-date" className="flex items-center text-sm font-medium text-gray-300">
                <Calendar className="mr-2 h-4 w-4 text-primary" />
                Upload Date
              </Label>
              <Input
                id="upload-date"
                type="date"
                value={uploadDate}
                onChange={(e) => setUploadDate(e.target.value)}
                className="bg-background border-gray-700"
                disabled={listing.purchased}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-300">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="bg-background border-gray-700"
              disabled={listing.purchased}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="publish" className="flex items-center gap-2 font-normal cursor-pointer">
              <Switch
                id="publish"
                checked={published}
                onCheckedChange={() => setPublished(!published)}
                disabled={listing.purchased}
              />
              <span className="text-sm text-gray-300">{published ? "Public" : "Private"}</span>
            </Label>
            <div className="flex gap-4">
              <Button type="button" onClick={() => setSelectedListing(null)} variant="outline">
                Discard Changes
              </Button>
              <Button type="submit" disabled={load || listing.purchased}>
                {load ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </form>
      </div>
      <Card className="bg-card text-card-foreground">
        <CardHeader>
          <CardTitle>Post Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Risk:</span>
              <span
                className={`font-semibold ${
                  listing.riskEvaluation === 'Low'
                    ? 'text-green-400'
                    : listing.riskEvaluation === "Medium"
                    ? 'text-yellow-400'
                    : 'text-red-400'
                }`}
              >
                {listing.riskEvaluation}
              </span>
              {listing.riskEvaluation === "Low" ? (
                <CheckCircle className="h-4 w-4 text-green-400" />
              ) : (
                <AlertTriangle className={`h-4 w-4 ${listing.riskEvaluation === "Medium" ? "text-yellow-400" : "text-red-400"}`} />
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{estimatedViews.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{uploadDate}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Post Actions</h3>
            <Button onClick={deleteListing} disabled={load} variant="destructive" className="w-full">
              Delete Post
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
