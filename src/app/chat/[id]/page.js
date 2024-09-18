"use client";
import Header from "../../components/nav";
import Chat from "../../components/chat";
import { useEffect, useState } from "react";
import request from "@/request";
import { Card, CardContent } from "@/components/ui/card";

import {MessageSquareX} from 'lucide-react';

export default function ChatComponent({params}) {
  const [chatRoom, setChatRoom] = useState(null);
  const [participant, setParticipant] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchChatRoom(id) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/chat/${id}`; // this should block a user that does not have access to this chat
    const response = await request(url, "GET", null);
    console.log(response);
    if(response && response.success) {
      if(response.body.length !== 0) {
        setMessages(response.body.messages);
        setParticipant(response.body.participants[0].user)
        setChatRoom(response.body);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    if(params.id) {
      fetchChatRoom(params.id);
    }
  },[params]);

  return (
    <div style={{marginTop: "7vh"}}>
      <Header />
    {!loading && chatRoom ?
      <Chat room={chatRoom} participant={participant} chatMessages={messages} />
      : !loading && <NotDirectMessages />
    }
    </div>
  )
}

function NotDirectMessages() {
  return (
    <div className="flex items-center justify-center text-gray-200"style={{marginTop: "20%"}}>
      <Card className="w-full max-w-md border-green-500">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <MessageSquareX className="w-16 h-16 text-green-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">No Chat Room Found</h1>
          <p className="text-gray-400">
            This chat room does not exist or is no longer available
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
