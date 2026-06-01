"use client";

import React, { useState } from "react";
import { 
  User, Phone, MapPin, Briefcase, Award, Clock, 
  Upload, CheckCircle2, ChevronRight, FileText, 
  Globe, Languages, Star, ShieldCheck, ArrowLeft,
  X, Plus
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function NewTeacherEnrollment() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    contact: "",
    altContact: "",
    address: "",
    shift: "Evening",
    salary: "",
    englishLevel: "B2 - Upper Intermediate",
    tajweedLevel: "Expert",
    grade: "A",
    type: "Online",
    courses: ["Qaida", "Tajweed"],
    contractImage: null as File | null
  });

  const COURSES = ["Qaida", "Tajweed", "Hifz", "Arabic Language", "Islamic Studies", "Tafseer"];
  const GRADES = [
    { id: "A", label: "Grade A", desc: "Top Performance" },
    { id: "B", label: "Grade B", desc: "Standard Performance" },
    { id: "C", label: "Grade C", desc: "Needs Improvement" }
  ];

  const handleCourseToggle = (course: string) => {
    setFormData(prev => ({
      ...prev,
      courses: prev.courses.includes(course) 
        ? prev.courses.filter(c => c !== course)
        : [...prev.courses, course]
    }));
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="hod" className="hidden md:flex w-64 shrink-0" />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        <Navbar 
          title="Teacher Onboarding" 
          onMenuClick={() => setSidebarOpen(true)}
          userName="Dr. Abdur Rahman"
          userRole="HOD"
        />

        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-10">
              <div>
                <Link href="/dashboard/hod" className="flex items-center gap-2 text-[12px] font-black text-muted-foreground uppercase tracking-widest hover:text-primary transition-all mb-4">
                  <ArrowLeft size={14} /> Back to Compliance
                </Link>
                <h1 className="text-4xl font-black text-foreground uppercase tracking-tight">Faculty Onboarding</h1>
                <p className="text-[14px] font-bold text-muted-foreground mt-2">Initialize a new teacher profile with full contract and skill audit.</p>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className={cn(
                    "h-2 rounded-full transition-all duration-500",
                    step === i ? "w-10 bg-primary" : "w-3 bg-primary/20"
                  )} />
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-[40px] shadow-2xl shadow-primary/5 overflow-hidden">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div 
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-8 md:p-12"
                  >
                    {step === 1 && (
                      <div className="space-y-8">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-inner">
                            <User size={20} />
                          </div>
                          <h3 className="text-xl font-black text-foreground uppercase tracking-tight">Personal & Contact Bio</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Full Legal Name</label>
                            <input 
                              type="text" placeholder="e.g. Hafiz Muhammad Usman"
                              className="w-full h-14 bg-muted/50 border border-border rounded-2xl px-5 text-[15px] font-bold focus:border-primary outline-none transition-all"
                              value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Age</label>
                            <input 
                              type="number" placeholder="Teacher age"
                              className="w-full h-14 bg-muted/50 border border-border rounded-2xl px-5 text-[15px] font-bold focus:border-primary outline-none transition-all"
                              value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Primary WhatsApp</label>
                            <div className="relative">
                              <Phone size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" />
                              <input 
                                type="text" placeholder="+92 3XX XXXXXXX"
                                className="w-full h-14 bg-muted/50 border border-border rounded-2xl pl-12 pr-5 text-[15px] font-bold focus:border-primary outline-none transition-all"
                                value={formData.contact} onChange={(e) => setFormData({...formData, contact: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Alternative Contact</label>
                            <div className="relative">
                              <Phone size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                              <input 
                                type="text" placeholder="Guardian or Home number"
                                className="w-full h-14 bg-muted/50 border border-border rounded-2xl pl-12 pr-5 text-[15px] font-bold focus:border-primary outline-none transition-all"
                                value={formData.altContact} onChange={(e) => setFormData({...formData, altContact: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Residential Address</label>
                            <div className="relative">
                              <MapPin size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" />
                              <input 
                                type="text" placeholder="Full permanent address"
                                className="w-full h-14 bg-muted/50 border border-border rounded-2xl pl-12 pr-5 text-[15px] font-bold focus:border-primary outline-none transition-all"
                                value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end pt-4">
                          <button 
                            onClick={nextStep}
                            className="h-14 px-10 bg-primary text-white rounded-2xl text-[14px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2"
                          >
                            Work Logistics <ChevronRight size={18} />
                          </button>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-8">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-inner">
                            <Briefcase size={20} />
                          </div>
                          <h3 className="text-xl font-black text-foreground uppercase tracking-tight">Work & Compliance</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Shift Type</label>
                            <div className="flex gap-2">
                              {["Online", "Physical"].map(t => (
                                <button 
                                  key={t}
                                  onClick={() => setFormData({...formData, type: t})}
                                  className={cn(
                                    "flex-1 h-14 rounded-2xl text-[13px] font-black uppercase tracking-widest border transition-all",
                                    formData.type === t ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                                  )}
                                >
                                  {t} Faculty
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Salary (PKR)</label>
                            <input 
                              type="text" placeholder="Monthly basic salary"
                              className="w-full h-14 bg-muted/50 border border-border rounded-2xl px-5 text-[15px] font-bold focus:border-primary outline-none transition-all"
                              value={formData.salary} onChange={(e) => setFormData({...formData, salary: e.target.value})}
                            />
                          </div>
                          
                          <div className="md:col-span-2 space-y-4">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Employment Contract</label>
                            <div className="border-2 border-dashed border-border rounded-3xl p-10 flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-all bg-muted/20">
                              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <Upload size={32} />
                              </div>
                              <div className="text-center">
                                <p className="text-[15px] font-black text-foreground uppercase">Upload Signed Contract</p>
                                <p className="text-[12px] font-bold text-muted-foreground mt-1">Image or PDF allowed (Max 5MB)</p>
                              </div>
                              <input type="file" className="hidden" id="contract-upload" />
                              <label htmlFor="contract-upload" className="h-10 px-6 bg-white border border-border rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-muted cursor-pointer flex items-center">
                                Select File
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                          <button onClick={prevStep} className="h-14 px-8 border border-border rounded-2xl text-[14px] font-black uppercase tracking-widest hover:bg-muted transition-all">Back</button>
                          <button 
                            onClick={nextStep}
                            className="h-14 px-10 bg-primary text-white rounded-2xl text-[14px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2"
                          >
                            Skill Audit <ChevronRight size={18} />
                          </button>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-8">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-inner">
                            <Award size={20} />
                          </div>
                          <h3 className="text-xl font-black text-foreground uppercase tracking-tight">Professional Skill Grading</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Professional Grade</label>
                            <div className="grid grid-cols-3 gap-2">
                              {GRADES.map(g => (
                                <button 
                                  key={g.id}
                                  onClick={() => setFormData({...formData, grade: g.id})}
                                  className={cn(
                                    "flex flex-col items-center justify-center h-20 rounded-2xl border transition-all gap-1",
                                    formData.grade === g.id ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-muted/50 border-border text-muted-foreground"
                                  )}
                                >
                                  <span className="text-xl font-black">{g.id}</span>
                                  <span className="text-[8px] font-black uppercase tracking-tight opacity-80">{g.desc}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">English Proficiency</label>
                            <select 
                              className="w-full h-14 bg-muted/50 border border-border rounded-2xl px-5 text-[15px] font-bold focus:border-primary outline-none transition-all"
                              value={formData.englishLevel} onChange={(e) => setFormData({...formData, englishLevel: e.target.value})}
                            >
                              <option>A1 - Beginner</option>
                              <option>A2 - Elementary</option>
                              <option>B1 - Intermediate</option>
                              <option>B2 - Upper Intermediate</option>
                              <option>C1 - Advanced</option>
                            </select>
                          </div>

                          <div className="md:col-span-2 space-y-4">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Teaching Specializations</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                              {COURSES.map(c => (
                                <button 
                                  key={c}
                                  onClick={() => handleCourseToggle(c)}
                                  className={cn(
                                    "h-12 rounded-xl text-[11px] font-black uppercase tracking-widest border transition-all flex items-center justify-center gap-2 px-4",
                                    formData.courses.includes(c) ? "bg-primary/10 border-primary text-primary" : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                                  )}
                                >
                                  {formData.courses.includes(c) ? <CheckCircle2 size={14} /> : <Plus size={14} />}
                                  {c}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Tajweed Evaluation</label>
                            <div className="flex gap-4">
                              {["Standard", "Intermediate", "Expert", "Ijazah Holder"].map(t => (
                                <button 
                                  key={t}
                                  onClick={() => setFormData({...formData, tajweedLevel: t})}
                                  className={cn(
                                    "flex-1 h-12 rounded-xl text-[11px] font-black uppercase tracking-widest border transition-all",
                                    formData.tajweedLevel === t ? "bg-emerald-500/10 border-emerald-500 text-emerald-600" : "bg-muted/50 border-border text-muted-foreground"
                                  )}
                                >
                                  {t}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                          <button onClick={prevStep} className="h-14 px-8 border border-border rounded-2xl text-[14px] font-black uppercase tracking-widest hover:bg-muted transition-all">Back</button>
                          <button 
                            onClick={() => setIsSubmitted(true)}
                            className="h-14 px-12 bg-primary text-white rounded-2xl text-[14px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2"
                          >
                            Finalize Enrollment <ShieldCheck size={18} />
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-12 text-center space-y-6"
                  >
                    <div className="w-24 h-24 rounded-[32px] bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto shadow-inner border border-emerald-500/20">
                      <CheckCircle2 size={48} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-foreground uppercase tracking-tight">Faculty Member Enrolled</h2>
                      <p className="text-muted-foreground font-bold mt-2">
                        {formData.name} has been added to the **Grade {formData.grade}** list. <br/>
                        A notification has been sent to HR for salary initialization.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                      <Link href="/dashboard/hod" className="w-full sm:w-auto h-14 px-10 bg-primary text-white rounded-2xl text-[13px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                        Back to HOD Dashboard
                      </Link>
                      <button 
                        onClick={() => { setStep(1); setIsSubmitted(false); }}
                        className="w-full sm:w-auto h-14 px-10 bg-muted border border-border rounded-2xl text-[13px] font-black uppercase tracking-widest hover:bg-muted/80 transition-all"
                      >
                        Enroll Another Teacher
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
