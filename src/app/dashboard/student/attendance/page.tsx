"use client";

import React, { useState } from "react";
import {
  CalendarCheck, CheckCircle2, XCircle, Clock, AlertCircle,
  ChevronLeft, ChevronRight, Filter
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function AttendanceHistory() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  const records = [
    { date: "Mon, May 5, 2024", time: "03:00 PM – 03:30 PM", teacher: "Ustadh Bilal", subject: "Tajweed", status: "Present" },
    { date: "Sat, May 3, 2024", time: "10:00 AM – 10:30 AM", teacher: "Sheikh Omar", subject: "Hifz Revision", status: "Present" },
    { date: "Thu, May 1, 2024", time: "03:00 PM – 03:30 PM", teacher: "Ustadh Bilal", subject: "Tajweed", status: "Absent" },
    { date: "Mon, Apr 28, 2024", time: "03:00 PM – 03:30 PM", teacher: "Ustadh Bilal", subject: "Tajweed", status: "Present" },
    { date: "Sat, Apr 26, 2024", time: "10:00 AM – 10:30 AM", teacher: "Sheikh Omar", subject: "Hifz Revision", status: "Late" },
    { date: "Thu, Apr 24, 2024", time: "03:00 PM – 03:30 PM", teacher: "Ustadh Bilal", subject: "Tajweed", status: "Present" },
    { date: "Mon, Apr 21, 2024", time: "03:00 PM – 03:30 PM", teacher: "Ustadh Bilal", subject: "Tajweed", status: "Absent" },
    { date: "Sat, Apr 19, 2024", time: "10:00 AM – 10:30 AM", teacher: "Sheikh Omar", subject: "Hifz Revision", status: "Present" },
    { date: "Thu, Apr 17, 2024", time: "03:00 PM – 03:30 PM", teacher: "Ustadh Bilal", subject: "Tajweed", status: "Present" },
    { date: "Mon, Apr 14, 2024", time: "03:00 PM – 03:30 PM", teacher: "Ustadh Bilal", subject: "Tajweed", status: "Late" },
  ];

  const stats = {
    total: records.length,
    present: records.filter(r => r.status === "Present").length,
    absent: records.filter(r => r.status === "Absent").length,
    late: records.filter(r => r.status === "Late").length,
  };
  const attendancePct = Math.round((stats.present / stats.total) * 100);

  const filtered = filter === "All" ? records : records.filter(r => r.status === filter);

  const statusConfig = {
    Present:  { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-100", badge: "bg-emerald-500/10 text-emerald-600" },
    Absent:   { icon: XCircle,      color: "text-red-500",     bg: "bg-red-100",     badge: "bg-red-500/10 text-red-500" },
    Late:     { icon: AlertCircle,  color: "text-amber-600",   bg: "bg-amber-100",   badge: "bg-amber-500/10 text-amber-600" },
  } as const;

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="student" className="hidden md:flex w-64 shrink-0" />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar title="Attendance History" onMenuClick={() => setSidebarOpen(true)} userName="Yousuf Ali" userRole="Student" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-muted/30">
          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm col-span-2 lg:col-span-1 flex flex-col gap-2">
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Attendance Rate</div>
              <div className="text-3xl font-bold text-primary">{attendancePct}%</div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-1">
                <div className="h-full bg-primary rounded-full" style={{ width: `${attendancePct}%` }} />
              </div>
            </div>
            {[
              { label: "Total Classes", val: stats.total, icon: CalendarCheck, style: "text-slate-600 bg-slate-100" },
              { label: "Present", val: stats.present, icon: CheckCircle2, style: "text-emerald-600 bg-emerald-100" },
              { label: "Absent", val: stats.absent, icon: XCircle, style: "text-red-500 bg-red-100" },
            ].map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 shadow-sm flex items-center gap-4">
                <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center", s.style)}>
                  <s.icon size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{s.val}</div>
                  <div className="text-[11px] font-bold text-muted-foreground mt-1 uppercase tracking-widest">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Table Card */}
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-border bg-muted/30 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-[15px] font-bold text-foreground">Class Records</h2>
              <div className="flex gap-1.5">
                {["All", "Present", "Absent", "Late"].map(f => (
                  <button key={f} onClick={() => setFilter(f)} className={cn(
                    "h-8 px-3 rounded-lg text-[11px] font-bold transition-all",
                    filter === f ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}>{f}</button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/30">
                    {["Date", "Time", "Teacher", "Subject", "Status"].map(h => (
                      <th key={h} className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((r, i) => {
                    const cfg = statusConfig[r.status as keyof typeof statusConfig];
                    const Icon = cfg.icon;
                    return (
                      <tr key={i} className="hover:bg-muted/10 transition-colors">
                        <td className="p-4 text-[13px] font-bold text-foreground">{r.date}</td>
                        <td className="p-4 text-[13px] font-semibold text-muted-foreground flex items-center gap-1.5"><Clock size={12} />{r.time}</td>
                        <td className="p-4 text-[13px] font-bold text-foreground">{r.teacher}</td>
                        <td className="p-4 text-[13px] font-semibold text-muted-foreground">{r.subject}</td>
                        <td className="p-4">
                          <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider", cfg.badge)}>
                            <Icon size={12} /> {r.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-border flex items-center justify-between bg-muted/20">
              <span className="text-[12px] font-semibold text-muted-foreground">Showing {filtered.length} of {records.length} records</span>
              <div className="flex gap-1">
                <button className="w-8 h-8 border border-border rounded-lg flex items-center justify-center text-muted-foreground disabled:opacity-30" disabled><ChevronLeft size={14} /></button>
                <button className="w-8 h-8 bg-primary text-white rounded-lg text-[12px] font-bold">1</button>
                <button className="w-8 h-8 border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-all"><ChevronRight size={14} /></button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
