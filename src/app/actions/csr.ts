"use server";

import { prisma } from "@/lib/prisma";

export async function getCsrDashboardData() {
  try {
    const demos = await prisma.demoRequest.findMany({
      orderBy: { createdAt: "desc" },
    });

    const pendingCount = demos.filter(d => d.status === "PENDING").length;
    const completedCount = demos.filter(d => d.status === "COMPLETED").length;
    const totalCount = demos.length;
    
    // Simplistic conversion rate: completed / total
    const conversionRate = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
    
    // Demos scheduled or created today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const demosToday = demos.filter(d => new Date(d.createdAt) >= today).length;

    return {
      stats: {
        totalRequests: totalCount,
        pendingScheduling: pendingCount,
        demosToday,
        conversionRate
      },
      demos
    };
  } catch (error) {
    console.error("Failed to fetch CSR data:", error);
    return null;
  }
}

export async function submitDemoRequest(data: any) {
  try {
    const { guardianName, whatsapp, country, demoDate, demoTime, days, students, isSelfStudent, selfLevel, selfSpecialInstructions } = data;

    const formattedTime = `${demoDate}T${demoTime}:00`;

    if (isSelfStudent) {
      await prisma.demoRequest.create({
        data: {
          guardianName,
          studentName: guardianName,
          studentAge: 18, // Default or mock age for adult
          studentLevel: selfLevel,
          phone: whatsapp,
          country,
          preferredTime: formattedTime,
          preferredDays: days,
          status: "PENDING"
        }
      });
    } else {
      // Multiple students
      for (const student of students) {
        if (!student.name) continue;
        await prisma.demoRequest.create({
          data: {
            guardianName,
            studentName: student.name,
            studentAge: parseInt(student.age) || 0,
            studentLevel: student.level,
            phone: whatsapp,
            country,
            preferredTime: formattedTime,
            preferredDays: days,
            status: "PENDING"
          }
        });
      }
    }

    return { success: true };
  } catch (error: any) {
    console.error("Failed to submit demo request:", error);
    return { success: false, error: error.message };
  }
}
