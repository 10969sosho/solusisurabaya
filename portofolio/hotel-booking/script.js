// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Reviews slider
const reviewCards = document.querySelectorAll('.review-card');
const sliderBtns = document.querySelectorAll('.slider-btn');
let currentSlide = 0;

function showSlide(index) {
    // Hide all review cards
    reviewCards.forEach(card => {
        card.classList.remove('active');
    });
    
    // Remove active class from all buttons
    sliderBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show current slide
    reviewCards[index].classList.add('active');
    sliderBtns[index].classList.add('active');
}

// Add click event listeners to slider buttons
sliderBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto-advance slider
function autoSlide() {
    currentSlide = (currentSlide + 1) % reviewCards.length;
    showSlide(currentSlide);
}

// Start auto slider
let slideInterval = setInterval(autoSlide, 5000);

// Stop auto slider on hover
document.querySelector('.reviews-slider').addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

// Resume auto slider on mouse leave
document.querySelector('.reviews-slider').addEventListener('mouseleave', () => {
    slideInterval = setInterval(autoSlide, 5000);
});

// Gallery lightbox functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
document.body.appendChild(lightbox);

// Create lightbox content
lightbox.innerHTML = `
    <div class="lightbox-content">
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-image" src="" alt="">
        <div class="lightbox-nav">
            <button class="lightbox-prev">&#10094;</button>
            <button class="lightbox-next">&#10095;</button>
        </div>
    </div>
`;

const lightboxImage = lightbox.querySelector('.lightbox-image');
const lightboxClose = lightbox.querySelector('.lightbox-close');
const lightboxPrev = lightbox.querySelector('.lightbox-prev');
const lightboxNext = lightbox.querySelector('.lightbox-next');

let currentImageIndex = 0;
let galleryImages = [];

// Collect all gallery images
galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    galleryImages.push(img.src);
    
    item.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox(img.src);
    });
});

function openLightbox(imageSrc) {
    lightboxImage.src = imageSrc;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImage.src = galleryImages[currentImageIndex];
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    lightboxImage.src = galleryImages[currentImageIndex];
}

// Event listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrevImage);
lightboxNext.addEventListener('click', showNextImage);

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    }
});

// Booking form functionality
const searchBtn = document.querySelector('.search-btn');
const checkinInput = document.getElementById('checkin');
const checkoutInput = document.getElementById('checkout');
const guestsInput = document.getElementById('guests');

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
checkinInput.setAttribute('min', today);
checkoutInput.setAttribute('min', today);

// Update checkout minimum date when checkin changes
checkinInput.addEventListener('change', function() {
    const checkinDate = new Date(this.value);
    const minCheckout = new Date(checkinDate);
    minCheckout.setDate(minCheckout.getDate() + 1);
    checkoutInput.setAttribute('min', minCheckout.toISOString().split('T')[0]);
    
    // If checkout is before checkin, reset it
    if (checkoutInput.value && new Date(checkoutInput.value) <= checkinDate) {
        checkoutInput.value = '';
    }
});

searchBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    const checkin = checkinInput.value;
    const checkout = checkoutInput.value;
    const guests = guestsInput.value;
    
    if (!checkin || !checkout) {
        alert('Please select check-in and check-out dates');
        return;
    }
    
    // Here you would typically send the booking data to a server
    console.log('Booking search:', { checkin, checkout, guests });
    alert(`Searching for rooms from ${checkin} to ${checkout} for ${guests} guests...`);
});

// Newsletter form functionality
const newsletterForm = document.querySelector('.newsletter-form');
const newsletterInput = newsletterForm.querySelector('input[type="email"]');

newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = newsletterInput.value.trim();
    
    if (!email) {
        alert('Please enter your email address');
        return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Here you would typically send the email to a newsletter service
    console.log('Newsletter subscription:', email);
    alert('Thank you for subscribing! You will receive exclusive offers and hotel deals.');
    
    // Reset form
    newsletterInput.value = '';
});

// Room card button functionality
document.querySelectorAll('.btn-secondary').forEach(btn => {
    btn.addEventListener('click', function() {
        const roomCard = this.closest('.room-card');
        const roomName = roomCard.querySelector('h3').textContent;
        const roomPrice = roomCard.querySelector('.room-price').textContent;
        
        alert(`Redirecting to booking page for ${roomName} at ${roomPrice} per night...`);
    });
});

// Book Now button functionality
document.querySelector('.nav-cta .btn-primary').addEventListener('click', function() {
    alert('Redirecting to booking system...');
});

// Get Direction button functionality
document.querySelector('.contact-info .btn-primary').addEventListener('click', function() {
    // Open Google Maps with hotel location
    window.open('https://www.google.com/maps/search/?api=1&query=123+Luxury+Avenue+Manhattan+New+York', '_blank');
});

// Add CSS for lightbox
const lightboxStyles = `
    .lightbox {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 2000;
        align-items: center;
        justify-content: center;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-image {
        max-width: 100%;
        max-height: 80vh;
        border-radius: 10px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        background: rgba(0, 0, 0, 0.5);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s ease;
    }
    
    .lightbox-close:hover {
        background: rgba(201, 162, 39, 0.8);
    }
    
    .lightbox-nav button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        font-size: 1.5rem;
        padding: 1rem;
        cursor: pointer;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s ease;
    }
    
    .lightbox-nav button:hover {
        background: rgba(201, 162, 39, 0.8);
    }
    
    .lightbox-prev {
        left: -60px;
    }
    
    .lightbox-next {
        right: -60px;
    }
    
    @media (max-width: 768px) {
        .lightbox-nav button {
            font-size: 1.2rem;
            width: 40px;
            height: 40px;
        }
        
        .lightbox-prev {
            left: 10px;
        }
        
        .lightbox-next {
            right: 10px;
        }
    }
`;

// Add the lightbox styles to the page
const styleSheet = document.createElement('style');
styleSheet.textContent = lightboxStyles;
document.head.appendChild(styleSheet);

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.room-card, .facility-item, .gallery-item, .review-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

console.log('Hotel booking website loaded successfully!');