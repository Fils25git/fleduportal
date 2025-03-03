// Initialize Supabase
const supabase = window.supabase.createClient(
    "https://uppmptshwlagdyswdvko.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwcG1wdHNod2xhZ2R5c3dkdmtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4MjA3ODMsImV4cCI6MjA1NjM5Njc4M30.rkXVCQoIun-Pff8APEbP98Cm0FvFt_BKRL81UkXl0IE"
);

// ✅ SIGN UP FUNCTION
document.getElementById("signup-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        // Register user in Supabase
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) throw error;

        // Notify user to check email for confirmation
        alert("A confirmation email has been sent. Please verify your email before logging in.");

        // Optional: Store additional user info in Supabase DB
        await supabase.from("users").insert([
            { id: data.user.id, first_name: firstName, last_name: lastName, email }
        ]);

        // Redirect to login page
        window.location.href = "login.html";

    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});

// ✅ LOGIN FUNCTION (Prevents unconfirmed users from logging in)
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    if (!email || !password) {
        alert("Please fill in both email and password.");
        return;
    }

    try {
        // Attempt login
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) throw error;

        // Check if email is confirmed
        const { data: user } = await supabase.auth.getUser();

        if (!user || !user.user_metadata || !user.user_metadata.email_confirmed_at) {
            alert("Please confirm your email before logging in.");
            await supabase.auth.signOut(); // Log user out if not confirmed
            return;
        }

        // Redirect to user dashboard after successful login
        window.location.href = "userSelection.html";

    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});

// ✅ PASSWORD RESET FUNCTION
document.getElementById("reset-password")?.addEventListener("click", async () => {
    const email = prompt("Enter your email to receive a password reset link:");
    if (email) {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email);
            if (error) throw error;

            alert("Password reset email sent! Check your inbox.");
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    }
});

// ✅ PASSWORD MATCH CHECK
const passwordInput = document.getElementById("signup-password");
const confirmPasswordInput = document.getElementById("confirm-password");
const passwordMessage = document.getElementById("password-message");

function checkPasswordMatch() {
    if (passwordInput.value === "" || confirmPasswordInput.value === "") {
        passwordMessage.textContent = "";
        return;
    }
    if (passwordInput.value === confirmPasswordInput.value) {
        passwordMessage.textContent = "✅ Passwords match!";
        passwordMessage.style.color = "green";
    } else {
        passwordMessage.textContent = "❌ Passwords do not match!";
        passwordMessage.style.color = "red";
    }
}

// Attach password match check to input fields
passwordInput?.addEventListener("input", checkPasswordMatch);
confirmPasswordInput?.addEventListener("input", checkPasswordMatch);

// ✅ CHECK IF USER IS LOGGED IN & EMAIL CONFIRMED (For protected pages)
async function checkUserStatus() {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        window.location.href = "login.html"; // Redirect to login if not logged in
    } else if (!user.user_metadata || !user.user_metadata.email_confirmed_at) {
        alert("Please confirm your email to access this page.");
        await supabase.auth.signOut(); // Logout unconfirmed user
        window.location.href = "login.html";
    }
}

checkUserStatus();
