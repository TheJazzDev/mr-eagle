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
      className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
        {/* Section Label */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <p className="font-mono text-xs font-medium tracking-widest text-accent sm:text-sm">
            01 — THE OPERATOR
          </p>
          <div
            ref={lineRef}
            className="mt-3 h-[1px] w-16 bg-accent sm:mt-4 sm:w-20 md:w-24"
          />
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="mb-8 text-3xl font-bold leading-tight text-foreground sm:mb-12 sm:text-4xl md:mb-16 md:text-5xl lg:text-6xl"
        >
          Building systems,
          <br />
          not just products.
        </h2>

        {/* Content */}
        <div className="space-y-6 sm:space-y-8 md:space-y-10">
          <p
            ref={paragraph1Ref}
            className="text-base leading-relaxed text-muted sm:text-lg md:text-xl md:leading-relaxed"
          >
            I work across product, operations, and growth, focusing on turning complex ideas into clear, practical outcomes. I'm involved in shaping direction, improving execution, and building systems that support sustainable scale.
          </p>

          <p
            ref={paragraph2Ref}
            className="text-base leading-relaxed text-muted sm:text-lg md:text-xl md:leading-relaxed"
          >
            My experience spans early-stage environments where structure, communication, and follow-through matter. I care about how products are built, how teams collaborate, and how ideas move from concept to real-world use.
          </p>

          <p
            ref={paragraph3Ref}
            className="text-base leading-relaxed text-muted sm:text-lg md:text-xl md:leading-relaxed"
          >
            I value clarity, consistency, and thoughtful execution, and I enjoy working where long-term thinking and disciplined action come together.
          </p>
        </div>
      </div>
    </section>
  );
}
