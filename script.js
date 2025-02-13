document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.querySelector(".theme-toggle");
    const navLinks = document.querySelectorAll(".nav-links a");
    const mobileMenuButton = document.createElement("button");
    mobileMenuButton.classList.add("mobile-menu-toggle");
    mobileMenuButton.innerHTML = "☰";
    document.querySelector(".navbar").appendChild(mobileMenuButton);

    // Ensure theme is loaded correctly on page refresh
    function applyTheme() {
        if (localStorage.getItem("theme") === "light") {
            document.body.classList.add("light-mode");
            themeToggle.innerHTML = "☀️";
        } else {
            document.body.classList.remove("light-mode");
            themeToggle.innerHTML = "🌙";
        }
    }
    applyTheme();

    // ✅ Define toggleTheme globally so it's accessible in HTML
    window.toggleTheme = function () {
        document.body.classList.toggle("light-mode");
        if (document.body.classList.contains("light-mode")) {
            localStorage.setItem("theme", "light");
            themeToggle.innerHTML = "☀️";
        } else {
            localStorage.setItem("theme", "dark");
            themeToggle.innerHTML = "🌙";
        }
    };

    // Smooth Scroll for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Mobile Menu Toggle
    mobileMenuButton.addEventListener("click", function () {
        document.querySelector(".nav-links").classList.toggle("active");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const timelineItems = document.querySelectorAll(".timeline li");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.5 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.querySelector(".theme-toggle");

    // Apply saved theme preference
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
        themeToggle.innerHTML = "☀️";
    }

    // Toggle Dark/Light Mode
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            localStorage.setItem("theme", "light");
            themeToggle.innerHTML = "☀️";
        } else {
            localStorage.setItem("theme", "dark");
            themeToggle.innerHTML = "🌙";
        }

        // Apply smooth transition
        document.body.style.transition = "background-color 0.3s ease, color 0.3s ease";
    });

    console.log("Last section loaded without charts!");
});

document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            const category = this.getAttribute("data-filter");
            
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            
            projectCards.forEach(card => {
                if (category === "all" || card.getAttribute("data-category") === category) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // Default: Show all projects
    document.querySelector(".filter-btn[data-filter='all']").click();
});
document.addEventListener("DOMContentLoaded", function () {
    const experienceItems = document.querySelectorAll(".experience-item");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.5 });
    
    experienceItems.forEach(item => {
        observer.observe(item);
    });
});

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

document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");
    const successMessage = document.getElementById("form-success");

    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

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

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.querySelector(".theme-toggle");

    // Apply saved theme preference
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
        themeToggle.innerHTML = "☀️";
    }

    // Toggle Dark/Light Mode
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            localStorage.setItem("theme", "light");
            themeToggle.innerHTML = "☀️";
        } else {
            localStorage.setItem("theme", "dark");
            themeToggle.innerHTML = "🌙";
        }

        // Apply smooth transition only when toggling
        document.body.style.transition = "background-color 0.3s ease, color 0.3s ease";
    });
});
