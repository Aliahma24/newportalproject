"use client";

import React, { useState } from "react";
import { 
  Users, 
  CalendarClock, 
  CheckCircle2, 
  FileText, 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  Edit, 
  ChevronLeft, 
  ChevronRight,
  X,
  Calendar
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Applicant {
  id: string;
  name: string;
  avatar: string;
  appliedDate: string;
  email: string;
  phone: string;
  qualification: string;
  role: string;
  status: "Interview Scheduled" | "Selected" | "Applied (New)" | "Rejected";
}

export default function RecruitmentManagement() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { label: "Total Applicants", val: "42", icon: Users, color: "bg-slate-100 text-slate-600" },
    { label: "Interviews Scheduled", val: "8", icon: CalendarClock, color: "bg-amber-100 text-amber-600" },
    { label: "Selected Candidates", val: "15", icon: CheckCircle2, color: "bg-emerald-100 text-emerald-600" },
    { label: "New Applications", val: "5", icon: FileText, color: "bg-blue-100 text-blue-600" },
  ];

  const applicants: Applicant[] = [
    { 
      id: "1", 
      name: "Muhammad Aslam", 
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F25-35%2FSouth%20Asian%2F5",
      appliedDate: "22 Oct 2024",
      email: "m.aslam@example.com",
      phone: "+92 300 1234567",
      qualification: "Master's in Islamic Studies",
      role: "Tajweed Teacher",
      status: "Interview Scheduled"
    },
    { 
      id: "2", 
      name: "Aisha Rahman", 
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F4",
      appliedDate: "18 Oct 2024",
      email: "aisha.r@example.com",
      phone: "+92 301 7654321",
      qualification: "Hafiz-e-Quran / Ijaza",
      role: "Quran Memorization Teacher",
      status: "Selected"
    },
    { 
      id: "3", 
      name: "Omar Farooq", 
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FSouth%20Asian%2F6",
      appliedDate: "24 Oct 2024",
      email: "omar.f@example.com",
      phone: "+92 321 9876543",
      qualification: "Bachelor's in Arabic",
      role: "Arabic Language Tutor",
      status: "Applied (New)"
    },
    { 
      id: "4", 
      name: "Zainab Tariq", 
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F18-25%2FMiddle%20Eastern%2F3",
      appliedDate: "10 Oct 2024",
      email: "zainab.t@example.com",
      phone: "+92 333 1122334",
      qualification: "Tajweed Certification",
      role: "Substitute Teacher",
      status: "Rejected"
    },
    { 
      id: "5", 
      name: "Hafiz Usman", 
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FSouth%20Asian%2F3",
      appliedDate: "15 Oct 2024",
      email: "hafiz.u@example.com",
      phone: "+92 345 5566778",
      qualification: "Qira'at Certification",
      role: "Tajweed Teacher",
      status: "Interview Scheduled"
    },
    { 
      id: "6", 
      name: "Fatima Ali", 
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FMiddle%20Eastern%2F2",
      appliedDate: "23 Oct 2024",
      email: "fatima.a@example.com",
      phone: "+92 312 9988776",
      qualification: "Master's in Arabic",
      role: "Arabic Language Tutor",
      status: "Applied (New)"
    },
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
          title="Recruitment" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Yusuf Ahmed"
          userRole="HR Director"
          userAvatar="https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FSouth%20Asian%2F2"
          placeholder="Search applicants..."
        />

        <main className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-6 md:p-8 space-y-6">
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 shadow-sm flex items-center gap-4 transition-all hover:shadow-md hover:-translate-y-0.5">
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center shrink-0", s.color)}>
                  <s.icon size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-foreground leading-none">{s.val}</span>
                  <span className="text-[12px] font-bold text-muted-foreground mt-1">{s.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Table Card */}
          <div className="bg-card border border-border rounded-xl shadow-sm flex flex-col overflow-hidden">
            {/* Table Header */}
            <div className="p-5 border-b border-border flex flex-wrap items-center justify-between gap-4 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <h2 className="text-[16px] font-bold text-foreground">Applicant Pipeline</h2>
                <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-[10px] font-bold uppercase tracking-wider">42 Candidates</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search by name or email..." 
                    className="h-10 pl-10 pr-4 bg-white border border-border rounded-lg text-[13px] font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-64"
                  />
                </div>
                <select className="h-10 px-3 pr-10 bg-white border border-border rounded-lg text-[13px] font-bold text-foreground outline-none cursor-pointer hover:bg-slate-50 transition-colors appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center] bg-[length:14px]">
                  <option value="">All Statuses</option>
                  <option value="applied">Applied</option>
                  <option value="interview">Interview</option>
                  <option value="selected">Selected</option>
                  <option value="rejected">Rejected</option>
                </select>
                <button className="h-10 px-4 bg-primary text-white rounded-lg text-[13px] font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                  <Plus size={16} /> Add Applicant
                </button>
              </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-muted/30">
                    <th className="p-4 px-6 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Applicant Name</th>
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Contact Info</th>
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Qualification / Role</th>
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Status</th>
                    <th className="p-4 px-6 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {applicants.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/50 transition-all group">
                      <td className="p-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary font-bold text-[14px]">
                            {app.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="text-[14px] font-bold text-foreground leading-tight">{app.name}</div>
                            <div className="text-[11px] font-bold text-muted-foreground mt-0.5 whitespace-nowrap">Applied: {app.appliedDate}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground">
                            <Mail size={12} /> {app.email}
                          </div>
                          <div className="flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground">
                            <Phone size={12} /> {app.phone}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-[13px] font-bold text-foreground">{app.qualification}</div>
                        <div className="text-[11px] font-bold text-muted-foreground mt-0.5">Role: {app.role}</div>
                      </td>
                      <td className="p-4">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider whitespace-nowrap",
                          app.status === "Selected" ? "bg-emerald-500/10 text-emerald-600" : 
                          app.status === "Interview Scheduled" ? "bg-amber-500/10 text-amber-600" :
                          app.status === "Applied (New)" ? "bg-blue-500/10 text-blue-600" :
                          "bg-red-500/10 text-red-600"
                        )}>
                          {app.status}
                        </span>
                      </td>
                      <td className="p-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-slate-100 hover:text-primary transition-colors" title="View CV">
                            <FileText size={16} />
                          </button>
                          <button 
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-slate-100 hover:text-primary transition-colors",
                              (app.status === "Selected" || app.status === "Rejected") && "opacity-20 pointer-events-none"
                            )} 
                            title="Schedule Interview"
                          >
                            <CalendarClock size={16} />
                          </button>
                          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-slate-100 hover:text-primary transition-colors" title="Update Status">
                            <Edit size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-5 border-t border-border flex items-center justify-between bg-slate-50/30">
              <div className="text-[13px] font-bold text-muted-foreground">Showing 1 to 6 of 42 candidates</div>
              <div className="flex items-center gap-1.5">
                <button className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground disabled:opacity-30" disabled>
                  <ChevronLeft size={16} />
                </button>
                <button className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center text-[13px] font-bold">1</button>
                <button className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-[13px] font-bold text-foreground hover:bg-slate-100 transition-colors">2</button>
                <button className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-[13px] font-bold text-foreground hover:bg-slate-100 transition-colors">3</button>
                <div className="w-8 h-8 flex items-center justify-center text-[13px] font-bold text-muted-foreground">...</div>
                <button className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-slate-100 transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Sidebar Footer Component Enhancement (already handled in layout usually, but we can add the alert manually here if needed) */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
