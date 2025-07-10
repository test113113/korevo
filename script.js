/**
 * KOREVO - Apple Design System JavaScript
 * 통합 스크립트 파일 (모바일 메뉴 오류 수정 버전)
 */

// ===== GLOBAL VARIABLES =====
let isMenuOpen = false;
let isScrolling = false;

// ===== MOBILE MENU FUNCTIONALITY (완전히 수정된 부분) =====

/**
 * 개선된 모바일 메뉴 토글 함수
 */
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    const body = document.body;
    
    if (!navMenu || !menuToggle) {
        console.warn('Navigation elements not found');
        return;
    }
    
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        // 메뉴 열기
        navMenu.classList.add('active');
        menuToggle.classList.add('active');
        body.classList.add('menu-open');
        menuToggle.setAttribute('aria-expanded', 'true');
        
        // 오버레이 생성
        createMobileOverlay();
        
        // 첫 번째 메뉴 항목에 포커스
        const firstNavLink = navMenu.querySelector('.nav-link');
        if (firstNavLink) {
            setTimeout(() => firstNavLink.focus(), 100);
        }
        
        console.log('모바일 메뉴 열림');
    } else {
        // 메뉴 닫기
        closeMobileMenu();
    }
}

/**
 * 모바일 메뉴 닫기 (완전히 수정된 함수)
 */
function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    const body = document.body;
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    if (navMenu) navMenu.classList.remove('active');
    if (menuToggle) {
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
    body.classList.remove('menu-open');
    
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    }
    
    // 모든 드롭다운 닫기
    document.querySelectorAll('.dropdown, .mega-dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
    });
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('expanded');
    });
    
    isMenuOpen = false;
    console.log('모바일 메뉴 닫힘');
}

/**
 * 모바일 오버레이 생성 (수정된 함수)
 */
function createMobileOverlay() {
    // 기존 오버레이 제거
    const existingOverlay = document.querySelector('.mobile-menu-overlay');
    if (existingOverlay) existingOverlay.remove();
    
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    
    // 오버레이 클릭 시 메뉴 닫기
    overlay.addEventListener('click', closeMobileMenu);
    
    document.body.appendChild(overlay);
    
    // 애니메이션을 위해 약간 지연
    setTimeout(() => overlay.classList.add('active'), 10);
}

/**
 * 모바일 드롭다운 토글 (수정된 함수)
 */
function toggleMobileDropdown(event, element) {
    // 모바일에서만 작동
    if (window.innerWidth > 768) return;
    
    event.preventDefault();
    event.stopPropagation();
    
    const navItem = element.closest('.nav-item');
    const dropdown = navItem.querySelector('.dropdown, .mega-dropdown');
    
    if (!dropdown) return;
    
    // 다른 드롭다운 닫기
    document.querySelectorAll('.nav-item').forEach(item => {
        if (item !== navItem) {
            item.classList.remove('expanded');
            const otherDropdown = item.querySelector('.dropdown, .mega-dropdown');
            if (otherDropdown) otherDropdown.classList.remove('active');
        }
    });
    
    // 현재 드롭다운 토글
    const isExpanded = navItem.classList.contains('expanded');
    navItem.classList.toggle('expanded');
    dropdown.classList.toggle('active');
    
    // ARIA 속성 업데이트
    element.setAttribute('aria-expanded', (!isExpanded).toString());
    
    console.log(`드롭다운 ${isExpanded ? '닫힘' : '열림'}: ${element.textContent.trim()}`);
}

// ===== NAVIGATION UTILITIES =====

/**
 * 페이지 네비게이션 함수
 */
function navigateToPage(page) {
    // 준비 중인 페이지들
    const underConstructionPages = [
        'vision', 'history', 'team', 'brand-philosophy', 'traditional-craft',
        'business-model', 'innovation-strategy', 'sustainability',
        'health-products', 'gift-sets', 'custom-craft',
        'erp-solution', 'iot-platform', 'ecommerce-system', 'consulting',
        'ongoing-projects', 'completed-projects', 'research-results', 'partnerships'
    ];
    
    if (underConstructionPages.includes(page)) {
        showUnderConstruction();
        return;
    }
    
    // 실제 페이지로 이동
    const pageMap = {
        'heonn-brand': 'heonn-brand.html',
        'dining-set': 'dining-set.html',
        'contact': 'contact.html',
        'greeting': 'greeting.html'
    };
    
    const targetPage = pageMap[page];
    if (targetPage) {
        window.location.href = targetPage;
    } else {
        console.warn(`페이지를 찾을 수 없습니다: ${page}`);
        showAppleNotification('페이지를 찾을 수 없습니다.', 'warning');
    }
}

/**
 * 준비 중 페이지 알림
 */
function showUnderConstruction() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>🚧 페이지 준비 중</h3>
                <button class="close-btn" onclick="closeConstructionModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div style="text-align: center; font-size: 4rem; margin-bottom: 1rem;">🏗️</div>
                <p>해당 페이지는 현재 준비 중입니다.</p>
                <p>빠른 시일 내에 서비스를 제공하겠습니다.</p>
                <div style="margin-top: 2rem; text-align: center;">
                    <button onclick="closeConstructionModal()" class="btn btn-primary">확인</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

/**
 * 준비 중 모달 닫기
 */
function closeConstructionModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// ===== LANGUAGE SELECTOR =====

/**
 * 언어 선택기 초기화
 */
function initLanguageSelector() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 모든 언어 버튼에서 active 클래스 제거
            document.querySelectorAll('.lang-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            // 클릭된 버튼에 active 클래스 추가
            this.classList.add('active');
            
            // 언어 변경 피드백
            const langText = this.textContent.trim();
            showAppleNotification(`언어가 ${langText}로 변경되었습니다.`, 'info');
            
            console.log('언어 변경:', langText);
        });
    });
}

// ===== SCROLL EFFECTS =====

/**
 * 스크롤 효과 초기화
 */
function initScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (isScrolling) return;
        
        isScrolling = true;
        requestAnimationFrame(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // 헤더 스크롤 효과
            if (header) {
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    // 스크롤 다운
                    header.style.transform = 'translateY(-100%)';
                } else {
                    // 스크롤 업
                    header.style.transform = 'translateY(0)';
                }
                
                // 스크롤에 따른 배경 투명도 조절
                const opacity = Math.min(scrollTop / 100, 0.95);
                header.style.background = `rgba(255, 255, 255, ${0.8 + opacity * 0.15})`;
            }
            
            lastScrollTop = scrollTop;
            isScrolling = false;
        });
    });
    
    // 스크롤 애니메이션 관찰자
    initScrollAnimations();
}

/**
 * 스크롤 애니메이션 초기화
 */
function initScrollAnimations() {
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // 애니메이션 대상 요소들 관찰
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        animationObserver.observe(el);
    });
}

// ===== NOTIFICATION SYSTEM =====

/**
 * 알림 시스템 초기화
 */
function initNotificationSystem() {
    // 기존 알림 제거 함수
    window.removeExistingNotifications = function() {
        document.querySelectorAll('.apple-notification').forEach(notification => {
            notification.remove();
        });
    };
}

/**
 * 애플 스타일 알림 표시
 */
function showAppleNotification(message, type = 'info', duration = 4000) {
    // 기존 알림 제거
    const existingNotification = document.querySelector('.apple-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `apple-notification ${type}`;
    
    const iconMap = {
        'info': 'ℹ️',
        'success': '✅',
        'warning': '⚠️',
        'error': '❌'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${iconMap[type] || iconMap.info}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // 스타일 적용
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 350px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    `;
    
    document.body.appendChild(notification);
    
    // 애니메이션 트리거
    requestAnimationFrame(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    });
    
    // 자동 제거
    if (duration > 0) {
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, duration);
    }
}

// ===== VIDEO HANDLING =====

/**
 * 비디오 에러 처리
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
 * 비디오 로드 성공
 */
function handleVideoLoad(video) {
    console.log('Video can start playing:', video.currentSrc || video.src);
    video.classList.add('loaded');
}

/**
 * 비디오 데이터 로드 완료
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

// ===== ACCESSIBILITY ENHANCEMENTS =====

/**
 * 접근성 향상을 위한 초기화
 */
function initAccessibility() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-controls', 'navMenu');
        menuToggle.setAttribute('aria-label', '메뉴 토글');
    }
    
    if (mobileMenu) {
        mobileMenu.setAttribute('role', 'navigation');
        mobileMenu.setAttribute('aria-label', '주 메뉴');
        mobileMenu.id = 'navMenu';
    }
    
    // 키보드 네비게이션 지원
    document.addEventListener('keydown', function(e) {
        if (isMenuOpen && e.key === 'Tab') {
            const focusableElements = mobileMenu.querySelectorAll(
                'a, button, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
        
        // ESC 키로 메뉴 닫기
        if (e.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
    });
}

// ===== TOUCH GESTURES =====

/**
 * 터치 제스처 지원
 */
function initTouchGestures() {
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 100;
        const swipeDistanceX = touchEndX - touchStartX;
        const swipeDistanceY = Math.abs(touchEndY - touchStartY);
        
        // 세로 스와이프가 가로 스와이프보다 크면 무시
        if (swipeDistanceY > Math.abs(swipeDistanceX)) return;
        
        // 우측에서 좌측으로 스와이프 (메뉴 열기)
        if (swipeDistanceX > swipeThreshold && !isMenuOpen && touchStartX < 50) {
            toggleMenu();
        }
        
        // 좌측에서 우측으로 스와이프 (메뉴 닫기)
        if (swipeDistanceX < -swipeThreshold && isMenuOpen) {
            closeMobileMenu();
        }
    }
}

// ===== PERFORMANCE OPTIMIZATION =====

/**
 * 이미지 지연 로딩
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

/**
 * 리소스 사전 로딩
 */
function preloadResources() {
    const criticalResources = [
        'heonn-brand.html',
        'dining-set.html',
        'contact.html'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// ===== UTILITY FUNCTIONS =====

/**
 * 디바운스 함수
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
 * 스로틀 함수
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
 * 부드러운 스크롤
 */
function smoothScrollTo(target, duration = 1000) {
    const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
    if (!targetElement) return;
    
    const targetPosition = targetElement.offsetTop - 80; // 헤더 높이 고려
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// ===== ERROR HANDLING =====

/**
 * 전역 에러 핸들러
 */
window.addEventListener('error', function(e) {
    console.error('스크립트 에러:', e.error);
    // 사용자에게 친화적인 에러 메시지 표시하지 않음 (디버깅용만)
});

/**
 * Promise 거부 핸들러
 */
window.addEventListener('unhandledrejection', function(e) {
    console.warn('처리되지 않은 Promise 거부:', e.reason);
    e.preventDefault();
});

// ===== INITIALIZATION =====

/**
 * DOM 로드 완료 시 초기화
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 KOREVO 웹사이트 초기화 중...');
    
    // 핵심 기능 초기화
    initAccessibility();
    initLanguageSelector();
    initScrollEffects();
    initNotificationSystem();
    initTouchGestures();
    initLazyLoading();
    
    // 애니메이션 초기화
    setTimeout(() => {
        document.querySelectorAll('.animate-slide-up').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
    
    console.log('✅ KOREVO 웹사이트 초기화 완료');
});

/**
 * 윈도우 로드 완료 시 추가 초기화
 */
window.addEventListener('load', function() {
    // 리소스 사전 로딩
    preloadResources();
    
    // 성능 측정
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log('페이지 로드 시간:', loadTime + 'ms');
    }
    
    // 서비스 워커 등록 (선택사항)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker 등록 성공:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker 등록 실패:', error);
            });
    }
});

/**
 * 윈도우 리사이즈 핸들러
 */
window.addEventListener('resize', debounce(function() {
    // 데스크톱으로 전환 시 모바일 메뉴 닫기
    if (window.innerWidth > 768 && isMenuOpen) {
        closeMobileMenu();
    }
    
    // 비디오 크기 조정
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.style.height = window.innerHeight + 'px';
    }
}, 250));

// ===== BACKWARDS COMPATIBILITY =====

/**
 * 기존 코드와의 호환성을 위한 함수들
 */

// 기존 navigateToPage 함수 유지
if (typeof window.navigateToPage === 'undefined') {
    window.navigateToPage = navigateToPage;
}

// 기존 toggleMenu 함수 유지
if (typeof window.toggleMenu === 'undefined') {
    window.toggleMenu = toggleMenu;
}

// 기존 비디오 핸들러 함수들 유지
if (typeof window.handleVideoError === 'undefined') {
    window.handleVideoError = handleVideoError;
    window.handleVideoLoad = handleVideoLoad;
    window.handleVideoLoadedData = handleVideoLoadedData;
}

// 기존 알림 함수 유지
if (typeof window.showAppleNotification === 'undefined') {
    window.showAppleNotification = showAppleNotification;
}

// ===== MODAL STYLES (CSS-in-JS) =====

/**
 * 모달 스타일을 동적으로 추가
 */
(function addModalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .modal.active {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-content {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.9) translateY(-20px);
            transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .modal.active .modal-content {
            transform: scale(1) translateY(0);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .modal-header h3 {
            margin: 0;
            font-size: 1.5rem;
            font-weight: 600;
        }
        
        .close-btn {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 50%;
            transition: background-color 0.2s ease;
        }
        
        .close-btn:hover {
            background: rgba(0, 0, 0, 0.1);
        }
        
        .modal-body {
            text-align: center;
        }
        
        .modal-body p {
            margin-bottom: 1rem;
            line-height: 1.6;
        }
        
        .btn {
            display: inline-block;
            padding: 12px 24px;
            border-radius: 25px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            cursor: pointer;
            border: none;
            font-size: 16px;
        }
        
        .btn-primary {
            background: #007AFF;
            color: white;
        }
        
        .btn-primary:hover {
            background: #0056CC;
            transform: translateY(-2px);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .notification-icon {
            font-size: 1.2rem;
        }
        
        .notification-message {
            flex: 1;
            font-weight: 500;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 4px;
            border-radius: 50%;
            transition: background-color 0.2s ease;
        }
        
        .notification-close:hover {
            background: rgba(0, 0, 0, 0.1);
        }
    `;
    document.head.appendChild(style);
})();

// ===== FINAL INITIALIZATION CHECK =====

/**
 * 모든 초기화가 완료되었는지 확인
 */
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const essentialElements = [
            '.header',
            '.nav-container',
            '.menu-toggle'
        ];
        
        const missingElements = essentialElements.filter(selector => 
            !document.querySelector(selector)
        );
        
        if (missingElements.length > 0) {
            console.warn('필수 요소가 누락되었습니다:', missingElements);
        } else {
            console.log('✅ KOREVO 웹사이트가 성공적으로 초기화되었습니다.');
            
            // 초기화 완료 이벤트 발생
            window.dispatchEvent(new CustomEvent('korevoReady', {
                detail: { timestamp: Date.now() }
            }));
        }
    }, 100);
});

// ===== EXPORT FOR MODULES (if needed) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleMenu,
        closeMobileMenu,
        toggleMobileDropdown,
        navigateToPage,
        showAppleNotification,
        handleVideoError,
        handleVideoLoad,
        handleVideoLoadedData
    };
}
