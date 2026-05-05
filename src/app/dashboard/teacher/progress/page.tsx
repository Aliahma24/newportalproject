"use client";

import React, { useState } from "react";
import {
  TrendingUp, Search, User, CheckCircle2, ChevronRight,
  ClipboardCheck, Clock, BookOpen, MessageSquare, Save
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Student {
  id: string;
  name: string;
  level: string;
  lastLesson: string;
  progress: number;
}

export default function ProgressTracking() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState("1");
  const [searchQuery, setSearchQuery] = useState("");

  const students: Student[] = [
    { id: "1", name: "Zaid Ibrahim", level: "Beginner", lastLesson: "Noon Sakinah Rules", progress: 65 },
    { id: "2", name: "Sara Ahmed", level: "Intermediate", lastLesson: "Surah Al-Baqarah", progress: 40 },
    { id: "3", name: "Tariq Mansoor", level: "Advanced", lastLesson: "Qira'at Basics", progress: 85 },
    { id: "4", name: "Amira El-Sayed", level: "Beginner", lastLesson: "Arabic Alphabet", progress: 95 },
  ];

  const selectedStudent = students.find(s => s.id === selectedStudentId) || students[0];

  const lessons = [
    { id: "L1", title: "Makharij — Throat Letters", status: "completed", date: "May 1, 2024" },
    { id: "L2", title: "Makharij — Tongue Letters", status: "completed", date: "May 3, 2024" },
    { id: "L3", title: "Noon Sakinah — Izhar", status: "current", date: "Today" },
    { id: "L4", title: "Noon Sakinah — Idgham", status: "pending", date: "Upcoming" },
    { id: "L5", title: "Noon Sakinah — Iqlab", status: "pending", date: "Upcoming" },
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="teacher" className="hidden md:flex w-64 shrink-0" />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar title="Progress Tracking" onMenuClick={() => setSidebarOpen(true)} userName="Ustadh Bilal" userRole="Teacher" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-muted/30 space-y-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: Student Selector */}
            <div className="flex-1 bg-card border border-border rounded-2xl shadow-sm flex flex-col min-w-0 max-h-[calc(100vh-200px)] lg:max-h-none">
              <div className="p-5 border-b border-border bg-muted/20">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search students..."
                    className="w-full h-10 bg-card border border-border rounded-lg pl-9 pr-3 text-[13px] font-medium focus:border-primary outline-none transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto divide-y divide-border">
                {students.map((student) => (
                  <div 
                    key={student.id}
                    onClick={() => setSelectedStudentId(student.id)}
                    className={cn(
                      "p-4 flex items-center gap-3 cursor-pointer transition-all hover:bg-muted/10",
                      selectedStudentId === student.id && "bg-primary/5 border-l-4 border-primary"
                    )}
                  >
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-[13px] shrink-0">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-bold text-foreground truncate">{student.name}</div>
                      <div className="text-[11px] text-muted-foreground font-medium truncate">{student.lastLesson}</div>
                    </div>
                    <ChevronRight size={14} className="text-muted-foreground shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Middle: Lesson Progress */}
            <div className="flex-[1.8] space-y-6">
              {/* Profile Card */}
              <div className="bg-card border border-border rounded-2xl shadow-sm p-6 flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-[18px]">
                    {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-[18px] font-bold text-foreground">{selectedStudent.name}</h2>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="px-2 py-0.5 rounded-md bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-wider">{selectedStudent.level}</span>
                      <span className="text-[12px] font-medium text-muted-foreground flex items-center gap-1"><BookOpen size={13} /> {selectedStudent.lastLesson}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-2xl font-bold text-primary">{selectedStudent.progress}%</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Overall Progress</div>
                  <div className="w-24 h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${selectedStudent.progress}%` }} />
                  </div>
                </div>
              </div>

              {/* Lesson Checklist */}
              <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
                <div className="p-5 border-b border-border bg-muted/20 flex items-center justify-between">
                  <h3 className="text-[15px] font-bold text-foreground flex items-center gap-2">
                    <ClipboardCheck size={18} className="text-emerald-500" /> Syllabus Checklist
                  </h3>
                  <button className="text-[12px] font-bold text-primary hover:underline">Manage Syllabus</button>
                </div>
                <div className="p-2 divide-y divide-border/50">
                  {lessons.map((lesson) => (
                    <div key={lesson.id} className="p-4 flex items-center justify-between gap-4 group">
                      <div className="flex items-center gap-4">
                        <button className={cn(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                          lesson.status === "completed" 
                            ? "bg-emerald-500 border-emerald-500 text-white" 
                            : lesson.status === "current"
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border text-transparent"
                        )}>
                          <CheckCircle2 size={14} />
                        </button>
                        <div>
                          <div className={cn("text-[13px] font-bold", 
                            lesson.status === "completed" ? "text-muted-foreground line-through" : "text-foreground"
                          )}>{lesson.title}</div>
                          <div className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5 mt-0.5">
                            {lesson.status === "completed" ? <Clock size={11} /> : null} {lesson.date}
                          </div>
                        </div>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 p-2 text-muted-foreground hover:text-primary transition-all">
                        <MessageSquare size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Notes & Save */}
            <div className="flex-1 space-y-6">
              <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
                <div className="p-5 border-b border-border bg-muted/20">
                  <h3 className="text-[15px] font-bold text-foreground flex items-center gap-2">
                    <MessageSquare size={18} className="text-secondary" /> Lesson Notes
                  </h3>
                </div>
                <div className="p-5 space-y-4">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Today's Performance</label>
                    <textarea 
                      className="w-full h-32 bg-muted/30 border border-border rounded-xl p-3 text-[13px] font-medium outline-none focus:border-primary transition-all resize-none placeholder:text-muted-foreground/50"
                      placeholder="Write feedback for the student..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Homework Assigned</label>
                    <textarea 
                      className="w-full h-20 bg-muted/30 border border-border rounded-xl p-3 text-[13px] font-medium outline-none focus:border-primary transition-all resize-none placeholder:text-muted-foreground/50"
                      placeholder="Tasks for next lesson..."
                    />
                  </div>
                  <button className="w-full h-11 bg-primary text-white rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                    <Save size={18} /> Save Progress
                  </button>
                </div>
              </div>

              {/* Stats Mini Card */}
              <div className="bg-emerald-500 rounded-2xl p-6 text-white shadow-lg shadow-emerald-500/20">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp size={24} />
                  <span className="text-[11px] font-bold uppercase tracking-widest bg-white/20 px-2 py-1 rounded">Last 7 Days</span>
                </div>
                <div className="text-2xl font-bold">+15%</div>
                <div className="text-[13px] font-medium opacity-90 mt-1">Consistency improvement</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
