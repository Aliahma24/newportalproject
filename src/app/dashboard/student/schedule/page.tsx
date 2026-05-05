"use client";

import React, { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Calendar, 
  Bell, 
  User, 
  Video, 
  Clock, 
  Users, 
  AlertCircle, 
  BarChart2, 
  CalendarClock, 
  ClipboardCheck,
  X
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Event {
  id: string;
  title: string;
  start: string; // e.g., "10:00 AM"
  end: string;   // e.g., "11:00 AM"
  teacher: string;
  type: "live" | "upcoming" | "makeup" | "completed";
  day: number; // 0 for Mon, 1 for Tue, etc.
  tag?: string;
  top: number;
  height: number;
}

export default function StudentSchedule() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState<"Week" | "Month">("Week");

  const events: Event[] = [
    // Monday
    { id: "1", title: "Morning Adhkar", start: "08:00 AM", end: "09:00 AM", teacher: "Sheikh Omar", type: "completed", day: 0, top: 0, height: 76 },
    { id: "2", title: "Hifz Revision", start: "10:00 AM", end: "11:00 AM", teacher: "Grp B • Ustadha Aisha", type: "live", day: 0, top: 160, height: 76 },
    { id: "3", title: "Tajweed Rules", start: "02:30 PM", end: "03:30 PM", teacher: "Ustadh Bilal", type: "upcoming", day: 0, top: 520, height: 76 },
    
    // Tuesday
    { id: "4", title: "Quran Recitation", start: "09:00 AM", end: "10:00 AM", teacher: "Sheikh Omar", type: "upcoming", day: 1, top: 80, height: 76 },
    { id: "5", title: "Islamic History", start: "04:00 PM", end: "05:30 PM", teacher: "Seminar • Ustadh Bilal", type: "upcoming", day: 1, top: 640, height: 116, tag: "Module 3" },
    
    // Wednesday
    { id: "6", title: "Hifz Revision", start: "10:00 AM", end: "11:00 AM", teacher: "Grp B • Ustadha Aisha", type: "upcoming", day: 2, top: 160, height: 76 },
    { id: "7", title: "Tajweed Makeup", start: "05:30 PM", end: "06:30 PM", teacher: "Ustadh Bilal", type: "makeup", day: 2, top: 760, height: 76 },
    
    // Thursday
    { id: "8", title: "Tajweed Rules", start: "02:30 PM", end: "03:30 PM", teacher: "Ustadh Bilal", type: "upcoming", day: 3, top: 520, height: 76 },
    
    // Friday
    { id: "9", title: "Surah Kahf Recitation", start: "09:00 AM", end: "10:00 AM", teacher: "Sheikh Omar", type: "upcoming", day: 4, top: 80, height: 76 },
  ];

  const timeSlots = [
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", 
    "06:00 PM", "07:00 PM", "08:00 PM"
  ];

  const days = [
    { name: "Mon", num: 24, current: true },
    { name: "Tue", num: 25, current: false },
    { name: "Wed", num: 26, current: false },
    { name: "Thu", num: 27, current: false },
    { name: "Fri", num: 28, current: false },
  ];

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
          title="Student Schedule" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Omar Farooq"
          userRole="Hifz Student"
          userAvatar="https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FMiddle%20Eastern%2F1"
          hideSearch
        />

        <main className="flex-1 overflow-hidden flex bg-slate-50/30 p-6 md:p-8 gap-6">
          
          {/* Calendar Container */}
          <div className="flex-1 flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden min-w-0">
            {/* Calendar Header */}
            <div className="p-4 px-6 border-b border-border flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 flex items-center justify-center border border-border rounded-md hover:bg-muted transition-colors">
                    <ChevronLeft size={18} />
                  </button>
                  <h2 className="text-lg font-bold text-foreground">October 24 - 30, 2026</h2>
                  <button className="w-8 h-8 flex items-center justify-center border border-border rounded-md hover:bg-muted transition-colors">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="h-9 px-4 border border-primary text-primary rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-primary/5 transition-all">
                  <Plus size={14} /> Request Makeup
                </button>
                <div className="h-6 w-px bg-border mx-1" />
                <div className="bg-muted p-1 rounded-lg flex gap-1">
                  {["Week", "Month"].map((v) => (
                    <button
                      key={v}
                      onClick={() => setView(v as any)}
                      className={cn(
                        "px-4 py-1.5 text-xs font-bold rounded-md transition-all",
                        view === v ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Days Header */}
            <div className="flex border-b border-border bg-slate-50/50 shrink-0 pr-[6px]">
              <div className="w-[70px] border-r border-border shrink-0" />
              {days.map((day, i) => (
                <div key={i} className="flex-1 py-3 flex flex-col items-center gap-1 border-r border-border last:border-r-0">
                  <span className={cn("text-[11px] font-bold uppercase tracking-widest", day.current ? "text-primary" : "text-muted-foreground")}>
                    {day.name}
                  </span>
                  <span className={cn(
                    "text-xl font-bold w-9 h-9 flex items-center justify-center rounded-full transition-colors",
                    day.current ? "bg-primary text-primary-foreground" : "text-foreground"
                  )}>
                    {day.num}
                  </span>
                </div>
              ))}
            </div>

            {/* Calendar Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar relative flex">
              {/* Current Time Indicator */}
              <div className="absolute left-[70px] right-0 top-[200px] h-0.5 bg-rose-500 z-10 pointer-events-none">
                <div className="absolute -left-1.5 -top-1 w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm" />
              </div>

              {/* Time Column */}
              <div className="w-[70px] border-r border-border bg-card shrink-0 sticky left-0 z-20">
                {timeSlots.map((time, i) => (
                  <div key={i} className="h-20 text-[11px] font-bold text-muted-foreground text-right pr-3 -translate-y-2">
                    {time}
                  </div>
                ))}
              </div>

              {/* Grid Columns */}
              <div className="flex-1 flex relative min-h-[1040px] bg-[length:100%_80px] bg-[linear-gradient(to_bottom,theme(colors.border)_1px,transparent_1px)]">
                {days.map((day, dayIdx) => (
                  <div key={dayIdx} className={cn(
                    "flex-1 border-r border-border last:border-r-0 relative",
                    day.current && "bg-primary/[0.02]"
                  )}>
                    {events.filter(e => e.day === dayIdx).map(event => (
                      <div 
                        key={event.id}
                        className={cn(
                          "absolute left-1 right-1 rounded-md p-2.5 flex flex-col gap-1 shadow-sm transition-all hover:scale-[1.02] hover:z-20",
                          event.type === "live" && "bg-primary text-primary-foreground border-none",
                          event.type === "upcoming" && "bg-card border border-border border-l-4 border-l-primary",
                          event.type === "makeup" && "bg-amber-500/10 border border-amber-500/20 border-l-4 border-l-amber-500",
                          event.type === "completed" && "bg-muted border border-border border-l-4 border-l-muted-foreground opacity-70"
                        )}
                        style={{ top: `${event.top}px`, height: `${event.height}px` }}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[13px] font-bold truncate leading-tight">{event.title}</span>
                          {event.type === "live" && <div className="w-2 h-2 rounded-full bg-white animate-pulse shrink-0" />}
                          {event.type === "makeup" && <AlertCircle size={12} className="text-amber-600 shrink-0" />}
                        </div>
                        <span className={cn("text-[11px] font-semibold truncate", event.type === "live" ? "text-primary-foreground/90" : "text-muted-foreground")}>
                          {event.start} - {event.end}
                        </span>
                        <div className={cn("flex items-center gap-1.5 text-[11px] font-bold truncate mt-auto", event.type === "live" ? "text-primary-foreground/90" : "text-muted-foreground")}>
                          {event.type === "live" ? <Users size={12} /> : <User size={12} />}
                          {event.teacher}
                        </div>
                        {event.tag && (
                          <div className="mt-1 flex">
                            <span className="bg-background/80 border border-border px-1.5 py-0.5 rounded text-[9px] font-bold text-foreground">
                              {event.tag}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="hidden xl:flex w-72 shrink-0 flex-col gap-6 overflow-y-auto custom-scrollbar">
            {/* Live Now Card */}
            <div className="bg-primary rounded-xl p-5 text-primary-foreground flex flex-col gap-4 shadow-lg shadow-primary/20 relative overflow-hidden group">
              <div className="absolute -right-5 -top-5 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="flex items-center justify-between relative z-10">
                <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2 py-1 rounded">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Live Now
                </span>
                <Video size={18} className="opacity-80" />
              </div>
              <div className="relative z-10">
                <h3 className="text-lg font-bold leading-tight mb-1">Hifz Revision - Grp B</h3>
                <div className="flex items-center gap-2 text-[13px] font-medium opacity-90">
                  <Clock size={14} /> 10:00 - 11:00 AM
                </div>
              </div>
              <div className="flex items-center gap-2 text-[13px] font-bold relative z-10">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <User size={12} />
                </div>
                Ustadha Aisha
              </div>
              <button className="w-full h-10 bg-white text-primary rounded-lg font-bold text-[13px] hover:bg-slate-50 transition-all active:scale-[0.98] relative z-10">
                Join Class
              </button>
            </div>

            {/* Weekly Overview */}
            <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-bold text-foreground">Weekly Overview</h3>
                <BarChart2 size={18} className="text-muted-foreground" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Total", val: "12" },
                  { label: "Completed", val: "3" },
                  { label: "Remaining", val: "9" },
                  { label: "Attendance", val: "100%", color: "text-emerald-600" }
                ].map((stat, i) => (
                  <div key={i} className="bg-slate-50 border border-border/50 p-3 rounded-lg flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</span>
                    <span className={cn("text-xl font-bold text-foreground", stat.color)}>{stat.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Actions */}
            <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-bold text-foreground">Pending Actions</h3>
                <span className="bg-amber-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold">1</span>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                    <CalendarClock size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-foreground">Makeup Request</span>
                    <p className="text-[11px] font-semibold text-muted-foreground leading-relaxed mt-0.5">
                      Tajweed Rules • Waiting for admin approval
                    </p>
                  </div>
                </div>
                <div className="h-px bg-border w-full" />
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    <ClipboardCheck size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-foreground">Submit Assignment</span>
                    <p className="text-[11px] font-semibold text-muted-foreground leading-relaxed mt-0.5">
                      Due tomorrow at 11:59 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

        </main>
      </div>
    </div>
  );
}
