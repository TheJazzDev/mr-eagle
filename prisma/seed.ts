// import { PrismaClient } from '@prisma/client'

import { prisma } from '@/src/lib/prisma';

// const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.skill.deleteMany();
  await prisma.education.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.profile.deleteMany();

  // Create profile
  const profile = await prisma.profile.create({
    data: {
      name: 'Raymond Henry',
      tagline: 'Project Manager, Marketer and Advisor',
      bio: "I work across product, operations, and growth, focusing on turning complex ideas into clear, practical outcomes. I'm involved in shaping direction, improving execution, and building systems that support sustainable scale.\n\nMy experience spans early-stage environments where structure, communication, and follow-through matter. I care about how products are built, how teams collaborate, and how ideas move from concept to real-world use.\n\nI value clarity, consistency, and thoughtful execution, and I enjoy working where long-term thinking and disciplined action come together.",
      location: 'Africa, Nigeria',
      email: 'web3eaglealpha@gmail.com',
      phone: '+447453741016',
      twitter: '@web3eaglealpha',
      telegram: '@web3eglealpha',

      experiences: {
        create: [
          {
            company: 'Block AI',
            position: 'Chief Operating Officer (COO)',
            startDate: 'Nov 2025',
            endDate: null,
            current: true,
            description: [
              'Collaborate with founders and stakeholders on strategic planning, partnerships, and investor communications.',
              'Drive user-centric decision-making by leveraging analytics, feedback loops, and market research to refine product features and UX.',
              'Implement operational processes and workflows to improve efficiency, accountability, and execution speed across teams.',
              'Oversee day-to-day operations and strategic execution for BlockAI, ensuring alignment between product vision, business objectives, and technical delivery.',
              'Define and manage product roadmap, milestones, and KPIs to ensure timely execution and measurable growth.',
              'Translate business and market requirements into clear product specifications, user flows, and technical documentation for engineering teams.',
              'Lead product management across the full lifecycle — from ideation and requirements gathering to development, testing, and launch.',
            ],
          },
          {
            company: 'Munia Protocol',
            position: 'Project Manager and Growth Strategist',
            startDate: 'Aug 2025',
            endDate: 'Nov 2025',
            current: false,
            description: [
              'Led growth and marketing strategy for Munia Protocol, focusing on brand awareness, user acquisition, and community expansion within the Web3 ecosystem.',
              'Collaborated closely with founders, developers, and community managers to align marketing initiatives with product development and roadmap milestones.',
              'Contributed to investor-facing messaging, pitch materials, and public communications to strengthen protocol credibility and visibility.',
              'Drove marketing and growth initiatives for a Web3 protocol, increasing brand visibility, community engagement, and user adoption.',
            ],
          },
          {
            company: 'Momentum Labs',
            position: 'Marketing Manager and Content Writer',
            startDate: 'May 2025',
            endDate: 'May 2025',
            current: false,
            description: [
              'Collaborated with key opinion leaders (KOLs) and influencers in the crypto space to drive awareness and user acquisition.',
              "Created engaging and informative content to promote Momentum Labs' Solana-based trading bot.",
              'Conducted market research to identify industry trends and competitive positioning, informing business strategies.',
              'Developed short-form and long-form marketing materials tailored to Web3 audiences.',
              'Assisted in shaping the brand voice and strategy during early-stage product promotion.',
            ],
          },
          {
            company: 'PixiLand',
            position: 'Business Development Manager (BDM)',
            startDate: 'Oct 2024',
            endDate: 'Feb 2025',
            current: false,
            description: [
              "Spearheaded partnership efforts, successfully securing collaborations with six projects, expanding the project's ecosystem and visibility.",
              'Developed and executed marketing strategies to enhance brand visibility, attract users, and increase community engagement.',
              'Conducted market research to identify industry trends and competitive positioning, informing business strategies.',
              'Organized and facilitated high-impact meetings with potential partners and investors, ensuring strategic alignment with business objectives.',
            ],
          },
          {
            company: 'TapTrend',
            position: 'Chief Growth Officer',
            startDate: 'Apr 2024',
            endDate: 'Nov 2024',
            current: false,
            description: [
              'Spearheading growth initiatives for a groundbreaking tap-to-earn game, leveraging innovative marketing strategies to increase user acquisition and engagement.',
              'Collaborating with cross-functional teams to optimize product features and enhance user experience, driving player retention and community building.',
              'Analyzing market trends and user feedback to inform strategic decisions, leading to a significant increase in active users and brand loyalty.',
              'Developing and executing comprehensive outreach campaigns across social media and digital platforms, effectively positioning TapTrend as a leader in the Web3 gaming space.',
            ],
          },
          {
            company: 'Stable Doc',
            position: 'Project Manager',
            startDate: 'Oct 2021',
            endDate: 'Jan 2023',
            current: false,
            description: [
              'Led a 7-member team to develop and launch a blockchain-based healthcare application available on Android, iOS, and web platforms.',
              'Coordinated project activities, managed timelines, and ensured alignment with business goals through effective stakeholder communication.',
              'Conducted user testing and gathered feedback to enhance product features and user experience.',
              'Implemented agile methodologies using Trello for project management, facilitating efficient workflow and team collaboration.',
              "Successfully negotiated partnerships and outreach efforts, contributing to the project's sustained growth and user engagement.",
            ],
          },
        ],
      },

      education: {
        create: [
          {
            institution: 'Harvard University',
            degree: "Bachelor's Degree",
            field: 'Marketing',
            year: '2009-2013',
          },
          {
            institution: 'Harvard Business School Online',
            degree: 'Certificate of Specialization',
            field: 'Leadership and Management',
            year: '2018',
          },
        ],
      },

      skills: {
        create: [
          { name: 'Strategic Planning', category: 'Leadership' },
          { name: 'Team Leadership and Management', category: 'Leadership' },
          {
            name: 'Excellent Communication and Presentation Skills',
            category: 'Communication',
          },
          { name: 'Quality Assurance', category: 'Operations' },
          { name: 'Budget Management', category: 'Operations' },
          { name: 'Time Management', category: 'Operations' },
          { name: 'Web3 Marketing', category: 'Marketing' },
          { name: 'Community Building', category: 'Marketing' },
          { name: 'Content Creation', category: 'Marketing' },
          { name: 'Product Management', category: 'Product' },
          { name: 'Business Development', category: 'Business' },
          { name: 'Partnership Strategy', category: 'Business' },
          { name: 'Agile Methodologies', category: 'Technical' },
          { name: 'Market Research', category: 'Research' },
          { name: 'User Testing', category: 'Product' },
        ],
      },
    },
  });

  console.log('Database seeded successfully!');
  console.log({ profile });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
