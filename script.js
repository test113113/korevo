// ===== MOBILE MENU FUNCTIONALITY =====
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

// Mobile dropdown toggle for touch devices
function toggleDropdown(event) {
    if (window.innerWidth <= 768) {
        event.preventDefault();
        const navItem = event.target.closest('.nav-item');
        navItem.classList.toggle('active');
    }
}

// ===== NAVIGATION FUNCTIONALITY =====
function scrollToSection(sectionId) {
    console.log(`Scrolling to: ${sectionId}`);
    
    // Close mobile menu if open
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.remove('active');
    
    // This will be implemented when sections are added
    // For now, just scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== SCROLL ANIMATIONS =====
function handleScrollAnimations() {
    const sections = document.querySelectorAll('.content-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// ===== LANGUAGE SELECTOR =====
function initLanguageSelector() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all buttons
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Here you can add language switching logic
            const selectedLang = this.textContent.trim();
            console.log(`Language selected: ${selectedLang}`);
        });
    });
}

// ===== MENU CLOSE FUNCTIONALITY =====
function initMenuCloseEvents() {
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const navMenu = document.getElementById('navMenu');
        const menuToggle = document.querySelector('.menu-toggle');
        const navContainer = document.querySelector('.nav-container');
        
        if (!navContainer.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });

    // Close dropdown when clicking outside (mobile)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            const activeItems = document.querySelectorAll('.nav-item.active');
            activeItems.forEach(item => {
                if (!item.contains(e.target)) {
                    item.classList.remove('active');
                }
            });
        }
    });
}

// ===== MOBILE DROPDOWN EVENTS =====
function initMobileDropdownEvents() {
    // Add touch event for mobile dropdowns
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', toggleDropdown);
    });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
function initSmoothScroll() {
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
}

// ===== WINDOW RESIZE HANDLER =====
function initResizeHandler() {
    window.addEventListener('resize', function() {
        // Close mobile menu on desktop resize
        if (window.innerWidth > 768) {
            const navMenu = document.getElementById('navMenu');
            navMenu.classList.remove('active');
            
            // Close any active mobile dropdowns
            document.querySelectorAll('.nav-item.active').forEach(item => {
                item.classList.remove('active');
            });
        }
    });
}

// ===== HEADER SCROLL EFFECT =====
function initHeaderScrollEffect() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
}

// ===== CTA BUTTON ANIMATIONS =====
function initCTAAnimations() {
    const ctaButtons = document.querySelectorAll('.cta-btn, .business-cta');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== CARD HOVER EFFECTS =====
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.business-card, .feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== LOADING ANIMATIONS =====
function initLoadingAnimations() {
    // Fade in hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Stagger animation for business cards
    const businessCards = document.querySelectorAll('.business-card');
    businessCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 500 + (index * 200));
    });
}

// ===== PERFORMANCE OPTIMIZATION =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== MAIN INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('KOREVO website initialized');
    
    // Initialize all functionality
    handleScrollAnimations();
    initLanguageSelector();
    initMenuCloseEvents();
    initMobileDropdownEvents();
    initSmoothScroll();
    initResizeHandler();
    initHeaderScrollEffect();
    initCTAAnimations();
    initCardHoverEffects();
    initLoadingAnimations();
    
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
});

// ===== UTILITY FUNCTIONS =====
const KorevoUtils = {
    // Smooth scroll to element
    scrollToElement: function(elementId, offset = 80) {
        const element = document.getElementById(elementId);
        if (element) {
            const top = element.offsetTop - offset;
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        }
    },
    
    // Check if element is in viewport
    isElementInViewport: function(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Format phone number
    formatPhoneNumber: function(phoneNumber) {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
        if (match) {
            return match[1] + '-' + match[2] + '-' + match[3];
        }
        return phoneNumber;
    },
    
    // Validate email
    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
};

// ===== GLOBAL ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Here you could send error reports to your analytics service
});

// ===== EXPORT FOR MODULE USE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleMenu,
        scrollToSection,
        KorevoUtils
    };
}