"use client";

import React, { useState } from "react";
import { 
  Settings2, 
  Search, 
  Plus, 
  ZoomIn, 
  ZoomOut, 
  ChevronsUpDown, 
  Minus, 
  X, 
  Mail, 
  Phone, 
  CalendarDays, 
  Briefcase,
  ChevronRight
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface OrgNode {
  id: string;
  name: string;
  role: string;
  avatar: string;
  dept: string;
  isManagement?: boolean;
  children?: OrgNode[];
}

export default function OrganizationStructure() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("3");
  const [isPanelOpen, setPanelOpen] = useState(true);

  const orgData: OrgNode = {
    id: "1",
    name: "Muhammad Aslam",
    role: "Managing Director",
    avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F50-65%2FMiddle%20Eastern%2F1",
    dept: "Management",
    isManagement: true,
    children: [
      {
        id: "2",
        name: "Yusuf Ahmed",
        role: "HR Director",
        avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FSouth%20Asian%2F2",
        dept: "Human Resources",
        children: [
          {
            id: "2-1",
            name: "Zainab Tariq",
            role: "Recruitment Lead",
            avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F3",
            dept: "HR Dept"
          }
        ]
      },
      {
        id: "3",
        name: "Hafiz Usman",
        role: "Head of Department",
        avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FMiddle%20Eastern%2F4",
        dept: "Quran Education",
        children: [
          {
            id: "3-1",
            name: "Ustadh Bilal",
            role: "Senior Teacher",
            avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F25-35%2FAfrican%2F1",
            dept: "Academic"
          },
          {
            id: "3-2",
            name: "Aisha Rahman",
            role: "Quran Teacher",
            avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F18-25%2FMiddle%20Eastern%2F1",
            dept: "Academic"
          },
          {
            id: "3-3",
            name: "Fatima Ali",
            role: "Tajweed Instructor",
            avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F5",
            dept: "Academic"
          }
        ]
      },
      {
        id: "4",
        name: "Omar Farooq",
        role: "Head of Operations",
        avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F25-35%2FMiddle%20Eastern%2F6",
        dept: "Administration"
      }
    ]
  };

  const selectedEmployee = {
    name: "Hafiz Usman",
    role: "Head of Department",
    avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FMiddle%20Eastern%2F4",
    dept: "Quran Education",
    email: "usman.h@taleemulquran.com",
    phone: "+1 (555) 123-4567",
    joined: "15 March 2021",
    type: "Full-Time",
    reports: [
      { name: "Ustadh Bilal", role: "Senior Teacher", avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F25-35%2FAfrican%2F1" },
      { name: "Aisha Rahman", role: "Quran Teacher", avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F18-25%2FMiddle%20Eastern%2F1" },
      { name: "Fatima Ali", role: "Tajweed Instructor", avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F5" },
    ]
  };

  const renderTree = (node: OrgNode) => (
    <li key={node.id} className="relative pt-8 px-4 text-center">
      <div 
        className={cn(
          "node-card inline-flex flex-col items-center p-4 bg-white border border-border rounded-xl shadow-sm cursor-pointer transition-all hover:-translate-y-1 hover:border-primary min-w-[180px] relative z-10",
          selectedEmployeeId === node.id && "border-2 border-primary shadow-lg shadow-primary/10 ring-4 ring-primary/5"
        )}
        onClick={() => { setSelectedEmployeeId(node.id); setPanelOpen(true); }}
      >
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 border-2 border-primary/20 shadow-sm text-primary font-bold text-[16px]">
          {node.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="text-[14px] font-bold text-foreground mb-0.5">{node.name}</div>
        <div className="text-[11px] font-bold text-muted-foreground mb-3">{node.role}</div>
        <span className={cn(
          "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
          selectedEmployeeId === node.id ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-500"
        )}>
          {node.dept}
        </span>
        
        {node.children && (
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border border-border rounded-full flex items-center justify-center text-muted-foreground shadow-sm">
            <Minus size={12} />
          </div>
        )}
      </div>

      {node.children && (
        <ul className="flex justify-center pt-8 relative gap-4">
          {node.children.map(child => renderTree(child))}
        </ul>
      )}
    </li>
  );

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
          title="Organization Structure" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Yusuf Ahmed"
          userRole="HR Director"
          userAvatar="https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FSouth%20Asian%2F2"
          placeholder="Search organization..."
        />

        <div className="flex flex-1 overflow-hidden">
          {/* Main Diagram Area */}
          <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden relative">
            {/* Toolbar */}
            <div className="h-14 bg-white border-b border-border flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
              <div className="flex items-center gap-3">
                <button className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all">
                  <ZoomOut size={16} />
                </button>
                <span className="text-[13px] font-bold text-foreground">100%</span>
                <button className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all">
                  <ZoomIn size={16} />
                </button>
                <div className="w-[1px] h-5 bg-border mx-2" />
                <button className="h-8 px-3 border border-primary text-primary rounded-lg text-[12px] font-bold flex items-center gap-2 hover:bg-primary/5 transition-all">
                  <ChevronsUpDown size={14} /> Expand All
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                  <input 
                    type="text" 
                    placeholder="Find employee..." 
                    className="h-8 pl-9 pr-4 bg-slate-50 border border-border rounded-lg text-[12px] font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-48"
                  />
                </div>
                <button className="h-8 px-3 bg-primary text-white rounded-lg text-[12px] font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                  <Plus size={14} /> Add Role
                </button>
              </div>
            </div>

            {/* Tree Container */}
            <div className="flex-1 overflow-auto p-12 flex justify-center custom-scrollbar">
              <ul className="tree-root inline-block list-none p-0 m-0">
                {renderTree(orgData)}
              </ul>
            </div>
          </div>

          {/* Right Detail Panel */}
          {isPanelOpen && (
            <aside className="w-80 bg-white border-l border-border flex flex-col shrink-0 shadow-2xl z-20 animate-in slide-in-from-right duration-300">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h3 className="text-[16px] font-bold text-foreground">Employee Details</h3>
                <button 
                  onClick={() => setPanelOpen(false)}
                  className="w-8 h-8 rounded-lg bg-slate-100 text-muted-foreground hover:bg-slate-200 transition-colors flex items-center justify-center"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-8">
                {/* Profile Hero */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-4 border-white shadow-xl mb-4 text-primary font-bold text-2xl tracking-tighter">
                    {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h4 className="text-[18px] font-bold text-foreground leading-tight">{selectedEmployee.name}</h4>
                  <p className="text-[13px] font-medium text-muted-foreground mt-1">{selectedEmployee.role}</p>
                  <span className="mt-3 px-3 py-1 bg-primary/10 text-primary rounded-full text-[11px] font-bold uppercase tracking-wider">
                    {selectedEmployee.dept}
                  </span>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Contact Information</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 border border-border rounded-lg text-[13px] font-bold text-foreground">
                      <Mail size={14} className="text-muted-foreground" />
                      {selectedEmployee.email}
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 border border-border rounded-lg text-[13px] font-bold text-foreground">
                      <Phone size={14} className="text-muted-foreground" />
                      {selectedEmployee.phone}
                    </div>
                  </div>
                </div>

                {/* Employment Details */}
                <div className="space-y-3">
                  <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Employment Details</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 border border-border rounded-lg text-[13px] font-bold text-foreground">
                      <CalendarDays size={14} className="text-muted-foreground" />
                      Joined: {selectedEmployee.joined}
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 border border-border rounded-lg text-[13px] font-bold text-foreground">
                      <Briefcase size={14} className="text-muted-foreground" />
                      Type: {selectedEmployee.type}
                    </div>
                  </div>
                </div>

                {/* Direct Reports */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Direct Reports</div>
                    <span className="bg-slate-100 text-muted-foreground px-2 py-0.5 rounded-full text-[10px] font-bold">3</span>
                  </div>
                  <div className="space-y-2">
                    {selectedEmployee.reports.map((report, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 border border-border rounded-lg group cursor-pointer hover:border-primary transition-all">
                        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-[11px]">
                          {report.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-bold text-foreground truncate">{report.name}</div>
                          <div className="text-[11px] font-medium text-muted-foreground truncate">{report.role}</div>
                        </div>
                        <ChevronRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 space-y-3">
                  <button className="w-full h-11 bg-primary text-white rounded-xl text-[14px] font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                    View Full Profile
                  </button>
                  <button className="w-full h-11 border border-primary text-primary rounded-xl text-[14px] font-bold hover:bg-primary/5 transition-all">
                    Send Message
                  </button>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>

      <style jsx global>{`
        /* Hierarchical tree styling */
        .tree-root ul {
          padding-top: 20px;
          position: relative;
          transition: all 0.5s;
        }

        .tree-root li {
          float: left;
          text-align: center;
          list-style-type: none;
          position: relative;
          padding: 20px 5px 0 5px;
          transition: all 0.5s;
        }

        /* Connectors */
        .tree-root li::before, .tree-root li::after {
          content: '';
          position: absolute;
          top: 0;
          right: 50%;
          border-top: 2px solid #e2e8f0;
          width: 50%;
          height: 20px;
        }

        .tree-root li::after {
          right: auto;
          left: 50%;
          border-left: 2px solid #e2e8f0;
        }

        .tree-root li:only-child::after, .tree-root li:only-child::before {
          display: none;
        }

        .tree-root li:only-child {
          padding-top: 0;
        }

        .tree-root li:first-child::before, .tree-root li:last-child::after {
          border: 0 none;
        }

        .tree-root li:last-child::before {
          border-right: 2px solid #e2e8f0;
          border-radius: 0 5px 0 0;
        }

        .tree-root li:first-child::after {
          border-radius: 5px 0 0 0;
        }

        /* Downward line from parent */
        .tree-root ul ul::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          border-left: 2px solid #e2e8f0;
          width: 0;
          height: 20px;
          margin-left: -1px;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
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
