"use client";
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

function useParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const maybe = canvas.getContext('2d');
    if (!maybe) return;
    const ctx = maybe as CanvasRenderingContext2D;

    let animationFrame = 0;
    const DPR = Math.min(2, window.devicePixelRatio || 1);

    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0006,
      vy: (Math.random() - 0.5) * 0.0006,
      r: Math.random() * 1.4 + 0.6,
    }));

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = w * DPR;
      canvas.height = h * 0.75 * DPR;
      canvas.style.width = w + 'px';
      canvas.style.height = h * 0.75 + 'px';
      // Reset transform before scaling to avoid compounding
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(DPR, DPR);
    };
    resize();
    window.addEventListener('resize', resize);

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'rgba(6, 182, 212, 0.06)');
    gradient.addColorStop(1, 'rgba(155, 135, 245, 0.06)');

    function step() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // draw subtle grid
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 1;
      const grid = 48;
      for (let gx = 0; gx < w; gx += grid) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke();
      }
      for (let gy = 0; gy < h; gy += grid) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke();
      }

      // particles
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        const px = p.x * w; const py = p.y * h;

        ctx.beginPath();
        ctx.fillStyle = 'rgba(6,182,212,0.6)';
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(step);
    }

    step();
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return canvasRef;
}

export function Hero() {
  const canvasRef = useParticles();

  return (
    <section id="home" className="section relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <canvas ref={canvasRef} className="w-full h-[70vh]" />
      </div>

      <div className="container-screen relative z-10 flex flex-col items-start gap-8 pt-24">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="section-heading"
        >
          Full?Stack Developer
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: 'easeOut' }}
          className="max-w-2xl text-lg subtle"
        >
          I craft performant, accessible web experiences with modern stacks. Clean lines, thoughtful motion, and a focus on details.
        </motion.p>
        <div className="mt-4 flex gap-4">
          <a href="#projects" className="rounded-lg bg-primary-500/10 text-primary-200 px-4 py-2 border border-primary-500/30 hover:bg-primary-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400">View Projects</a>
          <a href="#contact" className="rounded-lg bg-accent/10 text-accent px-4 py-2 border border-accent/30 hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">Contact</a>
        </div>
      </div>
    </section>
  );
}
