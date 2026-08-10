# CV Solusi Surabaya - Modern Animation Guide

## Animation Philosophy
Create smooth, purposeful animations that enhance user experience without overwhelming the content. Focus on performance and accessibility while maintaining a modern, professional feel.

## CSS Animation Techniques

### 1. Hero Section Animations

#### Particle Background Animation
```css
/* Floating geometric shapes */
.particle {
  position: absolute;
  background: linear-gradient(45deg, #00d4ff, #ff6b35);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.particle:nth-child(odd) {
  animation-delay: -2s;
  animation-duration: 8s;
}
```

#### Typing Effect Animation
```css
.typing-text {
  overflow: hidden;
  border-right: 3px solid #00d4ff;
  white-space: nowrap;
  animation: typing 3s steps(40, end), blink-caret 0.75s step-end infinite;
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink-caret {
  from, to { border-color: transparent; }
  50% { border-color: #00d4ff; }
}
```

#### Gradient Background Animation
```css
.hero-background {
  background: linear-gradient(-45deg, #0a0a0a, #1a1a1a, #2a2a2a, #0a0a0a);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

### 2. Navigation Animations

#### Smooth Underline Effect
```css
.nav-link {
  position: relative;
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #00d4ff, #ff6b35);
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}
```

#### Mobile Menu Slide Animation
```css
.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 80%;
  height: 100vh;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(10px);
  transition: right 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.mobile-menu.active {
  right: 0;
}

.mobile-menu-item {
  opacity: 0;
  transform: translateX(50px);
  transition: all 0.3s ease;
}

.mobile-menu.active .mobile-menu-item {
  opacity: 1;
  transform: translateX(0);
}

.mobile-menu.active .mobile-menu-item:nth-child(1) { transition-delay: 0.1s; }
.mobile-menu.active .mobile-menu-item:nth-child(2) { transition-delay: 0.2s; }
.mobile-menu.active .mobile-menu-item:nth-child(3) { transition-delay: 0.3s; }
```

### 3. Card and Content Animations

#### Hover Transform Effects
```css
.service-card {
  background: #2a2a2a;
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.service-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 212, 255, 0.2);
}

.service-card:hover::before {
  left: 100%;
}
```

#### Stagger Animation on Scroll
```css
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.fade-in-up.animate {
  opacity: 1;
  transform: translateY(0);
}

.stagger-1 { transition-delay: 0.1s; }
.stagger-2 { transition-delay: 0.2s; }
.stagger-3 { transition-delay: 0.3s; }
.stagger-4 { transition-delay: 0.4s; }
```

### 4. Button Animations

#### Ripple Effect
```css
.btn-ripple {
  position: relative;
  overflow: hidden;
  background: linear-gradient(45deg, #00d4ff, #0099cc);
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-ripple::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn-ripple:active::before {
  width: 300px;
  height: 300px;
}
```

#### Glow Effect
```css
.btn-glow {
  background: linear-gradient(45deg, #00d4ff, #ff6b35);
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  color: white;
  position: relative;
  transition: all 0.3s ease;
}

.btn-glow::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, #00d4ff, #ff6b35);
  border-radius: 6px;
  opacity: 0;
  filter: blur(10px);
  transition: opacity 0.3s ease;
  z-index: -1;
}

.btn-glow:hover::before {
  opacity: 0.7;
}
```

## JavaScript Animation Controllers

### 1. Scroll-Triggered Animations
```javascript
// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

// Observe all elements with fade-in-up class
document.querySelectorAll('.fade-in-up').forEach(el => {
  observer.observe(el);
});
```

### 2. Typing Animation Controller
```javascript
class TypingAnimation {
  constructor(element, texts, speed = 100) {
    this.element = element;
    this.texts = texts;
    this.speed = speed;
    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.start();
  }

  start() {
    this.type();
  }

  type() {
    const currentText = this.texts[this.textIndex];
    
    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let typeSpeed = this.speed;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.charIndex === currentText.length) {
      typeSpeed = 2000; // Pause at end
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      typeSpeed = 500; // Pause before next text
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Initialize typing animation
const typingElement = document.querySelector('.typing-text');
const texts = [
  'Website Development',
  'Mobile Applications',
  'Desktop Software',
  'E-commerce Solutions'
];
new TypingAnimation(typingElement, texts);
```

### 3. Particle System
```javascript
class ParticleSystem {
  constructor(container) {
    this.container = container;
    this.particles = [];
    this.init();
  }

  init() {
    for (let i = 0; i < 50; i++) {
      this.createParticle();
    }
    this.animate();
  }

  createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 2;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const speedX = (Math.random() - 0.5) * 2;
    const speedY = (Math.random() - 0.5) * 2;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    this.container.appendChild(particle);
    
    this.particles.push({
      element: particle,
      x: x,
      y: y,
      speedX: speedX,
      speedY: speedY,
      size: size
    });
  }

  animate() {
    this.particles.forEach(particle => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Bounce off edges
      if (particle.x <= 0 || particle.x >= window.innerWidth) {
        particle.speedX *= -1;
      }
      if (particle.y <= 0 || particle.y >= window.innerHeight) {
        particle.speedY *= -1;
      }

      particle.element.style.left = `${particle.x}px`;
      particle.element.style.top = `${particle.y}px`;
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Initialize particle system
const heroSection = document.querySelector('.hero-section');
new ParticleSystem(heroSection);
```

### 4. Smooth Scrolling
```javascript
// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
```

### 5. Modal Animations
```javascript
class Modal {
  constructor(modalId) {
    this.modal = document.getElementById(modalId);
    this.backdrop = this.modal.querySelector('.modal-backdrop');
    this.content = this.modal.querySelector('.modal-content');
    this.init();
  }

  init() {
    // Close on backdrop click
    this.backdrop.addEventListener('click', (e) => {
      if (e.target === this.backdrop) {
        this.close();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.close();
      }
    });
  }

  open() {
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Animate in
    gsap.fromTo(this.backdrop, 
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    );
    
    gsap.fromTo(this.content,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, delay: 0.1 }
    );
  }

  close() {
    // Animate out
    gsap.to(this.backdrop, {
      opacity: 0,
      duration: 0.3
    });
    
    gsap.to(this.content, {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}
```

## Performance Optimization

### 1. CSS Optimizations
```css
/* Use transform and opacity for animations (GPU accelerated) */
.animate-element {
  will-change: transform, opacity;
  transform: translateZ(0); /* Force hardware acceleration */
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 2. JavaScript Optimizations
```javascript
// Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Optimized scroll handler
const handleScroll = throttle(() => {
  // Scroll-based animations
}, 16); // ~60fps

window.addEventListener('scroll', handleScroll);
```

## Animation Timeline

### Page Load Sequence
1. **0ms**: HTML structure loads
2. **100ms**: CSS animations initialize
3. **300ms**: Hero background animation starts
4. **500ms**: Typing animation begins
5. **800ms**: Navigation animations complete
6. **1000ms**: Page fully interactive

### User Interaction Response Times
- **Button hover**: < 100ms
- **Card animations**: < 200ms
- **Modal open/close**: < 300ms
- **Page transitions**: < 500ms

## Browser Compatibility

### CSS Features
- **CSS Grid**: IE11+ (with fallbacks)
- **Flexbox**: IE10+
- **CSS Animations**: IE10+
- **CSS Transforms**: IE9+

### JavaScript Features
- **Intersection Observer**: Chrome 51+, Firefox 55+ (polyfill for older browsers)
- **RequestAnimationFrame**: IE10+
- **ES6 Classes**: Chrome 49+, Firefox 45+ (transpile for older browsers)

## Testing Checklist

### Performance Testing
- [ ] Lighthouse performance score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1

### Animation Testing
- [ ] Smooth 60fps animations
- [ ] No janky scrolling
- [ ] Proper reduced motion support
- [ ] Mobile touch interactions work
- [ ] Keyboard navigation functional

### Cross-browser Testing
- [ ] Chrome (latest 2 versions)
- [ ] Firefox (latest 2 versions)
- [ ] Safari (latest 2 versions)
- [ ] Edge (latest 2 versions)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)