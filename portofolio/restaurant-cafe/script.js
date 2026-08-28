/* ============================================
   Maison De Lumière — Premium Script
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ----------------------------------------
       Navbar scroll effect
    ---------------------------------------- */
    const navbar = document.querySelector('.navbar');
    function handleNavScroll() {
        if (!navbar) return;
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleNavScroll);
    handleNavScroll();

    /* ----------------------------------------
       Mobile menu toggle
    ---------------------------------------- */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });

        navMenu.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }

    /* ----------------------------------------
       Smooth scroll for anchor links
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
       Menu tabs (menu.html)
    ---------------------------------------- */
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');

    menuTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            var category = this.getAttribute('data-category');

            menuTabs.forEach(function (t) { t.classList.remove('active'); });
            this.classList.add('active');

            menuCategories.forEach(function (cat) {
                if (category === 'all' || cat.getAttribute('data-category') === category) {
                    cat.style.display = 'block';
                } else {
                    cat.style.display = 'none';
                }
            });
        });
    });

    /* ----------------------------------------
       Reservation form validation
    ---------------------------------------- */
    const reservationForm = document.getElementById('reservationForm');
    const contactForm = document.getElementById('contactForm');

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
        return /^[\d\s\-\+\(\)]{8,15}$/.test(phone);
    }

    function clearErrors(form) {
        form.querySelectorAll('.form-group').forEach(function (g) {
            g.classList.remove('error');
        });
    }

    function showError(form, fieldName) {
        var group = form.querySelector('[data-field="' + fieldName + '"]');
        if (group) group.classList.add('error');
    }

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
                if (success && success.classList.contains('form-success')) {
                    success.classList.add('show');
                }
            }
        });
    }

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
                if (success && success.classList.contains('form-success')) {
                    success.classList.add('show');
                }
            }
        });
    }

    /* ----------------------------------------
       Gallery lightbox
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
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) closeLightbox();
        });

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
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                lightboxImg.src = images[currentIndex];
            }
            if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % images.length;
                lightboxImg.src = images[currentIndex];
            }
        });
    }

    /* ----------------------------------------
       Scroll fade-in animations
    ---------------------------------------- */
    var animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

    if (animatedElements.length && 'IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        animatedElements.forEach(function (el) {
            observer.observe(el);
        });
    }

    /* ----------------------------------------
       Set minimum date for reservation
    ---------------------------------------- */
    var dateInput = document.querySelector('input[name="date"]');
    if (dateInput) {
        var today = new Date();
        var yyyy = today.getFullYear();
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var dd = String(today.getDate()).padStart(2, '0');
        dateInput.setAttribute('min', yyyy + '-' + mm + '-' + dd);
    }

});
