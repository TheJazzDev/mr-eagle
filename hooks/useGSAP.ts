/**
 * Custom GSAP React Hooks
 * Proper cleanup and context management
 */

'use client';

import { useEffect, useRef, useState, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * useGSAP - Main hook for GSAP animations
 * Provides proper cleanup and context
 */
export function useGSAP(
  callback: () => void | (() => void),
  dependencies: React.DependencyList = []
) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      callback();
    });

    return () => ctx.revert();
  }, dependencies);
}

/**
 * useScrollTrigger - Hook for scroll-triggered animations
 */
export function useScrollTrigger(
  callback: () => ScrollTrigger | ScrollTrigger[] | void,
  dependencies: React.DependencyList = []
) {
  useEffect(() => {
    const triggers = callback();

    return () => {
      if (Array.isArray(triggers)) {
        triggers.forEach((trigger) => trigger?.kill());
      } else if (triggers) {
        triggers.kill();
      }
    };
  }, dependencies);
}

/**
 * useTimeline - Create and manage a GSAP timeline
 */
export function useTimeline(
  options?: gsap.TimelineVars,
  dependencies: React.DependencyList = []
): RefObject<gsap.core.Timeline | null> {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    timelineRef.current = gsap.timeline(options);

    return () => {
      timelineRef.current?.kill();
    };
  }, dependencies);

  return timelineRef;
}

/**
 * useParallax - Simple parallax effect hook
 */
export function useParallax(
  elementRef: RefObject<HTMLElement>,
  options?: {
    y?: number | string;
    scale?: number;
    speed?: number;
  }
) {
  const { y = -50, scale, speed = 1 } = options || {};

  useScrollTrigger(() => {
    if (!elementRef.current) return;

    return ScrollTrigger.create({
      trigger: elementRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: speed,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(elementRef.current, {
          y: typeof y === 'number' ? y * progress : y,
          scale: scale ? 1 + (scale - 1) * progress : undefined,
        });
      },
    });
  }, []);
}

/**
 * useRevealOnScroll - Reveal element when scrolled into view
 */
export function useRevealOnScroll(
  elementRef: RefObject<HTMLElement>,
  options?: {
    y?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
  }
) {
  const {
    y = 40,
    opacity = 0,
    duration = 0.8,
    delay = 0,
    stagger,
  } = options || {};

  useScrollTrigger(() => {
    if (!elementRef.current) return;

    gsap.set(elementRef.current, { y, opacity });

    return ScrollTrigger.create({
      trigger: elementRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(elementRef.current, {
          y: 0,
          opacity: 1,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
        });
      },
    });
  }, []);
}

/**
 * useSmoothScroll - Add smooth scrolling to container
 */
export function useSmoothScroll(enabled: boolean = true) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Simple smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, [enabled]);
}

/**
 * useReducedMotion - Detect if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null;

  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (!prefersReducedMotion) return;

    setMatches(prefersReducedMotion.matches);

    const onChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    prefersReducedMotion.addEventListener('change', onChange);

    return () => {
      prefersReducedMotion.removeEventListener('change', onChange);
    };
  }, [prefersReducedMotion]);

  return matches;
}
