import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Building2, Globe, PackageOpen, Youtube, Users, Banknote, ArrowRight, ArrowLeft, LightbulbIcon, X } from 'lucide-react'

export default function Component() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    companyName: '',
    website: '',
    description: '',
    productCategories: [],
    contentTypes: [],
    audienceAge: '',
    budgetRange: '',
    goals: ''
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    setStep(prev => Math.min(prev + 1, 4))
  }

  const handlePrev = () => {
    setStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    console.log(formData);
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

  const allCategories = ['Technology', 'Fashion', 'Beauty', 'Food', 'Gaming', 'Fitness', 'Education', 'Travel']

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
    updateFormData('productCategories', formData.productCategories.filter(c => c !== category))
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
        
        {/* Completion bar */}
        <div className="mb-8">
          <Progress value={step * 25} className="h-2 mb-2" />
          <div className="flex justify-between">
            {steps.map((s, index) => (
              <div key={index} className={`flex flex-col items-center ${index < step ? 'text-green-500' : 'text-gray-500'}`}>
                {s.icon}
                <span className="text-xs mt-1">{s.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Left side panel */}
          <div className="w-1/3 p-6 rounded-lg h-fit">
            <div className="flex items-center mb-4">
              <LightbulbIcon className="w-6 h-6 mr-2 text-yellow-400" />
              <h3 className="text-xl font-semibold">Helpful Tips</h3>
            </div>
            <h4 className="text-lg font-medium mb-2">{advicePanels[step - 1].title}</h4>
            <p className="text-gray-300">{advicePanels[step - 1].content}</p>
          </div>

          {/* Main form */}
          <form onSubmit={handleSubmit} className="space-y-8 w-2/3">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Building2 className="w-6 h-6 mr-2" />
                  Company Information
                </h2>
                <div>
                  <Label htmlFor="companyName" className="flex items-center pb-2">
                    <Building2 className="w-4 h-4 mr-2" />
                    Company Name
                  </Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => updateFormData('companyName', e.target.value)}
                    className="border-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="website" className="flex items-center pb-2">
                    <Globe className="w-4 h-4 mr-2" />
                    Website
                  </Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => updateFormData('website', e.target.value)}
                    className="border-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="flex items-center pb-2">
                    <PackageOpen className="w-4 h-4 mr-2" />
                    Company Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                    className="border-gray-700"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center pb-2">
                  <PackageOpen className="w-6 h-6 mr-2" />
                  Product Categories
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
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="flex items-center mb-2">
                    <Youtube className="w-4 h-4 mr-2" />
                    Preferred Content Types
                  </Label>
                  <div className="space-y-2">
                    {['Product Reviews', 'Tutorials', 'Vlogs', 'Unboxing', 'Challenges'].map((type) => (
                      <div key={type} className="flex items-center">
                        <Checkbox
                          id={type}
                          checked={formData.contentTypes.includes(type)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              updateFormData('contentTypes', [...formData.contentTypes, type])
                            } else {
                              updateFormData('contentTypes', formData.contentTypes.filter(t => t !== type))
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
                      {['13-17', '18-24', '25-34', '35+'].map((age) => (
                        <label key={age} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="audienceAge"
                            value={age}
                            checked={formData.audienceAge === age}
                            onChange={(e) => updateFormData('audienceAge', e.target.value)}
                            className="form-radio text-green-500 focus:ring-green-500 h-4 w-4 bg-gray-800 border-gray-600"
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
                    {['0-500', '501-1000', '1001-5000', '5000+'].map((range) => (
                      <label key={range} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="budgetRange"
                          value={range}
                          checked={formData.budgetRange === range}
                          onChange={(e) => updateFormData('budgetRange', e.target.value)}
                          className="form-radio text-green-500 focus:ring-green-500 h-4 w-4 bg-gray-800 border-gray-600"
                        />
                        <span>${range.replace('-', ' - ').replace('+', '+')}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="goals" className="flex items-center pb-2">
                    <PackageOpen className="w-4 h-4 mr-2" />
                    Sponsorship Goals
                  </Label>
                  <Textarea
                    id="goals"
                    value={formData.goals}
                    onChange={(e) => updateFormData('goals', e.target.value)}
                    placeholder="What do you hope to achieve with your sponsorships?"
                    className="border-gray-700"
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
                <Button type="button" onClick={handleNext} className="ml-auto bg-green-600 hover:bg-green-700 flex items-center">
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" className="ml-auto bg-green-600 hover:bg-green-700 flex items-center">
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
