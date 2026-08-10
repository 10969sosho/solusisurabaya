// Navbar scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
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

// Button click animations
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Reviews slider functionality
let currentReview = 0;
const reviews = document.querySelectorAll('.review-card');

function showReview(index) {
    reviews.forEach((review, i) => {
        review.style.display = i === index ? 'block' : 'none';
    });
}

function nextReview() {
    currentReview = (currentReview + 1) % reviews.length;
    showReview(currentReview);
}

// Auto-advance reviews every 5 seconds
if (reviews.length > 0) {
    showReview(0);
    setInterval(nextReview, 5000);
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
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

// Observe elements for animation
document.querySelectorAll('.program-card, .trainer-card, .membership-card, .review-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter animation for hero badge
function animateCounter() {
    const badge = document.querySelector('.hero-badge span');
    const finalNumber = 2000;
    let currentNumber = 0;
    const increment = finalNumber / 50;
    
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= finalNumber) {
            currentNumber = finalNumber;
            clearInterval(timer);
        }
        badge.textContent = `🔥 ${Math.floor(currentNumber)}+ Active Members`;
    }, 30);
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter();
            heroObserver.unobserve(entry.target);
        }
    });
});

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Mobile menu toggle (for future mobile menu implementation)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('mobile-active');
}

// Add mobile menu button if screen is small
if (window.innerWidth <= 768) {
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.onclick = toggleMobileMenu;
    
    const navContainer = document.querySelector('.nav-container');
    navContainer.appendChild(mobileMenuBtn);
}

// Add CSS for mobile menu
const mobileStyle = document.createElement('style');
mobileStyle.textContent = `
    .mobile-menu-btn {
        display: none;
        background: var(--neon-green);
        color: var(--black);
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        font-size: 1.2rem;
        cursor: pointer;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block;
        }
        
        .nav-menu.mobile-active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--dark-gray);
            padding: 20px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }
    }
`;
document.head.appendChild(mobileStyle);