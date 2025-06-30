// ===== MOBILE MENU TOGGLE - FIXED ===== 
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

// ===== MOBILE DROPDOWN TOGGLE =====
function toggleDropdown(event) {
    if (window.innerWidth <= 768) {
        event.preventDefault();
        const navItem = event.target.closest('.nav-item');
        const otherNavItems = document.querySelectorAll('.nav-item');
        
        // Close other dropdowns
        otherNavItems.forEach(item => {
            if (item !== navItem) {
                item.classList.remove('active');
            }
        });
        
        // Toggle current dropdown
        navItem.classList.toggle('active');
    }
}

// ===== PAGE NAVIGATION =====
function navigateToPage(page) {
    console.log(`Navigate to: ${page}`);
    
    // 페이지 맵핑
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
        window.location.href = targetPage;
    } else {
        alert('해당 페이지는 준비 중입니다.');
    }
}

// ===== ENHANCED VIDEO HANDLING =====
function handleVideoError(video) {
    console.log('Video failed to load:', video.currentSrc || video.src);
    video.style.display = 'none';
    video.classList.add('error');
    
    // Show fallback background
    const fallback = document.querySelector('.hero-fallback-image');
    if (fallback) {
        fallback.style.opacity = '0.8';
    }
    
    // Log error details
    if (video.error) {
        console.error('Video error details:', {
            code: video.error.code,
            message: video.error.message
        });
    }
}

function handleVideoLoad(video) {
    console.log('Video can start playing:', video.currentSrc || video.src);
    video.classList.add('loaded');
}

function handleVideoLoadedData(video) {
    console.log('Video loaded successfully:', video.currentSrc || video.src);
    
    // Try to play video
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                console.log('Video playing successfully');
                video.classList.add('loaded');
            })
            .catch(error => {
                console.log('Video autoplay failed:', error);
                handleVideoError(video);
            });
    }
}

// ===== VIDEO INITIALIZATION =====
function initializeVideo() {
    const video = document.querySelector('.hero-video');
    
    if (!video) {
        console.log('No video element found');
        return;
    }

    // Set video properties for better mobile support
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('playsinline', '');
    video.muted = true;
    video.defaultMuted = true;

    // Check if video file exists before trying to load
    fetch('./video/korevo_hero.mp4', { method: 'HEAD' })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Video file not found: ${response.status}`);
            }
            console.log('Video file exists and is accessible');
            
            // Add event listeners after confirming file exists
            video.addEventListener('loadstart', () => {
                console.log('Video loading started');
            });

            video.addEventListener('canplay', () => {
                handleVideoLoad(video);
            });

            video.addEventListener('loadeddata', () => {
                handleVideoLoadedData(video);
            });

            video.addEventListener('error', (e) => {
                console.error('Video error event:', e);
                handleVideoError(video);
            });

            // Start loading the video
            video.load();
        })
        .catch(error => {
            console.error('Video file check failed:', error);
            handleVideoError(video);
        });

    // Force video play on user interaction (for mobile)
    document.addEventListener('click', () => {
        if (video.paused && !video.classList.contains('error')) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log('Manual video play failed:', error);
                });
            }
        }
    }, { once: true });
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== HEADER BACKGROUND ON SCROLL =====
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.borderBottom = '1px solid rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.8)';
        header.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
    }
});

// ===== LANGUAGE SELECTOR =====
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all buttons
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Add visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });
});

// ===== MOBILE MENU EVENT LISTENERS =====
function initMobileMenuEvents() {
    // Add touch event for mobile dropdowns
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // Only toggle dropdown for mobile
            if (window.innerWidth <= 768) {
                const parentItem = this.closest('.nav-item');
                const hasDropdown = parentItem.querySelector('.dropdown, .mega-dropdown');
                
                if (hasDropdown) {
                    e.preventDefault();
                    toggleDropdown(e);
                }
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const navMenu = document.getElementById('navMenu');
        const menuToggle = document.querySelector('.menu-toggle');
        const navContainer = document.querySelector('.nav-container');
        
        if (!navContainer.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
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

// ===== WINDOW RESIZE HANDLER =====
function initResizeHandler() {
    window.addEventListener('resize', function() {
        // Close mobile menu on desktop resize
        if (window.innerWidth > 768) {
            const navMenu = document.getElementById('navMenu');
            const menuToggle = document.querySelector('.menu-toggle');
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            
            // Close any active mobile dropdowns
            document.querySelectorAll('.nav-item.active').forEach(item => {
                item.classList.remove('active');
            });
        }
    });
}

// ===== CARD HOVER EFFECTS =====
document.querySelectorAll('.business-card, .feature-card, .product-card, .tech-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
        this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
});

// ===== BUTTON INTERACTIONS =====
document.querySelectorAll('.cta-btn, .business-cta').forEach(btn => {
    btn.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.98)';
    });
    
    btn.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.business-card, .feature-card, .product-card, .tech-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
});

// ===== MOBILE DETECTION AND OPTIMIZATION =====
function isMobile() {
    return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function isReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ===== PERFORMANCE OPTIMIZATION =====
function optimizeForDevice() {
    if (isMobile()) {
        console.log('Mobile device detected - optimizing experience');
        
        // 모바일에서도 비디오 유지하되 최적화 설정
        const video = document.querySelector('.hero-video');
        if (video) {
            // 모바일 최적화 설정
            video.style.opacity = '0.3';
            video.style.filter = 'brightness(1.2) contrast(1.2)';
            video.preload = 'metadata'; // 데이터 사용량 최소화
        }
        
        // 폴백 배경 투명도 조정
        const fallback = document.querySelector('.hero-fallback-image');
        if (fallback) {
            fallback.style.opacity = '0.3';
        }
    }

    if (isReducedMotion()) {
        console.log('Reduced motion preference detected');
        // Disable animations for users who prefer reduced motion
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    }
}

// ===== KEYBOARD NAVIGATION =====
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('navMenu');
            const menuToggle = document.querySelector('.menu-toggle');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
        
        // Enter or Space to toggle mobile menu
        if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('menu-toggle')) {
            e.preventDefault();
            toggleMenu();
        }
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

// ===== MENU CLOSE FUNCTIONALITY =====
function initMenuCloseEvents() {
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const navMenu = document.getElementById('navMenu');
        const menuToggle = document.querySelector('.menu-toggle');
        const navContainer = document.querySelector('.nav-container');
        
        if (!navContainer.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
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

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🍎 KOREVO website loaded successfully!');
    
    // Optimize for device capabilities
    optimizeForDevice();
    
    // Initialize video handling for all devices
    initializeVideo();
    
    // Initialize mobile menu events
    initMobileMenuEvents();
    
    // Initialize resize handler
    initResizeHandler();
    
    // Initialize keyboard navigation
    initKeyboardNavigation();
    
    // Initialize all functionality
    handleScrollAnimations();
    initMenuCloseEvents();
    initMobileDropdownEvents();
    initSmoothScroll();
    initHeaderScrollEffect();
    initCTAAnimations();
    initCardHoverEffects();
    initLoadingAnimations();
    
    // Add loaded class to body for any CSS that depends on JS being ready
    document.body.classList.add('js-loaded');
    document.body.classList.add('loaded');
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    
    // Graceful fallback for video errors
    if (e.error && e.error.message && e.error.message.includes('video')) {
        const video = document.querySelector('.hero-video');
        if (video) {
            handleVideoError(video);
        }
    }
});

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', function() {
    console.log('Page fully loaded');
    
    // Log performance metrics
    if (performance.timing) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
        
        // Log video load status
        const video = document.querySelector('.hero-video');
        if (video) {
            console.log('Video element status:', {
                readyState: video.readyState,
                networkState: video.networkState,
                error: video.error
            });
        }
    }
});

// ===== PRELOAD CRITICAL RESOURCES =====
function preloadCriticalResources() {
    // Preload hero video for all devices
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.href = './video/korevo_hero.mp4';
    link.type = 'video/mp4';
    document.head.appendChild(link);
}

// Start preloading as soon as possible
preloadCriticalResources();

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

// ===== EXPORT FOR MODULE USE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleMenu,
        navigateToPage,
        KorevoUtils
    };
}
