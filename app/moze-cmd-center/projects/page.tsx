import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ProjectManager } from "./ProjectManager";

export default async function ManageProjectsPage() {
  const session = await getSession();
  if (!session) redirect("/moze-cmd-center");

  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="min-h-screen pt-32 px-6 pb-24 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/moze-cmd-center" className="text-zinc-500 hover:text-white font-mono text-sm transition-colors">
            ← Back to Command Center
          </Link>
        </div>
        
        <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              Project <span className="text-zinc-500">Database</span>
            </h1>
            <p className="text-zinc-400 font-mono text-sm uppercase tracking-widest">
              Live Schema Editor
            </p>
          </div>
        </div>

        <ProjectManager initialProjects={projects} />
      </div>
    </main>
  );
}
