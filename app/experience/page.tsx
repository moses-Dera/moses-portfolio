import React from 'react';
import prisma from '@/lib/prisma';
import Link from 'next/link';

export const metadata = {
  title: 'Experience | Moses C. Okonkwo',
  description: 'Chronological timeline of my professional backend and system architecture experience.',
};

export default async function ExperiencePage() {
  let experiences: any[] = [];
  
  try {
    experiences = await prisma.experience.findMany({
      orderBy: {
        startDate: 'desc',
      },
    });
  } catch (error) {
    // We use console.warn instead of console.error because Next.js dev environment
    // intercepts console.error and displays a giant red overlay to the user.
    console.warn("Prisma Accelerate Connection Error (Gracefully handled):", error);
    // Fail gracefully, allowing the page to render the fallback UI
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 w-full mt-10 relative z-10 pb-20">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-jetbrains font-extrabold text-foreground mb-4 tracking-tight">
          EXPERIENCE
        </h1>
        <p className="font-mono text-foreground/50 text-sm md:text-base max-w-2xl">
          A chronological timeline of systems built, architectures deployed, and technical impact.
        </p>
      </div>

      <div className="relative mt-20">
        {/* The Vertical Line */}
        <div className="absolute left-[20px] md:left-[30px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-(--color-accent) via-(--color-accent)/30 to-transparent"></div>

        {experiences.length === 0 ? (
          <div className="text-foreground/50 font-mono ml-16">
            // Archiving career data...
          </div>
        ) : (
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative flex items-start group">
                {/* Glowing Node */}
                <div className="absolute left-[13px] md:left-[23px] top-6 w-4 h-4 rounded-full bg-background border-[3px] border-(--color-accent) shadow-[0_0_15px_rgba(59,130,246,0.6)] z-10 group-hover:scale-125 transition-transform duration-300"></div>

                <div className="ml-16 w-full max-w-3xl">
                  {/* Date Badge */}
                  <div className="font-mono text-xs md:text-sm text-(--color-accent) mb-3 border border-(--color-accent)/30 bg-(--color-accent)/5 inline-block px-3 py-1 rounded-sm">
                    {exp.startDate} - {exp.endDate || 'PRESENT'}
                  </div>

                  {/* Glassmorphism Card */}
                  <div className="border border-border/50 bg-foreground/5 p-6 md:p-8 relative overflow-hidden backdrop-blur-sm transition-colors hover:border-(--color-accent)/50 hover:bg-foreground/10"
                       style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }}>
                    
                    {/* Decorative Circuit Line */}
                    <div className="absolute top-0 right-0 w-32 h-[1px] bg-gradient-to-r from-transparent to-(--color-accent)/50"></div>
                    <div className="absolute top-0 right-0 w-[1px] h-16 bg-gradient-to-b from-(--color-accent)/50 to-transparent"></div>

                    <h3 className="text-2xl font-jetbrains font-bold text-foreground mb-1 uppercase">
                      {exp.role}
                    </h3>
                    <h4 className="font-mono text-foreground/60 text-lg mb-6 flex items-center gap-2">
                      <span className="text-(--color-accent)">@</span> {exp.company}
                    </h4>

                    {/* Bullet Points */}
                    <div className="font-mono text-sm md:text-base text-foreground/80 space-y-3 mb-8">
                      {exp.description.split('\n').filter(line => line.trim().length > 0).map((line, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="text-(--color-accent) mt-1">▹</span>
                          <span className="leading-relaxed">{line.replace(/^[*-]\s+/, '')}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
