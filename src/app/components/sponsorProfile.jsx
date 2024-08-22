import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Globe, Target, Video, Users, Flag } from "lucide-react"
import { useEffect, useState } from "react";
import request from "@/request";
import { useAppContext } from "@/context"
import NotFound from "./NotFound";

export default function Component({params}) {
  const { id } = params;
  const [profile, setProfile] = useState({});
  const [owner, setOwner] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const { role, company, name, profilePic }  = useAppContext();

  async function fetchProfile() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/sponsor/${id}`;
    const response = await request(url ,"GET", null);
    if(response && response.success) {
      setProfile(response.body);
    } else {
      setNotFound(true);
    }
  }

  useEffect(() => {
    if(!role) return;
    if(role === "CREATOR") {
      fetchProfile();
      return;
    }
    if(!id || !company) return;
    if(id !== company.id) fetchProfile();
    else {
      setProfile(company);
      setOwner(true);
    }
  },[id,company,role]);

  if(notFound)  {
    return <NotFound />
  }

  return (
    <div className="text-gray-100">
      {/* Profile Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
          <Avatar className="w-20 h-20 border-4 border-gray-900">
            {
              !owner ?
            <AvatarImage src={profile.googleImage || profile.s3ImageName} alt="Sponsor logo" />
            :
            <AvatarImage src={profilePic} alt="Sponsor logo" />
            }
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold">{owner ? name : profile.user && profile.user.name}</h1>
            <p className="text-gray-400">{profile.orginization}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <Card className="transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-green-500/20">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-green-400">About Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  {profile.description}
                </p>
              </CardContent>
            </Card>

            {/* Products/Services Section */}
            <Card className="transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-green-500/20">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-green-400">Our Products</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Smart Phone Cases</h3>
                  <p className="text-sm text-gray-300">Durable and stylish protection for your devices.</p>
                </div>
                <div className="p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Wireless Chargers</h3>
                  <p className="text-sm text-gray-300">Fast and convenient charging solutions.</p>
                </div>
                <div className="p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Bluetooth Earbuds</h3>
                  <p className="text-sm text-gray-300">Crystal-clear audio with long battery life.</p>
                </div>
                <div className="p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Laptop Accessories</h3>
                  <p className="text-sm text-gray-300">Enhance your productivity with our range of accessories.</p>
                </div>
              </CardContent>
            </Card>

            {/* Preferred Content Types */}
            <Card className="border-gray-700 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-green-500/20">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-green-400">Preferred Content Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {
                    profile.contentTypes && profile.contentTypes.map((name, idx) => {
                      return(
                        <Badge key={idx}variant="secondary">{name}</Badge>
                      )
                    })
                  }
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Info */}
            <Card className="border-gray-700 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-green-500/20">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-green-400">Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Globe className="text-green-400" />
                  <a href="#" className="text-green-400 hover:underline">
                    {profile.website}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="text-green-400" />
                  <span>Target audience, {profile.audienceAge} years old</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Video className="text-green-400" />
                  <span>50+ sponsored videos</span>
                </div>
              </CardContent>
            </Card>

            {/* Goals */}
            <Card className="border-gray-700 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-green-500/20">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-green-400">Our Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Flag className="text-green-400 mt-1" />
                  <span>{profile.goals}</span>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-green-600 text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-green-500/20">
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-semibold mb-4">Interested in partnering?</h3>
                <Button variant="secondary" className="w-full">
                  Contact Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
