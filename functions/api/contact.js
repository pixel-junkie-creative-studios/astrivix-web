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

    // 2. Email Template for Client / Customer (Auto-Responder Receipt)
    const clientEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #1e293b; border-radius: 12px; overflow: hidden; background-color: #050508; color: #ffffff;">
        <div style="background-color: #050508; padding: 28px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1);">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px;">ASTRIVIX CORP</h1>
          <p style="color: #38bdf8; margin: 6px 0 0 0; font-size: 13px; font-family: monospace;">INQUIRY CONFIRMATION [REF: ${inquiryRef}]</p>
        </div>

        <div style="padding: 32px; background-color: #0b0b10;">
          <p style="font-size: 15px; color: #e4e4e7; line-height: 1.6;">Hello <strong>${name}</strong>,</p>
          <p style="font-size: 14px; color: #a1a1aa; line-height: 1.6;">We have successfully received your project request under Reference ID <strong style="color: #38bdf8;">${inquiryRef}</strong>. Our direct team is reviewing your requirements and will reach out shortly.</p>

          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 20px; border-radius: 10px; margin: 24px 0;">
            <h4 style="margin: 0 0 10px 0; font-size: 12px; color: #94a3b8; text-transform: uppercase;">Submission Summary</h4>
            <p style="margin: 4px 0; font-size: 13px; color: #cbd5e1;"><strong>Scope / Budget:</strong> ${formattedBudget}</p>
            <p style="margin: 4px 0; font-size: 13px; color: #cbd5e1;"><strong>Contact Phone:</strong> ${fullPhone}</p>
          </div>

          <div style="text-align: center; margin: 32px 0 16px 0;">
            <p style="font-size: 13px; color: #94a3b8; margin-bottom: 16px;">Need urgent assistance or want to talk right away?</p>
            
            <a href="https://wa.me/917736387794?text=Hi%20Astrivix%20Team%20(Ref:%20${inquiryRef})" style="display: inline-block; background: #25D366; color: #ffffff; font-weight: bold; font-size: 13px; text-decoration: none; padding: 12px 24px; border-radius: 8px; margin: 6px;">
              💬 WhatsApp Direct
            </a>
            
            <a href="mailto:business@astrivix.in?subject=Direct%20Follow-up%20[${inquiryRef}]" style="display: inline-block; background: #0284c7; color: #ffffff; font-weight: bold; font-size: 13px; text-decoration: none; padding: 12px 24px; border-radius: 8px; margin: 6px;">
              ✉️ Reply via Email
            </a>
          </div>
        </div>

        <div style="background-color: #050508; padding: 20px; text-align: center; border-top: 1px solid rgba(255,255,255,0.1); font-size: 11px; color: #64748b;">
          © ${new Date().getFullYear()} Astrivix Corp. Official Email: business@astrivix.in
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
