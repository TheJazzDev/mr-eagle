/**
 * GSAP Configuration & Utilities
 * Elite animation system for Web3 portfolio
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

/**
 * Premium easing curves - Intentional, not default
 */
export const Ease = {
  // Smooth, luxury feel
  silk: 'power2.out',
  // Confident entrance
  enter: 'power3.out',
  // Subtle exit
  exit: 'power2.in',
  // Elastic, physics-based
  elastic: 'elastic.out(1, 0.5)',
  // Exponential for dramatic reveals
  expo: 'expo.out',
  // Smooth both ways
  inOut: 'power2.inOut',
} as const;

/**
 * Animation durations - Consistent timing system
 */
export const Duration = {
  instant: 0.2,
  fast: 0.4,
  base: 0.6,
  slow: 0.8,
  slowest: 1.2,
  cinematic: 1.8,
} as const;

/**
 * Stagger configurations for sequential animations
 */
export const Stagger = {
  tight: 0.05,
  base: 0.1,
  relaxed: 0.15,
  slow: 0.2,
} as const;

/**
 * Text reveal animation using SplitText
 * Splits text into lines and animates them sequentially
 */
export function revealText(
  element: HTMLElement | string,
  options?: {
    splitType?: 'lines' | 'words' | 'chars';
    stagger?: number;
    duration?: number;
    ease?: string;
    delay?: number;
  }
) {
  const {
    splitType = 'lines',
    stagger = Stagger.base,
    duration = Duration.slow,
    ease = Ease.enter,
    delay = 0,
  } = options || {};

  const split = new SplitText(element, { type: splitType });
  const elements = split[splitType];

  if (!elements) return null;

  // Wrap lines for clip effect
  if (splitType === 'lines') {
    elements.forEach((line) => {
      const wrapper = document.createElement('div');
      wrapper.style.overflow = 'hidden';
      line.parentNode?.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });
  }

  gsap.set(elements, {
    opacity: 0,
    y: splitType === 'lines' ? 60 : 20,
  });

  const tl = gsap.timeline({ delay });

  tl.to(elements, {
    opacity: 1,
    y: 0,
    duration,
    stagger,
    ease,
  });

  return { timeline: tl, split };
}

/**
 * Scroll-triggered animation with default premium settings
 */
export function scrollReveal(
  element: HTMLElement | string,
  options?: gsap.TweenVars & {
    start?: string;
    end?: string;
    scrub?: boolean | number;
    pin?: boolean;
    markers?: boolean;
  }
) {
  const {
    start = 'top 80%',
    end,
    scrub = false,
    pin = false,
    markers = false,
    ...tweenVars
  } = options || {};

  return gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub,
      pin,
      markers,
    },
    ...tweenVars,
  });
}

/**
 * Fade in from bottom - Most common entrance
 */
export function fadeInUp(
  element: HTMLElement | string,
  options?: {
    y?: number;
    duration?: number;
    ease?: string;
    delay?: number;
    stagger?: number;
  }
) {
  const {
    y = 40,
    duration = Duration.base,
    ease = Ease.enter,
    delay = 0,
    stagger,
  } = options || {};

  gsap.set(element, { opacity: 0, y });

  return gsap.to(element, {
    opacity: 1,
    y: 0,
    duration,
    ease,
    delay,
    stagger,
  });
}

/**
 * Scale entrance with fade
 */
export function scaleIn(
  element: HTMLElement | string,
  options?: {
    scale?: number;
    duration?: number;
    ease?: string;
    delay?: number;
  }
) {
  const {
    scale = 0.9,
    duration = Duration.slow,
    ease = Ease.enter,
    delay = 0,
  } = options || {};

  gsap.set(element, { opacity: 0, scale });

  return gsap.to(element, {
    opacity: 1,
    scale: 1,
    duration,
    ease,
    delay,
  });
}

/**
 * Parallax effect on scroll
 */
export function parallax(
  element: HTMLElement | string,
  options?: {
    y?: number | string;
    scale?: number;
    start?: string;
    end?: string;
  }
) {
  const {
    y = '-20%',
    scale,
    start = 'top bottom',
    end = 'bottom top',
  } = options || {};

  return gsap.to(element, {
    y,
    scale,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub: true,
    },
  });
}

/**
 * Draw line animation (for borders, underlines)
 */
export function drawLine(
  element: HTMLElement | string,
  options?: {
    direction?: 'horizontal' | 'vertical';
    duration?: number;
    ease?: string;
    delay?: number;
  }
) {
  const {
    direction = 'horizontal',
    duration = Duration.slow,
    ease = Ease.enter,
    delay = 0,
  } = options || {};

  const prop = direction === 'horizontal' ? 'scaleX' : 'scaleY';

  gsap.set(element, {
    transformOrigin: direction === 'horizontal' ? 'left center' : 'top center',
    [prop]: 0,
  });

  return gsap.to(element, {
    [prop]: 1,
    duration,
    ease,
    delay,
  });
}

/**
 * Cleanup function for GSAP animations
 * Call this in React cleanup (useEffect return)
 */
export function cleanup(...animations: (gsap.core.Tween | gsap.core.Timeline | null)[]) {
  animations.forEach((anim) => {
    if (anim) {
      anim.kill();
    }
  });
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get safe animation duration (respects reduced motion)
 */
export function getSafeDuration(duration: number): number {
  return prefersReducedMotion() ? 0.01 : duration;
}

/**
 * Create a master timeline for orchestrating complex sequences
 */
export function createMasterTimeline(options?: gsap.TimelineVars) {
  return gsap.timeline({
    defaults: {
      ease: Ease.enter,
      duration: Duration.base,
    },
    ...options,
  });
}

export { gsap, ScrollTrigger, SplitText };
