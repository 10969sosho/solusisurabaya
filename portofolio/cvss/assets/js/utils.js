/* CV Solusi Surabaya - Utils (vanilla JS) */
(function () {
  'use strict';

  // Namespace
  const App = (window.App = window.App || {});
  App.util = App.util || {};

  // Query helpers
  const qs = (sel, ctx = document) => ctx.querySelector(sel);
  const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  App.util.qs = qs;
  App.util.qsa = qsa;

  // Throttle
  function throttle(fn, limit) {
    let inThrottle = false;
    let lastArgs, lastThis;
    return function throttled(...args) {
      lastArgs = args;
      lastThis = this;
      if (!inThrottle) {
        fn.apply(lastThis, lastArgs);
        inThrottle = true;
        setTimeout(() => {
          inThrottle = false;
          if (lastArgs !== args) {
            fn.apply(lastThis, lastArgs);
          }
        }, limit);
      }
    };
  }
  App.util.throttle = throttle;

  // Debounce
  function debounce(fn, delay) {
    let t;
    return function debounced(...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), delay);
    };
  }
  App.util.debounce = debounce;

  // Current year in footer
  function setCurrentYear(sel = '#year') {
    const el = qs(sel);
    if (el) el.textContent = new Date().getFullYear();
  }
  App.util.setCurrentYear = setCurrentYear;

  // Smooth scroll to anchor (native API fallback safe)
  function smoothScrollTo(target) {
    if (!target) return;
    try {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch {
      // Fallback
      const top = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo(0, top);
    }
  }
  App.util.smoothScrollTo = smoothScrollTo;

  // Reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  App.util.prefersReducedMotion = prefersReducedMotion;

  // On event helper
  function on(el, evt, handler, opts) {
    el.addEventListener(evt, handler, opts || false);
    return () => el.removeEventListener(evt, handler, opts || false);
  }
  App.util.on = on;

  // Pointer glow helper: update CSS vars --mx/--my on element
  function enablePointerGlow(el) {
    if (!el) return;
    const move = (e) => {
      const rect = el.getBoundingClientRect();
      const x = Math.round(e.clientX - rect.left);
      const y = Math.round(e.clientY - rect.top);
      el.style.setProperty('--mx', x + 'px');
      el.style.setProperty('--my', y + 'px');
    };
    const leave = () => {
      el.style.removeProperty('--mx');
      el.style.removeProperty('--my');
    };
    on(el, 'mousemove', move);
    on(el, 'mouseleave', leave);
  }
  App.util.enablePointerGlow = enablePointerGlow;

  // Initialize utils that should always run
  function initBase() {
    setCurrentYear();
    // Enable pointer glow for service cards if present
    qsa('.service-card').forEach(enablePointerGlow);
  }
  App.util.initBase = initBase;

  // Run on DOM ready (scripts are defer, but keep safe)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBase);
  } else {
    initBase();
  }
})();