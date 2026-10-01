import nodemailer from 'nodemailer';

export async function onRequestPost(context) {
  const { request } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  try {
    const rawBody = await request.json().catch(() => ({}));
    const name = rawBody.name || '';
    const email = rawBody.email || '';
    const countryCode = rawBody.countryCode || '+91';
    const phone = rawBody.phone || '';
    const currency = rawBody.currency || 'USD';
    const currencySymbol = rawBody.currencySymbol || '$';
    const budget = rawBody.budget || '5000';
    const message = rawBody.message || '';
    const website_hp = rawBody.website_hp;

    // Honeypot Protection
    if (website_hp) {
      return new Response(JSON.stringify({ success: true, message: 'Processed' }), {
        status: 200,
        headers: corsHeaders
      });
    }

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: corsHeaders
      });
    }

    const fullPhone = phone ? `${countryCode} ${phone}` : 'Not Provided';
    const inquiryRef = `AST-${Date.now().toString().slice(-6)}`;
    const formattedBudget = `${currencySymbol}${budget} ${currency}`;

    // Configure Direct Gmail SMTP Transporter (Using pixeljunkiestudios.in@gmail.com with App Password)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'pixeljunkiestudios.in@gmail.com',
        pass: 'zmrm yuff wzwx bpkp'
      }
    });

    // 1. Email Template for business@astrivix.in (Admin Notification + 1-Click Mailto Confirmation)
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #1e293b; border-radius: 12px; overflow: hidden; background-color: #050508; color: #ffffff;">
        <div style="background-color: #0284c7; padding: 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 1px;">🚀 NEW PROJECT BRIEF RECEIVED</h1>
          <p style="color: #e0f2fe; margin: 6px 0 0 0; font-size: 13px; font-family: monospace;">Ref ID: ${inquiryRef}</p>
        </div>
        
        <div style="padding: 28px; background-color: #0b0b10;">
          <h3 style="color: #38bdf8; margin-top: 0; font-size: 15px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;">Client Information</h3>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
            <tr><td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.08); color: #94a3b8; width: 35%;"><strong>Client Name</strong></td><td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.08); color: #ffffff; font-weight: bold;">${name}</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.08); color: #94a3b8;"><strong>Email Address</strong></td><td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.08); color: #38bdf8;"><a href="mailto:${email}" style="color: #38bdf8;">${email}</a></td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.08); color: #94a3b8;"><strong>Mobile Phone</strong></td><td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.08); color: #ffffff;">${fullPhone}</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.08); color: #94a3b8;"><strong>Estimated Budget</strong></td><td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.08); color: #10b981; font-weight: bold;">${formattedBudget}</td></tr>
          </table>

          <div style="margin-top: 24px; background: #050508; padding: 18px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
            <p style="margin: 0 0 6px 0; font-size: 11px; color: #94a3b8; font-family: monospace;">PROJECT BRIEF / REQUIREMENTS:</p>
            <p style="margin: 0; color: #f4f4f5; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${message}</p>
          </div>

          <!-- 1-Click Mailto Confirmation Link (D4 Residency Style) -->
          <div style="margin-top: 32px; text-align: center;">
            <p style="color: #94a3b8; font-size: 12px; margin-bottom: 14px;">Click below to launch an instant confirmation draft back to ${name}:</p>
            <a href="mailto:${email}?subject=Project%20Inquiry%20Received%20-%20Astrivix%20Corp%20[${inquiryRef}]&body=Hello%20${encodeURIComponent(name)},%0A%0AThank%20you%20for%20reaching%20out%20to%20Astrivix%20Corp.%20We%20have%20reviewed%20your%20project%20brief%20for%20${encodeURIComponent(formattedBudget)}%20and%20are%20excited%20to%20partner%20with%20you.%0A%0AWe%20would%20like%20to%20schedule%20a%20brief%20strategy%20call.%20Please%20let%20us%20know%20your%20preferred%20time.%0A%0ABest%20regards,%0AAstrivix%20Corp%20Team%0Ahttps://www.astrivix.in" style="display: inline-block; background-color: #0284c7; color: #ffffff; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 8px; font-size: 13px;">
              ✉️ Send Confirmation Email to Client (${name})
            </a>
          </div>
        </div>
      </div>
    `;

    // 2. Email Template for Client / Customer (High-Converting Premium UI/UX Auto-Responder Receipt)
    const encodedWaMessage = encodeURIComponent(
      `Hello Astrivix Team,\n\nI just submitted a project brief on your website.\n\n*Reference ID:* ${inquiryRef}\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${fullPhone}\n*Budget:* ${formattedBudget}\n*Project Requirements:* ${message}\n\nI would like to discuss my project directly with your engineering lead.`
    );

    const clientEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #1e293b; border-radius: 14px; overflow: hidden; background-color: #050508; color: #ffffff;">
        <!-- Header Banner -->
        <div style="background-color: #0284c7; padding: 26px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">🚀 PROJECT BRIEF CONFIRMED</h1>
          <p style="color: #e0f2fe; margin: 6px 0 0 0; font-size: 13px; font-family: monospace;">Ref ID: ${inquiryRef}</p>
        </div>

        <div style="padding: 28px; background-color: #0b0b10;">
          <p style="font-size: 15px; color: #ffffff; margin-top: 0;">Hello <strong>${name}</strong>,</p>
          <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6; margin-bottom: 20px;">
            Thank you for reaching out to <strong>Astrivix Corp</strong>. We have logged your project inquiry under Reference ID <strong style="color: #38bdf8;">${inquiryRef}</strong>. Below is the complete summary of your submission:
          </p>

          <!-- Client Submission Details Table -->
          <h3 style="color: #38bdf8; margin-top: 24px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;">Your Submission Details</h3>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 14px;">
            <tr><td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.08); color: #94a3b8; width: 35%;"><strong>Client Name</strong></td><td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.08); color: #ffffff; font-weight: bold;">${name}</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.08); color: #94a3b8;"><strong>Email Address</strong></td><td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.08); color: #38bdf8;">${email}</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.08); color: #94a3b8;"><strong>Mobile Phone</strong></td><td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.08); color: #ffffff;">${fullPhone}</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.08); color: #94a3b8;"><strong>Estimated Budget</strong></td><td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.08); color: #10b981; font-weight: bold;">${formattedBudget}</td></tr>
          </table>

          <div style="margin-top: 20px; background: #050508; padding: 18px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
            <p style="margin: 0 0 6px 0; font-size: 11px; color: #94a3b8; font-family: monospace;">YOUR PROJECT BRIEF / REQUIREMENTS:</p>
            <p style="margin: 0; color: #f4f4f5; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${message}</p>
          </div>

          <!-- Direct WhatsApp DMs Button with Pre-filled Message -->
          <div style="margin-top: 32px; text-align: center; background: rgba(37, 211, 102, 0.05); padding: 22px; border-radius: 12px; border: 1px solid rgba(37, 211, 102, 0.2);">
            <p style="color: #ffffff; font-size: 14px; font-weight: bold; margin: 0 0 6px 0;">Want to connect directly with our engineering team right now?</p>
            <p style="color: #94a3b8; font-size: 12px; margin: 0 0 16px 0;">Click below to send all your project details directly into our WhatsApp DMs:</p>
            
            <a href="https://wa.me/917736387794?text=${encodedWaMessage}" style="display: inline-block; background-color: #25D366; color: #ffffff; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 8px; font-size: 14px; shadow: 0 4px 12px rgba(37, 211, 102, 0.4);">
              💬 Chat Directly on WhatsApp with Astrivix Lead
            </a>
          </div>
        </div>

        <div style="background-color: #050508; padding: 20px; text-align: center; border-top: 1px solid rgba(255,255,255,0.1); font-size: 11px; color: #64748b;">
          © ${new Date().getFullYear()} Astrivix Corp. Official Website: <a href="https://www.astrivix.in" style="color: #38bdf8; text-decoration: none;">www.astrivix.in</a> | Email: <a href="mailto:business@astrivix.in" style="color: #38bdf8; text-decoration: none;">business@astrivix.in</a>
        </div>
      </div>
    `;

    // 1. Send Notification to business@astrivix.in & pixeljunkiestudios.in@gmail.com
    await transporter.sendMail({
      from: '"Astrivix Web Portal" <business@astrivix.in>',
      to: 'business@astrivix.in, pixeljunkiestudios.in@gmail.com',
      replyTo: email,
      subject: `🚀 New Project Brief [Ref: ${inquiryRef}]: ${name} (${formattedBudget})`,
      html: adminEmailHtml
    });

    // 2. Send Auto-Responder Receipt to Client
    await transporter.sendMail({
      from: '"Astrivix Corp" <business@astrivix.in>',
      to: email,
      replyTo: 'business@astrivix.in',
      subject: `Inquiry Received [Ref: ${inquiryRef}] - Astrivix Corp`,
      html: clientEmailHtml
    });

    return new Response(JSON.stringify({ 
      success: true, 
      inquiryRef,
      message: 'Inquiry dispatched to business@astrivix.in and customer receipt sent' 
    }), {
      status: 200,
      headers: corsHeaders
    });
  } catch (err) {
    console.error("Nodemailer SMTP dispatch error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
