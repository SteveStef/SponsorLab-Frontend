"use client";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useAppContext } from "@/context";
import { useRef, useEffect, useState } from "react";
import { axiosRequest } from "@/request";
import { toast } from "sonner";

export default function Component() {
  const state = useAppContext();
  const name = useRef("");
  const description = useRef("");
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [load, setLoad] = useState(false);

  useEffect(() => {
    name.current.value = state.name;
    description.current.value = state.description;
  }, [state]);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  async function updateProfile() {
    setLoad(true);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/update-profile`;
    const formData = new FormData();
    formData.append("name", name.current.value);
    formData.append("bio", description.current.value);
    formData.append("file", image);
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPassword);

    const response = await axiosRequest(url, "PUT", formData);
    console.log(response);
    if(response && response.status === 200) {
      toast.success("Uploaded profile");
    } else if(response.status !== 500) {
      toast.error(response.data.message);
    } else {
      toast.error("Something went wrong");
    }
    setLoad(false);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account details.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Name</Label>
              <Input ref={name} id="firstName" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input value={state.email} disabled id="email" type="email" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Profile Picture</Label>
              <div className="flex items-center gap-4"style={{cursor: state.accountType === "GOOGLE" ? "not-allowed" : ""}} >
                <Avatar className="h-16 w-16 border">
                  <AvatarImage src={selectedImage || state.profilePic} alt="Profile" />
                  <AvatarFallback>{state.name[0]}</AvatarFallback>
                </Avatar>
                <Button  disabled={state.accountType === "GOOGLE"}  variant="outline">
                  <input onChange={handleImageChange} type="file" id="fileInput" style={{opacity: "0", position: "absolute", width: "100px", cursor: "pointer"}} />
                  <UploadIcon className="mr-2 h-4 w-4 cursor-pointer" />
                  Change
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Profile Description</Label>
            <Textarea ref={description} id="description" placeholder="Tell us a bit about yourself..." className="min-h-[120px]" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Change Password</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input disabled={state.accountType === "GOOGLE"} onChange={(e) => setOldPassword(e.target.value)}value={oldPassword}id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input disabled={state.accountType === "GOOGLE"} onChange={(e) => setNewPassword(e.target.value)} value={newPassword}id="newPassword" type="password" />
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Payment Methods</h2>
            <Button variant="outline">
              <CreditCardIcon className="mr-2 h-4 w-4" />
              Manage Credit Card/Banking Info
            </Button>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={updateProfile} disabled={load}>Save Changes</Button>
        </div>
      </div>
    </div>
  )
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
