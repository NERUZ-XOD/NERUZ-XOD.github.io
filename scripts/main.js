// Game-style Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeLoadingScreen();
    initializeNavigation();
    initializeScrollEffects();
    initializeSkillBars();
    initializeGlitchEffect();
    initializeTypingEffect();
    initializeStars();
    initializeSmoothScrolling();
    initializeParticleSystem();
    initializeMouseTrail();
    initializeMatrixRain();
    initializeControlPanel();
    initializeMiniGame();
    initializeAchievementSystem();
    initializeAdvancedAnimations();
    initializeInteractiveCube();
});

// Loading Screen Animation
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.querySelector('.loading-progress');
    
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Hide loading screen after completion
            setTimeout(() => {
                document.body.classList.add('loaded');
                playWelcomeSound();
            }, 500);
        }
        progressBar.style.width = progress + '%';
    }, 200);
}

// Navigation Functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navControls = document.querySelector('.nav-controls'); // stays inline on mobile now
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Play click sound if available
            if (typeof window.playClickSound === 'function') {
                window.playClickSound();
            }
            
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            // nav-controls remain visible, no overlay toggle
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const nav = document.querySelector('nav');
        if (!nav.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            // nav-controls remain visible, no overlay toggle
        }
    });
    
    // Active navigation highlighting
    window.addEventListener('scroll', updateActiveNavigation);
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Skill Bars Animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress');
                
                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                    progressBar.classList.add('animate');
                }, Math.random() * 500);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Scroll Effects for Sections
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Trigger specific animations based on section
                const sectionId = entry.target.getAttribute('id');
                switch(sectionId) {
                    case 'about':
                        animateTerminalText();
                        break;
                    case 'skills':
                        animateSkillCards();
                        break;
                    case 'projects':
                        animateProjectCards();
                        break;
                }
            }
        });
    }, observerOptions);
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Terminal Typing Animation
function animateTerminalText() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    
    terminalLines.forEach((line, index) => {
        if (!line.classList.contains('animated')) {
            setTimeout(() => {
                line.style.opacity = '0';
                line.style.animation = `typeWriter 0.5s ease-in-out ${index * 0.3}s forwards`;
                line.classList.add('animated');
            }, 100);
        }
    });
}

// Skill Cards Animation
function animateSkillCards() {
    const skillCards = document.querySelectorAll('.skill-category');
    
    skillCards.forEach((card, index) => {
        if (!card.classList.contains('animated')) {
            setTimeout(() => {
                card.style.transform = 'translateY(0)';
                card.style.opacity = '1';
                card.classList.add('animated');
            }, index * 200);
        }
    });
}

// Project Cards Animation
function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        if (!card.classList.contains('animated')) {
            setTimeout(() => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.opacity = '1';
                card.classList.add('animated');
            }, index * 150);
        }
    });
}

// Glitch Effect for Hero Text
function initializeGlitchEffect() {
    const glitchText = document.querySelector('.glitch-text');
    if (!glitchText) return;
    
    setInterval(() => {
        if (Math.random() > 0.7) {
            glitchText.classList.add('glitch-active');
            setTimeout(() => {
                glitchText.classList.remove('glitch-active');
            }, 200);
        }
    }, 3000);
}

// Dynamic Stars Background
function initializeStars() {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;
    
    // Create additional stars
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: #00d4ff;
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: twinkle ${Math.random() * 3 + 1}s infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        starsContainer.appendChild(star);
    }
}

// Typing Effect for Dynamic Text
function initializeTypingEffect() {
    const typewriterElements = document.querySelectorAll('[data-typewriter]');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid #00ff41';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, 100);
    });
}

// Sound Effects (Web Audio API)
function playWelcomeSound() {
    // Create a simple beep sound for retro feel
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
}

// Button Click Effects
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('pixel-btn') || 
        e.target.classList.contains('project-link') || 
        e.target.classList.contains('contact-link')) {
        
        // Add click ripple effect
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(0, 255, 65, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = e.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        
        e.target.style.position = 'relative';
        e.target.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-section');
    const stars = document.querySelector('.stars');
    
    if (parallax && stars) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
        stars.style.transform = `translateY(${speed * 0.3}px)`;
    }
});

// Easter Eggs and Interactive Elements
document.addEventListener('keydown', function(e) {
    // Konami Code: ↑↑↓↓←→←→BA
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    if (!window.konamiSequence) window.konamiSequence = [];
    
    window.konamiSequence.push(e.code);
    
    if (window.konamiSequence.length > konamiCode.length) {
        window.konamiSequence.shift();
    }
    
    if (window.konamiSequence.join(',') === konamiCode.join(',')) {
        activateEasterEgg();
        window.konamiSequence = [];
    }
});

function activateEasterEgg() {
    // Rainbow colors for the entire page
    document.body.style.animation = 'rainbow 2s infinite';
    
    // Unlock achievement
    unlockAchievement('konami-master');
    
    // Show a fun message
    const message = document.createElement('div');
    message.innerHTML = '🎮 CHEAT CODE ACTIVATED! 🎮<br>You found the secret! 🌈<br>Achievement Unlocked!';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: #00ff41;
        padding: 2rem;
        border: 3px solid #00ff41;
        text-align: center;
        font-family: 'Press Start 2P', monospace;
        z-index: 10000;
        animation: bounce 1s ease-in-out infinite;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
        document.body.style.animation = '';
    }, 3000);
}

// Performance Monitoring
function initializePerformanceMonitoring() {
    // Monitor loading times
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`🎮 Portfolio loaded in ${loadTime}ms`);
    });
    
    // Monitor scroll performance
    let ticking = false;
    
    function updateScrollPerformance() {
        // Optimized scroll handling
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollPerformance);
            ticking = true;
        }
    });
}

// Initialize performance monitoring
initializePerformanceMonitoring();

// Particle System for Interactive Effects
function initializeParticleSystem() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 4;
            this.vy = (Math.random() - 0.5) * 4;
            this.life = 1;
            this.decay = Math.random() * 0.02 + 0.005;
            this.size = Math.random() * 3 + 1;
            this.color = ['#00ff41', '#00d4ff', '#b084ff', '#ff1493'][Math.floor(Math.random() * 4)];
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life -= this.decay;
            this.size *= 0.995;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.life;
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 20;
            ctx.shadowColor = this.color;
            ctx.fillRect(this.x, this.y, this.size, this.size);
            ctx.restore();
        }
    }
    
    function createParticle(x, y) {
        particles.push(new Particle(x, y));
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];
            particle.update();
            particle.draw();
            
            if (particle.life <= 0) {
                particles.splice(i, 1);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Create particles on click
    document.addEventListener('click', (e) => {
        for (let i = 0; i < 15; i++) {
            createParticle(e.clientX, e.clientY);
        }
    });
    
    // Random ambient particles
    setInterval(() => {
        if (particles.length < 50) {
            createParticle(
                Math.random() * canvas.width,
                Math.random() * canvas.height
            );
        }
    }, 500);
}

// Mouse Trail Effect
function initializeMouseTrail() {
    const trail = [];
    const maxTrailLength = 20;
    
    document.addEventListener('mousemove', (e) => {
        trail.push({
            x: e.clientX,
            y: e.clientY,
            time: Date.now()
        });
        
        // Remove old trail points
        while (trail.length > maxTrailLength) {
            trail.shift();
        }
        
        // Create trail elements
        const trailElement = document.createElement('div');
        trailElement.className = 'mouse-trail';
        trailElement.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: #00ff41;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            left: ${e.clientX - 4}px;
            top: ${e.clientY - 4}px;
            box-shadow: 0 0 10px #00ff41;
            animation: trailFade 0.5s ease-out forwards;
        `;
        
        document.body.appendChild(trailElement);
        
        setTimeout(() => {
            trailElement.remove();
        }, 500);
    });
}

// Matrix Rain Effect
function initializeMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        opacity: 0.1;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const drops = [];
    
    for (let i = 0; i < canvas.width / 20; i++) {
        drops[i] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = '15px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * 20, drops[i] * 20);
            
            if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 50);
}

// Unified Navbar Control System
function initializeControlPanel() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let soundEnabled = true; // Start with sound enabled
    let crtActive = false;
    
    // Get navbar control elements
    const achievementBtn = document.querySelector('.achievement-btn');
    const soundBtn = document.querySelector('.sound-btn');
    const crtBtn = document.querySelector('.crt-btn');
    const themeDropdown = document.querySelector('.theme-dropdown');
    const themeBtn = document.querySelector('.theme-btn');
    const themeOptions = document.querySelectorAll('.theme-option');
    
    // Set initial sound icon to show it's enabled
    if (soundBtn) {
        const icon = soundBtn.querySelector('.nav-control-icon');
        if (icon) {
            icon.textContent = '🔊'; // Show sound is on
        }
    }
    
    // Sound functionality
    soundBtn.addEventListener('click', async () => {
        // Ensure audio context is resumed (required by modern browsers)
        if (audioContext.state === 'suspended') {
            await audioContext.resume();
        }
        
        soundEnabled = !soundEnabled;
        const icon = soundBtn.querySelector('.nav-control-icon');
        icon.textContent = soundEnabled ? '🔊' : '🔇';
        
        if (soundEnabled) {
            playAmbientSound();
        }
    });
    
    // CRT functionality
    crtBtn.addEventListener('click', () => {
        crtActive = !crtActive;
        
        if (crtActive) {
            document.body.classList.add('crt-effect');
        } else {
            document.body.classList.remove('crt-effect');
        }
    });
    
    // Achievement panel functionality
    achievementBtn.addEventListener('click', () => {
        showAchievementModal();
    });
    
    // Theme functionality
    const themes = {
        classic: {
            primary: '#00ff41',
            secondary: '#00d4ff',
            accent: '#b084ff',
            highlight: '#ff1493'
        },
        cyberpunk: {
            primary: '#ff0080',
            secondary: '#00ffff',
            accent: '#ffff00',
            highlight: '#ff8000'
        },
        terminal: {
            primary: '#00ff00',
            secondary: '#ffffff',
            accent: '#ffff00',
            highlight: '#ff0000'
        },
        synthwave: {
            primary: '#ff006e',
            secondary: '#8338ec',
            accent: '#3a86ff',
            highlight: '#ffbe0b'
        }
    };
    
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const themeName = option.getAttribute('data-theme');
            if (themes[themeName]) {
                applyTheme(themes[themeName]);
                // Achievement for changing theme
                if (typeof unlockAchievement === 'function') {
                    unlockAchievement('theme-switcher');
                }
                // Close dropdown
                themeDropdown.classList.remove('open');
            }
        });
    });
    
    // Theme dropdown functionality
    themeBtn.addEventListener('click', () => {
        themeDropdown.classList.toggle('open');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!themeDropdown.contains(e.target)) {
            themeDropdown.classList.remove('open');
        }
    });
    
    // Sound creation functions
    async function createTone(frequency, duration, type = 'sine') {
        if (!soundEnabled) return;
        
        // Ensure audio context is running
        if (audioContext.state === 'suspended') {
            await audioContext.resume();
        }
        
        try {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.type = type;
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        } catch (error) {
            console.log('Audio playback failed:', error);
        }
    }
    
    function playWelcomeSound() {
        createTone(440, 0.2);
        setTimeout(() => createTone(554, 0.2), 200);
        setTimeout(() => createTone(659, 0.3), 400);
    }
    
    function playClickSound() {
        createTone(800, 0.1, 'square');
    }
    
    function playAmbientSound() {
        // Subtle ambient tone
        createTone(220, 2, 'sine');
    }
    
    // Expose functions globally
    window.playWelcomeSound = playWelcomeSound;
    window.playClickSound = playClickSound;
    
    // Add sound effects to interactive elements
    document.addEventListener('click', (e) => {
        if (soundEnabled && (
            e.target.classList.contains('pixel-btn') || 
            e.target.classList.contains('project-link') || 
            e.target.classList.contains('contact-link') ||
            e.target.classList.contains('nav-link') ||
            e.target.closest('.achievement-btn') ||
            e.target.closest('.sound-btn') ||
            e.target.closest('.crt-btn') ||
            e.target.closest('.theme-btn')
        )) {
            playClickSound();
        }
    });
    
    // Navigation hover sounds
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            if (soundEnabled) {
                createTone(600, 0.05, 'triangle');
            }
        });
    });
    
    function applyTheme(theme) {
        const root = document.documentElement;
        root.style.setProperty('--neon-green', theme.primary);
        root.style.setProperty('--neon-blue', theme.secondary);
        root.style.setProperty('--neon-purple', theme.accent);
        root.style.setProperty('--neon-pink', theme.highlight);
    }
    
    function showAchievementModal() {
        // This will be called by the achievement system
        if (typeof window.showAchievements === 'function') {
            window.showAchievements();
        }
    }
}



// Theme Switcher
function initializeThemeSwitcher() {
    const themes = {
        classic: {
            primary: '#00ff41',
            secondary: '#00d4ff',
            accent: '#b084ff',
            highlight: '#ff1493'
        },
        cyberpunk: {
            primary: '#ff0080',
            secondary: '#00ffff',
            accent: '#ffff00',
            highlight: '#ff8000'
        },
        terminal: {
            primary: '#00ff00',
            secondary: '#ffffff',
            accent: '#ffff00',
            highlight: '#ff0000'
        },
        synthwave: {
            primary: '#ff006e',
            secondary: '#8338ec',
            accent: '#3a86ff',
            highlight: '#ffbe0b'
        }
    };
    
    // Get theme options container from control panel
    const controlPanelElements = initializeControlPanel();
    const themeOptions = controlPanelElements.themeOptions;
    
    Object.keys(themes).forEach(themeName => {
        const themeOption = document.createElement('button');
        themeOption.className = 'theme-option';
        themeOption.textContent = themeName.toUpperCase();
        
        themeOption.addEventListener('click', () => {
            applyTheme(themes[themeName]);
            // Achievement for changing theme
            if (typeof unlockAchievement === 'function') {
                unlockAchievement('theme-switcher');
            }
            // Close dropdown
            document.querySelector('.theme-dropdown').classList.remove('open');
            document.querySelector('.control-panel').classList.remove('expanded');
        });
        
        themeOptions.appendChild(themeOption);
    });    function applyTheme(theme) {
        const root = document.documentElement;
        root.style.setProperty('--neon-green', theme.primary);
        root.style.setProperty('--neon-blue', theme.secondary);
        root.style.setProperty('--neon-purple', theme.accent);
        root.style.setProperty('--neon-pink', theme.highlight);
    }
}

// CRT Monitor Effect
function initializeCRTEffect() {
    // Get CRT toggle from control panel
    const crtToggle = document.querySelector('.crt-toggle');
    
    let crtActive = false;
    
    crtToggle.addEventListener('click', () => {
        crtActive = !crtActive;
        
        if (crtActive) {
            document.body.classList.add('crt-effect');
        } else {
            document.body.classList.remove('crt-effect');
        }
    });
}

// Mini Snake Game with Enhanced UI
function initializeMiniGame() {
    const miniGameBtn = document.getElementById('mini-game-btn');
    const miniGameSection = document.getElementById('mini-game');
    const closeGameBtn = document.getElementById('close-game');
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('game-score');
    const bestScoreElement = document.getElementById('best-score');
    
    let snake = [{x: 200, y: 200}];
    let food = {x: 0, y: 0};
    let dx = 0, dy = 0;
    let nextDx = 0, nextDy = 0;
    let score = 0;
    let bestScore = 0;
    let gameRunning = false;
    let gameStarted = false;
    let gameOverlay = null;
    
    // Game states: 'start', 'playing', 'gameover'
    let gameState = 'start';
    
    // Load best score from localStorage
    const savedBestScore = localStorage.getItem('snake-best-score');
    if (savedBestScore) {
        bestScore = parseInt(savedBestScore);
        bestScoreElement.textContent = bestScore;
    }
    
    function saveBestScore() {
        localStorage.setItem('snake-best-score', bestScore.toString());
    }
    
    function generateFood() {
        let newFood;
        do {
            newFood = {
                x: Math.floor(Math.random() * 20) * 20,
                y: Math.floor(Math.random() * 20) * 20
            };
        } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        
        food.x = newFood.x;
        food.y = newFood.y;
    }
    
    function drawPixel(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 20, 20);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(x, y, 20, 20);
    }
    
    function createOverlay(type, data = {}) {
        console.log('Creating overlay of type:', type);
        
        // Remove existing overlay
        if (gameOverlay) {
            gameOverlay.remove();
        }
        
        gameOverlay = document.createElement('div');
        gameOverlay.className = 'game-overlay';
        
        if (type === 'start') {
            gameOverlay.innerHTML = `
                <h3>🐍 PIXEL SNAKE 🐍</h3>
                <div class="score-display">Best Score: ${bestScore}</div>
                <div style="margin: 1rem 0; color: var(--text-secondary); font-size: 0.7rem;">
                    Use WASD/Arrow Keys or Swipe to control
                </div>
                <button class="game-overlay-btn" onclick="window.startGame()">START GAME</button>
            `;
        } else if (type === 'gameover') {
            const isNewBest = data.isNewBest || false;
            gameOverlay.innerHTML = `
                <h3>🎮 GAME OVER! 🎮</h3>
                ${isNewBest ? '<div class="new-best">🏆 NEW BEST SCORE! 🏆</div>' : ''}
                <div class="score-display">Final Score: ${score}</div>
                <div class="best-score-display">Best Score: ${bestScore}</div>
                <button class="game-overlay-btn" onclick="window.startGame()">RESTART GAME</button>
            `;
        }
        
        // Position overlay relative to canvas
        const canvasContainer = canvas.parentNode;
        canvasContainer.style.position = 'relative';
        canvasContainer.appendChild(gameOverlay);
        
        console.log('Overlay created and added to DOM');
    }
    
    function hideOverlay() {
        if (gameOverlay) {
            gameOverlay.remove();
            gameOverlay = null;
        }
    }
    
    function gameLoop() {
        if (!gameRunning) {
            console.log('Game loop stopped - gameRunning is false');
            return;
        }
        
        console.log('Game loop iteration - dx:', dx, 'dy:', dy, 'snake head:', snake[0]);
        
        // Apply queued direction change (prevents rapid direction reversals)
        if (nextDx !== 0 || nextDy !== 0) {
            // Only apply if it's not a reversal
            if ((nextDx !== 0 && nextDx !== -dx) || (nextDy !== 0 && nextDy !== -dy)) {
                dx = nextDx;
                dy = nextDy;
                console.log('Direction changed to dx:', dx, 'dy:', dy);
            }
            nextDx = 0;
            nextDy = 0;
        }
        
        // Move snake
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        console.log('New head position:', head);
        
        // Check wall collision
        if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400) {
            console.log('Wall collision detected');
            gameOver();
            return;
        }
        
        // Check self collision
        if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            console.log('Self collision detected');
            gameOver();
            return;
        }
        
        snake.unshift(head);
        
        // Check food collision
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            scoreElement.textContent = score;
            generateFood();
            // Ensure new food doesn't spawn on snake after growing
            while (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
                generateFood();
            }
            if (typeof unlockAchievement === 'function') {
                unlockAchievement('food-collector');
            }
        } else {
            snake.pop();
        }
        
        // Draw game
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, 400, 400);
        
        // Draw snake
        snake.forEach((segment, index) => {
            const color = index === 0 ? '#00ff41' : '#00d4ff';
            drawPixel(segment.x, segment.y, color);
        });
        
        // Draw food
        drawPixel(food.x, food.y, '#ff1493');
        
        setTimeout(gameLoop, 150);
    }
    
    function gameOver() {
        gameRunning = false;
        gameState = 'gameover';
        
        // Check and update best score
        let isNewBest = false;
        if (score > bestScore) {
            bestScore = score;
            bestScoreElement.textContent = bestScore;
            saveBestScore();
            isNewBest = true;
        }
        
        if (score >= 50) unlockAchievement('snake-master');
        
        // Show game over overlay
        setTimeout(() => {
            createOverlay('gameover', { isNewBest });
        }, 500);
    }
    
    // Make startGame globally accessible for overlay buttons
    window.startGame = function() {
        console.log('Starting Snake game...');
        
        hideOverlay();
        
        // Clear canvas
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, 400, 400);
        
        // Reset game state
        snake = [{x: 200, y: 200}];
        dx = 20; // Start moving right automatically
        dy = 0;
        nextDx = 0;
        nextDy = 0;
        score = 0;
        scoreElement.textContent = score;
        generateFood();
        gameRunning = true;
        gameStarted = true;
        gameState = 'playing';
        
        console.log('Game state reset. Snake:', snake, 'Food:', food, 'Direction:', {dx, dy});
        
        // Draw initial state
        drawPixel(snake[0].x, snake[0].y, '#00ff41');
        drawPixel(food.x, food.y, '#ff1493');
        
        console.log('Starting game loop...');
        gameLoop();
    }
    
    function initializeGame() {
        console.log('Initializing Snake game...');
        
        // Clear canvas and show start overlay
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, 400, 400);
        
        console.log('Creating start overlay...');
        createOverlay('start');
    }
    
    miniGameBtn.addEventListener('click', () => {
        miniGameSection.style.display = 'block';
        miniGameSection.scrollIntoView({ behavior: 'smooth' });
        if (!gameStarted) {
            initializeGame();
        }
    });
    
    closeGameBtn.addEventListener('click', () => {
        miniGameSection.style.display = 'none';
        gameRunning = false;
        hideOverlay();
        gameState = 'start';
        gameStarted = false;
    });
    
    // Game controls - keyboard with direction queue to prevent reversals
    document.addEventListener('keydown', (e) => {
        console.log('Key pressed:', e.key, 'Game running:', gameRunning, 'Game state:', gameState);
        
        if (!gameRunning || gameState !== 'playing') {
            console.log('Ignoring key press - game not in playing state');
            return;
        }
        
        let keyHandled = false;
        
        switch(e.key.toLowerCase()) {
            case 'w':
            case 'arrowup':
                e.preventDefault();
                if (dy !== 20) { 
                    nextDx = 0; 
                    nextDy = -20; 
                    keyHandled = true;
                    console.log('UP key pressed - queued direction change');
                }
                break;
            case 's':
            case 'arrowdown':
                e.preventDefault();
                if (dy !== -20) { 
                    nextDx = 0; 
                    nextDy = 20; 
                    keyHandled = true;
                    console.log('DOWN key pressed - queued direction change');
                }
                break;
            case 'a':
            case 'arrowleft':
                e.preventDefault();
                if (dx !== 20) { 
                    nextDx = -20; 
                    nextDy = 0; 
                    keyHandled = true;
                    console.log('LEFT key pressed - queued direction change');
                }
                break;
            case 'd':
            case 'arrowright':
                e.preventDefault();
                if (dx !== -20) { 
                    nextDx = 20; 
                    nextDy = 0; 
                    keyHandled = true;
                    console.log('RIGHT key pressed - queued direction change');
                }
                break;
        }
        
        if (keyHandled) {
            console.log('New queued direction - nextDx:', nextDx, 'nextDy:', nextDy);
        }
    });
    
    // Mobile touch controls
    let touchStartX = 0;
    let touchStartY = 0;
    
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
    }, { passive: false });
    
    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        if (!gameRunning || gameState !== 'playing') return;
        
        const touch = e.changedTouches[0];
        const touchEndX = touch.clientX;
        const touchEndY = touch.clientY;
        
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        const minSwipeDistance = 30;
        
        // Determine swipe direction and queue it
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            if (Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0 && dx !== -20) {
                    // Swipe right - can't go right if moving left
                    nextDx = 20; nextDy = 0;
                } else if (deltaX < 0 && dx !== 20) {
                    // Swipe left - can't go left if moving right
                    nextDx = -20; nextDy = 0;
                }
            }
        } else {
            // Vertical swipe
            if (Math.abs(deltaY) > minSwipeDistance) {
                if (deltaY > 0 && dy !== -20) {
                    // Swipe down - can't go down if moving up
                    nextDx = 0; nextDy = 20;
                } else if (deltaY < 0 && dy !== 20) {
                    // Swipe up - can't go up if moving down
                    nextDx = 0; nextDy = -20;
                }
            }
        }
    }, { passive: false });
    
    // Initialize the game display
    initializeGame();
}

// Achievement System
function initializeAchievementSystem() {
    const achievements = {
        'first-visit': { name: 'Welcome!', description: 'Visited the portfolio', unlocked: false },
        'explorer': { name: 'Explorer', description: 'Visited all sections', unlocked: false },
        'konami-master': { name: 'Konami Master', description: 'Used the Konami code', unlocked: false },
        'theme-switcher': { name: 'Style Master', description: 'Changed the theme', unlocked: false },
        'food-collector': { name: 'Food Collector', description: 'Ate food in Snake game', unlocked: false },
        'snake-master': { name: 'Snake Master', description: 'Scored 50+ in Snake game', unlocked: false },
        'cube-explorer': { name: 'Cube Explorer', description: 'Interacted with the 3D cube 10 times', unlocked: false },
        'cube-master': { name: 'Cube Master', description: 'Found the cube reset feature', unlocked: false }
    };
    
    // Load achievements from localStorage
    const savedAchievements = localStorage.getItem('portfolio-achievements');
    if (savedAchievements) {
        Object.assign(achievements, JSON.parse(savedAchievements));
    }

    // Migration: remove deprecated 'sound-lover' achievement if it exists from older data
    if (achievements['sound-lover']) {
        delete achievements['sound-lover'];
        try { localStorage.setItem('portfolio-achievements', JSON.stringify(achievements)); } catch (e) {}
    }
    
    function saveAchievements() {
        localStorage.setItem('portfolio-achievements', JSON.stringify(achievements));
    }
    
    function showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-icon">🏆</div>
            <div class="achievement-text">
                <div class="achievement-title">Achievement Unlocked!</div>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-desc">${achievement.description}</div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideUp 0.5s ease-out';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }
    
    window.unlockAchievement = function(achievementId) {
        if (achievements[achievementId] && !achievements[achievementId].unlocked) {
            achievements[achievementId].unlocked = true;
            saveAchievements();
            showAchievementNotification(achievements[achievementId]);
        }
    };
    
    // Auto-unlock first visit achievement
    setTimeout(() => {
        unlockAchievement('first-visit');
    }, 2000);
    
    // Track section visits for explorer achievement
    let visitedSections = new Set();
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    
    function checkExplorerAchievement() {
        if (visitedSections.size >= sections.length) {
            unlockAchievement('explorer');
        }
    }
    
    // Track scroll for section visits
    window.addEventListener('scroll', () => {
        const sectionElements = document.querySelectorAll('section[id]');
        sectionElements.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                visitedSections.add(section.id);
                checkExplorerAchievement();
            }
        });
    });
    
    // Make showAchievements function available globally
    window.showAchievements = function() {
        const modal = document.createElement('div');
        modal.className = 'achievement-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>ACHIEVEMENTS</h3>
                <div class="achievements-list">
                    ${Object.entries(achievements).map(([id, achievement]) => `
                        <div class="achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}">
                            <span class="achievement-icon">${achievement.unlocked ? '🏆' : '🔒'}</span>
                            <div>
                                <div class="achievement-name">${achievement.name}</div>
                                <div class="achievement-desc">${achievement.description}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button class="close-modal pixel-btn">CLOSE</button>
            </div>
        `;
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10001;
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    };
    
    // Trigger first visit achievement
    setTimeout(() => unlockAchievement('first-visit'), 2000);
    
    // Track section visits
    const sectionsVisited = new Set();
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                sectionsVisited.add(entry.target.id);
                if (sectionsVisited.size >= 4) {
                    unlockAchievement('explorer');
                }
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('section[id]').forEach(section => {
        observer.observe(section);
    });
}

// Advanced Animations
function initializeAdvancedAnimations() {
    // Floating elements
    const floatingElements = document.querySelectorAll('.floating');
    floatingElements.forEach(element => {
        element.style.animationDelay = Math.random() * 2 + 's';
    });
    
    // Parallax scrolling for multiple elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax backgrounds
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
        
        // Skill bars animation trigger on scroll
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                if (!bar.classList.contains('animated')) {
                    const progress = bar.getAttribute('data-progress');
                    setTimeout(() => {
                        bar.style.width = progress + '%';
                        bar.classList.add('animated');
                    }, Math.random() * 500);
                }
            }
        });
    });
    
    // Text reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const textRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('text-reveal-active');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('h2, h3, p').forEach(element => {
        element.classList.add('text-reveal');
        textRevealObserver.observe(element);
    });
}

// Additional CSS animations via JavaScript
const additionalStyles = `
    @keyframes typeWriter {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    .skill-category,
    .project-card {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.6s ease;
    }
    
    .skill-category.animated,
    .project-card.animated {
        opacity: 1;
        transform: translateY(0);
    }
    
    .glitch-active {
        animation: glitch 0.2s ease-in-out 3;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Console Easter Egg
console.log(`
🎮 Welcome to the Pixel Portfolio Console! 🎮

Available commands:
- portfolio.about() - Learn more about the developer
- portfolio.skills() - View technical skills
- portfolio.projects() - See amazing projects
- portfolio.contact() - Get in touch
- portfolio.konami() - Activate secret mode

Type any command to explore!
`);

// Console API for fun interactions
window.portfolio = {
    about: () => console.log('👋 Hey! I\'m Neeraj M, a Class 12 student at Kendriya Vidyalaya Kollam with big dreams and AI collaboration passion!'),
    skills: () => console.log('💻 Python, Tkinter, HTML, CSS, JS, and growing every day with AI help!'),
    projects: () => console.log('🚀 Built an epic AI-powered 2048 game and working on a CLI Life-RPG system!'),
    contact: () => console.log('� Find me on GitHub: NERUZ-XOD | Twitter: @neerajm_dev | LinkedIn: neerajm2007'),
    konami: () => activateEasterEgg()
};

// Interactive 3D Cube System
function initializeInteractiveCube() {
    console.log('🔍 Cube initialization started...');
    const cube = document.getElementById('interactive-cube');
    console.log('🎲 Cube element found:', cube);
    if (!cube) {
        console.error('❌ Cube element not found!');
        return;
    }
    
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotation = { x: 0, y: 0 };
    let scale = 1;
    
    // Physics properties for realistic spinning
    let velocity = { x: 0, y: 0 };
    let lastMouseDelta = { x: 0, y: 0 };
    const friction = 0.95; // How quickly spinning slows down
    const maxVelocity = 15; // Maximum spin speed
    
    console.log('⚙️ Physics variables initialized:', { velocity, friction, maxVelocity });
    
    // Gentle floating animation (no auto-rotation)
    let floatTime = 0;
    function animate() {
        floatTime += 0.02;
        
        if (!isDragging) {
            // Apply physics-based momentum when spinning
            if (Math.abs(velocity.x) > 0.1 || Math.abs(velocity.y) > 0.1) {
                rotation.x += velocity.x;
                rotation.y += velocity.y;
                
                // Apply friction to slow down spinning
                velocity.x *= friction;
                velocity.y *= friction;
                
                // Stop very small velocities
                if (Math.abs(velocity.x) < 0.1) velocity.x = 0;
                if (Math.abs(velocity.y) < 0.1) velocity.y = 0;
            }
        }
        
        // No clamping - allow free rotation in all directions!
        
        // Apply gentle floating effect (only when not being dragged or spinning)
        let floatOffset = 0;
        if (!isDragging && Math.abs(velocity.x) < 0.1 && Math.abs(velocity.y) < 0.1) {
            floatOffset = Math.sin(floatTime) * 3; // Gentle up/down floating
        }
        
        cube.style.transform = `
            rotateX(${rotation.x}deg) 
            rotateY(${rotation.y}deg) 
            scale(${scale})
            translateY(${floatOffset}px)
        `;
        
        requestAnimationFrame(animate);
    }
    // Mouse events for desktop with physics
    cube.addEventListener('mousedown', (e) => {
        console.log('🖱️ Mouse down detected!');
        isDragging = true;
        velocity = { x: 0, y: 0 }; // Stop any existing momentum
        previousMousePosition = { x: e.clientX, y: e.clientY };
        cube.style.cursor = 'grabbing';
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        console.log('🖱️ Mouse move detected!');
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        
        // Apply immediate rotation (fixed direction)
        rotation.y += deltaX * 0.8;
        rotation.x += deltaY * 0.8; // Changed from -= to += for natural direction
        
        // Store velocity for momentum when mouse is released
        lastMouseDelta = { x: deltaY * 0.2, y: deltaX * 0.2 }; // Fixed signs
        
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });
    
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            cube.style.cursor = 'grab';
            
            // Apply momentum from the last mouse movement
            velocity.x = Math.max(-maxVelocity, Math.min(maxVelocity, lastMouseDelta.x));
            velocity.y = Math.max(-maxVelocity, Math.min(maxVelocity, lastMouseDelta.y));
        }
    });
    
    // Touch events for mobile with physics
    cube.addEventListener('touchstart', (e) => {
        console.log('👆 Touch start detected!');
        isDragging = true;
        velocity = { x: 0, y: 0 };
        const touch = e.touches[0];
        previousMousePosition = { x: touch.clientX, y: touch.clientY };
        e.preventDefault();
    }, { passive: false });
    
    cube.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        console.log('👆 Touch move detected!');
        const touch = e.touches[0];
        const deltaX = touch.clientX - previousMousePosition.x;
        const deltaY = touch.clientY - previousMousePosition.y;
        
        rotation.y += deltaX * 0.8;
        rotation.x += deltaY * 0.8; // Fixed direction for touch too
        
        lastMouseDelta = { x: deltaY * 0.2, y: deltaX * 0.2 }; // Fixed signs
        
        previousMousePosition = { x: touch.clientX, y: touch.clientY };
        e.preventDefault();
    }, { passive: false });
    
    cube.addEventListener('touchend', () => {
        if (isDragging) {
            isDragging = false;
            
            // Apply momentum from the last touch movement
            velocity.x = Math.max(-maxVelocity, Math.min(maxVelocity, lastMouseDelta.x));
            velocity.y = Math.max(-maxVelocity, Math.min(maxVelocity, lastMouseDelta.y));
        }
    });
    
    // Mouse wheel for zoom
    cube.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        const zoomSpeed = 0.1;
        const delta = e.deltaY > 0 ? -zoomSpeed : zoomSpeed;
        
        scale += delta;
        scale = Math.max(0.5, Math.min(2, scale)); // Clamp between 0.5x and 2x
    }, { passive: false });
    
    // Keyboard controls for accessibility with physics
    cube.addEventListener('keydown', (e) => {
        if (!cube.matches(':focus')) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                velocity.y = -10; // Spin left
                e.preventDefault();
                break;
            case 'ArrowRight':
                velocity.y = 10; // Spin right
                e.preventDefault();
                break;
            case 'ArrowUp':
                velocity.x = -10; // Rotate up (natural direction)
                e.preventDefault();
                break;
            case 'ArrowDown':
                velocity.x = 10; // Rotate down (natural direction)
                e.preventDefault();
                break;
            case 'r':
            case 'R':
                // Reset rotation, scale, and velocity
                rotation = { x: 0, y: 0 };
                velocity = { x: 0, y: 0 };
                scale = 1;
                e.preventDefault();
                break;
            case ' ':
                // Stop all movement
                velocity = { x: 0, y: 0 };
                e.preventDefault();
                break;
        }
    });
    
    // Make cube focusable for keyboard controls
    cube.setAttribute('tabindex', '0');
    
    // Double-click to reset with spin effect
    cube.addEventListener('dblclick', () => {
        // Give it a nice spin before resetting
        velocity.y = 12;
        
        setTimeout(() => {
            rotation = { x: 0, y: 0 };
            velocity = { x: 0, y: 0 };
            scale = 1;
        }, 800);
        
        // Achievement for finding the reset feature
        if (typeof unlockAchievement === 'function') {
            unlockAchievement('cube-master');
        }
    });
    
    // Hover effects with sound
    const cubeFaces = cube.querySelectorAll('.cube-face');
    cubeFaces.forEach(face => {
        face.addEventListener('mouseenter', () => {
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                if (audioContext.state !== 'suspended') {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
                    oscillator.type = 'sine';
                    
                    gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
                    
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.1);
                }
            } catch (error) {
                // Silently fail if audio doesn't work
            }
        });
    });
    
    // Achievement for interacting with cube
    let interactionCount = 0;
    const trackInteraction = () => {
        interactionCount++;
        if (interactionCount >= 10 && typeof unlockAchievement === 'function') {
            unlockAchievement('cube-explorer');
        }
    };
    
    cube.addEventListener('mousedown', trackInteraction);
    cube.addEventListener('touchstart', trackInteraction);
    
    // Start the animation loop
    animate();
    
    // Start the animation loop
    animate();
    
    console.log('🎲 Interactive 3D Cube with Physics and Floating Effect initialized! Drag it around!');
}
