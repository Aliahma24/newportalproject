"use client";

import React, { useState } from "react";
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  CalendarClock, 
  Search, 
  Calendar, 
  FileText, 
  FileSpreadsheet, 
  ChevronLeft, 
  ChevronRight,
  X,
  Bell
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AttendanceRecord {
  id: string;
  empId: string;
  name: string;
  avatar: string;
  date: string;
  status: "Present" | "Late" | "Absent" | "Leave";
  timeMarked: string;
  remark: string;
  classes: string;
  hours: string;
}

export default function AttendanceLogs() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const summary = [
    { title: "Total Present", val: "38", trend: "90% of active staff", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
    { title: "Total Late", val: "2", trend: "+1 from yesterday", icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
    { title: "Total Absent", val: "1", trend: "Unnotified absences", icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
    { title: "On Leave", val: "1", trend: "Approved planned leaves", icon: CalendarClock, color: "text-primary", bg: "bg-primary/10" },
  ];

  const records: AttendanceRecord[] = [
    {
      id: "1",
      empId: "EMP-1048",
      name: "Hafiz Usman",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FSouth%20Asian%2F5",
      date: "Oct 24, 2026",
      status: "Present",
      timeMarked: "07:55 AM",
      remark: "On Time",
      classes: "4 Classes",
      hours: "2 hours total"
    },
    {
      id: "2",
      empId: "EMP-1051",
      name: "Aisha Rahman",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FMiddle%20Eastern%2F1",
      date: "Oct 24, 2026",
      status: "Late",
      timeMarked: "08:15 AM",
      remark: "15 mins late",
      classes: "3 Classes",
      hours: "1.5 hours total"
    },
    {
      id: "3",
      empId: "EMP-1042",
      name: "Ustadh Bilal",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F25-35%2FMiddle%20Eastern%2F3",
      date: "Oct 24, 2026",
      status: "Absent",
      timeMarked: "--:--",
      remark: "No punch-in",
      classes: "0 Classes",
      hours: "Missed 3 scheduled"
    },
    {
      id: "4",
      empId: "EMP-1045",
      name: "Fatima Ali",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F4",
      date: "Oct 24, 2026",
      status: "Leave",
      timeMarked: "--:--",
      remark: "Sick Leave (Approved)",
      classes: "0 Classes",
      hours: "Classes reassigned"
    },
    {
      id: "5",
      empId: "EMP-1055",
      name: "Omar Farooq",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FMiddle%20Eastern%2F7",
      date: "Oct 24, 2026",
      status: "Present",
      timeMarked: "08:00 AM",
      remark: "On Time",
      classes: "5 Classes",
      hours: "2.5 hours total"
    },
    {
      id: "6",
      empId: "EMP-1060",
      name: "Zainab Tariq",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F18-25%2FSouth%20Asian%2F2",
      date: "Oct 24, 2026",
      status: "Present",
      timeMarked: "08:02 AM",
      remark: "On Time",
      classes: "3 Classes",
      hours: "1.5 hours total"
    }
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans text-[#111827]">
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
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        <Navbar 
          title="Attendance Logs" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Yusuf Ahmed"
          userRole="HR Director"
          userAvatar="https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FSouth%20Asian%2F2"
          placeholder="Search Taleem ul Quran..."
        />

        <main className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-6 md:p-8 space-y-6">
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {summary.map((card, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", card.bg)}>
                    <card.icon size={16} className={card.color} />
                  </div>
                  <span className="text-[13px] font-bold text-muted-foreground">{card.title}</span>
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{card.val}</div>
                <div className={cn(
                  "text-[12px] font-bold",
                  card.title.includes("Late") ? "text-red-500" : card.title.includes("Present") ? "text-emerald-600" : "text-muted-foreground"
                )}>{card.trend}</div>
              </div>
            ))}
          </div>

          {/* Table Card */}
          <div className="bg-card border border-border rounded-xl shadow-sm flex flex-col overflow-hidden">
            {/* Toolbar */}
            <div className="p-5 border-b border-border flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative group min-w-[240px]">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search teacher..." 
                    className="w-full h-10 bg-slate-50 border border-border rounded-lg pl-10 pr-4 text-[13px] font-medium outline-none focus:border-primary transition-all"
                  />
                </div>
                <select className="h-10 bg-card border border-border rounded-lg px-4 pr-10 text-[13px] font-bold text-foreground outline-none cursor-pointer hover:bg-slate-50 transition-colors appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center] bg-[length:14px]">
                  <option value="">All Teachers</option>
                  <option value="tajweed">Tajweed Instructors</option>
                  <option value="hifz">Hifz Instructors</option>
                </select>
                <div className="h-10 px-4 bg-card border border-border rounded-lg flex items-center gap-2 text-[13px] font-bold text-foreground cursor-pointer hover:bg-slate-50 transition-colors">
                  <Calendar size={16} className="text-muted-foreground" />
                  <span>Oct 24, 2026</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="h-10 px-4 border border-primary text-primary rounded-lg text-[13px] font-bold flex items-center justify-center gap-2 hover:bg-primary/5 transition-all">
                  <FileText size={16} /> Export PDF
                </button>
                <button className="h-10 px-4 border border-primary text-primary rounded-lg text-[13px] font-bold flex items-center justify-center gap-2 hover:bg-primary/5 transition-all">
                  <FileSpreadsheet size={16} /> Export Excel
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="p-4 px-6 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Teacher Name</th>
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Date</th>
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Status</th>
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Time Marked</th>
                    <th className="p-4 px-6 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Classes Conducted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {records.map((rec) => (
                    <tr key={rec.id} className="hover:bg-slate-50/50 transition-all">
                      <td className="p-4 px-6">
                        <div className="flex items-center gap-3">
                          <img src={rec.avatar} className="w-10 h-10 rounded-full border border-border object-cover" />
                          <div>
                            <div className="text-[14px] font-bold text-foreground leading-tight">{rec.name}</div>
                            <div className="text-[11px] font-bold text-muted-foreground mt-0.5">#{rec.empId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-[13px] font-bold text-foreground">{rec.date}</div>
                      </td>
                      <td className="p-4">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                          rec.status === "Present" ? "bg-emerald-500/10 text-emerald-600" : 
                          rec.status === "Late" ? "bg-amber-500/10 text-amber-600" :
                          rec.status === "Absent" ? "bg-red-500/10 text-red-600" :
                          "bg-primary/10 text-primary"
                        )}>
                          {rec.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="text-[13px] font-bold text-foreground">{rec.timeMarked}</div>
                        <div className={cn(
                          "text-[11px] font-bold mt-0.5",
                          rec.remark.includes("late") ? "text-amber-600" : "text-muted-foreground"
                        )}>{rec.remark}</div>
                      </td>
                      <td className="p-4 px-6">
                        <div className="text-[13px] font-bold text-foreground">{rec.classes}</div>
                        <div className="text-[11px] font-medium text-muted-foreground mt-0.5">{rec.hours}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-border flex items-center justify-between bg-card">
              <span className="text-[13px] font-semibold text-muted-foreground">Showing 1 to 6 of 42 records</span>
              <div className="flex items-center gap-1.5">
                <button disabled className="w-9 h-9 flex items-center justify-center border border-border rounded-lg text-muted-foreground disabled:opacity-40 transition-all"><ChevronLeft size={18} /></button>
                <button className="w-9 h-9 flex items-center justify-center border border-primary bg-primary text-white rounded-lg text-[13px] font-bold shadow-md shadow-primary/10">1</button>
                <button className="w-9 h-9 flex items-center justify-center border border-border rounded-lg text-[13px] font-bold hover:bg-slate-50 transition-all">2</button>
                <button className="w-9 h-9 flex items-center justify-center border border-border rounded-lg text-[13px] font-bold hover:bg-slate-50 transition-all">3</button>
                <span className="px-2 text-muted-foreground font-bold">...</span>
                <button className="w-9 h-9 flex items-center justify-center border border-border rounded-lg text-[13px] font-bold hover:bg-slate-50 transition-all">7</button>
                <button className="w-9 h-9 flex items-center justify-center border border-border rounded-lg text-muted-foreground hover:bg-slate-50 transition-all"><ChevronRight size={18} /></button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
