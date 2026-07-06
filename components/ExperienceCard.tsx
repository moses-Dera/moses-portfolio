"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

export default function ExperienceCard({ 
  exp, 
  isOpen, 
  onToggle 
}: { 
  exp: Experience;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="relative flex items-start group">
      {/* Glowing Node */}
      <div className={`absolute left-[13px] md:left-[23px] top-6 w-4 h-4 rounded-full border-[3px] border-accent z-10 transition-all duration-300 ${isOpen ? 'bg-accent shadow-[0_0_20px_rgba(79,70,229,0.9)] scale-125' : 'bg-background shadow-[0_0_15px_rgba(79,70,229,0.6)] group-hover:scale-125'}`}></div>

      <div className="ml-16 w-full max-w-3xl">
        {/* Date Badge */}
        <div className="font-mono text-xs md:text-sm text-foreground mb-3 border border-accent/50 bg-accent/20 inline-block px-3 py-1 rounded-sm font-bold">
          {exp.startDate} - {exp.endDate || 'PRESENT'}
        </div>

        {/* Glassmorphism Card */}
        <div 
          onClick={onToggle}
          className={`border p-6 md:p-8 relative overflow-hidden backdrop-blur-sm transition-all cursor-pointer select-none
            ${isOpen ? 'border-accent/80 bg-foreground/10' : 'border-border/50 bg-foreground/5 hover:border-accent/50 hover:bg-foreground/10'}
          `}
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }}
        >
          
          {/* Decorative Circuit Line */}
          <div className="absolute top-0 right-0 w-32 h-[1px] bg-gradient-to-r from-transparent to-accent/50"></div>
          <div className="absolute top-0 right-0 w-[1px] h-16 bg-gradient-to-b from-accent/50 to-transparent"></div>

          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-2xl font-jetbrains font-bold text-foreground mb-1 uppercase">
                {exp.role}
              </h3>
              <h4 className="font-mono text-foreground/60 text-lg flex items-center gap-2">
                <span className="text-accent">@</span> {exp.company}
              </h4>
            </div>
            
            {/* Toggle Icon */}
            <div className="text-accent font-mono text-xl md:text-2xl opacity-70">
              {isOpen ? '-' : '+'}
            </div>
          </div>

          {/* Expandable Description */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 24 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                {/* Bullet Points */}
                <div className="font-mono text-sm md:text-base text-foreground/80 space-y-3 pb-4">
                  {exp.description.split('\n').filter((line: string) => line.trim().length > 0).map((line: string, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-accent mt-1">▹</span>
                      <span className="leading-relaxed">{line.replace(/^[*-]\s+/, '')}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
