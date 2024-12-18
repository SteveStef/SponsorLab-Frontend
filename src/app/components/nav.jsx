"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";
import Beaker from "../../../public/Beaker.png";

import { useState, useEffect, useCallback } from 'react';
import { MessageSquare, UserPlus, AlertCircle, Search, BellIcon,
  LogOut, Settings, PlusCircle, User, Building2, LayoutDashboard } from 'lucide-react';
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


  const fetchAllNotifications = useCallback(async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/notifications/all`;
    const response = await request(url, "GET", null);
    if(response && response.success) {
      setAllNotifications(response.body);
    }
  },[]);

  useEffect(() => {
    fetchAllNotifications();
  },[fetchAllNotifications]);

  useEffect(() => {
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
    fetchNotifications();
  }, [])

  useEffect(() => {
    async function viewNotifications() {
      setHasNew(false);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/notifications/view`;
      await request(url, "put", {});
    }
    if(isOpen) viewNotifications();
  },[isOpen]);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase()
    const filtered = allNotifications.filter(item => {
      return Object.values(item).some(value =>
        typeof value === "string" && value.toLowerCase().includes(lowercasedFilter)
      )
    })
    setFilteredNotifications(filtered);
  }, [searchTerm, isModalOpen, allNotifications])

  const links = [
    { url: "../../listings", name: "Listings", auth: true, role: "ANY" },
    { url: "../organizations", name: "Organizations", auth: true, role: "ANY" },
    { url: "../profiles", name: "Youtubers", auth: true, role: "ANY" },
    { url: "../requests", name: "Sponsorships", auth: true, role: "ANY" },
    { url: "../../signup", name: "Login/Signup", auth: false, role: "ANY" },
  ];

  function logout() {
    localStorage.clear();
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = "/login";
  }

  const profileOrOrgLink = role === "SPONSOR" 
    ? { url: `../../organizations/${organization}`, name: "My Organization" }
    : { url: `../../profile/${organization}`, name: "My Profile" };

  return (
    <header className="bg-gradient-to-br from-green-950 via-background to-background fixed top-0 z-50 w-full bg-background border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="../../../" className="flex items-center gap-2" prefetch={false}>
          <Image src={Beaker} alt="LOGO" style={{ width: '32px' }} />
          <span className="font-semibold" style={{fontSize: "25px"}}>
            Sponsor<span className="text-green-500">Lab</span>
            <span className="ml-2 text-xs bg-green-400 text-black font-bold px-2 py-1 rounded relative" style={{ top: '-3px' }}>Beta</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link, idx) => {
            if ((link.role === "ANY" || role === link.role) && (auth === link.auth)) {
              return (
                <Link key={idx} href={link.url} className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                  {link.name}
                </Link>
              )
            }
          })}
          {auth && (
            <>
              <NotificationMenu 
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                hasNew={hasNew} 
                notifications={notifications} 
                fetchAllNotifications={fetchAllNotifications}
                setIsModalOpen={setIsModalOpen}
              />
              <ProfileMenu 
                profilePic={profilePic} 
                name={name} 
                role={role} 
                organization={organization} 
                logout={logout}
              />
            </>
          )}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="grid gap-4 py-6">
              {links.map((link, idx) => {
                if ((link.role === "ANY" || role === link.role) && (auth === link.auth)) {
                  return (
                    <Link key={idx} href={link.url} className="flex items-center text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                      {link.name}
                    </Link>
                  )
                }
              })}
              {auth && (
                <>
                  <Link href={profileOrOrgLink.url} className="flex items-center text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                    {profileOrOrgLink.name}
                  </Link>
                  {role === "CREATOR" && (
                    <Link href="../../create" className="flex items-center text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create Listing
                    </Link>
                  )}
                  <Link href="../../settings" className="flex items-center text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                  <NotificationMenu 
                    isOpen={false} 
                    setIsOpen={setIsOpen} 
                    hasNew={hasNew} 
                    notifications={notifications} 
                    fetchAllNotifications={fetchAllNotifications}
                    setIsModalOpen={setIsModalOpen}
                    isMobile={true}
                  />
                  <Button variant="outline" onClick={logout} className="w-full justify-start">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              )}
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
                <Link key={idx} href={`${notification.link ? notification.link : ""}`}>
                  <NotificationItem notification={notification} />
                </Link>
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

function NotificationMenu({ isOpen, setIsOpen, hasNew, notifications, fetchAllNotifications, setIsModalOpen, isMobile }) {
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={`relative ${isMobile ? 'w-full justify-start' : ''}`}>
          <BellIcon className="h-5 w-5" />
          {isMobile && <span className="ml-2">Notifications</span>}
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
              <Link href={`${notification.link ? notification.link : ""}`}>
                <NotificationItem notification={notification} />
              </Link>
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
  )
}

function ProfileMenu({ profilePic, name, role, organization, logout }) {
  const [open, setOpen] = useState(false)

  const menuItems = {
    ADMIN: [
      { href: '/admin/data', icon: LayoutDashboard, label: 'Dashboard' },
    ],
    SPONSOR: [
      { href: `../../organizations/${organization}`, icon: Building2, label: 'My Organization' },
    ],
    CREATOR: [
      { href: `../../profile/${organization}`, icon: User, label: 'My Profile' },
      { href: '../../create', icon: PlusCircle, label: 'Create Listing' },
    ],
  }

  const roleSpecificItems = menuItems[role] || []

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profilePic} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {roleSpecificItems.map((item, index) => (
            <DropdownMenuItem key={index} asChild>
              <Link 
                href={item.href} 
                className="flex items-center" 
                prefetch={false}
                onClick={() => setOpen(false)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link 
            href="../../settings" 
            className="flex items-center" 
            prefetch={false}
            onClick={() => setOpen(false)}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link 
            href="#" 
            className="flex items-center text-red-600 focus:text-red-600" 
            prefetch={false}
            onClick={() => {
              setOpen(false)
              logout()
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

