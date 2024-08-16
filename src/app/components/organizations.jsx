import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { SearchIcon, FilterIcon, UsersIcon } from "lucide-react"

export default function Component() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9
  const totalPages = 3 // This would typically be calculated based on total items

  const organizations = [
    { id: 1, name: "Acme Corp", description: "Leading provider of innovative solutions", logo: "/placeholder.svg", members: 150 },
    { id: 2, name: "TechGrow", description: "Empowering businesses through technology", logo: "/placeholder.svg", members: 75 },
    { id: 3, name: "EcoSolutions", description: "Sustainable products for a greener future", logo: "/placeholder.svg", members: 50 },
    { id: 4, name: "HealthPlus", description: "Advancing healthcare through research", logo: "/placeholder.svg", members: 200 },
    { id: 5, name: "EduLearn", description: "Transforming education with digital tools", logo: "/placeholder.svg", members: 100 },
    { id: 6, name: "FinanceWise", description: "Smart financial solutions for everyone", logo: "/placeholder.svg", members: 80 },
    { id: 7, name: "FoodDelight", description: "Bringing gourmet experiences to your home", logo: "/placeholder.svg", members: 30 },
    { id: 8, name: "TravelEase", description: "Making travel seamless and enjoyable", logo: "/placeholder.svg", members: 60 },
    { id: 9, name: "FitLife", description: "Promoting healthy lifestyles through fitness", logo: "/placeholder.svg", members: 90 },
  ]

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentOrganizations = organizations.slice(startIndex, endIndex)

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Organizations</h1>
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <Input
              type="search"
              placeholder="Search organizations..."
              className="pl-10"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <FilterIcon size={20} />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem>
                Members {'<'} 50
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Members 50-100
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Members {'>'} 100
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {currentOrganizations.map((org) => (
          <Card key={org.id} className="flex flex-col transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={org.logo} alt={org.name} />
                  <AvatarFallback>{org.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-semibold leading-none">{org.name}</h2>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <UsersIcon size={12} className="mr-1" />
                    {org.members} members
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{org.description}</p>
            </CardContent>
            <CardFooter className="mt-auto p-4 pt-0">
              <Button className="w-full text-sm" size="sm">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              href="#" 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              aria-disabled={currentPage === 1}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink 
                href="#" 
                onClick={() => setCurrentPage(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext 
              href="#" 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              aria-disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
