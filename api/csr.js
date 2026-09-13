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

  const { name, age, email, projectName, supportType, description } = req.body || {};

  if (!name || !email || !projectName || !description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const gmailUser = process.env.GMAIL_USER || 'business@astrivix.in';
  const gmailPass = process.env.GMAIL_APP_PASSWORD || 'jbfqvyqsbabbgrlv';

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailPass.replace(/\s+/g, '')
    }
  });

  const studioHtml = `
    <div style="background-color: #050508; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 32px; max-width: 600px; margin: 0 auto; border-radius: 16px; border: 1px solid rgba(255,255,255,0.15);">
      <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px; margin-bottom: 24px;">
        <span style="font-family: monospace; font-size: 11px; color: #f43f5e; letter-spacing: 2px; text-transform: uppercase;">ASTRIVIX FOUNDERS GRANT APPLICATION</span>
        <h1 style="font-size: 24px; font-weight: 800; margin: 8px 0 0 0; color: #ffffff;">New Grant Application: ${projectName}</h1>
      </div>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px; font-family: monospace; font-size: 12px; color: rgba(255,255,255,0.5); border-bottom: 1px solid rgba(255,255,255,0.08);">APPLICANT NAME</td>
          <td style="padding: 12px; font-size: 14px; font-weight: 700; color: #ffffff; border-bottom: 1px solid rgba(255,255,255,0.08);">${name} (Age/Status: ${age})</td>
        </tr>
        <tr>
          <td style="padding: 12px; font-family: monospace; font-size: 12px; color: rgba(255,255,255,0.5); border-bottom: 1px solid rgba(255,255,255,0.08);">EMAIL ADDRESS</td>
          <td style="padding: 12px; font-size: 14px; font-weight: 700; color: #38bdf8; border-bottom: 1px solid rgba(255,255,255,0.08);"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 12px; font-family: monospace; font-size: 12px; color: rgba(255,255,255,0.5); border-bottom: 1px solid rgba(255,255,255,0.08);">VENTURE NAME</td>
          <td style="padding: 12px; font-size: 14px; font-weight: 800; color: #fbbf24; border-bottom: 1px solid rgba(255,255,255,0.08);">${projectName}</td>
        </tr>
        <tr>
          <td style="padding: 12px; font-family: monospace; font-size: 12px; color: rgba(255,255,255,0.5); border-bottom: 1px solid rgba(255,255,255,0.08);">REQUESTED SUPPORT</td>
          <td style="padding: 12px; font-size: 14px; font-weight: 700; color: #34d399; border-bottom: 1px solid rgba(255,255,255,0.08);">${supportType}</td>
        </tr>
      </table>
      <div style="margin-top: 24px; background-color: #0e0e16; padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
        <span style="font-family: monospace; font-size: 10px; color: rgba(255,255,255,0.4); letter-spacing: 1.5px; display: block; margin-bottom: 8px;">VENTURE OVERVIEW & GOALS</span>
        <p style="font-size: 14px; line-height: 1.6; color: rgba(255,255,255,0.9); white-space: pre-wrap; margin: 0;">${description}</p>
      </div>
    </div>
  `;

  const clientHtml = `
    <div style="background-color: #050508; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 32px; max-width: 600px; margin: 0 auto; border-radius: 16px; border: 1px solid rgba(255,255,255,0.15);">
      <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px; margin-bottom: 24px; text-align: center;">
        <h1 style="font-size: 24px; font-weight: 300; letter-spacing: 4px; text-transform: uppercase; margin: 0; color: #ffffff;">ASTRIVIX FOUNDERS GRANT</h1>
        <span style="font-family: monospace; font-size: 10px; color: #f43f5e; letter-spacing: 2px; text-transform: uppercase; display: block; margin-top: 6px;">APPLICATION CONFIRMATION</span>
      </div>
      <h2 style="font-size: 20px; font-weight: 700; color: #ffffff; margin-bottom: 12px;">Grant Application Received: ${projectName}</h2>
      <p style="font-size: 14px; line-height: 1.7; color: rgba(255,255,255,0.8); margin-bottom: 20px;">
        Thank you for applying to the Astrivix Founders Grant, ${name}. Our partner team is evaluating your venture blueprint and will get back to you via email within <strong style="color: #ffffff;">24 hours</strong>.
      </p>
      <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px; text-align: center; font-family: monospace; font-size: 10px; color: rgba(255,255,255,0.4);">
        ASTRIVIX CORP — PRO-BONO FOUNDERS INITIATIVE<br />
        <a href="https://www.astrivix.in" style="color: rgba(255,255,255,0.6); text-decoration: none;">www.astrivix.in</a> | business@astrivix.in
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Astrivix Grant Engine" <${gmailUser}>`,
      to: 'business@astrivix.in',
      subject: `🏆 Astrivix Founders Grant Application: ${projectName} (${name})`,
      html: studioHtml,
      replyTo: email
    });

    await transporter.sendMail({
      from: `"Astrivix Founders Grant" <${gmailUser}>`,
      to: email,
      subject: `Astrivix Founders Grant Application Dispatched (${projectName})`,
      html: clientHtml,
      replyTo: 'business@astrivix.in'
    });

    return res.status(200).json({ success: true, message: 'Grant emails dispatched successfully' });
  } catch (error) {
    console.error('Error sending grant emails via Nodemailer:', error);
    return res.status(500).json({ error: 'Failed to send grant emails', details: error.message });
  }
}
