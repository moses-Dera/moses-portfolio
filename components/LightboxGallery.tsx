"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

interface ImageType {
  url: string;
  alt: string;
}

export default function LightboxGallery({ images }: { images: ImageType[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') setSelectedIndex((selectedIndex + 1) % images.length);
      if (e.key === 'ArrowLeft') setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, images.length]);

  return (
    <>
      <div className={`my-12 grid gap-6 ${images.length === 1 ? 'grid-cols-1' : images.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
        {images.map((img: ImageType, i: number) => (
          <div 
            key={i} 
            onClick={() => openLightbox(i)}
            className="group relative border border-border/50 p-2 bg-foreground/5 shadow-lg overflow-hidden h-full flex items-center justify-center cursor-pointer"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.url} alt={img.alt} className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
              <span className="text-white font-mono text-sm tracking-widest uppercase border border-white/30 px-4 py-2 backdrop-blur-sm">View</span>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isMounted && selectedIndex !== null && createPortal(
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-background/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={closeLightbox}
          >
            <button 
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-foreground/70 hover:text-foreground transition-colors z-[10010]"
            >
              <FaTimes size={30} />
            </button>

            {images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors p-4 z-[10010]"
                >
                  <FaChevronLeft size={40} />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors p-4 z-[10010]"
                >
                  <FaChevronRight size={40} />
                </button>
              </>
            )}

            <div className="relative max-w-7xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={images[selectedIndex].url}
                alt={images[selectedIndex].alt}
                className="max-w-full max-h-[85vh] object-contain shadow-2xl border border-foreground/10"
              />
              <div className="mt-6 text-center">
                <p className="text-foreground/80 font-mono text-sm md:text-base">
                  {images[selectedIndex].alt} <span className="opacity-50 ml-2">({selectedIndex + 1} / {images.length})</span>
                </p>
              </div>
            </div>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>
    </>
  );
}
