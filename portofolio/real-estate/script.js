/* ============================================
   PT. HARTAWAN PROPERTI INDONESIA
   Three.js + GSAP + Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  gsap.registerPlugin(ScrollTrigger);

  // ---- Navbar ----
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');
  const navLinksAll = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  if (navToggle && mobileOverlay) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.classList.toggle('active');
      mobileOverlay.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Active nav link on scroll
  const sections = document.querySelectorAll('.section, .hero');
  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height && id) {
        navLinksAll.forEach(a => a.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav);

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        window.scrollTo({
          top: target.offsetTop - offset,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---- Three.js Hero Particles ----
  const canvas = document.getElementById('heroCanvas');
  if (canvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle geometry
    const particleCount = 800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      velocities[i * 3] = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x0071e3,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Connecting lines
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * particleCount * 3);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setDrawRange(0, 0);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0071e3,
      transparent: true,
      opacity: 0.06,
      blending: THREE.AdditiveBlending
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    document.addEventListener('mousemove', (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Animation loop
    let frame = 0;
    function animate() {
      requestAnimationFrame(animate);
      frame++;

      mouseX += (targetMouseX - mouseX) * 0.02;
      mouseY += (targetMouseY - mouseY) * 0.02;

      const pos = geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3] += velocities[i * 3];
        pos[i * 3 + 1] += velocities[i * 3 + 1];
        pos[i * 3 + 2] += velocities[i * 3 + 2];

        // Bounce
        if (Math.abs(pos[i * 3]) > 30) velocities[i * 3] *= -1;
        if (Math.abs(pos[i * 3 + 1]) > 30) velocities[i * 3 + 1] *= -1;
        if (Math.abs(pos[i * 3 + 2]) > 20) velocities[i * 3 + 2] *= -1;
      }
      geometry.attributes.position.needsUpdate = true;

      // Update connecting lines (every 3rd frame for performance)
      if (frame % 3 === 0) {
        let lineIndex = 0;
        const maxDist = 5;
        const lp = lineGeometry.attributes.position.array;
        lp.fill(0);
        lineIndex = 0;

        for (let i = 0; i < particleCount; i++) {
          for (let j = i + 1; j < particleCount; j++) {
            const dx = pos[i * 3] - pos[j * 3];
            const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
            const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < maxDist) {
              lp[lineIndex++] = pos[i * 3];
              lp[lineIndex++] = pos[i * 3 + 1];
              lp[lineIndex++] = pos[i * 3 + 2];
              lp[lineIndex++] = pos[j * 3];
              lp[lineIndex++] = pos[j * 3 + 1];
              lp[lineIndex++] = pos[j * 3 + 2];
            }

            if (lineIndex >= lp.length) break;
          }
          if (lineIndex >= lp.length) break;
        }
        lineGeometry.setDrawRange(0, lineIndex / 3);
        lineGeometry.attributes.position.needsUpdate = true;
      }

      particles.rotation.y = mouseX * 0.15;
      particles.rotation.x = mouseY * 0.1;
      lines.rotation.y = mouseX * 0.15;
      lines.rotation.x = mouseY * 0.1;

      renderer.render(scene, camera);
    }
    animate();

    // Resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  // ---- GSAP Hero Animations ----
  const heroTl = gsap.timeline({ delay: 0.3 });

  heroTl
    .to('.hero-eyebrow', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .to('.hero-title', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.5')
    .to('.hero-subtitle', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .to('.hero-actions', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.5')
    .to('.hero-stats', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.5')
    .to('.hero-scroll-indicator', {
      opacity: 1,
      duration: 1,
      ease: 'power2.out'
    }, '-=0.3');

  // Set initial states for hero elements
  gsap.set(['.hero-eyebrow', '.hero-title', '.hero-subtitle', '.hero-actions', '.hero-stats'], {
    y: 30
  });

  // ---- GSAP Section Animations ----

  // Section headers
  gsap.utils.toArray('.section-header').forEach(header => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    });

    tl.from(header.querySelector('.section-eyebrow'), {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out'
    })
    .from(header.querySelector('.section-title'), {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.3')
    .from(header.querySelector('.section-desc'), {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.4');
  });

  // Property cards stagger
  gsap.utils.toArray('.property-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 50,
      rotationX: 8,
      duration: 0.8,
      delay: (i % 3) * 0.12,
      ease: 'power3.out'
    });
  });

  // About section
  const aboutContent = document.querySelector('.about-content');
  if (aboutContent) {
    const aboutTl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutContent,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    aboutTl
      .from(aboutContent.querySelector('.section-eyebrow'), { opacity: 0, x: -30, duration: 0.6, ease: 'power3.out' })
      .from(aboutContent.querySelector('.section-title'), { opacity: 0, x: -30, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .from(aboutContent.querySelectorAll('.about-text'), { opacity: 0, x: -30, duration: 0.6, stagger: 0.15, ease: 'power3.out' }, '-=0.4')
      .from(aboutContent.querySelectorAll('.value-item'), { opacity: 0, x: -20, duration: 0.5, stagger: 0.1, ease: 'power3.out' }, '-=0.3');
  }

  const aboutVisual = document.querySelector('.about-visual');
  if (aboutVisual) {
    gsap.from('.about-img-1', {
      scrollTrigger: {
        trigger: aboutVisual,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      x: -40,
      rotation: -3,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.about-img-2', {
      scrollTrigger: {
        trigger: aboutVisual,
        start: 'top 75%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      x: 40,
      rotation: 3,
      duration: 1,
      delay: 0.2,
      ease: 'power3.out'
    });

    gsap.from('.about-float-card', {
      scrollTrigger: {
        trigger: aboutVisual,
        start: 'top 70%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      delay: 0.4,
      ease: 'back.out(1.5)'
    });
  }

  // Contact section
  const contactForm = document.querySelector('.contact-form-wrap');
  if (contactForm) {
    gsap.from(contactForm, {
      scrollTrigger: {
        trigger: contactForm,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      x: -40,
      duration: 0.8,
      ease: 'power3.out'
    });
  }

  const contactInfo = document.querySelector('.contact-info');
  if (contactInfo) {
    gsap.from(contactInfo.querySelectorAll('.info-card'), {
      scrollTrigger: {
        trigger: contactInfo,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out'
    });
  }

  // Footer
  gsap.from('.footer-grid > div', {
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 90%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 30,
    stagger: 0.1,
    duration: 0.6,
    ease: 'power3.out'
  });

  // ---- 3D Card Tilt on Hover ----
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach(card => {
    let bounds;

    card.addEventListener('mouseenter', () => {
      bounds = card.getBoundingClientRect();
    });

    card.addEventListener('mousemove', (e) => {
      if (!bounds) return;
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;
      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;
      const rotateX = ((mouseY - centerY) / centerY) * -4;
      const rotateY = ((mouseX - centerX) / centerX) * 4;

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 800,
        duration: 0.4,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });

  // ---- Contact Form ----
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll('input[required], textarea[required]').forEach(input => {
        if (!input.value.trim()) {
          valid = false;
          input.style.borderColor = '#DC3545';
        } else {
          input.style.borderColor = '';
        }
      });

      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(emailInput.value)) {
          valid = false;
          emailInput.style.borderColor = '#DC3545';
        }
      }

      if (valid) {
        form.reset();
        if (formSuccess) {
          formSuccess.classList.add('show');
          setTimeout(() => formSuccess.classList.remove('show'), 5000);
        }
      }
    });

    form.querySelectorAll('input, textarea, select').forEach(input => {
      input.addEventListener('focus', () => {
        input.style.borderColor = '';
      });
    });
  }

  // ---- Parallax on Hero ----
  gsap.to('.hero-content', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    },
    y: -80,
    opacity: 0.3,
    ease: 'none'
  });

  // ---- Counter Animation ----
  function animateCounter(el, target, suffix = '') {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = Math.floor(obj.val) + suffix;
      }
    });
  }

  const statNums = document.querySelectorAll('.stat-num');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const num = parseInt(text);
        const suffix = text.replace(/[0-9]/g, '');
        if (!isNaN(num)) {
          animateCounter(el, num, suffix);
        }
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => statObserver.observe(el));

  // ---- Footer brand animation ----
  gsap.from('.footer-brand', {
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 90%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: 'power3.out'
  });

  gsap.from('.footer-social a', {
    scrollTrigger: {
      trigger: '.footer-social',
      start: 'top 95%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 10,
    stagger: 0.08,
    duration: 0.4,
    ease: 'power3.out'
  });

});
