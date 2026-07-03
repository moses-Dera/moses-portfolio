import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

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
    <div className="max-w-5xl mx-auto p-6 md:p-12 w-full mt-10">
      <Link href="/project" className="inline-flex items-center text-(--color-muted) hover:text-(--color-accent) mb-8 font-mono text-sm transition-colors">
        {"<-- RETURN_TO_PROJECTS"}
      </Link>

      {/* Header section */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-jetbrains font-extrabold text-white mb-6">
          {project.title}
        </h1>
        <div className="flex flex-wrap gap-3 mb-8">
          {techStack.map((tech, i) => (
            <span key={i} className="text-sm font-mono text-(--color-accent) bg-(--color-accent)/10 px-3 py-1 border border-(--color-accent)/20"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Hero Image */}
      {project.coverImage && (
        <div className="relative w-full h-[400px] md:h-[600px] mb-12 border border-white/10 bg-black/40 shadow-[0_0_50px_rgba(59,130,246,0.1)]"
             style={{ clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px))' }}>
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
            return <h2 key={idx} className="text-2xl font-fira font-bold text-white mt-12 mb-6 border-b border-white/10 pb-2">{paragraph.replace('## ', '')}</h2>;
          }
          if (paragraph.startsWith('![Screenshot]')) {
            const url = paragraph.match(/\((.*?)\)/)?.[1];
            if (url) {
              return (
                <div key={idx} className="my-8 border border-white/10 p-2 bg-white/5"
                     style={{ clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt="Project screenshot" className="w-full h-auto" />
                </div>
              );
            }
          }
          return <p key={idx} className="mb-4 leading-relaxed">{paragraph}</p>;
        })}
      </div>

      {/* Action Links */}
      <div className="mt-16 flex gap-6 border-t border-white/10 pt-8">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" 
             className="px-8 py-4 font-jetbrains font-bold bg-(--color-accent) text-white hover:bg-blue-600 transition-colors"
             style={{ clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))' }}>
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
