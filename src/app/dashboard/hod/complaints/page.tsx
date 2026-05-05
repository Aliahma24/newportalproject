"use client";

import React, { useState } from "react";
import {
  AlertTriangle, Search, Filter, MessageSquare, CheckCircle2,
  Clock, User, ShieldAlert, ChevronRight, Send, AlertCircle
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function HODComplaints() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("CMP-0045");

  const complaints = [
    { id: "CMP-0045", student: "Zaid Ibrahim", teacher: "Ustadh Bilal", issue: "Teacher camera off during class", date: "Today, 10:30 AM", status: "Urgent", category: "Teacher Behavior" },
    { id: "CMP-0046", student: "Sara Ahmed", teacher: "Sheikh Omar", issue: "Poor audio quality throughout session", date: "Yesterday", status: "Open", category: "Technical" },
    { id: "CMP-0047", student: "Tariq Mansoor", teacher: "Ustadh Bilal", issue: "Class started 15 mins late", date: "May 2", status: "Resolved", category: "Punctuality" },
    { id: "CMP-0048", student: "Amira El-Sayed", teacher: "Ustada Fatima", issue: "Mistakes in tajweed correction", date: "May 1", status: "Investigating", category: "Quality" },
  ];

  const selected = complaints.find(c => c.id === selectedId) || complaints[0];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="hod" className="hidden md:flex w-64 shrink-0" />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar title="Complaints Manager" onMenuClick={() => setSidebarOpen(true)} userName="Dr. Abdur Rahman" userRole="HOD" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-muted/30">
          <div className="flex flex-col lg:flex-row gap-6 h-full min-h-0">
            {/* List Panel */}
            <div className="flex-1 bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-border bg-muted/20 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[15px] font-bold text-foreground flex items-center gap-2">
                    <AlertTriangle size={18} className="text-red-500" /> Inbox
                  </h3>
                  <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">2 Urgent</span>
                </div>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search by ID or name..."
                    className="w-full h-10 bg-card border border-border rounded-xl pl-9 pr-3 text-[13px] font-medium focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto divide-y divide-border">
                {complaints.map((c) => (
                  <div 
                    key={c.id}
                    onClick={() => setSelectedId(c.id)}
                    className={cn(
                      "p-5 cursor-pointer transition-all hover:bg-muted/10 group relative",
                      selectedId === c.id && "bg-primary/5"
                    )}
                  >
                    {selectedId === c.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold text-muted-foreground font-mono">{c.id}</span>
                      <span className={cn("px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest",
                        c.status === "Urgent" ? "bg-red-100 text-red-500" :
                        c.status === "Resolved" ? "bg-emerald-100 text-emerald-600" :
                        "bg-amber-100 text-amber-600"
                      )}>{c.status}</span>
                    </div>
                    <h4 className="text-[13px] font-bold text-foreground leading-tight group-hover:text-primary transition-colors">{c.issue}</h4>
                    <div className="flex items-center gap-3 mt-3 text-[11px] text-muted-foreground font-medium">
                      <span className="flex items-center gap-1"><User size={12} /> {c.student}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {c.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detail Panel */}
            <div className="flex-[1.8] bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-border bg-muted/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-500">
                    <ShieldAlert size={20} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-foreground">Complaint Details</h3>
                    <p className="text-[11px] text-muted-foreground font-bold font-mono">{selected.id}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="h-9 px-4 bg-emerald-500 text-white rounded-lg text-[12px] font-bold flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 size={16} /> Mark Resolved
                  </button>
                </div>
              </div>

              <div className="flex-1 p-6 space-y-8 overflow-y-auto">
                {/* Meta Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Student</div>
                    <div className="text-[13px] font-bold text-foreground">{selected.student}</div>
                  </div>
                  <div className="space-y-1 text-center border-x border-border/50">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Teacher</div>
                    <div className="text-[13px] font-bold text-foreground">{selected.teacher}</div>
                  </div>
                  <div className="space-y-1 text-center">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Category</div>
                    <div className="text-[13px] font-bold text-foreground">{selected.category}</div>
                  </div>
                  <div className="space-y-1 text-right">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Submitted</div>
                    <div className="text-[13px] font-bold text-foreground">{selected.date}</div>
                  </div>
                </div>

                {/* Complaint Body */}
                <div className="space-y-3">
                  <h4 className="text-[14px] font-bold text-foreground flex items-center gap-2">
                    <AlertCircle size={16} className="text-red-500" /> Description
                  </h4>
                  <div className="bg-muted/30 border border-border rounded-xl p-5 text-[14px] text-foreground leading-relaxed font-medium">
                    {selected.issue}. This was reported during the live session. The student claims it's a recurring issue that affects their concentration.
                  </div>
                </div>

                {/* Internal Communication */}
                <div className="space-y-4">
                  <h4 className="text-[14px] font-bold text-foreground flex items-center gap-2">
                    <MessageSquare size={16} className="text-primary" /> Internal Notes
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-[10px] shrink-0">MT</div>
                      <div className="bg-secondary/5 border border-secondary/10 rounded-2xl rounded-tl-none p-4 text-[13px] font-medium text-foreground max-w-[80%]">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-secondary">Monitoring Team</span>
                          <span className="text-[10px] opacity-60">10:45 AM</span>
                        </div>
                        Verified the class recording. The camera was indeed off for 12 minutes. The teacher claims it was a connection issue.
                      </div>
                    </div>
                  </div>

                  {/* Add Note */}
                  <div className="relative">
                    <textarea 
                      placeholder="Add an internal note or instructions for the team..."
                      className="w-full bg-card border border-border rounded-2xl p-4 pr-14 text-[13px] font-medium outline-none focus:border-primary transition-all resize-none shadow-inner"
                      rows={3}
                    />
                    <button className="absolute right-3 bottom-3 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                      <Send size={18} />
                    </button>
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
