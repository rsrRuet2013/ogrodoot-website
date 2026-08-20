"use client";

import { useEffect, useRef } from "react";

export function MarsAmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Generate Martian dust particles & glowing embers
    const particleCount = Math.min(Math.floor(width * 0.04), 60);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.4,
      color: Math.random() > 0.4 ? "rgba(231, 125, 17, " : "rgba(193, 68, 14, ",
      opacity: Math.random() * 0.5 + 0.1,
      speedY: -(Math.random() * 0.4 + 0.15),
      speedX: (Math.random() - 0.5) * 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      pulseVal: Math.random() * Math.PI,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulseVal += p.pulseSpeed;

        // Wrap around edges
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const currentOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulseVal));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentOpacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(231, 125, 17, 0.4)";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Canvas Martian Dust */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen"
      />

      {/* Layered Cosmic Mars Radial Haze / Ambient Orbs */}
      <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-mars-red/15 via-mars-orange/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[35%] -left-[10%] w-[600px] h-[600px] bg-mars-red/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[65%] -right-[10%] w-[700px] h-[700px] bg-mars-orange/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-gradient-to-t from-mars-red/15 to-transparent rounded-full blur-[150px] pointer-events-none" />

      {/* Subtle Mars Grid Overlay */}
      <div className="absolute inset-0 mars-grid-pattern opacity-40 mix-blend-overlay" />
    </div>
  );
}
