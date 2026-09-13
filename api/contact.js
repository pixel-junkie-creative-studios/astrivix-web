import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS headers
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

  const gmailUser = process.env.GMAIL_USER || 'business@astrivix.in';
  const gmailPass = process.env.GMAIL_APP_PASSWORD || 'jbfqvyqsbabbgrlv';

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailPass.replace(/\s+/g, '') // remove spaces from 16-char app pass
    }
  });

  const studioHtml = `
    <div style="background-color: #050508; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 32px; max-width: 600px; margin: 0 auto; border-radius: 16px; border: 1px solid rgba(255,255,255,0.15);">
      <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px; margin-bottom: 24px;">
        <span style="font-family: monospace; font-size: 11px; color: #34d399; letter-spacing: 2px; text-transform: uppercase;">ASTRIVIX STUDIO ALERT</span>
        <h1 style="font-size: 24px; font-weight: 800; margin: 8px 0 0 0; color: #ffffff;">New Project Inquiry Dispatched</h1>
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-between: 16px;">
        <tr>
          <td style="padding: 12px; font-family: monospace; font-size: 12px; color: rgba(255,255,255,0.5); border-bottom: 1px solid rgba(255,255,255,0.08);">CLIENT NAME</td>
          <td style="padding: 12px; font-size: 14px; font-weight: 700; color: #ffffff; border-bottom: 1px solid rgba(255,255,255,0.08);">${name}</td>
        </tr>
        <tr>
          <td style="padding: 12px; font-family: monospace; font-size: 12px; color: rgba(255,255,255,0.5); border-bottom: 1px solid rgba(255,255,255,0.08);">CLIENT EMAIL</td>
          <td style="padding: 12px; font-size: 14px; font-weight: 700; color: #38bdf8; border-bottom: 1px solid rgba(255,255,255,0.08);"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 12px; font-family: monospace; font-size: 12px; color: rgba(255,255,255,0.5); border-bottom: 1px solid rgba(255,255,255,0.08);">ESTIMATED BUDGET</td>
          <td style="padding: 12px; font-size: 14px; font-weight: 800; color: #a855f7; border-bottom: 1px solid rgba(255,255,255,0.08);">${budget || '$5000'}</td>
        </tr>
      </table>
      <div style="margin-top: 24px; background-color: #0e0e16; padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
        <span style="font-family: monospace; font-size: 10px; color: rgba(255,255,255,0.4); letter-spacing: 1.5px; display: block; margin-bottom: 8px;">PROJECT BRIEF & REQUIREMENTS</span>
        <p style="font-size: 14px; line-height: 1.6; color: rgba(255,255,255,0.9); white-space: pre-wrap; margin: 0;">${message}</p>
      </div>
      <div style="margin-top: 24px; text-align: center; font-family: monospace; font-size: 10px; color: rgba(255,255,255,0.3);">
        ASTRIVIX CORP ARCHITECTURE SYSTEM | DEPLOYED FROM WEBSITE INQUIRY ENGINE
      </div>
    </div>
  `;

  const clientHtml = `
    <div style="background-color: #050508; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 32px; max-width: 600px; margin: 0 auto; border-radius: 16px; border: 1px solid rgba(255,255,255,0.15);">
      <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px; margin-bottom: 24px; text-align: center;">
        <h1 style="font-size: 26px; font-weight: 300; letter-spacing: 4px; text-transform: uppercase; margin: 0; color: #ffffff;">ASTRIVIX CORP</h1>
        <span style="font-family: monospace; font-size: 10px; color: #34d399; letter-spacing: 2px; text-transform: uppercase; display: block; margin-top: 6px;">INQUIRY CONFIRMATION</span>
      </div>
      <h2 style="font-size: 20px; font-weight: 700; color: #ffffff; margin-bottom: 12px;">Thank you for contacting Astrivix, ${name}.</h2>
      <p style="font-size: 14px; line-height: 1.7; color: rgba(255,255,255,0.8); margin-bottom: 20px;">
        We have received your project inquiry (${budget || 'USD'}). Our partner team is currently evaluating your technical requirements and will get back to you with a statement of work within <strong style="color: #ffffff;">2 hours</strong>.
      </p>
      <div style="background-color: #0e0e16; padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 24px;">
        <span style="font-family: monospace; font-size: 10px; color: rgba(255,255,255,0.4); letter-spacing: 1.5px; display: block; margin-bottom: 8px;">NEED IMMEDIATE DISPATCH?</span>
        <p style="font-size: 13px; color: rgba(255,255,255,0.7); margin: 0 0 12px 0;">
          You can also connect directly with our engineering lead on WhatsApp for instant technical discussion.
        </p>
        <a href="https://wa.me/917736387794?text=Hi%20Astrivix!%20My%20name%20is%20${encodeURIComponent(name)}" style="display: inline-block; background-color: #25D366; color: #000000; font-family: monospace; font-size: 11px; font-weight: 800; padding: 10px 18px; border-radius: 99px; text-decoration: none; letter-spacing: 1.5px; text-transform: uppercase;">CHAT ON WHATSAPP</a>
      </div>
      <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px; text-align: center; font-family: monospace; font-size: 10px; color: rgba(255,255,255,0.4);">
        ASTRIVIX CORP — ENGINEERING DIGITAL PERFECTION<br />
        <a href="https://www.astrivix.in" style="color: rgba(255,255,255,0.6); text-decoration: none;">www.astrivix.in</a> | business@astrivix.in
      </div>
    </div>
  `;

  try {
    // Send email to Studio (business@astrivix.in)
    await transporter.sendMail({
      from: `"Astrivix Engine" <${gmailUser}>`,
      to: 'business@astrivix.in',
      subject: `🚀 New Project Inquiry: ${name} (${budget || 'USD'})`,
      html: studioHtml,
      replyTo: email
    });

    // Send automated email reply to Client
    await transporter.sendMail({
      from: `"Astrivix Corp" <${gmailUser}>`,
      to: email,
      subject: `Astrivix Corp — Project Inquiry Received (${name})`,
      html: clientHtml,
      replyTo: 'business@astrivix.in'
    });

    return res.status(200).json({ success: true, message: 'Emails dispatched successfully' });
  } catch (error) {
    console.error('Error sending emails via Nodemailer:', error);
    return res.status(500).json({ error: 'Failed to send emails', details: error.message });
  }
}
