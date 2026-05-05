"use client";

import React, { useState } from "react";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Sparkles 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("admin@taleem.edu");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(true); // Showing error by default as per design

  return (
    <div className="flex min-h-screen w-full bg-background font-sans overflow-hidden">
      {/* Left Panel - Hidden on mobile, shown on md and above */}
      <div className="relative hidden md:flex w-[480px] flex-col bg-secondary p-12 text-secondary-foreground shrink-0 overflow-hidden">
        {/* Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
          }}
        />
        
        <div className="relative z-10 flex flex-col h-full">
          {/* Brand Header */}
          <div className="flex items-center gap-3 mb-auto">
            <div className="relative h-10 w-10 flex items-center justify-center rounded-md overflow-hidden">
              <Image 
                src="/logo.png" 
                alt="Taleem ul Quran Logo" 
                fill 
                className="object-contain"
              />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Taleem ul Quran Portal
            </span>
          </div>

          {/* Hero Content */}
          <div className="mb-12">
            <h1 className="mb-4 text-4xl font-semibold leading-[1.1] tracking-tight">
              Smart Management for Quran Learning System.
            </h1>
            <p className="max-w-[80%] text-base leading-relaxed text-muted-foreground/80">
              A unified platform designed for administrators, teachers, and
              students to seamlessly manage, track, and enhance their learning
              journey.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-[400px]">
          {/* Mobile Brand (Only visible on small screens) */}
          <div className="flex md:hidden items-center justify-center gap-3 mb-8">
            <div className="relative h-10 w-10 flex items-center justify-center rounded-md overflow-hidden">
              <Image 
                src="/logo.png" 
                alt="Taleem ul Quran Logo" 
                fill 
                className="object-contain"
              />
            </div>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Taleem ul Quran Portal
            </span>
          </div>

          <div className="rounded-xl border border-border bg-card p-10 shadow-sm transition-all duration-300">
            {/* Login Header */}
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Welcome back
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Enter your credentials to access your account
              </p>
            </div>

            {/* Form Container */}
            <div className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">
                  Email address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground transition-colors group-focus-within:text-primary">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-border bg-input py-2.5 pl-10 pr-4 text-sm text-foreground transition-all focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-foreground">
                    Password
                  </label>
                  <Link 
                    href="/forgot-password"
                    className="text-xs font-medium text-primary hover:underline transition-all"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative group">
                  <div className={cn(
                    "absolute inset-y-0 left-3 flex items-center pointer-events-none transition-colors",
                    error ? "text-destructive" : "text-muted-foreground group-focus-within:text-primary"
                  )}>
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={cn(
                      "w-full rounded-lg border bg-input py-2.5 pl-10 pr-10 text-sm text-foreground transition-all focus:outline-none focus:ring-1",
                      error 
                        ? "border-destructive ring-destructive focus:ring-destructive focus:border-destructive" 
                        : "border-border focus:ring-primary focus:border-primary"
                    )}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {error && (
                  <div className="flex items-center gap-1.5 mt-1 text-xs font-medium text-destructive animate-in fade-in slide-in-from-top-1">
                    <AlertCircle size={14} />
                    <span>Incorrect password. Please try again.</span>
                  </div>
                )}
              </div>

              {/* Role Badge (Visual only) */}
              <div className="flex items-center gap-2 rounded-lg bg-muted px-3.5 py-2.5 text-muted-foreground">
                <Sparkles size={16} className="text-primary" />
                <span className="text-xs font-medium">Role will be automatically detected</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-1">
                <button 
                  className="w-full rounded-lg bg-primary py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
                >
                  Log In
                </button>

                <div className="flex items-center gap-3">
                  <div className="h-[1px] flex-1 bg-border" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Having trouble?
                  </span>
                  <div className="h-[1px] flex-1 bg-border" />
                </div>

                <button 
                  className="w-full rounded-lg border border-primary py-3 text-sm font-medium text-primary transition-all hover:bg-primary/5 active:scale-[0.98]"
                >
                  Contact Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
