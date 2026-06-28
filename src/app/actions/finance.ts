"use server";

import { prisma } from "@/lib/prisma";

export async function getFinanceData() {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        student: {
          select: { name: true, phone: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    const totalRevenue = invoices.filter(i => i.status === "PAID").reduce((sum, i) => sum + i.amount, 0);
    const pendingDues = invoices.filter(i => i.status === "PENDING").reduce((sum, i) => sum + i.amount, 0);
    const overdueDues = invoices.filter(i => i.status === "OVERDUE").reduce((sum, i) => sum + i.amount, 0);

    return {
      success: true,
      invoices: invoices.map(i => ({
        id: i.id,
        studentName: i.student.name,
        amount: i.amount,
        currency: i.currency,
        status: i.status,
        dueDate: i.dueDate.toISOString()
      })),
      metrics: {
        totalRevenue,
        pendingDues,
        overdueDues
      }
    };
  } catch (error: any) {
    console.error("Failed to fetch finance data:", error);
    return { success: false, error: error.message };
  }
}

export async function createInvoice(data: { studentId: string; amount: number; dueDate: Date }) {
  try {
    const invoice = await prisma.invoice.create({
      data: {
        studentId: data.studentId,
        amount: data.amount,
        dueDate: new Date(data.dueDate),
        status: "PENDING"
      }
    });
    return { success: true, invoice };
  } catch (error: any) {
    console.error("Failed to create invoice:", error);
    return { success: false, error: error.message };
  }
}

export async function markAsPaid(invoiceId: string) {
  try {
    await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        status: "PAID",
        paidAt: new Date()
      }
    });
    return { success: true };
  } catch (error: any) {
    console.error("Failed to mark invoice as paid:", error);
    return { success: false, error: error.message };
  }
}
