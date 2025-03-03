const supabase = window.supabase.createClient(
    "https://your-supabase-url.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwcG1wdHNod2xhZ2R5c3dkdmtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4MjA3ODMsImV4cCI6MjA1NjM5Njc4M30.rkXVCQoIun-Pff8APEbP98Cm0FvFt_BKRL81UkXl0IE" //Supabase API key
);

// =================== SIGN-UP FUNCTION ===================
document.getElementById("signup-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const messageBox = document.getElementById("signup-message");

    if (password !== confirmPassword) {
        messageBox.textContent = "❌ Passwords do not match!";
        messageBox.style.color = "red";
        messageBox.style.display = "block";
        return;
    }

    try {
        // ✅ Check if email is already registered
        const { data: existingUsers, error: checkError } = await supabase
            .from("users")
            .select("email")
            .eq("email", email);

        if (checkError) throw checkError;

        if (existingUsers.length > 0) {
            messageBox.textContent = "❌ This email is already registered. Please log in.";
            messageBox.style.color = "red";
            messageBox.style.display = "block";
            return;
        }

        // ✅ Register user if email is not taken
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) throw error;

        // ✅ Save user details in "users" table
        await supabase.from("users").insert([
            { id: data.user.id, first_name: firstName, last_name: lastName, email }
        ]);

        // ✅ Redirect to login page after successful registration
        window.location.href = "login.html";

    } catch (error) {
        messageBox.textContent = `❌ Error: ${error.message}`;
        messageBox.style.color = "red";
        messageBox.style.display = "block";
    }
});

// =================== LOGIN FUNCTION ===================
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    const messageBox = document.getElementById("login-message");

    if (!email || !password) {
        messageBox.textContent = "❌ Please fill in both email and password.";
        messageBox.style.color = "red";
        messageBox.style.display = "block";
        return;
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            messageBox.textContent = "❌ Incorrect email or password.";
            messageBox.style.color = "red";
            messageBox.style.display = "block";
            return;
        }

        // ✅ Redirect to dashboard or home page on successful login
        window.location.href = "dashboard.html";

    } catch (error) {
        messageBox.textContent = `❌ Error: ${error.message}`;
        messageBox.style.color = "red";
        messageBox.style.display = "block";
    }
});

// =================== PASSWORD RESET FUNCTION ===================
document.getElementById("reset-password")?.addEventListener("click", async () => {
    const email = document.getElementById("reset-email").value.trim();
    const messageBox = document.getElementById("reset-message");

    if (!email) {
        messageBox.textContent = "❌ Please enter your email.";
        messageBox.style.color = "red";
        messageBox.style.display = "block";
        return;
    }

    try {
        // ✅ Send password reset email (email confirmation is required)
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw new Error(error.message);

        messageBox.textContent = "✅ A password reset link has been sent to your email. Please check your inbox.";
        messageBox.style.color = "green";
        messageBox.style.display = "block";
    } catch (error) {
        messageBox.textContent = `❌ Error: ${error.message}`;
        messageBox.style.color = "red";
        messageBox.style.display = "block";
    }
});
