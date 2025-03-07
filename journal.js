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
