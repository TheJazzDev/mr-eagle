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
      className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
        {/* Section Label */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <p className="font-mono text-xs font-medium tracking-widest text-accent sm:text-sm">
            04 — THE FOUNDATION
          </p>
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="mb-12 text-3xl font-bold text-foreground sm:mb-16 sm:text-4xl md:mb-20 md:text-5xl"
        >
          Built on fundamentals.
        </h2>

        {/* Education Items */}
        <div className="space-y-8 sm:space-y-10 md:space-y-12">
          {education.map((edu, index) => (
            <div
              key={`${edu.institution}-${index}`}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="group relative border-l-2 border-border pl-6 transition-colors hover:border-accent sm:pl-8"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-accent sm:text-xl md:text-2xl">
                  {edu.institution}
                </h3>
                <p className="text-base font-medium text-muted sm:text-lg">{edu.program}</p>
                {edu.focus && (
                  <p className="text-sm text-subtle sm:text-base">{edu.focus}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
