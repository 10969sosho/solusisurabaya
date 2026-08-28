// ── Lumina Interior Studio — Premium Scripts ──

document.addEventListener('DOMContentLoaded', () => {

    // ── Mobile Menu ──
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ── Navbar scroll ──
    const navbar = document.querySelector('.navbar');
    const handleScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // ── Smooth scroll ──
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

    // ── Scroll reveal ──
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => revealObserver.observe(el));

    // ── Animated counters ──
    const counters = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'), 10);
                const duration = 2000;
                const start = performance.now();
                const animate = (now) => {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.floor(target * eased);
                    if (progress < 1) requestAnimationFrame(animate);
                    else el.textContent = target;
                };
                requestAnimationFrame(animate);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(el => counterObserver.observe(el));

    // ── Project filter ──
    const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
    const projectCards = document.querySelectorAll('.project-card[data-category]');
    const styleBtns = document.querySelectorAll('.filter-btn[data-style]');
    const projectStyleAttr = document.querySelectorAll('.project-card[data-style]');

    let activeCategory = 'all';
    let activeStyle = 'all';

    function applyFilters() {
        projectCards.forEach(card => {
            const cat = card.getAttribute('data-category');
            const sty = card.getAttribute('data-style');
            const matchCat = activeCategory === 'all' || cat === activeCategory;
            const matchSty = activeStyle === 'all' || sty === activeStyle;
            card.style.display = (matchCat && matchSty) ? '' : 'none';
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const group = btn.closest('.filter-group');
            group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (btn.hasAttribute('data-filter')) {
                activeCategory = btn.getAttribute('data-filter');
            } else if (btn.hasAttribute('data-style')) {
                activeStyle = btn.getAttribute('data-style');
            }
            applyFilters();
        });
    });

    // ── Category buttons (home page) ──
    const catBtns = document.querySelectorAll('.cat-btn[data-cat]');
    const homeCards = document.querySelectorAll('.project-card[data-cat]');
    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.getAttribute('data-cat');
            homeCards.forEach(card => {
                card.style.display = (cat === 'all' || card.getAttribute('data-cat') === cat) ? '' : 'none';
            });
        });
    });

    // ── Gallery lightbox ──
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

    // ── Contact form validation ──
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('#name');
            const email = contactForm.querySelector('#email');
            const message = contactForm.querySelector('#message');
            let valid = true;

            [name, email, message].forEach(f => {
                if (!f.value.trim()) {
                    f.style.borderColor = '#e74c3c';
                    valid = false;
                } else {
                    f.style.borderColor = '';
                }
            });

            if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                email.style.borderColor = '#e74c3c';
                valid = false;
            }

            if (!valid) return;

            const btn = contactForm.querySelector('button[type="submit"]');
            const orig = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Thank you! We will get back to you within 24 hours.');
                contactForm.reset();
                btn.textContent = orig;
                btn.disabled = false;
            }, 1500);
        });
    }

    // ── Testimonial slider (home) ──
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.nav-dot');
    let currentTestimonial = 0;

    function showTestimonial(i) {
        testimonialCards.forEach(c => c.style.display = 'none');
        dots.forEach(d => d.classList.remove('active'));
        testimonialCards[i].style.display = 'block';
        dots[i].classList.add('active');
        currentTestimonial = i;
    }

    if (testimonialCards.length > 0) {
        dots.forEach((dot, i) => dot.addEventListener('click', () => showTestimonial(i)));
        setInterval(() => {
            showTestimonial((currentTestimonial + 1) % testimonialCards.length);
        }, 5000);
    }

    // ── Active nav link highlight ──
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - navbar.offsetHeight - 100;
            if (window.scrollY >= top) current = sec.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) link.classList.add('active');
        });
    });

});
