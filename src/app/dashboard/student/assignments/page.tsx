"use client";

import React, { useState } from "react";
import { 
  Search, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Paperclip, 
  Info, 
  CheckSquare, 
  Upload, 
  FileAudio, 
  Play, 
  Download, 
  UploadCloud, 
  Check,
  X,
  ChevronRight
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  assignedDate: string;
  dueDate: string;
  submittedDate?: string;
  status: "Pending" | "Submitted" | "Late";
  marks?: number;
  totalMarks: number;
  instructions: string;
}

export default function StudentAssignments() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("1");
  const [filter, setFilter] = useState<"All" | "Pending" | "Submitted" | "Late">("All");

  const assignments: Assignment[] = [
    { 
      id: "1", 
      title: "Surah Al-Baqarah (v. 100-110)", 
      subject: "Quran Recitation", 
      teacher: "Ustadha Aisha", 
      assignedDate: "Oct 20, 2026", 
      dueDate: "Oct 25, 2026", 
      status: "Pending", 
      totalMarks: 10,
      instructions: "Please record an audio of your recitation for Surah Al-Baqarah from verse 100 to 110. Ensure you apply the rules of Ghunnah and Qalqalah discussed in the last class. Take your time to practice before recording to ensure correct pronunciation (Makharij). Listen to the reference audio provided above before making your final recording."
    },
    { 
      id: "2", 
      title: "Tajweed Quiz #4", 
      subject: "Tajweed Rules", 
      teacher: "Ustadh Bilal", 
      assignedDate: "Oct 22, 2026", 
      dueDate: "Oct 26, 2026", 
      status: "Pending", 
      totalMarks: 20,
      instructions: "Complete the online quiz covering the rules of Madd and its types. You have 30 minutes to complete the quiz once started."
    },
    { 
      id: "3", 
      title: "Memorization Test - Juz 30", 
      subject: "Hifz", 
      teacher: "Hafiz Usman", 
      assignedDate: "Oct 15, 2026", 
      dueDate: "Oct 18, 2026", 
      submittedDate: "Oct 17, 2026",
      status: "Submitted", 
      totalMarks: 50,
      instructions: "Recite the last 10 Surahs of Juz 30 from memory. Pay attention to the rhythm and stop signs."
    },
    { 
      id: "4", 
      title: "Makharij Practice Audio", 
      subject: "Tajweed Rules", 
      teacher: "Ustadh Bilal", 
      assignedDate: "Oct 10, 2026", 
      dueDate: "Oct 14, 2026", 
      status: "Late", 
      totalMarks: 15,
      instructions: "Record yourself pronouncing the heavy letters (Huroof-e-Mustaliya) in different vowel states."
    },
    { 
      id: "5", 
      title: "Surah Al-Kahf (v. 1-10) Revision", 
      subject: "Quran Recitation", 
      teacher: "Ustadha Aisha", 
      assignedDate: "Oct 05, 2026", 
      dueDate: "Oct 08, 2026", 
      submittedDate: "Oct 08, 2026",
      status: "Submitted", 
      totalMarks: 10,
      instructions: "Revise the first 10 verses of Surah Al-Kahf. Focus on the Tajweed of the opening verses."
    },
    { 
      id: "6", 
      title: "Daily Dua Recording (Waking Up)", 
      subject: "Islamic Studies", 
      teacher: "Hafiz Usman", 
      assignedDate: "Oct 23, 2026", 
      dueDate: "Oct 28, 2026", 
      status: "Pending", 
      totalMarks: 5,
      instructions: "Memorize and record the dua for waking up with its translation."
    },
  ];

  const filteredAssignments = assignments.filter(a => filter === "All" || a.status === filter);
  const selectedAssignment = assignments.find(a => a.id === selectedId) || assignments[0];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <Sidebar role="student" className="hidden md:flex w-64 shrink-0" />

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-72 h-full animate-in slide-in-from-left duration-300">
            <Sidebar role="student" className="w-full" />
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
          title="Assignments" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Omar Farooq"
          userRole="Hifz Student"
          userAvatar="https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FMiddle%20Eastern%2F1"
          hideSearch
        />

        <main className="flex-1 overflow-hidden flex bg-slate-50/30 p-6 md:p-8 gap-6">
          
          {/* Left Panel: Assignments List */}
          <div className="w-full md:w-[400px] lg:w-[460px] flex flex-col gap-5 shrink-0 overflow-hidden">
            {/* Search */}
            <div className="bg-card border border-border rounded-lg px-4 h-11 flex items-center gap-3 shadow-sm shrink-0">
              <Search size={18} className="text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search assignments..." 
                className="flex-1 bg-transparent border-none text-[14px] outline-none placeholder:text-muted-foreground/60 font-medium"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2.5 overflow-x-auto custom-scrollbar pb-2 shrink-0">
              {["All", "Pending", "Submitted", "Late"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={cn(
                    "px-5 py-1.5 rounded-full text-[13px] font-bold whitespace-nowrap transition-all border shrink-0",
                    filter === f 
                      ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20" 
                      : "bg-card text-muted-foreground border-border hover:border-primary/30"
                  )}
                >
                  {f} {f === "All" ? `(${assignments.length})` : `(${assignments.filter(a => a.status === f).length})`}
                </button>
              ))}
            </div>

            {/* Cards List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3.5 pr-1">
              {filteredAssignments.map(assignment => (
                <div 
                  key={assignment.id}
                  onClick={() => setSelectedId(assignment.id)}
                  className={cn(
                    "bg-card border rounded-xl p-5 flex flex-col gap-3.5 cursor-pointer transition-all shadow-sm",
                    selectedId === assignment.id ? "border-primary ring-1 ring-primary/20 bg-primary/[0.01]" : "border-border hover:border-primary/30"
                  )}
                >
                  <div className="flex justify-between items-start gap-3">
                    <h3 className="text-[15px] font-bold text-foreground leading-tight">{assignment.title}</h3>
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0",
                      assignment.status === "Pending" && "bg-amber-500/10 text-amber-600",
                      assignment.status === "Submitted" && "bg-emerald-500/10 text-emerald-600",
                      assignment.status === "Late" && "bg-rose-500/10 text-rose-600"
                    )}>
                      {assignment.status}
                    </span>
                  </div>
                  <div className="text-[13px] font-semibold text-muted-foreground">
                    {assignment.subject} • {assignment.teacher}
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <div className="flex items-center gap-1.5 text-[12px] font-bold text-muted-foreground">
                      <Calendar size={14} />
                      Assigned: {assignment.assignedDate.split(',')[0]}
                    </div>
                    <div className={cn(
                      "flex items-center gap-1.5 text-[12px] font-bold",
                      assignment.status === "Pending" ? "text-primary" : "text-muted-foreground",
                      assignment.status === "Late" && "text-rose-500"
                    )}>
                      {assignment.status === "Submitted" ? (
                        <>
                          <CheckCircle size={14} />
                          Submitted: {assignment.submittedDate?.split(',')[0]}
                        </>
                      ) : (
                        <>
                          {assignment.status === "Late" ? <AlertCircle size={14} /> : <Clock size={14} />}
                          Due: {assignment.dueDate.split(',')[0]}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: Detail View */}
          <div className="hidden md:flex flex-1 bg-card border border-border rounded-xl shadow-sm flex-col overflow-hidden">
            {/* Header */}
            <div className="p-7 lg:p-8 border-b border-border space-y-6">
              <div className="space-y-1.5">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">{selectedAssignment.title}</h2>
                <div className="text-[14px] font-semibold text-muted-foreground">
                  {selectedAssignment.subject} • {selectedAssignment.teacher}
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 bg-slate-50 p-4 rounded-xl border border-border/50">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Status</span>
                  <span className={cn(
                    "w-fit px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider",
                    selectedAssignment.status === "Pending" && "bg-amber-500/10 text-amber-600",
                    selectedAssignment.status === "Submitted" && "bg-emerald-500/10 text-emerald-600",
                    selectedAssignment.status === "Late" && "bg-rose-500/10 text-rose-600"
                  )}>
                    {selectedAssignment.status}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Due Date</span>
                  <span className={cn("text-[13px] font-bold", selectedAssignment.status === "Pending" ? "text-primary" : "text-foreground")}>
                    {selectedAssignment.dueDate}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Assigned</span>
                  <span className="text-[13px] font-bold text-foreground">{selectedAssignment.assignedDate}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total Marks</span>
                  <span className="text-[13px] font-bold text-foreground">{selectedAssignment.totalMarks} Points</span>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-7 lg:p-8 space-y-8 bg-slate-50/20">
              
              {/* Reference Materials */}
              <div className="space-y-4">
                <h3 className="text-[16px] font-bold text-foreground flex items-center gap-2.5">
                  <Paperclip size={18} className="text-primary" />
                  Reference Materials
                </h3>
                <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 shadow-sm group transition-all hover:border-primary/30">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                    <FileAudio size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-bold text-foreground truncate">Teacher_Recitation_Baqarah.mp3</div>
                    <div className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">Audio File • 2.4 MB</div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button className="h-9 px-3.5 border border-primary text-primary rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-primary/5 transition-all">
                      <Play size={14} /> Listen
                    </button>
                    <button className="h-9 px-3.5 border border-primary text-primary rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-primary/5 transition-all">
                      <Download size={14} /> Download
                    </button>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-4">
                <h3 className="text-[16px] font-bold text-foreground flex items-center gap-2.5">
                  <Info size={18} className="text-primary" />
                  Instructions
                </h3>
                <div className="bg-card border border-border p-6 rounded-xl shadow-sm text-[15px] leading-relaxed text-foreground/80 font-medium italic">
                  {selectedAssignment.instructions}
                </div>
              </div>

              {/* Grading Rubric */}
              <div className="space-y-4">
                <h3 className="text-[16px] font-bold text-foreground flex items-center gap-2.5">
                  <CheckSquare size={18} className="text-primary" />
                  Grading Criteria
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Tajweed & Makharij", pts: 5 },
                    { label: "Fluency & Rhythm", pts: 3 },
                    { label: "Memorization Accuracy", pts: 2 }
                  ].map((r, i) => (
                    <div key={i} className="bg-card border border-border p-4 rounded-xl flex flex-col items-center gap-2 text-center shadow-sm">
                      <span className="text-[13px] font-bold text-foreground">{r.label}</span>
                      <span className="text-[15px] font-bold text-primary">{r.pts} Points</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submission Area */}
              <div className="space-y-5">
                <h3 className="text-[16px] font-bold text-foreground flex items-center gap-2.5">
                  <Upload size={18} className="text-primary" />
                  Your Submission
                </h3>
                <div className="space-y-3">
                  <label className="text-[13px] font-bold text-foreground">Add a note to your teacher (Optional)</label>
                  <textarea 
                    placeholder="E.g., I struggled a bit with verse 105, please let me know if it sounds correct..."
                    className="w-full h-24 bg-card border border-border rounded-xl p-4 text-[14px] font-medium outline-none focus:border-primary transition-all resize-none shadow-sm"
                  />
                </div>
                <div className="bg-card border-2 border-dashed border-border rounded-xl p-10 flex flex-col items-center justify-center text-center gap-5 cursor-pointer hover:border-primary/50 transition-all group">
                  <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <UploadCloud size={28} />
                  </div>
                  <div>
                    <div className="text-[15px] font-bold text-foreground">Drag & drop your file here or click to browse</div>
                    <div className="text-[13px] font-semibold text-muted-foreground mt-1">Supported formats: .mp3, .m4a, .pdf (Max 10MB)</div>
                  </div>
                  <button className="h-10 px-6 border border-primary text-primary rounded-lg font-bold text-[13px] flex items-center gap-2 group-hover:bg-primary group-hover:text-white transition-all">
                    <FileAudio size={18} /> Select File
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 lg:px-8 border-t border-border flex justify-end gap-4 shrink-0 bg-card shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
              <button className="w-36 h-11 border border-border rounded-xl font-bold text-[13px] hover:bg-muted transition-all">
                Cancel
              </button>
              <button className="w-52 h-11 bg-primary text-primary-foreground rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                <Check size={18} /> Submit Assignment
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
