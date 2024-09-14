
"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import Image from "next/image";
import Beaker from "../../../public/Beaker.png";

import { useState, useEffect } from 'react';
import { MessageSquare, UserPlus, AlertCircle, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { convertFromUtcToLocal } from "@/utils.js";
import request from "@/request";

export default function Navbar() {
  const { organization, auth, role, name, profilePic } = useAppContext();
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [hasNew, setHasNew] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [allNotifications, setAllNotifications] = useState([]);

  async function fetchNotifications() {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/notifications`;
      const response = await request(url, "GET", null);
      if(response && response.success) {
        setNotifications(response.body);
        setHasNew(response.hasNew);
      }
    } catch(err) {
      console.log(err);
    }
  }

  async function fetchAllNotifications() {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/notifications/all`;
      const response = await request(url, "GET", null);
      if(response && response.success) {
        setAllNotifications(response.body);
      }
    } catch(err) {
      console.log(err);
    }
  }

  async function viewNotifications() {
    try {
      setHasNew(false);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/notifications/view`;
      await request(url, "put", {});
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchNotifications();
  }, [])

  useEffect(() => {
    if(isOpen) viewNotifications();
  },[isOpen]);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase()
    const filtered = allNotifications.filter(item => {
      return Object.values(item).some(value =>
        typeof value === "string" && value.toLowerCase().includes(lowercasedFilter)
      )
    })
    setFilteredNotifications(filtered)
  }, [searchTerm, isModalOpen])

  const links = [
    { url: "../../listings", name: "Listings", auth: true, role: "ANY" },
    //{ url: "../pricing", name: "Pricing", auth: true, role: "CREATOR" },
    { url: "../organizations", name: "Organizations", auth: true, role: "ANY" },
    { url: "../profiles", name: "Youtubers", auth: true, role: "ANY" },
    { url: "../requests", name: "Sponsorships", auth: true, role: "ANY" },
    //{ url: "../create", name: "Create", auth: true, role: "CREATOR" },
    { url: "../../signup", name: "Login/Signup", auth: false, role: "ANY" },
  ];

  const childLinks = [
    { url: "../../listings", name: "Listings", auth: true, role: "ANY" },
    //{ url: "../pricing", name: "Pricing", auth: true, role: "CREATOR" },
    { url: "../profiles", name: "Youtubers", auth: true, role: "ANY" },
    { url: "../create", name: "Create Listing", auth: true, role: "ANY" },
    { url: "../organizations", name: "Organizations", auth: true, role: "CREATOR" },
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
  <span className="font-semibold" style={{fontSize: "25px"}}>
    Sponsor<span className="text-green-500">Lab</span>
    <span className="ml-2 text-xs bg-green-400 text-black font-bold px-2 py-1 rounded relative" style={{ top: '-3px' }}>Beta</span>
  </span>
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
              <>
        <div className="relative">
          <Link href="../../chat" prefetch={false}>
          <Button variant="ghost" size="icon" className="rounded-full">
            <InboxIcon className="h-5 w-5" />
            <span className="sr-only">Requests</span>
          </Button>
          </Link>
              {
                notifications.filter(n => n.type === "CHAT" && !n.seen).length > 0 && 
                <div 
                className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {
                  notifications.filter(n => n.type === "CHAT" && !n.seen).length
                }
                </div>
              }
        </div>

              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
            <BellIcon className="h-5 w-5" />
              {hasNew && (
                <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 border-gray-700 p-4" align="end">
            <h2 className="text-lg font-semibold mb-2">Notifications</h2>
            <ScrollArea className="h-[300px] overflow-y-auto">
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="p-0 focus:bg-transparent">
                  <NotificationItem notification={notification} />
                </DropdownMenuItem>
              ))}
            </ScrollArea>
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No new notifications</p>
            ) : (
              <Button 
                variant="outline" 
                className="w-full mt-2 text-green-400 hover:text-green-300 border-green-400 hover:bg-green-400/10"
                onClick={async() => {
                  await fetchAllNotifications();
                  setIsModalOpen(true);
                  setIsOpen(false);
                }}
              >
                View All
              </Button>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-10 w-10 border">
                <AvatarImage src={profilePic} alt="Profile" />
                <AvatarFallback>{name[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {
                role === "CREATOR" &&
              <DropdownMenuItem>
                <Link href={`../../create`} className="flex items-center gap-2" prefetch={false}>Create Listing</Link>
              </DropdownMenuItem>
              }
              <DropdownMenuItem>
                <Link href={`../../${role==="CREATOR"?"profile":"organizations"}/${organization}`} className="flex items-center gap-2" prefetch={false}>My {role==="CREATOR"?"Profile" : "Organization"}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`../../settings`} className="flex items-center gap-2" prefetch={false}>Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link onClick={logout} href="#" className="flex items-center gap-2" prefetch={false}>
                  <span className="flex" ><span style={{position: "absolute", left: "5px", top:"8px"}}><LogInIcon /></span>{" "}
                    <span style={{marginLeft: "20px"}}>Logout</span></span>
                </Link>
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
              </>
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

    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="text-white border-gray-700 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>All Notifications</DialogTitle>
          </DialogHeader>
          <div className="relative mb-4">
            <Input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-gray-600 text-white placeholder-gray-400 pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <ScrollArea className="mt-4 max-h-[60vh] overflow-y-auto pr-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification, idx) => (
                <NotificationItem key={idx} notification={notification} />
              ))
            ) : (
              <p className="text-gray-400 text-center py-4">No notifications found</p>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
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

function BellIcon(props) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}
function InboxIcon(props) {
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
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  )
}

const getIcon = (type) => {
  switch (type) {
    case 'CHAT': return <MessageSquare className="h-5 w-5 text-blue-400" />
    case 'REQUEST': return <UserPlus className="h-5 w-5 text-green-400" />
    case 'SYSTEM': return <AlertCircle className="h-5 w-5 text-yellow-400" />
  }
}

const NotificationItem = ({ notification }) => (
  <div className="flex items-start space-x-4 p-3 hover:bg-gray-700 rounded-lg mb-2">
    <div className="flex-shrink-0 mt-1">
      {getIcon(notification.type)}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-200">{notification.title}</p>
      <p className="text-sm text-gray-400">{notification.message}</p>
      <p className="text-xs text-gray-500 mt-1">{convertFromUtcToLocal(notification.createdAt)}</p>
    </div>
  </div>
)


