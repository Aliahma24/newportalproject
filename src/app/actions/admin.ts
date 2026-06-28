"use server";

import { prisma } from "@/lib/prisma";

export async function getAdminDashboardData() {
  try {
    const totalStudents = await prisma.user.count({ where: { role: "STUDENT" } });
    const totalTeachers = await prisma.user.count({ where: { role: "TEACHER" } });
    
    // Total active/scheduled classes
    const activeClassesCount = await prisma.classSession.count({
      where: {
        status: { in: ["SCHEDULED", "LIVE"] }
      }
    });

    // Attendance Calculation (simplified)
    const totalAttendances = await prisma.attendance.count();
    const presentAttendances = await prisma.attendance.count({
      where: { status: { in: ["PRESENT", "LATE"] } }
    });
    
    const attendancePercentage = totalAttendances === 0 ? 100 : Math.round((presentAttendances / totalAttendances) * 100);

    const upcomingClasses = await prisma.classSession.findMany({
      where: {
        status: { in: ["SCHEDULED", "LIVE"] },
      },
      include: {
        teacher: true,
        student: true,
      },
      orderBy: { scheduledStart: 'asc' },
      take: 5
    });

    // We can use attendances or recently created classes as activity
    const recentActivity = await prisma.attendance.findMany({
      orderBy: { markedAt: 'desc' },
      include: {
        user: true,
        classSession: true
      },
      take: 5
    });

    return {
      stats: {
        totalStudents,
        totalTeachers,
        activeClasses: activeClassesCount,
        attendancePercentage
      },
      upcomingClasses,
      recentActivity
    };
  } catch (error) {
    console.error("Failed to fetch admin data:", error);
    return null;
  }
}

export async function getUsersByRole(role: "TEACHER" | "STUDENT") {
  try {
    const users = await prisma.user.findMany({
      where: { role },
      select: { id: true, name: true, email: true }
    });
    return users;
  } catch (error) {
    console.error("Failed to fetch users by role:", error);
    return [];
  }
}

export async function createClassSession(data: {
  title: string;
  description: string;
  teacherId: string;
  studentId: string;
  scheduledStart: Date;
  scheduledEnd: Date;
}) {
  try {
    const newClass = await prisma.classSession.create({
      data: {
        title: data.title,
        description: data.description,
        teacherId: data.teacherId,
        studentId: data.studentId,
        scheduledStart: new Date(data.scheduledStart),
        scheduledEnd: new Date(data.scheduledEnd),
        status: "SCHEDULED"
      }
    });
    return { success: true, classSession: newClass };
  } catch (error: any) {
    console.error("Failed to create class:", error);
    return { success: false, error: error.message };
  }
}

export async function cancelClassSession(id: string) {
  try {
    await prisma.classSession.update({
      where: { id },
      data: {
        status: "CANCELLED",
        actualEnd: new Date()
      }
    });
    return { success: true };
  } catch (error: any) {
    console.error("Failed to cancel class session:", error);
    return { success: false, error: error.message };
  }
}

export async function escalateIssue(title: string, description: string) {
  try {
    // For global escalations from shift managers, find any admin to act as submitter 
    // or we assume it's system generated. We'll find the first admin.
    const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
    if (!admin) throw new Error("No admin found to link escalation to.");

    await prisma.complaint.create({
      data: {
        title,
        description,
        issueType: "Escalation",
        severity: "HIGH",
        status: "PENDING",
        submitterId: admin.id
      }
    });
    return { success: true };
  } catch (error: any) {
    console.error("Failed to escalate issue:", error);
    return { success: false, error: error.message };
  }
}

export async function logAlert(type: string, details: string) {
  try {
    // We just console log or we could save to a generic Logs table if we had one.
    // For now we simulate an API call to Twilio/Zoom
    console.log(`[SYSTEM ALERT LOGGED] Type: ${type} | Details: ${details}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
