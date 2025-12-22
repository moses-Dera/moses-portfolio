"use client"
import React, { useState, useEffect } from 'react';

interface ProjectCardProps {
  name: string;
  description: string;
  techStack: string;
  link?: string; // optional GitHub / live demo
  image?: string; // optional project image
  images?: string[]; // array of project images for modal
}

const ProjectCard: React.FC<ProjectCardProps> = ({ name, description, techStack, link, image, images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = () => {
    if (images && images.length > 0) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => setIsModalOpen(false);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen && images) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeModal();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, images]);
  
  const nextImage = () => {
    if (images) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };
  
  const prevImage = () => {
    if (images) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <>
      <div className="bg-(--color-bg border border-(--color-border) p-6 shadow hover:shadow-lg transition-shadow" style={{
        clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
      }}>
        <div className="w-full h-64 bg-gray-200 rounded-lg mb-4 overflow-hidden cursor-pointer" onClick={openModal}>
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-gray-300 to-gray-400 flex items-center justify-center">
              <span className="text-gray-600 text-sm">Project Image</span>
            </div>
          )}
        </div>
        <h3 className="text-xl font-bold text-(--color-text) mb-2">{name}</h3>
        <p className="text-(--color-muted) mb-2">{description}</p>
        <p className="text-sm font-mono text-(--color-accent) mb-4">{techStack}</p>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-(--color-accent) font-semibold border-2 border-(--color-accent) hover:border-(--color-accent-hover) px-4 py-2 transition-all hover:scale-105 hover:shadow-lg hover:bg-(--color-accent) hover:text-white"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
            }}
          >
            View Project
          </a>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && images && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={closeModal}>
          {/* Close button */}
          <button onClick={closeModal} className="absolute top-6 right-6 backdrop-blur-sm hover:bg-white/10 text-white w-16 h-12 flex items-center justify-center text-xl font-bold transition-all hover:scale-105 z-20 border-2" style={{
            clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
          }}>
            ✕
          </button>
          
          {/* Left navigation button */}
          {images.length > 1 && (
            <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute border-2 left-4 top-1/2 -translate-y-1/2 bg-white/0 backdrop-blur-md hover:bg-white text-white p-4 font-bold z-10 w-10 h-12 flex items-center justify-center" style={{
              clipPath: 'polygon(100% 0%, 75% 50%, 100% 100%, 25% 100%, 0% 50%, 25% 0%)'
            }}>
              
            </button>
          )}
          
          <div className="relative max-w-6xl max-h-[95vh] p-4" onClick={(e) => e.stopPropagation()}>
            <img 
              src={images[currentImageIndex]} 
              alt={`${name} - Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            
            {/* Image counter */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
          
          {/* Right navigation button */}
          {images.length > 1 && (
            <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute border-2 right-4 top-1/2 -translate-y-1/2 bg-white/0 backdrop-blur-md hover:bg-white text-white p-4 font-bold z-10 w-10 h-12 flex items-center justify-center" style={{
              clipPath: 'polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)'
            }}>
              
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default ProjectCard;
