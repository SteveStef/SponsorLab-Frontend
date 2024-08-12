"use client";
import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import cuphead from "../../../public/headcup.jpg";
import Image from "next/image";
import request from "@/request";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination";
import ProfileLoad from "./sub-component/profileLoad";
import FeaturedListings from "./sub-component/featuredListings";

export default function Component() {
 const [search, setSearch] = useState("")
 const [sortBy, setSortBy] = useState("subscribers")
 const [sortOrder, setSortOrder] = useState("desc")
 const [currPage, setCurrentPage] = useState(1)
 const [itemsPerPage, setItemsPerPage] = useState(8)
 const [users, setUsers] = useState([]);

  const featuredPosts = [
    {
      id: 2,
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
      id: 3,
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
  ]
  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === "subscribers") {
          return sortOrder === "asc" ? a.subscribers - b.subscribers : b.subscribers - a.subscribers
        } else {
          return sortOrder === "asc" ? a.avgViews - b.avgViews : b.avgViews - a.avgViews
        }
      })
  }, [search, sortBy, sortOrder])

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentUsers = filteredUsers.slice(startIndex, endIndex)
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  async function fetchCreators() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/creators`;
    const response = await request(url, "GET", null);
    if(response && response.success) {
      setUsers(response.body);
    }
  }

  useEffect(() => {
    fetchCreators();
  },[]);


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Profiles</h1>
        <div className="flex items-center gap-4">
          <Input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md"
          />
          <Button
            variant="outline"
            onClick={() => setSortBy("subscribers")}
            className={sortBy === "subscribers" ? "bg-primary text-primary-foreground" : ""}
          >
            Sort by Subscribers
          </Button>
          <Button
            variant="outline"
            onClick={() => setSortBy("avgViews")}
            className={sortBy === "avgViews" ? "bg-primary text-primary-foreground" : ""}
          >
            Sort by Average Views
          </Button>
          <Button
            variant="outline"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className={sortOrder === "asc" ? "bg-primary text-primary-foreground" : ""}
          >
            {sortOrder === "asc" ? "Ascending" : "Descending"}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        { users.length === 0 && [''].map((_,idx) => { return <ProfileLoad key={idx}/> }) }

        {users.map((user, idx) => (
          <Link key={idx} href={`./profile/${user.channel.name}`}>
            <Card
              className="bg-background p-4 rounded-lg shadow-md hover:bg-muted transition-colors duration-300"
            >
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={user.channel.imageUrl} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <UsersIcon className="w-4 h-4" />
                    {user.channel.subscribersCount.toLocaleString()} Subscribers
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <EyeIcon className="w-4 h-4" />
                    {"50".toLocaleString()} Avg Views
                  </div>
                  {user.needsSponsor && (
                    <div className="mt-2 bg-yellow-500 text-yellow-900 px-2 py-1 rounded-md text-xs font-medium">
                      Needs Sponsor
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Pagination />
      </div>

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


function UsersIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
