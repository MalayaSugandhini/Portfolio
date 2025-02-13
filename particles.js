document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("particle-canvas");
    if (!canvas) return; // Ensure canvas exists

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];

    class Particle {
        constructor(x, y, size, color, speedX, speedY) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
            this.speedX = speedX;
            this.speedY = speedY;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.1;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < 100; i++) {
            let size = Math.random() * 5 + 1;
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let speedX = (Math.random() - 0.5) * 2;
            let speedY = (Math.random() - 0.5) * 2;
            let colorOptions = ["rgba(255, 255, 255, 0.8)", "rgba(0, 255, 200, 0.8)", "rgba(255, 0, 150, 0.8)"];
            let color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
            particlesArray.push(new Particle(x, y, size, color, speedX, speedY));
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });
});
