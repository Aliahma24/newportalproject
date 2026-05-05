"use client";

import React, { useState } from "react";
import {
  BarChart2, Search, Filter, Calendar, Clock, User,
  CheckCircle2, AlertTriangle, ShieldCheck, FileText,
  TrendingUp, TrendingDown, Eye, Download, MoreVertical
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function HODQualityReports() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const reports = [
    { id: "REP-901", teacher: "Ustadh Bilal", student: "Zaid Ibrahim", agent: "Agent 01", date: "Today, 10:45 AM", score: "4.8", status: "Review Required" },
    { id: "REP-902", teacher: "Sheikh Omar", student: "Sara Ahmed", agent: "Agent 02", date: "Today, 09:30 AM", score: "4.2", status: "Critical" },
    { id: "REP-903", teacher: "Ustada Fatima", student: "Amira El-Sayed", agent: "Agent 01", date: "Yesterday", score: "5.0", status: "Verified" },
    { id: "REP-904", teacher: "Ustadh Tariq", student: "Tariq Mansoor", agent: "Agent 03", date: "Yesterday", score: "4.5", status: "Verified" },
    { id: "REP-905", teacher: "Sheikh Hassan", student: "Yahya Hassan", agent: "Agent 02", date: "May 2, 2024", score: "3.8", status: "Resolved" },
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="hod" className="hidden md:flex w-64 shrink-0" />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar title="Quality Reports" onMenuClick={() => setSidebarOpen(true)} userName="Dr. Abdur Rahman" userRole="HOD" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-muted/30 space-y-6">
          
          {/* Top Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex items-center gap-6">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <BarChart2 size={32} />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-2">Avg. Quality Score</h3>
                <div className="text-3xl font-bold text-foreground">4.6 / 5.0</div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1">
                   <TrendingUp size={12} /> +2% from last week
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex items-center gap-6">
              <div className="h-16 w-16 rounded-2xl bg-red-100 flex items-center justify-center text-red-500 shrink-0">
                <AlertTriangle size={32} />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-2">Critical Issues</h3>
                <div className="text-3xl font-bold text-foreground">3</div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-red-500 mt-1">
                   <TrendingDown size={12} /> -5 from yesterday
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex items-center gap-6">
              <div className="h-16 w-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <ShieldCheck size={32} />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-2">Reports Verified</h3>
                <div className="text-3xl font-bold text-foreground">124</div>
                <div className="text-[11px] font-bold text-muted-foreground mt-1">Total this month</div>
              </div>
            </div>
          </div>

          {/* Reports Table */}
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-border bg-muted/20 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                 <h3 className="text-[15px] font-bold text-foreground whitespace-nowrap">Audit Log</h3>
                 <div className="relative flex-1 max-w-sm">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input type="text" placeholder="Search teacher or report ID..." className="w-full h-10 bg-card border border-border rounded-xl pl-9 pr-3 text-[13px] font-medium focus:border-primary outline-none transition-all" />
                 </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="h-10 px-4 border border-border rounded-xl text-[12px] font-bold text-muted-foreground flex items-center gap-2 hover:bg-muted transition-all">
                  <Calendar size={16} /> Date Range
                </button>
                <button className="h-10 px-4 border border-border rounded-xl text-[12px] font-bold text-muted-foreground flex items-center gap-2 hover:bg-muted transition-all">
                  <Filter size={16} /> All Statuses
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/10">
                    <th className="p-4 px-6 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Report ID / Teacher</th>
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border text-center">Score</th>
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Auditor</th>
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Submitted</th>
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Status</th>
                    <th className="p-4 px-6 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-muted/5 transition-colors group">
                      <td className="p-4 px-6">
                         <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                               <FileText size={18} />
                            </div>
                            <div>
                               <div className="text-[14px] font-bold text-foreground leading-tight">{report.teacher}</div>
                               <div className="text-[11px] font-bold text-muted-foreground mt-0.5 font-mono uppercase tracking-tighter">{report.id}</div>
                            </div>
                         </div>
                      </td>
                      <td className="p-4 text-center">
                         <div className={cn(
                           "text-[15px] font-bold",
                           parseFloat(report.score) >= 4.5 ? "text-emerald-600" : 
                           parseFloat(report.score) >= 4.0 ? "text-primary" : "text-red-500"
                         )}>
                           {report.score}
                         </div>
                      </td>
                      <td className="p-4">
                         <div className="flex items-center gap-2 text-[13px] font-semibold text-muted-foreground">
                            <User size={14} /> {report.agent}
                         </div>
                      </td>
                      <td className="p-4">
                         <div className="flex items-center gap-2 text-[13px] font-medium text-muted-foreground">
                            <Clock size={14} /> {report.date}
                         </div>
                      </td>
                      <td className="p-4">
                         <span className={cn(
                           "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                           report.status === "Critical" ? "bg-red-500 text-white shadow-md shadow-red-500/20 animate-pulse" :
                           report.status === "Review Required" ? "bg-amber-100 text-amber-600" :
                           report.status === "Verified" ? "bg-emerald-100 text-emerald-600" :
                           "bg-slate-100 text-slate-500"
                         )}>
                           {report.status}
                         </span>
                      </td>
                      <td className="p-4 px-6 text-right">
                         <div className="flex items-center justify-end gap-2">
                           <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all" title="View Full Report">
                             <Eye size={16} />
                           </button>
                           <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all" title="Download PDF">
                             <Download size={16} />
                           </button>
                           <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-all">
                             <MoreVertical size={16} />
                           </button>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-border flex items-center justify-between bg-muted/10">
               <span className="text-[12px] font-bold text-muted-foreground">Showing 5 of 124 total reports audit log</span>
               <div className="flex gap-1">
                  <button className="w-8 h-8 border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-all" disabled>
                    <TrendingUp size={14} className="rotate-[-90deg]" />
                  </button>
                  <button className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center text-[12px] font-bold">1</button>
                  <button className="w-8 h-8 border border-border rounded-lg flex items-center justify-center text-[13px] font-bold text-muted-foreground hover:bg-muted transition-all">2</button>
                  <button className="w-8 h-8 border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-all">
                    <TrendingUp size={14} className="rotate-[90deg]" />
                  </button>
               </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
