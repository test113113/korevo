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
    
    // Find the target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        // If section doesn't exist yet, scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
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
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.classList.remove('scrolled');
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
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

// ===== CEO MESSAGE SECTION ANIMATIONS =====
function initCEOMessageAnimations() {
    // Intersection Observer for CEO section animations
    const ceoObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const ceoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                
                // Add special effects for CEO image
                if (entry.target.classList.contains('ceo-image')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'scale(1.02) rotate(2deg)';
                        setTimeout(() => {
                            entry.target.style.transform = 'scale(1) rotate(0deg)';
                        }, 300);
                    }, 500);
                }
            }
        });
    }, ceoObserverOptions);

    // Observe CEO section elements
    const ceoElements = document.querySelectorAll('.ceo-profile-card, .message-content, .vision-card, .cta-section');
    ceoElements.forEach(el => {
        ceoObserver.observe(el);
    });
}

// ===== CEO IMAGE INTERACTIONS =====
function initCEOImageInteractions() {
    const ceoImage = document.querySelector('.ceo-image');
    if (ceoImage) {
        ceoImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(5deg)';
        });

        ceoImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });

        // Add click interaction for mobile
        ceoImage.addEventListener('click', function() {
            this.style.transform = 'scale(1.1) rotate(10deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 200);
        });
    }
}

// ===== VISION CARDS INTERACTIONS =====
function initVisionCardInteractions() {
    const visionCards = document.querySelectorAll('.vision-card');
    
    visionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(255, 215, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.08)';
        });

        // Add click effect for mobile
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'translateY(0) scale(1)';
            }, 150);
        });
    });
}

// ===== HIGHLIGHT TEXT ANIMATION =====
function initHighlightTextAnimation() {
    const highlightTexts = document.querySelectorAll('.highlight-text');
    
    const highlightObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.background = 'linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(44, 85, 48, 0.2))';
                entry.target.style.transform = 'scale(1.05)';
                
                setTimeout(() => {
                    entry.target.style.background = 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(44, 85, 48, 0.1))';
                    entry.target.style.transform = 'scale(1)';
                }, 300);
            }
        });
    }, { threshold: 1.0 });

    highlightTexts.forEach(text => {
        highlightObserver.observe(text);
    });
}

// ===== CEO SECTION CTA INTERACTIONS =====
function initCEOCTAInteractions() {
    const ctaButtons = document.querySelectorAll('.ceo-message-section .cta-btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 15px 30px rgba(255, 215, 0, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 20px rgba(255, 215, 0, 0.3)';
        });

        button.addEventListener('click', function(e) {
            // Ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ===== TYPING ANIMATION FOR CEO MESSAGE =====
function initTypingAnimation() {
    const messageText = document.querySelector('.message-text');
    if (messageText) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add typing cursor effect
                    const cursor = document.createElement('span');
                    cursor.innerHTML = '|';
                    cursor.style.animation = 'blink 1s infinite';
                    cursor.style.fontWeight = 'bold';
                    cursor.style.color = '#FFD700';
                    
                    // Add CSS for cursor animation
                    if (!document.querySelector('#cursor-style')) {
                        const style = document.createElement('style');
                        style.id = 'cursor-style';
                        style.innerHTML = `
                            @keyframes blink {
                                0%, 50% { opacity: 1; }
                                51%, 100% { opacity: 0; }
                            }
                            @keyframes ripple {
                                to { transform: scale(4); opacity: 0; }
                            }
                        `;
                        document.head.appendChild(style);
                    }
                    
                    messageText.appendChild(cursor);
                    
                    // Remove cursor after animation
                    setTimeout(() => {
                        if (cursor.parentNode) {
                            cursor.remove();
                        }
                    }, 3000);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(messageText);
    }
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

// ===== PAGE NAVIGATION FUNCTIONS =====
function navigateToPage(page) {
    console.log(`Navigate to: ${page}`);
    
    // 페이지 네비게이션 로직
    const pageMap = {
        'vision': 'vision.html',
        'history': 'history.html',
        'team': 'team.html',
        'onyu-brand': 'onyu-brand.html',
        'brand-philosophy': 'brand-philosophy.html',
        'traditional-craft': 'traditional-craft.html',
        'business-model': 'business-model.html',
        'innovation-strategy': 'innovation-strategy.html',
        'sustainability': 'sustainability.html',
        'dining-set': 'dining-set.html',
        'health-products': 'health-products.html',
        'gift-sets': 'gift-sets.html',
        'custom-craft': 'custom-craft.html',
        'erp-solution': 'erp-solution.html',
        'iot-platform': 'iot-platform.html',
        'ecommerce-system': 'ecommerce-system.html',
        'consulting': 'consulting.html',
        'current-projects': 'current-projects.html',
        'completed-projects': 'completed-projects.html',
        'research-outcomes': 'research-outcomes.html',
        'collaboration': 'collaboration.html',
        'product-support': 'product-support.html',
        'software-support': 'software-support.html',
        'faq': 'faq.html',
        'inquiry': 'inquiry.html',
        'download': 'download.html',
        'notice': 'notice.html',
        'news': 'news.html',
        'blog': 'blog.html',
        'events': 'events.html',
        'awards': 'awards.html'
    };
    
    const targetPage = pageMap[page];
    if (targetPage) {
        // 실제 환경에서는 페이지 이동
        window.location.href = targetPage;
    } else {
        console.error(`Page not found: ${page}`);
    }
}

// ===== MAIN INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('KOREVO website initialized');
    
    // Initialize all functionality (언어 선택기 제외 - 번역 시스템에서 처리)
    handleScrollAnimations();
    initMenuCloseEvents();
    initMobileDropdownEvents();
    initSmoothScroll();
    initResizeHandler();
    initHeaderScrollEffect();
    initCTAAnimations();
    initCardHoverEffects();
    initLoadingAnimations();
    
    // Initialize CEO Message Section
    initCEOMessageAnimations();
    initCEOImageInteractions();
    initVisionCardInteractions();
    initHighlightTextAnimation();
    initCEOCTAInteractions();
    initTypingAnimation();
    
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
    },
    
    // Get current language
    getCurrentLanguage: function() {
        return localStorage.getItem('selectedLanguage') || 'ko';
    },
    
    // Set language
    setLanguage: function(langCode) {
        localStorage.setItem('selectedLanguage', langCode);
        if (window.translationService) {
            window.translationService.translatePage(langCode);
        }
    }
};

// ===== GLOBAL ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// ===== EXPORT FOR MODULE USE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleMenu,
        scrollToSection,
        KorevoUtils,
        navigateToPage
    };
}
