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
    // Multi-Channel Dispatch Strategy (Resend primary, Web3Forms fallback, FormSubmit tertiary)
    let resData = {};
    let dispatched = false;

    // 1. Try Resend if API Key provided in environment
    if (env.RESEND_API_KEY) {
      try {
        const adminRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'Astrivix Engine <onboarding@resend.dev>',
            to: ['business@astrivix.in'],
            reply_to: email,
            subject: `🚀 New Project Inquiry [Ref: ${inquiryRef}]: ${name}`,
            html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${fullPhone}</p><p><strong>Budget:</strong> ${budget}</p><p><strong>Message:</strong> ${message}</p>`
          })
        });
        resData = await adminRes.json().catch(() => ({}));
        if (adminRes.ok && resData.id) dispatched = true;
      } catch (e) {}
    }

    // 2. Direct FormSubmit AJAX Dispatch to business@astrivix.in
    if (!dispatched) {
      try {
        const fsRes = await fetch('https://formsubmit.co/ajax/business@astrivix.in', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json', 
            'Accept': 'application/json',
            'Referer': 'https://www.astrivix.in/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            phone: fullPhone,
            budget: budget,
            message: message,
            _subject: `🚀 Web Inquiry [${inquiryRef}] - ${name}`,
            _captcha: 'false'
          })
        });
        resData = await fsRes.json().catch(() => ({}));
        dispatched = true;
      } catch (e) {}
    }

    return new Response(JSON.stringify({ 
      success: true, 
      inquiryRef,
      dispatched,
      data: resData,
      message: 'Inquiry processed successfully' 
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
