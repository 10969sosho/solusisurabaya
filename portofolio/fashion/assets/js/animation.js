/* ============================================
   VLTX — animation.js — Scroll Reveal, Counter, Marquee
   ============================================ */

(function () {
  'use strict';

  /* ---------- SCROLL REVEAL ---------- */
  function initScrollReveal() {
    const revealEls = document.querySelectorAll('[data-reveal]');
    if (revealEls.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealEls.forEach(el => observer.observe(el));
  }

  /* ---------- COUNTER ANIMATION ---------- */
  function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (counters.length === 0) return;

    let animated = false;

    function animateCounter(el) {
      const target = parseInt(el.dataset.target, 10);
      if (isNaN(target)) return;

      const duration = 2000;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(eased * target);
        el.textContent = current.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target.toLocaleString();
        }
      }

      requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          counters.forEach(animateCounter);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    if (counters[0]) observer.observe(counters[0]);
  }

  /* ---------- MARQUEE DUPLICATION ---------- */
  function initMarquee() {
    const marqueeInner = document.querySelector('.marquee-inner');
    if (!marqueeInner) return;

    const clone = marqueeInner.cloneNode(true);
    marqueeInner.parentElement.appendChild(clone);
  }

  /* ---------- SMOOTH ENTRY ON SECTION VISIBILITY ---------- */
  function initSectionEntry() {
    const sections = document.querySelectorAll('section');
    if (sections.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
        }
      });
    }, { threshold: 0.08 });

    sections.forEach(section => {
      section.style.opacity = '0';
      section.style.transition = 'opacity 0.8s ease-out';
      observer.observe(section);
    });
  }

  /* ---------- TESTIMONIAL DUPLICATE FOR INFINITE SCROLL ---------- */
  function initTestimonialDuplicate() {
    const track = document.getElementById('testimonialTrack');
    if (!track) return;

    const cards = track.querySelectorAll('.testimonial-card');
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      track.appendChild(clone);
    });
  }

  /* ---------- INITIALIZE ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initCounters();
    initMarquee();
    initSectionEntry();
    initTestimonialDuplicate();
  });

})();
