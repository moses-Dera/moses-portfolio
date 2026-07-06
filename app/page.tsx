import prisma from '@/lib/prisma';
import HeroSection from '@/components/HeroSection';
import SkillList from '@/components/SkillList';
import ExperienceList from '@/components/ExperienceList';
import ProjectCard from '@/components/projectCard';
import ContactSection from '@/components/ContactSection';
import { Skill } from '@prisma/client';

export const revalidate = 60; // Optional cache

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

interface Project {
  id: string;
  title: string;
  description: string;
  coverImage: string | null;
  techStack: string;
}

export default async function Home() {
  let skills: Skill[] = [];
  let experiences: Experience[] = [];
  let projects: Project[] = [];
  let resumeUrl: string | null = null;

  try {
    const { getResumeUrl } = await import('@/app/actions');
    
    // Fetch all data in parallel
    const [fetchedSkills, fetchedExperiences, fetchedProjects, fetchedResumeUrl] = await Promise.all([
      prisma.skill.findMany({ orderBy: { order: 'asc' } }),
      prisma.experience.findMany(),
      prisma.project.findMany({ orderBy: { createdAt: 'desc' } }),
      getResumeUrl()
    ]);

    skills = fetchedSkills;
    experiences = fetchedExperiences;
    projects = fetchedProjects;
    resumeUrl = fetchedResumeUrl;

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
    <main className="flex flex-col w-full">
      {/* Hero Section */}
      <section id="home" className="min-h-[90vh] flex items-center py-10 scroll-mt-[10vh]">
        <HeroSection />
      </section>

      {/* Skills Section */}
      <section id="skill" className="py-8 md:py-10 scroll-mt-[10vh]">
        <div className="max-w-6xl mx-auto w-full px-6 md:px-12 relative z-10">
          <div className="mb-6 md:mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-border/20 pb-4">
            <div className="text-left">
              <h2 className="text-4xl md:text-6xl font-jetbrains font-extrabold text-foreground tracking-tight">
                {"// "}SKILLS
              </h2>
            </div>

            {resumeUrl && (
              <div className="flex flex-col sm:flex-row gap-4 shrink-0 mt-4 lg:mt-0">
                <a 
                    href={resumeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent/10 border border-accent/30 text-accent font-jetbrains font-bold text-sm transition-all hover:bg-accent hover:text-background"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' }}
                >
                    <span className="tracking-widest">{"//"} VIEW_RESUME</span>
                    <span className="font-mono transition-transform duration-300 group-hover:translate-x-1">{"->"}</span>
                </a>
                <a 
                    href={`/api/download-resume?url=${encodeURIComponent(resumeUrl)}`}
                    download="Moses_Okonkwo_Resume.pdf"
                    className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground/5 border border-foreground/30 text-foreground font-jetbrains font-bold text-sm transition-all hover:bg-foreground hover:text-background"
                    style={{ clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)' }}
                >
                    <span className="tracking-widest">{"//"} EXTRACT</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                </a>
              </div>
            )}
          </div>
          <SkillList skills={skills} />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-8 md:py-10 scroll-mt-[10vh]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 w-full relative z-10">
          <div className="mb-6 md:mb-8 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-jetbrains font-extrabold text-foreground tracking-tight">
              {"// "}EXPERIENCE
            </h2>
          </div>

          <div className="relative mt-6 md:mt-10">
            <div className="absolute left-[20px] md:left-[30px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent via-accent/30 to-transparent"></div>
            <ExperienceList experiences={experiences} />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="project" className="py-8 md:py-10 scroll-mt-[10vh] overflow-hidden">
        <div className="max-w-6xl mx-auto w-full px-6 md:px-12 relative z-10 mb-4 md:mb-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-jetbrains font-extrabold text-foreground tracking-tight">
              {"// "}PROJECTS
            </h2>
          </div>
        </div>

        <div className="max-w-6xl mx-auto w-full px-0 md:px-12 relative z-10 py-2 md:py-4">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 md:gap-8 pb-4 px-6 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {projects.length === 0 ? (
               <div className="text-foreground/80 font-mono font-semibold shrink-0">
                {"// Archiving project data..."}
              </div>
            ) : (
              [...projects, ...projects, ...projects].map((project: Project, index) => (
                <div key={`${project.id}-${index}`} className="w-[80vw] sm:w-[350px] md:w-[600px] lg:w-[700px] shrink-0 snap-center md:snap-start transition-transform duration-500 hover:scale-[1.02]">
                  <ProjectCard
                    id={project.id}
                    name={project.title}
                    description={project.description}
                    techStack={project.techStack}
                    image={project.coverImage || undefined}
                  />
                </div>
              ))
            )}
          </div>
          
          {/* Subtle horizontal scroll indicator */}
          <div className="w-full flex justify-end md:justify-start opacity-50 mt-2">
             <div className="font-mono text-[10px] flex items-center gap-2">
                 <span className="animate-pulse">{"<"}</span>
                 <span>SWIPE_TO_EXPLORE</span>
                 <span className="animate-pulse">{">"}</span>
             </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-8 md:py-10 scroll-mt-[10vh]">
        <ContactSection />
      </section>
    </main>
  );
}