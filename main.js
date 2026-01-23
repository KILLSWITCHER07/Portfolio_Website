// Custom Cursor
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

document.querySelectorAll('a, button, .card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

// Animate Elements on Scroll (Simple version if GSAP fails load)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .stat-item, .section-title').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add visible class logic
const style = document.createElement('style');
style.innerHTML = `
  .visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

console.log('Race Control: Systems Online');
