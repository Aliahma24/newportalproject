"use client";

import React, { useState, useEffect } from "react";
import { getMonitoringData } from "@/app/actions/analytics";
import { escalateIssue } from "@/app/actions/admin";
import { 
  Globe, Users, Clock, ShieldCheck, ArrowUpRight, 
  MapPin, AlertTriangle, CheckCircle2, Search, 
  Filter, MoreHorizontal, LayoutDashboard, 
  ChevronRight, PlayCircle, Star, MessageSquare
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function ShiftManagerDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [region] = useState("United Kingdom"); // Locked to UK
  
  // UK-Specific Data (Regional Lock)
  const stats = [
    { label: "Active UK Slots", val: "18", trend: "High Load", icon: Clock },
    { label: "UK Teachers", val: "12", trend: "+2", icon: Users },
    { label: "UK Students", val: "84", trend: "+5", icon: Star },
    { label: "Pending Issues", val: "03", trend: "Urgent", icon: AlertTriangle },
  ];

  const [ukClasses, setUkClasses] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const res = await getMonitoringData();
      if (res?.liveClasses) {
        setUkClasses(res.liveClasses.map((c: any) => ({
          id: `UK-${c.id.substring(0,4)}`,
          student: c.student,
          teacher: c.teacher,
          slot: `${c.startTime} GMT`,
          status: "Active",
          attendance: "Verified"
        })));
      }
    }
    loadData();
  }, []);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="shift-manager" className="hidden md:flex w-64 shrink-0" />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        <Navbar 
          title="Regional Shift Management" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Fatima Zahra"
          userRole="Shift Manager (UK)"
        />

        {/* Regional Lock Indicator */}
        <div className="bg-primary p-3 flex items-center justify-center gap-4 text-white shadow-lg z-20">
           <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em]">
              <Globe size={16} className="animate-spin-slow" />
              Regional Scope: {region} Only
           </div>
           <div className="h-4 w-[1px] bg-white/20" />
           <div className="text-[10px] font-bold opacity-80">Access to USA & UAE regions is RESTRICTED.</div>
        </div>

        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 bg-muted/30">
          <div className="max-w-[1600px] mx-auto space-y-10">
            
            {/* Regional Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <div key={i} className="bg-card border border-border p-6 rounded-[32px] shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group">
                   <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center transition-transform group-hover:scale-110">
                         <s.icon size={24} />
                      </div>
                      <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest bg-muted px-2 py-1 rounded-md">{s.trend}</span>
                   </div>
                   <div className="text-3xl font-black text-foreground">{s.val}</div>
                   <div className="text-[11px] font-black text-muted-foreground uppercase tracking-widest mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
               
               {/* UK Live Operations Grid */}
               <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between px-4">
                     <h2 className="text-xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
                        <LayoutDashboard size={20} className="text-primary" /> UK Session Control
                     </h2>
                     <div className="flex items-center gap-2">
                        <button className="h-10 px-4 bg-card border border-border rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-muted transition-all">
                           <Filter size={14} /> UK Filter
                        </button>
                     </div>
                  </div>

                  <div className="bg-card border border-border rounded-[40px] overflow-hidden shadow-2xl shadow-primary/5">
                     <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                           <thead>
                              <tr className="bg-muted/30">
                                 <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border">Session Details</th>
                                 <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border">Teacher</th>
                                 <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border">GMT Slot</th>
                                 <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border text-center">Status</th>
                                 <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border text-center">Actions</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-border">
                              {ukClasses.map((cls, i) => (
                                 <tr key={i} className="hover:bg-muted/5 transition-colors group">
                                    <td className="p-6">
                                       <div className="flex items-center gap-3">
                                          <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-xs">{cls.id.split('-')[1]}</div>
                                          <div className="text-[14px] font-black text-foreground">{cls.student}</div>
                                       </div>
                                    </td>
                                    <td className="p-6">
                                       <div className="text-[13px] font-bold text-foreground">{cls.teacher}</div>
                                    </td>
                                    <td className="p-6">
                                       <div className="text-[13px] font-black text-primary bg-primary/5 px-3 py-1 rounded-lg inline-block">{cls.slot}</div>
                                    </td>
                                    <td className="p-6 text-center">
                                       <span className={cn(
                                          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                          cls.status === "Active" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600" : "bg-muted border-border text-muted-foreground"
                                       )}>{cls.status}</span>
                                    </td>
                                    <td className="p-6">
                                       <div className="flex items-center justify-center gap-2">
                                          <button 
                                             onClick={() => alert("Monitoring session connected")}
                                             className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-primary transition-all shadow-sm" title="Monitor Session"
                                          >
                                             <PlayCircle size={16} />
                                          </button>
                                          <button 
                                             onClick={async () => {
                                                const res = await escalateIssue(`Shift Escalation: ${cls.teacher}`, "Urgent attention required during shift.");
                                                if (res.success) alert("Escalated to Global Manager");
                                             }}
                                             className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-destructive transition-all shadow-sm" title="Escalate to Manager"
                                          >
                                             <AlertTriangle size={16} />
                                          </button>
                                       </div>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>

               {/* Regional Audit Sidebar */}
               <div className="space-y-8">
                  <div className="bg-card border border-border rounded-[40px] p-8 shadow-2xl shadow-primary/5 space-y-8">
                     <div className="flex items-center justify-between">
                        <h3 className="text-[15px] font-black text-foreground uppercase tracking-tight">UK Shift Audit</h3>
                        <MapPin size={20} className="text-primary" />
                     </div>

                     <div className="space-y-6">
                        <div className="space-y-2">
                           <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                              <span className="text-muted-foreground">Session Efficiency</span>
                              <span className="text-emerald-500">92%</span>
                           </div>
                           <div className="h-2 w-full bg-muted rounded-full overflow-hidden border border-border">
                              <motion.div initial={{ width: 0 }} animate={{ width: "92%" }} className="h-full bg-emerald-500" />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                              <span className="text-muted-foreground">Teacher Punctuality</span>
                              <span className="text-primary">88%</span>
                           </div>
                           <div className="h-2 w-full bg-muted rounded-full overflow-hidden border border-border">
                              <motion.div initial={{ width: 0 }} animate={{ width: "88%" }} className="h-full bg-primary" />
                           </div>
                        </div>
                     </div>

                     <div className="p-6 bg-muted/50 border border-border rounded-3xl space-y-4">
                        <div className="flex items-center gap-3">
                           <ShieldCheck size={18} className="text-primary" />
                           <span className="text-[11px] font-black uppercase tracking-widest">Operational Guard</span>
                        </div>
                        <p className="text-[11px] font-bold text-muted-foreground leading-relaxed">
                           You are currently managing the **Evening Shift (UK)**. All reports filed here are routed directly to the Global Manager for final approval.
                        </p>
                     </div>
                  </div>

                  {/* Manager Escalation Quick Action */}
                  <div className="bg-destructive/5 border border-destructive/20 rounded-[32px] p-6 space-y-4">
                     <div className="flex items-center gap-3">
                        <AlertTriangle size={20} className="text-destructive" />
                        <h4 className="text-[13px] font-black text-foreground uppercase tracking-tight">Manager Escalation</h4>
                     </div>
                     <p className="text-[11px] font-bold text-muted-foreground leading-relaxed">
                        Notice: 3 classes in the UK-South region are facing persistent internet issues. Escalate for immediate teacher backup.
                     </p>
                     <button 
                        onClick={async () => {
                           const res = await escalateIssue("Global Alert: UK-South Outage", "3 classes in the UK-South region are facing persistent internet issues.");
                           if (res.success) alert("Global Alert Escalated");
                        }}
                        className="w-full h-12 bg-destructive text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-destructive/90 transition-all"
                     >
                        Escalate Global Alert
                     </button>
                  </div>
               </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
