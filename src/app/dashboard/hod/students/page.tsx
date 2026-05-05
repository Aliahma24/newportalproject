"use client";

import React, { useState } from "react";
import {
  GraduationCap, Search, Filter, BookOpen, Clock,
  TrendingUp, CheckCircle2, MoreVertical, ExternalLink,
  Phone, User
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function HODStudents() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const students = [
    { name: "Zaid Ibrahim", course: "Tajweed Basics", teacher: "Ustadh Bilal", progress: 65, attendance: "94%", status: "Active" },
    { name: "Sara Ahmed", course: "Hifz Revision", teacher: "Sheikh Omar", progress: 40, attendance: "88%", status: "Warning" },
    { name: "Tariq Mansoor", course: "Quran Recitation", teacher: "Ustadh Bilal", progress: 85, attendance: "100%", status: "Active" },
    { name: "Amira El-Sayed", course: "Islamic Studies", teacher: "Ustada Fatima", progress: 95, attendance: "98%", status: "Active" },
    { name: "Yahya Hassan", course: "Basic Qaida", teacher: "Sheikh Hassan", progress: 20, attendance: "75%", status: "Inactive" },
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="hod" className="hidden md:flex w-64 shrink-0" />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar title="Students Overview" onMenuClick={() => setSidebarOpen(true)} userName="Dr. Abdur Rahman" userRole="HOD" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-muted/30 space-y-6">
          
          {/* Quick Actions & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search students by name or course..."
                className="w-full h-11 bg-card border border-border rounded-xl pl-10 pr-4 text-[13px] font-medium focus:border-primary outline-none transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="h-11 px-4 border border-border bg-card rounded-xl text-[13px] font-bold text-muted-foreground flex items-center gap-2 hover:bg-muted transition-all">
                <Filter size={18} /> Filters
              </button>
            </div>
          </div>

          {/* Student Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col group hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="p-5 border-b border-border bg-muted/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[13px]">
                      {s.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-foreground leading-tight">{s.name}</h4>
                      <div className="text-[11px] text-muted-foreground font-medium mt-0.5">{s.course}</div>
                    </div>
                  </div>
                  <span className={cn("px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider",
                    s.status === "Active" ? "bg-emerald-100 text-emerald-600" :
                    s.status === "Warning" ? "bg-red-100 text-red-500" :
                    "bg-slate-100 text-slate-500"
                  )}>{s.status}</span>
                </div>
                
                <div className="p-5 space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Teacher</div>
                      <div className="text-[13px] font-bold text-foreground flex items-center gap-1.5">
                        <User size={13} className="text-primary" /> {s.teacher}
                      </div>
                    </div>
                    <div className="space-y-1 text-right">
                      <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Attendance</div>
                      <div className="text-[13px] font-bold text-foreground">{s.attendance}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-muted-foreground uppercase tracking-widest">Syllabus Progress</span>
                      <span className="text-primary">{s.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${s.progress}%` }} />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button className="flex-1 h-10 bg-muted/50 border border-border rounded-xl text-[12px] font-bold text-foreground hover:bg-muted transition-all flex items-center justify-center gap-2">
                      <BookOpen size={14} /> Reports
                    </button>
                    <button className="h-10 w-10 border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:bg-muted transition-all">
                      <Phone size={16} />
                    </button>
                    <button className="h-10 w-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Table for Detailed View (Option) */}
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-border bg-muted/20 flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-foreground">Recent Enrollments</h3>
              <button className="text-[12px] font-bold text-primary hover:underline">Download List</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/10">
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Student</th>
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Joined Date</th>
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Current Stage</th>
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[1, 2, 3].map((_, i) => (
                    <tr key={i} className="hover:bg-muted/5 transition-colors">
                      <td className="p-4">
                        <div className="text-[14px] font-bold text-foreground">Ayesha {i + 1}</div>
                        <div className="text-[11px] text-muted-foreground">Quran Reading</div>
                      </td>
                      <td className="p-4 text-[13px] font-medium text-muted-foreground">Apr 2{i}, 2024</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-500" />
                          <span className="text-[13px] font-bold text-foreground">Stage 2: Makharij</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <button className="p-2 text-muted-foreground hover:text-primary rounded-lg transition-all">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
