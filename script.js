
    const btn = document.getElementById('clickBtn');
    const heart = document.getElementById('heart');
    const fireworksCanvas = document.getElementById('fireworks');
    const message = document.getElementById('message');
    const boomSound = document.getElementById('boomSound');
    const fireworkSound = document.getElementById('fireworkSound');

    const ctx = fireworksCanvas.getContext('2d');
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;

    let particles = [];

    function createFireworks(x, y) {
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push({
                x, y,
                dx: (Math.random() - 0.5) * 8,
                dy: (Math.random() - 0.5) * 8,
                radius: Math.random() * 10 + 5,
                color: `hsl(${Math.random() * 360}, 100%, 60%)`,
                life: 20
            });
        }
    }

    function drawFireworks() {
        ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
        particles.forEach((p, index) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            p.x += p.dx * 0.95;
            p.y += p.dy * 0.95;
            p.radius *= 0.96;
            p.life--;
            if (p.life <= 0) particles.splice(index, 1);
        });
        if (particles.length > 0) requestAnimationFrame(drawFireworks);
    }

    btn.addEventListener('click', () => {
        btn.style.display = 'none';
        heart.classList.add('show');

        setTimeout(() => {
            boomSound.play();
            createFireworks(window.innerWidth / 2, window.innerHeight / 2);
            fireworkSound.play();
            drawFireworks();
        }, 1300);

        setTimeout(() => {
            message.classList.add('show');
        }, 2200);
    });

    window.addEventListener('resize', () => {
        fireworksCanvas.width = window.innerWidth;
        fireworksCanvas.height = window.innerHeight;
    });