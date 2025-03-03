// =================== INITIALIZE SUPABASE ===================
const supabase = supabase.createClient(
    "https://uppmptshwlagdyswdvko.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwcG1wdHNod2xhZ2R5c3dkdmtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4MjA3ODMsImV4cCI6MjA1NjM5Njc4M30.rkXVCQoIun-Pff8APEbP98Cm0FvFt_BKRL81UkXl0IE"
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
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { firstName, lastName }
            }
        });

        if (error) throw error;

        messageBox.textContent = "✅ Sign-up successful! Check your email for verification.";
        messageBox.style.color = "green";
        messageBox.style.display = "block";

    } catch (error) {
        console.error("Sign-up error:", error.message);
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
        messageBox.textContent = "❌ Please enter both email and password.";
        messageBox.style.color = "red";
        messageBox.style.display = "block";
        return;
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) throw error;

        if (!data.user.email_confirmed_at) {
            messageBox.textContent = "❌ Please verify your email before logging in.";
            messageBox.style.color = "red";
            messageBox.style.display = "block";
            return;
        }

        window.location.href = "dashboard.html";

    } catch (error) {
        console.error("Login error:", error.message);
        messageBox.textContent = `❌ Error: ${error.message}`;
        messageBox.style.color = "red";
        messageBox.style.display = "block";
    }
});

// =================== INSERT USER DATA AFTER VERIFICATION ===================
async function insertUserData(user) {
    try {
        const { data, error } = await supabase
            .from("users")
            .insert([{ id: user.id, email: user.email, first_name: user.user_metadata?.firstName, last_name: user.user_metadata?.lastName }]);

        if (error) throw error;
        console.log("User data inserted successfully:", data);
    } catch (error) {
        console.error("Error inserting user data:", error.message);
    }
}

supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_IN" && session?.user) {
        await insertUserData(session.user);
    }
});

// =================== LOGOUT FUNCTION ===================
document.getElementById("logout-button")?.addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = "index.html"; // Redirect to home page
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
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;

        messageBox.textContent = "✅ Password reset link sent!";
        messageBox.style.color = "green";
        messageBox.style.display = "block";

    } catch (error) {
        console.error("Password reset error:", error.message);
        messageBox.textContent = `❌ Error: ${error.message}`;
        messageBox.style.color = "red";
        messageBox.style.display = "block";
    }
});

// =================== PASSWORD MATCH CHECK ===================
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

passwordInput?.addEventListener("input", checkPasswordMatch);
confirmPasswordInput?.addEventListener("input", checkPasswordMatch);

// =================== SHOW/HIDE PASSWORD TOGGLE ===================
document.querySelectorAll(".toggle-password").forEach((toggle) => {
    toggle.addEventListener("click", function () {
        const passwordField = this.previousElementSibling;
        passwordField.type = passwordField.type === "password" ? "text" : "password";
        this.textContent = passwordField.type === "password" ? "👁️" : "🙈";
    });
});
