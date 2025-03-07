document.addEventListener("DOMContentLoaded", function () {
    const journalPosts = document.getElementById("journalPosts");

    // Add event listeners to comment buttons
    journalPosts.addEventListener("click", function (e) {
        if (e.target.classList.contains("comment-btn")) {
            const commentInput = e.target.previousElementSibling;
            const nameInput = commentInput.previousElementSibling;
            const commentText = commentInput.value.trim();
            const userName = nameInput.value.trim();

            if (userName === "" || commentText === "") {
                alert("Please enter your name and comment before submitting.");
                return;
            }

            const commentElement = document.createElement("p");
            commentElement.innerHTML = `<strong>${userName}:</strong> ${commentText}`;
            e.target.parentElement.querySelector(".comments-list").appendChild(commentElement);

            // Clear input fields
            nameInput.value = "";
            commentInput.value = "";
        }
    });
});

// Toggle sidebar menu
function toggleMenu() {
    document.getElementById("sidebar").classList.toggle("open");
    }
// Supabase Configuration
const SUPABASE_URL = "https://uppmptshwlagdyswdvko.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwcG1wdHNod2xhZ2R5c3dkdmtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNDg5NjgsImV4cCI6MjA1NjgyNDk2OH0.GLhtyFMRRHYMd6M39bOPQ2GnYdvSd7nPohzkYA151-4";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener("DOMContentLoaded", async function () {
    const journalPosts = document.getElementById("journalPosts");

    // Function to fetch and display comments
    async function loadComments(postId, commentsList) {
        let { data: comments, error } = await supabase
            .from("comments")
            .select("*")
            .eq("post_id", postId)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching comments:", error);
            return;
        }

        commentsList.innerHTML = "";
        comments.forEach(comment => {
            let commentElement = document.createElement("p");
            commentElement.innerHTML = `<strong>${comment.name}:</strong> ${comment.comment}`;
            commentsList.appendChild(commentElement);
        });
    }

    // Add event listener for comment submission
    journalPosts.addEventListener("click", async function (e) {
        if (e.target.classList.contains("comment-btn")) {
            const commentInput = e.target.previousElementSibling;
            const nameInput = commentInput.previousElementSibling;
            const commentText = commentInput.value.trim();
            const userName = nameInput.value.trim();
            const postId = "journal_page"; // Change this if you have multiple posts

            if (userName === "" || commentText === "") {
                alert("Please enter your name and comment before submitting.");
                return;
            }

            // Save comment to Supabase
            let { error } = await supabase
                .from("comments")
                .insert([{ post_id: postId, name: userName, comment: commentText }]);

            if (error) {
                console.error("Error saving comment:", error);
                return;
            }

            // Reload comments
            loadComments(postId, e.target.parentElement.querySelector(".comments-list"));

            // Clear input fields
            nameInput.value = "";
            commentInput.value = "";
        }
    });

    // Load existing comments when the page loads
    const commentsSections = document.querySelectorAll(".comments-section");
    commentsSections.forEach(section => {
        const postId = "journal_page"; // Change for different posts
        const commentsList = section.querySelector(".comments-list");
        loadComments(postId, commentsList);
    });
});
