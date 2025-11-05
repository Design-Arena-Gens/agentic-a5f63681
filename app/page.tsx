import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';

export default function Page() {
  return (
    <main>
      <Nav />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
      <footer className="py-12 border-t border-white/5">
        <div className="container-screen subtle text-sm">
          ? {new Date().getFullYear()} Your Name. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
