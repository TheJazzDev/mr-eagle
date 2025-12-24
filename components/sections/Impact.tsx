/**
 * Impact Section - "THE NUMBERS"
 * Showcase measurable achievements and impact
 */

'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';
import { Ease, Duration } from '@/lib/gsap';

interface Metric {
  value: string;
  label: string;
  description: string;
}

const metrics: Metric[] = [
  {
    value: '6+',
    label: 'Years Experience',
    description: 'Leading Web3 projects across continents',
  },
  {
    value: '100K+',
    label: 'Users Acquired',
    description: 'Through growth campaigns at TapTrend',
  },
  {
    value: '50K+',
    label: 'Community Members',
    description: 'Built at Momentum Labs',
  },
  {
    value: '6',
    label: 'Partnership Deals',
    description: 'Secured at PixiLand',
  },
  {
    value: '7',
    label: 'Team Members',
    description: 'Led at Stable Doc',
  },
  {
    value: '3',
    label: 'Platforms',
    description: 'Shipped: Android, iOS, Web',
  },
];

export default function Impact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metricsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Title animation
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: 30 });

      ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: Duration.slow,
            ease: Ease.enter,
          });
        },
      });
    }

    // Metrics stagger animation
    metricsRef.current.forEach((metric, index) => {
      if (!metric) return;

      gsap.set(metric, { opacity: 0, scale: 0.8, y: 30 });

      ScrollTrigger.create({
        trigger: metric,
        start: 'top 75%',
        onEnter: () => {
          gsap.to(metric, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: Duration.slow,
            ease: Ease.expo,
            delay: index * 0.1,
          });
        },
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background-elevated py-24 sm:py-32 md:py-40 lg:py-48"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 md:px-12 lg:px-16">
        {/* Section Label */}
        <div className="mb-16 text-center sm:mb-20 md:mb-24">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent sm:text-sm">
            The Impact
          </p>
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="mb-16 text-center text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-foreground sm:mb-20 md:mb-24"
        >
          Proven Results,
          <br />
          Measurable Impact.
        </h2>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {metrics.map((metric, index) => (
            <div
              key={`${metric.label}-${index}`}
              ref={(el) => {
                metricsRef.current[index] = el;
              }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-background p-8 transition-all duration-300 hover:border-accent/50 hover:bg-background-subtle sm:rounded-3xl sm:p-10 md:p-12"
            >
              {/* Metric Value */}
              <div className="mb-4 text-4xl font-bold text-accent sm:mb-5 sm:text-5xl md:mb-6 md:text-6xl">
                {metric.value}
              </div>

              {/* Label */}
              <h3 className="mb-2 text-base font-bold text-foreground sm:mb-3 sm:text-lg md:text-xl">
                {metric.label}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-muted sm:text-base">
                {metric.description}
              </p>

              {/* Hover gradient */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -right-8 -top-8 h-32 w-32 bg-[radial-gradient(circle,rgba(255,107,0,0.12)_0%,transparent_70%)] sm:h-40 sm:w-40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
