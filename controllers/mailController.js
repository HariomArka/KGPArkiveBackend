const nodemailer = require('nodemailer');

exports.sendMail = async (req, res) => {
  const { name, email, message } = req.body;

  // Configure transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_FROM}>`, // Use authenticated sender with reply-to
    replyTo: email, // Allow replies to go to the form submitter
    to: 'kgparkivehelp@gmail.com',
    subject: `Contact Form Submission from ${name}`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* Reset and base styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      background-color: #e2e8f0;
      line-height: 1.5;
      color: #2d3748;
    }
    a {
      text-decoration: none;
      color: #4a5568;
    }
    /* Main container */
    .email-wrapper {
      width: 100%;
      background-color: #e2e8f0;
      padding: 16px 8px;
    }
    .email-container {
      max-width: 640px;
      width: 95%;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    }
    /* Header */
    .header {
      background: linear-gradient(135deg, #718096 0%, #4a5568 100%);
      padding: 24px 20px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      font-size: 20px;
      font-weight: 600;
      letter-spacing: 0.2px;
      margin-bottom: 4px;
    }
    .header p {
      color: #e2e8f0;
      font-size: 12px;
      font-weight: 400;
    }
    /* Body */
    .body {
      padding: 24px 20px;
    }
    .body p {
      color: #4a5568;
      font-size: 13px;
      line-height: 1.6;
      margin-bottom: 16px;
    }
    .details-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    .details-table td {
      padding: 12px;
      background-color: #f7fafc;
      border-left: 3px solid #718096;
      border-radius: 4px;
      margin-bottom: 6px;
    }
    .details-table .label {
      color: #718096;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      margin-bottom: 3px;
    }
    .details-table .value {
      color: #2d3748;
      font-size: 14px;
      font-weight: 500;
    }
    .details-table .message {
      color: #2d3748;
      font-size: 13px;
      line-height: 1.6;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    /* Button */
    .button-container {
      text-align: center;
      padding: 12px 0;
    }
    .button {
      display: inline-block;
      padding: 10px 24px;
      background: linear-gradient(135deg, #718096 0%, #4a5568 100%);
      color: #ffffff;
      font-size: 13px;
      font-weight: 600;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(113, 128, 150, 0.2);
      transition: transform 0.2s ease;
    }
    .button:hover {
      transform: translateY(-1px);
    }
    /* Footer */
    .footer {
      padding: 16px 20px;
      background-color: #f7fafc;
      border-top: 1px solid #e2e8f0;
      text-align: center;
    }
    .footer p {
      color: #718096;
      font-size: 11px;
      margin-bottom: 4px;
    }
    .footer p strong {
      color: #2d3748;
    }
    /* Responsive adjustments */
    @media (max-width: 600px) {
      .email-container {
        width: 100%;
        border-radius: 0;
      }
      .header {
        padding: 20px 16px;
      }
      .body {
        padding: 20px 16px;
      }
      .details-table td {
        padding: 10px;
      }
      .button {
        padding: 8px 20px;
        font-size: 12px;
      }
    }
  </style>
</head>
<body>
  <table role="presentation" class="email-wrapper">
    <tr>
      <td align="center">
        <table role="presentation" class="email-container">
          <!-- Header -->
          <tr>
            <td class="header">
              <h1>New Contact Inquiry</h1>
              <p>BlogSphere Contact Form</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td class="body">
              <p>You have received a new message from your website contact form.</p>
              <!-- Contact Details -->
              <table role="presentation" class="details-table">
                <tr>
                  <td>
                    <p class="label">Name</p>
                    <p class="value">${name}</p>
                  </td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td>
                    <p class="label">Email Address</p>
                    <p class="value"><a href="mailto:${email}">${email}</a></p>
                  </td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td>
                    <p class="label">Message</p>
                    <div class="message">${message}</div>
                  </td>
                </tr>
              </table>
              <!-- Reply Button -->
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td class="button-container">
                    <a href="mailto:${email}" class="button">Reply to ${name.split(' ')[0]}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td class="footer">
              <p>Received on <strong>${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</strong></p>
              <p>This message was sent via your BlogSphere contact form</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    text: `NEW CONTACT FORM SUBMISSION\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nReceived: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
};
