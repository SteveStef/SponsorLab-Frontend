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

export default function Component() {
  const { socket } = useAppContext();
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
      if(response.body.length !== 0) setMessages(response.body[0].messages);
      setSelectedParticipant(response.body[0].participants[0].user)
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
        {/* Sidebar */}
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

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
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

        {/* Chat Messages */}
        <main className="flex-1 overflow-hidden">
          <ScrollArea className="h-full p-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.senderId === 'You' ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`rounded-lg p-2 max-w-[70%] ${message.senderId === 'You' ? 'bg-green-700 text-white' : 'bg-gray-800 '}`}>
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
