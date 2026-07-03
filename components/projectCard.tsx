import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
        className="group relative bg-black/20 backdrop-blur-md border border-white/10 p-6 hover:border-(--color-accent) transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] flex flex-col h-full cursor-pointer"
        style={{
          clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
        }}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-(--color-accent)/0 to-(--color-accent)/10 opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="relative w-full h-64 bg-black/40 mb-6 overflow-hidden border border-white/5"
             style={{ clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))' }}>
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-mono text-white/20">
              NO_IMAGE_DATA
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col">
          <h3 className="text-2xl font-jetbrains font-bold text-white mb-3 group-hover:text-(--color-accent) transition-colors">{name}</h3>
          <p className="text-(--color-muted) mb-6 flex-1 line-clamp-3 leading-relaxed">{description}</p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {techs.map((tech, i) => (
              <span key={i} className="text-xs font-mono text-(--color-accent) bg-(--color-accent)/10 px-2 py-1 border border-(--color-accent)/20"
                    style={{ clipPath: 'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))' }}>
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
