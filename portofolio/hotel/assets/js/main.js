(function () {
    'use strict';

    var loader = document.getElementById('luxury-loader');
    var musicToggle = document.getElementById('musicToggle');
    var expScroll = document.getElementById('experienceScroll');
    var expPrev = document.getElementById('expPrev');
    var expNext = document.getElementById('expNext');
    var testimonialDots = document.querySelectorAll('.testimonial-dot');
    var testimonialTrack = document.getElementById('testimonialTrack');

    var currentTestimonial = 0;
    var totalTestimonials = testimonialDots.length;

    window.addEventListener('load', function () {
        setTimeout(function () {
            if (loader) loader.classList.add('hidden');
            document.body.style.overflow = '';
        }, 1800);
        document.body.style.overflow = 'hidden';
    });

    /* ===== SMOOTH ANCHOR SCROLL (same page only) ===== */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            var offset = 100;
            var position = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: position, behavior: 'smooth' });
        });
    });

    /* ===== MUSIC TOGGLE ===== */
    if (musicToggle) {
        musicToggle.addEventListener('click', function () {
            this.classList.toggle('playing');
            var icon = this.querySelector('.music-icon');
            icon.textContent = this.classList.contains('playing') ? '♫' : '♪';
        });
    }

    /* ===== EXPERIENCE HORIZONTAL SCROLL ===== */
    if (expScroll && expPrev && expNext) {
        var scrollAmount = 340;
        expPrev.addEventListener('click', function () {
            expScroll.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
        expNext.addEventListener('click', function () {
            expScroll.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    /* ===== TESTIMONIAL SLIDER ===== */
    var autoSlideInterval;

    function goToTestimonial(index) {
        if (!testimonialTrack) return;
        currentTestimonial = index;
        testimonialTrack.style.transform = 'translateX(-' + (currentTestimonial * 100) + '%)';

        testimonialDots.forEach(function (dot, i) {
            dot.classList.toggle('active', i === currentTestimonial);
        });
    }

    testimonialDots.forEach(function (dot) {
        dot.addEventListener('click', function () {
            var index = parseInt(this.getAttribute('data-index'));
            goToTestimonial(index);
            resetAutoSlide();
        });
    });

    function autoSlide() {
        if (totalTestimonials === 0) return;
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        goToTestimonial(currentTestimonial);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(autoSlide, 5000);
    }

    if (totalTestimonials > 0) {
        resetAutoSlide();
    }

    if (testimonialTrack) {
        var touchStartX = 0;
        var touchEndX = 0;

        testimonialTrack.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        testimonialTrack.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX;
            var diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    currentTestimonial = Math.min(currentTestimonial + 1, totalTestimonials - 1);
                } else {
                    currentTestimonial = Math.max(currentTestimonial - 1, 0);
                }
                goToTestimonial(currentTestimonial);
                resetAutoSlide();
            }
        });
    }

    /* ===== PARTICLES ===== */
    var particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (var i = 0; i < 35; i++) {
            var particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (6 + Math.random() * 10) + 's';
            particle.style.width = (1 + Math.random() * 3) + 'px';
            particle.style.height = particle.style.width;
            particlesContainer.appendChild(particle);
        }
    }

    /* ===== SCROLL PROGRESS BAR ===== */
    var progressBar = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', function () {
        if (!progressBar) return;
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = Math.min(progress, 100) + '%';
    }, { passive: true });
})();
