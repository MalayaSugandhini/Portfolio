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
    const ctx = document.getElementById("skills-chart").getContext("2d");
    
    const skillsData = {
        labels: ["Frontend", "Backend", "Cloud & DevOps", "Databases"],
        datasets: [{
            label: "Proficiency Level",
            data: [90, 85, 80, 75],
            backgroundColor: "rgba(0, 255, 200, 0.2)",
            borderColor: "#00ffc8",
            borderWidth: 2,
            pointBackgroundColor: "#00ffc8"
        }]
    };
    
    new Chart(ctx, {
        type: "radar",
        data: skillsData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    grid: { color: "rgba(255, 255, 255, 0.2)" },
                    angleLines: { color: "rgba(255, 255, 255, 0.2)" },
                    pointLabels: { color: "#ffffff" }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
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