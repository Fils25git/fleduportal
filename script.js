document.addEventListener("DOMContentLoaded", () => {
    // Hamburger menu toggle
    const menuButton = document.querySelector(".hamburger-menu");
    const menu = document.getElementById("nav-links");

    if (menuButton && menu) {
        menuButton.addEventListener("click", function () {
            const isExpanded = menu.classList.toggle("show");
            this.setAttribute("aria-expanded", isExpanded);
        });
    }

    // Category Navigation
    document.getElementById("continue-btn")?.addEventListener("click", navigateToResource);
});

// Function to navigate based on selected category
function navigateToResource() {
    const selectedCategory = [...document.getElementsByName("category")]
        .find(category => category.checked)?.value;

    if (selectedCategory) {
        window.location.href = selectedCategory;
    } else {
        alert("Please select a category to continue.");
    }
}

// Function to go back to the previous page
function goBack() {
    window.history.back();
}
