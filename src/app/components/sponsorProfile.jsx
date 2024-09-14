import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Globe, Target, Video, Flag, LucideYoutube, Clock, FileIcon, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import request from "@/request";
import { useAppContext } from "@/context";
import NotFound from "./NotFound";
import CreateSponsorFlow from "./sub-component/sponsorProfileCreate.jsx";

export default function Component({params}) {
  const { id } = params;
  const [profile, setProfile] = useState({});
  const [owner, setOwner] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const { role, company, name, profilePic }  = useAppContext();
  const [showCreateFlow, setShowCreateFlow] = useState(false);
  const [reqs, setReqs] = useState([]);

  async function fetchProfile() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/sponsor/${id}`;
    const response = await request(url ,"GET", null);
    if(response && response.success) {
      setReqs(response.body.user.requestsCreated.filter(r => r.transaction !== null)); 
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
      fetchProfile();
      if(!company.setup) setShowCreateFlow(true);
      setOwner(true);
    }
  },[id,company,role]);

  if(showCreateFlow) {
    return <CreateSponsorFlow refresh={fetchProfile} setShowCreateFlow={setShowCreateFlow}/>
  }

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
    <Card className="w-full p-4 rounded-lg mt-5 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-green-500/20">
    <CardTitle className="text-2xl font-semibold text-green-400">Recent Sponsorings</CardTitle>
    {
      reqs.length === 0 &&
      <NoRequests />
    }
      <div className="grid grid-cols-2 gap-3">
        {reqs.map((r, index) => (
          <div key={index} className="border rounded-md p-2 m-2 flex flex-col justify-between text-xs">
            <div>
              <p className="font-medium text-gray-100 truncate dark:text-white">
                {r.creator.name}
              </p>
              <p className="text-gray-500 truncate dark:text-gray-400 flex items-center mt-0.5">
                <LucideYoutube className="w-3 h-3 mr-1" />
                {r.creator.channel.name}
              </p>
            </div>
            <div className="flex items-center justify-between mt-1">
              <Badge variant="secondary" className={`text-[10px] px-1 py-0 my-1 ${getStatusColor(r.transaction.status)}`}>
                {getStatusIcon(r.transaction.status)}
                <span className="ml-0.5 capitalize">{r.transaction.status}</span>
              </Badge>
            </div>
          </div>
        ))}
      </div>
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

          <div className="space-y-8">
            <Card className="border-gray-700 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-green-500/20">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-green-400">Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Globe className="text-green-400" />
                  <a href={`https://${profile.website && profile.website.replace("https://","")}`} className="text-green-400 hover:underline">
                    {profile.website}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="text-green-400" />
                  <span>Target audience, {profile.audienceAge} years old</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Video className="text-green-400" />
                  <span>{reqs.length} sponsored videos</span>
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


const getStatusIcon = (status) => {
  switch (status) {
    case 'ACCEPTED':
      return <CheckCircle className="w-4 h-4 text-green-500" />
    case 'PENDING':
      return <Clock className="w-4 h-4 text-yellow-500" />
    case 'FAILED':
      return <XCircle className="w-4 h-4 text-red-500" />
    case 'CANCELED':
      return <XCircle className="w-4 h-4 text-red-500" />
    default:
      return null
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case 'ACCEPTED':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    case 'FAILED':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    case 'CANCELED':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    default:
      return ''
  }
}

function NoRequests() {
  return <div className="text-center">
        <div className="mb-4 flex justify-center">
          <FileIcon className="h-10 w-10 text-muted-foreground" />
        </div>
        <p className="mb-2 text-md font-semibold tracking-tight">No Sponsors Yet</p>
      </div>
}
