"use client";

import React, { useState, useEffect } from "react";
import {
  CalendarCheck, Clock, CheckCircle2, AlertCircle, Timer,
  ExternalLink, User, BookOpen, AlertTriangle, Info
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ClassSession {
  id: string;
  studentName: string;
  course: string;
  startTime: string; // HH:mm format
  endTime: string;
  status: "upcoming" | "active" | "late" | "absent" | "completed";
}

export default function MarkAttendance() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock sessions
  const [sessions, setSessions] = useState<ClassSession[]>([
    { id: "1", studentName: "Zaid Ibrahim", course: "Tajweed Basics", startTime: "14:00", endTime: "14:30", status: "completed" },
    { id: "2", studentName: "Sara Ahmed", course: "Hifz Revision", startTime: "16:00", endTime: "16:30", status: "active" },
    { id: "3", studentName: "Tariq Mansoor", course: "Quran Recitation", startTime: "17:00", endTime: "17:30", status: "upcoming" },
    { id: "4", studentName: "Amira El-Sayed", course: "Islamic Studies", startTime: "18:00", endTime: "18:45", status: "upcoming" },
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const getAttendanceButton = (session: ClassSession) => {
    // Logic based on current time and session start time
    // For demo purposes, we use the status field
    if (session.status === "completed") {
      return (
        <button disabled className="h-10 px-4 bg-emerald-500/10 text-emerald-600 rounded-lg text-[13px] font-bold flex items-center gap-2 cursor-not-allowed border border-emerald-500/20">
          <CheckCircle2 size={16} /> Marked Present
        </button>
      );
    }

    if (session.status === "active" || session.status === "late") {
      const isLate = session.status === "late";
      return (
        <button 
          onClick={() => {
            setSessions(prev => prev.map(s => s.id === session.id ? {...s, status: "completed"} : s));
          }}
          className={cn(
            "h-10 px-6 rounded-lg text-[13px] font-bold flex items-center gap-2 shadow-lg transition-all",
            isLate 
              ? "bg-amber-500 text-white shadow-amber-500/20 hover:bg-amber-600" 
              : "bg-emerald-500 text-white shadow-emerald-500/20 hover:bg-emerald-600"
          )}
        >
          {isLate ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
          Mark {isLate ? "Late" : "Present"}
        </button>
      );
    }

    return (
      <button disabled className="h-10 px-4 bg-slate-100 text-slate-400 rounded-lg text-[13px] font-bold flex items-center gap-2 cursor-not-allowed border border-slate-200">
        <Clock size={16} /> Waiting...
      </button>
    );
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="teacher" className="hidden md:flex w-64 shrink-0" />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar title="Mark Attendance" onMenuClick={() => setSidebarOpen(true)} userName="Ustadh Bilal" userRole="Teacher" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-muted/30 space-y-6">
          {/* Header & Clock */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div>
              <h2 className="text-[18px] font-bold text-foreground">Session Control</h2>
              <p className="text-[13px] text-muted-foreground font-medium mt-1">Mark attendance for your daily classes</p>
            </div>
            <div className="flex items-center gap-4 bg-secondary/10 rounded-xl p-4 border border-secondary/20">
              <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary">
                <Timer size={20} />
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-foreground font-mono">{formatTime(currentTime)}</div>
                <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Current System Time</div>
              </div>
            </div>
          </div>

          {/* Attendance Rules Box */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
              <Info size={16} />
            </div>
            <div className="space-y-1">
              <h3 className="text-[13px] font-bold text-primary">Attendance Policy</h3>
              <p className="text-[12px] text-primary/80 font-medium leading-relaxed">
                Attendance button becomes active at the class start time. Marking present after <strong>5 minutes</strong> will be recorded as <strong>LATE</strong>. If not marked within the session window, it will be automatically recorded as <strong>ABSENT</strong>.
              </p>
            </div>
          </div>

          {/* Class List */}
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-border bg-muted/20 flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-foreground flex items-center gap-2">
                <CalendarCheck size={18} className="text-primary" /> Today's Sessions
              </h3>
              <span className="text-[12px] font-bold text-muted-foreground">Monday, May 4, 2024</span>
            </div>

            <div className="divide-y divide-border">
              {sessions.map((session) => (
                <div key={session.id} className={cn(
                  "p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors",
                  session.status === "active" ? "bg-primary/5" : "hover:bg-muted/5"
                )}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-primary shrink-0 border border-border font-bold text-[14px]">
                      {session.studentName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-bold text-foreground">{session.studentName}</span>
                        {session.status === "active" && (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-bold uppercase animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Live
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-[12px] font-medium text-muted-foreground">
                        <span className="flex items-center gap-1"><BookOpen size={13} /> {session.course}</span>
                        <span className="flex items-center gap-1"><Clock size={13} /> {session.startTime} – {session.endTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="h-10 w-10 border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-all">
                      <User size={18} />
                    </button>
                    {getAttendanceButton(session)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past Attendance Link */}
          <div className="flex justify-center">
            <button className="text-[13px] font-bold text-muted-foreground hover:text-primary transition-all flex items-center gap-2 group">
              View Detailed Attendance Log <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
