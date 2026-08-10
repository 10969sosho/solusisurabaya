// Preloader with optimized animation
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const startTime = new Date().getTime();
    const minDisplayTime = 1000; // Reduced to 1 second for faster loading
    
    // Function to hide preloader
    function hidePreloader() {
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 300);
    }
    
    // Simplified load event listener for better performance
    window.addEventListener('load', function() {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - startTime;
        
        if (elapsedTime >= minDisplayTime) {
            hidePreloader();
        } else {
            setTimeout(hidePreloader, minDisplayTime - elapsedTime);
        }
    });
    
    // Fallback: If load event doesn't fire, hide preloader after 2 seconds
    setTimeout(function() {
        if (preloader.style.display !== 'none') {
            hidePreloader();
        }
    }, 2000);
});

// Initialize AOS (Animate On Scroll) with optimized settings
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 600, // Reduced duration for faster animations
        easing: 'ease-in-out',
        once: true, // Set to true to prevent repeated animations
        mirror: false,
        disable: 'mobile' // Disable on mobile for better performance
    });
    
    // AOS works well with Lenis as it uses IntersectionObserver
    // No additional integration needed
});

// Initialize Lenis for smooth scrolling
let lenis;
let lastScrollTop = 0;

document.addEventListener('DOMContentLoaded', function() {
    // Check if Lenis is available
    if (typeof Lenis !== 'undefined') {
        // Initialize Lenis with smooth scroll and slight delay
        lenis = new Lenis({
            duration: 1.2, // Slight delay for smoother feel
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
            smooth: true,
            smoothTouch: false, // Disable on touch devices for better performance
            touchMultiplier: 2
        });

        // Request animation frame for Lenis
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Navbar scroll effect with Lenis
        lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
            const navbar = document.querySelector('.navbar');
            const backToTopButton = document.querySelector('.back-to-top');
            
            // Only run if we've scrolled significantly
            if (Math.abs(lastScrollTop - scroll) > 10) {
                if (scroll > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                // Back to top button visibility
                if (backToTopButton) {
                    if (scroll > 300) {
                        backToTopButton.classList.add('show');
                    } else {
                        backToTopButton.classList.remove('show');
                    }
                }
                
                lastScrollTop = scroll;
            }
        });

        // Smooth scrolling for anchor links with Lenis
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement && lenis) {
                    // Use Lenis for smooth scrolling with offset for navbar
                    lenis.scrollTo(targetElement, {
                        offset: -70,
                        duration: 1.2,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                    });
                }
            });
        });
    } else {
        // Fallback to native smooth scroll if Lenis is not available
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            const backToTopButton = document.querySelector('.back-to-top');
            const scrollTop = window.scrollY;
            
            // Only run if we've scrolled significantly
            if (Math.abs(lastScrollTop - scrollTop) > 10) {
                if (scrollTop > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                // Back to top button visibility
                if (backToTopButton) {
                    if (scrollTop > 300) {
                        backToTopButton.classList.add('show');
                    } else {
                        backToTopButton.classList.remove('show');
                    }
                }
                
                lastScrollTop = scrollTop;
            }
        }, { passive: true });

        // Fallback smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
});

// Gallery filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item-wrapper');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

// Gallery image hover effect
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.classList.add('hovered');
    });
    
    item.addEventListener('mouseleave', function() {
        this.classList.remove('hovered');
    });
});

// Lightbox for gallery images
document.addEventListener('DOMContentLoaded', function() {
    const galleryPopups = document.querySelectorAll('.gallery-popup');
    
    galleryPopups.forEach(popup => {
        popup.addEventListener('click', function(e) {
            e.preventDefault();
            
            const imageUrl = this.getAttribute('href');
            const imageTitle = this.closest('.gallery-info').querySelector('h5').textContent;
            const imageDesc = this.closest('.gallery-info').querySelector('p').textContent;
            
            // Create lightbox elements
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            const lightboxContent = document.createElement('div');
            lightboxContent.className = 'lightbox-content';
            
            const lightboxClose = document.createElement('span');
            lightboxClose.className = 'lightbox-close';
            lightboxClose.innerHTML = '&times;';
            
            const lightboxImage = document.createElement('img');
            lightboxImage.src = imageUrl;
            lightboxImage.alt = imageTitle;
            
            const lightboxCaption = document.createElement('div');
            lightboxCaption.className = 'lightbox-caption';
            lightboxCaption.innerHTML = `<h4>${imageTitle}</h4><p>${imageDesc}</p>`;
            
            // Append elements
            lightboxContent.appendChild(lightboxClose);
            lightboxContent.appendChild(lightboxImage);
            lightboxContent.appendChild(lightboxCaption);
            lightbox.appendChild(lightboxContent);
            document.body.appendChild(lightbox);
            
            // Prevent scrolling with Lenis
            if (lenis) {
                lenis.stop();
            } else {
                document.body.style.overflow = 'hidden';
            }
            
            // Add show class after a small delay to trigger transition
            setTimeout(() => {
                lightbox.classList.add('show');
            }, 50);
            
            // Close lightbox when clicking on close button or outside the content
            lightboxClose.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
            
            function closeLightbox() {
                lightbox.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(lightbox);
                    // Resume scrolling with Lenis
                    if (lenis) {
                        lenis.start();
                    } else {
                        document.body.style.overflow = '';
                    }
                }, 300);
            }
        });
    });
});

// Back to top button functionality
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            // Use Lenis for smooth scroll to top
            if (lenis) {
                lenis.scrollTo(0, {
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Counter animation - optimized for performance
function startCounters() {
    const counterElements = document.querySelectorAll('.counter-number');
    
    counterElements.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 1500; // Reduced from 2000ms
        const step = Math.ceil(target / (duration / 30)); // Less frequent updates (30ms instead of 20ms)
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            
            if (current >= target) {
                counter.textContent = target;
                clearInterval(countInterval);
            } else {
                counter.textContent = current;
            }
        };
        
        const countInterval = setInterval(updateCounter, 30);
    });
}

// Trigger counter animation when counter section is in viewport - optimized
const counterSection = document.querySelector('.counter-section');
if (counterSection) {
    // Using simpler IntersectionObserver configuration
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Delay counter start slightly for better performance
                setTimeout(() => {
                    startCounters();
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 }); // Reduced threshold for earlier triggering
    
    observer.observe(counterSection);
}

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Mengirim...';
        submitBtn.disabled = true;
        
        // Simulate API call with timeout
        setTimeout(function() {
            // Reset form
            contactForm.reset();
            
            // Show success message
            const formContainer = contactForm.parentElement;
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-3';
            successMessage.textContent = 'Pesan Anda telah berhasil dikirim. Kami akan menghubungi Anda segera.';
            formContainer.appendChild(successMessage);
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Remove success message after 5 seconds
            setTimeout(function() {
                successMessage.remove();
            }, 5000);
        }, 1500);
    });
}

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Mengirim...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(function() {
            // Reset form
            newsletterForm.reset();
            
            // Show success message
            const formContainer = newsletterForm.parentElement;
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-3';
            successMessage.textContent = 'Berhasil berlangganan newsletter kami!';
            formContainer.appendChild(successMessage);
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Remove success message after 5 seconds
            setTimeout(function() {
                successMessage.remove();
            }, 5000);
        }, 1000);
    });
}

// Add float animation to certain elements
document.addEventListener('DOMContentLoaded', function() {
    // Add floating animation to the hero button
    const heroButton = document.querySelector('.hero .btn-primary');
    if (heroButton) {
        heroButton.classList.add('float-animation');
    }
    
    // Add pulse animation to service icons
    const serviceIcons = document.querySelectorAll('.service-icon');
    serviceIcons.forEach(icon => {
        icon.classList.add('pulse-animation');
    });
}); 