const supabase = window.supabase.createClient(
    "https://uppmptshwlagdyswdvko.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwcG1wdHNod2xhZ2R5c3dkdmtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNDg5NjgsImV4cCI6MjA1NjgyNDk2OH0.GLhtyFMRRHYMd6M39bOPQ2GnYdvSd7nPohzkYA151-4"
);
// =================== SIGN-UP FUNCTION ===================
document.getElementById("signup-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
    const messageBox = document.getElementById("signup-message");

    // Get label elements
    const labels = document.querySelectorAll("#signup-form label");

    try {
        // Hide all labels when the user has filled the form
        labels.forEach(label => label.style.display = "none");

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

        // ✅ Show success message and hide input fields
        messageBox.textContent = "✅ Account successfully created! Redirecting to log in page...";
        messageBox.style.color = "green";
        messageBox.style.display = "block";

        document.getElementById("signup-form").reset(); // Clear form

        setTimeout(() => {
            window.location.href = "login.html"; // Redirect after success
        }, 2000);

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
    const labels = document.querySelectorAll("#login-form label"); // Get label elements

    if (!email || !password) {
        messageBox.textContent = "❌ Please fill in both email and password.";
        messageBox.style.color = "red";
        messageBox.style.display = "block";
        return;
    }

    try {
        // Hide labels when user submits
        labels.forEach(label => label.style.display = "none");

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            messageBox.textContent = "❌ Incorrect email or password.";
            messageBox.style.color = "red";
            messageBox.style.display = "block";
            return;
        }

        // ✅ Show success message and clear form
        messageBox.textContent = "✅ Login successful! Redirecting...";
        messageBox.style.color = "green";
        messageBox.style.display = "block";
        document.getElementById("login-form").reset(); // Clear form

        setTimeout(() => {
            window.location.href = "userSelection.html"; // Redirect after success
        }, 2000);

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
    const labels = document.querySelectorAll("#reset-form label"); // Get label elements

    if (!email) {
        messageBox.textContent = "❌ Please enter your email.";
        messageBox.style.color = "red";
        messageBox.style.display = "block";
        return;
    }

    try {
        // Hide labels after entering email
        labels.forEach(label => label.style.display = "none");

        // ✅ Send password reset email
        const { error } = await supabase.auth.resetPasswordForEmail(email);

        if (error) throw new Error(error.message);

        // ✅ Show success message and hide email input
        messageBox.textContent = "✅ Password reset link sent! Check your inbox.";
        messageBox.style.color = "green";
        messageBox.style.display = "block";
        document.getElementById("reset-email").style.display = "none";

    } catch (error) {
        messageBox.textContent = `❌ Error: ${error.message}`;
        messageBox.style.color = "red";
        messageBox.style.display = "block";
    }
});
