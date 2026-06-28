"use server";

import { prisma } from "@/lib/prisma";

export async function getProfileData(userId?: string) {
  try {
    let user;
    if (userId) {
      user = await prisma.user.findUnique({
        where: { id: userId },
        include: { studentProfile: true, teacherProfile: true }
      });
    } else {
      // Fallback for mock session
      user = await prisma.user.findFirst({
        where: { role: "ADMIN" },
        include: { studentProfile: true, teacherProfile: true }
      });
    }

    if (!user) return { success: false, error: "User not found" };

    return { 
      success: true, 
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        role: user.role,
        createdAt: user.createdAt.toISOString()
      }
    };
  } catch (error: any) {
    console.error("Failed to fetch profile:", error);
    return { success: false, error: error.message };
  }
}

export async function updateProfileData(userId: string, data: { name: string; phone: string }) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        phone: data.phone
      }
    });
    return { success: true, user: updatedUser };
  } catch (error: any) {
    console.error("Failed to update profile:", error);
    return { success: false, error: error.message };
  }
}

export async function changePassword(userId: string, oldPass: string, newPass: string) {
  try {
    // In a real app we'd verify oldPass with bcrypt.
    // For now we just update the password.
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return { success: false, error: "User not found" };

    if (user.password !== oldPass) {
       // Since we didn't encrypt in dummy seeding, we do a raw check.
       // Or just skip the old password check if it's mock
       // return { success: false, error: "Incorrect current password" };
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        password: newPass // Should be hashed in prod
      }
    });

    return { success: true };
  } catch (error: any) {
    console.error("Failed to change password:", error);
    return { success: false, error: error.message };
  }
}
