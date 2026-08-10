/* ============================================
   VLTX — slider.js — Trending Product Slider
   ============================================ */

(function () {
  'use strict';

  function initTrendingSlider() {
    const container = document.getElementById('trendingSlider');
    const track = document.getElementById('sliderTrack');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    const dotsContainer = document.getElementById('sliderDots');

    if (!container || !track) return;

    const cards = track.querySelectorAll('.slider-card');
    const cardWidth = cards[0] ? cards[0].offsetWidth + 20 : 300;

    /* ---------- Create Dots ---------- */
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      cards.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'slider-dot';
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => scrollToSlide(i));
        dotsContainer.appendChild(dot);
      });
    }

    function updateDots() {
      if (!dotsContainer) return;
      const dots = dotsContainer.querySelectorAll('.slider-dot');
      const scrollLeft = container.scrollLeft;
      let activeIndex = Math.round(scrollLeft / cardWidth);
      activeIndex = Math.max(0, Math.min(activeIndex, cards.length - 1));

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
      });
    }

    function scrollToSlide(index) {
      const target = index * cardWidth;
      container.scrollTo({ left: target, behavior: 'smooth' });
    }

    /* ---------- Arrow Buttons ---------- */
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const currentSlide = Math.round(container.scrollLeft / cardWidth);
        scrollToSlide(Math.max(0, currentSlide - 1));
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const currentSlide = Math.round(container.scrollLeft / cardWidth);
        scrollToSlide(Math.min(cards.length - 1, currentSlide + 1));
      });
    }

    /* ---------- Drag Support ---------- */
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;

    container.addEventListener('mousedown', (e) => {
      isDown = true;
      container.style.cursor = 'grabbing';
      startX = e.pageX - container.offsetLeft;
      scrollStart = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.style.cursor = '';
    });

    container.addEventListener('mouseup', () => {
      isDown = false;
      container.style.cursor = '';
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.8;
      container.scrollLeft = scrollStart - walk;
    });

    /* ---------- Touch Support ---------- */
    let touchStartX = 0;
    let touchScrollStart = 0;

    container.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].pageX - container.offsetLeft;
      touchScrollStart = container.scrollLeft;
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - touchStartX) * 1.5;
      container.scrollLeft = touchScrollStart - walk;
    }, { passive: true });

    /* ---------- Scroll Update ---------- */
    container.addEventListener('scroll', updateDots, { passive: true });

    /* ---------- Keyboard Navigation ---------- */
    container.setAttribute('tabindex', '0');
    container.addEventListener('keydown', (e) => {
      const currentSlide = Math.round(container.scrollLeft / cardWidth);
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollToSlide(Math.max(0, currentSlide - 1));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollToSlide(Math.min(cards.length - 1, currentSlide + 1));
      }
    });

    /* ---------- Init ---------- */
    updateDots();

    /* ---------- Recalculate on resize ---------- */
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newCardWidth = cards[0] ? cards[0].offsetWidth + 20 : 300;
        updateDots();
      }, 300);
    });
  }

  document.addEventListener('DOMContentLoaded', initTrendingSlider);
})();
