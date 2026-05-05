"use client";

import React, { useState } from "react";
import {
  BookOpen, CheckCircle2, Circle, ChevronRight,
  Lock, PlayCircle, Star
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Topic {
  id: number;
  title: string;
  description: string;
  status: "Completed" | "Current" | "Upcoming";
  lessons: number;
  completedLessons: number;
}

export default function SyllabusView() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(3);

  const topics: Topic[] = [
    { id: 1, title: "Introduction to Tajweed", description: "Basic rules, importance, and history of Tajweed recitation.", status: "Completed", lessons: 4, completedLessons: 4 },
    { id: 2, title: "Makharij Al-Huroof", description: "Points of articulation for each Arabic letter.", status: "Completed", lessons: 6, completedLessons: 6 },
    { id: 3, title: "Noon & Meem Rules", description: "Ikhfa, Idgham, Iqlab, and Izhar rules with practice.", status: "Current", lessons: 8, completedLessons: 6 },
    { id: 4, title: "Madd Rules", description: "Natural and applied Madd types with examples from the Quran.", status: "Upcoming", lessons: 6, completedLessons: 0 },
    { id: 5, title: "Waqf & Ibtida", description: "Rules of stopping and starting during Quran recitation.", status: "Upcoming", lessons: 5, completedLessons: 0 },
    { id: 6, title: "Qalqalah", description: "Echo sound rules for the Qalqalah letters.", status: "Upcoming", lessons: 4, completedLessons: 0 },
    { id: 7, title: "Final Assessment", description: "Comprehensive Tajweed recitation test.", status: "Upcoming", lessons: 2, completedLessons: 0 },
  ];

  const selected = topics.find(t => t.id === selectedId) || topics[0];
  const totalLessons = topics.reduce((a, b) => a + b.lessons, 0);
  const completedTotal = topics.reduce((a, b) => a + b.completedLessons, 0);
  const overallPct = Math.round((completedTotal / totalLessons) * 100);

  const statusIcon = (status: Topic["status"]) => {
    if (status === "Completed") return <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />;
    if (status === "Current") return <PlayCircle size={18} className="text-primary shrink-0" />;
    return <Lock size={18} className="text-muted-foreground/40 shrink-0" />;
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="student" className="hidden md:flex w-64 shrink-0" />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar title="Syllabus" onMenuClick={() => setSidebarOpen(true)} userName="Yousuf Ali" userRole="Student" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-muted/30 space-y-6">
          {/* Overall Progress */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-[15px] font-bold text-foreground">Tajweed Fundamentals</h2>
                <p className="text-[12px] text-muted-foreground font-medium mt-0.5">Current Course — Level: Intermediate</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{overallPct}%</div>
                <div className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest">Overall</div>
              </div>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${overallPct}%` }} />
            </div>
            <div className="flex items-center gap-6 mt-3 text-[12px] font-bold text-muted-foreground">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-emerald-500" /> {completedTotal} Lessons Done</span>
              <span className="flex items-center gap-1.5"><Circle size={12} className="text-muted-foreground/40" /> {totalLessons - completedTotal} Remaining</span>
            </div>
          </div>

          {/* Split Pane */}
          <div className="flex flex-col lg:flex-row gap-6 min-h-0">
            {/* Topics List */}
            <div className="flex-[1.4] bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-border bg-muted/30">
                <h3 className="text-[14px] font-bold text-foreground">Topics ({topics.length})</h3>
              </div>
              <div className="flex-1 overflow-y-auto divide-y divide-border">
                {topics.map((t, i) => (
                  <div
                    key={t.id}
                    onClick={() => setSelectedId(t.id)}
                    className={cn(
                      "p-5 flex items-center gap-4 cursor-pointer transition-all hover:bg-muted/20",
                      selectedId === t.id && "bg-primary/5 border-l-4 border-primary"
                    )}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-[11px] font-bold text-muted-foreground shrink-0">
                        {i + 1}
                      </div>
                      {statusIcon(t.status)}
                      <div className="min-w-0">
                        <div className={cn("text-[13px] font-bold truncate",
                          t.status === "Upcoming" ? "text-muted-foreground" : "text-foreground"
                        )}>{t.title}</div>
                        <div className="text-[11px] text-muted-foreground mt-0.5">{t.completedLessons}/{t.lessons} lessons</div>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-muted-foreground shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Detail Panel */}
            <div className="flex-1 bg-card border border-border rounded-xl shadow-sm flex flex-col overflow-hidden">
              <div className="p-5 border-b border-border bg-muted/30 flex items-center justify-between">
                <h3 className="text-[15px] font-bold text-foreground">Topic Details</h3>
                <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider",
                  selected.status === "Completed" ? "bg-emerald-100 text-emerald-600" :
                  selected.status === "Current" ? "bg-primary/10 text-primary" :
                  "bg-muted text-muted-foreground"
                )}>{selected.status}</span>
              </div>
              <div className="flex-1 p-6 space-y-5 overflow-y-auto">
                <div className="flex items-center gap-3">
                  {statusIcon(selected.status)}
                  <h2 className="text-[18px] font-bold text-foreground">{selected.title}</h2>
                </div>
                <p className="text-[13px] text-muted-foreground font-medium leading-relaxed">{selected.description}</p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted/30 border border-border rounded-xl p-4 text-center">
                    <div className="text-xl font-bold text-foreground">{selected.lessons}</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Total Lessons</div>
                  </div>
                  <div className="bg-muted/30 border border-border rounded-xl p-4 text-center">
                    <div className="text-xl font-bold text-primary">{selected.completedLessons}</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Completed</div>
                  </div>
                </div>

                {selected.lessons > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[12px] font-bold text-muted-foreground">Completion</span>
                      <span className="text-[12px] font-bold text-primary">
                        {Math.round((selected.completedLessons / selected.lessons) * 100)}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${(selected.completedLessons / selected.lessons) * 100}%` }} />
                    </div>
                  </div>
                )}

                {selected.status === "Current" && (
                  <div className="mt-2 p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-start gap-3">
                    <Star size={16} className="text-primary shrink-0 mt-0.5" />
                    <p className="text-[12px] font-bold text-primary">This is your current topic. Keep practicing to complete it!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
