const nodemailer = require('nodemailer');

const sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;

  // Create a transporter using your email service
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.CONTACT_EMAIL, // Your company email
    subject: `New Contact Form Submission from ${name}`,
    text: `You have received a new message from:
    
Name: ${name}
Email: ${email}
Message: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    throw error;
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
};

module.exports = { sendContactEmail }; 