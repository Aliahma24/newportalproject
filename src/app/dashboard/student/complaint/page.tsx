"use client";

import React, { useState } from "react";
import {
  AlertTriangle, CheckCircle2, ChevronDown, Info, Send, Clock, Calendar
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function SubmitComplaint() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const issueTypes = [
    "Teacher camera off during class",
    "Teacher not correcting mistakes",
    "Teacher misbehavior",
    "Technical issues (audio/video)",
    "Class not held on time",
    "Class cancelled without notice",
    "Other",
  ];

  const pastComplaints = [
    { date: "Apr 10, 2024", type: "Technical issues (audio/video)", status: "Resolved", ref: "CMP-0041" },
    { date: "Feb 28, 2024", type: "Class not held on time", status: "Under Review", ref: "CMP-0028" },
  ];

  const handleSubmit = () => {
    if (!issueType || !description) return;
    setSubmitted(true);
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="student" className="hidden md:flex w-64 shrink-0" />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar title="Submit Complaint" onMenuClick={() => setSidebarOpen(true)} userName="Yousuf Ali" userRole="Student" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-muted/30 space-y-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: Form */}
            <div className="flex-[1.4]">
              {submitted ? (
                <div className="bg-card border border-border rounded-xl p-10 shadow-sm flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 size={32} className="text-emerald-500" />
                  </div>
                  <h2 className="text-[18px] font-bold text-foreground">Complaint Submitted</h2>
                  <p className="text-[13px] text-muted-foreground font-medium max-w-xs leading-relaxed">
                    Your complaint has been sent to the <strong>HOD</strong> and <strong>Monitoring Team</strong>. You will be notified of the resolution.
                  </p>
                  <div className="mt-1 px-4 py-2 bg-muted rounded-lg text-[12px] font-bold text-muted-foreground">
                    Reference: CMP-{String(Math.floor(Math.random() * 9000) + 1000)}
                  </div>
                  <button
                    onClick={() => { setSubmitted(false); setIssueType(""); setDescription(""); }}
                    className="h-10 px-6 border border-primary text-primary rounded-xl text-[13px] font-bold hover:bg-primary/5 transition-all"
                  >
                    Submit Another
                  </button>
                </div>
              ) : (
                <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
                    <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center text-red-500">
                      <AlertTriangle size={18} />
                    </div>
                    <h2 className="text-[15px] font-bold text-foreground">New Complaint</h2>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Info */}
                    <div className="flex items-start gap-3 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                      <Info size={15} className="text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-[12px] font-medium text-amber-700 leading-relaxed">
                        Your complaint will be forwarded to the HOD and Monitoring Team immediately. Please provide accurate details.
                      </p>
                    </div>

                    {/* Issue Type */}
                    <div className="space-y-2">
                      <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-widest">Issue Type *</label>
                      <div className="relative">
                        <select
                          value={issueType}
                          onChange={e => setIssueType(e.target.value)}
                          className="w-full h-11 bg-muted/30 border border-border rounded-xl px-4 pr-10 text-[13px] font-bold text-foreground outline-none focus:border-primary transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Select the issue type...</option>
                          {issueTypes.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-widest">Description *</label>
                      <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Please describe the issue in detail. Include the date, time, and teacher name if applicable..."
                        rows={5}
                        className="w-full bg-muted/30 border border-border rounded-xl px-4 py-3 text-[13px] font-medium text-foreground outline-none focus:border-primary transition-all resize-none placeholder:text-muted-foreground"
                      />
                      <div className="text-right text-[11px] text-muted-foreground font-medium">{description.length} characters</div>
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={!issueType || !description}
                      className={cn(
                        "w-full h-11 rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 transition-all",
                        issueType && description
                          ? "bg-red-500 text-white shadow-lg shadow-red-500/20 hover:bg-red-600"
                          : "bg-muted text-muted-foreground cursor-not-allowed"
                      )}
                    >
                      <Send size={16} /> Submit Complaint
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Past Complaints */}
            <div className="flex-1 bg-card border border-border rounded-xl shadow-sm flex flex-col overflow-hidden">
              <div className="p-5 border-b border-border bg-muted/30">
                <h3 className="text-[15px] font-bold text-foreground">My Complaints</h3>
              </div>
              {pastComplaints.length > 0 ? (
                <div className="flex-1 overflow-y-auto divide-y divide-border">
                  {pastComplaints.map((c, i) => (
                    <div key={i} className="p-5 hover:bg-muted/10 transition-all space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-[12px] font-bold text-muted-foreground font-mono">{c.ref}</div>
                        <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0",
                          c.status === "Resolved" ? "bg-emerald-100 text-emerald-600" :
                          c.status === "Under Review" ? "bg-amber-100 text-amber-600" :
                          "bg-slate-100 text-slate-500"
                        )}>{c.status}</span>
                      </div>
                      <div className="text-[13px] font-bold text-foreground leading-tight">{c.type}</div>
                      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                        <Calendar size={11} />{c.date}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center p-10 text-center">
                  <div>
                    <CheckCircle2 size={40} className="text-emerald-400 mx-auto mb-3" />
                    <p className="text-[13px] font-bold text-muted-foreground">No complaints submitted yet</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
