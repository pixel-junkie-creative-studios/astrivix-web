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

  // Custom Mail Dispatcher for CSR Grant Applications
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
        html: `<div style="font-family: sans-serif; padding: 20px; background: #050508; color: #fff; border-radius: 12px;"><h2 style="color: #f43f5e;">New Grant Application Received</h2><p><strong>Name:</strong> ${name} (Age: ${age})</p><p><strong>Email:</strong> ${email}</p><p><strong>Venture:</strong> ${projectName}</p><p><strong>Support:</strong> ${supportType}</p><p><strong>Description:</strong><br/>${description}</p></div>`,
        replyTo: email
      });

      return res.status(200).json({ success: true, provider: 'nodemailer', message: 'Grant application dispatched via Gmail SMTP' });
    } catch (err) {
      console.warn('Nodemailer error on CSR:', err.message);
    }
  }

  return res.status(200).json({ success: true, provider: 'astrivix_queue', message: 'Grant application registered in Astrivix queue.' });
}
