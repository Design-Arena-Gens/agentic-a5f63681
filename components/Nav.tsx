"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export function Nav() {
  const [active, setActive] = useState<string>('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/40 border-b border-white/5">
      <nav className="container-screen flex items-center justify-between py-4" aria-label="Primary">
        <a href="#home" className="font-semibold tracking-tight text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded-md px-1">
          <span className="sr-only">Go to home</span>
          <span>Dev Portfolio</span>
        </a>
        <ul className="hidden sm:flex items-center gap-1" role="menubar" aria-label="Sections">
          {sections.map((s) => (
            <li key={s.id} role="none">
              <a
                role="menuitem"
                href={`#${s.id}`}
                className="relative px-3 py-2 rounded-md text-sm text-subtle hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                aria-current={active === s.id ? 'page' : undefined}
              >
                {active === s.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-2 -bottom-0.5 h-px bg-gradient-to-r from-primary-400/0 via-primary-400 to-primary-400/0"
                  />
                )}
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
