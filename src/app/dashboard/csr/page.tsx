"use client";

import React, { useState } from "react";
import {
  Video, Search, Filter, Bell, Clock, CheckCircle2, XCircle,
  Plus, Calendar, MoreVertical, ExternalLink, ArrowRight
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function DemoDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");

  const demos = [
    { id: "DEM-101", student: "Zaid Ibrahim", guardian: "Ibrahim Ali", submitted: "2 hours ago", status: "Pending", phone: "+92 300 1234567" },
    { id: "DEM-102", student: "Sara Ahmed", guardian: "Ahmed Khan", submitted: "5 hours ago", status: "Scheduled", phone: "+92 321 7654321" },
    { id: "DEM-103", student: "Tariq Mansoor", guardian: "Mansoor Malik", submitted: "Yesterday", status: "Completed", phone: "+92 333 1122334" },
    { id: "DEM-104", student: "Amira El-Sayed", guardian: "Sayed Omar", submitted: "2 days ago", status: "Cancelled", phone: "+92 312 9988776" },
    { id: "DEM-105", student: "Yahya Hassan", guardian: "Hassan Ali", submitted: "3 days ago", status: "Pending", phone: "+92 301 4455667" },
  ];

  const pendingCount = demos.filter(d => d.status === "Pending").length;

  const filteredDemos = filterStatus === "All" ? demos : demos.filter(d => d.status === filterStatus);

  const statusStyles = {
    Pending: "bg-amber-100 text-amber-600 border-amber-200",
    Scheduled: "bg-blue-100 text-blue-600 border-blue-200",
    Completed: "bg-emerald-100 text-emerald-600 border-emerald-200",
    Cancelled: "bg-red-100 text-red-500 border-red-200",
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="csr" className="hidden md:flex w-64 shrink-0" />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar title="Demo Dashboard" onMenuClick={() => setSidebarOpen(true)} userName="Zoya Ahmed" userRole="CSR" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-muted/30 space-y-6">
          
          {/* Notification Bar */}
          {pendingCount > 0 && (
            <div className="bg-amber-500 text-white px-6 py-4 rounded-2xl shadow-lg shadow-amber-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell size={20} className="animate-bounce" />
                <span className="text-[14px] font-bold">Action Needed: {pendingCount} demo requests are waiting to be scheduled.</span>
              </div>
              <button className="bg-white/20 hover:bg-white/30 transition-all px-4 py-1.5 rounded-lg text-[12px] font-bold flex items-center gap-2 border border-white/30 backdrop-blur-sm">
                View Pending <ArrowRight size={14} />
              </button>
            </div>
          )}

          {/* Stats & Quick Actions */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total Demos", val: demos.length, icon: Video, color: "text-slate-600 bg-slate-100" },
                { label: "Pending", val: pendingCount, icon: Clock, color: "text-amber-600 bg-amber-100" },
                { label: "Scheduled", val: "1", icon: Calendar, color: "text-blue-600 bg-blue-100" },
                { label: "Completed", val: "1", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-100" },
              ].map((s, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col gap-2">
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", s.color)}>
                    <s.icon size={16} />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-foreground leading-none">{s.val}</div>
                    <div className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-widest">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="shrink-0 flex items-center gap-3">
              <Link href="/dashboard/csr/request" className="h-full px-6 bg-primary text-white rounded-2xl text-[14px] font-bold flex flex-col items-center justify-center gap-1 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all min-w-[160px]">
                <Plus size={20} />
                <span>New Request</span>
              </Link>
            </div>
          </div>

          {/* Demos Table */}
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-border bg-muted/20 flex flex-wrap items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search student or guardian..."
                  className="w-full h-10 bg-card border border-border rounded-xl pl-9 pr-3 text-[13px] font-medium focus:border-primary outline-none transition-all"
                />
              </div>
              <div className="flex items-center gap-1.5">
                {["All", "Pending", "Scheduled", "Completed", "Cancelled"].map(s => (
                  <button 
                    key={s} 
                    onClick={() => setFilterStatus(s)}
                    className={cn(
                      "h-8 px-3 rounded-lg text-[11px] font-bold transition-all",
                      filterStatus === s ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/10">
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Student / Guardian</th>
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Contact</th>
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Submitted</th>
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Status</th>
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredDemos.map((demo) => (
                    <tr key={demo.id} className="hover:bg-muted/5 transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[12px]">
                            {demo.student.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="text-[14px] font-bold text-foreground leading-tight">{demo.student}</div>
                            <div className="text-[11px] text-muted-foreground font-medium mt-1">Guardian: {demo.guardian}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-[13px] font-semibold text-muted-foreground">{demo.phone}</td>
                      <td className="p-4 text-[13px] font-medium text-muted-foreground">{demo.submitted}</td>
                      <td className="p-4">
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                          statusStyles[demo.status as keyof typeof statusStyles]
                        )}>
                          {demo.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-muted-foreground hover:text-primary transition-all">
                            <ExternalLink size={16} />
                          </button>
                          <button className="p-2 text-muted-foreground hover:bg-muted rounded-lg transition-all">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
