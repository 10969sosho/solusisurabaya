/* CV Solusi Surabaya - Main JS */
(function () {
  'use strict';

  // Namespace
  const App = (window.App = window.App || {});
  App.main = App.main || {};

  // Utils (from utils.js)
  const {
    qs,
    qsa,
    on,
    throttle,
    smoothScrollTo,
    prefersReducedMotion
  } = App.util || {
    qs: (s, c = document) => c.querySelector(s),
    qsa: (s, c = document) => Array.from(c.querySelectorAll(s)),
    on: (el, evt, h, o) => el.addEventListener(evt, h, o || false),
    throttle: (fn) => fn,
    smoothScrollTo: (el) => el && el.scrollIntoView({ behavior: 'smooth', block: 'start' }),
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)')
  };

  // 1) Mobile nav toggle
  function initNavToggle() {
    const toggle = qs('#nav-toggle');
    const menu = qs('#nav-menu');

    if (!toggle || !menu) return;

    const OPEN_CLASS = 'active';

    function openMenu() {
      menu.classList.add(OPEN_CLASS);
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      menu.classList.remove(OPEN_CLASS);
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    function toggleMenu() {
      menu.classList.contains(OPEN_CLASS) ? closeMenu() : openMenu();
    }

    on(toggle, 'click', toggleMenu);

    // Close when clicking a nav link (mobile)
    qsa('.nav-link', menu).forEach(link => {
      on(link, 'click', () => closeMenu());
    });

    // Close on Escape
    on(document, 'keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains(OPEN_CLASS)) {
        closeMenu();
      }
    });

    // Click outside to close (mobile menu is overlay-style)
    on(document, 'click', (e) => {
      if (window.innerWidth > 768) return;
      if (menu.classList.contains(OPEN_CLASS)) {
        const clickInside = menu.contains(e.target) || toggle.contains(e.target);
        if (!clickInside) closeMenu();
      }
    });
  }

  // 2) Scroll progress bar
  function initScrollProgress() {
    const bar = qs('#scroll-progress');
    if (!bar) return;

    const update = throttle(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      const winHeight = window.innerHeight;
      const progress = Math.min(1, scrollTop / (docHeight - winHeight));
      bar.style.width = (progress * 100).toFixed(2) + '%';
    }, 16);

    on(window, 'scroll', update);
    on(window, 'resize', update);
    update();
  }

  // 3) Smooth anchor navigation
  function initSmoothAnchors() {
    qsa('a[href^="#"]').forEach(anchor => {
      on(anchor, 'click', (e) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        const target = qs(href);
        if (!target) return;
        e.preventDefault();
        smoothScrollTo(target);
      });
    });
  }

  // 4) Active nav link on scroll (scrollspy)
  function initScrollSpy() {
    const sections = qsa('section[id]');
    const navLinks = new Map();
    qsa('.nav-link').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href.startsWith('#')) navLinks.set(href.slice(1), a);
    });

    if (!sections.length || !navLinks.size) return;

    function setActive(id) {
      navLinks.forEach(link => link.classList.remove('active'));
      const link = navLinks.get(id);
      if (link) link.classList.add('active');
    }

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, {
      threshold: 0.6
    });

    sections.forEach(sec => obs.observe(sec));
  }

  // 5) Minor header behavior (shrink on scroll)
  function initHeaderBehavior() {
    const header = qs('.header');
    if (!header) return;

    const onScroll = throttle(() => {
      if ((window.pageYOffset || document.documentElement.scrollTop) > 8) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, 16);

    on(window, 'scroll', onScroll);
    onScroll();
  }

  // 6) Enhance buttons with pointer glow position
  function initButtonPointerGlow() {
    qsa('.btn').forEach(btn => {
      on(btn, 'mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        btn.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      });
      on(btn, 'mouseleave', () => {
        btn.style.removeProperty('--mx');
      });
    });
  }

  // 7) Portfolio button demo (if using modal later)
  function initPortfolioButtons() {
    qsa('.portfolio-btn').forEach(btn => {
      on(btn, 'click', () => {
        // Placeholder: hook modal open here
        // Example: App.modal.open('portfolioModalId')
        // For now, smooth scroll to portfolio section if exists
        const section = qs('#portfolio');
        if (section) smoothScrollTo(section);
      });
    });
  }

  // 8) Accessibility: focus outline only via keyboard
  function initFocusRing() {
    function handleFirstTab(e) {
      if (e.key === 'Tab') {
        document.documentElement.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
        window.addEventListener('mousedown', handleMouseDownOnce);
      }
    }
    function handleMouseDownOnce() {
      document.documentElement.classList.remove('user-is-tabbing');
      window.removeEventListener('mousedown', handleMouseDownOnce);
      window.addEventListener('keydown', handleFirstTab);
    }
    window.addEventListener('keydown', handleFirstTab);
  }

  // 9) Initialize all features
  function init() {
    initNavToggle();
    initScrollProgress();
    initSmoothAnchors();
    initScrollSpy();
    initHeaderBehavior();
    initButtonPointerGlow();
    initPortfolioButtons();

    // Respect reduced motion globally if needed
    if (prefersReducedMotion && prefersReducedMotion.addEventListener) {
      prefersReducedMotion.addEventListener('change', () => {
        // Reload to let animations.js re-init appropriately if user toggles setting
        window.location.reload();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();