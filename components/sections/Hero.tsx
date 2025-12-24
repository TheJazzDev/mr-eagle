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
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Grid Background */}
      <div className="grid-background" />

      {/* Radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl px-4 sm:px-6 md:px-8">
        {/* Name - The Signal */}
        <h1
          ref={nameRef}
          className="mb-4 text-center font-sans text-5xl font-bold tracking-tight text-foreground sm:mb-6 sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ perspective: '1000px' }}
        >
          MR EAGLE
        </h1>

        {/* Subtitle - Animated reveal */}
        <p
          ref={subtitleRef}
          className="mb-8 text-center font-mono text-sm font-medium tracking-wider text-accent sm:mb-12 sm:text-base md:text-lg"
        >
          Project Manager, Marketer and Advisor
        </p>

        {/* Statement - The manifesto */}
        <p
          ref={statementRef}
          className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-muted sm:text-xl md:text-2xl md:leading-relaxed"
        >
          Turning complex ideas into clear, practical outcomes across product, operations, and growth.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 sm:bottom-12 md:bottom-16"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium tracking-widest text-subtle sm:text-sm">
            SCROLL
          </span>
          <div className="h-8 w-[1px] bg-subtle sm:h-12" />
        </div>
      </div>
    </section>
  );
}
