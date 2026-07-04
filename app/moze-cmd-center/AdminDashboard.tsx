'use client';

import { logout } from './actions';
import { useRouter } from 'next/navigation';

import Link from 'next/link';

export function AdminDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  return (
    <div className="max-w-4xl mx-auto border border-white/10 bg-black/40 backdrop-blur-lg p-8 relative"
         style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
      
      <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-zinc-400">
            SYSTEM.ADMIN
          </h1>
          <p className="font-mono text-sm text-zinc-500 mt-2">Session Verified // Stealth Mode Active</p>
        </div>
        <div className="flex items-center space-x-6">
          <div className="animate-pulse flex gap-2 items-center text-red-500 font-mono text-xs">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            LIVE
          </div>
          <button onClick={handleLogout} className="font-mono text-xs text-zinc-400 hover:text-white transition-colors uppercase tracking-widest border border-white/10 px-3 py-1">
            Terminate
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Projects Module */}
        <Link href="/moze-cmd-center/projects">
          <div className="border border-white/10 p-6 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group h-full">
            <h2 className="text-xl font-bold mb-2 group-hover:text-red-400 transition-colors">Manage Projects</h2>
            <p className="text-zinc-500 font-mono text-sm">Add case studies, edit tech stacks, upload images.</p>
          </div>
        </Link>

        {/* Skills Module */}
        <Link href="/moze-cmd-center/skills">
          <div className="border border-white/10 p-6 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group h-full">
            <h2 className="text-xl font-bold mb-2 group-hover:text-red-400 transition-colors">Manage Skills</h2>
            <p className="text-zinc-500 font-mono text-sm">Add or edit your tech stack proficiencies.</p>
          </div>
        </Link>

        {/* Experience Module */}
        <Link href="/moze-cmd-center/experience">
          <div className="border border-white/10 p-6 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group h-full">
            <h2 className="text-xl font-bold mb-2 group-hover:text-red-400 transition-colors">Manage Experience</h2>
            <p className="text-zinc-500 font-mono text-sm">Update timeline, roles, and company details.</p>
          </div>
        </Link>
      </div>

      <div className="mt-12 p-4 border border-white/10 bg-black/50">
        <p className="font-mono text-xs text-white/40 text-center">
          UNAUTHORIZED ACCESS WILL BE LOGGED.
        </p>
      </div>
    </div>
  );
}
