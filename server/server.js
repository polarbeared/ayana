import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Resend } from 'resend';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware (disable CSP report-only noise for current setup)
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many enquiry submissions, please try again later.'
});

app.use('/api/', limiter);
app.use(express.json({ limit: '10mb' }));

// Resend
const resend = new Resend(process.env.RESEND_API_KEY);


// Resend email sending function
const sendEmailWithResend = async (mailOptions) => {
  try {
    const { data, error } = await resend.emails.send({
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      text: mailOptions.text,
      html: mailOptions.html,
      reply_to: mailOptions.replyTo
    });
    
    if (error) {
      console.error('❌ Resend email error:', error);
      throw new Error(`Resend email failed: ${error.message}`);
    }
    
    console.log('✅ Resend email sent successfully:', data);
    return data;
  } catch (error) {
    console.error('💥 Resend email sending error:', error);
    throw error;
  }
};

// Validation middleware
const validateEnquiry = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s\-']+$/)
    .withMessage('Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .trim()
    .matches(/^[\+]?[0-9\s\-\(\)]{3,20}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('postcode')
    .trim()
    .isLength({ min: 3, max: 10 })
    .withMessage('Please provide a valid postcode'),
  
  body('bedrooms')
    .trim()
    .isIn(['2', '3', '4'])
    .withMessage('Please select a valid residence preference'),
  
  body('message')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Message cannot exceed 1000 characters')
];

// Enquiry submission endpoint
app.post('/api/enquiry', validateEnquiry, async (req, res) => {
  console.log('\n🔥 NEW ENQUIRY SUBMISSION RECEIVED 🔥');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Request headers:', JSON.stringify(req.headers, null, 2));
  console.log('Request body:', JSON.stringify(req.body, null, 2));
  
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ VALIDATION ERRORS:', JSON.stringify(errors.array(), null, 2));
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    console.log('✅ Validation passed');

    const { name, email, phone, postcode, message, bedrooms } = req.body;
    console.log('📋 Extracted form data:');
    console.log('  Name:', name);
    console.log('  Email:', email);
    console.log('  Phone:', phone);
    console.log('  Postcode:', postcode);
    console.log('  Message:', message);
    console.log('  Bedrooms:', bedrooms);
    
    // Verify Resend API key is configured (non-blocking in local dev)
    console.log('📧 Verifying Resend configuration...');
    const resendConfigured = Boolean(process.env.RESEND_API_KEY);
    if (!resendConfigured) {
      console.warn('⚠️ RESEND_API_KEY not set. Email delivery disabled for this run.');
    } else {
      console.log('✅ Resend configuration verified successfully');
    }

    // Email content
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

    // Send email using Resend
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'hello@ayanawestend.com.au',
      to: process.env.EMAIL_TO || 'ed@zengroup.com.au',
      subject: `New Ayana Enquiry - ${name}`,
      text: emailText,
      html: emailHTML,
      replyTo: email
    };

    console.log('📤 Sending email with Resend...');
    console.log('Email options:', JSON.stringify({
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      replyTo: mailOptions.replyTo
    }, null, 2));
    
    if (resendConfigured) {
      await sendEmailWithResend(mailOptions);
      console.log('✅ Email sent successfully with Resend!');
    } else {
      console.log('📭 Email not sent because RESEND_API_KEY is missing. Payload logged above for review.');
    }
    
    // Log successful submission
    console.log(`🎉 Enquiry submitted successfully: ${name} (${email}) at ${new Date().toISOString()}`);
    
    const successResponse = {
      success: true,
      message: 'Enquiry submitted successfully',
      emailSent: resendConfigured,
    };
    console.log('📤 Sending success response:', JSON.stringify(successResponse, null, 2));
    res.json(successResponse);

  } catch (error) {
    console.error('💥 ERROR processing enquiry:', error);
    console.error('Error stack:', error.stack);
    const errorResponse = {
      success: false,
      message: 'Internal server error'
    };
    console.log('📤 Sending error response:', JSON.stringify(errorResponse, null, 2));
    res.status(500).json(errorResponse);
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Ayana Backend'
  });
});

// Only start the Express listener when running this file directly (e.g. local dev)
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 Ayana backend server running on port ${PORT}`);
    console.log(`📧 Email service: Resend`);
    console.log(`🎯 Sending emails to: ${process.env.EMAIL_TO || 'ed@zengroup.com.au'}`);
    console.log('👋 Backend ready – Hello world! Submit the form to see full request logs.');
  });
}

export default app;
