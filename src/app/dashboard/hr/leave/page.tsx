"use client";

import React, { useState } from "react";
import { 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Check,
  X as XIcon,
  Eye,
  Calendar,
  X,
  Clock,
  Briefcase
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LeaveRequest {
  id: string;
  empId: string;
  name: string;
  avatar: string;
  role: string;
  type: string;
  duration: string;
  dateRange: string;
  appliedDate: string;
  status: "Pending" | "Approved" | "Rejected";
  reason: string;
  balances: {
    medical: { used: number; total: number };
    annual: { used: number; total: number };
    casual: { used: number; total: number };
  };
  substitute: string;
}

export default function LeaveManagement() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState("1");

  const requests: LeaveRequest[] = [
    {
      id: "1",
      empId: "EMP-1042",
      name: "Ustadh Bilal",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F25-35%2FMiddle%20Eastern%2F3",
      role: "Tajweed Instructor",
      type: "Medical Leave",
      duration: "3 Days",
      dateRange: "25 Oct - 27 Oct",
      appliedDate: "23 Oct 2024",
      status: "Pending",
      reason: "Suffering from severe flu and high fever. Doctor has advised complete rest for the next few days. Medical certificate will be submitted upon return.",
      balances: {
        medical: { used: 4, total: 10 },
        annual: { used: 12, total: 20 },
        casual: { used: 1, total: 5 }
      },
      substitute: "Hafiz Usman (Pending Confirmation)"
    },
    {
      id: "2",
      empId: "EMP-1045",
      name: "Fatima Ali",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F4",
      role: "Admin Assistant",
      type: "Annual Leave",
      duration: "7 Days",
      dateRange: "01 Nov - 07 Nov",
      appliedDate: "21 Oct 2024",
      status: "Pending",
      reason: "Planning a family trip out of station. Will ensure all pending administrative tasks are completed before departure.",
      balances: {
        medical: { used: 2, total: 10 },
        annual: { used: 5, total: 20 },
        casual: { used: 2, total: 5 }
      },
      substitute: "Aisha Rahman"
    },
    {
      id: "3",
      empId: "EMP-1048",
      name: "Hafiz Usman",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FSouth%20Asian%2F5",
      role: "Hifz Instructor",
      type: "Casual Leave",
      duration: "1 Day",
      dateRange: "18 Oct 2024",
      appliedDate: "16 Oct 2024",
      status: "Approved",
      reason: "Need to attend a close relative's wedding ceremony.",
      balances: {
        medical: { used: 0, total: 10 },
        annual: { used: 8, total: 20 },
        casual: { used: 3, total: 5 }
      },
      substitute: "Ustadh Bilal"
    },
    {
      id: "4",
      empId: "EMP-1051",
      name: "Aisha Rahman",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FMiddle%20Eastern%2F1",
      role: "Curriculum Developer",
      type: "Umrah Leave",
      duration: "15 Days",
      dateRange: "10 Dec - 24 Dec",
      appliedDate: "15 Oct 2024",
      status: "Approved",
      reason: "Applying for leave to perform Umrah with family.",
      balances: {
        medical: { used: 1, total: 10 },
        annual: { used: 0, total: 20 },
        casual: { used: 1, total: 5 }
      },
      substitute: "Fatima Ali"
    },
    {
      id: "5",
      empId: "EMP-1060",
      name: "Zainab Tariq",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F18-25%2FSouth%20Asian%2F2",
      role: "Junior Teacher",
      type: "Casual Leave",
      duration: "2 Days",
      dateRange: "05 Oct - 06 Oct",
      appliedDate: "04 Oct 2024",
      status: "Rejected",
      reason: "Personal work at home.",
      balances: {
        medical: { used: 2, total: 10 },
        annual: { used: 15, total: 20 },
        casual: { used: 5, total: 5 }
      },
      substitute: "Not Assigned"
    }
  ];

  const selectedRequest = requests.find(r => r.id === selectedRequestId) || requests[0];

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans text-[#111827]">
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
              <XIcon size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar 
          title="Leave Management" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Yusuf Ahmed"
          userRole="HR Director"
          userAvatar="https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FSouth%20Asian%2F2"
          placeholder="Search employee..."
        />

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden p-6 md:p-8 gap-6 bg-slate-50/30">
          
          {/* Table Section */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <div className="bg-card border border-border rounded-xl shadow-lg flex flex-col h-full overflow-hidden">
              {/* Toolbar */}
              <div className="p-4 border-b border-border flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative group min-w-[220px]">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Search requests..." 
                      className="w-full h-10 bg-slate-50 border border-border rounded-lg pl-10 pr-4 text-[13px] font-medium outline-none focus:border-primary transition-all"
                    />
                  </div>
                  <select className="h-10 bg-card border border-border rounded-lg px-4 pr-10 text-[13px] font-bold text-foreground outline-none cursor-pointer hover:bg-slate-50 transition-colors appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394A3B8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center] bg-[length:14px]">
                    <option value="">All Leave Types</option>
                    <option value="medical">Medical</option>
                    <option value="annual">Annual</option>
                    <option value="casual">Casual</option>
                    <option value="umrah">Umrah / Hajj</option>
                  </select>
                  <select className="h-10 bg-card border border-border rounded-lg px-4 pr-10 text-[13px] font-bold text-foreground outline-none cursor-pointer hover:bg-slate-50 transition-colors appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394A3B8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center] bg-[length:14px]">
                    <option value="pending">Pending (2)</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="">All Statuses</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="flex-1 overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-slate-100/50">
                      <th className="p-4 px-6 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Employee</th>
                      <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Leave Type</th>
                      <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Date Range</th>
                      <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Status</th>
                      <th className="p-4 px-6 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {requests.map((req) => (
                      <tr 
                        key={req.id} 
                        className={cn(
                          "cursor-pointer transition-all group border-b border-border",
                          selectedRequestId === req.id ? "bg-primary/5 ring-1 ring-inset ring-primary/20" : "hover:bg-slate-50/80"
                        )}
                        onClick={() => setSelectedRequestId(req.id)}
                      >
                        <td className="p-4 px-6" onClick={() => setSelectedRequestId(req.id)}>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary font-bold text-[14px]">
                              {req.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="text-[14px] font-bold text-foreground leading-tight">{req.name}</div>
                              <div className="text-[11px] font-bold text-muted-foreground mt-0.5">#{req.empId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4" onClick={() => setSelectedRequestId(req.id)}>
                          <div className="text-[13px] font-bold text-foreground">{req.type}</div>
                          <div className="text-[11px] font-bold text-muted-foreground mt-0.5">{req.duration}</div>
                        </td>
                        <td className="p-4" onClick={() => setSelectedRequestId(req.id)}>
                          <div className="text-[13px] font-bold text-foreground">{req.dateRange}</div>
                          <div className="text-[12px] font-medium text-muted-foreground mt-0.5">Applied: {req.appliedDate}</div>
                        </td>
                        <td className="p-4" onClick={() => setSelectedRequestId(req.id)}>
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                            req.status === "Approved" ? "bg-emerald-500/10 text-emerald-600" : 
                            req.status === "Pending" ? "bg-amber-500/10 text-amber-600" :
                            "bg-red-500/10 text-red-600"
                          )}>
                            {req.status}
                          </span>
                        </td>
                        <td className="p-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            {req.status === "Pending" && (
                              <>
                                <button 
                                  className="w-8 h-8 rounded-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-50 transition-colors" 
                                  title="Approve"
                                  onClick={(e) => { e.stopPropagation(); setSelectedRequestId(req.id); }}
                                >
                                  <Check size={16} />
                                </button>
                                <button 
                                  className="w-8 h-8 rounded-lg flex items-center justify-center text-red-600 hover:bg-red-50 transition-colors" 
                                  title="Reject"
                                  onClick={(e) => { e.stopPropagation(); setSelectedRequestId(req.id); }}
                                >
                                  <XIcon size={16} />
                                </button>
                              </>
                            )}
                            <button 
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-slate-100 hover:text-primary transition-colors" 
                              title="View Details"
                              onClick={(e) => { e.stopPropagation(); setSelectedRequestId(req.id); }}
                            >
                              <Eye size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-border flex items-center justify-between bg-card">
                <span className="text-[13px] font-semibold text-muted-foreground">Showing 1 to 5 of 24 records</span>
                <div className="flex items-center gap-1.5">
                  <button disabled className="w-9 h-9 flex items-center justify-center border border-border rounded-lg text-muted-foreground disabled:opacity-40 transition-all"><ChevronLeft size={18} /></button>
                  <button className="w-9 h-9 flex items-center justify-center border border-primary bg-primary text-white rounded-lg text-[13px] font-bold shadow-md shadow-primary/10">1</button>
                  <button className="w-9 h-9 flex items-center justify-center border border-border rounded-lg text-[13px] font-bold hover:bg-slate-50 transition-all">2</button>
                  <button className="w-9 h-9 flex items-center justify-center border border-border rounded-lg text-[13px] font-bold hover:bg-slate-50 transition-all">3</button>
                  <span className="px-2 text-muted-foreground font-bold">...</span>
                  <button className="w-9 h-9 flex items-center justify-center border border-border rounded-lg text-muted-foreground hover:bg-slate-50 transition-all"><ChevronRight size={18} /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Panel */}
          <div className="w-full md:w-[360px] flex-shrink-0 bg-card border border-border rounded-xl shadow-lg flex flex-col overflow-hidden animate-in slide-in-from-right duration-500">
            <div className="relative">
              <div className="h-20 bg-gradient-to-br from-primary/20 to-primary/5" />
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                <div className="w-20 h-20 rounded-full bg-primary/10 border-[4px] border-card shadow-lg flex items-center justify-center text-primary font-bold text-2xl tracking-tighter">
                  {selectedRequest.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
            </div>
            <div className="mt-12 text-center px-4 pb-4 border-b border-border">
              <h2 className="text-xl font-bold text-foreground leading-tight">{selectedRequest.name}</h2>
              <p className="text-[13px] font-bold text-muted-foreground mt-1">{selectedRequest.role}</p>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
              <section>
                <h3 className="text-[12px] font-bold text-foreground uppercase tracking-widest mb-4">Leave Request Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Leave Type</div>
                    <div className="text-[13px] font-bold text-amber-500">{selectedRequest.type}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Status</div>
                    <div className="text-[13px] font-bold text-foreground">{selectedRequest.status} Approval</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">From Date</div>
                    <div className="text-[13px] font-bold text-foreground">{selectedRequest.dateRange.split("-")[0]}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">To Date</div>
                    <div className="text-[13px] font-bold text-foreground">{selectedRequest.dateRange.split("-")[1]}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Duration</div>
                    <div className="text-[13px] font-bold text-foreground">{selectedRequest.duration}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Reason</div>
                    <div className="bg-slate-50 border border-border rounded-lg p-3 text-[13px] font-medium leading-relaxed text-foreground italic">
                      "{selectedRequest.reason}"
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-[12px] font-bold text-foreground uppercase tracking-widest mb-4">Leave Balance (2024)</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-50 border border-border rounded-lg p-3 text-center">
                    <div className="text-[14px] font-bold text-foreground">{selectedRequest.balances.medical.used} <span className="text-[11px] text-muted-foreground font-medium">/ {selectedRequest.balances.medical.total}</span></div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Medical</div>
                  </div>
                  <div className="bg-slate-50 border border-border rounded-lg p-3 text-center">
                    <div className="text-[14px] font-bold text-foreground">{selectedRequest.balances.annual.used} <span className="text-[11px] text-muted-foreground font-medium">/ {selectedRequest.balances.annual.total}</span></div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Annual</div>
                  </div>
                  <div className="bg-slate-50 border border-border rounded-lg p-3 text-center">
                    <div className="text-[14px] font-bold text-foreground">{selectedRequest.balances.casual.used} <span className="text-[11px] text-muted-foreground font-medium">/ {selectedRequest.balances.casual.total}</span></div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Casual</div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-[12px] font-bold text-foreground uppercase tracking-widest mb-4">Covering Arrangements</h3>
                <div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Assigned Substitute</div>
                  <div className="text-[13px] font-bold text-foreground">{selectedRequest.substitute}</div>
                </div>
              </section>
            </div>

            <div className="p-6 border-t border-border flex gap-3 bg-slate-50/50 mt-auto">
              <button className="flex-1 h-11 border border-primary text-primary rounded-xl text-[13px] font-bold hover:bg-primary/5 transition-all">
                Reject
              </button>
              <button className="flex-1 h-11 bg-primary text-white rounded-xl text-[13px] font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                Approve Leave
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
