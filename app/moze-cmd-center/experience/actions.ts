'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('moze_admin_session');
  if (session?.value !== 'authenticated') {
    throw new Error('Unauthorized');
  }
}

export async function createExperience(formData: FormData) {
  await checkAuth();

  const company = formData.get('company') as string;
  const role = formData.get('role') as string;
  const startDate = formData.get('startDate') as string;
  const endDate = formData.get('endDate') as string;
  const description = formData.get('description') as string;

  await prisma.experience.create({
    data: {
      company,
      role,
      startDate,
      endDate: endDate || null,
      description,
    },
  });

  revalidatePath('/moze-cmd-center/experience');
}

export async function deleteExperience(id: string) {
  await checkAuth();

  await prisma.experience.delete({
    where: { id },
  });

  revalidatePath('/moze-cmd-center/experience');
}
