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
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-6 md:p-12 w-full relative z-10">
      <div className="mb-12">
        <h1 className="text-4xl font-jetbrains font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-(--color-accent) mb-4">
          {"// "}PROJECTS
        </h1>
        <p className="font-mono text-(--color-muted) border-l-2 border-(--color-accent) pl-4">
          A showcase of systems, architectures, and applications I have engineered.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project: Project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            name={project.title}
            description={project.description}
            techStack={project.techStack}
            image={project.coverImage || undefined}
          />
        ))}
      </div>
    </div>
  );
}
