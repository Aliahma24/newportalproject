"use client";

import React, { useState } from "react";
import {
  Settings,
  Bell,
  Clock,
  Globe,
  Shield,
  Save,
  RefreshCw,
  ToggleLeft,
  ToggleRight,
  CalendarDays,
  Video,
  Mail,
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function SchedulerPreferences() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Toggle states
  const [demoNotif, setDemoNotif] = useState(true);
  const [emailDigest, setEmailDigest] = useState(true);
  const [autoAssign, setAutoAssign] = useState(false);
  const [conflictAlert, setConflictAlert] = useState(true);
  const [weekendLock, setWeekendLock] = useState(true);

  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <button onClick={onToggle} className={cn("w-11 h-6 rounded-full transition-all relative shrink-0", on ? "bg-primary" : "bg-slate-200")}>
      <div className={cn("w-4 h-4 bg-white rounded-full absolute top-1 transition-all shadow-sm", on ? "left-6" : "left-1")} />
    </button>
  );

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans text-[#111827]">
      <Sidebar role="scheduler" className="hidden md:flex w-64 shrink-0" />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar
          title="Preferences"
          onMenuClick={() => setSidebarOpen(true)}
          userName="Ahmed Khan"
          userRole="Scheduler Lead"
        />

        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 bg-slate-50/30">
          <div className="max-w-4xl mx-auto space-y-6">

            {/* Scheduling Settings */}
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-border bg-slate-50/50 flex items-center gap-3">
                <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <CalendarDays size={18} />
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-foreground">Scheduling Settings</h2>
                  <p className="text-[12px] text-muted-foreground font-medium">Configure how classes are scheduled and managed</p>
                </div>
              </div>
              <div className="divide-y divide-border">
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <div className="text-[14px] font-bold text-foreground">Auto-Assign Teachers</div>
                    <div className="text-[12px] text-muted-foreground font-medium mt-0.5">Automatically match available teachers to demo requests</div>
                  </div>
                  <Toggle on={autoAssign} onToggle={() => setAutoAssign(!autoAssign)} />
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <div className="text-[14px] font-bold text-foreground">Lock Weekends</div>
                    <div className="text-[12px] text-muted-foreground font-medium mt-0.5">Prevent scheduling of classes on Saturday & Sunday</div>
                  </div>
                  <Toggle on={weekendLock} onToggle={() => setWeekendLock(!weekendLock)} />
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <div className="text-[14px] font-bold text-foreground">Conflict Alerts</div>
                    <div className="text-[12px] text-muted-foreground font-medium mt-0.5">Warn when a teacher is being double-booked</div>
                  </div>
                  <Toggle on={conflictAlert} onToggle={() => setConflictAlert(!conflictAlert)} />
                </div>
                <div className="p-5 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[14px] font-bold text-foreground">Default Session Duration</div>
                    <div className="text-[12px] text-muted-foreground font-medium mt-0.5">Used when creating a new class slot</div>
                  </div>
                  <select className="h-9 px-3 pr-8 bg-slate-50 border border-border rounded-lg text-[13px] font-bold text-foreground outline-none cursor-pointer focus:border-primary transition-all appearance-none">
                    <option>30 minutes</option>
                    <option selected>45 minutes</option>
                    <option>60 minutes</option>
                    <option>90 minutes</option>
                  </select>
                </div>
                <div className="p-5 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[14px] font-bold text-foreground">Time Zone</div>
                    <div className="text-[12px] text-muted-foreground font-medium mt-0.5">All class times are displayed in this timezone</div>
                  </div>
                  <select className="h-9 px-3 pr-8 bg-slate-50 border border-border rounded-lg text-[13px] font-bold text-foreground outline-none cursor-pointer focus:border-primary transition-all appearance-none">
                    <option>PKT — Pakistan Standard Time (UTC+5)</option>
                    <option>GST — Gulf Standard Time (UTC+4)</option>
                    <option>UTC — Coordinated Universal Time</option>
                    <option>EST — Eastern Standard Time (UTC-5)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-border bg-slate-50/50 flex items-center gap-3">
                <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                  <Bell size={18} />
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-foreground">Notifications</h2>
                  <p className="text-[12px] text-muted-foreground font-medium">Choose what alerts and digests you receive</p>
                </div>
              </div>
              <div className="divide-y divide-border">
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <div className="text-[14px] font-bold text-foreground">New Demo Requests</div>
                    <div className="text-[12px] text-muted-foreground font-medium mt-0.5">Get notified immediately when a new demo is submitted</div>
                  </div>
                  <Toggle on={demoNotif} onToggle={() => setDemoNotif(!demoNotif)} />
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <div className="text-[14px] font-bold text-foreground">Daily Email Digest</div>
                    <div className="text-[12px] text-muted-foreground font-medium mt-0.5">Receive a summary of pending tasks each morning</div>
                  </div>
                  <Toggle on={emailDigest} onToggle={() => setEmailDigest(!emailDigest)} />
                </div>
                <div className="p-5 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[14px] font-bold text-foreground">Digest Send Time</div>
                    <div className="text-[12px] text-muted-foreground font-medium mt-0.5">Time of day the daily summary is delivered</div>
                  </div>
                  <input
                    type="time"
                    defaultValue="08:00"
                    className="h-9 px-3 bg-slate-50 border border-border rounded-lg text-[13px] font-bold text-foreground outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Save / Reset */}
            <div className="bg-card border border-border rounded-xl shadow-sm p-5 flex items-center justify-between">
              <p className="text-[13px] font-medium text-muted-foreground">Changes are saved to your account and apply immediately.</p>
              <div className="flex gap-3">
                <button className="h-10 px-5 border border-border text-muted-foreground rounded-xl text-[13px] font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
                  <RefreshCw size={15} /> Reset Defaults
                </button>
                <button className="h-10 px-5 bg-primary text-white rounded-xl text-[13px] font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                  <Save size={15} /> Save Settings
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
}
