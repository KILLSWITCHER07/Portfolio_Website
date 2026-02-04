// --- 1. Custom Racing Cursor ---
const cursor = document.createElement('div');
cursor.classList.add('racing-cursor');
document.body.appendChild(cursor);

const cursorStyle = document.createElement('style');
cursorStyle.innerHTML = `
  .racing-cursor {
    width: 20px;
    height: 20px;
    border: 2px solid var(--f1-red);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: width 0.2s, height 0.2s, background 0.2s;
    mix-blend-mode: difference;
  }
  .racing-cursor.active {
    width: 50px;
    height: 50px;
    background: rgba(255, 24, 1, 0.2);
    border-color: var(--neon-cyan);
  }
`;
document.head.appendChild(cursorStyle);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .card, .milestone-content').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

// --- 2. Scroll Animation Observer ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .stat-item, .section-title, .milestone-content').forEach((el) => {
    el.classList.add('scroll-animate');
    observer.observe(el);
});

const animationStyle = document.createElement('style');
animationStyle.innerHTML = `
  .scroll-animate {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  .visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(animationStyle);

// --- 3. F1 Track Telemetry (Improved Car Movement) ---
console.log('Race Control: Systems Online');

window.addEventListener('scroll', () => {
    const path = document.querySelector('#race-path');
    const car = document.querySelector('#car-marker');
    const experienceSection = document.querySelector('#experience');
    
    if (path && car && experienceSection) {
        // 1. Get exact path length
        const pathLength = path.getTotalLength();
        
        // 2. Calculate progress specifically within the experience section
        const sectionTop = experienceSection.offsetTop;
        const sectionHeight = experienceSection.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        const scrollStart = sectionTop - viewportHeight;
        let progress = (window.scrollY - scrollStart) / (sectionHeight + viewportHeight);
        
        progress = Math.max(0, Math.min(1, progress));
        
        // 3. Get exact X, Y coordinates on the track line
        const distance = pathLength * progress;
        const point = path.getPointAtLength(distance);
        
        // 4. Calculate Angle for proper nose-forward rotation
        const nextPoint = path.getPointAtLength(Math.min(pathLength, distance + 1));
        const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180 / Math.PI;
        
        // 5. Update car marker position and rotation
        if (car.tagName.toLowerCase() === 'circle') {
            car.setAttribute('cx', point.x);
            car.setAttribute('cy', point.y);
        } else {
            // translate moves the car's internal center (0,0) to the track line
            // rotation origin must be set to 'center' in CSS for this to work perfectly
            car.style.transform = `translate(${point.x}px, ${point.y}px) rotate(${angle}deg)`;
        }
    }
});