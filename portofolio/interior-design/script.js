// ── Lumina Interior Studio — Premium Scripts ──
// Three.js 3D + GSAP ScrollTrigger + 3D Tilt + Mobile Menu + Lightbox

document.addEventListener('DOMContentLoaded', () => {

  // ── GSAP Registration ──
  gsap.registerPlugin(ScrollTrigger);

  // ── Mobile Menu ──
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  if (mobileToggle && mobileOverlay) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileOverlay.classList.toggle('active');
      document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
    });
    mobileOverlay.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Navbar Scroll ──
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ── Smooth Scroll ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = navbar.offsetHeight + 20;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });

  // ── Three.js: Hero Floating Particles ──
  const heroCanvas = document.getElementById('hero-canvas');
  if (heroCanvas && typeof THREE !== 'undefined') {
    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, heroCanvas.clientWidth / heroCanvas.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas: heroCanvas, alpha: true, antialias: true });
      renderer.setSize(heroCanvas.clientWidth, heroCanvas.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Floating particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 200;
      const posArray = new Float32Array(particlesCount * 3);
      const scaleArray = new Float32Array(particlesCount);

      for (let i = 0; i < particlesCount; i++) {
        posArray[i * 3] = (Math.random() - 0.5) * 20;
        posArray[i * 3 + 1] = (Math.random() - 0.5) * 20;
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 10;
        scaleArray[i] = Math.random() * 2 + 0.5;
      }
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x0071e3,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });
      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);

      // Subtle ambient light geometry (abstract interior shapes)
      const ambientGeo = new THREE.IcosahedronGeometry(0.5, 1);
      const ambientMat = new THREE.MeshBasicMaterial({ color: 0x0071e3, wireframe: true, transparent: true, opacity: 0.08 });
      const ambientMesh1 = new THREE.Mesh(ambientGeo, ambientMat);
      ambientMesh1.position.set(-3, 1, -2);
      scene.add(ambientMesh1);

      const ambientMesh2 = new THREE.Mesh(new THREE.OctahedronGeometry(0.4, 0), ambientMat.clone());
      ambientMesh2.position.set(4, -1, -3);
      scene.add(ambientMesh2);

      const ambientMesh3 = new THREE.Mesh(new THREE.TetrahedronGeometry(0.3, 0), ambientMat.clone());
      ambientMesh3.position.set(1, 2, -1);
      scene.add(ambientMesh3);

      camera.position.z = 5;

      let mouseX = 0, mouseY = 0;
      document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      });

      function animateParticles() {
        requestAnimationFrame(animateParticles);
        const time = Date.now() * 0.0005;
        particlesMesh.rotation.y = time * 0.1;
        particlesMesh.rotation.x = time * 0.05;
        particlesMesh.position.x = mouseX * 0.3;
        particlesMesh.position.y = mouseY * 0.3;

        ambientMesh1.rotation.x = time * 0.3;
        ambientMesh1.rotation.y = time * 0.2;
        ambientMesh2.rotation.x = time * 0.2;
        ambientMesh2.rotation.z = time * 0.15;
        ambientMesh3.rotation.y = time * 0.4;

        renderer.render(scene, camera);
      }
      animateParticles();

      window.addEventListener('resize', () => {
        camera.aspect = heroCanvas.clientWidth / heroCanvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(heroCanvas.clientWidth, heroCanvas.clientHeight);
      });
    } catch (e) {
      console.warn('Three.js hero error:', e);
    }
  }

  // ── Three.js: 3D Location Pin (Contact) ──
  const pinCanvas = document.getElementById('pin-canvas');
  if (pinCanvas && typeof THREE !== 'undefined') {
    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, pinCanvas.clientWidth / pinCanvas.clientHeight, 0.1, 100);
      const renderer = new THREE.WebGLRenderer({ canvas: pinCanvas, alpha: true, antialias: true });
      renderer.setSize(pinCanvas.clientWidth, pinCanvas.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Location pin shape
      const pinGroup = new THREE.Group();

      // Pin body (sphere top)
      const sphereGeo = new THREE.SphereGeometry(0.5, 32, 32);
      const sphereMat = new THREE.MeshPhongMaterial({ color: 0x0071e3, shininess: 100 });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.y = 1;
      pinGroup.add(sphere);

      // Pin cone
      const coneGeo = new THREE.ConeGeometry(0.3, 1.2, 32);
      const coneMat = new THREE.MeshPhongMaterial({ color: 0x0071e3, shininess: 80 });
      const cone = new THREE.Mesh(coneGeo, coneMat);
      cone.position.y = 0;
      cone.rotation.x = Math.PI;
      pinGroup.add(cone);

      // Pin base ring
      const ringGeo = new THREE.TorusGeometry(0.35, 0.05, 16, 32);
      const ringMat = new THREE.MeshPhongMaterial({ color: 0x0077ed, shininess: 120 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.y = 0.5;
      ring.rotation.x = Math.PI / 2;
      pinGroup.add(ring);

      scene.add(pinGroup);

      // Ground plane
      const planeGeo = new THREE.CircleGeometry(3, 64);
      const planeMat = new THREE.MeshPhongMaterial({ color: 0x1d1d1f, transparent: true, opacity: 0.3 });
      const plane = new THREE.Mesh(planeGeo, planeMat);
      plane.rotation.x = -Math.PI / 2;
      plane.position.y = -0.6;
      scene.add(plane);

      // Grid on ground
      const gridHelper = new THREE.GridHelper(6, 20, 0x333336, 0x333336);
      gridHelper.position.y = -0.59;
      scene.add(gridHelper);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      const dirLight = new THREE.DirectionalLight(0xffffff, 1);
      dirLight.position.set(5, 5, 5);
      scene.add(dirLight);
      const pointLight = new THREE.PointLight(0x0071e3, 1, 10);
      pointLight.position.set(0, 3, 2);
      scene.add(pointLight);

      camera.position.set(2, 2, 4);
      camera.lookAt(0, 0.5, 0);

      function animatePin() {
        requestAnimationFrame(animatePin);
        const time = Date.now() * 0.001;
        pinGroup.rotation.y = time * 0.5;
        sphere.position.y = 1 + Math.sin(time * 2) * 0.05;
        renderer.render(scene, camera);
      }
      animatePin();

      window.addEventListener('resize', () => {
        camera.aspect = pinCanvas.clientWidth / pinCanvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(pinCanvas.clientWidth, pinCanvas.clientHeight);
      });
    } catch (e) {
      console.warn('Three.js pin error:', e);
    }
  }

  // ── 3D Card Tilt (Mouse) ──
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });

  // ── GSAP: Hero Animations ──
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
      .from('.hero-badge', { y: 30, autoAlpha: 0, duration: 0.8 })
      .from('.hero h1', { y: 50, autoAlpha: 0, duration: 1 }, '-=0.5')
      .from('.hero-sub', { y: 30, autoAlpha: 0, duration: 0.8 }, '-=0.6')
      .from('.hero-btns', { y: 20, autoAlpha: 0, duration: 0.6 }, '-=0.4')
      .from('.hero-stats', { y: 20, autoAlpha: 0, duration: 0.6 }, '-=0.3');
  }

  // ── GSAP: Section Reveal Animations ──
  // Project cards stagger
  gsap.utils.toArray('.projects-grid .project-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 60,
      autoAlpha: 0,
      duration: 0.8,
      delay: i * 0.12,
      ease: 'power3.out',
    });
  });

  // Process steps stagger
  gsap.utils.toArray('.process-step').forEach((step, i) => {
    gsap.from(step, {
      scrollTrigger: {
        trigger: step,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 50,
      autoAlpha: 0,
      duration: 0.7,
      delay: i * 0.1,
      ease: 'power3.out',
    });
  });

  // Testimonial cards stagger
  gsap.utils.toArray('.testimonials-grid .testimonial-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 50,
      autoAlpha: 0,
      duration: 0.7,
      delay: i * 0.12,
      ease: 'power3.out',
    });
  });

  // Section headers
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header.children, {
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 40,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
    });
  });

  // Value cards
  gsap.utils.toArray('.values-grid .value-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 50,
      autoAlpha: 0,
      duration: 0.7,
      delay: i * 0.1,
      ease: 'power3.out',
    });
  });

  // Timeline steps
  gsap.utils.toArray('.timeline-step').forEach((step, i) => {
    gsap.from(step, {
      scrollTrigger: {
        trigger: step,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 40,
      autoAlpha: 0,
      duration: 0.6,
      delay: i * 0.1,
      ease: 'power3.out',
    });
  });

  // Team cards
  gsap.utils.toArray('.team-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 50,
      autoAlpha: 0,
      duration: 0.7,
      delay: i * 0.12,
      ease: 'power3.out',
    });
  });

  // Gallery items
  gsap.utils.toArray('.gallery-item').forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 40,
      autoAlpha: 0,
      duration: 0.6,
      delay: i * 0.08,
      ease: 'power3.out',
    });
  });

  // Material cards
  gsap.utils.toArray('.material-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 30,
      autoAlpha: 0,
      scale: 0.95,
      duration: 0.5,
      delay: i * 0.08,
      ease: 'power3.out',
    });
  });

  // CTA section parallax
  const ctaSection = document.querySelector('.cta-section');
  if (ctaSection) {
    gsap.from('.cta-content', {
      scrollTrigger: {
        trigger: ctaSection,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      y: 40,
      autoAlpha: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  }

  // About story
  const aboutStory = document.querySelector('.about-story');
  if (aboutStory) {
    gsap.from('.about-text', {
      scrollTrigger: { trigger: aboutStory, start: 'top 75%' },
      x: -50, autoAlpha: 0, duration: 0.8, ease: 'power3.out',
    });
    gsap.from('.about-image', {
      scrollTrigger: { trigger: aboutStory, start: 'top 75%' },
      x: 50, autoAlpha: 0, duration: 0.8, delay: 0.2, ease: 'power3.out',
    });
  }

  // Contact form and info
  const contactGrid = document.querySelector('.contact-grid');
  if (contactGrid) {
    gsap.from('.contact-form-wrapper', {
      scrollTrigger: { trigger: contactGrid, start: 'top 75%' },
      x: -40, autoAlpha: 0, duration: 0.8, ease: 'power3.out',
    });
    gsap.from('.contact-info-side', {
      scrollTrigger: { trigger: contactGrid, start: 'top 75%' },
      x: 40, autoAlpha: 0, duration: 0.8, delay: 0.15, ease: 'power3.out',
    });
  }

  // ── Animated Counters ──
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2000;
        const start = performance.now();
        const animate = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(target * eased) + suffix;
          if (progress < 1) requestAnimationFrame(animate);
          else el.textContent = target + suffix;
        };
        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  // ── Project Filters ──
  const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
  const projectCards = document.querySelectorAll('.project-card[data-category]');
  const styleBtns = document.querySelectorAll('.filter-btn[data-style]');

  let activeCategory = 'all';
  let activeStyle = 'all';

  function applyFilters() {
    projectCards.forEach(card => {
      const cat = card.getAttribute('data-category');
      const sty = card.getAttribute('data-style');
      const matchCat = activeCategory === 'all' || cat === activeCategory;
      const matchSty = activeStyle === 'all' || sty === activeStyle;
      const show = matchCat && matchSty;
      card.style.display = show ? '' : 'none';
      if (show) {
        gsap.from(card, { y: 30, autoAlpha: 0, duration: 0.4, ease: 'power2.out' });
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.filter-group') || btn.closest('.filter-bar');
      if (group) {
        group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      }
      btn.classList.add('active');
      if (btn.hasAttribute('data-filter')) activeCategory = btn.getAttribute('data-filter');
      if (btn.hasAttribute('data-style')) activeStyle = btn.getAttribute('data-style');
      applyFilters();
    });
  });

  // ── Gallery Lightbox ──
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
  const lightboxPrev = lightbox ? lightbox.querySelector('.lightbox-prev') : null;
  const lightboxNext = lightbox ? lightbox.querySelector('.lightbox-next') : null;
  let galleryImages = [];
  let currentLightboxIndex = 0;

  function openLightbox(index) {
    galleryImages = [...document.querySelectorAll('.gallery-item img')];
    currentLightboxIndex = index;
    lightboxImg.src = galleryImages[index].src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  function navigateLightbox(dir) {
    currentLightboxIndex = (currentLightboxIndex + dir + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentLightboxIndex].src;
  }

  document.querySelectorAll('.gallery-item').forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
  if (lightboxNext) lightboxNext.addEventListener('click', () => navigateLightbox(1));
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  // ── Quick View Modal ──
  const quickViewBtns = document.querySelectorAll('[data-quickview]');
  const modalOverlay = document.querySelector('.modal-overlay');
  if (quickViewBtns.length && modalOverlay) {
    quickViewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = btn.closest('.project-card');
        if (!card) return;
        const title = card.querySelector('.project-name')?.textContent || '';
        const location = card.querySelector('.project-location')?.textContent || '';
        const img = card.querySelector('.project-thumb img')?.src || '';
        const cat = card.querySelector('.project-cat')?.textContent || '';
        const modalBody = modalOverlay.querySelector('.modal-body');
        if (modalBody) {
          modalBody.innerHTML = `
            <img src="${img}" alt="${title}" style="width:100%;height:300px;object-fit:cover;border-radius:var(--radius-lg) var(--radius-lg) 0 0;">
            <div style="padding:var(--sp-4);">
              <span style="font-size:var(--text-xs);font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--blue);">${cat}</span>
              <h3 style="font-family:var(--font-serif);font-size:var(--text-2xl);font-weight:700;margin:8px 0 4px;">${title}</h3>
              <p style="font-size:var(--text-sm);color:var(--gray-500);margin-bottom:var(--sp-3);">${location}</p>
              <a href="project-detail.html" class="btn btn-primary btn-full">View Full Project</a>
            </div>`;
        }
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
    const modalClose = modalOverlay.querySelector('.modal-close');
    if (modalClose) {
      modalClose.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ── Sticky CTA Bar ──
  const stickyCta = document.querySelector('.sticky-cta');
  if (stickyCta) {
    const stickyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        stickyCta.classList.toggle('visible', !entry.isIntersecting);
      });
    }, { threshold: 0, rootMargin: '-100px 0px 0px 0px' });
    const ctaTarget = document.querySelector('.cta-section') || document.querySelector('.footer');
    if (ctaTarget) stickyObserver.observe(ctaTarget);
  }

  // ── Contact Form Validation ──
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('#firstName, #name');
      const email = contactForm.querySelector('#email');
      const message = contactForm.querySelector('#message');
      let valid = true;

      [name, email, message].forEach(f => {
        if (f && !f.value.trim()) {
          f.style.borderColor = '#e74c3c';
          valid = false;
        } else if (f) {
          f.style.borderColor = '';
        }
      });

      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.style.borderColor = '#e74c3c';
        valid = false;
      }

      if (!valid) return;

      const btn = contactForm.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(() => {
        const successEl = contactForm.querySelector('.form-success');
        if (successEl) successEl.style.display = 'block';
        contactForm.reset();
        btn.textContent = orig;
        btn.disabled = false;
        setTimeout(() => { if (successEl) successEl.style.display = 'none'; }, 5000);
      }, 1500);
    });
  }

  // ── Parallax on Hero Background ──
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    gsap.to(heroBg, {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
      y: 100,
      ease: 'none',
    });
  }

  // ── Page transition opacity ──
  gsap.from('body', { autoAlpha: 0, duration: 0.4, ease: 'power2.out' });

});
