"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAppContext } from "@/context";
import { useState, useEffect } from "react";
import { axiosRequest } from "@/request";
import { toast } from "sonner";
import request from "@/request";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const contentTypes = [
  "Technology",
  "Gaming",
  "Pets",
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

const productCategories = [
  "Electronics",
  "Home & Kitchen",
  "Fashion & Apparel",
  "Beauty & Personal Care",
  "Health & Wellness",
  "Toys & Games",
  "Sports & Outdoors",
  "Automotive",
  "Office Supplies",
  "Baby Products",
  "Pet Supplies",
  "Grocery & Gourmet Food",
  "Tools & Home Improvement",
  "Books & Media",
  "Garden & Outdoors",
  "Jewelry & Accessories",
  "Crafts & DIY",
  "Travel & Luggage",
  "Music Instruments & Gear",
  "Home Decor"
];

import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Component() {
  const state = useAppContext();

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [load, setLoad] = useState(false);
  const [loadingRedirect, setLoadingRedirect] = useState(false);

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
    setSelectedImage(URL.createObjectURL(event.target.files[0]))
  }

  useEffect(() => {
    setName(state.name);
  },[state]);


  async function updateProfile() {
    setLoad(true)
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/update-profile`
    const formData = new FormData()
    formData.append("name", name)
    formData.append("file", image)
    formData.append("oldPassword", oldPassword)
    formData.append("newPassword", newPassword)

    const response = await axiosRequest(url, "PUT", formData)
    if (response && response.status === 200) {
      toast.success("Uploaded profile")
    } else if (response.status !== 500) {
      toast.error(response.data.message)
    } else {
      toast.error("Something went wrong")
    }
    setLoad(false)
  }

  const addBankAccount = async () => {
    setLoadingRedirect(true)
    const path = `${process.env.NEXT_PUBLIC_API_URL}/stripe/manage-account`
    const response = await request(path, "POST", { email: state.email })
    if (!response || !response.body || !response.body.url) {
      toast({ title: response.message || "Error creating account" })
      setLoadingRedirect(false)
      return
    }
    window.location.href = response.body.url
  }

  const addPaymentMethod = async () => {
    setLoadingRedirect(true)
    const url = `${process.env.NEXT_PUBLIC_API_URL}/stripe/manage-customer`
    const body = { email: state.email, name: state.name }
    const response = await request(url, "POST", body)

    if (!response) {
      toast({ title: "Error creating customer" })
      setLoadingRedirect(false)
      return
    }

    if (response.url) {
      window.location.href = response.url;
      return
    }

    if (!response.sessionId) {
      toast({ title: response.message || "Error creating customer" })
      setLoadingRedirect(false)
      return
    }

    const stripe = await stripePromise
    const data = await stripe.redirectToCheckout({ sessionId: response.sessionId })
    if (data.error) {
      toast.error("Error redirecting to checkout")
      setLoadingRedirect(false)
      return
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account details.</p>
        </div>
        <Tabs defaultValue="account" className="w-full">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
    {state.role==="SPONSOR"&&
      <TabsTrigger value="profile">Profile</TabsTrigger>
    }
            <TabsTrigger value="payment">Payment</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)}id="firstName" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input value={state.email} disabled id="email" type="email" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Profile Picture</Label>
                  <div className="flex items-center gap-4" style={{ cursor: state.accountType === "GOOGLE" ? "not-allowed" : "" }}>
                    <Avatar className="h-16 w-16 border">
                      <AvatarImage src={selectedImage || state.profilePic} alt="Profile" />
                      <AvatarFallback>{state.name[0]}</AvatarFallback>
                    </Avatar>
                    <Button disabled={state.accountType === "GOOGLE"} variant="outline">
                      <input onChange={handleImageChange} type="file" id="fileInput" style={{ opacity: "0", position: "absolute", width: "100px", cursor: "pointer" }} />
                      <UploadIcon className="mr-2 h-4 w-4 cursor-pointer" />
                      Change
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-xl font-bold">Change Password</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      disabled={state.accountType === "GOOGLE"}
                      onChange={(e) => setOldPassword(e.target.value)}
                      value={oldPassword}
                      id="currentPassword"
                      type="password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      disabled={state.accountType === "GOOGLE"}
                      onChange={(e) => setNewPassword(e.target.value)}
                      value={newPassword}
                      id="newPassword"
                      type="password"
                    />
                  </div>
                </div>
              </div>
            </div>

        <div className="flex justify-end">
          <Button onClick={updateProfile} disabled={load}>
            Save Changes
          </Button>
        </div>
          </TabsContent>

            {
              state && state.company && state.role==="SPONSOR" &&
              <TabsContent value="profile" className="space-y-6">
              <SponsorProfileUpdate formState={state.company} />
              </TabsContent>
            }

          <TabsContent value="payment" className="space-y-6">

          <PaymentSection role={state.role} addPaymentMethod={addPaymentMethod} 
            addBankAccount={addBankAccount} loadingRedirect={loadingRedirect}/>

          </TabsContent>
        </Tabs>

      </div>
    </div>
  )
}

function PaymentSection({ role, addPaymentMethod, addBankAccount, loadingRedirect}) {
  const [cardInfo, setCardInfo] = useState(null);
  const [bankAccountInfo, setBankAccountInfo] = useState(null);

  function routeToFn() {
    if (role === "SPONSOR") {
      addPaymentMethod()
    } else {
      addBankAccount()
    }
  }


  useEffect(() => {
    async function fetchCustomer() {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/stripe/customer`;
      const response = await request(url, "GET", null);
      if(response && response.success) {
        setCardInfo(response.customer);
      }
    }

    async function fetchBankAccountInfo() {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/stripe/account`;
      const response = await request(url, "GET", null);
      if(response && response.success) {
        setBankAccountInfo(response.account);
      }
    }

    if(role === "SPONSOR") fetchCustomer();
    else if(role === "CREATOR") fetchBankAccountInfo();
  },[role]);

  if(role === "SPONSOR") {
    return <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment information and view your current status.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
              {
                cardInfo && 
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <CreditCardIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {cardInfo && cardInfo.brand} ending in {cardInfo && cardInfo.last4}
                      </p>
                      <p className="text-sm text-muted-foreground">Expires {cardInfo && cardInfo.expMonth}/{cardInfo && cardInfo.expYear}</p>
                    </div>
                  </div>
                  <Badge variant={cardInfo && cardInfo.verified ? "success" : "warning"}>
                    {cardInfo && cardInfo.verified ? "Active" : "Incomplete"}
                  </Badge>
                </div>
              }
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Payment Status</h3>
                  <div className="flex items-center space-x-2">
                    {cardInfo && cardInfo.verified ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircleIcon className="h-5 w-5 text-yellow-500" />
                    )}
                    <span className="text-sm">
                      {cardInfo && cardInfo.verified
                        ? "Your payment method is set up and active."
                        : "Please complete your payment setup."}
                    </span>
                  </div>
                </div>
                <Button onClick={routeToFn} variant="outline" className="w-full">
                  <CreditCardIcon className="mr-2 h-4 w-4" />
                  {loadingRedirect ? "Redirecting..." : "Manage Payment Method"}
                </Button>
              </CardContent>
            </Card>

  } else if(role === "CREATOR") {
    return <Card>
              <CardHeader>
                <CardTitle>Bank Account Information</CardTitle>
                <CardDescription>View and manage your connected bank account.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
            {
              bankAccountInfo && 
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                    </div>
                    <div>
                      <p className="font-medium">{bankAccountInfo && bankAccountInfo.name}</p>
                      <p className="text-sm text-muted-foreground">Account ending in {bankAccountInfo && bankAccountInfo.last4}</p>
                    </div>
                  </div>
            }

                    <span className="text-sm flex">
                    {bankAccountInfo && bankAccountInfo.verified ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                    ) : (
                      <AlertCircleIcon className="h-5 w-5 text-yellow-500 mr-2" />
                    )}
                      {bankAccountInfo && bankAccountInfo.verified
                        ? "Your bank account is set up and active."
                        : "Please complete your bank setup."}
                    </span>
                  <Badge>
                    {bankAccountInfo && bankAccountInfo.verified ? "Active" : "Incomplete"}
                  </Badge>
                </div>
                <Button onClick={addBankAccount} variant="outline" className="w-full">
                  Update Bank Account
                </Button>
              </CardContent>
            </Card>
  }
}

function SponsorProfileUpdate({ formState }) {
  const [load, setLoad] = useState(false);
  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const [formData, setFormData] = useState({
    website: formState.website,
    description: formState.description,
    productCategories: formState.productCategories,
    contentTypes: formState.contentTypes,
    audienceAge: formState.audienceAge,
    budgetRange: formState.budgetRange,
    goals: formState.goals
  });

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const updateAccountInfo = async () => {
    setLoad(true);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/sponsor/create-profile`;
    const response = await request(url, "POST", formData);
    if(response && response.success) {
      toast.success("Your profile has been updated");
    } else {
      toast.error("There is a problem with updating your profile.");
    }
    setLoad(false);
  }

  return    <><Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your profile details and preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleFormChange('website', e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountDescription">Account Description</Label>
                  <Textarea
                    id="accountDescription"
                    value={formData.description}
                    onChange={(e) => handleFormChange('description', e.target.value)}
                    placeholder="Describe your account or business..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Product Categories</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {productCategories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={formData.productCategories.includes(category)}
                          onCheckedChange={(checked) => handleCheckboxChange('productCategories', category)}
                        />
                        <Label htmlFor={`category-${category}`}>{category}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>What channels types are you interested in sponsoring?</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {contentTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`content-${type}`}
                          checked={formData.contentTypes.includes(type)}
                          onCheckedChange={(checked) => handleCheckboxChange('contentTypes', type)}
                        />
                        <Label htmlFor={`content-${type}`}>{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="audienceAge">Target Audience Age</Label>
                  <Select value={formData.audienceAge} onValueChange={(value) => handleFormChange('audienceAge', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select age range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="13-17">13-17</SelectItem>
                      <SelectItem value="18-24">18-24</SelectItem>
                      <SelectItem value="25-34">25-34</SelectItem>
                      <SelectItem value="35-44">35-44</SelectItem>
                      <SelectItem value="45+">45+</SelectItem>
                      <SelectItem value="ALL">All ages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budgetRange">Budget Range</Label>
                  <Select value={formData.budgetRange} onValueChange={(value) => handleFormChange('budgetRange', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1000">$0 - $1,000</SelectItem>
                      <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                      <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10000+">$10,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goals">Goals</Label>
                  <Textarea
                    id="goals"
                    value={formData.goals}
                    onChange={(e) => handleFormChange('goals', e.target.value)}
                    placeholder="What are your main goals for your account or business?"
                  />
                </div>
              </CardContent>
            </Card>

        <div className="flex justify-end">
          <Button onClick={updateAccountInfo} disabled={load}>
            Save Changes
          </Button>
        </div>
    </>

}


function CreditCardIcon(props) {
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
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}

function CheckCircleIcon(props) {
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
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

function AlertCircleIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}

function UploadIcon(props) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}
