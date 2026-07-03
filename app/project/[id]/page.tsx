import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

const getShieldUrl = (tech: string) => {
  const t = tech.toLowerCase().trim();
  let logo = encodeURIComponent(t);
  let color = '1E1E2E';
  
  if (t.includes('react')) { logo = 'react'; color = '61DAFB'; }
  else if (t.includes('typescript')) { logo = 'typescript'; color = '3178C6'; }
  else if (t.includes('vite')) { logo = 'vite'; color = '646CFF'; }
  else if (t.includes('tailwind')) { logo = 'tailwindcss'; color = '06B6D4'; }
  else if (t.includes('node')) { logo = 'node.js'; color = '339933'; }
  else if (t.includes('express')) { logo = 'express'; color = '000000'; }
  else if (t.includes('mongo')) { logo = 'mongodb'; color = '47A248'; }
  else if (t.includes('next')) { logo = 'next.js'; color = '000000'; }
  else if (t.includes('javascript')) { logo = 'javascript'; color = 'F7DF1E'; }
  else if (t.includes('postgres')) { logo = 'postgresql'; color = '4169E1'; }
  else if (t.includes('python')) { logo = 'python'; color = '3776AB'; }
  else if (t.includes('prisma')) { logo = 'prisma'; color = '2D3748'; }
  else if (t.includes('docker')) { logo = 'docker'; color = '2496ED'; }
  else if (t.includes('redis')) { logo = 'redis'; color = 'DC382D'; }
  else if (t.includes('framer')) { logo = 'framer'; color = '0055FF'; }
  else if (t.includes('git')) { logo = 'git'; color = 'F05032'; }
  else if (t.includes('shadcn')) { logo = 'shadcnui'; color = '000000'; }
  else if (t.includes('html')) { logo = 'html5'; color = 'E34F26'; }
  else if (t.includes('css')) { logo = 'css3'; color = '1572B6'; }

  const label = encodeURIComponent(tech.trim());
  return `https://img.shields.io/badge/${label}-${color}?style=for-the-badge&logo=${logo}&logoColor=white`;
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
        <div className="flex flex-wrap gap-2 mb-8">
          {techStack.map((tech, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img key={i} src={getShieldUrl(tech)} alt={tech} className="h-7 hover:scale-105 transition-transform" />
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
