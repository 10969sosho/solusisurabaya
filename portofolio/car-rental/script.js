const CAR_DATA = [
  { id: 1, name: "Toyota Avanza", brand: "Toyota", type: "MPV", price: 235000000, hp: 103, engine: "1.5L", transmission: "CVT", fuel: "Bensin", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600" },
  { id: 2, name: "Honda Brio", brand: "Honda", type: "Hatchback", price: 220000000, hp: 120, engine: "1.5L", transmission: "CVT", fuel: "Bensin", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600" },
  { id: 3, name: "Honda CR-V", brand: "Honda", type: "SUV", price: 545000000, hp: 190, engine: "1.5L Turbo", transmission: "CVT", fuel: "Bensin", image: "https://images.unsplash.com/photo-1568844293986-8d0400f4745b?w=600" },
  { id: 4, name: "Toyota Camry", brand: "Toyota", type: "Sedan", price: 580000000, hp: 181, engine: "2.5L", transmission: "CVT", fuel: "Bensin", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600" },
  { id: 5, name: "Honda Civic", brand: "Honda", type: "Sedan", price: 450000000, hp: 176, engine: "1.5L Turbo", transmission: "CVT", fuel: "Bensin", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600" },
  { id: 6, name: "Toyota Fortuner", brand: "Toyota", type: "SUV", price: 520000000, hp: 201, engine: "2.4L Diesel", transmission: "Automatic", fuel: "Diesel", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600" },
  { id: 7, name: "Mitsubishi Pajero Sport", brand: "Mitsubishi", type: "SUV", price: 510000000, hp: 181, engine: "2.4L Diesel", transmission: "Automatic", fuel: "Diesel", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600" },
  { id: 8, name: "Toyota Kijang Innova", brand: "Toyota", type: "MPV", price: 380000000, hp: 139, engine: "2.0L", transmission: "Automatic", fuel: "Bensin", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600" },
  { id: 9, name: "BMW 320i", brand: "BMW", type: "Sedan", price: 1250000000, hp: 184, engine: "2.0L Turbo", transmission: "Automatic", fuel: "Bensin", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600" },
  { id: 10, name: "Mercedes C200", brand: "Mercedes", type: "Sedan", price: 1380000000, hp: 184, engine: "2.0L Turbo", transmission: "Automatic", fuel: "Bensin", image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=600" },
  { id: 11, name: "Porsche Cayenne", brand: "Porsche", type: "SUV", price: 1650000000, hp: 340, engine: "3.0L V6 Turbo", transmission: "Automatic", fuel: "Bensin", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600" },
  { id: 12, name: "Mazda CX-5", brand: "Mazda", type: "SUV", price: 530000000, hp: 165, engine: "2.0L Skyactiv", transmission: "Automatic", fuel: "Bensin", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600" }
];

function formatPrice(price) {
  return 'Rp ' + price.toLocaleString('id-ID');
}

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const links = document.querySelector('.navbar-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('active');
  });
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('active');
    });
  });
}

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

function initAnimatedStats() {
  const statElements = document.querySelectorAll('[data-count]');
  if (!statElements.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = prefix + Math.floor(current).toLocaleString('id-ID') + suffix;
        }, 30);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statElements.forEach(el => observer.observe(el));
}

function initCarFilter() {
  const filterForm = document.getElementById('filterForm');
  if (!filterForm) return;
  filterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    filterCars();
  });
}

function filterCars() {
  const brand = document.getElementById('filterBrand')?.value || '';
  const type = document.getElementById('filterType')?.value || '';
  const maxPrice = parseInt(document.getElementById('filterPrice')?.value) || 0;
  const cards = document.querySelectorAll('.car-card');
  let visibleCount = 0;
  cards.forEach(card => {
    const cardBrand = card.dataset.brand;
    const cardType = card.dataset.type;
    const cardPrice = parseInt(card.dataset.price);
    let show = true;
    if (brand && cardBrand !== brand) show = false;
    if (type && cardType !== type) show = false;
    if (maxPrice && cardPrice > maxPrice) show = false;
    card.classList.toggle('hidden', !show);
    if (show) visibleCount++;
  });
  const noResults = document.getElementById('noResults');
  if (noResults) {
    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
  }
}

function initGallery() {
  const thumbs = document.querySelectorAll('.gallery-thumb');
  const mainImage = document.querySelector('.gallery-main img');
  if (!thumbs.length || !mainImage) return;
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      mainImage.src = thumb.querySelector('img').src;
    });
  });
}

function initColorSelector() {
  const swatches = document.querySelectorAll('.color-swatch');
  if (!swatches.length) return;
  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
    });
  });
}

function initTestDriveForm() {
  const form = document.getElementById('testDriveForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]')?.value;
    const phone = form.querySelector('[name="phone"]')?.value;
    const date = form.querySelector('[name="date"]')?.value;
    const branch = form.querySelector('[name="branch"]')?.value;
    if (!name || !phone || !date || !branch) {
      alert('Mohon lengkapi semua field');
      return;
    }
    alert('Terima kasih! Permintaan test drive Anda telah dikirim. Tim kami akan menghubungi Anda dalam 1x24 jam.');
    form.reset();
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Terima kasih! Pesan Anda telah dikirim. Tim kami akan merespon dalam 1x24 jam.');
    form.reset();
  });
}

function initFavorites() {
  document.querySelectorAll('.car-card-favorite').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      btn.classList.toggle('active');
    });
  });
}

function initWhatsAppLink() {
  document.querySelectorAll('.btn-whatsapp').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const phone = '6281234567890';
      const text = encodeURIComponent('Halo Autovista Prestige Motors! Saya tertarik dengan penawaran mobil yang ada. Mohon informasi lebih lanjut.');
      window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initAnimatedStats();
  initCarFilter();
  initGallery();
  initColorSelector();
  initTestDriveForm();
  initContactForm();
  initFavorites();
  initWhatsAppLink();
});
