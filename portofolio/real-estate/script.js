/* ========================================
   PREMIUM REAL ESTATE - SCRIPTS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Navbar Scroll Effect --- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  /* --- Mobile Nav Toggle --- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const spans = navToggle.querySelectorAll('span');
      if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  }

  /* --- Smooth Scroll --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = navbar ? navbar.offsetHeight + 20 : 80;
        window.scrollTo({
          top: target.offsetTop - offset,
          behavior: 'smooth'
        });
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
        }
      }
    });
  });

  /* --- Animated Counters --- */
  const counters = document.querySelectorAll('.counter');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated || counters.length === 0) return;
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const update = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current) + suffix;
          requestAnimationFrame(update);
        } else {
          counter.textContent = target + suffix;
        }
      };
      update();
    });
    countersAnimated = true;
  }

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(statsSection);
  }

  /* --- Scroll Animations --- */
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  if (animateElements.length > 0) {
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          scrollObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    animateElements.forEach(el => scrollObserver.observe(el));
  }

  /* --- Property Filter --- */
  const filterForm = document.querySelector('#filter-form');
  const propertyCards = document.querySelectorAll('.property-card[data-type]');

  if (filterForm && propertyCards.length > 0) {
    filterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      applyFilters();
    });

    filterForm.querySelectorAll('select').forEach(select => {
      select.addEventListener('change', applyFilters);
    });

    function applyFilters() {
      const typeVal = document.querySelector('#filter-type')?.value || '';
      const priceVal = document.querySelector('#filter-price')?.value || '';

      let minPrice = 0;
      let maxPrice = Infinity;

      if (priceVal) {
        const parts = priceVal.split('-');
        minPrice = parseFloat(parts[0]) * 1000000000;
        maxPrice = parts[1] ? parseFloat(parts[1]) * 1000000000 : Infinity;
      }

      propertyCards.forEach(card => {
        const type = card.getAttribute('data-type');
        const price = parseFloat(card.getAttribute('data-price')) || 0;

        const typeMatch = !typeVal || type === typeVal;
        const priceMatch = !priceVal || (price >= minPrice && price <= maxPrice);

        if (typeMatch && priceMatch) {
          card.style.display = '';
          card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    }
  }

  /* --- Form Validation --- */
  const forms = document.querySelectorAll('.validate-form');
  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll('.form-group').forEach(group => {
        const input = group.querySelector('input, textarea, select');
        if (!input) return;

        group.classList.remove('has-error');
        const errorEl = group.querySelector('.error');

        if (input.hasAttribute('required') && !input.value.trim()) {
          group.classList.add('has-error');
          if (errorEl) errorEl.textContent = 'Field ini wajib diisi';
          valid = false;
        } else if (input.type === 'email' && input.value) {
          const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRe.test(input.value)) {
            group.classList.add('has-error');
            if (errorEl) errorEl.textContent = 'Email tidak valid';
            valid = false;
          }
        } else if (input.type === 'tel' && input.value) {
          const phoneRe = /^[0-9+ ]{8,15}$/;
          if (!phoneRe.test(input.value)) {
            group.classList.add('has-error');
            if (errorEl) errorEl.textContent = 'Nomor telepon tidak valid';
            valid = false;
          }
        }
      });

      if (valid) {
        const successMsg = form.querySelector('.form-success');
        if (successMsg) {
          successMsg.classList.add('show');
          setTimeout(() => successMsg.classList.remove('show'), 4000);
        }
        form.reset();
      }
    });
  });

  /* --- Gallery Thumbnail Click --- */
  const mainImg = document.querySelector('.detail-gallery .main-img img');
  const thumbs = document.querySelectorAll('.detail-gallery .thumb-grid img');
  if (mainImg && thumbs.length > 0) {
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const temp = mainImg.src;
        mainImg.src = thumb.src;
        thumb.src = temp;
      });
    });
  }

});
