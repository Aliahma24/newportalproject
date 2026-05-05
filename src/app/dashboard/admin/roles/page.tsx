"use client";

import React, { useState } from "react";
import { 
  Shield, 
  Building2, 
  GraduationCap, 
  Users, 
  CalendarClock, 
  Headset, 
  Briefcase, 
  Activity,
  Save,
  Search,
  X
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Custom Checkbox Component
function MatrixCheckbox({ checked, onChange }: { checked?: boolean; onChange?: () => void }) {
  return (
    <label className="inline-flex cursor-pointer relative group">
      <input 
        type="checkbox" 
        className="absolute opacity-0 cursor-pointer w-0 h-0 peer" 
        checked={checked} 
        onChange={onChange}
      />
      <span className="w-5 h-5 border-2 border-border rounded flex items-center justify-center transition-all duration-200 bg-card peer-checked:bg-primary peer-checked:border-primary">
        <svg 
          className={cn("w-3.5 h-3.5 text-primary-foreground opacity-0 transition-opacity duration-200", checked && "opacity-100")} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </span>
    </label>
  );
}

export default function RolesPermissions() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Mock initial state based on design
  const initialRoles = [
    {
      id: "admin",
      name: "Admin",
      desc: "Full system access",
      icon: Shield,
      permissions: [true, true, true, true, true, true, true]
    },
    {
      id: "hod",
      name: "HOD",
      desc: "Department oversight",
      icon: Building2,
      permissions: [true, true, false, true, true, true, true]
    },
    {
      id: "teacher",
      name: "Teacher",
      desc: "Classroom management",
      icon: GraduationCap,
      permissions: [true, false, true, false, false, false, true]
    },
    {
      id: "student",
      name: "Student",
      desc: "Learning portal access",
      icon: Users,
      permissions: [false, false, false, false, false, false, false]
    },
    {
      id: "scheduler",
      name: "Scheduler",
      desc: "Timetable management",
      icon: CalendarClock,
      permissions: [true, true, false, true, false, false, false]
    },
    {
      id: "csr",
      name: "CSR",
      desc: "Customer support",
      icon: Headset,
      permissions: [true, false, false, false, true, false, false]
    },
    {
      id: "hr",
      name: "HR",
      desc: "Staff management",
      icon: Briefcase,
      permissions: [false, true, false, false, false, true, false]
    },
    {
      id: "monitoring",
      name: "Monitoring",
      desc: "Quality assurance",
      icon: Activity,
      permissions: [true, false, false, false, true, true, false]
    }
  ];

  const [rolesData, setRolesData] = useState(initialRoles);

  const togglePermission = (roleIndex: number, permIndex: number) => {
    const newData = [...rolesData];
    newData[roleIndex].permissions[permIndex] = !newData[roleIndex].permissions[permIndex];
    setRolesData(newData);
  };

  const headers = [
    "View Students",
    "Manage Teachers",
    "Mark Attendance",
    "Schedule Classes",
    "View Complaints",
    "Generate Reports",
    "Manage Syllabus"
  ];

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
          title="Roles & Permissions" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Admin User"
          userRole="Super Administrator"
          userAvatar="https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FMiddle%20Eastern%2F9"
          searchPlaceholder="Search permissions or roles..."
        />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-5 custom-scrollbar min-h-0">
          
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 shrink-0">
            <div>
              <h2 className="text-[22px] font-bold text-foreground mb-1">Access Management</h2>
              <p className="text-sm text-muted-foreground font-medium">Configure permissions matrix for all system roles. Select checkboxes to toggle access.</p>
            </div>
            <button className="h-10 px-5 bg-primary text-primary-foreground rounded-md text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm shrink-0">
              <Save size={16} />
              Save Changes
            </button>
          </div>

          {/* Matrix Card */}
          <div className="flex-1 bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col min-h-[400px]">
            <div className="flex-1 overflow-auto custom-scrollbar relative">
              <table className="w-full text-left border-collapse min-w-[1200px]">
                <thead>
                  <tr>
                    <th className="sticky left-0 top-0 z-20 bg-slate-50 border-b-2 border-r border-border p-4 font-bold text-[13px] text-foreground min-w-[240px] border-l-[3px] border-l-transparent">
                      Role
                    </th>
                    {headers.map((header, idx) => (
                      <th key={idx} className="sticky top-0 z-10 bg-slate-50 border-b-2 border-border p-4 font-bold text-[13px] text-foreground text-center whitespace-nowrap">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rolesData.map((role, roleIdx) => (
                    <tr 
                      key={role.id} 
                      className={cn(
                        "group transition-colors",
                        role.id === "admin" ? "bg-primary/5" : "hover:bg-muted/30"
                      )}
                    >
                      <td className={cn(
                        "sticky left-0 z-10 border-b border-r border-border p-4 bg-card",
                        role.id === "admin" ? "border-l-[3px] border-l-primary bg-primary/5" : "border-l-[3px] border-l-transparent group-hover:bg-slate-50/50"
                      )}>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-3 font-bold text-foreground">
                            <div className={cn(
                              "w-7 h-7 rounded-md flex items-center justify-center shrink-0",
                              role.id === "admin" ? "bg-primary text-primary-foreground" : "bg-input text-muted-foreground"
                            )}>
                              <role.icon size={16} />
                            </div>
                            {role.name}
                          </div>
                          <div className="text-[11px] font-medium text-muted-foreground mt-1 ml-[40px]">
                            {role.desc}
                          </div>
                        </div>
                      </td>
                      {role.permissions.map((isGranted, permIdx) => (
                        <td key={permIdx} className="border-b border-border p-4 text-center">
                          <MatrixCheckbox 
                            checked={isGranted} 
                            onChange={() => togglePermission(roleIdx, permIdx)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
