import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, budget, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields (name, email, message)' });
  }

  // 1. Try Nodemailer if GMAIL_APP_PASSWORD is set in Vercel environment
  if (process.env.GMAIL_APP_PASSWORD) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER || 'business@astrivix.in',
          pass: process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, '')
        }
      });

      await transporter.sendMail({
        from: `"Astrivix Engine" <${process.env.GMAIL_USER || 'business@astrivix.in'}>`,
        to: 'business@astrivix.in',
        subject: `🚀 New Project Inquiry: ${name} (${budget || 'USD'})`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Budget:</strong> ${budget}</p><p><strong>Message:</strong><br/>${message}</p>`,
        replyTo: email
      });

      return res.status(200).json({ success: true, provider: 'nodemailer', message: 'Email dispatched' });
    } catch (err) {
      console.warn('Nodemailer failed, switching to FormSubmit dispatch engine:', err.message);
    }
  }

  // 2. Primary Verified Dispatch: FormSubmit Engine with Domain Referer Header
  try {
    const fsRes = await fetch("https://formsubmit.co/ajax/business@astrivix.in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Referer": "https://www.astrivix.in/"
      },
      body: JSON.stringify({
        name,
        email,
        budget: budget || 'Not Specified',
        message,
        _subject: `🚀 New Project Inquiry: ${name} (${budget || 'USD'})`,
        _template: "table",
        _captcha: "false"
      })
    });

    const fsData = await fsRes.json();
    if (fsRes.ok && (fsData.success === "true" || fsData.success === true)) {
      return res.status(200).json({ success: true, provider: 'formsubmit', message: 'Email dispatched successfully via FormSubmit engine' });
    } else {
      throw new Error(fsData.message || 'FormSubmit request failed');
    }
  } catch (fsErr) {
    console.error('FormSubmit engine error:', fsErr);
    return res.status(500).json({ error: 'Failed to dispatch email', details: fsErr.message });
  }
}
