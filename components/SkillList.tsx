"use client"
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getResumeUrl } from "@/app/actions";

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
    const [resumeUrl, setResumeUrl] = useState<string | null>(null);

    useEffect(() => {
        getResumeUrl().then(url => {
            if (url) setResumeUrl(url);
        });
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-10 overflow-x-hidden w-full"
        >
            <div className="w-full flex flex-col sm:flex-row justify-between items-end sm:items-start gap-8 sm:gap-4 mb-20">
                {resumeUrl ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="flex flex-row items-center gap-4 order-2 sm:order-1 flex-wrap justify-end sm:justify-start"
                    >
                        {/* VIEW BUTTON */}
                        <a 
                            href={resumeUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center gap-2 sm:gap-4 px-6 py-3 sm:px-10 sm:py-5 bg-accent/10 border border-accent/30 text-accent font-jetbrains font-bold text-sm sm:text-lg transition-all hover:bg-accent hover:text-background hover:border-accent shadow-[0_0_20px_rgba(79,70,229,0.15)] hover:shadow-[0_0_30px_rgba(79,70,229,0.4)]"
                            style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)' }}
                        >
                            <span className="tracking-widest">{"//"} VIEW_RESUME</span>
                            <span className="font-mono transition-transform duration-300 group-hover:translate-x-2">{"->"}</span>
                        </a>

                        {/* DOWNLOAD BUTTON */}
                        <a 
                            href={`/api/download-resume?url=${encodeURIComponent(resumeUrl)}`}
                            download="Moses_Okonkwo_Resume.pdf"
                            className="group relative inline-flex items-center gap-2 sm:gap-4 px-6 py-3 sm:px-10 sm:py-5 bg-foreground/5 border border-foreground/30 text-foreground font-jetbrains font-bold text-sm sm:text-lg transition-all hover:bg-foreground hover:text-background shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                            style={{ clipPath: 'polygon(15px 0, 100% 0, 100% 100%, 0 100%, 0 15px)' }}
                        >
                            <span className="tracking-widest">{"//"} EXTRACT_RESUME</span>
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        </a>
                    </motion.div>
                ) : (
                    <div className="order-2 sm:order-1 hidden sm:block"></div>
                )}
                
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-4xl font-jetbrains font-extrabold text-foreground text-right order-1 sm:order-2"
                >
                    SKILLS{" //"}
                </motion.h1>
            </div>
                
            <div className="flex flex-col gap-32 relative w-full">
                {skills.length === 0 && (
                    <div className="text-center font-mono text-foreground/80 font-bold border border-border/20 p-8">
                        NO_SKILLS_FOUND
                    </div>
                )}

                {skills.map((skill: Skill, index: number) => {
                    const isLeft = index % 2 === 0;
                    const orderNum = String(skill.order).padStart(2, '0');
                    const badges = skill.techStack.split(',').map((s: string) => s.trim()).filter(Boolean);

                    return (
                        <motion.div 
                            key={skill.id}
                            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className={`flex flex-col w-full max-w-3xl ${isLeft ? 'items-start text-left' : 'items-end text-right self-end'}`}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                {isLeft ? (
                                    <>
                                        <span className="text-accent font-bold text-xl font-jetbrains">{orderNum}</span>
                                        <div className="w-16 h-[1px] bg-border"></div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-16 h-[1px] bg-border"></div>
                                        <span className="text-accent font-bold text-xl font-jetbrains">{orderNum}</span>
                                    </>
                                )}
                            </div>
                            
                            <h2 className="text-3xl font-bold font-jetbrains mb-4 text-foreground hover:text-accent transition-colors">
                                {skill.category}
                            </h2>
                            
                            <p className="mb-6 text-lg leading-relaxed text-foreground/90 font-medium">
                                {skill.description}
                            </p>
                            
                            <div className={`flex flex-wrap gap-2 ${isLeft ? '' : 'justify-end'}`}>
                                {badges.map((badge: string, i: number) => (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img key={i} src={getShieldUrl(badge)} alt={badge} />
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    )
}