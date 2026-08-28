// ============================================
// ELVOIRA Fashion - Premium E-Commerce JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initGallery();
  initSizeSelector();
  initColorSelector();
  initQuantity();
  initTabs();
  initFilterSort();
  initPagination();
  initNewsletter();
  initCartCount();
});

// ============================================
// NAVBAR
// ============================================
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Set active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav a').forEach(link => {
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
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.navbar-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('active');
    });
  });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
}

// ============================================
// PRODUCT GALLERY
// ============================================
function initGallery() {
  const mainImage = document.querySelector('.gallery-main img');
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
  const sizeBtns = document.querySelectorAll('.size-options button');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

// ============================================
// COLOR SELECTOR
// ============================================
function initColorSelector() {
  const colorBtns = document.querySelectorAll('.color-options button');
  colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      colorBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

// ============================================
// QUANTITY SELECTOR
// ============================================
function initQuantity() {
  const container = document.querySelector('.quantity-selector');
  if (!container) return;

  const minus = container.querySelector('.minus');
  const plus = container.querySelector('.plus');
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
  const tabBtns = document.querySelectorAll('.tabs-nav button');
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
  const filterOptions = document.querySelectorAll('.filter-option');
  const sortSelect = document.querySelector('.sort-select');
  const productCards = document.querySelectorAll('.shop-products-grid .product-card');

  let activeCategory = 'all';

  filterOptions.forEach(option => {
    option.addEventListener('click', () => {
      filterOptions.forEach(o => o.classList.remove('active'));
      option.classList.add('active');
      activeCategory = option.dataset.category || 'all';
      filterProducts(activeCategory, sortSelect?.value || 'popular', productCards);
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      filterProducts(activeCategory, sortSelect.value, productCards);
    });
  }
}

function filterProducts(category, sort, cards) {
  cards.forEach(card => {
    const cardCategory = card.dataset.category || '';
    if (category === 'all' || cardCategory === category) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });

  const grid = document.querySelector('.shop-products-grid');
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
// PAGINATION
// ============================================
function initPagination() {
  const pageBtns = document.querySelectorAll('.pagination button:not(.prev):not(.next)');
  pageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pageBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

// ============================================
// NEWSLETTER FORM
// ============================================
function initNewsletter() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    const email = input?.value.trim();

    if (!email || !isValidEmail(email)) {
      shakeElement(form);
      return;
    }

    input.value = '';
    showNotification('Terima kasih telah berlangganan!');
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function shakeElement(el) {
  el.style.animation = 'none';
  el.offsetHeight;
  el.style.animation = 'shake 0.5s ease';
}

// ============================================
// CART
// ============================================
function initCartCount() {
  const count = parseInt(localStorage.getItem('elvoira_cart_count') || '0');
  updateCartBadge(count);
}

function addToCart(productName) {
  let count = parseInt(localStorage.getItem('elvoira_cart_count') || '0');
  count++;
  localStorage.setItem('elvoira_cart_count', count);
  updateCartBadge(count);
  showNotification(`${productName} ditambahkan ke keranjang!`);
}

function updateCartBadge(count) {
  const badges = document.querySelectorAll('.cart-count');
  badges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });
}

// ============================================
// NOTIFICATIONS
// ============================================
function showNotification(message) {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `
    <div style="
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: #111111;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      z-index: 9999;
      animation: fadeInUp 0.3s ease;
      box-shadow: 0 8px 30px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    ">
      <span style="color: #F5A6B4;">&#10003;</span> ${message}
    </div>
  `;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================
// ADD TO CART BUTTON HANDLER
// ============================================
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = btn.dataset.name || 'Produk';
    addToCart(name);
  });
});

// ============================================
// SHAKE ANIMATION (for validation)
// ============================================
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
  }
`;
document.head.appendChild(style);
