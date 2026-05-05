"use client";

import React, { useState } from "react";
import {
  Users, Search, Filter, Star, Clock, CalendarOff,
  CheckCircle2, XCircle, MoreVertical, ExternalLink, Mail, Phone
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function HODTeachers() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Directory");

  const teachers = [
    { name: "Ustadh Bilal", role: "Tajweed Specialist", students: 18, attendance: "98%", rating: 4.9, status: "Active" },
    { name: "Sheikh Omar", role: "Hifz Instructor", students: 12, attendance: "95%", rating: 4.7, status: "Active" },
    { name: "Ustada Fatima", role: "Islamic Studies", students: 22, attendance: "100%", rating: 5.0, status: "Active" },
    { name: "Ustadh Tariq", role: "Arabic Language", students: 15, attendance: "92%", rating: 4.5, status: "Active" },
    { name: "Sheikh Hassan", role: "Qira'at Instructor", students: 8, attendance: "88%", rating: 4.2, status: "On Leave" },
  ];

  const leaves = [
    { name: "Sheikh Hassan", reason: "Medical Leave", duration: "May 4 - May 7", status: "Pending" },
    { name: "Ustadh Tariq", reason: "Family Event", duration: "May 10 - May 10", status: "Approved" },
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="hod" className="hidden md:flex w-64 shrink-0" />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar title="Teacher Management" onMenuClick={() => setSidebarOpen(true)} userName="Dr. Abdur Rahman" userRole="HOD" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-muted/30 space-y-6">
          
          {/* Tabs */}
          <div className="flex items-center gap-2 p-1 bg-card border border-border rounded-xl w-fit">
            {["Directory", "Performance", "Leave Requests"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-2 rounded-lg text-[13px] font-bold transition-all",
                  activeTab === tab ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted-foreground hover:bg-muted"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "Directory" && (
            <div className="space-y-6">
              {/* Search & Filter */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search teachers by name or role..."
                    className="w-full h-11 bg-card border border-border rounded-xl pl-10 pr-4 text-[13px] font-medium focus:border-primary outline-none transition-all shadow-sm"
                  />
                </div>
                <button className="h-11 px-4 border border-border bg-card rounded-xl text-[13px] font-bold text-muted-foreground flex items-center gap-2 hover:bg-muted transition-all">
                  <Filter size={18} /> Filters
                </button>
              </div>

              {/* Teacher Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teachers.map((t, i) => (
                  <div key={i} className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col group hover:shadow-lg transition-all hover:-translate-y-1">
                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="w-16 h-16 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary font-bold text-xl">
                          {t.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          t.status === "Active" ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                        )}>{t.status}</span>
                      </div>
                      <div>
                        <h4 className="text-[16px] font-bold text-foreground">{t.name}</h4>
                        <p className="text-[12px] text-muted-foreground font-medium">{t.role}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-2 py-3 border-y border-border/50">
                        <div className="text-center">
                          <div className="text-[14px] font-bold text-foreground">{t.students}</div>
                          <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Students</div>
                        </div>
                        <div className="text-center border-x border-border/50">
                          <div className="text-[14px] font-bold text-emerald-600">{t.attendance}</div>
                          <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Attend.</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[14px] font-bold text-amber-500 flex items-center justify-center gap-1">
                            <Star size={12} fill="currentColor" /> {t.rating}
                          </div>
                          <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Rating</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="flex-1 h-10 border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:bg-muted transition-all">
                          <Mail size={16} />
                        </button>
                        <button className="flex-1 h-10 border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:bg-muted transition-all">
                          <Phone size={16} />
                        </button>
                        <button className="flex-[2] h-10 bg-primary text-white rounded-xl text-[12px] font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
                          Profile <ExternalLink size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Leave Requests" && (
            <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-border bg-muted/20">
                <h3 className="text-[15px] font-bold text-foreground">Pending Requests</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted/10">
                      <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Teacher</th>
                      <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Reason</th>
                      <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Duration</th>
                      <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Status</th>
                      <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {leaves.map((l, i) => (
                      <tr key={i} className="hover:bg-muted/5 transition-colors group">
                        <td className="p-4">
                          <div className="text-[14px] font-bold text-foreground">{l.name}</div>
                        </td>
                        <td className="p-4 text-[13px] font-semibold text-muted-foreground">{l.reason}</td>
                        <td className="p-4 text-[13px] font-bold text-foreground flex items-center gap-2">
                          <Clock size={14} className="text-primary" /> {l.duration}
                        </td>
                        <td className="p-4">
                          <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                            l.status === "Pending" ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"
                          )}>{l.status}</span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="h-9 px-3 bg-emerald-500 text-white rounded-lg text-[11px] font-bold hover:bg-emerald-600 transition-all flex items-center gap-1.5">
                              <CheckCircle2 size={14} /> Approve
                            </button>
                            <button className="h-9 px-3 bg-red-500 text-white rounded-lg text-[11px] font-bold hover:bg-red-600 transition-all flex items-center gap-1.5">
                              <XCircle size={14} /> Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
