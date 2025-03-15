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
