"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  Select} from "@/components/ui/select";
import { UsersIcon, FilterIcon,InfoIcon, ChevronRightIcon, AlertTriangleIcon, CheckCircleIcon} from "lucide-react"
import {useRouter} from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import request from "@/request.js";

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [memberFilter, setMemberFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [organizations, setOrganizations] = useState([]);
  const router = useRouter();

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

  return (
    <div className="text-gray-100">
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <aside className="p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Risk Evaluation Guide</h2>
            <p className="text-gray-300 mb-4">
              <span className="flex">
              </span>

              <span className="flex items-start">
                <InfoIcon className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
                <span>
                  Our risk evaluation is based on multiple factors including content type, creator history, and market trends.
                </span>
              </span>
            </p>
            <h3 className="text-lg font-semibold mb-2">Risk Levels:</h3>
            <ul className="space-y-2 text-gray-300 mb-4">
              <li className="flex items-center">
                <CheckCircleIcon className="h-6 w-6 mr-2 text-green-400" />
                <span>Low: Safe investment, high probability of return</span>
              </li>
              <li className="flex items-center">
                <AlertTriangleIcon className="h-7 w-7 mr-2 text-yellow-400" />
                <span>Medium: Moderate risk, potential for high returns</span>
              </li>
              <li className="flex items-center">
                <AlertTriangleIcon className="h-8 w-8 mr-2 text-red-400" />
                <span>High: Speculative, high risk but potential for exceptional returns</span>
              </li>
            </ul>
            <p className="text-gray-300">
              We recommend a balanced portfolio with a mix of risk levels tailored to your risk tolerance and investment goals.
            </p>
          </aside>
          <main>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4 flex-grow">
                <Input
                  type="search"
                  placeholder="Search listings..."
                  className="text-gray-100 placeholder-gray-400 border-gray-600 focus:border-green-400"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="bg-green-500 hover:bg-green-600">
                      <FilterIcon className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="text-gray-100 border-gray-700">
                    <DropdownMenuLabel>Apply Filters</DropdownMenuLabel>
                    <DropdownMenuSeparator className="" />
                    <DropdownMenuItem>
                      <Select className="text-gray-100 border-gray-600">
                        <option value="">Risk Level</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </Select>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Select className="bg-gray-700 text-gray-100 border-gray-600">
                        <option value="">Price Range</option>
                        <option value="0-1000">$0 - $1,000</option>
                        <option value="1000-5000">$1,000 - $5,000</option>
                        <option value="5000+">$5,000+</option>
                      </Select>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Button className="w-full bg-green-500 hover:bg-green-600">Apply Filters</Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {organizations.map((org) => (
                  <Card key={org.id} className="">
                    <CardHeader>
                      <CardTitle className="">{org.user.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 mb-4">{org.description || "No description set"}</p>
                      <div className="flex items-center text-gray-300">
                        <UsersIcon className="w-5 h-5 mr-2 text-green-400" />
                        <span>{org.orginization}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={() => router.push(`./organizations/${org.id}`)}className="w-full bg-green-600 hover:bg-green-700 text-white">
                  View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
          </main>
        </div>
      </div>
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2">
        <Button className="rounded-full w-12 h-12 bg-green-500 hover:bg-green-600">
          <ChevronRightIcon className="h-6 w-6" />
          <span className="sr-only">Next Page</span>
        </Button>
      </div>
    </div>
  )
}




/*
 * */

