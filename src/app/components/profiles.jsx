"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import request from "@/request";
import ProfileLoad from "./sub-component/profileLoad";
import { UsersIcon, EyeIcon, SearchIcon, SortAscIcon, SortDescIcon } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

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
};

export default function Component() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("subscribers");
  const [sortOrder, setSortOrder] = useState("desc");
  const [users, setUsers] = useState([]);

  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1);
  const [load, setLoad] = useState(true);
  const [needsSponsor, setNeedsSponsor] = useState(false);

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
        await fetchCreators(1, needsSponsor, sortBy, sortOrder);
      } else {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/users/creators/search`;
        const response = await request(url, "POST", { query: debouncedSearch });
        console.log(response);
        if (response && response.success) {
          setUsers(response.body);
          setTotalPages(1);
        }
      }
    }
    searchQuery();
  }, [debouncedSearch]);


  async function fetchCreators(page, ns, sb, so) {
    setLoad(true);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/creators/page/${page}`;
    const response = await request(url, "POST", { needsSponsor: ns, sortBy: sb, sortOrder: so});
    console.log(response);
    if(response && response.success) {
      setUsers(response.body);
      setTotalPages(Math.max(1, response.totalPages));
    }
    setLoad(false);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        <aside className="p-6 bg-background rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium mb-1">Search</label>
              <div className="relative">
                <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="search"
                  type="text"
                  placeholder="Search users..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sort By</label>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSortBy("subscribers");
                  }}
                  className={sortBy === "subscribers" ? "bg-green-500 text-primary-foreground" : ""}
                >
                  Subscribers
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSortBy("avgViews");
                  }}
                  className={sortBy === "avgViews" ? "bg-green-500 text-primary-foreground" : ""}
                >
                  Avg Views
                </Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sort Order</label>
              <Button
                variant="outline"
                onClick={() => {
                  const newSort = sortOrder === "asc" ? "desc" : "asc"
                  setSortOrder(newSort);
                }}
                className="w-full"
              >
                {sortOrder === "asc" ? <SortAscIcon className="mr-2 h-4 w-4" /> : <SortDescIcon className="mr-2 h-4 w-4" />}
                {sortOrder === "asc" ? "Ascending" : "Descending"}
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="needsSponsor"
                checked={needsSponsor}
                onCheckedChange={setNeedsSponsor}
              />
              <label
                htmlFor="needsSponsor"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Needs Sponsor
              </label>
            </div>
              <Button
                disabled={load}
                onClick={() => fetchCreators(1, needsSponsor, sortBy, sortOrder)}
                className="w-full bg-green-500 hover:bg-green-600"
              >
                Apply Filters
              </Button>
          </div>
        </aside>
        <main>
          <h1 className="text-2xl font-bold mb-6">Youtubers</h1>
    {!load && users.length === 0 && <EmptyListingsState />}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {
                load ? [1,2,3,4,5,6,7,8,9].map((a) => <ProfileLoad key={a} />)
                : users.map((user,idx) => (
                <motion.div key={idx} variants={itemVariants} layout>
                  <Link href={`./profile/${user.channel.name}`}>
                    <Card className="bg-background p-4 rounded-lg shadow-md hover:bg-muted transition-colors duration-300">
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
                            {(user.channel.videoCount !== 0 ? (user.channel.totalViews / user.channel.videoCount) : 0).toLocaleString()} Avg Views
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
                </motion.div>
              ))
              }
            </AnimatePresence>
          </motion.div>

    {users.length > 0 &&
    <div className="mt-8 flex justify-center">
              <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
                <Button
                  onClick={() => {
                    fetchCreators(currentPage - 1, needsSponsor, sortBy, sortOrder);
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
                      if(p !== currentPage) fetchCreators(p, needsSponsor, sortBy, sortOrder);
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
                    fetchCreators(currentPage + 1, needsSponsor, sortBy, sortOrder);
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
  );
}

function EmptyListingsState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <SearchIcon className="w-16 h-16 text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">No Youtubers Found</h2>
      <p className="text-gray-400 mb-6 max-w-md">
        There are no youtubers found under the current search filters, try adjusting your search
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

