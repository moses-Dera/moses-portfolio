import React from 'react';
import ProjectCard from '@/components/projectCard';
import { projects } from '@/lib/project';

const ProjectsPage = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 grid gap-6 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard
          key={project.name}
          name={project.name}
          description={project.description}
          techStack={project.techStack}
          link={project.link}
          image={project.image}
          images={project.images}
        />
      ))}
    </div>
  );
};

export default ProjectsPage;
