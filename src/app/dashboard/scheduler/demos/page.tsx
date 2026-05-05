"use client";

import React, { useState } from "react";
import {
  Video,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  CalendarClock,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  User,
  BookOpen,
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DemoRequest {
  id: string;
  name: string;
  course: string;
  requestedTime: string;
  status: "Pending" | "Scheduled" | "Completed" | "Cancelled";
  country: string;
  notes: string;
}

export default function DemoRequests() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("1");
  const [filterStatus, setFilterStatus] = useState("All");

  const demos: DemoRequest[] = [
    { id: "1", name: "Zayd Ibrahim", course: "Tajweed Fundamentals", requestedTime: "Tomorrow, 10:00 AM", status: "Pending", country: "United Kingdom", notes: "First-time student, prefers evening slots." },
    { id: "2", name: "Sara Ahmed", course: "Hifz Memorization", requestedTime: "Oct 26, 02:00 PM", status: "Pending", country: "Canada", notes: "Has some prior Quran knowledge." },
    { id: "3", name: "Tariq Mansoor", course: "Qira'at Specialization", requestedTime: "Flexible (Anytime)", status: "Pending", country: "Saudi Arabia", notes: "Advanced learner, looking for specialized teacher." },
    { id: "4", name: "Noor Hussain", course: "Tajweed Basics", requestedTime: "Oct 27, 11:00 AM", status: "Scheduled", country: "Pakistan", notes: "Assigned to Ustadh Bilal." },
    { id: "5", name: "Amira El-Sayed", course: "Quran Recitation", requestedTime: "Oct 25, 09:00 AM", status: "Completed", country: "Egypt", notes: "Demo completed successfully. Enrolled." },
    { id: "6", name: "Yusuf Malik", course: "Islamic Studies", requestedTime: "Oct 23, 03:00 PM", status: "Cancelled", country: "USA", notes: "Student cancelled — unreachable." },
  ];

  const stats = [
    { label: "Total Requests", val: "6", icon: Video, color: "text-slate-600 bg-slate-100" },
    { label: "Pending", val: "3", icon: Clock, color: "text-amber-600 bg-amber-100" },
    { label: "Scheduled", val: "1", icon: CalendarClock, color: "text-blue-600 bg-blue-100" },
    { label: "Completed", val: "1", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-100" },
  ];

  const statuses = ["All", "Pending", "Scheduled", "Completed", "Cancelled"];

  const filtered = filterStatus === "All" ? demos : demos.filter(d => d.status === filterStatus);
  const selected = demos.find(d => d.id === selectedId) || demos[0];

  const statusStyle = (s: string) => ({
    "Pending": "bg-amber-500/10 text-amber-600",
    "Scheduled": "bg-blue-500/10 text-blue-600",
    "Completed": "bg-emerald-500/10 text-emerald-600",
    "Cancelled": "bg-red-500/10 text-red-500",
  }[s] || "bg-slate-100 text-slate-500");

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans text-[#111827]">
      <Sidebar role="scheduler" className="hidden md:flex w-64 shrink-0" />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar
          title="Demo Requests"
          onMenuClick={() => setSidebarOpen(true)}
          userName="Ahmed Khan"
          userRole="Scheduler Lead"
        />

        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 space-y-6 bg-slate-50/30">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
                <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center shrink-0", s.color)}>
                  <s.icon size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground leading-none">{s.val}</div>
                  <div className="text-[11px] font-bold text-muted-foreground mt-1.5 uppercase tracking-widest">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Split Pane */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: List */}
            <div className="flex-[1.6] bg-card border border-border rounded-xl shadow-sm flex flex-col overflow-hidden">
              <div className="p-5 border-b border-border bg-slate-50/50 flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[200px]">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input type="text" placeholder="Search by name or course..." className="w-full h-10 bg-white border border-border rounded-lg pl-9 pr-4 text-[13px] font-medium outline-none focus:border-primary transition-all" />
                </div>
                <div className="flex gap-1.5">
                  {statuses.map(s => (
                    <button key={s} onClick={() => setFilterStatus(s)} className={cn("h-8 px-3 rounded-lg text-[11px] font-bold transition-all", filterStatus === s ? "bg-primary text-white shadow-sm" : "bg-slate-100 text-muted-foreground hover:bg-slate-200")}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-border">
                {filtered.map((demo) => (
                  <div
                    key={demo.id}
                    onClick={() => setSelectedId(demo.id)}
                    className={cn(
                      "p-5 flex items-start gap-4 cursor-pointer transition-all hover:bg-slate-50",
                      selectedId === demo.id && "bg-primary/5 border-l-4 border-primary"
                    )}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[13px] shrink-0 border border-primary/20">
                      {demo.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-[14px] font-bold text-foreground truncate">{demo.name}</div>
                        <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0", statusStyle(demo.status))}>
                          {demo.status}
                        </span>
                      </div>
                      <div className="text-[12px] font-bold text-muted-foreground mt-0.5">{demo.course}</div>
                      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-2">
                        <Calendar size={11} />{demo.requestedTime}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-border flex items-center justify-between bg-slate-50/50">
                <span className="text-[12px] font-semibold text-muted-foreground">Showing {filtered.length} of {demos.length} requests</span>
                <div className="flex gap-1">
                  <button className="w-8 h-8 border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:bg-slate-100 transition-all" disabled>
                    <ChevronLeft size={15} />
                  </button>
                  <button className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center text-[12px] font-bold">1</button>
                  <button className="w-8 h-8 border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:bg-slate-100 transition-all">
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Detail Panel */}
            <div className="flex-1 bg-card border border-border rounded-xl shadow-sm flex flex-col overflow-hidden">
              <div className="p-5 border-b border-border bg-slate-50/50 flex items-center justify-between">
                <h3 className="text-[15px] font-bold text-foreground">Request Details</h3>
                <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider", statusStyle(selected.status))}>
                  {selected.status}
                </span>
              </div>

              <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-6">
                {/* Student Info */}
                <div className="flex flex-col items-center text-center pb-6 border-b border-border">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl border-4 border-white shadow-md mb-3">
                    {selected.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="text-[18px] font-bold text-foreground">{selected.name}</div>
                  <div className="text-[13px] font-bold text-muted-foreground mt-1">{selected.course}</div>
                  <div className="text-[11px] text-muted-foreground mt-1">{selected.country}</div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Requested Time</div>
                    <div className="flex items-center gap-2 p-3 bg-slate-50 border border-border rounded-lg text-[13px] font-bold text-foreground">
                      <Calendar size={14} className="text-muted-foreground" />{selected.requestedTime}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Course Requested</div>
                    <div className="flex items-center gap-2 p-3 bg-slate-50 border border-border rounded-lg text-[13px] font-bold text-foreground">
                      <BookOpen size={14} className="text-muted-foreground" />{selected.course}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Notes</div>
                    <div className="p-3 bg-slate-50 border border-border rounded-lg text-[13px] font-medium text-foreground italic leading-relaxed">
                      "{selected.notes}"
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {selected.status === "Pending" && (
                <div className="p-5 border-t border-border space-y-3 bg-slate-50/50">
                  <button className="w-full h-11 border border-primary text-primary rounded-xl text-[13px] font-bold flex items-center justify-center gap-2 hover:bg-primary/5 transition-all">
                    <Calendar size={16} /> Find Available Slot
                  </button>
                  <button className="w-full h-11 bg-primary text-white rounded-xl text-[13px] font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                    <UserPlus size={16} /> Assign Teacher
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
}
