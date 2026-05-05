"use client";

import React, { useState } from "react";
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Video, 
  UserPlus, 
  Save, 
  Search, 
  Bell, 
  Clock,
  LayoutDashboard,
  CalendarDays,
  Users,
  AlertCircle
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function WeeklySchedule() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const days = [
    { day: "Mon", date: "23", slots: [
      { time: "09:00 AM", title: "Hifz Revision", teacher: "Ustadh Bilal" },
      { time: "11:30 AM", title: "Tajweed Basics", teacher: "Sheikh Omar" }
    ]},
    { day: "Tue", date: "24", isToday: true, slots: [
      { time: "10:00 AM", title: "Demo: Qira'at", teacher: "Pending Assignment", isPrimary: true },
      { time: "02:00 PM", title: "Advanced Hifz", teacher: "Ustadh Bilal" },
      { time: "04:30 PM", title: "Islamic Studies", teacher: "Aisha Rahman" }
    ]},
    { day: "Wed", date: "25", slots: [
      { time: "09:00 AM", title: "Hifz Revision", teacher: "Ustadh Bilal" }
    ]},
    { day: "Thu", date: "26", slots: [
      { time: "10:00 AM", title: "Demo: Hifz", teacher: "Unassigned", isPrimary: true },
      { time: "01:00 PM", title: "Tajweed Int.", teacher: "Sheikh Omar" }
    ]},
    { day: "Fri", date: "27", slots: [
      { time: "09:00 AM", title: "Friday Special", teacher: "All Teachers" }
    ]},
    { day: "Sat", date: "28", isEmpty: true },
    { day: "Sun", date: "29", isEmpty: true },
  ];

  const demoRequests = [
    { name: "Zayd Ibrahim", course: "Tajweed Fundamentals", requestedTime: "Tomorrow, 10:00 AM" },
    { name: "Sara Ahmed", course: "Hifz Memorization", requestedTime: "Oct 26, 02:00 PM" },
    { name: "Tariq Mansoor", course: "Qira'at Specialization", requestedTime: "Flexible (Anytime)" },
  ];

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans text-[#111827]">
      {/* Sidebar */}
      <Sidebar role="scheduler" className="hidden md:flex w-64 shrink-0" />

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        <Navbar 
          title="Scheduler Control" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Ahmed Khan"
          userRole="Operations Lead"
        />

        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 bg-slate-50/30">
          <div className="flex flex-col xl:flex-row gap-6 h-full min-h-0">
            
            {/* Left: Calendar Panel */}
            <div className="flex-[2.2] flex flex-col min-w-0 min-h-0">
              <div className="bg-card border border-border rounded-xl shadow-sm flex flex-col h-full overflow-hidden">
                <div className="p-5 border-b border-border flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      <Calendar size={18} />
                    </div>
                    <h2 className="text-[16px] font-bold text-foreground">Weekly Schedule</h2>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 bg-white border border-border rounded-lg p-1 shadow-sm">
                      <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-50 text-muted-foreground transition-all">
                        <ChevronLeft size={16} />
                      </button>
                      <span className="text-[13px] font-bold text-foreground px-2">Oct 23 - Oct 29, 2024</span>
                      <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-50 text-muted-foreground transition-all">
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-x-auto p-5">
                  <div className="grid grid-cols-7 gap-4 h-full min-w-[900px]">
                    {days.map((d, i) => (
                      <div key={i} className="flex flex-col gap-3 min-h-0">
                        <div className={cn(
                          "text-center pb-3 border-b-2 text-[12px] font-bold uppercase tracking-widest transition-all",
                          d.isToday ? "border-primary text-primary" : "border-slate-100 text-muted-foreground"
                        )}>
                          {d.day} {d.date}
                        </div>
                        <div className="flex-1 flex flex-col gap-3 overflow-y-auto custom-scrollbar pr-1">
                          {d.isEmpty ? (
                            <div className="flex-1 border-2 border-dashed border-slate-100 rounded-xl flex items-center justify-center text-[11px] font-bold text-muted-foreground/50 uppercase tracking-widest min-h-[120px]">
                              No Classes
                            </div>
                          ) : (
                            d.slots?.map((slot, si) => (
                              <div key={si} className={cn(
                                "p-3 rounded-r-lg border-l-4 shadow-sm transition-all hover:translate-x-1",
                                slot.isPrimary 
                                  ? "bg-primary/5 border-primary" 
                                  : "bg-slate-50 border-slate-300"
                              )}>
                                <div className={cn(
                                  "text-[10px] font-bold uppercase tracking-widest",
                                  slot.isPrimary ? "text-primary" : "text-muted-foreground"
                                )}>
                                  {slot.time}
                                </div>
                                <div className="text-[13px] font-bold text-foreground mt-1 leading-tight">{slot.title}</div>
                                <div className="text-[11px] font-bold text-muted-foreground/60 mt-1.5">{slot.teacher}</div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="flex-1 flex flex-col gap-6 min-w-0">
              {/* Demo Requests */}
              <div className="bg-card border border-border rounded-xl shadow-sm flex flex-col min-h-0 max-h-[600px]">
                <div className="p-5 border-b border-border flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                      <Video size={18} />
                    </div>
                    <h2 className="text-[16px] font-bold text-foreground">Demo Requests</h2>
                  </div>
                  <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 rounded text-[10px] font-bold uppercase tracking-wider">3 Needs Action</span>
                </div>
                
                <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
                  {demoRequests.map((req, i) => (
                    <div key={i} className="p-4 bg-white border border-border rounded-xl shadow-sm hover:border-primary transition-all group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border-2 border-white shadow-sm text-primary font-bold text-[14px]">
                          {req.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-[15px] font-bold text-foreground">{req.name}</div>
                          <div className="text-[12px] font-bold text-muted-foreground mt-0.5">{req.course}</div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Requested Time</div>
                          <div className="text-[12px] font-bold text-foreground mt-1">{req.requestedTime}</div>
                        </div>
                        <button className="h-8 px-4 border border-primary text-primary rounded-lg text-[12px] font-bold hover:bg-primary/5 transition-all">
                          Find Slot
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Container */}
              <div className="bg-card border border-border rounded-xl shadow-sm p-6 space-y-3">
                <button className="w-full h-11 border border-primary text-primary rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 hover:bg-primary/5 transition-all">
                  <UserPlus size={18} /> Assign Class
                </button>
                <button className="w-full h-11 bg-primary text-white rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                  <Save size={18} /> Save Schedule
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
