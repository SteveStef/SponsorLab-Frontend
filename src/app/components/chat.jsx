"use client"
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserIcon, DollarSignIcon, SendIcon, MenuIcon } from "lucide-react"

export default function Component() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'You', content: 'Hi, I\'m interested in a sponsorship opportunity.' },
    { id: 2, sender: 'TechReviewer', content: 'Great! I\'d love to hear more about your product.' },
    { id: 3, sender: 'You', content: 'We have a new smartphone accessory that we think would be perfect for your tech review channel.' },
  ])
  const [newMessage, setNewMessage] = useState('')
  const [showSidebar, setShowSidebar] = useState(false)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: 'You', content: newMessage.trim() }])
      setNewMessage('')
    }
  }

  const youtubers = [
    { name: 'TechReviewer', subscribers: '1.2M', active: true },
    { name: 'GamingPro', subscribers: '800K', active: false },
    { name: 'FitnessGuru', subscribers: '500K', active: false },
    { name: 'CookingMaster', subscribers: '2M', active: false },
  ]

  return (
    <div className="flex h-screen bg-black ">
      {/* Sidebar */}
      <div className={`w-64 bg-gray-900 p-4 ${showSidebar ? 'block' : 'hidden'} md:block`}>
        <h2 className="text-xl font-bold mb-4">Conversations</h2>
        {youtubers.map((youtuber, index) => (
          <div key={index} className={`flex items-center space-x-2 p-2 rounded ${youtuber.active ? 'bg-green-900' : 'hover:bg-gray-800'} cursor-pointer mb-2`}>
            <Avatar>
              <AvatarImage src={`/placeholder-user-${index + 1}.jpg`} alt={youtuber.name} />
              <AvatarFallback><UserIcon className="h-6 w-6" /></AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{youtuber.name}</p>
              <p className="text-xs ">{youtuber.subscribers} subscribers</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-green-900 p-2 flex items-center justify-between">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowSidebar(!showSidebar)}>
            <MenuIcon className="h-6 w-6" />
          </Button>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="TechReviewer" />
              <AvatarFallback><UserIcon className="h-6 w-6" /></AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">TechReviewer</h2>
              <p className="text-xs ">1.2M subscribers</p>
            </div>
          </div>
          <Card className="bg-gray-900 text-green-400 border-green-900">
            <CardContent className="p-2 flex items-center space-x-2">
              <DollarSignIcon className="h-4 w-4" />
              <div>
                <p className="text-sm font-semibold">$5,000</p>
                <p className="text-xs text-green-600">per video</p>
              </div>
            </CardContent>
          </Card>
        </header>

        {/* Chat Messages */}
        <main className="flex-1 overflow-hidden">
          <ScrollArea className="h-full p-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`rounded-lg p-2 max-w-[70%] ${message.sender === 'You' ? 'bg-green-700 text-white' : 'bg-gray-800 '}`}>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </main>

        {/* Message Input */}
        <footer className="border-t border-green-900 p-2">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-gray-800 border-green-900 placeholder-green-600"
            />
            <Button onClick={handleSendMessage} size="icon" className="bg-green-700 hover:bg-green-600">
              <SendIcon className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </footer>
      </div>
    </div>
  )
}
