"use client";

import React, { useState, use } from "react";
import { 
  ArrowLeft,
  User,
  Phone,
  Clock,
  TrendingUp,
  Award,
  CalendarCheck,
  ClipboardEdit,
  MessageSquare,
  X,
  ChevronRight,
  MoreVertical,
  Calendar
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function StudentDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [note, setNote] = useState("");

  // Mock data for a single student (Ahmed Raza)
  const student = {
    id: resolvedParams.id || "1",
    name: "Ahmed Raza",
    guardian: "Muhammad Aslam",
    avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FSouth%20Asian%2F5",
    contact: "+92 300 1234567",
    schedule: "Mon–Thu, 08:00 PM",
    level: "Intermediate Level",
    completion: 65,
    lessonsDone: 48,
    totalLessons: 72,
    currentTopic: "Noorani Qaida (Lesson 5)",
    nextTopic: "Tajweed Rules Overview",
    testScores: [
      { id: 1, title: "Surah Al-Fatiha Evaluation", date: "12 Oct 2026", score: 85, color: "text-emerald-600" },
      { id: 2, title: "Tajweed Rules - Level 1", date: "28 Sep 2026", score: 72, color: "text-amber-500" },
      { id: 3, title: "Basic Pronunciation", date: "15 Sep 2026", score: 90, color: "text-emerald-600" },
    ],
    attendance: [
      { date: "24 Oct 2026", segment: "Noorani Qaida", status: "Present" },
      { date: "23 Oct 2026", segment: "Revision", status: "Late" },
      { date: "22 Oct 2026", segment: "Noorani Qaida", status: "Present" },
      { date: "20 Oct 2026", segment: "Tajweed Practice", status: "Absent" },
      { date: "19 Oct 2026", segment: "Noorani Qaida", status: "Present" },
    ],
    notes: [
      { 
        id: 1, 
        author: "Ustadha Aisha", 
        avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F5", 
        date: "15 Oct 2026", 
        text: "Ahmed is showing great improvement in Tajweed. Needs a bit more focus on Makharij during revision classes next week." 
      },
      { 
        id: 2, 
        author: "Ustadha Aisha", 
        avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F5", 
        date: "01 Oct 2026", 
        text: "Struggling with memorization of longer verses today. Suggested guardian to allocate 15 mins extra daily for revision practice." 
      },
    ]
  };

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
        <header className="h-16 w-full bg-card border-b border-border flex items-center justify-between px-6 md:px-8 shrink-0 z-20">
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard/teacher/students"
              className="p-2 hover:bg-muted rounded-lg text-muted-foreground transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-2 text-sm">
              <Link href="/dashboard/teacher/students" className="font-semibold text-muted-foreground hover:text-primary transition-colors">My Students</Link>
              <span className="text-muted-foreground/50">/</span>
              <span className="font-bold text-foreground">{student.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="hidden sm:flex items-center gap-2 text-sm font-semibold text-foreground">
              <Calendar size={16} className="text-muted-foreground" />
              Today, Oct 24
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden xs:block">
                <div className="text-[13px] font-bold text-foreground">Ustadha Aisha</div>
                <div className="text-[11px] font-semibold text-muted-foreground">Senior Teacher</div>
              </div>
              <div className="w-8 h-8 rounded-full border border-border overflow-hidden bg-muted">
                <img src={student.notes[0].avatar} alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 space-y-6 bg-slate-50/30">
          
          {/* Profile Card */}
          <div className="bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm">
            <div className="w-20 h-20 rounded-full border-2 border-border overflow-hidden shrink-0">
              <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col gap-2.5 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <h2 className="text-2xl font-bold text-foreground">{student.name}</h2>
                <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-[11px] font-bold uppercase tracking-wider">
                  {student.level}
                </span>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-[13px] font-semibold text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  Guardian: {student.guardian}
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  {student.contact}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  {student.schedule}
                </div>
              </div>
            </div>
            <div className="shrink-0">
              <button className="h-10 px-5 rounded-lg border border-primary text-primary font-bold text-[13px] flex items-center gap-2 hover:bg-primary/5 transition-all">
                <MessageSquare size={16} />
                Message Guardian
              </button>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left Column */}
            <div className="space-y-6">
              
              {/* Academic Progress */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <TrendingUp size={20} />
                  </div>
                  <h3 className="font-bold text-foreground">Academic Progress</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-3xl font-bold text-foreground leading-none">{student.completion}%</div>
                      <div className="text-[12px] font-semibold text-muted-foreground mt-2">Overall Syllabus Completion</div>
                    </div>
                    <div className="text-[13px] font-bold text-foreground">{student.lessonsDone} / {student.totalLessons} Lessons</div>
                  </div>
                  
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${student.completion}%` }} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dashed border-border mt-2">
                    <div className="space-y-1">
                      <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Current Topic</div>
                      <div className="text-[13px] font-bold text-foreground">{student.currentTopic}</div>
                    </div>
                    <div className="space-y-1 text-right">
                      <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Next Up</div>
                      <div className="text-[13px] font-bold text-foreground">{student.nextTopic}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Test Scores */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Award size={20} />
                    </div>
                    <h3 className="font-bold text-foreground">Recent Test Scores</h3>
                  </div>
                  <button className="text-[11px] font-bold text-primary hover:underline uppercase tracking-wider">View All</button>
                </div>

                <div className="space-y-3">
                  {student.testScores.map(score => (
                    <div key={score.id} className="p-4 bg-slate-50 border border-border rounded-lg flex items-center justify-between group hover:border-primary/30 transition-all">
                      <div className="space-y-1">
                        <div className="text-[14px] font-bold text-foreground group-hover:text-primary transition-colors">{score.title}</div>
                        <div className="text-[12px] font-semibold text-muted-foreground">{score.date}</div>
                      </div>
                      <span className={cn("text-xl font-bold", score.color)}>{score.score}%</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="space-y-6">
              
              {/* Attendance History */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <CalendarCheck size={20} />
                    </div>
                    <h3 className="font-bold text-foreground">Attendance History</h3>
                  </div>
                  <button className="text-[11px] font-bold text-primary hover:underline uppercase tracking-wider">Full History</button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="pb-3 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Date</th>
                        <th className="pb-3 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Class Segment</th>
                        <th className="pb-3 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {student.attendance.map((row, i) => (
                        <tr key={i}>
                          <td className="py-3.5 text-[13px] font-bold text-foreground">{row.date}</td>
                          <td className="py-3.5 text-[13px] font-semibold text-muted-foreground">{row.segment}</td>
                          <td className="py-3.5">
                            <span className={cn(
                              "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                              row.status === "Present" && "bg-emerald-500/10 text-emerald-600",
                              row.status === "Late" && "bg-amber-500/10 text-amber-600",
                              row.status === "Absent" && "bg-rose-500/10 text-rose-600"
                            )}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Teacher Notes */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <ClipboardEdit size={20} />
                  </div>
                  <h3 className="font-bold text-foreground">Teacher Notes</h3>
                </div>

                <div className="space-y-4">
                  <textarea 
                    className="w-full h-24 bg-slate-50 border border-border rounded-lg p-3 text-[13px] text-foreground font-medium outline-none focus:border-primary transition-all resize-none placeholder:text-muted-foreground/60"
                    placeholder="Add a new note regarding student's progress or behavior..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <button className="h-9 px-5 bg-primary text-primary-foreground rounded-lg text-[12px] font-bold hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
                      Save Note
                    </button>
                  </div>

                  <div className="h-px bg-border w-full" />

                  <div className="space-y-4">
                    {student.notes.map(n => (
                      <div key={n.id} className="p-4 bg-slate-50 border border-border rounded-lg space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <img src={n.avatar} className="w-6 h-6 rounded-full border border-border" alt={n.author} />
                            <span className="text-[12px] font-bold text-foreground">{n.author}</span>
                          </div>
                          <span className="text-[11px] font-semibold text-muted-foreground">{n.date}</span>
                        </div>
                        <p className="text-[13px] text-muted-foreground leading-relaxed font-medium italic">"{n.text}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
