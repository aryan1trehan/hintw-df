import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const {
    fullName,
    brandName,
    phone,
    email,
    projectCategory,
    projectTimeline,
    vision,
    suitableTime,
  } = body ?? {}

  const text = [
    `New inquiry from Enhanccee contact form:`,
    ``,
    `Name: ${fullName || '-'}`,
    `Brand / Company: ${brandName || '-'}`,
    `Phone: ${phone || '-'}`,
    `Email: ${email || '-'}`,
    `Project Category: ${projectCategory || '-'}`,
    `Project Timeline: ${projectTimeline || '-'}`,
    ``,
    `Vision:`,
    `${vision || '-'}`,
    ``,
    `Suitable Time to Connect: ${suitableTime || '-'}`,
  ].join('\n')

  // For now, just log the email content so the route is safe without SMTP configuration.
  // To actually send an email, plug this into your provider (Resend, SendGrid, SMTP, etc.).
  console.log('CONTACT_FORM_EMAIL:\n', text)

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}





