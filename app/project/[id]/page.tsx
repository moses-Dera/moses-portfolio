import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import LightboxGallery from '@/components/LightboxGallery';
import ReactMarkdown from 'react-markdown';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full mt-10 relative z-10">
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
            <div key={i} className="border border-border/40 bg-foreground/5 p-1 transition-all hover:border-(--color-accent)/50 hover:bg-(--color-accent)/10 shadow-sm"
                 style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={getShieldUrl(tech)} alt={tech} className="h-6 md:h-7" />
            </div>
          ))}
        </div>
      </div>

      {/* Hero Image */}
      {project.coverImage && (
        <div className="relative w-full max-h-[70vh] mb-12 border border-border/50 bg-foreground/5 shadow-[0_0_50px_rgba(59,130,246,0.1)] flex items-center justify-center overflow-hidden"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-auto max-h-[70vh] object-contain rounded-t-sm"
          />
        </div>
      )}

      {/* Case Study Content (Basic Markdown rendering approximation) */}
      <div className="max-w-5xl">
        <div className="prose prose-invert prose-lg max-w-none font-sans text-gray-300">
        {(() => {
          const blocks: React.ReactNode[] = [];
          const paragraphs = project.content.split('\n\n');
          let imageGallery: {url: string, alt: string}[] = [];

          const flushGallery = (key: string) => {
            if (imageGallery.length > 0) {
              blocks.push(<LightboxGallery key={key} images={imageGallery} />);
              imageGallery = [];
            }
          };

          paragraphs.forEach((paragraph, idx) => {
            const imgRegex = /!\[(.*?)\]\((.*?)\)/g;
            const textWithoutImages = paragraph.replace(imgRegex, '').trim();

            if (textWithoutImages.length === 0 && paragraph.includes('![')) {
              let match;
              while ((match = imgRegex.exec(paragraph)) !== null) {
                imageGallery.push({ alt: match[1] || 'Project image', url: match[2] });
              }
            } else {
              flushGallery(`gallery-${idx}`);
              
              if (paragraph.startsWith('## ')) {
                let headingText = paragraph.replace('## ', '');
                if (headingText === 'Screenshots' || headingText === 'Screenshot') headingText = 'SYSTEM_INTERFACES';
                blocks.push(
                  <div key={`h2-${idx}`} className="flex items-center gap-4 mt-16 mb-8">
                    <span className="text-(--color-accent) font-bold text-xl font-jetbrains">{"//"}</span>
                    <h2 className="text-2xl md:text-3xl font-jetbrains font-bold text-foreground uppercase">
                      {headingText}
                    </h2>
                    <div className="flex-1 h-[1px] bg-border/40 ml-4"></div>
                  </div>
                );
              } else {
                blocks.push(
                  <div key={`md-${idx}`} className="mb-6 font-mono text-foreground/80 leading-relaxed text-lg 
                    [&>h3]:text-xl [&>h3]:md:text-2xl [&>h3]:font-jetbrains [&>h3]:font-bold [&>h3]:text-foreground/90 [&>h3]:mt-8 [&>h3]:mb-4
                    [&>ul]:ml-6 [&>ul]:list-disc [&>ul]:marker:text-(--color-accent) [&>ul]:space-y-2 [&>ul]:mb-6
                    [&>ol]:ml-6 [&>ol]:list-decimal [&>ol]:marker:text-(--color-accent) [&>ol]:space-y-2 [&>ol]:mb-6
                    [&>p>strong]:text-white [&>p>strong]:font-bold
                    [&>li>strong]:text-white [&>li>strong]:font-bold
                    [&_a]:text-(--color-accent) [&_a]:hover:underline
                    [&_blockquote]:border-l-4 [&_blockquote]:border-(--color-accent) [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-foreground/60
                    [&_code]:bg-foreground/10 [&_code]:px-1 [&_code]:rounded
                  ">
                    <ReactMarkdown>{paragraph}</ReactMarkdown>
                  </div>
                );
              }
            }
          });

          flushGallery(`gallery-end`);
          return blocks;
        })()}
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
    </div>
  );
}
