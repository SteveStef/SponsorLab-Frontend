"use client";
import Black from "../../../public/connect.jpg";
import Image from "next/image";
import { convertFromUtcToLocal } from "@/utils";
import { SearchIcon, FilterIcon, InfoIcon , ChevronRightIcon, AlertTriangleIcon, CheckCircleIcon, TrendingUpIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import request from "@/request.js";
import { useState, useEffect } from "react"
import Link from "next/link"

export default function Component() {
  const [listings, setListings] = useState([]);

  async function fetchListings() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/posts/page/1`;
    const response = await request(url, "GET", null);
    //console.log(response);
    if(response && response.success) {
      for(let i = 0; i < response.body.length; i++) {
        response.body[i].riskEvaluation = determindRisk(response.body[i]);
      }
      setListings(response.body);
    }
  }

  useEffect(() => {
    fetchListings();
  },[]);

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
              {listings.map((listing, idx) => (
                <Link key={idx} href={`./listings/${listing.id}`} className="rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-green-500/20">
                  <Image
                    src={listing.thumbnailName || Black}
                    alt={listing.title}
                    width="576"
                    height="284"
                    className="w-full h-40 object-cover"
                    priority={false}
                  />

                {/*
                <span className="absolute top-2 left-2 bg-green-500 text-xs font-semibold px-2 py-1 rounded-full">
                {listing.category}
                </span>
                */}

                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold truncate">{listing.title}</h3>
                      <span className=" bg-purple-500 text-xs font-semibold px-2 py-1 rounded-full">{listing.tag}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p className="text-gray-400">Views: {listing.estimatedViews.toLocaleString()}</p>
                      <p className="text-gray-400">Price: ${listing.estimatedPrice.toLocaleString()}
                        {listing.pricingModel ==="CPM"&&<span className=""> / 1K</span>}</p>
                      <p className="text-gray-400">{convertFromUtcToLocal(listing.uploadDate)}</p>
                      <p className="text-gray-400">
                <span
                className={`font-semibold ${listing.riskEvaluation === 'Low' ? 'text-green-400' : listing.riskEvaluation === "Medium" ? 'text-yellow-400' : 'text-red-400'}`}>
                <span className="flex items-center">
                <span><span className="text-gray-400 font-normal">Risk: </span><span className="pr-1">{listing.riskEvaluation}</span></span>

                {
                  listing.riskEvaluation === "Low" ?
                  <CheckCircleIcon className="h-4 w-4 mr-2 text-green-400" />
                  : listing.riskEvaluation === "Medium" ?

                  <AlertTriangleIcon className="h-4 w-4 mr-2 text-yellow-400" />
                  :
                  <AlertTriangleIcon className="h-4 w-4 mr-2 text-red-400" />
                }
                </span>
                  </span>
                </p>
                    </div>
                    <Button className="w-full mt-4 bg-green-500 hover:bg-green-600">View Details</Button>
                  </div>
                </Link>
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

function determindRisk(listing) {
  const deviations = listing.user.channel.viewDeviations;
  const views = listing.estimatedViews;

  if(deviations.length < 4) { // this is invalid
    return "High";
  }

  if(views <= deviations[deviations.length - 3]) {
    return "Low";
  } else if(views <= deviations[deviations.length - 2]) {
    return "Medium";
  } else return "High";

}

function Eye(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
