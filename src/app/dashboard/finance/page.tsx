"use client";

import React, { useState, useEffect } from "react";
import { Sidebar, Navbar } from "@/components/dashboard-layout";
import { getFinanceData, createInvoice, markAsPaid } from "@/app/actions/finance";
import { getUsersByRole } from "@/app/actions/admin";
import { DollarSign, FileText, CheckCircle2, Clock, AlertTriangle, Download, Plus, Search, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Modal({ isOpen, onClose, children, title }: { isOpen: boolean, onClose: () => void, children: React.ReactNode, title: string }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative bg-card w-full max-w-md rounded-3xl p-6 shadow-2xl border border-border">
        <h2 className="text-xl font-bold mb-6">{title}</h2>
        {children}
      </motion.div>
    </div>
  );
}

export default function FinanceDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  
  // Modal states
  const [isNewInvoiceOpen, setNewInvoiceOpen] = useState(false);
  const [newInvoiceData, setNewInvoiceData] = useState({ studentId: "", amount: "", dueDate: "" });
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    const financeRes = await getFinanceData();
    if (financeRes.success) setData(financeRes);
    
    const studentsRes = await getUsersByRole("STUDENT");
    if (studentsRes) setStudents(studentsRes);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateInvoice = async () => {
    if (!newInvoiceData.studentId || !newInvoiceData.amount || !newInvoiceData.dueDate) return alert("Fill all fields");
    const res = await createInvoice({
      studentId: newInvoiceData.studentId,
      amount: Number(newInvoiceData.amount),
      dueDate: new Date(newInvoiceData.dueDate)
    });
    if (res.success) {
      setNewInvoiceOpen(false);
      loadData();
    } else {
      alert(res.error);
    }
  };

  const handleMarkPaid = async (id: string) => {
    const res = await markAsPaid(id);
    if (res.success) {
      loadData();
    } else {
      alert(res.error);
    }
  };

  const stats = [
    { label: "Total Revenue (Paid)", val: `$${data?.metrics?.totalRevenue?.toLocaleString() || 0}`, icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Pending Dues", val: `$${data?.metrics?.pendingDues?.toLocaleString() || 0}`, icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Overdue Fees", val: `$${data?.metrics?.overdueDues?.toLocaleString() || 0}`, icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      <Sidebar role="director" className="hidden md:flex w-64 shrink-0" />
      
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        <Navbar title="Finance & Billing" onMenuClick={() => setSidebarOpen(true)} userName="Finance Admin" userRole="System" />
        
        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 bg-muted/30">
          <div className="max-w-[1600px] mx-auto space-y-10">
            
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-foreground uppercase tracking-tight">Financial Overview</h1>
                <p className="text-sm font-bold text-muted-foreground mt-1">Manage student invoices, fees collection, and revenue tracking.</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => window.print()} className="h-12 px-6 bg-card border border-border text-foreground rounded-2xl text-[12px] font-black uppercase tracking-widest hover:bg-muted transition-all flex items-center gap-2">
                  <Download size={16} /> Export Report
                </button>
                <button onClick={() => setNewInvoiceOpen(true)} className="h-12 px-6 bg-primary text-white rounded-2xl text-[12px] font-black uppercase tracking-widest hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all flex items-center gap-2">
                  <Plus size={16} /> New Invoice
                </button>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((s, i) => (
                <div key={i} className="bg-card border border-border p-6 rounded-[32px] shadow-sm flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-[20px] flex items-center justify-center ${s.bg} ${s.color}`}>
                    <s.icon size={32} />
                  </div>
                  <div>
                    <div className="text-[12px] font-black text-muted-foreground uppercase tracking-widest">{s.label}</div>
                    <div className="text-3xl font-black text-foreground mt-1">{loading ? "..." : s.val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Invoices Table */}
            <div className="bg-card border border-border rounded-[40px] overflow-hidden shadow-2xl shadow-primary/5">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="text-xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
                  <FileText size={20} className="text-primary" /> Invoice Directory
                </h2>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <input type="text" placeholder="Search invoices..." className="h-10 pl-10 pr-4 bg-muted/50 border border-border rounded-xl text-[13px] font-bold outline-none focus:border-primary transition-all w-64" />
                  </div>
                  <button className="h-10 w-10 bg-muted/50 border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary transition-all">
                    <Filter size={16} />
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted/30">
                      <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border">Invoice ID</th>
                      <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border">Student</th>
                      <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border">Amount</th>
                      <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border">Due Date</th>
                      <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border text-center">Status</th>
                      <th className="p-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {loading ? (
                       <tr><td colSpan={6} className="p-8 text-center text-muted-foreground font-bold">Loading...</td></tr>
                    ) : data?.invoices?.length === 0 ? (
                       <tr><td colSpan={6} className="p-8 text-center text-muted-foreground font-bold">No invoices found.</td></tr>
                    ) : (
                      data?.invoices?.map((inv: any, i: number) => (
                        <tr key={i} className="hover:bg-muted/5 transition-colors group">
                          <td className="p-6">
                            <span className="text-[13px] font-black text-foreground">INV-{inv.id.substring(0,6).toUpperCase()}</span>
                          </td>
                          <td className="p-6">
                            <div className="text-[14px] font-bold text-foreground">{inv.studentName}</div>
                          </td>
                          <td className="p-6">
                            <span className="text-[14px] font-black text-primary">{inv.currency === "USD" ? "$" : ""}{inv.amount}</span>
                          </td>
                          <td className="p-6">
                            <span className="text-[13px] font-bold text-muted-foreground">{new Date(inv.dueDate).toLocaleDateString()}</span>
                          </td>
                          <td className="p-6 text-center">
                            {inv.status === "PAID" ? (
                              <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">PAID</span>
                            ) : inv.status === "PENDING" ? (
                              <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-600 border border-amber-500/20">PENDING</span>
                            ) : (
                              <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-destructive/10 text-destructive border border-destructive/20">OVERDUE</span>
                            )}
                          </td>
                          <td className="p-6">
                            <div className="flex items-center justify-center">
                              {inv.status !== "PAID" && (
                                <button 
                                  onClick={() => handleMarkPaid(inv.id)}
                                  className="h-8 px-3 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 hover:bg-emerald-500 hover:text-white transition-all"
                                >
                                  <CheckCircle2 size={14} /> Mark Paid
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* New Invoice Modal */}
      <Modal isOpen={isNewInvoiceOpen} onClose={() => setNewInvoiceOpen(false)} title="Generate New Invoice">
        <div className="space-y-4">
          <div>
            <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest ml-1 mb-1 block">Select Student</label>
            <select 
              className="w-full h-12 bg-muted/50 border border-border rounded-xl px-4 text-[14px] font-bold focus:border-primary outline-none"
              value={newInvoiceData.studentId}
              onChange={(e) => setNewInvoiceData({...newInvoiceData, studentId: e.target.value})}
            >
              <option value="">-- Choose Student --</option>
              {students.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.email})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest ml-1 mb-1 block">Amount (USD)</label>
            <input 
              type="number"
              placeholder="e.g. 50"
              className="w-full h-12 bg-muted/50 border border-border rounded-xl px-4 text-[14px] font-bold focus:border-primary outline-none"
              value={newInvoiceData.amount}
              onChange={(e) => setNewInvoiceData({...newInvoiceData, amount: e.target.value})}
            />
          </div>
          <div>
            <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest ml-1 mb-1 block">Due Date</label>
            <input 
              type="date"
              className="w-full h-12 bg-muted/50 border border-border rounded-xl px-4 text-[14px] font-bold focus:border-primary outline-none"
              value={newInvoiceData.dueDate}
              onChange={(e) => setNewInvoiceData({...newInvoiceData, dueDate: e.target.value})}
            />
          </div>
          <button 
            onClick={handleCreateInvoice}
            className="w-full h-14 bg-primary text-white rounded-xl text-[13px] font-black uppercase tracking-widest mt-4 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            Create Invoice
          </button>
        </div>
      </Modal>

    </div>
  );
}
