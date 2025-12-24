/**
 * Education Section - "THE FOUNDATION"
 * Minimal, refined, elegant
 */

'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';
import { Ease, Duration } from '@/lib/gsap';

interface Education {
  institution: string;
  program: string;
  focus?: string;
}

const education: Education[] = [
  {
    institution: 'Harvard University',
    program: 'Marketing',
    focus: 'Digital Marketing & Brand Strategy',
  },
  {
    institution: 'Harvard Business School Online',
    program: 'Leadership & Management',
    focus: 'Executive Decision Making',
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Title animation
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: Duration.slow,
            ease: Ease.silk,
          });
        },
      });
    }

    // Education items - subtle entrance
    itemsRef.current.forEach((item, index) => {
      if (!item) return;

      gsap.set(item, { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: item,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: Duration.base,
            ease: Ease.silk,
            delay: index * 0.15,
          });
        },
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-32 sm:py-40 md:py-52 lg:py-64"
    >
      <div className="mx-auto max-w-4xl px-6 sm:px-8 md:px-12 lg:px-20">
        {/* Section Label */}
        <div className="mb-20 sm:mb-24 md:mb-32">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent sm:text-sm">
            04 — The Foundation
          </p>
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="mb-16 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-foreground sm:mb-20 md:mb-24"
        >
          Built on fundamentals.
        </h2>

        {/* Education Items */}
        <div className="space-y-14 sm:space-y-16 md:space-y-20">
          {education.map((edu, index) => (
            <div
              key={`${edu.institution}-${index}`}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="group relative border-l-2 border-border/60 py-2 pl-10 transition-colors hover:border-accent sm:pl-12 md:pl-14"
            >
              <div className="space-y-3 sm:space-y-4 md:space-y-5">
                <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-accent sm:text-2xl md:text-3xl">
                  {edu.institution}
                </h3>
                <p className="text-lg font-medium text-muted sm:text-xl">{edu.program}</p>
                {edu.focus && (
                  <p className="text-base text-subtle sm:text-lg">{edu.focus}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
