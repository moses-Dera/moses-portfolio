interface Skill {
  id: string;
  category: string;
  description: string;
  techStack: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
import prisma from '@/lib/prisma';
import { createSkill, deleteSkill } from './actions';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const revalidate = 0;

export default async function ManageSkillsPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('moze_admin_session');
  
  if (!session?.value) {
    redirect('/moze-cmd-center');
  }

  // Fallback to empty array if DB schema isn't fully migrated yet
  let skills: Skill[] = [];
  try {
    skills = await prisma.skill.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch {
    console.warn("Skill model might not be pushed to DB yet.");
  }

  return (
    <main className="min-h-screen pt-32 px-6 pb-24 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/40">
        <div>
          <h1 className="text-3xl font-jetbrains font-extrabold text-foreground">MANAGE_SKILLS</h1>
          <p className="font-mono text-sm text-foreground/50 mt-1">Update your tech stack and proficiency.</p>
        </div>
        <Link href="/moze-cmd-center" className="font-mono text-sm text-foreground hover:text-accent transition-colors border border-border/40 px-4 py-2 hover:bg-foreground/5">
          {"<--"} SYSTEM.ADMIN
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ADD SKILL CATEGORY FORM */}
        <div className="col-span-1 border border-border/40 bg-foreground/5 p-6 h-fit sticky top-24">
          <h2 className="text-xl font-bold font-jetbrains mb-6 text-accent">{"// ADD_NEW"}</h2>
          
          <form action={createSkill} className="flex flex-col gap-4">
            <div>
              <label className="block font-mono text-xs text-foreground/70 mb-1">CATEGORY_TITLE</label>
              <input name="category" type="text" required placeholder="e.g. System Architecture" className="w-full bg-background border border-border/40 p-2 font-mono text-sm focus:border-accent outline-none" />
            </div>

            <div>
              <label className="block font-mono text-xs text-foreground/70 mb-1">DESCRIPTION</label>
              <textarea name="description" required rows={4} className="w-full bg-background border border-border/40 p-2 font-mono text-sm focus:border-accent outline-none"></textarea>
            </div>
            
            <div>
              <label className="block font-mono text-xs text-foreground/70 mb-1">TECH_STACK (Comma separated)</label>
              <textarea name="techStack" required rows={3} placeholder="Python, Next.js, C++" className="w-full bg-background border border-border/40 p-2 font-mono text-sm focus:border-accent outline-none"></textarea>
            </div>

            <div>
              <label className="block font-mono text-xs text-foreground/70 mb-1">ORDER (e.g. 1 for &apos;01&apos;)</label>
              <input name="order" type="number" min="1" defaultValue="1" className="w-full bg-background border border-border/40 p-2 font-mono text-sm focus:border-accent outline-none" />
            </div>

            <button type="submit" className="mt-4 bg-accent text-white font-jetbrains font-bold py-3 hover:bg-accent/80 transition-colors">
              EXECUTE.INSERT()
            </button>
          </form>
        </div>

        {/* SKILLS LIST */}
        <div className="col-span-2 flex flex-col gap-6">
          {skills.length === 0 ? (
            <div className="border border-border/20 p-8 text-center font-mono text-foreground/50">
              No skill categories found or DB not synced.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {skills.map((skill) => (
                <div key={skill.id} className="border border-border/40 bg-background p-4 flex justify-between items-start hover:border-accent/50 transition-colors group">
                  <div className="flex-1 pr-4">
                    <h3 className="text-lg font-bold font-jetbrains text-foreground">
                      <span className="text-accent mr-2">{String(skill.order).padStart(2, '0')}</span>
                      {skill.category}
                    </h3>
                    <p className="font-mono text-xs mt-2 text-foreground/70">{skill.description}</p>
                    <p className="text-accent font-mono text-xs mt-2 break-words">[{skill.techStack}]</p>
                  </div>
                  <form action={async () => {
                    'use server';
                    await deleteSkill(skill.id);
                  }}>
                    <button type="submit" className="text-red-500 hover:text-red-400 font-mono text-xs border border-red-500/30 px-2 py-1 bg-red-500/10 shrink-0">
                      DELETE
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      </div>
    </main>
  );
}
