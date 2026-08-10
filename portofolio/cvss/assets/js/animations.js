/* CV Solusi Surabaya - Animations Controller */
(function () {
  'use strict';

  const App = (window.App = window.App || {});
  App.anim = App.anim || {};

  const { qs, qsa, on, throttle, prefersReducedMotion } = App.util || {
    qs: (s, c = document) => c.querySelector(s),
    qsa: (s, c = document) => Array.from(c.querySelectorAll(s)),
    on: (el, evt, h, o) => el.addEventListener(evt, h, o || false),
    throttle: (fn, n) => fn,
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)')
  };

  // 1) Scroll reveal using IntersectionObserver
  function initScrollReveal() {
    const elements = qsa('.fade-in-up');
    if (!elements.length) return;

    if (prefersReducedMotion.matches) {
      // Respect user preference: show content immediately without animation
      elements.forEach(el => el.classList.add('animate'));
      return;
    }

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          // Unobserve to avoid re-trigger
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

    elements.forEach(el => obs.observe(el));
  }

  // 2) Typing animation (loop through phrases)
  function initTyping(selector = '.typing-text', phrases) {
    const el = qs(selector);
    if (!el) return;

    const texts = phrases && phrases.length
      ? phrases
      : [
          'Website Development',
          'Mobile Applications',
          'Desktop Software',
          'E-commerce Solutions'
        ];

    // Skip animated typing for reduced motion users
    if (prefersReducedMotion.matches) {
      el.textContent = texts[0];
      return;
    }

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let rafId;

    function type() {
      const current = texts[textIndex];
      const next = isDeleting ? current.slice(0, charIndex - 1) : current.slice(0, charIndex + 1);
      el.textContent = next;

      charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

      let delay = isDeleting ? 50 : 90;

      if (!isDeleting && charIndex === current.length) {
        delay = 1500; // hold on full word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        delay = 500; // pause before next word
      }

      clearTimeout(rafId);
      rafId = setTimeout(type, delay);
    }

    type();
  }

  // 3) Simple particle background
  function initParticles(containerSelector = '#particles-container', count = 36) {
    const container = qs(containerSelector);
    if (!container) return;

    // Respect reduced motion
    if (prefersReducedMotion.matches) return;

    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || 480;
    const particles = [];

    for (let i = 0; i < count; i++) {
      const dot = document.createElement('div');
      dot.className = 'particle' + (Math.random() > 0.6 ? ' orange' : '');
      const size = Math.random() * 3 + 2; // 2-5px
      const x = Math.random() * w;
      const y = Math.random() * h;
      const vx = (Math.random() - 0.5) * 0.6;
      const vy = (Math.random() - 0.5) * 0.6;
      dot.style.width = size + 'px';
      dot.style.height = size + 'px';
      dot.style.left = x + 'px';
      dot.style.top = y + 'px';
      container.appendChild(dot);
      particles.push({ el: dot, x, y, vx, vy, size });
    }

    function tick() {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges for continuous flow
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        p.el.style.transform = `translate(${p.x}px, ${p.y}px)`;
      }
      animId = requestAnimationFrame(tick);
    }

    let animId = requestAnimationFrame(tick);

    // Handle resize
    const onResize = throttle(() => {
      const rect = container.getBoundingClientRect();
      // eslint-disable-next-line no-unused-vars
      const _w = rect.width || window.innerWidth;
      // eslint-disable-next-line no-unused-vars
      const _h = rect.height || 480;
      // We don't recompute positions aggressively to keep it lightweight.
    }, 250);
    on(window, 'resize', onResize);

    // Cleanup on page hide
    on(document, 'visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        animId = requestAnimationFrame(tick);
      }
    });
  }

  // Public API
  App.anim.initScrollReveal = initScrollReveal;
  App.anim.initTyping = initTyping;
  App.anim.initParticles = initParticles;

  // Auto-init on DOM ready
  function init() {
    initScrollReveal();
    initTyping('#typing-text');
    initParticles('#particles-container', 40);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();