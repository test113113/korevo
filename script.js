/**
 * KOREVO Apple Design System JavaScript
 * Unified JavaScript for all pages with Apple-inspired interactions
 */

'use strict';

// ===== GLOBAL VARIABLES =====
let isMenuOpen = false;
let scrollTimeout = null;
let resizeTimeout = null;
let currentTheme = 'light';

// ===== UTILITY FUNCTIONS =====

/**
 * Debounce utility function
 */
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

/**
 * Throttle utility function
 */
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
    };
}

/**
 * Detect mobile device
 */
function isMobileDevice() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Detect reduced motion preference
 */
function isReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if element is in viewport
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Apple-style smooth animation helper
 */
function appleEasing(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// ===== NAVIGATION FUNCTIONS =====

/**
 * Toggle mobile menu with Apple-style animation
 */
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (!navMenu || !menuToggle) return;
    
    isMenuOpen = !isMenuOpen;
    
    // Add Apple-style spring animation
    navMenu.classList.toggle('active', isMenuOpen);
    menuToggle.classList.toggle('active', isMenuOpen);
    
    // Update ARIA attributes for accessibility
    menuToggle.setAttribute('aria-expanded', isMenuOpen);
    
    if (isMenuOpen) {
        // Focus management
        const firstLink = navMenu.querySelector('.nav-link');
        if (firstLink) {
            setTimeout(() => firstLink.focus(), 150);
        }
        document.body.style.overflow = 'hidden';
        
        // Add backdrop blur effect
        const backdrop = document.createElement('div');
        backdrop.className = 'menu-backdrop';
        backdrop.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            z-index: 999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(backdrop);
        
        requestAnimationFrame(() => {
            backdrop.style.opacity = '1';
        });
        
        backdrop.addEventListener('click', toggleMenu);
    } else {
        document.body.style.overflow = '';
        const backdrop = document.querySelector('.menu-backdrop');
        if (backdrop) {
            backdrop.style.opacity = '0';
            setTimeout(() => backdrop.remove(), 300);
        }
    }
}

/**
 * Page navigation with Apple-style loading
 */
function navigateToPage(page) {
    console.log(`Navigate to: ${page}`);
    
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
        showAppleLoadingIndicator();
        
        // Apple-style page transition
        setTimeout(() => {
            window.location.href = targetPage;
        }, 150);
    } else {
        showAppleNotification(`${getPageDisplayName(page)} 페이지는 준비 중입니다.`, 'info');
    }
}

/**
 * Get page display name
 */
function getPageDisplayName(pageName) {
    const displayNames = {
        'vision': 'Vision & Mission',
        'history': '연혁',
        'team': '팀 소개',
        'onyu-brand': '온유 브랜드',
        'brand-philosophy': '브랜드 철학',
        'traditional-craft': '전통 기법 계승',
        'business-model': '사업 모델',
        'innovation-strategy': '혁신 전략',
        'sustainability': '지속가능경영',
        'dining-set': '식기 컬렉션',
        'health-products': '건강 케어 제품',
        'gift-sets': '프리미엄 선물세트',
        'custom-craft': '맞춤 제작 서비스',
        'erp-solution': '제조업 ERP 솔루션',
        'iot-platform': 'IoT 품질관리 플랫폼',
        'ecommerce-system': '전통공예 전자상거래',
        'consulting': '디지털 전환 컨설팅',
        'current-projects': '진행중 과제',
        'completed-projects': '완료 과제',
        'research-outcomes': '연구 성과',
        'collaboration': '산학연 협력',
        'product-support': '제품 지원',
        'software-support': '소프트웨어 지원',
        'faq': '자주 묻는 질문',
        'inquiry': '문의하기',
        'download': '자료실',
        'notice': '공지사항',
        'news': '보도자료',
        'blog': '기술 블로그',
        'events': '이벤트',
        'awards': '수상 내역'
    };
    return displayNames[pageName] || pageName;
}

// ===== VIDEO HANDLING =====

/**
 * Handle video error with Apple-style feedback
 */
function handleVideoError(video) {
    console.warn('Video failed to load:', video.currentSrc || video.src);
    video.style.display = 'none';
    video.classList.add('error');
    
    const fallback = document.querySelector('.hero-fallback-image');
    if (fallback) {
        fallback.style.opacity = '0.8';
    }
    
    if (video.error) {
        console.error('Video error details:', {
            code: video.error.code,
            message: video.error.message
        });
    }
}

/**
 * Handle video load success
 */
function handleVideoLoad(video) {
    console.log('Video can start playing:', video.currentSrc || video.src);
    video.classList.add('loaded');
}

/**
 * Handle video data loaded
 */
function handleVideoLoadedData(video) {
    console.log('Video loaded successfully:', video.currentSrc || video.src);
    
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                console.log('Video playing successfully');
                video.classList.add('loaded');
            })
            .catch(error => {
                console.warn('Video autoplay failed:', error);
                handleVideoError(video);
            });
    }
}

/**
 * Initialize video with Apple-style loading
 */
function initializeVideo() {
    const video = document.querySelector('.hero-video');
    
    if (!video) return;

    // Enhanced mobile support
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('playsinline', '');
    video.muted = true;
    video.defaultMuted = true;

    // Check video file existence
    fetch('./video/korevo_hero.mp4', { method: 'HEAD' })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Video file not found: ${response.status}`);
            }
            console.log('Video file exists and is accessible');
        })
        .catch(error => {
            console.warn('Video file check failed:', error);
            handleVideoError(video);
        });
}

// ===== SCROLL HANDLING =====

/**
 * Apple-style header scroll effect
 */
const handleHeaderScroll = throttle(function() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 44) {
        header.style.background = 'rgba(255, 255, 255, 0.8)';
        header.style.backdropFilter = 'saturate(180%) blur(20px)';
        header.style.borderBottom = '0.5px solid rgba(60, 60, 67, 0.12)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.72)';
        header.style.backdropFilter = 'saturate(180%) blur(20px)';
        header.style.borderBottom = '0.5px solid rgba(60, 60, 67, 0.12)';
    }
}, 16);

/**
 * Apple-style smooth scrolling
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 44;
                const targetPosition = target.offsetTop - headerHeight;
                
                smoothScrollTo(targetPosition, 600);
            }
        });
    });
}

/**
 * Apple-style smooth scroll function
 */
function smoothScrollTo(target, duration = 600) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;

    function animateScroll(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Apple's preferred easing curve
        const easeProgress = appleEasing(progress);
        
        window.scrollTo(0, start + distance * easeProgress);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animateScroll);
        }
    }

    requestAnimationFrame(animateScroll);
}

/**
 * Apple-style scroll animations
 */
function initScrollAnimations() {
    if (isReducedMotion()) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.animate-on-scroll, .fade-in').forEach(el => {
        if (!el.classList.contains('visible')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
        observer.observe(el);
    });
}

// ===== FORM HANDLING =====

/**
 * Apple-style form submission
 */
function submitForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateForm(data)) {
        return;
    }
    
    // Apple-style loading state
    const submitBtn = form.querySelector('.submit-btn, .btn-primary');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = '전송중...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.6';
    
    // Simulate API call
    setTimeout(() => {
        showAppleNotification('문의가 성공적으로 전송되었습니다.', 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    }, 1000);
}

/**
 * Enhanced form validation
 */
function validateForm(data) {
    const required = ['name', 'email', 'phone', 'category', 'subject', 'message'];
    const missing = required.filter(field => !data[field] || data[field].trim() === '');
    
    if (missing.length > 0) {
        showAppleNotification(`다음 필드를 입력해주세요: ${missing.join(', ')}`, 'error');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showAppleNotification('올바른 이메일 주소를 입력해주세요.', 'error');
        return false;
    }
    
    // Phone validation
    const phoneRegex = /^[\d-\s()]+$/;
    if (!phoneRegex.test(data.phone)) {
        showAppleNotification('올바른 전화번호를 입력해주세요.', 'error');
        return false;
    }
    
    return true;
}

// ===== PRODUCT FUNCTIONS =====

/**
 * Filter products with Apple-style animation
 */
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    let visibleCount = 0;
    
    products.forEach((product, index) => {
        const productCategory = product.dataset.category;
        const shouldShow = category === 'all' || productCategory === category;
        
        if (shouldShow) {
            product.style.display = 'block';
            product.style.opacity = '0';
            product.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                product.style.opacity = '1';
                product.style.transform = 'translateY(0)';
            }, index * 50);
            
            visibleCount++;
        } else {
            product.style.opacity = '0';
            product.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                product.style.display = 'none';
            }, 150);
        }
    });
    
    // Update filter button states
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.classList.toggle('active', tag.dataset.category === category);
    });
    
    console.log(`Filtered products: ${visibleCount} visible`);
}

/**
 * Sort products with Apple-style transitions
 */
function sortProducts(sortBy) {
    const container = document.querySelector('.products-grid');
    if (!container) return;
    
    const products = Array.from(container.querySelectorAll('.product-card'));
    
    products.sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return parseInt(a.dataset.price) - parseInt(b.dataset.price);
            case 'price-high':
                return parseInt(b.dataset.price) - parseInt(a.dataset.price);
            case 'newest':
                return new Date(b.dataset.date || '2025-01-01') - new Date(a.dataset.date || '2025-01-01');
            case 'rating':
                return (parseFloat(b.dataset.rating) || 0) - (parseFloat(a.dataset.rating) || 0);
            case 'popular':
            default:
                return (parseInt(b.dataset.views) || 0) - (parseInt(a.dataset.views) || 0);
        }
    });
    
    // Apple-style reordering animation
    products.forEach((product, index) => {
        product.style.opacity = '0';
        product.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            container.appendChild(product);
            product.style.opacity = '1';
            product.style.transform = 'scale(1)';
        }, index * 30);
    });
}

/**
 * Add to cart with Apple-style feedback
 */
function addToCart(productId) {
    console.log(`Adding product ${productId} to cart`);
    
    const button = event.target;
    const originalText = button.textContent;
    
    // Apple-style button animation
    button.style.transform = 'scale(0.95)';
    button.textContent = '추가됨!';
    button.style.background = '#34C759';
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 100);
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 2000);
    
    showAppleNotification('제품이 장바구니에 추가되었습니다.', 'success');
    updateCartCount();
    
    // Add to cart animation (optional)
    createAppleCartAnimation(button);
}

/**
 * Apple-style cart animation
 */
function createAppleCartAnimation(button) {
    const rect = button.getBoundingClientRect();
    const cart = document.querySelector('.cart-icon');
    
    if (!cart) return;
    
    const cartRect = cart.getBoundingClientRect();
    const particle = document.createElement('div');
    
    particle.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: #007AFF;
        border-radius: 50%;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        z-index: 9999;
        pointer-events: none;
        transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    `;
    
    document.body.appendChild(particle);
    
    requestAnimationFrame(() => {
        particle.style.left = cartRect.left + cartRect.width / 2 + 'px';
        particle.style.top = cartRect.top + cartRect.height / 2 + 'px';
        particle.style.transform = 'scale(0)';
        particle.style.opacity = '0';
    });
    
    setTimeout(() => particle.remove(), 600);
}

/**
 * Update cart count
 */
function updateCartCount() {
    const cartCount = Math.floor(Math.random() * 5) + 1;
    const cartBadge = document.querySelector('.cart-count');
    if (cartBadge) {
        cartBadge.textContent = cartCount;
        cartBadge.style.display = cartCount > 0 ? 'inline' : 'none';
        
        // Apple-style badge animation
        cartBadge.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartBadge.style.transform = 'scale(1)';
        }, 150);
    }
}

// ===== NOTICE FUNCTIONS =====

/**
 * Notice data with Apple-style structure
 */
const noticeData = {
    1: {
        title: "KOREVO 온유 브랜드 공식 런칭 안내",
        author: "관리자",
        date: "2025.01.15",
        views: 156,
        content: `
            <div class="notice-content-wrapper">
                <h3>🎉 KOREVO 온유 브랜드 공식 런칭</h3>
                <p>안녕하세요, KOREVO입니다.</p>
                <p>드디어 저희가 오랫동안 준비해온 온유(溫鍮) 브랜드를 공식적으로 런칭하게 되었습니다.</p>
                
                <h4>📅 런칭 일정</h4>
                <ul>
                    <li>공식 런칭: 2025년 2월 1일</li>
                    <li>사전 예약: 2025년 1월 20일부터</li>
                    <li>매장 오픈: 2025년 2월 15일</li>
                </ul>
                
                <h4>🏺 출시 제품</h4>
                <ul>
                    <li>온유 프리미엄 식기 세트</li>
                    <li>온유 개인 맞춤 수저</li>
                    <li>온유 티 컬렉션</li>
                    <li>온유 선물 세트</li>
                </ul>
                
                <p>많은 관심과 기대 부탁드립니다.</p>
            </div>
        `
    },
    2: {
        title: "온유 식기 컬렉션 신제품 출시 안내",
        author: "제품팀",
        date: "2025.01.14",
        views: 89,
        content: `
            <div class="notice-content-wrapper">
                <h3>🍽️ 온유 식기 컬렉션 신제품 출시</h3>
                <p>전통 유기 기법으로 제작된 새로운 식기 컬렉션을 출시합니다.</p>
                
                <h4>🆕 신제품 라인업</h4>
                <ul>
                    <li>온유 밥그릇 세트: 89,000원</li>
                    <li>온유 국그릇 세트: 124,000원</li>
                    <li>온유 개인 수저: 55,000원</li>
                </ul>
                
                <p>모든 제품은 전통 장인의 수작업으로 제작되어 품질을 보장합니다.</p>
            </div>
        `
    },
    3: {
        title: "ERP 솔루션 업데이트 및 유지보수 안내",
        author: "기술팀",
        date: "2025.01.13",
        views: 124,
        content: `
            <div class="notice-content-wrapper">
                <h3>💻 ERP 솔루션 업데이트</h3>
                <p>시스템 성능 향상을 위한 업데이트를 진행합니다.</p>
                
                <h4>📋 업데이트 내용</h4>
                <ul>
                    <li>데이터베이스 최적화</li>
                    <li>사용자 인터페이스 개선</li>
                    <li>보안 기능 강화</li>
                    <li>새로운 리포트 기능 추가</li>
                </ul>
                
                <h4>⏰ 유지보수 일정</h4>
                <p><strong>일시:</strong> 2025년 1월 20일 (일) 02:00 ~ 06:00</p>
                <p>해당 시간 동안 시스템 접속이 제한될 수 있습니다.</p>
            </div>
        `
    }
};

/**
 * Open notice with Apple-style modal
 */
function openNotice(noticeId) {
    const notice = noticeData[noticeId];
    if (!notice) {
        console.warn(`Notice ID ${noticeId} not found`);
        return;
    }

    const modal = document.getElementById('noticeModal');
    if (!modal) return;

    // Update modal content
    document.getElementById('modalTitle').textContent = notice.title;
    document.getElementById('modalDate').textContent = notice.date;
    document.getElementById('modalAuthor').textContent = notice.author;
    document.getElementById('modalViews').textContent = `조회수: ${notice.views.toLocaleString()}`;
    document.getElementById('modalContent').innerHTML = notice.content;

    // Apple-style modal animation
    modal.style.display = 'flex';
    modal.style.opacity = '0';
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
        modal.style.opacity = '1';
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.transform = 'scale(1)';
        }
    });

    // Increment views
    notice.views++;
    updateNoticeViews(noticeId, notice.views);
}

/**
 * Close modal with Apple-style animation
 */
function closeModal() {
    const modal = document.getElementById('noticeModal');
    if (!modal) return;
    
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.transform = 'scale(0.95)';
    }
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }, 150);
}

/**
 * Search notices with Apple-style filtering
 */
function searchNotices() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const notices = document.querySelectorAll('.notice-item');
    let visibleCount = 0;

    notices.forEach((notice, index) => {
        const title = notice.querySelector('.notice-title')?.textContent.toLowerCase() || '';
        const content = notice.textContent.toLowerCase();
        
        if (title.includes(searchTerm) || content.includes(searchTerm)) {
            notice.style.display = '';
            notice.style.opacity = '0';
            notice.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                notice.style.opacity = '1';
                notice.style.transform = 'translateY(0)';
            }, index * 30);
            
            visibleCount++;
        } else {
            notice.style.opacity = '0';
            notice.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                notice.style.display = 'none';
            }, 150);
        }
    });

    updateNoticeStats(visibleCount);
    console.log(`Search results: ${visibleCount} notices found`);
}

/**
 * Filter notices by category
 */
function filterNotices() {
    const category = document.getElementById('categoryFilter')?.value || '';
    const notices = document.querySelectorAll('.notice-item');
    let visibleCount = 0;

    notices.forEach((notice, index) => {
        const noticeCategory = notice.dataset.category || '';
        
        if (!category || noticeCategory === category) {
            notice.style.display = '';
            notice.style.opacity = '0';
            
            setTimeout(() => {
                notice.style.opacity = '1';
            }, index * 30);
            
            visibleCount++;
        } else {
            notice.style.opacity = '0';
            setTimeout(() => {
                notice.style.display = 'none';
            }, 150);
        }
    });

    updateNoticeStats(visibleCount);
}

/**
 * Sort notices
 */
function sortNotices() {
    const sortOrder = document.getElementById('sortOrder')?.value || 'latest';
    const container = document.querySelector('.notice-list');
    if (!container) return;

    const notices = Array.from(container.querySelectorAll('.notice-item'));
    
    notices.sort((a, b) => {
        switch (sortOrder) {
            case 'oldest':
                return new Date(a.dataset.date) - new Date(b.dataset.date);
            case 'popular':
                return parseInt(b.dataset.views || 0) - parseInt(a.dataset.views || 0);
            case 'latest':
            default:
                return new Date(b.dataset.date) - new Date(a.dataset.date);
        }
    });

    // Apple-style reordering
    notices.forEach((notice, index) => {
        notice.style.opacity = '0';
        setTimeout(() => {
            container.appendChild(notice);
            notice.style.opacity = '1';
        }, index * 20);
    });
}

/**
 * Set view mode for notices
 */
function setViewMode(mode) {
    const noticeList = document.getElementById('noticeList');
    if (!noticeList) return;

    // Update button states
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.includes(mode === 'list' ? '목록' : '카드'));
    });

    if (mode === 'card') {
        noticeList.style.display = 'grid';
        noticeList.style.gridTemplateColumns = 'repeat(auto-fit, minmax(350px, 1fr))';
        noticeList.style.gap = '24px';
    } else {
        noticeList.style.display = 'block';
        noticeList.style.gridTemplateColumns = '';
        noticeList.style.gap = '';
    }
}

/**
 * Update notice statistics
 */
function updateNoticeStats(visibleCount = null) {
    if (visibleCount !== null) {
        const totalElement = document.getElementById('totalNotices');
        if (totalElement) {
            totalElement.textContent = visibleCount;
        }
    }
}

/**
 * Update notice views count
 */
function updateNoticeViews(noticeId, views) {
    const noticeElement = document.querySelector(`.notice-item[onclick*="${noticeId}"]`);
    if (noticeElement) {
        const viewsElement = noticeElement.querySelector('.notice-views');
        if (viewsElement) {
            viewsElement.textContent = `👁️ ${views}`;
        }
    }
}

// ===== UI COMPONENTS =====

/**
 * Apple-style notification system
 */
function showAppleNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.apple-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `apple-notification apple-notification-${type}`;
    
    const icon = getAppleNotificationIcon(type);
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${icon}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;

    // Apple-style notification styling
    notification.style.cssText = `
        position: fixed;
        top: 60px;
        right: 24px;
        z-index: 1100;
        max-width: 400px;
        background: ${getAppleNotificationColor(type)};
        color: ${type === 'info' || type === 'error' ? 'white' : '#1D1D1F'};
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        opacity: 0;
        transform: translateX(100%) scale(0.9);
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        font-size: 15px;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    // Apple-style entrance animation
    requestAnimationFrame(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0) scale(1)';
    });

    // Auto remove with Apple-style exit animation
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%) scale(0.9)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

/**
 * Get Apple-style notification icon
 */
function getAppleNotificationIcon(type) {
    const icons = {
        'success': '✓',
        'error': '✕',
        'warning': '⚠',
        'info': 'ℹ'
    };
    return icons[type] || icons.info;
}

/**
 * Get Apple-style notification color
 */
function getAppleNotificationColor(type) {
    const colors = {
        'success': '#34C759',
        'error': '#FF3B30',
        'warning': '#FF9500',
        'info': '#007AFF'
    };
    return colors[type] || colors.info;
}

/**
 * Apple-style loading indicator
 */
function showAppleLoadingIndicator() {
    if (document.querySelector('.apple-loading-indicator')) return;

    const loader = document.createElement('div');
    loader.className = 'apple-loading-indicator';
    loader.innerHTML = `
        <div class="loading-content">
            <div class="apple-spinner"></div>
            <p>로딩 중...</p>
        </div>
    `;

    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1200;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const loadingContent = loader.querySelector('.loading-content');
    loadingContent.style.cssText = `
        text-align: center;
        color: #1D1D1F;
        background: rgba(255, 255, 255, 0.9);
        padding: 32px;
        border-radius: 16px;
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
    `;

    const spinner = loader.querySelector('.apple-spinner');
    spinner.style.cssText = `
        width: 32px;
        height: 32px;
        border: 2px solid #F2F2F7;
        border-top: 2px solid #007AFF;
        border-radius: 50%;
        animation: appleSpinner 1s linear infinite;
        margin: 0 auto 16px;
    `;

    // Add keyframe animation
    if (!document.getElementById('apple-spinner-styles')) {
        const style = document.createElement('style');
        style.id = 'apple-spinner-styles';
        style.innerHTML = `
            @keyframes appleSpinner {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(loader);
    requestAnimationFrame(() => {
        loader.style.opacity = '1';
    });
}

/**
 * Hide Apple-style loading indicator
 */
function hideAppleLoadingIndicator() {
    const loader = document.querySelector('.apple-loading-indicator');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }
}

// ===== EVENT LISTENERS =====

/**
 * Apple-style keyboard event handling
 */
function initKeyboardEvents() {
    document.addEventListener('keydown', function(e) {
        // ESC key to close modals
        if (e.key === 'Escape') {
            closeModal();
            if (isMenuOpen) {
                toggleMenu();
            }
        }
        
        // Enter key for search
        if (e.key === 'Enter' && e.target.id === 'searchInput') {
            e.preventDefault();
            searchNotices();
        }

        // Command/Ctrl + K for search focus (Apple-style)
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }

        // Tab key trapping for modals
        if (e.key === 'Tab') {
            const modal = document.getElementById('noticeModal');
            if (modal && modal.style.display === 'flex') {
                trapTabKey(e, modal);
            }
        }
    });
}

/**
 * Tab key trapping for accessibility
 */
function trapTabKey(e, modal) {
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
        if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
        }
    } else {
        if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
        }
    }
}

/**
 * Apple-style menu outside click handling
 */
function initMenuCloseEvents() {
    document.addEventListener('click', function(e) {
        const nav = document.querySelector('.nav-container');
        const backdrop = document.querySelector('.menu-backdrop');
        
        if (isMenuOpen && (!nav || !nav.contains(e.target))) {
            toggleMenu();
        }
    });
}

/**
 * Apple-style form event initialization
 */
function initFormEvents() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', submitForm);
    }

    // Real-time form validation with Apple-style feedback
    document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#007AFF';
            this.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.1)';
        });

        input.addEventListener('blur', function() {
            this.style.borderColor = 'rgba(60, 60, 67, 0.12)';
            this.style.boxShadow = 'none';
            validateField(this);
        });

        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

/**
 * Apple-style field validation
 */
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let message = '';

    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        message = '이 필드는 필수입니다.';
    }

    // Email field validation
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = '올바른 이메일 주소를 입력해주세요.';
        }
    }

    // Phone field validation
    if (fieldName === 'phone' && value) {
        const phoneRegex = /^[\d-\s()]+$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            message = '올바른 전화번호를 입력해주세요.';
        }
    }

    // Show validation result
    showFieldValidation(field, isValid, message);
}

/**
 * Apple-style field validation display
 */
function showFieldValidation(field, isValid, message) {
    clearFieldError(field);

    if (!isValid) {
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #FF3B30;
            font-size: 13px;
            margin-top: 4px;
            opacity: 0;
            transform: translateY(-4px);
            transition: all 0.2s ease;
        `;
        
        field.parentElement.appendChild(errorElement);
        field.style.borderColor = '#FF3B30';
        
        requestAnimationFrame(() => {
            errorElement.style.opacity = '1';
            errorElement.style.transform = 'translateY(0)';
        });
    } else {
        field.style.borderColor = 'rgba(60, 60, 67, 0.12)';
    }
}

/**
 * Clear field error
 */
function clearFieldError(field) {
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.style.opacity = '0';
        existingError.style.transform = 'translateY(-4px)';
        setTimeout(() => existingError.remove(), 200);
    }
}

/**
 * Apple-style product event initialization
 */
function initProductEvents() {
    // Filter tag events
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const category = this.dataset.category;
            filterProducts(category);
        });
    });

    // Sort select events
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortProducts(this.value);
        });
    }

    // View mode events
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view || (this.textContent.includes('목록') ? 'list' : 'grid');
            setViewMode(view);
        });
    });

    // Price filter events
    const priceFilter = document.getElementById('priceFilter');
    if (priceFilter) {
        priceFilter.addEventListener('change', function() {
            filterProductsByPrice(this.value);
        });
    }

    // Product card hover effects
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * Filter products by price range
 */
function filterProductsByPrice(priceRange) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const price = parseInt(product.dataset.price || 0);
        let shouldShow = true;

        switch (priceRange) {
            case 'under50':
                shouldShow = price < 50000;
                break;
            case '50to100':
                shouldShow = price >= 50000 && price < 100000;
                break;
            case '100to200':
                shouldShow = price >= 100000 && price < 200000;
                break;
            case 'over200':
                shouldShow = price >= 200000;
                break;
            case 'all':
            default:
                shouldShow = true;
        }

        if (shouldShow) {
            product.style.display = 'block';
            product.style.opacity = '1';
        } else {
            product.style.opacity = '0';
            setTimeout(() => {
                product.style.display = 'none';
            }, 150);
        }
    });
}

/**
 * Apple-style notice event initialization
 */
function initNoticeEvents() {
    // Real-time search with debouncing
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const debouncedSearch = debounce(searchNotices, 300);
        searchInput.addEventListener('input', debouncedSearch);
    }

    // Filter change events
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterNotices);
    }

    // Sort change events
    const sortOrder = document.getElementById('sortOrder');
    if (sortOrder) {
        sortOrder.addEventListener('change', sortNotices);
    }

    // Notice item hover effects
    document.querySelectorAll('.notice-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#F5F5F7';
            this.style.transform = 'translateX(4px)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.transform = 'translateX(0)';
        });
    });
}

// ===== MAIN INITIALIZATION =====

/**
 * Apple-style device optimization
 */
function optimizeForDevice() {
    if (isMobileDevice()) {
        console.log('Mobile device detected - applying optimizations');
        
        // Mobile video optimization
        const video = document.querySelector('.hero-video');
        if (video) {
            video.style.opacity = '0.4';
            video.preload = 'metadata';
        }
        
        // Add mobile-specific styles
        document.body.classList.add('mobile-device');
    }

    if (isReducedMotion()) {
        console.log('Reduced motion preference detected');
        document.body.classList.add('reduced-motion');
    }
}

/**
 * Apple-style resize handler
 */
const handleResize = debounce(function() {
    // Close mobile menu on resize
    if (window.innerWidth > 768 && isMenuOpen) {
        toggleMenu();
    }

    // Adjust responsive layouts
    adjustResponsiveLayouts();
}, 250);

/**
 * Adjust responsive layouts
 */
function adjustResponsiveLayouts() {
    const isMobile = window.innerWidth <= 768;
    
    // Auto-adjust notice view mode on mobile
    if (isMobile) {
        const listBtn = document.querySelector('.view-btn[data-view="list"], .view-btn:first-child');
        if (listBtn && !listBtn.classList.contains('active')) {
            setViewMode('list');
        }
    }
}

/**
 * Main page initialization
 */
function initializePage() {
    console.log('🍎 KOREVO Apple Design System initialized');
    
    // Core functionality
    optimizeForDevice();
    initializeVideo();
    initSmoothScroll();
    initScrollAnimations();
    initKeyboardEvents();
    initMenuCloseEvents();
    initFormEvents();
    initProductEvents();
    initNoticeEvents();
    
    // Event listeners
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Page-specific initialization
    const pathname = window.location.pathname;
    if (pathname.includes('notice')) {
        initNoticeBoard();
    } else if (pathname.includes('dining-set')) {
        initProductCatalog();
    } else if (pathname.includes('contact')) {
        initContactPage();
    }
    
    // Mark as loaded
    document.body.classList.add('js-loaded', 'loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('visible');
            }
        });
    }, 100);
}

/**
 * Notice board initialization
 */
function initNoticeBoard() {
    console.log('Notice board initialized');
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.focus();
    }
    
    updateNoticeStats();
}

/**
 * Product catalog initialization
 */
function initProductCatalog() {
    console.log('Product catalog initialized');
    
    const products = document.querySelectorAll('.product-card');
    console.log(`${products.length} products loaded`);
}

/**
 * Contact page initialization
 */
function initContactPage() {
    console.log('Contact page initialized');
    
    const firstInput = document.querySelector('.form-input');
    if (firstInput) {
        firstInput.focus();
    }
}

// ===== ERROR HANDLING =====

/**
 * Global error handler
 */
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    
    // Video error handling
    if (e.error && e.error.message && e.error.message.includes('video')) {
        const video = document.querySelector('.hero-video');
        if (video) {
            handleVideoError(video);
        }
    }
});

/**
 * Promise rejection handler
 */
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// ===== PERFORMANCE MONITORING =====

/**
 * Performance monitoring
 */
window.addEventListener('load', function() {
    console.log('🍎 Page fully loaded');
    
    if (performance.timing) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`⚡ Page load time: ${loadTime}ms`);
    }
    
    // Video status logging
    const video = document.querySelector('.hero-video');
    if (video) {
        console.log('📹 Video element status:', {
            readyState: video.readyState,
            networkState: video.networkState,
            error: video.error
        });
    }
});

// ===== THEME HANDLING =====

/**
 * Detect and handle system theme changes
 */
function initThemeHandling() {
    // Detect initial theme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        currentTheme = 'dark';
        document.body.classList.add('dark-theme');
    }

    // Listen for theme changes
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', function(e) {
            currentTheme = e.matches ? 'dark' : 'light';
            document.body.classList.toggle('dark-theme', e.matches);
            console.log(`🎨 Theme changed to: ${currentTheme}`);
        });
    }
}

// ===== HAPTIC FEEDBACK (for supported devices) =====

/**
 * Apple-style haptic feedback simulation
 */
function triggerHapticFeedback(type = 'light') {
    if ('vibrate' in navigator) {
        switch (type) {
            case 'light':
                navigator.vibrate(10);
                break;
            case 'medium':
                navigator.vibrate(20);
                break;
            case 'heavy':
                navigator.vibrate(30);
                break;
        }
    }
}

// Add haptic feedback to buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('button, .btn, .cta-btn')) {
        triggerHapticFeedback('light');
    }
});

// ===== INITIALIZATION =====

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initializePage();
        initThemeHandling();
    });
} else {
    initializePage();
    initThemeHandling();
}

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleMenu,
        navigateToPage,
        filterProducts,
        sortProducts,
        addToCart,
        openNotice,
        closeModal,
        searchNotices,
        filterNotices,
        submitForm,
        showAppleNotification,
        smoothScrollTo
    };
}
