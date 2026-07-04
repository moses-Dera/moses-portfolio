'use server';

import prisma from '@/lib/prisma';

export async function getResumeUrl() {
  const activeResume = await prisma.resume.findFirst({
    where: { isActive: true }
  });
  return activeResume?.url || null;
}
