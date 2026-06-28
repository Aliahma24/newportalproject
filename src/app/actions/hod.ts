"use server";

import { prisma } from "@/lib/prisma";

export async function getHodDashboardData() {
  try {
    const totalTeachers = await prisma.user.count({ where: { role: "TEACHER" } });
    
    const complaints = await prisma.complaint.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        submitter: true,
        target: true
      }
    });

    const activeComplaintsCount = complaints.filter(c => c.status === "PENDING").length;
    const resolvedComplaintsCount = complaints.filter(c => c.status === "RESOLVED").length;
    
    const totalComplaints = complaints.length;
    const resolutionRate = totalComplaints === 0 ? 100 : Math.round((resolvedComplaintsCount / totalComplaints) * 100);

    return {
      stats: {
        totalTeachers,
        resolutionRate,
        activeComplaints: activeComplaintsCount,
        totalComplaints
      },
      complaints
    };
  } catch (error) {
    console.error("Failed to fetch HOD data:", error);
    return null;
  }
}

export async function resolveComplaint(id: string) {
  try {
    await prisma.complaint.update({
      where: { id },
      data: { status: "RESOLVED" }
    });
    return { success: true };
  } catch (error: any) {
    console.error("Failed to resolve complaint:", error);
    return { success: false, error: error.message };
  }
}
