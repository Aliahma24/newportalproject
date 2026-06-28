"use client";

import React, { useState, useEffect } from "react";
import { getSchedulerData } from "@/app/actions/analytics";
import { cancelClassSession, logAlert, escalateIssue } from "@/app/actions/admin";
import { 
  Users, Search, Calendar, Clock, ListTodo, Plus, UserCheck, 
  Video, Phone, MessageSquare, AlertCircle, CheckCircle2, 
  XCircle, Globe, ChevronDown, BellRing, PhoneCall, Send, 
  Filter, MoreHorizontal, UserMinus, UserPlus, Info
} from "lucide-react";
import Link from "next/link";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence } from "framer-motion";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mock Data for Countries & Slots
const COUNTRIES = ["All Countries", "Pakistan", "United Kingdom", "USA", "Canada", "Saudi Arabia", "UAE"];
const SLOTS = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "05:00 PM", "06:00 PM"];

interface ClassSession {
  id: string;
  time: string;
  country: string;
  student: { name: string; contact: string; guardian: string; localTime: string };
  teacher: { name: string; contact: string; status: "Available" | "Unavailable" };
  subject: string;
  status: "Scheduled" | "Confirmed" | "Absent" | "Cancelled";
  attempts: number;
}

// Teacher Audit Modal Component
function AuditModal({ isOpen, onClose, teacherName, onConfirm }: { isOpen: boolean, onClose: () => void, teacherName: string, onConfirm: (msg: string) => void }) {
  const [reportType, setReportType] = useState("Technical Issue");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-xl bg-card border border-border rounded-[40px] shadow-2xl overflow-hidden"
      >
        <div className="p-8 bg-primary/10 border-b border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-inner">
            <AlertCircle size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-foreground uppercase tracking-tight">Teacher Performance Audit</h3>
            <p className="text-[13px] font-bold text-muted-foreground">Monitoring session for: <span className="text-primary">{teacherName}</span></p>
          </div>
        </div>

        <div className="p-10 space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Observation Type</label>
            <div className="relative">
              <select 
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full h-14 bg-muted/50 border border-border rounded-2xl px-5 text-[15px] font-bold text-foreground focus:border-primary outline-none appearance-none cursor-pointer"
              >
                <option>Technical Issue (Zoom/Audio)</option>
                <option>Behavioral Issue (Unprofessional)</option>
                <option>Pedagogical Issue (Methodology)</option>
                <option>Unexplained Absence</option>
                <option>General Observation</option>
              </select>
              <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Detailed Description</label>
            <textarea 
              placeholder="Provide specific details about what you observed..."
              className="w-full h-40 bg-muted/50 border border-border rounded-3xl p-5 text-[15px] font-bold focus:border-primary outline-none transition-all resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button 
              onClick={onClose}
              className="flex-1 h-14 bg-muted border border-border rounded-2xl text-[14px] font-black uppercase tracking-widest hover:bg-muted/80 transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={() => { onConfirm(`Audit filed for ${teacherName}: [${reportType}]`); onClose(); }}
              className="flex-[2] h-14 bg-primary text-white rounded-2xl text-[14px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all"
            >
              Submit Audit Report
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function SchedulerDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Pakistan");
  const [selectedSlot, setSelectedSlot] = useState("08:00 AM");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Monitoring States
  const [auditTarget, setAuditTarget] = useState<{ id: string, name: string } | null>(null);

  const [classes, setClasses] = useState<ClassSession[]>([]);

  useEffect(() => {
    async function loadData() {
      const res = await getSchedulerData();
      if (res?.classes) setClasses(res.classes);
    }
    loadData();
  }, []);

  // Notification State
  const [notification, setNotification] = useState<{ message: string; type: "success" | "info" | "warning" | null }>(
    { message: "", type: null }
  );

  const showNotify = (message: string, type: "success" | "info" | "warning" = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: null }), 4000);
  };

  // UI Actions
  const handleJoinClass = (teacher: string) => {
    showNotify(`Joining live session with ${teacher}... (Connecting to Zoom)`, "info");
  };

  const handleTeacherOut = async (id: string) => {
    const res = await cancelClassSession(id);
    if(res.success) {
      setClasses(prev => prev.map(c => c.id === id ? { ...c, status: "Cancelled", teacher: { ...c.teacher, status: "Unavailable" } } : c));
      showNotify("Teacher marked unavailable. Class cancelled and saved to DB.", "warning");
    } else {
      showNotify("Failed to cancel class", "warning");
    }
  };

  const handleStudentOut = async (id: string) => {
    const res = await cancelClassSession(id);
    if(res.success) {
      setClasses(prev => prev.map(c => c.id === id ? { ...c, status: "Cancelled" } : c));
      showNotify("Student marked unavailable. Class cancelled and saved to DB.", "warning");
    } else {
      showNotify("Failed to cancel class", "warning");
    }
  };

  const handleCallAlert = async (id: string) => {
    await logAlert("CALL_ALERT", `Called student for class ${id}`);
    let statusUpdate = "";
    setClasses(prev => prev.map(c => {
      if (c.id === id) {
        const newAttempts = c.attempts + 1;
        if (newAttempts >= 3) {
          statusUpdate = "3 attempts failed. Student marked ABSENT.";
          return { ...c, status: "Absent", attempts: newAttempts };
        }
        statusUpdate = `Call Alert #${newAttempts} initiated (Logged to System).`;
        return { ...c, attempts: newAttempts };
      }
      return c;
    }));
    showNotify(statusUpdate || "Call Alert triggered.", "info");
  };

  const handleReminder = async (id: string, target: "Student" | "Teacher") => {
    await logAlert("WHATSAPP_REMINDER", `Sent reminder to ${target} for class ${id}`);
    showNotify(`${target} WhatsApp reminder sent & logged to system. Status pending response.`, "success");
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="scheduler" className="hidden md:flex w-64 shrink-0" />

      {/* Audit Modal Overlay */}
      <AnimatePresence>
        {auditTarget && (
          <AuditModal 
            isOpen={!!auditTarget} 
            onClose={() => setAuditTarget(null)} 
            teacherName={auditTarget.name} 
            onConfirm={async (msg) => {
              const res = await escalateIssue(`Audit: ${auditTarget.name}`, msg);
              if (res.success) {
                showNotify("Audit submitted and saved as Complaint to Database", "success");
              } else {
                showNotify("Failed to submit audit", "warning");
              }
            }} 
          />
        )}
      </AnimatePresence>

      {/* Premium Notification Overlay */}
      <AnimatePresence>
        {notification.message && (
          <motion.div 
            initial={{ opacity: 0, y: -100, x: "-50%" }}
            animate={{ opacity: 1, y: 30, x: "-50%" }}
            exit={{ opacity: 0, y: -100, x: "-50%" }}
            className="fixed top-0 left-1/2 z-[100] min-w-[400px]"
          >
            <div className={cn(
              "p-5 rounded-2xl border shadow-2xl flex items-center gap-4 backdrop-blur-xl",
              notification.type === "success" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" :
              notification.type === "warning" ? "bg-destructive/10 border-destructive/20 text-destructive" :
              "bg-primary/10 border-primary/20 text-primary"
            )}>
              {notification.type === "success" ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
              <div className="flex-1">
                <p className="text-[14px] font-black uppercase tracking-tight">System Notification</p>
                <p className="text-[13px] font-bold opacity-80">{notification.message}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        <Navbar 
          title="Scheduler Operations Cockpit" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Ahmed Khan"
          userRole="Lead Scheduler"
        />

        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 bg-muted/30">
          <div className="max-w-[1600px] mx-auto space-y-8">
            
            {/* Control Panel: Filters */}
            <div className="bg-card border border-border rounded-[32px] p-6 shadow-2xl shadow-primary/5 flex flex-wrap items-end justify-between gap-6">
              <div className="flex items-center gap-6 flex-1 min-w-[300px]">
                <div className="space-y-1.5 flex-1">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Target Country</label>
                  <div className="relative">
                    <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                    <select 
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="w-full h-12 bg-muted/50 border border-border rounded-2xl pl-12 pr-4 text-[14px] font-black text-foreground focus:border-primary outline-none appearance-none transition-all cursor-pointer"
                    >
                      {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5 flex-1">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Time Slot</label>
                  <div className="relative">
                    <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                    <select 
                      value={selectedSlot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      className="w-full h-12 bg-muted/50 border border-border rounded-2xl pl-12 pr-4 text-[14px] font-black text-foreground focus:border-primary outline-none appearance-none transition-all cursor-pointer"
                    >
                      {SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="flex items-end gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Quick Search</label>
                  <div className="relative w-64">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input 
                      type="text"
                      placeholder="Search students..."
                      className="w-full h-12 bg-muted/50 border border-border rounded-2xl pl-12 pr-4 text-[13px] font-bold focus:border-primary outline-none transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <Link href="/dashboard/scheduler/enroll">
                  <button className="h-12 px-6 bg-primary text-white rounded-2xl text-[13px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2">
                    <UserPlus size={18} /> New Enrollment
                  </button>
                </Link>
              </div>
            </div>

            {/* Global Alert Trigger Panel */}
            <div className="bg-secondary p-8 rounded-[40px] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none group-hover:opacity-[0.1] transition-opacity duration-500"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l20 20-20 20L0 20z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")` }}
              />
              <div className="relative z-10 flex items-center gap-6">
                <div className="w-16 h-16 rounded-[24px] bg-primary/20 flex items-center justify-center text-primary shadow-inner border border-primary/20">
                  <BellRing size={32} className="animate-bounce" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">Finalize {selectedSlot} Slot</h3>
                  <p className="text-[13px] font-bold text-white/50">Send mass alerts to unconfirmed students in {selectedCountry}.</p>
                </div>
              </div>

              <div className="relative z-10 flex items-center gap-4">
                <button 
                  onClick={async () => {
                    await logAlert("MASS_CALL", `Global call alerts for ${selectedCountry} / ${selectedSlot}`);
                    showNotify("Global Call Alerts initiated and logged.", "info");
                  }}
                  className="h-14 px-8 bg-blue-600 text-white rounded-[20px] text-[13px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95"
                >
                  <PhoneCall size={20} /> Trigger Call Alerts
                </button>
                <button 
                  onClick={async () => {
                    await logAlert("MASS_SMS", `Global SMS alerts for ${selectedCountry} / ${selectedSlot}`);
                    showNotify("Global SMS Alerts sent and logged.", "info");
                  }}
                  className="h-14 px-8 bg-amber-600 text-white rounded-[20px] text-[13px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-amber-600/20 hover:bg-amber-700 transition-all active:scale-95"
                >
                  <MessageSquare size={20} /> Trigger SMS Alerts
                </button>
              </div>
            </div>

            {/* Master Class Grid */}
            <div className="bg-card border border-border rounded-[32px] shadow-2xl shadow-primary/5 overflow-hidden">
              <div className="p-6 border-b border-border bg-muted/20 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                    <ListTodo size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-tight text-foreground">{selectedSlot} Operations Grid</h2>
                    <p className="text-[12px] font-bold text-muted-foreground flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Current tracking for {selectedCountry}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-black text-muted-foreground uppercase tracking-widest bg-muted/50 px-4 py-2 rounded-xl border border-border">
                  Auto-Absent: <span className="text-destructive ml-1">3 Failures</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1200px]">
                  <thead>
                    <tr className="bg-muted/10">
                      <th className="p-5 px-8 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border">Student Details</th>
                      <th className="p-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border">Teacher Details</th>
                      <th className="p-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border text-center">Alert Status</th>
                      <th className="p-5 px-8 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border text-right">Monitoring & Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {classes.map((cls) => (
                      <tr key={cls.id} className="group hover:bg-primary/5 transition-all">
                        <td className="p-6 px-8">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center text-[14px] font-black text-foreground border border-border shadow-inner">
                              {cls.student.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="text-[15px] font-black text-foreground">{cls.student.name}</div>
                              <div className="text-[11px] font-bold text-muted-foreground mt-1">G: {cls.student.guardian} • {cls.student.contact}</div>
                              <div className="flex items-center gap-1.5 mt-2 text-[10px] font-black text-primary uppercase tracking-widest">
                                <Globe size={10} /> Local: {cls.student.localTime}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-[14px] font-black text-primary border border-primary/20">
                              {cls.teacher.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="text-[15px] font-black text-foreground">{cls.teacher.name}</div>
                              <div className="text-[11px] font-bold text-muted-foreground mt-1">{cls.teacher.contact}</div>
                              <div className={cn(
                                "text-[10px] font-black mt-2 uppercase tracking-widest px-2 py-0.5 rounded-md w-fit",
                                cls.teacher.status === "Available" ? "bg-emerald-500/10 text-emerald-500" : "bg-destructive/10 text-destructive"
                              )}>
                                {cls.teacher.status}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex flex-col items-center gap-4">
                            <div className="flex items-center gap-6">
                              {/* Student Alert Group */}
                              <div className="flex flex-col items-center gap-1.5">
                                <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Student</span>
                                <div className="flex items-center gap-2">
                                  <button 
                                    onClick={() => handleReminder(cls.id, "Student")}
                                    className="w-9 h-9 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all shadow-lg shadow-[#25D366]/10"
                                    title="Send Student WhatsApp Reminder"
                                  >
                                    <Send size={14} />
                                  </button>
                                  <button 
                                    onClick={() => handleCallAlert(cls.id)}
                                    className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all shadow-lg shadow-blue-500/10"
                                    title="Student Call Alert"
                                  >
                                    <PhoneCall size={14} />
                                  </button>
                                </div>
                              </div>

                              <div className="h-10 w-[1px] bg-border" />

                              {/* Teacher Alert Group */}
                              <div className="flex flex-col items-center gap-1.5">
                                <span className="text-[8px] font-black text-primary uppercase tracking-widest">Teacher</span>
                                <div className="flex items-center gap-2">
                                  <button 
                                    onClick={() => handleReminder(cls.id, "Teacher")}
                                    className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-lg shadow-primary/10 border border-primary/20"
                                    title="Send Teacher WhatsApp Reminder"
                                  >
                                    <MessageSquare size={14} />
                                  </button>
                                  <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground opacity-40">
                                    <PhoneCall size={14} />
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Failures:</span>
                              <div className="flex gap-1.5">
                                {[1, 2, 3].map(i => (
                                  <div 
                                    key={i} 
                                    className={cn(
                                      "w-2.5 h-2.5 rounded-full transition-all duration-300", 
                                      cls.attempts >= i ? "bg-destructive shadow-[0_0_8px_rgba(var(--destructive-rgb),0.5)] scale-110" : "bg-muted"
                                    )} 
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-6 px-8 text-right">
                          <div className="flex items-center justify-end gap-3">
                            {/* MONITORING BUFF BUTTONS */}
                            <button 
                              onClick={() => handleJoinClass(cls.teacher.name)}
                              className="h-10 px-4 bg-primary/10 text-primary border border-primary/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all flex items-center gap-2"
                              title="Join Zoom Session"
                            >
                              <Video size={16} /> Monitor Live
                            </button>
                            <button 
                              onClick={() => setAuditTarget({ id: cls.id, name: cls.teacher.name })}
                              className="h-10 px-4 bg-muted border border-border rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-primary transition-all flex items-center gap-2"
                              title="File Performance Audit"
                            >
                              <MoreHorizontal size={16} /> Audit
                            </button>
                            <div className="h-10 w-[1px] bg-border mx-1" />
                            <button className="h-10 px-5 bg-emerald-500 text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-95 flex items-center gap-2">
                              <CheckCircle2 size={16} /> Attendance
                            </button>
                            <div className="h-10 w-[1px] bg-border mx-1" />
                            <div className="flex flex-col gap-1.5">
                              <button 
                                onClick={() => handleTeacherOut(cls.id)}
                                className="h-9 px-4 bg-destructive/5 text-destructive border border-destructive/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-destructive hover:text-white transition-all flex items-center gap-2"
                              >
                                <UserMinus size={14} /> Teacher Out
                              </button>
                              <button 
                                onClick={() => handleStudentOut(cls.id)}
                                className="h-9 px-4 bg-amber-500/5 text-amber-500 border border-amber-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all flex items-center gap-2"
                              >
                                <UserMinus size={14} /> Student Out
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Intelligence Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-primary/5 border border-primary/20 rounded-[32px] p-6 flex items-start gap-5">
                <div className="w-12 h-12 rounded-[20px] bg-primary/20 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                  <Info size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-[15px] font-black text-foreground uppercase tracking-tight">Super-Scheduler Monitoring Protocol</h4>
                  <p className="text-[12px] font-bold text-muted-foreground leading-relaxed">
                    You have elevated permissions to **Monitor Live** sessions. Use the **Audit** tool to log any teacher irregularities or behavioral issues. 
                    Reports filed here are automatically synced to the HR & HOD dashboards for immediate review.
                  </p>
                </div>
              </div>
              <div className="bg-card border border-border rounded-[32px] p-6 flex flex-col justify-center items-center text-center gap-2">
                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Live Surveillance</div>
                <div className="text-2xl font-black text-primary animate-pulse flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-destructive animate-ping" /> ACTIVE
                </div>
                <div className="flex gap-1 text-[10px] font-bold text-muted-foreground">
                   Monitoring 12 Live Classes
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

