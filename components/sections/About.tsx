/**
 * About Section - "THE OPERATOR"
 * Narrative-driven, scroll-triggered text reveals
 */

'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';
import { Ease, Duration, Stagger } from '@/lib/gsap';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraph1Ref = useRef<HTMLParagraphElement>(null);
  const paragraph2Ref = useRef<HTMLParagraphElement>(null);
  const paragraph3Ref = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(SplitText, ScrollTrigger);

    if (
      !titleRef.current ||
      !paragraph1Ref.current ||
      !paragraph2Ref.current ||
      !paragraph3Ref.current
    )
      return;

    // Title animation
    const titleSplit = new SplitText(titleRef.current, { type: 'words' });
    gsap.set(titleSplit.words, { opacity: 0, y: 30 });

    ScrollTrigger.create({
      trigger: titleRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(titleSplit.words, {
          opacity: 1,
          y: 0,
          duration: Duration.slow,
          stagger: Stagger.tight,
          ease: Ease.enter,
        });
      },
    });

    // Paragraph animations - line by line
    const paragraphs = [paragraph1Ref.current, paragraph2Ref.current, paragraph3Ref.current];

    paragraphs.forEach((paragraph, index) => {
      const split = new SplitText(paragraph, { type: 'lines' });

      // Wrap lines
      split.lines.forEach((line) => {
        const wrapper = document.createElement('div');
        wrapper.style.overflow = 'hidden';
        line.parentNode?.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });

      gsap.set(split.lines, { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: paragraph,
        start: 'top 75%',
        onEnter: () => {
          gsap.to(split.lines, {
            opacity: 1,
            y: 0,
            duration: Duration.slow,
            stagger: Stagger.base,
            ease: Ease.enter,
            delay: index * 0.1,
          });
        },
      });
    });

    // Decorative line animation
    if (lineRef.current) {
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' });

      ScrollTrigger.create({
        trigger: lineRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(lineRef.current, {
            scaleX: 1,
            duration: Duration.cinematic,
            ease: Ease.expo,
          });
        },
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 sm:py-32 md:py-40 lg:py-48"
    >
      <div className="mx-auto max-w-3xl px-6 sm:px-8 md:px-12 lg:px-16">
        {/* Section Label */}
        <div className="mb-16 sm:mb-20 md:mb-24">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent sm:text-sm">
            01 — The Operator
          </p>
          <div
            ref={lineRef}
            className="mt-4 h-px w-12 bg-accent sm:mt-5 sm:w-16 md:w-20"
          />
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="mb-12 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-foreground sm:mb-16 md:mb-20"
        >
          Building systems,
          <br />
          not just products.
        </h2>

        {/* Content */}
        <div className="space-y-8 sm:space-y-10 md:space-y-12">
          <p
            ref={paragraph1Ref}
            className="text-base leading-[1.8] text-muted sm:text-lg sm:leading-[1.8] md:text-xl md:leading-[1.75]"
          >
            I work across product, operations, and growth, focusing on turning complex ideas into clear, practical outcomes. I'm involved in shaping direction, improving execution, and building systems that support sustainable scale.
          </p>

          <p
            ref={paragraph2Ref}
            className="text-base leading-[1.8] text-muted sm:text-lg sm:leading-[1.8] md:text-xl md:leading-[1.75]"
          >
            My experience spans early-stage environments where structure, communication, and follow-through matter. I care about how products are built, how teams collaborate, and how ideas move from concept to real-world use.
          </p>

          <p
            ref={paragraph3Ref}
            className="text-base leading-[1.8] text-muted sm:text-lg sm:leading-[1.8] md:text-xl md:leading-[1.75]"
          >
            I value clarity, consistency, and thoughtful execution, and I enjoy working where long-term thinking and disciplined action come together.
          </p>
        </div>
      </div>
    </section>
  );
}
