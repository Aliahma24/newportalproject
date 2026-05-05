"use client";

import React, { useState } from "react";
import {
  ClipboardList, User, Phone, Calendar, Clock, BookOpen,
  ChevronRight, Send, CheckCircle2, UserPlus, Info
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function DemoRequestForm() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    guardianName: "",
    studentName: "",
    studentAge: "",
    studentLevel: "Beginner",
    whatsapp: "",
    timeSlot: "",
    days: "Mon-Thu",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="csr" className="hidden md:flex w-64 shrink-0" />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar title="New Demo Request" onMenuClick={() => setSidebarOpen(true)} userName="Zoya Ahmed" userRole="CSR" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-muted/30">
          <div className="max-w-3xl mx-auto">
            {submitted ? (
              <div className="bg-card border border-border rounded-3xl p-12 shadow-xl shadow-primary/5 flex flex-col items-center text-center gap-6 animate-in zoom-in duration-300">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500">
                  <CheckCircle2 size={40} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">Request Captured!</h2>
                  <p className="text-[14px] text-muted-foreground font-medium max-w-sm">
                    Student <strong>{formData.studentName}</strong> has been added to the demo queue. The Scheduler has been notified.
                  </p>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="h-11 px-8 border border-primary text-primary rounded-xl text-[14px] font-bold hover:bg-primary/5 transition-all"
                  >
                    Add Another Request
                  </button>
                  <button className="h-11 px-8 bg-primary text-white rounded-xl text-[14px] font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                    View Demo Queue
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-3xl shadow-xl shadow-primary/5 overflow-hidden">
                {/* Header Pattern */}
                <div className="h-32 bg-primary relative overflow-hidden flex items-center px-8">
                  <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='none' stroke='%23ffffff' stroke-width='2'/%3E%3C/svg%3E")` }}
                  />
                  <div className="relative z-10 flex items-center gap-4 text-white">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                      <UserPlus size={28} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">New Student Intake</h2>
                      <p className="text-[13px] opacity-80 font-medium">Capture details for the initial demo session</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                  {/* Guardian Section */}
                  <div className="space-y-4">
                    <h3 className="text-[14px] font-bold text-foreground flex items-center gap-2">
                      <User size={18} className="text-primary" /> Guardian Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Guardian Name</label>
                        <input 
                          required
                          type="text" 
                          placeholder="Full Name"
                          className="w-full h-12 bg-muted/30 border border-border rounded-xl px-4 text-[14px] font-medium focus:border-primary outline-none transition-all"
                          value={formData.guardianName}
                          onChange={e => setFormData({...formData, guardianName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">WhatsApp Number</label>
                        <div className="relative">
                          <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <input 
                            required
                            type="tel" 
                            placeholder="+92 3XX XXXXXXX"
                            className="w-full h-12 bg-muted/30 border border-border rounded-xl pl-11 pr-4 text-[14px] font-medium focus:border-primary outline-none transition-all"
                            value={formData.whatsapp}
                            onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Student Section */}
                  <div className="space-y-4">
                    <h3 className="text-[14px] font-bold text-foreground flex items-center gap-2 border-t border-border pt-8">
                      <ClipboardList size={18} className="text-primary" /> Student Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2 space-y-1.5">
                        <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Student Name</label>
                        <input 
                          required
                          type="text" 
                          placeholder="Name of the child/student"
                          className="w-full h-12 bg-muted/30 border border-border rounded-xl px-4 text-[14px] font-medium focus:border-primary outline-none transition-all"
                          value={formData.studentName}
                          onChange={e => setFormData({...formData, studentName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Age</label>
                        <input 
                          required
                          type="number" 
                          placeholder="Years"
                          className="w-full h-12 bg-muted/30 border border-border rounded-xl px-4 text-[14px] font-medium focus:border-primary outline-none transition-all"
                          value={formData.studentAge}
                          onChange={e => setFormData({...formData, studentAge: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Student Level</label>
                      <div className="grid grid-cols-3 gap-3">
                        {["Beginner", "Intermediate", "Advanced"].map(lvl => (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => setFormData({...formData, studentLevel: lvl})}
                            className={cn(
                              "h-11 rounded-xl text-[12px] font-bold border transition-all",
                              formData.studentLevel === lvl 
                                ? "bg-primary text-white border-primary" 
                                : "bg-muted/30 border-border text-muted-foreground hover:border-primary/50"
                            )}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Preference Section */}
                  <div className="space-y-4">
                    <h3 className="text-[14px] font-bold text-foreground flex items-center gap-2 border-t border-border pt-8">
                      <Clock size={18} className="text-primary" /> Scheduling Preferences
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Preferred Time Slot</label>
                        <div className="relative">
                          <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <input 
                            required
                            type="time" 
                            className="w-full h-12 bg-muted/30 border border-border rounded-xl pl-11 pr-4 text-[14px] font-medium focus:border-primary outline-none transition-all"
                            value={formData.timeSlot}
                            onChange={e => setFormData({...formData, timeSlot: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Preferred Days</label>
                        <div className="grid grid-cols-2 gap-3">
                          {["Mon-Thu", "Sat-Sun"].map(days => (
                            <button
                              key={days}
                              type="button"
                              onClick={() => setFormData({...formData, days})}
                              className={cn(
                                "h-12 rounded-xl text-[12px] font-bold border transition-all flex flex-col items-center justify-center leading-tight",
                                formData.days === days 
                                  ? "bg-secondary text-white border-secondary" 
                                  : "bg-muted/30 border-border text-muted-foreground hover:border-secondary/50"
                              )}
                            >
                              <span>{days}</span>
                              <span className="text-[9px] opacity-70">{days === "Mon-Thu" ? "Weekday" : "Weekend"}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit"
                      className="w-full h-14 bg-primary text-white rounded-2xl text-[16px] font-bold flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98]"
                    >
                      <Send size={20} /> Submit to Scheduler
                    </button>
                    <div className="mt-4 flex items-center justify-center gap-2 text-[12px] font-medium text-muted-foreground">
                      <Info size={14} className="text-primary" /> Info will be visible to Schedulers immediately.
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
