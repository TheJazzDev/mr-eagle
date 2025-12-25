import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma';

// CREATE new skill
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, category } = body

    // Get the first profile (assuming single profile)
    const profile = await prisma.profile.findFirst()

    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      )
    }

    const skill = await prisma.skill.create({
      data: {
        name,
        category,
        profileId: profile.id
      }
    })

    return NextResponse.json(skill)
  } catch (error) {
    console.error('Error creating skill:', error)
    return NextResponse.json(
      { error: 'Failed to create skill' },
      { status: 500 }
    )
  }
}

// UPDATE existing skill
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, name, category } = body

    const skill = await prisma.skill.update({
      where: { id },
      data: {
        name,
        category
      }
    })

    return NextResponse.json(skill)
  } catch (error) {
    console.error('Error updating skill:', error)
    return NextResponse.json(
      { error: 'Failed to update skill' },
      { status: 500 }
    )
  }
}

// DELETE skill
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

    await prisma.skill.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting skill:', error)
    return NextResponse.json(
      { error: 'Failed to delete skill' },
      { status: 500 }
    )
  }
}
