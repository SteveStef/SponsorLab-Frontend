/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Lq26DPO60LG
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/components/ui/pagination"
import Image from "next/image"
import cuphead from "../../../public/headcup.jpg"

export default function Component() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <h1 className="text-3xl font-bold">Discover Creators</h1>
        <div className="flex w-full max-w-md items-center rounded-lg bg-muted px-4 py-2 md:w-auto">
          <SearchIcon className="mr-2 h-5 w-5 text-muted-foreground" />
          <Input type="search" placeholder="Search creators..." className="w-full bg-transparent focus:outline-none" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <div className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
          <Link href="./Profile/penguins" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View Creator</span>
          </Link>
          <div className="flex h-40 items-center justify-center bg-muted">
            <Image
              src={cuphead}
              alt="Creator Avatar"
              width={250} // 150
              height={350} // 150
              className="rounded-full"
              style={{  objectFit: "cover" }}
              //style={{  aspectRatio: "150/150",objectFit: "cover" }}
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">John Doe</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <UsersIcon className="h-4 w-4" />
              <span>1.2M Subscribers</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <EyeIcon className="h-4 w-4" />
              <span>500K Average Views</span>
            </div>
            <div className="mt-2">
              <Badge variant="outline">Looking for sponsor</Badge>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View Creator</span>
          </Link>
          <div className="flex h-40 items-center justify-center bg-muted">
            <img
              src="/placeholder.svg"
              alt="Creator Avatar"
              width={80}
              height={80}
              className="rounded-full"
              style={{ aspectRatio: "80/80", objectFit: "cover" }}
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">Jane Smith</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <UsersIcon className="h-4 w-4" />
              <span>800K Subscribers</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <EyeIcon className="h-4 w-4" />
              <span>300K Average Views</span>
            </div>
            <div className="mt-2">
              <Badge variant="outline">Looking for sponsor</Badge>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View Creator</span>
          </Link>
          <div className="flex h-40 items-center justify-center bg-muted">
            <img
              src="/placeholder.svg"
              alt="Creator Avatar"
              width={80}
              height={80}
              className="rounded-full"
              style={{ aspectRatio: "80/80", objectFit: "cover" }}
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">Michael Johnson</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <UsersIcon className="h-4 w-4" />
              <span>600K Subscribers</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <EyeIcon className="h-4 w-4" />
              <span>200K Average Views</span>
            </div>
            <div className="mt-2">
              <Badge variant="outline">Looking for sponsor</Badge>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View Creator</span>
          </Link>
          <div className="flex h-40 items-center justify-center bg-muted">
            <img
              src="/placeholder.svg"
              alt="Creator Avatar"
              width={80}
              height={80}
              className="rounded-full"
              style={{ aspectRatio: "80/80", objectFit: "cover" }}
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">Emily Davis</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <UsersIcon className="h-4 w-4" />
              <span>400K Subscribers</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <EyeIcon className="h-4 w-4" />
              <span>150K Average Views</span>
            </div>
            <div className="mt-2">
              <Badge variant="outline">Looking for sponsor</Badge>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View Creator</span>
          </Link>
          <div className="flex h-40 items-center justify-center bg-muted">
            <img
              src="/placeholder.svg"
              alt="Creator Avatar"
              width={80}
              height={80}
              className="rounded-full"
              style={{ aspectRatio: "80/80", objectFit: "cover" }}
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">David Lee</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <UsersIcon className="h-4 w-4" />
              <span>300K Subscribers</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <EyeIcon className="h-4 w-4" />
              <span>100K Average Views</span>
            </div>
            <div className="mt-2">
              <Badge variant="outline">Looking for sponsor</Badge>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View Creator</span>
          </Link>
          <div className="flex h-40 items-center justify-center bg-muted">
            <img
              src="/placeholder.svg"
              alt="Creator Avatar"
              width={80}
              height={80}
              className="rounded-full"
              style={{ aspectRatio: "80/80", objectFit: "cover" }}
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">Sarah Kim</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <UsersIcon className="h-4 w-4" />
              <span>250K Subscribers</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <EyeIcon className="h-4 w-4" />
              <span>80K Average Views</span>
            </div>
            <div className="mt-2">
              <Badge variant="outline">Looking for sponsor</Badge>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View Creator</span>
          </Link>
          <div className="flex h-40 items-center justify-center bg-muted">
            <img
              src="/placeholder.svg"
              alt="Creator Avatar"
              width={80}
              height={80}
              className="rounded-full"
              style={{ aspectRatio: "80/80", objectFit: "cover" }}
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">Alex Chen</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <UsersIcon className="h-4 w-4" />
              <span>180K Subscribers</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <EyeIcon className="h-4 w-4" />
              <span>60K Average Views</span>
            </div>
            <div className="mt-2">
              <Badge variant="outline">Looking for sponsor</Badge>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View Creator</span>
          </Link>
          <div className="flex h-40 items-center justify-center bg-muted">
            <img
              src="/placeholder.svg"
              alt="Creator Avatar"
              width={80}
              height={80}
              className="rounded-full"
              style={{ aspectRatio: "80/80", objectFit: "cover" }}
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">Olivia Patel</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <UsersIcon className="h-4 w-4" />
              <span>150K Subscribers</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <EyeIcon className="h-4 w-4" />
              <span>40K Average Views</span>
            </div>
            <div className="mt-2">
              <Badge variant="outline">Looking for sponsor</Badge>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
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
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
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