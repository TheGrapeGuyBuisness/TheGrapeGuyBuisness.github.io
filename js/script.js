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
const clickSound = new Audio('assets\click sfx.wav'); // Replace with a working sound file

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

// Start Audio Button to Initialize Audio Context
const audioStartButton = document.getElementById('audioStartButton'); // Button in HTML

audioStartButton.addEventListener('click', () => {
  // Resume Audio Context after user interaction
  audioContext.resume().then(() => {
    console.log('Audio Context is resumed!');
  });

  // Play Background Music (BGM)
  const bgm = new Audio('your-music-file.mp3'); // Path to your background music file
  bgm.loop = true; // Make it loop
  bgm.volume = 0.01; // Extremely low volume for BGM

  bgm.play().then(() => {
    console.log('BGM started');
  }).catch((error) => {
    console.warn('Autoplay was blocked:', error); // Handle autoplay block in some browsers
  });

  // Play Rain Sound
  const rainSound = new Audio('https://www.soundjay.com/nature/rain-01.mp3'); // Use a different source if blocked
  rainSound.loop = true;
  rainSound.volume = 0.01; // Extremely low volume for rain sound

  rainSound.play().then(() => {
    console.log('Rain sound started');
  }).catch((error) => {
    console.warn('Rain sound autoplay was blocked:', error); // Handle autoplay block in some browsers
  });
});

// Mute Button and Volume Controller
const muteBtn = document.getElementById('muteBtn');
const volumeSlider = document.getElementById('volumeSlider');

// Mute button functionality
muteBtn.addEventListener('click', () => {
  const isMuted = bgm.muted; // Check if muted
  bgm.muted = !isMuted; // Toggle mute state
  rainSound.muted = !isMuted; // Toggle mute state for rain sound
  muteBtn.textContent = isMuted ? '🔇' : '🔊'; // Change button text
});

// Volume slider functionality
volumeSlider.addEventListener('input', () => {
  const volume = volumeSlider.value; // Get slider value (0 to 1)
  bgm.volume = volume * 0.01; // Adjust BGM volume (keep it very low)
  rainSound.volume = volume * 0.01; // Adjust rain sound volume (keep it very low)
});
