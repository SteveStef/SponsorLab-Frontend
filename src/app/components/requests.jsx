import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Search,FileCheck, DollarSign, InfoIcon, Video, Link2,
  Clock, CheckCircle, XCircle, Eye, Info, Building, Package, Check, X, Calendar, FileIcon, MessageCircle, Flag, AlertCircle} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Request from "@/request";
import { toast } from "sonner";
import { convertFromUtcToLocal } from '@/utils';
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import CardDetails from "./sub-component/cardDetails";
import LineChart from "./sub-component/charts";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default function Component() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [activeTab, setActiveTab] = useState({});
  const [requests, setRequests] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [flagDialog, setFlagDialog] = useState(false);
  const [flagFormData, setFlagFormData] = useState({ problemType: '', problemDescription: '', requestId: ''});
  const [load, setLoad] = useState(true);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

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

  console.log(requests);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);


  const getRequests = useCallback(async () => {
    setRefreshing(true);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/requests/creator`;
    const response = await Request(url, "POST", { filter, query: debouncedSearch });
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
      setVideoUrls(vurls);
      setActiveTab(obj);
    }
    setLoad(false);
    setRefreshing(false);
  }, [debouncedSearch, filter]);

  useEffect(() => {
    getRequests();
  }, [getRequests]);

  async function acceptRequest(requestId) {
    setLoad(true);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/requests/creator/accept`;
    const response = await Request(url, "PUT", {requestId});
    console.log(response);
    if(response && response.success) {
      toast.success("Request was accepted");
      getRequests();
    } else if(response?.status === 403) {
      toast.error(response.error);
    } else {
      toast.error("Something went wrong, try again later");
    }
    setLoad(false);
  }

  async function declineRequest(requestId) {
    setLoad(true);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/requests/creator/decline`;
    const response = await Request(url, "PUT", {requestId});
    if(response && response.success) {
      toast.success("Request was declined");
      getRequests();
    } else {
      toast.error("There was a problem when declining request");
    }
    setLoad(false);
  }

  async function cancelTransaction(transactionId) {
    setLoad(true);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/transactions/creator/cancel`;
    const response = await Request(url, "PUT", { transactionId });
    if(response && response.success) {
      toast.success("Request was declined");
      getRequests();
    } else {
      toast.error("There was a problem when declining request");
    }
    setLoad(false);
  }

  function changeTab(requestId, value) {
    let tmp = {...activeTab};
    tmp[requestId] = value;
    setActiveTab(tmp);
  }

  async function sendDraftUrl(transactionId) {
    const videoUrl = videoUrls[transactionId];
    if(!videoUrl) {
      toast.error("Invalid video");
      return;
    }
    const url = `${process.env.NEXT_PUBLIC_API_URL}/transactions/creator/post-draft`;
    const response = await Request(url, "PUT", {transactionId, videoUrl});
    if(response && response.success) {
      toast.success("Send the video url to the sponsor!");
      getRequests();
    } else {
      toast.error(response.message);
    }
    setLoad(false);
  }

  async function sendVideoUrl(transactionId) {
    const videoUrl = videoUrls[transactionId];
    if(!videoUrl || !videoUrl.includes("youtube.com/watch?v=")) {
      toast.error("Video url must be a youtube url in the form https://www.youtube.com/watch?v=...");
      return;
    }
    const url = `${process.env.NEXT_PUBLIC_API_URL}/transactions/creator/post-video`;
    const response = await Request(url, "PUT", {transactionId, videoUrl});
    if(response && response.success) {
      toast.success("Send the video url to the sponsor!");
      getRequests();
    } else {
      toast.error(response.message);
    }
    setLoad(false);
  }

  async function handleSubmitProblem() {
    if(!flagFormData.problemType || !flagFormData.problemDescription) {
      toast.error("Please enter in all fields");
      return;
    }

    setLoad(true);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/issues`;
    const response = await Request(url, "POST", flagFormData);

    if(response.success) toast.success(response.message);
    else toast.error("Failed to send");

    setFlagDialog(false);
    setFlagFormData({problemType: '', problemDescription: '', requestId: ''});
    setLoad(false);
  }

  async function handleAdminAssistance(requestId) {
    setFlagDialog(true);
    setFlagFormData({ problemType: '', problemDescription: '', requestId: requestId });
  }

  const handleInputChange = (field, value) => {
    setFlagFormData(prev => ({ ...prev, [field]: value }))
  }

  const steps = ["Pending Draft", "Draft Review", "Pending Published YT Url", "Final Review", "Complete"]

  function determineStep(status) {
    switch (status) {
      case 'PENDING':
        return 0;
      case 'DRAFT_REVIEW':
        return 1;
      case 'DRAFT_REFUSED':
        return 1;
      case 'DRAFT_ACCEPTED':
        return 2;
      case 'FINAL_REVIEW':
        return 3;
      case 'ADMIN_REVIEW':
        return 3;
      case 'COMPLETED':
        return 4;
      case 'DECLINED':
        return 0;
      case 'CANCELED':
        return 0;
      default:
        return 0;
    }
  }

  return (
<div className="text-gray-300 flex justify-center p-4">
      <div className="max-w-7xl w-full">
        <div className="flex-1 max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-4 sm:mb-0">Incoming Sponsor Requests</h1>
              <div onClick={getRequests} className="cursor-pointer">
                <Refresh animate={refreshing}/>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search requests..."
                  className="pl-10 border-gray-700 text-gray-300 w-full placeholder-gray-500"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select defaultValue={filter} onValueChange={(value) => setFilter(value)}>
                <SelectTrigger className="w-full sm:w-[180px] border-gray-700 text-gray-300">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="border-gray-700 text-gray-300">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="requests">Requests</SelectItem>
                  <SelectItem value="partnership">Partnerships</SelectItem>
                  <SelectItem value="receipt">Receipts</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </header>
          <div className="space-y-6">
            {!refreshing && requests.length === 0 && <NoRequests />}
            {requests.map((request) => (
              <Card key={request.id} className="w-full">
                <Tabs defaultValue="request" value={activeTab[request.id]} onValueChange={(val) => changeTab(request.id, val)} 
                  className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="request">Request</TabsTrigger>
                    <TabsTrigger disabled={!request.transaction} value="ongoing">Partnership</TabsTrigger>
                    <TabsTrigger disabled={(!request.transaction) || (request.transaction.status!=="COMPLETED")} value="receipt">Receipt</TabsTrigger>
                  </TabsList>
                  {Object.entries(tabContent).map(([key, { title, content }]) => (
                    <TabsContent key={key} value={key}>
                      <CardHeader className="relative pb-2">
                        <div className="flex flex-col sm:flex-row justify-between items-start">
                          <div>
                            <CardTitle className="text-xl font-bold text-gray-100 flex items-center">
                              {title}
                            </CardTitle>
                            {activeTab[request.id] === "request" ? (
                              <p className="text-sm text-gray-400 flex items-center mb-2">
                                <Clock className="w-4 h-4 mr-2 flex-shrink-0 text-blue-500" />
                                Requested on: {new Date(request.createdAt).toDateString()}
                              </p>
                            ) : (
                              <p className="text-sm text-green-500 flex items-center cursor-pointer hover:text-green-400 mb-2"
                                onClick={() => {window.open(`${process.env.NEXT_PUBLIC_CLIENT_URL}/chat/${request.chatRoom.id}`, '_blank')}}>
                                <MessageCircle className="w-5 h-5 mr-1" />
                                Open direct messaging with {request.sponsor.name}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
                            <p className="text-lg font-bold text-gray-100 flex items-center">
                              <DollarSign className="w-5 h-5 mr-1 flex-shrink-0 text-gray-400" />
                              {(request.requestedPrice / 100).toLocaleString()}
                              {request.pricingModel === "CPM" ? " CPM" : " FLAT"}
                            </p>
                            {activeTab[request.id] === "request" ? (
                              <Badge className={`${getStatusColor(request.status)} flex items-center`}>
                                {getStatusIcon(request.status)}
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </Badge>
                            ) : (
                              request.transaction && (
                                <Badge className={`${getStatusColor(request.transaction.status)} flex items-center`}>
                                  {getStatusIcon(request.transaction.status)}
                                  {request.transaction && request.transaction.status}
                                </Badge>
                              )
                            )}
                            {activeTab[request.id] === "ongoing" && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Flag
                                      className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-400"
                                      onClick={() => handleAdminAssistance(request.id)}
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-xs text-white p-2 rounded shadow-lg">
                                    <p>Request Admin Assistance</p>
                                    <p className="text-xs mt-1">Click this flag to alert our admin team. Use this for urgent issues, disputes, or when you need immediate help with your request.</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {
                          key === "receipt" ? 
                        <ScrollArea className="h-[300px] pr-4">
                          {content(request)}
                        </ScrollArea> :
                        key === "ongoing" ? 
                        <ScrollArea className="h-[265px] pr-4">
                          {content(request, videoUrls, setVideoUrls)}
                        </ScrollArea> :
                        <ScrollArea className="h-[150px] pr-4">
                          {content(request)}
                        </ScrollArea> 
                        }
                      </CardContent>
                      <CardFooter className="flex flex-wrap justify-center sm:justify-between gap-2">
                        <ShowButtons
                          request={request}
                          load={load}
                          activeTab={key}
                          sendDraftUrl={sendDraftUrl}
                          sendVideoUrl={sendVideoUrl}
                          cancelTransaction={cancelTransaction}
                          handleViewProposal={handleViewProposal}
                          declineRequest={declineRequest}
                          acceptRequest={acceptRequest}
                        />
                      </CardFooter>
                    </TabsContent>
                  ))}
                  {activeTab[request.id] === "ongoing" && (
                    <div className="px-6 mb-4">
                      <Progress value={determineStep(request.transaction?.status) * 25} className="w-full h-2" />
                      <div className="flex justify-between mt-2">
                        {steps.map((step, index) => {
                          const s = determineStep(request.transaction?.status);
                          return (
                            <span
                              key={step}
                              className={`text-xs ${index <= s ? 'text-white-500 font-semibold' : 'text-gray-400'}`}
                            >
                              {step}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </Tabs>
              </Card>
            ))}
          </div>
        </div>
      </div>

    {
      selectedRequest && 
    <CardDetails isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
    sender={{name: selectedRequest?.sponsor.name, company: selectedRequest?.sponsor.company.orginization.indexOf(".") > 0 ? selectedRequest?.sponsor.company.orginization : "individual"}}
    product={{title: selectedRequest?.title, description: selectedRequest?.productDescription}}
    speechRequirements={selectedRequest?.description}
    adDetails={{
      timestamp: selectedRequest?.timestamp || "NONE",
        payment: `$${(selectedRequest?.requestedPrice/100).toLocaleString()} ${selectedRequest.pricingModel}`,
        duration: selectedRequest?.duration,
        sendingSample: selectedRequest?.sendingProduct?"Yes":"No", 
        paymentCap: selectedRequest?.hasPaymentCap ? "$"+(selectedRequest.paymentCap / 100).toLocaleString(): "NONE",
        pricingModel: selectedRequest?.pricingModel
    }}
    proposedMessage={selectedRequest?.proposal}
    />
    }

      <Dialog open={flagDialog} onOpenChange={setFlagDialog}>
        <DialogContent className="sm:max-w-[425px] text-white">
          <DialogHeader>
            <DialogTitle>Request Admin Assistance</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="problem-type" className="col-span-4">
                Type of Problem
              </Label>
              <Select
                onValueChange={(value) => handleInputChange('problemType', value)}
                value={flagFormData.problemType}
              >
                <SelectTrigger className="col-span-4">
                  <SelectValue placeholder="Select the type of problem" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TECHNICAL">Technical Issue</SelectItem>
                  <SelectItem value="PAYMENT">Payment Issue</SelectItem>
                  <SelectItem value="PARTNERSHIP">Partnership Dispute</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="problem-description" className="col-span-4">
                Problem Description
              </Label>
              <Textarea
                id="problem-description"
                placeholder="Please describe the problem you're experiencing..."
                className="col-span-4"
                value={flagFormData.problemDescription}
                onChange={(e) => handleInputChange('problemDescription', e.target.value)}
              />
            </div>
            <span className="text-sm text-gray-400">Please note that you and the sponsor will get an email about the result of the dispute.</span>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={load} onClick={handleSubmitProblem}>Send to Admin</Button>
          </DialogFooter>
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
    content: (request)=> (
      <Card>
      <CardContent className="p-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-pink-500" />
            <div>
              <p className="font-medium">{request.sponsor.name}</p>
              <p className="text-sm text-gray-400">{request.sponsor.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Building className="w-5 h-5 text-green-500" />
            <p className="text-sm">{request.sponsor.company.orginization.indexOf(".") > 0 ? request.sponsor.company.orginization : "individual"}</p>
          </div>
          <div className="flex items-start space-x-3">
            <Package className="w-5 h-5 text-purple-500 mt-1" />
            <p className="text-sm mt-1">{request.title} - {request.productDescription}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <DollarSign className="w-5 h-5 text-green-500" />
            <p className="text-sm">Payment Cap: ${(request.paymentCap / 100).toFixed(2)}</p>
<TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-4 h-4 text-gray-400 cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-sm">
                The payment cap is the maximum amount you can earn for this sponsorship. 
                Your actual earnings may be lower depending on your performance metrics.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-red-500" />
            <p className="text-sm">Scheduled Post: {convertFromUtcToLocal(request.post.uploadDate)}</p>
          </div>
        <div className="col-span-full">
          <div className="flex items-center space-x-3 mb-2">
            <Link2 className="w-5 h-5 text-blue-500" />
            <p className="font-medium">Purchased Listing</p>
          </div>
      <Link 
      href={`/listings/${request.post.id}`} 
      className="text-sm text-blue-400 hover:underline flex items-center space-x-2"
      >
      <Link2 className="w-4 h-4" />
      <span>{request.post.title}</span>
      </Link>

        </div>
        </div>
      </div>
      </CardContent>
      </Card>
    )
  },
  ongoing: {
    title: "You have partnered with a sponsor!",
    content: (request,videoUrls,setVideoUrls)=> (
 <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Started on</p>
                <p className="text-sm text-gray-400">
                  {request.transaction && new Date(request.transaction.createdAt).toDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Sponsor</p>
                <p className="text-sm text-gray-400">{request.sponsor.name}</p>
                <p className="text-xs text-gray-400">{request.sponsor.email}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm font-medium">Upload Deadline</p>
                <p className="text-sm text-gray-400">
                  {request.transaction && convertFromUtcToLocal(request.transaction.deadline)}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
              <p className="text-sm text-yellow-400">
                {getStatusMessage(request.transaction?.status)}
              </p>
            </div>
          </div>
        </div>
        
        {request.transaction?.status === "DRAFT_REFUSED" && (
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-md">
            <p className="text-sm">{request.transaction.refuteUrlInfo}</p>
          </div>
        )}
        
        <div className="mt-6 space-y-4">
          <Input 
            id="videoUrl"
            disabled={!["PENDING", "DRAFT_REVIEW", "FINAL_REVIEW", "DRAFT_ACCEPTED", "DRAFT_REFUSED"].includes(request.transaction?.status)}
            placeholder={request.transaction?.status === "DRAFT_ACCEPTED" ? "https://www.youtube.com/watch?v=..." : "Enter video link"}
            onChange={(e) => setVideoUrls((prev) => ({ ...prev, [request.transaction.id]: e.target.value }))}
          />
          <div className="flex items-center space-x-2">
            <Link2 className="w-5 h-5 text-blue-500" />
            <Link
              href={request.transaction?.videoUrl || request.transaction?.draftVideoUrl || "#"}
              className="text-sm text-blue-400 hover:underline"
            >
              {request.transaction?.videoUrl || request.transaction?.draftVideoUrl || "No link uploaded"}
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
    )
  },
  receipt: {
    title: "Transaction Receipt",
    content: (request)=> (
    <Card className="w-full max-w-4xl">
      <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FileCheck className="w-5 h-5 text-green-500" />
              <p className="text-sm text-muted-foreground">
                Completed on: {formatDate(request.transaction?.transfer?.createdAt)}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-primary" />
              <p className="text-sm text-muted-foreground">
                Buyer: {request.sponsor.name}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-500" />
              <p className="text-sm text-muted-foreground">
                Earnings: <span className="font-bold">${(request.transaction?.transfer?.earnings || (request.requestedPrice / 100)).toLocaleString()}</span>
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-green-500" />
              <p className="text-sm text-muted-foreground">
                Payday: {convertFromUtcToLocal(request.transaction?.transfer?.payday)}
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Thank you for using SponsorLab. This serves as your official receipt.
          </p>
        {
          request.pricingModel === "CPM" && 
          <div className="flex items-start space-x-2 bg-green-500/10 p-4 rounded-md">
            <Info className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-green-700 dark:text-green-300">
              {request.pricingModel === "FLAT"
                ? "The money will hit your bank account within the next 2 weeks. If there are questions or concerns, please contact support@sponsorlab.co"
                : "SponsorLab evaluates the video's performance one month after it's posted. The final payment is calculated based on the number of views achieved during this period."}
            </p>
          </div>
        }
        </div>
        {
          request.pricingModel === "FLAT" && 
          <div className="flex items-start space-x-2  p-4 rounded-md">
            <Info className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-green-700 dark:text-green-300">
              {request.pricingModel === "FLAT"
                ? "The money will hit your bank account within the next 2 weeks. If there are questions or concerns, please contact support@sponsorlab.co"
                : "SponsorLab evaluates the video's performance one month after it's posted. The final payment is calculated based on the number of views achieved during this period."}
            </p>
          </div>
        }

        {request.pricingModel === "CPM" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-primary/10 p-4 rounded-lg">
              <Badge variant="secondary">Total Views: {(request.transaction?.transfer?.currViews || "").toLocaleString()}</Badge>
              <Badge variant="default">Earnings: ${(request.transaction?.transfer?.earnings || "").toLocaleString()}</Badge>
            </div>
            <div className="h-[200px]">
              <LineChart data={request.transaction?.transfer?.videoProgress} />
            </div>
            <div className="flex items-center space-x-2">
              <Link2 className="w-5 h-5 text-primary" />
              <Link
                href={request.transaction?.videoUrl || request.transaction?.draftVideoUrl || "#"}
                className="text-sm text-primary hover:underline"
              >
                {request.transaction?.videoUrl || request.transaction?.draftVideoUrl || "No link uploaded"}
              </Link>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        For any inquiries, please contact our support team.
      </CardFooter>
    </Card>
      )
    }
  }


function ShowButtons(props) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedParams, setSelectedParams] = useState("");
  const [selectedInfo, setSelectedInfo] = useState("");
  const [fnsName, setFnsName] = useState("");

  const fns = {
    decline:props.declineRequest, 
    accept: props.acceptRequest,
    cancelTransaction: props.cancelTransaction,
    sendDraftUrl: props.sendDraftUrl,
    sendVideoUrl: props.sendVideoUrl,
  }

  const map = {
    "decline": () => {
      setShowConfirm(true);
      setFnsName("decline");
      setSelectedParams(props.request.id);
      setSelectedInfo({ 
        title: "Are you sure you want to decline this request?", 
        info: "The status of this request will be DECLINED and no further actions can be taken"
      });
    },
    "accept": () => {
      setShowConfirm(true);
      setFnsName("accept");
      setSelectedParams(props.request.id);
      setSelectedInfo({ 
        title: "Are you sure you want to accept this request?", 
        info: "The status of this request will be ACCEPTED and a confirmation message will be sent to the sponsor in order to continue"
      });
    },
    "cancelTransaction": () => {
      setShowConfirm(true);
      setFnsName("cancelTransaction");
      setSelectedParams(props.request.transaction.id);
      setSelectedInfo({ 
        title: "Are you sure you want to cancel this transaction?", 
        info: "The status of this transaction will be CANCELED, the sponsor will be refunded and not further actions can be taken"
      });
    },
    "sendVideoUrl": () => {
      setShowConfirm(true);
      setFnsName("sendVideoUrl");
      setSelectedParams(props.request.transaction.id);
      setSelectedInfo({ 
        title: "Are you sure you want to send this url?", 
        info: "The video url will be send to the sponsor for review and if they approve then you will be paid. If they do not approve of this video url, then the url will go under admin review."
      });
    },
    "sendDraftUrl": () => {
      setShowConfirm(true);
      setFnsName("sendDraftUrl");
      setSelectedParams(props.request.transaction.id);
      setSelectedInfo({ 
        title: "Are you sure you want to send this url as a draft?", 
        info: "The video url will be send to the sponsor for review. If they do not approve of this video url, they will explain what they want to edit."
      });
    }
  }

  const viewProposal = <Button
    variant="outline"
    className="bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-600 flex items-center"
    onClick={() => props.handleViewProposal(props.request)}>
    <Eye className="w-4 h-4 mr-2" />
    View Proposal
  </Button> 

  const videoUrl = props.request.transaction && (["PENDING","DRAFT_REFUSED","DRAFT_REVIEW"].includes(props.request.transaction.status)) ? 
    <Button
    variant="outline"
    className="bg-green-800 text-gray-300 hover:bg-green-700 border-gray-600 flex items-center"
    onClick={() => map["sendDraftUrl"]()}
  >
    <Video className="w-4 h-4 mr-2" />
    Send Draft Url
  </Button> 

    : <Button
    variant="outline"
    className="bg-green-800 text-gray-300 hover:bg-green-700 border-gray-600 flex items-center"
    onClick={() => map["sendVideoUrl"]()}
  >
    <Video className="w-4 h-4 mr-2" />
    Send Video Url
  </Button>

  const cancel = 
    <Button disabled={props.load} onClick={() => map["cancelTransaction"]()} variant="outline" className="bg-red-900 text-red-100 hover:bg-red-800 border-red-700 flex items-center">
      <X className="w-4 h-4 mr-2" />
      Cancel
    </Button>

  const accept = <Button disabled={props.load} onClick={() => map["accept"]()} variant="outline" className="bg-green-900 text-green-100 hover:bg-green-800 border-green-700 flex items-center">
    <Check className="w-4 h-4 mr-2" />
    Accept
  </Button>

  const decline = <Button disabled={props.load} onClick={map["decline"]} variant="outline" className="bg-red-900 text-red-100 hover:bg-red-800 border-red-700 flex items-center">
    <X className="w-4 h-4 mr-2" />
    Decline
  </Button>

  function getButton() {
    const {request} = props;
    const status = request.transaction ? request.transaction.status : "";

    if(!request.transaction) {
      if(request.status === "PENDING") {
        return <>{accept}{decline}{viewProposal}</>
      } else if(request.status === "CANCELED" || request.status === "DECLINED") {
        return <>{viewProposal}</>
      } else if(request.status === "ACCEPTED") {
        return <>{decline}{viewProposal}</>
      }
    } else { // there is a transaciton
      if(props.activeTab === "request") {
        return <>{viewProposal}</>

      } else if(!["ADMIN_REVIEW", "COMPLETED", "FAILED", "CANCELED"].includes(status) && props.activeTab === "ongoing") {
        return <>{cancel}{videoUrl}</>
      }
      return <></>
    }
  }

  return <>
    {getButton()}
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
            <DialogDescription className="text-gray-400">
              {selectedInfo.info}
            </DialogDescription>
          </div>
          
          <DialogFooter className="sm:justify-start">
            <Button
              disabled={props.load}
              onClick={() => {
                fns[fnsName](selectedParams);
                setShowConfirm(false);
              }} 
              className="bg-green-600 text-green-100 hover:bg-green-500 border-green-700"
            >
              {
                props.load ? "Loading..." : "I understand and accept"
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
  </>
}

function NoRequests() {
  return <main className="flex items-center justify-center bg-background p-4 md:p-8">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <FileIcon className="h-16 w-16 text-muted-foreground" />
        </div>
        <h1 className="mb-2 text-2xl font-semibold tracking-tight">No requests found</h1>
        <p className="mb-4 text-muted-foreground">You do not have any requests at the moment.</p>
      </div>
    </main>
}
  const getStatusMessage = (status) => {
    const messages = {
      FINAL_REVIEW: "The final video URL is being reviewed by the sponsor",
      DRAFT_REVIEW: "The draft URL is being reviewed by the sponsor",
      PENDING: "Please send a draft of the video that contains your ad for the sponsor to review",
      DRAFT_ACCEPTED: "The draft was accepted, please send the published YouTube video URL",
      DRAFT_REFUSED: "The sponsor refused your draft, please make these changes and send another draft: "
    }
    return messages[status] || "No further action is required for this step"
  }
