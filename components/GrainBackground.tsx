"use client";

import { useEffect, useRef } from "react";

export default function GrainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawGrain = () => {
      const { width, height } = canvas;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      const density = 1.5;
      const radius = 150;
      const offsetX = (mouse.current.x / width - 0.5) * 1;
      const offsetY = (mouse.current.y / height - 0.5) * 1;
      const staticOffsetX = (mouse.current.x / width - 0.5) * 0.3;
      const staticOffsetY = (mouse.current.y / height - 0.5) * 0.3;
      
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const grainColor = isDark ? '255,255,255' : '0,0,0';

      // Static grain across entire canvas with minimal movement
      for (let i = 0; i < (width * height * density) / 2000; i++) {
        const x = Math.random() * width + staticOffsetX;
        const y = Math.random() * height + staticOffsetY;
        const alpha = Math.random() * 0.5;
        
        ctx.fillStyle = `rgba(${grainColor},${alpha})`;
        ctx.fillRect(x, y, 1, 1);
      }

      // Dynamic grain around mouse with more movement
      for (let i = 0; i < (radius * radius * density) / 1000; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * radius;
        const x = mouse.current.x + Math.cos(angle) * distance + offsetX;
        const y = mouse.current.y + Math.sin(angle) * distance + offsetY;
        
        if (x >= 0 && x <= width && y >= 0 && y <= height) {
          const alpha = Math.random() * 0.8;
          ctx.fillStyle = `rgba(${grainColor},${alpha})`;
          ctx.fillRect(x, y, 2, 2);
        }
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawGrain();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      drawGrain();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);

    drawGrain();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
