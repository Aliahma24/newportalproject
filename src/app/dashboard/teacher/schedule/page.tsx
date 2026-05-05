"use client";

import React, { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Video,
  Calendar,
  X
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Event Interface
interface ScheduleEvent {
  id: string;
  title: string;
  time: string;
  subject?: string;
  type: "completed" | "ongoing" | "upcoming";
  day: number; // 0-6 (Mon-Sun)
  top: number;
  height: number;
}

export default function TeacherSchedule() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState<"day" | "week">("week");

  // Mock schedule data based on design
  const events: ScheduleEvent[] = [
    // Monday (0)
    { id: "1", title: "Ahmed Raza", time: "08:00 - 09:00 AM", subject: "Quran Recitation", type: "completed", day: 0, top: 0, height: 100 },
    { id: "2", title: "Usman Ali", time: "11:30 - 12:30 PM", type: "completed", day: 0, top: 350, height: 100 },
    { id: "3", title: "Sarah Khan", time: "02:00 - 03:00 PM", type: "completed", day: 0, top: 600, height: 100 },
    
    // Tuesday (1)
    { id: "4", title: "Fatima Zahra", time: "08:00 - 09:30 AM", subject: "Tajweed Basic", type: "completed", day: 1, top: 0, height: 150 },
    { id: "5", title: "Ali Khan", time: "10:00 - 11:00 AM", subject: "Hifz Revision", type: "ongoing", day: 1, top: 200, height: 100 },
    { id: "6", title: "Omar Farooq", time: "01:00 - 02:00 PM", subject: "Tajweed Rules", type: "upcoming", day: 1, top: 500, height: 100 },
    { id: "7", title: "Zainab Ali", time: "04:30 - 05:30 PM", type: "upcoming", day: 1, top: 850, height: 100 },
    
    // Wednesday (2)
    { id: "8", title: "Bilal Ahmed", time: "09:00 - 10:30 AM", subject: "Quran Memorization", type: "upcoming", day: 2, top: 100, height: 150 },
    { id: "9", title: "Zainab Ali", time: "11:00 - 12:00 PM", type: "upcoming", day: 2, top: 300, height: 100 },
    { id: "10", title: "Aisha Siddiqa", time: "03:00 - 04:00 PM", type: "upcoming", day: 2, top: 700, height: 100 },
    
    // Thursday (3)
    { id: "11", title: "Group B - Tajweed", time: "10:00 - 11:00 AM", subject: "Virtual Room 1", type: "upcoming", day: 3, top: 200, height: 100 },
    { id: "12", title: "Ahmed Raza", time: "02:00 - 03:30 PM", type: "upcoming", day: 3, top: 600, height: 150 },
    
    // Friday (4)
    { id: "13", title: "Aisha Siddiqa", time: "08:30 - 09:30 AM", type: "upcoming", day: 4, top: 50, height: 100 },
    { id: "14", title: "Omar Farooq", time: "05:00 - 06:00 PM", type: "upcoming", day: 4, top: 900, height: 100 },
    
    // Sunday (6)
    { id: "15", title: "Make-up Class", time: "10:00 - 11:30 AM", subject: "Student: Ahmed Raza", type: "upcoming", day: 6, top: 200, height: 150 },
  ];

  const timeSlots = [
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", 
    "06:00 PM", "07:00 PM"
  ];

  const days = [
    { name: "Mon", date: "24" },
    { name: "Tue", date: "25", active: true },
    { name: "Wed", date: "26" },
    { name: "Thu", date: "27" },
    { name: "Fri", date: "28" },
    { name: "Sat", date: "29", opacity: 0.6 },
    { name: "Sun", date: "30", opacity: 0.6 },
  ];

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
          title="My Schedule" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Ustadha Aisha"
          userRole="Senior Teacher"
          userAvatar="https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F5"
          hideSearch
        />

        <main className="flex-1 overflow-hidden p-6 md:p-8 flex flex-col gap-5 bg-slate-50/30">
          
          <div className="flex-1 bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col min-h-0">
            {/* Calendar Toolbar */}
            <div className="p-4 px-6 border-b border-border flex justify-between items-center bg-card shrink-0 z-20">
              <div className="flex items-center gap-6">
                <div className="flex gap-1.5">
                  <button className="w-9 h-9 border border-border rounded-md bg-card text-muted-foreground flex items-center justify-center hover:bg-muted transition-colors">
                    <ChevronLeft size={18} />
                  </button>
                  <button className="h-9 px-4 border border-border rounded-md bg-card text-sm font-bold text-foreground hover:bg-muted transition-colors">
                    Today
                  </button>
                  <button className="w-9 h-9 border border-border rounded-md bg-card text-muted-foreground flex items-center justify-center hover:bg-muted transition-colors">
                    <ChevronRight size={18} />
                  </button>
                </div>
                <h2 className="text-lg font-bold text-foreground">October 24 - 30, 2026</h2>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex bg-muted p-1 rounded-lg gap-1">
                  <button 
                    onClick={() => setView("day")}
                    className={cn(
                      "px-4 py-1.5 rounded-md text-[13px] font-bold transition-all",
                      view === "day" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Day
                  </button>
                  <button 
                    onClick={() => setView("week")}
                    className={cn(
                      "px-4 py-1.5 rounded-md text-[13px] font-bold transition-all",
                      view === "week" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Week
                  </button>
                </div>
              </div>
            </div>

            {/* Calendar Header */}
            <div className="flex border-b border-border bg-card shrink-0 z-10">
              <div className="w-[80px] shrink-0 flex items-end justify-center pb-3 text-[11px] font-bold text-muted-foreground border-r border-border">
                GMT+5
              </div>
              <div className="flex-1 flex">
                {days.map((day, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "flex-1 flex flex-col items-center justify-center py-3 border-r border-border last:border-0",
                      day.active && "text-primary"
                    )}
                    style={{ opacity: day.opacity }}
                  >
                    <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 mb-1">{day.name}</div>
                    <div className={cn(
                      "w-9 h-9 flex items-center justify-center text-lg font-bold rounded-full transition-colors",
                      day.active ? "bg-primary text-primary-foreground" : "text-foreground"
                    )}>
                      {day.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-card relative">
              <div className="flex min-h-[1200px] relative">
                {/* Time Column */}
                <div className="w-[80px] shrink-0 border-r border-border bg-card">
                  {timeSlots.map((time, i) => (
                    <div key={i} className="h-[100px] relative">
                      <span className="absolute -top-2.5 right-4 bg-card px-1 text-[11px] font-bold text-muted-foreground/60 whitespace-nowrap">
                        {time}
                      </span>
                    </div>
                  ))}
                  <div className="h-0 relative">
                    <span className="absolute -top-2.5 right-4 bg-card px-1 text-[11px] font-bold text-muted-foreground/60 whitespace-nowrap">08:00 PM</span>
                  </div>
                </div>

                {/* Grid Content */}
                <div className="flex-1 flex relative">
                  {/* Grid Lines Overlay */}
                  <div className="absolute inset-0 pointer-events-none z-0">
                    {Array.from({ length: 13 }).map((_, i) => (
                      <div key={i} className="h-[100px] border-b border-border last:border-0 w-full" />
                    ))}
                  </div>

                  {/* Current Time Indicator */}
                  <div className="absolute left-0 right-0 h-[2px] bg-primary z-20 pointer-events-none" style={{ top: "250px" }}>
                    <div className="absolute -left-1 -top-1 w-2.5 h-2.5 rounded-full bg-primary shadow-sm" />
                  </div>

                  {/* Day Columns */}
                  {Array.from({ length: 7 }).map((_, dayIdx) => (
                    <div 
                      key={dayIdx} 
                      className={cn(
                        "flex-1 border-r border-border last:border-0 relative z-10",
                        dayIdx === 1 && "bg-primary/[0.02]"
                      )}
                    >
                      {events.filter(e => e.day === dayIdx).map(event => (
                        <div 
                          key={event.id}
                          className={cn(
                            "absolute left-1 right-1 rounded-lg p-3 flex flex-col gap-1 transition-all hover:scale-[1.01] hover:z-20 cursor-pointer shadow-sm",
                            event.type === "completed" && "bg-muted/80 border-l-4 border-muted-foreground/50 opacity-80",
                            event.type === "upcoming" && "bg-card border border-border border-l-4 border-primary",
                            event.type === "ongoing" && "bg-primary text-primary-foreground border-none shadow-lg shadow-primary/20 z-10"
                          )}
                          style={{ top: `${event.top}px`, height: `${event.height}px` }}
                        >
                          <div className="flex justify-between items-start gap-2">
                            <span className={cn(
                              "text-[13px] font-bold leading-tight line-clamp-1",
                              event.type === "completed" ? "text-muted-foreground" : 
                              event.type === "ongoing" ? "text-primary-foreground" : "text-foreground"
                            )}>
                              {event.title}
                            </span>
                            {event.type === "ongoing" && <Video size={14} className="shrink-0" />}
                          </div>
                          
                          <div className={cn(
                            "flex items-center gap-1.5 text-[11px] font-bold",
                            event.type === "completed" ? "text-muted-foreground/70" : 
                            event.type === "ongoing" ? "text-primary-foreground/80" : "text-muted-foreground"
                          )}>
                            <Clock size={12} />
                            {event.time}
                          </div>

                          {event.subject && (
                            <div className={cn(
                              "text-[11px] font-medium mt-0.5 line-clamp-1",
                              event.type === "completed" ? "text-muted-foreground/60" : 
                              event.type === "ongoing" ? "text-primary-foreground/70" : "text-muted-foreground/80"
                            )}>
                              {event.subject}
                            </div>
                          )}

                          {event.type === "ongoing" && (
                            <div className="mt-auto self-start bg-white/20 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                              Live Now
                            </div>
                          )}
                          {event.type === "completed" && event.subject === "Tajweed Basic" && (
                            <div className="mt-auto self-start bg-card text-muted-foreground border border-border px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                              Completed
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
