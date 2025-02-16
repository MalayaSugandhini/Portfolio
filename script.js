// Wait until the DOM is fully loaded before executing any JavaScript
document.addEventListener("DOMContentLoaded", function () {
    /*** 🔹 THEME TOGGLE FUNCTIONALITY 🔹 ***/
    
    const themeToggle = document.querySelector(".theme-toggle");

    // Function to apply the saved theme (light or dark) when the page loads
    function applyTheme() {
        if (localStorage.getItem("theme") === "light") {
            document.body.classList.add("light-mode");
            themeToggle.innerHTML = "☀️"; // Sun icon for light mode
        } else {
            document.body.classList.remove("light-mode");
            themeToggle.innerHTML = "🌙"; // Moon icon for dark mode
        }
    }
    applyTheme(); // Apply the saved theme on page load

    // Toggle theme function (Accessible globally from HTML onclick)
    window.toggleTheme = function () {
        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            localStorage.setItem("theme", "light");
            themeToggle.innerHTML = "☀️";
        } else {
            localStorage.setItem("theme", "dark");
            themeToggle.innerHTML = "🌙";
        }

        // Apply a smooth transition effect when switching themes
        document.body.style.transition = "background-color 0.3s ease, color 0.3s ease";
    };

    /*** 🔹 NAVIGATION SMOOTH SCROLLING 🔹 ***/
    
    const navLinks = document.querySelectorAll(".nav-links a");
    
    // Enable smooth scrolling when clicking navigation links
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent the default anchor behavior
            const targetId = this.getAttribute("href").substring(1); // Get section ID
            document.getElementById(targetId).scrollIntoView({
                behavior: "smooth" // Smooth scrolling effect
            });
        });
    });

    /*** 🔹 MOBILE MENU TOGGLE FUNCTION 🔹 ***/

    const mobileMenuButton = document.createElement("button");
    mobileMenuButton.classList.add("mobile-menu-toggle");
    mobileMenuButton.innerHTML = "☰"; // Menu icon

    document.querySelector(".navbar").appendChild(mobileMenuButton);

    // Toggle mobile menu when clicking the button
    mobileMenuButton.addEventListener("click", function () {
        document.querySelector(".nav-links").classList.toggle("active");
    });
});

/*** 🔹 TIMELINE ANIMATION (INTERSECTION OBSERVER) 🔹 ***/

document.addEventListener("DOMContentLoaded", function () {
    const timelineItems = document.querySelectorAll(".timeline li");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible"); // Add animation class
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
});

/*** 🔹 PROJECT FILTERING FUNCTION 🔹 ***/

document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            const category = this.getAttribute("data-filter");

            // Remove active class from all buttons and add to clicked one
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            // Show or hide project cards based on selected category
            projectCards.forEach(card => {
                if (category === "all" || card.getAttribute("data-category") === category) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // Set default filter to show all projects
    document.querySelector(".filter-btn[data-filter='all']").click();
});

/*** 🔹 EXPERIENCE SECTION ANIMATION 🔹 ***/

document.addEventListener("DOMContentLoaded", function () {
    const experienceItems = document.querySelectorAll(".experience-item");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible"); // Add animation effect
            }
        });
    }, { threshold: 0.5 });

    experienceItems.forEach(item => {
        observer.observe(item);
    });
});

/*** 🔹 TESTIMONIALS AUTO-SCROLL FUNCTION 🔹 ***/

document.addEventListener("DOMContentLoaded", function () {
    const testimonials = document.querySelectorAll(".testimonial-card");
    let index = 0;

    function showNextTestimonial() {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? "block" : "none";
        });
        index = (index + 1) % testimonials.length;
    }

    showNextTestimonial(); // Show first testimonial immediately
    setInterval(showNextTestimonial, 5000); // Auto-scroll every 5 seconds
});

/*** 🔹 CONTACT FORM HANDLING FUNCTION 🔹 ***/

document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");
    const successMessage = document.getElementById("form-success");

    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Form validation
        if (!name || !email || !message) {
            alert("Please fill out all fields before submitting.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Sending email request to backend
        try {
            const response = await fetch("http://localhost:5000/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            const data = await response.json();
            if (response.ok) {
                successMessage.style.display = "block";
                contactForm.reset();

                setTimeout(() => {
                    successMessage.style.display = "none";
                }, 5000);
            } else {
                alert("Failed to send email: " + data.error);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Try again later.");
        }
    });

    // Email validation function
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }
});
