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
        });
      }
    };

    targetMouse.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    currentMouse.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const drawGrain = () => {
      const { width, height } = canvas;
      // Slow ocean time — much more languid than before
      const time = performance.now() * 0.00025;

      // Smoothly interpolate mouse
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.04;
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.04;

      const isDark = document.documentElement.classList.contains('dark');
      const bgRgb = isDark ? '11, 17, 32' : '188, 189, 184';

      // Lighter fade — allows particle trails to linger, giving that ocean depth
      ctx.fillStyle = `rgba(${bgRgb}, 0.07)`;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = isDark ? "lighter" : "source-over";
      const grainColor = isDark ? '140, 180, 255' : '50, 100, 200';

      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];

        // --- Ocean wave movement ---
        // Two overlapping sinusoidal waves at different scales = rolling ocean
        const wave1X = Math.sin(p.y * 0.004 + time * 1.1 + p.phase) * 2.0;
        const wave1Y = Math.cos(p.x * 0.004 + time * 0.9 + p.phase) * 1.5;
        const wave2X = Math.sin(p.x * 0.007 + time * 1.6 + p.speedOffset) * 0.8;
        const wave2Y = Math.cos(p.y * 0.007 + time * 1.4 + p.speedOffset) * 0.8;

        // --- Mouse repulsion bubble ---
        const dx = p.x - currentMouse.current.x;
        const dy = p.y - currentMouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repulseRadius = 180;
        let repX = 0, repY = 0;
        if (dist < repulseRadius && dist > 0) {
          const force = Math.pow((repulseRadius - dist) / repulseRadius, 2) * 3.5;
          repX = (dx / dist) * force;
          repY = (dy / dist) * force;
        }

        // --- Gentle return-to-origin (ocean current pulling back) ---
        // This is the key: a soft spring force pulling each particle home
        const returnStrength = 0.008;
        const returnX = (p.originX - p.x) * returnStrength;
        const returnY = (p.originY - p.y) * returnStrength;

        p.x += wave1X + wave2X + repX + returnX;
        p.y += wave1Y + wave2Y + repY + returnY;

        // Soft wrap — particles don't teleport, origin stays valid
        if (p.x > width + 20)  { p.x = -20;    p.originX = p.x; }
        if (p.x < -20)         { p.x = width + 20; p.originX = p.x; }
        if (p.y > height + 20) { p.y = -20;    p.originY = p.y; }
        if (p.y < -20)         { p.y = height + 20; p.originY = p.y; }

        // Pulsing brightness — slow like ocean bioluminescence
        const pulse = (Math.sin(time * 2.0 + p.phase) + 1) * 0.5;
        const alpha = isDark
          ? 0.15 + (pulse * 0.45)
          : 0.35 + (pulse * 0.35);

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
