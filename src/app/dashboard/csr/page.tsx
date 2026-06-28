"use client";

import React, { useState, useEffect } from "react";
import { getCsrDashboardData } from "@/app/actions/csr";
import { formatDistanceToNow } from "date-fns";
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Filter, 
  Plus,
  MoreVertical,
  ChevronRight,
  Bell,
  Globe
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function CSRDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCountry, setFilterCountry] = useState("All");
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getCsrDashboardData();
      setDashboardData(data);
    }
    fetchData();
  }, []);

  const demos = dashboardData?.demos || [];
  const stats = dashboardData?.stats || { totalRequests: 0, pendingScheduling: 0, demosToday: 0, conversionRate: 0 };

  const countries = ["All", "Pakistan", "United Kingdom", "United Arab Emirates", "United States", "Canada", "Australia"];

  const filteredDemos = demos.filter((demo: any) => {
    const statusMatch = filterStatus === "All" || demo.status.toLowerCase() === filterStatus.toLowerCase();
    const countryMatch = filterCountry === "All" || demo.country === filterCountry;
    return statusMatch && countryMatch;
  });

  const pendingCount = stats.pendingScheduling;

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="csr" className="hidden md:flex w-64 shrink-0" />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar title="CSR Dashboard" onMenuClick={() => setSidebarOpen(true)} userName="Zoya Ahmed" userRole="CSR" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-muted/30 custom-scrollbar">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Total Requests", value: stats.totalRequests.toString(), icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
              { label: "Pending Scheduling", value: pendingCount.toString(), icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
              { label: "Demos Today", value: stats.demosToday.toString(), icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
              { label: "Conversion Rate", value: `${stats.conversionRate}%`, icon: AlertCircle, color: "text-primary", bg: "bg-primary/10" },
            ].map((stat, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("p-2.5 rounded-xl", stat.bg)}>
                    <stat.icon size={20} className={stat.color} />
                  </div>
                  <span className="text-[12px] font-bold text-muted-foreground">+12%</span>
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-[13px] font-medium text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Action Alert */}
          {pendingCount > 0 && (
            <div className="mb-8 bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Bell size={20} className="animate-bounce" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-primary">Action Required</h4>
                  <p className="text-[12px] text-primary/70 font-medium">You have {pendingCount} demo requests waiting to be scheduled.</p>
                </div>
              </div>
              <Link 
                href="/dashboard/csr/request"
                className="h-9 px-4 bg-primary text-white rounded-lg text-[12px] font-bold flex items-center gap-2 hover:bg-primary/90 transition-all"
              >
                Schedule Now <ChevronRight size={14} />
              </Link>
            </div>
          )}

          {/* Table Controls */}
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="text-[16px] font-bold text-foreground">Demo Requests Queue</h3>
                <Link 
                  href="/dashboard/csr/request"
                  className="h-10 px-4 bg-primary text-white rounded-xl text-[13px] font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <Plus size={18} /> New Request
                </Link>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search student or guardian..."
                    className="w-full h-10 bg-muted/50 border border-border rounded-xl pl-10 pr-4 text-[13px] focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Country Filter */}
                  <div className="relative flex-1 sm:w-48">
                    <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <select 
                      className="w-full h-10 bg-muted/50 border border-border rounded-xl pl-9 pr-8 text-[12px] font-bold text-foreground focus:border-primary outline-none appearance-none cursor-pointer"
                      value={filterCountry}
                      onChange={(e) => setFilterCountry(e.target.value)}
                    >
                      {countries.map(c => (
                        <option key={c} value={c} className="bg-card text-foreground">{c === "All" ? "All Countries" : c}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Status Filter */}
                  <div className="relative flex-1 sm:w-40">
                    <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <select 
                      className="w-full h-10 bg-muted/50 border border-border rounded-xl pl-9 pr-8 text-[12px] font-bold text-foreground focus:border-primary outline-none appearance-none cursor-pointer"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      {["All", "Pending", "Scheduled", "Completed", "Cancelled"].map(s => (
                        <option key={s} value={s} className="bg-card text-foreground">{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/20">
                    <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">ID / Submitted</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Student / Guardian</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Location</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Contact</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredDemos.map((demo: any) => (
                    <tr key={demo.id} className="hover:bg-muted/10 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="text-[13px] font-bold text-foreground truncate w-24" title={demo.id}>{demo.id.split('-')[0]}...</div>
                        <div className="text-[11px] text-muted-foreground mt-0.5">{formatDistanceToNow(new Date(demo.createdAt))} ago</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-[13px] font-bold text-foreground">{demo.studentName}</div>
                        <div className="text-[12px] text-muted-foreground font-medium">{demo.guardianName}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-[12px] font-bold text-foreground">
                          <Globe size={14} className="text-primary" />
                          {demo.country}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[12px] font-medium text-foreground">
                        {demo.phone}
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          demo.status === "PENDING" && "bg-amber-100 text-amber-600",
                          demo.status === "SCHEDULED" && "bg-blue-100 text-blue-600",
                          demo.status === "COMPLETED" && "bg-emerald-100 text-emerald-600",
                          demo.status === "CANCELLED" && "bg-red-100 text-red-600",
                        )}>
                          {demo.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredDemos.length === 0 && (
                <div className="p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <Filter size={24} className="text-muted-foreground" />
                  </div>
                  <h4 className="text-[15px] font-bold text-foreground">No requests found</h4>
                  <p className="text-[13px] text-muted-foreground mt-1">Try adjusting your filters to find what you're looking for.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
