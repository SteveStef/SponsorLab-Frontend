"use client"
import { useState, useEffect, useRef} from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquareX, Send, Calendar, Upload, DollarSign, Menu, Info, X, Clock, Target, UserIcon, CheckCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAppContext } from "@/context";
import request from "@/request";
import { toast } from "sonner";

export default function Component() {
  const [leftPanelOpen, setLeftPanelOpen] = useState(false)
  const [rightPanelOpen, setRightPanelOpen] = useState(false)

  const { socket, name } = useAppContext();
  const [chatRooms, setChatRooms] = useState([]);

  const [selected, setSelected] = useState(0);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  async function getChatRooms() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/chat`;
    const response = await request(url, "GET", null);
    console.log(response);
    if(response && response.success) {
      setChatRooms(response.body);
      if(response.body.length !== 0) {
        setMessages(response.body[0].messages);
        setSelectedParticipant(response.body[0].participants[0].user)
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    getChatRooms();
  },[]);

  useEffect(() => {
    if(chatRooms.length > 0) {
      setSelectedParticipant(chatRooms[selected].participants[0].user);
    }
  },[selected]);

  useEffect(() => {
    if(!loading && socket) {
      for(let i = 0; i < chatRooms.length; i++) {
        socket.emit("join_room", { room:chatRooms[i].id });
      }
      setJoined(true)
    }
  },[loading]);

  useEffect(() => {
    if(joined && socket) {
      socket.on("recieve_message", (data) => {
        setMessages((list) => [...list, { id: list.length + 1, senderId: 'Them', content: data.message}]);
      });
    }
  },[joined]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      socket.emit("send_message", {room: chatRooms[selected].id, message: newMessage});
      setMessages((list) => [...list, { id: list.length + 1, senderId: 'You', content: newMessage }]);
      setNewMessage('');
      const res = await request(`${process.env.NEXT_PUBLIC_API_URL}/chat/message`, "POST",
        {roomId: chatRooms[selected].id, message: newMessage});
      if(!res || !res.success) toast.error("Failed to send message, try again later");
    }
  }

  function switchRooms(index) {
    const msgs = [...messages];
    const updateRooms = [...chatRooms];
    updateRooms[selected].messages = msgs;
    setChatRooms(updateRooms);
    setSelected(index)
    setMessages(updateRooms[index].messages);
  }

  if(loading) return <div></div>
  if(!loading && chatRooms.length === 0) {
    return <NotDirectMessages />
  }

  return (
    <div className="flex h-[93vh] text-gray-100 relative">
      <div
        className={`w-full md:w-1/6 border-r border-gray-800 absolute md:relative left-0 top-0 h-full transition-transform duration-300 ease-in-out z-20 ${
          leftPanelOpen ? "translate-x-0 bg-black" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-green-500">Messages</h2>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setLeftPanelOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <ScrollArea className="h-[calc(91vh-60px)]">
          {chatRooms.map((room, index) => {
            const participant = room.participants[0]
            const name = participant.user.channel ? participant.user.channel.name : participant.user.company.orginization;

            return (
              <div key={index} onClick={() => switchRooms(index)} className={`flex items-center space-x-2 p-2 rounded ${selected === index ? 'bg-green-900' : 'hover:bg-gray-800'} cursor-pointer mb-2`}>
                <Avatar>
                  <AvatarImage src={`${(participant.user.s3ImageName || participant.user.googleImage)||""}`} alt={room.participants[0].user.name} />
                  <AvatarFallback><UserIcon className="h-6 w-6" /></AvatarFallback>
                </Avatar>
                <div>
              <h3 className="font-semibold">{participant.user.name}</h3>
                  <p className="text-sm text-gray-400">{name}</p>
                </div>
              </div>
            )})}
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col w-full md:w-1/2">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setLeftPanelOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h2 className="text-xl font-bold">Chat with {selectedParticipant.name}</h2>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setRightPanelOpen(true)}
          >
            <Info className="h-6 w-6" />
          </Button>
        </div>
        <ScrollArea className="flex-1 p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${message.senderId === "You" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex ${message.senderId === "You" ? "flex-row-reverse" : "flex-row"} items-end space-x-2`}>
        <Avatar className="w-7 h-7 mr-1 ml-1">
          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.senderId === "You" ? name : selectedParticipant.name}`} />
          <AvatarFallback>{message.senderId === "You" ? name : selectedParticipant.name}</AvatarFallback>
        </Avatar>
                <div className={`flex flex-col ${message.senderId === "You" ? "items-end" : "items-start"}`}>
                  <div
                    style={{fontSize: "15px", }}
                    className={`p-2 rounded-lg ${
                      message.senderId === "You"
                        ? "bg-green-600 text-white"
                        : "bg-gray-800 text-gray-100"
                    }`}
                  >
                    {message.content}
                  </div>
                  <span className="text-xs text-gray-500 mt-1">10am</span>
                </div>
              </div>
            </div>
          ))}
    <div ref={messagesEndRef}> </div>
        </ScrollArea>
        <div className="p-4 border-t border-gray-800 ">
          <div className="flex space-x-2">
            <Input
              className="flex-1 border-gray-700 text-gray-100"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage()
                }
              }}
            />
            <Button size="icon" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Right Panel - Request Details */}
      <div
        className={`w-full md:w-1/4 border-l border-gray-800 p-4 absolute md:relative right-0 top-0 h-full transition-transform duration-300 ease-in-out z-20 ${
          rightPanelOpen ? "translate-x-0 bg-black" : "translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-green-500">Request Details</h2>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setRightPanelOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <ScrollArea className="h-[calc(91vh-80px)]">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Campaign Information</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-green-500" />
                  <span>Upload Date: July 15, 2023</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-green-500" />
                  <span>Duration: 30 days</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-green-500" />
                  <span>Target Audience: Tech enthusiasts, 18-35</span>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold mb-2">Content Requirements</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Upload className="w-5 h-5 text-green-500" />
                  <span>Ad Type: 60-second integration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Key Points: Product features, user benefits</span>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold mb-2">Compensation</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <span>Base Pay: $1,500</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <span>Performance Bonus: Up to $500</span>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold mb-2">Additional Notes</h3>
              <p className="text-sm text-gray-400">
                Please ensure all content adheres to our brand guidelines. We'll provide a detailed brief upon agreement. Feel free to ask any questions about the campaign or requirements.
              </p>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

function NotDirectMessages() {
  return (
    <div className="flex items-center justify-center text-gray-200"style={{marginTop: "20%"}}>
      <Card className="w-full max-w-md border-green-500">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <MessageSquareX className="w-16 h-16 text-green-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">No Direct Messages</h1>
          <p className="text-gray-400">
            You currently have no direct messages. When you receive messages, they will appear here.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}


function ChatMessage({ messageData, name }) {
  const message = {
    name,
    content: messageData.content,
    time: new Date(),
    isSender: false
  }

  return (
    <div className={`flex ${message.isSender ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-end space-x-2 ${message.isSender ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <Avatar className="w-8 h-8">
          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.name}`} />
          <AvatarFallback>{message.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className={`flex flex-col ${message.isSender ? 'items-end' : 'items-start'}`}>
          <div className={`rounded-lg p-3 max-w-[240px] ${message.isSender ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
            <p className="text-sm break-words">{message.content}</p>
          </div>
          <div className="flex items-center mt-1 space-x-2">
            <p className="text-xs text-muted-foreground">{message.name}</p>
            <p className="text-xs text-muted-foreground">{format(message.time, 'HH:mm')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
/*
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquareX, UserIcon, DollarSignIcon, SendIcon, MenuIcon } from "lucide-react"
import { useState, useEffect } from "react";
import { useAppContext } from "@/context";
import request from "@/request";
import { toast } from "sonner";
import { format } from "date-fns"

export default function Component() {
  const { socket, name } = useAppContext();
  const [chatRooms, setChatRooms] = useState([]);

  const [selected, setSelected] = useState(0);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState('')
  const [showSidebar, setShowSidebar] = useState(false)

  async function getChatRooms() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/chat`;
    const response = await request(url, "GET", null);
    if(response && response.success) {
      setChatRooms(response.body);
      if(response.body.length !== 0) {
        setMessages(response.body[0].messages);
        setSelectedParticipant(response.body[0].participants[0].user)
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    getChatRooms();
  },[]);

  useEffect(() => {
    if(chatRooms.length > 0) {
      setSelectedParticipant(chatRooms[selected].participants[0].user);
    }
  },[selected]);

  useEffect(() => {
    if(!loading && socket) {
      for(let i = 0; i < chatRooms.length; i++) {
        socket.emit("join_room", { room:chatRooms[i].id });
      }
      setJoined(true)
    }
  },[loading]);

  useEffect(() => {
    if(joined && socket) {
      socket.on("recieve_message", (data) => {
        setMessages((list) => [...list, { id: list.length + 1, senderId: 'Them', content: data.message}]);
      });
    }
  },[joined]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      socket.emit("send_message", {room: chatRooms[selected].id, message: newMessage});
      setMessages((list) => [...list, { id: list.length + 1, senderId: 'You', content: newMessage }]);
      setNewMessage('');
      const res = await request(`${process.env.NEXT_PUBLIC_API_URL}/chat/message`, "POST",
        {roomId: chatRooms[selected].id, message: newMessage});
      if(!res || !res.success) toast.error("Failed to send message, try again later");
    }
  }

  function switchRooms(index) {
    const msgs = [...messages];
    const updateRooms = [...chatRooms];
    updateRooms[selected].messages = msgs;
    setChatRooms(updateRooms);
    setSelected(index)
    setMessages(updateRooms[index].messages);
  }

  if(loading) return <div></div>
  if(!loading && chatRooms.length === 0) {
    return <NotDirectMessages />
  }

  return (
      <div className="flex min-h-[93dvh] bg-black" >
      <div className={`w-64 bg-gray-900 p-4 ${showSidebar ? 'block' : 'hidden'} md:block`}>
        <h2 className="text-xl font-bold mb-4">Conversations</h2>
        {chatRooms.map((room, index) => {
          const participant = room.participants[0]
          const name = participant.user.channel ? participant.user.channel.name : participant.user.company.orginization;

          return (
          <div key={index} onClick={() => switchRooms(index)} className={`flex items-center space-x-2 p-2 rounded ${selected === index ? 'bg-green-900' : 'hover:bg-gray-800'} cursor-pointer mb-2`}>
            <Avatar>
              <AvatarImage src={`${(participant.user.s3ImageName || participant.user.googleImage)||""}`} alt={room.participants[0].user.name} />
              <AvatarFallback><UserIcon className="h-6 w-6" /></AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{participant.user.name}</p>
              <p className="text-xs ">{name}</p>
            </div>
          </div>
          )})}
      </div>

      <div className="flex-1 flex flex-col">
        <header className="border-b border-green-900 p-2 flex items-center justify-between">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowSidebar(!showSidebar)}>
            <MenuIcon className="h-6 w-6" />
          </Button>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={selectedParticipant && (selectedParticipant.s3ImageUrl || selectedParticipant.googleImage) || "/place.svg"} alt="user image" />
              <AvatarFallback><UserIcon className="h-6 w-6" /></AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">{selectedParticipant && selectedParticipant.name}</h2>
              <p className="text-xs ">{selectedParticipant && (selectedParticipant.channel ? selectedParticipant.channel.name : selectedParticipant.company.orginization)}</p>
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

        <main className="flex-1 overflow-hidden">
          <ScrollArea className="h-full p-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.senderId === 'You' ? 'justify-end' : 'justify-start'} mb-4`}>
                <ChatMessage messageData={message} name={message.senderId === "You" ? name : selectedParticipant.name} />
              </div>
            ))}
          </ScrollArea>
        </main>

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

function NotDirectMessages() {
  return (
    <div className="flex items-center justify-center text-gray-200"style={{marginTop: "20%"}}>
      <Card className="w-full max-w-md border-green-500">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <MessageSquareX className="w-16 h-16 text-green-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">No Direct Messages</h1>
          <p className="text-gray-400">
            You currently have no direct messages. When you receive messages, they will appear here.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}


function ChatMessage({ messageData, name }) {
  const message = {
    name,
    content: messageData.content,
    time: new Date(),
    isSender: false
  }

  return (
    <div className={`flex ${message.isSender ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-end space-x-2 ${message.isSender ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <Avatar className="w-8 h-8">
          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.name}`} />
          <AvatarFallback>{message.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className={`flex flex-col ${message.isSender ? 'items-end' : 'items-start'}`}>
          <div className={`rounded-lg p-3 max-w-[240px] ${message.isSender ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
            <p className="text-sm break-words">{message.content}</p>
          </div>
          <div className="flex items-center mt-1 space-x-2">
            <p className="text-xs text-muted-foreground">{message.name}</p>
            <p className="text-xs text-muted-foreground">{format(message.time, 'HH:mm')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
*/
