import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma';

// CREATE new experience
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { company, position, startDate, endDate, description, current } = body

    // Get the first profile (assuming single profile)
    const profile = await prisma.profile.findFirst()

    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      )
    }

    const experience = await prisma.experience.create({
      data: {
        company,
        position,
        startDate,
        endDate: endDate || null,
        description,
        current: current || false,
        profileId: profile.id
      }
    })

    return NextResponse.json(experience)
  } catch (error) {
    console.error('Error creating experience:', error)
    return NextResponse.json(
      { error: 'Failed to create experience' },
      { status: 500 }
    )
  }
}

// UPDATE existing experience
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, company, position, startDate, endDate, description, current } = body

    const experience = await prisma.experience.update({
      where: { id },
      data: {
        company,
        position,
        startDate,
        endDate: endDate || null,
        description,
        current: current || false
      }
    })

    return NextResponse.json(experience)
  } catch (error) {
    console.error('Error updating experience:', error)
    return NextResponse.json(
      { error: 'Failed to update experience' },
      { status: 500 }
    )
  }
}

// DELETE experience
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      )
    }

    await prisma.experience.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting experience:', error)
    return NextResponse.json(
      { error: 'Failed to delete experience' },
      { status: 500 }
    )
  }
}
