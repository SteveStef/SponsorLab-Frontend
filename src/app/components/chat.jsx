"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Calendar,Upload, DollarSign, Menu, Info, X, Clock, Target, UserIcon, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAppContext } from "@/context";
import request from "@/request";
import { toast } from "sonner";
import { convertFromUtcToLocal, chatTime } from "@/utils";
import io from "socket.io-client";

export default function Component({ room, participant, chatMessages }) {
  const [leftPanelOpen, setLeftPanelOpen] = useState(false)
  const [rightPanelOpen, setRightPanelOpen] = useState(false)
  const [socket, setSocket] = useState(null);

  const { name } = useAppContext();
  const [messages, setMessages] = useState(chatMessages);

  const [joined, setJoined] = useState(false);

  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  useEffect(() => {
    function connectToSocket() {
      if(!socket) {
        const socketConn = io.connect(process.env.NEXT_PUBLIC_API_URL);
        setSocket(socketConn);
      }
    }
    connectToSocket();
    return () => {
      if (socket) {
        socket.emit('leave_room', { room: room.id }); // Optionally notify the server you're leaving
        socket.disconnect(); // Disconnect from the socket
        setSocket(null); // Reset socket state
      }
    };
  },[socket,room.id])

  useEffect(() => {
    if(socket) {
      socket.emit("join_room", { room: room.id });
      setJoined(true)
    }
  },[socket, room.id]);

  useEffect(() => {
    if(joined && socket) {
      socket.on("recieve_message", (data) => {
        if(room.id === data.room) {
          setMessages((list) => [...list, { id: list.length + 1, senderId: 'Them', content: data.message}]);
        }
      });
    }
    return () => {
      if (socket) {
        socket.off("recieve_message");
      }
    };
  },[joined, room.id, socket]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      socket.emit("send_message", {room: room.id, message: newMessage});
      setMessages((list) => [...list, { id: list.length + 1, senderId: 'You', content: newMessage }]);
      setNewMessage('');
      const res = await request(`${process.env.NEXT_PUBLIC_API_URL}/chat/message`, "POST",
        {roomId: room.id, message: newMessage});
      if(!res || !res.success) toast.error("Failed to send message, try again later");
    }
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
          {false && chatRooms.map((room, index) => {
            const participant = room.participants[0]
            const name = participant.user.channel ? participant.user.channel.name : participant.user.company.orginization;

            return (
              <div key={index} onClick={() => switchRooms(room.id)} className={`flex items-center space-x-2 p-2 rounded ${selectedRoomId === room.id ? 'bg-green-900' : 'hover:bg-gray-800'} cursor-pointer mb-2`}>
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
          <h2 className="text-xl font-bold">Chat with {participant.name}</h2>
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
          <AvatarImage src={`https://api.dicebear.com/5.x/initials/svg?seed=${message.senderId === "You" ? name : participant.name}`} />
          <AvatarFallback>{message.senderId === "You" ? name : participant.name}</AvatarFallback>
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
                  <span className="text-xs text-gray-500 mt-1">{chatTime(message.createdAt)}</span>
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
              <h3 className="text-lg font-semibold mb-2">Content Requirements</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-green-500" />
                  <span>Upload Date: {convertFromUtcToLocal(room.request.transaction.deadline)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-green-500" />
                  <span>Ad Duration: {room.request.duration} seconds</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-green-500" />
                  <span>Time-Stamp: {room.request.timeStamp}</span>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold mb-2">Product Info</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Upload className="w-5 h-5 text-green-500" />
                  <span>Product Name: {room.request.title}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Sending Sample Product: {room.request.sendingProduct ? "YES" : "NO"}</span>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold mb-2">Compensation</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <span>Pricing Type: {room.pricingModel === "CPM" ? "CPM" : "Flat Rate"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <span>Cost: {room.request.pricingModel === "CPM" ? 
                      `$${(room.request.requestedPrice/100).toLocaleString()} / 1K Views` 
                      : `$${(room.request.requestedPrice / 100).toLocaleString()}`}
    </span>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold mb-2">Product Description</h3>
              <p className="text-sm text-gray-400">
                  {room.request.description}
              </p>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
