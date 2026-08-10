// Restaurant Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .cta-button, .btn-primary, .btn-secondary');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Favorite button functionality
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.backgroundColor = 'var(--dark-red)';
                this.style.color = 'var(--white)';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.backgroundColor = 'var(--white)';
                this.style.color = 'var(--charcoal)';
            }
        });
    });

    // Gallery lightbox functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-image" src="" alt="">
            <div class="lightbox-nav">
                <button class="lightbox-prev">&lt;</button>
                <button class="lightbox-next">&gt;</button>
            </div>
        </div>
    `;
    document.body.appendChild(lightbox);

    let currentImageIndex = 0;
    const galleryImages = Array.from(galleryItems).map(item => item.querySelector('img').src);

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImageIndex = index;
            openLightbox(galleryImages[currentImageIndex]);
        });
    });

    function openLightbox(imageSrc) {
        const lightboxImage = lightbox.querySelector('.lightbox-image');
        lightboxImage.src = imageSrc;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function navigateLightbox(direction) {
        currentImageIndex += direction;
        if (currentImageIndex < 0) {
            currentImageIndex = galleryImages.length - 1;
        } else if (currentImageIndex >= galleryImages.length) {
            currentImageIndex = 0;
        }
        const lightboxImage = lightbox.querySelector('.lightbox-image');
        lightboxImage.src = galleryImages[currentImageIndex];
    }

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => navigateLightbox(-1));
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => navigateLightbox(1));

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                navigateLightbox(-1);
            } else if (e.key === 'ArrowRight') {
                navigateLightbox(1);
            }
        }
    });

    // Reviews slider auto-scroll
    const reviewsSlider = document.querySelector('.reviews-slider');
    let scrollAmount = 0;
    let scrollDirection = 1;
    
    function autoScrollReviews() {
        if (!reviewsSlider) return;
        
        const maxScroll = reviewsSlider.scrollWidth - reviewsSlider.clientWidth;
        
        if (scrollAmount >= maxScroll) {
            scrollDirection = -1;
        } else if (scrollAmount <= 0) {
            scrollDirection = 1;
        }
        
        scrollAmount += scrollDirection * 1;
        reviewsSlider.scrollLeft = scrollAmount;
    }

    // Start auto-scroll for reviews
    const autoScrollInterval = setInterval(autoScrollReviews, 50);
    
    // Pause auto-scroll on hover
    reviewsSlider.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });

    reviewsSlider.addEventListener('mouseleave', () => {
        setInterval(autoScrollReviews, 50);
    });

    // Form submission for reservation
    const reservationForm = document.querySelector('.reservation-form');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const date = this.querySelector('input[type="date"]').value;
            const time = this.querySelector('input[type="time"]').value;
            const guests = this.querySelector('select').value;
            
            // Simple validation
            if (!name || !date || !time || !guests) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Show success message (in a real app, this would send data to a server)
            alert(`Thank you for your reservation, ${name}!\n\nDetails:\nDate: ${date}\nTime: ${time}\nGuests: ${guests}\n\nWe look forward to seeing you!`);
            
            // Reset form
            this.reset();
        });
    }

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    function updateNavbarBackground() {
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(255, 247, 237, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = 'var(--cream)';
            navbar.style.backdropFilter = 'none';
        }
    }

    window.addEventListener('scroll', updateNavbarBackground);

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Add fade-in animation to sections
    const sections = document.querySelectorAll('.popular-dishes, .chef-section, .reservation-section, .gallery-section, .reviews-section, .location-section');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Mobile menu toggle (for future mobile menu implementation)
    function createMobileMenu() {
        const navCenter = document.querySelector('.nav-center');
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        
        const navContainer = document.querySelector('.nav-container');
        navContainer.appendChild(mobileToggle);
        
        mobileToggle.addEventListener('click', function() {
            navCenter.classList.toggle('mobile-active');
            const icon = this.querySelector('i');
            if (navCenter.classList.contains('mobile-active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Initialize mobile menu for small screens
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }

    // Reinitialize mobile menu on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            const existingToggle = document.querySelector('.mobile-menu-toggle');
            if (window.innerWidth <= 768 && !existingToggle) {
                createMobileMenu();
            } else if (window.innerWidth > 768 && existingToggle) {
                existingToggle.remove();
                document.querySelector('.nav-center').classList.remove('mobile-active');
            }
        }, 250);
    });
});

// CSS for lightbox (added via JavaScript)
const lightboxStyles = `
    .lightbox {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 2000;
        justify-content: center;
        align-items: center;
    }

    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        text-align: center;
    }

    .lightbox-image {
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
        border-radius: 8px;
    }

    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        z-index: 2001;
    }

    .lightbox-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        display: flex;
        justify-content: space-between;
        pointer-events: none;
    }

    .lightbox-prev,
    .lightbox-next {
        background-color: rgba(255, 255, 255, 0.2);
        color: white;
        border: none;
        font-size: 2rem;
        padding: 1rem;
        cursor: pointer;
        border-radius: 4px;
        pointer-events: all;
        transition: background-color 0.3s ease;
    }

    .lightbox-prev:hover,
    .lightbox-next:hover {
        background-color: rgba(255, 255, 255, 0.3);
    }

    .mobile-menu-toggle {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--charcoal);
        cursor: pointer;
    }

    @media (max-width: 768px) {
        .mobile-menu-toggle {
            display: block;
        }
        
        .nav-center {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: var(--cream);
            box-shadow: 0 4px 12px var(--shadow);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-center.mobile-active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .nav-menu {
            flex-direction: column;
            padding: 2rem;
            gap: 1rem;
        }
    }
`;

// Add lightbox styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = lightboxStyles;
document.head.appendChild(styleSheet);