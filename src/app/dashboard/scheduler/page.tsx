"use client";

import React, { useState } from "react";
import { 
  LayoutDashboard, 
  CalendarDays, 
  Video, 
  Users, 
  Search, 
  Bell, 
  Calendar, 
  Clock, 
  ListTodo, 
  Plus, 
  UserCheck, 
  CalendarClock, 
  UserCog, 
  BarChart,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function SchedulerOverview() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { label: "Today's Classes", val: "124", sub: "45 completed • 79 upcoming", icon: Calendar, color: "text-slate-600 bg-slate-100" },
    { label: "Active Teachers", val: "32 / 35", sub: "3 currently on leave", icon: Users, color: "text-emerald-600 bg-emerald-100" },
    { label: "Pending Demos", val: "3", sub: "Needs assignment today", icon: Video, color: "text-amber-600 bg-amber-100" },
    { label: "Makeup Requests", val: "8", sub: "5 waiting for approval", icon: Clock, color: "text-blue-600 bg-blue-100" },
  ];

  const schedule = [
    { time: "09:30 AM", teacher: "Muhammad Aslam", student: "Aisha Rahman", subject: "Tajweed", status: "Completed" },
    { time: "10:00 AM", teacher: "Hafiz Usman", student: "Ahmed Raza", subject: "Quran Recitation", status: "Live Now" },
    { time: "10:00 AM", teacher: "Ustadh Bilal", student: "Fatima Ali", subject: "Hifz", status: "Live Now" },
    { time: "10:30 AM", teacher: "Omar Farooq", student: "Zainab Tariq", subject: "Islamic Studies", status: "Upcoming" },
    { time: "11:00 AM", teacher: "Sheikh Omar", student: "Ali Khan", subject: "Qira'at", status: "Upcoming" },
  ];

  const availableTeachers = [
    { name: "Aisha Rahman", status: "Free until 11:30 AM", color: "text-muted-foreground" },
    { name: "Hafiz Usman", status: "Currently Available", color: "text-emerald-600" },
    { name: "Zainab Tariq", status: "On Break", color: "text-amber-600" },
  ];

  const quickActions = [
    { label: "Assign Demo", icon: Video },
    { label: "Makeup Class", icon: CalendarClock },
    { label: "Substitute", icon: UserCog },
    { label: "View Reports", icon: BarChart },
  ];

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans text-[#111827]">
      {/* Sidebar */}
      <Sidebar role="scheduler" className="hidden md:flex w-64 shrink-0" />

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        <Navbar 
          title="Scheduler Overview" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Ahmed Khan"
          userRole="Operations Lead"
        />

        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 space-y-6 bg-slate-50/30">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col gap-3 transition-all hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{s.label}</span>
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", s.color)}>
                    <s.icon size={20} />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground leading-none">{s.val}</div>
                  <div className="text-[12px] font-medium text-muted-foreground mt-2">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: Master Schedule */}
            <div className="flex-[2.2] bg-card border border-border rounded-xl shadow-sm flex flex-col overflow-hidden">
              <div className="p-5 border-b border-border flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <ListTodo size={18} />
                  </div>
                  <h2 className="text-[16px] font-bold text-foreground">Today's Master Schedule</h2>
                </div>
                <button className="h-9 px-4 bg-primary text-white rounded-lg text-[13px] font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                  <Plus size={16} /> New Class
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80">
                      <th className="p-4 px-6 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Time</th>
                      <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Teacher</th>
                      <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Student</th>
                      <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Subject</th>
                      <th className="p-4 px-6 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {schedule.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 px-6 text-[13px] font-bold text-foreground">{row.time}</td>
                        <td className="p-4">
                           <div className="flex items-center gap-2">
                             <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary border border-primary/20">
                                {row.teacher.split(' ').map(n => n[0]).join('')}
                             </div>
                             <span className="text-[14px] font-bold text-foreground">{row.teacher}</span>
                           </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 border border-slate-200">
                                {row.student.split(' ').map(n => n[0]).join('')}
                             </div>
                            <span className="text-[14px] font-bold text-foreground">{row.student}</span>
                          </div>
                        </td>
                        <td className="p-4 text-[13px] font-semibold text-muted-foreground">{row.subject}</td>
                        <td className="p-4 px-6">
                          <span className={cn(
                            "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                            row.status === "Live Now" ? "bg-primary text-white shadow-sm shadow-primary/20" :
                            row.status === "Completed" ? "bg-slate-100 text-slate-500" :
                            "border border-border text-foreground"
                          )}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Sidebar Content */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Available Teachers */}
              <div className="bg-card border border-border rounded-xl shadow-sm flex flex-col overflow-hidden">
                <div className="p-5 border-b border-border flex items-center gap-3">
                  <div className="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                    <UserCheck size={18} />
                  </div>
                  <h2 className="text-[16px] font-bold text-foreground">Available Teachers</h2>
                </div>
                <div className="p-5 space-y-5">
                  {availableTeachers.map((t, i) => (
                    <div key={i} className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-[11px] font-bold text-slate-600 border border-slate-200">
                          {t.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-[14px] font-bold text-foreground leading-none">{t.name}</div>
                          <div className={cn("text-[11px] font-bold mt-1.5", t.color)}>{t.status}</div>
                        </div>
                      </div>
                      {t.status !== "On Break" && (
                        <button className="h-7 px-3 border border-primary text-primary rounded-lg text-[11px] font-bold hover:bg-primary/5 transition-all opacity-0 group-hover:opacity-100">
                          Assign
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-xl shadow-sm p-5">
                <h3 className="text-[13px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action, i) => (
                    <button key={i} className="flex flex-col items-center justify-center gap-3 p-4 bg-slate-50 border border-border rounded-xl transition-all hover:border-primary hover:bg-primary/5 group">
                      <div className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                        <action.icon size={20} />
                      </div>
                      <span className="text-[13px] font-bold text-foreground">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
