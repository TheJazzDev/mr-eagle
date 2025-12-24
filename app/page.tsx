/**
 * MR EAGLE Portfolio
 * Elite Web3 portfolio - Cinematic, animated, confident
 */

import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Impact from '@/components/sections/Impact';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import Education from '@/components/sections/Education';
import CTA from '@/components/sections/CTA';

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <Impact />
      <Experience />
      <Skills />
      <Education />
      <CTA />
    </main>
  );
}
