// Wedding Organizer Website JavaScript

// Navbar scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
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

// Form submission handling
document.querySelector('.consultation-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const weddingDate = this.querySelector('input[type="date"]').value;
    const location = this.querySelector('input[type="text"][placeholder="Wedding Location"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !weddingDate || !location) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert('Thank you for your consultation request! We will contact you soon.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Package selection
document.querySelectorAll('.btn-package').forEach(button => {
    button.addEventListener('click', function() {
        const packageCard = this.closest('.package-card');
        const packageName = packageCard.querySelector('h3').textContent;
        const packagePrice = packageCard.querySelector('.package-price').textContent;
        
        alert(`You have selected the ${packageName} for ${packagePrice}. Our team will contact you soon to discuss the details.`);
    });
});

// View story buttons
document.querySelectorAll('.view-story-btn').forEach(button => {
    button.addEventListener('click', function() {
        const storyCard = this.closest('.story-card');
        const coupleName = storyCard.querySelector('h4').textContent;
        const location = storyCard.querySelector('p').textContent;
        
        alert(`View the beautiful wedding story of ${coupleName} at ${location}. More details coming soon!`);
    });
});

// Hero button interactions
document.querySelector('.btn-primary').addEventListener('click', function() {
    document.querySelector('#stories').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.btn-secondary').addEventListener('click', function() {
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
});

// Book consultation button
document.querySelector('.btn-consultation').addEventListener('click', function() {
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
});

// Gallery lightbox effect (simplified)
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', function() {
        const imgSrc = this.src;
        const imgAlt = this.alt;
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            cursor: pointer;
        `;
        
        // Create enlarged image
        const enlargedImg = document.createElement('img');
        enlargedImg.src = imgSrc;
        enlargedImg.alt = imgAlt;
        enlargedImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
        `;
        
        overlay.appendChild(enlargedImg);
        document.body.appendChild(overlay);
        
        // Close on click
        overlay.addEventListener('click', function() {
            document.body.removeChild(overlay);
        });
    });
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
});

// Simple testimonial slider (auto-rotate)
let currentTestimonial = 0;
const testimonials = [
    {
        text: "Our wedding day was absolutely perfect thanks to this amazing team. They made our dreams come true!",
        author: "Emma & Daniel",
        location: "Bali Beach Wedding"
    },
    {
        text: "Professional, creative, and attentive to every detail. Our wedding exceeded all expectations!",
        author: "Sarah & Michael",
        location: "Garden Wedding"
    },
    {
        text: "The most magical day of our lives. Thank you for making everything so special and stress-free!",
        author: "Jessica & David",
        location: "Church Wedding"
    }
];

function rotateTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    const testimonial = testimonials[currentTestimonial];
    
    const testimonialCard = document.querySelector('.testimonial-card');
    const testimonialText = testimonialCard.querySelector('.testimonial-content p');
    const testimonialAuthor = testimonialCard.querySelector('.author-info h4');
    
    // Fade out
    testimonialCard.style.opacity = '0';
    
    setTimeout(() => {
        testimonialText.textContent = `"${testimonial.text}"`;
        testimonialAuthor.textContent = testimonial.author;
        
        // Fade in
        testimonialCard.style.opacity = '1';
    }, 300);
}

// Auto-rotate testimonials every 5 seconds
setInterval(rotateTestimonial, 5000);

// Add entrance animations
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
document.querySelectorAll('.service-card, .story-card, .package-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});