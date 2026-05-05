"use client";

import React, { useState } from "react";
import {
  BookOpen, Plus, Search, Filter, Edit2, Trash2,
  CheckCircle2, ChevronRight, GraduationCap, Archive,
  LayoutGrid, List
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function HODSyllabus() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const library = [
    { id: "LIB-01", title: "Tajweed Basics", levels: 3, topics: 12, category: "Tajweed", status: "Active" },
    { id: "LIB-02", title: "Quran Reading (Qaida)", levels: 2, topics: 18, category: "Reading", status: "Active" },
    { id: "LIB-03", title: "Surah Memorization (Juz 30)", levels: 5, topics: 37, category: "Hifz", status: "Active" },
    { id: "LIB-04", title: "Islamic Studies (Grade 1-5)", levels: 5, topics: 25, category: "Islamic Studies", status: "Active" },
    { id: "LIB-05", title: "Arabic Language Level 1", levels: 1, topics: 10, category: "Arabic", status: "Draft" },
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="hod" className="hidden md:flex w-64 shrink-0" />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar title="Syllabus Control" onMenuClick={() => setSidebarOpen(true)} userName="Dr. Abdur Rahman" userRole="HOD" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-muted/30 space-y-6">
          
          {/* Header Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search library..."
                className="w-full h-11 bg-card border border-border rounded-xl pl-10 pr-4 text-[13px] font-medium focus:border-primary outline-none transition-all shadow-sm"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-card border border-border rounded-xl p-1 p-0.5">
                <button 
                  onClick={() => setViewMode("list")}
                  className={cn("p-1.5 rounded-lg transition-all", viewMode === "list" ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted")}
                >
                  <List size={18} />
                </button>
                <button 
                  onClick={() => setViewMode("grid")}
                  className={cn("p-1.5 rounded-lg transition-all", viewMode === "grid" ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted")}
                >
                  <LayoutGrid size={18} />
                </button>
              </div>
              <button className="h-11 px-6 bg-primary text-white rounded-xl text-[13px] font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                <Plus size={18} /> Add New Library
              </button>
            </div>
          </div>

          {/* Library Content */}
          {viewMode === "list" ? (
            <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted/10">
                      <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Library Name</th>
                      <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Category</th>
                      <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border text-center">Levels</th>
                      <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border text-center">Total Topics</th>
                      <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Status</th>
                      <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {library.map((lib, i) => (
                      <tr key={i} className="hover:bg-muted/5 transition-colors group">
                        <td className="p-4">
                          <div className="text-[14px] font-bold text-foreground">{lib.title}</div>
                          <div className="text-[11px] text-muted-foreground font-mono">{lib.id}</div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 rounded-md bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-wider">
                            {lib.category}
                          </span>
                        </td>
                        <td className="p-4 text-center text-[13px] font-bold text-foreground">{lib.levels}</td>
                        <td className="p-4 text-center text-[13px] font-bold text-primary">{lib.topics}</td>
                        <td className="p-4">
                          <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                            lib.status === "Active" ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                          )}>{lib.status}</span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-muted-foreground hover:text-primary rounded-lg transition-all">
                              <Edit2 size={16} />
                            </button>
                            <button className="p-2 text-muted-foreground hover:text-amber-600 rounded-lg transition-all">
                              <Archive size={16} />
                            </button>
                            <button className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-all">
                              <ChevronRight size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {library.map((lib, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl shadow-sm p-6 flex flex-col gap-6 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <BookOpen size={24} />
                    </div>
                    <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      lib.status === "Active" ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                    )}>{lib.status}</span>
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold text-foreground leading-tight">{lib.title}</h4>
                    <p className="text-[12px] text-muted-foreground font-medium mt-1">{lib.category} — {lib.levels} Levels</p>
                  </div>
                  <div className="bg-muted/30 border border-border rounded-xl p-4 flex items-center justify-between">
                    <div className="text-center">
                      <div className="text-xl font-bold text-foreground">{lib.topics}</div>
                      <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Topics</div>
                    </div>
                    <ChevronRight size={20} className="text-primary/40" />
                    <div className="text-center">
                      <div className="text-xl font-bold text-foreground">0</div>
                      <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Drafts</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex-1 h-10 bg-primary text-white rounded-xl text-[12px] font-bold hover:bg-primary/90 transition-all">Edit Content</button>
                    <button className="h-10 w-10 border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:bg-muted transition-all">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
