"use client";
import { useState, useEffect, useCallback } from 'react';
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Search,FileCheck, DollarSign, 
  Clock, InfoIcon, CheckCircle, Copy, XCircle, Eye, FileText, Check, X, Calendar, 
  FileIcon, Link2, PlusIcon, Package, MessageSquare, Video, Timer, Gift, MessageCircle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAppContext } from '@/context';
import Request from "@/request";
import { toast } from "sonner";
import { convertFromUtcToLocal, inPast } from '@/utils';

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
  const { name, company } = useAppContext();
  const [videoUrls, setVideoUrls] = useState({});

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="w-4 h-4 mr-1" />
      case 'DRAFT_REVIEW':
        return <Eye className="w-4 h-4 mr-1" />
      case 'DRAFT_ACCEPTED':
        return <Eye className="w-4 h-4 mr-1" />
      case 'DRAFT_REFUSED':
        return <Eye className="w-4 h-4 mr-1" />
      case 'FINAL_REVIEW':
        return <Eye className="w-4 h-4 mr-1" />
      case 'ADMIN_REVIEW':
        return <Eye className="w-4 h-4 mr-1" />
      case 'ACCEPTED':
        return <CheckCircle className="w-4 h-4 mr-1" />
      case 'COMPLETED':
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
      case 'DRAFT_REVIEW':
        return 'bg-yellow-900 text-yellow-300'
      case 'DRAFT_ACCEPTED':
        return 'bg-green-900 text-green-300'
      case 'DRAFT_REFUSED':
        return 'bg-red-900 text-red-300'
      case 'ACCEPTED':
        return 'bg-green-900 text-green-300'
      case 'FINAL_REVIEW':
        return 'bg-yellow-900 text-yellow-300'
      case 'ADMIN_REVIEW':
        return 'bg-purple-500 text-white-300'
      case 'COMPLETED':
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
    const url = `${process.env.NEXT_PUBLIC_API_URL}/requests/sponsor`;
    const response = await Request(url, "GET", null);
    if(response && response.success) {
      response.body.sort((a,b) =>  new Date(b.createdAt) - new Date(a.createdAt));
      setRequests(response.body);
      let obj = {};
      let vurls = {};
      for(let i = 0; i < response.body.length; i++) {
        const req = response.body[i];
        obj[req.id] = (req.transaction && req.transaction.status === "COMPLETED") ? "receipt" : req.transaction ? "ongoing" : "request";
        if(req.transaction) {
          vurls[req.transaction.id] = req.transaction.videoUrl || req.transaction.draftVideoUrl || "";
        }
      }
      setActiveTab(obj);
      setVideoUrls(vurls);
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

  async function confirmRequest(request) {
    const requestId = request.id;
    const creatorEmail = request.creator.email;

    setLoad(true);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/requests/sponsor/confirm-payment`;
    const response = await Request(url, "POST",  { requestId });
    if(response && response.success) {
      toast.success("Request was accepted");
      await openChat(creatorEmail, requestId);
      await getRequests();
    } else {
      toast.error("There was a problem when declining request");
    }

  }

  async function openChat(email, requestId) {
    setLoad(true);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/chat`;
    const body = { otherUserEmail: email, requestId }
    await Request(url, "POST", body);
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
    const url = `${process.env.NEXT_PUBLIC_API_URL}/transactions/sponsor/approve-video`;
    const body = { transactionId }
    const response = await Request(url, "PUT", body);
    if(response && response.success) {
      toast.success("Video has been approved");
      getRequests();
    } else {
      toast.error("Failed to approve video, try again later");
    }
  }

  async function refuteVideo(transactionId) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/transactions/sponsor/refute-video`;
    const body = { transactionId }
    const response = await Request(url, "POST", body);
    if(response && response.success) {
      toast.success("The video url has been refuted and is now under admin review.");
      getRequests();
    } else {
      toast.error("Something went wrong, please try again later.");
    }
  }

  async function approveDraft(transactionId) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/transactions/sponsor/approve-draft`;
    const body = { transactionId }
    const response = await Request(url, "PUT", body);
    if(response && response.success) {
      toast.success("Video has been approved");
      getRequests();
    } else {
      toast.error("Failed to approve video, try again later");
    }
  }

  async function refuteDraft(transactionId) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/transactions/sponsor/refute-draft`;
    const body = { transactionId }
    const response = await Request(url, "POST", body);
    if(response && response.success) {
      toast.success("The video url has been refuted and is now under admin review.");
      getRequests();
    } else {
      toast.error("Something went wrong, please try again later.");
    }
  }

  async function refund(transactionId) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/transactions/sponsor/refund`;
    const body = { transactionId }
    const response = await Request(url, "POST", body);
    if(response && response.success) {
      toast.success("Your money as been refunded");
      getRequests();
    } else {
      toast.error("The refund failed try again later or contact this email for help support@sponsorlab.co");
    }
  }

  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback((url) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
    })
  }, [])

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
            {
              !refreshing && requests.length === 0 && <NoRequests />
            }
            {requests.map((request) => (
              <Card key={request.id} className="w-full max-w-4xl">
                <Tabs defaultValue="request" value={activeTab[request.id]} onValueChange={(val) => changeTab(request.id, val)} 
                  className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="request">Request</TabsTrigger>
                    <TabsTrigger disabled={!request.transaction} value="ongoing">Parnership</TabsTrigger>
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
                        {(request.requestedPrice / 100).toLocaleString()} {request.pricingModel === "CPM" ? " CPM" : " FLAT"}
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
                  {key === "ongoing" ? content(request, videoUrls, copied, handleCopy) : content(request)}
                  </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <ShowButtons request={request} load={load} 
                    activeTab={key} confirmRequest={confirmRequest} cancelRequest={cancelRequest} 
                    handleViewProposal={handleViewProposal} approveVideo={approveVideo} refuteVideo={refuteVideo} refund={refund}
                    approveDraft={approveDraft} refuteDraft={refuteDraft}
                  />

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
      <DialogContent className="text-gray-300 max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-green-400">Sponsor Proposal</DialogTitle>
        </DialogHeader>
        {selectedRequest && (
          <>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-green-400 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Sender Information
                  </h3>
                  <p><strong>Name:</strong> {name}</p>
                  <p><strong>Company:</strong> {company.orginization.indexOf(".") > 0 ? company.orginization : "individual"}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-400 flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    Product/Service Details
                  </h3>
                  <p><strong>Title:</strong> {selectedRequest.title}</p>
                  <p><strong>Short Description:</strong> {selectedRequest.productDescription}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-400 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Speech Requirements
                  </h3>
                  <p>{selectedRequest.description}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-green-400 flex items-center">
                    <Video className="w-5 h-5 mr-2" />
                    Advertisement Details
                  </h3>
                  <p><strong><Clock className="w-4 h-4 inline mr-1" /> Timestamp:</strong> {selectedRequest.timeStamp}</p>
                  <p><strong><DollarSign className="w-4 h-4 inline mr-1" /> Proposed Payment:</strong> ${selectedRequest.requestedPrice/100} {selectedRequest.pricingModel}</p>
                  <p><strong><Timer className="w-4 h-4 inline mr-1" /> Ad Duration:</strong> {selectedRequest.duration} seconds</p>
                  <p><strong><Gift className="w-4 h-4 inline mr-1" /> Sample Product:</strong> {selectedRequest.sendingProduct ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-400 flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Proposal Message
                  </h3>
                  <p className="max-h-40 overflow-y-auto">{selectedRequest.proposal}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <Button onClick={() => setIsModalOpen(false)} variant="outline" className="bg-gray-800 text-green-400 hover:bg-gray-700 border-green-600 flex items-center">
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
    content: (request) => (
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
    title: "You have partnered with a youtuber!",
    content: (request, videoUrls, copied, handleCopy) => (
      <div className="space-y-1">

        <p className="text-sm text-gray-400 flex items-center">
          <User className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500" />
          Youtuber: {request.creator.name}
        </p>

        <p className="text-sm text-gray-400 flex items-center">
          <Calendar className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500" />
          Upload Deadline: {request.transaction && convertFromUtcToLocal(request.transaction.deadline)}
        </p>
      <div className="flex">
        <InfoIcon className="w-5 h-5 mr-1 mt-1 flex-shrink-0 text-yellow-500" />
        <p className="text-md text-yellow-400">

        {
            request.transaction && request.transaction.status === "FINAL_REVIEW" ? "Please review the final video url"
          : request.transaction && request.transaction.status === "DRAFT_REVIEW" ? "Please review the following video draft"
          : request.transaction && request.transaction.status === "PENDING" ? "Waiting for youtuber to send a draft of the advertisement"
          : request.transaction && request.transaction.status === "DRAFT_ACCEPTED" ? "Waiting for the youtuber to send the posted youtube video url."
          : request.transaction && request.transaction.status === "DRAFT_REFUSED" ? "Waiting for the youtuber to make the changes and send a new draft"
          : "No further action is reqired for this step"
        }

      </p>
      </div>

      {
        request.transaction && !["DRAFT_ACCEPTED", "CANCELED"].includes(request.transaction.status) &&
            <div className="space-y-2 px-1">
              <Label htmlFor="name">Video Url</Label>
      <div className="flex items-center space-x-2">
            <Input 
      style={{cursor: "pointer"}}
      onClick={() => handleCopy(videoUrls[request.transaction.id])}
      id="bananan"
      readOnly
      value={`${videoUrls[request.transaction.id]}`} 
        />
      <Button 
      size="icon"
      onClick={() => handleCopy(videoUrls[request.transaction.id])}
      aria-label="Copy to clipboard">
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>

      </div>
        <p className="text-sm text-gray-400 hover:text-gray-200 flex items-center">
          <Link2 className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500" />
          <Link href={request.transaction && (request.transaction.videoUrl|| request.transaction.draftVideoUrl) || "#"} style={{cursor: "pointer"}}>
      {(request.transaction.videoUrl|| request.transaction.draftVideoUrl) || "No link uploaded"}</Link>
        </p>
      </div>
      }
      </div>
    )
  },
  receipt: {
    title: "Transaction Receipt",
    content: (request)=> (
      <div className="space-y-6">
        <p className="text-sm text-gray-400 flex items-center ">
          <FileCheck className="w-4 h-4 mr-2 flex-shrink-0 text-green-500" />
          Completed on: {formatDate(new Date())}
        </p>
          <p className="text-sm text-gray-400 flex items-center">
            <User className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500" />
            Buyer: {request.creator.name}
          </p>
          <p className="text-sm text-gray-400 flex items-center">
            <FileText className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500" />
            Product: {request.title}
          </p>
          <p className="text-sm text-gray-300">Thank you for your purchase. This serves as your official receipt.</p>
        </div>
      )
    }
  }


function ShowButtons(props) {
  const { request, load, activeTab, confirmRequest, 
    cancelRequest, handleViewProposal, approveVideo, refuteVideo, refund,
    approveDraft, refuteDraft
  } = props;

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedParams, setSelectedParams] = useState("");
  const [selectedInfo, setSelectedInfo] = useState("");
  const [fnsName, setFnsName] = useState("");

  const fns = {
    confirmRequest: confirmRequest, 
    cancelRequest: cancelRequest,

    approveVideo: approveVideo,
    refuteVideo: refuteVideo,

    approveDraft: approveDraft,
    refuteDraft: refuteDraft,

    refund: refund
  }

  const map = {
    "confirmRequest": () => {
      const price =
        request.pricingModel ==="CPM" ? (request.post.estimatedViews * request.requestedPrice / 100 / 1000).toLocaleString() : (request.requestedPrice / 100).toLocaleString();
      setShowConfirm(true);
      setFnsName("confirmRequest");
      setSelectedParams(request);
      setSelectedInfo({ 
        title: "Are you sure you want to confirm accept this request?", 
        info: `YOU WILL BE CHARGED! This will take you and the youtuber to the partnership step. 
        You will be charged $${price} and the money will be held until the video is published on youtube. Only after the video is reviewed by you (the sponsor) 
        will the funds be transfered to the youtuber.`
      });
    },
    "cancelRequest": () => {
      setShowConfirm(true);
      setFnsName("cancelRequest");
      setSelectedParams(request.id);
      setSelectedInfo({ 
        title: "Are you sure you want to cancel this request?", 
        info: "The status of this request will be CANCELED and no further action can be taken"
      });
    },
    "approveVideo": () => {
      setShowConfirm(true);
      setFnsName("approveVideo");
      setSelectedParams(request.transaction.id);
      setSelectedInfo({ 
        title: "Are you sure you want to approve this url?", 
        info: "The status of this transaction will be COMPLETED and them money will be sent to the youtuber."
      });
    },
    "refuteVideo": () => {
      setShowConfirm(true);
      setFnsName("refuteVideo");
      setSelectedParams(request.transaction.id);
      setSelectedInfo({ 
        title: "Are you sure you want to refute video url?", 
        info: "An admin will take a look at this transaction and determind the outcome."
      });
    },
    "approveDraft": () => {
      setShowConfirm(true);
      setFnsName("approveDraft");
      setSelectedParams(request.transaction.id);
      setSelectedInfo({ 
        title: "Are you sure you want to approve this url?", 
        info: "By accepting this you are saying you are content with how the ad is"
      });
    },
    "refuteDraft": () => {
      setShowConfirm(true);
      setFnsName("refuteDraft");
      setSelectedParams(request.transaction.id);
      setSelectedInfo({ 
        title: "Are you sure you want to refute video url?", 
        info: "Send a message of what you want the youtuber to change"
      });
    },
    "refund": () => {
      setShowConfirm(true);
      setFnsName("refund");
      setSelectedParams(request.transaction.id);
      setSelectedInfo({
        title: "Are you sure you want to refund your Partnership?", 
        info: "You are now able to refund because the youtbuer failed to post the video url by the deadline. This action will give you your money back and terminate the transaction between you and the youtuber."
      });
    },

  }

  const openChat = <Button
  className="bg-yellow-700 text-gray-300 hover:bg-yellow-800 flex items-center"
        onClick={()=>{window.open(`${process.env.NEXT_PUBLIC_CLIENT_URL}/chat/${props.request.chatRoom.id}`, '_blank')}}
        title="Open Direct Message"
      >
        <MessageCircle className="w-5 h-5 mr-1" />
        Open Chat
      </Button>

  const viewProposal = <Button
    variant="outline"
    className="bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-600 flex items-center"
    onClick={() => handleViewProposal(request)}>
    <Eye className="w-4 h-4 mr-2" />
    View Details
  </Button> 

  const confirm = <Button disabled={load} onClick={map["confirmRequest"]} variant="outline" className="bg-green-900 text-green-100 hover:bg-green-800 border-green-700 flex items-center">
    <Check className="w-4 h-4 mr-2" />
    Proceed to checkout
  </Button>

  const cancel = 
    <Button disabled={load} onClick={map["cancelRequest"]} variant="outline" className="bg-red-900 text-red-100 hover:bg-red-800 border-red-700 flex items-center">
      <X className="w-4 h-4 mr-2" />
      Cancel
    </Button>

  const approve = <Button disabled={load} onClick={map["approveVideo"]} variant="outline" className="bg-green-900 text-green-100 hover:bg-green-800 border-green-700 flex items-center">
      <Check className="w-4 h-4 mr-2" />
      Approve Video
    </Button>
  const refute = <Button disabled={load} onClick={map["refuteVideo"]} variant="outline" className="bg-red-900 text-red-100 hover:bg-red-800 border-red-700 flex items-center">
      <X className="w-4 h-4 mr-2" />
      Refute Video
    </Button>

  const refundBtn = <Button disabled={load} onClick={map["refund"]} variant="outline" className="bg-red-900 text-red-100 hover:bg-red-800 border-red-700 flex items-center">
      <X className="w-4 h-4 mr-2" />
      Get Refund
    </Button>

  const approveDraftBtn = <Button disabled={load} onClick={map["approveDraft"]} variant="outline" className="bg-green-900 text-green-100 hover:bg-green-800 border-green-700 flex items-center">
      <Check className="w-4 h-4 mr-2" />
      Approve Draft
    </Button>

  const refuteDraftBtn = <Button disabled={load} onClick={map["refuteDraft"]} variant="outline" className="bg-red-900 text-red-100 hover:bg-red-800 border-red-700 flex items-center">
      <X className="w-4 h-4 mr-2" />
      Refute Draft
    </Button>

  function isLate() {
    let deadlineInLocalTime = convertFromUtcToLocal(request.transaction.deadline);
    if(inPast(deadlineInLocalTime)) {
      return true;
    }
    return false;
  }

  function getButton() {
    const {request} = props;
    const status = request.transaction ? request.transaction.status : "";
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
      if(request.transaction) {

        if(activeTab === "ongoing" && status === "FINAL_REVIEW") return <>{approve}{openChat}{refute}</>
        if(activeTab === "ongoing" && (status === "DRAFT_REVIEW" || status === "DRAFT_REFUSED")) return <>{approveDraftBtn}{openChat}{refuteDraftBtn}</>
        else if(activeTab === "request") return viewProposal
        else if(!request.transaction.videoUrl && activeTab === "ongoing" && request.transaction.status === "PENDING" && isLate()) return <>{refundBtn}{openChat}</>
        else if(activeTab === "ongoing") return openChat

      }
    }
    return <></>
  }

  const PRICE = request.pricingModel === "CPM" ? parseFloat((request.requestedPrice / 100) * request.post.estimatedViews / 1000) : request.requestedPrice / 100;
  return <>
    {getButton()}
      { 
        fnsName !== "confirmRequest" ? 
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="sm:max-w-[600px] text-gray-100 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-green-400">Confirm Action</DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedInfo.title}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <h4 className="text-sm font-medium text-green-400 mb-2">Effect of this action</h4>
            <DialogDescription className="text-gray-200">
              {selectedInfo.info}
            </DialogDescription>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button
              disabled={load}
              onClick={() => {
                fns[fnsName](selectedParams);
                setShowConfirm(false);
              }} 
              className="bg-green-600 text-green-100 hover:bg-green-500 border-green-700"
            >
              {
                load ? "Loading..." : "I understand and accept"
              }
            </Button>
            <Button
              onClick={() => setShowConfirm(false)}
              className="bg-red-600 text-red-100 hover:bg-red-500 border-red-700"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
          :
          <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Checkout - Partnership Step</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="flex items-start space-x-2 mb-4 p-3 bg-gray-50 rounded-md">
            <InfoIcon className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
            <p className="text-sm text-black">
              This will initiate the partnership with the YouTuber. The funds will be held until the video is published and reviewed by you (the sponsor). Only then will the funds be transferred to the YouTuber.
            </p>
          </div>
          {
            request.pricingModel === "CPM" &&
            <div className="flex items-start space-x-2 mb-4 p-3 bg-gray-50 rounded-md">
            <InfoIcon className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
            <p className="text-sm text-black">
            The pricing model is based on CPM, meaning you will initially be charged based on the estimated number of views the video is expected to receive. After one month, you will either be charged or refunded the difference, depending on the actual performance of the video.
            </p>
            </div>
          }
          <h4 className="text-lg font-semibold mb-4">Order Summary</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold">Subtotal</span>
              <span>${PRICE.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Stripe Fee (2.9%)</span>
              <span>${(0.029 * (PRICE)).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Sales Tax (6%)</span>
              <span>${(0.06 * (PRICE)).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>PartnerShip Fee (2%)</span>
              <span>${(0.02 * (PRICE)).toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
          <span>${(PRICE + (0.109 * PRICE)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          By clicking "Confirm Partnership", you agree to the terms of service and privacy policy. Also you may be refunded if the Youtuber does not 
          do the agreed terms of the sponsoring.
        </p>
        <DialogFooter className="sm:justify-start">
          <Button
            disabled={load}
            onClick={() => {
              fns[fnsName](selectedParams);
              setShowConfirm(false);
            }
            }
            className="w-full bg-green-600 text-white hover:bg-green-700"
          >
            {load ? "Processing..." : "Confirm Partnership"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
      }

  </>
}

function NoRequests() {
return <main className="flex items-center justify-center bg-background p-4 md:p-8">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <FileIcon className="h-16 w-16 text-muted-foreground" />
        </div>
        <h1 className="mb-2 text-2xl font-semibold tracking-tight">No requests found</h1>
        <p className="mb-4 text-muted-foreground">You have not made any requests yet.</p>
    <Link href="../listings">
    <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Find a listing and make request

    </Button>
        </Link>
      </div>
    </main>
}
