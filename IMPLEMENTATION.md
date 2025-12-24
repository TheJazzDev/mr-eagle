# Implementation Guide — MR EAGLE Portfolio

Complete technical documentation for developers working on this elite Web3 portfolio.

---

## 🏗️ Architecture Overview

### Stack Decision Rationale

**Next.js 16 App Router**
- Server Components for static content optimization
- Client Components for GSAP animations
- Built-in optimization (fonts, images, code splitting)
- TypeScript support out of the box

**GSAP vs Framer Motion**
We chose GSAP because:
- More precise timeline orchestration
- Professional-grade easing (used by Apple, Nike)
- Better performance for complex sequences
- SplitText plugin for character-level animation
- ScrollTrigger for scroll-linked effects

**Tailwind V4**
- Native CSS variables integration
- Better JIT compiler performance
- Modern syntax (`bg-linear-to-br` vs `bg-gradient-to-br`)
- Cleaner configuration

---

## 📂 File Organization

### Directory Structure Explained

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout (metadata, fonts)
│   ├── page.tsx           # Main page (section composition)
│   └── globals.css        # Design system + global styles
├── components/
│   └── sections/          # All page sections (client components)
│       ├── Hero.tsx       # Hero with 3D text reveal
│       ├── About.tsx      # Narrative with line-by-line animation
│       ├── Experience.tsx # Timeline with scroll-sync
│       ├── Skills.tsx     # Cluster-based reveals
│       ├── Education.tsx  # Minimal entrance
│       └── CTA.tsx        # Contact with slow fade
├── hooks/
│   └── useGSAP.ts        # Custom GSAP React hooks
├── lib/
│   └── gsap.ts           # GSAP utilities, easing, durations
└── README.md             # User-facing documentation
```

### Why Client Components?

All section components use `'use client'` because:
1. GSAP requires browser APIs (`window`, `document`)
2. `useEffect` hooks for animation lifecycle
3. Direct DOM manipulation via refs

The page itself (`app/page.tsx`) could be a Server Component, but sections must be client-side.

---

## 🎨 Design System Deep Dive

### CSS Custom Properties

Located in `app/globals.css:3-30`

**Color System:**
```css
--background: #000000;           /* Pure black base */
--background-elevated: #0a0a0a;  /* Cards, elevated surfaces */
--background-subtle: #0f0f0f;    /* Hover states */
--foreground: #fafafa;           /* Primary text */
--foreground-muted: #a1a1a1;     /* Secondary text */
--foreground-subtle: #737373;    /* Tertiary text */
--accent: #fbbf24;               /* Gold (sparingly) */
--accent-cyan: #22d3ee;          /* Cyan for protocol-style */
--border: #1f1f1f;               /* Card borders */
```

**Why this palette?**
- High contrast for readability
- Subtle gradations for depth without color
- Muted accents prevent neon overload
- Matches elite crypto/Web3 aesthetics (Uniswap, Aave, etc.)

**Spacing Scale:**
```css
--space-unit: 4px;
--space-xs: 8px;
--space-sm: 12px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;
--space-4xl: 96px;
--space-5xl: 128px;
```

Based on 4px grid for pixel-perfect alignment.

### Tailwind V4 Integration

**Theme Extension:**
```css
@theme inline {
  --color-background: var(--background);
  --color-accent: var(--accent);
  /* etc. */
}
```

This maps CSS variables to Tailwind utilities:
- `bg-background` → `var(--background)`
- `text-accent` → `var(--accent)`

**Custom Utilities:**
```css
.grid-background {
  background-image:
    linear-gradient(var(--grid-color) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
  background-size: 50px 50px;
}
```

Used in Hero and CTA for animated grid effect.

---

## 🎬 Animation System Architecture

### GSAP Configuration (`lib/gsap.ts`)

**Plugin Registration:**
```typescript
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}
```

Must check `window` existence for SSR compatibility.

**Easing Philosophy:**

```typescript
export const Ease = {
  silk: 'power2.out',      // Smooth luxury (most common)
  enter: 'power3.out',     // Confident entrance
  exit: 'power2.in',       // Subtle exit
  elastic: 'elastic.out',  // Physics-based (sparingly)
  expo: 'expo.out',        // Dramatic reveals (hero text)
  inOut: 'power2.inOut',   // Symmetrical motion
};
```

Each curve chosen for specific emotional impact:
- `power2.out` = smooth, professional
- `power3.out` = energetic but controlled
- `expo.out` = cinematic, dramatic
- `elastic.out` = playful physics (use sparingly)

**Duration System:**

```typescript
export const Duration = {
  instant: 0.2,   // Micro-interactions
  fast: 0.4,      // Quick reveals
  base: 0.6,      // Standard animation
  slow: 0.8,      // Emphasized motion
  slowest: 1.2,   // Heavy elements
  cinematic: 1.8, // Hero moments
};
```

Consistent timing creates rhythm. Avoid random durations.

### React Hooks (`hooks/useGSAP.ts`)

**useGSAP Hook:**
```typescript
export function useGSAP(
  callback: (context: gsap.Context) => void,
  dependencies: React.DependencyList = []
) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      callback(ctx);
    });
    return () => ctx.revert(); // Cleanup!
  }, dependencies);
}
```

**Why GSAP Context?**
- Automatically scopes animations
- `ctx.revert()` kills all animations in context
- Prevents memory leaks on unmount
- React Fast Refresh compatible

**Usage Pattern:**
```typescript
useGSAP(() => {
  gsap.to('.element', { opacity: 1, duration: 1 });
}, []); // Empty deps = run once on mount
```

---

## 🧩 Component Patterns

### Hero Section (`components/sections/Hero.tsx`)

**Animation Orchestration:**

1. **SplitText Setup:**
```typescript
const nameSplit = new SplitText(nameRef.current, { type: 'chars,words' });
```

Splits "MR EAGLE" into individual characters for animation.

2. **Initial State:**
```typescript
gsap.set(nameSplit.chars, { opacity: 0, y: 100, rotationX: -90 });
```

Characters hidden, below viewport, rotated in 3D.

3. **Timeline Orchestration:**
```typescript
tl.to(nameSplit.chars, {
  opacity: 1,
  y: 0,
  rotationX: 0,
  duration: Duration.slow,
  stagger: Stagger.tight,
  ease: Ease.expo,
})
.to(subtitleSplit.words, { /* ... */ }, '-=0.4') // Overlap by 0.4s
```

`-=0.4` creates overlap between animations for smooth flow.

4. **Parallax on Scroll:**
```typescript
gsap.to(containerRef.current, {
  y: 150,
  opacity: 0.8,
  scrollTrigger: {
    trigger: containerRef.current,
    start: 'top top',
    end: 'bottom top',
    scrub: 1, // Smooth sync with scroll
  },
});
```

Section fades and moves down as user scrolls past.

### About Section (`components/sections/About.tsx`)

**Line-by-Line Text Reveal:**

1. **Split into Lines:**
```typescript
const split = new SplitText(paragraph, { type: 'lines' });
```

2. **Wrap Lines for Clip Effect:**
```typescript
split.lines.forEach((line) => {
  const wrapper = document.createElement('div');
  wrapper.style.overflow = 'hidden';
  line.parentNode?.insertBefore(wrapper, line);
  wrapper.appendChild(line);
});
```

Wrapper clips line until it animates into view.

3. **Scroll-Triggered Animation:**
```typescript
ScrollTrigger.create({
  trigger: paragraph,
  start: 'top 75%', // When top of element is 75% down viewport
  onEnter: () => {
    gsap.to(split.lines, {
      opacity: 1,
      y: 0,
      duration: Duration.slow,
      stagger: Stagger.base,
      ease: Ease.enter,
    });
  },
});
```

Lines animate in when paragraph scrolls into view.

### Experience Section (`components/sections/Experience.tsx`)

**Timeline Line Progressive Reveal:**

```typescript
ScrollTrigger.create({
  trigger: sectionRef.current,
  start: 'top center',
  end: 'bottom center',
  scrub: 1,
  onUpdate: (self) => {
    gsap.to(timelineLine, {
      scaleY: self.progress, // 0 to 1 as section scrolls
      duration: 0.1,
    });
  },
});
```

Vertical line grows from 0 to 100% as section is scrolled through.

**Role Card States:**

```typescript
ScrollTrigger.create({
  trigger: role,
  start: 'top 70%',
  end: 'bottom 30%',
  onEnter: () => { /* Fade in, slide right */ },
  onEnterBack: () => { /* Reset to visible */ },
  onLeave: () => { /* Fade out slightly */ },
  onLeaveBack: () => { /* Fade out, slide left */ },
});
```

Cards respond to scroll direction for smooth experience.

### Skills Section (`components/sections/Skills.tsx`)

**Random Cluster Reveal:**

```typescript
gsap.to(skills, {
  opacity: 1,
  scale: 1,
  y: 0,
  duration: Duration.base,
  stagger: {
    amount: 0.4,
    from: 'random', // Randomize order
    ease: Ease.enter,
  },
});
```

Skills appear in random order within cluster, creating organic feel.

### CTA Section (`components/sections/CTA.tsx`)

**Background Slowdown Effect:**

```typescript
gsap.to(gridRef.current, {
  opacity: 0.3,
  scale: 1.1,
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top bottom',
    end: 'center center',
    scrub: 1,
  },
});
```

Grid background slows and fades as user approaches CTA, creating calm outro.

---

## 🎯 Mobile-First Responsive Strategy

### Text Sizing Pattern

**Bad (desktop-first):**
```jsx
<h1 className="text-6xl md:text-4xl">Title</h1>
```

**Good (mobile-first):**
```jsx
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
  Title
</h1>
```

Start small, scale up. Prevents overwhelming mobile viewports.

### Spacing Pattern

```jsx
<section className="py-12 sm:py-16 md:py-20 lg:py-24">
```

- Mobile: 48px vertical padding
- Desktop: 96px vertical padding
- Gradual increase maintains proportions

### Grid Adaptation

```jsx
<div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
```

- Mobile: Single column (readable)
- Tablet: 2 columns (balanced)
- Desktop: 3 columns (dense)

---

## ♿ Accessibility Implementation

### Reduced Motion

**Global CSS:**
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

All animations disabled if user prefers reduced motion.

**JavaScript Check:**
```typescript
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
```

Can use this to conditionally disable GSAP animations.

### Semantic HTML

```jsx
<section>  {/* Not div */}
  <h2>     {/* Proper heading hierarchy */}
  <p>      {/* Paragraphs, not divs */}
```

Screen readers navigate by landmarks and headings.

### Touch Targets

All interactive elements meet 44x44px minimum:
```jsx
<a className="px-4 py-3 sm:px-5 sm:py-4">
  {/* Minimum touch target size */}
</a>
```

---

## 🚀 Performance Optimization

### Font Loading

```typescript
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Prevent FOIT (Flash of Invisible Text)
});
```

`display: swap` shows fallback font immediately, then swaps when custom font loads.

### Animation Cleanup

**Always cleanup GSAP animations:**
```typescript
useGSAP(() => {
  const tl = gsap.timeline();
  // Animations...

  // Cleanup happens automatically via context.revert()
}, []);
```

Prevents memory leaks on component unmount.

### Transform-Only Animations

**Good (GPU-accelerated):**
```typescript
gsap.to(element, { x: 100, y: 50, scale: 1.2, opacity: 0.5 });
```

**Bad (triggers layout/paint):**
```typescript
gsap.to(element, { width: 200, height: 300, marginLeft: 50 });
```

Transforms and opacity are cheap. Layout properties force reflow.

---

## 🔧 Customization Workflows

### Adding a New Section

1. **Create component:**
```bash
components/sections/NewSection.tsx
```

2. **Import GSAP hooks:**
```typescript
'use client';
import { useRef } from 'react';
import { useGSAP } from '@/hooks/useGSAP';
import { Ease, Duration } from '@/lib/gsap';
```

3. **Add to page:**
```typescript
// app/page.tsx
import NewSection from '@/components/sections/NewSection';

export default function Home() {
  return (
    <main>
      {/* ... */}
      <NewSection />
    </main>
  );
}
```

### Changing Animation Speed Globally

Edit `lib/gsap.ts:28`:
```typescript
export const Duration = {
  fast: 0.3,    // Was 0.4
  base: 0.5,    // Was 0.6
  slow: 0.7,    // Was 0.8
  // etc.
};
```

All components using `Duration.base` will update automatically.

### Changing Accent Color

Edit `app/globals.css:11`:
```css
--accent: #fbbf24;  /* Change to your color */
```

Tailwind utilities (`text-accent`, `bg-accent`, etc.) update automatically.

---

## 🐛 Common Issues & Solutions

### Issue: GSAP animations not working

**Cause:** Plugin not registered
**Solution:**
```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger); // Must register!
}
```

### Issue: ScrollTrigger not triggering

**Cause:** Element not in DOM when ScrollTrigger created
**Solution:**
```typescript
useGSAP(() => {
  if (!elementRef.current) return; // Guard clause

  ScrollTrigger.create({
    trigger: elementRef.current,
    // ...
  });
}, []); // Run after mount
```

### Issue: Animations firing on every re-render

**Cause:** Missing dependency array
**Solution:**
```typescript
useGSAP(() => {
  // animations...
}, []); // Empty array = run once
```

### Issue: Text splits not reverting

**Cause:** SplitText not cleaned up
**Solution:**
```typescript
useGSAP(() => {
  const split = new SplitText(ref.current, { type: 'lines' });
  // Use split...

  return () => {
    split.revert(); // Cleanup
  };
}, []);
```

---

## 📊 Build & Deploy Checklist

### Pre-Deploy

- [ ] Test on mobile (375px width minimum)
- [ ] Test with slow 3G throttling
- [ ] Test with reduced motion enabled
- [ ] Check all links work
- [ ] Verify contact information is correct
- [ ] Run Lighthouse audit (target 90+ all categories)
- [ ] Test keyboard navigation
- [ ] Check screen reader compatibility

### Build Commands

**Development:**
```bash
npm run dev
```

**Production Build:**
```bash
npm run build
```

**Preview Production:**
```bash
npm run build && npm start
```

### Environment Variables

None required for basic deployment.

For analytics/tracking, add to `.env.local`:
```
NEXT_PUBLIC_GA_ID=your-id
```

---

## 📚 Further Reading

### GSAP Resources
- [GSAP 3 Docs](https://gsap.com/docs/v3/)
- [ScrollTrigger Guide](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [GSAP + React Best Practices](https://gsap.com/resources/React/)

### Next.js Resources
- [App Router Documentation](https://nextjs.org/docs/app)
- [Server vs Client Components](https://nextjs.org/docs/app/building-your-application/rendering)
- [Optimizing Performance](https://nextjs.org/docs/app/building-your-application/optimizing)

### Web3 Design Inspiration
- [Uniswap](https://uniswap.org) — Clean, minimal interface
- [Aave](https://aave.com) — Dark mode, premium feel
- [The Graph](https://thegraph.com) — Grid aesthetics, tech-forward
- [Arbitrum](https://arbitrum.io) — Scroll-driven storytelling

---

## 🤝 Contributing Guidelines

### Code Style

- **TypeScript:** Strict mode enabled
- **Components:** One component per file
- **Naming:** PascalCase for components, camelCase for utilities
- **Comments:** JSDoc for public functions

### Git Workflow

```bash
# Feature branch
git checkout -b feature/new-section

# Commit with clear messages
git commit -m "Add new testimonials section with scroll animation"

# Push and create PR
git push origin feature/new-section
```

### Animation Guidelines

1. **Performance first:** Use transforms, not layout properties
2. **Easing intentional:** Choose from `Ease` constants, don't use defaults
3. **Duration consistent:** Use `Duration` constants
4. **Cleanup always:** Return cleanup function from useGSAP
5. **Mobile tested:** Test on actual mobile device, not just Chrome DevTools

---

**Built with precision. Maintained with discipline.**
