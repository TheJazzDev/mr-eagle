/**
 * CTA Section - "LET'S BUILD"
 * Calm, confident conversion without desperation
 */

'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@/hooks/useGSAP';
import { Ease, Duration, Stagger } from '@/lib/gsap';

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    if (!sectionRef.current) return;

    // Title animation with SplitText
    if (titleRef.current) {
      const split = new SplitText(titleRef.current, { type: 'words' });
      gsap.set(split.words, { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.to(split.words, {
            opacity: 1,
            y: 0,
            duration: Duration.cinematic,
            stagger: Stagger.base,
            ease: Ease.expo,
          });
        },
      });
    }

    // Links fade in
    if (linksRef.current) {
      const links = linksRef.current.querySelectorAll('.contact-link');
      gsap.set(links, { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: linksRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.to(links, {
            opacity: 1,
            y: 0,
            duration: Duration.slow,
            stagger: Stagger.base,
            ease: Ease.silk,
            delay: 0.3,
          });
        },
      });
    }

    // Location subtle entrance
    if (locationRef.current) {
      gsap.set(locationRef.current, { opacity: 0 });

      ScrollTrigger.create({
        trigger: locationRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(locationRef.current, {
            opacity: 0.5,
            duration: Duration.cinematic,
            ease: Ease.silk,
            delay: 0.8,
          });
        },
      });
    }

    // Slow down background grid on scroll into CTA
    if (gridRef.current) {
      gsap.to(gridRef.current, {
        opacity: 0.3,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'center center',
          scrub: 1,
        },
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-32 sm:px-8 sm:py-40 md:px-12 md:py-48 lg:px-16"
    >
      {/* Animated Grid Background */}
      <div ref={gridRef} className="grid-background" />

      {/* Radial gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_0%,rgba(0,0,0,0.95)_100%)]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl text-center">
        {/* Title */}
        <h2
          ref={titleRef}
          className="mb-14 text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.05] tracking-tight text-foreground sm:mb-18 md:mb-20"
        >
          Let's build something
          <br />
          that lasts.
        </h2>

        {/* Contact Links */}
        <div
          ref={linksRef}
          className="mb-16 flex flex-col items-center gap-4 sm:mb-20 sm:gap-5 md:mb-24"
        >
          {/* Email */}
          <a
            href="mailto:web3eaglealpha@gmail.com"
            className="contact-link group relative overflow-hidden rounded-lg border border-border bg-background-elevated px-6 py-4 transition-all duration-300 hover:border-accent/50 hover:bg-background-subtle sm:rounded-xl sm:px-8 sm:py-5"
          >
            <span className="relative z-10 block font-mono text-sm font-medium text-foreground sm:text-base">
              web3eaglealpha@gmail.com
            </span>
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.1)_0%,transparent_70%)]" />
            </div>
          </a>

          {/* X (Twitter) */}
          <a
            href="https://twitter.com/web3eaglealpha"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link group relative overflow-hidden rounded-lg border border-border bg-background-elevated px-6 py-4 transition-all duration-300 hover:border-accent/50 hover:bg-background-subtle sm:rounded-xl sm:px-8 sm:py-5"
          >
            <span className="relative z-10 block font-mono text-sm font-medium text-foreground sm:text-base">
              @web3eaglealpha
            </span>
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.1)_0%,transparent_70%)]" />
            </div>
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/web3eglealpha"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link group relative overflow-hidden rounded-lg border border-border bg-background-elevated px-6 py-4 transition-all duration-300 hover:border-accent/50 hover:bg-background-subtle sm:rounded-xl sm:px-8 sm:py-5"
          >
            <span className="relative z-10 block font-mono text-sm font-medium text-foreground sm:text-base">
              @web3eglealpha
            </span>
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.1)_0%,transparent_70%)]" />
            </div>
          </a>

          {/* Phone */}
          <a
            href="tel:+447453741016"
            className="contact-link group relative overflow-hidden rounded-lg border border-border bg-background-elevated px-6 py-4 transition-all duration-300 hover:border-accent/50 hover:bg-background-subtle sm:rounded-xl sm:px-8 sm:py-5"
          >
            <span className="relative z-10 block font-mono text-sm font-medium text-foreground sm:text-base">
              +44 745 374 1016
            </span>
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.1)_0%,transparent_70%)]" />
            </div>
          </a>
        </div>

        {/* Location */}
        <p ref={locationRef} className="font-mono text-[10px] uppercase tracking-[0.3em] text-subtle sm:text-xs">
          Africa · Nigeria
        </p>
      </div>
    </section>
  );
}
