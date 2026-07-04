import prisma from '@/lib/prisma';
import SkillList from '@/components/SkillList';

export const revalidate = 60; // Optional cache

export default async function SkillPage() {
  const skills = await prisma.skill.findMany({
    orderBy: { order: 'asc' }
  });

  return <SkillList skills={skills} />;
}
