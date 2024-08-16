'use client';

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Building2, Mail, Phone, Linkedin, Twitter, Target, Briefcase, GraduationCap, X } from "lucide-react"

export default function Component() {
  const [name, setName] = useState('John Doe')
  const [title, setTitle] = useState('Chief Innovation Officer')
  const [company, setCompany] = useState('TechCorp Solutions')
  const [bio, setBio] = useState('John Doe is a visionary leader in the tech industry with over 20 years of experience. He is passionate about leveraging technology to solve global challenges and mentoring the next generation of innovators.')
  const [email, setEmail] = useState('john.doe@techcorp.com')
  const [phone, setPhone] = useState('+1 (555) 123-4567')
  const [education, setEducation] = useState('Ph.D. in Computer Science, Stanford University')
  const [experience, setExperience] = useState('20+ years in Tech Leadership')
  const [companyDescription, setCompanyDescription] = useState('TechCorp Solutions is a leading technology company specializing in artificial intelligence and machine learning solutions. With over a decade of experience, weve been at the forefront of innovation, helping businesses transform their operations through cutting-edge technology.')
  const [companyHQ, setCompanyHQ] = useState('San Francisco, CA')
  const [companyFounded, setCompanyFounded] = useState('2005')
  const [companySize, setCompanySize] = useState('500+')
  const [goals, setGoals] = useState([
    'Support emerging talent in AI and machine learning',
    'Foster innovation through collaborative research projects',
    'Promote diversity and inclusion in the tech industry',
    'Contribute to open-source initiatives and community development',
    'Accelerate the adoption of ethical AI practices'
  ])
  const [expertise, setExpertise] = useState([
    'Artificial Intelligence', 'Machine Learning', 'Data Science', 'Cloud Computing',
    'Robotics', 'Internet of Things', 'Blockchain', 'Cybersecurity',
    'Tech Leadership', 'Innovation Management'
  ])

  const handleAddGoal = () => {
    setGoals([...goals, ''])
  }

  const handleGoalChange = (index, value) => {
    const newGoals = [...goals]
    newGoals[index] = value
    setGoals(newGoals)
  }

  const handleRemoveGoal = (index) => {
    setGoals(goals.filter((_, i) => i !== index))
  }

  const handleAddExpertise = () => {
    setExpertise([...expertise, ''])
  }

  const handleExpertiseChange = (index, value) => {
    const newExpertise = [...expertise]
    newExpertise[index] = value
    setExpertise(newExpertise)
  }

  const handleRemoveExpertise = (index) => {
    setExpertise(expertise.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the updated data to your backend
    console.log('Profile updated', { name, title, company, bio, email, phone, education, experience, companyDescription, companyHQ, companyFounded, companySize, goals, expertise })
    // Show a success message to the user
    alert('Profile updated successfully!')
  }

  return (
    <form onSubmit={handleSubmit} className="container mx-auto px-4 py-8" style={{width: "70%"}}>
      <h1 className="mb-8 text-3xl font-bold">Edit Sponsor Profile</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile picture" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button variant="outline">Change Picture</Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              <Input id="education" value={education} onChange={(e) => setEducation(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="experience">Experience</Label>
            <Input id="experience" value={experience} onChange={(e) => setExperience(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} className="min-h-[100px]" />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Company Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyDescription">Company Description</Label>
            <Textarea
              id="companyDescription"
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="companyHQ">Headquarters</Label>
              <Input id="companyHQ" value={companyHQ} onChange={(e) => setCompanyHQ(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyFounded">Founded</Label>
              <Input id="companyFounded" value={companyFounded} onChange={(e) => setCompanyFounded(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companySize">Company Size</Label>
              <Input id="companySize" value={companySize} onChange={(e) => setCompanySize(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Sponsorship Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {goals.map((goal, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                value={goal}
                onChange={(e) => handleGoalChange(index, e.target.value)}
                placeholder="Enter a sponsorship goal"
              />
              <Button type="button" variant="outline" size="icon" onClick={() => handleRemoveGoal(index)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={handleAddGoal}>
            Add Goal
          </Button>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Areas of Expertise
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {expertise.map((area, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {area}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="ml-2 h-4 w-4 p-0"
                  onClick={() => handleRemoveExpertise(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Add new area of expertise"
              value={expertise[expertise.length - 1] || ''}
              onChange={(e) => handleExpertiseChange(expertise.length - 1, e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddExpertise()
                }
              }}
            />
            <Button type="button" variant="outline" onClick={handleAddExpertise}>
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-end">
        <Button type="submit" size="lg">
          Save Changes
        </Button>
      </div>
    </form>
  )
}
