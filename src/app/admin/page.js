"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, Users, Youtube, AlertCircle, CheckCircle, Clock, FileQuestion } from "lucide-react"

// Mock data - replace with actual API calls in production
const stats = {
  totalUsers: 10000,
  sponsors: 2500,
  youtubers: 7500,
  stripeBalance: 50000,
  transactions: {
    completed: 1500,
    pending: 300,
    adminReview: 50,
  },
}

const transactions = [
  { id: 1, type: "Payout", amount: 1000, status: "Pending", issue: "Verification needed", videoUrl: "https://youtube.com/watch?v=abc123", amountHeld: 1000, paymentType: "CPM" },
  { id: 2, type: "Refund", amount: 250, status: "Admin Review", issue: "Dispute resolution", videoUrl: "https://youtube.com/watch?v=def456", amountHeld: 250, paymentType: "Flat" },
  { id: 3, type: "Sponsorship", amount: 5000, status: "Pending", issue: "Contract review", videoUrl: "https://youtube.com/watch?v=ghi789", amountHeld: 5000, paymentType: "Flat" },
  { id: 4, type: "Payout", amount: 750, status: "Admin Review", issue: "Suspicious activity", videoUrl: "https://youtube.com/watch?v=jkl012", amountHeld: 750, paymentType: "CPM" },
  { id: 5, type: "Refund", amount: 100, status: "Pending", issue: "Additional information required", videoUrl: "https://youtube.com/watch?v=mno345", amountHeld: 100, paymentType: "CPM" },
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

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">SponsorLab Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="w-4 h-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Sponsors</CardTitle>
            <DollarSign className="w-4 h-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.sponsors.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">YouTubers</CardTitle>
            <Youtube className="w-4 h-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.youtubers.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
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
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Transaction Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
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
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Sponsors vs YouTubers</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <PieChart sponsors={stats.sponsors} youtubers={stats.youtubers} />
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Transactions Needing Assistance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Type</TableHead>
                <TableHead className="text-gray-300">Amount</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Issue</TableHead>
                <TableHead className="text-gray-300">Video URL</TableHead>
                <TableHead className="text-gray-300">Amount Held</TableHead>
                <TableHead className="text-gray-300">Payment Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id} className="border-gray-700">
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>${transaction.amount.toLocaleString()}</TableCell>
                  <TableCell>{transaction.status}</TableCell>
                  <TableCell className="flex items-center">
                    <AlertCircle className="w-4 h-4 text-yellow-500 mr-2" />
                    {transaction.issue}
                  </TableCell>
                  <TableCell>
                    <a href={transaction.videoUrl} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">
                      Watch Video
                    </a>
                  </TableCell>
                  <TableCell>${transaction.amountHeld.toLocaleString()}</TableCell>
                  <TableCell>{transaction.paymentType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
