"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UsersIcon, SearchIcon, InfoIcon } from "lucide-react";
import request from "@/request";

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [memberFilter, setMemberFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [organizations, setOrganizations] = useState([]);
  const itemsPerPage = 9

  async function fetchOrganizations() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/organizations`;
    const response = await request(url, "GET", null);
    console.log(response);
    if(response && response.success) {
      setOrganizations(response.body);
    }
  }

  useEffect(() => {
    fetchOrganizations();
  },[])


  /*
  const filteredOrganizations = organizations.filter((org) => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      memberFilter === "all" ||
      (memberFilter === "0-100" && org.members <= 100) ||
      (memberFilter === "101-200" && org.members > 100 && org.members <= 200)
    return matchesSearch && matchesFilter
  })*/

  const pageCount = 0; // Math.ceil(filteredOrganizations.length / itemsPerPage)
  const displayedOrganizations = []// filteredOrganizations.slice(
    //(currentPage - 1) * itemsPerPage,
    //currentPage * itemsPerPage
  //)

  return (
    <div className="min-h-screen text-gray-100 p-4 lg:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Sponsor Organizations</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/5 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-semibold mb-4 text-green-400">Sponsorship Benefits</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <InfoIcon className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
              <span>Exclusive access to industry events and conferences</span>
            </li>
            <li className="flex items-start">
              <InfoIcon className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
              <span>Priority in partnership opportunities and collaborations</span>
            </li>
            <li className="flex items-start">
              <InfoIcon className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
              <span>Featured promotion in our marketing materials and website</span>
            </li>
            <li className="flex items-start">
              <InfoIcon className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
              <span>Direct access to our network of industry professionals and innovators</span>
            </li>
          </ul>
        </div>
        {/* Main Content */}
        <div className="lg:w-3/5">
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search organizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-white"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Select value={memberFilter} onValueChange={setMemberFilter}>
              <SelectTrigger className="w-full sm:w-[180px] text-white">
                <SelectValue placeholder="Filter by members" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="0-100">0-100 members</SelectItem>
                <SelectItem value="101-200">101-200 members</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {organizations.map((org) => (
              <Card key={org.id} className="">
                <CardHeader>
                  <CardTitle className="">{org.orginization}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">{org.description || "No description set"}</p>
                  <div className="flex items-center text-gray-300">
                    <UsersIcon className="w-5 h-5 mr-2 text-green-400" />
                    <span>{org.members} members</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="flex justify-center gap-2">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              variant="outline"
            >
              Previous
            </Button>
            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
              disabled={currentPage === pageCount}
              variant="outline"
            >
              Next
            </Button>
          </div>
        </div>

        {/* Right Side Panel */}
      </div>
    </div>
  )
}




/*
"use client"
import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UsersIcon, SearchIcon, InfoIcon } from "lucide-react"

// Mock data for organizations
const organizations = [
  { id: 1, name: "TechCorp", members: 150, description: "Leading technology solutions" },
  { id: 2, name: "EcoGreen", members: 75, description: "Sustainable environmental practices" },
  { id: 3, name: "HealthPlus", members: 200, description: "Innovative healthcare services" },
  { id: 4, name: "EduLearn", members: 100, description: "Advanced educational platforms" },
  { id: 5, name: "FinanceHub", members: 80, description: "Cutting-edge financial technologies" },
  { id: 6, name: "AeroSpace", members: 120, description: "Pioneering aerospace engineering" },
  { id: 7, name: "FoodTech", members: 90, description: "Innovative food technology solutions" },
  { id: 8, name: "MediaStream", members: 110, description: "Cutting-edge media streaming services" },
  { id: 9, name: "SportsFit", members: 70, description: "Advanced sports and fitness technology" },
]

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [memberFilter, setMemberFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const filteredOrganizations = organizations.filter((org) => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      memberFilter === "all" ||
      (memberFilter === "0-100" && org.members <= 100) ||
      (memberFilter === "101-200" && org.members > 100 && org.members <= 200)
    return matchesSearch && matchesFilter
  })

  const pageCount = Math.ceil(filteredOrganizations.length / itemsPerPage)
  const displayedOrganizations = filteredOrganizations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="min-h-screen text-gray-100 p-4 lg:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Sponsor Organizations</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/5 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-semibold mb-4 text-green-400">Sponsorship Benefits</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <InfoIcon className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
              <span>Exclusive access to industry events and conferences</span>
            </li>
            <li className="flex items-start">
              <InfoIcon className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
              <span>Priority in partnership opportunities and collaborations</span>
            </li>
            <li className="flex items-start">
              <InfoIcon className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
              <span>Featured promotion in our marketing materials and website</span>
            </li>
            <li className="flex items-start">
              <InfoIcon className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
              <span>Direct access to our network of industry professionals and innovators</span>
            </li>
          </ul>
        </div>
        <div className="lg:w-3/5">
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search organizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-white"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Select value={memberFilter} onValueChange={setMemberFilter}>
              <SelectTrigger className="w-full sm:w-[180px] text-white">
                <SelectValue placeholder="Filter by members" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="0-100">0-100 members</SelectItem>
                <SelectItem value="101-200">101-200 members</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {displayedOrganizations.map((org) => (
              <Card key={org.id} className="">
                <CardHeader>
                  <CardTitle className="">{org.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">{org.description}</p>
                  <div className="flex items-center text-gray-300">
                    <UsersIcon className="w-5 h-5 mr-2 " />
                    <span>{org.members} members</span>
                  </div>
                </CardContent>
                <CardFooter>
                <Button style={{width: "100%"}}>View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="flex justify-center gap-2">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              variant="outline"
            >
              Previous
            </Button>
            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
              disabled={currentPage === pageCount}
              variant="outline"
            >
              Next
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}
 * */







