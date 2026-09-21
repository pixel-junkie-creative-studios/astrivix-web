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
    // Send Inquiry to business@astrivix.in & Auto-Response to Customer
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
        _subject: `🚀 New Project Brief [Ref: ${inquiryRef}]: ${name} (${budget})`,
        _autoresponse: `Hello ${name},\n\nThank you for reaching out to Astrivix Corp. We have logged your request under Reference ID ${inquiryRef}.\n\nOur team is reviewing your requirements and will reach out with a detailed roadmap shortly.\n\nNeed urgent assistance?\n• Email: business@astrivix.in\n• Website: https://www.astrivix.in\n\nAstrivix Corp. All Rights Reserved.`,
        _captcha: 'false'
      })
    });

    const resData = await fsRes.json().catch(() => ({}));

    return new Response(JSON.stringify({ 
      success: true, 
      inquiryRef,
      data: resData,
      message: 'Inquiry and customer receipt dispatched successfully' 
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
