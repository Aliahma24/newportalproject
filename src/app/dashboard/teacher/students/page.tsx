"use client";

import React, { useState } from "react";
import { 
  Search, 
  BarChart2, 
  ChevronDown, 
  Users, 
  BellRing, 
  AlertTriangle, 
  UserMinus,
  Calendar,
  X,
  MoreVertical,
  Activity
} from "lucide-react";
import Link from "next/link";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Student {
  id: string;
  name: string;
  guardian: string;
  avatar: string;
  contact: string;
  days: string;
  time: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  score: string;
  progress: number;
}

export default function MyStudents() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const students: Student[] = [
    { 
      id: "1", 
      name: "Ahmed Raza", 
      guardian: "Muhammad Aslam", 
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FSouth%20Asian%2F5", 
      contact: "+92 300 1234567", 
      days: "Mon–Thu", 
      time: "08:00 PM", 
      level: "Intermediate", 
      score: "85%", 
      progress: 65 
    },
    { 
      id: "2", 
      name: "Zainab Ali", 
      guardian: "Ali Hassan", 
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F18-25%2FMiddle%20Eastern%2F4", 
      contact: "+92 321 7654321", 
      days: "Mon–Thu", 
      time: "08:30 PM", 
      level: "Beginner", 
      score: "92%", 
      progress: 40 
    },
    { 
      id: "3", 
      name: "Omar Farooq", 
      guardian: "Abdullah Farooq", 
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FAfrican%2F3", 
      contact: "+92 333 9988776", 
      days: "Fri–Sun", 
      time: "06:00 PM", 
      level: "Advanced", 
      score: "78%", 
      progress: 80 
    },
    { 
      id: "4", 
      name: "Fatima Zahra", 
      guardian: "Tariq Mahmood", 
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F18-25%2FSouth%20Asian%2F2", 
      contact: "+92 345 1122334", 
      days: "Fri–Sun", 
      time: "06:30 PM", 
      level: "Intermediate", 
      score: "88%", 
      progress: 55 
    },
    { 
      id: "5", 
      name: "Ali Khan", 
      guardian: "Usman Khan", 
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FMiddle%20Eastern%2F1", 
      contact: "+92 311 5544332", 
      days: "Mon–Thu", 
      time: "09:00 PM", 
      level: "Beginner", 
      score: "N/A", 
      progress: 15 
    },
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
          title="My Students" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Ustadha Aisha"
          userRole="Senior Teacher"
          userAvatar="https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F5"
          hideSearch
        />

        <main className="flex-1 overflow-hidden p-6 md:p-8 flex flex-col xl:flex-row gap-6 bg-slate-50/30">
          
          {/* Main Table Panel */}
          <div className="flex-1 min-w-0 bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
            {/* Filter Bar */}
            <div className="p-4 px-6 border-b border-border flex flex-wrap gap-4 items-center bg-card shrink-0">
              <div className="flex-1 max-w-sm flex items-center bg-muted rounded-lg px-4 h-10 gap-3 border border-transparent focus-within:border-primary/30 transition-all">
                <Search size={16} className="text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search student or guardian" 
                  className="bg-transparent border-none outline-none text-[13px] font-semibold text-foreground w-full placeholder:text-muted-foreground/60 placeholder:font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-3 ml-auto">
                <button className="h-10 px-4 border border-border rounded-lg bg-card text-[13px] font-bold text-foreground flex items-center gap-2 hover:bg-muted transition-all">
                  <BarChart2 size={16} className="text-muted-foreground" />
                  Level: All
                  <ChevronDown size={14} className="text-muted-foreground" />
                </button>
                <button className="h-10 px-4 border border-border rounded-lg bg-card text-[13px] font-bold text-foreground flex items-center gap-2 hover:bg-muted transition-all">
                  <Activity size={16} className="text-muted-foreground" />
                  Status: Active
                  <ChevronDown size={14} className="text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Table Area */}
            <div className="flex-1 overflow-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[850px]">
                <thead>
                  <tr className="bg-slate-50/80 sticky top-0 z-10">
                    <th className="p-4 px-6 border-b border-border text-[11px] font-bold text-muted-foreground uppercase tracking-wider w-[240px]">Student & Guardian</th>
                    <th className="p-4 px-6 border-b border-border text-[11px] font-bold text-muted-foreground uppercase tracking-wider w-[140px]">Contact</th>
                    <th className="p-4 px-6 border-b border-border text-[11px] font-bold text-muted-foreground uppercase tracking-wider w-[120px]">Schedule</th>
                    <th className="p-4 px-6 border-b border-border text-[11px] font-bold text-muted-foreground uppercase tracking-wider w-[120px]">Level</th>
                    <th className="p-4 px-6 border-b border-border text-[11px] font-bold text-muted-foreground uppercase tracking-wider w-[100px]">Test Score</th>
                    <th className="p-4 px-6 border-b border-border text-[11px] font-bold text-muted-foreground uppercase tracking-wider w-[140px]">Progress</th>
                    <th className="p-4 px-6 border-b border-border text-[11px] font-bold text-muted-foreground uppercase tracking-wider w-[140px]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="p-4 px-6">
                        <div className="flex items-center gap-3">
                          <img 
                            src={student.avatar} 
                            alt={student.name} 
                            className="w-9 h-9 rounded-full object-cover border border-border bg-muted"
                          />
                          <div className="flex flex-col min-w-0">
                            <span className="text-[14px] font-bold text-foreground truncate group-hover:text-primary transition-colors">{student.name}</span>
                            <span className="text-[11px] font-semibold text-muted-foreground truncate italic">G: {student.guardian}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 px-6">
                        <span className="text-[13px] font-semibold text-muted-foreground whitespace-nowrap">{student.contact}</span>
                      </td>
                      <td className="p-4 px-6">
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold text-foreground whitespace-nowrap">{student.days}</span>
                          <span className="text-[12px] font-bold text-primary whitespace-nowrap">{student.time}</span>
                        </div>
                      </td>
                      <td className="p-4 px-6">
                        <span className={cn(
                          "px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider inline-block",
                          student.level === "Beginner" && "bg-emerald-500/10 text-emerald-600",
                          student.level === "Intermediate" && "bg-amber-500/10 text-amber-600",
                          student.level === "Advanced" && "bg-primary/10 text-primary"
                        )}>
                          {student.level}
                        </span>
                      </td>
                      <td className="p-4 px-6">
                        <span className="text-[13px] font-bold text-foreground">{student.score}</span>
                      </td>
                      <td className="p-4 px-6">
                        <div className="flex flex-col gap-1.5 w-full max-w-[100px]">
                          <span className={cn(
                            "text-[11px] font-bold whitespace-nowrap",
                            student.progress < 20 ? "text-rose-500" : "text-muted-foreground"
                          )}>
                            {student.progress}% Completed
                          </span>
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full rounded-full transition-all duration-1000",
                                student.progress < 20 ? "bg-rose-500" : "bg-primary"
                              )} 
                              style={{ width: `${student.progress}%` }} 
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-4 px-6">
                        <div className="flex gap-2">
                          <Link href={`/dashboard/teacher/students/${student.id}`}>
                            <button className="h-8 px-3 rounded bg-primary text-primary-foreground text-[12px] font-bold hover:bg-primary/90 transition-all">
                              Profile
                            </button>
                          </Link>
                          <button className="h-8 px-3 rounded border border-primary text-primary text-[12px] font-bold hover:bg-primary/5 transition-all">
                            Note
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Side Panel */}
          <div className="w-full xl:w-72 shrink-0 flex flex-col gap-6">
            {/* Quick Stats */}
            <div className="bg-card border border-border rounded-xl shadow-sm p-6 space-y-6">
              <div className="flex items-center gap-3 text-sm font-bold text-foreground">
                <Users size={18} className="text-primary" />
                Quick Stats
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[13px] font-semibold text-muted-foreground">Total Students</span>
                  <span className="text-[18px] font-bold text-foreground">24</span>
                </div>
                <div className="h-px bg-border w-full" />
                <div className="flex justify-between items-center">
                  <span className="text-[13px] font-semibold text-muted-foreground">Active</span>
                  <span className="text-[18px] font-bold text-emerald-600">20</span>
                </div>
                <div className="h-px bg-border w-full" />
                <div className="flex justify-between items-center">
                  <span className="text-[13px] font-semibold text-muted-foreground">Low Progress</span>
                  <span className="text-[18px] font-bold text-amber-500">3</span>
                </div>
              </div>
            </div>

            {/* Action Needed */}
            <div className="bg-card border border-border rounded-xl shadow-sm p-6 flex-1">
              <div className="flex items-center gap-3 text-sm font-bold text-foreground mb-6">
                <BellRing size={18} className="text-primary" />
                Action Needed
              </div>
              
              <div className="space-y-4">
                <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg flex gap-3 items-start">
                  <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[13px] font-bold text-foreground">Progress Update</div>
                    <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">2 students have not received a progress update in 30 days.</p>
                  </div>
                </div>

                <div className="p-3 bg-rose-500/5 border border-rose-500/20 rounded-lg flex gap-3 items-start">
                  <UserMinus size={16} className="text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[13px] font-bold text-foreground">Missed Classes</div>
                    <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">1 student missed the last 2 consecutive classes. Follow up required.</p>
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
