"use client";

import React, { useState, useEffect } from "react";
import { 
  Clock, CheckCircle2, Video, BookOpen, Calendar, 
  AlertCircle, ShieldCheck, ArrowRight, Star,
  BellRing, PlayCircle, History, User
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function StudentDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Mock Class Data (e.g., Class at 07:00 PM - Assuming current time testing)
  const classStartTime = new Date();
  classStartTime.setHours(19, 0, 0); // 7:00 PM
  const classEndTime = new Date();
  classEndTime.setHours(20, 0, 0); // 8:00 PM

  const [attendance, setAttendance] = useState<{ marked: boolean; time: string | null }>({
    marked: false,
    time: null
  });

  const [classStatus, setClassStatus] = useState<"Locked" | "Joinable" | "Ended">("Locked");

  // Time Logic: Sync current time and check class window
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      if (now < classStartTime) setClassStatus("Locked");
      else if (now >= classStartTime && now <= classEndTime) setClassStatus("Joinable");
      else setClassStatus("Ended");
    }, 1000);
    return () => clearInterval(timer);
  }, [classStartTime, classEndTime]);

  const handleMarkPresent = () => {
    if (classStatus !== "Joinable") return;
    const now = new Date();
    setAttendance({
      marked: true,
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    });
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="student" className="hidden md:flex w-64 shrink-0" />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        <Navbar 
          title="Learning Portal" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Zayd Ibrahim"
          userRole="Student"
        />

        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 bg-muted/30">
          <div className="max-w-5xl mx-auto space-y-10">
            
            {/* Welcome & Clock */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-card border border-border p-8 rounded-[40px] shadow-2xl shadow-primary/5">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-[24px] bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
                  <User size={32} />
                </div>
                <div>
                  <h1 className="text-3xl font-black text-foreground uppercase tracking-tight">Salaam, Zayd</h1>
                  <p className="text-[14px] font-bold text-muted-foreground mt-1">Ready for your Tajweed session today?</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-muted/50 px-6 py-4 rounded-3xl border border-border">
                <Clock size={24} className="text-primary animate-pulse" />
                <div className="text-right">
                  <div className="text-2xl font-black text-foreground tabular-nums">
                    {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Current Time</div>
                </div>
              </div>
            </div>

            {/* Active Class Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/5 rounded-[48px] blur-2xl group-hover:bg-primary/10 transition-all" />
              <div className="relative bg-card border border-border rounded-[48px] overflow-hidden shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
                  
                  {/* Left Info Section */}
                  <div className="lg:col-span-3 p-10 md:p-12 space-y-8">
                    <div className="flex items-center gap-3">
                       <span className={cn(
                         "px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                         classStatus === "Joinable" ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"
                       )}>
                         {classStatus === "Joinable" ? "● Live Now" : classStatus === "Locked" ? "Scheduled" : "Ended"}
                       </span>
                       <span className="text-[11px] font-bold text-muted-foreground">Tajweed Basics • Ustadh Bilal</span>
                    </div>

                    <div className="space-y-2">
                       <h2 className="text-5xl font-black text-foreground uppercase tracking-tighter leading-tight">Mastering Madd <br/> & Articulation</h2>
                       <p className="text-[16px] font-bold text-muted-foreground max-w-md">Your 60-minute session will focus on the rules of Madd-e-Muttasil.</p>
                    </div>

                    <div className="flex flex-wrap gap-6 items-center">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground border border-border">
                             <Calendar size={18} />
                          </div>
                          <div>
                             <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">Date</div>
                             <div className="text-[14px] font-black">Mon, 12 May</div>
                          </div>
                       </div>
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground border border-border">
                             <Clock size={18} />
                          </div>
                          <div>
                             <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">Time Slot</div>
                             <div className="text-[14px] font-black">07:00 PM - 08:00 PM</div>
                          </div>
                       </div>
                    </div>

                    <div className="pt-4">
                      {!attendance.marked ? (
                        <button 
                          onClick={() => {
                            const now = new Date();
                            setAttendance({
                              marked: true,
                              time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                            });
                            // Mock: window.open('zoom-link', '_blank');
                          }}
                          disabled={classStatus !== "Joinable"}
                          className={cn(
                            "h-16 px-12 rounded-3xl text-[15px] font-black uppercase tracking-widest shadow-2xl transition-all flex items-center gap-3 group/btn",
                            classStatus === "Joinable" 
                              ? "bg-primary text-white shadow-primary/20 hover:scale-105 active:scale-95" 
                              : "bg-muted text-muted-foreground border border-border cursor-not-allowed opacity-60"
                          )}
                        >
                          <PlayCircle size={24} /> Enter Classroom & Log Presence
                        </button>
                      ) : (
                        <div className="flex flex-col md:flex-row items-center gap-4">
                           <div className="h-16 px-8 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl flex items-center gap-4">
                              <CheckCircle2 size={24} className="text-emerald-500" />
                              <div>
                                 <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Attendance Logged</div>
                                 <div className="text-[14px] font-black">{attendance.time}</div>
                              </div>
                           </div>
                           <button className="h-16 px-10 bg-primary text-white rounded-3xl text-[13px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                              Re-join Session
                           </button>
                        </div>
                      )}
                      <p className="text-[11px] font-bold text-muted-foreground mt-4 flex items-center gap-2">
                        <ShieldCheck size={14} className="text-emerald-500" /> 
                        {classStatus === "Locked" ? "Classroom unlocks at 07:00 PM. Attendance is logged automatically upon entry." : "By clicking join, your presence timestamp is instantly shared with the HOD."}
                      </p>
                    </div>
                  </div>

                  {/* Right Teacher/Media Section */}
                  <div className="lg:col-span-2 bg-muted/40 border-l border-border p-10 flex flex-col justify-between">
                    <div className="space-y-6 text-center lg:text-left">
                       <div className="w-32 h-32 rounded-[40px] bg-card border border-border p-1 mx-auto lg:mx-0">
                          <div className="w-full h-full rounded-[38px] bg-primary/10 flex items-center justify-center text-primary text-4xl font-black shadow-inner">
                             HU
                          </div>
                       </div>
                       <div>
                          <h4 className="text-2xl font-black text-foreground uppercase tracking-tight">Ustadh Bilal</h4>
                          <p className="text-[13px] font-bold text-muted-foreground mt-1">Senior Tajweed Instructor</p>
                       </div>
                       <div className="flex justify-center lg:justify-start gap-1">
                          {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" className="text-amber-500" />)}
                       </div>
                    </div>

                    <div className="bg-card border border-border rounded-3xl p-6 mt-8 space-y-4">
                       <div className="flex items-center justify-between">
                          <span className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">Compliance Status</span>
                          <ShieldCheck size={18} className="text-emerald-500" />
                       </div>
                       <p className="text-[12px] font-bold text-muted-foreground leading-relaxed">
                         Meeting attendance is cross-verified with Zoom entry logs. False presence triggers an automatic HOD audit.
                       </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Bottom Grid: History & Next Class */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-card border border-border rounded-[40px] p-8 space-y-6">
                  <div className="flex items-center justify-between">
                     <h3 className="text-[16px] font-black text-foreground uppercase tracking-tight flex items-center gap-3">
                        <History size={20} className="text-primary" /> Recent Lessons
                     </h3>
                     <button className="text-[11px] font-black text-primary uppercase tracking-widest hover:underline">View Full Log</button>
                  </div>
                  <div className="space-y-4">
                     {[1,2].map(i => (
                        <div key={i} className="flex items-center justify-between p-4 bg-muted/30 border border-border rounded-2xl">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-primary font-black">0{i}</div>
                              <div>
                                 <div className="text-[13px] font-bold text-foreground">Tajweed Session {i+4}</div>
                                 <div className="text-[11px] font-medium text-muted-foreground">Completed • 45 mins</div>
                              </div>
                           </div>
                           <button className="text-muted-foreground hover:text-primary transition-all">
                              <ArrowRight size={18} />
                           </button>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="bg-primary p-8 rounded-[40px] text-white space-y-6 relative overflow-hidden group shadow-2xl shadow-primary/20">
                  <div className="absolute inset-0 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700" 
                       style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")` }} />
                  <div className="relative z-10">
                     <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4">
                        <BellRing size={24} />
                     </div>
                     <h3 className="text-2xl font-black uppercase tracking-tight">Next Class Reminder</h3>
                     <p className="text-[14px] font-bold opacity-80 mt-2">Your next session is scheduled for tomorrow at 08:00 AM.</p>
                     <button className="mt-8 h-12 px-8 bg-white text-primary rounded-2xl text-[12px] font-black uppercase tracking-widest hover:bg-white/90 transition-all active:scale-95">
                        Add to Calendar
                     </button>
                  </div>
               </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
