(function () {
    'use strict';

    var observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(function (el) {
        revealObserver.observe(el);
    });

    /* ===== ANIMATED COUNTERS ===== */
    var statNumbers = document.querySelectorAll('.stat-number');
    var statsAnimated = false;

    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-target'));
        if (isNaN(target)) return;

        var current = 0;
        var increment = target / 80;
        var duration = 2000;
        var stepTime = Math.abs(Math.floor(duration / target));

        if (increment < 1) increment = 1;

        var timer = setInterval(function () {
            current += increment;
            if (current >= target) {
                el.textContent = target.toLocaleString() + (target === 5 ? '' : '+');
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current).toLocaleString() + (target === 5 ? '' : '+');
            }
        }, stepTime);
    }

    var statsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                statNumbers.forEach(function (num) {
                    animateCounter(num);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    var statsSection = document.getElementById('stats');
    if (statsSection && statNumbers.length > 0) {
        statsObserver.observe(statsSection);
    }

    /* ===== MOUSE PARALLAX ===== */
    var parallaxElements = document.querySelectorAll('.hero-bg-image, .hero-ambient, .story-floating-text');

    document.addEventListener('mousemove', function (e) {
        var x = e.clientX;
        var y = e.clientY;
        var w = window.innerWidth;
        var h = window.innerHeight;

        parallaxElements.forEach(function (el) {
            var speed = 0.02;
            var moveX = (x - w / 2) * speed;
            var moveY = (y - h / 2) * speed;

            if (el.classList.contains('hero-bg-image')) {
                speed = 0.01;
                moveX = (x - w / 2) * speed;
                moveY = (y - h / 2) * speed;
            }

            el.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px)';
        });
    }, { passive: true });

    /* ===== SLOW FLOATING FOR CERTAIN ELEMENTS ===== */
    var floatingEls = document.querySelectorAll('.hero-scroll-indicator');
    floatingEls.forEach(function (el, index) {
        el.style.animation = 'subtleFloat ' + (4 + index * 0.5) + 's ease-in-out infinite';
        el.style.animationDelay = index * 0.3 + 's';
    });

    /* ===== HERO SECTION REVEAL ===== */
    var heroContentEls = document.querySelectorAll('.hero-content .reveal-up');
    setTimeout(function () {
        heroContentEls.forEach(function (el, i) {
            setTimeout(function () {
                el.classList.add('visible');
            }, i * 200);
        });
    }, 2100);

    /* ===== IMAGE LAZY LOAD FADE ===== */
    document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
        img.addEventListener('load', function () {
            this.style.opacity = '1';
            this.style.transition = 'opacity 0.6s ease';
        });
        img.style.opacity = '0';
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
})();
