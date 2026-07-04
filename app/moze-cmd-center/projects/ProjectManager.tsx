'use client';

import { useState } from 'react';
import { ProjectForm } from './ProjectForm';
import { deleteProject } from './actions';
import { useRouter } from 'next/navigation';
import { DeleteButton } from '@/components/DeleteButton';

export interface Project {
  id: string;
  title: string;
  description: string;
  coverImage: string | null;
  repoUrl: string | null;
  liveUrl: string | null;
  techStack: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export function ProjectManager({ initialProjects }: { initialProjects: Project[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    await deleteProject(id);
    router.refresh();
  };

  return (
    <div className="space-y-8">
      {!isCreating && !editingId && (
        <button
          onClick={() => setIsCreating(true)}
          className="bg-white text-black px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
          style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
        >
          + Initialize New Project
        </button>
      )}

      {isCreating && (
        <ProjectForm onCancel={() => setIsCreating(false)} />
      )}

      <div className="grid grid-cols-1 gap-4">
        {initialProjects.map((project) => (
          <div key={project.id} className="border border-white/10 bg-black/20 p-6 flex flex-col md:flex-row gap-6 md:items-center justify-between group hover:bg-white/5 transition-colors">
            
            {editingId === project.id ? (
              <div className="w-full">
                <ProjectForm project={project} onCancel={() => setEditingId(null)} />
              </div>
            ) : (
              <>
                <div className="flex gap-6 items-center flex-1">
                  {project.coverImage ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={project.coverImage} alt={project.title} className="w-24 h-16 object-cover border border-white/10" />
                    </>
                  ) : (
                    <div className="w-24 h-16 bg-white/5 border border-white/10 flex items-center justify-center">
                      <span className="text-zinc-600 font-mono text-xs">NO IMG</span>
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-zinc-200">{project.title}</h3>
                    <p className="text-zinc-500 font-mono text-xs mt-1 truncate max-w-md">{project.techStack}</p>
                  </div>
                </div>
                
                <div className="flex gap-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setEditingId(project.id)} className="text-zinc-400 hover:text-white font-mono text-xs uppercase tracking-widest px-3 py-1 border border-white/10">
                    Edit
                  </button>
                  <DeleteButton 
                    id={project.id}
                    onDelete={handleDelete}
                    className="text-red-500/70 hover:text-red-400 font-mono text-xs uppercase tracking-widest px-3 py-1 border border-red-500/30"
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
