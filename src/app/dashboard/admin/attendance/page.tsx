"use client";

import React, { useState } from "react";
import { 
  Users, 
  UserCheck, 
  UserX, 
  Clock, 
  Download, 
  Calendar, 
  ChevronDown, 
  Search,
  User,
  Edit2,
  X
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function AttendanceTracker() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { 
      label: "Expected Today", 
      value: "1,248", 
      icon: Users, 
      footerText: "Total scheduled students", 
      trendType: "neutral" 
    },
    { 
      label: "Present", 
      value: "1,170", 
      icon: UserCheck, 
      footerText: "94% Attendance Rate", 
      trendType: "positive" 
    },
    { 
      label: "Absent", 
      value: "45", 
      icon: UserX, 
      footerText: "Requires Follow-up", 
      trendType: "negative" 
    },
    { 
      label: "Late Joined", 
      value: "33", 
      icon: Clock, 
      footerText: "Past 5 minutes mark", 
      trendType: "warning" 
    },
  ];

  const attendanceRecords = [
    {
      id: "#STU-1042",
      name: "Ahmed Raza",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FSouth%20Asian%2F1",
      className: "Hifz Group A",
      teacher: "Ustadha Aisha",
      time: "08:00 AM",
      duration: "45 mins",
      status: "Present",
    },
    {
      id: "#STU-1089",
      name: "Zainab Ali",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F13-17%2FMiddle%20Eastern%2F2",
      className: "Tajweed Fundamentals",
      teacher: "Hafiz Rahman",
      time: "09:30 AM",
      duration: "60 mins",
      status: "Late",
    },
    {
      id: "#STU-1102",
      name: "Muhammad Aslam",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F25-35%2FAfrican%2F4",
      className: "Islamic Studies 101",
      teacher: "Sheikh Umar",
      time: "11:00 AM",
      duration: "30 mins",
      status: "Absent",
    },
    {
      id: "#STU-1205",
      name: "Fatima Noor",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F18-25%2FSouth%20Asian%2F3",
      className: "Quran Recitation",
      teacher: "Hafiz Usman",
      time: "02:00 PM",
      duration: "45 mins",
      status: "Present",
    },
    {
      id: "#STU-1299",
      name: "Ali Khan",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FMiddle%20Eastern%2F5",
      className: "Hifz Group B",
      teacher: "Ustadha Aisha",
      time: "03:30 PM",
      duration: "45 mins",
      status: "Present",
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Present":
        return <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-full text-[11px] font-bold uppercase bg-emerald-500/10 text-emerald-600">Present</span>;
      case "Absent":
        return <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-full text-[11px] font-bold uppercase bg-rose-500/10 text-rose-600">Absent</span>;
      case "Late":
        return <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-full text-[11px] font-bold uppercase bg-amber-500/10 text-amber-600">Late</span>;
      default:
        return <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-full text-[11px] font-bold uppercase bg-muted text-muted-foreground">{status}</span>;
    }
  };

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
          title="Attendance Tracker" 
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
              <h2 className="text-[22px] font-bold text-foreground mb-1">Daily Attendance Record</h2>
              <p className="text-sm text-muted-foreground font-medium">Monitor and manage student and teacher attendance across all active sessions.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="h-10 px-4 bg-card border border-border text-foreground rounded-md text-sm font-semibold flex items-center gap-2 hover:bg-muted transition-colors shadow-sm">
                <Download size={16} />
                Export Logs
              </button>
              <button className="h-10 px-4 bg-card border border-border text-foreground rounded-md text-sm font-semibold flex items-center gap-2 hover:bg-muted transition-colors shadow-sm">
                <Calendar size={16} className="text-muted-foreground" />
                <span>Today, Oct 24</span>
                <ChevronDown size={16} className="text-muted-foreground ml-1" />
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
            {stats.map((stat, i) => (
              <div key={i} className="p-4 bg-card border border-border rounded-xl flex flex-col shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                    <span className="text-[26px] font-bold leading-none mt-1 text-foreground">
                      {stat.value}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-md flex items-center justify-center shrink-0 bg-primary/10 text-primary">
                    <stat.icon size={20} />
                  </div>
                </div>
                <div className="pt-3 border-t border-border mt-auto">
                  <span className={cn(
                    "inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full",
                    stat.trendType === "positive" && "bg-emerald-500/10 text-emerald-600",
                    stat.trendType === "negative" && "bg-rose-500/10 text-rose-600",
                    stat.trendType === "warning" && "bg-amber-500/10 text-amber-600",
                    stat.trendType === "neutral" && "bg-muted text-muted-foreground"
                  )}>
                    {stat.footerText}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Main Attendance Area */}
          <div className="flex-1 flex flex-col gap-4 min-h-0">
            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <div className="relative flex items-center w-full sm:w-[300px] h-10 bg-card border border-border rounded-md shadow-sm">
                <Search size={18} className="text-muted-foreground ml-3 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search by student or ID..." 
                  className="flex-1 bg-transparent border-none outline-none px-2.5 text-sm text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="relative flex-1 sm:max-w-[200px]">
                <select className="w-full h-10 px-4 pr-10 bg-card border border-border rounded-md text-sm font-medium text-foreground appearance-none shadow-sm cursor-pointer outline-none focus:border-primary">
                  <option>All Classes</option>
                  <option>Hifz Group A</option>
                  <option>Tajweed Fundamentals</option>
                  <option>Islamic Studies 101</option>
                  <option>Quran Recitation</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
              <div className="relative flex-1 sm:max-w-[160px]">
                <select className="w-full h-10 px-4 pr-10 bg-card border border-border rounded-md text-sm font-medium text-foreground appearance-none shadow-sm cursor-pointer outline-none focus:border-primary">
                  <option>All Statuses</option>
                  <option>Present</option>
                  <option>Absent</option>
                  <option>Late</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Table Container */}
            <div className="flex-1 bg-card border border-border rounded-xl shadow-sm flex flex-col overflow-hidden min-h-[300px]">
              <div className="overflow-x-auto flex-1 custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr>
                      <th className="sticky top-0 bg-muted z-10 p-4 border-b border-border text-xs font-bold text-muted-foreground uppercase tracking-wider">Student Details</th>
                      <th className="sticky top-0 bg-muted z-10 p-4 border-b border-border text-xs font-bold text-muted-foreground uppercase tracking-wider">Class & Teacher</th>
                      <th className="sticky top-0 bg-muted z-10 p-4 border-b border-border text-xs font-bold text-muted-foreground uppercase tracking-wider">Time Slot</th>
                      <th className="sticky top-0 bg-muted z-10 p-4 border-b border-border text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                      <th className="sticky top-0 bg-muted z-10 p-4 border-b border-border text-xs font-bold text-muted-foreground uppercase tracking-wider w-[100px]">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceRecords.map((record, i) => (
                      <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors group">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={record.avatar} alt={record.name} className="w-9 h-9 rounded-full object-cover bg-input shrink-0" />
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-foreground">{record.name}</span>
                              <span className="text-xs text-muted-foreground mt-0.5">{record.id}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-foreground">{record.className}</span>
                            <span className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                              <User size={12} />
                              {record.teacher}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-foreground">{record.time}</span>
                            <span className="text-xs text-muted-foreground mt-0.5">{record.duration}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          {getStatusBadge(record.status)}
                        </td>
                        <td className="p-4">
                          <button className="inline-flex items-center gap-1.5 text-[13px] font-bold text-primary hover:text-primary/80 transition-colors">
                            <Edit2 size={16} />
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
