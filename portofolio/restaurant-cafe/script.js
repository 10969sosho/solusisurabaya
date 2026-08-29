/* ============================================
   Maison De Lumière — Premium Script
   Three.js 3D · GSAP ScrollTrigger · Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ----------------------------------------
     THREE.JS — Hero 3D Floating Particles
  ---------------------------------------- */
  var heroCanvas = document.getElementById('heroCanvas');
  if (heroCanvas && typeof THREE !== 'undefined') {
    (function initHero3D() {
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 30;

      var renderer = new THREE.WebGLRenderer({ canvas: heroCanvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      var particleCount = 120;
      var geometry = new THREE.BufferGeometry();
      var positions = new Float32Array(particleCount * 3);
      var velocities = [];
      var sizes = new Float32Array(particleCount);

      for (var i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 60;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
        velocities.push({
          x: (Math.random() - 0.5) * 0.008,
          y: (Math.random() - 0.5) * 0.008,
          z: (Math.random() - 0.5) * 0.004
        });
        sizes[i] = Math.random() * 2.5 + 0.5;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      var material = new THREE.PointsMaterial({
        color: 0x0071e3,
        size: 0.08,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      var particles = new THREE.Points(geometry, material);
      scene.add(particles);

      /* Ambient floating ring */
      var ringGeometry = new THREE.RingGeometry(8, 8.1, 64);
      var ringMaterial = new THREE.MeshBasicMaterial({ color: 0x0071e3, transparent: true, opacity: 0.08, side: THREE.DoubleSide });
      var ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI * 0.35;
      scene.add(ring);

      var ring2Geometry = new THREE.TorusGeometry(12, 0.02, 16, 100);
      var ring2Material = new THREE.MeshBasicMaterial({ color: 0x0071e3, transparent: true, opacity: 0.05 });
      var ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
      ring2.rotation.x = Math.PI * 0.5;
      ring2.rotation.z = Math.PI * 0.2;
      scene.add(ring2);

      var mouseX = 0, mouseY = 0;
      document.addEventListener('mousemove', function (e) {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      });

      function animate() {
        requestAnimationFrame(animate);
        var pos = geometry.attributes.position.array;
        for (var i = 0; i < particleCount; i++) {
          pos[i * 3] += velocities[i].x;
          pos[i * 3 + 1] += velocities[i].y;
          pos[i * 3 + 2] += velocities[i].z;
          if (Math.abs(pos[i * 3]) > 30) velocities[i].x *= -1;
          if (Math.abs(pos[i * 3 + 1]) > 20) velocities[i].y *= -1;
          if (Math.abs(pos[i * 3 + 2]) > 15) velocities[i].z *= -1;
        }
        geometry.attributes.position.needsUpdate = true;

        ring.rotation.z += 0.001;
        ring2.rotation.y += 0.002;

        camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
        camera.position.y += (-mouseY * 1.5 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    })();
  }

  /* ----------------------------------------
     GSAP — ScrollTrigger Animations
  ---------------------------------------- */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    /* Respect reduced motion */
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {

      /* General reveal */
      gsap.utils.toArray('.gsap-reveal').forEach(function (el) {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
          }
        );
      });

      /* Reveal from left */
      gsap.utils.toArray('.gsap-reveal-left').forEach(function (el) {
        gsap.fromTo(el,
          { opacity: 0, x: -50 },
          {
            opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
          }
        );
      });

      /* Reveal from right */
      gsap.utils.toArray('.gsap-reveal-right').forEach(function (el) {
        gsap.fromTo(el,
          { opacity: 0, x: 50 },
          {
            opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
          }
        );
      });

      /* Reveal scale */
      gsap.utils.toArray('.gsap-reveal-scale').forEach(function (el) {
        gsap.fromTo(el,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
          }
        );
      });

      /* Staggered grid items */
      gsap.utils.toArray('.featured-grid, .testimonials-grid, .values-grid, .awards-grid, .gallery-grid').forEach(function (grid) {
        var items = grid.children;
        if (items.length) {
          gsap.fromTo(items,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
              scrollTrigger: { trigger: grid, start: 'top 85%', toggleActions: 'play none none none' }
            }
          );
        }
      });

      /* Parallax on hero content */
      var heroContent = document.querySelector('.hero-content');
      if (heroContent) {
        gsap.to(heroContent, {
          y: 80,
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
        });
      }

      /* Reservation CTA parallax */
      var ctaBg = document.querySelector('.reservation-cta-bg img');
      if (ctaBg) {
        gsap.to(ctaBg, {
          y: 60,
          ease: 'none',
          scrollTrigger: { trigger: '.reservation-cta', start: 'top bottom', end: 'bottom top', scrub: 1 }
        });
      }
    }
  }

  /* ----------------------------------------
     3D Card Tilt (tilt-card elements)
  ---------------------------------------- */
  var tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(function (card) {
    var inner = card.querySelector('.featured-card-body, .featured-card-img');
    var shine = card.querySelector('.tilt-shine');
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;
      var rotateX = ((y - centerY) / centerY) * -6;
      var rotateY = ((x - centerX) / centerX) * 6;
      card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)';
      if (shine) {
        shine.style.setProperty('--mouse-x', (x / rect.width * 100) + '%');
        shine.style.setProperty('--mouse-y', (y / rect.height * 100) + '%');
      }
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  /* ----------------------------------------
     Mobile Menu
  ---------------------------------------- */
  var mobileToggle = document.querySelector('.mobile-toggle');
  var mobileOverlay = document.getElementById('mobileOverlay');
  if (mobileToggle && mobileOverlay) {
    mobileToggle.addEventListener('click', function () {
      var isOpen = mobileOverlay.classList.toggle('active');
      mobileToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileOverlay.querySelectorAll('.nav-link, .btn').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileOverlay.classList.remove('active');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
      });
    });
  }

  /* ----------------------------------------
     Smooth Scroll for Anchor Links
  ---------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ----------------------------------------
     Menu Page — Category Filter Tabs
  ---------------------------------------- */
  var filterTabs = document.querySelectorAll('.filter-tab');
  var menuCards = document.querySelectorAll('.menu-card[data-category]');
  if (filterTabs.length && menuCards.length) {
    filterTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var cat = this.getAttribute('data-category');
        filterTabs.forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');
        menuCards.forEach(function (card) {
          if (cat === 'all' || card.getAttribute('data-category') === cat) {
            card.style.display = '';
            gsap && gsap.fromTo(card, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35 });
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ----------------------------------------
     Menu Page — Dish Detail Modal
  ---------------------------------------- */
  var modalOverlay = document.getElementById('dishModal');
  if (modalOverlay) {
    var modalImg = modalOverlay.querySelector('.modal-img');
    var modalTitle = modalOverlay.querySelector('h2');
    var modalPrice = modalOverlay.querySelector('.modal-price');
    var modalDesc = modalOverlay.querySelector('p');
    var modalClose = modalOverlay.querySelector('.modal-close');

    document.querySelectorAll('.menu-card[data-dish]').forEach(function (card) {
      card.addEventListener('click', function () {
        var dish = JSON.parse(this.getAttribute('data-dish'));
        if (modalImg) modalImg.src = dish.image;
        if (modalTitle) modalTitle.textContent = dish.name;
        if (modalPrice) modalPrice.textContent = dish.price;
        if (modalDesc) modalDesc.textContent = dish.description;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeModal() {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
    if (modalClose) modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function (e) { if (e.target === modalOverlay) closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
  }

  /* ----------------------------------------
     Reservation & Contact Form Validation
  ---------------------------------------- */
  function validateEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
  function validatePhone(phone) { return /^[\d\s\-\+\(\)]{8,15}$/.test(phone); }
  function clearErrors(form) { form.querySelectorAll('.form-group').forEach(function (g) { g.classList.remove('error'); }); }
  function showError(form, fieldName) {
    var group = form.querySelector('[data-field="' + fieldName + '"]');
    if (group) group.classList.add('error');
  }

  var reservationForm = document.getElementById('reservationForm');
  if (reservationForm) {
    reservationForm.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors(this);
      var name = this.querySelector('[name="name"]').value.trim();
      var email = this.querySelector('[name="email"]').value.trim();
      var phone = this.querySelector('[name="phone"]').value.trim();
      var date = this.querySelector('[name="date"]').value;
      var time = this.querySelector('[name="time"]').value;
      var guests = this.querySelector('[name="guests"]').value;
      var valid = true;
      if (!name) { showError(this, 'name'); valid = false; }
      if (!email || !validateEmail(email)) { showError(this, 'email'); valid = false; }
      if (!phone || !validatePhone(phone)) { showError(this, 'phone'); valid = false; }
      if (!date) { showError(this, 'date'); valid = false; }
      if (!time) { showError(this, 'time'); valid = false; }
      if (!guests) { showError(this, 'guests'); valid = false; }
      if (valid) {
        this.style.display = 'none';
        var success = this.nextElementSibling;
        if (success && success.classList.contains('form-success')) success.classList.add('show');
      }
    });
  }

  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors(this);
      var name = this.querySelector('[name="name"]').value.trim();
      var email = this.querySelector('[name="email"]').value.trim();
      var message = this.querySelector('[name="message"]').value.trim();
      var valid = true;
      if (!name) { showError(this, 'name'); valid = false; }
      if (!email || !validateEmail(email)) { showError(this, 'email'); valid = false; }
      if (!message) { showError(this, 'message'); valid = false; }
      if (valid) {
        this.style.display = 'none';
        var success = this.nextElementSibling;
        if (success && success.classList.contains('form-success')) success.classList.add('show');
      }
    });
  }

  /* ----------------------------------------
     Set Minimum Date for Reservation
  ---------------------------------------- */
  var dateInput = document.querySelector('input[name="date"]');
  if (dateInput) {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var dd = String(today.getDate()).padStart(2, '0');
    dateInput.setAttribute('min', yyyy + '-' + mm + '-' + dd);
  }

  /* ----------------------------------------
     Gallery Lightbox
  ---------------------------------------- */
  var galleryItems = document.querySelectorAll('.gallery-item');
  var lightbox = document.getElementById('lightbox');
  if (galleryItems.length && lightbox) {
    var lightboxImg = lightbox.querySelector('img');
    var currentIndex = 0;
    var images = [];
    galleryItems.forEach(function (item, index) {
      var img = item.querySelector('img');
      if (img) {
        images.push(img.src);
        item.addEventListener('click', function () {
          currentIndex = index;
          lightboxImg.src = images[currentIndex];
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        });
      }
    });
    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
    lightbox.querySelector('.lightbox-prev').addEventListener('click', function () {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      lightboxImg.src = images[currentIndex];
    });
    lightbox.querySelector('.lightbox-next').addEventListener('click', function () {
      currentIndex = (currentIndex + 1) % images.length;
      lightboxImg.src = images[currentIndex];
    });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') { currentIndex = (currentIndex - 1 + images.length) % images.length; lightboxImg.src = images[currentIndex]; }
      if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % images.length; lightboxImg.src = images[currentIndex]; }
    });
  }

});
