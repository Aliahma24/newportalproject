"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  UserPlus, User, Phone, MapPin, Globe, Clock, BookOpen, 
  Plus, Trash2, Send, CheckCircle2, Info, ChevronDown, 
  ChevronLeft, Calendar as CalendarIcon, UserCheck, Users
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mock Data
const COUNTRIES = ["Pakistan", "United Kingdom", "USA", "Canada", "Saudi Arabia", "UAE"];
const TEACHERS = ["Hafiz Usman", "Ustadh Bilal", "Sheikh Omar", "Aisha Rahman", "Zainab Tariq"];
const SLOTS = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "05:00 PM", "06:00 PM"];

interface Student {
  name: string;
  age: string;
  level: string;
}

export default function EnrollmentForm() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [students, setStudents] = useState<Student[]>([
    { name: "", age: "", level: "Beginner" }
  ]);
  
  const [formData, setFormData] = useState({
    guardianName: "",
    guardianContact: "",
    address: "",
    country: "Pakistan",
    state: "",
    assignedSlot: "08:00 AM",
    assignedTeacher: "Hafiz Usman"
  });

  const addStudent = () => {
    setStudents([...students, { name: "", age: "", level: "Beginner" }]);
  };

  const removeStudent = (index: number) => {
    const newStudents = [...students];
    newStudents.splice(index, 1);
    setStudents(newStudents);
  };

  const updateStudent = (index: number, field: keyof Student, value: string) => {
    const newStudents = [...students];
    newStudents[index] = { ...newStudents[index], [field]: value };
    setStudents(newStudents);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="scheduler" className="hidden md:flex w-64 shrink-0" />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar title="Student Enrollment" onMenuClick={() => setSidebarOpen(true)} userName="Ahmed Khan" userRole="Lead Scheduler" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-muted/30 custom-scrollbar">
          <div className="max-w-5xl mx-auto">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card border border-border rounded-3xl p-12 shadow-xl shadow-primary/5 flex flex-col items-center text-center gap-6"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 shadow-inner">
                  <CheckCircle2 size={40} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">Registration Successful!</h2>
                  <p className="text-[14px] text-muted-foreground font-bold max-w-sm">
                    <strong>{formData.guardianName}</strong> and <strong>{students.length} student(s)</strong> have been successfully enrolled and assigned to <strong>{formData.assignedTeacher}</strong>.
                  </p>
                </div>
                <button 
                  onClick={() => { setSubmitted(false); setStudents([{ name: "", age: "", level: "Beginner" }]); }}
                  className="h-12 px-8 bg-primary text-white rounded-2xl text-[14px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                >
                  Enroll Another Student
                </button>
              </motion.div>
            ) : (
              <div className="bg-card border border-border rounded-[40px] shadow-2xl shadow-primary/5 overflow-hidden">
                {/* Header Section */}
                <div className="h-40 bg-primary relative overflow-hidden flex items-center px-10">
                  <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='none' stroke='%23ffffff' stroke-width='2'/%3E%3C/svg%3E")` }}
                  />
                  <div className="relative z-10 flex items-center gap-6 text-white">
                    <div className="w-16 h-16 rounded-[24px] bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30 shadow-2xl">
                      <UserPlus size={32} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black uppercase tracking-tighter">Master Enrollment</h2>
                      <p className="text-[14px] opacity-80 font-bold">Register new students and assign global slots</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-10 space-y-12">
                  
                  {/* Guardian & Location Section */}
                  <div className="space-y-8">
                    <h3 className="text-[16px] font-black text-foreground flex items-center gap-3 uppercase tracking-tight">
                      <User size={20} className="text-primary" /> Guardian & Location Details
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Full Guardian Name</label>
                        <input 
                          required type="text" placeholder="e.g. Ibrahim Ali"
                          className="w-full h-14 bg-muted/30 border border-border rounded-2xl px-5 text-[15px] font-bold focus:border-primary outline-none transition-all"
                          value={formData.guardianName}
                          onChange={e => setFormData({...formData, guardianName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Guardian Contact (WhatsApp)</label>
                        <div className="relative">
                          <Phone size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" />
                          <input 
                            required type="tel" placeholder="+92 3XX XXXXXXX"
                            className="w-full h-14 bg-muted/30 border border-border rounded-2xl pl-12 pr-5 text-[15px] font-bold focus:border-primary outline-none transition-all"
                            value={formData.guardianContact}
                            onChange={e => setFormData({...formData, guardianContact: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Country</label>
                        <div className="relative">
                          <Globe size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" />
                          <select 
                            className="w-full h-14 bg-muted/30 border border-border rounded-2xl pl-12 pr-5 text-[15px] font-bold text-foreground focus:border-primary outline-none appearance-none"
                            value={formData.country}
                            onChange={e => setFormData({...formData, country: e.target.value})}
                          >
                            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                          <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">State / Province</label>
                        <input 
                          required type="text" placeholder="e.g. Punjab"
                          className="w-full h-14 bg-muted/30 border border-border rounded-2xl px-5 text-[15px] font-bold focus:border-primary outline-none transition-all"
                          value={formData.state}
                          onChange={e => setFormData({...formData, state: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Address</label>
                        <div className="relative">
                          <MapPin size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" />
                          <input 
                            required type="text" placeholder="Street, City"
                            className="w-full h-14 bg-muted/30 border border-border rounded-2xl pl-12 pr-5 text-[15px] font-bold focus:border-primary outline-none transition-all"
                            value={formData.address}
                            onChange={e => setFormData({...formData, address: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Multi-Student Section */}
                  <div className="space-y-8 border-t border-border pt-12">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[16px] font-black text-foreground flex items-center gap-3 uppercase tracking-tight">
                        <Users size={20} className="text-primary" /> Student Information
                      </h3>
                      <button 
                        type="button" onClick={addStudent}
                        className="flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-2xl text-[12px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm"
                      >
                        <Plus size={16} /> Add Another Kid
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      {students.map((student, index) => (
                        <motion.div 
                          layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                          key={index} className="p-8 bg-muted/10 border border-border rounded-[32px] space-y-6 relative group/item hover:bg-muted/20 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-black text-primary uppercase tracking-[0.2em]">Student #{index + 1} Profile</span>
                            {students.length > 1 && (
                              <button 
                                type="button" onClick={() => removeStudent(index)}
                                className="w-10 h-10 flex items-center justify-center rounded-xl text-destructive bg-destructive/10 hover:bg-destructive hover:text-white transition-all shadow-sm"
                              >
                                <Trash2 size={18} />
                              </button>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Student Full Name</label>
                              <input 
                                required type="text" placeholder="Kid's Name"
                                className="w-full h-12 bg-card border border-border rounded-2xl px-5 text-[14px] font-bold focus:border-primary outline-none transition-all"
                                value={student.name}
                                onChange={e => updateStudent(index, "name", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Age</label>
                              <input 
                                required type="number" placeholder="Years"
                                className="w-full h-12 bg-card border border-border rounded-2xl px-5 text-[14px] font-bold focus:border-primary outline-none transition-all"
                                value={student.age}
                                onChange={e => updateStudent(index, "age", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Learning Level</label>
                              <div className="relative">
                                <select 
                                  className="w-full h-12 bg-card border border-border rounded-2xl px-5 text-[14px] font-bold text-foreground focus:border-primary outline-none appearance-none"
                                  value={student.level}
                                  onChange={e => updateStudent(index, "level", e.target.value)}
                                >
                                  <option value="Beginner">Beginner</option>
                                  <option value="Intermediate">Intermediate</option>
                                  <option value="Advanced">Advanced</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Assignment Section */}
                  <div className="space-y-8 border-t border-border pt-12">
                    <h3 className="text-[16px] font-black text-foreground flex items-center gap-3 uppercase tracking-tight">
                      <UserCheck size={20} className="text-primary" /> Assignment & Scheduling
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Assigned Slot</label>
                        <div className="relative">
                          <Clock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" />
                          <select 
                            className="w-full h-14 bg-muted/30 border border-border rounded-2xl pl-12 pr-5 text-[15px] font-bold text-foreground focus:border-primary outline-none appearance-none"
                            value={formData.assignedSlot}
                            onChange={e => setFormData({...formData, assignedSlot: e.target.value})}
                          >
                            {SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Assigned Teacher</label>
                        <div className="relative">
                          <UserCheck size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" />
                          <select 
                            className="w-full h-14 bg-muted/30 border border-border rounded-2xl pl-12 pr-5 text-[15px] font-bold text-foreground focus:border-primary outline-none appearance-none"
                            value={formData.assignedTeacher}
                            onChange={e => setFormData({...formData, assignedTeacher: e.target.value})}
                          >
                            {TEACHERS.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                          <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submission */}
                  <div className="pt-12">
                    <button 
                      type="submit"
                      className="w-full h-20 bg-primary text-white rounded-[28px] text-[20px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-5 shadow-2xl shadow-primary/30 hover:bg-primary/90 hover:-translate-y-1 transition-all active:scale-[0.98] group"
                    >
                      <Send size={28} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" /> 
                      Finalize Enrollment
                    </button>
                    <div className="mt-8 flex items-center justify-center gap-3 text-[12px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                      <Info size={16} className="text-primary" /> Class will be active in the next sync cycle
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
