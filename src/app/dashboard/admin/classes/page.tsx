"use client";

import React, { useState } from "react";
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Calendar, 
  Search, 
  ChevronDown, 
  Plus, 
  Edit2, 
  MoreVertical,
  Clock,
  X,
  FileText
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function ClassesCourses() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { label: "Total Courses", value: "12", icon: BookOpen, primary: true },
    { label: "Active Classes", value: "24", icon: GraduationCap },
    { label: "Total Students", value: "1,248", icon: Users },
    { label: "Pending Requests", value: "15", icon: FileText },
  ];

  const classes = [
    {
      id: "CLS-101",
      name: "Hifz Group A",
      course: "Quran Memorization",
      instructor: "Hafiz Usman",
      instructorAvatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FMiddle%20Eastern%2F1",
      schedule: "Mon - Thu, 08:00 AM",
      enrollment: "18/20",
      status: "Active"
    },
    {
      id: "CLS-102",
      name: "Tajweed Basics",
      course: "Tajweed Fundamentals",
      instructor: "Ustadha Aisha",
      instructorAvatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FMiddle%20Eastern%2F4",
      schedule: "Sat - Sun, 10:00 AM",
      enrollment: "15/15",
      status: "Full"
    },
    {
      id: "CLS-103",
      name: "Noorani Qaida - Kids",
      course: "Foundation Course",
      instructor: "Sheikh Umar",
      instructorAvatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FMiddle%20Eastern%2F3",
      schedule: "Mon - Wed, 04:00 PM",
      enrollment: "12/25",
      status: "Active"
    },
    {
      id: "CLS-104",
      name: "Advanced Tajweed",
      course: "Tajweed Fundamentals",
      instructor: "Hafiz Rahman",
      instructorAvatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FMiddle%20Eastern%2F5",
      schedule: "Tue - Fri, 06:00 PM",
      enrollment: "22/30",
      status: "Upcoming"
    },
    {
      id: "CLS-105",
      name: "Islamic Studies 101",
      course: "Islamic Sciences",
      instructor: "Ustadha Fatima",
      instructorAvatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F18-25%2FSouth%20Asian%2F6",
      schedule: "Sunday Only, 11:00 AM",
      enrollment: "45/50",
      status: "Active"
    }
  ];

  const getStatusBadgeClasses = (status: string) => {
    switch(status.toLowerCase()) {
      case 'active': return 'bg-emerald-500/10 text-emerald-500';
      case 'full': return 'bg-amber-500/10 text-amber-500';
      case 'upcoming': return 'bg-blue-500/10 text-blue-500';
      default: return 'bg-muted text-muted-foreground';
    }
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
          title="Classes & Courses" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Admin User"
          userRole="Super Administrator"
          userAvatar="https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FMiddle%20Eastern%2F9"
          searchPlaceholder="Search classes or courses..."
        />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar flex flex-col">
          
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
            <div>
              <h2 className="text-[22px] font-bold text-foreground mb-1">Academic Management</h2>
              <p className="text-sm text-muted-foreground font-medium">Manage all course curriculums, classes, and student enrollments.</p>
            </div>
            <div className="flex gap-3">
              <button className="h-10 px-4 bg-card border border-border text-foreground rounded-md text-sm font-semibold flex items-center gap-2 hover:bg-muted transition-colors">
                <FileText size={16} />
                Manage Courses
              </button>
              <button className="h-10 px-4 bg-primary text-primary-foreground rounded-md text-sm font-semibold flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm">
                <Plus size={16} />
                Create New Class
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
            {stats.map((stat, i) => (
              <div key={i} className="p-4 bg-card border border-border rounded-xl flex items-center gap-4 shadow-sm hover:shadow-md transition-all">
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center shrink-0",
                  stat.primary ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                )}>
                  <stat.icon size={24} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-bold text-foreground leading-none">{stat.value}</span>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Classes Table Card */}
          <div className="flex-1 flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-sm min-h-0">
            
            {/* Toolbar */}
            <div className="p-4 border-b border-border flex flex-col lg:flex-row justify-between gap-4 shrink-0">
              <div className="flex items-center gap-2.5 bg-background px-3.5 h-10 rounded-md border border-border w-full lg:w-[320px] focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
                <Search size={16} className="text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search class or instructor..." 
                  className="bg-transparent border-none outline-none text-[13px] font-medium text-foreground w-full placeholder:text-muted-foreground"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="h-10 px-3 border border-border rounded-md bg-card text-[13px] font-semibold text-foreground flex items-center gap-2 hover:bg-muted transition-colors">
                  All Courses
                  <ChevronDown size={14} className="text-muted-foreground" />
                </button>
                <button className="h-10 px-3 border border-border rounded-md bg-card text-[13px] font-semibold text-foreground flex items-center gap-2 hover:bg-muted transition-colors">
                  Status: Active
                  <ChevronDown size={14} className="text-muted-foreground" />
                </button>
                <button className="h-10 px-3 border border-border rounded-md bg-card text-[13px] font-semibold text-foreground flex items-center gap-2 hover:bg-muted transition-colors">
                  Sort: Newest
                  <ChevronDown size={14} className="text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Table Area */}
            <div className="flex-1 overflow-x-auto custom-scrollbar flex flex-col min-h-0">
              <div className="min-w-[1000px] flex flex-col h-full">
                {/* Table Header */}
                <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1fr_100px] px-6 py-3.5 bg-background border-b border-border text-xs font-bold text-muted-foreground uppercase tracking-wider shrink-0">
                  <div>Class Details</div>
                  <div>Course</div>
                  <div>Instructor</div>
                  <div>Schedule</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>

                {/* Table Body */}
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-card">
                  {classes.map((cls, i) => (
                    <div key={i} className="grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1fr_100px] px-6 py-4 border-b border-border items-center hover:bg-muted/30 transition-colors last:border-0">
                      
                      {/* Class Cell */}
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-foreground leading-tight">{cls.name}</span>
                        <span className="text-xs font-medium text-muted-foreground mt-1 tracking-tight">#{cls.id}</span>
                      </div>

                      {/* Course Cell */}
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-primary/5 text-primary flex items-center justify-center shrink-0">
                          <BookOpen size={14} />
                        </div>
                        <span className="text-[13px] font-semibold text-foreground">{cls.course}</span>
                      </div>

                      {/* Instructor Cell */}
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-muted">
                          <img src={cls.instructorAvatar} alt={cls.instructor} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[13px] font-semibold text-foreground truncate">{cls.instructor}</span>
                      </div>

                      {/* Schedule Cell */}
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-[13px] font-bold text-foreground">
                          <Calendar size={13} className="text-primary" />
                          <span>{cls.schedule.split(',')[0]}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                          <Clock size={11} />
                          <span>{cls.schedule.split(',')[1]}</span>
                        </div>
                      </div>

                      {/* Status Cell */}
                      <div>
                        <span className={cn(
                          "inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold",
                          getStatusBadgeClasses(cls.status)
                        )}>
                          {cls.status}
                        </span>
                      </div>

                      {/* Actions Cell */}
                      <div className="flex gap-2 justify-end">
                        <button className="w-8 h-8 rounded border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shadow-sm">
                          <Edit2 size={14} />
                        </button>
                        <button className="w-8 h-8 rounded border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shadow-sm">
                          <MoreVertical size={14} />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Table Footer / Pagination Placeholder */}
            <div className="p-4 border-t border-border bg-background flex justify-between items-center shrink-0">
              <span className="text-xs font-semibold text-muted-foreground tracking-tight">Showing 5 of 24 active classes</span>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 border border-border rounded bg-card text-[11px] font-bold text-muted-foreground hover:text-foreground hover:bg-muted transition-all disabled:opacity-50" disabled>Previous</button>
                <button className="px-3 py-1.5 border border-border rounded bg-card text-[11px] font-bold text-foreground hover:bg-muted transition-all">Next</button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
