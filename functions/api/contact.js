export async function onRequestPost(context) {
  const { request, env } = context;

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
    const budget = rawBody.budget || 'USD';
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
    // 1. Send Inquiry Notification to business@astrivix.in
    const adminRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env?.RESEND_API_KEY || ''}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Astrivix Web Portal <onboarding@resend.dev>',
        to: ['business@astrivix.in'],
        reply_to: email,
        subject: `🚀 New Project Brief [Ref: ${inquiryRef}]: ${name} (${budget})`,
        html: `
          <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #050508; color: #ffffff; padding: 32px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #ffffff; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px;">NEW PROJECT BRIEF</h2>
            <p><strong>Ref ID:</strong> <span style="color: #38bdf8;">${inquiryRef}</span></p>
            <p><strong>Client Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${fullPhone}</p>
            <p><strong>Budget:</strong> ${budget}</p>
            <div style="background: #0e0e16; padding: 16px; border-radius: 8px; margin-top: 16px;">
              <p style="margin: 0; color: #e4e4e7; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
        `
      })
    });
    const adminData = await adminRes.json().catch(() => ({}));

    // 2. Send Automatic Receipt Email to Customer's Email Address
    const clientRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env?.RESEND_API_KEY || ''}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Astrivix Corp <onboarding@resend.dev>',
        to: [email],
        subject: `Inquiry Received [Ref: ${inquiryRef}] - Astrivix Corp`,
        html: `
          <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #050508; color: #ffffff; padding: 32px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
            <div style="text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 24px;">
              <h1 style="margin: 0; font-size: 24px; color: #ffffff; letter-spacing: 2px;">ASTRIVIX CORP</h1>
              <p style="margin: 6px 0 0 0; font-size: 13px; color: #38bdf8; font-family: monospace;">INQUIRY CONFIRMATION</p>
            </div>

            <p style="font-size: 15px; color: #e4e4e7; line-height: 1.6;">Hello <strong>${name}</strong>,</p>
            <p style="font-size: 14px; color: #a1a1aa; line-height: 1.6;">Thank you for reaching out to Astrivix Corp. We have logged your request under Reference ID <strong style="color: #38bdf8;">${inquiryRef}</strong>. Our direct team will review your requirements and reach out shortly.</p>

            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 20px; border-radius: 12px; margin: 24px 0;">
              <h3 style="margin: 0 0 12px 0; font-size: 13px; color: #94a3b8; text-transform: uppercase;">Submission Summary</h3>
              <p style="margin: 4px 0; font-size: 13px; color: #cbd5e1;"><strong>Scope / Budget:</strong> ${budget}</p>
              <p style="margin: 4px 0; font-size: 13px; color: #cbd5e1;"><strong>Contact Phone:</strong> ${fullPhone}</p>
            </div>

            <div style="text-align: center; margin: 32px 0 24px 0;">
              <p style="font-size: 13px; color: #94a3b8; margin-bottom: 16px;">Need urgent assistance or want to talk right away?</p>
              
              <a href="https://wa.me/917736387794?text=Hi%20Astrivix%20Team%20(Ref:%20${inquiryRef})" style="display: inline-block; background: #25D366; color: #ffffff; font-weight: 600; font-size: 14px; text-decoration: none; padding: 12px 24px; border-radius: 8px; margin: 6px;">
                💬 WhatsApp Direct
              </a>
              
              <a href="mailto:business@astrivix.in?subject=Direct%20Follow-up%20[${inquiryRef}]" style="display: inline-block; background: #0284c7; color: #ffffff; font-weight: 600; font-size: 14px; text-decoration: none; padding: 12px 24px; border-radius: 8px; margin: 6px;">
                ✉️ Reply via Email
              </a>
              
              <a href="https://www.astrivix.in" style="display: inline-block; background: rgba(255,255,255,0.1); color: #ffffff; font-weight: 600; font-size: 14px; text-decoration: none; padding: 12px 24px; border-radius: 8px; margin: 6px;">
                🌐 Visit Website
              </a>
            </div>

            <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px; margin-top: 32px; font-size: 11px; color: #71717a; text-align: center;">
              Astrivix Corp. All Rights Reserved.<br/>
              Official Email: business@astrivix.in
            </div>
          </div>
        `
      })
    });
    const clientData = await clientRes.json().catch(() => ({}));

    return new Response(JSON.stringify({ 
      success: true, 
      inquiryRef,
      adminData,
      clientData,
      message: 'Inquiry and customer confirmation dispatched successfully' 
    }), {
      status: 200,
      headers: corsHeaders
    });
  } catch (err) {
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
