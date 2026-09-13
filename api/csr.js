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

  // 1. Try Nodemailer if GMAIL_APP_PASSWORD environment variable is present
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
        from: `"Astrivix Grant Engine" <${process.env.GMAIL_USER || 'business@astrivix.in'}>`,
        to: 'business@astrivix.in',
        subject: `🏆 Astrivix Founders Grant Application: ${projectName} (${name})`,
        html: `<p><strong>Name:</strong> ${name} (Age: ${age})</p><p><strong>Email:</strong> ${email}</p><p><strong>Venture:</strong> ${projectName}</p><p><strong>Support:</strong> ${supportType}</p><p><strong>Description:</strong><br/>${description}</p>`,
        replyTo: email
      });

      return res.status(200).json({ success: true, provider: 'nodemailer', message: 'Grant application dispatched' });
    } catch (err) {
      console.warn('Nodemailer error on CSR, switching to FormSubmit engine:', err.message);
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
        age,
        email,
        projectName,
        supportType,
        description,
        _subject: `🏆 Astrivix Founders Grant Application: ${projectName} (${name})`,
        _template: "table",
        _captcha: "false"
      })
    });

    const fsData = await fsRes.json();
    if (fsRes.ok && (fsData.success === "true" || fsData.success === true)) {
      return res.status(200).json({ success: true, provider: 'formsubmit', message: 'Grant application dispatched successfully via FormSubmit engine' });
    } else {
      throw new Error(fsData.message || 'FormSubmit request failed');
    }
  } catch (fsErr) {
    console.error('CSR FormSubmit engine error:', fsErr);
    return res.status(500).json({ error: 'Failed to dispatch grant application', details: fsErr.message });
  }
}
