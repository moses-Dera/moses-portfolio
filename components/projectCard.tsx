import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  techStack: string;
  image?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, name, description, techStack, image }) => {
  const techs = techStack.split(',').map((t: string) => t.trim()).filter(Boolean);

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
            {techs.map((tech: string, i: number) => (
              <div key={i} className="border border-border/30 bg-background/40 p-[2px] transition-all hover:border-(--color-accent)/50 hover:bg-(--color-accent)/10"
                   style={{ clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={getShieldUrl(tech)} alt={tech} className="h-5 md:h-6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
