'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('moze_admin_session');
  if (!session?.value) {
    throw new Error('Unauthorized');
  }
}

export async function createSkill(formData: FormData) {
  await checkAuth();
  
  const category = formData.get('category') as string;
  const description = formData.get('description') as string;
  const techStack = formData.get('techStack') as string;
  const orderStr = formData.get('order') as string;
  const order = orderStr ? parseInt(orderStr, 10) : 1;

  await prisma.skill.create({
    data: {
      category,
      description,
      techStack,
      order: isNaN(order) ? 1 : order,
    },
  });

  revalidatePath('/moze-cmd-center/skills');
  revalidatePath('/skill');
  revalidatePath('/');
}

export async function deleteSkill(id: string) {
  await checkAuth();
  
  await prisma.skill.delete({
    where: { id },
  });

  revalidatePath('/moze-cmd-center/skills');
  revalidatePath('/skill');
  revalidatePath('/');
}
