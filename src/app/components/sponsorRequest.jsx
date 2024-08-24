"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Search,FileCheck, DollarSign, 
  Clock, CheckCircle, XCircle, Eye, FileText, Check, X, Calendar } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAppContext } from '@/context';
import Request from "@/request";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default function Component() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [activeTab, setActiveTab] = useState({});
  const [requests, setRequests] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [load, setLoad] = useState(true);
  const {name, email, company} = useAppContext();
  const router = useRouter();

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="w-4 h-4 mr-1" />
      case 'ACCEPTED':
        return <CheckCircle className="w-4 h-4 mr-1" />
      case 'DECLINED':
        return <XCircle className="w-4 h-4 mr-1" />
      case 'CANCELED':
        return <XCircle className="w-4 h-4 mr-1" />
      default:
        return null
    }
  }
  const handleViewProposal = (request) => {
    setSelectedRequest(request)
    setIsModalOpen(true)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-900 text-yellow-300'
      case 'ACCEPTED':
        return 'bg-green-900 text-green-300'
      case 'DECLINED':
        return 'bg-red-900 text-red-300'
      case 'CANCELED':
        return 'bg-red-900 text-red-300'
      default:
        return 'bg-gray-700 text-gray-300'
    }
  }

  async function getRequests() {
    setRefreshing(true);
    setLoad(true);
    let url = "";
    url = `${process.env.NEXT_PUBLIC_API_URL}/requests/sponsor`;
    const response = await Request(url, "GET", null);
    console.log(response);
    if(response && response.success) {
      setRequests(response.body);
      let obj = {};
      for(let i = 0; i < response.body.length; i++) {
        obj[response.body[i].id] = response.body[i].transaction ? "ongoing" : "request";
      }
      setActiveTab(obj);
    }
    setLoad(false);
    setRefreshing(false);
  }

  async function cancelRequest(requestId) {
    setLoad(true);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/requests/sponsor/cancel`;
    const body = { requestId };
    const response = await Request(url, "PUT", body);
    if (response && response.success) {
      toast.success("Request has been canceled");
      getRequests();
    } else {
      toast.error("Request failed to cancel");
    }
  }

  async function confirmRequest(requestId, creatorEmail) {
    setLoad(true);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/requests/sponsor/confirm-payment`;
    const response = await Request(url, "POST",  { requestId });
    console.log(response);
    if(response && response.success) {
      toast.success("Request was accepted");
      await openChat(creatorEmail);
    } else {
      toast.error("There was a problem when declining request");
    }

  }

  async function openChat(email) {
    setLoad(true);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/chat`;
    const body = { otherUserEmail: email }
    const response = await Request(url, "POST", body);
    if(response && response.success) {
      router.push("../chat");
    }
    setLoad(false);
  }

  useEffect(() => {
    getRequests();
  },[]);

  function changeTab(requestId, value) {
    let tmp = {...activeTab};
    tmp[requestId] = value;
    setActiveTab(tmp);
  }

  async function approveVideo(transactionId) {

  }

  async function refuteVideo(transactionId) {

  }

  return (
    <div className="text-gray-300 flex justify-center">
      <div className="max-w-7xl w-full flex">

        <div className="flex-1 p-8 max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-gray-100">Managing Requests</h1>
              <div onClick={getRequests}>
                <Refresh animate={refreshing}/>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search requests..."
                  className="pl-10 border-gray-700 text-gray-300 w-full placeholder-gray-500"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[180px] border-gray-700 text-gray-300">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="border-gray-700 text-gray-300">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </header>
          <div className="space-y-6">
            {requests.map((request) => (
              <Card key={request.id} className="w-full max-w-4xl">
                <Tabs defaultValue="request" value={activeTab[request.id]} onValueChange={(val) => changeTab(request.id, val)} 
                  className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="request">Request</TabsTrigger>
                    <TabsTrigger disabled={!request.transaction} value="ongoing">Connection</TabsTrigger>
                    <TabsTrigger disabled={(!request.transaction) || (request.transaction.status!=="COMPLETED")} value="receipt">Receipt</TabsTrigger>
                  </TabsList>
                  {Object.entries(tabContent).map(([key, { title, content }]) => (
                    <TabsContent key={key} value={key}>
                      <CardHeader className="relative pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl font-bold text-gray-100 flex items-center">
                              {title}
                            </CardTitle>

                            {
                              activeTab[request.id] === "request" ? 
                            <p className="text-sm text-gray-400 flex items-center mb-2">
                              <Clock className="w-4 h-4 mr-2 flex-shrink-0 text-blue-500" />
                              Requested on: {new Date(request.createdAt).toDateString()}
                            </p> : 
                            <p className="text-sm text-gray-400 flex items-center mb-2">
                              <Clock className="w-4 h-4 mr-2 flex-shrink-0 text-blue-500" />
                              Started on: {request.transaction && new Date(request.transaction.createdAt).toDateString()}
                            </p>
                            }
                          </div>
                          <div className="flex items-center space-x-2">
                            <p className="text-lg font-bold text-gray-100 flex items-center">
                              <DollarSign className="w-5 h-5 mr-1 flex-shrink-0 text-gray-400" />
                        {request.requestedPrice}
                      </p>
                      {
                        activeTab[request.id] === "request" ? 
                      <Badge className={`${getStatusColor(request.status)} flex items-center`}>
                        {getStatusIcon(request.status)}
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Badge> : 
                        request.transaction && 
                      <Badge className={`${getStatusColor(request.transaction.status)} flex items-center`}>
                        {getStatusIcon(request.transaction.status)}
                        {request.transaction && request.transaction.status}
                      </Badge>
                      }
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px] pr-4">
                  {content(request)}
                  </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {
                  showButtons(request, load, key, confirmRequest, cancelRequest, handleViewProposal, approveVideo, refuteVideo)
                  }

                </CardFooter>
                </TabsContent>
                ))}
                </Tabs>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Proposal Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="text-gray-300 border-gray-800 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-100">Sponsor Proposal</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <>
              <div className="grid gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-100">Sender Information</h3>
                  <p><strong>Name:</strong> {name}</p>
                  <p><strong>Company:</strong> {company.orginization.indexOf(".") > 0 ? company.orginization : "individual"}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-100">Proposal</h3>
                  <p>{selectedRequest.proposal}</p>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <Button onClick={() => setIsModalOpen(false)}variant="outline" className="bg-red-900 text-red-100 hover:bg-red-800 border-red-700 flex items-center">
                  <X className="w-4 h-4 mr-2" />
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function Refresh({animate}) {
  let classname="";
  if(animate) {
    classname = "h-5 w-5 animate-spin";
  } else {
    classname = "h-5 w-5";
  }
  return (
    <Button variant="ghost" size="icon" className="rounded-full">
      <RefreshCwIcon className={classname}/>
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

const tabContent = {
    request: {
    title: "Request Details",
    content: request => (
      <div className="space-y-2">
        <p className="text-sm text-green-400 flex items-center">
          <Link href={`../../listings/${request.post.id}`} className="text-green-500 hover:text-green-300 flex items-center">
            <Eye className="w-4 h-4 mr-2 flex-shrink-0 text-green-500" />
            Listing: { request.post.title }
          </Link>
        </p>
        <p className="text-sm text-gray-400 flex items-center">
          <User className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500" />
          <span className="font-semibold mr-2">{request.creator.name}</span>
          <span className="text-gray-500">(Youtuber)</span>
        </p>
        <p className="text-sm text-gray-400 flex items-center">
          <FileText className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500" />
          Product: {request.title}
        </p>
        <p className="text-sm text-gray-300">{request.description}</p>
      </div>
    )
  },
  ongoing: {
    title: "You have partnered with a sponsor!",
    content: request => (
      <div className="space-y-2">
        <p className="text-sm text-gray-400 flex items-center">
          <User className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500" />
          Youtuber: {request.creator.name}
        </p>
        <p className="text-sm text-gray-400 flex items-center">
          <FileText className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500" />
          Current progress: In progress
        </p>

        <p className="text-sm text-gray-400 flex items-center">
          <Calendar className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500" />
          Upload Deadline: {formatDate(new Date().toDateString())}
        </p>
        <p className="text-sm text-gray-300">Transaction is currently being processed. Please check back later for updates.</p>
      </div>
    )
  },
  receipt: {
    title: "Transaction Receipt",
    content: request => (
      <>
        <p className="text-sm text-gray-400 flex items-center">
          <FileCheck className="w-4 h-4 mr-2 flex-shrink-0 text-green-500" />
          Completed on: {formatDate(new Date())}
        </p>
          <p className="text-sm text-gray-400 flex items-center">
            <DollarSign className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500" />
            Total Amount: $25
          </p>
          <p className="text-sm text-gray-400 flex items-center">
            <User className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500" />
            Buyer: name
          </p>
          <p className="text-sm text-gray-400 flex items-center">
            <FileText className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500" />
            Product: name of pruct
          </p>
          <p className="text-sm text-gray-300">Thank you for your purchase. This serves as your official receipt.</p>
        </>
      )
    }
  }

function showButtons(request, load, activeTab, confirmRequest, cancelRequest, handleViewProposal, approveVideo, refuteVideo) {

  const viewProposal = <Button
    variant="outline"
    className="bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-600 flex items-center"
    onClick={() => handleViewProposal(request)}>
    <Eye className="w-4 h-4 mr-2" />
    View Proposal
  </Button> 

  const confirm = <Button disabled={load} onClick={() => confirmRequest(request.id, request.creator.email)} variant="outline" className="bg-green-900 text-green-100 hover:bg-green-800 border-green-700 flex items-center">
    <Check className="w-4 h-4 mr-2" />
    Confirm Request
  </Button>

  const cancel = 
    <Button disabled={load} onClick={() => cancelRequest(request.id)} variant="outline" className="bg-red-900 text-red-100 hover:bg-red-800 border-red-700 flex items-center">
      <X className="w-4 h-4 mr-2" />
      Cancel
    </Button>

  const approve = <Button disabled={load} onClick={() => approveVideo(request.transaction.id)} variant="outline" className="bg-red-900 text-red-100 hover:bg-red-800 border-red-700 flex items-center">
      <X className="w-4 h-4 mr-2" />
      Approve Video
    </Button>
  const refute = <Button disabled={load} onClick={() => refuteVideo(request.transaction.id)} variant="outline" className="bg-red-900 text-red-100 hover:bg-red-800 border-red-700 flex items-center">
      <X className="w-4 h-4 mr-2" />
      Refute Video
    </Button>

  if(!request.transaction) {
    if(request.status === "PENDING") {
      return <>{cancel}{viewProposal}</>
    } else if(request.status === "ACCEPTED") {
      if(request.paymentConfirmation) return viewProposal
      else return <>{confirm}{cancel}{viewProposal}</>
    } else {
      return viewProposal
    }
  } else { // there is a transaciton
    if(request.transaction.videoUrl && activeTab === "ongoing") {
      return <>{approve}{refute}</>
    } else if(activeTab === "request") return viewProposal
  }
  return <></>
}
