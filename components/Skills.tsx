"use client";
import { motion } from 'framer-motion';
import { useMemo } from 'react';

const skills = [
  { name: 'TypeScript', level: 92 },
  { name: 'React / Next.js', level: 90 },
  { name: 'Node.js', level: 88 },
  { name: 'GraphQL / REST', level: 85 },
  { name: 'Databases', level: 82 },
  { name: 'CI/CD', level: 78 },
];

const icons = [
  { label: 'TS', hue: 200 },
  { label: 'R', hue: 180 },
  { label: 'N', hue: 160 },
  { label: 'G', hue: 140 },
  { label: 'DB', hue: 120 },
  { label: 'CI', hue: 100 },
];

export function Skills() {
  const items = useMemo(() => skills, []);

  return (
    <section id="skills" className="section">
      <div className="container-screen">
        <h2 className="section-heading">Skills</h2>
        <p className="mt-3 subtle max-w-2xl">A snapshot of my current strengths. Always learning.</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {items.map((s, i) => (
            <div key={s.name} className="card p-6">
              <div className="flex items-center justify-between">
                <span className="font-medium">{s.name}</span>
                <span className="subtle" aria-hidden>{s.level}%</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-muted/80 overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={s.level} aria-label={`${s.name} proficiency`}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level}%` }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3" aria-hidden>
          {icons.map((ic) => (
            <motion.div
              key={ic.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 grid place-items-center rounded-xl border border-white/10"
              style={{ background: `linear-gradient(145deg, hsla(${ic.hue},70%,25%,0.5), hsla(${ic.hue+20},70%,15%,0.3))` }}
            >
              <span className="text-sm subtle">{ic.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
