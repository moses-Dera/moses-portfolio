"use client";

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ROUTES = [
  { path: '/', label: 'HOME' },
  { path: '/skill', label: 'SKILLS' },
  { path: '/experience', label: 'EXPERIENCE' },
  { path: '/project', label: 'PROJECTS' },
  { path: '/contact', label: 'CONTACT' }
];

export default function PageNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentIndex = ROUTES.findIndex(r => r.path === pathname);
  // Only show on main portfolio routes
  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? ROUTES[currentIndex - 1] : ROUTES[ROUTES.length - 1];
  const next = currentIndex < ROUTES.length - 1 ? ROUTES[currentIndex + 1] : ROUTES[0];

  return (
    <>
      {/* VERTICAL DIAMOND INDICATORS - Right Edge (Desktop Only) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[60] hidden md:flex flex-col items-center gap-6">
        {ROUTES.map((route, i) => {
          const isActive = i === currentIndex;
          return (
            <div key={route.path} className="relative group flex items-center justify-end">
              <span className="absolute right-6 font-mono text-[10px] text-accent opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap tracking-widest pointer-events-none">
                {route.label}
              </span>
              <button
                onClick={() => router.push(route.path)}
                className={`w-2 h-2 transition-all duration-300 ${isActive ? 'bg-accent scale-[2.5]' : 'bg-foreground/30 hover:bg-accent/70 scale-150'} `}
                style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} // Diamond shape
                aria-label={`Go to ${route.label}`}
              />
            </div>
          );
        })}
      </div>

      {/* BOTTOM NAV BAR - Floating (Mobile & Desktop) */}
      <div 
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex items-center justify-between gap-8 md:gap-16 px-6 py-3 bg-background/80 backdrop-blur-md border border-border/40"
        style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
      >
        <button 
          onClick={() => router.push(prev.path)}
          className="group flex flex-col items-start"
        >
          <span className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest mb-1">{"// PREV"}</span>
          <span className="font-jetbrains text-sm font-bold text-foreground group-hover:text-accent transition-colors">{"<-"} {prev.label}</span>
        </button>

        <div className="font-mono text-xs text-accent font-bold tracking-widest">
          0{currentIndex + 1} <span className="text-foreground/30 font-normal">/</span> 0{ROUTES.length}
        </div>

        <button 
          onClick={() => router.push(next.path)}
          className="group flex flex-col items-end"
        >
          <span className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest mb-1">{"NEXT //"}</span>
          <span className="font-jetbrains text-sm font-bold text-foreground group-hover:text-accent transition-colors">{next.label} {"->"}</span>
        </button>
      </div>
    </>
  );
}
