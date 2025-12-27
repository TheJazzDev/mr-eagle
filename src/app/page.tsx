import Hero from '@/src/components/Hero';
import ExperienceTimeline from '@/src/components/ExperienceTimeline';
import Skills from '@/src/components/Skills';
import ContactForm from '@/src/components/ContactForm';
import Contact from '@/src/components/Contact';
import { prisma } from '@/src/lib/prisma';

async function getPortfolioData() {
  try {
    const profile = await prisma.profile.findFirst({
      include: {
        experiences: {
          orderBy: {
            current: 'desc',
          },
        },
        skills: {
          orderBy: {
            category: 'asc',
          },
        },
      },
    });

    return profile;
  } catch (error) {
    console.error('Failed to fetch portfolio data:', error);
    return null;
  }
}

export default async function Home() {
  const data = await getPortfolioData();

  if (!data) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black'>
        <div className='text-center'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white'>
            Welcome to the Portfolio
          </h1>
          <p className='text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6'>
            Setting up the database. Please run migrations first.
          </p>
          <code className='bg-gray-800 text-gray-100 px-4 py-2 rounded-lg text-xs sm:text-sm block max-w-lg mx-auto'>
            npx prisma migrate dev --name init
          </code>
        </div>
      </div>
    );
  }

  return (
    <main className='min-h-screen bg-[#2d1810]'>
      <Hero profile={data} />
      <ExperienceTimeline experiences={data.experiences} />
      <Skills skills={data.skills} />
      <ContactForm />
      <Contact profile={data} />
    </main>
  );
}
