// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Button Click Animations
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
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
});

// Feature Cards Animation on Scroll
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

// Observe feature cards
document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Pricing Cards Animation
const pricingObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        pricingObserver.observe(card);
    });
});

// Form Validation for CTA Buttons (Demo)
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.btn-primary');
    
    ctaButtons.forEach(button => {
        if (button.textContent.includes('Start Free Trial') || button.textContent.includes('Create Account')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Simulate form submission
                this.textContent = 'Loading...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.textContent = 'Success!';
                    this.style.background = '#10b981';
                    
                    setTimeout(() => {
                        this.textContent = this.textContent.includes('Start') ? 'Start Free Trial' : 'Create Account';
                        this.disabled = false;
                        this.style.background = '';
                    }, 2000);
                }, 1500);
            });
        }
    });
});

// Mobile Menu Toggle (for future enhancement)
function toggleMobileMenu() {
    const navCenter = document.querySelector('.nav-center');
    navCenter.classList.toggle('mobile-active');
}

// Add mobile menu button if needed
if (window.innerWidth <= 768) {
    const navbar = document.querySelector('.nav-container');
    const mobileButton = document.createElement('button');
    mobileButton.innerHTML = '<i class="fas fa-bars"></i>';
    mobileButton.className = 'mobile-menu-btn';
    mobileButton.onclick = toggleMobileMenu;
    
    navbar.appendChild(mobileButton);
}

// Testimonial Slider (Auto-rotate)
let currentTestimonial = 0;
const testimonials = [
    {
        text: "This platform helped our team stay organized and productive. The automation features are game-changing.",
        author: "John Smith",
        role: "CEO, TechCorp",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
    },
    {
        text: "TaskFlow has transformed how we manage projects. Our team's efficiency increased by 40%.",
        author: "Sarah Johnson",
        role: "Project Manager, StartupXYZ",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=60&h=60&fit=crop&crop=face"
    },
    {
        text: "The best productivity tool we've ever used. Simple, powerful, and intuitive.",
        author: "Mike Chen",
        role: "CTO, InnovateTech",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
    }
];

function rotateTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    const testimonialCard = document.querySelector('.testimonial-card');
    const testimonial = testimonials[currentTestimonial];
    
    testimonialCard.style.opacity = '0';
    
    setTimeout(() => {
        testimonialCard.querySelector('p').textContent = `"${testimonial.text}"`;
        testimonialCard.querySelector('.author-photo').src = testimonial.image;
        testimonialCard.querySelector('.author-info h4').textContent = testimonial.author;
        testimonialCard.querySelector('.author-info span').textContent = testimonial.role;
        
        testimonialCard.style.opacity = '1';
    }, 300);
}

// Start testimonial rotation
document.addEventListener('DOMContentLoaded', function() {
    const testimonialCard = document.querySelector('.testimonial-card');
    if (testimonialCard) {
        testimonialCard.style.transition = 'opacity 0.3s ease';
        setInterval(rotateTestimonial, 5000);
    }
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
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
    
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--indigo);
        cursor: pointer;
        padding: 10px;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block;
        }
        
        .nav-center.mobile-active {
            display: block;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }
        
        .nav-center.mobile-active .nav-menu {
            flex-direction: column;
            gap: 20px;
        }
    }
`;
document.head.appendChild(style);