'use client';

import { useState } from 'react';
import { uploadResume, setActiveResume, deleteResume } from './actions';
import { useRouter } from 'next/navigation';
import { DeleteButton } from '@/components/DeleteButton';

export type Resume = {
  id: string;
  title: string;
  url: string;
  isActive: boolean;
  createdAt: Date;
};

export function ResumeUpload({ resumes }: { resumes: Resume[] }) {
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Please upload a valid PDF file.');
      return;
    }

    setUploading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', file);
    if (title.trim()) {
      formData.append('title', title.trim());
    } else {
      formData.append('title', file.name.replace(/\.pdf$/i, ''));
    }
    
    const result = await uploadResume(formData);
    if (result.success) {
      setTitle('');
      router.refresh();
      // Reset file input
      e.target.value = '';
    } else {
      setError(result.error || 'Upload failed');
    }
    setUploading(false);
  };

  const handleSetActivate = async (id: string) => {
    setUploading(true);
    const result = await setActiveResume(id);
    if (result.success) {
      router.refresh();
    } else {
      setError(result.error || 'Activation failed');
    }
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    setUploading(true);
    const result = await deleteResume(id);
    if (result.success) {
      router.refresh();
    } else {
      setError(result.error || 'Delete failed');
    }
    setUploading(false);
  };

  return (
    <div className="space-y-8">
      {/* List of Resumes */}
      <div className="space-y-4">
        {resumes.length === 0 ? (
          <div className="p-4 border border-border/40 text-foreground/50 font-mono text-sm">
            No resumes currently uploaded.
          </div>
        ) : (
          resumes.map((resume) => (
            <div key={resume.id} className={`p-4 border ${resume.isActive ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-border/40 bg-background/50'}`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {resume.isActive && (
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                  )}
                  <div>
                    <a href={resume.url} target="_blank" rel="noopener noreferrer" className="font-mono font-bold text-sm hover:underline text-foreground">
                      {resume.title}
                    </a>
                    <p className="font-mono text-xs text-foreground/50 mt-1">
                      Uploaded: {new Date(resume.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {!resume.isActive && (
                    <button 
                      onClick={() => handleSetActivate(resume.id)}
                      disabled={uploading}
                      className="text-emerald-400 hover:text-emerald-300 font-mono text-xs border border-emerald-500/30 px-3 py-1 bg-emerald-500/10 disabled:opacity-50 transition-colors"
                    >
                      SET ACTIVE
                    </button>
                  )}
                  <DeleteButton 
                    id={resume.id}
                    onDelete={handleDelete}
                    className="text-red-500 hover:text-red-400 font-mono text-xs border border-red-500/30 px-3 py-1 bg-red-500/10 disabled:opacity-50 transition-colors"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upload New Resume */}
      <div className="pt-6 border-t border-border/20">
        <h3 className="font-jetbrains font-bold text-lg mb-4 text-accent">{"// UPLOAD_NEW_VERSION"}</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block font-mono text-xs text-foreground/70 mb-1">VERSION NAME (Optional)</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Frontend Focus 2026"
              className="w-full bg-background border border-border/40 p-2 font-mono text-sm focus:border-accent outline-none" 
            />
          </div>
          
          <div>
            <label className="block font-mono text-xs text-foreground/70 mb-2">FILE (PDF)</label>
            <div className="flex items-center gap-4">
              <input 
                type="file" 
                onChange={handleFileUpload} 
                accept="application/pdf" 
                disabled={uploading}
                className="text-sm font-mono text-foreground/70 file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xs file:font-mono file:bg-foreground/10 file:text-foreground hover:file:bg-foreground/20 cursor-pointer disabled:opacity-50" 
              />
              {uploading && <span className="text-xs text-accent animate-pulse font-mono">PROCESSING...</span>}
            </div>
          </div>
        </div>

        {error && <p className="text-red-400 text-xs font-mono mt-4">{error}</p>}
      </div>
    </div>
  );
}
