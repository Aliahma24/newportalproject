"use client";

import React, { useState } from "react";
import {
  Clock, Search, Filter, FileText, CheckCircle2,
  AlertTriangle, User, Calendar, Eye, Download,
  MoreVertical, ShieldCheck, Video
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function MonitoringHistory() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const pastReports = [
    { id: "REP-901", teacher: "Ustadh Bilal", student: "Zaid Ibrahim", date: "Today, 10:45 AM", score: "4.8", status: "Verified", flags: 0 },
    { id: "REP-885", teacher: "Sheikh Omar", student: "Sara Ahmed", date: "Yesterday, 04:30 PM", score: "3.5", status: "Flagged", flags: 2 },
    { id: "REP-872", teacher: "Ustada Fatima", student: "Amira El-Sayed", date: "Yesterday, 02:15 PM", score: "5.0", status: "Verified", flags: 0 },
    { id: "REP-864", teacher: "Ustadh Tariq", student: "Yahya Hassan", date: "May 2, 2024", score: "4.2", status: "Verified", flags: 0 },
    { id: "REP-850", teacher: "Sheikh Hassan", student: "Ali Khan", date: "May 1, 2024", score: "2.8", status: "Critical", flags: 5 },
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="monitoring" className="hidden md:flex w-64 shrink-0" />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar title="Past Reports" onMenuClick={() => setSidebarOpen(true)} userName="Monitoring Agent 1" userRole="Monitoring" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-muted/30 space-y-6">
          
          {/* Dashboard Stats for Monitoring History */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex items-center gap-6">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <ShieldCheck size={32} />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Audits</h3>
                <div className="text-3xl font-bold text-foreground">428</div>
                <p className="text-[11px] font-medium text-muted-foreground mt-1">Life-time submissions</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex items-center gap-6">
              <div className="h-16 w-16 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                <AlertTriangle size={32} />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Flagged</h3>
                <div className="text-3xl font-bold text-foreground">12</div>
                <p className="text-[11px] font-medium text-muted-foreground mt-1">Required HOD review</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex items-center gap-6">
              <div className="h-16 w-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <Video size={32} />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Hours Watched</h3>
                <div className="text-3xl font-bold text-foreground">1.2k</div>
                <p className="text-[11px] font-medium text-muted-foreground mt-1">Live class monitoring</p>
              </div>
            </div>
          </div>

          {/* Search & List */}
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-border bg-muted/20 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1 min-w-[300px]">
                 <div className="relative flex-1 max-w-sm">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input type="text" placeholder="Search by student, teacher or ID..." className="w-full h-10 bg-card border border-border rounded-xl pl-9 pr-3 text-[13px] font-medium focus:border-primary outline-none transition-all" />
                 </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="h-10 px-4 border border-border rounded-xl text-[12px] font-bold text-muted-foreground flex items-center gap-2 hover:bg-muted transition-all">
                  <Calendar size={16} /> Filters
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/10">
                    <th className="p-4 px-6 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Report Detail</th>
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border text-center">Quality Score</th>
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Status</th>
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Flags</th>
                    <th className="p-4 px-6 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {pastReports.map((report) => (
                    <tr key={report.id} className="hover:bg-muted/5 transition-colors group">
                      <td className="p-4 px-6">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 border border-border">
                               <FileText size={20} />
                            </div>
                            <div>
                               <div className="text-[14px] font-bold text-foreground leading-tight">{report.teacher} vs {report.student}</div>
                               <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground font-medium">
                                  <span className="font-mono text-primary">{report.id}</span>
                                  <span className="flex items-center gap-1"><Clock size={12} /> {report.date}</span>
                               </div>
                            </div>
                         </div>
                      </td>
                      <td className="p-4 text-center">
                         <div className={cn(
                           "text-[15px] font-bold",
                           parseFloat(report.score) >= 4.0 ? "text-emerald-600" : 
                           parseFloat(report.score) >= 3.0 ? "text-amber-500" : "text-red-500"
                         )}>
                           {report.score} / 5.0
                         </div>
                      </td>
                      <td className="p-4">
                         <span className={cn(
                           "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                           report.status === "Verified" ? "bg-emerald-100 text-emerald-600" :
                           report.status === "Flagged" ? "bg-amber-100 text-amber-600" :
                           "bg-red-100 text-red-500"
                         )}>
                           {report.status}
                         </span>
                      </td>
                      <td className="p-4">
                         {report.flags > 0 ? (
                           <div className="flex items-center gap-1 text-[13px] font-bold text-red-500">
                             <AlertTriangle size={14} /> {report.flags} Flags
                           </div>
                         ) : (
                           <div className="flex items-center gap-1 text-[13px] font-bold text-emerald-600">
                             <CheckCircle2 size={14} /> Clean
                           </div>
                         )}
                      </td>
                      <td className="p-4 px-6 text-right">
                         <div className="flex items-center justify-end gap-2">
                           <button className="h-9 px-4 border border-border rounded-lg text-[12px] font-bold text-muted-foreground hover:bg-muted transition-all flex items-center gap-2">
                             <Eye size={16} /> View
                           </button>
                           <button className="w-9 h-9 border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-all">
                             <Download size={18} />
                           </button>
                           <button className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-all">
                             <MoreVertical size={18} />
                           </button>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-5 border-t border-border bg-muted/10 flex items-center justify-center">
               <button className="text-[13px] font-bold text-primary hover:underline">Load More Past Reports</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
