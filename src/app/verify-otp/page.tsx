"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Clock, 
  ArrowLeft,
  Sparkles
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState(["4", "2", "", "", "", ""]);
  const [timer, setTimer] = useState(45);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Simple countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex min-h-screen w-full bg-background font-sans overflow-hidden">
      {/* Left Panel - Dark Branding Section */}
      <div className="relative hidden md:flex flex-1 flex-col items-center justify-center bg-secondary p-12 text-secondary-foreground overflow-hidden">
        {/* Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0l40 40-40 40L0 40z' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
          }}
        />
        
        <div className="relative z-10 flex flex-col items-center text-center max-w-[520px]">
          {/* Brand Header */}
          <div className="flex items-center gap-4 mb-16">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg">
              <div className="relative h-7 w-7">
                 <Image src="/logo.png" alt="Logo" fill className="object-contain brightness-0 invert" />
              </div>
            </div>
            <span className="text-2xl font-semibold tracking-tight">Taleem ul Quran Portal</span>
          </div>

          <h2 className="text-[56px] font-bold leading-[1.15] tracking-tight">
            Smart Management for Quran Learning System
          </h2>
        </div>
      </div>

      {/* Right Panel - OTP Card */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-[420px]">
          {/* Mobile Branding */}
          <div className="flex md:hidden flex-col items-center gap-3 mb-10 text-center">
             <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-border bg-secondary p-2">
                <Image src="/logo.png" alt="Logo" fill className="object-contain" />
             </div>
             <h1 className="text-xl font-bold">Taleem ul Quran</h1>
          </div>

          <div className="auth-card">
            {/* Header */}
            <div className="mb-10">
              <h1 className="text-[32px] font-bold tracking-tight text-foreground">OTP Verification</h1>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                We sent a 6-digit code to <strong className="text-foreground font-medium">us***@example.com</strong>. Please enter it below to verify your account.
              </p>
            </div>

            {/* OTP Input Container */}
            <div className="flex gap-4 mb-8">
              {otp.map((digit, i) => (
                <div key={i} className="flex-1 aspect-square relative">
                  <input
                    ref={(el) => (inputRefs.current[i] = el)}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className={cn(
                      "w-full h-full rounded-lg border text-center text-2xl font-bold focus:outline-none transition-all",
                      digit || (i === 2 && !digit) ? "border-primary ring-4 ring-primary/10" : "border-border"
                    )}
                  />
                  {!digit && i === 2 && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-[2px] h-[28px] bg-primary animate-pulse" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <button className="w-full h-12 rounded-lg bg-primary text-[15px] font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98] mb-8">
              Verify OTP
            </button>

            {/* Resend Section */}
            <div className="space-y-8 mb-8 pb-8 border-b border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Didn't receive the code?</span>
                <div className="flex items-center gap-1.5 font-medium text-foreground">
                  <Clock size={16} className="text-muted-foreground" />
                  <span>{formatTime(timer)}</span>
                </div>
              </div>
              <button 
                disabled={timer > 0}
                className={cn(
                  "w-full h-12 rounded-lg border text-[15px] font-medium transition-all",
                  timer > 0 
                    ? "border-border text-muted-foreground cursor-not-allowed opacity-50" 
                    : "border-primary text-primary hover:bg-primary/5 active:scale-[0.98]"
                )}
              >
                Resend OTP
              </button>
            </div>

            {/* Back to Login */}
            <Link 
              href="/"
              className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-full"
            >
              <ArrowLeft size={16} />
              <span>Back to Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
