"use client";

import React, { useState } from "react";
import { 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Send, 
  Paperclip, 
  Smile,
  X,
  ChevronLeft,
  Circle
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  status: "online" | "offline";
}

export default function Messages() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<string>("1");
  const [newMessage, setNewMessage] = useState("");

  const chats: Chat[] = [
    { id: "1", name: "Ahmed Raza (Guardian)", avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F45-55%2FSouth%20Asian%2F2", lastMessage: "Assalamu Alaikum Ustadha, how is Ahmed's progress?", time: "10:30 AM", unreadCount: 2, status: "online" },
    { id: "2", name: "Zainab Ali (Guardian)", avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F35-45%2FMiddle%20Eastern%2F1", lastMessage: "Thank you for the update.", time: "Yesterday", unreadCount: 0, status: "offline" },
    { id: "3", name: "Omar Farooq (Student)", avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FAfrican%2F3", lastMessage: "I have submitted the assignment.", time: "Oct 24", unreadCount: 0, status: "online" },
    { id: "4", name: "Fatima Zahra (Guardian)", avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F3", lastMessage: "Can we reschedule tomorrow's class?", time: "Oct 22", unreadCount: 0, status: "offline" },
  ];

  const messages: Message[] = [
    { id: "1", senderId: "1", text: "Assalamu Alaikum Ustadha, how is Ahmed's progress?", timestamp: "10:30 AM", isMe: false },
    { id: "2", senderId: "me", text: "Walaikum Assalam. Ahmed is doing very well! He has completed 65% of the Noorani Qaida syllabus.", timestamp: "10:35 AM", isMe: true },
    { id: "3", senderId: "me", text: "His pronunciation is improving significantly. I've left some detailed notes in his profile.", timestamp: "10:36 AM", isMe: true },
    { id: "4", senderId: "1", text: "That's great to hear. JazakAllah Khair for your efforts.", timestamp: "10:40 AM", isMe: false },
    { id: "5", senderId: "1", text: "Does he need any extra practice at home?", timestamp: "10:41 AM", isMe: false },
  ];

  const activeChat = chats.find(c => c.id === selectedChat) || chats[0];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <Sidebar role="teacher" className="hidden md:flex w-64 shrink-0" />

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-72 h-full animate-in slide-in-from-left duration-300">
            <Sidebar role="teacher" className="w-full" />
            <button 
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        <Navbar 
          title="Messages" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Ustadha Aisha"
          userRole="Senior Teacher"
          userAvatar="https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F5"
          hideSearch
        />

        <main className="flex-1 overflow-hidden flex bg-slate-50/30">
          
          {/* Chat List Sidebar */}
          <div className="w-full md:w-80 border-r border-border bg-card flex flex-col shrink-0">
            {/* Search */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center bg-muted rounded-lg px-3 h-10 gap-2 border border-transparent focus-within:border-primary/30 transition-all">
                <Search size={16} className="text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search chats..." 
                  className="bg-transparent border-none outline-none text-[13px] font-semibold text-foreground w-full placeholder:text-muted-foreground/60"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {chats.map(chat => (
                <button 
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={cn(
                    "w-full p-4 flex gap-3 border-b border-border/50 hover:bg-slate-50 transition-all text-left",
                    selectedChat === chat.id && "bg-slate-50 border-r-2 border-r-primary"
                  )}
                >
                  <div className="relative shrink-0">
                    <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover border border-border" />
                    <div className={cn(
                      "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card",
                      chat.status === "online" ? "bg-emerald-500" : "bg-slate-300"
                    )} />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[14px] font-bold text-foreground truncate">{chat.name}</span>
                      <span className="text-[11px] font-semibold text-muted-foreground">{chat.time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-[12px] text-muted-foreground truncate font-medium">{chat.lastMessage}</p>
                      {chat.unreadCount > 0 && (
                        <span className="bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Chat Window */}
          <div className="flex-1 flex flex-col bg-card relative">
            {/* Chat Header */}
            <div className="h-16 border-b border-border flex items-center justify-between px-6 shrink-0">
              <div className="flex items-center gap-3">
                <button className="md:hidden p-2 -ml-2 text-muted-foreground">
                  <ChevronLeft size={20} />
                </button>
                <div className="relative">
                  <img src={activeChat.avatar} className="w-10 h-10 rounded-full object-cover border border-border" alt={activeChat.name} />
                  <div className={cn(
                    "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-card",
                    activeChat.status === "online" ? "bg-emerald-500" : "bg-slate-300"
                  )} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-bold text-foreground">{activeChat.name}</span>
                  <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">{activeChat.status}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground transition-all">
                  <Phone size={20} />
                </button>
                <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground transition-all">
                  <Video size={20} />
                </button>
                <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground transition-all">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 bg-slate-50/50">
              {messages.map((msg, i) => (
                <div key={msg.id} className={cn(
                  "flex flex-col max-w-[80%] gap-1.5",
                  msg.isMe ? "ml-auto items-end" : "items-start"
                )}>
                  <div className={cn(
                    "p-3.5 px-4 rounded-2xl text-[14px] font-medium leading-relaxed shadow-sm",
                    msg.isMe 
                      ? "bg-primary text-primary-foreground rounded-tr-none" 
                      : "bg-card border border-border text-foreground rounded-tl-none"
                  )}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border bg-card shrink-0">
              <div className="flex items-center gap-3 bg-muted rounded-xl p-2 px-4 border border-transparent focus-within:border-primary/30 transition-all">
                <button className="p-2 text-muted-foreground hover:text-primary transition-all">
                  <Paperclip size={20} />
                </button>
                <input 
                  type="text" 
                  placeholder="Type your message here..." 
                  className="flex-1 bg-transparent border-none outline-none text-[14px] font-medium text-foreground py-2 placeholder:text-muted-foreground/60"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && newMessage.trim() && setNewMessage("")}
                />
                <button className="p-2 text-muted-foreground hover:text-primary transition-all">
                  <Smile size={20} />
                </button>
                <button 
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    newMessage.trim() ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground"
                  )}
                  disabled={!newMessage.trim()}
                  onClick={() => setNewMessage("")}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
