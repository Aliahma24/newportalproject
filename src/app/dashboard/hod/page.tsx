"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getHodDashboardData, resolveComplaint } from "@/app/actions/hod";
import {
  LayoutDashboard, Users, GraduationCap, AlertTriangle, BookOpen,
  BarChart2, TrendingUp, TrendingDown, Star, CheckCircle2, Clock,
  ShieldCheck, ArrowUpRight, Search, Filter, MoreHorizontal,
  Plus, MessageSquare, AlertCircle, Eye, CheckCircle
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Complaint Feed Item Component
function ComplaintCard({ id, source, author, target, issue, status, timestamp }: any) {
  return (
    <div className={cn("group bg-card border border-border rounded-3xl p-5 hover:border-primary/50 transition-all shadow-sm hover:shadow-xl hover:shadow-primary/5 relative overflow-hidden", status === "RESOLVED" && "opacity-50")}>
      <div className={cn(
        "absolute top-0 right-0 w-1 h-full",
        status === "PENDING" ? "bg-amber-500" : "bg-emerald-500"
      )} />
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center border",
            source === "Scheduler" ? "bg-blue-500/10 border-blue-500/20 text-blue-500" :
            source === "Teacher" ? "bg-primary/10 border-primary/20 text-primary" :
            "bg-amber-500/10 border-amber-500/20 text-amber-500"
          )}>
            {source === "Scheduler" ? <ShieldCheck size={18} /> : 
             source === "Teacher" ? <MessageSquare size={18} /> : 
             <AlertCircle size={18} />}
          </div>
          <div>
            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{source} Audit</div>
            <div className="text-[13px] font-black text-foreground uppercase tracking-tight">{id}</div>
          </div>
        </div>
        <div className={cn(
          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
          status === "PENDING" ? "bg-amber-500/10 border-amber-500/20 text-amber-500" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
        )}>
          {status}
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-[14px] font-bold text-foreground leading-snug">{issue}</div>
        <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
          <span className="font-black text-foreground">From:</span> {author}
          <span className="mx-1">•</span>
          <span className="font-black text-foreground">Target:</span> {target}
        </div>
      </div>

      <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
        <span className="text-[10px] font-bold text-muted-foreground">{timestamp}</span>
        <div className="flex gap-2">
          {status === "PENDING" && (
            <button 
              onClick={() => id.onResolve && id.onResolve(id.rawId)}
              className="h-8 px-4 bg-primary text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center gap-1"
            >
              <CheckCircle size={12} /> Resolve
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HODDashboard() {
  const { data: session } = useSession();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Resolution Feed");
  const [supervisorMode, setSupervisorMode] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);

  const fetchData = async () => {
    const data = await getHodDashboardData();
    setDashboardData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleResolve = async (id: string) => {
    await resolveComplaint(id);
    fetchData();
  };

  const stats = dashboardData ? [
    { label: "Faculty Size", val: dashboardData.stats.totalTeachers.toString(), trend: "+Active", icon: Users },
    { label: "Resolution Rate", val: `${dashboardData.stats.resolutionRate}%`, trend: "High", icon: CheckCircle2 },
    { label: "Active Audits", val: dashboardData.stats.activeComplaints.toString(), trend: "Normal", icon: ShieldCheck },
    { label: "Total Complaints", val: dashboardData.stats.totalComplaints.toString(), trend: "All", icon: AlertTriangle },
  ] : [];

  const gradeDistribution = [
    { grade: "A", count: 12, label: "Elite Teachers" },
    { grade: "B", count: 9, label: "Professional" },
    { grade: "C", count: 3, label: "Needs Audit" },
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="hod" className="hidden md:flex w-64 shrink-0" />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        <Navbar 
          title="Compliance & Resolution Center" 
          onMenuClick={() => setSidebarOpen(true)}
          userName={session?.user?.name || "Dr. Abdur Rahman"}
          userRole="HOD"
        />

        {/* Supervisor Oversight Overlay (Simulated) */}
        <AnimatePresence>
          {supervisorMode && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-primary p-4 flex items-center justify-between px-8 text-white z-20"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <ShieldCheck size={18} />
                </div>
                <div className="text-[13px] font-black uppercase tracking-tight">Supervisor Mode Active</div>
                <div className="h-4 w-[1px] bg-white/20" />
                <div className="text-[11px] font-bold opacity-80">Viewing all reports as Director/Admin</div>
              </div>
              <button 
                onClick={() => setSupervisorMode(false)}
                className="text-[10px] font-black uppercase tracking-widest bg-white text-primary px-4 py-1.5 rounded-lg"
              >
                Exit Oversight
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 bg-muted/30">
          <div className="max-w-[1600px] mx-auto space-y-10">
            
            {/* Header / Stats */}
            <div className="flex flex-col xl:flex-row gap-8 items-start justify-between">
              <div className="space-y-1">
                <h1 className="text-4xl font-black text-foreground uppercase tracking-tight">HOD Intelligence</h1>
                <p className="text-[14px] font-bold text-muted-foreground">Monitoring faculty compliance and resolving systemic issues.</p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full xl:w-auto">
                {stats.map((s, i) => (
                  <div key={i} className="bg-card border border-border p-5 rounded-3xl min-w-[180px] group hover:border-primary transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <s.icon size={16} />
                      </div>
                      <span className={cn(
                        "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md",
                        s.trend.startsWith('+') ? "bg-emerald-500/10 text-emerald-500" : "bg-primary/10 text-primary"
                      )}>{s.trend}</span>
                    </div>
                    <div className="text-2xl font-black text-foreground">{s.val}</div>
                    <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              
              {/* Main Feed */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    {["Resolution Feed", "Teacher Logs", "Parent Desk"].map(t => (
                      <button 
                        key={t}
                        onClick={() => setActiveTab(t)}
                        className={cn(
                          "text-[12px] font-black uppercase tracking-widest pb-2 border-b-2 transition-all",
                          activeTab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                     <button className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-all">
                        <Filter size={18} />
                     </button>
                     <button className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-all">
                        <Search size={18} />
                     </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {dashboardData?.complaints?.map((c: any, i: number) => (
                    <ComplaintCard 
                      key={i} 
                      id={{ rawId: c.id, onResolve: handleResolve }} 
                      source="Teacher" 
                      author={c.submitter?.name} 
                      target={c.target?.name || "System"} 
                      issue={c.description} 
                      status={c.status} 
                      timestamp={new Date(c.createdAt).toLocaleTimeString()} 
                    />
                  ))}
                  {/* Empty Slot / Add Trigger */}
                  <Link href="/dashboard/hod/teachers/new" className="group border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center p-8 gap-4 hover:border-primary/50 hover:bg-primary/5 transition-all">
                     <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Plus size={32} />
                     </div>
                     <div className="text-center">
                        <p className="text-[14px] font-black text-foreground uppercase tracking-tight">Elite Recruitment</p>
                        <p className="text-[11px] font-bold text-muted-foreground mt-1">Enroll a new faculty member now</p>
                     </div>
                  </Link>
                </div>
              </div>

              {/* Sidebar Metrics */}
              <div className="space-y-10">
                
                {/* Faculty Distribution */}
                <div className="bg-card border border-border rounded-[40px] p-8 shadow-2xl shadow-primary/5">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-[15px] font-black text-foreground uppercase tracking-tight">Faculty Matrix</h3>
                    <div className="w-10 h-10 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
                      <BarChart2 size={20} />
                    </div>
                  </div>

                  <div className="space-y-6">
                    {gradeDistribution.map((g, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                          <span className="text-muted-foreground">{g.label}</span>
                          <span className={cn(
                            g.grade === "A" ? "text-emerald-500" : g.grade === "B" ? "text-primary" : "text-destructive"
                          )}>Grade {g.grade} • {g.count}</span>
                        </div>
                        <div className="w-full h-3 bg-muted rounded-full overflow-hidden border border-border">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(g.count / 24) * 100}%` }}
                            className={cn(
                              "h-full rounded-full transition-all duration-1000",
                              g.grade === "A" ? "bg-emerald-500" : g.grade === "B" ? "bg-primary" : "bg-destructive"
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setSupervisorMode(true)}
                    className="w-full mt-10 h-14 bg-secondary text-white rounded-2xl text-[12px] font-black uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-3"
                  >
                    <Eye size={18} /> Enter Supervisor Mode
                  </button>
                </div>

                {/* Intelligence Tip */}
                <div className="bg-primary/5 border border-primary/20 rounded-[32px] p-6 flex items-start gap-4">
                   <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                      <AlertCircle size={20} />
                   </div>
                   <div className="space-y-1">
                      <h4 className="text-[13px] font-black text-foreground uppercase tracking-tight">Compliance Protocol</h4>
                      <p className="text-[11px] font-bold text-muted-foreground leading-relaxed">
                        Reports from the Scheduler Cockpit (Audits) require immediate resolution within 4 hours. 
                        Unresolved Grade C issues trigger automatic alerts to the Operational Manager.
                      </p>
                   </div>
                </div>

              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
