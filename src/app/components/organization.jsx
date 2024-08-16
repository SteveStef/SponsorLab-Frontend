import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Users } from "lucide-react"

export default function Component() {
  const organization = {
    name: "TechCorp Solutions",
    logo: "/placeholder.svg?height=100&width=100",
    products: ["AI Assistant", "Cloud Storage", "Data Analytics Platform"],
    sponsorshipPreferences: ["Open Source Projects", "Tech Conferences", "Educational Initiatives"],
    sponsoredProjects: 42,
    totalInvestment: 1500000,
    members: [
      { name: "John Doe", role: "CEO", avatar: "/placeholder.svg?height=40&width=40" },
      { name: "Jane Smith", role: "CTO", avatar: "/placeholder.svg?height=40&width=40" },
      { name: "Alice Johnson", role: "Product Manager", avatar: "/placeholder.svg?height=40&width=40" },
      { name: "Bob Williams", role: "Lead Developer", avatar: "/placeholder.svg?height=40&width=40" },
      { name: "Carol Brown", role: "Marketing Director", avatar: "/placeholder.svg?height=40&width=40" },
      { name: "David Lee", role: "UX Designer", avatar: "/placeholder.svg?height=40&width=40" },
    ],
  }

  return (
    <div className="min-h-screen text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              alt={`${organization.name} logo`}
              className="h-16 w-16 rounded-full"
              height="64"
              src={organization.logo}
              style={{
                aspectRatio: "64/64",
                objectFit: "cover",
              }}
              width="64"
            />
            <h1 className="text-3xl font-bold text-gray-100">{organization.name}</h1>
          </div>
          <Button className="bg-green-600 text-white hover:bg-green-700">Contact</Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="text-gray-100 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-green-500/20">
            <CardHeader>
              <CardTitle>Products</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal space-y-2 pl-5">
                {organization.products.map((product, index) => (
                  <li key={index} className="text-gray-300">{product}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
          <Card className="text-gray-100 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-green-500/20">
            <CardHeader>
              <CardTitle>Sponsorship Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {organization.sponsorshipPreferences.map((preference, index) => (
                  <Badge key={index} variant="secondary" className="bg-green-600 text-white">
                    {preference}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="text-gray-100 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sponsored Projects</CardTitle>
              <Briefcase className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{organization.sponsoredProjects}</div>
              <p className="text-xs text-gray-400">Total projects sponsored</p>
            </CardContent>
          </Card>
          <Card className="text-gray-100 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-green-400"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">${organization.totalInvestment.toLocaleString()}</div>
              <p className="text-xs text-gray-400">Lifetime investment amount</p>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-8 text-gray-100 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-green-500/20">
          <CardHeader>
            <CardTitle>Organization Members</CardTitle>
            <CardDescription className="text-gray-400">Key people in {organization.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {organization.members.map((member, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="bg-green-600 text-white">{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none text-gray-100">{member.name}</p>
                    <p className="text-sm text-gray-400">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
