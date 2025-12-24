/**
 * Experience Section - "THE PROTOCOL HISTORY"
 * Timeline-style pinned scroll with modular role cards
 */

'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';
import { Ease, Duration } from '@/lib/gsap';

interface Role {
  company: string;
  role: string;
  period: string;
  impact: string[];
}

const roles: Role[] = [
  {
    company: 'Block AI',
    role: 'Chief Operating Officer (COO)',
    period: 'Nov 2024 — Present',
    impact: [
      'Oversee day-to-day operations and strategic execution for BlockAI, ensuring alignment between product vision, business objectives, and technical delivery',
      'Define and manage product roadmap, milestones, and KPIs to ensure timely execution and measurable growth',
      'Collaborate with founders and stakeholders on strategic planning, partnerships, and investor communications',
      'Drive user-centric decision-making by leveraging analytics, feedback loops, and market research to refine product features and UX',
      'Implement operational processes and workflows to improve efficiency, accountability, and execution speed across teams',
      'Lead product management across the full lifecycle — from ideation and requirements gathering to development, testing, and launch',
    ],
  },
  {
    company: 'Munia Protocol',
    role: 'Project Manager & Growth Strategist',
    period: 'Aug 2024 — Nov 2024',
    impact: [
      'Led growth and marketing strategy for Munia Protocol, focusing on brand awareness, user acquisition, and community expansion within the Web3 ecosystem',
      'Collaborated closely with founders, developers, and community managers to align marketing initiatives with product development and roadmap milestones',
      'Contributed to investor-facing messaging, pitch materials, and public communications to strengthen protocol credibility and visibility',
      'Drove marketing and growth initiatives for a Web3 protocol, increasing brand visibility, community engagement, and user adoption',
      'Translated business and market requirements into clear product specifications, user flows, and technical documentation for engineering teams',
    ],
  },
  {
    company: 'Momentum Labs',
    role: 'Marketing Manager & Content Writer',
    period: 'May 2024',
    impact: [
      'Developed and executed marketing strategies to enhance brand visibility, attract users, and increase community engagement for Solana-based trading bot',
      'Collaborated with key opinion leaders (KOLs) and influencers in the crypto space to drive awareness and user acquisition',
      'Created engaging and informative content to promote Momentum Labs\' products',
      'Conducted market research to identify industry trends and competitive positioning, informing business strategies',
      'Developed short-form and long-form marketing materials tailored to Web3 audiences',
      'Assisted in shaping the brand voice and strategy during early-stage product promotion',
    ],
  },
  {
    company: 'PixiLand',
    role: 'Business Development Manager (BDM)',
    period: 'Oct 2024 — Feb 2025',
    impact: [
      'Spearheaded partnership efforts, successfully securing collaborations with six projects, expanding the project\'s ecosystem and visibility',
      'Developed and executed marketing strategies to enhance brand visibility, attract users, and increase community engagement',
      'Conducted market research to identify industry trends and competitive positioning, informing business strategies',
      'Organized and facilitated high-impact meetings with potential partners and investors, ensuring strategic alignment with business objectives',
    ],
  },
  {
    company: 'TapTrend',
    role: 'Chief Growth Officer',
    period: 'Apr 2024 — Nov 2024',
    impact: [
      'Spearheaded growth initiatives for a groundbreaking tap-to-earn game, leveraging innovative marketing strategies to increase user acquisition and engagement',
      'Collaborated with cross-functional teams to optimize product features and enhance user experience, driving player retention and community building',
      'Analyzed market trends and user feedback to inform strategic decisions, leading to a significant increase in active users and brand loyalty',
      'Developed and executed comprehensive outreach campaigns across social media and digital platforms, effectively positioning TapTrend as a leader in the Web3 gaming space',
    ],
  },
  {
    company: 'Stable Doc',
    role: 'Project Manager',
    period: 'Oct 2021 — Jan 2023',
    impact: [
      'Led a 7-member team to develop and launch a blockchain-based healthcare application available on Android, iOS, and web platforms',
      'Coordinated project activities, managed timelines, and ensured alignment with business goals through effective stakeholder communication',
      'Conducted user testing and gathered feedback to enhance product features and user experience',
      'Implemented agile methodologies using Trello for project management, facilitating efficient workflow and team collaboration',
      'Successfully negotiated partnerships and outreach efforts, contributing to the project\'s sustained growth and user engagement',
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const rolesRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current || !timelineRef.current) return;

    // Title entrance
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: 30 });

      ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: Duration.slow,
            ease: Ease.enter,
          });
        },
      });
    }

    // Timeline line progressive reveal
    const timelineLine = timelineRef.current;
    gsap.set(timelineLine, { scaleY: 0, transformOrigin: 'top center' });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top center',
      end: 'bottom center',
      scrub: 1,
      onUpdate: (self) => {
        gsap.to(timelineLine, {
          scaleY: self.progress,
          duration: 0.1,
        });
      },
    });

    // Role cards sequential reveal with pin effect
    rolesRef.current.forEach((role, index) => {
      if (!role) return;

      gsap.set(role, { opacity: 0, x: -50 });

      ScrollTrigger.create({
        trigger: role,
        start: 'top 70%',
        end: 'bottom 30%',
        onEnter: () => {
          gsap.to(role, {
            opacity: 1,
            x: 0,
            duration: Duration.slow,
            ease: Ease.enter,
            delay: index * 0.1,
          });
        },
        onEnterBack: () => {
          gsap.to(role, {
            opacity: 1,
            x: 0,
            duration: Duration.base,
          });
        },
        onLeave: () => {
          gsap.to(role, {
            opacity: 0.4,
            scale: 0.98,
            duration: Duration.base,
          });
        },
        onLeaveBack: () => {
          gsap.to(role, {
            opacity: 0,
            x: -50,
            duration: Duration.base,
          });
        },
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        {/* Section Label */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <p className="font-mono text-xs font-medium tracking-widest text-accent sm:text-sm">
            02 — THE PROTOCOL HISTORY
          </p>
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="mb-16 text-3xl font-bold text-foreground sm:mb-20 sm:text-4xl md:mb-24 md:text-5xl"
        >
          Execution at scale.
        </h2>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div
            ref={timelineRef}
            className="absolute left-0 top-0 hidden h-full w-[2px] bg-linear-to-b from-accent/80 to-accent/40 md:block"
          />

          {/* Roles */}
          <div className="space-y-12 sm:space-y-16 md:ml-16 md:space-y-20">
            {roles.map((role, index) => (
              <div
                key={`${role.company}-${index}`}
                ref={(el) => {
                  rolesRef.current[index] = el;
                }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[9px] top-2 hidden h-4 w-4 rounded-full border-2 border-accent bg-background md:block" />

                {/* Role Card */}
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-background-elevated p-6 transition-colors hover:border-accent/50 sm:rounded-3xl sm:p-8 md:p-10">
                  {/* Header */}
                  <div className="mb-6 sm:mb-8">
                    <div className="mb-2 flex flex-col justify-between gap-2 sm:flex-row sm:items-start sm:gap-4">
                      <h3 className="text-xl font-bold text-foreground sm:text-2xl md:text-3xl">
                        {role.company}
                      </h3>
                      <span className="font-mono text-xs text-subtle sm:text-sm">
                        {role.period}
                      </span>
                    </div>
                    <p className="text-base font-medium text-accent sm:text-lg">
                      {role.role}
                    </p>
                  </div>

                  {/* Impact Points */}
                  <ul className="space-y-3 sm:space-y-4">
                    {role.impact.map((point, idx) => (
                      <li key={idx} className="flex gap-3 sm:gap-4">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent sm:mt-2" />
                        <span className="text-sm leading-relaxed text-muted sm:text-base md:text-lg md:leading-relaxed">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Hover effect gradient */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute right-0 top-0 h-32 w-32 bg-[radial-gradient(circle,rgba(255,107,0,0.15)_0%,transparent_70%)] sm:h-40 sm:w-40" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
