/**
 * Vercel Serverless Function: Enquiry Form Handler
 * 
 * This is a standalone serverless function (NOT an Express wrapper).
 * It handles POST requests to /api/enquiry
 */

import { Resend } from 'resend';

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[a-zA-Z\s\-']{2,100}$/;
const PHONE_REGEX = /^[\+]?[0-9\s\-\(\)]{3,20}$/;

/**
 * Validate form data
 */
function validateFormData(data) {
  const errors = [];
  
  // Validate name
  if (!data.name || !NAME_REGEX.test(data.name.trim())) {
    errors.push({ field: 'name', message: 'Name must be 2-100 characters and contain only letters, spaces, hyphens, and apostrophes' });
  }
  
  // Validate email
  if (!data.email || !EMAIL_REGEX.test(data.email.trim())) {
    errors.push({ field: 'email', message: 'Please provide a valid email address' });
  }
  
  // Validate phone
  if (!data.phone || !PHONE_REGEX.test(data.phone.trim())) {
    errors.push({ field: 'phone', message: 'Please provide a valid phone number' });
  }
  
  // Validate postcode
  if (!data.postcode || data.postcode.trim().length < 3 || data.postcode.trim().length > 10) {
    errors.push({ field: 'postcode', message: 'Please provide a valid postcode' });
  }
  
  // Validate bedrooms
  if (!data.bedrooms || !['2', '3', '4'].includes(data.bedrooms)) {
    errors.push({ field: 'bedrooms', message: 'Please select a valid residence preference' });
  }
  
  // Validate message (optional)
  if (data.message && data.message.length > 1000) {
    errors.push({ field: 'message', message: 'Message cannot exceed 1000 characters' });
  }
  
  return errors;
}

/**
 * Send email via Resend
 */
async function sendEmail(formData) {
  const { name, email, phone, postcode, bedrooms, message } = formData;
  
  const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background-color: #7F8A77; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #7F8A77; }
        .value { margin-top: 5px; }
        .footer { background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>New Enquiry - Ayana</h1>
      </div>
      <div class="content">
        <div class="field">
          <div class="label">Name:</div>
          <div class="value">${name}</div>
        </div>
        <div class="field">
          <div class="label">Email:</div>
          <div class="value">${email}</div>
        </div>
        <div class="field">
          <div class="label">Phone:</div>
          <div class="value">${phone}</div>
        </div>
        <div class="field">
          <div class="label">Postcode:</div>
          <div class="value">${postcode}</div>
        </div>
        <div class="field">
          <div class="label">Residence Preference:</div>
          <div class="value">${bedrooms}-bedroom</div>
        </div>
        ${message ? `
        <div class="field">
          <div class="label">Message:</div>
          <div class="value">${message}</div>
        </div>
        ` : ''}
        <div class="field">
          <div class="label">Submitted:</div>
          <div class="value">${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}</div>
        </div>
      </div>
      <div class="footer">
        This enquiry was submitted through the Ayana website enquiry form.
      </div>
    </body>
    </html>
  `;

  const emailText = `
New Enquiry - Ayana

Name: ${name}
Email: ${email}
Phone: ${phone}
Postcode: ${postcode}
Residence Preference: ${bedrooms}-bedroom
${message ? `Message: ${message}\n` : ''}
Submitted: ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}

This enquiry was submitted through the Ayana website enquiry form.
  `;

  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM || 'hello@ayanawestend.com.au',
    to: process.env.EMAIL_TO || 'ed@zengroup.com.au',
    subject: `New Ayana Enquiry - ${name}`,
    text: emailText,
    html: emailHTML,
    reply_to: email
  });

  if (error) {
    console.error('❌ Resend email error:', error);
    throw new Error(`Email failed: ${error.message}`);
  }

  console.log('✅ Email sent successfully:', data);
  return data;
}

/**
 * Main serverless function handler
 */
export default async function handler(req, res) {
  console.log('\n🔥 NEW ENQUIRY SUBMISSION RECEIVED 🔥');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    console.log('❌ Method not allowed:', req.method);
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    // Parse body if needed (Vercel handles this automatically)
    const formData = req.body;
    
    console.log('📋 Form data received:', JSON.stringify(formData, null, 2));
    
    // Validate form data
    const validationErrors = validateFormData(formData);
    if (validationErrors.length > 0) {
      console.log('❌ Validation errors:', validationErrors);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }
    
    console.log('✅ Validation passed');
    
    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY not configured');
      return res.status(500).json({
        success: false,
        message: 'Email service not configured'
      });
    }
    
    // Send email
    console.log('📤 Sending email...');
    await sendEmail(formData);
    
    console.log('🎉 Enquiry processed successfully');
    return res.status(200).json({
      success: true,
      message: 'Enquiry submitted successfully'
    });
    
  } catch (error) {
    console.error('💥 ERROR processing enquiry:', error);
    console.error('Error stack:', error.stack);
    
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
