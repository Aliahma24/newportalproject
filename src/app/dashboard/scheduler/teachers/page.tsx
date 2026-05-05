"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  CheckCircle2,
  Clock,
  Coffee,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
  Mail,
  Phone,
  BookOpen,
  CalendarDays,
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Teacher {
  id: string;
  name: string;
  subject: string;
  status: "Available" | "In Class" | "On Break" | "On Leave";
  freeUntil: string;
  classesToday: number;
  email: string;
  phone: string;
}

export default function TeacherAvailability() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("1");
  const [filterStatus, setFilterStatus] = useState("All");

  const teachers: Teacher[] = [
    { id: "1", name: "Ustadh Bilal", subject: "Hifz & Tajweed", status: "Available", freeUntil: "11:00 AM", classesToday: 3, email: "bilal@taleemulquran.com", phone: "+92 300 1234567" },
    { id: "2", name: "Sheikh Omar", subject: "Qira'at & Tajweed", status: "In Class", freeUntil: "10:30 AM", classesToday: 4, email: "omar@taleemulquran.com", phone: "+92 301 7654321" },
    { id: "3", name: "Aisha Rahman", subject: "Islamic Studies", status: "Available", freeUntil: "12:00 PM", classesToday: 2, email: "aisha@taleemulquran.com", phone: "+92 321 9876543" },
    { id: "4", name: "Muhammad Aslam", subject: "Tajweed Basics", status: "On Break", freeUntil: "10:15 AM", classesToday: 5, email: "aslam@taleemulquran.com", phone: "+92 333 1122334" },
    { id: "5", name: "Hafiz Usman", subject: "Hifz Memorization", status: "In Class", freeUntil: "11:30 AM", classesToday: 4, email: "usman@taleemulquran.com", phone: "+92 345 5566778" },
    { id: "6", name: "Fatima Ali", subject: "Quran Recitation", status: "On Leave", freeUntil: "Tomorrow", classesToday: 0, email: "fatima@taleemulquran.com", phone: "+92 312 9988776" },
  ];

  const statuses = ["All", "Available", "In Class", "On Break", "On Leave"];

  const stats = [
    { label: "Total Teachers", val: "35", icon: Users, color: "text-slate-600 bg-slate-100" },
    { label: "Available Now", val: "2", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-100" },
    { label: "In Class", val: "2", icon: BookOpen, color: "text-blue-600 bg-blue-100" },
    { label: "On Leave", val: "3", icon: AlertCircle, color: "text-amber-600 bg-amber-100" },
  ];

  const filtered = filterStatus === "All" ? teachers : teachers.filter(t => t.status === filterStatus);
  const selected = teachers.find(t => t.id === selectedId) || teachers[0];

  const statusStyle = (s: string) => ({
    "Available": "bg-emerald-500/10 text-emerald-600",
    "In Class": "bg-blue-500/10 text-blue-600",
    "On Break": "bg-amber-500/10 text-amber-600",
    "On Leave": "bg-red-500/10 text-red-500",
  }[s] || "bg-slate-100 text-slate-500");

  const statusIcon = (s: string) => ({
    "Available": CheckCircle2,
    "In Class": BookOpen,
    "On Break": Coffee,
    "On Leave": AlertCircle,
  }[s] || Clock);

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans text-[#111827]">
      <Sidebar role="scheduler" className="hidden md:flex w-64 shrink-0" />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar
          title="Teacher Availability"
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
            {/* Left: Teacher List */}
            <div className="flex-[1.6] bg-card border border-border rounded-xl shadow-sm flex flex-col overflow-hidden">
              <div className="p-5 border-b border-border bg-slate-50/50 flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[200px]">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input type="text" placeholder="Search teachers..." className="w-full h-10 bg-white border border-border rounded-lg pl-9 pr-4 text-[13px] font-medium outline-none focus:border-primary transition-all" />
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
                {filtered.map((teacher) => {
                  const SIcon = statusIcon(teacher.status);
                  return (
                    <div
                      key={teacher.id}
                      onClick={() => setSelectedId(teacher.id)}
                      className={cn(
                        "p-5 flex items-center gap-4 cursor-pointer transition-all hover:bg-slate-50",
                        selectedId === teacher.id && "bg-primary/5 border-l-4 border-primary"
                      )}
                    >
                      <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[13px] shrink-0 border border-primary/20">
                        {teacher.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <div className="text-[14px] font-bold text-foreground truncate">{teacher.name}</div>
                          <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0", statusStyle(teacher.status))}>
                            {teacher.status}
                          </span>
                        </div>
                        <div className="text-[12px] font-bold text-muted-foreground mt-0.5">{teacher.subject}</div>
                        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-1.5">
                          <Clock size={11} /> Free from: {teacher.freeUntil} &nbsp;•&nbsp; {teacher.classesToday} classes today
                        </div>
                      </div>
                      {teacher.status === "Available" && (
                        <button className="h-8 px-3 border border-primary text-primary rounded-lg text-[11px] font-bold hover:bg-primary/5 transition-all shrink-0">
                          Assign
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-border flex items-center justify-between bg-slate-50/50">
                <span className="text-[12px] font-semibold text-muted-foreground">Showing {filtered.length} of {teachers.length} teachers</span>
                <div className="flex gap-1">
                  <button className="w-8 h-8 border border-border rounded-lg flex items-center justify-center text-muted-foreground disabled:opacity-30" disabled>
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
                <h3 className="text-[15px] font-bold text-foreground">Teacher Details</h3>
                <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider", statusStyle(selected.status))}>
                  {selected.status}
                </span>
              </div>

              <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-6">
                {/* Profile Hero */}
                <div className="flex flex-col items-center text-center pb-6 border-b border-border">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl border-4 border-white shadow-md mb-3">
                    {selected.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="text-[18px] font-bold text-foreground">{selected.name}</div>
                  <div className="text-[13px] font-bold text-muted-foreground mt-1">{selected.subject}</div>
                  <div className="mt-3 flex gap-2">
                    <span className={cn("px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider", statusStyle(selected.status))}>
                      {selected.status}
                    </span>
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-3">
                  <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Contact</div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 border border-border rounded-lg text-[13px] font-bold text-foreground">
                    <Mail size={14} className="text-muted-foreground" />{selected.email}
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 border border-border rounded-lg text-[13px] font-bold text-foreground">
                    <Phone size={14} className="text-muted-foreground" />{selected.phone}
                  </div>
                </div>

                {/* Today's Schedule */}
                <div className="space-y-3">
                  <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Today's Load</div>
                  <div className="flex gap-3">
                    <div className="flex-1 bg-slate-50 border border-border rounded-lg p-4 text-center">
                      <div className="text-xl font-bold text-foreground">{selected.classesToday}</div>
                      <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Classes Today</div>
                    </div>
                    <div className="flex-1 bg-slate-50 border border-border rounded-lg p-4 text-center">
                      <div className="text-xl font-bold text-foreground">{selected.freeUntil}</div>
                      <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Free Until</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {(selected.status === "Available" || selected.status === "On Break") && (
                <div className="p-5 border-t border-border space-y-3 bg-slate-50/50">
                  <button className="w-full h-11 border border-primary text-primary rounded-xl text-[13px] font-bold flex items-center justify-center gap-2 hover:bg-primary/5 transition-all">
                    <CalendarDays size={16} /> View Full Schedule
                  </button>
                  <button className="w-full h-11 bg-primary text-white rounded-xl text-[13px] font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                    <Plus size={16} /> Assign Demo Class
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
