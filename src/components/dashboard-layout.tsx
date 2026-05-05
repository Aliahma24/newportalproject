"use client";

import React, { useState } from "react";
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  GraduationCap, 
  CalendarCheck, 
  BarChart2, 
  Settings, 
  ShieldCheck,
  Bell,
  Search,
  ChevronDown,
  Menu,
  X,
  BookOpen,
  Video,
  CalendarRange,
  ClipboardList,
  MessageSquare,
  UserCog,
  CalendarClock,
  User,
  Clock,
  Briefcase,
  CalendarOff,
  CreditCard,
  UserPlus,
  AlertCircle,
  Check,
  TrendingUp,
  AlertTriangle
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Sidebar Component ---
export function Sidebar({ className, role = "admin" }: { className?: string; role?: "admin" | "teacher" | "student" | "hr" | "scheduler" | "csr" | "hod" | "monitoring" }) {
  const pathname = usePathname();

  const adminMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/admin", active: pathname === "/dashboard/admin" },
    { icon: CalendarDays, label: "Today's Schedule", href: "/dashboard/admin/schedule", active: pathname === "/dashboard/admin/schedule" },
    { icon: Users, label: "Users Directory", href: "/dashboard/admin/users", active: pathname === "/dashboard/admin/users" },
    { icon: GraduationCap, label: "Classes & Courses", href: "/dashboard/admin/classes", active: pathname === "/dashboard/admin/classes" },
    { icon: CalendarCheck, label: "Attendance", href: "/dashboard/admin/attendance", active: pathname === "/dashboard/admin/attendance" },
    { icon: BarChart2, label: "Reports & Analytics", href: "/dashboard/admin/reports", active: pathname === "/dashboard/admin/reports" },
  ];

  const adminSettingItems = [
    { icon: Settings, label: "System Configuration", href: "/dashboard/admin/settings", active: pathname === "/dashboard/admin/settings" },
    { icon: ShieldCheck, label: "Roles & Permissions", href: "/dashboard/admin/roles", active: pathname === "/dashboard/admin/roles" },
  ];

  const teacherMenuItems = [
    { icon: LayoutDashboard, label: "Teacher Dashboard", href: "/dashboard/teacher", active: pathname === "/dashboard/teacher" },
    { icon: CalendarRange, label: "My Schedule", href: "/dashboard/teacher/schedule", active: pathname === "/dashboard/teacher/schedule" },
    { icon: Users, label: "My Students", href: "/dashboard/teacher/students", active: pathname === "/dashboard/teacher/students" },
    { icon: CalendarCheck, label: "Mark Attendance", href: "/dashboard/teacher/attendance", active: pathname === "/dashboard/teacher/attendance" },
    { icon: BookOpen, label: "Syllabus", href: "/dashboard/teacher/syllabus", active: pathname === "/dashboard/teacher/syllabus" },
    { icon: TrendingUp, label: "Progress Tracking", href: "/dashboard/teacher/progress", active: pathname === "/dashboard/teacher/progress" },
    { icon: ClipboardList, label: "Assignments", href: "/dashboard/teacher/assignments", active: pathname === "/dashboard/teacher/assignments" },
    { icon: MessageSquare, label: "Messages", href: "/dashboard/teacher/messages", active: pathname === "/dashboard/teacher/messages" },
  ];

  const teacherSettingItems = [
    { icon: UserCog, label: "My Profile", href: "/dashboard/teacher/profile", active: pathname === "/dashboard/teacher/profile" },
  ];

  const csrMenuItems = [
    { icon: LayoutDashboard, label: "Demo Dashboard", href: "/dashboard/csr", active: pathname === "/dashboard/csr" },
    { icon: ClipboardList, label: "New Demo Request", href: "/dashboard/csr/request", active: pathname === "/dashboard/csr/request" },
  ];

  const csrSettingItems = [
    { icon: UserCog, label: "My Profile", href: "#" },
  ];

  const studentMenuItems = [
    { icon: LayoutDashboard, label: "Student Dashboard", href: "/dashboard/student", active: pathname === "/dashboard/student" },
    { icon: BookOpen, label: "My Courses", href: "/dashboard/student/courses", active: pathname === "/dashboard/student/courses" },
    { icon: CalendarDays, label: "Schedule", href: "/dashboard/student/schedule", active: pathname === "/dashboard/student/schedule" },
    { icon: ClipboardList, label: "Assignments", href: "/dashboard/student/assignments", active: pathname === "/dashboard/student/assignments" },
    { icon: BarChart2, label: "Grades & Progress", href: "/dashboard/student/grades", active: pathname === "/dashboard/student/grades" },
    { icon: TrendingUp, label: "Progress Report", href: "/dashboard/student/progress", active: pathname === "/dashboard/student/progress" },
    { icon: CalendarCheck, label: "Attendance History", href: "/dashboard/student/attendance", active: pathname === "/dashboard/student/attendance" },
    { icon: GraduationCap, label: "Syllabus", href: "/dashboard/student/syllabus", active: pathname === "/dashboard/student/syllabus" },
    { icon: CalendarClock, label: "Request Makeup", href: "/dashboard/student/makeup", active: pathname === "/dashboard/student/makeup" },
    { icon: MessageSquare, label: "Messages", href: "/dashboard/student/messages", active: pathname === "/dashboard/student/messages" },
  ];

  const studentSettingItems = [
    { icon: AlertTriangle, label: "Submit Complaint", href: "/dashboard/student/complaint", active: pathname === "/dashboard/student/complaint" },
    { icon: User, label: "My Profile", href: "/dashboard/student/profile", active: pathname === "/dashboard/student/profile" },
  ];

  const hrMenuItems = [
    { icon: LayoutDashboard, label: "HR Dashboard", href: "/dashboard/hr", active: pathname === "/dashboard/hr" },
    { icon: Users, label: "Employee Directory", href: "/dashboard/hr/directory", active: pathname === "/dashboard/hr/directory" },
    { icon: Clock, label: "Attendance Logs", href: "/dashboard/hr/attendance", active: pathname === "/dashboard/hr/attendance" },
    { icon: CalendarClock, label: "Leave Management", href: "/dashboard/hr/leave", active: pathname === "/dashboard/hr/leave" },
    { icon: CreditCard, label: "Payroll", href: "/dashboard/hr/payroll", active: pathname === "/dashboard/hr/payroll" },
    { icon: UserPlus, label: "Recruitment", href: "/dashboard/hr/recruitment", active: pathname === "/dashboard/hr/recruitment" },
  ];

  const hrSettingItems = [
    { icon: Settings, label: "Organization", href: "#" },
  ];
  
  const operationsMenuItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard/scheduler", active: pathname === "/dashboard/scheduler" },
    { icon: CalendarDays, label: "Weekly Schedule", href: "/dashboard/scheduler/schedule", active: pathname === "/dashboard/scheduler/schedule" },
    { icon: Video, label: "Demo Requests", href: "/dashboard/scheduler/demos", active: pathname === "/dashboard/scheduler/demos", badge: "3" },
    { icon: Users, label: "Teacher Availability", href: "/dashboard/scheduler/teachers", active: pathname === "/dashboard/scheduler/teachers" },
  ];

  const operationsSettingItems = [
    { icon: Settings, label: "Preferences", href: "/dashboard/scheduler/preferences", active: pathname === "/dashboard/scheduler/preferences" },
  ];

  const hodMenuItems = [
    { icon: LayoutDashboard, label: "HOD Overview", href: "/dashboard/hod", active: pathname === "/dashboard/hod" },
    { icon: Users, label: "Teachers", href: "/dashboard/hod/teachers", active: pathname === "/dashboard/hod/teachers" },
    { icon: GraduationCap, label: "Students", href: "/dashboard/hod/students", active: pathname === "/dashboard/hod/students" },
    { icon: AlertTriangle, label: "Complaints", href: "/dashboard/hod/complaints", active: pathname === "/dashboard/hod/complaints", badge: "2" },
    { icon: BookOpen, label: "Syllabus Control", href: "/dashboard/hod/syllabus", active: pathname === "/dashboard/hod/syllabus" },
    { icon: BarChart2, label: "Quality Reports", href: "/dashboard/hod/reports", active: pathname === "/dashboard/hod/reports" },
  ];

  const monitoringMenuItems = [
    { icon: LayoutDashboard, label: "Live Monitor", href: "/dashboard/monitoring", active: pathname === "/dashboard/monitoring" },
    { icon: ClipboardList, label: "Submit Report", href: "/dashboard/monitoring/report", active: pathname === "/dashboard/monitoring/report" },
    { icon: Clock, label: "Past Reports", href: "/dashboard/monitoring/history", active: pathname === "/dashboard/monitoring/history" },
  ];

  const menuItems = role === "admin" ? adminMenuItems : role === "teacher" ? teacherMenuItems : role === "student" ? studentMenuItems : role === "hr" ? hrMenuItems : role === "csr" ? csrMenuItems : role === "hod" ? hodMenuItems : role === "monitoring" ? monitoringMenuItems : operationsMenuItems;
  const settingItems = role === "admin" ? adminSettingItems : role === "teacher" ? teacherSettingItems : role === "student" ? studentSettingItems : role === "hr" ? hrSettingItems : role === "csr" ? csrSettingItems : role === "hod" ? adminSettingItems : operationsSettingItems;

  const getMenuSectionLabel = () => {
    if (role === "hr") return "Human Resources";
    if (role === "scheduler") return "Scheduling";
    if (role === "csr") return "Customer Service";
    if (role === "hod") return "Head of Department";
    if (role === "monitoring") return "Quality Assurance";
    return "Menu";
  };

  return (
    <aside className={cn("flex flex-col h-full bg-secondary text-secondary-foreground border-r border-white/5 relative overflow-hidden", className)}>
      {/* Sidebar Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l20 20-20 20L0 20z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="p-6 flex items-center gap-3">
          <div className="h-9 w-9 bg-primary/20 rounded-xl flex items-center justify-center shadow-lg border border-primary/20">
            <Briefcase size={20} className="text-primary" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">Taleem ul Quran</span>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-4 space-y-7 overflow-y-auto scrollbar-none hover:custom-scrollbar transition-all">
          <div>
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-3">{getMenuSectionLabel()}</p>
            <div className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-semibold transition-all group",
                    item.active 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon size={18} />
                  {item.label}
                  {(item as any).badge && (
                    <span className="ml-auto bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                      {(item as any).badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-3">Settings</p>
            <div className="space-y-1">
              {settingItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-semibold transition-all",
                    item.active 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Sidebar Bottom Widget */}
        <div className="p-4 mt-auto">
          {role === "student" ? (
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
              <div className="text-[11px] font-bold text-primary uppercase tracking-wide mb-2">Next Assignment Due</div>
              <div className="text-sm font-bold text-white mb-1">Surah Al-Baqarah</div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Clock size={12} />
                Tomorrow, 11:59 PM
              </div>
            </div>
          ) : role === "hr" ? (
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
              <div className="text-[11px] font-bold text-primary uppercase tracking-wide mb-2">Action Required</div>
              <div className="text-sm font-bold text-white mb-1">Monthly Payroll Review</div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <AlertCircle size={12} />
                Due in 2 days
              </div>
            </div>
          ) : role === "scheduler" ? (
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
              <div className="text-[11px] font-bold text-primary uppercase tracking-wide mb-2">Pending Action</div>
              <div className="text-sm font-bold text-white mb-1">3 Unassigned Demos</div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <AlertCircle size={12} />
                Needs scheduling today
              </div>
            </div>
          ) : (
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
               <div className="text-xs font-bold text-white mb-3">System Health</div>
               <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-4">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                  <span>All systems operational</span>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-muted-foreground/60">
                     <span>Server Load</span>
                     <span>45%</span>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-primary rounded-full" style={{ width: '45%' }} />
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

// --- Navbar Component ---
export function Navbar({ 
  title, 
  onMenuClick,
  userName = "Admin User",
  userRole = "Super Administrator",
  userAvatar = "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FMiddle%20Eastern%2F9",
  hideSearch = false
}: { 
  title: string; 
  onMenuClick?: () => void;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  hideSearch?: boolean;
}) {
  return (
    <header className="h-[72px] bg-card border-b border-border flex items-center justify-between px-6 md:px-8 shrink-0">
      <div className="flex items-center gap-8 flex-1">
        <button onClick={onMenuClick} className="md:hidden p-2 hover:bg-muted rounded-lg text-muted-foreground">
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-bold tracking-tight text-foreground hidden sm:block">{title}</h1>

        {/* Search Bar */}
        {!hideSearch && (
          <div className="hidden lg:flex items-center gap-3 bg-muted px-4 h-10 rounded-lg w-full max-w-[320px] border border-transparent focus-within:border-primary/20 focus-within:bg-card transition-all">
            <Search size={18} className="text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search students, classes..." 
              className="bg-transparent border-none outline-none text-sm font-medium w-full text-foreground placeholder:text-muted-foreground/60"
            />
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-border bg-card text-[10px] font-bold text-muted-foreground">
               <span>⌘</span>
               <span>K</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-5">
        <button className="relative h-10 w-10 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-muted transition-all">
          <Bell size={20} />
          <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-card" />
        </button>

        <div className="h-10 w-[1px] bg-border mx-2 hidden sm:block" />

        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{userName}</span>
            <span className="text-[11px] font-semibold text-muted-foreground">{userRole}</span>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 relative group-hover:bg-primary/20 transition-all">
            <span className="text-primary font-bold text-sm tracking-tight">
              {userName.split(' ').map(n => n[0]).join('')}
            </span>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-card rounded-full" />
          </div>
          <ChevronDown size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>
    </header>
  );
}
