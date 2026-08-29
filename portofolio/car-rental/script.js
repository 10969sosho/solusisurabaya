/* ============================================
   AUTOVISTA PRESTIGE MOTORS — Main Script
   Three.js + GSAP + Interactions
   ============================================ */

// === CAR DATA ===
const CAR_DATA = [
  { id: 1, name: "Camry Hybrid", brand: "Toyota", category: "Luxury", type: "Sedan", price: 580, hp: 210, engine: "2.5L", transmission: "CVT", fuel: "Hybrid", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600" },
  { id: 2, name: "CR-V Turbo", brand: "Honda", category: "SUV", type: "SUV", price: 545, hp: 190, engine: "1.5L Turbo", transmission: "CVT", fuel: "Petrol", image: "https://images.unsplash.com/photo-1543832923-44685a9c0d58?w=600" },
  { id: 3, name: "320i Sport", brand: "BMW", category: "Luxury", type: "Sedan", price: 1250, hp: 184, engine: "2.0L Turbo", transmission: "Automatic", fuel: "Petrol", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600" },
  { id: 4, name: "C200 AMG Line", brand: "Mercedes", category: "Luxury", type: "Sedan", price: 1380, hp: 204, engine: "2.0L Turbo", transmission: "Automatic", fuel: "Petrol", image: "https://https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=600" },
  { id: 5, name: "Fortuner VRZ", brand: "Toyota", category: "SUV", type: "SUV", price: 720, hp: 204, engine: "2.4L Diesel", transmission: "Automatic", fuel: "Diesel", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600" },
  { id: 6, name: "Civic RS", brand: "Honda", category: "Sports", type: "Sedan", price: 560, hp: 178, engine: "1.5L Turbo", transmission: "CVT", fuel: "Petrol", image: "https://images.unsplash.com/photo-1543832923-44685a9c0d58?w=600" },
  { id: 7, name: "X3 xDrive30i", brand: "BMW", category: "SUV", type: "SUV", price: 1650, hp: 252, engine: "2.0L Turbo", transmission: "Automatic", fuel: "Petrol", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600" },
  { id: 8, name: "CX-5 RWD", brand: "Mazda", category: "SUV", type: "SUV", price: 620, hp: 192, engine: "2.0L Skyactiv", transmission: "Automatic", fuel: "Petrol", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600" },
  { id: 9, name: "Avanza 1.5 G", brand: "Toyota", category: "Luxury", type: "MPV", price: 355, hp: 105, engine: "1.5L", transmission: "CVT", fuel: "Petrol", image: "https://images.unsplash.com/photo-1543832923-44685a9c0d58?w=600" },
  { id: 10, name: "HR-V RS", brand: "Honda", category: "SUV", type: "SUV", price: 415, hp: 178, engine: "1.5L Turbo", transmission: "CVT", fuel: "Petrol", image: "https://images.unsplash.com/photo-1543832923-44685a9c0d58?w=600" },
  { id: 11, name: "Ertiga Sport", brand: "Suzuki", category: "Electric", type: "MPV", price: 275, hp: 104, engine: "1.5L", transmission: "Manual", fuel: "Petrol", image: "https://images.unsplash.com/photo-1543832923-44685a9c0d58?w=600" },
  { id: 12, name: "3 Hatchback", brand: "Mazda", category: "Sports", type: "Hatchback", price: 530, hp: 164, engine: "2.0L Skyactiv", transmission: "Automatic", fuel: "Petrol", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600" }
];

function formatPrice(price) {
  return 'Rp ' + (price * 1000000).toLocaleString('id-ID');
}

// === THREE.JS HERO PARTICLES ===
function initHeroParticles() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Floating particles
  const particlesGeometry = new THREE.BufferGeometry();
  const count = 800;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 15;
    positions[i + 1] = (Math.random() - 0.5) * 15;
    positions[i + 2] = (Math.random() - 0.5) * 15;
    const isBlue = Math.random() > 0.6;
    colors[i] = isBlue ? 0 : 0.4;
    colors[i + 1] = isBlue ? 0.44 : 0.44;
    colors[i + 2] = isBlue ? 0.89 : 0.47;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  });

  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  // 3D Car model (geometric abstraction)
  const carGroup = new THREE.Group();

  // Body
  const bodyGeo = new THREE.BoxGeometry(2.4, 0.6, 1.2);
  const bodyMat = new THREE.MeshPhongMaterial({ color: 0x1a1a2e, shininess: 100, specular: 0x444444 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 0.4;
  carGroup.add(body);

  // Cabin
  const cabinGeo = new THREE.BoxGeometry(1.4, 0.5, 1.1);
  const cabinMat = new THREE.MeshPhongMaterial({ color: 0x111122, shininess: 120, specular: 0x666666, transparent: true, opacity: 0.85 });
  const cabin = new THREE.Mesh(cabinGeo, cabinMat);
  cabin.position.set(-0.1, 0.95, 0);
  carGroup.add(cabin);

  // Wheels
  const wheelGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.15, 16);
  const wheelMat = new THREE.MeshPhongMaterial({ color: 0x222222, shininess: 60 });
  const wheelPositions = [
    [-0.75, 0.15, 0.65], [-0.75, 0.15, -0.65],
    [0.75, 0.15, 0.65], [0.75, 0.15, -0.65]
  ];
  const wheels = [];
  wheelPositions.forEach(pos => {
    const wheel = new THREE.Mesh(wheelGeo, wheelMat);
    wheel.position.set(...pos);
    wheel.rotation.x = Math.PI / 2;
    carGroup.add(wheel);
    wheels.push(wheel);
  });

  // Headlights
  const lightGeo = new THREE.SphereGeometry(0.08, 8, 8);
  const lightMat = new THREE.MeshBasicMaterial({ color: 0x0071e3 });
  const headlightL = new THREE.Mesh(lightGeo, lightMat);
  headlightL.position.set(1.2, 0.45, 0.4);
  carGroup.add(headlightL);
  const headlightR = headlightL.clone();
  headlightR.position.z = -0.4;
  carGroup.add(headlightR);

  // Taillights
  const tailMat = new THREE.MeshBasicMaterial({ color: 0xff453a });
  const taillightL = new THREE.Mesh(lightGeo, tailMat);
  taillightL.position.set(-1.2, 0.45, 0.4);
  carGroup.add(taillightL);
  const taillightR = taillightL.clone();
  taillightR.position.z = -0.4;
  carGroup.add(taillightR);

  carGroup.position.set(3.5, -0.5, 0);
  carGroup.rotation.y = -0.3;
  scene.add(carGroup);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0x0071e3, 1.5, 20);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);
  const pointLight2 = new THREE.PointLight(0x42a5f5, 0.8, 15);
  pointLight2.position.set(-5, 3, -3);
  scene.add(pointLight2);

  camera.position.z = 6;
  camera.position.y = 1;

  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate() {
    requestAnimationFrame(animate);
    particles.rotation.y += 0.0005;
    particles.rotation.x += 0.0002;
    carGroup.rotation.y = -0.3 + mouseX * 0.15;
    carGroup.position.y = -0.5 + Math.sin(Date.now() * 0.001) * 0.08;
    wheels.forEach(w => { w.rotation.z += 0.02; });
    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 0.3 + 1 - camera.position.y) * 0.02;
    camera.lookAt(1, 0.3, 0);
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// === GSAP SCROLL ANIMATIONS ===
function initGSAPAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Hero text reveal
  gsap.from('.hero-badge', { opacity: 0, y: 30, duration: 0.8, delay: 0.2, ease: 'power3.out' });
  gsap.from('.hero h1', { opacity: 0, y: 40, duration: 1, delay: 0.4, ease: 'power3.out' });
  gsap.from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.8, delay: 0.6, ease: 'power3.out' });
  gsap.from('.hero-buttons', { opacity: 0, y: 30, duration: 0.8, delay: 0.8, ease: 'power3.out' });
  gsap.from('.hero-stats', { opacity: 0, y: 30, duration: 0.8, delay: 1, ease: 'power3.out' });

  // Scroll-triggered reveals
  gsap.utils.toArray('.gsap-reveal').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true }
    });
  });

  gsap.utils.toArray('.gsap-reveal-left').forEach(el => {
    gsap.fromTo(el, { opacity: 0, x: -40 }, {
      opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true }
    });
  });

  gsap.utils.toArray('.gsap-reveal-right').forEach(el => {
    gsap.fromTo(el, { opacity: 0, x: 40 }, {
      opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true }
    });
  });

  gsap.utils.toArray('.gsap-reveal-scale').forEach(el => {
    gsap.fromTo(el, { opacity: 0, scale: 0.95 }, {
      opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true }
    });
  });

  // Staggered grid animations
  gsap.utils.toArray('.car-grid, .services-grid, .pricing-grid').forEach(grid => {
    const cards = grid.children;
    gsap.fromTo(cards, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: grid, start: 'top 80%', once: true }
    });
  });

  // Timeline animation
  gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    gsap.fromTo(item, { opacity: 0, x: -30 }, {
      opacity: 1, x: 0, duration: 0.6, delay: i * 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: item, start: 'top 85%', once: true }
    });
  });

  // Counter animations
  gsap.utils.toArray('[data-count]').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target, duration: 2, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () => {
        el.textContent = prefix + Math.floor(obj.val).toLocaleString('id-ID') + suffix;
      }
    });
  });

  // Parallax for page hero images
  gsap.utils.toArray('.parallax-bg').forEach(bg => {
    gsap.to(bg, {
      y: 60, ease: 'none',
      scrollTrigger: { trigger: bg.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 }
    });
  });
}

// === 3D CARD TILT ===
function init3DTilt() {
  const cards = document.querySelectorAll('.car-card, .service-card, .pricing-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -6;
      const rotateY = (x - centerX) / centerX * 6;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });
}

// === GALLERY TILT (model-detail) ===
function initGalleryTilt() {
  const gallery = document.querySelector('.gallery-main');
  if (!gallery) return;
  gallery.addEventListener('mousemove', (e) => {
    const rect = gallery.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -4;
    const rotateY = (x - centerX) / centerX * 4;
    gallery.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  gallery.addEventListener('mouseleave', () => {
    gallery.style.transform = 'perspective(1200px) rotateX(0) rotateY(0)';
  });
}

// === NAVBAR ===
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  });
}

// === MOBILE MENU ===
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const overlay = document.querySelector('.mobile-menu-overlay');
  if (!toggle || !overlay) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
  });

  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// === GALLERY ===
function initGallery() {
  const thumbs = document.querySelectorAll('.gallery-thumb');
  const mainImage = document.querySelector('.gallery-main img');
  if (!thumbs.length || !mainImage) return;
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const img = thumb.querySelector('img');
      if (img) mainImage.src = img.src;
    });
  });
}

// === COLOR SELECTOR ===
function initColorSelector() {
  const swatches = document.querySelectorAll('.color-swatch');
  const colorNameEl = document.getElementById('selectedColor');
  if (!swatches.length) return;
  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      if (colorNameEl) colorNameEl.textContent = swatch.getAttribute('data-color');
    });
  });
}

// === CAR FILTER ===
function initCarFilter() {
  const filterForm = document.getElementById('filterForm');
  if (!filterForm) return;
  filterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    filterCars();
  });
  // Also filter on change
  filterForm.querySelectorAll('select, input').forEach(el => {
    el.addEventListener('change', filterCars);
  });
}

function filterCars() {
  const brand = document.getElementById('filterBrand')?.value || '';
  const type = document.getElementById('filterType')?.value || '';
  const maxPrice = parseInt(document.getElementById('filterPrice')?.value) || 0;
  const cards = document.querySelectorAll('.car-card[data-brand]');
  let visibleCount = 0;

  cards.forEach(card => {
    const cardBrand = card.dataset.brand;
    const cardType = card.dataset.type;
    const cardPrice = parseInt(card.dataset.price);
    let show = true;
    if (brand && cardBrand !== brand) show = false;
    if (type && cardType !== type) show = false;
    if (maxPrice && cardPrice > maxPrice) show = false;
    card.style.display = show ? '' : 'none';
    if (show) visibleCount++;
  });

  const noResults = document.getElementById('noResults');
  if (noResults) noResults.style.display = visibleCount === 0 ? 'block' : 'none';
}

// === FAQ ===
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item.active').forEach(openItem => {
        openItem.classList.remove('active');
        openItem.querySelector('.faq-answer').style.maxHeight = '0';
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

// === TEST DRIVE FORM ===
function initTestDriveForm() {
  const form = document.getElementById('testDriveForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]')?.value;
    const phone = form.querySelector('[name="phone"]')?.value;
    const date = form.querySelector('[name="date"]')?.value;
    if (!name || !phone || !date) {
      alert('Please fill in all required fields.');
      return;
    }
    alert('Thank you! Your test drive request has been submitted. Our team will contact you within 24 hours.');
    form.reset();
  });
}

// === CONTACT FORM ===
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Your message has been sent. We will respond within 24 hours.');
    form.reset();
  });
}

// === FAVORITES ===
function initFavorites() {
  document.querySelectorAll('.car-card-favorite').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      btn.classList.toggle('active');
    });
  });
}

// === WHATSAPP LINK ===
function initWhatsAppLinks() {
  document.querySelectorAll('.btn-whatsapp, [data-whatsapp]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const phone = '6281234567890';
      const text = encodeURIComponent("Hello Autovista Prestige Motors! I'm interested in your vehicles. Please provide more information.");
      window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    });
  });
}

// === QUICK VIEW MODAL ===
function initQuickView() {
  document.querySelectorAll('[data-quickview]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = parseInt(btn.getAttribute('data-quickview'));
      const car = CAR_DATA.find(c => c.id === id);
      if (!car) return;

      const modal = document.getElementById('quickViewModal');
      if (!modal) return;

      modal.querySelector('.modal-image img').src = car.image;
      modal.querySelector('.modal-body h2').textContent = car.brand + ' ' + car.name;
      modal.querySelector('.modal-price').textContent = formatPrice(car.price);
      modal.querySelector('.modal-specs').innerHTML = `
        <span class="modal-spec"><i class="fas fa-gauge-high"></i> ${car.hp} HP</span>
        <span class="modal-spec"><i class="fas fa-gear"></i> ${car.transmission}</span>
        <span class="modal-spec"><i class="fas fa-gas-pump"></i> ${car.fuel}</span>
      `;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const modal = document.getElementById('quickViewModal');
  if (modal) {
    modal.querySelector('.modal-close').addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

// === STICKY BOOKING BAR ===
function initStickyBooking() {
  const stickyBar = document.querySelector('.sticky-booking');
  if (!stickyBar) return;
  const priceCard = document.querySelector('.price-card');
  if (!priceCard) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      stickyBar.style.display = entry.isIntersecting ? 'none' : 'flex';
    });
  }, { threshold: 0 });
  observer.observe(priceCard);
}

// === SMOOTH SCROLL ===
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initHeroParticles();
  initGSAPAnimations();
  init3DTilt();
  initGalleryTilt();
  initGallery();
  initColorSelector();
  initCarFilter();
  initFAQ();
  initTestDriveForm();
  initContactForm();
  initFavorites();
  initWhatsAppLinks();
  initQuickView();
  initStickyBooking();
  initSmoothScroll();
});
