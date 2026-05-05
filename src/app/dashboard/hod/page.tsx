"use client";

import React, { useState } from "react";
import {
  LayoutDashboard, Users, GraduationCap, AlertTriangle, BookOpen,
  BarChart2, TrendingUp, TrendingDown, Star, CheckCircle2, Clock
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function HODDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { label: "Active Teachers", val: "24", trend: "+2", color: "text-blue-600 bg-blue-100", icon: Users },
    { label: "Total Students", val: "156", trend: "+12", color: "text-emerald-600 bg-emerald-100", icon: GraduationCap },
    { label: "Open Complaints", val: "2", trend: "-5", color: "text-red-500 bg-red-100", icon: AlertTriangle },
    { label: "Quality Score", val: "4.8", trend: "+0.2", color: "text-amber-600 bg-amber-100", icon: Star },
  ];

  const recentComplaints = [
    { id: "CMP-0045", student: "Zaid Ibrahim", teacher: "Ustadh Bilal", issue: "Teacher late by 10 mins", status: "Urgent" },
    { id: "CMP-0046", student: "Sara Ahmed", teacher: "Sheikh Omar", issue: "Audio quality issues", status: "Medium" },
  ];

  const teacherPerformance = [
    { name: "Ustadh Bilal", classes: 42, attendance: "98%", rating: 4.9 },
    { name: "Sheikh Omar", classes: 38, attendance: "95%", rating: 4.7 },
    { name: "Ustada Fatima", classes: 45, attendance: "100%", rating: 5.0 },
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="hod" className="hidden md:flex w-64 shrink-0" />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar title="HOD Overview" onMenuClick={() => setSidebarOpen(true)} userName="Dr. Abdur Rahman" userRole="HOD" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-muted/30 space-y-6">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110", s.color)}>
                    <s.icon size={20} />
                  </div>
                  <div className={cn("flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full", 
                    s.trend.startsWith('+') ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-500"
                  )}>
                    {s.trend.startsWith('+') ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {s.trend}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{s.val}</div>
                  <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Teacher Performance */}
            <div className="flex-[1.5] bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-border bg-muted/20 flex items-center justify-between">
                <h3 className="text-[15px] font-bold text-foreground flex items-center gap-2">
                  <BarChart2 size={18} className="text-primary" /> Teacher Performance
                </h3>
                <button className="text-[12px] font-bold text-primary hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted/10">
                      <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Teacher Name</th>
                      <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Classes</th>
                      <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Attendance</th>
                      <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {teacherPerformance.map((t, i) => (
                      <tr key={i} className="hover:bg-muted/5 transition-colors">
                        <td className="p-4">
                          <div className="text-[14px] font-bold text-foreground">{t.name}</div>
                        </td>
                        <td className="p-4 text-[13px] font-semibold text-muted-foreground">{t.classes}</td>
                        <td className="p-4">
                          <span className="text-[13px] font-bold text-emerald-600">{t.attendance}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1 text-[13px] font-bold text-amber-500">
                            <Star size={14} fill="currentColor" /> {t.rating}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Complaints */}
            <div className="flex-1 bg-card border border-border rounded-2xl shadow-sm flex flex-col overflow-hidden">
              <div className="p-5 border-b border-border bg-muted/20">
                <h3 className="text-[15px] font-bold text-foreground flex items-center gap-2">
                  <AlertTriangle size={18} className="text-red-500" /> Pending Complaints
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto divide-y divide-border">
                {recentComplaints.map((c, i) => (
                  <div key={i} className="p-5 hover:bg-red-50/30 transition-colors space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-bold text-muted-foreground font-mono">{c.id}</span>
                      <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        c.status === "Urgent" ? "bg-red-100 text-red-500" : "bg-amber-100 text-amber-600"
                      )}>{c.status}</span>
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-foreground leading-tight">{c.issue}</div>
                      <div className="text-[11px] text-muted-foreground mt-1">Student: {c.student} • Teacher: {c.teacher}</div>
                    </div>
                    <button className="w-full h-9 bg-muted/50 border border-border rounded-lg text-[12px] font-bold text-foreground hover:bg-muted transition-all">
                      Resolve Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links / Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-white shadow-lg shadow-primary/20 flex flex-col justify-between min-h-[160px]">
              <div className="flex items-center justify-between">
                <BookOpen size={32} className="opacity-40" />
                <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <TrendingUp size={16} />
                </div>
              </div>
              <div>
                <h4 className="text-[14px] font-bold opacity-80 uppercase tracking-widest">Syllabus Completion</h4>
                <div className="text-3xl font-bold mt-1">78%</div>
                <div className="w-full h-1.5 bg-white/20 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: "78%" }} />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[160px]">
              <div className="flex items-center justify-between">
                <CheckCircle2 size={32} className="text-emerald-500 opacity-40" />
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">On Track</span>
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-muted-foreground uppercase tracking-widest">Teacher Attendance</h4>
                <div className="text-3xl font-bold text-foreground mt-1">96.4%</div>
                <p className="text-[11px] text-muted-foreground mt-1 font-medium italic">Average across all shifts</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[160px]">
              <div className="flex items-center justify-between">
                <Clock size={32} className="text-secondary opacity-40" />
                <span className="text-[11px] font-bold text-secondary bg-secondary/5 px-2 py-1 rounded">Last 24h</span>
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-muted-foreground uppercase tracking-widest">Live Monitoring</h4>
                <div className="text-3xl font-bold text-foreground mt-1">12</div>
                <p className="text-[11px] text-muted-foreground mt-1 font-medium">Classes currently being watched</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
