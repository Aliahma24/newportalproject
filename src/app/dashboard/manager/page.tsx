"use client";

import React, { useState, useEffect } from "react";
import { getManagerData } from "@/app/actions/analytics";
import { escalateIssue } from "@/app/actions/admin";
import { 
  Globe, Users, Clock, ShieldCheck, ArrowUpRight, 
  MapPin, AlertTriangle, CheckCircle2, Search, 
  Filter, MoreHorizontal, LayoutDashboard, 
  ChevronRight, BarChart2, TrendingUp, Briefcase,
  Monitor, Activity, Eye, CheckCircle
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function ManagerDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeRegion, setActiveRegion] = useState("Global");
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      const res = await getManagerData();
      if (res) setData(res);
    }
    loadData();
  }, []);

  const globalMetrics = [
    { label: "Total Students", val: data?.metrics?.totalStudents || "0", trend: "+12%", icon: Users },
    { label: "Active Faculty", val: data?.metrics?.activeFaculty || "0", trend: "Stable", icon: Briefcase },
    { label: "Global Efficiency", val: data?.metrics?.globalEfficiency || "0%", trend: "+2.1%", icon: Activity },
    { label: "Open Escalations", val: data?.metrics?.openEscalations || "0", trend: "Needs Action", icon: AlertTriangle },
  ];

  const shiftManagers = data?.shiftManagers || [];
  const regionalPerformance = data?.regionalPerformance || [];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="manager" className="hidden md:flex w-64 shrink-0" />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        <Navbar 
          title="Global Operations Management" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Ahmed Al-Farsi"
          userRole="Global Manager"
        />

        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 bg-muted/30">
          <div className="max-w-[1600px] mx-auto space-y-10">
            
            {/* Global Intelligence Header */}
            <div className="flex flex-col xl:flex-row items-start justify-between gap-8">
               <div className="space-y-1">
                  <h1 className="text-4xl font-black text-foreground uppercase tracking-tight">Global Command</h1>
                  <p className="text-[14px] font-bold text-muted-foreground">Orchestrating multi-regional shifts and escalations.</p>
               </div>
               
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full xl:w-auto">
                 {globalMetrics.map((m, i) => (
                   <div key={i} className="bg-card border border-border p-5 rounded-3xl min-w-[180px] shadow-sm hover:border-primary transition-all group">
                      <div className="flex items-center justify-between mb-3">
                         <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <m.icon size={16} />
                         </div>
                         <span className="text-[9px] font-black uppercase tracking-widest text-primary">{m.trend}</span>
                      </div>
                      <div className="text-2xl font-black text-foreground">{m.val}</div>
                      <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">{m.label}</div>
                   </div>
                 ))}
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
               
               {/* Shift Manager Surveillance */}
               <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between px-4">
                     <h2 className="text-xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
                        <Monitor size={20} className="text-primary" /> Shift Manager Audit
                     </h2>
                  </div>

                  <div className="bg-card border border-border rounded-[40px] overflow-hidden shadow-2xl shadow-primary/5">
                     <table className="w-full text-left border-collapse">
                        <thead>
                           <tr className="bg-muted/30">
                              <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border">Shift Manager</th>
                              <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border">Region</th>
                              <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border">Status</th>
                              <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border text-center">Efficiency</th>
                              <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border text-center">Alerts</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                           {shiftManagers.map((sm: any, i: number) => (
                              <tr key={i} className="hover:bg-muted/5 transition-colors">
                                 <td className="p-6">
                                    <div className="text-[14px] font-black text-foreground">{sm.name}</div>
                                 </td>
                                 <td className="p-6">
                                    <div className="flex items-center gap-2 text-[12px] font-bold text-muted-foreground">
                                       <MapPin size={14} className="text-primary" /> {sm.region}
                                    </div>
                                 </td>
                                 <td className="p-6">
                                    <span className={cn(
                                       "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                       sm.status === "On-Shift" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600" : "bg-muted border-border text-muted-foreground"
                                    )}>{sm.status}</span>
                                 </td>
                                 <td className="p-6 text-center text-[13px] font-black text-foreground">{sm.efficiency}</td>
                                 <td className="p-6 text-center">
                                    {sm.escalations > 0 ? (
                                       <span className="px-2 py-1 bg-destructive/10 text-destructive border border-destructive/20 rounded-lg text-[10px] font-black">{sm.escalations} Active</span>
                                    ) : (
                                       <CheckCircle2 size={18} className="text-emerald-500 mx-auto" />
                                    )}
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>

               {/* Regional Market Share */}
               <div className="space-y-8">
                  <div className="bg-card border border-border rounded-[40px] p-8 shadow-2xl shadow-primary/5 space-y-8">
                     <h3 className="text-[15px] font-black text-foreground uppercase tracking-tight">Regional Distribution</h3>
                     
                     <div className="space-y-8">
                        {regionalPerformance.map((rp: any, i: number) => (
                           <div key={i} className="space-y-3">
                              <div className="flex justify-between items-end">
                                 <div>
                                    <div className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">{rp.region} Market</div>
                                    <div className="text-xl font-black text-foreground">{rp.students} Students</div>
                                 </div>
                                 <div className="text-right">
                                    <div className="text-[14px] font-black text-primary">{rp.revenue}</div>
                                    <div className="text-[9px] font-black text-emerald-500 uppercase">{rp.growth}</div>
                                 </div>
                              </div>
                              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                 <motion.div initial={{ width: 0 }} animate={{ width: rp.revenue }} className="h-full bg-primary" />
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Global Escalation Feed (Mock) */}
                  <div className="bg-card border border-border rounded-[32px] p-6 space-y-4">
                     <div className="flex items-center justify-between">
                        <h4 className="text-[13px] font-black text-foreground uppercase tracking-tight">Active Escalations</h4>
                        <span className="text-[10px] font-black text-destructive uppercase tracking-widest animate-pulse">Action Required</span>
                     </div>
                     <div className="space-y-3">
                        <div className="p-4 bg-destructive/5 border border-destructive/10 rounded-2xl">
                           <div className="text-[10px] font-black text-muted-foreground uppercase">UK Shift Alert</div>
                           <p className="text-[12px] font-bold text-foreground mt-1">"Mass internet outage in Lahore affecting 3 UK teachers."</p>
                           <button 
                             onClick={async () => {
                               const res = await escalateIssue("Backup Deployed", "Manager deployed backup for UK outage.");
                               if (res.success) alert("Backup Deployed & Logged to System");
                             }}
                             className="text-[10px] font-black text-primary uppercase tracking-widest mt-2 hover:underline"
                           >
                             Deploy Backup
                           </button>
                        </div>
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
