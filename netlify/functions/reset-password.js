import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export const handler = async (event) => {
  try {
    const { email, token, newPassword } = JSON.parse(event.body);

    if (!email || !token || !newPassword) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing data" }) };
    }

    // Update password in Supabase
    const { error } = await supabase.auth.admin.updateUserByEmail(email, { password: newPassword });

    if (error) throw error;

    return { statusCode: 200, body: JSON.stringify({ message: "Password reset successful! you can now log in with new password" }) };
  } catch (error) {
    console.error("Reset Error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to reset password, try again" }) };
  }
};
