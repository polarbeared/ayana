import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const isDirectRun = process.argv[1] === __filename;

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
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

// Email transporter setup
const createTransporter = () => {
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }
  
  // SMTP configuration for custom email servers
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true' || false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      // Don't fail on invalid certs (can be set to false for development)
      rejectUnauthorized: true
    }
  });
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
  
  body('message')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Message cannot exceed 1000 characters'),
  
  body('captchaToken')
    .notEmpty()
    .withMessage('Please complete the captcha verification')
];

// reCAPTCHA Enterprise verification function
const verifyRecaptchaEnterprise = async (token) => {
  console.log('🔐 verifyRecaptchaEnterprise() called with token:', token);
  try {
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
    const apiKey = process.env.GOOGLE_CLOUD_API_KEY;
    const siteKey = process.env.RECAPTCHA_SITE_KEY;
    
    console.log('🔧 reCAPTCHA config:');
    console.log('  Project ID:', projectId);
    console.log('  API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT SET');
    console.log('  Site Key:', siteKey);
    
    const verificationURL = `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments?key=${apiKey}`;
    console.log('🌐 Verification URL:', verificationURL);
    
    const requestBody = {
      event: {
        token: token,
        expectedAction: 'submit_enquiry',
        siteKey: siteKey,
      }
    };
    console.log('📋 Request body:', JSON.stringify(requestBody, null, 2));
    
    console.log('📡 Making request to Google reCAPTCHA Enterprise API...');
    const response = await fetch(verificationURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });
    
    console.log('📨 Response status:', response.status);
    console.log('📨 Response headers:', JSON.stringify([...response.headers.entries()], null, 2));
    
    const data = await response.json();
    console.log('📋 reCAPTCHA Enterprise verification result:', JSON.stringify(data, null, 2));
    
    // Check if token is valid and get risk score
    if (data.tokenProperties && data.tokenProperties.valid) {
      const score = data.riskAnalysis?.score || 0;
      const minScore = parseFloat(process.env.RECAPTCHA_MIN_SCORE) || 0.5;
      console.log(`📊 reCAPTCHA Enterprise score: ${score}, minimum required: ${minScore}`);
      const isValid = score >= minScore;
      console.log(`✅ Score check result: ${isValid}`);
      return isValid;
    } else {
      console.log('❌ Token invalid. Reason:', data.tokenProperties?.invalidReason);
      return false;
    }
    
  } catch (error) {
    console.error('💥 reCAPTCHA Enterprise verification error:', error);
    console.error('Error stack:', error.stack);
    return false;
  }
};

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

    const { name, email, phone, postcode, message, captchaToken } = req.body;
    console.log('📋 Extracted form data:');
    console.log('  Name:', name);
    console.log('  Email:', email);
    console.log('  Phone:', phone);
    console.log('  Postcode:', postcode);
    console.log('  Message:', message);
    console.log('  CaptchaToken:', captchaToken);
    
    // Verify reCAPTCHA (or bypass in development)
    const bypassRecaptcha = process.env.BYPASS_RECAPTCHA === 'true';
    console.log('🔐 reCAPTCHA check - Bypass enabled:', bypassRecaptcha);
    
    if (bypassRecaptcha) {
      console.log('⚠️  reCAPTCHA validation bypassed for development');
    } else {
      console.log('🔍 Starting reCAPTCHA Enterprise verification...');
      const isValidRecaptcha = await verifyRecaptchaEnterprise(captchaToken);
      console.log('🔍 reCAPTCHA verification result:', isValidRecaptcha);
      if (!isValidRecaptcha) {
        console.log('❌ reCAPTCHA verification FAILED - returning 400 error');
        return res.status(400).json({
          success: false,
          message: 'reCAPTCHA verification failed. Please try again.'
        });
      }
      console.log('✅ reCAPTCHA verified successfully');
    }
    
    // Create email transporter
    console.log('📧 Creating email transporter...');
    const transporter = createTransporter();
    
    // Verify transporter configuration
    console.log('🔍 Verifying email transporter...');
    try {
      await transporter.verify();
      console.log('✅ Email transporter verified successfully');
    } catch (error) {
      console.error('❌ Email transporter verification failed:', error);
      return res.status(500).json({
        success: false,
        message: 'Email service configuration error'
      });
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
          <h1>New Enquiry - Vela</h1>
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
          <div class="field">
            <div class="label">reCAPTCHA:</div>
            <div class="value">✅ Verified</div>
          </div>
        </div>
        <div class="footer">
          This enquiry was submitted through the Vela website enquiry form with reCAPTCHA verification.
        </div>
      </body>
      </html>
    `;

    const emailText = `
New Enquiry - Vela

Name: ${name}
Email: ${email}
Phone: ${phone}
Postcode: ${postcode}
${message ? `Message: ${message}\n` : ''}
Submitted: ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}
reCAPTCHA: ✅ Verified

This enquiry was submitted through the Vela website enquiry form with reCAPTCHA verification.
    `;

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || 'admin@zengroup.com.au',
      subject: `New Vela Enquiry - ${name}`,
      text: emailText,
      html: emailHTML,
      replyTo: email
    };

    console.log('📤 Sending email...');
    console.log('Email options:', JSON.stringify({
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      replyTo: mailOptions.replyTo
    }, null, 2));
    
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    
    // Log successful submission
    console.log(`🎉 Enquiry submitted successfully: ${name} (${email}) at ${new Date().toISOString()}`);
    
    const successResponse = {
      success: true,
      message: 'Enquiry submitted successfully'
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
    service: 'Vela Backend'
  });
});

// Only start the Express listener when running this file directly (e.g. local dev)
if (isDirectRun && process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 Vela backend server running on port ${PORT}`);
    console.log(`📧 Email service: ${process.env.EMAIL_SERVICE || 'SMTP'}`);
    console.log(`🎯 Sending emails to: ${process.env.EMAIL_TO || 'admin@zengroup.com.au'}`);
  });
}

export default app;
