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
        <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/10">
          <div>
            <h1 className="text-3xl md:text-4xl font-jetbrains font-extrabold text-foreground">
              PROJECT_DATABASE
            </h1>
            <p className="font-mono text-sm text-foreground/50 mt-2 uppercase tracking-widest">
              System Schema Editor
            </p>
          </div>
          <Link href="/moze-cmd-center" className="font-mono text-sm text-foreground hover:text-accent transition-colors border border-border/40 px-4 py-2 hover:bg-foreground/5">
            {"<--"} SYSTEM.ADMIN
          </Link>
        </div>

        <ProjectManager initialProjects={projects} />
      </div>
    </main>
  );
}
