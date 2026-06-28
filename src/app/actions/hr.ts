"use server";

import { prisma } from "@/lib/prisma";

export async function getHrDashboardData() {
  try {
    const totalStaff = await prisma.user.count({ where: { role: { in: ["TEACHER", "ADMIN", "HOD", "HR"] } } });
    
    const leaveRequests = await prisma.leaveRequest.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
      }
    });

    const pendingRequests = leaveRequests.filter(l => l.status === "PENDING").length;

    // Staff directory fetch (dummy format for the UI)
    const staffDirectory = await prisma.user.findMany({
      where: { role: { in: ["TEACHER", "ADMIN"] } },
      select: {
        id: true,
        name: true,
        role: true,
        createdAt: true
      }
    });

    return {
      stats: {
        totalStaff,
        pendingRequests
      },
      leaveRequests,
      staffDirectory
    };
  } catch (error) {
    console.error("Failed to fetch HR data:", error);
    return null;
  }
}

export async function processLeaveRequest(id: string, status: "APPROVED" | "REJECTED") {
  try {
    await prisma.leaveRequest.update({
      where: { id },
      data: { status }
    });
    return { success: true };
  } catch (error: any) {
    console.error("Failed to process leave request:", error);
    return { success: false, error: error.message };
  }
}
