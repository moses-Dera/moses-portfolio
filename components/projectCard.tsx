import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SiReact, SiTypescript, SiVite, SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb, SiNextdotjs, SiJavascript, SiPostgresql, SiPython, SiPrisma, SiDocker, SiRedis, SiFramer, SiGit } from 'react-icons/si';

const getTechIcon = (tech: string) => {
  const t = tech.toLowerCase();
  if (t.includes('react')) return <SiReact className="inline mr-1 text-[1em] mb-[2px]" />;
  if (t.includes('typescript')) return <SiTypescript className="inline mr-1 text-[1em] mb-[2px]" />;
  if (t.includes('vite')) return <SiVite className="inline mr-1 text-[1em] mb-[2px]" />;
  if (t.includes('tailwind')) return <SiTailwindcss className="inline mr-1 text-[1em] mb-[2px]" />;
  if (t.includes('node')) return <SiNodedotjs className="inline mr-1 text-[1em] mb-[2px]" />;
  if (t.includes('express')) return <SiExpress className="inline mr-1 text-[1em] mb-[2px]" />;
  if (t.includes('mongo')) return <SiMongodb className="inline mr-1 text-[1em] mb-[2px]" />;
  if (t.includes('next')) return <SiNextdotjs className="inline mr-1 text-[1em] mb-[2px]" />;
  if (t.includes('javascript')) return <SiJavascript className="inline mr-1 text-[1em] mb-[2px]" />;
  if (t.includes('postgres')) return <SiPostgresql className="inline mr-1 text-[1em] mb-[2px]" />;
  if (t.includes('python')) return <SiPython className="inline mr-1 text-[1em] mb-[2px]" />;
  if (t.includes('prisma')) return <SiPrisma className="inline mr-1 text-[1em] mb-[2px]" />;
  if (t.includes('docker')) return <SiDocker className="inline mr-1 text-[1em] mb-[2px]" />;
  if (t.includes('redis')) return <SiRedis className="inline mr-1 text-[1em] mb-[2px]" />;
  if (t.includes('framer')) return <SiFramer className="inline mr-1 text-[1em] mb-[2px]" />;
  if (t.includes('git')) return <SiGit className="inline mr-1 text-[1em] mb-[2px]" />;
  return null;
};

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  techStack: string;
  image?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, name, description, techStack, image }) => {
  const techs = techStack.split(',').map(t => t.trim()).filter(Boolean);

  return (
    <Link href={`/project/${id}`}>
      <div 
        className="group relative bg-foreground/5 backdrop-blur-md border border-border/50 p-6 hover:border-(--color-accent) transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] flex flex-col h-full cursor-pointer"
        style={{
          clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
        }}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-(--color-accent)/0 to-(--color-accent)/10 opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="relative w-full h-64 bg-foreground/10 mb-6 overflow-hidden border border-border/20"
             style={{ clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))' }}>
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-mono text-foreground/20">
              NO_IMAGE_DATA
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col">
          <h3 className="text-2xl font-jetbrains font-bold text-foreground mb-3 group-hover:text-(--color-accent) transition-colors">{name}</h3>
          <p className="text-foreground/70 mb-6 flex-1 line-clamp-3 leading-relaxed">{description}</p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {techs.map((tech, i) => (
              <span key={i} className="flex items-center text-xs font-mono text-(--color-accent) bg-(--color-accent)/10 px-2 py-1 border border-(--color-accent)/20"
                    style={{ clipPath: 'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))' }}>
                {getTechIcon(tech)}
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
