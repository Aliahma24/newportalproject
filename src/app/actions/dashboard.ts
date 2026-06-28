"use server";

import { prisma } from "@/lib/prisma";

export async function getStudentDashboardData(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      studentProfile: true,
      classesAsStudent: {
        include: { teacher: true },
        orderBy: { scheduledStart: 'asc' },
      },
      attendances: true,
    },
  });

  if (!user) throw new Error("User not found");

  const today = new Date();
  const startOfToday = new Date(today.setHours(0, 0, 0, 0));
  const endOfToday = new Date(today.setHours(23, 59, 59, 999));

  // Find today's class
  const todaysClass = user.classesAsStudent.find(c => 
    c.scheduledStart >= startOfToday && c.scheduledStart <= endOfToday
  );

  // Find recent completed classes
  const recentClasses = user.classesAsStudent.filter(c => c.status === 'COMPLETED').slice(0, 5);

  return {
    profile: user.studentProfile,
    todaysClass: todaysClass || null,
    recentClasses,
    attendances: user.attendances,
  };
}

export async function getTeacherDashboardData(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      teacherProfile: true,
      classesAsTeacher: {
        include: { student: true },
        orderBy: { scheduledStart: 'asc' },
      },
      attendances: true,
    },
  });

  if (!user) throw new Error("User not found");

  const today = new Date();
  const startOfToday = new Date(today.setHours(0, 0, 0, 0));
  const endOfToday = new Date(today.setHours(23, 59, 59, 999));

  // Find today's classes
  const todaysClasses = user.classesAsTeacher.filter(c => 
    c.scheduledStart >= startOfToday && c.scheduledStart <= endOfToday
  );

  // Active class is the first one scheduled for today that is not completed
  const activeClass = todaysClasses.find(c => c.status !== 'COMPLETED') || todaysClasses[0] || null;

  // Calculate stats
  const studentsCount = new Set(user.classesAsTeacher.map(c => c.studentId)).size;
  
  return {
    profile: user.teacherProfile,
    activeClass,
    stats: {
      studentsCount,
      todayCount: todaysClasses.length,
      // For now, mocking weekly/monthly as they require more complex date queries
      weekCount: todaysClasses.length * 5, 
      monthCount: todaysClasses.length * 20,
    },
    attendances: user.attendances,
  };
}
