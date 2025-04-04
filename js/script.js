// script.js

// Web Audio API for sound effects
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Cursor Animation
const cursor = document.querySelector('.cursor');
window.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

// Light/Dark Mode Toggle with Sound
const toggle = document.getElementById('modeToggle');

// Predefined web-based sound effect
const clickSound = new Audio('https://www.soundjay.com/button/beep-07.wav'); // Sound for toggle

toggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('light-mode');
  document.body.style.background = isDark ? '#f4f4f4' : '#0d0d0d';
  document.body.style.color = isDark ? '#111' : '#e5e5e5';
  toggle.textContent = isDark ? '☀️' : '🌙';
  clickSound.play(); // Play web-based sound on toggle
});

// Animate on scroll
const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Starfield Animation
const starfield = document.createElement('div');
starfield.classList.add('starfield');
document.body.appendChild(starfield);

const createStars = () => {
  const starCount = 50;
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDuration = `${Math.random() * 10 + 5}s`; // Randomize star speed
    star.style.animationDelay = `${Math.random() * 5}s`; // Randomize star start time
    star.style.width = `${Math.random() * 3 + 1}px`;
    star.style.height = `${star.style.width}`;
    starfield.appendChild(star);
  }
};

createStars();

// Button Scroll Animation for Explore My Work
const exploreBtn = document.getElementById('exploreBtn');
const projectsSection = document.getElementById('projects');

exploreBtn.addEventListener('click', () => {
  projectsSection.classList.remove('hidden');
  window.scrollTo({
    top: projectsSection.offsetTop,
    behavior: 'smooth'
  });
});

// Loading Screen Handling
window.onload = () => {
  const loadingScreen = document.getElementById('loadingScreen');
  loadingScreen.style.display = 'none'; // Hide the loading screen when page is fully loaded
};
