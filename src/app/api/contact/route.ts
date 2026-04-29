import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { CONTACT_SENSITIVE } from '@/lib/contactSensitive';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Verified sender in Resend (defaults to Resend test sender). Override via env in production. */
const RESEND_FROM =
  process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json(
        { error: 'Email service is not configured.' },
        { status: 503 },
      );
    }

    const resend = new Resend(apiKey);

    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const toEmail = CONTACT_SENSITIVE.email;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: RESEND_FROM,
      to: [toEmail],
      subject: 'AI Consulting Inquiry',
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">
            New AI Consulting Inquiry
          </h2>
          
          <div style="margin: 20px 0;">
            <p><strong>Name:</strong> ${escapeHtml(String(name))}</p>
            <p><strong>Email:</strong> ${escapeHtml(String(email))}</p>
          </div>
          
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(String(message)).replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 15px; margin-top: 20px;">
            <p style="color: #666; font-size: 12px;">
              Sent from: ${request.headers.get('origin') || 'Unknown'}<br>
              Date: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! I will get back to you soon.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
