"use client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { InfoIcon, DollarSignIcon, TrendingUpIcon, ImageIcon, CalendarIcon, EyeIcon, TypeIcon, ListIcon, MessageSquareIcon } from 'lucide-react';
import { addLocalTimezone, inPast } from "@/utils";

import { useState, useLayoutEffect } from "react";
import { axiosRequest } from "@/request";
import { toast } from "sonner";
import { useAppContext } from "@/context";
import { redirect, useRouter } from 'next/navigation';
import Image from "next/image";

export default function Component() {
  const [step, setStep] = useState(1);
  const [pricingModel, setPricingModel] = useState('CPM')

  const { role, organization } = useAppContext();
  const [load, setLoad] = useState(false);
  const router = useRouter();

  useLayoutEffect(() => {
    if(role && role !== "CREATOR"){
      redirect("/");
    }
  }, [role]);

  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedDate, setSelectedDate] = useState("");

  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");

  const [estimatedViews, setEstimatedViews] = useState(0);
  const [price, setPrice] = useState(0);

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
    setSelectedImage(URL.createObjectURL(event.target.files[0]));

  };

  function validate() {
    let message = "";

    if (!title) {
      message = "Listing must have a title";
    } else if (!caption) {
      message = "Listing must have a caption";

    } else if(price <= 0) {
      message = "Price must be greater than $0.00";

    } else if(estimatedViews < 0) {
      message = "Estimated views can not be negative";

    } else if(inPast(selectedDate)) {
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

    const url = `${process.env.NEXT_PUBLIC_API_URL}/posts`;
    const formData = new FormData();

    formData.append("tag", selectedCategory);
    formData.append("estimatedPrice", price);
    formData.append("uploadDate", addLocalTimezone(selectedDate));
    formData.append("estimatedViews", estimatedViews);
    formData.append("caption", caption);
    formData.append("title", title);
    formData.append("pricingModel", pricingModel);
    formData.append("file", image);

    const response = await axiosRequest(url, "POST", formData);
    if(response.status === 200) {
      router.push(`../profile/${organization}`);
    } else {
      toast.error("Something went wrong, try again later");
    }
    setLoad(false);
  }

  const nextStep = (e) => {
    e.preventDefault();
    setStep(step + 1)
  }
  const prevStep = (e) => {
    e.preventDefault();
    setStep(step - 1)
  }

  const stepInfo = [
    {
      title: "Basic Information",
      description: "Start by providing the fundamental details of your listing. This includes the title, which should be catchy and descriptive, the category that best fits your content, and a compelling caption that will grab sponsors' attention.",
      icon: <InfoIcon className="w-6 h-6 text-green-400" />,
    },
    {
      title: "Media and Metrics",
      description: "Now, let's add some visual appeal and projected performance metrics. Upload a thumbnail that represents your content, estimate the number of views you expect this video to receive, and set the planned upload date.",
      icon: <ImageIcon className="w-6 h-6 text-green-400" />,
    },
    {
      title: "Pricing Strategy",
      description: "Finally, decide on your pricing model. Choose between CPM (Cost Per Mille) for payment per thousand views, or a Flat Rate for a fixed payment regardless of views. Set your rates competitively to attract potential sponsors.",
      icon: <DollarSignIcon className="w-6 h-6 text-green-400" />,
    },
  ]

  return (
    <div className="flex text-gray-100 justify-center items-center p-4">
      <div className="w-full max-w-7xl rounded-lg shadow-xl overflow-hidden" style={{minHeight: "50%"}}>
        <div className="flex flex-col md:flex-row">
          {/* Left side panel */}
          <div className="w-full md:w-1/3 p-8" style={{backgroundColor: "#171717"}}>
            <h2 className="text-2xl font-bold mb-4 text-green-400">Step {step}</h2>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                {stepInfo[step - 1].icon}
                <span className="ml-2">{stepInfo[step - 1].title}</span>
              </h3>
              <p className="text-gray-300 text-sm">
                {stepInfo[step - 1].description}
              </p>
            </div>
          </div>

          {/* Main content area */}
          <div className="w-full md:w-2/3 p-8">
            <h1 className="text-3xl font-bold mb-6 text-green-400">Create a New Listing</h1>

            {/* Progress indicator */}
            <div className="mb-6 flex justify-between">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-1/3 h-2 rounded ${i <= step ? 'bg-green-400' : 'bg-gray-600'} transition-all duration-300`}
                />
              ))}
            </div>

            <div className="space-y-6">
              {step === 1 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="title" className="flex items-center">
                      <TypeIcon className="mr-2 text-green-400" />
                      Title
                    </Label>
                    <Input onChange={(e) => setTitle(e.target.value)} id="title" value={title} placeholder="Enter listing title" className="border-gray-600 text-gray-100" />
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
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="gaming">Gaming</SelectItem>
                        <SelectItem value="lifestyle">Lifestyle</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="caption" className="flex items-center">
                      <MessageSquareIcon className="mr-2 text-green-400" />
                      Caption
                    </Label>
                    <Textarea onChange={(e) => setCaption(e.target.value)} value={caption} id="caption" placeholder="Enter listing caption" className="border-gray-600 text-gray-100" />
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="thumbnail" className="flex items-center">
                      <ImageIcon className="mr-2 text-green-400" />
                      Thumbnail
                    </Label>
                    <div className="flex items-center space-x-4">
                      <Input onChange={handleImageChange} id="thumbnail" type="file" accept="image/*" className="border-gray-600 text-gray-100" />
                      <div className="w-20 h-10 bg-gray-600 rounded flex items-center justify-center">
                        {
                          selectedImage ?
                        <Image
                          src={selectedImage}
                          width="400"
                          height="400"
                          alt="selected image"
                        /> :
                        <ImageIcon className="text-gray-400" size={24} />
                        }
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estimatedViews" className="flex items-center">
                      <EyeIcon className="mr-2 text-green-400" />
                      Estimated Views
                    </Label>
                    <Input onChange={(e) => setEstimatedViews(e.target.value)} value={estimatedViews} id="estimatedViews" type="number" placeholder="Enter estimated views" className="border-gray-600 text-gray-100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="uploadDate" className="flex items-center">
                      <CalendarIcon className="mr-2 text-green-400" />
                      Upload Date
                    </Label>
                    <Input onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate} id="uploadDate" type="date" className="border-gray-600 text-gray-100" />
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="space-y-2">
                    <Label className="flex items-center">
                      <TrendingUpIcon className="mr-2 text-green-400" />
                      Pricing Model
                    </Label>
                    <RadioGroup value={pricingModel} onValueChange={setPricingModel} className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="CPM" id="CPM" />
                        <Label htmlFor="CPM">CPM</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="FLAT" id="FLAT" />
                        <Label htmlFor="FLAT">Flat Rate</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  {pricingModel === 'CPM' ? (
                    <div className="space-y-2">
                      <Label htmlFor="cpmRate">CPM Rate ($)</Label>
                      <Input onChange={(e) => setPrice(e.target.value)} id="cpmRate" type="number" placeholder="Enter CPM rate" className="border-gray-600 text-gray-100" />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="flatRate">Flat Rate ($)</Label>
                      <Input onChange={(e) => setPrice(e.target.value)} id="flatRate" type="number" placeholder="Enter flat rate" className="border-gray-600 text-gray-100" />
                    </div>
                  )}
                </>
              )}

              <div className="flex justify-between pt-4">
                {step > 1 && (
                  <Button type="button" onClick={prevStep} variant="outline" className="bg-gray-600 hover:bg-gray-500">
                    Previous
                  </Button>
                )}
                {step < 3 ? (
                  <Button type="button" onClick={nextStep} className="bg-green-500 hover:bg-green-400 ml-auto">
                    Next
                  </Button>
                ) : (
                  <Button disabled={load} onClick={uploadListing} className="bg-green-500 hover:bg-green-400 ml-auto">
                    Create Listing
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}





/*
"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Upload, InfoIcon, CheckCircleIcon } from "lucide-react"
import { format } from "date-fns"
import { useState, useLayoutEffect, useRef } from "react";
import { axiosRequest } from "@/request";
import { toast } from "sonner";
import { useAppContext } from "@/context";
import { redirect, useRouter } from 'next/navigation';

export default function Component() {
  const { role, organization } = useAppContext();
  const [load, setLoad] = useState(false);
  const router = useRouter();

  useLayoutEffect(() => {
    if(role && role !== "CREATOR"){
      redirect("/");
    }
  }, [role]);

  const [selectedCategory, setSelectedCategory] = useState("")
  const [pricingModel, setPricingModel] = useState("flat")

  const [selectedDate, setSelectedDate] = useState("");
  const [tag, setTag] = useState("");

  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const title = useRef("");
  const caption = useRef("");
  const estimatedViews = useRef(0);
  const price = useRef(0.0);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  function validate() {
    let error = false;
    let message = "";

    if (!title.current.value) {
      message = "Listing must have a title";
      error = true;
    } else if (!caption.current.value) {
      message = "Listing must have a caption";
      error = true;

    } else if(price.current.value <= 0) {
      message = "Price must be greater than $0.00";
      error = true;

    } else if(estimatedViews.current.value < 0) {
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

    const url = `${process.env.NEXT_PUBLIC_API_URL}/posts`;
    const formData = new FormData();
    setTag("Art");
    setPricingModel("FLAT");
    formData.append("tag", tag);
    formData.append("estimatedPrice", price.current.value+"");
    formData.append("uploadDate", selectedDate);
    formData.append("estimatedViews", estimatedViews.current.value);
    formData.append("caption", caption.current.value);
    formData.append("title", title.current.value);
    formData.append("pricingModel", pricingModel);
    formData.append("file", image);

    const response = await axiosRequest(url, "POST", formData);
    if(response.status === 200) {
      router.push(`../profile/${organization}`);
    } else {
      toast.error("Something went wrong, try again later");
    }
    setLoad(false);
  }

  return (
    <div className="text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-9xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Create a New Listing</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <Card className="border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center">
                <InfoIcon className="mr-2 text-green-400" />
                CPM vs. Flat Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-2">CPM (Cost Per Mille)</h3>
              <p className="text-sm mb-4">You're paid based on every 1,000 views your video receives. Great for videos expected to go viral or have high view counts.</p>
              <h3 className="font-semibold mb-2">Flat Rate</h3>
              <p className="text-sm">You're paid a fixed amount regardless of view count. Ideal for niche content or when you want a guaranteed payment.</p>
            </CardContent>
          </Card>

          <div className="lg:col-span-2">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input ref={title} id="title" placeholder="Enter your video title" className="border-gray-700 text-gray-100" />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
<Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="border-gray-700 text-gray-100">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className="border-gray-700 text-gray-100">
            <SelectItem value="tech">Technology</SelectItem>
            <SelectItem value="gaming">Gaming</SelectItem>
            <SelectItem value="lifestyle">Lifestyle</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="entertainment">Entertainment</SelectItem>
          </SelectContent>
        </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="caption">Caption</Label>
                <Textarea ref={caption} id="caption" placeholder="Enter a brief description of your video" className="border-gray-700 text-gray-100" />
              </div>

              <div>
                <Label htmlFor="thumbnail">Thumbnail</Label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-400">
                      <label htmlFor="thumbnail-upload" className="relative cursor-pointer rounded-md font-medium text-green-400 hover:text-green-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                        <span>{image ? `Selected: ${image.name}`: "Click to upload a file"}</span>
                        <input onChange={handleImageChange}id="thumbnail-upload" name="thumbnail-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1"></p>
                    </div>
                    <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="estimated-views">Estimated Views</Label>
                  <Input ref={estimatedViews}id="estimated-views" type="number" placeholder="Enter estimated views" className="border-gray-700 text-gray-100" />
                </div>

                <div>
                  <Label htmlFor="upload-date">Upload Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`w-full justify-start text-left font-normal border-gray-700 text-gray-100 ${!selectedDate && "text-muted-foreground"}`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 border-gray-700">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <Label>Pricing Model</Label>
<RadioGroup value={pricingModel} onValueChange={setPricingModel} className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cpm" id="cpm" />
            <Label htmlFor="cpm">CPM</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="flat" id="flat" />
            <Label htmlFor="flat">Flat Rate</Label>
          </div>
        </RadioGroup>
              </div>

              <div>
                <Label htmlFor="estimated-price">Estimated Price</Label>
                <Input ref={price} id="estimated-price" type="number" placeholder="Enter estimated price" className="border-gray-700 text-gray-100" />
              </div>

              <Button disabled={load} onClick={uploadListing} className="w-full bg-green-600 hover:bg-green-700 text-white">
                Create Listing
              </Button>
            </form>
          </div>

          <Card className="border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircleIcon className="mr-2 text-green-400" />
                Creation Process
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Fill out all the required information in the form.</li>
                <li>Upload a compelling thumbnail that represents your video.</li>
                <li>Choose between CPM and Flat Rate pricing models.</li>
                <li>Set a competitive price based on your audience and content.</li>
                <li>Review your listing details before submission.</li>
                <li>Click "Create Listing" to submit your listing for review.</li>
                <li>Once approved, your listing will be visible to potential sponsors.</li>
              </ol>
              <p className="mt-4 text-sm text-green-400">Tip: Detailed and accurate listings tend to attract more sponsors!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
 * */














