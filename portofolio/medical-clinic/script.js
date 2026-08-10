// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
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
    
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'var(--white)';
            navbar.style.backdropFilter = 'none';
        }
    });
    
    // Appointment form handling
    const appointmentForm = document.querySelector('.appointment-form');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const patientName = this.querySelector('input[type="text"]').value;
            
            // Simple validation
            if (!patientName.trim()) {
                alert('Please enter your name');
                return;
            }
            
            // Show success message
            alert(`Thank you ${patientName}! Your appointment request has been submitted. We will contact you soon to confirm your appointment.`);
            
            // Reset form
            this.reset();
        });
    }
    
    // CTA button clicks
    const ctaButtons = document.querySelectorAll('.btn-primary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent.includes('Book Appointment')) {
                e.preventDefault();
                const appointmentSection = document.querySelector('.appointment');
                if (appointmentSection) {
                    const offsetTop = appointmentSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Doctor card interactions
    const doctorCards = document.querySelectorAll('.doctor-card');
    
    doctorCards.forEach(card => {
        const viewProfileBtn = card.querySelector('.btn-outline');
        
        if (viewProfileBtn) {
            viewProfileBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const doctorName = card.querySelector('h3').textContent;
                const specialization = card.querySelector('.specialization').textContent;
                
                alert(`Viewing profile for ${doctorName} - ${specialization}`);
            });
        }
    });
    
    // Department card interactions
    const departmentCards = document.querySelectorAll('.department-card');
    
    departmentCards.forEach(card => {
        card.addEventListener('click', function() {
            const departmentName = this.querySelector('h3').textContent;
            alert(`Learn more about our ${departmentName} department`);
        });
    });
    
    // Article card interactions
    const articleCards = document.querySelectorAll('.article-card');
    
    articleCards.forEach(card => {
        card.addEventListener('click', function() {
            const articleTitle = this.querySelector('h3').textContent;
            alert(`Reading article: ${articleTitle}`);
        });
    });
    
    // Testimonial slider auto-rotation (simple version)
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    function showNextTestimonial() {
        testimonialCards.forEach(card => {
            card.style.opacity = '0.7';
            card.style.transform = 'scale(0.95)';
        });
        
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        
        if (testimonialCards[currentTestimonial]) {
            testimonialCards[currentTestimonial].style.opacity = '1';
            testimonialCards[currentTestimonial].style.transform = 'scale(1)';
        }
    }
    
    // Initialize testimonial visibility
    if (testimonialCards.length > 0) {
        testimonialCards[0].style.opacity = '1';
        testimonialCards[0].style.transform = 'scale(1)';
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(showNextTestimonial, 5000);
    }
    
    // Mobile menu toggle (if needed)
    function createMobileMenu() {
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        
        if (window.innerWidth <= 768) {
            const menuToggle = document.createElement('button');
            menuToggle.className = 'mobile-menu-toggle';
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            
            menuToggle.addEventListener('click', function() {
                navMenu.classList.toggle('mobile-active');
                const icon = this.querySelector('i');
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            });
            
            navContainer.insertBefore(menuToggle, navContainer.firstChild);
        }
    }
    
    // Initialize mobile menu
    createMobileMenu();
    
    // Re-create mobile menu on window resize
    window.addEventListener('resize', function() {
        const existingToggle = document.querySelector('.mobile-menu-toggle');
        if (existingToggle) {
            existingToggle.remove();
        }
        createMobileMenu();
    });
    
    // Add loading animation for page elements
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
    
    // Observe all cards and sections
    const observeElements = document.querySelectorAll('.service-card, .doctor-card, .department-card, .article-card, .testimonial-card');
    
    observeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    console.log('MediCare Clinic website loaded successfully!');
});