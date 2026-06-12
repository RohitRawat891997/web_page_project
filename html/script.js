/*
 * ADVENTURE AWAITS TRAVEL WEBSITE
 * JavaScript for Interactive Features
 * Created for portfolio and job interviews
 */

// ===========================================
// GLOBAL VARIABLES AND DOM ELEMENTS
// ===========================================
let currentUser = null;
let isLoggedIn = false;

// Modal elements
const loginModal = document.getElementById('loginModal');
const bookingModal = document.getElementById('bookingModal');

// ===========================================
// NAVIGATION FUNCTIONALITY
// ===========================================

/**
 * Toggle mobile navigation menu
 * Simple function to show/hide mobile menu
 */
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');

    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

/**
 * Smooth scroll to sections
 * Handles navigation link clicks for smooth scrolling
 */
document.addEventListener('DOMContentLoaded', function() {
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

            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.remove('active');
        });
    });
});

/**
 * Update navbar appearance on scroll
 * Changes navbar background opacity based on scroll position
 */
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');

    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// ===========================================
// LOGIN MODAL FUNCTIONALITY
// ===========================================

/**
 * Open login modal
 * Shows the login modal with animation
 */
function openLoginModal() {
    loginModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

/**
 * Close login modal
 * Hides the login modal and resets form
 */
function closeLoginModal() {
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('loginForm').reset();
}

/**
 * Handle login form submission
 * Simulates login process for demonstration
 */
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            // Simulate login validation
            if (email && password) {
                // Simulate successful login
                currentUser = {
                    email: email,
                    name: email.split('@')[0] // Extract name from email
                };
                isLoggedIn = true;

                // Update UI
                updateLoginStatus();

                // Show success message
                showNotification('Login successful! Welcome back, ' + currentUser.name, 'success');

                // Close modal
                closeLoginModal();
            } else {
                showNotification('Please fill in all fields', 'error');
            }
        });
    }
});

/**
 * Switch to signup (placeholder function)
 * In a real app, this would show a signup form
 */
function switchToSignup() {
    showNotification('Signup feature coming soon!', 'info');
}

/**
 * Update login status in UI
 * Changes login button to show user status
 */
function updateLoginStatus() {
    const loginBtn = document.querySelector('.login-btn');

    if (isLoggedIn && currentUser) {
        loginBtn.textContent = `Hi, ${currentUser.name}`;
        loginBtn.onclick = logout;
    } else {
        loginBtn.textContent = 'Login';
        loginBtn.onclick = openLoginModal;
    }
}

/**
 * Logout function
 * Resets user session and updates UI
 */
function logout() {
    currentUser = null;
    isLoggedIn = false;
    updateLoginStatus();
    showNotification('Logged out successfully', 'info');
}

// ===========================================
// BOOKING MODAL FUNCTIONALITY
// ===========================================

/**
 * Open booking modal
 * Shows booking form with optional destination pre-filled
 */
function openBookingModal(destination = '') {
    bookingModal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Pre-fill destination if provided
    const destinationInput = document.getElementById('bookingDestination');
    if (destinationInput) {
        destinationInput.value = destination;
    }

    // Set minimum date to today
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
}

/**
 * Close booking modal
 * Hides booking modal and resets form
 */
function closeBookingModal() {
    bookingModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('bookingForm').reset();
}

/**
 * Handle booking form submission
 * Processes booking request with validation
 */
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                destination: document.getElementById('bookingDestination').value,
                name: document.getElementById('bookingName').value,
                email: document.getElementById('bookingEmail').value,
                phone: document.getElementById('bookingPhone').value,
                date: document.getElementById('bookingDate').value,
                guests: document.getElementById('bookingGuests').value,
                message: document.getElementById('bookingMessage').value
            };

            // Basic validation
            if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.guests) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            // Email validation
            if (!isValidEmail(formData.email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Simulate booking processing
            processBooking(formData);
        });
    }
});

/**
 * Process booking request
 * Simulates booking confirmation process
 */
function processBooking(bookingData) {
    // Show loading state (simulation)
    const submitBtn = document.querySelector('#bookingForm button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;

    // Simulate API call delay
    setTimeout(() => {
        // Generate booking reference
        const bookingRef = 'AW' + Date.now().toString().slice(-6);

        // Show success message
        const message = `Booking confirmed! Reference: ${bookingRef}. Confirmation email sent to ${bookingData.email}`;
        showNotification(message, 'success');

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Close modal
        closeBookingModal();

        // In a real app, you would send this data to a server
        console.log('Booking Data:', bookingData);
        console.log('Booking Reference:', bookingRef);

    }, 2000);
}

// ===========================================
// CONTACT FORM FUNCTIONALITY
// ===========================================

/**
 * Handle contact form submission
 * Processes contact form with basic validation
 */
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;

            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
});

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

/**
 * Validate email address
 * Simple email validation using regex
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show notification to user
 * Displays temporary notification messages
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;

    // Style the close button
    const closeBtn = notification.querySelector('button');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        margin-left: 10px;
        padding: 0;
        width: 20px;
        height: 20px;
    `;

    // Add to DOM
    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/**
 * Get notification color based on type
 * Returns appropriate color for different notification types
 */
function getNotificationColor(type) {
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#17a2b8',
        warning: '#ffc107'
    };
    return colors[type] || colors.info;
}

// ===========================================
// MODAL CLICK OUTSIDE TO CLOSE
// ===========================================

/**
 * Close modals when clicking outside
 * Improves user experience by allowing click-to-close
 */
window.addEventListener('click', function(e) {
    if (e.target === loginModal) {
        closeLoginModal();
    }
    if (e.target === bookingModal) {
        closeBookingModal();
    }
});

// ===========================================
// SCROLL ANIMATIONS
// ===========================================

/**
 * Intersection Observer for scroll animations
 * Adds animations when elements come into view
 */
document.addEventListener('DOMContentLoaded', function() {
    const animateOnScroll = document.querySelectorAll('.destination-card, .package-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animateOnScroll.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===========================================
// ADD CUSTOM CSS ANIMATIONS
// ===========================================

/**
 * Add animation styles dynamically
 * Adds keyframes for slide animations
 */
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// ===========================================
// CONSOLE WELCOME MESSAGE
// ===========================================

/**
 * Display welcome message in console
 * Professional touch for developers who inspect the code
 */
console.log('%c🌍 Adventure Awaits Travel Website', 'color: #2c5aa0; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'color: #666; font-size: 14px;');
console.log('%cPortfolio project for job interviews', 'color: #666; font-size: 14px;');
console.log('%c---', 'color: #ddd;');