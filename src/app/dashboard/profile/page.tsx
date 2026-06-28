"use client";

import React, { useState, useEffect } from "react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { getProfileData, updateProfileData, changePassword } from "@/app/actions/profile";
import { User, Mail, Phone, Shield, Lock, Save, Camera, AlertCircle } from "lucide-react";

export default function UnifiedProfilePage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Form states
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [passwordData, setPasswordData] = useState({ oldPass: "", newPass: "", confirmPass: "" });
  const [statusMsg, setStatusMsg] = useState<{msg: string, type: "success" | "error"} | null>(null);

  useEffect(() => {
    async function loadData() {
      const res = await getProfileData();
      if (res.success && res.user) {
        setUser(res.user);
        setFormData({ name: res.user.name, phone: res.user.phone });
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setStatusMsg(null);
    const res = await updateProfileData(user.id, formData);
    if (res.success) {
      setUser(res.user);
      setStatusMsg({ msg: "Profile updated successfully!", type: "success" });
    } else {
      setStatusMsg({ msg: res.error || "Failed to update profile", type: "error" });
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setStatusMsg(null);
    if (passwordData.newPass !== passwordData.confirmPass) {
      return setStatusMsg({ msg: "New passwords do not match", type: "error" });
    }
    const res = await changePassword(user.id, passwordData.oldPass, passwordData.newPass);
    if (res.success) {
      setStatusMsg({ msg: "Password changed successfully!", type: "success" });
      setPasswordData({ oldPass: "", newPass: "", confirmPass: "" });
    } else {
      setStatusMsg({ msg: res.error || "Failed to change password", type: "error" });
    }
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="admin" className="hidden md:flex w-64 shrink-0" />
      
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        <Navbar title="My Profile" onMenuClick={() => setSidebarOpen(true)} userName={user?.name || "Loading..."} userRole={user?.role || ""} />
        
        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 bg-muted/30">
          <div className="max-w-[1000px] mx-auto space-y-8">
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Column: Avatar & Basic Info */}
              <div className="w-full md:w-1/3 space-y-6">
                <div className="bg-card border border-border rounded-[40px] p-8 shadow-2xl flex flex-col items-center text-center">
                  <div className="relative group cursor-pointer mb-6">
                    <div className="w-32 h-32 rounded-full bg-primary/10 border-4 border-card shadow-lg flex items-center justify-center overflow-hidden">
                      <span className="text-4xl font-black text-primary">
                        {user?.name?.split(' ').map((n: string) => n[0]).join('') || "U"}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="text-white" size={24} />
                    </div>
                  </div>
                  <h2 className="text-xl font-black text-foreground">{loading ? "Loading..." : user?.name}</h2>
                  <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mt-2">
                    {user?.role}
                  </div>
                  
                  <div className="w-full border-t border-border mt-6 pt-6 space-y-4">
                    <div className="flex items-center gap-3 text-muted-foreground text-[13px] font-bold">
                      <Mail size={16} /> {user?.email || "..."}
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground text-[13px] font-bold">
                      <Phone size={16} /> {user?.phone || "No Phone Number"}
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground text-[13px] font-bold">
                      <Shield size={16} /> Member since {user ? new Date(user.createdAt).getFullYear() : "..."}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Forms */}
              <div className="w-full md:w-2/3 space-y-6">
                
                {statusMsg && (
                  <div className={`p-4 rounded-2xl flex items-center gap-3 text-[13px] font-bold ${statusMsg.type === 'success' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-destructive/10 text-destructive border border-destructive/20'}`}>
                    <AlertCircle size={18} />
                    {statusMsg.msg}
                  </div>
                )}

                {/* Profile Form */}
                <div className="bg-card border border-border rounded-[40px] p-8 shadow-2xl">
                  <h3 className="text-lg font-black text-foreground uppercase tracking-tight flex items-center gap-2 mb-6">
                    <User size={20} className="text-primary" /> Personal Details
                  </h3>
                  <form onSubmit={handleUpdateProfile} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1 mb-1 block">Full Name</label>
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full h-12 bg-muted/50 border border-border rounded-xl px-4 text-[14px] font-bold focus:border-primary outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1 mb-1 block">Phone Number</label>
                        <input 
                          type="text" 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full h-12 bg-muted/50 border border-border rounded-xl px-4 text-[14px] font-bold focus:border-primary outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end pt-2">
                      <button type="submit" className="h-12 px-8 bg-primary text-white rounded-xl text-[12px] font-black uppercase tracking-widest hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all flex items-center gap-2">
                        <Save size={16} /> Save Changes
                      </button>
                    </div>
                  </form>
                </div>

                {/* Password Form */}
                <div className="bg-card border border-border rounded-[40px] p-8 shadow-2xl">
                  <h3 className="text-lg font-black text-foreground uppercase tracking-tight flex items-center gap-2 mb-6">
                    <Lock size={20} className="text-primary" /> Security
                  </h3>
                  <form onSubmit={handleChangePassword} className="space-y-5">
                    <div>
                      <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1 mb-1 block">Current Password</label>
                      <input 
                        type="password" 
                        value={passwordData.oldPass}
                        onChange={(e) => setPasswordData({...passwordData, oldPass: e.target.value})}
                        className="w-full max-w-sm h-12 bg-muted/50 border border-border rounded-xl px-4 text-[14px] font-bold focus:border-primary outline-none transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl">
                      <div>
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1 mb-1 block">New Password</label>
                        <input 
                          type="password" 
                          value={passwordData.newPass}
                          onChange={(e) => setPasswordData({...passwordData, newPass: e.target.value})}
                          className="w-full h-12 bg-muted/50 border border-border rounded-xl px-4 text-[14px] font-bold focus:border-primary outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1 mb-1 block">Confirm New Password</label>
                        <input 
                          type="password" 
                          value={passwordData.confirmPass}
                          onChange={(e) => setPasswordData({...passwordData, confirmPass: e.target.value})}
                          className="w-full h-12 bg-muted/50 border border-border rounded-xl px-4 text-[14px] font-bold focus:border-primary outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end pt-2">
                      <button type="submit" className="h-12 px-8 bg-card border border-border text-foreground rounded-xl text-[12px] font-black uppercase tracking-widest hover:bg-muted transition-all">
                        Update Password
                      </button>
                    </div>
                  </form>
                </div>

              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
