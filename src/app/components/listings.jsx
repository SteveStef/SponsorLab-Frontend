/**
 * v0 by Vercel.
 * @see https://v0.dev/t/p6dBjn2YwG3
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

"use client"
import Image from "next/image"
import cuphead from "../../../public/headcup.jpg"
import Link from "next/link"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination"


export default function Component() {
  const posts = [
    {
      id: 1,
      title: "The Art of Mindful Living",
      views: 12345,
      author: {
        name: "Emily Wilkins",
        image: "/placeholder-user.jpg",
      },
      thumbnail: "/placeholder.svg",
    },
    {
      id: 2,
      title: "Exploring the Wonders of Nature",
      views: 8765,
      author: {
        name: "Michael Johnson",
        image: "/placeholder-user.jpg",
      },
      thumbnail: "/placeholder.svg",
    },
    {
      id: 3,
      title: "The Future of Renewable Energy",
      views: 6543,
      author: {
        name: "Sarah Lee",
        image: "/placeholder-user.jpg",
      },
      thumbnail: "/placeholder.svg",
    },
    {
      id: 4,
      title: "Mastering the Art of Public Speaking",
      views: 9876,
      author: {
        name: "David Chen",
        image: "/placeholder-user.jpg",
      },
      thumbnail: cuphead
    },
    {
      id: 5,
      title: "The Science of Happiness",
      views: 7890,
      author: {
        name: "Olivia Patel",
        image: "/placeholder-user.jpg",
      },
      thumbnail: "/placeholder.svg",
    },
    {
      id: 6,
      title: "Navigating the Digital Landscape",
      views: 5432,
      author: {
        name: "Liam Nguyen",
        image: "/placeholder-user.jpg",
      },
      thumbnail: "/placeholder.svg",
    },
    {
      id: 7,
      title: "The Art of Storytelling",
      views: 9012,
      author: {
        name: "Isabella Gomez",
        image: "/placeholder-user.jpg",
      },
      thumbnail: "/placeholder.svg",
    },
    {
      id: 8,
      title: "Unlocking the Secrets of Productivity",
      views: 6789,
      author: {
        name: "Ethan Ramirez",
        image: "/placeholder-user.jpg",
      },
      thumbnail: "/placeholder.svg",
    },
  ];
  const featuredPosts = [
    {
      id: 9,
      title: "Unlocking the Secrets of Productivity",
      views: 6789,
      author: {
        name: "Ethan Ramirez",
        image: "/placeholder-user.jpg",
        subscribers: 100,
      },
      thumbnail: "/placeholder.svg",
    },
    {
      id: 8,
      title: "Unlocking the Secrets of Productivity",
      views: 6789,
      author: {
        name: "Ethan Ramirez",
        image: "/placeholder-user.jpg",
        subscribers: 100,
      },
      thumbnail: "/placeholder.svg",
    },
    {
      id: 4,
      title: "Unlocking the Secrets of Productivity",
      views: 6789,
      author: {
        name: "Ethan Ramirez",
        image: "/placeholder-user.jpg",
        subscribers: 100,
      },
      thumbnail: "/placeholder.svg",
    },

  ];
  const [searchTerm, setSearchTerm] = useState("")
  const [currPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(6)
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }
  const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
  const indexOfLastPost = currPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
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
        <Link href="./listings/asdf"className="cursor-pointer bg-background rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
          <div className="relative h-48 sm:h-46 md:h-54 lg:h-52 overflow-hidden">
            <Image
              src={cuphead}
              alt="Post Thumbnail"
              className="w-full h-full object-cover"
              width="576"
              height="284"
              style={{ aspectRatio: "576/284", objectFit: "cover" }}
            />
            <div className="absolute top-2 left-2 bg-primary-foreground text-primary px-2 py-1 rounded-md text-xs">
              Tech
            </div>
            <div className="absolute bottom-2 right-2 bg-primary-foreground text-primary px-2 py-1 rounded-md text-xs">
              Available
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">
                <EyeIcon className="w-4 h-4 inline-block mr-1" />
                50K views
              </div>
              <div className="flex items-center gap-1">
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Mastering the Latest AI Trends</h3>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                <CalendarIcon className="w-4 h-4 inline-block mr-1" />
                November 20, 2023
              </div>
              <div className="text-primary font-semibold">$29.99</div>
            </div>
          </div>
        </Link>

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
          {featuredPosts.map((post) => (
          <Link key={post.id} href={`./listings/${post.id}`}>
        <div className="cursor-pointer bg-background rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
          <div className="relative h-48 sm:h-46 md:h-54 lg:h-52 overflow-hidden">
            <Image
              src={cuphead}
              alt="Post Thumbnail"
              className="w-full h-full object-cover"
              width="576"
              height="284"
              style={{ aspectRatio: "576/284", objectFit: "cover" }}
            />
            <div className="absolute top-2 left-2 bg-primary-foreground text-primary px-2 py-1 rounded-md text-xs">
              Tech
            </div>
            <div className="absolute bottom-2 right-2 bg-primary-foreground text-primary px-2 py-1 rounded-md text-xs">
              Available
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">
                <EyeIcon className="w-4 h-4 inline-block mr-1" />
                50K views
              </div>
              <div className="flex items-center gap-1">
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Mastering the Latest AI Trends</h3>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                <CalendarIcon className="w-4 h-4 inline-block mr-1" />
                November 20, 2023
              </div>
              <div className="text-primary font-semibold">$29.99</div>
            </div>
          </div>
        </div>
            </Link>
          ))}
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
