"use client";

import React, { useState } from "react";
import {
  TrendingUp, BarChart2, Calendar, Award, BookOpen,
  CheckCircle2, Clock, ArrowUpRight, ChevronRight
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function ProgressReport() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { label: "Total Lessons", val: "84", sub: "Since joining Jan 2024", icon: BookOpen, color: "text-blue-600 bg-blue-100" },
    { label: "Completion Rate", val: "72%", sub: "Of current syllabus", icon: TrendingUp, color: "text-emerald-600 bg-emerald-100" },
    { label: "Last Test Score", val: "88/100", sub: "Tajweed — Apr 20, 2024", icon: Award, color: "text-primary bg-primary/10" },
    { label: "Next Class", val: "Today", sub: "3:00 PM with Ustadh Bilal", icon: Clock, color: "text-amber-600 bg-amber-100" },
  ];

  const monthlyData = [
    { month: "Jan", lessons: 18 },
    { month: "Feb", lessons: 16 },
    { month: "Mar", lessons: 20 },
    { month: "Apr", lessons: 15 },
    { month: "May", lessons: 12 },
    { month: "Jun", lessons: 3 },
  ];
  const maxLessons = Math.max(...monthlyData.map(d => d.lessons));

  const testHistory = [
    { date: "Apr 20, 2024", topic: "Tajweed Rules — Noon & Meem", score: 88, grade: "A" },
    { date: "Mar 12, 2024", topic: "Makharij Al-Huroof", score: 75, grade: "B" },
    { date: "Feb 5, 2024", topic: "Hifz — Surah Al-Mulk", score: 92, grade: "A+" },
    { date: "Jan 18, 2024", topic: "Tajweed — Idgham", score: 70, grade: "B" },
  ];

  const syllabusProgress = [
    { topic: "Tajweed Basics", pct: 100, status: "Completed" },
    { topic: "Makharij Al-Huroof", pct: 100, status: "Completed" },
    { topic: "Noon & Meem Rules", pct: 85, status: "In Progress" },
    { topic: "Madd Rules", pct: 40, status: "In Progress" },
    { topic: "Waqf & Ibtida", pct: 0, status: "Upcoming" },
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="student" className="hidden md:flex w-64 shrink-0" />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar title="Progress Report" onMenuClick={() => setSidebarOpen(true)} userName="Yousuf Ali" userRole="Student" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-muted/30">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
                <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center shrink-0", s.color)}>
                  <s.icon size={20} />
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground leading-none">{s.val}</div>
                  <div className="text-[11px] font-bold text-muted-foreground mt-1 uppercase tracking-widest">{s.label}</div>
                  <div className="text-[10px] text-muted-foreground/70 mt-1">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column */}
            <div className="flex-[1.6] space-y-6">
              {/* Monthly Bar Chart */}
              <div className="bg-card border border-border rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[15px] font-bold text-foreground flex items-center gap-2"><BarChart2 size={18} className="text-primary" /> Monthly Lessons</h2>
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">2024</span>
                </div>
                <div className="flex items-end gap-3 h-40">
                  {monthlyData.map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-[11px] font-bold text-primary">{d.lessons}</span>
                      <div className="w-full rounded-t-lg bg-primary/10 relative overflow-hidden" style={{ height: "100px" }}>
                        <div
                          className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all duration-700"
                          style={{ height: `${(d.lessons / maxLessons) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">{d.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Syllabus Progress */}
              <div className="bg-card border border-border rounded-xl shadow-sm p-6">
                <h2 className="text-[15px] font-bold text-foreground flex items-center gap-2 mb-5"><BookOpen size={18} className="text-primary" /> Syllabus Progress</h2>
                <div className="space-y-4">
                  {syllabusProgress.map((s, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[13px] font-bold text-foreground">{s.topic}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[12px] font-bold text-primary">{s.pct}%</span>
                          <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                            s.status === "Completed" ? "bg-emerald-100 text-emerald-600" :
                            s.status === "In Progress" ? "bg-primary/10 text-primary" :
                            "bg-slate-100 text-muted-foreground"
                          )}>{s.status}</span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full transition-all duration-700",
                          s.status === "Completed" ? "bg-emerald-500" : "bg-primary"
                        )} style={{ width: `${s.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Test History */}
            <div className="flex-1 bg-card border border-border rounded-xl shadow-sm flex flex-col overflow-hidden">
              <div className="p-5 border-b border-border bg-muted/30">
                <h2 className="text-[15px] font-bold text-foreground flex items-center gap-2"><Award size={18} className="text-primary" /> Test History</h2>
              </div>
              <div className="flex-1 overflow-y-auto divide-y divide-border">
                {testHistory.map((t, i) => (
                  <div key={i} className="p-5 hover:bg-muted/20 transition-all">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-[13px] font-bold text-foreground leading-tight">{t.topic}</div>
                        <div className="text-[11px] text-muted-foreground mt-1.5 flex items-center gap-1">
                          <Calendar size={11} /> {t.date}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-[18px] font-bold text-primary leading-none">{t.score}</div>
                        <div className="text-[10px] font-bold text-muted-foreground mt-0.5">out of 100</div>
                        <span className={cn("text-[11px] font-bold mt-1.5 inline-block",
                          t.grade.startsWith("A") ? "text-emerald-600" : "text-amber-600"
                        )}>{t.grade}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
