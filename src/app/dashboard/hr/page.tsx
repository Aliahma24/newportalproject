"use client";

import React, { useState } from "react";
import { 
  Users, 
  BookOpen, 
  CalendarOff, 
  Briefcase, 
  TrendingUp, 
  BarChart2, 
  CalendarClock, 
  Calendar, 
  Check,
  X
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function HRDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const summaryCards = [
    {
      title: "Total Staff",
      value: "42",
      icon: Users,
      trend: "+3",
      trendLabel: "Since last month",
      trendColor: "text-emerald-500",
      trendIcon: TrendingUp
    },
    {
      title: "Active Teachers",
      value: "28",
      icon: BookOpen,
      trendLabel: "Across 45 active classes",
      trendColor: "text-muted-foreground",
    },
    {
      title: "Staff On Leave",
      value: "2",
      icon: CalendarOff,
      trendLabel: "Returning next week",
      trendColor: "text-muted-foreground",
    },
    {
      title: "Open Roles",
      value: "3",
      icon: Briefcase,
      trendLabel: "Active recruitment",
      trendColor: "text-primary font-bold",
    }
  ];

  const attendanceData = [
    { day: "15", value: 98 },
    { day: "16", value: 95 },
    { day: "17", value: 96 },
    { day: "18", value: 92 },
    { day: "19", value: 99 },
    { day: "20", value: 94 },
    { day: "21", value: 88 },
    { day: "22", value: 97 },
    { day: "23", value: 95 },
    { day: "24", value: 93 },
  ];

  const leaveRequests = [
    {
      id: 1,
      name: "Ustadh Bilal",
      role: "Tajweed Instructor",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F25-35%2FMiddle%20Eastern%2F3",
      dates: "Oct 25, 2023 — Oct 27, 2023 (3 Days)",
      type: "Sick Leave:",
      reason: "Down with severe flu and fever. Unable to conduct live voice sessions. Needs cover for Group A & Group C."
    },
    {
      id: 2,
      name: "Fatima Ali",
      role: "Administrative Assistant",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F4",
      dates: "Nov 01, 2023 — Nov 05, 2023 (5 Days)",
      type: "Annual Leave:",
      reason: "Planned family trip out of the city. All pending administrative tasks are documented and handed over."
    }
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <Sidebar role="hr" className="hidden md:flex w-64 shrink-0" />

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-72 h-full animate-in slide-in-from-left duration-300">
            <Sidebar role="hr" className="w-full" />
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
          title="HR Control Panel" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Yusuf Ahmed"
          userRole="HR Director"
          userAvatar="https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FSouth%20Asian%2F2"
          hideSearch
        />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar">
          
          {/* ROW 1: Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {summaryCards.map((card, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6 flex flex-col justify-between shadow-sm min-h-[140px] hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wide">{card.title}</div>
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-foreground">
                    <card.icon size={18} />
                  </div>
                </div>
                <div>
                  <div className="text-[34px] font-bold text-foreground leading-none tracking-tight mb-2">{card.value}</div>
                  <div className="flex items-center gap-1.5 text-[13px] font-semibold text-muted-foreground">
                    {card.trend && (
                      <span className={cn("flex items-center gap-1", card.trendColor)}>
                        {card.trendIcon && <card.trendIcon size={14} />}
                        {card.trend}
                      </span>
                    )}
                    <span className={!card.trend ? card.trendColor : ""}>{card.trendLabel}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ROW 2: Bar Chart */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="text-[15px] font-bold text-foreground flex items-center gap-2.5">
                <BarChart2 size={16} className="text-primary" />
                Staff Attendance Overview (Last 10 Days)
              </div>
              <div className="bg-muted px-2.5 py-1 rounded text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
                Avg: 94%
              </div>
            </div>

            <div className="flex-1 flex items-end justify-between px-2 sm:px-10 mt-6 min-h-[160px] h-[160px]">
              {attendanceData.map((data, i) => (
                <div key={i} className="flex flex-col items-center justify-end h-full w-8 sm:w-11 group">
                  <div className="text-xs font-bold text-muted-foreground mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {data.value}%
                  </div>
                  <div className="w-full bg-muted rounded-t-md overflow-hidden h-[120px] relative">
                    <div 
                      className="absolute bottom-0 left-0 w-full bg-slate-800 rounded-t-sm transition-all duration-500 ease-out group-hover:bg-primary" 
                      style={{ height: `${data.value}%` }} 
                    />
                  </div>
                  <div className="text-xs font-bold text-muted-foreground mt-2.5">{data.day}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ROW 3: Leave Requests */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="text-[15px] font-bold text-foreground flex items-center gap-2.5">
                <CalendarClock size={16} className="text-primary" />
                Pending Leave Requests
              </div>
              <div className="bg-amber-500/10 text-amber-600 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide">
                2 Action Required
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {leaveRequests.map((leave) => (
                <div key={leave.id} className="border border-border rounded-xl p-5 flex flex-col bg-background hover:border-primary/30 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={leave.avatar} 
                        alt={leave.name} 
                        className="w-11 h-11 rounded-full object-cover bg-muted border-2 border-card"
                      />
                      <div>
                        <div className="text-[15px] font-bold text-foreground leading-tight">{leave.name}</div>
                        <div className="text-xs font-semibold text-muted-foreground mt-0.5">{leave.role}</div>
                      </div>
                    </div>
                    <span className="bg-amber-500/10 text-amber-600 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide">Pending</span>
                  </div>

                  <div className="bg-card border border-border p-2.5 rounded-md text-[13px] font-bold text-foreground flex items-center gap-2 mb-3">
                    <Calendar size={16} className="text-muted-foreground" />
                    {leave.dates}
                  </div>

                  <div className="text-[13px] text-muted-foreground leading-relaxed font-medium mb-5 line-clamp-2 flex-1">
                    <strong className="text-foreground mr-1">{leave.type}</strong>
                    {leave.reason}
                  </div>

                  <div className="flex gap-3 mt-auto">
                    <button className="flex-1 h-10 rounded-md border border-border text-foreground font-bold text-sm hover:bg-muted transition-all">
                      Deny
                    </button>
                    <button className="flex-1 h-10 rounded-md bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-1.5 hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
                      <Check size={16} />
                      Approve Request
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
