import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to like post' }, { status: 500 })
  }
}