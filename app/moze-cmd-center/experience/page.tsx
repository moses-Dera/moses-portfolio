import prisma from '@/lib/prisma';
import { createExperience, deleteExperience } from './actions';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const revalidate = 0;

export default async function ManageExperiencePage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('moze_admin_session');
  
  if (session?.value !== 'authenticated') {
    redirect('/moze-cmd-center');
  }

  const experiences = await prisma.experience.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/40">
        <div>
          <h1 className="text-3xl font-jetbrains font-extrabold text-foreground">MANAGE_EXPERIENCE</h1>
          <p className="font-mono text-sm text-foreground/50 mt-1">Update your professional timeline.</p>
        </div>
        <Link href="/moze-cmd-center" className="font-mono text-sm text-foreground hover:text-accent transition-colors border border-border/40 px-4 py-2 hover:bg-foreground/5">
          {"<--"} SYSTEM.ADMIN
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ADD EXPERIENCE FORM */}
        <div className="col-span-1 border border-border/40 bg-foreground/5 p-6 h-fit sticky top-24">
          <h2 className="text-xl font-bold font-jetbrains mb-6 text-accent">{"// ADD_NEW"}</h2>
          
          <form action={createExperience} className="flex flex-col gap-4">
            <div>
              <label className="block font-mono text-xs text-foreground/70 mb-1">COMPANY</label>
              <input name="company" type="text" required className="w-full bg-background border border-border/40 p-2 font-mono text-sm focus:border-accent outline-none" />
            </div>
            
            <div>
              <label className="block font-mono text-xs text-foreground/70 mb-1">ROLE</label>
              <input name="role" type="text" required className="w-full bg-background border border-border/40 p-2 font-mono text-sm focus:border-accent outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs text-foreground/70 mb-1">START_DATE</label>
                <input name="startDate" type="text" required placeholder="e.g. 2021" className="w-full bg-background border border-border/40 p-2 font-mono text-sm focus:border-accent outline-none" />
              </div>
              <div>
                <label className="block font-mono text-xs text-foreground/70 mb-1">END_DATE</label>
                <input name="endDate" type="text" placeholder="e.g. Present" className="w-full bg-background border border-border/40 p-2 font-mono text-sm focus:border-accent outline-none" />
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs text-foreground/70 mb-1">DESCRIPTION</label>
              <textarea name="description" required rows={5} className="w-full bg-background border border-border/40 p-2 font-mono text-sm focus:border-accent outline-none"></textarea>
            </div>

            <button type="submit" className="mt-4 bg-accent text-white font-jetbrains font-bold py-3 hover:bg-accent/80 transition-colors">
              EXECUTE.INSERT()
            </button>
          </form>
        </div>

        {/* EXPERIENCE LIST */}
        <div className="col-span-2 flex flex-col gap-6">
          {experiences.length === 0 ? (
            <div className="border border-border/20 p-8 text-center font-mono text-foreground/50">
              No experience records found.
            </div>
          ) : (
            experiences.map((exp) => (
              <div key={exp.id} className="border border-border/40 bg-background p-6 hover:border-accent/50 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold font-jetbrains text-foreground">{exp.role}</h3>
                    <p className="text-accent font-mono text-sm">@ {exp.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-xs text-foreground/50">{exp.startDate} - {exp.endDate || 'Present'}</p>
                    <form action={async () => {
                      'use server';
                      await deleteExperience(exp.id);
                    }}>
                      <button type="submit" className="text-red-500 hover:text-red-400 font-mono text-xs mt-2 border border-red-500/30 px-2 py-1 bg-red-500/10">
                        DELETE
                      </button>
                    </form>
                  </div>
                </div>
                
                <p className="font-sans text-foreground/80 whitespace-pre-wrap text-sm leading-relaxed border-t border-border/20 pt-4 mt-2">
                  {exp.description}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
