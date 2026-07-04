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
  
  const name = formData.get('name') as string;
  const category = formData.get('category') as string;
  const proficiencyStr = formData.get('proficiency') as string;
  const proficiency = proficiencyStr ? parseInt(proficiencyStr, 10) : 80;
  const iconUrl = formData.get('iconUrl') as string | null;

  await prisma.skill.create({
    data: {
      name,
      category,
      proficiency: isNaN(proficiency) ? 80 : proficiency,
      iconUrl: iconUrl || null,
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
