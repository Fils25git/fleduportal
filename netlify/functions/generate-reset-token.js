const AWS = require("aws-sdk"); // ✅ Import AWS SDK for Node.js
const crypto = require("crypto");

// Configure AWS SES
AWS.config.update({
  accessKeyId: process.env.NETLIFY_AWS_ACCESS_KEY_ID,  
  secretAccessKey: process.env.NETLIFY_AWS_SECRET_ACCESS_KEY,  
  region: "us-east-1"  
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

exports.handler = async function (event, context) {
  try {
    const { email } = JSON.parse(event.body);

    if (!email) {
      return { statusCode: 400, body: JSON.stringify({ error: "Email is required" }) };
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Email Parameters
    const params = {
      Source: "fleduportal25@gmail.com", // Replace with verified AWS SES email
      Destination: { ToAddresses: [email] },
      Message: {
        Subject: { Data: "FL EduAcademy - Password Reset Request" },
        Body: { Text: { Data: `Reset your password using this token: ${resetToken}` } }
      },
    };

    // Send email via AWS SES
    await ses.sendEmail(params).promise();

    return { statusCode: 200, body: JSON.stringify({ message: "Password reset email sent successfully." }) };
  } catch (error) {
    console.error("Error sending email:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to send reset email." }) };
  }
};
