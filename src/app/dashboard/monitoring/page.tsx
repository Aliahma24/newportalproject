"use client";

import React, { useState, useEffect } from "react";
import { getMonitoringData } from "@/app/actions/analytics";
import {
  ShieldCheck, Search, Filter, Video, Clock, User,
  CheckCircle2, AlertCircle, Play, MoreVertical, LayoutGrid,
  List, MessageSquare
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { escalateIssue } from "@/app/actions/admin";
import { motion, AnimatePresence } from "framer-motion";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
              onClick={() => { onConfirm(`Audit filed for ${teacherName}: [${reportType}] - ${description}`); onClose(); }}
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

export default function MonitoringDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [liveClasses, setLiveClasses] = useState<any[]>([]);
  const [auditTarget, setAuditTarget] = useState<{ id: string, name: string } | null>(null);

  useEffect(() => {
    async function loadData() {
      const res = await getMonitoringData();
      if (res?.liveClasses) setLiveClasses(res.liveClasses);
    }
    loadData();
  }, []);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="monitoring" className="hidden md:flex w-64 shrink-0" />

      {/* Audit Modal Overlay */}
      <AnimatePresence>
        {auditTarget && (
          <AuditModal 
            isOpen={!!auditTarget} 
            onClose={() => setAuditTarget(null)} 
            teacherName={auditTarget.name} 
            onConfirm={async (msg) => {
              const res = await escalateIssue(`QA Audit: ${auditTarget.name}`, msg);
              if (res.success) {
                alert("Audit submitted and saved as Complaint to Database");
              } else {
                alert("Failed to submit audit");
              }
            }} 
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar title="Live Monitor" onMenuClick={() => setSidebarOpen(true)} userName="Monitoring Agent 1" userRole="Monitoring" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-muted/30 space-y-6">
          
          {/* Active Classes Count */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Video size={24} className="animate-pulse" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{liveClasses.length} Active Classes</h2>
                <p className="text-[13px] text-muted-foreground font-medium">Monitoring team is watching {liveClasses.length} live sessions</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-card border border-border rounded-xl p-0.5">
                <button 
                  onClick={() => setViewMode("list")}
                  className={cn("p-1.5 rounded-lg transition-all", viewMode === "list" ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted")}
                >
                  <List size={18} />
                </button>
                <button 
                  onClick={() => setViewMode("grid")}
                  className={cn("p-1.5 rounded-lg transition-all", viewMode === "grid" ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted")}
                >
                  <LayoutGrid size={18} />
                </button>
              </div>
              <button className="h-11 px-4 border border-border bg-card rounded-xl text-[13px] font-bold text-muted-foreground flex items-center gap-2 hover:bg-muted transition-all">
                <Filter size={18} /> Filter List
              </button>
            </div>
          </div>

          {/* Monitoring Grid */}
          <div className={cn(
            "grid gap-6",
            viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
          )}>
            {liveClasses.map((cls, i) => (
              <div key={i} className={cn(
                "bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col group transition-all hover:shadow-lg",
                cls.status === "Watching" && "ring-2 ring-primary"
              )}>
                {/* Virtual Video Feed Placeholder */}
                <div className="aspect-video bg-slate-900 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md">Live</span>
                  </div>
                  <div className="absolute top-3 right-3 text-white/60">
                    <MoreVertical size={16} />
                  </div>
                  
                  {/* Camera Placeholders */}
                  <div className="flex gap-4 opacity-20">
                    <div className="w-16 h-12 bg-white rounded-lg flex items-center justify-center"><User size={20} /></div>
                    <div className="w-16 h-12 bg-white rounded-lg flex items-center justify-center"><User size={20} /></div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <div className="text-white text-[12px] font-bold">
                      {cls.teacher} vs {cls.student}
                    </div>
                  </div>
                  
                  {/* Hover Play Button */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <button className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-xl shadow-primary/40 transform scale-90 group-hover:scale-100 transition-transform">
                      <Play size={24} fill="currentColor" className="ml-1" />
                    </button>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[12px] font-bold text-muted-foreground">
                      <Clock size={14} /> {cls.startTime} ({cls.duration})
                    </div>
                    <span className={cn("px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest",
                      cls.status === "Watching" ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-muted text-muted-foreground"
                    )}>{cls.status}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2 border-t border-border pt-4">
                    <div className="flex items-center gap-1.5">
                      <div className={cn("w-2 h-2 rounded-full",
                        cls.quality === "Good" ? "bg-emerald-500" : cls.quality === "Reported" ? "bg-red-500" : "bg-slate-300"
                      )} />
                      <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Quality: {cls.quality}</span>
                    </div>
                    <button onClick={() => setAuditTarget({ id: cls.id, name: cls.teacher })} className="h-8 px-3 bg-secondary/10 text-secondary border border-secondary/20 rounded-lg text-[11px] font-bold flex items-center gap-1.5 hover:bg-secondary hover:text-white transition-all cursor-pointer">
                      <MessageSquare size={14} /> Report
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats Sidebar-style row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex items-center gap-6">
              <div className="h-16 w-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <ShieldCheck size={32} />
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-foreground">Health Check Passed</h3>
                <p className="text-[13px] text-muted-foreground font-medium">92% of classes monitored today meet quality standards. 2 issues reported and being handled by HOD.</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex items-center gap-6">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Clock size={32} />
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-foreground">Average Watch Time</h3>
                <p className="text-[13px] text-muted-foreground font-medium">Monitoring agents are spending an average of 8 minutes per active session today.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
