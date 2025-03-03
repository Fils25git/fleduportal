import { createClient } from "@supabase/supabase-js";

// Initialize Supabase
const supabase = createClient(
  process.env.https://uppmptshwlagdyswdvko.supabase.co,
  process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwcG1wdHNod2xhZ2R5c3dkdmtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4MjA3ODMsImV4cCI6MjA1NjM5Njc4M30.rkXVCQoIun-Pff8APEbP98Cm0FvFt_BKRL81UkXl0IE
);

exports.handler = async (event) => {
  const { email, password } = JSON.parse(event.body);

  const { user, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { statusCode: 400, body: JSON.stringify({ error: error.message }) };
  }

  return { statusCode: 200, body: JSON.stringify({ message: "Confirmation email sent!" }) };
};
