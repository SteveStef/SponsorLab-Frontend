"use client";
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import request from "@/request";
import { useAppContext } from "@/context";

export default function Requests() {
  const [requests, setRequests] = useState([]);

  async function getRequests() {
    let url = "";
    url = `${process.env.NEXT_PUBLIC_API_URL}/requests/creator`;
    const response = await request(url, "GET", null);
    //console.log(response);
    if(response && response.success) {
      setRequests(response.body);
    }
  }

  useEffect(() => {
    getRequests();
  },[]);


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
            {
              requests.map((req, idx) => {
                if(req.status === "PENDING") return <div key={idx}><PendingCard requestData={req} /></div>
                  else if(req.status === "ACCEPTED") return <div key={idx}> <AcceptedCard requestData={req} /></div>
                  else return <div key={idx}><DeclinedCard requestData={req} /></div>
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}


function PendingCard({ requestData }) {
  const router = useRouter();

  async function openChat() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/chat`;
    const body = { sponsorEmail: requestData.sponsor.email }
    const response = await request(url, "POST", body);
    //console.log(response);
    if(response && response.success) {
      router.push("../chat");
    }
  }

  return (
            <Card className="w-full">
              <CardHeader>
                <CardTitle>{requestData.sponsor.company.orginization}</CardTitle>
                <CardDescription>Requested by {requestData.sponsor.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <Badge variant="secondary" className="bg-yellow-500 text-yellow-50">
                      Pending
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Requested Price</p>
                    <p className="text-lg font-medium">${requestData.requestedPrice}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Duration</p>
                    <p className="text-lg font-medium">{requestData.duration} seconds</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  Decline
                </Button>
                <Button onClick={openChat} size="sm">Accept</Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <div className="flex flex-col items-center justify-center gap-4 py-8">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder-user.jpg" alt="John Doe" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <h3 className="text-lg font-semibold">{requestData.sponsor.name}</h3>
                        <p className="text-muted-foreground">{requestData.sponsor.company.orginization}</p>
                      </div>
                      <p>
                          { requestData.description }
                      </p>
                    </div>
                    <DialogFooter>
                      <div>
                        <Button type="button">Close</Button>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>

  )
}


function AcceptedCard() {
  return (
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Acme Inc. Sponsorship</CardTitle>
                <CardDescription>Requested by Jane Smith</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <Badge variant="secondary" className="bg-green-500 text-green-50">
                      Accepted
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Requested Price</p>
                    <p className="text-lg font-medium">$10,000</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Duration</p>
                    <p className="text-lg font-medium">6 months</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button size="sm">Initiate Payment</Button>
              </CardFooter>
            </Card>
  )
}


function DeclinedCard() {
  return (
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Acme LLC Sponsorship</CardTitle>
                <CardDescription>Requested by Michael Johnson</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <Badge variant="secondary" className="bg-red-500 text-red-50">
                      Declined
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Requested Price</p>
                    <p className="text-lg font-medium">$3,000</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Duration</p>
                    <p className="text-lg font-medium">2 months</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  Reopen
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    Delete
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <div className="flex flex-col items-center justify-center gap-4 py-8">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src="/placeholder-user.jpg" alt="Michael Johnson" />
                          <AvatarFallback>MJ</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                          <h3 className="text-lg font-semibold">Michael Johnson</h3>
                          <p className="text-muted-foreground">Acme LLC</p>
                        </div>
                        <p>
                          We would like to request a 2-month sponsorship at a rate of\n $3,000 per month. We believe
                          our products would be a great\n fit for your audience and would appreciate the opportunity\n
                          to partner with you.
                        </p>
                      </div>
                      <DialogFooter>
                        <div>
                          <Button type="button">Close</Button>
                        </div>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardFooter>
            </Card>
  )
}








