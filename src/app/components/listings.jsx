"use client";
import Image from "next/image"
//import cuphead from "../../../public/headcup.jpg"
import Link from "next/link"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
//import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination"
import request from "@/request.js";
import ListingLoad from "./sub-component/listingLoad.jsx";
import FeaturedListings from "./sub-component/featuredListings.jsx";
import { Badge } from "@/components/ui/badge"


export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(6)
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const totalPages = 1;//Math.ceil(filteredPosts.length / postsPerPage)
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const [listings, setListings] = useState([]);

  async function fetchListings() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/posts/page/1`;
    const response = await request(url, "GET", null);
    // console.log(response);
    if(response && response.success) {
      setListings(response.body);
    }
  }



  useEffect(() => {
    fetchListings();
  },[]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 rounded-lg border border-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <FilterIcon className="w-5 h-5" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by:</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Most Views</DropdownMenuItem>
              <DropdownMenuItem>Newest</DropdownMenuItem>
              <DropdownMenuItem>Oldest</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Pagination />
        </div>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6">
        {
          listings.length === 0 && [''].map((_, idx) => {
            return <ListingLoad key={idx}/>
          })
        }
        {
          listings.map((listing, idx) => {
            return (
        <Link key={idx} href={`./listings/${listing.id}`} className="cursor-pointer bg-background rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-48 sm:h-46 md:h-54 lg:h-52 overflow-hidden">
                  <Image
                    src={listing.thumbnailName || black}
                    alt="Post Thumbnail"
                    className="w-full h-full object-cover"
                    width="576"
                    height="284"
                    style={{ aspectRatio: "576/284", objectFit: "cover" }}
                  />
                  {
                    listing.tags.length === 1 && 
                      <div className={`absolute top-2 left-2 bg-primary-foreground text-primary px-2 py-1 rounded-md text-xs`}>
                        {listing.tags[0]}
                      </div>
                  }
                  {
                    listing.tags.length === 2 && 
                      <div className="absolute top-2 left-2 flex gap-2">
                      <div className={`bg-primary-foreground text-primary px-2 py-1 rounded-md text-xs`}>
                        {listing.tags[0]}
                      </div>
                        <div className={`bg-primary-foreground text-primary px-2 py-1 rounded-md text-xs`}>
                        {listing.tags[1]}
                        </div>
                      </div>
                  }
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-muted-foreground">
                      <EyeIcon className="w-4 h-4 inline-block mr-1" />
                      {new Intl.NumberFormat().format(listing.estimatedViews)}
                    </div>

                    {
                      displayBadge(listing)
                    }
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{listing.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      <CalendarIcon className="w-4 h-4 inline-block mr-1" />
                      {new Date(listing.uploadDate).toDateString()}
                    </div>
                    <div className="text-primary font-semibold">${listing.estimatedPrice}</div>
                  </div>
          </div>
        </Link>
              
            )
          })
        }

    </section>
      <div className="mt-8 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                disabled={currPage === 1}
                onClick={() => handlePageChange(currPage - 1)}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink href="#" isActive={page === currPage} onClick={() => handlePageChange(page)}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                disabled={currPage === totalPages}
                onClick={() => handlePageChange(currPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <div className="flex justify-center mt-8">
        <Pagination />
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Featured Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <FeaturedListings />
        </div>
      </div>
    </div>
  )
}

function EyeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
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


function FilterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}


function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}
function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}


function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function displayBadge(listing) {
  const deviations = listing.user.channel.viewDeviations;
  const views = listing.estimatedViews;
  const details = [
    {backgroundColor: "green", color: "white"},
    {backgroundColor: "yellow", color: "black"},
    {backgroundColor: "red", color: "white"}
  ];
  const text = [
    "Low Risk",
    "Medium Risk",
    "High Risk",
  ];
  for(let i = 0; i < deviations.length - 1; i++) {
    if(views >= deviations[i] && views <= deviations[i + 1]) {
      return <Badge
        variant="solid"
        className="px-3 py-1 rounded-md text-xs font-medium"
        style={details[i]}
      >
        { text[i] }
      </Badge>
    }
  }
  return <Badge
    variant="solid"
    className="px-3 py-1 rounded-md text-xs font-medium"
    style={{ backgroundColor: "red", color: "white" }}
  >
    High Risk
  </Badge>
}

