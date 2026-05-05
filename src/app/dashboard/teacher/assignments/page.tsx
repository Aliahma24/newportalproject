"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ClipboardList,
  ChevronDown,
  X,
  FileText,
  User,
  Calendar
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Assignment {
  id: string;
  title: string;
  type: string;
  assignedTo: string;
  dueDate: string;
  status: "Published" | "Draft" | "Closed";
  submissionRate: string;
  gradingStatus: "All Graded" | "Pending" | "None";
}

export default function Assignments() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const assignments: Assignment[] = [
    { 
      id: "1", 
      title: "Surah Al-Mulk Memorization", 
      type: "Hifz", 
      assignedTo: "Grade 5 - Quran Section", 
      dueDate: "Nov 05, 2026", 
      status: "Published", 
      submissionRate: "18/24", 
      gradingStatus: "Pending" 
    },
    { 
      id: "2", 
      title: "Tajweed Rules Quiz - Lesson 4", 
      type: "Quiz", 
      assignedTo: "Intermediate Group B", 
      dueDate: "Oct 30, 2026", 
      status: "Published", 
      submissionRate: "12/15", 
      gradingStatus: "All Graded" 
    },
    { 
      id: "3", 
      title: "Arabic Pronunciation Voice Recording", 
      type: "Oral", 
      assignedTo: "Ahmed Raza", 
      dueDate: "Oct 28, 2026", 
      status: "Closed", 
      submissionRate: "1/1", 
      gradingStatus: "All Graded" 
    },
    { 
      id: "4", 
      title: "Basic Duas Worksheet", 
      type: "Written", 
      assignedTo: "Beginners Level A", 
      dueDate: "Nov 12, 2026", 
      status: "Draft", 
      submissionRate: "0/30", 
      gradingStatus: "None" 
    },
    { 
      id: "5", 
      title: "Friday Weekly Assessment", 
      type: "Hifz", 
      assignedTo: "Hifz Evening Batch", 
      dueDate: "Oct 27, 2026", 
      status: "Published", 
      submissionRate: "22/25", 
      gradingStatus: "Pending" 
    },
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <Sidebar role="teacher" className="hidden md:flex w-64 shrink-0" />

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-72 h-full animate-in slide-in-from-left duration-300">
            <Sidebar role="teacher" className="w-full" />
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
          title="Assignments" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Ustadha Aisha"
          userRole="Senior Teacher"
          userAvatar="https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F5"
          hideSearch
        />

        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 space-y-8 bg-slate-50/30">
          
          {/* Header Actions & Stats */}
          <div className="flex flex-col xl:flex-row gap-6 justify-between items-start xl:items-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full xl:w-auto">
              <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col gap-1">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Total</span>
                <span className="text-2xl font-bold text-foreground">12</span>
              </div>
              <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col gap-1">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider text-emerald-600">Active</span>
                <span className="text-2xl font-bold text-emerald-600">8</span>
              </div>
              <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col gap-1">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider text-amber-500">Pending</span>
                <span className="text-2xl font-bold text-amber-500">3</span>
              </div>
              <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col gap-1">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider text-rose-500">Due Today</span>
                <span className="text-2xl font-bold text-rose-500">1</span>
              </div>
            </div>

            <button className="bg-primary text-primary-foreground px-6 h-11 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 w-full md:w-auto justify-center">
              <Plus size={18} />
              Create New Assignment
            </button>
          </div>

          {/* Main Table Panel */}
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
            {/* Filter Bar */}
            <div className="p-4 px-6 border-b border-border flex flex-wrap gap-4 items-center bg-card">
              <div className="flex-1 max-w-sm flex items-center bg-muted rounded-lg px-4 h-10 gap-3 border border-transparent focus-within:border-primary/30 transition-all">
                <Search size={16} className="text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search by assignment title..." 
                  className="bg-transparent border-none outline-none text-[13px] font-semibold text-foreground w-full placeholder:text-muted-foreground/60 placeholder:font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-3 ml-auto">
                <button className="h-10 px-4 border border-border rounded-lg bg-card text-[13px] font-bold text-foreground flex items-center gap-2 hover:bg-muted transition-all">
                  <Filter size={16} className="text-muted-foreground" />
                  Filter
                  <ChevronDown size={14} className="text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Table Area */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[950px]">
                <thead>
                  <tr className="bg-slate-50/80">
                    <th className="p-4 px-6 border-b border-border text-[11px] font-bold text-muted-foreground uppercase tracking-wider w-[300px]">Assignment Title</th>
                    <th className="p-4 px-6 border-b border-border text-[11px] font-bold text-muted-foreground uppercase tracking-wider w-[180px]">Assigned To</th>
                    <th className="p-4 px-6 border-b border-border text-[11px] font-bold text-muted-foreground uppercase tracking-wider w-[140px]">Due Date</th>
                    <th className="p-4 px-6 border-b border-border text-[11px] font-bold text-muted-foreground uppercase tracking-wider w-[120px]">Status</th>
                    <th className="p-4 px-6 border-b border-border text-[11px] font-bold text-muted-foreground uppercase tracking-wider w-[120px]">Submissions</th>
                    <th className="p-4 px-6 border-b border-border text-[11px] font-bold text-muted-foreground uppercase tracking-wider w-[140px]">Grading</th>
                    <th className="p-4 px-6 border-b border-border text-[11px] font-bold text-muted-foreground uppercase tracking-wider w-[100px]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {assignments.map((assignment) => (
                    <tr key={assignment.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="p-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                            assignment.status === "Published" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                          )}>
                            <FileText size={18} />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[14px] font-bold text-foreground truncate group-hover:text-primary transition-colors">{assignment.title}</span>
                            <span className="text-[11px] font-semibold text-muted-foreground">{assignment.type}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 px-6">
                        <div className="flex items-center gap-2">
                          <User size={14} className="text-muted-foreground" />
                          <span className="text-[13px] font-semibold text-foreground">{assignment.assignedTo}</span>
                        </div>
                      </td>
                      <td className="p-4 px-6">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-muted-foreground" />
                          <span className="text-[13px] font-bold text-foreground">{assignment.dueDate}</span>
                        </div>
                      </td>
                      <td className="p-4 px-6">
                        <span className={cn(
                          "px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider",
                          assignment.status === "Published" && "bg-emerald-500/10 text-emerald-600",
                          assignment.status === "Draft" && "bg-slate-500/10 text-slate-600",
                          assignment.status === "Closed" && "bg-rose-500/10 text-rose-600"
                        )}>
                          {assignment.status}
                        </span>
                      </td>
                      <td className="p-4 px-6">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[13px] font-bold text-foreground">{assignment.submissionRate}</span>
                          <div className="h-1 bg-muted rounded-full overflow-hidden w-20">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${(parseInt(assignment.submissionRate.split('/')[0]) / parseInt(assignment.submissionRate.split('/')[1])) * 100}%` }} 
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-4 px-6">
                        <div className="flex items-center gap-2">
                          {assignment.gradingStatus === "All Graded" ? (
                            <CheckCircle2 size={16} className="text-emerald-500" />
                          ) : assignment.gradingStatus === "Pending" ? (
                            <Clock size={16} className="text-amber-500" />
                          ) : (
                            <AlertCircle size={16} className="text-muted-foreground/30" />
                          )}
                          <span className={cn(
                            "text-[12px] font-bold",
                            assignment.gradingStatus === "All Graded" && "text-emerald-600",
                            assignment.gradingStatus === "Pending" && "text-amber-500",
                            assignment.gradingStatus === "None" && "text-muted-foreground"
                          )}>
                            {assignment.gradingStatus}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 px-6">
                        <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground transition-all">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination / Footer */}
            <div className="p-4 px-6 bg-slate-50 border-t border-border flex justify-between items-center">
              <span className="text-[12px] font-semibold text-muted-foreground">Showing 5 of 12 assignments</span>
              <div className="flex gap-2">
                <button className="h-8 px-4 border border-border rounded-lg bg-card text-[11px] font-bold text-muted-foreground hover:bg-muted transition-all disabled:opacity-50" disabled>Previous</button>
                <button className="h-8 px-4 border border-border rounded-lg bg-card text-[11px] font-bold text-foreground hover:bg-muted transition-all">Next</button>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
