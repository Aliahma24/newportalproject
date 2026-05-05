"use client";

import React, { useState } from "react";
import { 
  BookOpen, 
  CheckCircle2, 
  Radio, 
  Clock, 
  Filter, 
  Calendar, 
  ChevronDown, 
  Users, 
  Video,
  X
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function ScheduleBoard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { label: "Total Classes", value: "48", icon: BookOpen, colorClass: "bg-primary/10 text-primary" },
    { label: "Completed", value: "12", icon: CheckCircle2, colorClass: "bg-emerald-500/10 text-emerald-500" },
    { label: "Live Now", value: "4", icon: Radio, colorClass: "bg-transparent text-primary", valueColor: "text-primary" },
    { label: "Upcoming", value: "32", icon: Clock, colorClass: "bg-muted text-muted-foreground" },
  ];

  const completedClasses = [
    {
      time: "08:00 AM - 08:45 AM",
      title: "Hifz Room A",
      students: 15,
      room: "Zoom Room 1",
      teacherName: "Hafiz Rahman",
      teacherAvatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FMiddle%20Eastern%2F1",
    },
    {
      time: "09:00 AM - 09:45 AM",
      title: "Tajweed Basics",
      students: 18,
      room: "Zoom Room 2",
      teacherName: "Ustadha Fatima",
      teacherAvatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F2",
    },
    {
      time: "09:30 AM - 10:00 AM",
      title: "Noorani Qaida",
      students: 22,
      room: "Zoom Room 4",
      teacherName: "Sheikh Umar",
      teacherAvatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F50-65%2FAfrican%2F3",
    }
  ];

  const liveClasses = [
    {
      time: "10:00 AM - 10:45 AM",
      title: "Hifz Revision - Group B",
      students: 12,
      room: "Zoom Room 3",
      teacherName: "Ustadha Aisha",
      teacherAvatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F18-25%2FAfrican%2F4",
    },
    {
      time: "10:00 AM - 11:00 AM",
      title: "Advanced Tajweed",
      students: 8,
      room: "Zoom Room 1",
      teacherName: "Hafiz Rahman",
      teacherAvatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FMiddle%20Eastern%2F1",
    }
  ];

  const upcomingClasses = [
    {
      time: "11:30 AM - 12:30 PM",
      title: "Islamic Studies 101",
      students: 24,
      room: "Zoom Room 2",
      teacherName: "Sheikh Umar",
      teacherAvatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F50-65%2FAfrican%2F3",
    },
    {
      time: "02:00 PM - 02:45 PM",
      title: "Noorani Qaida - Kids",
      students: 10,
      room: "Zoom Room 5",
      teacherName: "Ustadha Fatima",
      teacherAvatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F2",
    },
    {
      time: "03:00 PM - 04:00 PM",
      title: "Weekend Hifz Prep",
      students: 16,
      room: "Zoom Room 1",
      teacherName: "Hafiz Rahman",
      teacherAvatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FMiddle%20Eastern%2F1",
    },
    {
      time: "05:00 PM - 06:00 PM",
      title: "Adult Tajweed",
      students: 14,
      room: "Zoom Room 3",
      teacherName: "Ustadha Aisha",
      teacherAvatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F18-25%2FAfrican%2F4",
    }
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <Sidebar role="admin" className="hidden md:flex w-64 shrink-0" />

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-72 h-full animate-in slide-in-from-left duration-300">
            <Sidebar role="admin" className="w-full" />
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
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar 
          title="Today's Schedule" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Admin User"
          userRole="Super Administrator"
          userAvatar="https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FMiddle%20Eastern%2F9"
          searchPlaceholder="Search students, classes, or teachers..."
        />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar flex flex-col">
          
          {/* Greeting Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
            <div>
              <h2 className="text-[22px] font-bold text-foreground mb-1">Today's Schedule 📅</h2>
              <p className="text-sm text-muted-foreground font-medium">Thursday, October 24, 2026</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="h-10 px-4 bg-card border border-border text-foreground rounded-md text-sm font-semibold flex items-center gap-2 hover:bg-muted transition-colors">
                <Filter size={16} />
                Filter by Teacher
              </button>
              <button className="h-10 px-4 bg-card border border-border text-foreground rounded-md text-sm font-semibold flex items-center gap-2 hover:bg-muted transition-colors">
                <Calendar size={16} className="text-muted-foreground" />
                <span>Today, Oct 24</span>
                <ChevronDown size={16} className="text-muted-foreground ml-1" />
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
            {stats.map((stat, i) => (
              <div key={i} className="p-4 bg-card border border-border rounded-xl flex items-start justify-between shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                  <span className={cn("text-[26px] font-bold leading-none mt-1", stat.valueColor || "text-foreground")}>
                    {stat.value}
                  </span>
                </div>
                <div className={cn("w-10 h-10 rounded-md flex items-center justify-center shrink-0", stat.colorClass)}>
                  <stat.icon size={20} />
                </div>
              </div>
            ))}
          </div>

          {/* Schedule Board */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
            
            {/* Column 1: Completed */}
            <div className="bg-card border border-border rounded-xl flex flex-col overflow-hidden min-h-[400px]">
              <div className="p-4 bg-background border-b border-border flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <CheckCircle2 size={16} className="text-foreground" />
                  Completed
                  <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-full text-[11px] font-bold">12</span>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col gap-3">
                {completedClasses.map((cls, i) => (
                  <div key={i} className="border border-border rounded-lg bg-card p-4 flex flex-col gap-3.5 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                        <Clock size={14} />
                        {cls.time}
                      </div>
                      <span className="bg-muted text-muted-foreground px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">Completed</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground mb-1">{cls.title}</div>
                      <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground">
                        <div className="flex items-center gap-1.5"><Users size={14} /> {cls.students} Students</div>
                        <div className="flex items-center gap-1.5"><Video size={14} /> {cls.room}</div>
                      </div>
                    </div>
                    <div className="pt-3.5 border-t border-border flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        <img src={cls.teacherAvatar} alt="Teacher" className="w-6 h-6 rounded-full object-cover" />
                        <span className="text-xs font-semibold text-foreground">{cls.teacherName}</span>
                      </div>
                      <button className="bg-card border border-border px-3 py-1.5 rounded text-[11px] font-bold text-foreground hover:bg-muted transition-colors">
                        View Log
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Live Now */}
            <div className="bg-card border border-border rounded-xl flex flex-col overflow-hidden min-h-[400px]">
              <div className="p-4 bg-background border-b border-border flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 text-sm font-bold text-primary">
                  <Radio size={16} />
                  Live Now
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[11px] font-bold">4</span>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col gap-3">
                {liveClasses.map((cls, i) => (
                  <div key={i} className="border border-primary bg-primary/5 rounded-lg p-4 flex flex-col gap-3.5 shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-start relative z-10">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                        <Radio size={14} />
                        {cls.time}
                      </div>
                      <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider animate-pulse shadow-sm">Live Now</span>
                    </div>
                    <div className="relative z-10">
                      <div className="text-sm font-bold text-foreground mb-1">{cls.title}</div>
                      <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground">
                        <div className="flex items-center gap-1.5"><Users size={14} /> {cls.students} Students</div>
                        <div className="flex items-center gap-1.5"><Video size={14} /> {cls.room}</div>
                      </div>
                    </div>
                    <div className="pt-3.5 border-t border-border flex items-center justify-between mt-auto relative z-10">
                      <div className="flex items-center gap-2">
                        <img src={cls.teacherAvatar} alt="Teacher" className="w-6 h-6 rounded-full object-cover" />
                        <span className="text-xs font-semibold text-foreground">{cls.teacherName}</span>
                      </div>
                      <button className="bg-primary border border-primary px-3 py-1.5 rounded text-[11px] font-bold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm">
                        Monitor Class
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Upcoming */}
            <div className="bg-card border border-border rounded-xl flex flex-col overflow-hidden min-h-[400px]">
              <div className="p-4 bg-background border-b border-border flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <Clock size={16} />
                  Upcoming
                  <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-full text-[11px] font-bold">32</span>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col gap-3">
                {upcomingClasses.map((cls, i) => (
                  <div key={i} className="border border-border rounded-lg bg-card p-4 flex flex-col gap-3.5 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                        <Clock size={14} />
                        {cls.time}
                      </div>
                      <span className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">Upcoming</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground mb-1">{cls.title}</div>
                      <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground">
                        <div className="flex items-center gap-1.5"><Users size={14} /> {cls.students} Students</div>
                        <div className="flex items-center gap-1.5"><Video size={14} /> {cls.room}</div>
                      </div>
                    </div>
                    <div className="pt-3.5 border-t border-border flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        <img src={cls.teacherAvatar} alt="Teacher" className="w-6 h-6 rounded-full object-cover" />
                        <span className="text-xs font-semibold text-foreground">{cls.teacherName}</span>
                      </div>
                      <button className="bg-card border border-border px-3 py-1.5 rounded text-[11px] font-bold text-foreground hover:bg-muted transition-colors">
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
