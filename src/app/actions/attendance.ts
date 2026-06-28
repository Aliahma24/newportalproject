"use server";

import { prisma } from "@/lib/prisma";

export async function markAttendance(userId: string, classId: string, role: string) {
  try {
    // Check if attendance already exists
    const existing = await prisma.attendance.findFirst({
      where: { userId, classId }
    });

    if (existing) {
      return { success: true, attendance: existing };
    }

    const classSession = await prisma.classSession.findUnique({
      where: { id: classId }
    });

    if (!classSession) {
      throw new Error("Class not found");
    }

    const now = new Date();
    const scheduledStart = classSession.scheduledStart;
    
    // Calculate if late (grace period: 5 minutes)
    const diffInMinutes = (now.getTime() - scheduledStart.getTime()) / (1000 * 60);
    const isLate = diffInMinutes > 5;

    // Create attendance record
    const attendance = await prisma.attendance.create({
      data: {
        userId,
        classId,
        status: isLate ? "LATE" : "PRESENT",
      }
    });

    // If teacher is marking attendance, update class status to LIVE
    if (role === "TEACHER" && classSession.status === "SCHEDULED") {
      await prisma.classSession.update({
        where: { id: classId },
        data: { 
          status: "LIVE",
          actualStart: now
        }
      });
    }

    return { success: true, attendance };
  } catch (error: any) {
    console.error("Failed to mark attendance:", error);
    return { success: false, error: error.message };
  }
}
