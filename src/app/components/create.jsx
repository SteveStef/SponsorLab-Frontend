"use client";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import cuphead from "../../../public/headcup.jpg"
import { useState, useLayoutEffect } from "react";
import { axiosRequest } from "@/request";
import { toast } from "sonner";
import { useAppContext } from "@/context";
import { redirect } from 'next/navigation';

export default function Component() {
  const { role } = useAppContext();

  useLayoutEffect(() => {
    if(role !== "CREATOR"){
      redirect("/");
    }
  }, []);

  const [title, setTitle] = useState("Listing Title");
  const [caption, setCaption] = useState("Capture the beauty of the great outdoors in this breathtaking nature photograph.");
  const [image, setImage] = useState(null);
  const [estimatedViews, setEstimatedViews] = useState(0);
  const [uploadDate, setUploadDate] = useState("MM-DD-YYYY");
  const [tagsList, setTagsList] = useState([]);
  const [tags, setTags] = useState("");
  const [price, setPrice] = useState(0.0);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  function validate() {
    let error = false;
    let message = "";

    if (!title) {
      message = "Listing must have a title";
      error = true;
    } else if (!caption) {
      message = "Listing must have a caption";
      error = true;
    } else if(price <= 0) {
      message = "Price must be greater than $0.00";
      error = true;
    } else if(estimatedViews < 0) {
      message = "Estimated views can not be negative";
      error = true;
    }
    if(error) {
      toast.error(message);
      return false;
    }
    return true;
  }

  async function uploadListing(e) {
    e.preventDefault();
    if(!validate()) return;

    const url = `${process.env.NEXT_PUBLIC_API_URL}/posts`;
    const formData = new FormData();
    formData.append("tags", tags);
    formData.append("estimatedPrice", price);
    formData.append("uploadDate", uploadDate);
    formData.append("estimatedViews", estimatedViews);
    formData.append("caption", caption);
    formData.append("title", title);
    formData.append("file", image);

    const response = await axiosRequest(url, "POST", formData);
    console.log(response);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto p-4 md:p-8">
      <div className="grid gap-6">
        <h1 className="text-3xl font-bold">Create New Listing</h1>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} id="title" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="caption">Caption</Label>
            <Textarea value={caption} onChange={(e) => setCaption(e.target.value) } id="caption" placeholder="Enter a caption" rows={3} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Thumbnail</Label>
            <Input className="" onChange={handleImageChange} id="image" type="file" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="views">Estimated Views</Label>
              <Input value={estimatedViews} onChange={(e) => setEstimatedViews(e.target.value)} id="views" type="number" placeholder="Enter estimated views" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="upload-date">Upload Date</Label>
              <Input value={uploadDate} onChange={(e) => setUploadDate(e.target.value)} id="upload-date" type="date" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tags">Tags (separate each tag with a comma)</Label>
            <Input value={tags} onChange={(e) => {
              setTags(e.target.value);
              let list = e.target.value.split(",");
              if(list.length <= 2) setTagsList(e.target.value.split(","));
            }} id="tags" type="text" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input value={price} onChange={(e) => setPrice(e.target.value)} id="price" type="number" placeholder="Enter a price" />
          </div>
          <Button onClick={uploadListing} type="submit" className="justify-self-start bg-green-500">
            Create Listing
          </Button>
        </form>
      </div>
      <div className="p-6 rounded-lg shadow-lg border-2">
        <h2 className="text-2xl font-bold mb-4">Preview</h2>
        <div className="grid gap-4">
          <Image
            src={selectedImage || cuphead}
            alt="Listing Image"
            width={600}
            height={400}
            className="rounded-lg w-full aspect-[3/2] object-cover"
          />
          <div className="grid gap-2">
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-muted-foreground">
              {caption}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1">
              <div className="font-semibold">Estimated Views</div>
              <div>{estimatedViews}</div>
            </div>
            <div className="grid gap-1">
              <div className="font-semibold">Upload Date</div>
              <div>{uploadDate}</div>
            </div>
            <div className="grid gap-1">
              <div className="font-semibold">Tags</div>
              <div className="flex gap-2">
                {
                  tagsList.map((tag, idx)=> {
                    return <Badge key={idx} variant="outline">{tag}</Badge>
                  })
                }
              </div>
            </div>
            <div className="grid gap-1">
              <div className="font-semibold">Price</div>
              <div>${price}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
