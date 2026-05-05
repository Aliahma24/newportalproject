"use client";

import React, { useState } from "react";
import { 
  Clock,
  Users,
  MonitorPlay,
  Video,
  ClipboardCheck,
  FileEdit,
  CheckCircle,
  X,
  TrendingUp,
  Calendar,
  MessageSquare,
  AlertCircle,
  ChevronRight,
  MoreVertical
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function TeacherDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Mock stats
  const stats = [
    { label: "Classes Today", value: "4", icon: Calendar, trend: "+1 vs yesterday", trendType: "positive" },
    { label: "Active Students", value: "32", icon: Users, trend: "Consistent", trendType: "neutral" },
    { label: "Attendance Rate", value: "98.5%", icon: ClipboardCheck, trend: "+2.1%", trendType: "positive" },
    { label: "Assignments", value: "12", icon: FileEdit, trend: "6 new submissions", trendType: "warning" },
  ];

  // Mock student data for current class
  const [students, setStudents] = useState([
    { id: "1042", name: "Ali Khan", avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FMiddle%20Eastern%2F1", status: "present" },
    { id: "1045", name: "Fatima Zahra", avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F18-25%2FSouth%20Asian%2F2", status: "present" },
    { id: "1048", name: "Omar Farooq", avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FAfrican%2F3", status: "absent" },
    { id: "1051", name: "Zainab Ali", avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F18-25%2FMiddle%20Eastern%2F4", status: "present" },
    { id: "1054", name: "Bilal Ahmed", avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FSouth%20Asian%2F5", status: "present" },
    { id: "1059", name: "Aisha Siddiqa", avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F18-25%2FAfrican%2F6", status: "present" },
  ]);

  const upcomingClasses = [
    { time: "12:00 PM", name: "Tajweed Basics", group: "Group C", students: 12 },
    { time: "02:30 PM", name: "Noorani Qaida", group: "Beginners", students: 8 },
    { time: "04:00 PM", name: "Islamic Studies", group: "Advanced", students: 20 },
  ];

  const toggleStatus = (id: string, status: "present" | "absent") => {
    setStudents(students.map(s => s.id === id ? { ...s, status } : s));
  };

  const markAllPresent = () => {
    setStudents(students.map(s => ({ ...s, status: "present" })));
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans text-foreground">
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
              className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        <Navbar 
          title="Teacher Dashboard" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Ustadha Aisha"
          userRole="Senior Teacher"
          userAvatar="https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F5"
          hideSearch
        />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar bg-slate-50/50">
          
          {/* Greeting Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Welcome back, Ustadha Aisha! 👋</h2>
              <p className="text-muted-foreground font-medium mt-1">You have 4 classes scheduled for today. Your first class is currently live.</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button className="h-10 px-4 rounded-lg bg-card border border-border text-foreground font-bold text-sm flex items-center gap-2 hover:bg-muted transition-all shadow-sm">
                <Calendar size={16} />
                View Full Schedule
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 shrink-0">
            {stats.map((stat, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <stat.icon size={24} />
                  </div>
                  <div className={cn(
                    "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    stat.trendType === "positive" ? "bg-emerald-500/10 text-emerald-600" : 
                    stat.trendType === "warning" ? "bg-amber-500/10 text-amber-600" : "bg-slate-500/10 text-slate-600"
                  )}>
                    {stat.trend}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-foreground leading-none">{stat.value}</div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Active Session & Attendance */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8 min-h-0">
            
            {/* Left: Active Session Card */}
            <div className="xl:col-span-2 space-y-6">
              
              <div className="relative overflow-hidden bg-card border border-border border-l-4 border-l-primary rounded-2xl shadow-sm">
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
                
                <div className="p-6 md:p-8 relative z-10">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold flex items-center gap-1.5 animate-pulse">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          LIVE NOW
                        </span>
                        <div className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                          <Clock size={16} />
                          10:00 AM - 11:30 AM
                        </div>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight tracking-tight text-balance">Hifz Revision - Group B</h2>
                      <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2.5 text-[15px] font-semibold text-muted-foreground">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                             <Users size={18} />
                          </div>
                          6 Students Enrolled
                        </div>
                        <div className="flex items-center gap-2.5 text-[15px] font-semibold text-muted-foreground">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                             <MonitorPlay size={18} />
                          </div>
                          Virtual Room 1
                        </div>
                      </div>
                    </div>
                    <button className="h-14 px-8 rounded-xl bg-primary text-primary-foreground font-bold flex items-center gap-3 hover:bg-primary/90 hover:scale-[1.02] transition-all active:scale-[0.98] whitespace-nowrap shrink-0 shadow-xl shadow-primary/25">
                      <Video size={22} />
                      Join Video Class
                    </button>
                  </div>
                </div>
              </div>

              {/* Attendance Preview */}
              <div className="bg-card border border-border rounded-2xl shadow-sm flex flex-col overflow-hidden">
                <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <ClipboardCheck size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Current Class Attendance</h3>
                  </div>
                  <button 
                    onClick={markAllPresent}
                    className="h-10 px-5 rounded-lg border-2 border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-all"
                  >
                    Mark All Present
                  </button>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-slate-50/50 hover:bg-white hover:border-primary/30 hover:shadow-sm transition-all group">
                      <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white bg-slate-200 shrink-0 shadow-sm">
                        <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[15px] font-bold text-foreground truncate group-hover:text-primary transition-colors">{student.name}</div>
                        <div className="text-xs font-semibold text-muted-foreground">ID: {student.id}</div>
                      </div>
                      <div className="flex bg-slate-200/50 rounded-lg p-1 gap-1 shrink-0">
                        <button 
                          onClick={() => toggleStatus(student.id, "present")}
                          className={cn(
                            "px-3 py-1.5 rounded-md text-[11px] font-bold transition-all",
                            student.status === "present" 
                              ? "bg-primary text-primary-foreground shadow-md" 
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          P
                        </button>
                        <button 
                          onClick={() => toggleStatus(student.id, "absent")}
                          className={cn(
                            "px-3 py-1.5 rounded-md text-[11px] font-bold transition-all",
                            student.status === "absent" 
                              ? "bg-primary text-primary-foreground shadow-md" 
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          A
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Session Notes Inside Card */}
                <div className="p-6 border-t border-border bg-slate-50/30 space-y-4">
                  <div className="flex items-center gap-2.5 text-[15px] font-bold text-foreground">
                    <FileEdit size={18} className="text-primary" />
                    Session Notes & Lessons
                  </div>
                  <textarea 
                    className="w-full bg-white border border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-xl p-4 text-sm text-foreground outline-none resize-none transition-all shadow-sm min-h-[120px]"
                    placeholder="Add specific notes for today's session..."
                    defaultValue="Reviewing Surah Al-Baqarah verses 100-120. Focus on Tajweed rules for Ghunnah today. Ensure all students recite at least once."
                  />
                  <div className="flex justify-end pt-2">
                    <button className="h-11 px-8 rounded-lg bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all active:scale-[0.98] shadow-lg shadow-primary/20">
                      <CheckCircle size={18} />
                      Complete Session & Save
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Sidebar Info */}
            <div className="space-y-6">
              
              {/* Upcoming Classes */}
              <div className="bg-card border border-border rounded-2xl shadow-sm flex flex-col overflow-hidden">
                <div className="p-5 border-b border-border bg-slate-50/50 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Calendar size={16} className="text-primary" />
                    Up Next Today
                  </h3>
                  <button className="text-[11px] font-bold text-primary uppercase tracking-wider hover:underline">Full View</button>
                </div>
                <div className="p-2 divide-y divide-border">
                  {upcomingClasses.map((cls, i) => (
                    <div key={i} className="p-4 flex items-center justify-between group cursor-pointer hover:bg-slate-50 transition-colors">
                      <div className="space-y-1">
                        <div className="text-[13px] font-bold text-foreground group-hover:text-primary transition-colors">{cls.name}</div>
                        <div className="flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">
                          <span className="text-primary">{cls.time}</span>
                          <span>•</span>
                          <span>{cls.group}</span>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-muted-foreground group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Announcements / Quick Tasks */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-primary">
                  <AlertCircle size={18} />
                  Important Updates
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-white border border-primary/10 rounded-xl shadow-sm">
                    <div className="text-[13px] font-bold text-foreground">Monthly Progress Reports</div>
                    <p className="text-[11px] text-muted-foreground mt-1">Submission deadline is this Friday. Please update all student grades.</p>
                  </div>
                  <div className="p-3 bg-white border border-primary/10 rounded-xl shadow-sm">
                    <div className="text-[13px] font-bold text-foreground">New Assignment: Tajweed Rules</div>
                    <p className="text-[11px] text-muted-foreground mt-1">Material uploaded for Group C. Review in the next session.</p>
                  </div>
                </div>
              </div>

              {/* Messages Preview */}
              <div className="bg-card border border-border rounded-2xl shadow-sm p-5 space-y-4">
                 <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                      <MessageSquare size={16} className="text-primary" />
                      Recent Messages
                    </h3>
                    <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-md">3</div>
                 </div>
                 <div className="space-y-4">
                    {[1, 2].map((m) => (
                      <div key={m} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 shrink-0 border border-border overflow-hidden">
                           <img src={`https://i.pravatar.cc/150?u=${m}`} alt="User" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-0.5">
                            <span className="text-[12px] font-bold text-foreground">Parent of Ali</span>
                            <span className="text-[10px] text-muted-foreground">10:45 AM</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground line-clamp-1">Assalam o Alaikum Ustadha, Ali will be late today...</p>
                        </div>
                      </div>
                    ))}
                 </div>
                 <button className="w-full py-2.5 rounded-lg border border-border text-[11px] font-bold text-muted-foreground hover:bg-muted hover:text-foreground transition-all">Go to Messenger</button>
              </div>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
