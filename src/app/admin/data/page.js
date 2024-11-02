
'use client';
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowUpIcon, DollarSign, Send, Check, Users, Youtube, AlertCircle, Clock, TrendingUp, Filter, Calendar, CreditCard, Video, User, Building } from "lucide-react";
import { convertFromUtcToLocal } from "@/utils";
import Header from "../../components/nav";
import request from "@/request";
import { toast } from "sonner";
import NotFound from "@/app/components/NotFound";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function AdminDashboard() {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [filters, setFilters] = useState({ type: 'All', status: 'All', search: '' });
  const [transfers, setTransfers] = useState([]);
  const [transactionsHistory, setTransactionHistory] = useState([]);
  const [profitsMade, setProfitsMade] = useState(0);
  const [startingUp, setStartingUp] = useState(true);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [sendToCreator, setSendToCreator] = useState(true);
  const [sendToSponsor, setSendToSponsor] = useState(true);
  const [sendViaEmail, setSendViaEmail] = useState(true);
  const [sendViaSponsorLab, setSendViaSponsorLab] = useState(true);

  const sendMessage = async (transaction) => {
    if (!message.trim()) return
    const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/send-message`;
    const response = await request(url, "POST", { 
      creatorEmail: sendToCreator ? transaction.request.creator.stripeAccount?.buisnessEmail || "" : "",
      sponsorEmail: sendToSponsor ? transaction.request.sponsor.email : "",
      sendViaEmail,
      sendViaSponsorLab,
      message, creatorSearchingEmail: transaction.request.creator.email
    });
    console.log(response);
    if(response && response.success) {
      setMessage("");
      toast.success("The message has been sent");
    } else toast.error("Message failed to send");
  }

  const [newStatus, setNewStatus] = useState("");

  const [stats, setStats] = useState({
    totalUsers: 0,
    sponsors: 0,
    youtubers: 0,
    stripeBalance: 0,
    transactions: {
      completed: 0,
      pending: 0,
      adminReview: 0,
    },
    profits: [],
    userGrowth: [],
  });
  console.log(selectedTransaction)

  const size = useWindowSize();

  async function fetchAdminData() {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/admin`;
      const response = await request(url, "GET", null);
      console.log(response);
      if(response && response.success) {
        setStartingUp(false);
        setStats((prev) => ({ 
          ...prev, totalUsers: response.body.userCount,
          sponsors: response.body.sponsors, stripeBalance: response.body.balance,
          userGrowth: response.body.userGrowth, youtubers: response.body.channels,
          profits: response.body.profits
        }));

        let sum = 0;
        for(let i = 0; i < response.body.profits.length; i++) sum += response.body.profits[i].amount;
        setProfitsMade(sum);

        setTransfers(response.body.transfers);
        setTransactionHistory(response.body.transactions);
      }
    } catch(err) {
      console.log(err);
    }
  }

  async function syncYoutubeData() {
    try {
      setLoading(true)
      const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/sync-channels`;
      const response = await request(url, "POST", {});
      console.log(response);
      if(response && response.success) {
        toast.success("Channels are synced");
      } else {
        toast.error("There was a problem syncing the youtube data");
      }
    } catch(err) {
      toast.error(err);
      console.log(err);
    }
    setLoading(false);
  }

  async function transferMoney() {
    try {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/transfer`;
      const response = await request(url, "POST", {});
      console.log(response);
      if(response && response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch(err) {
      toast.error(err);
      console.log(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchAdminData()
  },[]);

  if(startingUp) return <NotFound />

  async function updateTransactionStatus(transactionId) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/transaction-status`;
    const response = await request(url, "PUT", { transactionId, newStatus });
    if(response && response.success) {
      toast.success("The status has been changed to " + newStatus);
      fetchAdminData();
      setSelectedTransaction(null);
    } else toast.error("Failed to change status, tell steve");
  }

  return (
    <>
    <Header />
    <br></br>
    <br></br>
    <br></br>
    <div className="min-h-screen text-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">SponsorLab Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="hover:bg-gray-750 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="w-4 h-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="hover:bg-gray-750 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Sponsors</CardTitle>
            <Building className="w-4 h-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.sponsors.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="hover:bg-gray-750 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">YouTubers</CardTitle>
            <Youtube className="w-4 h-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.youtubers.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="hover:bg-gray-750 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Stripe Balance</CardTitle>
            <DollarSign className="w-4 h-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(stats.stripeBalance / 100).toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
<Card className="">
          <CardHeader>
            <CardTitle>Profit Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">${profitsMade.toLocaleString()}</div>
            <p className="text-green-400 flex items-center">
              <ArrowUpIcon className="h-4 w-4 mr-1" />
              0% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex space-x-4">
    <div className="flex"> 
    <Button 
    onClick={syncYoutubeData}
    className="bg-red-600 hover:bg-red-700 text-white transition-colors duration-300 flex items-center justify-center m-2"
    disabled={loading}
    >
    <Youtube className="mr-2" size={18} />
    Sync Youtube Data
    </Button>

    <Button 
    onClick={transferMoney}
    className="bg-green-600 hover:bg-green-700 text-white transition-colors duration-300 flex items-center justify-center m-2"
    disabled={loading}
    >
    <DollarSign size={18} />
    Send Payouts to Youtubers
    </Button>
    </div>
          </CardContent>
        </Card>
      </div>

      <Card className="hover:bg-gray-750 transition-colors mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-green-400" />
              User Growth
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
        { size.width && <LineGraph data={stats.userGrowth} width={size.width} />}
        </CardContent>
      </Card>
      
      <Card className="hover:bg-gray-750 transition-colors">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center">
            <AlertCircle className="w-6 h-6 mr-2 text-yellow-500" />
            Payouts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center space-x-4 mb-4">
            <Select value={filters.type} onValueChange={(value) => setFilters({...filters, type: value})}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Types</SelectItem>
                <SelectItem value="Payout">Payout</SelectItem>
                <SelectItem value="Refund">Refund</SelectItem>
                <SelectItem value="Sponsorship">Sponsorship</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Admin Review">Admin Review</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Search creator or sponsor"
                className="w-[250px]"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="">
                  <TableHead className="text-gray-300">Type</TableHead>
                  <TableHead className="text-gray-300">Amount</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Issue</TableHead>
                  <TableHead className="text-gray-300">Creator</TableHead>
                  <TableHead className="text-gray-300">Sponsor</TableHead>
                  <TableHead className="text-gray-300">Payday</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transfers.map((t,idx) => (
                  <TableRow 
                    key={idx} 
                    className="cursor-pointer hover:bg-gray-700"
                    onClick={() => setSelectedTransfer(t)}
                  >
                    <TableCell>{t.pricingModel}</TableCell>
                    <TableCell>${(t.price / 100).toLocaleString()}</TableCell>
                    <TableCell>{t.status}</TableCell>
                    <TableCell className="flex items-center">
                      <AlertCircle className="w-4 h-4 text-yellow-500 mr-2" />
                      {t.status === "PENDING" ? "Payout Needed":""}
                    </TableCell>
                    <TableCell>{t.transaction.request.creator.email.split("@")[0]}</TableCell>
                    <TableCell>{t.transaction.request.sponsor.email}</TableCell>
                    <TableCell>{convertFromUtcToLocal(t.payday)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>







      <Card className="hover:bg-gray-750 transition-colors mt-8">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center">
            <AlertCircle className="w-6 h-6 mr-2 text-yellow-500" />
              Partner Ships
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center space-x-4 mb-4">
            <Select value={filters.type} onValueChange={(value) => setFilters({...filters, type: value})}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Types</SelectItem>
                <SelectItem value="Payout">Payout</SelectItem>
                <SelectItem value="Refund">Refund</SelectItem>
                <SelectItem value="Sponsorship">Sponsorship</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Admin Review">Admin Review</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Search creator or sponsor"
                className="w-[250px]"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="">
                  <TableHead className="text-gray-300">Type</TableHead>
                  <TableHead className="text-gray-300">Amount</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Issues</TableHead>
                  <TableHead className="text-gray-300">Creator</TableHead>
                  <TableHead className="text-gray-300">Sponsor</TableHead>
                  <TableHead className="text-gray-300">Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactionsHistory.map((transaction,idx) => (
                  <TableRow 
                    key={idx} 
                    className="cursor-pointer hover:bg-gray-700"
                    onClick={() => {
                      setSelectedTransaction(transaction);
                      setNewStatus(transaction.status);
                    }}
                  >
                    <TableCell>{transaction.request.pricingModel}</TableCell>
                    <TableCell>${(transaction.price / 100).toLocaleString()}</TableCell>
                    <TableCell>{transaction.status}</TableCell>

                    <TableCell className="flex items-center">
                      {transaction.request.issues.length > 0 ? <div className="flex">
                      <AlertCircle className="w-4 h-4 text-yellow-500 mr-2" />
                        {transaction.request.issues.length}
                        </div>:<div className="flex">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        0
                        </div>}

                    </TableCell>
                    <TableCell>{transaction.request.creator.email.split("@")[0]}</TableCell>
                    <TableCell>{transaction.request.sponsor.email}</TableCell>
                    <TableCell>{convertFromUtcToLocal(transaction.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

    <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
      <DialogContent className="max-w-4xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Transaction Details</DialogTitle>
        </DialogHeader>
        {selectedTransaction && (
          <ScrollArea className="h-[calc(90vh-120px)] pr-4">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Agreed Price</p>
                  <p className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-green-400" />
                    ${(selectedTransaction.price/100).toLocaleString()} {"USD".toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-yellow-400" />
                    {selectedTransaction.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Creator</p>
                  <p className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-blue-400" />
                    {selectedTransaction.request.creator.email.split("@")[0]}
                    {" "}
                    {selectedTransaction.request.creator.stripeAccount?.buisnessEmail || "(No email)"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sponsor</p>
                  <p className="flex items-center">
                    <Building className="w-4 h-4 mr-2 text-purple-400" />
                    {selectedTransaction.request.sponsor.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment Type</p>
                  <p className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-2 text-green-400" />
                    {selectedTransaction.request.pricingModel}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Price After Fees (What we charged)</p>
                  <p className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-yellow-400" />
                    ${(selectedTransaction.amountHeld/100).toLocaleString()} {"USD".toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Partnership Start Date</p>
                  <p className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                    {convertFromUtcToLocal(selectedTransaction.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Final Video Url Deadline</p>
                  <p className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-red-400" />
                    {convertFromUtcToLocal(selectedTransaction.deadline)}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p>{selectedTransaction.description || "No Description"}</p>
              </div>

              {selectedTransaction.draftVideoUrl && (
                <div>
                  <p className="text-sm text-muted-foreground">Draft Video URL</p>
                  <a href={selectedTransaction.draftVideoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center">
                    <Video className="w-4 h-4 mr-2" />
                    {selectedTransaction.draftVideoUrl}
                  </a>
                </div>
              )}

              {selectedTransaction.refuteUrlInfo && (
                <div>
                  <p className="text-sm text-muted-foreground">Refute URL Info</p>
                  <p>{selectedTransaction.refuteUrlInfo}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-muted-foreground">Video URL</p>
                {selectedTransaction.videoUrl ? (
                  <a href={selectedTransaction.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center">
                    <Video className="w-4 h-4 mr-2" />
                    {selectedTransaction.videoUrl}
                  </a>
                ) : (
                  <p>No video URL available</p>
                )}
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="issues">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2 text-red-400" />
                      Issues ({selectedTransaction.request.issues.length})
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {selectedTransaction.request.issues.length > 0 ? (
                      <ul className="space-y-2">
                        {selectedTransaction.request.issues.map((issue, idx) => (
                          <li key={idx} className="border-b pb-2">
                            <p className="font-medium">Problem Type: {issue.problemType}</p>
                            <p className="text-sm text-muted-foreground">Description: {issue.problemDescription}</p>
                            <p className="text-sm text-muted-foreground">Sent by: {issue.user.email}</p>

                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No issues reported</p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="flex items-center space-x-4">
                <Select value={newStatus} onValueChange={(value) => setNewStatus(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Change status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="CANCELED">Cancelled</SelectItem>
                    <SelectItem value="FAILED">Failed</SelectItem>
                    <SelectItem value="DRAFT_REFUSED">Draft Refused</SelectItem>
                    <SelectItem value="DRAFT_ACCPETED">Draft Accept</SelectItem>
                    <SelectItem value="DRAFT_REVIEW">Draft Review</SelectItem>
                    <SelectItem value="FINAL_REVIEW">Final Review</SelectItem>
                    <SelectItem value="ADMIN_REVIEW">Admin Review</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => updateTransactionStatus(selectedTransaction.id)} disabled={newStatus === selectedTransaction.status}>Update Status</Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Send Message</h3>
                <Textarea
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="sendToCreator" checked={sendToCreator} onCheckedChange={setSendToCreator} />
                    <Label htmlFor="sendToCreator">Send to Creator</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="sendToSponsor" checked={sendToSponsor} onCheckedChange={setSendToSponsor} />
                    <Label htmlFor="sendToSponsor">Send to Sponsor</Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="sendViaEmail" checked={sendViaEmail} onCheckedChange={setSendViaEmail} />
                    <Label htmlFor="sendViaEmail">Send via Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="sendViaSponsorLab" checked={sendViaSponsorLab} onCheckedChange={setSendViaSponsorLab} />
                    <Label htmlFor="sendViaSponsorLab">Send via SponsorLab Notification</Label>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => sendMessage(selectedTransaction)} disabled={!message.trim() || (!sendToCreator && !sendToSponsor)}>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>

      <Dialog open={!!selectedTransfer} onOpenChange={() => setSelectedTransfer(null)}>
        <DialogContent className="text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Payout Details</DialogTitle>
          </DialogHeader>
          {selectedTransfer && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Amount</p>
                  <p className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-green-400" />
                    ${(selectedTransfer.price/100).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  <p className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-yellow-400" />
                    {selectedTransfer.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Issue</p>
                  <p className="flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2 text-red-400" />
                    {selectedTransfer.status === "PENDING" ? "Needs Payout": ""}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Creator</p>
                  <p className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-blue-400" />
                    {selectedTransfer.transaction.request.creator.email.split("@")[0]}
                    {" "}
                    {selectedTransfer.transaction.request.creator.stripeAccount?.buisnessEmail || "(No email)"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Sponsor</p>
                  <p className="flex items-center">
                    <Building className="w-4 h-4 mr-2 text-purple-400" />
                    {selectedTransfer.transaction.request.sponsor.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Payment Type</p>
                  <p className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-2 text-green-400" />
                    {selectedTransfer.pricingModel}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Amount Held</p>
                  <p className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-yellow-400" />
                    ${(selectedTransfer.amountHeld/100).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Payday</p>
                  <p className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                    {convertFromUtcToLocal(selectedTransfer.payday)}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400">Video URL</p>
                <a href={selectedTransfer.videoUrl} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline flex items-center">
                  <Video className="w-4 h-4 mr-2" />
                  {selectedTransfer.videoUrl}
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
    </>
  )
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth - window.innerWidth * .1 - 25,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

const PieChart = ({ sponsors, youtubers }) => {
  const total = sponsors + youtubers
  const sponsorsPercentage = (sponsors / total) * 100
  const youtubersPercentage = (youtubers / total) * 100

  return (
    <svg width="200" height="200" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="#059669" />
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="transparent"
        stroke="#22c55e"
        strokeWidth="90"
        strokeDasharray={`${sponsorsPercentage} ${youtubersPercentage}`}
        transform="rotate(-90 50 50)"
      />
      <text x="50" y="50" textAnchor="middle" dy=".3em" fontSize="8" fill="white">
        {`${Math.round(sponsorsPercentage)}% Sponsors`}
      </text>
    </svg>
  )
}

const LineGraph = ({ data, width }) => {
  const maxAmount = Math.max(...data.map(item => item.amount))
  const graphWidth = width;
  const graphHeight = 400;
  const padding = 40;
  const xStep = (graphWidth - 2 * padding) / (data.length - 1)
  const yScale = (graphHeight - 2 * padding) / maxAmount

  const points = data.map((item, index) => 
    `${padding + index * xStep},${graphHeight - padding - item.amount * yScale}`
  ).join(' ')

  return (
    <svg width={graphWidth} height={graphHeight}>
      <polyline
        fill="none"
        stroke="#22c55e"
        strokeWidth="2"
        points={points}
      />
      {data.map((item, index) => (
        <g key={index}>
          <circle
            cx={padding + index * xStep}
            cy={graphHeight - padding - item.amount * yScale}
            r="4"
            fill="#22c55e"
          />
          <text
            x={padding + index * xStep}
            y={graphHeight - 5}
            textAnchor="middle"
            fill="white"
            fontSize="12"
          >
            {item.month}
          </text>
          <text
            x={padding + index * xStep}
            y={graphHeight - padding - item.amount * yScale - 10}
            textAnchor="middle"
            fill="white"
            fontSize="12"
          >
            {item.amount.toLocaleString()}
          </text>
        </g>
      ))}
    </svg>
  )
}
