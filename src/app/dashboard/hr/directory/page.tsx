"use client";

import React, { useState } from "react";
import { 
  Search, 
  UserPlus, 
  Eye, 
  Edit, 
  Trash2, 
  Phone, 
  Mail, 
  MessageSquare, 
  ChevronLeft, 
  ChevronRight,
  MoreVertical,
  Bell,
  Calendar,
  AlertCircle,
  Briefcase,
  Users,
  Clock,
  CalendarClock,
  CreditCard,
  Settings,
  X
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Employee {
  id: string;
  empId: string;
  name: string;
  avatar: string;
  phone: string;
  email: string;
  role: string;
  shift: string;
  timing: string;
  status: "Active" | "Inactive";
  department: string;
  joinedDate: string;
  reportTo: string;
  attendance: string;
  rating: string;
  classes: string;
  todaySchedule: {
    time: string;
    subject: string;
    student: string;
    status: "Completed" | "Live" | "Upcoming";
  }[];
}

export default function EmployeeDirectory() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedEmpId, setSelectedEmpId] = useState("EMP-1042");

  const employees: Employee[] = [
    {
      id: "1",
      empId: "EMP-1042",
      name: "Ustadh Bilal",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F25-35%2FMiddle%20Eastern%2F3",
      phone: "+92 300 1234567",
      email: "bilal@taleem.com",
      role: "Tajweed Instructor",
      shift: "Evening Shift",
      timing: "04:00 PM - 09:00 PM",
      status: "Active",
      department: "Quran Studies",
      joinedDate: "12 Jan 2024",
      reportTo: "Yusuf Ahmed (HR)",
      attendance: "98%",
      rating: "4.8",
      classes: "142",
      todaySchedule: [
        { time: "04:00 PM", subject: "Tajweed Basics", student: "Ahmed Raza", status: "Completed" },
        { time: "05:30 PM", subject: "Advanced Recitation", student: "Ali Khan", status: "Live" },
        { time: "07:00 PM", subject: "Hifz Revision", student: "Hafiz Usman", status: "Upcoming" },
      ]
    },
    {
      id: "2",
      empId: "EMP-1045",
      name: "Fatima Ali",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F4",
      phone: "+92 300 7654321",
      email: "fatima@taleem.com",
      role: "Admin Assistant",
      shift: "Morning Shift",
      timing: "09:00 AM - 02:00 PM",
      status: "Active",
      department: "Administration",
      joinedDate: "05 Feb 2024",
      reportTo: "Yusuf Ahmed (HR)",
      attendance: "95%",
      rating: "4.5",
      classes: "0",
      todaySchedule: []
    },
    {
      id: "3",
      empId: "EMP-1048",
      name: "Hafiz Usman",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FSouth%20Asian%2F5",
      phone: "+92 321 9876543",
      email: "usman@taleem.com",
      role: "Hifz Instructor",
      shift: "Night Shift",
      timing: "08:00 PM - 12:00 AM",
      status: "Active",
      department: "Quran Studies",
      joinedDate: "20 Nov 2023",
      reportTo: "Yusuf Ahmed (HR)",
      attendance: "92%",
      rating: "4.9",
      classes: "210",
      todaySchedule: [
        { time: "08:00 PM", subject: "Juz 30 Hifz", student: "Omar Farooq", status: "Upcoming" },
      ]
    },
    {
      id: "4",
      empId: "EMP-1051",
      name: "Aisha Rahman",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FMiddle%20Eastern%2F1",
      phone: "+92 333 1122334",
      email: "aisha@taleem.com",
      role: "Curriculum Developer",
      shift: "Morning Shift",
      timing: "09:00 AM - 05:00 PM",
      status: "Inactive",
      department: "Education",
      joinedDate: "15 Dec 2023",
      reportTo: "Yusuf Ahmed (HR)",
      attendance: "85%",
      rating: "4.7",
      classes: "0",
      todaySchedule: []
    },
    {
      id: "5",
      empId: "EMP-1055",
      name: "Omar Farooq",
      avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FMiddle%20Eastern%2F7",
      phone: "+92 345 5566778",
      email: "omar@taleem.com",
      role: "Senior Tajweed Teacher",
      shift: "Evening Shift",
      timing: "04:00 PM - 09:00 PM",
      status: "Active",
      department: "Quran Studies",
      joinedDate: "10 Mar 2023",
      reportTo: "Yusuf Ahmed (HR)",
      attendance: "99%",
      rating: "5.0",
      classes: "340",
      todaySchedule: []
    }
  ];

  const selectedEmployee = employees.find(e => e.empId === selectedEmpId) || employees[0];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans text-[#111827]">
      {/* Desktop Sidebar */}
      <Sidebar role="hr" className="hidden md:flex w-64 shrink-0" />

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-72 h-full animate-in slide-in-from-left duration-300">
            <Sidebar role="hr" className="w-full" />
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
          title="Employee Directory" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Yusuf Ahmed"
          userRole="HR Director"
          userAvatar="https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FSouth%20Asian%2F2"
          placeholder="Search Taleem ul Quran..."
        />

        <main className="flex-1 overflow-hidden flex flex-col md:flex-row gap-6 p-6 md:p-8 bg-slate-50/30">
          
          {/* Table Section */}
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="bg-card border border-border rounded-xl shadow-sm flex flex-col flex-1 min-h-0 overflow-hidden">
              {/* Toolbar */}
              <div className="p-5 border-b border-border flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative group min-w-[200px]">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Search name or ID..." 
                      className="w-full h-10 bg-slate-50 border border-border rounded-lg pl-10 pr-4 text-[13px] font-medium outline-none focus:border-primary transition-all"
                    />
                  </div>
                  <select className="h-10 bg-card border border-border rounded-lg px-4 pr-10 text-[13px] font-bold text-foreground outline-none cursor-pointer hover:bg-slate-50 transition-colors appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center] bg-[length:14px]">
                    <option value="">All Roles</option>
                    <option value="tajweed">Tajweed Instructor</option>
                    <option value="hifz">Hifz Instructor</option>
                    <option value="admin">Administrative</option>
                  </select>
                  <select className="h-10 bg-card border border-border rounded-lg px-4 pr-10 text-[13px] font-bold text-foreground outline-none cursor-pointer hover:bg-slate-50 transition-colors appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center] bg-[length:14px]">
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <button className="h-10 px-5 bg-primary text-white rounded-lg text-[13px] font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md shadow-primary/20 whitespace-nowrap">
                  <UserPlus size={16} /> New Employee
                </button>
              </div>

              {/* Table Container */}
              <div className="flex-1 overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead className="sticky top-0 bg-muted/50 z-10">
                    <tr>
                      <th className="p-4 px-6 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Employee Name</th>
                      <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Contact Details</th>
                      <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Role & Designation</th>
                      <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Shift / Timing</th>
                      <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Status</th>
                      <th className="p-4 px-6 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {employees.map((emp) => (
                      <tr 
                        key={emp.empId} 
                        onClick={() => setSelectedEmpId(emp.empId)}
                        className={cn(
                          "cursor-pointer transition-all",
                          selectedEmpId === emp.empId ? "bg-primary/[0.04] border-y border-primary/20" : "hover:bg-slate-50/50"
                        )}
                      >
                        <td className="p-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary font-bold text-[14px]">
                              {emp.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="text-[14px] font-bold text-foreground leading-tight">{emp.name}</div>
                              <div className="text-[11px] font-bold text-muted-foreground mt-0.5">#{emp.empId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-[13px] font-bold text-foreground">{emp.phone}</div>
                          <div className="text-[12px] font-medium text-muted-foreground truncate max-w-[150px]">{emp.email}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-[13px] font-bold text-foreground">{emp.role}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-[13px] font-bold text-foreground">{emp.shift}</div>
                          <div className="text-[12px] font-medium text-muted-foreground">{emp.timing}</div>
                        </td>
                        <td className="p-4">
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                            emp.status === "Active" ? "bg-emerald-500/10 text-emerald-600" : "bg-slate-100 text-muted-foreground"
                          )}>
                            {emp.status}
                          </span>
                        </td>
                        <td className="p-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button className="p-2 text-muted-foreground hover:bg-muted hover:text-primary rounded-lg transition-all" title="View Profile">
                              <Eye size={16} />
                            </button>
                            <button className="p-2 text-muted-foreground hover:bg-muted hover:text-primary rounded-lg transition-all" title="Edit Details">
                              <Edit size={16} />
                            </button>
                            <button className="p-2 text-muted-foreground hover:bg-red-50 hover:text-red-500 rounded-lg transition-all" title="Remove Employee">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-border flex items-center justify-between">
                <span className="text-[13px] font-semibold text-muted-foreground">Showing 1 to 5 of 42 employees</span>
                <div className="flex items-center gap-1.5">
                  <button disabled className="w-9 h-9 flex items-center justify-center border border-border rounded-lg text-muted-foreground disabled:opacity-40"><ChevronLeft size={18} /></button>
                  <button className="w-9 h-9 flex items-center justify-center border border-primary bg-primary text-white rounded-lg text-[13px] font-bold">1</button>
                  <button className="w-9 h-9 flex items-center justify-center border border-border rounded-lg text-[13px] font-bold hover:bg-slate-50">2</button>
                  <button className="w-9 h-9 flex items-center justify-center border border-border rounded-lg text-[13px] font-bold hover:bg-slate-50">3</button>
                  <span className="px-2 text-muted-foreground font-bold">...</span>
                  <button className="w-9 h-9 flex items-center justify-center border border-border rounded-lg text-[13px] font-bold hover:bg-slate-50">7</button>
                  <button className="w-9 h-9 flex items-center justify-center border border-border rounded-lg text-muted-foreground hover:bg-slate-50"><ChevronRight size={18} /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Profile Panel */}
          <div className="hidden lg:flex w-[360px] flex-col shrink-0 bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="relative">
              <div className="h-20 w-full bg-gradient-to-br from-primary/20 to-primary/5" />
              <div className="flex flex-col items-center px-6 -mt-10 pb-6 border-b border-border">
                <div className="relative group">
                  <div className="w-20 h-20 rounded-full bg-primary/10 border-4 border-white shadow-lg flex items-center justify-center text-primary font-bold text-2xl tracking-tighter">
                    {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className={cn(
                    "absolute bottom-0 right-0 w-4 h-4 border-2 border-white rounded-full shadow-sm",
                    selectedEmployee.status === "Active" ? "bg-emerald-500" : "bg-slate-400"
                  )} />
                </div>
                <div className="mt-4 text-center">
                  <h2 className="text-lg font-bold text-foreground leading-tight">{selectedEmployee.name}</h2>
                  <p className="text-[13px] font-bold text-muted-foreground mt-1">#{selectedEmployee.empId} • {selectedEmployee.role}</p>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/[0.04] transition-all"><Phone size={18} /></button>
                  <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/[0.04] transition-all"><Mail size={18} /></button>
                  <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/[0.04] transition-all"><MessageSquare size={18} /></button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
              <div className="space-y-4">
                <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Employment Details</h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                  {[
                    { label: "Department", val: selectedEmployee.department },
                    { label: "Shift", val: selectedEmployee.shift },
                    { label: "Joined Date", val: selectedEmployee.joinedDate },
                    { label: "Report To", val: selectedEmployee.reportTo }
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider leading-none">{item.label}</span>
                      <div className="text-[13px] font-bold text-foreground leading-tight">{item.val}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Performance Overview</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Attendance", val: selectedEmployee.attendance },
                    { label: "Avg. Rating", val: selectedEmployee.rating },
                    { label: "Classes", val: selectedEmployee.classes }
                  ].map((item, i) => (
                    <div key={i} className="bg-muted/50 rounded-lg p-3 flex flex-col items-center justify-center text-center gap-1">
                      <span className="text-[16px] font-bold text-foreground leading-none">{item.val}</span>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedEmployee.todaySchedule.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Today's Schedule</h3>
                  <div className="space-y-3">
                    {selectedEmployee.todaySchedule.map((item, i) => (
                      <div key={i} className={cn(
                        "p-3 rounded-lg border flex items-center gap-3 transition-all",
                        item.status === "Live" ? "border-primary/40 bg-primary/[0.04]" : "border-border bg-card"
                      )}>
                        <div className="text-[12px] font-bold text-foreground w-16 shrink-0">{item.time}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-bold text-foreground truncate leading-tight">{item.subject}</div>
                          <div className="text-[11px] font-bold text-muted-foreground truncate mt-0.5">{item.student}</div>
                        </div>
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider",
                          item.status === "Live" ? "bg-primary text-white" : item.status === "Completed" ? "bg-emerald-500/10 text-emerald-600" : "bg-slate-100 text-muted-foreground"
                        )}>
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-border flex gap-3 bg-card">
              <button className="flex-1 h-10 border border-border text-foreground hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-lg text-[13px] font-bold transition-all">Suspend</button>
              <button className="flex-1 h-10 bg-primary text-white hover:scale-[1.02] active:scale-[0.98] rounded-lg text-[13px] font-bold transition-all shadow-md shadow-primary/20">Edit Profile</button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
