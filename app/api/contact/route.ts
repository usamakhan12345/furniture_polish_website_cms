import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { getPayloadClient } from '../../../utilities/api'

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json()

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Name, email, phone, and message are required.' },
        { status: 400 }
      )
    }

    const payload = await getPayloadClient()

    // 1. Save submission details to the MongoDB Messages database collection
    const submission = await payload.create({
      collection: 'messages',
      data: {
        name,
        email,
        phone,
        message,
      },
    })

    // 2. Dispatch email notification to usamakhank8910@gmail.com using nodemailer
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER || '', // e.g. sender email
          pass: process.env.SMTP_PASS || '', // e.g. sender app password
        },
      })

      await transporter.sendMail({
        from: `"${name}" <${process.env.SMTP_USER || 'no-reply@polishmaster.com'}>`,
        to: 'usamakhank8910@gmail.com',
        replyTo: email,
        subject: `New Wood Polish Inquiry from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #fcfbf9;">
            <h2 style="color: #d97706; border-bottom: 2px solid #f5ebe0; padding-bottom: 10px; margin-top: 0;">New Message Received</h2>
            <p style="font-size: 16px; margin: 15px 0;"><strong>Name:</strong> ${name}</p>
            <p style="font-size: 16px; margin: 15px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #d97706; text-decoration: none;">${email}</a></p>
            <p style="font-size: 16px; margin: 15px 0;"><strong>Phone Number:</strong> ${phone}</p>
            <p style="font-size: 16px; margin: 15px 0;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            <hr style="border: 0; border-top: 1px solid #f5ebe0; margin: 20px 0;" />
            <p style="font-size: 16px; font-weight: bold; margin-bottom: 8px;">Message Content:</p>
            <div style="background-color: #fff; padding: 15px; border-radius: 8px; border: 1px solid #f5ebe0; font-size: 15px; line-height: 1.6; color: #334155; white-space: pre-wrap;">
              ${message}
            </div>
          </div>
        `,
      })
    } catch (emailError) {
      // Log SMTP errors but do not crash the API response, so the user knows database storage succeeded
      console.error(`Failed to dispatch SMTP email notification to usamakhank8910@gmail.com:`, emailError)
    }

    return NextResponse.json({ success: true, doc: submission })
  } catch (error: any) {
    console.error('Error handling contact form API submission:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error.' },
      { status: 500 }
    )
  }
}
