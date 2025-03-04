const nodemailer = require("nodemailer");
const crypto = require("crypto");

exports.handler = async function(event, context) {
  // Retrieve the email from the request body
  const { email } = JSON.parse(event.body);
  
  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Email is required" })
    };
  }

  // Generate a reset token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Normally, here you would store the reset token in your database (e.g., Supabase)
  // This example just simulates that part.
  // Store the token and email for further use.
  
  // Send the reset token via email using NodeMailer (you can use Amazon SES here)
  const transporter = nodemailer.createTransport({
    service: "SES",
    auth: {
      user: "your-SES-username",  // replace with actual SES credentials
      pass: "your-SES-password"   // replace with actual SES credentials
    }
  });

  const mailOptions = {
    from: "your-email@example.com",  // your email address
    to: email,
    subject: "Password Reset Request",
    text: `Here is your password reset token: ${resetToken}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    
    // Simulate storing the token and email in a database (replace with actual DB logic)
    console.log(`Token sent to ${email}`);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Password reset token sent" })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send reset token" })
    };
  }
};
