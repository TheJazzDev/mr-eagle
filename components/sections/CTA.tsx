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
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-40 sm:px-8 sm:py-52 md:px-12 md:py-64 lg:px-20"
    >
      {/* Animated Grid Background */}
      <div ref={gridRef} className="grid-background" />

      {/* Radial gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_0%,rgba(0,0,0,0.95)_100%)]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl text-center">
        {/* Title */}
        <h2
          ref={titleRef}
          className="mb-20 text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[1.05] tracking-tight text-foreground sm:mb-24 md:mb-28"
        >
          Let's build something
          <br />
          that lasts.
        </h2>

        {/* Contact Links */}
        <div
          ref={linksRef}
          className="mb-20 flex flex-col items-center gap-5 sm:mb-24 sm:gap-6 md:mb-28 md:gap-7"
        >
          {/* Email */}
          <a
            href="mailto:web3eaglealpha@gmail.com"
            className="contact-link group relative overflow-hidden rounded-xl border border-border bg-background-elevated px-8 py-5 transition-all duration-300 hover:border-accent/50 hover:bg-background-subtle sm:rounded-2xl sm:px-10 sm:py-6 md:px-12 md:py-7"
          >
            <span className="relative z-10 block font-mono text-base font-medium text-foreground sm:text-lg">
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
            className="contact-link group relative overflow-hidden rounded-xl border border-border bg-background-elevated px-8 py-5 transition-all duration-300 hover:border-accent/50 hover:bg-background-subtle sm:rounded-2xl sm:px-10 sm:py-6 md:px-12 md:py-7"
          >
            <span className="relative z-10 block font-mono text-base font-medium text-foreground sm:text-lg">
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
            className="contact-link group relative overflow-hidden rounded-xl border border-border bg-background-elevated px-8 py-5 transition-all duration-300 hover:border-accent/50 hover:bg-background-subtle sm:rounded-2xl sm:px-10 sm:py-6 md:px-12 md:py-7"
          >
            <span className="relative z-10 block font-mono text-base font-medium text-foreground sm:text-lg">
              @web3eglealpha
            </span>
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.1)_0%,transparent_70%)]" />
            </div>
          </a>

          {/* Phone */}
          <a
            href="tel:+447453741016"
            className="contact-link group relative overflow-hidden rounded-xl border border-border bg-background-elevated px-8 py-5 transition-all duration-300 hover:border-accent/50 hover:bg-background-subtle sm:rounded-2xl sm:px-10 sm:py-6 md:px-12 md:py-7"
          >
            <span className="relative z-10 block font-mono text-base font-medium text-foreground sm:text-lg">
              +44 745 374 1016
            </span>
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.1)_0%,transparent_70%)]" />
            </div>
          </a>
        </div>

        {/* Location */}
        <p ref={locationRef} className="font-mono text-xs uppercase tracking-[0.35em] text-subtle sm:text-sm">
          Africa · Nigeria
        </p>
      </div>
    </section>
  );
}
