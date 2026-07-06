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

  try {
    // Fetch all data in parallel
    const [fetchedSkills, fetchedExperiences, fetchedProjects] = await Promise.all([
      prisma.skill.findMany({ orderBy: { order: 'asc' } }),
      prisma.experience.findMany(),
      prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
    ]);

    skills = fetchedSkills;
    experiences = fetchedExperiences;
    projects = fetchedProjects;

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
      <section id="home" className="min-h-screen flex items-center pt-20">
        <HeroSection />
      </section>

      {/* Skills Section */}
      <section id="skill" className="min-h-screen py-20 flex items-center border-t border-border/20">
        <div className="max-w-6xl mx-auto w-full px-6 md:px-12 relative z-10">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-jetbrains font-extrabold text-foreground mb-4 tracking-tight">
              {"// "}SKILLS & ARSENAL
            </h2>
            <p className="font-mono text-foreground/80 font-semibold border-l-2 border-accent pl-4 text-sm md:text-base max-w-2xl mx-auto md:mx-0">
              The tools, frameworks, and languages I use to engineer robust backend systems.
            </p>
          </div>
          <SkillList skills={skills} />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen py-20 border-t border-border/20">
        <div className="max-w-6xl mx-auto px-6 md:px-12 w-full relative z-10">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-jetbrains font-extrabold text-foreground mb-4 tracking-tight">
              {"// "}EXPERIENCE
            </h2>
            <p className="font-mono text-foreground/80 font-semibold border-l-2 border-accent pl-4 text-sm md:text-base max-w-2xl mx-auto md:mx-0">
              A chronological timeline of systems built, architectures deployed, and technical impact.
            </p>
          </div>

          <div className="relative mt-20">
            <div className="absolute left-[20px] md:left-[30px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent via-accent/30 to-transparent"></div>
            <ExperienceList experiences={experiences} />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="project" className="min-h-screen py-20 flex items-center border-t border-border/20">
        <div className="max-w-6xl mx-auto w-full px-6 md:px-12 relative z-10">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-jetbrains font-extrabold text-foreground mb-4 tracking-tight">
              {"// "}PROJECTS
            </h2>
            <p className="font-mono text-foreground/80 font-semibold border-l-2 border-accent pl-4 text-sm md:text-base max-w-2xl mx-auto md:mx-0">
              A showcase of systems, architectures, and applications I have engineered.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {projects.length === 0 ? (
               <div className="text-foreground/80 font-mono font-semibold">
                {"// Archiving project data..."}
              </div>
            ) : (
              projects.map((project: Project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  name={project.title}
                  description={project.description}
                  techStack={project.techStack}
                  image={project.coverImage || undefined}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-[80vh] flex items-center border-t border-border/20">
        <ContactSection />
      </section>
    </main>
  );
}