'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, Globe, PackageOpen, Youtube, Users, Banknote, 
  ArrowRight, ArrowLeft, LightbulbIcon, X } from 'lucide-react';
import request from "@/request";
import { toast } from "sonner";
import { useAppContext } from '@/context';

const contentTypes = [
  "Technology", "Gaming", "Pets", "Fashion", "Education", "Finance", "Lifestyle",
  "Food/Cooking", "Family", "Music", "Vlogs", "Business", "DIY/Crafts", "Travel",
  "Religion", "Nature", "Garden", "Wellness"
]

const allCategories = [
  "Electronics", "Home & Kitchen", "Fashion & Apparel", "Beauty & Personal Care",
  "Health & Wellness", "Toys & Games", "Sports & Outdoors", "Automotive",
  "Office Supplies", "Baby Products", "Pet Supplies", "Grocery & Gourmet Food",
  "Tools & Home Improvement", "Books & Media", "Garden & Outdoors",
  "Jewelry & Accessories", "Crafts & DIY", "Travel & Luggage",
  "Music Instruments & Gear", "Home Decor"
]

export default function Component({ refresh, setShowCreateFlow }) {
  const [step, setStep] = useState(1)
  const { company, setCompany } = useAppContext()

  const [formData, setFormData] = useState({
    website: '',
    description: '',
    productCategories: [],
    contentTypes: [],
    audienceAge: '',
    budgetRange: '', 
    country: '',
    state: '',
    goals: ''
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [load, setLoad] = useState(false)
  const dropdownRef = useRef(null);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const countries = [
    { code: 'US', name: 'United States' },
  ]

const usStates = [
    { code: 'AL', name: 'Alabama' },
    { code: 'AK', name: 'Alaska' },
    { code: 'AZ', name: 'Arizona' },
    { code: 'AR', name: 'Arkansas' },
    { code: 'CA', name: 'California' },
    { code: 'CO', name: 'Colorado' },
    { code: 'CT', name: 'Connecticut' },
    { code: 'DE', name: 'Delaware' },
    { code: 'FL', name: 'Florida' },
    { code: 'GA', name: 'Georgia' },
    { code: 'HI', name: 'Hawaii' },
    { code: 'ID', name: 'Idaho' },
    { code: 'IL', name: 'Illinois' },
    { code: 'IN', name: 'Indiana' },
    { code: 'IA', name: 'Iowa' },
    { code: 'KS', name: 'Kansas' },
    { code: 'KY', name: 'Kentucky' },
    { code: 'LA', name: 'Louisiana' },
    { code: 'ME', name: 'Maine' },
    { code: 'MD', name: 'Maryland' },
    { code: 'MA', name: 'Massachusetts' },
    { code: 'MI', name: 'Michigan' },
    { code: 'MN', name: 'Minnesota' },
    { code: 'MS', name: 'Mississippi' },
    { code: 'MO', name: 'Missouri' },
    { code: 'MT', name: 'Montana' },
    { code: 'NE', name: 'Nebraska' },
    { code: 'NV', name: 'Nevada' },
    { code: 'NH', name: 'New Hampshire' },
    { code: 'NJ', name: 'New Jersey' },
    { code: 'NM', name: 'New Mexico' },
    { code: 'NY', name: 'New York' },
    { code: 'NC', name: 'North Carolina' },
    { code: 'ND', name: 'North Dakota' },
    { code: 'OH', name: 'Ohio' },
    { code: 'OK', name: 'Oklahoma' },
    { code: 'OR', name: 'Oregon' },
    { code: 'PA', name: 'Pennsylvania' },
    { code: 'RI', name: 'Rhode Island' },
    { code: 'SC', name: 'South Carolina' },
    { code: 'SD', name: 'South Dakota' },
    { code: 'TN', name: 'Tennessee' },
    { code: 'TX', name: 'Texas' },
    { code: 'UT', name: 'Utah' },
    { code: 'VT', name: 'Vermont' },
    { code: 'VA', name: 'Virginia' },
    { code: 'WA', name: 'Washington' },
    { code: 'WV', name: 'West Virginia' },
    { code: 'WI', name: 'Wisconsin' },
    { code: 'WY', name: 'Wyoming' }
];

  const isStepValid = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        return formData.website.trim() !== '' && 
               formData.description.trim() !== '' && 
               formData.country !== '' &&
               (formData.country !== 'US' || formData.state !== '')
      case 2:
        return formData.productCategories.length > 0
      case 3:
        return formData.contentTypes.length > 0 && formData.audienceAge !== ''
      case 4:
        return formData.budgetRange !== '' && formData.goals.trim() !== ''
      default:
        return false
    }
  }

  const handleNext = (e) => {
    e.preventDefault()
    if (isStepValid(step)) {
      setStep(prev => Math.min(prev + 1, 4))
    } else {
      toast.error("Please fill in all required fields before proceeding.")
    }
  }

  const handlePrev = (e) => {
    e.preventDefault()
    setStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isStepValid(4)) {
      setLoad(true)
      const url = `${process.env.NEXT_PUBLIC_API_URL}/users/sponsor/create-profile`
      const response = await request(url, "POST", formData)
      if(response && response.success) {
        toast.success("Your profile has been created")
        setCompany({...company, setup: true})
        await refresh()
        setShowCreateFlow(false)
      } else {
        toast.error("There is a problem with creating your profile.")
      }
      setLoad(false)
    } else {
      toast.error("Please fill in all required fields before submitting.")
    }
  }

  const steps = [
    { title: 'Company', icon: <Building2 className="w-6 h-6" /> },
    { title: 'Products', icon: <PackageOpen className="w-6 h-6" /> },
    { title: 'Preferences', icon: <Youtube className="w-6 h-6" /> },
    { title: 'Budget', icon: <Banknote className="w-6 h-6" /> },
  ]

  const advicePanels = [
    {
      title: "Company Information",
      content: "Provide accurate and up-to-date information about your company. A clear description helps YouTubers understand your brand better."
    },
    {
      title: "Product Categories",
      content: "Select all relevant categories. This helps match you with YouTubers who create content in these areas."
    },
    {
      title: "Sponsorship Preferences",
      content: "Be specific about your target audience and preferred content types. This ensures better matches and more effective sponsorships."
    },
    {
      title: "Budget and Goals",
      content: "Set a realistic budget and clear goals. This helps both you and the YouTubers understand what you're aiming to achieve with the sponsorship."
    }
  ]

  const filteredCategories = allCategories.filter(category => 
    category.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !formData.productCategories.includes(category)
  )

  const addCategory = (category) => {
    updateFormData('productCategories', [...formData.productCategories, category])
    setSearchTerm('')
    setIsDropdownOpen(false)
  }

  const removeCategory = (category) => {
    updateFormData('productCategories', formData.productCategories.filter((c) => c !== category))
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Create Your Sponsor Profile</h1>
        
        <div className="mb-8">
          <Progress value={step * 25} className="h-2 mb-2" />
          <div className="flex justify-between">
            {steps.map((s, index) => (
              <div key={index} className={`flex flex-col items-center ${index < step ? 'text-green-500' : 'text-gray-500'}`}>
                {s.icon}
                <span className="text-xs mt-1 hidden sm:inline">{s.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3 p-6 rounded-lg mb-8 lg:mb-0">
            <div className="flex items-center mb-4">
              <LightbulbIcon className="w-6 h-6 mr-2 text-yellow-400" />
              <h3 className="text-xl font-semibold">Helpful Tips</h3>
            </div>
            <h4 className="text-lg font-medium mb-2">{advicePanels[step - 1].title}</h4>
            <p className="text-gray-300">{advicePanels[step - 1].content}</p>
          </div>

          <form className="space-y-8 w-full lg:w-2/3">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Building2 className="w-6 h-6 mr-2" />
              Company Information
            </h2>
            <div>
              <Label htmlFor="website" className="flex items-center pb-2">
                <Globe className="w-4 h-4 mr-2" />
                Website (required)
              </Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => updateFormData('website', e.target.value)}
                className="border-gray-700"
                required
              />
            </div>
            <div>
              <Label htmlFor="description" className="flex items-center pb-2">
                <PackageOpen className="w-4 h-4 mr-2" />
                Company Description (required)
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
                className="border-gray-700"
                required
              />
            </div>
            <div>
              <Label htmlFor="country" className="flex items-center pb-2">
                <Globe className="w-4 h-4 mr-2" />
                Country (required)
              </Label>
              <Select
                value={formData.country}
                onValueChange={(value) => {
                  updateFormData('country', value)
                  if (value !== 'US') {
                    updateFormData('state', '')
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {formData.country === 'US' && (
              <div>
                <Label htmlFor="state" className="flex items-center pb-2">
                  <Globe className="w-4 h-4 mr-2" />
                  State (required for US)
                </Label>
                <Select
                  value={formData.state}
                  onValueChange={(value) => updateFormData('state', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    {usStates.map((state) => (
                      <SelectItem key={state.code} value={state.code}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center pb-2">
                  <PackageOpen className="w-6 h-6 mr-2" />
                  Product Categories (at least one required)
                </h2>
                <div className="relative" ref={dropdownRef}>
                  <Input
                    type="text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setIsDropdownOpen(true)
                    }}
                    onFocus={() => setIsDropdownOpen(true)}
                    className="border-gray-700"
                  />
                  {isDropdownOpen && filteredCategories.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg">
                      {filteredCategories.map((category) => (
                        <div
                          key={category}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                          onClick={() => addCategory(category)}
                        >
                          {category}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.productCategories.map((category) => (
                    <span key={category} className="bg-gray-700 text-white px-2 py-1 rounded-full text-sm flex items-center">
                      {category}
                      <button
                        type="button"
                        onClick={() => removeCategory(category)}
                        className="ml-1 focus:outline-none"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0">
                <div>
                  <Label className="flex items-center mb-2">
                    <Youtube className="w-4 h-4 mr-2" />
                    Preferred Content Types (at least one required)
                  </Label>
                  <div className="space-y-2">
                    {contentTypes.map((type) => (
                      <div key={type} className="flex items-center">
                        <Checkbox
                          id={type}
                          checked={formData.contentTypes.includes(type)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              updateFormData('contentTypes', [...formData.contentTypes, type])
                            } else {
                              updateFormData('contentTypes', formData.contentTypes.filter((t) => t !== type))
                            }
                          }}
                        />
                        <Label htmlFor={type} className="ml-2">{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <Label className="flex items-center mb-2">
                      <Users className="w-4 h-4 mr-2" />
                      Target Audience Age
                    </Label>
                    <div className="space-y-2">
                      {['13-17', '18-24', '25-34', '35-44', "45+", "ALL"].map((age) => (
                        <label key={age} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="audienceAge"
                            value={age}
                            checked={formData.audienceAge === age}
                            onChange={(e) => updateFormData('audienceAge', e.target.value)}
                            className="form-radio text-green-500 focus:ring-green-500 h-4 w-4 bg-gray-800 border-gray-600"
                            required
                          />
                          <span>{age}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Banknote className="w-6 h-6 mr-2" />
                  Budget and Goals
                </h2>
                <div>
                  <Label className="flex items-center mb-2">
                    <Banknote className="w-4 h-4 mr-2" />
                    Budget Range (per sponsorship)
                  </Label>
                  <div className="space-y-2">
                    {['0-1000', '1000-5000', '5000-10000', '10000+'].map((range) => (
                      <label key={range} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="budgetRange"
                          value={range}
                          checked={formData.budgetRange === range}
                          onChange={(e) => updateFormData('budgetRange', e.target.value)}
                          className="form-radio text-green-500 focus:ring-green-500  h-4 w-4 bg-gray-800 border-gray-600"
                          required
                        />
                        <span>${range.replace('-', ' - ').replace('+', '+')}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="goals" className="flex items-center pb-2">
                    <PackageOpen className="w-4 h-4 mr-2" />
                    Sponsorship Goals (required)
                  </Label>
                  <Textarea
                    id="goals"
                    value={formData.goals}
                    onChange={(e) => updateFormData('goals', e.target.value)}
                    placeholder="What do you hope to achieve with your sponsorships?"
                    className="border-gray-700"
                    required
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between">
              {step > 1 && (
                <Button type="button" onClick={handlePrev} variant="outline" className="flex items-center">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
              )}
              {step < 4 ? (
                <Button 
                  type="button" 
                  onClick={handleNext} 
                  className="ml-auto bg-green-600 hover:bg-green-700 flex items-center"
                  disabled={!isStepValid(step)}
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  disabled={load || !isStepValid(4)} 
                  onClick={handleSubmit} 
                  className="ml-auto bg-green-600 hover:bg-green-700 flex items-center"
                >
                  Create Profile
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
