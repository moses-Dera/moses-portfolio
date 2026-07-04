'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { uploadImage, saveProject } from './actions';
import { useRouter } from 'next/navigation';

const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  coverImage: z.string().optional().nullable(),
  repoUrl: z.string().optional().nullable(),
  liveUrl: z.string().optional().nullable(),
  techStack: z.string().min(1, 'At least one tech stack item is required'),
  content: z.string().min(1, 'Content is required'),
});

type ProjectSchema = z.infer<typeof projectSchema>;

import { Project } from './ProjectManager';

export function ProjectForm({ project, onCancel }: { project?: Project, onCancel: () => void }) {
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ProjectSchema>({
    resolver: zodResolver(projectSchema),
    defaultValues: project || {
      title: '', description: '', coverImage: '', repoUrl: '', liveUrl: '', techStack: '', content: ''
    }
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const coverImage = watch('coverImage');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    
    const result = await uploadImage(formData);
    if (result.url) {
      setValue('coverImage', result.url);
    } else {
      setError(result.error || 'Upload failed');
    }
    setUploading(false);
  };

  const onSubmit = async (data: ProjectSchema) => {
    setError('');
    const result = await saveProject(data);
    if (result.success) {
      router.refresh();
      onCancel(); // Close form
    } else {
      setError(result.error || 'Failed to save project');
    }
  };

  return (
    <div className="bg-black/40 border border-white/10 p-6 relative"
         style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}>
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h3 className="text-xl font-bold font-mono text-zinc-200">
          {project ? 'Edit Project' : 'New Project'}
        </h3>
        <button type="button" onClick={onCancel} className="font-mono text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
          {"<-- RETURN_TO_LIST"}
        </button>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1 uppercase tracking-wider">Title</label>
            <input {...register('title')} className="w-full bg-black/50 border border-white/10 p-2 font-mono text-white text-sm focus:outline-none focus:border-red-500/50" />
            {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1 uppercase tracking-wider">Tech Stack (comma separated)</label>
            <input {...register('techStack')} className="w-full bg-black/50 border border-white/10 p-2 font-mono text-white text-sm focus:outline-none focus:border-red-500/50" placeholder="Next.js, TypeScript, Prisma" />
            {errors.techStack && <p className="text-red-400 text-xs mt-1">{errors.techStack.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-zinc-400 mb-1 uppercase tracking-wider">Description (Short)</label>
          <input {...register('description')} className="w-full bg-black/50 border border-white/10 p-2 font-mono text-white text-sm focus:outline-none focus:border-red-500/50" />
          {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-mono text-zinc-400 mb-1 uppercase tracking-wider">Cover Image</label>
          <div className="flex gap-4 items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {coverImage && <img src={coverImage} alt="Cover" className="h-12 w-20 object-cover border border-white/10" />}
            <div className="flex-1">
              <input type="file" onChange={handleFileUpload} accept="image/*" className="text-xs font-mono text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xs file:font-mono file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer" />
            </div>
            {uploading && <span className="text-xs text-red-400 animate-pulse">Uploading...</span>}
          </div>
          <input type="hidden" {...register('coverImage')} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1 uppercase tracking-wider">Project URL (optional)</label>
            <input {...register('liveUrl')} className="w-full bg-black/50 border border-white/10 p-2 font-mono text-white text-sm focus:outline-none focus:border-red-500/50" />
          </div>
          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1 uppercase tracking-wider">Repo URL (optional)</label>
            <input {...register('repoUrl')} className="w-full bg-black/50 border border-white/10 p-2 font-mono text-white text-sm focus:outline-none focus:border-red-500/50" />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">Case Study Content (Markdown)</label>
            <div className="relative">
              <input 
                type="file" 
                id="galleryUpload"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setUploading(true);
                  const formData = new FormData();
                  formData.append('file', file);
                  const result = await uploadImage(formData);
                  if (result.url) {
                    const currentContent = getValues('content') || '';
                    setValue('content', currentContent + `\n\n![Gallery Image](${result.url})`);
                  } else {
                    setError(result.error || 'Upload failed');
                  }
                  setUploading(false);
                  e.target.value = ''; // Reset input
                }} 
                accept="image/*" 
                className="hidden" 
              />
              <label htmlFor="galleryUpload" className="cursor-pointer px-3 py-1 bg-white/10 hover:bg-white/20 text-white font-mono text-xs border border-white/20 flex items-center gap-2">
                {uploading ? 'UPLOADING...' : '+ ADD GALLERY IMAGE'}
              </label>
            </div>
          </div>
          <textarea {...register('content')} rows={8} className="w-full bg-black/50 border border-white/10 p-2 font-mono text-white text-sm focus:outline-none focus:border-red-500/50" placeholder="Write markdown here. Click '+ Add Gallery Image' to auto-insert uploaded images..." />
          {errors.content && <p className="text-red-400 text-xs mt-1">{errors.content.message}</p>}
        </div>

        {error && <div className="text-red-400 text-xs font-mono mt-2">{error}</div>}

        <div className="flex justify-end gap-4 mt-6">
          <button type="button" onClick={onCancel} className="px-4 py-2 font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting || uploading} className="bg-white text-black px-6 py-2 font-mono text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors disabled:opacity-50">
            {isSubmitting ? 'Saving...' : 'Save Project'}
          </button>
        </div>
      </form>
    </div>
  );
}
