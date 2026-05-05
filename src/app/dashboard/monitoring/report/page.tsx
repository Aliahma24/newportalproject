"use client";

import React, { useState } from "react";
import {
  ClipboardList, CheckCircle2, AlertTriangle, MessageSquare,
  Send, User, Clock, ShieldCheck, Camera, Mic, Wifi
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function QualityReportSubmission() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [ratings, setRatings] = useState({
    video: "Good",
    audio: "Good",
    internet: "Stable",
    behavior: "Professional",
    punctuality: "On Time"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="monitoring" className="hidden md:flex w-64 shrink-0" />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar title="Submit Quality Report" onMenuClick={() => setSidebarOpen(true)} userName="Monitoring Agent 1" userRole="Monitoring" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            {submitted ? (
              <div className="bg-card border border-border rounded-3xl p-12 shadow-xl flex flex-col items-center text-center gap-6">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500">
                  <ShieldCheck size={40} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">Report Submitted Successfully</h2>
                  <p className="text-[14px] text-muted-foreground font-medium max-w-sm">
                    The quality report for <strong>Ustadh Bilal's</strong> class has been recorded and sent to the HOD.
                  </p>
                </div>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="h-11 px-8 bg-primary text-white rounded-xl text-[14px] font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                >
                  Monitor Another Class
                </button>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-3xl shadow-xl overflow-hidden">
                <div className="p-8 border-b border-border bg-muted/20 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                      <ClipboardList size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">Class Quality Assessment</h2>
                      <p className="text-[13px] text-muted-foreground font-medium">Ustadh Bilal vs Zaid Ibrahim • 14:00 Session</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                    <Clock size={16} />
                    <span className="text-[13px] font-bold">15:12 Monitoring Time</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-10">
                  {/* Rating Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Visual Quality */}
                    <div className="space-y-4">
                      <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        <Camera size={14} className="text-primary" /> Video Quality
                      </label>
                      <div className="flex gap-2">
                        {["Poor", "Average", "Good"].map(r => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setRatings({...ratings, video: r})}
                            className={cn(
                              "flex-1 h-11 rounded-xl text-[12px] font-bold border transition-all",
                              ratings.video === r ? "bg-primary text-white border-primary shadow-md shadow-primary/10" : "bg-muted/30 border-border text-muted-foreground hover:border-primary/50"
                            )}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Audio Quality */}
                    <div className="space-y-4">
                      <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        <Mic size={14} className="text-primary" /> Audio Clarity
                      </label>
                      <div className="flex gap-2">
                        {["Unclear", "Average", "Good"].map(r => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setRatings({...ratings, audio: r})}
                            className={cn(
                              "flex-1 h-11 rounded-xl text-[12px] font-bold border transition-all",
                              ratings.audio === r ? "bg-secondary text-white border-secondary shadow-md shadow-secondary/10" : "bg-muted/30 border-border text-muted-foreground hover:border-secondary/50"
                            )}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Internet */}
                    <div className="space-y-4">
                      <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        <Wifi size={14} className="text-primary" /> Connectivity
                      </label>
                      <div className="flex gap-2">
                        {["Lagging", "Drops", "Stable"].map(r => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setRatings({...ratings, internet: r})}
                            className={cn(
                              "flex-1 h-11 rounded-xl text-[12px] font-bold border transition-all",
                              ratings.internet === r ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/10" : "bg-muted/30 border-border text-muted-foreground hover:border-emerald-500/50"
                            )}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Teacher Behavior */}
                    <div className="space-y-4">
                      <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        <User size={14} className="text-primary" /> Teacher Behavior
                      </label>
                      <div className="flex gap-2">
                        {["Unprof.", "Passive", "Professional"].map(r => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setRatings({...ratings, behavior: r})}
                            className={cn(
                              "flex-1 h-11 rounded-xl text-[11px] font-bold border transition-all",
                              ratings.behavior === r ? "bg-slate-800 text-white border-slate-800 shadow-md shadow-slate-800/10" : "bg-muted/30 border-border text-muted-foreground hover:border-slate-800/50"
                            )}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Observations */}
                  <div className="space-y-4 border-t border-border pt-10">
                    <h3 className="text-[15px] font-bold text-foreground flex items-center gap-2">
                      <MessageSquare size={18} className="text-primary" /> Detailed Observations
                    </h3>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Comments for HOD</label>
                      <textarea 
                        required
                        placeholder="Describe any issues or highlights observed during the monitoring..."
                        className="w-full h-32 bg-muted/30 border border-border rounded-2xl p-5 text-[14px] font-medium outline-none focus:border-primary transition-all resize-none placeholder:text-muted-foreground/40"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <button 
                      type="submit"
                      className="w-full h-14 bg-primary text-white rounded-2xl text-[16px] font-bold flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98]"
                    >
                      <Send size={20} /> Finalize and Submit Report
                    </button>
                    <p className="mt-4 text-center text-[11px] font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-center gap-2">
                      <AlertTriangle size={14} className="text-amber-500" /> Once submitted, reports cannot be edited.
                    </p>
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
