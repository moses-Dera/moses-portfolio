import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { SiReact, SiTypescript, SiVite, SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb, SiNextdotjs, SiJavascript, SiPostgresql, SiPython, SiPrisma, SiDocker, SiRedis, SiFramer, SiGit } from 'react-icons/si';

const getTechIcon = (tech: string) => {
  const t = tech.toLowerCase();
  if (t.includes('react')) return <SiReact className="inline mr-2 text-[1.1em] mb-[2px]" />;
  if (t.includes('typescript')) return <SiTypescript className="inline mr-2 text-[1.1em] mb-[2px]" />;
  if (t.includes('vite')) return <SiVite className="inline mr-2 text-[1.1em] mb-[2px]" />;
  if (t.includes('tailwind')) return <SiTailwindcss className="inline mr-2 text-[1.1em] mb-[2px]" />;
  if (t.includes('node')) return <SiNodedotjs className="inline mr-2 text-[1.1em] mb-[2px]" />;
  if (t.includes('express')) return <SiExpress className="inline mr-2 text-[1.1em] mb-[2px]" />;
  if (t.includes('mongo')) return <SiMongodb className="inline mr-2 text-[1.1em] mb-[2px]" />;
  if (t.includes('next')) return <SiNextdotjs className="inline mr-2 text-[1.1em] mb-[2px]" />;
  if (t.includes('javascript')) return <SiJavascript className="inline mr-2 text-[1.1em] mb-[2px]" />;
  if (t.includes('postgres')) return <SiPostgresql className="inline mr-2 text-[1.1em] mb-[2px]" />;
  if (t.includes('python')) return <SiPython className="inline mr-2 text-[1.1em] mb-[2px]" />;
  if (t.includes('prisma')) return <SiPrisma className="inline mr-2 text-[1.1em] mb-[2px]" />;
  if (t.includes('docker')) return <SiDocker className="inline mr-2 text-[1.1em] mb-[2px]" />;
  if (t.includes('redis')) return <SiRedis className="inline mr-2 text-[1.1em] mb-[2px]" />;
  if (t.includes('framer')) return <SiFramer className="inline mr-2 text-[1.1em] mb-[2px]" />;
  if (t.includes('git')) return <SiGit className="inline mr-2 text-[1.1em] mb-[2px]" />;
  return null;
};

export default async function ProjectCaseStudy({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id }
  });

  if (!project) {
    notFound();
  }

  const techStack = project.techStack.split(',').map(t => t.trim());

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12 w-full mt-10 relative z-10">
      <Link href="/project" className="inline-flex items-center text-(--color-muted) hover:text-(--color-accent) mb-8 font-mono text-sm transition-colors">
        {"<-- RETURN_TO_PROJECTS"}
      </Link>

      {/* Header section */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-jetbrains font-extrabold text-foreground mb-6">
          {project.title}
        </h1>
        <div className="flex flex-wrap gap-3 mb-8">
          {techStack.map((tech, i) => (
            <span key={i} className="flex items-center text-sm font-mono text-(--color-accent) bg-(--color-accent)/10 px-3 py-1 border border-(--color-accent)/20"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}>
              {getTechIcon(tech)}
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Hero Image */}
      {project.coverImage && (
        <div className="relative w-full h-[400px] md:h-[600px] mb-12 border border-border/50 bg-foreground/5 shadow-[0_0_50px_rgba(59,130,246,0.1)]"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)' }}>
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Case Study Content (Basic Markdown rendering approximation) */}
      <div className="prose prose-invert prose-lg max-w-none font-sans text-gray-300">
        {project.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('## ')) {
            let headingText = paragraph.replace('## ', '');
            // Automatically upgrade generic headings to fit the persona
            if (headingText === 'Screenshots' || headingText === 'Screenshot') {
                headingText = 'SYSTEM_INTERFACES';
            }
            
            return (
              <div key={idx} className="flex items-center gap-4 mt-16 mb-8">
                <span className="text-accent font-bold text-xl font-jetbrains">{"//"}</span>
                <h2 className="text-2xl md:text-3xl font-jetbrains font-bold text-foreground uppercase">
                  {headingText}
                </h2>
                <div className="flex-1 h-[1px] bg-border/40 ml-4"></div>
              </div>
            );
          }
          if (paragraph.startsWith('![')) {
            const url = paragraph.match(/\((.*?)\)/)?.[1];
            const alt = paragraph.match(/\[(.*?)\]/)?.[1] || "Project image";
            if (url) {
              return (
                <div key={idx} className="my-12 border border-border/50 p-2 bg-foreground/5 shadow-lg"
                     style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={alt} className="w-full h-auto rounded-sm" />
                </div>
              );
            }
          }
          return <p key={idx} className="mb-6 font-mono text-foreground/80 leading-relaxed text-lg">{paragraph}</p>;
        })}
      </div>

      {/* Action Links */}
      <div className="mt-16 flex gap-6 border-t border-border pt-8">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" 
             className="px-8 py-4 font-jetbrains font-bold bg-(--color-accent) text-white hover:bg-blue-600 transition-colors"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)' }}>
            LAUNCH_APPLICATION
          </a>
        )}
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
             className="px-8 py-4 font-jetbrains font-bold border border-(--color-accent) text-(--color-accent) hover:bg-(--color-accent)/10 transition-colors"
             style={{ clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))' }}>
            VIEW_SOURCE_CODE
          </a>
        )}
      </div>
    </div>
  );
}
