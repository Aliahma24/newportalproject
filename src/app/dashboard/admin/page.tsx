"use client";

import React, { useState } from "react";
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  MoreHorizontal, 
  UserPlus, 
  CalendarPlus,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  Calendar,
  ChevronDown,
  User,
  Clock,
  FileText,
  X
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function AdminDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { 
      label: "Total Students", 
      value: "1,248", 
      icon: Users, 
      trend: "+12.5%", 
      trendType: "positive",
      comparison: "vs last month"
    },
    { 
      label: "Total Teachers", 
      value: "42", 
      icon: GraduationCap, 
      trend: "+2.4%", 
      trendType: "positive",
      comparison: "vs last month"
    },
    { 
      label: "Active Classes", 
      value: "18", 
      icon: BookOpen, 
      trend: "0.0%", 
      trendType: "neutral",
      comparison: "vs last month"
    },
    { 
      label: "Attendance %", 
      value: "94%", 
      icon: CheckCircle2, 
      trend: "-1.2%", 
      trendType: "negative",
      comparison: "vs last week"
    },
  ];

  const upcomingClasses = [
    {
      time: "10:00 AM",
      duration: "45 mins",
      name: "Hifz Revision - Group B",
      teacher: "Ustadha Aisha",
      status: "ongoing",
      active: true
    },
    {
      time: "11:30 AM",
      duration: "60 mins",
      name: "Tajweed Fundamentals",
      teacher: "Hafiz Rahman",
      status: "next",
      active: false
    },
    {
      time: "02:00 PM",
      duration: "30 mins",
      name: "Islamic Studies 101",
      teacher: "Sheikh Umar",
      status: "upcoming",
      active: false
    },
  ];

  const activities = [
    { 
      user: "Hafiz Rahman", 
      action: "created a new class", 
      target: "Hifz Room A", 
      time: "12 mins ago",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FMiddle%20Eastern%2F1"
    },
    { 
      user: "Ustadha Fatima", 
      action: "marked attendance for", 
      target: "Tajweed Class", 
      time: "1 hour ago",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F2"
    },
    { 
      user: "Admin", 
      action: "added a new student", 
      target: "Zainab Ali", 
      time: "3 hours ago",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F25-35%2FAfrican%2F3"
    },
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden md:flex w-64" />

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-72 h-full animate-in slide-in-from-left duration-300">
            <Sidebar className="w-full" />
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
        <Navbar title="Dashboard" onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar">
          
          {/* Greeting Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
               <h2 className="text-2xl font-bold text-foreground">Welcome back, Admin! 👋</h2>
               <p className="text-sm text-muted-foreground font-medium">Here's what's happening today in Taleem ul Quran.</p>
            </div>
            <div className="flex items-center gap-3">
               <button className="h-10 px-4 rounded-lg bg-card border border-border text-sm font-bold flex items-center gap-2 hover:bg-muted transition-all">
                  <Download size={16} />
                  Export Report
               </button>
               <button className="h-10 px-4 rounded-lg bg-card border border-border text-sm font-bold flex items-center gap-2 hover:bg-muted transition-all">
                  <Calendar size={16} className="text-muted-foreground" />
                  <span>Today, Oct 24</span>
                  <ChevronDown size={16} className="text-muted-foreground" />
               </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                    <h3 className="text-[26px] font-bold text-foreground leading-none tracking-tight">{stat.value}</h3>
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <stat.icon size={20} />
                  </div>
                </div>
                <div className="pt-4 border-t border-border flex items-center gap-2">
                   <div className={cn(
                      "flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-bold",
                      stat.trendType === "positive" && "bg-emerald-500/10 text-emerald-600",
                      stat.trendType === "negative" && "bg-rose-500/10 text-rose-600",
                      stat.trendType === "neutral" && "bg-muted text-muted-foreground"
                   )}>
                      {stat.trendType === "positive" && <TrendingUp size={12} />}
                      {stat.trendType === "negative" && <TrendingDown size={12} />}
                      {stat.trendType === "neutral" && <Minus size={12} />}
                      {stat.trend}
                   </div>
                   <span className="text-xs text-muted-foreground font-medium">{stat.comparison}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Enrollment Insights Panel (Replaces Graph) */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-bold text-foreground">Enrollment Insights</h3>
                  <p className="text-xs text-muted-foreground font-medium">Growth metrics and distribution</p>
                </div>
                <div className="flex items-center gap-2">
                   <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                      +12% Growth
                   </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                 <div className="p-4 rounded-xl bg-slate-50 border border-border text-center group hover:border-primary transition-all">
                    <div className="text-2xl font-black text-foreground">08</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Today</div>
                 </div>
                 <div className="p-4 rounded-xl bg-slate-50 border border-border text-center group hover:border-primary transition-all">
                    <div className="text-2xl font-black text-primary">42</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase mt-1">This Week</div>
                 </div>
                 <div className="p-4 rounded-xl bg-slate-50 border border-border text-center group hover:border-primary transition-all">
                    <div className="text-2xl font-black text-foreground">156</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase mt-1">This Month</div>
                 </div>
              </div>

              <div className="space-y-5">
                 <div>
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider mb-2">
                       <span className="text-muted-foreground">Beginner Level</span>
                       <span className="text-foreground">60%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-primary w-[60%] rounded-full" />
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider mb-2">
                       <span className="text-muted-foreground">Intermediate</span>
                       <span className="text-foreground">25%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-amber-500 w-[25%] rounded-full" />
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider mb-2">
                       <span className="text-muted-foreground">Advanced (Hifz)</span>
                       <span className="text-foreground">15%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 w-[15%] rounded-full" />
                    </div>
                 </div>
              </div>
            </div>

            {/* Attendance Overview Chart */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="font-bold text-foreground">Attendance Overview</h3>
                  <p className="text-xs text-muted-foreground font-medium">Daily averages for this week</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
                   <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-sm bg-primary" /> Present</div>
                   <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-sm bg-muted" /> Absent</div>
                </div>
              </div>
              <div className="flex h-48 gap-3">
                 <div className="flex flex-col justify-between text-[11px] font-bold text-muted-foreground/60 text-right w-10 pb-6">
                    <span>100%</span><span>75%</span><span>50%</span><span>25%</span>
                 </div>
                 <div className="flex-1 flex flex-col">
                    <div className="flex-1 flex items-end justify-between gap-3 mb-6 relative">
                       {/* Grid lines */}
                       <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                          <div className="w-full border-t border-dashed border-border mt-[25%]" />
                          <div className="w-full border-t border-dashed border-border mt-[25%]" />
                          <div className="w-full border-t border-dashed border-border mt-[25%]" />
                       </div>
                       {[92, 95, 90, 96, 88, 94].map((height, i) => (
                         <div key={i} className="flex-1 group relative h-full flex flex-col justify-end z-10">
                           <div className="w-full bg-muted rounded-t-md overflow-hidden h-full relative">
                              <div className="absolute bottom-0 left-0 right-0 bg-primary transition-all duration-500" style={{ height: `${height}%` }} />
                           </div>
                         </div>
                       ))}
                    </div>
                    <div className="flex justify-between text-[11px] font-bold text-muted-foreground/60 uppercase">
                       <span className="flex-1 text-center">Mon</span>
                       <span className="flex-1 text-center">Tue</span>
                       <span className="flex-1 text-center">Wed</span>
                       <span className="flex-1 text-center">Thu</span>
                       <span className="flex-1 text-center">Fri</span>
                       <span className="flex-1 text-center">Sat</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6 flex flex-col">
              <h3 className="font-bold text-foreground">Quick Actions</h3>
              <div className="space-y-3 flex-1">
                <button className="w-full flex items-center gap-3.5 p-3 rounded-lg bg-primary text-primary-foreground font-bold text-[13px] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                  <div className="h-8 w-8 rounded-md bg-white/20 flex items-center justify-center">
                    <UserPlus size={18} />
                  </div>
                  Add New Student
                </button>
                <button className="w-full flex items-center gap-3.5 p-3 rounded-lg bg-card border border-border text-foreground font-bold text-[13px] hover:bg-muted transition-all">
                  <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center text-primary">
                    <CalendarPlus size={18} />
                  </div>
                  Create Class
                </button>
                <button className="w-full flex items-center gap-3.5 p-3 rounded-lg bg-card border border-border text-foreground font-bold text-[13px] hover:bg-muted transition-all">
                  <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center text-primary">
                    <FileText size={18} />
                  </div>
                  Generate Report
                </button>
              </div>
            </div>

            {/* Upcoming Classes */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6 flex flex-col">
              <div className="flex items-center justify-between">
                 <h3 className="font-bold text-foreground">Upcoming Classes</h3>
                 <button className="text-[12px] font-bold text-primary hover:underline transition-all">View Schedule</button>
              </div>
              <div className="space-y-3 flex-1">
                 {upcomingClasses.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border group hover:border-primary/30 transition-all">
                       <div className="text-right min-w-[60px]">
                          <div className="text-[13px] font-bold text-foreground leading-none">{item.time}</div>
                          <div className="text-[10px] font-semibold text-muted-foreground mt-1">{item.duration}</div>
                       </div>
                       <div className={cn(
                          "w-0.5 h-8 rounded-full",
                          item.active ? "bg-primary" : "bg-border"
                       )} />
                       <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-bold text-foreground truncate">{item.name}</div>
                          <div className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground mt-1">
                             <User size={12} />
                             {item.teacher}
                          </div>
                       </div>
                       {item.status === "ongoing" && (
                          <div className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wide">Ongoing</div>
                       )}
                       {item.status === "next" && (
                          <div className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] font-bold uppercase tracking-wide">Next</div>
                       )}
                    </div>
                 ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6 flex flex-col">
               <div className="flex items-center justify-between">
                 <h3 className="font-bold text-foreground">Recent Activity</h3>
                 <button className="text-[12px] font-bold text-primary hover:underline transition-all">View All</button>
              </div>
              <div className="space-y-6 flex-1">
                {activities.map((activity, i) => (
                  <div key={i} className="flex items-start justify-between gap-3 group">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="h-8 w-8 rounded-full overflow-hidden border border-border bg-muted shrink-0 mt-0.5">
                        <img src={activity.avatar} alt={activity.user} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-foreground leading-snug line-clamp-2">
                          <span className="font-bold">{activity.user}</span> {activity.action} <span className="font-bold text-primary">{activity.target}</span>
                        </p>
                        <p className="text-[11px] font-semibold text-muted-foreground mt-1.5">{activity.time}</p>
                      </div>
                    </div>
                    <button className="text-[12px] font-bold text-primary hover:underline shrink-0">
                      View
                    </button>
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
