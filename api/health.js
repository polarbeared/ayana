/**
 * Vercel Serverless Function: Health Check
 * 
 * Simple health check endpoint to verify the API is running
 */

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Return health status
  return res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Ayana Backend',
    environment: process.env.VERCEL_ENV || 'unknown'
  });
}
