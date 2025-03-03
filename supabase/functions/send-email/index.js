import { serve } from "https://deno.land/x/sift@0.5.0/mod.ts";
import nodemailer from "npm:nodemailer";

serve(async (req) => {
  const { to, subject, html } = await req.json();

  const transporter = nodemailer.createTransport({
    host: "email-smtp.us-east-1.amazonaws.com", // Change to your AWS SES region
    port: 587,
    secure: false, 
    auth: {
      user: "", // Replace with your SES SMTP username
      pass: "YOUR_SMTP_PASSWORD", // Replace with your SES SMTP password
    },
  });

  try {
    await transporter.sendMail({
      from: "noreply@fleduacademy.com", // Use your verified domain or email
      to,
      subject,
      html,
    });

    return new Response(JSON.stringify({ message: "Email sent successfully!" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
});
