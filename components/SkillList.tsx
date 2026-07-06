"use client"
import { motion } from "framer-motion";

interface Skill {
  id: string;
  category: string;
  description: string;
  techStack: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const getShieldUrl = (tech: string) => {
  const t = tech.toLowerCase().trim();
  let logo = encodeURIComponent(t);
  let color = '1E1E2E';
  
  if (t.includes('react')) { logo = 'react'; color = '61DAFB'; }
  else if (t.includes('typescript')) { logo = 'typescript'; color = '3178C6'; }
  else if (t.includes('vite')) { logo = 'vite'; color = '646CFF'; }
  else if (t.includes('tailwind')) { logo = 'tailwindcss'; color = '06B6D4'; }
  else if (t.includes('node')) { logo = 'node.js'; color = '339933'; }
  else if (t.includes('express')) { logo = 'express'; color = '000000'; }
  else if (t.includes('mongo')) { logo = 'mongodb'; color = '47A248'; }
  else if (t.includes('next')) { logo = 'next.js'; color = '000000'; }
  else if (t.includes('javascript')) { logo = 'javascript'; color = 'F7DF1E'; }
  else if (t.includes('postgres')) { logo = 'postgresql'; color = '4169E1'; }
  else if (t.includes('python')) { logo = 'python'; color = '3776AB'; }
  else if (t.includes('prisma')) { logo = 'prisma'; color = '2D3748'; }
  else if (t.includes('docker')) { logo = 'docker'; color = '2496ED'; }
  else if (t.includes('redis')) { logo = 'redis'; color = 'DC382D'; }
  else if (t.includes('framer')) { logo = 'framer'; color = '0055FF'; }
  else if (t.includes('git')) { logo = 'git'; color = 'F05032'; }
  else if (t.includes('shadcn')) { logo = 'shadcnui'; color = '000000'; }
  else if (t.includes('html')) { logo = 'html5'; color = 'E34F26'; }
  else if (t.includes('css')) { logo = 'css3'; color = '1572B6'; }
  else if (t.includes('c++')) { logo = 'c%2B%2B'; color = '00599C'; }
  else if (t.includes('solidity')) { logo = 'solidity'; color = '363636'; }
  else if (t.includes('fastapi')) { logo = 'fastapi'; color = '009688'; }
  else if (t.includes('aws')) { logo = 'amazon-aws'; color = '232F3E'; }
  else if (t.includes('google cloud') || t.includes('gcp')) { logo = 'google-cloud'; color = '4285F4'; }
  else if (t.includes('nginx')) { logo = 'nginx'; color = '009639'; }
  else if (t.includes('github actions')) { logo = 'github-actions'; color = '2088FF'; }
  else if (t.includes('cloudflare')) { logo = 'cloudflare'; color = 'F38020'; }
  else if (t.includes('jwt')) { logo = 'JSON%20web%20tokens'; color = '000000'; }
  else if (t.includes('openai')) { logo = 'openai'; color = '412991'; }
  else if (t.includes('langchain')) { logo = 'langchain'; color = '1C3C3C'; }
  else if (t.includes('pytorch')) { logo = 'pytorch'; color = 'EE4C2C'; }
  else if (t.includes('hugging')) { logo = 'huggingface'; color = 'FFD21E'; }

  const label = encodeURIComponent(tech.trim());
  return `https://img.shields.io/badge/${label}-${color}?style=for-the-badge&logo=${logo}&logoColor=white`;
};

export default function SkillList({ skills }: { skills: Skill[] }) {
    return (
        <div className="flex flex-col w-full relative">
            {skills.length === 0 && (
                <div className="text-center font-mono text-foreground/80 font-bold border border-border/20 p-8">
                    NO_SKILLS_FOUND
                </div>
            )}

            {skills.map((skill: Skill, index: number) => {
                const orderNum = String(skill.order).padStart(2, '0');
                const badges = skill.techStack.split(',').map((s: string) => s.trim()).filter(Boolean);

                return (
                    <motion.div 
                        key={skill.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group flex flex-col md:flex-row border-b border-border/10 hover:bg-foreground/[0.01] transition-colors duration-300 py-6 gap-4 md:gap-8 items-start"
                    >
                        {/* Left Column: Number and Category */}
                        <div className="md:w-1/3 flex flex-col gap-2">
                            <span className="text-accent font-jetbrains font-bold text-lg opacity-90">
                                //{orderNum}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-extrabold font-jetbrains text-foreground/90 uppercase tracking-tight">
                                {skill.category}
                            </h2>
                        </div>
                        
                        {/* Right Column: Description and Badges */}
                        <div className="md:w-2/3 flex flex-col gap-3 w-full">
                            <p className="text-foreground/90 font-mono text-sm md:text-base font-medium leading-relaxed">
                                {skill.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {badges.map((badge: string, i: number) => (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img 
                                        key={i} 
                                        src={getShieldUrl(badge)} 
                                        alt={badge} 
                                        className="h-7 opacity-80 group-hover:opacity-100 transition-opacity duration-300" 
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    )
}