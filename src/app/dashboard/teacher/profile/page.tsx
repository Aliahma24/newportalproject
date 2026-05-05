"use client";

import React, { useState } from "react";
import { 
  Camera, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck,
  Save,
  Lock,
  Globe,
  X
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function TeacherProfile() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const teacherData = {
    name: "Ustadha Aisha",
    role: "Senior Quran Teacher",
    email: "aisha.quran@taleem.com",
    phone: "+92 300 9876543",
    location: "Islamabad, Pakistan",
    experience: "12 Years",
    specialization: "Hifz & Tajweed Rules",
    qualification: "Shahadat-ul-Almiya (Masters in Islamic Studies)",
    bio: "Dedicated and passionate educator with over a decade of experience in teaching the Holy Quran with correct Tajweed rules. Specialized in working with children and young adults to build a strong foundation in Islamic studies.",
    avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F5",
    cover: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1000&auto=format&fit=crop"
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <Sidebar role="teacher" className="hidden md:flex w-64 shrink-0" />

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-72 h-full animate-in slide-in-from-left duration-300">
            <Sidebar role="teacher" className="w-full" />
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
          userName={teacherData.name}
          userRole="Senior Teacher"
          userAvatar={teacherData.avatar}
          hideSearch
        />

        <main className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 pb-12">
          
          {/* Cover & Avatar Header */}
          <div className="relative h-48 md:h-64 shrink-0">
            <img src={teacherData.cover} className="w-full h-full object-cover" alt="Cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute -bottom-16 left-8 md:left-12 flex items-end gap-6">
              <div className="relative group">
                <img src={teacherData.avatar} className="w-32 h-32 md:w-40 md:h-40 rounded-3xl border-4 border-card object-cover shadow-xl bg-muted" alt={teacherData.name} />
                <button className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-3xl text-white">
                  <Camera size={24} />
                </button>
              </div>
              <div className="pb-4 mb-16 md:mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">{teacherData.name}</h1>
                <p className="text-white/80 font-semibold text-sm md:text-base flex items-center gap-2">
                  <ShieldCheck size={18} className="text-emerald-400" />
                  {teacherData.role}
                </p>
              </div>
            </div>
            <button className="absolute bottom-6 right-8 md:right-12 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-5 h-10 rounded-xl font-bold text-sm flex items-center gap-2 border border-white/30 transition-all">
              <Camera size={18} />
              Edit Cover
            </button>
          </div>

          {/* Profile Content Grid */}
          <div className="mt-20 px-8 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Info Cards */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Personal Info */}
              <div className="bg-card border border-border rounded-2xl shadow-sm p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-foreground">Personal Information</h3>
                  <button className="text-sm font-bold text-primary hover:underline transition-all">Edit Details</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <Mail size={12} /> Email Address
                    </label>
                    <p className="text-[15px] font-bold text-foreground">{teacherData.email}</p>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <Phone size={12} /> Phone Number
                    </label>
                    <p className="text-[15px] font-bold text-foreground">{teacherData.phone}</p>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <MapPin size={12} /> Location
                    </label>
                    <p className="text-[15px] font-bold text-foreground">{teacherData.location}</p>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <Globe size={12} /> Language
                    </label>
                    <p className="text-[15px] font-bold text-foreground">Urdu, English, Arabic</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-dashed border-border">
                  <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Biography</label>
                  <p className="text-[14px] leading-relaxed font-medium text-muted-foreground">
                    {teacherData.bio}
                  </p>
                </div>
              </div>

              {/* Professional Details */}
              <div className="bg-card border border-border rounded-2xl shadow-sm p-8 space-y-8">
                <h3 className="text-lg font-bold text-foreground">Professional Profile</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-border">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Briefcase size={22} />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Teaching Experience</span>
                      <p className="text-[16px] font-bold text-foreground">{teacherData.experience}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-border">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                      <GraduationCap size={22} />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Highest Qualification</span>
                      <p className="text-[14px] font-bold text-foreground leading-tight">{teacherData.qualification}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Key Specializations</label>
                  <div className="flex flex-wrap gap-2">
                    {["Tajweed-ul-Quran", "Hifz Management", "Arabic Grammar", "Islamic Jurisprudence", "Child Pedagogy"].map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-muted rounded-lg text-[13px] font-bold text-foreground border border-border">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Sidebar Actions */}
            <div className="space-y-8">
              
              {/* Account Security */}
              <div className="bg-card border border-border rounded-2xl shadow-sm p-8 space-y-6">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Lock size={20} className="text-primary" />
                  Security Settings
                </h3>
                
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-4 rounded-xl border border-border hover:bg-slate-50 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                        <Lock size={16} />
                      </div>
                      <span className="text-sm font-bold text-foreground">Change Password</span>
                    </div>
                    <span className="text-muted-foreground text-xl">→</span>
                  </button>

                  <button className="w-full flex items-center justify-between p-4 rounded-xl border border-border hover:bg-slate-50 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                        <ShieldCheck size={16} />
                      </div>
                      <span className="text-sm font-bold text-foreground">Two-Factor Auth</span>
                    </div>
                    <span className="text-emerald-500 font-bold text-[10px] uppercase tracking-widest">Enabled</span>
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 space-y-6">
                <h3 className="text-lg font-bold text-primary">Teacher Actions</h3>
                <div className="space-y-3">
                  <button className="w-full h-11 bg-primary text-primary-foreground rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all">
                    <Save size={18} />
                    Save All Changes
                  </button>
                  <button className="w-full h-11 bg-white border border-border text-foreground rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                    Download CV / Bio
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
