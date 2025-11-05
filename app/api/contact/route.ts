import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const SEND_TO = process.env.CONTACT_TO || '';
const resendApiKey = process.env.RESEND_API_KEY || '';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name || '').slice(0, 200);
    const email = String(body.email || '').slice(0, 200);
    const message = String(body.message || '').slice(0, 5000);

    if (!name || !email || !message) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: 'Please provide a valid email.' }, { status: 400 });
    }

    if (resendApiKey && SEND_TO) {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: 'Portfolio <onboarding@resend.dev>',
        to: [SEND_TO],
        subject: `New portfolio message from ${name}`,
        reply_to: email,
        text: message,
      });
      return NextResponse.json({ message: 'Message sent! Thanks for reaching out.' }, { status: 200 });
    }

    // Fallback: pretend success so UX flows; log to server
    console.log('[contact] Missing email envs; logging only:', { name, email, message: message.slice(0, 200) + '?' });
    return NextResponse.json({ message: 'Message received. (Email not configured.)' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Unexpected error.' }, { status: 500 });
  }
}
