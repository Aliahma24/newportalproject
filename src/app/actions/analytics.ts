"use server";

import { prisma } from "@/lib/prisma";

export async function getDirectorData() {
  try {
    const totalStudents = await prisma.user.count({ where: { role: "STUDENT" } });
    const totalTeachers = await prisma.user.count({ where: { role: "TEACHER" } });
    const activeClasses = await prisma.classSession.count({ where: { status: { in: ["LIVE", "SCHEDULED"] } } });
    
    // Calculate actual revenue
    const paidInvoices = await prisma.invoice.findMany({ where: { status: "PAID" } });
    const realRevenue = paidInvoices.reduce((sum, inv) => sum + inv.amount, 0);

    return {
      metrics: {
        annualRevenue: `$${realRevenue.toLocaleString()}`,
        studentRetention: "98.2%",
        facultyExpansion: `+${totalTeachers} New`,
        activeStudents: totalStudents,
        activeClasses
      },
      regionalGrowth: [
        { region: "United Kingdom", share: 45, students: Math.floor(totalStudents * 0.45), growth: "+12%" },
        { region: "United States", share: 35, students: Math.floor(totalStudents * 0.35), growth: "+8%" },
        { region: "Gulf / UAE", share: 20, students: Math.floor(totalStudents * 0.20), growth: "+18%" },
      ]
    };
  } catch (error) {
    console.error("Failed to fetch director data:", error);
    return null;
  }
}

export async function getManagerData() {
  try {
    const totalStudents = await prisma.user.count({ where: { role: "STUDENT" } });
    const activeFaculty = await prisma.user.count({ where: { role: "TEACHER" } });
    const openEscalations = await prisma.complaint.count({ where: { status: "PENDING" } });

    return {
      metrics: {
        totalStudents,
        activeFaculty,
        globalEfficiency: "94.2%",
        openEscalations
      },
      shiftManagers: [
        { name: "Fatima Zahra", region: "United Kingdom", status: "On-Shift", efficiency: "92%", escalations: openEscalations },
        { name: "John Doe", region: "United States", status: "Off-Shift", efficiency: "89%", escalations: 0 },
        { name: "Hassan Malik", region: "UAE / Gulf", status: "On-Shift", efficiency: "95%", escalations: 0 },
      ],
      regionalPerformance: [
        { region: "UK", revenue: "42%", students: Math.floor(totalStudents * 0.45), growth: "+8%" },
        { region: "USA", revenue: "38%", students: Math.floor(totalStudents * 0.35), growth: "+4%" },
        { region: "Gulf", revenue: "20%", students: Math.floor(totalStudents * 0.20), growth: "+12%" },
      ]
    };
  } catch (error) {
    console.error("Failed to fetch manager data:", error);
    return null;
  }
}

export async function getMonitoringData() {
  try {
    const liveClasses = await prisma.classSession.findMany({
      where: { status: "LIVE" },
      include: {
        teacher: true,
        student: true
      }
    });

    return {
      liveClasses: liveClasses.map(c => ({
        id: c.id,
        teacher: c.teacher.name,
        student: c.student.name,
        startTime: c.actualStart ? new Date(c.actualStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A",
        duration: c.actualStart ? `${Math.floor((new Date().getTime() - new Date(c.actualStart).getTime()) / 60000)}m` : "0m",
        status: "Watching", // Default UI status
        quality: "Good"
      }))
    };
  } catch (error) {
    console.error("Failed to fetch monitoring data:", error);
    return null;
  }
}

export async function getSchedulerData() {
  try {
    const scheduledClasses = await prisma.classSession.findMany({
      where: { status: "SCHEDULED" },
      include: {
        teacher: true,
        student: {
          include: { studentProfile: true }
        }
      },
      orderBy: { scheduledStart: "asc" }
    });

    return {
      classes: scheduledClasses.map(c => ({
        id: c.id,
        time: new Date(c.scheduledStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        country: "Unknown", // Assuming no country on user
        student: { 
          name: c.student.name, 
          contact: c.student.phone || "N/A", 
          guardian: c.student.studentProfile?.guardianName || "N/A", 
          localTime: new Date(c.scheduledStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        },
        teacher: { 
          name: c.teacher.name, 
          contact: c.teacher.phone || "N/A", 
          status: "Available" 
        },
        subject: c.title,
        status: "Scheduled",
        attempts: 0
      }))
    };
  } catch (error) {
    console.error("Failed to fetch scheduler data:", error);
    return null;
  }
}
