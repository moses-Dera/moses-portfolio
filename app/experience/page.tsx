import React from 'react';
import prisma from '@/lib/prisma';
import ExperienceList from '@/components/ExperienceList';

interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export const metadata = {
  title: 'Experience | Moses C. Okonkwo',
  description: 'Chronological timeline of my professional experience.',
};

export default async function ExperiencePage() {
  let experiences: Experience[] = [];
  
  try {
    experiences = await prisma.experience.findMany();
    
    // Sort experiences LIFO (newest first). "Present" ongoing roles go to the very top.
    experiences.sort((a, b) => {
      const getEndDate = (exp: Experience) => {
        if (!exp.endDate || exp.endDate.toLowerCase() === 'present') return Infinity;
        const time = new Date(exp.endDate).getTime();
        return isNaN(time) ? 0 : time;
      };
      
      const endA = getEndDate(a);
      const endB = getEndDate(b);
      
      if (endA !== endB) {
        return endB - endA; // Sort by end date descending
      }
      
      // If both are "Present" or have the same end date, sort by start date
      const startA = new Date(a.startDate).getTime();
      const startB = new Date(b.startDate).getTime();
      return (isNaN(startB) ? 0 : startB) - (isNaN(startA) ? 0 : startA);
    });
  } catch (error) {
    console.warn("Prisma Accelerate Connection Error (Gracefully handled):", error);
  }

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 w-full pt-10 relative z-10 pb-32">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-jetbrains font-extrabold text-foreground mb-4 tracking-tight">
          {"// "}EXPERIENCE
        </h1>
        <p className="font-mono text-foreground/80 text-sm md:text-base max-w-2xl font-semibold">
          A chronological timeline of systems built, architectures deployed, and technical impact.
        </p>
      </div>

      <div className="relative mt-20">
        {/* The Vertical Line */}
        <div className="absolute left-[20px] md:left-[30px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent via-accent/30 to-transparent"></div>

        <ExperienceList experiences={experiences} />
      </div>
    </div>
  );
}
