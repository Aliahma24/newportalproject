"use client";

import React, { useState } from "react";
import { 
  Clock, 
  Video, 
  TrendingUp, 
  CalendarClock, 
  ClipboardList, 
  Mic, 
  FileText, 
  UploadCloud,
  X
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function StudentDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const [attendanceStatus, setAttendanceStatus] = useState<"none" | "present" | "late">("none");

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <Sidebar role="student" className="hidden md:flex w-64 shrink-0" />

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-72 h-full animate-in slide-in-from-left duration-300">
            <Sidebar role="student" className="w-full" />
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
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar 
          title="Student Dashboard" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Omar Farooq"
          userRole="Hifz Student"
          userAvatar="https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FMiddle%20Eastern%2F1"
          hideSearch
        />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar">
          
          {/* ROW 1: Next Class Card + Attendance Verification */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 bg-card border border-border border-l-4 border-l-primary rounded-xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm relative overflow-hidden">
              <div className="space-y-3 flex-1 relative z-10">
                <div className="text-[11px] font-bold text-primary uppercase tracking-wider">Upcoming Class</div>
                <h2 className="text-2xl md:text-[26px] font-bold text-foreground leading-tight">Hifz Revision - Group B</h2>
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <Clock size={16} />
                  Starts in 15 mins (10:00 AM)
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                   <span className="bg-muted px-2 py-1 rounded text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Tajweed</span>
                   <span className="bg-muted px-2 py-1 rounded text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Memorization</span>
                </div>
              </div>

              <div className="flex items-center gap-4 pr-0 md:pr-12 md:border-r border-border shrink-0 relative z-10">
                 <img 
                    src="https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F5" 
                    alt="Teacher" 
                    className="h-12 w-12 rounded-full border-2 border-card bg-muted object-cover"
                 />
                 <div>
                    <div className="text-[15px] font-bold text-foreground">Ustadha Aisha</div>
                    <div className="text-xs font-semibold text-muted-foreground">Instructor</div>
                 </div>
              </div>

              <button className="w-full md:w-[160px] h-12 rounded-lg bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all active:scale-[0.98] shrink-0 shadow-lg shadow-primary/20 relative z-10">
                <Video size={18} />
                Join Class
              </button>
            </div>

            {/* Attendance Verification Card (Spec Section 14) */}
            <div className="bg-card border border-border rounded-xl p-6 flex flex-col justify-center gap-4 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <CalendarClock size={80} />
               </div>
               <div className="space-y-1">
                  <h3 className="text-[15px] font-bold text-foreground">Attendance Verification</h3>
                  <p className="text-[12px] font-medium text-muted-foreground">Double verification required for class credit.</p>
               </div>
               
               {attendanceStatus === "none" ? (
                 <div className="space-y-3">
                   <button 
                     onClick={() => setAttendanceStatus("present")}
                     className="w-full h-11 rounded-lg bg-emerald-500 text-white font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-md shadow-emerald-500/10"
                   >
                     Mark Me Present
                   </button>
                   <div className="flex items-center justify-center gap-2 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Class window active
                   </div>
                 </div>
               ) : (
                 <div className="h-20 bg-emerald-50 border border-emerald-100 rounded-lg flex flex-col items-center justify-center text-center px-4 animate-in fade-in zoom-in duration-300">
                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-[15px]">
                       <TrendingUp size={18} /> Attendance Marked!
                    </div>
                    <p className="text-[11px] font-bold text-emerald-600/70 mt-1 uppercase">Double Verified @ 09:58 AM</p>
                 </div>
               )}
            </div>
          </div>

          {/* ROW 2: Progress & Schedule */}
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Progress Card */}
            <div className="flex-1 bg-card border border-border rounded-xl p-6 flex flex-col shadow-sm">
              <div className="text-base font-bold text-foreground flex items-center gap-2.5 mb-6">
                <TrendingUp size={18} className="text-primary" />
                Course Progress
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center gap-8">
                 <div className="relative w-[140px] h-[140px] flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 140 140">
                       <circle cx="70" cy="70" r="62" fill="none" strokeWidth="10" strokeLinecap="round" className="stroke-muted" />
                       {/* 68% of circumference (389.55) = 264.89 (dasharray), remainder is offset */}
                       <circle cx="70" cy="70" r="62" fill="none" strokeWidth="10" strokeLinecap="round" className="stroke-primary" strokeDasharray="389.55" strokeDashoffset="124.66" />
                    </svg>
                    <div className="text-center">
                       <div className="text-4xl font-bold text-foreground leading-none">68%</div>
                       <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide mt-1.5">Completed</div>
                    </div>
                 </div>

                 <div className="w-full space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-muted">
                       <span className="text-sm font-semibold text-muted-foreground">Modules Completed</span>
                       <span className="text-sm font-bold text-foreground">12 / 18</span>
                    </div>
                    <div className="flex items-center justify-between pb-1">
                       <span className="text-sm font-semibold text-muted-foreground">Current Grade</span>
                       <span className="text-sm font-bold text-emerald-500">A- (92%)</span>
                    </div>
                 </div>
              </div>
            </div>

            {/* Today's Schedule Card */}
            <div className="flex-[2] bg-card border border-border rounded-xl p-6 flex flex-col shadow-sm">
              <div className="flex items-center justify-between mb-6">
                 <div className="text-base font-bold text-foreground flex items-center gap-2.5">
                   <CalendarClock size={18} className="text-primary" />
                   Today's Schedule
                 </div>
                 <div className="bg-muted px-2.5 py-1 rounded text-[10px] font-bold text-foreground uppercase tracking-wide">
                    3 Classes
                 </div>
              </div>

              <div className="flex-1 flex flex-col gap-3">
                 {/* Live Item */}
                 <div className="flex items-center gap-5 p-4 rounded-lg border border-primary bg-primary/5 cursor-pointer group">
                    <div className="w-20 text-[15px] font-bold text-primary shrink-0">10:00 AM</div>
                    <div className="flex-1 min-w-0">
                       <div className="text-base font-bold text-foreground truncate">Hifz Revision - Group B</div>
                       <div className="text-[13px] font-semibold text-muted-foreground mt-1">Virtual Room 1 • Ustadha Aisha</div>
                    </div>
                    <div className="text-[13px] font-bold text-primary flex items-center gap-2 shrink-0">
                       <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Live Now
                    </div>
                 </div>

                 {/* Upcoming Item */}
                 <div className="flex items-center gap-5 p-4 rounded-lg border border-border bg-background cursor-pointer hover:border-primary/30 transition-all">
                    <div className="w-20 text-[15px] font-bold text-foreground shrink-0">02:30 PM</div>
                    <div className="flex-1 min-w-0">
                       <div className="text-base font-bold text-foreground truncate">Tajweed Rules (Ghunnah)</div>
                       <div className="text-[13px] font-semibold text-muted-foreground mt-1">Virtual Room 3 • Ustadh Bilal</div>
                    </div>
                    <div className="text-[13px] font-bold text-muted-foreground shrink-0">Upcoming</div>
                 </div>

                 {/* Self-Paced Item */}
                 <div className="flex items-center gap-5 p-4 rounded-lg border border-border bg-background cursor-pointer hover:border-primary/30 transition-all">
                    <div className="w-20 text-[15px] font-bold text-foreground shrink-0">04:00 PM</div>
                    <div className="flex-1 min-w-0">
                       <div className="text-base font-bold text-foreground truncate">Islamic History - Prophets</div>
                       <div className="text-[13px] font-semibold text-muted-foreground mt-1">Self-paced study • Module 4</div>
                    </div>
                    <div className="text-[13px] font-bold text-muted-foreground shrink-0">Self-Paced</div>
                 </div>
              </div>
            </div>

          </div>

          {/* ROW 3: Assignments Preview & Submit */}
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Assignments List */}
            <div className="flex-[2] bg-card border border-border rounded-xl p-6 flex flex-col shadow-sm">
              <div className="flex items-center justify-between mb-5">
                 <div className="text-base font-bold text-foreground flex items-center gap-2.5">
                   <ClipboardList size={18} className="text-primary" />
                   Pending Assignments
                 </div>
                 <button className="text-xs font-bold text-primary uppercase tracking-wide hover:underline">
                    View All
                 </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                 {/* Assignment 1 */}
                 <div className="flex items-start gap-3.5 p-4 rounded-lg border border-border bg-background cursor-pointer hover:border-primary/30 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-muted text-primary flex items-center justify-center shrink-0">
                       <Mic size={20} />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                       <div className="text-sm font-bold text-foreground truncate">Surah Al-Baqarah (v. 100-110)</div>
                       <div className="text-xs font-semibold text-muted-foreground">Due Tomorrow, 11:59 PM</div>
                    </div>
                    <div className="bg-amber-500/10 text-amber-600 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide shrink-0">
                       Pending
                    </div>
                 </div>

                 {/* Assignment 2 */}
                 <div className="flex items-start gap-3.5 p-4 rounded-lg border border-border bg-background cursor-pointer hover:border-primary/30 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-muted text-primary flex items-center justify-center shrink-0">
                       <FileText size={20} />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                       <div className="text-sm font-bold text-foreground truncate">Tajweed Quiz #4</div>
                       <div className="text-xs font-semibold text-muted-foreground">Due Oct 26, 11:59 PM</div>
                    </div>
                    <div className="bg-amber-500/10 text-amber-600 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide shrink-0">
                       Pending
                    </div>
                 </div>
              </div>
            </div>

            {/* Submit Action Card */}
            <div className="flex-1 bg-card border border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm min-h-[160px] gap-4">
              <div>
                 <div className="text-[15px] font-bold text-foreground mb-1">Ready to submit?</div>
                 <div className="text-xs font-semibold text-muted-foreground">Upload audio recordings or documents</div>
              </div>
              <button className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                 <UploadCloud size={18} />
                 Submit Assignment
              </button>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
