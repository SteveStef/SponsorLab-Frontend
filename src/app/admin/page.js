
'use client';
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DollarSign, Users, Youtube, AlertCircle, CheckCircle, Clock, FileQuestion, TrendingUp, Filter, Calendar, CreditCard, Video, User, Building } from "lucide-react";
import request from "@/request";

const transactions = [
  { id: 1, type: "Payout", amount: 1000, status: "Pending", issue: "Verification needed", videoUrl: "https://youtube.com/watch?v=abc123", amountHeld: 1000, paymentType: "CPM", creator: "JohnDoe", sponsor: "TechCorp", date: "2023-06-15" },
  { id: 2, type: "Refund", amount: 250, status: "Admin Review", issue: "Dispute resolution", videoUrl: "https://youtube.com/watch?v=def456", amountHeld: 250, paymentType: "Flat", creator: "JaneSmith", sponsor: "GameStudios", date: "2023-06-14" },
  { id: 3, type: "Sponsorship", amount: 5000, status: "Pending", issue: "Contract review", videoUrl: "https://youtube.com/watch?v=ghi789", amountHeld: 5000, paymentType: "Flat", creator: "MikeBrown", sponsor: "FoodDelivery", date: "2023-06-13" },
  { id: 4, type: "Payout", amount: 750, status: "Admin Review", issue: "Suspicious activity", videoUrl: "https://youtube.com/watch?v=jkl012", amountHeld: 750, paymentType: "CPM", creator: "EmilyClark", sponsor: "FashionBrand", date: "2023-06-12" },
  { id: 5, type: "Refund", amount: 100, status: "Pending", issue: "Additional information required", videoUrl: "https://youtube.com/watch?v=mno345", amountHeld: 100, paymentType: "CPM", creator: "ChrisWilson", sponsor: "TravelAgency", date: "2023-06-11" },
]

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
            ${item.amount}
          </text>
        </g>
      ))}
    </svg>
  )
}

export default function AdminDashboard() {
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [filters, setFilters] = useState({ type: 'All', status: 'All', search: '' })
  const [transactionHistory, setTransactionHistory] = useState([]);

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
    profit: [
      { month: 'Jan', amount: 10000 },
      { month: 'Feb', amount: 12000 },
      { month: 'Mar', amount: 15000 },
      { month: 'Apr', amount: 13000 },
      { month: 'May', amount: 16000 },
      { month: 'Jun', amount: 20000 },
      { month: 'Jul', amount: 22000 },
      { month: 'Aug', amount: 25000 },
      { month: 'Sep', amount: 23000 },
      { month: 'Oct', amount: 26000 },
      { month: 'Nov', amount: 28000 },
      { month: 'Dec', amount: 30000 },
    ],
  });

  const size = useWindowSize();

  const filteredTransactions = transactions.filter(transaction => 
    (filters.type === 'All' || transaction.type === filters.type) &&
    (filters.status === 'All' || transaction.status === filters.status) &&
    (filters.search ? 
      transaction.creator.toLowerCase().includes(filters.search.toLowerCase()) ||
      transaction.sponsor.toLowerCase().includes(filters.search.toLowerCase())
    : true)
  )

  async function fetchAdminData() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/admin`;
    const response = await request(url, "GET", null);
    setStats((prev) => ({ 
      ...prev, totalUsers: response.body.userCount,
      sponsors: response.body.sponsors, stripeBalance: response.body.balance,
      youtubers: response.body.channels
    }));
    console.log(response);
    setTransactionHistory(response.body.transactions);
  }

  useEffect(() => {
    fetchAdminData()
  },[]);

  return (
    <div className="min-h-screen text-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">SponsorLab Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-gray-700 hover:bg-gray-750 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="w-4 h-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="border-gray-700 hover:bg-gray-750 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Sponsors</CardTitle>
            <Building className="w-4 h-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.sponsors.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="border-gray-700 hover:bg-gray-750 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">YouTubers</CardTitle>
            <Youtube className="w-4 h-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.youtubers.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="border-gray-700 hover:bg-gray-750 transition-colors">
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
        <Card className="border-gray-700 hover:bg-gray-750 transition-colors">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Current Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                <span>Completed: {stats.transactions.completed}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-yellow-400 mr-2" />
                <span>Pending: {stats.transactions.pending}</span>
              </div>
              <div className="flex items-center">
                <FileQuestion className="w-4 h-4 text-red-400 mr-2" />
                <span>Admin Review: {stats.transactions.adminReview}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-700 hover:bg-gray-750 transition-colors">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Sponsors vs YouTubers</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <PieChart sponsors={stats.sponsors} youtubers={stats.youtubers} />
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-700 hover:bg-gray-750 transition-colors mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-green-400" />
            Profit Over Time
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
    { size.width && <LineGraph data={stats.profit} width={size.width} />}
        </CardContent>
      </Card>
      
      <Card className="border-gray-700 hover:bg-gray-750 transition-colors">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center">
            <AlertCircle className="w-6 h-6 mr-2 text-yellow-500" />
            History
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
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">Type</TableHead>
                  <TableHead className="text-gray-300">Amount</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Issue</TableHead>
                  <TableHead className="text-gray-300">Creator</TableHead>
                  <TableHead className="text-gray-300">Sponsor</TableHead>
                  <TableHead className="text-gray-300">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactionHistory.map((transaction) => (
                  <TableRow 
                    key={transaction.id} 
                    className="border-gray-700 cursor-pointer hover:bg-gray-700"
                    onClick={() => setSelectedTransaction(transaction)}
                  >
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>${transaction.amount.toLocaleString()}</TableCell>
                    <TableCell>{transaction.status}</TableCell>
                    <TableCell className="flex items-center">
                      <AlertCircle className="w-4 h-4 text-yellow-500 mr-2" />
                      {transaction.issue}
                    </TableCell>
                    <TableCell>{transaction.creator}</TableCell>
                    <TableCell>{transaction.sponsor}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
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
                  <p className="text-sm text-gray-400">Type</p>
                  <p className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-2 text-green-400" />
                    {selectedTransaction.type}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Amount</p>
                  <p className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-green-400" />
                    ${selectedTransaction.amount.toLocaleString()}
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
                    {selectedTransaction.issue}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Creator</p>
                  <p className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-blue-400" />
                    {selectedTransaction.creator}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Sponsor</p>
                  <p className="flex items-center">
                    <Building className="w-4 h-4 mr-2 text-purple-400" />
                    {selectedTransaction.sponsor}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Payment Type</p>
                  <p className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-2 text-green-400" />
                    {selectedTransaction.paymentType}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Amount Held</p>
                  <p className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-yellow-400" />
                    ${selectedTransaction.amountHeld.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Date</p>
                  <p className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                    {selectedTransaction.date}
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
    </div>
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
        width: window.innerWidth - window.innerWidth * .1 - 50,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

