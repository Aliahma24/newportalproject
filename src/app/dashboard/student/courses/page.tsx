"use client";

import React, { useState } from "react";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  CalendarClock, 
  CheckCircle2, 
  Lock, 
  Download, 
  FileText, 
  Headphones, 
  Radio, 
  MessageSquareQuote, 
  ArrowRight,
  X,
  ChevronRight
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Course {
  id: string;
  title: string;
  description: string;
  teacher: {
    name: string;
    avatar: string;
  };
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  nextSession: string;
  progress: number;
  totalLessons: number;
}

export default function MyCourses() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState("1");

  const courses: Course[] = [
    { 
      id: "1", 
      title: "Hifz Program - Group B", 
      description: "Focus on complete memorization with perfect Tajweed application and revision techniques.",
      teacher: { name: "Ustadha Aisha", avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F5" },
      level: "Advanced",
      duration: "6 Months",
      nextSession: "Today, 08:00 PM",
      progress: 68,
      totalLessons: 120
    },
    { 
      id: "2", 
      title: "Tajweed Fundamentals", 
      description: "Learn the basic rules of Quranic recitation, focusing on pronunciation points (Makharij).",
      teacher: { name: "Ustadh Bilal", avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FMiddle%20Eastern%2F2" },
      level: "Beginner",
      duration: "3 Months",
      nextSession: "Tomorrow, 10:00 AM",
      progress: 100,
      totalLessons: 24
    },
    { 
      id: "3", 
      title: "Islamic History - Prophets", 
      description: "Detailed study of the lives of the Prophets and the lessons we can derive from their stories.",
      teacher: { name: "Sheikh Tariq", avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F50-65%2FSouth%20Asian%2F3" },
      level: "Intermediate",
      duration: "4 Months",
      nextSession: "Wed, Oct 26, 07:00 PM",
      progress: 45,
      totalLessons: 40
    },
    { 
      id: "4", 
      title: "Arabic Language Basics", 
      description: "Introduction to Arabic grammar, vocabulary, and basic conversational skills.",
      teacher: { name: "Ustadha Fatima", avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FMiddle%20Eastern%2F4" },
      level: "Beginner",
      duration: "6 Months",
      nextSession: "Thu, Oct 27, 05:00 PM",
      progress: 10,
      totalLessons: 30
    },
  ];

  const selectedCourse = courses.find(c => c.id === selectedCourseId) || courses[0];

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
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        <Navbar 
          title="My Courses" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Omar Farooq"
          userRole="Hifz Student"
          userAvatar="https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FMiddle%20Eastern%2F1"
          hideSearch
        />

        <main className="flex-1 overflow-hidden flex bg-slate-50/30 p-6 md:p-8 gap-6">
          
          {/* Courses Grid List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              {courses.map(course => (
                <div 
                  key={course.id}
                  onClick={() => setSelectedCourseId(course.id)}
                  className={cn(
                    "bg-card border rounded-xl p-5 flex flex-col gap-4 shadow-sm cursor-pointer transition-all hover:shadow-md",
                    selectedCourseId === course.id ? "border-2 border-primary ring-1 ring-primary/20" : "border-border"
                  )}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                        course.level === "Advanced" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                      )}>
                        {course.level}
                      </span>
                      <span className="text-[12px] text-muted-foreground font-semibold">{course.duration}</span>
                    </div>
                    <h3 className="text-[18px] font-bold text-foreground leading-tight">{course.title}</h3>
                    <p className="text-[13px] text-muted-foreground line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 mt-1">
                    <img src={course.teacher.avatar} alt={course.teacher.name} className="w-7 h-7 rounded-full object-cover border border-border" />
                    <span className="text-[13px] font-semibold text-foreground">{course.teacher.name}</span>
                  </div>

                  <div className="bg-muted rounded-lg p-3 py-2.5 flex flex-col gap-1 mt-1">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Next Session</span>
                    <div className="flex items-center gap-2 text-[13px] font-semibold text-foreground">
                      <CalendarClock size={14} className="text-primary" />
                      {course.nextSession}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mt-auto pt-2">
                    <div className="flex justify-between items-center text-[12px] font-bold text-muted-foreground">
                      <span className={cn(course.progress === 100 && "text-emerald-600")}>
                        {course.progress}% Completed
                      </span>
                      <span>{course.totalLessons} Lessons</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full", course.progress === 100 ? "bg-emerald-500" : "bg-primary")}
                        style={{ width: `${course.progress}%` }} 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Detail Sidebar */}
          <div className="hidden lg:flex w-[400px] xl:w-[440px] shrink-0 bg-card border border-border rounded-xl shadow-sm flex-col overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-border bg-slate-50/50">
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-[11px] font-bold uppercase tracking-wider">
                  {selectedCourse.level}
                </span>
                <span className="text-[13px] font-bold text-muted-foreground flex items-center gap-2">
                  <Calendar size={14} /> Mon, Wed, Fri
                </span>
              </div>
              <h2 className="text-[22px] font-bold text-foreground leading-tight mb-4">{selectedCourse.title}</h2>
              <div className="flex items-center gap-5">
                <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="28" fill="none" strokeWidth="6" strokeLinecap="round" className="stroke-muted" />
                    <circle 
                      cx="32" cy="32" r="28" fill="none" strokeWidth="6" strokeLinecap="round" 
                      className="stroke-primary" 
                      strokeDasharray="175.93" 
                      strokeDashoffset={175.93 - (175.93 * selectedCourse.progress / 100)} 
                    />
                  </svg>
                  <span className="text-[16px] font-bold text-foreground">{selectedCourse.progress}%</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="text-[13px] font-bold text-muted-foreground">Completed: <strong className="text-foreground">{Math.round(selectedCourse.totalLessons * selectedCourse.progress / 100)} Lessons</strong></div>
                  <div className="text-[13px] font-bold text-muted-foreground">Pending: <strong className="text-foreground">{selectedCourse.totalLessons - Math.round(selectedCourse.totalLessons * selectedCourse.progress / 100)} Lessons</strong></div>
                  <div className="text-[13px] font-bold text-muted-foreground">Total: <strong className="text-foreground">{selectedCourse.totalLessons} Lessons</strong></div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-7">
              {/* Next Live Class */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-primary font-bold text-[14px]">
                    <Radio size={16} /> Live Session
                  </div>
                  <span className="text-[12px] font-bold text-primary">Starts in 45m</span>
                </div>
                <div>
                  <div className="text-[16px] font-bold text-foreground mb-0.5">Juz 6-10 Memorization</div>
                  <div className="text-[13px] font-semibold text-muted-foreground">Focus on Surah Al-Ma'idah</div>
                </div>
                <button className="w-full h-10 rounded-lg bg-primary text-primary-foreground font-bold text-[13px] hover:bg-primary/90 transition-all shadow-md shadow-primary/10">
                  Join Live Class
                </button>
              </div>

              {/* Latest Feedback */}
              <div className="bg-muted rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-foreground font-bold text-[14px]">
                  <MessageSquareQuote size={18} className="text-primary" />
                  Latest Feedback
                </div>
                <p className="text-[13px] text-muted-foreground leading-relaxed font-medium italic">
                  "Excellent retention of the previous lesson. Please revise the rules of Idgham thoroughly before our next session as we will be applying them extensively."
                </p>
                <div className="text-[11px] font-bold text-muted-foreground text-right">
                  - Ustadha Aisha, Oct 22
                </div>
              </div>

              {/* Syllabus */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[16px] font-bold text-foreground">Syllabus Topics</h3>
                  <span className="px-2 py-0.5 bg-primary text-primary-foreground rounded text-[10px] font-bold uppercase tracking-wider">3 Modules</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 p-4 border border-border rounded-lg bg-slate-50/50 group">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-bold text-foreground">Juz 1-5 Revision</div>
                      <div className="text-[12px] font-semibold text-muted-foreground">Surah Al-Fatiha to An-Nisa</div>
                    </div>
                    <span className="text-[12px] font-bold text-emerald-500">100%</span>
                  </div>

                  <div className="flex items-center gap-4 p-4 border border-primary/30 rounded-lg bg-primary/5">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <BookOpen size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-bold text-foreground">Juz 6-10 Memorization</div>
                      <div className="text-[12px] font-semibold text-muted-foreground">Surah Al-Ma'idah to At-Tawbah</div>
                    </div>
                    <span className="text-[12px] font-bold text-primary">68%</span>
                  </div>

                  <div className="flex items-center gap-4 p-4 border border-border rounded-lg bg-slate-50/50 opacity-60">
                    <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center shrink-0">
                      <Lock size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-bold text-foreground">Juz 11-15 Foundations</div>
                      <div className="text-[12px] font-semibold text-muted-foreground">Surah Yunus to Al-Kahf</div>
                    </div>
                    <span className="text-[12px] font-bold text-muted-foreground">0%</span>
                  </div>
                </div>
              </div>

              {/* Resources */}
              <div className="space-y-4 pb-4">
                <h3 className="text-[16px] font-bold text-foreground">Course Resources</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3.5 p-3.5 px-4 border border-border rounded-lg bg-card hover:bg-muted transition-all group text-left">
                    <FileText size={20} className="text-primary" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-bold text-foreground truncate">Tajweed Rules Guide.pdf</div>
                      <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">PDF Document • 2.4 MB</div>
                    </div>
                    <Download size={16} className="text-muted-foreground group-hover:text-primary" />
                  </button>
                  <button className="w-full flex items-center gap-3.5 p-3.5 px-4 border border-border rounded-lg bg-card hover:bg-muted transition-all group text-left">
                    <Headphones size={20} className="text-primary" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-bold text-foreground truncate">Surah Al-Ma'idah Audio</div>
                      <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Audio File • 15.1 MB</div>
                    </div>
                    <Download size={16} className="text-muted-foreground group-hover:text-primary" />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border bg-card flex gap-3 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
              <button className="flex-1 h-11 border border-border rounded-xl font-bold text-[13px] text-foreground hover:bg-muted transition-all">
                View Grades
              </button>
              <button className="flex-1 h-11 bg-primary text-primary-foreground rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                Continue Learning
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
