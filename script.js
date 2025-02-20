// Wait until the DOM is fully loaded before executing any JavaScript
document.addEventListener("DOMContentLoaded", function () {

    /*** 🔹 NAVIGATION SMOOTH SCROLLING 🔹 ***/
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    /*** 🔹 MOBILE MENU TOGGLE FUNCTION 🔹 ***/
    const mobileMenuButton = document.createElement("button");
    mobileMenuButton.classList.add("mobile-menu-toggle");
    mobileMenuButton.innerHTML = "☰";

    document.querySelector(".navbar").appendChild(mobileMenuButton);

    mobileMenuButton.addEventListener("click", function () {
        document.querySelector(".nav-links").classList.toggle("active");
    });

    /*** 🔹 HERO SECTION ANIMATION 🔹 ***/
    var typed = new Typed("#dynamic-text", {
        strings: ["Software Developer", "Freelancer", "Open Source Contributor", "Cloud Engineer"],
        typeSpeed: 90,
        backSpeed: 60,
        startDelay: 500,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: "|",
        smartBackspace: true,
        fadeOut: true,
        fadeOutDelay: 300,
    });

    function toggleDescription(jobId) {
        let description = document.getElementById(jobId);
        let timelineItem = description.closest(".timeline-item");
        let arrowIcon = timelineItem.querySelector(".arrow-icon");
    
        if (description.style.display === "none" || description.style.display === "") {
            description.style.display = "block"; 
            arrowIcon.innerHTML = "▲"; 
            timelineItem.classList.add("expanded"); 
        } else {
            description.style.display = "none"; 
            arrowIcon.innerHTML = "▼"; 
            timelineItem.classList.remove("expanded"); 
        }
    }
    
    // Ensure this function is globally accessible
    window.toggleDescription = toggleDescription;
    
    // Hide all descriptions on page load
    document.addEventListener("DOMContentLoaded", function () {
        let jobDescriptions = document.querySelectorAll(".job-details");
        jobDescriptions.forEach(description => {
            description.style.display = "none"; 
        });
    
        console.log("JavaScript Loaded ✅");
    });

    /*** 🔹 SKILLS FILTERING FUNCTION 🔹 ***/
    document.addEventListener("DOMContentLoaded", function () {
        console.log("JavaScript Loaded ✅");
        
        const skillCards = document.querySelectorAll(".skill-card");
    
        skillCards.forEach(card => {
            card.addEventListener("mouseenter", () => {
                console.log(`Hovered on: ${card.dataset.category}`);
            });
        });
    });
    
    



    /*** 🔹 PROJECT FILTERING FUNCTION 🔹 ***/
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
    document.addEventListener("DOMContentLoaded", function () {
        function toggleDescription(jobId) {  // ❌ Not accessible globally
            let description = document.getElementById(jobId);
            let arrowIcon = description.previousElementSibling.querySelector(".arrow-icon");
    
            if (description.style.display === "none" || description.style.display === "") {
                description.style.display = "block";
                arrowIcon.innerHTML = "▲";
            } else {
                description.style.display = "none";
                arrowIcon.innerHTML = "▼";
            }
        }
    });
    
    document.querySelector(".filter-btn[data-filter='all']").click();

    /*** 🔹 EXPERIENCE SECTION ANIMATION 🔹 ***/
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

    /*** 🔹 TESTIMONIALS AUTO-SCROLL FUNCTION 🔹 ***/
    const testimonials = document.querySelectorAll(".testimonial-card");
    let index = 0;

    function showNextTestimonial() {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? "block" : "none";
        });
        index = (index + 1) % testimonials.length;
    }

    showNextTestimonial();
    setInterval(showNextTestimonial, 5000);

    /*** 🔹 CONTACT FORM HANDLING FUNCTION 🔹 ***/
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
