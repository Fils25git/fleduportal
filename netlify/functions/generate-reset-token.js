import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import crypto from "crypto";

const ses = new SESClient({ 
  region: process.env.NETLIFY_AWS_REGION, 
  credentials: {
    accessKeyId: process.env.NETLIFY_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NETLIFY_AWS_SECRET_ACCESS_KEY
  }
});

export const handler = async (event) => {
  try {
    const { email } = JSON.parse(event.body);
    if (!email) {
      return { statusCode: 400, body: JSON.stringify({ error: "Email is required" }) };
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    const params = {
      Source: process.env.SES_FROM_EMAIL, // Verified email in AWS SES
      Destination: { ToAddresses: [email] },
      Message: {
        Subject: { Data: "FL EduAcademy - Password Reset Request" },
        Body: { Text: { Data: `Reset your password using this token: ${resetToken}` } }
      },
    };

    await ses.send(new SendEmailCommand(params));

    return { statusCode: 200, body: JSON.stringify({ message: "Password reset email sent successfully." }) };
  } catch (error) {
    console.error("Error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to send email." }) };
  }
};
