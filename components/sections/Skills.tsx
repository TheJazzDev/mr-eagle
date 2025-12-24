/**
 * Skills Section - "THE TOOLING"
 * Cluster-based reveal with magnetic hover effects
 */

'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';
import { Ease, Duration, Stagger } from '@/lib/gsap';

interface SkillCluster {
  category: string;
  skills: string[];
}

const skillClusters: SkillCluster[] = [
  {
    category: 'Core Competencies',
    skills: [
      'Strategic Planning',
      'Team Leadership & Management',
      'Excellent Communication & Presentation',
      'Quality Assurance',
      'Budget Management',
      'Time Management',
    ],
  },
  {
    category: 'Product & Growth',
    skills: [
      'Product Management',
      'Growth Marketing',
      'Go-to-Market Strategy',
      'User Acquisition',
      'Community Building',
      'Brand Strategy',
      'Market Research',
      'Competitive Analysis',
    ],
  },
  {
    category: 'Operations & Execution',
    skills: [
      'Agile/Scrum Methodologies',
      'Project Management',
      'Process Optimization',
      'Cross-functional Coordination',
      'Roadmap Planning',
      'KPI Design & Analytics',
      'Stakeholder Management',
      'Partnership Development',
    ],
  },
  {
    category: 'Web3 & Marketing',
    skills: [
      'Web3 Marketing',
      'Content Strategy & Writing',
      'KOL & Influencer Partnerships',
      'Community Engagement',
      'Investor Communications',
      'Pitch & Messaging',
      'Social Media Campaigns',
      'Brand Positioning',
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const clustersRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Title animation
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

    // Cluster animations
    clustersRef.current.forEach((cluster, index) => {
      if (!cluster) return;

      const skills = cluster.querySelectorAll('.skill-item');

      gsap.set(skills, {
        opacity: 0,
        scale: 0.8,
        y: 20,
      });

      ScrollTrigger.create({
        trigger: cluster,
        start: 'top 75%',
        onEnter: () => {
          gsap.to(skills, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: Duration.base,
            stagger: {
              amount: 0.4,
              from: 'random',
              ease: Ease.enter,
            },
            ease: Ease.enter,
            delay: index * 0.15,
          });
        },
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background-elevated py-32 sm:py-40 md:py-52 lg:py-64"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 md:px-12 lg:px-20">
        {/* Section Label */}
        <div className="mb-20 sm:mb-24 md:mb-32">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent sm:text-sm">
            03 — The Tooling
          </p>
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="mb-20 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-foreground sm:mb-24 md:mb-32"
        >
          Full-stack operator.
        </h2>

        {/* Skill Clusters */}
        <div className="space-y-20 sm:space-y-24 md:space-y-28 lg:space-y-32">
          {skillClusters.map((cluster, index) => (
            <div
              key={cluster.category}
              ref={(el) => {
                clustersRef.current[index] = el;
              }}
            >
              {/* Category */}
              <h3 className="mb-8 text-lg font-bold text-accent sm:mb-10 sm:text-xl md:mb-12 md:text-2xl">
                {cluster.category}
              </h3>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
                {cluster.skills.map((skill) => (
                  <div
                    key={skill}
                    className="skill-item group relative overflow-hidden rounded-xl border border-border bg-background px-6 py-5 transition-all duration-300 hover:border-accent/40 hover:bg-background-subtle sm:rounded-2xl sm:px-8 sm:py-6 md:px-10 md:py-7"
                  >
                    <span className="relative z-10 block text-base font-medium text-foreground/90 sm:text-lg">
                      {skill}
                    </span>

                    {/* Hover gradient effect */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="absolute bottom-0 right-0 h-20 w-20 bg-[radial-gradient(circle,rgba(255,107,0,0.12)_0%,transparent_70%)] sm:h-24 sm:w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
