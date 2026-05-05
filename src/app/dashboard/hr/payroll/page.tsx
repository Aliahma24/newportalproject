"use client";

import React, { useState } from "react";
import { 
  CreditCard, 
  Wallet, 
  BookOpen, 
  CalendarCheck, 
  Clock, 
  UserX, 
  Send, 
  FileText, 
  Calendar, 
  Eye, 
  Download,
  X,
  Bell
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SalaryHistory {
  id: string;
  month: string;
  classes: number;
  basePay: string;
  deductions: string;
  netSalary: string;
  status: "Paid" | "Pending";
}

export default function PayrollManagement() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const summary = [
    { title: "Final Salary", val: "$1,185.00", sub: "Ready for disbursement", icon: Wallet, highlight: true },
    { title: "Total Classes", val: "64", sub: "Conducted this month", icon: BookOpen },
    { title: "Present Days", val: "26 / 26", sub: "100% Attendance", icon: CalendarCheck },
    { title: "Late Penalties", val: "-$15.00", sub: "2 instances recorded", icon: Clock, negative: true },
    { title: "Absent Deductions", val: "$0.00", sub: "0 days missed", icon: UserX },
  ];

  const history: SalaryHistory[] = [
    { id: "1", month: "October 2024", classes: 64, basePay: "$1,200.00", deductions: "-$15.00 (Late)", netSalary: "$1,185.00", status: "Pending" },
    { id: "2", month: "September 2024", classes: 60, basePay: "$1,200.00", deductions: "$0.00", netSalary: "$1,200.00", status: "Paid" },
    { id: "3", month: "August 2024", classes: 56, basePay: "$1,200.00", deductions: "-$40.00 (Absent)", netSalary: "$1,160.00", status: "Paid" },
    { id: "4", month: "July 2024", classes: 62, basePay: "$1,200.00", deductions: "$0.00", netSalary: "$1,200.00", status: "Paid" },
    { id: "5", month: "June 2024", classes: 60, basePay: "$1,200.00", deductions: "-$10.00 (Late)", netSalary: "$1,190.00", status: "Paid" },
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
          title="Payroll Management" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Yusuf Ahmed"
          userRole="HR Director"
          userAvatar="https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FSouth%20Asian%2F2"
          placeholder="Search payroll records..."
        />

        <main className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-6 md:p-8 space-y-6">
          
          {/* Controls Card */}
          <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-sm flex flex-wrap items-center justify-between gap-6 transition-all hover:shadow-md">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-bold text-foreground whitespace-nowrap">Select Teacher:</span>
                <select className="h-10 bg-slate-50 border border-border rounded-lg px-4 pr-10 text-[13px] font-bold text-foreground outline-none cursor-pointer hover:bg-slate-100 transition-colors appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center] bg-[length:14px] min-w-[200px]">
                  <option value="usman">Hafiz Usman (#EMP-1048)</option>
                  <option value="bilal">Ustadh Bilal (#EMP-1042)</option>
                  <option value="fatima">Fatima Ali (#EMP-1045)</option>
                  <option value="aisha">Aisha Rahman (#EMP-1051)</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-bold text-foreground whitespace-nowrap">Month:</span>
                <select className="h-10 bg-slate-50 border border-border rounded-lg px-4 pr-10 text-[13px] font-bold text-foreground outline-none cursor-pointer hover:bg-slate-100 transition-colors appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center] bg-[length:14px] min-w-[160px]">
                  <option value="oct2024">October 2024</option>
                  <option value="sep2024">September 2024</option>
                  <option value="aug2024">August 2024</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="h-10 px-4 border border-primary text-primary rounded-lg text-[13px] font-bold flex items-center justify-center gap-2 hover:bg-primary/5 transition-all">
                <Send size={16} /> Send to Teacher
              </button>
              <button className="h-10 px-4 bg-primary text-white rounded-lg text-[13px] font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                <FileText size={16} /> Generate Salary Slip
              </button>
            </div>
          </div>

          {/* Summary Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {summary.map((card, i) => (
              <div key={i} className={cn(
                "bg-card border border-border rounded-xl p-5 shadow-sm relative overflow-hidden transition-all hover:-translate-y-1",
                card.highlight && "bg-primary border-primary text-white"
              )}>
                <card.icon size={48} className={cn(
                  "absolute top-5 right-5 opacity-10",
                  card.highlight ? "text-white" : "text-border"
                )} />
                <div className={cn("text-[11px] font-bold uppercase tracking-widest mb-2", card.highlight ? "text-white/80" : "text-muted-foreground")}>{card.title}</div>
                <div className={cn("text-2xl font-bold mb-1", card.negative ? "text-red-500" : card.highlight ? "text-white" : "text-foreground")}>{card.val}</div>
                <div className={cn("text-[11px] font-medium", card.highlight ? "text-white/80" : "text-muted-foreground")}>{card.sub}</div>
              </div>
            ))}
          </div>

          {/* Table History */}
          <div className="bg-card border border-border rounded-xl shadow-sm flex flex-col overflow-hidden">
            <div className="p-5 border-b border-border bg-slate-50/50">
              <h2 className="text-[15px] font-bold text-foreground">Salary History & Breakdown</h2>
            </div>
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-muted/30">
                    <th className="p-4 px-6 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Month</th>
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Total Classes</th>
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Base Pay</th>
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Deductions</th>
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Net Salary</th>
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Status</th>
                    <th className="p-4 px-6 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {history.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/50 transition-all">
                      <td className="p-4 px-6">
                        <div className="flex items-center gap-2 text-[13px] font-bold text-foreground">
                          <Calendar size={14} className="text-muted-foreground" />
                          {row.month}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-[13px] font-bold text-foreground">{row.classes} Classes</div>
                      </td>
                      <td className="p-4">
                        <div className="text-[13px] font-bold text-foreground">{row.basePay}</div>
                      </td>
                      <td className="p-4">
                        <div className={cn("text-[13px] font-bold", row.deductions.includes("-") ? "text-red-500" : "text-foreground")}>{row.deductions}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-[14px] font-extrabold text-foreground">{row.netSalary}</div>
                      </td>
                      <td className="p-4">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                          row.status === "Paid" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"
                        )}>
                          {row.status}
                        </span>
                      </td>
                      <td className="p-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-slate-100 hover:text-primary transition-colors" title="View Breakdown">
                            <Eye size={16} />
                          </button>
                          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-slate-100 hover:text-primary transition-colors" title="Download Slip">
                            <Download size={16} />
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
