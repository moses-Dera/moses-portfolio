'use server';

import prisma from '@/lib/prisma';

export async function getResumeUrl() {
  try {
    const activeResume = await prisma.resume.findFirst({
      where: { isActive: true }
    });
    return activeResume?.url || null;
  } catch (error) {
    console.warn("Prisma Accelerate Connection Error in getResumeUrl:", error);
    return null;
  }
}
