"use client";

import React, { useState } from "react";
import {
  BookOpen, Plus, Search, Filter, Edit2, Trash2,
  CheckCircle2, ChevronRight, UserPlus, Book, Users
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SyllabusTopic {
  id: string;
  title: string;
  category: string;
  level: string;
  assignedStudents: number;
  status: "Active" | "Draft";
}

export default function SyllabusManagement() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const topics: SyllabusTopic[] = [
    { id: "1", title: "Tajweed Basics — Noon Sakinah", category: "Tajweed", level: "Beginner", assignedStudents: 12, status: "Active" },
    { id: "2", title: "Makharij Al-Huroof (Heavy Letters)", category: "Tajweed", level: "Beginner", assignedStudents: 8, status: "Active" },
    { id: "3", title: "Surah Al-Baqarah (Ayah 1-50)", category: "Hifz", level: "Intermediate", assignedStudents: 5, status: "Active" },
    { id: "4", title: "Basic Islamic History", category: "General", level: "All", assignedStudents: 20, status: "Active" },
    { id: "5", title: "Madd Rules — Madd Muttasil", category: "Tajweed", level: "Intermediate", assignedStudents: 0, status: "Draft" },
  ];

  const filteredTopics = topics.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="teacher" className="hidden md:flex w-64 shrink-0" />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar title="Syllabus Management" onMenuClick={() => setSidebarOpen(true)} userName="Ustadh Bilal" userRole="Teacher" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-muted/30 space-y-6">
          {/* Top Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search topics or categories..."
                className="w-full h-11 bg-card border border-border rounded-xl pl-10 pr-4 text-[13px] font-medium focus:border-primary outline-none transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="h-11 px-4 border border-border bg-card rounded-xl text-[13px] font-bold text-muted-foreground flex items-center gap-2 hover:bg-muted transition-all">
                <Filter size={18} /> Filters
              </button>
              <button className="h-11 px-6 bg-primary text-white rounded-xl text-[13px] font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                <Plus size={18} /> Create New Topic
              </button>
            </div>
          </div>

          {/* Syllabus Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { label: "Total Topics", val: "42", icon: BookOpen, color: "text-blue-600 bg-blue-100" },
              { label: "Assigned Topics", val: "35", icon: UserPlus, color: "text-emerald-600 bg-emerald-100" },
              { label: "Drafts", val: "7", icon: Book, color: "text-amber-600 bg-amber-100" },
              { label: "Last Updated", val: "Yesterday", icon: CheckCircle2, color: "text-primary bg-primary/10" },
            ].map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 shadow-sm flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", s.color)}>
                  <s.icon size={18} />
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground leading-none">{s.val}</div>
                  <div className="text-[11px] font-bold text-muted-foreground mt-1 uppercase tracking-widest">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Topics Table */}
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-border bg-muted/20">
              <h3 className="text-[15px] font-bold text-foreground">Syllabus Library</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/10">
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Topic Title</th>
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Category</th>
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Level</th>
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Students</th>
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">Status</th>
                    <th className="p-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredTopics.map((topic) => (
                    <tr key={topic.id} className="hover:bg-muted/5 transition-colors group">
                      <td className="p-4">
                        <div className="text-[14px] font-bold text-foreground">{topic.title}</div>
                        <div className="text-[11px] text-muted-foreground font-medium mt-0.5">ID: {topic.id}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 rounded-md bg-secondary/10 text-secondary text-[11px] font-bold uppercase tracking-wide">
                          {topic.category}
                        </span>
                      </td>
                      <td className="p-4 text-[13px] font-semibold text-muted-foreground">{topic.level}</td>
                      <td className="p-4 text-[13px] font-bold text-foreground">
                        <div className="flex items-center gap-1.5">
                          <Users size={14} className="text-muted-foreground" /> {topic.assignedStudents}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          topic.status === "Active" ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                        )}>
                          {topic.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                            <Edit2 size={16} />
                          </button>
                          <button className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                            <Trash2 size={16} />
                          </button>
                          <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all">
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredTopics.length === 0 && (
              <div className="p-20 text-center flex flex-col items-center justify-center gap-3">
                <BookOpen size={40} className="text-muted-foreground/30" />
                <p className="text-[14px] font-bold text-muted-foreground">No topics found matching your search.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
