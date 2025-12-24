# MR EAGLE — Elite Web3 Portfolio

A cinematic, high-end Web3 portfolio website for **Raymond Henry (MR EAGLE)** — Web3 Project Manager, COO, Growth Strategist, and Advisor.

This is not a generic portfolio. This is a **statement site** — built with the same quality and attention to detail as elite Web3 startups, crypto funds, and protocol landing pages.

---

## 🎬 Philosophy

This portfolio tells a story, not just displays information:

- **Dark mode first** — Luxury crypto aesthetics
- **Scroll-driven storytelling** — Every section enters with meaning
- **Physics-based motion** — Smooth, intentional animations via GSAP
- **Restrained power** — No childish neon overload, no gimmicks

---

## 🧱 Tech Stack

### Core
- **Next.js 16** (App Router) — Modern React framework
- **TypeScript** — Type-safe development
- **Tailwind CSS V4** — Utility-first styling with custom design tokens

### Animation Engine
- **GSAP 3** with full plugin access:
  - `ScrollTrigger` — Scroll-linked animations
  - `SplitText` — Character/word/line splitting for text reveals
  - Custom easing curves and timelines

### Key Features
- Mobile-first responsive design
- Reduced motion accessibility support
- Custom scrollbar styling
- Noise texture overlay for premium feel
- Animated grid backgrounds
- Performance-optimized with proper cleanup

---

## 📁 Project Structure

```
casi-henry/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page composition
│   └── globals.css         # Global styles + design tokens
├── components/
│   └── sections/
│       ├── Hero.tsx        # "THE SIGNAL" — Name reveal
│       ├── About.tsx       # "THE OPERATOR" — Narrative
│       ├── Experience.tsx  # "THE PROTOCOL HISTORY" — Timeline
│       ├── Skills.tsx      # "THE TOOLING" — Skill clusters
│       ├── Education.tsx   # "THE FOUNDATION" — Academic credentials
│       └── CTA.tsx         # "LET'S BUILD" — Contact section
├── hooks/
│   └── useGSAP.ts         # Custom React hooks for GSAP
├── lib/
│   └── gsap.ts            # GSAP utilities and configuration
└── README.md              # This file
```

---

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

---

## 🎯 Section Breakdown

### 1. Hero — "THE SIGNAL"
**Purpose:** Immediate authority

**Animations:**
- Name revealed via `SplitText` with 3D rotation
- Subtitle words fade in sequentially
- Statement lines stagger into view
- Scroll indicator with infinite pulse
- Parallax effect on scroll

---

### 2. About — "THE OPERATOR"
**Purpose:** Narrative, not biography

**Animations:**
- Title words revealed with stagger
- Paragraphs split into lines with clip effect
- Each line fades up independently
- Decorative accent line draws from left to right

---

### 3. Experience — "THE PROTOCOL HISTORY"
**Purpose:** Show credibility like a protocol roadmap

**Roles:**
- Block AI — COO
- Momentum Labs — Marketing Manager
- Munia Protocol — Project Manager & Growth Strategist
- TapTrend — Chief Growth Officer
- Stable Doc — Project Manager

---

### 4. Skills — "THE TOOLING"
**Purpose:** Signal versatility

**Clusters:**
- Strategy & Growth
- Product & Operations
- Communication & Leadership

---

### 5. Education — "THE FOUNDATION"
**Purpose:** Minimal, elegant credentials

**Institutions:**
- Harvard University — Marketing
- Harvard Business School Online — Leadership & Management

---

### 6. CTA — "LET'S BUILD"
**Purpose:** Conversion without desperation

**Contact:**
- Email
- X (Twitter): @mreagleweb3
- Location: Africa, Nigeria

---

## 🎨 Design System

### Color Palette
- Deep blacks (#000000, #0a0a0a, #0f0f0f)
- Soft whites (#fafafa, #a1a1a1, #737373)
- Muted gold accent (#fbbf24)
- Cyan accent (#22d3ee)

### Typography
- **Geist Sans** — Clean, modern grotesk
- **Geist Mono** — Technical details and labels

### Responsive Breakpoints
- `sm:` → 640px
- `md:` → 768px
- `lg:` → 1024px
- `xl:` → 1280px
- `2xl:` → 1536px

---

## 🎭 Animation System

### GSAP Utilities (`lib/gsap.ts`)

**Premium Easing Curves:**
- `Ease.silk` — Smooth, luxury feel
- `Ease.enter` — Confident entrance
- `Ease.expo` — Dramatic reveals

**Duration System:**
- `Duration.fast` — 0.4s
- `Duration.base` — 0.6s
- `Duration.slow` — 0.8s
- `Duration.cinematic` — 1.8s

**Key Functions:**
- `revealText()` — SplitText-based text reveals
- `scrollReveal()` — Scroll-triggered animations
- `fadeInUp()` — Common entrance pattern
- `parallax()` — Parallax scroll effects

---

## 🎨 Customization Guide

### Update Content

**Personal Information:**
Edit metadata in `app/layout.tsx` and contact info in `components/sections/CTA.tsx`

**Experience:**
Modify the `roles` array in `components/sections/Experience.tsx`

**Skills:**
Update `skillClusters` in `components/sections/Skills.tsx`

**Education:**
Edit `education` array in `components/sections/Education.tsx`

### Adjust Animations

**Speed:** Modify duration values in `lib/gsap.ts`
**Easing:** Customize curves in `lib/gsap.ts`

### Change Colors

Edit CSS variables in `app/globals.css`:
```css
--accent: #fbbf24;
--accent-cyan: #22d3ee;
```

---

## ♿ Accessibility

- **Reduced Motion Support** — All animations respect `prefers-reduced-motion`
- **Touch Targets** — Minimum 44x44px for all interactive elements
- **Semantic HTML** — Proper heading hierarchy throughout
- **Keyboard Navigation** — All elements are keyboard accessible

---

## 📱 Mobile Optimization

Mobile-first responsive design:
- Text sizes scale from mobile → desktop
- Padding increases with breakpoints
- Grid layouts adapt per screen size
- Touch-friendly interactions

---

## ⚡ Performance

- Server Components where possible
- Font optimization with `font-display: swap`
- Proper GSAP cleanup on unmount
- Lazy animations (only on scroll into view)
- No layout shift (transforms only)

---

## 📦 Dependencies

### Production
- `next` — ^16.1.1
- `react` — ^19.2.3
- `gsap` — Latest
- `@gsap/react` — Latest

### Development
- `typescript` — ^5
- `tailwindcss` — ^4
- `eslint` — ^9

---

## 🚢 Deployment

### Recommended Platforms
- Vercel (optimized for Next.js)
- Netlify
- Cloudflare Pages

### Build Command
```bash
npm run build
```

---

## 📬 Contact

- **Email:** raymondhenry@example.com
- **X (Twitter):** [@mreagleweb3](https://twitter.com/mreagleweb3)
- **Location:** Africa, Nigeria

---

**This is not just a portfolio. This is a statement.**
