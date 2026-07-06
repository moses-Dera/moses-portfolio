"use client";
import { useState } from 'react';
import ExperienceCard from './ExperienceCard';

interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

export default function ExperienceList({ experiences }: { experiences: Experience[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (experiences.length === 0) {
    return (
      <div className="text-foreground/80 font-mono font-semibold ml-16">
        {"// Archiving career data..."}
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {experiences.map((exp) => (
        <ExperienceCard 
          key={exp.id} 
          exp={exp} 
          isOpen={openId === exp.id}
          onToggle={() => setOpenId(openId === exp.id ? null : exp.id)}
        />
      ))}
    </div>
  );
}
