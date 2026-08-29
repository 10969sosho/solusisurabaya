/* ============================================
   ELVOIRA Fashion — Premium E-Commerce JS
   Three.js + GSAP + 3D Interactions
   ============================================ */

(function () {
  'use strict';

  // ============================================
  // INIT
  // ============================================
  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initMobileMenu();
    initHeroThree();
    initGSAP();
    init3DCards();
    initGallery();
    initSizeSelector();
    initColorSelector();
    initQuantity();
    initTabs();
    initFilterSort();
    initNewsletter();
    initCartCount();
    initStickyCart();
    initProductGalleryTilt();
  });

  // ============================================
  // NAVIGATION
  // ============================================
  function initNav() {
    const nav = document.getElementById('mainNav');
    if (!nav) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const isDark = document.querySelector('.hero, .section--dark, .about-hero');

      if (scrollY > 20) {
        nav.style.background = '';
      }

      lastScroll = scrollY;
    }, { passive: true });

    // Set active link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // ============================================
  // MOBILE MENU
  // ============================================
  function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const menu = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      menu.classList.toggle('open');
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });

    menu.querySelectorAll('.mobile-menu__link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ============================================
  // THREE.JS — Hero Floating Particles
  // ============================================
  function initHeroThree() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particles
    const particleCount = window.innerWidth < 768 ? 80 : 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      sizes[i] = Math.random() * 2 + 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      color: 0x0071e3,
      size: 0.015,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Floating rings
    const ringGeometry = new THREE.TorusGeometry(1.5, 0.005, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x0071e3, transparent: true, opacity: 0.15 });
    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
    const ring2 = new THREE.Mesh(ringGeometry, ringMaterial.clone());
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    scene.add(ring1, ring2);

    // Mouse tracking
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    // Animation loop
    let raf;
    function animate() {
      raf = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      particles.rotation.y = time * 0.05;
      particles.rotation.x = time * 0.03;

      ring1.rotation.z = time * 0.2;
      ring2.rotation.z = -time * 0.15;

      // Smooth mouse follow
      camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 0.2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    animate();

    // Resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }, { passive: true });

    // Cleanup on page leave
    window.addEventListener('beforeunload', () => {
      cancelAnimationFrame(raf);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    });
  }

  // ============================================
  // GSAP — ScrollTrigger Animations
  // ============================================
  function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance
    const heroTimeline = gsap.timeline({ delay: 0.3 });
    heroTimeline
      .from('.hero__overline', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' })
      .from('.hero__title', { opacity: 0, y: 40, duration: 0.9, ease: 'power3.out' }, '-=0.5')
      .from('.hero__subtitle', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .from('.hero__actions', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .from('.hero__scroll', { opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2');

    // Generic reveal for all .gsap-reveal elements
    gsap.utils.toArray('.gsap-reveal').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true
          }
        }
      );
    });

    // Left reveal
    gsap.utils.toArray('.gsap-reveal-left').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

    // Right reveal
    gsap.utils.toArray('.gsap-reveal-right').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

    // Scale reveal
    gsap.utils.toArray('.gsap-reveal-scale').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

    // Staggered product cards
    const productGrids = document.querySelectorAll('.products-grid, .shop-grid, .related-grid');
    productGrids.forEach(grid => {
      const cards = grid.querySelectorAll('.product-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

    // Staggered category cards
    const catGrid = document.querySelector('.categories-grid');
    if (catGrid) {
      const cards = catGrid.querySelectorAll('.category-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: catGrid,
            start: 'top 85%',
            once: true
          }
        }
      );
    }

    // Parallax for hero content
    gsap.to('.hero__content', {
      y: 80,
      opacity: 0.3,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // ============================================
  // 3D CARD TILT — Mouse Following
  // ============================================
  function init3DCards() {
    const cards = document.querySelectorAll('.product-card');
    if (!cards.length) return;

    cards.forEach(card => {
      const inner = card.querySelector('.product-card__inner');
      if (!inner) return;

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        inner.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        inner.style.transition = 'transform 0.1s ease';
      });

      card.addEventListener('mouseleave', () => {
        inner.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
        inner.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)';
      });
    });
  }

  // ============================================
  // PRODUCT GALLERY — 3D Tilt
  // ============================================
  function initProductGalleryTilt() {
    const gallery = document.querySelector('.product-gallery__main');
    if (!gallery) return;

    gallery.addEventListener('mousemove', (e) => {
      const rect = gallery.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      const img = gallery.querySelector('.product-gallery__main-img');
      if (img) {
        img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      }
    });

    gallery.addEventListener('mouseleave', () => {
      const img = gallery.querySelector('.product-gallery__main-img');
      if (img) {
        img.style.transform = 'rotateX(0) rotateY(0) scale(1)';
        img.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
      }
    });
  }

  // ============================================
  // GALLERY THUMBS
  // ============================================
  function initGallery() {
    const mainImage = document.querySelector('.product-gallery__main-img');
    const thumbs = document.querySelectorAll('.gallery-thumb');
    if (!mainImage || !thumbs.length) return;

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        mainImage.style.opacity = '0';
        setTimeout(() => {
          mainImage.src = thumb.querySelector('img').src;
          mainImage.style.opacity = '1';
        }, 200);
      });
    });
  }

  // ============================================
  // SIZE SELECTOR
  // ============================================
  function initSizeSelector() {
    const sizeBtns = document.querySelectorAll('.size-option');
    sizeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sizeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const label = btn.closest('.product-info')?.querySelector('.option-label span');
        if (label) label.textContent = btn.textContent;
      });
    });
  }

  // ============================================
  // COLOR SELECTOR
  // ============================================
  function initColorSelector() {
    const colorBtns = document.querySelectorAll('.color-option');
    colorBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        colorBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const label = btn.closest('.product-info')?.querySelectorAll('.option-label span')[1];
        if (label) label.textContent = btn.title || '';
      });
    });
  }

  // ============================================
  // QUANTITY SELECTOR
  // ============================================
  function initQuantity() {
    const container = document.querySelector('.quantity-selector');
    if (!container) return;

    const minus = container.querySelector('.quantity-selector__btn:first-child');
    const plus = container.querySelector('.quantity-selector__btn:last-child');
    const input = container.querySelector('input');

    if (minus && plus && input) {
      minus.addEventListener('click', () => {
        let val = parseInt(input.value) || 1;
        if (val > 1) input.value = val - 1;
      });

      plus.addEventListener('click', () => {
        let val = parseInt(input.value) || 1;
        if (val < 10) input.value = val + 1;
      });

      input.addEventListener('change', () => {
        let val = parseInt(input.value);
        if (isNaN(val) || val < 1) input.value = 1;
        if (val > 10) input.value = 10;
      });
    }
  }

  // ============================================
  // PRODUCT TABS
  // ============================================
  function initTabs() {
    const tabBtns = document.querySelectorAll('.product-tabs__btn');
    const tabContents = document.querySelectorAll('.tab-content');
    if (!tabBtns.length) return;

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        const content = document.getElementById(target);
        if (content) content.classList.add('active');
      });
    });
  }

  // ============================================
  // FILTER & SORT (Shop Page)
  // ============================================
  function initFilterSort() {
    const filterTags = document.querySelectorAll('.filter-tag');
    const sortSelect = document.querySelector('.filter-bar__sort select');
    const productCards = document.querySelectorAll('.shop-grid .product-card');
    const countEl = document.querySelector('.filter-bar__count');

    let activeCategory = 'all';

    filterTags.forEach(tag => {
      tag.addEventListener('click', () => {
        filterTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        activeCategory = tag.dataset.category || 'all';
        filterProducts(activeCategory, sortSelect?.value || 'popular', productCards, countEl);
      });
    });

    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        filterProducts(activeCategory, sortSelect.value, productCards, countEl);
      });
    }
  }

  function filterProducts(category, sort, cards, countEl) {
    let visible = 0;
    cards.forEach(card => {
      const cardCategory = card.dataset.category || '';
      const show = category === 'all' || cardCategory === category;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    if (countEl) countEl.textContent = `${visible} products`;

    const grid = document.querySelector('.shop-grid');
    if (!grid) return;

    const visibleCards = Array.from(cards).filter(c => c.style.display !== 'none');
    visibleCards.sort((a, b) => {
      const priceA = parseInt(a.dataset.price) || 0;
      const priceB = parseInt(b.dataset.price) || 0;
      if (sort === 'price-low') return priceA - priceB;
      if (sort === 'price-high') return priceB - priceA;
      return 0;
    });
    visibleCards.forEach(card => grid.appendChild(card));
  }

  // ============================================
  // NEWSLETTER
  // ============================================
  function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      const email = input?.value.trim();

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        form.style.animation = 'none';
        form.offsetHeight;
        form.style.animation = 'shake 0.5s ease';
        return;
      }

      input.value = '';
      showToast('Welcome! You\'re now subscribed.');
    });
  }

  // ============================================
  // CART
  // ============================================
  function initCartCount() {
    const count = parseInt(localStorage.getItem('elvoira_cart') || '0');
    updateCartBadge(count);
  }

  function addToCart(name) {
    let count = parseInt(localStorage.getItem('elvoira_cart') || '0');
    count++;
    localStorage.setItem('elvoira_cart', count);
    updateCartBadge(count);
    showToast(`${name} added to cart`);
  }

  function updateCartBadge(count) {
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
      badge.textContent = count;
      badge.classList.toggle('visible', count > 0);
    });
  }

  // Add to cart button handlers
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = btn.dataset.name || 'Product';
      addToCart(name);
    });
  });

  // ============================================
  // STICKY CART (Mobile)
  // ============================================
  function initStickyCart() {
    const stickyCart = document.querySelector('.sticky-cart');
    const addBtn = document.querySelector('.add-to-cart-row');
    if (!stickyCart || !addBtn) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        stickyCart.classList.toggle('visible', !entry.isIntersecting);
      });
    }, { threshold: 0 });

    observer.observe(addBtn);
  }

  // ============================================
  // TOAST NOTIFICATION
  // ============================================
  function showToast(message) {
    const toast = document.getElementById('toast');
    const msgEl = document.getElementById('toastMessage');
    if (!toast || !msgEl) return;

    msgEl.textContent = message;
    toast.classList.add('visible');

    setTimeout(() => {
      toast.classList.remove('visible');
    }, 3000);
  }

  // ============================================
  // SMOOTH SCROLL
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();

// Shake animation (injected)
const _shakeStyle = document.createElement('style');
_shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    50% { transform: translateX(4px); }
    75% { transform: translateX(-4px); }
  }
`;
document.head.appendChild(_shakeStyle);
