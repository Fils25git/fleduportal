const AWS = require("aws-sdk");
const crypto = require("crypto");

// Configure AWS SES
AWS.config.update({
  accessKeyId: process.env.NETLIFY_AWS_ACCESS_KEY_ID,  // Store in Netlify environment variables
  secretAccessKey: process.env.NETLIFY_AWS_SECRET_ACCESS_KEY,  // Store in Netlify environment variables
  region: "us-east-1"  // AWS SES region
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

exports.handler = async function (event, context) {
  const { email } = JSON.parse(event.body);
  
  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Email is required" })
    };
  }

  // Generate a reset token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Create the email parameters
  const params = {
    Source: "fleduportal25@gmail.com", //verified email in SES
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: {
        Data: "Password Reset Request",
      },
      Body: {
        Text: {
          Data: `Here is your password reset token: ${resetToken}`,
        },
      },
    },
  };

  try {
    // Send email via SES
    await ses.sendEmail(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Password reset token sent" })
    };
  } catch (error) {
    console.error("SES Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send reset token" })
    };
  }
};
