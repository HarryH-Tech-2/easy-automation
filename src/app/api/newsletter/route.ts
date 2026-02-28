import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    // Send confirmation email to subscriber
    await resend.emails.send({
      from: 'Easy Automation <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to Easy Automation!',
      html: `
        <h2>Thanks for subscribing!</h2>
        <p>You'll now receive weekly automation tips, tool comparisons, and strategies to help you work smarter.</p>
        <p>In the meantime, check out our latest articles at <a href="https://easyautomation.io">easyautomation.io</a>.</p>
        <p>— The Easy Automation Team</p>
      `,
    });

    // Notify site owner of new subscriber
    await resend.emails.send({
      from: 'Easy Automation <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL!,
      subject: `New subscriber: ${email}`,
      html: `<p>New newsletter subscriber: <strong>${email}</strong></p>`,
    });

    return NextResponse.json({ success: true, message: 'Successfully subscribed!' });
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
