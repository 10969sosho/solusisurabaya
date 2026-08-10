/* === ANIMATION.JS - Scroll Reveal, Steam, Particles === */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initSteamEffect();
  initSpiceParticles();
  initFloatingIcons();
  initSlowZoomImages();
});

/* Scroll Reveal */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .menu-card, .gallery-item, .testimonial-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index % 5 * 80);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* Steam Effect for Signature Dish */
function initSteamEffect() {
  const steamContainers = document.querySelectorAll('.steam-container');

  steamContainers.forEach(container => {
    setInterval(() => {
      const steam = document.createElement('div');
      steam.classList.add('steam');
      steam.style.left = Math.random() * 100 + '%';
      steam.style.animationDuration = (Math.random() * 2 + 2) + 's';
      steam.style.height = (Math.random() * 40 + 20) + 'px';
      steam.style.width = (Math.random() * 3 + 1.5) + 'px';
      steam.style.opacity = Math.random() * 0.3 + 0.1;

      container.appendChild(steam);

      setTimeout(() => {
        steam.remove();
      }, 3500);
    }, 400);
  });
}

/* Spice Particles */
function initSpiceParticles() {
  const particleContainers = document.querySelectorAll('.spice-particles');

  particleContainers.forEach(container => {
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.bottom = Math.random() * 50 + '%';
      particle.style.animationDelay = Math.random() * 4 + 's';
      particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
      particle.style.width = (Math.random() * 5 + 2) + 'px';
      particle.style.height = particle.style.width;

      container.appendChild(particle);
    }
  });
}

/* Floating Icons Animation */
function initFloatingIcons() {
  const icons = document.querySelectorAll('.float-icon');

  icons.forEach((icon, index) => {
    icon.style.animationDelay = index * 0.5 + 's';
    icon.style.animationDuration = (Math.random() * 3 + 4) + 's';
  });
}

/* Slow Zoom on Hover Images */
function initSlowZoomImages() {
  const zoomImages = document.querySelectorAll('.signature-image img, .hero-image-wrap img, .gallery-item img');

  zoomImages.forEach(img => {
    img.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.08)';
    });

    img.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
    });
  });
}

/* Intersection Observer for count animation in experience section */
const expObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.experience-feature').forEach((feat, i) => {
        feat.style.opacity = '0';
        feat.style.transform = 'translateX(-20px)';
        setTimeout(() => {
          feat.style.transition = 'all 0.6s cubic-bezier(.19, 1, .22, 1)';
          feat.style.opacity = '1';
          feat.style.transform = 'translateX(0)';
        }, i * 150);
      });
      expObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const expSection = document.querySelector('#experience');
if (expSection) {
  expObserver.observe(expSection);
}
