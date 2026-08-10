// Luxury Interior Design Studio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    });
    
    // Testimonial slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const navDots = document.querySelectorAll('.nav-dot');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });
        navDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        testimonialCards[index].classList.add('active');
        navDots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showTestimonial(index);
        });
    });
    
    // Auto-rotate testimonials
    setInterval(function() {
        const nextTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(nextTestimonial);
    }, 5000);
    
    // Before/After slider
    const sliderHandle = document.querySelector('.slider-handle');
    const beforeImage = document.querySelector('.before-image');
    const comparisonSlider = document.querySelector('.comparison-slider');
    
    if (sliderHandle && beforeImage && comparisonSlider) {
        let isDragging = false;
        
        function updateSliderPosition(clientX) {
            const rect = comparisonSlider.getBoundingClientRect();
            const x = clientX - rect.left;
            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
            
            sliderHandle.style.left = percentage + '%';
            beforeImage.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
        }
        
        sliderHandle.addEventListener('mousedown', function() {
            isDragging = true;
            document.body.style.cursor = 'ew-resize';
        });
        
        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                updateSliderPosition(e.clientX);
            }
        });
        
        document.addEventListener('mouseup', function() {
            isDragging = false;
            document.body.style.cursor = 'default';
        });
        
        comparisonSlider.addEventListener('click', function(e) {
            updateSliderPosition(e.clientX);
        });
        
        // Touch events for mobile
        sliderHandle.addEventListener('touchstart', function(e) {
            isDragging = true;
            e.preventDefault();
        });
        
        document.addEventListener('touchmove', function(e) {
            if (isDragging) {
                updateSliderPosition(e.touches[0].clientX);
            }
        });
        
        document.addEventListener('touchend', function() {
            isDragging = false;
        });
    }
    
    // Form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const projectType = formData.get('project-type');
            const budget = formData.get('budget');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !projectType || !budget || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(function() {
                alert('Thank you for your consultation request! We will contact you within 24 hours.');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
    
    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Service card animations
    const serviceCards = document.querySelectorAll('.service-card');
    
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
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Gallery item hover effects
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Team member hover effects
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        
        if (heroImage) {
            const speed = scrolled * 0.5;
            heroImage.style.transform = `translateY(${speed}px)`;
        }
    });
    
    console.log('🎨 Atelier Interior Studio - Luxury Interior Design Website Loaded Successfully!');
});