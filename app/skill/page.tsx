import prisma from '@/lib/prisma';
import SkillList from '@/components/SkillList';

export const revalidate = 60; // Optional cache

export default async function SkillPage() {
  let skills = [];
  try {
    skills = await prisma.skill.findMany({
      orderBy: { order: 'asc' }
    });
  } catch (error) {
    console.warn("Prisma Accelerate Connection Error (Gracefully handled):", error);
  }

  return (
    <div className="max-w-6xl mx-auto w-full px-6 md:px-12 pt-10 relative z-10 pb-32">
      <SkillList skills={skills} />
    </div>
  );
}
