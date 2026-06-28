"use client";

import React, { useState, useEffect } from "react";
import { getDirectorData } from "@/app/actions/analytics";
import { 
  ShieldCheck, TrendingUp, Users, DollarSign, 
  BarChart2, Globe, ArrowUpRight, Award,
  Briefcase, Activity, PieChart, Star,
  Search, Filter, Calendar, ChevronRight
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function DirectorDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      const res = await getDirectorData();
      if (res) setData(res);
    }
    loadData();
  }, []);

  const executiveMetrics = [
    { label: "Annual Revenue", val: data?.metrics?.annualRevenue || "$0", trend: "+15%", icon: DollarSign },
    { label: "Student Retention", val: data?.metrics?.studentRetention || "0%", trend: "Exceptional", icon: Activity },
    { label: "Faculty Expansion", val: data?.metrics?.facultyExpansion || "0", trend: "On Target", icon: TrendingUp },
    { label: "Active Students", val: data?.metrics?.activeStudents || "0", trend: "Global", icon: Globe },
  ];

  const regionalGrowth = data?.regionalGrowth || [];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="director" className="hidden md:flex w-64 shrink-0" />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        <Navbar 
          title="Executive Intelligence Suite" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Director Board"
          userRole="Global Directorship"
        />

        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 bg-muted/30">
          <div className="max-w-[1600px] mx-auto space-y-10">
            
            {/* Directorship Welcome */}
            <div className="bg-primary p-12 rounded-[60px] text-white relative overflow-hidden shadow-2xl shadow-primary/20 group">
               <div className="absolute inset-0 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-1000" 
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0l50 50-50 50L0 50z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")` }} />
               <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="space-y-4">
                     <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                           <ShieldCheck size={28} />
                        </div>
                        <span className="text-[12px] font-black uppercase tracking-[0.3em] opacity-80">Executive Portal</span>
                     </div>
                     <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">Global Directorship</h1>
                     <p className="text-[16px] font-bold opacity-80 max-w-xl">Reviewing the strategic trajectory of Taleem-ul-Quran's international presence.</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="flex -space-x-4">
                        <div className="w-16 h-16 rounded-full border-4 border-primary bg-slate-800 flex items-center justify-center text-xl font-black">D1</div>
                        <div className="w-16 h-16 rounded-full border-4 border-primary bg-slate-700 flex items-center justify-center text-xl font-black">D2</div>
                     </div>
                     <div className="text-right">
                        <div className="text-[14px] font-black uppercase tracking-tight">Active Board</div>
                        <div className="text-[12px] font-bold opacity-60">Both Directors Online</div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Strategic Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {executiveMetrics.map((m, i) => (
                <div key={i} className="bg-card border border-border p-8 rounded-[40px] shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all group">
                   <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center transition-transform group-hover:scale-110">
                         <m.icon size={24} />
                      </div>
                      <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full uppercase tracking-widest">{m.trend}</span>
                   </div>
                   <div className="text-4xl font-black text-foreground tabular-nums">{m.val}</div>
                   <div className="text-[11px] font-black text-muted-foreground uppercase tracking-widest mt-1">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
               
               {/* Regional Market Share Audit */}
               <div className="lg:col-span-2 bg-card border border-border rounded-[48px] p-10 shadow-2xl shadow-primary/5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-12">
                     <h3 className="text-2xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
                        <BarChart2 size={24} className="text-primary" /> Multi-Region Health
                     </h3>
                     <button onClick={() => window.print()} className="text-[12px] font-black text-primary uppercase tracking-widest hover:underline">Download Audit</button>
                  </div>

                  <div className="space-y-10">
                     {regionalGrowth.map((rg, i) => (
                        <div key={i} className="space-y-4">
                           <div className="flex justify-between items-end">
                              <div>
                                 <div className="text-[12px] font-black text-muted-foreground uppercase tracking-widest">{rg.region}</div>
                                 <div className="text-2xl font-black text-foreground mt-1">{rg.students} Active Learners</div>
                              </div>
                              <div className="text-right">
                                 <div className="text-[11px] font-black text-emerald-500 uppercase tracking-widest mb-1">{rg.growth} Year-on-Year</div>
                                 <div className="text-3xl font-black text-primary">{rg.share}%</div>
                              </div>
                           </div>
                           <div className="h-4 w-full bg-muted rounded-full overflow-hidden border border-border">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${rg.share}%` }} className="h-full bg-primary" />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Executive Board Insights */}
               <div className="space-y-10">
                  <div className="bg-card border border-border rounded-[40px] p-8 shadow-2xl shadow-primary/5 space-y-8">
                     <div className="flex items-center justify-between">
                        <h3 className="text-[15px] font-black text-foreground uppercase tracking-tight">System Reliability</h3>
                        <Activity size={20} className="text-emerald-500" />
                     </div>
                     
                     <div className="space-y-6">
                        <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl">
                           <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Attendance Health</div>
                           <div className="text-2xl font-black text-foreground mt-1">99.4% Verified</div>
                        </div>
                        <div className="p-6 bg-primary/5 border border-primary/10 rounded-3xl">
                           <div className="text-[10px] font-black text-primary uppercase tracking-widest">Teacher Grading</div>
                           <div className="text-2xl font-black text-foreground mt-1">84% Grade A</div>
                        </div>
                     </div>

                     <div className="pt-4">
                        <button onClick={() => window.print()} className="w-full h-14 bg-card border-2 border-primary text-primary rounded-2xl text-[12px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-3">
                           <PieChart size={18} /> Global Strategy Report
                        </button>
                     </div>
                  </div>

                  {/* Director Intelligence Briefing */}
                  <div className="bg-secondary p-8 rounded-[40px] text-white space-y-4 shadow-2xl shadow-primary/20">
                     <div className="flex items-center gap-3">
                        <Star size={24} className="animate-pulse" />
                        <h4 className="text-[15px] font-black uppercase tracking-tight">Directorship Briefing</h4>
                     </div>
                     <p className="text-[12px] font-bold opacity-80 leading-relaxed">
                        Notice: The US region is showing a 4% increase in student cancellations this week. A strategic meeting with the **USA Shift Manager** and the **Global Manager** is recommended.
                     </p>
                     <button onClick={() => alert("Sync requested with HR & Shift Manager")} className="h-10 px-6 bg-white text-primary rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-white/90 transition-all mt-4">
                        Schedule Sync
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
