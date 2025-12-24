/**
 * Hero Section - "THE SIGNAL"
 * Immediate authority with cinematic text reveal
 */

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@/hooks/useGSAP';
import { Ease, Duration, Stagger, createMasterTimeline } from '@/lib/gsap';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!nameRef.current || !subtitleRef.current || !statementRef.current) return;

    // Register plugin
    gsap.registerPlugin(SplitText);

    // Create master timeline
    const tl = createMasterTimeline({ delay: 0.5 });

    // Split text for animation
    const nameSplit = new SplitText(nameRef.current, { type: 'chars,words' });
    const subtitleSplit = new SplitText(subtitleRef.current, { type: 'words' });
    const statementSplit = new SplitText(statementRef.current, { type: 'lines' });

    // Set initial states
    gsap.set(nameSplit.chars, { opacity: 0, y: 100, rotationX: -90 });
    gsap.set(subtitleSplit.words, { opacity: 0, y: 20 });
    gsap.set(statementSplit.lines, { opacity: 0, y: 30 });
    gsap.set(scrollIndicatorRef.current, { opacity: 0, y: -20 });

    // Orchestrate entrance
    tl.to(nameSplit.chars, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: Duration.slow,
      stagger: Stagger.tight,
      ease: Ease.expo,
    })
      .to(
        subtitleSplit.words,
        {
          opacity: 1,
          y: 0,
          duration: Duration.base,
          stagger: Stagger.tight,
          ease: Ease.enter,
        },
        '-=0.4'
      )
      .to(
        statementSplit.lines,
        {
          opacity: 1,
          y: 0,
          duration: Duration.slow,
          stagger: Stagger.base,
          ease: Ease.enter,
        },
        '-=0.2'
      )
      .to(
        scrollIndicatorRef.current,
        {
          opacity: 0.6,
          y: 0,
          duration: Duration.base,
          ease: Ease.silk,
        },
        '-=0.4'
      );

    // Scroll indicator animation (infinite)
    gsap.to(scrollIndicatorRef.current, {
      y: 8,
      duration: 1.5,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
      delay: 2,
    });

    // Parallax on scroll
    gsap.to(containerRef.current, {
      y: 150,
      opacity: 0.8,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-32 sm:px-8 sm:py-40 md:px-12 lg:px-20"
    >
      {/* Grid Background */}
      <div className="grid-background" />

      {/* Radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,transparent_0%,rgba(0,0,0,0.9)_100%)]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl">
        {/* Name - The Signal */}
        <h1
          ref={nameRef}
          className="mb-8 text-center font-sans text-[clamp(3.5rem,12vw,9rem)] font-bold leading-[0.9] tracking-tight text-foreground sm:mb-10 md:mb-14"
          style={{ perspective: '1000px' }}
        >
          MR EAGLE
        </h1>

        {/* Subtitle - Animated reveal */}
        <p
          ref={subtitleRef}
          className="mb-14 text-center font-mono text-sm font-medium uppercase tracking-[0.25em] text-accent sm:mb-18 sm:text-base md:mb-20 md:text-lg"
        >
          Project Manager • Marketer • Advisor
        </p>

        {/* Statement - The manifesto */}
        <p
          ref={statementRef}
          className="mx-auto max-w-3xl text-center text-xl leading-[1.8] text-muted sm:text-2xl sm:leading-[1.8] md:text-3xl md:leading-[1.7]"
        >
          Turning complex ideas into clear, practical outcomes across product, operations, and growth.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 sm:bottom-20 md:bottom-24"
      >
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-subtle sm:text-xs">
            Scroll
          </span>
          <div className="h-12 w-px bg-gradient-to-b from-subtle to-transparent sm:h-16" />
        </div>
      </div>
    </section>
  );
}
