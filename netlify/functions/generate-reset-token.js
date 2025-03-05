import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import crypto from "crypto";

const ses = new SESClient({ region: "us-east-1" });

export const handler = async (event) => {
  try {
    const { email } = JSON.parse(event.body);
    if (!email) {
      return { statusCode: 400, body: JSON.stringify({ error: "Email is required" }) };
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    const params = {
      Source: "fleduportal25@gmail.com",
      Destination: { ToAddresses: [email] },
      Message: {
        Subject: { Data: "FL EduAcademy - Password Reset Request" },
        Body: { Text: { Data: `Reset your password using this token: ${resetToken}` } }
      },
    };

    await ses.send(new SendEmailCommand(params));

    return { statusCode: 200, body: JSON.stringify({ message: "Password reset email sent successfully." }) };
  } catch (error) {
    console.error("Error sending email:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to send reset email." }) };
  }
};
