"use client";
import Black from "../../../public/connect.jpg";
import Image from "next/image";
import { convertFromUtcToLocal } from "@/utils";
import { FilterIcon, InfoIcon, AlertTriangleIcon, CheckCircleIcon, 
 EyeIcon, DollarSignIcon, CalendarIcon, TrendingUpIcon, TagIcon, X, SearchIcon} from "lucide-react";
import { Badge } from '@/components/ui/badge'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider";
import { motion } from 'framer-motion'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import request from "@/request.js";
import { useState, useEffect } from "react";
import Link from "next/link";

const defaultFilter = {dueDate: '', pricingModel: "all", risk: "", viewRange: [0, 1000000]};
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
}

export default function Component() {
  const [search, setSearch] = useState("");
  const [filteredListings, setFilteredListings] = useState([]);

  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    async function searchQuery() {
      if (debouncedSearch.trim() === "") {
        await fetchListings(1, defaultFilter);
      } else {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/posts/search`;
        const response = await request(url, "POST", { query: debouncedSearch });

        if (response && response.success) {
          setFilteredListings(response.body);
          setTotalPages(1);
        }
      }
    }
    searchQuery();
  }, [debouncedSearch]);

  async function fetchListings(page, filters) {
    setLoad(true);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/posts/page/${page}`;
    const response = await request(url, "POST", filters);
    if(response && response.success) {
      setFilteredListings(response.body);
      setTotalPages(Math.max(response.totalPages,1));
    }
    setLoad(false);
  }

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
                  placeholder="Search by Youtuber or listing title..."
                  className="text-gray-100 placeholder-gray-400 border-gray-600 focus:border-green-400"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Filter applyFilters={fetchListings} setCurrentPage={setCurrentPage}/>
              </div>
            </div>
          {
            load ? 
              <LoadingComponent />
            : filteredListings.length > 0 ?
<motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
    {filteredListings.map((listing, idx) => (
<motion.div key={idx} variants={itemVariants}>
        <Link
          key={idx}
          href={`./listings/${listing.id}`}
          className="group flex flex-col rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-green-500/20 h-full"
        >
          <div className="relative">
            <Image
              src={listing.thumbnailName || Black}
              alt={listing.title}
              width={576}
              height={284}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              priority={false}
            />
            <Badge className="absolute top-2 right-2 bg-purple-500 text-white">
              <TagIcon className="w-3 h-3 mr-1" />
              {listing.tag}
            </Badge>
          </div>
          <div className="p-4 flex-grow flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-3 line-clamp-2 text-gray-100 group-hover:text-green-400 transition-colors duration-300">
                {listing.title}
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <p className="flex items-center text-gray-300">
                  <EyeIcon className="w-4 h-4 mr-2 text-blue-400" />
                  <span className="font-medium">{listing.estimatedViews.toLocaleString()} views</span> 
                </p>
                <p className="flex items-center text-gray-300">
                  <DollarSignIcon className="w-4 h-4 mr-2 text-green-400" />
                  <span className="font-medium">${(listing.estimatedPrice / 100).toLocaleString()}</span>
                  <span className="ml-1 text-xs bg-gray-700 px-1 py-0.5 rounded">{listing.pricingModel}</span>
                </p>
                <p className="flex items-center text-gray-300">
                  <CalendarIcon className="w-4 h-4 mr-2 text-yellow-400" />
                  {convertFromUtcToLocal(listing.uploadDate)}
                </p>
                <p className="flex items-center">
                  <TrendingUpIcon className="w-4 h-4 mr-2 text-purple-400" />
                  <span className="text-gray-300 mr-1">Risk:</span>
                  <span
                    className={`font-semibold ${
                      listing.riskEvaluation === 'Low'
                        ? 'text-green-400'
                        : listing.riskEvaluation === "Medium"
                        ? 'text-yellow-400'
                        : 'text-red-400'
                    }`}
                  >
                    {listing.riskEvaluation}
                  </span>
                  {listing.riskEvaluation === "Low" ? (
                    <CheckCircleIcon className="h-4 w-4 ml-1 text-green-400" />
                  ) : (
                    <AlertTriangleIcon className={`h-4 w-4 ml-1 ${listing.riskEvaluation === "Medium" ? "text-yellow-400" : "text-red-400"}`} />
                  )}
                </p>
              </div>
            </div>
            <Button className="w-full mt-auto bg-green-500 hover:bg-green-600 transition-colors duration-300">
              View Details
            </Button>
          </div>
        </Link>
      </motion.div>
      ))}
            </motion.div>: <EmptyListingsState />
          }
    {filteredListings.length > 0 &&
    <div className="mt-8 flex justify-center">
              <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
                <Button
                  onClick={() => {
                    fetchListings(currentPage - 1);
                    setCurrentPage(currentPage - 1);
                  }}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700 mr-2"
                >
                  Previous
                </Button>

                {[currentPage-1, currentPage, currentPage+1].map((p, i) => {
                  if(currentPage === 1 && p === 0) return <span key={i}></span>
                  if(currentPage === 1 && p === 2) return <span key={i}></span>
                  if(currentPage === totalPages && i === 2) return <span key={i}></span>

                  return (
                  <Button
                    key={i}
                    onClick={() => {
                      if(p !== currentPage) fetchListings(p);
                      setCurrentPage(p);
                    }}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium mx-0.5 ${
                      currentPage === p
                        ? 'text-green-400 bg-gray-700'
                        : 'text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {p}
                  </Button>
                )})}

                <Button
                  onClick={() => {
                    fetchListings(currentPage + 1);
                    setCurrentPage(currentPage + 1);
                  }}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700 ml-2"
                >
                  Next
                </Button>
              </nav>
            </div>

    }
          </main>
        </div>
      </div>
    </div>
  )
}

function Filter({applyFilters, setCurrentPage}) {
  const [filters, setFilters] = useState({
    pricingModel: 'all',
    viewRange: [0, 1000000],
    flatRange: [0, 1000000],
    cpmRange: [0, 100],
    risk: 'all',
    dueDate: '',
  })

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      pricingModel: 'all',
      viewRange: [0, 1000000],
      flatRange: [0, 1000000],
      cpmRange: [0, 100],
      risk: 'all',
      dueDate: '',
    });

    applyFilters(1, {
      pricingModel: 'all',
      viewRange: [0, 1000000],
      flatRange: [0, 1000000],
      cpmRange: [0, 100],
      risk: 'all',
      dueDate: '',
    });
    setCurrentPage(1);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-600">
          <FilterIcon className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-4 text-gray-100 border-gray-700">
    <div className="flex justify-between items-center mb-4">
    <DropdownMenuLabel className="text-lg font-bold">Filters</DropdownMenuLabel>
    <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-400 hover:text-gray-100">
    <X className="h-4 w-4 mr-1" />
    Clear
    </Button>
    </div>
        <DropdownMenuSeparator className="bg-gray-700 my-2" />
        
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-1 block">Pricing Model</Label>
            <RadioGroup
              value={filters.pricingModel}
              onValueChange={(value) => {
                handleFilterChange('pricingModel', value);
                handleFilterChange('priceRange', value === "CPM" ? [0, 100] : [0, 100000]);
              }}
              className="flex space-x-4"
            >
              <div className="flex items-center">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all" className="ml-2">All</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem value="CPM" id="cpm" />
                <Label htmlFor="cpm" className="ml-2">CPM</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem value="FLAT" id="flat" />
                <Label htmlFor="flat" className="ml-2">FLAT</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="text-sm font-medium mb-1 block">View Range</Label>
            <Slider
              min={0}
              max={1000000}
              step={1000}
              value={filters.viewRange}
              onValueChange={(value) => handleFilterChange('viewRange', value)}
              className="my-4"
            />
            <div className="flex justify-between text-sm">
              <span>{filters.viewRange[0].toLocaleString()} views</span>
              <span>{filters.viewRange[1].toLocaleString()} views</span>
            </div>
          </div>
          {
            filters.pricingModel === 'CPM' &&
          <div>
            <Label className="text-sm font-medium mb-1 block">Price Range ({filters.pricingModel})</Label>
            <Slider
              min={1}
              max={100}
              step={1}
              value={filters.cpmRange}
              onValueChange={(value) => handleFilterChange('cpmRange', value)}
              className="my-4"
            />
            <div className="flex justify-between text-sm">
              <span>${filters.cpmRange[0].toLocaleString()}</span>
              <span>${filters.cpmRange[1].toLocaleString()}</span>
            </div>
          </div>
          }
          {
            filters.pricingModel === 'FLAT' &&
          <div>
            <Label className="text-sm font-medium mb-1 block">Price Range ({filters.pricingModel})</Label>
            <Slider
              min={1}
              max={100000}
              step={50}
              value={filters.flatRange}
              onValueChange={(value) => handleFilterChange('flatRange', value)}
              className="my-4"
            />
            <div className="flex justify-between text-sm">
              <span>${filters.flatRange[0].toLocaleString()}</span>
              <span>${filters.flatRange[1].toLocaleString()}</span>
            </div>
          </div>
          }

          <div>
            <Label className="text-sm font-medium mb-1 block">Risk Level</Label>
            <RadioGroup
              value={filters.risk}
              onValueChange={(value) => handleFilterChange('risk', value)}
              className="flex space-x-4"
            >
              <div className="flex items-center">
                <RadioGroupItem value="all" id="risk-all" />
                <Label htmlFor="risk-all" className="ml-2">All</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem value="Low" id="risk-low" />
                <Label htmlFor="risk-low" className="ml-2">Low</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem value="Medium" id="risk-medium" />
                <Label htmlFor="risk-medium" className="ml-2">Medium</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem value="High" id="risk-high" />
                <Label htmlFor="risk-high" className="ml-2">High</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="due-date" className="text-sm font-medium mb-1 block">Exact upload date</Label>
            <Input
              type="date"
              id="due-date"
              value={filters.dueDate}
              onChange={(e) => handleFilterChange('dueDate', e.target.value)}
              className="w-full bg-gray-800 text-gray-100 border-gray-700"
            />
          </div>
        </div>

        <DropdownMenuSeparator className="bg-gray-700 my-4" />
        
        <Button onClick={() => {
          applyFilters(1, filters)
          setCurrentPage(1);
        }} className="w-full bg-green-500 hover:bg-green-600">
          Apply Filters
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function LoadingComponent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="flex flex-col rounded-lg overflow-hidden shadow-lg h-full animate-pulse">
          <div className="h-48 w-full"></div>
          <div className="p-4 flex-grow flex flex-col justify-between">
            <div>
              <div className="h-6 bg-gray-700 rounded w-3/4 mb-3"></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="h-4 bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-700 rounded"></div>
              </div>
            </div>
            <div className="h-10 bg-gray-700 rounded mt-4"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

function EmptyListingsState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <SearchIcon className="w-16 h-16 text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">No Listings Available</h2>
      <p className="text-gray-400 mb-6 max-w-md">
        We could not find any listings matching your criteria. Try adjusting your search or filters, or check back later for new opportunities.
      </p>
      <Button
        className="bg-green-500 hover:bg-green-600 transition-colors duration-300"
        onClick={() => window.location.reload()}
      >
        Refresh Listings
      </Button>
    </div>
  )
}

