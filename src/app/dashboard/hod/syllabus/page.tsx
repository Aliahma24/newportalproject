"use client";

import React, { useState } from "react";
import {
  BookOpen, Plus, Search, Filter, Edit2, Trash2,
  CheckCircle2, ChevronRight, GraduationCap, Archive,
  LayoutGrid, List, MoreVertical, Upload, UserCheck,
  ShieldCheck, AlertCircle, FileText, Send
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function HODSyllabus() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Library");
  const [assignModalOpen, setAssignModalOpen] = useState(false);

  const library = [
    { id: "LIB-01", title: "Tajweed Basics", levels: 3, topics: 12, category: "Tajweed", status: "Active", assigned: 8 },
    { id: "LIB-02", title: "Quran Reading (Qaida)", levels: 2, topics: 18, category: "Reading", status: "Active", assigned: 12 },
    { id: "LIB-03", title: "Surah Memorization (Juz 30)", levels: 5, topics: 37, category: "Hifz", status: "Active", assigned: 5 },
  ];

  const faculty = [
    { name: "Ustadh Bilal", role: "Senior Instructor", assigned: ["Tajweed Basics"] },
    { name: "Sheikh Omar", role: "Hifz Coach", assigned: ["Juz 30 Memorization"] },
    { name: "Hafiz Usman", role: "Tajweed Instructor", assigned: ["Tajweed Basics", "Qaida"] },
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="hod" className="hidden md:flex w-64 shrink-0" />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        <Navbar title="Academic Command Center" onMenuClick={() => setSidebarOpen(true)} userName="Dr. Abdur Rahman" userRole="HOD" />

        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 bg-muted/30">
          <div className="max-w-[1600px] mx-auto space-y-10">
            
            {/* Header: Academic Authority */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-card border border-border p-8 rounded-[48px] shadow-2xl shadow-primary/5">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-[24px] bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-inner">
                     <GraduationCap size={32} />
                  </div>
                  <div>
                     <h1 className="text-3xl font-black text-foreground uppercase tracking-tight">Syllabus Control</h1>
                     <p className="text-[13px] font-bold text-muted-foreground mt-1 uppercase tracking-widest">Only HOD is authorized to upload and assign curriculum.</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <button className="h-14 px-8 bg-card border border-border rounded-2xl text-[12px] font-black uppercase tracking-widest hover:bg-muted transition-all flex items-center gap-2">
                     <Upload size={18} /> Upload New Outline
                  </button>
                  <button 
                    onClick={() => setAssignModalOpen(true)}
                    className="h-14 px-8 bg-primary text-white rounded-2xl text-[12px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2"
                  >
                     <UserCheck size={18} /> Assign to Faculty
                  </button>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
               
               {/* Outline Repository */}
               <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between px-4">
                     <h2 className="text-xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
                        <BookOpen size={20} className="text-primary" /> Official Course Outlines
                     </h2>
                     <div className="flex bg-card border border-border rounded-xl p-1 shadow-sm">
                        {["Library", "History"].map(tab => (
                           <button 
                             key={tab}
                             onClick={() => setActiveTab(tab)}
                             className={cn(
                               "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                               activeTab === tab ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-muted-foreground"
                             )}
                           >{tab}</button>
                        ))}
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {library.map((lib, i) => (
                        <div key={i} className="bg-card border border-border rounded-[40px] p-8 space-y-6 hover:border-primary transition-all group relative overflow-hidden">
                           <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all" />
                           <div className="flex items-start justify-between">
                              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                                 <FileText size={24} />
                              </div>
                              <span className="bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Authorized</span>
                           </div>
                           <div>
                              <h4 className="text-[17px] font-black text-foreground uppercase tracking-tight">{lib.title}</h4>
                              <p className="text-[12px] font-bold text-muted-foreground mt-1">{lib.category} • {lib.levels} Levels • {lib.topics} Topics</p>
                           </div>
                           <div className="flex items-center justify-between p-4 bg-muted/50 rounded-2xl">
                              <div className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">Active Assignments</div>
                              <div className="text-[15px] font-black text-primary">{lib.assigned} Teachers</div>
                           </div>
                           <div className="flex gap-3">
                              <button className="flex-1 h-11 border border-border rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-muted transition-all">Audit Content</button>
                              <button className="w-11 h-11 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                                 <Send size={18} />
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Faculty Assignment Status */}
               <div className="space-y-8">
                  <div className="bg-card border border-border rounded-[40px] p-8 shadow-2xl shadow-primary/5 space-y-8">
                     <h3 className="text-[15px] font-black text-foreground uppercase tracking-tight">Faculty Compliance</h3>
                     <div className="space-y-6">
                        {faculty.map((f, i) => (
                           <div key={i} className="flex items-start justify-between border-b border-border pb-6 last:border-0 last:pb-0">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black">{f.name[0]}</div>
                                 <div>
                                    <div className="text-[14px] font-black text-foreground">{f.name}</div>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                       {f.assigned.map((a, j) => (
                                          <span key={j} className="text-[8px] font-black text-primary bg-primary/5 px-1.5 py-0.5 rounded-md uppercase tracking-tight">{a}</span>
                                       ))}
                                    </div>
                                 </div>
                              </div>
                              <button className="text-muted-foreground hover:text-primary transition-all">
                                 <MoreVertical size={18} />
                              </button>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="bg-secondary p-8 rounded-[40px] text-white space-y-4 shadow-2xl shadow-primary/20">
                     <div className="flex items-center gap-3">
                        <ShieldCheck size={24} className="text-white" />
                        <h4 className="text-[15px] font-black uppercase tracking-tight">Compliance Alert</h4>
                     </div>
                     <p className="text-[11px] font-bold opacity-80 leading-relaxed uppercase tracking-tight">
                        Teachers are strictly prohibited from teaching external materials. Any deviation from the assigned HOD syllabus will trigger an automatic operational audit.
                     </p>
                  </div>
               </div>

            </div>

          </div>
        </main>
      </div>

      {/* Assignment Modal */}
      <AnimatePresence>
        {assignModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              onClick={() => setAssignModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative w-full max-w-xl bg-card border border-border rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 bg-primary/10 border-b border-border flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                  <UserCheck size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-foreground uppercase tracking-tight">Assign Course Outline</h3>
                  <p className="text-[13px] font-bold text-muted-foreground">Provision academic materials to faculty.</p>
                </div>
              </div>
              
              <div className="p-10 space-y-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Select Outline</label>
                   <select className="w-full h-14 bg-muted/50 border border-border rounded-2xl px-5 text-[15px] font-bold focus:border-primary outline-none">
                      <option>Tajweed Basics</option>
                      <option>Quran Reading (Qaida)</option>
                      <option>Surah Memorization</option>
                   </select>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Select Teacher(s)</label>
                   <div className="space-y-3 p-4 bg-muted/30 border border-border rounded-2xl h-48 overflow-y-auto custom-scrollbar">
                      {faculty.map((f, i) => (
                         <div key={i} className="flex items-center gap-3 p-2 hover:bg-white rounded-xl cursor-pointer transition-all border border-transparent hover:border-primary/20">
                            <input type="checkbox" className="w-4 h-4 accent-primary" />
                            <span className="text-[14px] font-black text-foreground">{f.name}</span>
                            <span className="text-[10px] font-bold text-muted-foreground ml-auto">{f.role}</span>
                         </div>
                      ))}
                   </div>
                </div>

                <div className="flex gap-4">
                   <button onClick={() => setAssignModalOpen(false)} className="flex-1 h-14 bg-muted border border-border rounded-2xl text-[14px] font-black uppercase tracking-widest">Cancel</button>
                   <button 
                     onClick={() => setAssignModalOpen(false)}
                     className="flex-[2] h-14 bg-primary text-white rounded-2xl text-[14px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                   >
                     Confirm Assignment <ChevronRight size={18} />
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
