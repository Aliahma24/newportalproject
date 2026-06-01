"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ClipboardList, User, Phone, Calendar as CalendarIcon, Clock, BookOpen,
  ChevronRight, Send, CheckCircle2, UserPlus, Info, Plus, Trash2, Globe,
  ChevronLeft, ChevronDown
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence } from "framer-motion";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, eachDayOfInterval } from "date-fns";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Premium Time Picker (Shadcn Style)
function PremiumTimePicker({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [h, m] = value.split(':');
  let hourNum = parseInt(h);
  const period = hourNum >= 12 ? "PM" : "AM";
  const displayHour = (hourNum % 12 || 12).toString().padStart(2, '0');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const setTime = (newH: number, newM: number, newP: string) => {
    let finalH = newH;
    if (newP === "PM" && finalH < 12) finalH += 12;
    if (newP === "AM" && finalH === 12) finalH = 0;
    onChange(`${finalH.toString().padStart(2, '0')}:${newM.toString().padStart(2, '0')}`);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-12 bg-muted/30 border border-border rounded-xl px-4 flex items-center justify-between hover:border-primary transition-all group focus:ring-2 focus:ring-primary/20 outline-none"
      >
        <div className="flex items-center gap-3">
          <Clock size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="text-[14px] font-bold text-foreground">{displayHour}:{m} {period}</span>
        </div>
        <ChevronDown size={16} className={cn("text-muted-foreground transition-transform duration-300", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 mt-2 w-full bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-2xl z-50 p-4 overflow-hidden"
          >
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <p className="text-[9px] font-bold text-muted-foreground uppercase text-center">Hour</p>
                <div className="h-32 overflow-y-auto custom-scrollbar space-y-1 px-1">
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(hour => (
                    <button
                      key={hour}
                      type="button"
                      onClick={() => setTime(hour, parseInt(m), period)}
                      className={cn(
                        "w-full py-1.5 rounded-lg text-[13px] font-bold transition-all",
                        parseInt(displayHour) === hour ? "bg-primary text-white" : "hover:bg-muted"
                      )}
                    >
                      {hour.toString().padStart(2, '0')}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[9px] font-bold text-muted-foreground uppercase text-center">Min</p>
                <div className="h-32 overflow-y-auto custom-scrollbar space-y-1 px-1">
                  {["00", "15", "30", "45"].map(min => (
                    <button
                      key={min}
                      type="button"
                      onClick={() => setTime(parseInt(displayHour), parseInt(min), period)}
                      className={cn(
                        "w-full py-1.5 rounded-lg text-[13px] font-bold transition-all",
                        m === min ? "bg-primary text-white" : "hover:bg-muted"
                      )}
                    >
                      {min}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[9px] font-bold text-muted-foreground uppercase text-center">Period</p>
                <div className="space-y-2">
                  {["AM", "PM"].map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setTime(parseInt(displayHour), parseInt(m), p)}
                      className={cn(
                        "w-full py-3 rounded-xl text-[13px] font-bold transition-all",
                        period === p ? "bg-primary text-white" : "bg-muted hover:bg-muted/80"
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button 
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full mt-4 h-10 bg-primary/10 text-primary border border-primary/20 rounded-xl text-[12px] font-bold hover:bg-primary hover:text-white transition-all shadow-sm"
            >
              Set Time
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Premium Date Picker (Shadcn Style)
function PremiumDatePicker({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value ? new Date(value) : new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(viewDate)),
    end: endOfWeek(endOfMonth(viewDate))
  });

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-12 bg-muted/30 border border-border rounded-xl px-4 flex items-center justify-between hover:border-primary transition-all group focus:ring-2 focus:ring-primary/20 outline-none"
      >
        <div className="flex items-center gap-3">
          <CalendarIcon size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="text-[14px] font-bold text-foreground">
            {value ? format(new Date(value), "PPP") : "Select date"}
          </span>
        </div>
        <ChevronDown size={16} className={cn("text-muted-foreground transition-transform duration-300", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 mt-2 w-80 bg-card/90 backdrop-blur-xl border border-border rounded-3xl shadow-2xl z-50 p-5"
          >
            <div className="flex items-center justify-between mb-6">
              <button type="button" onClick={() => setViewDate(subMonths(viewDate, 1))} className="p-2 hover:bg-muted rounded-xl transition-colors"><ChevronLeft size={20} /></button>
              <div className="text-[14px] font-extrabold text-foreground uppercase tracking-wider">{format(viewDate, "MMMM yyyy")}</div>
              <button type="button" onClick={() => setViewDate(addMonths(viewDate, 1))} className="p-2 hover:bg-muted rounded-xl transition-colors"><ChevronRight size={20} /></button>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-4">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                <div key={d} className="text-center text-[11px] font-bold text-primary/60 uppercase tracking-widest">{d}</div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, i) => {
                const isSelected = value && isSameDay(day, new Date(value));
                const isToday = isSameDay(day, new Date());
                const isCurrentMonth = isSameMonth(day, viewDate);
                
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      onChange(format(day, "yyyy-MM-dd"));
                      setIsOpen(false);
                    }}
                    className={cn(
                      "h-9 w-9 rounded-xl text-[12px] font-bold flex items-center justify-center transition-all relative group",
                      isSelected ? "bg-primary text-white shadow-lg shadow-primary/30 scale-110 z-10" : 
                      isToday ? "text-primary bg-primary/10" : 
                      isCurrentMonth ? "text-foreground hover:bg-muted" : "text-muted-foreground/30 hover:bg-muted/50"
                    )}
                  >
                    {format(day, "d")}
                    {isToday && !isSelected && <div className="absolute bottom-1 w-1 h-1 bg-primary rounded-full" />}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-border flex justify-center">
              <button 
                type="button"
                onClick={() => {
                  onChange(format(new Date(), "yyyy-MM-dd"));
                  setIsOpen(false);
                }}
                className="text-[11px] font-bold text-primary hover:underline"
              >
                Go to Today
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Country list with timezone data
const COUNTRIES = [
  { name: "Pakistan", timezone: "Asia/Karachi", code: "PK" },
  { name: "United Kingdom", timezone: "Europe/London", code: "GB" },
  { name: "United States (EST)", timezone: "America/New_York", code: "US" },
  { name: "United Arab Emirates", timezone: "Asia/Dubai", code: "AE" },
  { name: "Saudi Arabia", timezone: "Asia/Riyadh", code: "SA" },
  { name: "Canada (EST)", timezone: "America/Toronto", code: "CA" },
  { name: "Australia (AEST)", timezone: "Australia/Sydney", code: "AU" },
  { name: "Germany", timezone: "Europe/Berlin", code: "DE" },
];

interface Student {
  name: string;
  age: string;
  level: string;
  specialInstructions: string;
}

export default function DemoRequestForm() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [isSelfStudent, setIsSelfStudent] = useState(false);
  const [students, setStudents] = useState<Student[]>([
    { name: "", age: "", level: "Beginner", specialInstructions: "" }
  ]);
  
  const [formData, setFormData] = useState({
    guardianName: "",
    whatsapp: "",
    country: "Pakistan",
    demoDate: format(new Date(), "yyyy-MM-dd"),
    demoTime: "17:00",
    days: "Mon-Thu",
    selfSpecialInstructions: "",
    selfLevel: "Beginner"
  });

  const [pakistanTime, setPakistanTime] = useState<string>("");

  useEffect(() => {
    if (formData.demoTime && formData.country) {
      try {
        const countryData = COUNTRIES.find(c => c.name === formData.country);
        if (!countryData) return;

        const pktFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });

        const date = new Date();
        const localDate = new Date(date.toLocaleString('en-US', { timeZone: countryData.timezone }));
        const pktDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Karachi' }));
        const diffMs = pktDate.getTime() - localDate.getTime();
        
        const [h, m] = formData.demoTime.split(':').map(Number);
        const localTimeWithDate = new Date();
        localTimeWithDate.setHours(h, m, 0);
        
        const convertedPktDate = new Date(localTimeWithDate.getTime() + diffMs);
        setPakistanTime(pktFormatter.format(convertedPktDate));
      } catch (e) {
        console.error("Time conversion error", e);
      }
    }
  }, [formData.demoTime, formData.country]);

  const addStudent = () => {
    setStudents([...students, { name: "", age: "", level: "Beginner", specialInstructions: "" }]);
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

  const format12Hour = (time24: string) => {
    if (!time24) return "--:--";
    const [h, m] = time24.split(':').map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${period}`;
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="csr" className="hidden md:flex w-64 shrink-0" />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar title="New Demo Request" onMenuClick={() => setSidebarOpen(true)} userName="Zoya Ahmed" userRole="CSR" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-muted/30 custom-scrollbar">
          <div className="max-w-4xl mx-auto">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card border border-border rounded-3xl p-12 shadow-xl shadow-primary/5 flex flex-col items-center text-center gap-6"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500">
                  <CheckCircle2 size={40} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">Request Captured!</h2>
                  <p className="text-[14px] text-muted-foreground font-medium max-w-sm">
                    {isSelfStudent ? (
                      <><strong>{formData.guardianName}</strong> has been added for self-enrollment.</>
                    ) : (
                      <><strong>{students.length} students</strong> have been added under <strong>{formData.guardianName}</strong>.</>
                    )}
                  </p>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      setSubmitted(false);
                      setStudents([{ name: "", age: "", level: "Beginner", specialInstructions: "" }]);
                      setIsSelfStudent(false);
                    }}
                    className="h-11 px-8 border border-primary text-primary rounded-xl text-[14px] font-bold hover:bg-primary/5 transition-all"
                  >
                    Add Another Request
                  </button>
                  <button className="h-11 px-8 bg-primary text-white rounded-xl text-[14px] font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                    View Demo Queue
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="bg-card border border-border rounded-3xl shadow-xl shadow-primary/5 overflow-hidden">
                {/* Header Pattern */}
                <div className="h-32 bg-primary relative overflow-hidden flex items-center px-8">
                  <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='none' stroke='%23ffffff' stroke-width='2'/%3E%3C/svg%3E")` }}
                  />
                  <div className="relative z-10 flex items-center gap-4 text-white">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                      <UserPlus size={28} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold uppercase tracking-tight">New Student Intake</h2>
                      <p className="text-[13px] opacity-80 font-medium">Capture details for the initial demo session</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-10">
                  {/* Guardian Section */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[15px] font-bold text-foreground flex items-center gap-2">
                        <User size={18} className="text-primary" /> Guardian Information
                      </h3>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={isSelfStudent}
                            onChange={(e) => setIsSelfStudent(e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary transition-all after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5 shadow-inner" />
                        </div>
                        <span className="text-[13px] font-bold text-muted-foreground group-hover:text-foreground transition-colors">Myself / Self-Student</span>
                      </label>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Guardian Name</label>
                        <input 
                          required
                          type="text" 
                          placeholder="Full Name"
                          className="w-full h-12 bg-muted/30 border border-border rounded-xl px-4 text-[14px] font-bold focus:border-primary outline-none transition-all placeholder:text-muted-foreground/30"
                          value={formData.guardianName}
                          onChange={e => setFormData({...formData, guardianName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">WhatsApp Number</label>
                        <div className="relative">
                          <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <input 
                            required
                            type="tel" 
                            placeholder="+92 3XX XXXXXXX"
                            className="w-full h-12 bg-muted/30 border border-border rounded-xl pl-11 pr-4 text-[14px] font-bold focus:border-primary outline-none transition-all placeholder:text-muted-foreground/30"
                            value={formData.whatsapp}
                            onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isSelfStudent && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden"
                        >
                          <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Student Level</label>
                            <div className="grid grid-cols-3 gap-2">
                              {["Beginner", "Intermediate", "Advanced"].map(lvl => (
                                <button
                                  key={lvl}
                                  type="button"
                                  onClick={() => setFormData({...formData, selfLevel: lvl})}
                                  className={cn(
                                    "h-11 rounded-xl text-[11px] font-bold border transition-all",
                                    formData.selfLevel === lvl 
                                      ? "bg-primary text-white border-primary shadow-md shadow-primary/20" 
                                      : "bg-muted/30 border-border text-muted-foreground hover:border-primary/50"
                                  )}
                                >
                                  {lvl}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Special Instructions</label>
                            <textarea 
                              required
                              placeholder="Tell us about your learning goals..."
                              className="w-full h-11 bg-muted/30 border border-border rounded-xl px-4 py-3 text-[13px] font-bold focus:border-primary outline-none transition-all min-h-[44px] placeholder:text-muted-foreground/30"
                              value={formData.selfSpecialInstructions}
                              onChange={e => setFormData({...formData, selfSpecialInstructions: e.target.value})}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Student Section */}
                  {!isSelfStudent && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-t border-border pt-10">
                        <h3 className="text-[15px] font-bold text-foreground flex items-center gap-2">
                          <ClipboardList size={18} className="text-primary" /> Student Details
                        </h3>
                        <button 
                          type="button"
                          onClick={addStudent}
                          className="flex items-center gap-2 px-4 py-2.5 bg-primary/10 text-primary rounded-xl text-[12px] font-bold hover:bg-primary hover:text-white transition-all shadow-sm"
                        >
                          <Plus size={16} /> Add Student
                        </button>
                      </div>

                      <div className="space-y-4">
                        {students.map((student, index) => (
                          <motion.div 
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            key={index} 
                            className="p-6 bg-muted/10 border border-border rounded-3xl space-y-5 relative group/item hover:bg-muted/20 transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold text-primary uppercase tracking-widest">Student Lead #{index + 1}</span>
                              {students.length > 1 && (
                                <button 
                                  type="button"
                                  onClick={() => removeStudent(index)}
                                  className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive hover:text-white transition-all shadow-sm"
                                >
                                  <Trash2 size={16} />
                                </button>
                              )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              <div className="md:col-span-2 space-y-1.5">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Student Name</label>
                                <input 
                                  required
                                  type="text" 
                                  placeholder="Full Name"
                                  className="w-full h-11 bg-card border border-border rounded-xl px-4 text-[13px] font-bold focus:border-primary outline-none transition-all placeholder:text-muted-foreground/30"
                                  value={student.name}
                                  onChange={e => updateStudent(index, "name", e.target.value)}
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Age</label>
                                <input 
                                  required
                                  type="number" 
                                  placeholder="Years"
                                  className="w-full h-11 bg-card border border-border rounded-xl px-4 text-[13px] font-bold focus:border-primary outline-none transition-all placeholder:text-muted-foreground/30"
                                  value={student.age}
                                  onChange={e => updateStudent(index, "age", e.target.value)}
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Level</label>
                                <div className="relative">
                                  <select 
                                    className="w-full h-11 bg-card border border-border rounded-xl px-4 text-[13px] font-bold text-foreground focus:border-primary outline-none transition-all appearance-none"
                                    value={student.level}
                                    onChange={e => updateStudent(index, "level", e.target.value)}
                                  >
                                    <option value="Beginner" className="bg-card text-foreground">Beginner</option>
                                    <option value="Intermediate" className="bg-card text-foreground">Intermediate</option>
                                    <option value="Advanced" className="bg-card text-foreground">Advanced</option>
                                  </select>
                                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                                </div>
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Special Instructions (Optional)</label>
                              <input 
                                type="text" 
                                placeholder="Any specific requirements or goals..."
                                className="w-full h-11 bg-card border border-border rounded-xl px-4 text-[13px] font-bold focus:border-primary outline-none transition-all placeholder:text-muted-foreground/30"
                                value={student.specialInstructions}
                                onChange={e => updateStudent(index, "specialInstructions", e.target.value)}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Scheduling Section */}
                  <div className="space-y-6">
                    <h3 className="text-[15px] font-bold text-foreground flex items-center gap-2 border-t border-border pt-10">
                      <Clock size={18} className="text-primary" /> Global Scheduling
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Demo Date</label>
                        <PremiumDatePicker 
                          value={formData.demoDate} 
                          onChange={(date) => setFormData({...formData, demoDate: date})} 
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Student Country</label>
                        <div className="relative">
                          <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                          <select 
                            className="w-full h-12 bg-muted/30 border border-border rounded-xl pl-11 pr-4 text-[14px] font-bold text-foreground focus:border-primary outline-none transition-all appearance-none cursor-pointer"
                            value={formData.country}
                            onChange={e => setFormData({...formData, country: e.target.value})}
                          >
                            {COUNTRIES.map(c => (
                              <option key={c.code} value={c.name} className="text-foreground bg-card">{c.name}</option>
                            ))}
                          </select>
                          <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Local Lead Time</label>
                        <PremiumTimePicker 
                          value={formData.demoTime} 
                          onChange={(time) => setFormData({...formData, demoTime: time})} 
                        />
                      </div>
                    </div>

                    {/* Real-time PKT Display Card */}
                    <div className="bg-secondary p-8 rounded-[32px] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group shadow-2xl">
                      <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.07] transition-opacity duration-500"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l20 20-20 20L0 20z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")` }}
                      />
                      <div className="relative z-10 flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-inner border border-primary/20">
                          <Globe size={28} className="animate-pulse" />
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Timezone Engine</div>
                          <div className="text-white font-extrabold text-lg flex items-center gap-2">
                            {formData.country} <ChevronRight size={16} className="text-primary" /> Pakistan
                          </div>
                        </div>
                      </div>

                      <div className="relative z-10 flex items-center gap-10">
                        <div className="text-center">
                          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Local Lead</div>
                          <div className="text-2xl font-black text-white font-mono">{format12Hour(formData.demoTime)}</div>
                        </div>
                        <div className="h-12 w-[1px] bg-white/10" />
                        <div className="text-center">
                          <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Conversion (PKT)</div>
                          <div className="text-3xl font-black text-primary font-mono drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]">
                            {pakistanTime || "--:--"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-4">
                      <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Preferred Frequency</label>
                      <div className="grid grid-cols-2 gap-4">
                        {["Mon-Thu", "Sat-Sun"].map(days => (
                          <button
                            key={days}
                            type="button"
                            onClick={() => setFormData({...formData, days})}
                            className={cn(
                              "h-16 rounded-2xl text-[14px] font-extrabold border transition-all flex flex-col items-center justify-center leading-tight gap-1",
                              formData.days === days 
                                ? "bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-[1.02]" 
                                : "bg-muted/30 border-border text-muted-foreground hover:border-primary/50"
                            )}
                          >
                            <span>{days}</span>
                            <span className={cn("text-[10px] font-bold uppercase tracking-widest", formData.days === days ? "text-white/60" : "text-muted-foreground/40")}>
                              {days === "Mon-Thu" ? "Weekday" : "Weekend"}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-10">
                    <button 
                      type="submit"
                      className="w-full h-18 bg-primary text-white rounded-[24px] text-[18px] font-black uppercase tracking-widest flex items-center justify-center gap-4 shadow-2xl shadow-primary/30 hover:bg-primary/90 hover:-translate-y-1 transition-all active:scale-[0.98] group"
                    >
                      <Send size={24} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" /> 
                      Finalize Request
                    </button>
                    <div className="mt-6 flex items-center justify-center gap-2 text-[12px] font-bold text-muted-foreground/60 uppercase tracking-wide">
                      <Info size={14} className="text-primary" /> Lead will be locked and sent to scheduling
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
