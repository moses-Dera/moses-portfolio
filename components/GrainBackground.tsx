"use client";

import { useEffect, useRef } from "react";

export default function GrainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number>(0);
  const particles = useRef<Array<{ x: number, y: number, size: number, speedOffset: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize particles once
    const initParticles = () => {
      particles.current = [];
      const numParticles = Math.floor((window.innerWidth * window.innerHeight) / 3000); // Responsive particle count
      for (let i = 0; i < numParticles; i++) {
        particles.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 1.5 + 0.5, // Grains between 0.5 and 2.0
          speedOffset: Math.random() * 100 // Random offset for wave variance
        });
      }
    };

    targetMouse.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    currentMouse.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const drawGrain = () => {
      const { width, height } = canvas;
      const time = performance.now() * 0.0005; 
      
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.05;
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.05;

      const isDark = document.documentElement.classList.contains('dark');
      
      // Hardcode the RGB equivalents of #0B1120 (Dark) and #bcbdb8 (Light) 
      // Avoids expensive getComputedStyle calls on every frame
      const bgRgb = isDark ? '11, 17, 32' : '188, 189, 184';

      // Fade for trails matching the background
      ctx.fillStyle = `rgba(${bgRgb}, 0.09)`; 
      ctx.fillRect(0, 0, width, height);
      
      // Use lighter composite for dark mode (glow), source-over for light mode (clean dots)
      ctx.globalCompositeOperation = isDark ? "lighter" : "source-over";

      const grainColor = isDark ? '180, 200, 255' : '50, 100, 200'; 

      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        
        const waveX = Math.sin(p.y * 0.003 + time + p.speedOffset) * 1.5;
        const waveY = Math.cos(p.x * 0.003 + time) * 1.5;
        
        const dx = p.x - currentMouse.current.x;
        const dy = p.y - currentMouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let repulsionX = 0;
        let repulsionY = 0;
        if (dist < 200) {
            const force = (200 - dist) / 200;
            repulsionX = (dx / dist) * force * 2;
            repulsionY = (dy / dist) * force * 2;
        }

        p.x += waveX + repulsionX + 0.2; 
        p.y += waveY + repulsionY - 0.5; 

        if (p.x > width + 10) p.x = -10;
        if (p.x < -10) p.x = width + 10;
        if (p.y > height + 10) p.y = -10;
        if (p.y < -10) p.y = height + 10;

        const pulse = (Math.sin(time * 3 + p.speedOffset) + 1) * 0.5;
        // slightly darker/more opaque in light mode for visibility
        const alpha = isDark ? 0.2 + (pulse * 0.4) : 0.4 + (pulse * 0.4); 
        
        ctx.fillStyle = `rgba(${grainColor}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.globalCompositeOperation = "source-over";

      animationFrameId.current = requestAnimationFrame(drawGrain);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(); // Re-seed on resize
    };

    const onMouseMove = (e: MouseEvent) => {
      targetMouse.current.x = e.clientX;
      targetMouse.current.y = e.clientY;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);

    drawGrain();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-100"
      style={{ filter: "blur(0.5px)" }} 
    />
  );
}
