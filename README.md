# � Interactive 3D Cube Portfolio

A unique, retro gaming-themed portfolio website featuring an **interactive 3D cube with realistic physics** - perfect for young developers who want to stand out!

## ✨ Key Features

### � Interactive 3D Cube
- **Physics-based rotation** with momentum and friction
- **Drag to spin** in any direction with natural movement
- **Momentum system** - release for realistic spinning
- **360° freedom** - no rotation constraints
- **Gentle floating animation** when idle
- **Touch and mouse support**
- **Keyboard controls** (arrow keys, R to reset, spacebar to stop)
- **Double-click reset** with satisfying spin animation

### 🎨 Retro Gaming Aesthetics
- **Neon green color scheme** with authentic 8-bit vibes
- **Press Start 2P font** for that classic arcade feel
- **Enhanced navbar** with smooth hover effects and glow
- **Snake mini-game** for interactive entertainment
- **Achievement system** with unlockable badges
- **Particle effects** and animated backgrounds
- **Mobile-responsive design**

### 🛠️ Technical Excellence
- **Pure HTML, CSS, and JavaScript** (no frameworks)
- **Advanced 3D CSS transforms** with preserve-3d
- **Physics calculations** with velocity and friction
- **Touch event handling** for mobile devices
- **Intersection Observer API** for scroll effects
- **Web Audio API** for retro sound effects
- **Achievement tracking** with localStorage
- **Performance optimized** with requestAnimationFrame

## 🚀 Live Demo

Visit the live portfolio: [Your Netlify URL here]

## 📁 Project Structure

```
portfolio-website/
├── index.html              # Main portfolio page
├── styles/
│   └── main.css           # All styling including 3D cube effects
├── scripts/
│   └── main.js            # Interactive functionality and physics
├── .github/
│   └── copilot-instructions.md
└── README.md              # This file
```

## 🎯 Getting Started

### Prerequisites
- Any modern web browser
- No additional dependencies required!

### Local Development
1. **Clone the repository**
   ```bash
   git clone https://github.com/NERUZ-XOD/PORTFOLIO-WEBSITE.git
   cd PORTFOLIO-WEBSITE
   ```

2. **Open in browser**
   ```bash
   # Using Python (if installed)
   python -m http.server 8000
   
   # Or simply open index.html in your browser
   ```

3. **Start customizing** with your personal information!

## 🎮 How to Use the Interactive Cube

### Mouse/Touch Controls
- **Drag** to rotate the cube in any direction
- **Release** to let momentum carry the rotation
- **Scroll** over cube to zoom in/out
- **Double-click** to reset with a fun spin animation

### Keyboard Controls
- **Arrow Keys** - Apply spin velocity (focus on cube first)
- **R Key** - Reset to center position
- **Spacebar** - Stop all movement instantly

### Hidden Features
- **Hover over cube faces** - Subtle sound effects
- **Achievements** - Unlock badges by interacting with the cube
- **Snake game** - Click "Play Mini-Game" for retro fun

## 🎨 Customization Guide

### Personal Information
Update these sections in `index.html`:

```html
<!-- Hero Section -->
<h1 class="glitch-text" data-text="YOUR NAME">YOUR NAME</h1>
<h2>I'm a <span class="highlight">Your Title</span></h2>

<!-- About Section -->
<p class="terminal-line">> Name: Your Actual Name</p>
<p class="terminal-line">> Status: Your Current Status</p>
<p class="terminal-line">> School: Your School Name</p>
```

### Colors & Theme
Modify CSS variables in `styles/main.css`:

```css
:root {
    --neon-green: #00ff41;    /* Primary neon color */
    --neon-blue: #00d4ff;     /* Secondary accent */
    --text-primary: #ffffff;   /* Main text color */
    --bg-primary: #1a1a1a;    /* Background color */
}
```

### Cube Customization
Adjust cube physics in `scripts/main.js`:

```javascript
// Physics properties
const friction = 0.95;        // How quickly spinning slows down
const maxVelocity = 15;       // Maximum spin speed
const sensitivity = 0.8;      // Mouse movement sensitivity
```

## 🌐 Deployment

### Netlify (Recommended)
1. **Connect GitHub repository** to Netlify
2. **Automatic deployments** on every push to main
3. **Custom domain** support available

### Other Options
- **GitHub Pages** - Enable in repository settings
- **Vercel** - Import from GitHub for automatic deployments
- **Firebase Hosting** - Use Firebase CLI for deployment

## � Browser Compatibility

### Fully Supported
- ✅ Chrome (60+)
- ✅ Firefox (55+)
- ✅ Safari (12+)
- ✅ Edge (79+)

### Features Used
- **CSS 3D Transforms** (transform-style: preserve-3d)
- **CSS Custom Properties** (CSS variables)
- **ES6+ JavaScript** (const, let, arrow functions)
- **Touch Events** for mobile support
- **Web Audio API** for sound effects

## 🚀 Performance Features

- **Hardware acceleration** for 3D transforms
- **RequestAnimationFrame** for smooth animations
- **Optimized event listeners** for touch/mouse
- **Efficient DOM manipulation**
- **Mobile-optimized** touch handling

## 🤝 Built With AI Collaboration

This portfolio showcases modern development practices:
- **AI-assisted development** workflow
- **Iterative problem-solving** approach
- **User experience focused** design decisions
- **Physics-based interactions** for engaging UX

## 📱 Mobile Experience

- **Touch-optimized** cube interactions
- **Responsive design** for all screen sizes
- **Touch gesture support** for natural movement
- **Mobile-friendly** navigation and UI

## 🎮 Easter Eggs & Features

- **Achievement system** - Unlock badges by exploring
- **Sound effects** - Hover over cube faces
- **Snake mini-game** - Classic retro gaming
- **Physics playground** - Experiment with cube momentum
- **Hidden interactions** - Discover more by exploring!

## � Contact & Support

Built by **Neeraj M** - Class 12 Student & AI Collaboration Enthusiast

- **School**: Kendriya Vidyalaya Kollam
- **Focus**: AI Collaboration & Modern Web Development

## 🎯 Future Enhancements

- **WebGL effects** for even more impressive 3D
- **Multi-cube interactions**
- **VR/AR support** for immersive experiences
- **Advanced physics** with collision detection
- **Theme customization** panel

---

## 🚀 Ready to Launch Your Career?

This portfolio demonstrates:
- ✅ **Modern web technologies**
- ✅ **3D graphics and physics**
- ✅ **Interactive user experiences**
- ✅ **AI collaboration skills**
- ✅ **Problem-solving abilities**

**Perfect for showcasing to employers, clients, and schools!**

---

*Built with 💖, physics, and AI collaboration*

**The future of development is collaborative. Start your journey here! �✨**
