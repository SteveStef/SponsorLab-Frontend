import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useState } from "react"; 
import { toast } from "sonner";
import request, { axiosRequest } from "@/request";

export default function Component({listing, setSelectedListing}) {
  const [title, setTitle] = useState(listing.title);
  const [estimatedPrice, setEstimatedPrice] = useState(listing.estimatedPrice);
  const [estimatedViews, setEstimatedViews] = useState(listing.estimatedViews);
  const [description, setDescription] = useState(listing.description);
  const [uploadDate, setUploadDate] = useState(formatDate(new Date(listing.uploadDate)));
  const [published, setPublished] = useState(listing.published);
  const [image, setImage] = useState(null);
  const [load, setLoad] = useState(false);
  const [tags, setTags] = useState(listing.tags);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };
  function formatDate(date) {
    const year = date.getFullYear(); // Get the full year
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month and ensure it's two digits
    const day = String(date.getDate()).padStart(2, '0'); // Get the day and ensure it's two digits
    const formattedDate = `${year}/${month}/${day}`; // Concatenate the parts with slashes
    return formattedDate.replaceAll("/","-");;
  }

  function validate() {
    let error = false;
    let message = "";

    if (!title) {
      message = "Listing must have a title";
      error = true;
    } else if (!description) {
      message = "Listing must have a caption";
      error = true;
    } else if(estimatedPrice <= 0) {
      message = "Price must be greater than $0.00";
      error = true;
    } else if(estimatedViews < 0) {
      message = "Estimated views can not be negative";
      error = true;
    }
    if(error) {
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
    formData.append("tags", tags);
    formData.append("estimatedPrice", estimatedPrice);
    formData.append("uploadDate", uploadDate);
    formData.append("estimatedViews", estimatedViews);
    formData.append("description", description);
    formData.append("title", title);
    formData.append("published", published);
    formData.append("file", image);

    const response = await axiosRequest(url, "PUT", formData);
    if(response.status === 200) {
      setSelectedListing(null);
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
      setSelectedListing(null);
    } else {
      toast.error("Something went wrong");
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
              <Label htmlFor="title">Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} id="title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Estimated Price</Label>
              <Input value={estimatedPrice} onChange={(e) => setEstimatedPrice(e.target.value)} id="price" type="number" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="views">Views</Label>
              <Input value={estimatedViews} onChange={(e) => setEstimatedViews(e.target.value)} id="views" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="thumbnail">Change Thumbnail</Label>
              <Input id="thumbnail" type="file" onChange={handleImageChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (separate words with comma's)</Label>
              <Input value={tags} onChange={(e) => setTags(e.target.value)} id="tags" type="text" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="upload-date">Upload Date</Label>
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
            <div className="flex items-center gap-1">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
            </div>
            <span className="text-muted-foreground">4.2</span>
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