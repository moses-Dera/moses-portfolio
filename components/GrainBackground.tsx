"use client";

import { useEffect, useRef } from "react";

export default function GrainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number>(0);
  const particles = useRef<Array<{
    x: number;
    y: number;
    originX: number; // home position — particle always drifts back here
    originY: number;
    size: number;
    speedOffset: number;
    phase: number;   // individual wave phase offset
    history: Array<{x: number, y: number}>;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initParticles = () => {
      particles.current = [];
      const count = Math.floor((window.innerWidth * window.innerHeight) / 2800);
      for (let i = 0; i < count; i++) {
        const ox = Math.random() * window.innerWidth;
        const oy = Math.random() * window.innerHeight;
        particles.current.push({
          x: ox,
          y: oy,
          originX: ox,
          originY: oy,
          size: Math.random() * 1.5 + 0.4,
          speedOffset: Math.random() * 100,
          phase: Math.random() * Math.PI * 2,
          history: [],
        });
      }
    };

    targetMouse.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    currentMouse.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const drawGrain = () => {
      const { width, height } = canvas;
      const time = performance.now() * 0.00025;

      // Slower mouse interpolation creates a "drag" effect through water
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.015;
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.015;

      const isDark = document.documentElement.classList.contains('dark');

      // Fully clear the canvas. No ghosting, no color mismatch.
      ctx.clearRect(0, 0, width, height);

      ctx.globalCompositeOperation = isDark ? "lighter" : "source-over";
      // Use a darker blue-grey for light mode so the ocean lines actually show up
      const grainColor = isDark ? '140, 180, 255' : '30, 60, 100';

      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];

        // --- Ocean wave movement ---
        // Slower, more languid rolling ocean
        const wave1X = Math.sin(p.y * 0.004 + time * 1.1 + p.phase) * 0.8;
        const wave1Y = Math.cos(p.x * 0.004 + time * 0.9 + p.phase) * 0.6;
        const wave2X = Math.sin(p.x * 0.007 + time * 1.6 + p.speedOffset) * 0.3;
        const wave2Y = Math.cos(p.y * 0.007 + time * 1.4 + p.speedOffset) * 0.3;

        // --- Mouse repulsion bubble ---
        const dx = p.x - currentMouse.current.x;
        const dy = p.y - currentMouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repulseRadius = 250; // Wider, softer bubble
        let repX = 0, repY = 0;
        if (dist < repulseRadius && dist > 0) {
          const force = Math.pow((repulseRadius - dist) / repulseRadius, 2) * 1.2; // Softer push
          repX = (dx / dist) * force;
          repY = (dy / dist) * force;
        }

        // --- Gentle return-to-origin (ocean current pulling back) ---
        // Very slow spring force so the void lingers like deep water
        const returnStrength = 0.002;
        const returnX = (p.originX - p.x) * returnStrength;
        const returnY = (p.originY - p.y) * returnStrength;

        // Save history for trails
        p.history.push({ x: p.x, y: p.y });
        // Since particles move much slower, we need a longer history buffer to keep trails visible
        if (p.history.length > 35) { 
          p.history.shift();
        }

        p.x += wave1X + wave2X + repX + returnX;
        p.y += wave1Y + wave2Y + repY + returnY;

        // Soft wrap — particles don't teleport, origin stays valid
        let wrapped = false;
        if (p.x > width + 20)  { p.x = -20;    p.originX = p.x; wrapped = true; }
        if (p.x < -20)         { p.x = width + 20; p.originX = p.x; wrapped = true; }
        if (p.y > height + 20) { p.y = -20;    p.originY = p.y; wrapped = true; }
        if (p.y < -20)         { p.y = height + 20; p.originY = p.y; wrapped = true; }
        
        if (wrapped) p.history = [];

        // Pulsing brightness — slow like ocean bioluminescence
        const pulse = (Math.sin(time * 2.0 + p.phase) + 1) * 0.5;
        const maxAlpha = isDark ? 0.2 + (pulse * 0.4) : 0.3 + (pulse * 0.5);

        // Draw perfect trailing tail manually
        if (p.history.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.history[0].x, p.history[0].y);
          for (let j = 1; j < p.history.length; j++) {
            ctx.lineTo(p.history[j].x, p.history[j].y);
          }
          ctx.lineTo(p.x, p.y);
          
          // Use a gradient to make the tail fade out perfectly
          const dxTrail = p.x - p.history[0].x;
          const dyTrail = p.y - p.history[0].y;
          if (Math.abs(dxTrail) > 0.1 || Math.abs(dyTrail) > 0.1) {
            const grad = ctx.createLinearGradient(p.history[0].x, p.history[0].y, p.x, p.y);
            grad.addColorStop(0, `rgba(${grainColor}, 0)`);
            grad.addColorStop(1, `rgba(${grainColor}, ${maxAlpha})`);
            ctx.strokeStyle = grad;
          } else {
            ctx.strokeStyle = `rgba(${grainColor}, ${maxAlpha})`;
          }
          
          ctx.lineWidth = p.size;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        // Draw head particle
        ctx.fillStyle = `rgba(${grainColor}, ${maxAlpha * 1.5})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      animationFrameId.current = requestAnimationFrame(drawGrain);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
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
      style={{ filter: "blur(0.4px)" }}
    />
  );
}
