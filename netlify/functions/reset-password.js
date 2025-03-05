import { createClient } from '@supabase/supabase-js';

exports.handler = async function(event, context) {
  // Parse the incoming request body
  const { token, newPassword } = JSON.parse(event.body);
  
  if (!token || !newPassword) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Token and new password are required" })
    };
  }

  // Normally, you would look up the token in your database and verify it.
  // This example just simulates token validation.
  console.log(`Attempting to reset password with token: ${token}`);
  
  // Initialize Supabase client with environment variables
  const supabase = createClient(
  "https://uppmptshwlagdyswdvko.supabase.co",  //actual Supabase URL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwcG1wdHNod2xhZ2R5c3dkdmtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwOTczMDcsImV4cCI6MjA1NjY3MzMwN30.BIN-9LCcP3gG8fDv9vYgsvnZOK6k6GLMeqHOaIs7bjQ"  // Replace with your actual Supabase service role key
);


  try {
    // Simulate password reset: Update the password where reset_token matches
    const { data, error } = await supabase
      .from('users')  // Assuming 'users' is your table name
      .update({ password: newPassword })  // Update the password
      .eq('reset_token', token);  // Match the token

    if (error) {
      throw new Error(error.message);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Password has been reset successfully" })
    };
  } catch (error) {
    console.error("Error resetting password:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to reset password" })
    };
  }
};
