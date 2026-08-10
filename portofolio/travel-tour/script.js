// Navigation scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Search functionality
document.querySelector('.search-button').addEventListener('click', function() {
    const destination = document.getElementById('destination').value;
    const travelDate = document.getElementById('travel-date').value;
    const duration = document.getElementById('duration').value;
    const travelers = document.getElementById('travelers').value;
    
    if (!destination || !travelDate || !duration || !travelers) {
        alert('Please fill in all search fields');
        return;
    }
    
    // Simulate search functionality
    alert(`Searching for tours to ${destination} for ${travelers} travelers from ${travelDate} for ${duration} days...`);
    
    // Here you would typically send the search data to a backend API
    console.log('Search data:', {
        destination,
        travelDate,
        duration,
        travelers
    });
});

// Newsletter subscription
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    if (email) {
        alert(`Thank you for subscribing! We'll send travel deals to ${email}`);
        this.reset();
    }
});

// Gallery lightbox functionality
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const imgSrc = img.src;
        const imgAlt = img.alt;
        
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${imgSrc}" alt="${imgAlt}">
                <p>${imgAlt}</p>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        // Close lightbox
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target.className === 'lightbox-close') {
                document.body.removeChild(lightbox);
            }
        });
    });
});

// Add lightbox styles dynamically
const lightboxStyles = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        cursor: pointer;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        text-align: center;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 80vh;
        border-radius: 10px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    }
    
    .lightbox-content p {
        color: white;
        margin-top: 1rem;
        font-size: 1.1rem;
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        transition: color 0.3s ease;
    }
    
    .lightbox-close:hover {
        color: var(--turquoise);
    }
`;

// Inject lightbox styles
const styleSheet = document.createElement('style');
styleSheet.textContent = lightboxStyles;
document.head.appendChild(styleSheet);

// Review slider auto-scroll
const reviewsSlider = document.querySelector('.reviews-slider');
let scrollPosition = 0;

function autoScrollReviews() {
    if (reviewsSlider) {
        const maxScroll = reviewsSlider.scrollWidth - reviewsSlider.clientWidth;
        
        if (scrollPosition >= maxScroll) {
            scrollPosition = 0;
        } else {
            scrollPosition += 350; // Width of one review card + gap
        }
        
        reviewsSlider.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
}

// Start auto-scroll every 4 seconds
setInterval(autoScrollReviews, 4000);

// Package card hover effects
document.querySelectorAll('.package-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Destination card animations
document.querySelectorAll('.destination-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const overlay = this.querySelector('.destination-overlay');
        overlay.style.background = 'linear-gradient(transparent, rgba(14, 165, 233, 0.9))';
    });
    
    card.addEventListener('mouseleave', function() {
        const overlay = this.querySelector('.destination-overlay');
        overlay.style.background = 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))';
    });
});

// Experience card interactions
document.querySelectorAll('.experience-card').forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('h3').textContent;
        alert(`Learn more about our ${title} experiences!`);
    });
});

// CTA Button interactions
document.querySelectorAll('.cta-button, .view-details-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (this.textContent.includes('Book Tour')) {
            alert('Redirecting to booking page...');
        } else if (this.textContent.includes('View Details')) {
            const packageName = this.closest('.package-card').querySelector('h3').textContent;
            alert(`Viewing details for ${packageName}...`);
        }
    });
});

// Form validation enhancements
document.querySelectorAll('input, select').forEach(field => {
    field.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value) {
            this.style.borderColor = '#EF4444';
        } else {
            this.style.borderColor = '#E2E8F0';
        }
    });
    
    field.addEventListener('focus', function() {
        this.style.borderColor = '#0EA5E9';
    });
});

// Add loading animation for search
document.querySelector('.search-button').addEventListener('click', function() {
    const originalText = this.textContent;
    this.textContent = 'Searching...';
    this.disabled = true;
    
    setTimeout(() => {
        this.textContent = originalText;
        this.disabled = false;
    }, 2000);
});

// Initialize page with fade-in animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add scroll reveal animations
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

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});