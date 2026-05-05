"use client";

import React, { useState } from "react";
import { 
  User, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Camera, 
  Upload, 
  Lock, 
  Calendar, 
  ChevronDown, 
  Shield, 
  LogIn, 
  Save,
  MapPin,
  Globe,
  Clock,
  BellRing,
  X,
  CheckCircle
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function StudentProfile() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeEnrolled, setActiveEnrolled] = useState(true);

  const stats = [
    { label: "Lessons", val: "85" },
    { label: "Attd", val: "92%" },
    { label: "Current", val: "Juz 5" },
  ];

  const activities = [
    { type: "login", title: "Successful Login", meta: "Today, 08:30 AM • IP: 192.168.1.45 • Windows / Chrome", icon: LogIn, color: "bg-emerald-500/10 text-emerald-600" },
    { type: "password", title: "Password Changed", meta: "15 Oct 2023, 04:15 PM • IP: 192.168.1.45 • Windows / Chrome", icon: Lock, color: "bg-amber-500/10 text-amber-600" },
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans text-[#111827]">
      {/* Desktop Sidebar */}
      <Sidebar role="student" className="hidden md:flex w-64 shrink-0" />

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-72 h-full animate-in slide-in-from-left duration-300">
            <Sidebar role="student" className="w-full" />
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
          title="My Profile" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Omar Farooq"
          userRole="Hifz Student"
          userAvatar="https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FMiddle%20Eastern%2F1"
          hideSearch
        />

        <main className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 p-6 md:p-8 pb-32">
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            
            {/* Left Sidebar: Profile Summary */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center text-center shadow-sm sticky top-0">
                <div className="relative mb-4 group">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <img 
                      src="https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FMiddle%20Eastern%2F1" 
                      alt="Omar Farooq" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-1 right-1 w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center border-3 border-white shadow-lg hover:scale-110 transition-transform">
                    <Camera size={16} />
                  </button>
                </div>

                <h2 className="text-xl font-bold text-foreground">Omar Farooq</h2>
                <p className="text-sm font-semibold text-primary mb-3">Hifz Student</p>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[12px] font-bold mb-6">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  Active Enrolled
                </div>

                <div className="w-full grid grid-cols-3 gap-2 py-4 border-y border-border mb-6">
                  {stats.map((stat, i) => (
                    <div key={i} className={cn("flex flex-col items-center gap-0.5", i < 2 && "border-r border-border")}>
                      <span className="text-base font-bold text-foreground">{stat.val}</span>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">{stat.label}</span>
                    </div>
                  ))}
                </div>

                <div className="w-full space-y-2 mb-6">
                  <div className="flex justify-between items-center text-[12px] mb-1.5">
                    <span className="font-semibold text-muted-foreground">Profile Completion</span>
                    <span className="font-bold text-primary">85%</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>

                <div className="w-full space-y-3">
                  <button className="w-full h-11 border border-border rounded-xl text-[14px] font-bold text-foreground flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                    <Upload size={16} /> Upload New Photo
                  </button>
                  <button className="w-full h-11 border border-primary text-primary rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors">
                    <Lock size={16} /> Change Password
                  </button>
                </div>
              </div>
            </div>

            {/* Right Area: Profile Forms */}
            <div className="space-y-6">
              
              {/* Personal Information */}
              <section className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 pb-5 mb-6 border-b border-border">
                  <div className="w-9 h-9 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                    <User size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Personal Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-foreground">First Name</label>
                    <div className="h-12 px-4 bg-muted border border-border rounded-xl flex items-center text-[14px] font-semibold text-foreground">Omar</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-foreground">Last Name</label>
                    <div className="h-12 px-4 bg-muted border border-border rounded-xl flex items-center text-[14px] font-semibold text-foreground">Farooq</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-foreground">Date of Birth</label>
                    <div className="h-12 px-4 bg-muted border border-border rounded-xl flex items-center justify-between text-[14px] font-semibold text-foreground">
                      15 Aug 2008
                      <Calendar size={16} className="text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-foreground">Gender</label>
                    <div className="h-12 px-4 bg-muted border border-border rounded-xl flex items-center justify-between text-[14px] font-semibold text-foreground">
                      Male
                      <ChevronDown size={16} className="text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-foreground">Native Language</label>
                    <div className="h-12 px-4 bg-muted border border-border rounded-xl flex items-center justify-between text-[14px] font-semibold text-foreground">
                      Urdu
                      <ChevronDown size={16} className="text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-foreground">Country of Residence</label>
                    <div className="h-12 px-4 bg-muted border border-border rounded-xl flex items-center justify-between text-[14px] font-semibold text-foreground">
                      Pakistan
                      <ChevronDown size={16} className="text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Details */}
              <section className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 pb-5 mb-6 border-b border-border">
                  <div className="w-9 h-9 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                    <Phone size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Contact Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-foreground">Email Address</label>
                    <div className="h-12 px-4 bg-muted border border-border rounded-xl flex items-center text-[14px] font-semibold text-foreground truncate">omar.farooq@example.com</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-foreground">Phone Number</label>
                    <div className="h-12 px-4 bg-muted border border-border rounded-xl flex items-center text-[14px] font-semibold text-foreground">+92 300 1234567</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-foreground">Timezone</label>
                    <div className="h-12 px-4 bg-muted border border-border rounded-xl flex items-center justify-between text-[14px] font-semibold text-foreground">
                      (UTC+05:00) Islamabad, Karachi
                      <ChevronDown size={16} className="text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-foreground">Alternative Phone (Optional)</label>
                    <div className="h-12 px-4 bg-muted border border-border rounded-xl flex items-center text-[14px] font-semibold text-foreground">-</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-foreground">Home Address</label>
                  <div className="min-h-[80px] p-4 bg-muted border border-border rounded-xl text-[14px] font-semibold text-foreground leading-relaxed">
                    House 45, Street 12, Defense Phase 2, Karachi, Pakistan
                  </div>
                </div>
              </section>

              {/* Guardian Information */}
              <section className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 pb-5 mb-6 border-b border-border">
                  <div className="w-9 h-9 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                    <ShieldCheck size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Guardian Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-foreground">Guardian Name</label>
                    <div className="h-12 px-4 bg-muted border border-border rounded-xl flex items-center text-[14px] font-semibold text-foreground">Muhammad Farooq</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-foreground">Relationship</label>
                    <div className="h-12 px-4 bg-muted border border-border rounded-xl flex items-center justify-between text-[14px] font-semibold text-foreground">
                      Father
                      <ChevronDown size={16} className="text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-foreground">Guardian Email</label>
                    <div className="h-12 px-4 bg-muted border border-border rounded-xl flex items-center text-[14px] font-semibold text-foreground truncate">m.farooq@example.com</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-foreground">Guardian Phone</label>
                    <div className="h-12 px-4 bg-muted border border-border rounded-xl flex items-center text-[14px] font-semibold text-foreground">+92 300 9876543</div>
                  </div>
                </div>
              </section>

              {/* Account Security */}
              <section className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 pb-5 mb-6 border-b border-border">
                  <div className="w-9 h-9 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                    <Shield size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Account Security</h3>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-foreground">Current Password</label>
                    <div className="flex overflow-hidden border border-border rounded-xl">
                      <div className="flex-1 h-12 px-4 bg-muted flex items-center text-[14px] font-semibold text-muted-foreground">••••••••••••</div>
                      <button className="h-12 px-6 border-l border-border font-bold text-[13px] hover:bg-slate-50 transition-colors shrink-0">Update Password</button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[15px] font-bold text-foreground">Recent Activity</h4>
                    <div className="space-y-4">
                      {activities.map((act, i) => (
                        <div key={i} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                          <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", act.color)}>
                            <act.icon size={18} />
                          </div>
                          <div className="space-y-0.5">
                            <div className="text-[14px] font-bold text-foreground">{act.title}</div>
                            <div className="text-[12px] font-medium text-muted-foreground leading-relaxed">{act.meta}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </main>

        {/* Bottom Sticky Action Bar */}
        <div className="fixed bottom-0 left-0 md:left-64 right-0 h-24 bg-card border-t border-border flex items-center justify-end px-8 gap-4 shadow-[0_-4px_16px_rgba(0,0,0,0.03)] z-40">
          <button className="h-12 px-6 rounded-xl font-bold text-[14px] text-foreground hover:bg-slate-50 transition-colors">
            Discard Changes
          </button>
          <button className="h-12 px-8 bg-primary text-white rounded-xl font-bold text-[14px] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20">
            <Save size={18} /> Save Profile Details
          </button>
        </div>

      </div>
    </div>
  );
}
