/* === MAIN.JS - Core Functionality === */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollProgress();
  initCursorGlow();
  initSmoothScroll();
  initActiveNavTracking();
  initParallax();
  initReservationForm();
  initContactForm();
  initLoader();
  initCounterAnimation();
  initToast();
});

/* Navbar Hide/Show on Scroll */
function initNavbar() {
  const nav = document.querySelector('.nav');
  let lastScroll = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const currentScroll = window.scrollY;

        if (currentScroll > 600 && currentScroll > lastScroll) {
          nav.classList.add('hidden');
        } else {
          nav.classList.remove('hidden');
        }

        if (currentScroll > 80) {
          nav.style.background = 'rgba(24, 23, 21, 0.85)';
        } else {
          nav.style.background = '';
        }

        lastScroll = currentScroll;
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* Scroll Progress Bar */
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    bar.style.width = Math.min(progress, 100) + '%';
  });
}

/* Cursor Glow Effect */
function initCursorGlow() {
  const glow = document.querySelector('.cursor-glow');
  if (!glow) return;

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
    glow.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    glow.style.opacity = '1';
  });
}

/* Smooth Scroll for Anchor Links */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        const offset = 100;
        const position = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: position,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* Active Nav Link Tracking — only for pages with anchor sections */
function initActiveNavTracking() {
  const sections = document.querySelectorAll('section[id]');
  if (sections.length === 0) return;

  const navLinks = document.querySelectorAll('.nav-links a');
  const mobileLinks = document.querySelectorAll('.mobile-nav a');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });

    mobileLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

/* Mouse Parallax */
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    parallaxElements.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax')) || 1;
      el.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });
}

/* Reservation Form */
function initReservationForm() {
  const form = document.getElementById('reservation-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const modal = document.getElementById('success-modal');
    if (modal) {
      modal.classList.add('active');
      form.reset();
    }
  });

  const closeBtn = document.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      const modal = document.getElementById('success-modal');
      if (modal) modal.classList.remove('active');
    });
  }

  const modalOverlay = document.querySelector('.modal-overlay');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }
}

/* Contact Form */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    window.showToast('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.', '✉️');
    form.reset();
  });
}

/* Loading Screen */
function initLoader() {
  const loader = document.querySelector('.loader');
  if (!loader) return;

  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 1500);

  document.body.style.overflow = 'hidden';
}

/* Counter Animation */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number[data-count]');

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 2000;
    const startTime = performance.now();
    const startVal = 0;

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startVal + (target - startVal) * eased);

      el.textContent = current + '+';

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

/* Toast Notification */
function initToast() {
  window.showToast = function(message, icon = '✓') {
    const toast = document.querySelector('.toast');
    if (!toast) return;

    toast.querySelector('.toast-icon').textContent = icon;
    toast.querySelector('.toast-text').textContent = message;

    toast.classList.add('active');

    clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => {
      toast.classList.remove('active');
    }, 3000);
  };
}

/* Add to Cart Dummy */
document.addEventListener('click', (e) => {
  if (e.target.closest('.menu-card-add')) {
    const card = e.target.closest('.menu-card');
    const title = card.querySelector('.menu-card-title').textContent;
    window.showToast(`${title} ditambahkan ke keranjang`, '🛒');
  }
});
