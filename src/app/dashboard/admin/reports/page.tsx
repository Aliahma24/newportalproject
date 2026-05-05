"use client";

import React, { useState } from "react";
import { 
  Calendar, 
  ChevronDown, 
  User, 
  Users, 
  BookOpen, 
  FileSpreadsheet, 
  FileText,
  MoreHorizontal,
  Star,
  X
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function ReportsAnalytics() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const teacherPerformance = [
    {
      name: "Hafiz Usman",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FMiddle%20Eastern%2F3",
      attendance: "98%",
      rating: "4.9",
      complaints: 0,
    },
    {
      name: "Ustadha Fatima",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FMiddle%20Eastern%2F2",
      attendance: "96%",
      rating: "4.8",
      complaints: 0,
    },
    {
      name: "Qari Ahmed",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F25-35%2FSouth%20Asian%2F5",
      attendance: "88%",
      rating: "4.2",
      complaints: 2,
    },
    {
      name: "Ustadh Ali",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FAfrican%2F1",
      attendance: "92%",
      rating: "4.5",
      complaints: 1,
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
          title="Reports & Analytics" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Admin User"
          userRole="Super Administrator"
          userAvatar="https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FMiddle%20Eastern%2F9"
          hideSearch={true}
        />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar flex flex-col">
          
          {/* Filters Row */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 shrink-0">
            <div className="flex flex-wrap gap-3">
              <button className="h-10 px-4 bg-card border border-border text-foreground rounded-md text-sm font-semibold flex items-center gap-2 hover:bg-muted transition-colors shadow-sm">
                <Calendar size={16} className="text-muted-foreground" />
                <span>Last 6 Months</span>
                <ChevronDown size={16} className="text-muted-foreground ml-1" />
              </button>
              <button className="h-10 px-4 bg-card border border-border text-foreground rounded-md text-sm font-semibold flex items-center gap-2 hover:bg-muted transition-colors shadow-sm">
                <User size={16} className="text-muted-foreground" />
                <span>All Teachers</span>
                <ChevronDown size={16} className="text-muted-foreground ml-1" />
              </button>
              <button className="h-10 px-4 bg-card border border-border text-foreground rounded-md text-sm font-semibold flex items-center gap-2 hover:bg-muted transition-colors shadow-sm">
                <Users size={16} className="text-muted-foreground" />
                <span>All Students</span>
                <ChevronDown size={16} className="text-muted-foreground ml-1" />
              </button>
              <button className="h-10 px-4 bg-card border border-border text-foreground rounded-md text-sm font-semibold flex items-center gap-2 hover:bg-muted transition-colors shadow-sm">
                <BookOpen size={16} className="text-muted-foreground" />
                <span>All Courses</span>
                <ChevronDown size={16} className="text-muted-foreground ml-1" />
              </button>
            </div>
            
            <div className="flex gap-3">
              <button className="h-10 px-4 bg-transparent border border-primary text-primary rounded-md text-sm font-bold flex items-center gap-2 hover:bg-primary/5 transition-colors">
                <FileSpreadsheet size={18} />
                Export Excel
              </button>
              <button className="h-10 px-4 bg-transparent border border-primary text-primary rounded-md text-sm font-bold flex items-center gap-2 hover:bg-primary/5 transition-colors">
                <FileText size={18} />
                Export PDF
              </button>
            </div>
          </div>

          {/* ROW 1: Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 shrink-0">
            {/* Revenue Report */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col h-[320px]">
              <div className="flex justify-between items-start mb-6 shrink-0">
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-bold text-foreground">Revenue Report</h3>
                  <p className="text-xs text-muted-foreground font-medium">Monthly revenue trends</p>
                </div>
                <div className="text-xl font-bold text-primary">$42,500</div>
              </div>
              <div className="flex-1 flex flex-col relative min-h-0">
                <div className="flex-1 relative mb-3">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
                    {/* Grid lines */}
                    <line x1="0" y1="25" x2="100" y2="25" stroke="currentColor" strokeDasharray="2,2" strokeWidth="1" vectorEffect="non-scaling-stroke" className="text-border" />
                    <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeDasharray="2,2" strokeWidth="1" vectorEffect="non-scaling-stroke" className="text-border" />
                    <line x1="0" y1="75" x2="100" y2="75" stroke="currentColor" strokeDasharray="2,2" strokeWidth="1" vectorEffect="non-scaling-stroke" className="text-border" />
                    {/* Fill & Line */}
                    <path d="M0,80 L20,65 L40,70 L60,45 L80,30 L100,15 L100,100 L0,100 Z" fill="rgba(166, 124, 50, 0.08)" />
                    <path d="M0,80 L20,65 L40,70 L60,45 L80,30 L100,15" fill="none" stroke="currentColor" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" className="text-primary" />
                  </svg>
                  {/* Data points */}
                  <div className="absolute w-2.5 h-2.5 bg-card border-2 border-primary rounded-full -translate-x-1/2 -translate-y-1/2" style={{ left: '0%', top: '80%' }} />
                  <div className="absolute w-2.5 h-2.5 bg-card border-2 border-primary rounded-full -translate-x-1/2 -translate-y-1/2" style={{ left: '20%', top: '65%' }} />
                  <div className="absolute w-2.5 h-2.5 bg-card border-2 border-primary rounded-full -translate-x-1/2 -translate-y-1/2" style={{ left: '40%', top: '70%' }} />
                  <div className="absolute w-2.5 h-2.5 bg-card border-2 border-primary rounded-full -translate-x-1/2 -translate-y-1/2" style={{ left: '60%', top: '45%' }} />
                  <div className="absolute w-2.5 h-2.5 bg-card border-2 border-primary rounded-full -translate-x-1/2 -translate-y-1/2" style={{ left: '80%', top: '30%' }} />
                  <div className="absolute w-2.5 h-2.5 bg-card border-2 border-primary rounded-full -translate-x-1/2 -translate-y-1/2" style={{ left: '100%', top: '15%' }} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground font-medium shrink-0">
                  <span className="w-6 text-left">Jan</span>
                  <span className="w-6 text-center">Feb</span>
                  <span className="w-6 text-center">Mar</span>
                  <span className="w-6 text-center">Apr</span>
                  <span className="w-6 text-center">May</span>
                  <span className="w-6 text-right">Jun</span>
                </div>
              </div>
            </div>

            {/* Student Enrollment */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col h-[320px]">
              <div className="flex justify-between items-start mb-6 shrink-0">
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-bold text-foreground">Student Enrollment</h3>
                  <p className="text-xs text-muted-foreground font-medium">New students joining per month</p>
                </div>
                <MoreHorizontal size={20} className="text-muted-foreground" />
              </div>
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 flex items-end justify-between gap-4 pb-3 min-h-0">
                  <div className="flex-1 h-full flex flex-col justify-end items-center">
                    <div className="w-full max-w-[36px] h-full bg-input rounded-t-sm relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-sm" style={{ height: '40%' }} />
                    </div>
                  </div>
                  <div className="flex-1 h-full flex flex-col justify-end items-center">
                    <div className="w-full max-w-[36px] h-full bg-input rounded-t-sm relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-sm" style={{ height: '55%' }} />
                    </div>
                  </div>
                  <div className="flex-1 h-full flex flex-col justify-end items-center">
                    <div className="w-full max-w-[36px] h-full bg-input rounded-t-sm relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-sm" style={{ height: '45%' }} />
                    </div>
                  </div>
                  <div className="flex-1 h-full flex flex-col justify-end items-center">
                    <div className="w-full max-w-[36px] h-full bg-input rounded-t-sm relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-sm" style={{ height: '70%' }} />
                    </div>
                  </div>
                  <div className="flex-1 h-full flex flex-col justify-end items-center">
                    <div className="w-full max-w-[36px] h-full bg-input rounded-t-sm relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-sm" style={{ height: '85%' }} />
                    </div>
                  </div>
                  <div className="flex-1 h-full flex flex-col justify-end items-center">
                    <div className="w-full max-w-[36px] h-full bg-input rounded-t-sm relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-sm" style={{ height: '100%' }} />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground font-medium shrink-0">
                  <span className="flex-1 text-center">Jan</span>
                  <span className="flex-1 text-center">Feb</span>
                  <span className="flex-1 text-center">Mar</span>
                  <span className="flex-1 text-center">Apr</span>
                  <span className="flex-1 text-center">May</span>
                  <span className="flex-1 text-center">Jun</span>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 2: Tables & Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 flex-1 min-h-[350px]">
            {/* Teacher Performance */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col lg:col-span-2">
              <div className="flex flex-col gap-1 mb-6 shrink-0">
                <h3 className="text-base font-bold text-foreground">Teacher Performance</h3>
                <p className="text-xs text-muted-foreground font-medium">Overview of metrics across all active staff</p>
              </div>
              <div className="flex-1 overflow-auto custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr>
                      <th className="sticky top-0 bg-card z-10 pb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">Teacher Info</th>
                      <th className="sticky top-0 bg-card z-10 pb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">Attendance %</th>
                      <th className="sticky top-0 bg-card z-10 pb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">Rating</th>
                      <th className="sticky top-0 bg-card z-10 pb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">Complaints</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teacherPerformance.map((teacher, i) => (
                      <tr key={i} className="group">
                        <td className="py-4 border-b border-border group-last:border-0">
                          <div className="flex items-center gap-3">
                            <img src={teacher.avatar} alt={teacher.name} className="w-9 h-9 rounded-full object-cover bg-input" />
                            <span className="text-sm font-semibold text-foreground">{teacher.name}</span>
                          </div>
                        </td>
                        <td className="py-4 border-b border-border group-last:border-0 text-sm font-semibold text-foreground">
                          {teacher.attendance}
                        </td>
                        <td className="py-4 border-b border-border group-last:border-0">
                          <div className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded text-xs font-bold">
                            <Star size={12} className="fill-primary" />
                            {teacher.rating}/5
                          </div>
                        </td>
                        <td className="py-4 border-b border-border group-last:border-0">
                          {teacher.complaints === 0 ? (
                            <span className="inline-flex items-center justify-center px-2.5 py-1 bg-emerald-100 text-emerald-600 rounded-full text-xs font-bold">
                              0 Issues
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center px-2.5 py-1 bg-rose-100 text-rose-600 rounded-full text-xs font-bold">
                              {teacher.complaints} Open
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Attendance Analytics */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col">
              <div className="flex flex-col gap-1 mb-6 shrink-0">
                <h3 className="text-base font-bold text-foreground">Overall Attendance</h3>
                <p className="text-xs text-muted-foreground font-medium">Average distribution</p>
              </div>
              <div className="flex-1 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center justify-center sm:justify-evenly lg:justify-center xl:justify-evenly gap-8">
                <div 
                  className="w-[140px] h-[140px] rounded-full relative flex items-center justify-center shrink-0"
                  style={{
                    background: "conic-gradient(#10b981 0% 85%, #f59e0b 85% 95%, #ef4444 95% 100%)"
                  }}
                >
                  <div className="absolute w-[90px] h-[90px] bg-card rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  <div className="relative z-10 text-center flex flex-col">
                    <span className="text-2xl font-bold text-foreground leading-none">85%</span>
                    <span className="text-xs font-semibold text-muted-foreground mt-1">Present</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2.5 text-sm font-semibold text-foreground">
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    Present
                    <span className="ml-4 text-muted-foreground font-semibold">85%</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm font-semibold text-foreground">
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    Late
                    <span className="ml-4 text-muted-foreground font-semibold">10%</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm font-semibold text-foreground">
                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                    Absent
                    <span className="ml-4 text-muted-foreground font-semibold">5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
