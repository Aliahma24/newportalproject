"use client";

import React, { useState } from "react";
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  ShieldCheck, 
  Search, 
  ChevronDown, 
  Edit2, 
  MoreVertical,
  UserPlus,
  X
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function UsersDirectory() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { label: "Total Users", value: "1,290", icon: Users, primary: true },
    { label: "Students", value: "1,248", icon: GraduationCap },
    { label: "Teachers", value: "42", icon: BookOpen },
    { label: "Administrators", value: "8", icon: ShieldCheck },
  ];

  const users = [
    {
      id: "TCH-401",
      name: "Hafiz Usman",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FMiddle%20Eastern%2F1",
      role: "Teacher",
      email: "usman@taleemulquran.com",
      phone: "+92 300 1234567",
      status: "Active",
      date: "10 Jan, 2025"
    },
    {
      id: "STD-1042",
      name: "Ahmed Raza",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FSouth%20Asian%2F3",
      role: "Student",
      email: "ahmed.raza@student.com",
      phone: "+92 321 7654321",
      status: "Active",
      date: "15 Feb, 2025"
    },
    {
      id: "TCH-405",
      name: "Ustadha Aisha",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FMiddle%20Eastern%2F4",
      role: "Teacher",
      email: "aisha@taleemulquran.com",
      phone: "+92 333 9876543",
      status: "Active",
      date: "05 Mar, 2025"
    },
    {
      id: "STD-1090",
      name: "Ali Khan",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FMiddle%20Eastern%2F5",
      role: "Student",
      email: "ali.khan@student.com",
      phone: "+92 300 5556667",
      status: "Inactive",
      date: "12 Mar, 2025"
    },
    {
      id: "STD-1120",
      name: "Zainab Fatima",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F18-25%2FSouth%20Asian%2F6",
      role: "Student",
      email: "zainab.f@student.com",
      phone: "+92 311 2223344",
      status: "Active",
      date: "20 Mar, 2025"
    }
  ];

  const getRoleBadgeClasses = (role: string) => {
    switch(role.toLowerCase()) {
      case 'student': return 'bg-blue-500/10 text-blue-500';
      case 'teacher': return 'bg-primary/10 text-primary';
      case 'admin': return 'bg-purple-500/10 text-purple-500';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusBadgeClasses = (status: string) => {
    return status.toLowerCase() === 'active' 
      ? 'bg-emerald-500/10 text-emerald-500' 
      : 'bg-muted text-muted-foreground';
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
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar 
          title="Users Directory" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Admin User"
          userRole="Super Administrator"
          userAvatar="https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FMiddle%20Eastern%2F9"
          hideSearch
        />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar flex flex-col">
          
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
            <div>
              <h2 className="text-[22px] font-bold text-foreground mb-1">Manage Users</h2>
              <p className="text-sm text-muted-foreground font-medium">
                View and manage all students, teachers, and administrators.
              </p>
            </div>
            <button className="h-10 px-4 bg-primary text-primary-foreground rounded-md text-sm font-semibold flex items-center gap-2 hover:bg-primary/90 transition-colors w-max">
              <UserPlus size={16} />
              Add New User
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
            {stats.map((stat, i) => (
              <div key={i} className="p-4 bg-card border border-border rounded-xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
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

          {/* Directory Table Card */}
          <div className="flex-1 flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-sm min-h-0">
            
            {/* Toolbar */}
            <div className="p-4 border-b border-border flex flex-col sm:flex-row justify-between gap-4 shrink-0">
              <div className="flex items-center gap-2.5 bg-background px-3.5 h-9 rounded-md border border-border w-full sm:w-[280px] focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
                <Search size={16} className="text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search by name, ID, or email..." 
                  className="bg-transparent border-none outline-none text-[13px] font-medium text-foreground w-full placeholder:text-muted-foreground"
                />
              </div>

              <div className="flex gap-3">
                <button className="h-9 px-3 border border-border rounded-md bg-card text-[13px] font-semibold text-foreground flex items-center gap-2 hover:bg-muted transition-colors">
                  All Roles
                  <ChevronDown size={14} className="text-muted-foreground" />
                </button>
                <button className="h-9 px-3 border border-border rounded-md bg-card text-[13px] font-semibold text-foreground flex items-center gap-2 hover:bg-muted transition-colors">
                  Status: Active
                  <ChevronDown size={14} className="text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Table Area */}
            <div className="flex-1 overflow-x-auto custom-scrollbar flex flex-col min-h-0">
              <div className="min-w-[900px] flex flex-col h-full">
                {/* Table Header */}
                <div className="grid grid-cols-[2fr_1.5fr_2fr_1fr_1fr_80px] px-5 py-3 bg-background border-b border-border text-xs font-bold text-muted-foreground uppercase tracking-wider shrink-0">
                  <div>User</div>
                  <div>Role</div>
                  <div>Contact</div>
                  <div>Status</div>
                  <div>Joined Date</div>
                  <div className="text-right">Actions</div>
                </div>

                {/* Table Body */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  {users.map((user, i) => (
                    <div key={i} className="grid grid-cols-[2fr_1.5fr_2fr_1fr_1fr_80px] px-5 py-3.5 border-b border-border items-center hover:bg-muted/30 transition-colors last:border-0">
                      
                      {/* User Cell */}
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-muted overflow-hidden shrink-0">
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[14px] font-bold text-foreground leading-tight">{user.name}</span>
                          <span className="text-xs font-medium text-muted-foreground mt-0.5">#{user.id}</span>
                        </div>
                      </div>

                      {/* Role Cell */}
                      <div>
                        <span className={cn(
                          "inline-flex items-center px-2 py-1 rounded text-[11px] font-bold uppercase tracking-wide",
                          getRoleBadgeClasses(user.role)
                        )}>
                          {user.role}
                        </span>
                      </div>

                      {/* Contact Cell */}
                      <div className="flex flex-col text-[13px]">
                        <span className="font-semibold text-foreground">{user.email}</span>
                        <span className="font-medium text-muted-foreground text-xs mt-0.5">{user.phone}</span>
                      </div>

                      {/* Status Cell */}
                      <div>
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold",
                          getStatusBadgeClasses(user.status)
                        )}>
                          <div className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            user.status.toLowerCase() === 'active' ? "bg-emerald-500" : "bg-muted-foreground"
                          )} />
                          {user.status}
                        </span>
                      </div>

                      {/* Date Cell */}
                      <div className="text-[13px] font-semibold text-muted-foreground">
                        {user.date}
                      </div>

                      {/* Actions Cell */}
                      <div className="flex gap-2 justify-end">
                        <button className="w-8 h-8 rounded border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                          <Edit2 size={14} />
                        </button>
                        <button className="w-8 h-8 rounded border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                          <MoreVertical size={14} />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
