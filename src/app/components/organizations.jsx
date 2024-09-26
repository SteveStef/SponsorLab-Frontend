"use client";
import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, UsersIcon, FilterIcon,InfoIcon, AlertTriangleIcon, CheckCircleIcon, SearchIcon} from "lucide-react"
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import request from "@/request.js";

const categories = [
"Technology",
"Gaming",
"Fashion",
"Education",
"Finance",
"Lifestyle",
"Food/Cooking",
"Family",
"Music",
"Vlogs",
"Business",
"DIY/Crafts",
"Travel",
"Religion",
"Nature",
"Garden",
"Wellness"
];

export default function Component() {

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1);
  const [productCategories, setProductCategories] = useState([]);
  const [load, setLoad] = useState(true);

  const [organizations, setOrganizations] = useState([]);
  const router = useRouter();

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
        await fetchOrganizations(1, []);
      } else {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/users/organizations/search`;
        const response = await request(url, "POST", { query: debouncedSearch });
        if (response && response.success) {
          setOrganizations(response.body);
          setTotalPages(1);
        }
      }
    }
    searchQuery();
  }, [debouncedSearch]);

  async function fetchOrganizations(page, pc) {
    setLoad(true);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/organizations/page/${page}`;
    const response = await request(url, "POST", { productCategories: pc});
    if(response && response.success) {
      setOrganizations(response.body);
      setTotalPages(response.totalPages);
    }
    setLoad(false);
  }

  useEffect(() => {
    fetchOrganizations(1, []);
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
                  onChange={(e) => setSearch(e.target.value)}
                  className="text-gray-100 placeholder-gray-400 border-gray-600 focus:border-green-400"
                />
                <Filter productCategories={productCategories} setProductCategories={setProductCategories} fetchOrganizations={fetchOrganizations}/>
              </div>
            </div>
    {load ? 
      <LoadingComponent />
      :
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
    }
          </main>
        </div>
    <div className="mt-8 flex justify-center">
              <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
                <Button
                  onClick={() => {
                    fetchOrganizations(currentPage - 1, productCategories);
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
                      if(p !== currentPage) fetchOrganizations(p,productCategories);
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
                    fetchOrganizations(currentPage + 1, productCategories);
                    setCurrentPage(currentPage + 1);
                  }}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700 ml-2"
                >
                  Next
                </Button>
              </nav>
            </div>
      </div>
    </div>
  )
}

function LoadingComponent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <Card key={index} className="animate-pulse">
          <CardHeader>
            <div className="h-6 w-3/4 bg-gray-700 rounded"></div>
          </CardHeader>
          <CardContent>
            <div className="h-4 w-full bg-gray-700 rounded mb-4"></div>
            <div className="flex items-center">
              <UsersIcon className="w-5 h-5 mr-2 text-green-400" />
              <div className="h-4 w-1/2 bg-gray-700 rounded"></div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="h-10 w-full bg-green-600 rounded"></div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}


function Filter({ productCategories, setProductCategories, fetchOrganizations}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filteredCategories = useMemo(() => {
    return categories.filter(category =>
      category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  const handleCategoryToggle = (category) => {
    setProductCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleApplyFilters = () => {
    fetchOrganizations(1,[]);
    setDropdownOpen(false)
  }

  function clearFilters() {
    setProductCategories([]);
    setDropdownOpen(false)
    fetchOrganizations(1, []);
  }

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-600 text-black">
          <FilterIcon className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 text-gray-100 border-gray-700">
        <div className='flex justify-between'>
        <DropdownMenuLabel>Categories</DropdownMenuLabel>

    <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-400 hover:text-gray-100">
    <X className="h-4 w-4 mr-1" />
    Clear
    </Button>
        </div>
        <DropdownMenuSeparator className="bg-gray-700" />
        <div className="p-2">
          <div className="relative">
            <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 text-gray-100 border-gray-600 focus:border-green-400"
            />
          </div>
        </div>
        <div className="max-h-64 overflow-y-auto">
          {filteredCategories.map(category => (
            <div key={category} className="px-2 py-1.5">
              <label className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  checked={productCategories.includes(category)}
                  onCheckedChange={() => handleCategoryToggle(category)}
                />
                <span className="text-sm text-gray-200">{category}</span>
              </label>
            </div>
          ))}
        </div>
        <DropdownMenuSeparator className="bg-gray-700" />
        <div className="p-2">
          <Button
            className="w-full bg-green-500 hover:bg-green-600 text-white"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


