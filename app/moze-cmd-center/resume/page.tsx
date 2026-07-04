import prisma from '@/lib/prisma';
import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ResumeUpload } from './ResumeUpload';

export const revalidate = 0;

export default async function ManageResumePage() {
  const session = await getSession();
  
  if (!session) {
    redirect('/moze-cmd-center');
  }

  const resumes = await prisma.resume.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="min-h-screen pt-32 px-6 pb-24 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/40">
          <div>
            <h1 className="text-3xl font-jetbrains font-extrabold text-foreground">MANAGE_RESUME</h1>
            <p className="font-mono text-sm text-foreground/50 mt-1">Upload multiple resumes and select the active one.</p>
          </div>
          <Link href="/moze-cmd-center" className="font-mono text-sm text-foreground hover:text-accent transition-colors border border-border/40 px-4 py-2 hover:bg-foreground/5">
            {"<--"} SYSTEM.ADMIN
          </Link>
        </div>

        <div className="border border-border/40 bg-foreground/5 p-6 h-fit">
          <h2 className="text-xl font-bold font-jetbrains mb-6 text-accent">{"// RESUME_VAULT"}</h2>
          
          <ResumeUpload resumes={resumes} />
        </div>
      </div>
    </main>
  );
}
