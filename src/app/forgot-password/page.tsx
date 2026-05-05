"use client";

import React, { useState } from "react";
import { 
  Mail, 
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

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="flex min-h-screen w-full bg-background font-sans overflow-hidden">
      {/* Left Panel - Dark Branding Section */}
      <div className="relative hidden md:flex flex-1 flex-col items-center justify-center bg-secondary p-12 text-secondary-foreground overflow-hidden">
        {/* Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(166, 124, 50, 0.15) 0%, transparent 50%), 
                             linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), 
                             linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`,
            backgroundSize: "100% 100%, 40px 40px, 40px 40px",
          }}
        />
        
        <div className="relative z-10 flex flex-col items-center text-center max-w-[480px]">
          {/* Logo Box */}
          <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-[#1a1a1a] p-4 shadow-2xl border border-white/10 overflow-hidden">
            <div className="relative w-full h-full">
              <Image 
                src="/logo.png" 
                alt="Taleem ul Quran Logo" 
                fill 
                className="object-contain"
              />
            </div>
          </div>

          <h1 className="mb-3 text-4xl font-bold tracking-tight leading-tight">
            Taleem ul Quran Portal
          </h1>
          <p className="text-lg text-muted-foreground/80 font-normal">
            Smart Management for Quran Learning System
          </p>
        </div>
      </div>

      {/* Right Panel - Forgot Password Card */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-[460px]">
          {/* Mobile Logo (Visible on mobile only) */}
          <div className="flex md:hidden flex-col items-center gap-4 mb-10 text-center">
             <div className="relative h-14 w-14 rounded-xl overflow-hidden border border-border bg-secondary p-2">
                <Image src="/logo.png" alt="Logo" fill className="object-contain" />
             </div>
             <div>
                <h1 className="text-xl font-bold text-foreground">Taleem ul Quran Portal</h1>
                <p className="text-xs text-muted-foreground">Smart Management System</p>
             </div>
          </div>

          <div className="rounded-2xl border border-border/40 bg-card p-12 shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
            {/* Header */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Forgot Password
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                Enter your email address to receive a password reset link.
              </p>
            </div>

            {/* Form */}
            <div className="space-y-8">
              <div className="space-y-2.5">
                <label className="text-sm font-medium text-foreground">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                    <Mail size={20} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 rounded-lg border border-border bg-input pl-12 pr-4 text-[15px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4">
                <button 
                  className="h-12 w-full rounded-lg bg-primary text-[15px] font-semibold text-primary-foreground shadow-[0_4px_12px_rgba(166,124, 50,0.25)] hover:bg-primary/90 transition-all active:scale-[0.98]"
                >
                  Send Reset Link
                </button>
                
                <Link 
                  href="/"
                  className="h-12 w-full flex items-center justify-center gap-2 rounded-lg border border-primary text-[15px] font-semibold text-primary hover:bg-primary/5 transition-all active:scale-[0.98]"
                >
                  <ArrowLeft size={18} />
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
