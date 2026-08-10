// E-Commerce Store JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider Functionality
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Auto-slide functionality
    let slideInterval = setInterval(nextSlide, 5000);

    // Button event listeners
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', function() {
            prevSlide();
            resetInterval();
        });

        nextButton.addEventListener('click', function() {
            nextSlide();
            resetInterval();
        });
    }

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Product Card Interactions
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const quickViewBtn = card.querySelector('.quick-view');
        const addToCartBtn = card.querySelector('.add-to-cart');
        const wishlistBtn = card.querySelector('.wishlist-btn');
        const cartBtn = card.querySelector('.cart-btn');

        if (quickViewBtn) {
            quickViewBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                showQuickView(card);
            });
        }

        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                addToCart(card);
            });
        }

        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleWishlist(card, wishlistBtn);
            });
        }

        if (cartBtn) {
            cartBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                addToCart(card);
            });
        }
    });

    // Quick View Functionality
    function showQuickView(card) {
        const productName = card.querySelector('h3').textContent;
        const productPrice = card.querySelector('.price').textContent;
        
        alert(`Quick View: ${productName} - ${productPrice}\n\nThis would normally open a modal with product details.`);
    }

    // Add to Cart Functionality
    function addToCart(card) {
        const productName = card.querySelector('h3').textContent;
        const cartCount = document.querySelector('.cart-count');
        
        if (cartCount) {
            let currentCount = parseInt(cartCount.textContent);
            cartCount.textContent = currentCount + 1;
        }
        
        // Show success message
        showNotification(`${productName} added to cart!`, 'success');
    }

    // Wishlist Functionality
    function toggleWishlist(card, button) {
        const productName = card.querySelector('h3').textContent;
        
        if (button.style.color === 'red') {
            button.style.color = '';
            showNotification(`${productName} removed from wishlist`, 'info');
        } else {
            button.style.color = 'red';
            showNotification(`${productName} added to wishlist!`, 'success');
        }
    }

    // Category Card Interactions
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = card.querySelector('h3').textContent;
            showNotification(`Browsing ${categoryName} category`, 'info');
        });
    });

    // Newsletter Subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                showNotification(`Thank you for subscribing with ${email}!`, 'success');
                emailInput.value = '';
            }
        });
    }

    // Search Functionality
    const searchBar = document.querySelector('.search-bar');
    
    if (searchBar) {
        const searchInput = searchBar.querySelector('input');
        const searchButton = searchBar.querySelector('button');
        
        searchButton.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }

    function performSearch(query) {
        if (query.trim()) {
            showNotification(`Searching for: "${query}"`, 'info');
            // In a real application, this would trigger a search API call
        }
    }

    // Navigation Menu Interactions
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Notification System
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;
        
        // Set background color based on type
        switch (type) {
            case 'success':
                notification.style.backgroundColor = '#10B981';
                break;
            case 'error':
                notification.style.backgroundColor = '#EF4444';
                break;
            case 'warning':
                notification.style.backgroundColor = '#F59E0B';
                break;
            default:
                notification.style.backgroundColor = '#2563EB';
        }
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Smooth scrolling for all anchor links
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

    // Mobile Menu Toggle (for future mobile implementation)
    function toggleMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('mobile-active');
    }

    // Initialize mobile menu button (if exists)
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }

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

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.product-card, .category-card, .review-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    console.log('E-Commerce Store JavaScript loaded successfully!');
});