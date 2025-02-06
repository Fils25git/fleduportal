document.addEventListener("DOMContentLoaded", function() {
    const userselectionForm = document.getElementById("userselection");
    const learnerCategoryForm = document.getElementById("learnerCategory");
    const classSelectionForm = document.getElementById("classSelection");
    const teacherSelectionForm = document.getElementById("teacherSelection");
    // Define redirection rules globally
    const classRedirects = {
        "primary4": "p4_options.html",
        "primary5": "p5_options.html",
        "primary6": "p6_options.html",
        "secondary1": "s1_options.html",
        "secondary2": "s2_options.html",
        "secondary3": "s3_options.html",
        "secondary4": "s4_options.html",
        "secondary5": "s5_options.html",
        "secondary6": "s6_options.html"
    };
    // Handle login form for Teacher/Learner
    if (userselectionForm) {
        userselectionForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const role = document.querySelector('input[name="role"]:checked');
            if (role) {
                if (role.value === "learner") {
                    window.location.href = "learner_dashboard.html";
                } else {
                    window.location.href = "teacher_dashboard.html";
                }
            }
        });
    }
    // Handle learner category selection (Primary or Secondary)
    if (learnerCategoryForm) {
        learnerCategoryForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const category = document.querySelector('input[name="category"]:checked');
            if (category) {
                window.location.href = "primary_secondary_dashboard.html?category=" + category.value;
            }
        });
    }
    // Handle teacher category selection (Primary or Secondary)
    if (teacherSelectionForm) {
        teacherSelectionForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const category = document.querySelector('input[name="category"]:checked');
            if (category) {
                window.location.href = "teacher_dashboard.html?category=" + category.value;
            }
        });
    }
    // Show Primary or Secondary class levels
    if (classSelectionForm) {
        const primaryClasses = document.getElementById("primaryClasses");
        const secondaryClasses = document.getElementById("secondaryClasses");
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        if (category === "primary") {
            primaryClasses.style.display = "block";
            secondaryClasses.style.display = "none";
        } else if (category === "secondary") {
            secondaryClasses.style.display = "block";
            primaryClasses.style.display = "none";
        }
        // Class selection redirection
        classSelectionForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const selectedClass = document.querySelector('input[name="class"]:checked');
            if (selectedClass) {
                let classValue = selectedClass.value;
                if (classRedirects[classValue]) {
                    window.location.href = classRedirects[classValue];
                } else {
                    alert("Page not found for this class.");
                }
            } else {
                alert("Please select a class before continuing.");
            }
        });
    });
    document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("teacherCategoryForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const selectedCategory = document.querySelector('input[name="teacherCategory"]:checked');

        if (selectedCategory) {
            // Hide the form container
            document.getElementById("teacherCategoryForm").style.display = "none"; 

            // Show the relevant options based on the selected category
            if (selectedCategory.value === "primary") {
                document.getElementById("primaryOptions").classList.remove("hidden");
            } else if (selectedCategory.value === "secondary") {
                document.getElementById("secondaryOptions").classList.remove("hidden");
            }
        } else {
            alert("Please select a category before continuing.");
        }
    });
});
