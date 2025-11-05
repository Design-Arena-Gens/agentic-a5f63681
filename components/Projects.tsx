"use client";
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Modal } from './Modal';

const projects = [
  {
    title: 'E?commerce Platform',
    description: 'Headless commerce with Next.js, Stripe, and GraphQL.',
    image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop',
    details: `Built a modular, scalable storefront with SSR/ISR, cart, checkout, and admin tools. Improved conversion 12%.`,
    tech: ['Next.js', 'TypeScript', 'GraphQL', 'Stripe']
  },
  {
    title: 'Analytics Dashboard',
    description: 'Real?time metrics with streaming data visualizations.',
    image: 'https://images.unsplash.com/photo-1551281044-8f334a9db8bb?q=80&w=1200&auto=format&fit=crop',
    details: `WebSocket streams with server actions and persisted filters. Reduced query costs by 30%.`,
    tech: ['React', 'Node.js', 'Postgres', 'WebSockets']
  },
  {
    title: 'Design System',
    description: 'Accessible, themeable component library.',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop',
    details: `Token?driven system, dark mode, and WCAG AA compliance with extensive docs and Figma kit.`,
    tech: ['Storybook', 'TypeScript', 'Tailwind']
  }
];

export function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="section">
      <div className="container-screen">
        <h2 className="section-heading">Projects</h2>
        <p className="mt-3 subtle max-w-2xl">Selected work. Tap for details.</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <button
              key={p.title}
              className="group card overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              onClick={() => setOpenIndex(i)}
              aria-haspopup="dialog"
              aria-controls={`project-${i}-dialog`}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-0 p-4">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="text-sm subtle">{p.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {projects.map((p, i) => (
        <Modal
          key={i}
          open={openIndex === i}
          onClose={() => setOpenIndex(null)}
          title={p.title}
        >
          <div id={`project-${i}-dialog`}>
            <p>{p.details}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <li key={t} className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10">{t}</li>
              ))}
            </ul>
          </div>
        </Modal>
      ))}
    </section>
  );
}
