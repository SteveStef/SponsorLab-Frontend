"use client";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, UserIcon, FilterIcon, InfoIcon, CheckCircleIcon, SearchIcon, Building2 } from "lucide-react"
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
  "Pets",
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
  "Wellness",

  "Electronics",
  "Home & Kitchen",
  "Fashion & Apparel",
  "Beauty & Personal Care",
  "Health & Wellness",
  "Toys & Games",
  "Sports & Outdoors",
  "Automotive",
  "Office Supplies",
  "Baby Products",
  "Pet Supplies",
  "Grocery & Gourmet Food",
  "Tools & Home Improvement",
  "Books & Media",
  "Garden & Outdoors",
  "Jewelry & Accessories",
  "Crafts & DIY",
  "Travel & Luggage",
  "Music Instruments & Gear",
  "Home Decor"
];

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
      setTotalPages(Math.max(1, response.totalPages));
    }
    setLoad(false);
  }

  return (
    <div className="text-gray-100">
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
<aside className="p-6 rounded-lg">
  <h2 className="text-xl font-semibold mb-4">Guide to Account Types</h2>
  <p className="text-gray-300 mb-4">
    <span className="flex items-start">
      <InfoIcon className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
      <span>
        Learn the key distinctions between individual and company accounts to gain a clearer understanding of how our platform works.
      </span>
    </span>
  </p>
  <h3 className="text-lg font-semibold mb-2">Types of Accounts:</h3>
  <ul className="space-y-2 text-gray-300 mb-4">
    <li className="flex items-center">
      <span>Individual Account: Best suited for sponsors representing themselves personally, not as part of a company.</span>
    </li>
    <li className="flex items-center">
      <span>Company Account: Registered under a business entity, typically managed by the company&apos;s marketing team members.</span>
    </li>
  </ul>
</aside>
          <main>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4 flex-grow">
                <Input
                  type="search"
                  placeholder="Search organizations..."
                  onChange={(e) => setSearch(e.target.value)}
                  className="text-gray-100 placeholder-gray-400 border-gray-600 focus:border-green-400"
                />
                <Filter productCategories={productCategories} setProductCategories={setProductCategories} fetchOrganizations={fetchOrganizations}/>
              </div>
            </div>
            {load ? 
              <LoadingComponent />
              : organizations.length > 0 ?
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <AnimatePresence>
                    {organizations.map((org) => (
<motion.div key={org.id} variants={itemVariants} layout>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-green-900/30">
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white py-2 px-4">

          <CardTitle className="text-lg font-semibold truncate flex">
              <Building2 className="w-6 h-6 mr-2 text-black" />
                      {org.orginization}</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-muted-foreground mb-4 h-14 overflow-hidden relative text-sm">
{org.description ? (
  (() => {
    const chars = org.description;
    const charLimit = 123;
    const truncatedDescription = chars.substring(0, charLimit);

    return (
      <>
        {truncatedDescription}
        {chars.length > charLimit && (
          <span className="absolute bottom-0 right-0 bg-gradient-to-l from-background to-transparent px-1">...</span>
        )}
      </>
    );
  })()
) : (
  "No description set"
)}
          </p>
          <div className="flex items-center text-muted-foreground text-sm">
                      <UserIcon className="w-4 h-4 mr-2 text-green-500" />
            <span className="">{org.user.name}</span>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 p-3">
          <Button 
            onClick={() => router.push(`./organizations/${org.id}`)} 
            className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors duration-300 text-sm"
          >
            View Details
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              : <EmptyListingsState />
            }

        {!load && organizations.length > 0 && 
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
              )
            })}

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
        }
          </main>
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
              <Building2 className="w-5 h-5 mr-2 text-green-400" />
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
    fetchOrganizations(1,productCategories);
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

function EmptyListingsState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <SearchIcon className="w-16 h-16 text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">No Sponsors</h2>
      <p className="text-gray-400 mb-6 max-w-md">
        There are no sponsors currently available
      </p>
      <Button
        className="bg-green-500 hover:bg-green-600 transition-colors duration-300"
        onClick={() => window.location.reload()}
      >
        Refresh Sponsors
      </Button>
    </div>
  )
}
