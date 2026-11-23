import { NextResponse } from 'next/server'
import { getPayloadClient } from '../../../utilities/api'
import { publicFeedbackWhere } from '../../../collections/Feedbacks'

export async function GET() {
  try {
    const payload = await getPayloadClient()
    // Local API calls skip access control, so only accepted reviews are requested explicitly.
    const result = await payload.find({
      collection: 'feedbacks',
      where: publicFeedbackWhere,
      limit: 100,
      sort: '-createdAt',
    })
    return NextResponse.json({ docs: result.docs })
  } catch (error: any) {
    console.error('Error fetching feedbacks:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error.' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const { name, company, title, rating, feedback } = await req.json()

    if (!name || !feedback) {
      return NextResponse.json(
        { error: 'Name and feedback content are required.' },
        { status: 400 }
      )
    }

    const payload = await getPayloadClient()

    // New reviews always start as "pending"; an admin accepts or rejects them in the CMS.
    await payload.create({
      collection: 'feedbacks',
      data: {
        name,
        company: company || '',
        title: title || '',
        rating: Number(rating) || 5,
        feedback,
        status: 'pending',
      },
    })

    return NextResponse.json({ success: true, status: 'pending' })
  } catch (error: any) {
    console.error('Error creating feedback:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error.' },
      { status: 500 }
    )
  }
}
