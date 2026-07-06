import React from 'react';
import ProjectCard from '@/components/projectCard';
import prisma from '@/lib/prisma';

interface Project {
  id: string;
  title: string;
  description: string;
  coverImage: string | null;
  techStack: string;
}

export const revalidate = 0; // Ensure data is always fresh

export default async function ProjectsPage() {
  let projects: Project[] = [];
  try {
    projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.warn("Prisma Accelerate Connection Error (Gracefully handled):", error);
  }

  return (
    <div className="max-w-6xl mx-auto w-full px-6 md:px-12 pt-10 relative z-10 pb-32">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-jetbrains font-extrabold text-foreground mb-4 tracking-tight">
          {"// "}PROJECTS
        </h1>
        <p className="font-mono text-foreground/80 font-semibold border-l-2 border-accent pl-4 text-sm md:text-base max-w-2xl mx-auto md:mx-0">
          A showcase of systems, architectures, and applications I have engineered.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {projects.length === 0 ? (
           <div className="text-foreground/80 font-mono font-semibold">
            {"// Archiving project data..."}
          </div>
        ) : (
          projects.map((project: Project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.title}
              description={project.description}
              techStack={project.techStack}
              image={project.coverImage || undefined}
            />
          ))
        )}
      </div>
    </div>
  );
}
