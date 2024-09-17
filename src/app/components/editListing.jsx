import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import request, { axiosRequest } from "@/request";
import { ListIcon, Eye, Calendar, Info, DollarSign, Image } from 'lucide-react';
import { addLocalTimezone, convertFromUtcToLocal, inPast } from "@/utils";

const contentTypes = [
"Technology",
"Gaming",
"Fashion",
"Education",
"Finance",
"Lifestyle",
"Food/Cooking",
"Family",
"Music",
"Vlogs",
"Business",
"DIY/Crafts",
"Travel",
"Religion",
"Nature",
"Garden",
"Wellness"
];

export default function Component({listing, setSelectedListing, viewDeviations}) {
  const [title, setTitle] = useState(listing.title);
  const [estimatedPrice, setEstimatedPrice] = useState(listing.estimatedPrice / 100);
  const [estimatedViews, setEstimatedViews] = useState(listing.estimatedViews);
  const [description, setDescription] = useState(listing.description);
  const [uploadDate, setUploadDate] = useState(formatDate(new Date(convertFromUtcToLocal(listing.uploadDate))));
  const [published, setPublished] = useState(listing.published);
  const [image, setImage] = useState(null);
  const [load, setLoad] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(listing.tag);

  const handleImageChange = (event) => {
    const validImageTypes = ["image/png", "image/jpg", "image/jpeg"];
    if(!event.target.files || !event.target.files[0]) return;

    if(!validImageTypes.includes(event.target.files[0].type)) {
      toast.error("Invalid image type, we only accept PNG/JPG/JPEG");
      return;
    }

    const file = event.target.files[0];
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    if(sizeInMB > 5) {
      toast.error("The image is over 5MB in size, please select an image under 5MB");
      return;
    }

    setImage(event.target.files[0]);
  };

  function formatDate(date) {
    const year = date.getFullYear(); // Get the full year
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month and ensure it's two digits
    const day = String(date.getDate()).padStart(2, '0'); // Get the day and ensure it's two digits
    const formattedDate = `${year}/${month}/${day}`; // Concatenate the parts with slashes
    return formattedDate.replaceAll("/","-");;
  }

  function validate() {
    let message = "";

    if (!title) {
      message = "Listing must have a title";
    } else if (!description) {
      message = "Listing must have a caption";
    } else if(estimatedPrice <= 0) {
      message = "Price must be greater than $0.00";
    } else if(estimatedViews < 0) {
      message = "Estimated views can not be negative";
    } else if(inPast(uploadDate)) {
      message = "Upload date must be in the future";
    }

    if(message) {
      toast.error(message);
      setLoad(false);
      return false;
    }

    return true;
  }

  async function uploadListing(e) {
    setLoad(true);
    e.preventDefault();
    if(!validate()) return;

    const url = `${process.env.NEXT_PUBLIC_API_URL}/posts/${listing.id}`;
    const formData = new FormData();
    formData.append("tag", selectedCategory);
    formData.append("estimatedPrice", estimatedPrice);
    formData.append("uploadDate", addLocalTimezone(uploadDate));
    formData.append("estimatedViews", estimatedViews);
    formData.append("description", description);
    formData.append("title", title);
    formData.append("published", published);
    formData.append("file", image);

    const response = await axiosRequest(url, "PUT", formData);
    if(response.status === 200) {
      window.location.href = "";
    } else if(response.status === 403){
      toast.error(response.data.message);
    } else {
      toast.error("Something went wrong, try again later");
    }
    setLoad(false);
  }

  async function deleteListing() {
    setLoad(true);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/posts/${listing.id}`;
    const response = await request(url, "DELETE", null);
    if(response && response.success) {
      window.location.href = "";
    } else {
      if(response.status===401) toast.error(response.message);
      else toast.error("Something went wrong, try again later");
    }
    setLoad(false);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6 max-w-6xl mx-auto p-4 md:p-8">
      <div>
        <header className="flex items-center gap-4 mb-6">
          <Button onClick={() => setSelectedListing(null)}variant="outline" size="icon" className="rounded-full">
            <ChevronLeftIcon className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-2xl font-bold">Edit Listing</h1>
        </header>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                    <Label htmlFor="title" className="flex items-center">
                      <Info className="mr-2 text-green-400 h-5" />
                      Title
                    </Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} id="title" />
            </div>
            <div className="space-y-2">

                    <Label htmlFor="price" className="flex items-center">
                      <DollarSign className="mr-2 text-green-400 h-5" />
    Estimated Price ({listing.pricingModel})
                    </Label>
              <Input value={estimatedPrice} onChange={(e) => setEstimatedPrice(e.target.value)} id="price" type="number" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="views" className="flex items-center">
              <Eye className="mr-2 text-green-400" />Views</Label>
              <Input value={estimatedViews} onChange={(e) => setEstimatedViews(e.target.value)} id="views" type="number" />
            </div>
            <div className="space-y-2">

              <Label htmlFor="thumbnail" className="flex items-center">
    <Image className="mr-2 text-green-400 h-5" />
Change Thumbnail
    </Label>
              
              <Input id="thumbnail" type="file" onChange={handleImageChange} />
            </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="flex items-center">
                      <ListIcon className="mr-2 text-green-400" />
                      Category
                    </Label>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="border-gray-600 text-gray-100">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          contentTypes.map((item, idx) => (
                            <SelectItem key={idx} value={item}>{item}</SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </div>
            <div className="space-y-2">
              <Label htmlFor="upload-date" className="flex items-center"> 

    <Calendar className="mr-2 text-green-400 h-5" />
              Upload Date
              </Label>
              <Input value={uploadDate} onChange={(e) => setUploadDate(e.target.value)} id="upload-date" type="date" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              id="description"
              rows={5}
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="publish" className="flex items-center gap-2 font-normal">
              <Switch id="publish" aria-label="Publish post" checked={published} onCheckedChange={() => setPublished(!published)}/>
              {published ? "Public" : "Private"}
            </Label>
            <div className="ml-auto flex gap-2">
              <Button onClick={() => setSelectedListing(null)} variant="outline">Discard Changes</Button>
              <Button onClick={uploadListing} disabled={load}>{ load ? "loading..." : "Save Changes" } </Button>
            </div>
          </div>
        </form>
      </div>
      <div className="bg-muted rounded-lg p-6 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Post Stats</h3>
          <div className="flex items-center gap-2">

            {displayBadge(listing, viewDeviations)}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <EyeIcon className="w-5 h-5 text-muted-foreground" />
              <span>{estimatedViews.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-muted-foreground" />
              <span>{uploadDate}</span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Post Actions</h3>
          <Button onClick={deleteListing} disabled={load} variant="destructive" className="w-full">
            Delete Post
          </Button>
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


function ChevronLeftIcon(props) {
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
      <path d="m15 18-6-6 6-6" />
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

function displayBadge(listing, deviations) {
  const views = listing.estimatedViews;
  const details = [
    {backgroundColor: "green", color: "white"},
    {backgroundColor: "#FDDA0D", color: "black"},
    {backgroundColor: "red", color: "white"}
  ];
  const text = [
    "Low Risk",
    "Medium Risk",
    "High Risk",
  ];
  for(let i = 0; i < deviations.length - 1; i++) {
    if(views >= deviations[i] && views <= deviations[i + 1]) {
      return <Badge
        variant="solid"
        className="px-3 py-1 rounded-md text-xs font-medium"
        style={details[i]}
      >
        { text[i] }
      </Badge>
    }
  }
  return <Badge
    variant="solid"
    className="px-3 py-1 rounded-md text-xs font-medium"
    style={{ backgroundColor: "red", color: "white" }}
  >
    High Risk
  </Badge>
}
