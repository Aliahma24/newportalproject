"use client";

import React, { useState } from "react";
import {
  CalendarClock, Calendar, Clock, CheckCircle2,
  ChevronLeft, ChevronRight, Info
} from "lucide-react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function RequestMakeup() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const availableSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "11:00 AM",
    "02:00 PM", "03:00 PM", "04:30 PM", "07:00 PM",
  ];

  const pastRequests = [
    { date: "Apr 15, 2024", time: "03:00 PM", reason: "Doctor's appointment", status: "Approved" },
    { date: "Mar 22, 2024", time: "10:00 AM", reason: "Family event", status: "Completed" },
    { date: "Feb 10, 2024", time: "04:30 PM", reason: "Exam preparation", status: "Cancelled" },
  ];

  const handleSubmit = () => {
    if (!selectedDate || !selectedSlot) return;
    setSubmitted(true);
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="student" className="hidden md:flex w-64 shrink-0" />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar title="Request Makeup Class" onMenuClick={() => setSidebarOpen(true)} userName="Yousuf Ali" userRole="Student" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-muted/30 space-y-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: Request Form */}
            <div className="flex-[1.4] space-y-5">
              {submitted ? (
                <div className="bg-card border border-border rounded-xl p-10 shadow-sm flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 size={32} className="text-emerald-500" />
                  </div>
                  <h2 className="text-[18px] font-bold text-foreground">Request Submitted!</h2>
                  <p className="text-[13px] text-muted-foreground font-medium max-w-xs">
                    Your makeup class request for <strong>{selectedDate}</strong> at <strong>{selectedSlot}</strong> has been sent to the Scheduler.
                  </p>
                  <button onClick={() => { setSubmitted(false); setSelectedDate(""); setSelectedSlot(""); setReason(""); }}
                    className="h-10 px-6 border border-primary text-primary rounded-xl text-[13px] font-bold hover:bg-primary/5 transition-all">
                    Submit Another
                  </button>
                </div>
              ) : (
                <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      <CalendarClock size={18} />
                    </div>
                    <h2 className="text-[15px] font-bold text-foreground">New Makeup Request</h2>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Info Banner */}
                    <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                      <Info size={15} className="text-primary shrink-0 mt-0.5" />
                      <p className="text-[12px] font-medium text-primary leading-relaxed">
                        Makeup classes can be requested up to 24 hours in advance. Your request will be reviewed by the Scheduler and confirmed via WhatsApp.
                      </p>
                    </div>

                    {/* Date Picker */}
                    <div className="space-y-2">
                      <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-widest">Select Date</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={e => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full h-11 bg-muted/30 border border-border rounded-xl px-4 text-[13px] font-bold text-foreground outline-none focus:border-primary transition-all"
                      />
                    </div>

                    {/* Time Slots */}
                    <div className="space-y-2">
                      <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-widest">Available Time Slots</label>
                      <div className="grid grid-cols-4 gap-2">
                        {availableSlots.map(slot => (
                          <button
                            key={slot}
                            onClick={() => setSelectedSlot(slot)}
                            className={cn(
                              "h-10 rounded-lg text-[12px] font-bold border transition-all",
                              selectedSlot === slot
                                ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                                : "bg-muted/30 border-border text-foreground hover:border-primary hover:text-primary"
                            )}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Reason */}
                    <div className="space-y-2">
                      <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-widest">Reason (Optional)</label>
                      <textarea
                        value={reason}
                        onChange={e => setReason(e.target.value)}
                        placeholder="e.g. Doctor's appointment, family event..."
                        rows={3}
                        className="w-full bg-muted/30 border border-border rounded-xl px-4 py-3 text-[13px] font-medium text-foreground outline-none focus:border-primary transition-all resize-none placeholder:text-muted-foreground"
                      />
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={!selectedDate || !selectedSlot}
                      className={cn(
                        "w-full h-11 rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 transition-all",
                        selectedDate && selectedSlot
                          ? "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90"
                          : "bg-muted text-muted-foreground cursor-not-allowed"
                      )}
                    >
                      <CalendarClock size={16} /> Submit Makeup Request
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Past Requests */}
            <div className="flex-1 bg-card border border-border rounded-xl shadow-sm flex flex-col overflow-hidden">
              <div className="p-5 border-b border-border bg-muted/30">
                <h3 className="text-[15px] font-bold text-foreground">Past Requests</h3>
              </div>
              <div className="flex-1 overflow-y-auto divide-y divide-border">
                {pastRequests.map((r, i) => (
                  <div key={i} className="p-5 hover:bg-muted/10 transition-all">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[13px] font-bold text-foreground">
                          <Calendar size={13} className="text-primary" />{r.date}
                        </div>
                        <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                          <Clock size={12} />{r.time}
                        </div>
                        {r.reason && (
                          <div className="text-[11px] text-muted-foreground font-medium italic">"{r.reason}"</div>
                        )}
                      </div>
                      <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0",
                        r.status === "Approved" ? "bg-emerald-100 text-emerald-600" :
                        r.status === "Completed" ? "bg-slate-100 text-slate-500" :
                        "bg-red-100 text-red-500"
                      )}>{r.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
