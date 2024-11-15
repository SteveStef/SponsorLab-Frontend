'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { InfoIcon, DollarSignIcon, TrendingUpIcon, ImageIcon, CalendarIcon, EyeIcon, TypeIcon, ListIcon, MessageSquareIcon } from 'lucide-react';
import { addLocalTimezone, inPast } from "@/utils";

import { useState, useLayoutEffect } from "react";
import { axiosRequest } from "@/request";
import { toast } from "sonner";
import { useAppContext } from "@/context";
import { redirect, useRouter } from 'next/navigation';
import Image from "next/image";

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
]

export default function Component() {
  const [step, setStep] = useState(1)
  const [pricingModel, setPricingModel] = useState('CPM')

  const { role, organization } = useAppContext()
  const [load, setLoad] = useState(false)
  const router = useRouter()

  useLayoutEffect(() => {
    if(role && role !== "CREATOR"){
      redirect("/")
    }
  }, [role])

  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedDate, setSelectedDate] = useState("")

  const [image, setImage] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  const [title, setTitle] = useState("")
  const [caption, setCaption] = useState("")

  const [estimatedViews, setEstimatedViews] = useState("")
  const [price, setPrice] = useState("")

  const handleImageChange = (event) => {
    const validImageTypes = ["image/png", "image/jpg", "image/jpeg"]
    if(!event.target.files || !event.target.files[0]) return

    if(!validImageTypes.includes(event.target.files[0].type)) {
      toast.error("Invalid image type, we only accept PNG/JPG/JPEG")
      return
    }

    const file = event.target.files[0]
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2)
    if(sizeInMB > 5) {
      toast.error("The image is over 5MB in size, please select an image under 5MB")
      return
    }

    setImage(file)
    setSelectedImage(URL.createObjectURL(file))
  }

  const validateStep = (currentStep) => {
    switch(currentStep) {
      case 1:
        return title.trim() !== "" && selectedCategory !== "" && caption.trim() !== ""
      case 2:
        return estimatedViews !== "" && selectedDate !== ""
      case 3:
        return price !== ""
      default:
        return false
    }
  }

  const nextStep = (e) => {
    e.preventDefault()
    if (validateStep(step)) {
      setStep(step + 1)
    } else {
      toast.error("Please fill in all fields before proceeding.")
    }
  }

  const prevStep = (e) => {
    e.preventDefault()
    setStep(step - 1)
  }

  const uploadListing = async (e) => {
    e.preventDefault()
    if (!validateStep(3)) {
      toast.error("Please fill in all fields before submitting.")
      return
    }

    setLoad(true)

    if(inPast(selectedDate)) {
      toast.error("Upload date must be in the future")
      setLoad(false)
      return
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/posts`
    const formData = new FormData()

    formData.append("tag", selectedCategory)
    formData.append("estimatedPrice", price)
    formData.append("uploadDate", addLocalTimezone(selectedDate))
    formData.append("estimatedViews", estimatedViews)
    formData.append("caption", caption)
    formData.append("title", title)
    formData.append("pricingModel", pricingModel)
    formData.append("file", image)

    try {
      const response = await axiosRequest(url, "POST", formData)
      if(response.status === 200) {
        toast.success("The listing was created and is public for sponsors to see!")
        router.push(`../profile/${organization}`)
      } else {
        throw new Error("Server responded with an error")
      }
    } catch (error) {
      toast.error("Something went wrong, try again later")
    } finally {
      setLoad(false)
    }
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
                        {contentTypes.map((item, idx) => (
                          <SelectItem key={idx} value={item}>{item}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="caption" className="flex items-center">
                      <MessageSquareIcon className="mr-2 text-green-400" />
                      Description
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
                      <label htmlFor="thumbnail" className="bg-gray-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-gray-700">
                        {image ? image.name : "Upload Image Here"}
                      </label>
                      <input onChange={handleImageChange} id="thumbnail" type="file" accept="image/*" className="hidden" />
                      <div className="w-20 h-10 bg-gray-600 rounded flex items-center justify-center">
                        {selectedImage ? (
                          <Image
                            src={selectedImage}
                            width={400}
                            height={400}
                            alt="selected image"
                          />
                        ) : (
                          <ImageIcon className="text-gray-400" size={24} />
                        )}
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
                      <Label htmlFor="cpmRate">CPM Rate $ (How many dollars per 1,000 views)</Label>
                      <Input onChange={(e) => setPrice(e.target.value)} value={price} id="cpmRate" type="number" placeholder="Enter CPM rate" className="border-gray-600 text-gray-100" />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="flatRate">Flat Rate ($)</Label>
                      <Input onChange={(e) => setPrice(e.target.value)} value={price} id="flatRate" type="number" placeholder="Enter flat rate" className="border-gray-600 text-gray-100" />
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
                  <Button 
                    type="button" 
                    onClick={nextStep} 
                    className="bg-green-500 hover:bg-green-400 ml-auto"
                    disabled={!validateStep(step)}
                  >
                    Next
                  </Button>
                ) : (
                  <Button 
                    disabled={load || !validateStep(step)} 
                    onClick={uploadListing} 
                    className="bg-green-500 hover:bg-green-400 ml-auto"
                  >
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
