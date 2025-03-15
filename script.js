function toggleMenu() {
         var menu = document.getElementById("nav-links");
         menu.classList.toggle("show");
}
   
document.addEventListener("DOMContentLoaded", () => {
            // Hamburger menu toggle
            const menuButton = document.querySelector(".hamburger-menu");
            const menu = document.getElementById("nav-links");

            if (menuButton && menu) {
                menuButton.addEventListener("click", function () {
                    menu.classList.toggle("show");
                });
            }
        });
function navigateToResource() {
            const categories = document.getElementsByName('category');
            let selectedCategory = '';
            for (const category of categories) {
                if (category.checked) {
                    selectedCategory = category.value;
                    break;
                }
            }
            if (selectedCategory) {
                window.location.href = selectedCategory;
            } else {
                alert('Please select a category to continue.');
            }
        }

        function goBack() {
            window.history.back();
        }
