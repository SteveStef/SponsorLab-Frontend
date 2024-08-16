import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building2, Users, Mail, Globe, Phone } from "lucide-react"

export default function Component() {
  const teamMembers = [
    { name: "Alice Johnson", role: "CEO", image: "/placeholder.svg?height=80&width=80" },
    { name: "Bob Smith", role: "CTO", image: "/placeholder.svg?height=80&width=80" },
    { name: "Carol Williams", role: "Head of Sponsorships", image: "/placeholder.svg?height=80&width=80" },
    { name: "David Brown", role: "Lead AI Researcher", image: "/placeholder.svg?height=80&width=80" },
    { name: "Eva Martinez", role: "Community Manager", image: "/placeholder.svg?height=80&width=80" },
    { name: "Frank Lee", role: "Project Coordinator", image: "/placeholder.svg?height=80&width=80" },
    { name: "Grace Kim", role: "Data Scientist", image: "/placeholder.svg?height=80&width=80" },
    { name: "Henry Chen", role: "UX Designer", image: "/placeholder.svg?height=80&width=80" },
    { name: "Irene Patel", role: "Marketing Director", image: "/placeholder.svg?height=80&width=80" },
    { name: "Jack Wilson", role: "Software Engineer", image: "/placeholder.svg?height=80&width=80" },
    { name: "Karen Lopez", role: "Product Manager", image: "/placeholder.svg?height=80&width=80" },
    { name: "Liam O'Connor", role: "Sales Director", image: "/placeholder.svg?height=80&width=80" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <img
          src="/placeholder.svg?height=100&width=300"
          alt="TechCorp Logo"
          className="mx-auto h-24 w-auto object-contain"
        />
        <h1 className="mt-4 text-3xl font-bold">TechCorp Solutions</h1>
        <p className="mt-2 text-muted-foreground">Innovating for a better tomorrow</p>
        <div className="mt-4 flex justify-center gap-4 text-sm text-muted-foreground">
          <a href="https://techcorp.com" className="flex items-center gap-1 hover:underline">
            <Globe className="h-4 w-4" />
            techcorp.com
          </a>
          <span className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            contact@techcorp.com
          </span>
          <span className="flex items-center gap-1">
            <Phone className="h-4 w-4" />
            +1 (555) 123-4567
          </span>
        </div>
      </div>

      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Projects Sponsored</CardTitle>
            <CardDescription>Total projects supported</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">47</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Investment</CardTitle>
            <CardDescription>Total sponsorship amount</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">$2.5M</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Team Size</CardTitle>
            <CardDescription>Number of employees</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">500+</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Areas of Interest
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge>Artificial Intelligence</Badge>
            <Badge>Machine Learning</Badge>
            <Badge>Data Science</Badge>
            <Badge>Cloud Computing</Badge>
            <Badge>Robotics</Badge>
            <Badge>Internet of Things</Badge>
            <Badge>Blockchain</Badge>
            <Badge>Cybersecurity</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Team Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <h2 className="mb-4 text-2xl font-bold">Interested in collaborating with TechCorp?</h2>
        <Button size="lg" className="gap-2">
          <Mail className="h-5 w-5" />
          Contact Sponsor
        </Button>
      </div>
    </div>
  )
}
