import { prisma } from '@/src/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
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

    if (!profile) {
      return NextResponse.json({ experiences: [], skills: [] });
    }

    return NextResponse.json({
      experiences: profile.experiences,
      skills: profile.skills,
    });
  } catch (error) {
    console.error('Error fetching admin data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
