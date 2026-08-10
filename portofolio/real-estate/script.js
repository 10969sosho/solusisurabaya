// Navbar functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Sticky navbar on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        } else {
            navbar.style.backgroundColor = 'var(--white)';
            navbar.style.backdropFilter = 'none';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        }
    });
    
    // Smooth scrolling for navigation links
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
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-content')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Property search form functionality
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const searchData = {
                location: formData.get('location'),
                propertyType: formData.get('property-type'),
                priceRange: formData.get('price-range'),
                bedrooms: formData.get('bedrooms')
            };
            
            console.log('Search Data:', searchData);
            
            // Show loading state
            const searchButton = this.querySelector('.btn-search');
            const originalText = searchButton.textContent;
            searchButton.textContent = 'Searching...';
            searchButton.disabled = true;
            
            // Simulate search delay
            setTimeout(() => {
                searchButton.textContent = originalText;
                searchButton.disabled = false;
                
                // In a real application, you would make an API call here
                alert(`Searching for properties in ${searchData.location || 'all locations'}...`);
            }, 1500);
        });
    }
    
    // Contact form functionality
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const contactData = {
                name: formData.get('name') || this.querySelector('input[type="text"]').value,
                email: formData.get('email') || this.querySelector('input[type="email"]').value,
                message: formData.get('message') || this.querySelector('textarea').value
            };
            
            console.log('Contact Data:', contactData);
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitButton.textContent = 'Message Sent!';
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }
    
    // Property card interactions
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
        const viewDetailsBtn = card.querySelector('.btn-view-details');
        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const propertyTitle = card.querySelector('h3').textContent;
                alert(`Viewing details for: ${propertyTitle}`);
            });
        }
    });
    
    // Agent card interactions
    const agentCards = document.querySelectorAll('.agent-card');
    agentCards.forEach(card => {
        const contactBtn = card.querySelector('.btn-contact-agent');
        if (contactBtn) {
            contactBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const agentName = card.querySelector('h3').textContent;
                alert(`Contacting ${agentName}...`);
            });
        }
    });
    
    // Location card interactions
    const locationCards = document.querySelectorAll('.location-card');
    locationCards.forEach(card => {
        card.addEventListener('click', function() {
            const locationName = this.querySelector('h3').textContent;
            const propertyCount = this.querySelector('p').textContent;
            alert(`Viewing ${propertyCount} in ${locationName}`);
        });
    });
    
    // Testimonial slider auto-rotation (simple version)
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    function showNextTestimonial() {
        testimonialCards.forEach(card => {
            card.style.opacity = '0.7';
            card.style.transform = 'scale(0.98)';
        });
        
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        
        testimonialCards[currentTestimonial].style.opacity = '1';
        testimonialCards[currentTestimonial].style.transform = 'scale(1)';
    }
    
    // Auto-rotate testimonials every 5 seconds
    if (testimonialCards.length > 1) {
        setInterval(showNextTestimonial, 5000);
    }
    
    // Add scroll animations
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
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.property-card, .agent-card, .feature-card, .testimonial-card, .blog-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/400x250?text=Property+Image';
            this.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
    
    // Add hover effects for buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-search, .btn-view-details, .btn-contact-agent');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    console.log('HomeFind Real Estate website loaded successfully!');
});