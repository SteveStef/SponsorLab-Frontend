/**
 * v0 by Vercel.
 * @see https://v0.dev/t/p6dBjn2YwG3
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

"use client"
import Image from "next/image"
import cuphead from "../../../public/headcup.jpg"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination"

export default function Listing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 md:px-6">
      <div className="max-w-6xl w-full">
        <div className="flex items-center mb-6">
          <form className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search videos..."
              className="w-full pl-10 pr-4 py-2 rounded-md bg-muted"
            />
          </form>
          <div className="ml-4 flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <FilterIcon className="w-4 h-4" />
                  <span>Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>Newest</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Oldest</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Most Popular</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ListOrderedIcon className="w-4 h-4" />
                  <span>Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>Newest</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Oldest</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Most Popular</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Link href="./Listings/penguins" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View video</span>
            </Link>
            <Image
              src={cuphead}
              alt="Video Thumbnail"
              width="300"
              height="200"
              className="object-cover w-full h-48 group-hover:scale-105 transition-transform"
              style={{ aspectRatio: "300/200", objectFit: "cover" }}
            />
            <div className="p-4 bg-background">
              <h3 className="text-lg font-medium line-clamp-2">Introducing v0: Generative UI</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">Vercel</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View video</span>
            </Link>
            <Image
              src={cuphead}
              alt="Video Thumbnail"
              width="300"
              height="200"
              className="object-cover w-full h-48 group-hover:scale-105 transition-transform"
              style={{ aspectRatio: "300/200", objectFit: "cover" }}
            />
            <div className="p-4 bg-background">
              <h3 className="text-lg font-medium line-clamp-2">Introducing the frontend cloud</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">Vercel</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View video</span>
            </Link>
            <Image
              src={cuphead}
              alt="Video Thumbnail"
              width="300"
              height="200"
              className="object-cover w-full h-48 group-hover:scale-105 transition-transform"
              style={{ aspectRatio: "300/200", objectFit: "cover" }}
            />
            <div className="p-4 bg-background">
              <h3 className="text-lg font-medium line-clamp-2">Using Vercel KV with Svelte</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">Lee Robinson</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View video</span>
            </Link>
            <Image
              src={cuphead}
              alt="Video Thumbnail"
              width="300"
              height="200"
              className="object-cover w-full h-48 group-hover:scale-105 transition-transform"
              style={{ aspectRatio: "300/200", objectFit: "cover" }}
            />
            <div className="p-4 bg-background">
              <h3 className="text-lg font-medium line-clamp-2">Loading UI with Next.js 13</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">Delba</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View video</span>
            </Link>
            <Image
              src={cuphead}
              alt="Video Thumbnail"
              width="300"
              height="200"
              className="object-cover w-full h-48 group-hover:scale-105 transition-transform"
              style={{ aspectRatio: "300/200", objectFit: "cover" }}
            />
            <div className="p-4 bg-background">
              <h3 className="text-lg font-medium line-clamp-2">Deploying a Remix app to Vercel</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">Remix Team</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View video</span>
            </Link>
            <Image
              src={cuphead}
              alt="Video Thumbnail"
              width="300"
              height="200"
              className="object-cover w-full h-48 group-hover:scale-105 transition-transform"
              style={{ aspectRatio: "300/200", objectFit: "cover" }}
            />
            <div className="p-4 bg-background">
              <h3 className="text-lg font-medium line-clamp-2">Optimizing Next.js for Performance</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">Leerob</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 mt-8 w-full max-w-6xl">
        <div className="bg-muted rounded-lg p-6 flex-1">
          <h2 className="text-xl font-bold mb-4">Related Videos</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
            <Image
              src={cuphead}
                alt="Video Thumbnail"
                width="120"
                height="80"
                className="rounded-lg object-cover"
                style={{ aspectRatio: "120/80", objectFit: "cover" }}
              />
              <div>
                <h3 className="text-lg font-medium line-clamp-2">Introducing v0: Generative UI</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">Vercel</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
            <Image
              src={cuphead}
                alt="Video Thumbnail"
                width="120"
                height="80"
                className="rounded-lg object-cover"
                style={{ aspectRatio: "120/80", objectFit: "cover" }}
              />
              <div>
                <h3 className="text-lg font-medium line-clamp-2">Introducing the frontend cloud</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">Vercel</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
            <Image
              src={cuphead}
                alt="Video Thumbnail"
                width="120"
                height="80"
                className="rounded-lg object-cover"
                style={{ aspectRatio: "120/80", objectFit: "cover" }}
              />
              <div>
                <h3 className="text-lg font-medium line-clamp-2">Using Vercel KV with Svelte</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">Lee Robinson</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-muted rounded-lg p-6 flex-1">
          <h2 className="text-xl font-bold mb-4">Featured Videos</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
            <Image
              src={cuphead}
                alt="Video Thumbnail"
                width="120"
                height="80"
                className="rounded-lg object-cover"
                style={{ aspectRatio: "120/80", objectFit: "cover" }}
              />
              <div>
                <h3 className="text-lg font-medium line-clamp-2">Loading UI with Next.js 13</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">Delba</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
            <Image
              src={cuphead}
                alt="Video Thumbnail"
                width="120"
                height="80"
                className="rounded-lg object-cover"
                style={{ aspectRatio: "120/80", objectFit: "cover" }}
              />
              <div>
                <h3 className="text-lg font-medium line-clamp-2">Deploying a Remix app to Vercel</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">Remix Team</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
            <Image
              src={cuphead}
                alt="Video Thumbnail"
                width="120"
                height="80"
                className="rounded-lg object-cover"
                style={{ aspectRatio: "120/80", objectFit: "cover" }}
              />
              <div>
                <h3 className="text-lg font-medium line-clamp-2">Optimizing Next.js for Performance</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">Leerob</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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


function ListOrderedIcon(props) {
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
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
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