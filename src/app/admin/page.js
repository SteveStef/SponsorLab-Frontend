
'use client';
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowUpIcon, DollarSign, Users, Youtube, AlertCircle, Clock, TrendingUp, Filter, Calendar, CreditCard, Video, User, Building } from "lucide-react";
import { convertFromUtcToLocal } from "@/utils";
import Header from "../components/nav";
import request from "@/request";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [selectedTransfer, setSelectedTransfer] = useState(null)
  const [filters, setFilters] = useState({ type: 'All', status: 'All', search: '' })
  const [transfers, setTransfers] = useState([]);
  const [transactionsHistory, setTransactionHistory] = useState([]);
  const [loading, setLoading] = useState(false);

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
    profit: [],
  });

  const size = useWindowSize();

  /*
  const filteredTransactions = transactions.filter(transaction => 
    (filters.type === 'All' || transaction.type === filters.type) &&
    (filters.status === 'All' || transaction.status === filters.status) &&
    (filters.search ? 
      transaction.creator.toLowerCase().includes(filters.search.toLowerCase()) ||
      transaction.sponsor.toLowerCase().includes(filters.search.toLowerCase())
    : true)
  )*/

  async function fetchAdminData() {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/admin`;
      const response = await request(url, "GET", null);
      setStats((prev) => ({ 
        ...prev, totalUsers: response.body.userCount,
        sponsors: response.body.sponsors, stripeBalance: response.body.balance,
        youtubers: response.body.channels, profit: response.body.profit
      }));
      console.log(response);
      setTransfers(response.body.transfers);
      setTransactionHistory(response.body.transactions);
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
            <div className="text-2xl font-bold">${stats.stripeBalance.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
<Card className="">
          <CardHeader>
            <CardTitle>Profit Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">$45,678.90</div>
            <p className="text-green-400 flex items-center">
              <ArrowUpIcon className="h-4 w-4 mr-1" />
              12% from last month
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
        { size.width && <LineGraph data={stats.profit} width={size.width} />}
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
                  <TableHead className="text-gray-300">Issue</TableHead>
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
                    onClick={() => setSelectedTransaction(transaction)}
                  >
                    <TableCell>{transaction.request.pricingModel}</TableCell>
                    <TableCell>${(transaction.price / 100).toLocaleString()}</TableCell>
                    <TableCell>{transaction.status}</TableCell>
                    <TableCell className="flex items-center">
                      <AlertCircle className="w-4 h-4 text-yellow-500 mr-2" />
                      {transaction.status === "ADMIN_REVIEW" ? "Sponsor Refuted Video":"NONE"}
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
        <DialogContent className="text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Transaction Details</DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Amount</p>
                  <p className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-green-400" />
                    ${(selectedTransaction.price/100).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  <p className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-yellow-400" />
                    {selectedTransaction.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Issue</p>
                  <p className="flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2 text-red-400" />
                    {selectedTransaction.status === "ADMIN_REVIEW" ? "Review Video Url" : "NONE"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Creator</p>
                  <p className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-blue-400" />
                    {selectedTransaction.request.creator.email.split("@")[0]}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Sponsor</p>
                  <p className="flex items-center">
                    <Building className="w-4 h-4 mr-2 text-purple-400" />
                    {selectedTransaction.request.sponsor.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Payment Type</p>
                  <p className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-2 text-green-400" />
                    {selectedTransaction.request.pricingModel}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Amount Held</p>
                  <p className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-yellow-400" />
                    ${(selectedTransaction.amountHeld/100).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Created At</p>
                  <p className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                    {convertFromUtcToLocal(selectedTransaction.createdAt)}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400">Video URL</p>
                <a href={selectedTransaction.videoUrl} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline flex items-center">
                  <Video className="w-4 h-4 mr-2" />
                  {selectedTransaction.videoUrl}
                </a>
              </div>
            </div>
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
