import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log("Received /api/send-email request. req.body:", req.body);

  try {
    const { recipient, subject, message } = req.body;

    // Validate required fields
    if (!recipient || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields (recipient, subject, message) are required" 
      });
    }

    // Create a Nodemailer transporter (configure with your email provider)
    const transporter = nodemailer.createTransporter({
      service: 'gmail', // Use your email service (e.g., 'gmail', 'SendGrid')
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail email address (or SendGrid API key, etc.)
        pass: process.env.GMAIL_PASS, // Your Gmail password or SendGrid password
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.GMAIL_USER, // Sender address
      to: recipient, // Recipient address from the form
      subject: subject,
      text: message,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info);
    
    res.status(200).json({ 
      success: true, 
      message: "Email sent successfully!", 
      response: info 
    });
  } catch (error) {
    console.error("Error in /api/send-email:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
} 