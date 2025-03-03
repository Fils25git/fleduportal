import { serve } from "https://deno.land/x/sift@0.5.0/mod.ts";
import nodemailer from "npm:nodemailer";

serve(async (req) => {
  const { to, subject, html } = await req.json();

  const transporter = nodemailer.createTransport({
    host: "email-smtp.us-east-1.amazonaws.com",
    port: 587,
    secure: false, 
    auth: {
      user: "AKIAUZPNLA2CF27BC4MU", 
      pass: "BJlRC2DqAopoq983FIW72UMR+aW4C8LzL4AX2QyyV+C5", 
    },
  });

  try {
    await transporter.sendMail({
      from: "noreply@fleduacademy.com",
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
