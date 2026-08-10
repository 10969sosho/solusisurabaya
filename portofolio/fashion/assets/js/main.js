/* ============================================
   VLTX — main.js — Core Functionality
   ============================================ */

(function () {
  'use strict';

  /* ---------- LOADING SCREEN ---------- */
  function initLoadingScreen() {
    const loader = document.querySelector('.loading-screen');
    if (!loader) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
      }, 1200);
    });
  }

  /* ---------- CUSTOM CURSOR ---------- */
  function initCustomCursor() {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animate() {
      cursorX += (mouseX - cursorX) * 0.4;
      cursorY += (mouseY - cursorY) * 0.4;
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;

      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';

      requestAnimationFrame(animate);
    }
    animate();

    const hoverTargets = document.querySelectorAll('a, button, .masonry-card, .bento-card, .slider-card, input');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  /* ---------- SIDEBAR TOGGLE MOBILE ---------- */
  function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menuToggle');
    if (!sidebar || !menuToggle) return;

    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'sidebar-overlay';
      document.body.appendChild(overlay);
    }

    function openSidebar() {
      sidebar.classList.add('open');
      overlay.classList.add('active');
      menuToggle.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
      menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', () => {
      if (sidebar.classList.contains('open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });

    overlay.addEventListener('click', closeSidebar);

    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          closeSidebar();
        }
      });
    });
  }

  /* ---------- ACTIVE NAV TRACKING (MULTI-PAGE) ---------- */
  function initActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    if (navLinks.length === 0) return;

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === currentPath) {
        link.classList.add('active');
      } else if (currentPath === '' && href === 'index.html') {
        link.classList.add('active');
      }
    });

    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === currentPath) {
        link.classList.add('active');
      } else if (currentPath === '' && href === 'index.html') {
        link.classList.add('active');
      }
    });
  }

  /* ---------- SMOOTH ANCHOR SCROLL ---------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const sidebarWidth = window.innerWidth > 1024 ? 80 : 0;
          const navHeight = window.innerWidth <= 768 ? 64 : 0;
          const top = target.getBoundingClientRect().top + window.pageYOffset - sidebarWidth - navHeight;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ---------- MOUSE PARALLAX ---------- */
  function initParallax() {
    const parallaxEls = document.querySelectorAll('[data-parallax]');

    document.addEventListener('mousemove', (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const moveX = (e.clientX - centerX) / centerX;
      const moveY = (e.clientY - centerY) / centerY;

      parallaxEls.forEach(el => {
        const factor = parseFloat(el.dataset.parallax) || 0.05;
        const tx = moveX * factor * 100;
        const ty = moveY * factor * 100;
        el.style.transform = `translate(${tx}px, ${ty}px)`;
      });
    });
  }

  /* ---------- SCROLL PROGRESS BAR ---------- */
  function initScrollProgress() {
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / docHeight) * 100;
      bar.style.width = progress + '%';
    }, { passive: true });
  }

  /* ---------- CART POPUP ---------- */
  function initCartPopup() {
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const popup = document.getElementById('cartPopup');
        if (!popup) return;

        const card = btn.closest('.masonry-card');
        const title = card ? card.querySelector('.masonry-title')?.textContent : 'Item';
        const price = card ? card.querySelector('.masonry-price')?.textContent : '$0';

        popup.querySelector('.cart-popup-item').textContent = title;
        popup.querySelector('.cart-popup-price').textContent = price;
        popup.classList.add('show');

        setTimeout(() => {
          popup.classList.remove('show');
        }, 3000);
      });
    });
  }

  /* ---------- NEWSLETTER FORM ---------- */
  function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      if (input && input.value) {
        const btn = form.querySelector('.newsletter-btn');
        const originalText = btn.textContent;
        btn.textContent = '✓ Berlangganan!';
        btn.style.background = '#2ecc71';
        input.value = '';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
        }, 2500);
      }
    });
  }

  /* ---------- LOOKBOOK FILTER ---------- */
  function initLookbookFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.bento-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        cards.forEach(card => {
          const category = card.dataset.category || '';
          if (filter === 'all' || category.includes(filter)) {
            card.style.display = '';
            card.style.animation = 'fadeUp 0.5s cubic-bezier(0.22, 0.61, 0.36, 1) forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ---------- INITIALIZE ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    document.body.style.overflow = 'hidden';
    initLoadingScreen();
    initCustomCursor();
    initSidebar();
    initActiveNav();
    initSmoothScroll();
    initParallax();
    initScrollProgress();
    initCartPopup();
    initNewsletter();
    initLookbookFilter();
  });

})();
