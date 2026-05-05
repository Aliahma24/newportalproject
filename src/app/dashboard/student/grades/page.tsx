"use client";

import React, { useState } from "react";
import { 
  Layers, 
  Percent, 
  CalendarCheck, 
  CheckCircle, 
  Target, 
  Activity, 
  FileSpreadsheet, 
  Medal, 
  MessageSquare, 
  BarChart, 
  Download, 
  Star, 
  Clock, 
  Zap,
  ChevronRight,
  X,
  Calendar,
  Bell,
  User
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function StudentGrades() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { label: "Current Level", val: "Intermediate Hifz", sub: "Juz 30", icon: Layers, color: "bg-muted text-foreground" },
    { label: "Average Score", val: "88%", sub: "+2% this month", icon: Percent, color: "bg-emerald-500/10 text-emerald-600", tagColor: "bg-emerald-500/10 text-emerald-600" },
    { label: "Attendance Rate", val: "94%", sub: "Excellent", icon: CalendarCheck, color: "bg-blue-500/10 text-blue-600", tagColor: "bg-blue-500/10 text-blue-600" },
    { label: "Modules Passed", val: "12 / 18", sub: "66% Completed", icon: CheckCircle, color: "bg-primary/10 text-primary" },
  ];

  const recentGrades = [
    { subject: "Surah Al-Baqarah (v. 1-50)", type: "Hifz Assessment", teacher: "Ustadha Aisha", teacherImg: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F5", date: "Oct 20, 2026", score: "92% (A-)", scoreType: "success" },
    { subject: "Tajweed Rules (Madd)", type: "Weekly Quiz", teacher: "Ustadh Bilal", teacherImg: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FMiddle%20Eastern%2F2", date: "Oct 15, 2026", score: "78% (B)", scoreType: "warning" },
    { subject: "Islamic History - Module 2", type: "Written Test", teacher: "Ustadha Aisha", teacherImg: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F5", date: "Oct 10, 2026", score: "95% (A)", scoreType: "success" },
    { subject: "Surah An-Naba", type: "Revision", teacher: "Ustadh Bilal", teacherImg: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FMiddle%20Eastern%2F2", date: "Oct 05, 2026", score: "88% (B+)", scoreType: "success" },
  ];

  const achievements = [
    { title: "Perfect Tajweed", desc: "Scored 100% in Tajweed Quiz", icon: Star, color: "bg-amber-500/10 text-amber-600" },
    { title: "Punctual Student", desc: "Attended 20 classes on time", icon: Clock, color: "bg-emerald-500/10 text-emerald-600" },
    { title: "Fast Learner", desc: "Passed 3 modules in one week", icon: Zap, color: "bg-primary/10 text-primary" },
  ];

  const feedback = [
    { teacher: "Ustadha Aisha", img: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F5", time: "2 days ago", comment: "\"Omar's recitation of Juz 30 is becoming very solid. Next week we will begin focusing heavily on the specific Makharij for the guttural letters.\"" },
    { teacher: "Ustadh Bilal", img: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FMiddle%20Eastern%2F2", time: "1 week ago", comment: "\"Great participation in the Tajweed sessions. Please ensure you practice the Ghunnah timings with a steady pacing before class.\"" },
  ];

  const skills = [
    { label: "Memorization (Hifz)", val: 92, color: "bg-primary" },
    { label: "Tajweed Rules", val: 78, color: "bg-amber-500" },
    { label: "Fluency & Rhythm", val: 85, color: "bg-primary" },
    { label: "Pronunciation (Makharij)", val: 88, color: "bg-primary" },
    { label: "Revision Consistency", val: 90, color: "bg-emerald-500" },
  ];

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
          title="Grades & Progress" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Omar Farooq"
          userRole="Hifz Student"
          userAvatar="https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FMiddle%20Eastern%2F1"
          hideSearch
        />

        <main className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-6 md:p-8">
          <div className="max-w-[1400px] mx-auto space-y-6">
            
            {/* ROW 1: STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {stats.map((stat, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", stat.color)}>
                      <stat.icon size={20} />
                    </div>
                    {stat.sub && (
                      <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider", stat.tagColor || "bg-muted text-muted-foreground")}>
                        {stat.sub}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="text-[20px] font-bold text-foreground leading-tight">{stat.val}</div>
                    <div className="text-[13px] font-semibold text-muted-foreground mt-0.5 uppercase tracking-wide">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* ROW 2: PROGRESS AND CHART */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Overall Progress */}
              <div className="lg:col-span-4 bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
                <div className="p-5 border-b border-border flex items-center justify-between">
                  <h3 className="text-[15px] font-bold text-foreground flex items-center gap-2">
                    <Target size={16} className="text-primary" /> Overall Progress
                  </h3>
                  <span className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-[10px] font-bold uppercase">Juz 30</span>
                </div>
                <div className="p-6 flex flex-col items-center justify-center gap-8 flex-1">
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle 
                        cx="72" cy="72" r="64" 
                        stroke="currentColor" strokeWidth="10" fill="transparent" 
                        className="text-muted/30"
                      />
                      <circle 
                        cx="72" cy="72" r="64" 
                        stroke="currentColor" strokeWidth="10" fill="transparent" 
                        strokeDasharray={402}
                        strokeDashoffset={402 - (402 * 0.68)}
                        strokeLinecap="round"
                        className="text-primary transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="flex flex-col items-center justify-center text-center">
                      <span className="text-3xl font-bold text-foreground">68%</span>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Completed</span>
                    </div>
                  </div>
                  <div className="w-full pt-6 border-t border-border space-y-3">
                    {[
                      { label: "Current Level", val: "Intermediate Hifz" },
                      { label: "Next Milestone", val: "Juz 29" },
                      { label: "Est. Completion", val: "2 Months" }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-[13px]">
                        <span className="font-semibold text-muted-foreground">{item.label}</span>
                        <span className="font-bold text-foreground">{item.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Performance Trends */}
              <div className="lg:col-span-8 bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
                <div className="p-5 border-b border-border flex items-center justify-between">
                  <h3 className="text-[15px] font-bold text-foreground flex items-center gap-2">
                    <Activity size={16} className="text-primary" /> Performance Trends
                  </h3>
                  <select className="bg-slate-50 border border-border rounded px-3 py-1.5 text-[12px] font-bold text-foreground outline-none cursor-pointer">
                    <option>Last 4 Weeks</option>
                    <option>Last 3 Months</option>
                  </select>
                </div>
                <div className="p-6 flex-1 min-h-[250px] flex flex-col">
                  <div className="flex-1 flex items-end gap-5 lg:gap-8 border-b border-border relative pb-1">
                    {/* Y-axis */}
                    <div className="absolute -left-1 inset-y-0 flex flex-col justify-between text-[10px] font-bold text-muted-foreground h-full -translate-x-full pr-4">
                      <span>100%</span>
                      <span>75%</span>
                      <span>50%</span>
                      <span>25%</span>
                      <span>0%</span>
                    </div>
                    {/* Grid Lines */}
                    {[0, 25, 50, 75].map((line) => (
                      <div key={line} className="absolute left-0 right-0 border-t border-dashed border-border" style={{ top: `${line}%` }} />
                    ))}
                    {/* Bars */}
                    {[
                      { label: "Week 1", val: 75 },
                      { label: "Week 2", val: 82 },
                      { label: "Week 3", val: 88 },
                      { label: "Week 4", val: 92, active: true }
                    ].map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center justify-end h-full z-10 gap-4">
                        <div 
                          className={cn(
                            "w-12 lg:w-16 rounded-t-lg relative transition-all duration-700 hover:brightness-110 group",
                            bar.active ? "bg-primary shadow-lg shadow-primary/20" : "bg-primary/60"
                          )} 
                          style={{ height: `${bar.val}%` }}
                        >
                          <div className="absolute -top-7 left-0 right-0 text-center text-[11px] font-bold text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                            {bar.val}%
                          </div>
                        </div>
                        <span className={cn("text-[11px] font-bold uppercase tracking-wider", bar.active ? "text-primary" : "text-muted-foreground")}>
                          {bar.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ROW 3: GRADES & ACHIEVEMENTS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Recent Grades Table */}
              <div className="lg:col-span-8 bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
                <div className="p-5 border-b border-border flex items-center justify-between">
                  <h3 className="text-[15px] font-bold text-foreground flex items-center gap-2">
                    <FileSpreadsheet size={16} className="text-primary" /> Recent Grades
                  </h3>
                  <button className="text-[11px] font-bold text-primary uppercase tracking-widest flex items-center gap-2 hover:underline">
                    <Download size={14} /> Transcript
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50">
                        <th className="p-4 px-6 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Subject / Topic</th>
                        <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Type</th>
                        <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Teacher</th>
                        <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border text-center">Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {recentGrades.map((grade, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 px-6 text-[13px] font-bold text-foreground">{grade.subject}</td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-[10px] font-bold uppercase">{grade.type}</span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2.5">
                              <img src={grade.teacherImg} className="w-6 h-6 rounded-full border border-border object-cover" />
                              <span className="text-[13px] font-semibold text-foreground">{grade.teacher}</span>
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <span className={cn(
                              "px-2 py-0.5 rounded text-[11px] font-bold",
                              grade.scoreType === "success" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"
                            )}>
                              {grade.score}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Achievements & Badges */}
              <div className="lg:col-span-4 bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
                <div className="p-5 border-b border-border">
                  <h3 className="text-[15px] font-bold text-foreground flex items-center gap-2">
                    <Medal size={16} className="text-primary" /> Achievements
                  </h3>
                </div>
                <div className="p-5 space-y-4">
                  {achievements.map((ach, i) => (
                    <div key={i} className="bg-slate-50 border border-border/50 rounded-xl p-3.5 flex items-center gap-4 transition-all hover:border-primary/30">
                      <div className={cn("w-11 h-11 rounded-full flex items-center justify-center shrink-0", ach.color)}>
                        <ach.icon size={22} />
                      </div>
                      <div>
                        <div className="text-[14px] font-bold text-foreground leading-tight">{ach.title}</div>
                        <div className="text-[12px] font-semibold text-muted-foreground mt-0.5">{ach.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ROW 4: FEEDBACK & SKILLS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Teacher Notes & Feedback */}
              <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
                <div className="p-5 border-b border-border">
                  <h3 className="text-[15px] font-bold text-foreground flex items-center gap-2">
                    <MessageSquare size={16} className="text-primary" /> Teacher Notes & Feedback
                  </h3>
                </div>
                <div className="p-5 space-y-4">
                  {feedback.map((f, i) => (
                    <div key={i} className="bg-muted/50 rounded-xl p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2.5">
                          <img src={f.img} className="w-6 h-6 rounded-full border border-border object-cover" />
                          <span className="text-[13px] font-bold text-foreground">{f.teacher}</span>
                        </div>
                        <span className="text-[11px] font-bold text-muted-foreground">{f.time}</span>
                      </div>
                      <p className="text-[13px] font-medium leading-relaxed text-muted-foreground italic">
                        {f.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Breakdown */}
              <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
                <div className="p-5 border-b border-border">
                  <h3 className="text-[15px] font-bold text-foreground flex items-center gap-2">
                    <BarChart size={16} className="text-primary" /> Skills Breakdown
                  </h3>
                </div>
                <div className="p-6 space-y-6 flex-1 flex flex-col justify-center">
                  {skills.map((skill, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[13px] font-bold">
                        <span className="text-foreground">{skill.label}</span>
                        <span className="text-foreground">{skill.val}%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={cn("h-full rounded-full transition-all duration-1000", skill.color)} 
                          style={{ width: `${skill.val}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
