
"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import Image from "next/image";
import Beaker from "../../../public/Beaker.png"

export default function Navbar() {
  const { organization, auth, role, name, profilePic } = useAppContext();

  const links = [
    { url: "../../listings", name: "Listings", auth: true, role: "ANY" },
    //{ url: "../pricing", name: "Pricing", auth: true, role: "CREATOR" },
    { url: "../organizations", name: "Organizations", auth: true, role: "ANY" },
    { url: "../profiles", name: "Youtubers", auth: true, role: "ANY" },
    //{ url: "../create", name: "Create", auth: true, role: "CREATOR" },
    { url: "../../signup", name: "Login/Signup", auth: false, role: "ANY" },
    { url: "../../requests", name: "Requests", auth: true, role: "ANY" },
  ];

  const childLinks = [
    { url: "../../listings", name: "Listings", auth: true, role: "ANY" },
    //{ url: "../pricing", name: "Pricing", auth: true, role: "CREATOR" },
    { url: "../profiles", name: "Youtubers", auth: true, role: "ANY" },
    { url: "../create", name: "Create", auth: true, role: "ANY" },
    { url: "../organizations", name: "Organization", auth: true, role: "CREATOR" },
    { url: "../../signup", name: "Login/Signup", auth: false, role: "ANY" },
    { url: "../../requests", name: "Requests", auth: true, role: "ANY" },
    { url: "../../profile/"+organization, name: "Profile", auth: true, role: "ANY" },
  ];

  function logout() {
    localStorage.clear();
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = "/login";
  }

  return (
    <header className="fixed top-0 z-50 w-full bg-background border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="../../../" className="flex items-center gap-2" prefetch={false}>
          <Image src={Beaker} alt="LOGO" style={{ width: '32px' }} />
          <span className="font-semibold" style={{fontSize: "25px"}}>Sponsor <span className="text-green-500">Lab</span></span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {
            links.map((link, idx) => {
              if ((link.role === "ANY" || role === link.role) && (auth === link.auth)) {
                if (link.name === "Logout") {
                  return (
                    <Link key={idx} href={link.url} onClick={logout} className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                      {link.name}
                    </Link>
                  )
                } else {
                  return (
                    <Link key={idx} href={link.url} className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                      {link.name}
                    </Link>
                  )
                }
              }
            })
          }
          {
            auth &&
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src={profilePic} alt="Profile" />
                    <AvatarFallback>{name[0]}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
              { role === "CREATOR" && 
                <DropdownMenuItem>
                  <Link href="../../../create" className="flex items-center gap-2" prefetch={false}>
                    <div className="h-4 w-4" />
                    <span>Create</span>
                  </Link>
                </DropdownMenuItem>
              }
                <DropdownMenuItem>
                  <Link href={`../../profile/${organization}`} className="flex items-center gap-2" prefetch={false}>
                    <div className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="../../../settings" className="flex items-center gap-2" prefetch={false}>
                    <div className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link onClick={logout} href="#" className="flex items-center gap-2" prefetch={false}>
                    <div className="h-4 w-4" />
                    <span className="flex" ><span style={{position: "absolute", left: "5px", top:"8px"}}><LogInIcon /></span>{" "}Logout</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="md:hidden">
            <nav className="grid gap-4 py-6">
              {
                childLinks.map((link, idx) => {
                  if ((link.role === "ANY" || role === link.role) && (auth === link.auth)) {
                    return (
                      <Link key={idx} href={link.url} className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                        {link.name}
                      </Link>
                    )
                  }
                })
              }
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <div className="w-full bg-green-500 h-0.5"></div>
    </header>
  )
}

function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}


function MoonIcon(props) {
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
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}


function SunIcon(props) {
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
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}

function LogInIcon(props) {
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
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  )
}
