'use strict';

document.addEventListener('DOMContentLoaded', function() {
  const isMobile = window.innerWidth < 768;

  // — Lenis Smooth Scroll —
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // — Scroll Progress —
  gsap.to('.scroll-progress', {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
    },
  });

  // — Navbar —
  const navbar = document.querySelector('.navbar');

  ScrollTrigger.create({
    trigger: document.body,
    start: '80px top',
    onUpdate: (self) => {
      navbar.classList.toggle('scrolled', self.progress > 0);
    },
  });

  // — Hero Parallax —
  gsap.to('.hero-bg', {
    y: '25%',
    scale: 1.1,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    },
  });

  // — Hero Content Entrance —
  const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroTimeline
    .from('.hero-badge', { y: 30, opacity: 0, duration: 0.8 })
    .from('.hero-title', { y: 60, opacity: 0, duration: 1 }, '-=0.4')
    .from('.hero-subtitle', { y: 40, opacity: 0, duration: 0.8 }, '-=0.5')
    .from('.hero-buttons > *', { y: 30, opacity: 0, duration: 0.6, stagger: 0.15 }, '-=0.4')
    .from('.hero-stats > *', { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.3');

  // — Animated Counters —
  function animateCounters() {
    document.querySelectorAll('.stat-number').forEach((el) => {
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';

      gsap.fromTo(
        el,
        { textContent: '0' },
        {
          textContent: target,
          duration: 2.5,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
          onUpdate: function () {
            if (el.dataset.suffix) {
              el.textContent = Math.round(parseFloat(el.textContent)) + suffix;
            }
          },
        }
      );
    });
  }
  animateCounters();

  // — Booking Form Validation —
  const searchForm = document.querySelector('.search-card form');
  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const location = document.getElementById('location').value;
      const pickupDate = document.getElementById('pickup-date').value;
      const returnDate = document.getElementById('return-date').value;
      const carType = document.getElementById('car-type').value;

      if (!location || !pickupDate || !returnDate) {
        alert('Please fill in all required fields');
        return;
      }

      if (new Date(returnDate) <= new Date(pickupDate)) {
        alert('Return date must be after pickup date');
        return;
      }

      alert(`Searching for ${carType} cars in ${location} from ${pickupDate} to ${returnDate}`);
    });
  }

  // — Horizontal Pinned Scroll (Car Fleet) —
  const carFleet = document.querySelector('.car-fleet');
  const scrollTrack = document.querySelector('.horizontal-scroll-track');

  if (scrollTrack && !isMobile) {
    const scrollDist = scrollTrack.scrollWidth - window.innerWidth;
    if (scrollDist > 0) {
      const endPoint = scrollDist + 120;
      ScrollTrigger.create({
        trigger: carFleet,
        pin: true,
        start: 'top top',
        end: () => `+=${endPoint}`,
        invalidateOnRefresh: true,
      });
      gsap.to(scrollTrack, {
        x: () => -(scrollDist),
        ease: 'none',
        scrollTrigger: {
          trigger: carFleet,
          start: 'top top',
          end: () => `+=${endPoint}`,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });
    }
  }

  // — Section Reveal Animations —
  function revealFrom(selector, fromVars) {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;
    const toVars = {};
    Object.keys(fromVars).forEach((k) => { toVars[k] = 0; });
    gsap.fromTo(els, fromVars, {
      ...toVars,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: els[0].closest('.container') || els[0].parentElement,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  }

  revealFrom('.feature-card', { y: 40 });
  revealFrom('.location-card', { y: 40 });
  revealFrom('.review-card', { y: 40 });
  revealFrom('.pricing-card', { y: 40 });

  gsap.set('.map-left', { x: -40, opacity: 0 });
  gsap.to('.map-left', {
    x: 0,
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.map-container',
      start: 'top 80%',
    },
  });

  gsap.set('.map-right', { x: 40, opacity: 0 });
  gsap.to('.map-right', {
    x: 0,
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.map-container',
      start: 'top 80%',
    },
  });

  gsap.set('.promo-content', { y: 30, opacity: 0 });
  gsap.to('.promo-content', {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.promo-banner',
      start: 'top 80%',
    },
  });

  // — Promo Parallax —
  gsap.to('.promo-bg', {
    y: '20%',
    scale: 1.05,
    ease: 'none',
    scrollTrigger: {
      trigger: '.promo-banner',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5,
    },
  });

  // — Floating Booking Bar —
  const floatingBar = document.querySelector('.floating-booking');
  let bookingVisible = false;

  if (floatingBar) {
    const bookingSection = document.querySelector('.booking-section');

    ScrollTrigger.create({
      trigger: '.car-fleet',
      start: 'top 90%',
      onEnter: () => {
        floatingBar.classList.add('visible');
        bookingVisible = true;
      },
      onLeaveBack: () => {
        floatingBar.classList.remove('visible');
        bookingVisible = false;
      },
    });

    floatingBar.querySelector('.floating-submit')?.addEventListener('click', function () {
      const loc = document.getElementById('floating-location').value;
      const pickup = document.getElementById('floating-pickup').value;
      const ret = document.getElementById('floating-return').value;
      if (loc && pickup && ret) {
        alert(`Searching in ${loc} from ${pickup} to ${ret}`);
      } else {
        lenis.scrollTo('#booking', { offset: -80 });
      }
    });
  }

  // — Smooth Scroll Anchor Links —
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        lenis.scrollTo(target, { offset: -80, duration: 1.2 });
      }
    });
  });

  // — View Details Buttons —
  document.querySelectorAll('.view-details').forEach((btn) => {
    btn.addEventListener('click', function () {
      const card = this.closest('.car-card');
      const name = card?.querySelector('h3')?.textContent || 'this car';
      alert(`Viewing details for ${name}`);
    });
  });

  // — Book Now / CTA Buttons —
  document.querySelectorAll(
    '.pricing-button, .cta-button, .btn-primary, .btn-secondary, .promo-button'
  ).forEach((btn) => {
    btn.addEventListener('click', function () {
      alert(`${this.textContent.trim()} — redirecting to booking page...`);
    });
  });

  // — Location Card Clicks —
  document.querySelectorAll('.location-card').forEach((card) => {
    card.addEventListener('click', function () {
      const name = this.querySelector('h3')?.textContent || 'Location';
      const info = this.querySelector('p')?.textContent || '';
      alert(`${name}: ${info}`);
    });
  });

  // — Button Loading Animation —
  document.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', function () {
      const original = this.textContent;
      this.innerHTML = '<span class="btn-loading">...</span>';
      this.disabled = true;
      setTimeout(() => {
        this.innerHTML = original;
        this.disabled = false;
      }, 1000);
    });
  });

  // — Mobile Menu Toggle —
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  mobileToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('mobile-active');
    mobileToggle.classList.toggle('active');
  });

  document.querySelectorAll('.nav-menu a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('mobile-active');
      mobileToggle?.classList.remove('active');
    });
  });

  // — Car Availability Simulation —
  function updateCarAvailability() {
    document.querySelectorAll('.location-info p').forEach((el) => {
      const match = el.textContent.match(/(\d+)/);
      if (match) {
        const current = parseInt(match[1]);
        const change = Math.floor(Math.random() * 10) - 5;
        const updated = Math.max(50, current + change);
        el.textContent = `${updated} Cars Available`;
      }
    });
  }
  setInterval(updateCarAvailability, 30000);

  // — Keyboard Accessibility —
  document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])').forEach((el) => {
    el.addEventListener('focus', () => el.style.outline = '2px solid var(--accent)');
    el.addEventListener('blur', () => el.style.outline = 'none');
  });

  // — Refresh ScrollTrigger on resize —
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  });

  // — Refresh on images load —
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

  console.log('DriveNow Rental — Premium website loaded successfully');
});