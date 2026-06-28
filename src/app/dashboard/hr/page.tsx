"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getHrDashboardData, processLeaveRequest } from "@/app/actions/hr";
import { 
  Users, BookOpen, CalendarOff, Briefcase, TrendingUp, 
  BarChart2, CalendarClock, Calendar, Check, X,
  DollarSign, GraduationCap, ShieldCheck, Search,
  Filter, MoreHorizontal, ArrowUpRight, Clock,
  AlertCircle, CheckCircle2, UserPlus, Eye
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function HRDashboard() {
  const { data: session } = useSession();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Resolution Desk");
  const [dashboardData, setDashboardData] = useState<any>(null);

  const fetchData = async () => {
    const data = await getHrDashboardData();
    setDashboardData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleProcess = async (id: string, status: "APPROVED" | "REJECTED") => {
    await processLeaveRequest(id, status);
    fetchData();
  };

  const metrics = dashboardData ? [
    { label: "Total Staff", val: dashboardData.stats.totalStaff.toString(), trend: "+Active", icon: Users, color: "text-primary" },
    { label: "In Training", val: "0", trend: "Normal", icon: GraduationCap, color: "text-amber-500" },
    { label: "On Payroll", val: dashboardData.stats.totalStaff.toString(), trend: "Stable", icon: DollarSign, color: "text-emerald-500" },
    { label: "Pending Requests", val: dashboardData.stats.pendingRequests.toString(), trend: "Action Req", icon: CalendarOff, color: "text-destructive" },
  ] : [];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="hr" className="hidden md:flex w-64 shrink-0" />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        <Navbar 
          title="HR Operations Center" 
          onMenuClick={() => setSidebarOpen(true)}
          userName={session?.user?.name || "Yusuf Ahmed"}
          userRole="HR Director"
        />

        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 bg-muted/30">
          <div className="max-w-[1600px] mx-auto space-y-10">
            
            {/* Executive Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((m, i) => (
                <div key={i} className="bg-card border border-border p-6 rounded-[32px] shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group">
                   <div className="flex items-center justify-between mb-4">
                      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center bg-muted transition-transform group-hover:scale-110", m.color)}>
                         <m.icon size={24} />
                      </div>
                      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest bg-muted/50 px-2 py-1 rounded-md">{m.trend}</span>
                   </div>
                   <div className="text-3xl font-black text-foreground">{m.val}</div>
                   <div className="text-[11px] font-black text-muted-foreground uppercase tracking-widest mt-1">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
               
               {/* Resolution Desk */}
               <div className="xl:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                     <h2 className="text-xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
                        <CalendarClock size={20} className="text-primary" /> Request Decision Hub
                     </h2>
                     <div className="flex items-center gap-2">
                        <button className="h-10 px-4 bg-card border border-border rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-muted transition-all">
                           <Filter size={14} /> Filter
                        </button>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {dashboardData?.leaveRequests?.map((req: any, i: number) => {
                        const isCritical = req.reason.includes("Critical");
                        const isUrgent = req.reason.includes("Urgent");
                        return (
                          <div key={i} className={cn("bg-card border border-border rounded-[32px] p-6 space-y-5 hover:border-primary transition-all relative overflow-hidden group", req.status !== "PENDING" && "opacity-50")}>
                             <div className={cn(
                               "absolute top-0 right-0 w-1 h-full",
                               isCritical ? "bg-destructive" : isUrgent ? "bg-amber-500" : "bg-primary"
                             )} />
                             <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{req.status}</span>
                                <span className={cn(
                                  "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                  isCritical ? "bg-destructive/10 border-destructive/20 text-destructive" :
                                  isUrgent ? "bg-amber-500/10 border-amber-500/20 text-amber-500" : "bg-primary/10 border-primary/20 text-primary"
                                )}>{isCritical ? "Critical" : isUrgent ? "Urgent" : "Normal"}</span>
                             </div>
                             <div>
                                <h4 className="text-[15px] font-black text-foreground uppercase tracking-tight">{req.leaveType}</h4>
                                <p className="text-[12px] font-bold text-muted-foreground mt-1">Request by: {req.user?.name}</p>
                             </div>
                             <div className="p-4 bg-muted/50 rounded-2xl text-[13px] font-medium text-foreground leading-relaxed italic">
                                "{req.reason}"
                             </div>
                             {req.status === "PENDING" && (
                               <div className="flex gap-3">
                                  <button onClick={() => handleProcess(req.id, "REJECTED")} className="flex-1 h-10 border border-border rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-destructive hover:text-white transition-all">Reject</button>
                                  <button onClick={() => handleProcess(req.id, "APPROVED")} className="flex-1 h-10 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">Approve</button>
                               </div>
                             )}
                          </div>
                        );
                     })}
                     <div className="bg-primary/5 border-2 border-dashed border-primary/20 rounded-[32px] flex flex-col items-center justify-center p-8 text-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                           <ShieldCheck size={32} />
                        </div>
                        <div>
                           <p className="text-[14px] font-black text-foreground uppercase">Compliance Audit</p>
                           <p className="text-[11px] font-bold text-muted-foreground mt-1">All decisions are logged & non-reversible</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Recruiter Sidebar Summary */}
               <div className="space-y-8">
                  <div className="bg-card border border-border rounded-[40px] p-8 shadow-2xl shadow-primary/5 space-y-8">
                     <h3 className="text-[15px] font-black text-foreground uppercase tracking-tight">Staffing Pulse</h3>
                     
                     <div className="space-y-6">
                        <div className="space-y-2">
                           <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                              <span className="text-muted-foreground">Training Progress</span>
                              <span className="text-primary">8 Staff Members</span>
                           </div>
                           <div className="h-2 w-full bg-muted rounded-full overflow-hidden border border-border">
                              <div className="h-full bg-primary w-[40%]" />
                           </div>
                           <p className="text-[9px] font-bold text-muted-foreground italic">Avg. Training Duration: 2.4 Weeks</p>
                        </div>

                        <div className="space-y-2">
                           <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                              <span className="text-muted-foreground">Payroll Capacity</span>
                              <span className="text-emerald-500">34 Active</span>
                           </div>
                           <div className="h-2 w-full bg-muted rounded-full overflow-hidden border border-border">
                              <div className="h-full bg-emerald-500 w-[85%]" />
                           </div>
                           <p className="text-[9px] font-bold text-muted-foreground italic">Efficiency Rate: High</p>
                        </div>
                     </div>

                     <button className="w-full h-14 bg-secondary text-white rounded-2xl text-[12px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:opacity-90 transition-all">
                        <UserPlus size={18} /> New Recruitment
                     </button>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-[32px] p-6 flex gap-4">
                     <AlertCircle size={24} className="text-primary shrink-0" />
                     <p className="text-[11px] font-bold text-muted-foreground leading-relaxed">
                        **HR Alert**: 3 Teachers are approaching the end of their probationary period. Audit their classroom attendance to finalize payroll status.
                     </p>
                  </div>
               </div>

               {/* Master Staff Directory Table */}
               <div className="xl:col-span-3 bg-card border border-border rounded-[48px] overflow-hidden shadow-2xl shadow-primary/5">
                  <div className="p-8 border-b border-border bg-muted/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
                     <div>
                        <h3 className="text-xl font-black text-foreground uppercase tracking-tight">Master Staff Directory</h3>
                        <p className="text-[13px] font-bold text-muted-foreground">Audit recruitment lifecycle and financial data.</p>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="relative">
                           <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                           <input type="text" placeholder="Search by name or role..." className="h-12 w-64 bg-background border border-border rounded-xl pl-12 pr-4 text-[13px] font-bold outline-none focus:border-primary transition-all" />
                        </div>
                     </div>
                  </div>
                  <div className="overflow-x-auto">
                     <table className="w-full text-left border-collapse">
                        <thead>
                           <tr className="bg-muted/30">
                              <th className="p-6 text-[11px] font-black text-muted-foreground uppercase tracking-widest border-b border-border">Recruiter Details</th>
                              <th className="p-6 text-[11px] font-black text-muted-foreground uppercase tracking-widest border-b border-border">Status</th>
                              <th className="p-6 text-[11px] font-black text-muted-foreground uppercase tracking-widest border-b border-border text-center">Dates (Join/Payroll)</th>
                              <th className="p-6 text-[11px] font-black text-muted-foreground uppercase tracking-widest border-b border-border text-center">Training</th>
                              <th className="p-6 text-[11px] font-black text-muted-foreground uppercase tracking-widest border-b border-border text-right">Salary (PKR)</th>
                              <th className="p-6 text-[11px] font-black text-muted-foreground uppercase tracking-widest border-b border-border text-center">Actions</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                           {dashboardData?.staffDirectory?.map((staff: any, i: number) => (
                              <tr key={i} className="hover:bg-muted/5 transition-colors group">
                                 <td className="p-6">
                                    <div className="flex items-center gap-4">
                                       <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black">{staff.name[0]}</div>
                                       <div>
                                          <div className="text-[14px] font-black text-foreground">{staff.name}</div>
                                          <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-tight">{staff.role}</div>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="p-6">
                                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border bg-emerald-500/10 border-emerald-500/20 text-emerald-600">On Payroll</span>
                                 </td>
                                 <td className="p-6 text-center">
                                    <div className="text-[13px] font-bold text-foreground">{new Date(staff.createdAt).toLocaleDateString()}</div>
                                 </td>
                                 <td className="p-6 text-center">
                                    <div className="inline-flex items-center gap-2 text-[12px] font-black text-primary bg-primary/5 px-3 py-1 rounded-lg">
                                       <Clock size={14} /> Completed
                                    </div>
                                 </td>
                                 <td className="p-6 text-right font-black text-[15px] text-foreground tabular-nums">
                                    Standard
                                 </td>
                                 <td className="p-6">
                                    <div className="flex items-center justify-center gap-2">
                                       <button className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-primary transition-all shadow-sm">
                                          <Eye size={16} />
                                       </button>
                                       <button className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-primary transition-all shadow-sm">
                                          <MoreHorizontal size={16} />
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

          </div>
        </main>
      </div>
    </div>
  );
}
