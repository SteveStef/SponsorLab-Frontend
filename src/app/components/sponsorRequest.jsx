"use client";
import { useState, useEffect } from "react"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { InfoIcon, Calendar, XIcon, SearchIcon, EyeIcon, PackageIcon, RadioIcon, VideoIcon } from "lucide-react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import Link from "next/link";
import { useAppContext } from "@/context";
import request from "@/request";
import { toast } from "sonner";

export default function Component() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [viewType, setViewType] = useState('requests')
  const [filterStatus, setFilterStatus] = useState('all')
  const [refreshing, setRefreshing] = useState(false);

  const { name, email } = useAppContext();
  const [requests, setRequests] = useState([]);
  const [transactions, setTransactions] = useState([]);

  async function getRequests() {
    setRefreshing(true);
    let url = "";
    url = `${process.env.NEXT_PUBLIC_API_URL}/requests/sponsor`;
    const response = await request(url, "GET", null);
    if (response && response.success) {
      setRequests(response.body);
      setTransactions(response.body.filter(req => req.transaction !== null));
    }
    setRefreshing(false);
  }

  useEffect(() => {
    getRequests();
  }, []);

  const handleViewDetails = (request) => {
    setSelectedRequest(request)
    setIsDialogOpen(true)
  }

  console.log(transactions);

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
    if (response && response.success) {
      toast.success("Request has been canceled");
      getRequests();
    } else {
      toast.error("Request failed to cancel");
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4 md:px-6 text-gray-100">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Sponsorship Dashboard</h1>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-400">Review and manage sponsorship activities.</p>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Select value={viewType} onValueChange={setViewType}>
                <SelectTrigger className="w-[180px] border-gray-700">
                  <SelectValue placeholder="Select view" />
                </SelectTrigger>
                <SelectContent className="border-gray-700">
                  <SelectItem value="requests">Requests</SelectItem>
                  <SelectItem value="transactions">Transactions</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px] border-gray-700">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent className="border-gray-700">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <div onClick={getRequests}>
                <Refresh animate={refreshing} />
              </div>

            </div>
          </div>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 border-gray-700 text-gray-100"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-360px)]">
          <div className="space-y-1">
            {(viewType === "requests" ? requests : transactions).map((req) => (
              <div key={req.id} className="w-full">
                <div className="w-full bg-gray-700" style={{ height: "2px" }}></div>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl"><span>Transaction with {req.creator.name}</span></CardTitle>
                      {viewType === "transactions" &&
                        <div className="flex items-center text-sm">
                          <InfoIcon className="w-4 h-4 mr-2 text-green-500" />
                          <span className="text-green-300">{
                            req.transaction.status === "PENDING" ? "Waiting the youtuber to post the video url before this transaction can progress..." : ""
                          }</span>
                        </div>
                      }
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {getStatusBadge(viewType === "transactions" ? req.transaction.status : req.status)}
                      <span className="text-md font-semibold text-gray-200">${req.requestedPrice.toLocaleString()} USD</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 grid gap-3">

                  <div className="flex items-center text-sm">
                    <VideoIcon className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-300"><Link href={`../listings/${req.post.id}`}>Listing: {req.post.title}</Link></span>

                  </div>
                  {
                    viewType === "transactions" &&
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-gray-300">Deadline: {new Date(req.transaction.deadline).toDateString()}</span>
                    </div>
                  }
                  {
                    viewType === "requests" &&
                    <>
                      <div className="flex items-center text-sm">
                        <RadioIcon className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="text-gray-300">{req.adType}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <PackageIcon className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="text-gray-300">{req.sendingProduct ? "Product Included" : "No Product "}</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">{req.description}</p>
                    </>
                  }
                  <div className="flex justify-between mt-4">
                    {
                      viewType === "transactions" ? <>
                        <Button onClick={() => cancelTransaction(req.transaction.id)} size="sm" variant="outline" className="text-red-400 border-red-400 hover:bg-red-400 hover:text-gray-900" disabled={req.status !== "PENDING"}>
                          <XIcon className="w-4 h-4 mr-1" /> Back Out
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleViewDetails(req)} disabled={!req.transaction.videoUrl}>
                          <EyeIcon className="w-4 h-4 mr-1" /> View Video Url
                        </Button>
                      </> : <>
                        <Button onClick={() => cancelRequest(req.id)} size="sm" variant="outline" className="text-red-400 border-red-400 hover:bg-red-400 hover:text-gray-900" disabled={req.status !== "PENDING"}>
                          <XIcon className="w-4 h-4 mr-1" /> Cancel
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleViewDetails(req)}>
                          <EyeIcon className="w-4 h-4 mr-1" /> View Proposal
                        </Button>
                      </>
                    }
                  </div>
                </CardContent>
              </div>
            ))}
          </div>
        </ScrollArea>
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

function Refresh({ animate }) {
  let classname = "";
  if (animate) {
    classname = "h-5 w-5 animate-spin";
  } else {
    classname = "h-5 w-5";
  }
  return (
    <Button variant="ghost" size="icon" className="rounded-full">
      <RefreshCwIcon className={classname} />
      <span className="sr-only">Refresh</span>
    </Button>
  )
}

function RefreshCwIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  )
}
