"use client";
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CheckIcon, XIcon, EyeIcon, DollarSignIcon, PackageIcon, RadioIcon, VideoIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import Link from "next/link";
import {useAppContext} from "@/context";
import request from "@/request";
import { toast } from "sonner";

export default function Component() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const { name, email } = useAppContext();
  const [requests, setRequests] = useState([]);

  async function getRequests() {
    let url = "";
    url = `${process.env.NEXT_PUBLIC_API_URL}/requests/sponsor`;
    const response = await request(url, "GET", null);
    console.log(response);
    if(response && response.success) {
      setRequests(response.body);
    }
  }

  useEffect(() => {
    getRequests();
  },[]);

  const handleViewDetails = (request) => {
    setSelectedRequest(request)
    setIsDialogOpen(true)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "ACCEPTED":
        return <Badge className="bg-green-500 text-white">ACCEPTED</Badge>
      case "DECLINED":
        return <Badge className="bg-red-500 text-white">DECLINED</Badge>
      case "CANCELED":
        return <Badge className="bg-red-500 text-white">CANCELED</Badge>
      case "EXPIRED":
        return <Badge className="bg-red-500 text-white">EXPIRED</Badge>
      default:
        return <Badge className="bg-yellow-500 text-white">PENDING</Badge>
    }
  }

  async function cancelRequest(requestId) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/requests/cancel`;
    const body = { requestId };
    const response = await request(url, "PUT", body);
    if(response && response.success) {
      toast.success("Request has been canceled");
      getRequests();
    } else {
      toast.error("Request failed to cancel");
    }
  }

  return (

    <div className="w-full max-w-4xl mx-auto py-12 px-4 md:px-6">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Sponsorship Requests</h1>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Review and manage incoming sponsorship requests.</p>
            <div className="flex items-center gap-2">
              <Label htmlFor="filter" className="text-sm font-medium">
                Filter:
              </Label>
              <Select id="filter" defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="grid gap-6">
      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="grid gap-4">
          {requests.map((req) => (
            <Card key={req.id} className="w-full">
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{req.creator.channel.name}</CardTitle>
                    <p className="text-sm text-gray-400 mt-1">Request has been sent to {req.creator.name}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getStatusBadge(req.status)}
                    <Badge variant="outline" className="bg-green-900 text-green-300 border-green-500">
                      <DollarSignIcon className="w-3 h-3 mr-1" />
                      {req.requestedPrice}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 grid gap-3">
                <div className="flex items-center text-sm">
                  <VideoIcon className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-gray-300"><Link href={`../listings/${req.post.id}`}>Listing: {req.post.title}</Link></span>
                </div>
                <div className="flex items-center text-sm">
                  <RadioIcon className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-gray-300">{req.adType}</span>
                </div>
                <div className="flex items-center text-sm">
                  <PackageIcon className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-gray-300">{req.sendingProduct ? "Product Included" : "No Product "}</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{req.description}</p>
                <div className="flex justify-between mt-4">
                  <Button onClick={() => cancelRequest(req.id)} size="sm" variant="outline" className="text-red-400 border-red-400 hover:bg-red-400 hover:text-gray-900" disabled={req.status !== "PENDING"}>
                    <XIcon className="w-4 h-4 mr-1" /> Cancel
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleViewDetails(req)}>
                    <EyeIcon className="w-4 h-4 mr-1" /> View Proposal
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
          </div>
        </div>
      </div>
<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="text-gray-100">
          <DialogHeader>
            <DialogTitle className="text-green-400">{selectedRequest?.title}</DialogTitle>
            <DialogDescription className="text-gray-400">
              {name} - {email}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <h3 className="font-semibold text-green-400 mb-2">Proposal:</h3>
            <p className="text-gray-300">{selectedRequest?.proposal}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}




/*
    <div className="w-full max-w-4xl mx-auto py-12 px-4 md:px-6">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Sponsorship Requests</h1>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Review and manage incoming sponsorship requests.</p>
            <div className="flex items-center gap-2">
              <Label htmlFor="filter" className="text-sm font-medium">
                Filter:
              </Label>
              <Select id="filter" defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="grid gap-6">
      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="grid gap-4">
          {sponsorRequests.map((request) => (
            <Card key={request.id} className="w-full">
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{request.title}</CardTitle>
                    <p className="text-sm text-gray-400 mt-1">{request.sponsorName}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getStatusBadge(request.status)}
                    <Badge variant="outline" className="bg-green-900 text-green-300 border-green-500">
                      <DollarSignIcon className="w-3 h-3 mr-1" />
                      {request.amount}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 grid gap-3">
                <div className="flex items-center text-sm">
                  <VideoIcon className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-gray-300">Listing: {request.listingTitle}</span>
                </div>
                <div className="flex items-center text-sm">
                  <RadioIcon className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-gray-300">{request.adType}</span>
                </div>
                <div className="flex items-center text-sm">
                  <PackageIcon className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-gray-300">{request.sendingProduct ? "Product Included" : "No Product"}</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{request.description}</p>
                <div className="flex justify-between mt-4">
                  <Button size="sm" variant="outline" className="text-green-400 border-green-400 hover:bg-green-400 hover:text-gray-900" disabled={request.status !== "pending"}>
                    <CheckIcon className="w-4 h-4 mr-1" /> Accept
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-400 border-red-400 hover:bg-red-400 hover:text-gray-900" disabled={request.status !== "pending"}>
                    <XIcon className="w-4 h-4 mr-1" /> Decline
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleViewDetails(request)}>
                    <EyeIcon className="w-4 h-4 mr-1" /> View Proposal
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
          </div>
        </div>
      </div>
<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="text-gray-100">
          <DialogHeader>
            <DialogTitle className="text-green-400">{selectedRequest?.title}</DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedRequest?.sponsorName} - {selectedRequest?.sponsorEmail}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <h3 className="font-semibold text-green-400 mb-2">Proposal:</h3>
            <p className="text-gray-300">{selectedRequest?.proposal}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
 * */










