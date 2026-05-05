"use client";

import React, { useState } from "react";
import { 
  Clock, 
  UserCheck, 
  AlertTriangle, 
  Package, 
  Bell, 
  Save, 
  ChevronDown,
  X
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Reusable Toggle Switch Component
function ToggleSwitch({ isActive, onToggle }: { isActive: boolean; onToggle?: () => void }) {
  return (
    <div 
      className={cn(
        "w-11 h-6 rounded-full relative cursor-pointer shrink-0 transition-colors duration-200",
        isActive ? "bg-primary" : "bg-border"
      )}
      onClick={onToggle}
    >
      <div 
        className={cn(
          "w-[18px] h-[18px] rounded-full bg-card absolute top-[3px] shadow-sm transition-transform duration-200",
          isActive ? "translate-x-[23px]" : "translate-x-[3px]"
        )}
      />
    </div>
  );
}

export default function SystemConfiguration() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // State for toggles (mocking functionality)
  const [toggles, setToggles] = useState({
    autoAbsent: true,
    strictAttendance: true,
    latePenalty: true,
    absentPenalty: true,
    weekdayPackage: true,
    weekendPackage: true,
    emailNotif: true,
    whatsappNotif: true,
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <Sidebar role="admin" className="hidden md:flex w-64 shrink-0" />

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-72 h-full animate-in slide-in-from-left duration-300">
            <Sidebar role="admin" className="w-full" />
            <button 
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        <Navbar 
          title="System Configuration" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Admin User"
          userRole="Super Administrator"
          userAvatar="https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FMiddle%20Eastern%2F9"
          searchPlaceholder="Search settings..."
        />

        <main className="flex-1 overflow-y-auto custom-scrollbar relative">
          <div className="p-6 md:p-8 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            
            {/* Card 1: Class Timing Settings */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-6">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <div className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Clock size={20} />
                </div>
                <h3 className="text-base font-bold text-foreground">Class Timing Settings</h3>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-semibold text-muted-foreground">Time Slot Duration</label>
                  <div className="relative">
                    <select className="w-full h-10 px-3.5 pr-10 bg-input border border-transparent rounded-md text-sm font-medium text-foreground appearance-none outline-none focus:border-primary focus:bg-card transition-colors cursor-pointer">
                      <option>30 Minutes</option>
                      <option defaultValue="45 Minutes">45 Minutes</option>
                      <option>60 Minutes</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex flex-col gap-2 flex-1">
                    <label className="text-[13px] font-semibold text-muted-foreground">Global Start Time</label>
                    <input type="time" defaultValue="08:00" className="w-full h-10 px-3.5 bg-input border border-transparent rounded-md text-sm font-medium text-foreground outline-none focus:border-primary focus:bg-card transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label className="text-[13px] font-semibold text-muted-foreground">Global End Time</label>
                    <input type="time" defaultValue="22:00" className="w-full h-10 px-3.5 bg-input border border-transparent rounded-md text-sm font-medium text-foreground outline-none focus:border-primary focus:bg-card transition-colors" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Attendance Rules */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-6">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <div className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <UserCheck size={20} />
                </div>
                <h3 className="text-base font-bold text-foreground">Attendance Rules</h3>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-foreground">Late Threshold</span>
                    <span className="text-xs font-medium text-muted-foreground leading-snug">Minutes before marking a student as late</span>
                  </div>
                  <div className="w-[120px] shrink-0 flex items-center bg-input border border-transparent focus-within:border-primary focus-within:bg-card rounded-md overflow-hidden h-10 transition-colors">
                    <input type="number" defaultValue="5" className="w-full h-full bg-transparent border-none outline-none px-3.5 text-sm font-medium text-foreground" />
                    <div className="px-3.5 text-[13px] font-semibold text-muted-foreground bg-black/5 h-full flex items-center border-l border-border">min</div>
                  </div>
                </div>
                <div className="h-px w-full bg-border" />
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-foreground">Auto-Absent</span>
                    <span className="text-xs font-medium text-muted-foreground leading-snug">Mark absent if no attendance within 15 mins</span>
                  </div>
                  <ToggleSwitch isActive={toggles.autoAbsent} onToggle={() => handleToggle('autoAbsent')} />
                </div>
                <div className="h-px w-full bg-border" />
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-foreground">Strict Attendance</span>
                    <span className="text-xs font-medium text-muted-foreground leading-snug">Require both teacher & student confirmation</span>
                  </div>
                  <ToggleSwitch isActive={toggles.strictAttendance} onToggle={() => handleToggle('strictAttendance')} />
                </div>
              </div>
            </div>

            {/* Card 3: Penalty Rules */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-6">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <div className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <AlertTriangle size={20} />
                </div>
                <h3 className="text-base font-bold text-foreground">Penalty Rules</h3>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold text-foreground">Late Penalty</span>
                      <span className="text-xs font-medium text-muted-foreground leading-snug">Apply point deduction for late joining</span>
                    </div>
                    <ToggleSwitch isActive={toggles.latePenalty} onToggle={() => handleToggle('latePenalty')} />
                  </div>
                  <div className="w-full sm:w-[200px] flex items-center bg-input border border-transparent focus-within:border-primary focus-within:bg-card rounded-md overflow-hidden h-10 transition-colors mt-1">
                    <input type="number" defaultValue="2" className="w-full h-full bg-transparent border-none outline-none px-3.5 text-sm font-medium text-foreground" />
                    <div className="px-3.5 text-[13px] font-semibold text-muted-foreground bg-black/5 h-full flex items-center border-l border-border">points</div>
                  </div>
                </div>
                <div className="h-px w-full bg-border" />
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold text-foreground">Absent Penalty</span>
                      <span className="text-xs font-medium text-muted-foreground leading-snug">Apply point deduction for missing class</span>
                    </div>
                    <ToggleSwitch isActive={toggles.absentPenalty} onToggle={() => handleToggle('absentPenalty')} />
                  </div>
                  <div className="w-full sm:w-[200px] flex items-center bg-input border border-transparent focus-within:border-primary focus-within:bg-card rounded-md overflow-hidden h-10 transition-colors mt-1">
                    <input type="number" defaultValue="5" className="w-full h-full bg-transparent border-none outline-none px-3.5 text-sm font-medium text-foreground" />
                    <div className="px-3.5 text-[13px] font-semibold text-muted-foreground bg-black/5 h-full flex items-center border-l border-border">points</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Package Settings */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-6">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <div className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Package size={20} />
                </div>
                <h3 className="text-base font-bold text-foreground">Package Settings</h3>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-foreground">Weekday Package</span>
                    <span className="text-xs font-medium text-muted-foreground leading-snug">Enable classes from Monday to Thursday</span>
                  </div>
                  <ToggleSwitch isActive={toggles.weekdayPackage} onToggle={() => handleToggle('weekdayPackage')} />
                </div>
                <div className="h-px w-full bg-border" />
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-foreground">Weekend Package</span>
                    <span className="text-xs font-medium text-muted-foreground leading-snug">Enable classes from Saturday to Sunday</span>
                  </div>
                  <ToggleSwitch isActive={toggles.weekendPackage} onToggle={() => handleToggle('weekendPackage')} />
                </div>
              </div>
            </div>

            {/* Card 5: Notification Settings */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-6">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <div className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Bell size={20} />
                </div>
                <h3 className="text-base font-bold text-foreground">Notification Settings</h3>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-foreground">Email Notifications</span>
                    <span className="text-xs font-medium text-muted-foreground leading-snug">Send automated class reminders via email</span>
                  </div>
                  <ToggleSwitch isActive={toggles.emailNotif} onToggle={() => handleToggle('emailNotif')} />
                </div>
                <div className="h-px w-full bg-border" />
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-foreground">WhatsApp Notifications</span>
                    <span className="text-xs font-medium text-muted-foreground leading-snug">Send immediate alerts and reminders via WhatsApp</span>
                  </div>
                  <ToggleSwitch isActive={toggles.whatsappNotif} onToggle={() => handleToggle('whatsappNotif')} />
                </div>
              </div>
            </div>

          </div>

          {/* Sticky Footer */}
          <div className="absolute bottom-0 left-0 right-0 h-[72px] bg-card border-t border-border flex items-center justify-end px-6 md:px-8 gap-4 shadow-[0_-4px_12px_rgba(0,0,0,0.02)] z-10">
            <button className="h-10 px-4 bg-card border border-border text-foreground rounded-md text-sm font-bold hover:bg-muted transition-colors">
              Discard Changes
            </button>
            <button className="h-10 px-6 bg-primary text-primary-foreground rounded-md text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm">
              <Save size={18} />
              Save Configuration
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
