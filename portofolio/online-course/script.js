// Modern E-Learning Platform - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Course search functionality
    initCourseSearch();
    
    // Newsletter subscription
    initNewsletterSubscription();
    
    // Mobile menu toggle
    initMobileMenu();
    
    // Course enrollment buttons
    initCourseEnrollment();
    
    // Review slider
    initReviewSlider();
    
    // Scroll animations
    initScrollAnimations();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Course search functionality
function initCourseSearch() {
    const searchInput = document.querySelector('.search-input');
    const categoryDropdown = document.querySelector('.category-dropdown');
    const searchBtn = document.querySelector('.search-btn');
    const courseCards = document.querySelectorAll('.course-card');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryDropdown.value.toLowerCase();
        
        courseCards.forEach(card => {
            const courseTitle = card.querySelector('.course-title').textContent.toLowerCase();
            const courseInstructor = card.querySelector('.course-instructor').textContent.toLowerCase();
            
            const matchesSearch = searchTerm === '' || 
                                courseTitle.includes(searchTerm) || 
                                courseInstructor.includes(searchTerm);
            
            const matchesCategory = selectedCategory === 'all categories' || 
                                   courseTitle.includes(selectedCategory.toLowerCase());
            
            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    categoryDropdown.addEventListener('change', performSearch);
}

// Newsletter subscription
function initNewsletterSubscription() {
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = document.querySelector('.newsletter-input');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = newsletterInput.value.trim();
        
        if (email && isValidEmail(email)) {
            // Simulate subscription success
            showNotification('Thank you for subscribing! Check your email for confirmation.', 'success');
            newsletterInput.value = '';
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navContainer = document.querySelector('.nav-container');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: var(--purple);
    `;
    
    // Insert mobile menu button
    navContainer.insertBefore(mobileMenuBtn, navContainer.firstChild);
    
    // Show/hide mobile menu button based on screen size
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
            document.querySelector('.nav-center').style.display = 'none';
            document.querySelector('.nav-right').style.display = 'none';
        } else {
            mobileMenuBtn.style.display = 'none';
            document.querySelector('.nav-center').style.display = 'block';
            document.querySelector('.nav-right').style.display = 'flex';
        }
    }
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    // Mobile menu functionality
    mobileMenuBtn.addEventListener('click', function() {
        const navCenter = document.querySelector('.nav-center');
        const navRight = document.querySelector('.nav-right');
        
        if (navCenter.style.display === 'none' || navCenter.style.display === '') {
            navCenter.style.display = 'block';
            navRight.style.display = 'flex';
            navCenter.style.position = 'absolute';
            navCenter.style.top = '80px';
            navCenter.style.left = '0';
            navCenter.style.right = '0';
            navCenter.style.backgroundColor = 'var(--white)';
            navCenter.style.boxShadow = 'var(--shadow)';
            navCenter.style.padding = '20px';
            navRight.style.position = 'absolute';
            navRight.style.top = '200px';
            navRight.style.left = '20px';
            navRight.style.right = '20px';
            navRight.style.flexDirection = 'column';
        } else {
            navCenter.style.display = 'none';
            navRight.style.display = 'none';
        }
    });
}

// Course enrollment buttons
function initCourseEnrollment() {
    const enrollButtons = document.querySelectorAll('.btn-enroll');
    
    enrollButtons.forEach(button => {
        button.addEventListener('click', function() {
            const courseCard = this.closest('.course-card');
            const courseTitle = courseCard.querySelector('.course-title').textContent;
            
            // Simulate enrollment process
            this.textContent = 'Enrolling...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = 'Enrolled!';
                this.style.backgroundColor = '#10B981';
                showNotification(`Successfully enrolled in ${courseTitle}!`, 'success');
            }, 1500);
        });
    });
}

// Review slider
function initReviewSlider() {
    const reviews = [
        {
            text: "The courses are easy to understand and very practical.",
            author: "Alex Johnson",
            rating: 5
        },
        {
            text: "Excellent instructors and comprehensive course materials.",
            author: "Sarah Williams",
            rating: 5
        },
        {
            text: "I learned so much and improved my skills significantly.",
            author: "Mike Chen",
            rating: 5
        },
        {
            text: "Great platform with amazing user experience.",
            author: "Emma Davis",
            rating: 4
        }
    ];
    
    let currentReview = 0;
    const reviewCard = document.querySelector('.review-card');
    
    function showReview(index) {
        const review = reviews[index];
        const reviewContent = reviewCard.querySelector('.review-content p');
        const reviewAuthor = reviewCard.querySelector('.author-info h4');
        const ratingContainer = reviewCard.querySelector('.author-info .rating');
        
        // Add fade out animation
        reviewCard.style.opacity = '0';
        
        setTimeout(() => {
            reviewContent.textContent = `"${review.text}"`;
            reviewAuthor.textContent = review.author;
            
            // Update rating stars
            ratingContainer.innerHTML = '';
            for (let i = 0; i < 5; i++) {
                const star = document.createElement('i');
                star.className = i < review.rating ? 'fas fa-star' : 'far fa-star';
                ratingContainer.appendChild(star);
            }
            
            // Fade in
            reviewCard.style.opacity = '1';
        }, 300);
    }
    
    // Auto-rotate reviews every 4 seconds
    setInterval(() => {
        currentReview = (currentReview + 1) % reviews.length;
        showReview(currentReview);
    }, 4000);
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.course-card, .category-card, .instructor-card, .achievement-item');
    animatedElements.forEach(el => observer.observe(el));
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        background-color: ${type === 'success' ? '#10B981' : '#EF4444'};
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .review-card {
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);