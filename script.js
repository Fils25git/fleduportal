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

        function searchResources() {
            const input = document.getElementById('searchInput').value.toLowerCase();
            const resources = document.querySelectorAll('.resource-item');

            resources.forEach(resource => {
                const title = resource.getAttribute('data-title').toLowerCase();
                if (title.includes(input)) {
                    resource.style.display = 'flex';
                } else {
                    resource.style.display = 'none';
                }
            });
        }
function toggleSubjectsMenu() {
    let menu = document.getElementById('subjectsMenuContent');
    let icon = document.getElementById('subjectsMenuIcon');

    // Close any other open menus
    document.querySelectorAll('.subjects-menu-content').forEach(m => {
        if (m !== menu) m.classList.remove('show');
    });

    // Toggle menu visibility
    menu.classList.toggle('show');

    // Change icon between "Book + Three Dots" and "Book + Close"
    icon.innerHTML = menu.classList.contains('show') ? '📖<br>✖' : '📖<br>⋯';
}
