"use server";

import { prisma } from "@/lib/prisma";

export async function submitComplaint(data: {
  submitterId: string;
  category: string;
  details: string;
}) {
  try {
    const complaint = await prisma.complaint.create({
      data: {
        title: data.category,
        description: data.details,
        issueType: data.category,
        severity: "MEDIUM",
        status: "PENDING",
        submitterId: data.submitterId,
      }
    });
    return { success: true, complaint };
  } catch (error: any) {
    console.error("Failed to submit complaint:", error);
    return { success: false, error: error.message };
  }
}

export async function submitLeaveRequest(data: {
  userId: string;
  requestType: string;
  urgency: string;
  justification: string;
}) {
  try {
    const leaveRequest = await prisma.leaveRequest.create({
      data: {
        userId: data.userId,
        leaveType: data.requestType,
        // For simplicity, we use current date as start and end for now
        startDate: new Date(),
        endDate: new Date(),
        reason: `[${data.urgency}] ${data.justification}`,
        status: "PENDING",
      }
    });
    return { success: true, leaveRequest };
  } catch (error: any) {
    console.error("Failed to submit leave request:", error);
    return { success: false, error: error.message };
  }
}
