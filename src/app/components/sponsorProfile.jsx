import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building2, Mail, Phone, Linkedin, Twitter, Target, Briefcase, GraduationCap } from "lucide-react"

export default function Component() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <Avatar className="mx-auto h-32 w-32">
          <AvatarImage src="/placeholder.svg?height=128&width=128" alt="John Doe" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <h1 className="mt-4 text-3xl font-bold">John Doe</h1>
        <p className="text-xl text-muted-foreground">Chief Innovation Officer at TechCorp Solutions</p>
        <div className="mt-4 flex justify-center space-x-4">
          <Button variant="outline" size="icon">
            <Linkedin className="h-4 w-4" />
            <span className="sr-only">LinkedIn profile</span>
          </Button>
          <Button variant="outline" size="icon">
            <Twitter className="h-4 w-4" />
            <span className="sr-only">Twitter profile</span>
          </Button>
          <Button variant="outline" size="icon">
            <Mail className="h-4 w-4" />
            <span className="sr-only">Email</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              John Doe is a visionary leader in the tech industry with over 20 years of experience. He is passionate
              about leveraging technology to solve global challenges and mentoring the next generation of innovators.
            </p>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Ph.D. in Computer Science, Stanford University</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">20+ years in Tech Leadership</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">john.doe@techcorp.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="mb-2 font-semibold">TechCorp Solutions</h3>
            <p className="mb-4">
              TechCorp Solutions is a leading technology company specializing in artificial intelligence and machine
              learning solutions. With over a decade of experience, we've been at the forefront of innovation,
              helping businesses transform their operations through cutting-edge technology.
            </p>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Headquarters: San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Founded: 2005</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Employees: 500+</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Sponsorship Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-inside list-disc space-y-2">
            <li>Support emerging talent in AI and machine learning</li>
            <li>Foster innovation through collaborative research projects</li>
            <li>Promote diversity and inclusion in the tech industry</li>
            <li>Contribute to open-source initiatives and community development</li>
            <li>Accelerate the adoption of ethical AI practices</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Areas of Expertise
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
            <Badge>Tech Leadership</Badge>
            <Badge>Innovation Management</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <h2 className="mb-4 text-2xl font-bold">Interested in collaborating with John Doe?</h2>
        <Button size="lg" className="gap-2">
          <Mail className="h-5 w-5" />
          Contact Sponsor
        </Button>
      </div>
    </div>
  )
}
