"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Paperclip, 
  Smile, 
  Send, 
  Check, 
  CheckCheck, 
  Image as ImageIcon,
  FileText,
  User,
  Search as SearchIcon,
  X,
  ChevronLeft
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
  status: "sent" | "delivered" | "seen";
  attachment?: {
    type: "image" | "file";
    name: string;
    size?: string;
  };
}

interface Chat {
  id: string;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  lastTime: string;
  unreadCount: number;
  online: boolean;
  messages: Message[];
}

export default function StudentMessages() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState("1");
  const [inputText, setInputText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      name: "Ustadha Aisha",
      role: "Quran Teacher",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F5",
      lastMessage: "Don't forget to practice the Madd rules before our next class.",
      lastTime: "10:30 AM",
      unreadCount: 2,
      online: true,
      messages: [
        { id: "m1", senderId: "other", text: "Assalamu Alaikum Omar, how is your revision going?", timestamp: "09:15 AM", status: "seen" },
        { id: "m2", senderId: "me", text: "Wa Alaikum Assalam Ustadha! It's going well, I just finished Juz 30 revision.", timestamp: "09:20 AM", status: "seen" },
        { id: "m3", senderId: "other", text: "MashaAllah! That's great to hear. Have you recorded the assignment yet?", timestamp: "10:25 AM", status: "seen" },
        { id: "m4", senderId: "other", text: "Don't forget to practice the Madd rules before our next class.", timestamp: "10:30 AM", status: "delivered" },
      ]
    },
    {
      id: "2",
      name: "Ustadh Bilal",
      role: "Tajweed Instructor",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FMiddle%20Eastern%2F2",
      lastMessage: "I've approved your makeup request for Wednesday.",
      lastTime: "Yesterday",
      unreadCount: 0,
      online: false,
      messages: [
        { id: "m1", senderId: "other", text: "Assalamu Alaikum, your recent quiz was excellent.", timestamp: "Yesterday", status: "seen" },
        { id: "m2", senderId: "me", text: "JazakAllah Khair Ustadh!", timestamp: "Yesterday", status: "seen" },
      ]
    },
    {
      id: "3",
      name: "Admin Office",
      role: "Support",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FMiddle%20Eastern%2F2",
      lastMessage: "Your fee receipt for October has been generated.",
      lastTime: "Oct 22",
      unreadCount: 0,
      online: true,
      messages: []
    },
    {
      id: "4",
      name: "Hafiz Usman",
      role: "Hifz Coordinator",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FMiddle%20Eastern%2F5",
      lastMessage: "Please check the updated schedule for Juz 29.",
      lastTime: "Oct 20",
      unreadCount: 0,
      online: false,
      messages: []
    }
  ]);

  const selectedChat = chats.find(c => c.id === selectedChatId) || chats[0];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selectedChatId, chats]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "me",
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sent"
    };

    setChats(prev => prev.map(chat => {
      if (chat.id === selectedChatId) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessage: inputText,
          lastTime: newMessage.timestamp
        };
      }
      return chat;
    }));

    setInputText("");
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <Sidebar role="student" className="hidden md:flex w-64 shrink-0" />

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-72 h-full animate-in slide-in-from-left duration-300">
            <Sidebar role="student" className="w-full" />
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
          userName="Omar Farooq"
          userRole="Hifz Student"
          userAvatar="https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FMiddle%20Eastern%2F1"
          hideSearch
        />

        <main className="flex-1 overflow-hidden flex bg-slate-50/30 p-0 md:p-6 lg:p-8">
          
          <div className="flex-1 flex bg-card border border-border rounded-none md:rounded-2xl shadow-sm overflow-hidden min-w-0">
            
            {/* Left Panel: Conversation List */}
            <div className="w-full md:w-[320px] lg:w-[380px] border-r border-border flex flex-col shrink-0">
              {/* List Header */}
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-foreground">Chats</h2>
                  <button className="p-2 hover:bg-muted rounded-full transition-colors">
                    <Paperclip size={20} className="text-muted-foreground rotate-45" />
                  </button>
                </div>
                <div className="relative group">
                  <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search conversations..." 
                    className="w-full h-10 bg-slate-50 border border-border rounded-xl pl-10 pr-4 text-sm font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary/10 transition-all"
                  />
                </div>
              </div>

              {/* Chat List */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {chats.map(chat => (
                  <div 
                    key={chat.id}
                    onClick={() => setSelectedChatId(chat.id)}
                    className={cn(
                      "px-5 py-4 flex items-center gap-4 cursor-pointer transition-all border-l-4",
                      selectedChatId === chat.id 
                        ? "bg-primary/[0.04] border-primary" 
                        : "border-transparent hover:bg-slate-50"
                    )}
                  >
                    <div className="relative shrink-0">
                      <img src={chat.avatar} className="w-12 h-12 rounded-full border border-border object-cover" />
                      {chat.online && (
                        <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[15px] font-bold text-foreground truncate">{chat.name}</span>
                        <span className="text-[11px] font-bold text-muted-foreground">{chat.lastTime}</span>
                      </div>
                      <div className="text-[12px] font-bold text-primary/80 uppercase tracking-wider">{chat.role}</div>
                      <div className="flex justify-between items-center mt-0.5">
                        <p className={cn(
                          "text-[13px] truncate",
                          chat.unreadCount > 0 ? "font-bold text-foreground" : "font-medium text-muted-foreground"
                        )}>
                          {chat.lastMessage}
                        </p>
                        {chat.unreadCount > 0 && (
                          <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">
                            {chat.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Panel: Chat Window */}
            <div className="flex-1 flex flex-col min-w-0 bg-slate-50/20 relative">
              {/* Chat Header */}
              <div className="h-16 lg:h-20 border-b border-border bg-card px-5 lg:px-8 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <img src={selectedChat.avatar} className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-border object-cover" />
                    {selectedChat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-[15px] lg:text-base font-bold text-foreground leading-tight">{selectedChat.name}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[12px] font-bold text-primary/80 uppercase tracking-wider">{selectedChat.role}</span>
                      <span className="text-[12px] text-muted-foreground">•</span>
                      <span className="text-[12px] font-bold text-emerald-600">{selectedChat.online ? "Online" : "Away"}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 lg:gap-4">
                  <button className="p-2.5 text-muted-foreground hover:bg-muted rounded-full transition-all">
                    <Phone size={20} />
                  </button>
                  <button className="p-2.5 text-muted-foreground hover:bg-muted rounded-full transition-all">
                    <Video size={20} />
                  </button>
                  <button className="p-2.5 text-muted-foreground hover:bg-muted rounded-full transition-all">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>

              {/* Message List */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10 flex flex-col gap-6"
              >
                <div className="flex justify-center">
                  <span className="bg-muted px-4 py-1 rounded-full text-[11px] font-bold text-muted-foreground uppercase tracking-widest border border-border/50">
                    Today
                  </span>
                </div>

                {selectedChat.messages.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 space-y-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                      <Send size={32} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">No messages yet</p>
                      <p className="text-xs font-medium text-muted-foreground">Start a conversation with {selectedChat.name}</p>
                    </div>
                  </div>
                ) : (
                  selectedChat.messages.map((msg, i) => (
                    <div 
                      key={msg.id}
                      className={cn(
                        "flex flex-col gap-1.5 max-w-[80%] lg:max-w-[70%]",
                        msg.senderId === "me" ? "ml-auto items-end" : "mr-auto items-start"
                      )}
                    >
                      <div className={cn(
                        "px-4 py-3 rounded-2xl text-[14px] font-medium leading-relaxed shadow-sm",
                        msg.senderId === "me" 
                          ? "bg-primary text-primary-foreground rounded-tr-none" 
                          : "bg-card text-foreground border border-border rounded-tl-none"
                      )}>
                        {msg.text}
                      </div>
                      <div className="flex items-center gap-1.5 px-1">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">{msg.timestamp}</span>
                        {msg.senderId === "me" && (
                          <div className="text-primary">
                            {msg.status === "seen" ? <CheckCheck size={12} /> : <Check size={12} />}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Input Area */}
              <div className="p-5 lg:p-8 pt-0 bg-transparent">
                <div className="bg-card border border-border rounded-2xl shadow-lg p-2.5 flex items-end gap-2 focus-within:border-primary transition-all">
                  <div className="flex items-center gap-1">
                    <button className="p-2.5 text-muted-foreground hover:bg-muted rounded-xl transition-all">
                      <Paperclip size={20} className="rotate-45" />
                    </button>
                    <button className="p-2.5 text-muted-foreground hover:bg-muted rounded-xl transition-all">
                      <Smile size={20} />
                    </button>
                  </div>
                  <textarea 
                    rows={1}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type your message here..."
                    className="flex-1 bg-transparent border-none py-2.5 px-2 text-[14px] font-medium outline-none resize-none max-h-32 scrollbar-hide placeholder:text-muted-foreground/60"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={!inputText.trim()}
                    className={cn(
                      "w-11 h-11 rounded-xl flex items-center justify-center transition-all shadow-md",
                      inputText.trim() 
                        ? "bg-primary text-primary-foreground shadow-primary/20 hover:scale-105 active:scale-95" 
                        : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
                    )}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
