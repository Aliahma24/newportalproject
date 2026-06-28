"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getTeacherDashboardData } from "@/app/actions/dashboard";
import { markAttendance } from "@/app/actions/attendance";
import { submitComplaint, submitLeaveRequest } from "@/app/actions/tickets";
import { 
  Users, CheckCircle2, PlayCircle, Clock, 
  MessageSquare, AlertTriangle, BookOpen, 
  BarChart2, ShieldCheck, ChevronRight,
  TrendingUp, Star, Calendar, FileText, AlertCircle
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function TeacherDashboard() {
  const { data: session } = useSession();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      getTeacherDashboardData(session.user.id).then(data => {
        setDashboardData(data);
        if (data.activeClass && data.attendances) {
          const classAttendance = data.attendances.find((a: any) => a.classId === data.activeClass.id);
          if (classAttendance) {
            setAttendance({
              marked: true,
              time: new Date(classAttendance.markedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
            });
          }
        }
      });
    }
  }, [session]);
  
  const classStartTime = dashboardData?.activeClass ? new Date(dashboardData.activeClass.scheduledStart) : new Date(new Date().setHours(19, 0, 0));
  const classEndTime = dashboardData?.activeClass ? new Date(dashboardData.activeClass.scheduledEnd) : new Date(new Date().setHours(20, 0, 0));

  const [attendance, setAttendance] = useState<{ marked: boolean; time: string | null }>({
    marked: false,
    time: null
  });

  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Command Center");
  const [selectedAuditDate, setSelectedAuditDate] = useState(new Date().toISOString().split('T')[0]);

  // Form States
  const [reportCategory, setReportCategory] = useState("Student Behavioral Issue");
  const [reportDetails, setReportDetails] = useState("");
  const [isReporting, setIsReporting] = useState(false);

  const [hrRequestType, setHrRequestType] = useState("Leave Request");
  const [hrUrgency, setHrUrgency] = useState("Normal");
  const [hrJustification, setHrJustification] = useState("");
  const [isSubmittingHr, setIsSubmittingHr] = useState(false);

  const handleReportSubmit = async () => {
    if (!session?.user?.id || !reportDetails.trim()) return;
    setIsReporting(true);
    const res = await submitComplaint({
      submitterId: session.user.id,
      category: reportCategory,
      details: reportDetails
    });
    setIsReporting(false);
    if (res.success) {
      setReportModalOpen(false);
      setReportDetails("");
      alert("Report submitted to HOD successfully.");
    } else {
      alert("Failed to submit report.");
    }
  };

  const handleHrSubmit = async () => {
    if (!session?.user?.id || !hrJustification.trim()) return;
    setIsSubmittingHr(true);
    const res = await submitLeaveRequest({
      userId: session.user.id,
      requestType: hrRequestType,
      urgency: hrUrgency,
      justification: hrJustification
    });
    setIsSubmittingHr(false);
    if (res.success) {
      setActiveTab("Command Center");
      setHrJustification("");
      alert("HR Request submitted successfully.");
    } else {
      alert("Failed to submit request.");
    }
  };

  const stats = dashboardData?.stats || {
    today: 0,
    week: 0,
    month: 0,
    lateStarts: 0,
    cancelled: {
      teacher: 0,
      student: 0,
      technical: 0
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      if (now < classStartTime) setClassStatus("Locked");
      else if (now >= classStartTime && now <= classEndTime) setClassStatus("Live");
      else setClassStatus("Ended");
    }, 1000);
    return () => clearInterval(timer);
  }, [classStartTime, classEndTime]);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="teacher" className="hidden md:flex w-64 shrink-0" />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        <Navbar 
          title="Teacher Command Center" 
          onMenuClick={() => setSidebarOpen(true)}
          userName={session?.user?.name || "Loading..."}
          userRole="Senior Instructor"
        />

        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 bg-muted/30">
          <div className="max-w-[1600px] mx-auto space-y-8">
            
            {/* Tab Navigation */}
            <div className="flex items-center gap-8 border-b border-border mb-4">
              {["Command Center", "Workstation Analytics", "Secure Chat", "Requests"].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "text-[12px] font-black uppercase tracking-widest pb-4 border-b-2 transition-all",
                    activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "Command Center" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  {/* Header: Status & Quick Audit */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-[24px] bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
                        <Star size={32} />
                      </div>
                      <div>
                         <h1 className="text-3xl font-black text-foreground uppercase tracking-tight">Salaam, {session?.user?.name || 'Instructor'}</h1>
                         <div className="flex items-center gap-3 mt-1">
                            <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md uppercase tracking-widest">Grade A Faculty</span>
                            <span className="text-[12px] font-bold text-muted-foreground">Verified Premium Account</span>
                         </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-card border border-border p-4 rounded-3xl shadow-xl shadow-primary/5">
                       <div className="text-right">
                          <div className="text-xl font-black text-foreground tabular-nums">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                          <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Session Sync</div>
                       </div>
                       <div className="h-10 w-[1px] bg-border mx-1" />
                       <button 
                         onClick={() => setReportModalOpen(true)}
                         className="h-12 px-6 bg-destructive/10 text-destructive border border-destructive/20 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-destructive hover:text-white transition-all flex items-center gap-2"
                       >
                          <AlertTriangle size={16} /> File Report to HOD
                       </button>
                    </div>
                  </div>

                  {/* Live Session Management */}
                  <div className="bg-card border border-border rounded-[48px] overflow-hidden shadow-2xl relative">
                    <div className={cn(
                      "absolute top-0 left-0 w-full h-2",
                      classStatus === "Live" ? "bg-emerald-500 animate-pulse" : "bg-muted"
                    )} />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3">
                       <div className="lg:col-span-2 p-10 md:p-12 space-y-8 border-r border-border">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground border border-border">
                                <BookOpen size={24} />
                             </div>
                             <div>
                                <div className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">Current Active Slot</div>
                                <div className="text-2xl font-black text-foreground uppercase tracking-tight">
                                   {dashboardData?.activeClass ? dashboardData.activeClass.title : 'No Active Session'}
                                </div>
                             </div>
                          </div>

                          <div className="bg-muted/30 border border-border rounded-[32px] p-8 flex items-center justify-between">
                             <div className="flex items-center gap-6">
                                 <div className="w-16 h-16 rounded-[24px] bg-white border border-border flex items-center justify-center text-primary text-2xl font-black shadow-sm">
                                    {dashboardData?.activeClass?.student?.name ? dashboardData.activeClass.student.name.substring(0,2).toUpperCase() : 'ST'}
                                 </div>
                                 <div>
                                    <h3 className="text-xl font-black text-foreground uppercase">
                                       {dashboardData?.activeClass?.student?.name || 'No Student'}
                                    </h3>
                                    <p className="text-[13px] font-bold text-muted-foreground">
                                       Student ID: {dashboardData?.activeClass?.studentId?.substring(0,8) || 'N/A'} • Course: {dashboardData?.activeClass?.title || 'N/A'}
                                    </p>
                                   <div className="flex items-center gap-2 mt-2">
                                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Student Present</span>
                                   </div>
                                </div>
                             </div>
                             <div className="flex flex-col items-end gap-1">
                                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Target Progress</div>
                                <div className="text-2xl font-black text-primary">78%</div>
                             </div>
                          </div>

                          {!attendance.marked ? (
                             <div className="flex flex-col md:flex-row items-center gap-4">
                                <button 
                                  onClick={async () => {
                                      if (!session?.user?.id || !dashboardData?.activeClass?.id) return;
                                      setIsLoading(true);
                                      const res = await markAttendance(session.user.id, dashboardData.activeClass.id, "TEACHER");
                                      setIsLoading(false);
                                      if (res.success && res.attendance) {
                                        setAttendance({
                                          marked: true,
                                          time: new Date(res.attendance.markedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                                        });
                                      }
                                  }}
                                  disabled={classStatus !== "Live" || isLoading}
                                  className={cn(
                                    "h-16 px-10 rounded-3xl text-[14px] font-black uppercase tracking-widest shadow-2xl transition-all flex items-center gap-3",
                                    classStatus === "Live" && !isLoading ? "bg-primary text-white shadow-primary/20 hover:scale-105" : "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
                                  )}
                                >
                                   <PlayCircle size={24} /> {isLoading ? "Starting Session..." : "Start Zoom Session & Verify Presence"}
                                </button>
                                <p className="text-[11px] font-bold text-muted-foreground max-w-[200px]">By starting the session, your attendance is automatically logged with HOD Compliance.</p>
                             </div>
                          ) : (
                             <motion.div 
                              initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                              className="flex flex-col md:flex-row items-center gap-6"
                             >
                                <div className="flex-1 p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl flex items-center gap-4">
                                   <CheckCircle2 size={24} className="text-emerald-500" />
                                   <div>
                                      <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Verified Start</div>
                                      <div className="text-[14px] font-black">{attendance.time}</div>
                                   </div>
                                </div>
                                <button className="h-16 px-12 bg-primary text-white rounded-3xl text-[14px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 flex-1">
                                   <PlayCircle size={24} /> Re-join Zoom Session
                                </button>
                             </motion.div>
                          )}
                       </div>

                       <div className="p-10 md:p-12 bg-muted/20 flex flex-col justify-between space-y-10">
                          <div>
                              <h4 className="text-[13px] font-black text-muted-foreground uppercase tracking-widest mb-4">Lesson Objective</h4>
                              <div className="p-6 bg-card border border-border rounded-3xl space-y-3">
                                 <p className="text-[14px] font-bold text-foreground leading-relaxed">
                                   {dashboardData?.activeClass?.description || 'No class scheduled for now.'}
                                 </p>
                                <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                                   <div className="h-full bg-primary w-2/3" />
                                </div>
                             </div>
                          </div>

                          <div className="space-y-4">
                             <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                                <span>Session Compliance</span>
                                <ShieldCheck size={18} className="text-emerald-500" />
                             </div>
                             <div className="p-5 bg-white/50 border border-border rounded-2xl">
                                <p className="text-[11px] font-bold text-muted-foreground leading-relaxed">
                                   This session is being monitored by the **Scheduler Cockpit**. Ensure you join within 2 minutes of marking present to avoid an HOD audit.
                                </p>
                             </div>
                          </div>
                       </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "Workstation Analytics" && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-10"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Date Picker Header */}
                    <div className="lg:col-span-4 bg-card border border-border p-8 rounded-[40px] flex items-center justify-between shadow-2xl shadow-primary/5">
                      <div>
                        <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">Performance Audit</h2>
                        <p className="text-[13px] font-bold text-muted-foreground">Review session history and operational efficiency.</p>
                      </div>
                      <div className="flex items-center gap-4 bg-muted/50 p-2 rounded-2xl border border-border">
                         <div className="flex items-center gap-3 px-4">
                           <Calendar size={18} className="text-primary" />
                           <input 
                             type="date" 
                             value={selectedAuditDate}
                             onChange={(e) => setSelectedAuditDate(e.target.value)}
                             className="bg-transparent text-[14px] font-black outline-none border-none cursor-pointer"
                           />
                         </div>
                         <button className="h-12 px-6 bg-primary text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all">Audit Date</button>
                      </div>
                    </div>

                    {/* Stats Blocks */}
                    <div className="bg-card border border-border p-8 rounded-[40px] space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                        <CheckCircle2 size={24} />
                      </div>
                      <div>
                        <div className="text-4xl font-black text-foreground">{stats.todayCount || stats.today}</div>
                        <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Classes Today</div>
                      </div>
                    </div>
                    <div className="bg-card border border-border p-8 rounded-[40px] space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                        <TrendingUp size={24} />
                      </div>
                      <div>
                        <div className="text-4xl font-black text-foreground">{stats.weekCount || stats.week}</div>
                        <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">This Week</div>
                      </div>
                    </div>
                    <div className="bg-card border border-border p-8 rounded-[40px] space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                        <Clock size={24} />
                      </div>
                      <div>
                        <div className="text-4xl font-black text-destructive">{stats.lateStarts}</div>
                        <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Late Starts (Audit)</div>
                      </div>
                    </div>
                    <div className="bg-secondary p-8 rounded-[40px] text-white flex flex-col justify-between shadow-2xl shadow-primary/20">
                      <h3 className="text-lg font-black uppercase tracking-tight">Month Total</h3>
                      <div className="text-5xl font-black">{stats.monthCount || stats.month}</div>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Verified Sessions</p>
                    </div>

                    {/* Cancellation Breakdown */}
                    <div className="lg:col-span-4 bg-card border border-border rounded-[40px] p-10 overflow-hidden shadow-2xl shadow-primary/5">
                      <div className="flex items-center justify-between mb-10">
                         <h3 className="text-xl font-black text-foreground uppercase tracking-tight">Cancellation Ledger</h3>
                         <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Detailed Audit Filtered by Date</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         <div className="p-8 rounded-3xl bg-destructive/5 border border-destructive/10 space-y-2">
                            <div className="text-[10px] font-black text-destructive uppercase tracking-widest">Teacher Unavailability</div>
                            <div className="text-3xl font-black text-foreground">{stats.cancelled.teacher} Class</div>
                            <p className="text-[11px] font-bold text-muted-foreground italic">"Power outage logged in Lahore"</p>
                         </div>
                         <div className="p-8 rounded-3xl bg-amber-500/5 border border-amber-500/10 space-y-2">
                            <div className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Student Denied/Absent</div>
                            <div className="text-3xl font-black text-foreground">{stats.cancelled.student} Classes</div>
                            <p className="text-[11px] font-bold text-muted-foreground italic">"Guardian denied due to guest visit"</p>
                         </div>
                         <div className="p-8 rounded-3xl bg-muted/50 border border-border space-y-2">
                            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Predictive Schedule</div>
                            <div className="text-lg font-black text-foreground">Tomorrow: 8 Classes</div>
                            <div className="text-lg font-black text-foreground">Day After: 7 Classes</div>
                         </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "Secure Chat" && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-card border border-border rounded-[48px] overflow-hidden shadow-2xl h-[700px] flex flex-col"
                >
                  <div className="p-8 bg-primary/5 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-black">ZI</div>
                      <div>
                        <h3 className="text-xl font-black text-foreground uppercase tracking-tight">Zayd Ibrahim</h3>
                        <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                           <ShieldCheck size={12} /> Encrypted & Audited
                        </div>
                      </div>
                    </div>
                    <div className="px-5 py-2 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-[10px] font-black uppercase tracking-widest animate-pulse">
                       Strict Text Only Mode
                    </div>
                  </div>

                  <div className="flex-1 p-10 overflow-y-auto space-y-6 bg-muted/10 custom-scrollbar">
                     <div className="max-w-[80%] bg-white border border-border p-5 rounded-2xl rounded-bl-none shadow-sm">
                        <p className="text-[14px] font-bold text-foreground">Assalam o Alaikum Ustadh, I have revised the Qalqalah rules.</p>
                        <span className="text-[9px] font-black text-muted-foreground uppercase mt-2 block">Student • 10:42 AM</span>
                     </div>
                     <div className="max-w-[80%] ml-auto bg-primary text-white p-5 rounded-2xl rounded-br-none shadow-lg shadow-primary/20">
                        <p className="text-[14px] font-black">Walikum Assalam Zayd. Great! We will start the practice session in 10 minutes.</p>
                        <span className="text-[9px] font-black opacity-60 uppercase mt-2 block text-right">You • 10:44 AM</span>
                     </div>
                  </div>

                  <div className="p-8 bg-card border-t border-border">
                    <div className="bg-primary/5 border border-primary/20 rounded-[24px] p-4 flex items-start gap-3 mb-4">
                       <AlertCircle size={18} className="text-primary shrink-0" />
                       <p className="text-[11px] font-bold text-muted-foreground leading-relaxed">
                         **Safety Protocol Active**: Contact sharing, document exchange, and external handles are strictly prohibited. All chats are reviewed by the **Lead HOD** for child safety compliance.
                       </p>
                    </div>
                    <div className="relative flex items-center gap-4">
                       <input 
                         type="text" 
                         placeholder="Type your message (Text only)..."
                         className="flex-1 h-14 bg-muted/50 border border-border rounded-2xl px-6 text-[15px] font-bold focus:border-primary outline-none"
                       />
                       <button className="h-14 px-10 bg-primary text-white rounded-2xl text-[13px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2">
                          Send <ChevronRight size={18} />
                       </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-card border border-border p-8 rounded-[40px] shadow-xl shadow-primary/5 flex flex-col justify-between min-h-[200px]">
                  <div className="flex items-center justify-between">
                     <Users size={28} className="text-primary opacity-40" />
                     <span className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest">Student Roster</span>
                  </div>
                  <div>
                     <div className="text-4xl font-black text-foreground tracking-tighter">{stats.studentsCount || 0} Active</div>
                     <p className="text-[12px] font-bold text-muted-foreground mt-1">Students under your instruction</p>
                  </div>
               </div>
               <div className="bg-card border border-border p-8 rounded-[40px] shadow-xl shadow-primary/5 flex flex-col justify-between min-h-[200px]">
                  <div className="flex items-center justify-between">
                     <BarChart2 size={28} className="text-emerald-500 opacity-40" />
                     <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full uppercase tracking-widest">Performance</span>
                  </div>
                  <div>
                     <div className="text-4xl font-black text-foreground tracking-tighter">Grade A</div>
                     <p className="text-[12px] font-bold text-muted-foreground mt-1">Faculty quality rating by HOD</p>
                  </div>
               </div>
               <div className="bg-primary p-8 rounded-[40px] text-white flex flex-col justify-between min-h-[200px] shadow-2xl shadow-primary/20 relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-10 pointer-events-none group-hover:rotate-12 transition-transform duration-700" 
                       style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l20 20-20 20L0 20z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")` }} />
                  <div className="relative z-10">
                     <h3 className="text-2xl font-black uppercase tracking-tight">Shift Summary</h3>
                     <p className="text-[13px] font-bold opacity-80 mt-1">Online • Evening Shift</p>
                  </div>
                  <button className="relative z-10 w-fit h-10 px-6 bg-white text-primary rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-white/90 transition-all">
                     View Full Schedule
                  </button>
               </div>
            </div>

          </div>
        </main>
      </div>

      {/* HOD Report Modal */}
      <AnimatePresence>
        {reportModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              onClick={() => setReportModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative w-full max-w-xl bg-card border border-border rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 bg-destructive/10 border-b border-border flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-destructive/20 flex items-center justify-center text-destructive">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-foreground uppercase tracking-tight">File Report to HOD</h3>
                  <p className="text-[13px] font-bold text-muted-foreground">Send a compliance or student issue report.</p>
                </div>
              </div>
              <div className="p-10 space-y-8">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Report Category</label>
                   <select 
                     value={reportCategory}
                     onChange={(e) => setReportCategory(e.target.value)}
                     className="w-full h-14 bg-muted/50 border border-border rounded-2xl px-5 text-[15px] font-bold focus:border-primary outline-none"
                   >
                      <option>Student Behavioral Issue</option>
                      <option>Technical/Internet Problem</option>
                      <option>Unexplained Student Absence</option>
                      <option>Other Compliance Concern</option>
                   </select>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Observation Details</label>
                   <textarea 
                     value={reportDetails}
                     onChange={(e) => setReportDetails(e.target.value)}
                     placeholder="Provide details for the HOD..."
                     className="w-full h-40 bg-muted/50 border border-border rounded-3xl p-5 text-[15px] font-bold focus:border-primary outline-none transition-all resize-none"
                   />
                </div>
                <div className="flex gap-4">
                   <button onClick={() => setReportModalOpen(false)} className="flex-1 h-14 bg-muted border border-border rounded-2xl text-[14px] font-black uppercase tracking-widest">Cancel</button>
                   <button 
                     disabled={isReporting || !reportDetails.trim()}
                     onClick={handleReportSubmit}
                     className="flex-[2] h-14 bg-primary text-white rounded-2xl text-[14px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50"
                   >
                     {isReporting ? "Submitting..." : "Submit to HOD"}
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* HR Administrative Request Modal */}
      <AnimatePresence>
        {activeTab === "Requests" && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              onClick={() => setActiveTab("Command Center")}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative w-full max-w-2xl bg-card border border-border rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 bg-primary/10 border-b border-border flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-foreground uppercase tracking-tight">Administrative Request Desk</h3>
                  <p className="text-[13px] font-bold text-muted-foreground">Official portal for Leaves & Salary issues.</p>
                </div>
              </div>
              
              <div className="p-10 space-y-6">
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4 flex gap-3">
                   <AlertCircle size={18} className="text-amber-600 shrink-0" />
                   <p className="text-[11px] font-bold text-amber-700 leading-relaxed uppercase tracking-tight">
                     Strict Compliance: This is the only authorized channel for HR requests. External WhatsApp/Calls regarding salary or leave will not be acknowledged.
                   </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Request Type</label>
                      <select 
                        value={hrRequestType}
                        onChange={(e) => setHrRequestType(e.target.value)}
                        className="w-full h-14 bg-muted/50 border border-border rounded-2xl px-5 text-[15px] font-bold focus:border-primary outline-none"
                      >
                         <option>Leave Request</option>
                         <option>Salary Dispute / Query</option>
                         <option>Advance Salary Request</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Urgency</label>
                      <select 
                        value={hrUrgency}
                        onChange={(e) => setHrUrgency(e.target.value)}
                        className="w-full h-14 bg-muted/50 border border-border rounded-2xl px-5 text-[15px] font-bold focus:border-primary outline-none"
                      >
                         <option>Normal</option>
                         <option>Urgent</option>
                         <option>Critical</option>
                      </select>
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Detailed Justification</label>
                   <textarea 
                     value={hrJustification}
                     onChange={(e) => setHrJustification(e.target.value)}
                     placeholder="Provide clear reasons and dates for your request..."
                     className="w-full h-32 bg-muted/50 border border-border rounded-3xl p-5 text-[15px] font-bold focus:border-primary outline-none transition-all resize-none"
                   />
                </div>

                <div className="flex gap-4">
                   <button onClick={() => setActiveTab("Command Center")} className="flex-1 h-14 bg-muted border border-border rounded-2xl text-[14px] font-black uppercase tracking-widest">Discard</button>
                   <button 
                     disabled={isSubmittingHr || !hrJustification.trim()}
                     onClick={handleHrSubmit}
                     className="flex-[2] h-14 bg-primary text-white rounded-2xl text-[14px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                   >
                     {isSubmittingHr ? "Submitting..." : "Submit Official Request"} <ChevronRight size={18} />
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
