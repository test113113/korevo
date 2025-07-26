/**
 * KOREVO - Apple Design System JavaScript
 * 모바일 메뉴 완전 개선 버전
 */

// ===== GLOBAL VARIABLES =====
let isMenuOpen = false;
let isScrolling = false;

// ===== 개선된 모바일 메뉴 기능 =====

/**
 * 완전히 재설계된 모바일 메뉴 토글 함수
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
        
        // 첫 번째 메뉴 항목에 포커스 (접근성)
        const firstNavLink = navMenu.querySelector('.nav-link');
        if (firstNavLink) {
            setTimeout(() => firstNavLink.focus(), 100);
        }
        
        console.log('🍎 모바일 메뉴 열림');
    } else {
        // 메뉴 닫기
        closeMobileMenu();
    }
}

/**
 * 모바일 메뉴 닫기 (완전히 재설계)
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
    console.log('🍎 모바일 메뉴 닫힘');
}

/**
 * 모바일 오버레이 생성 (개선된 함수)
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
 * 완전히 개선된 모바일 드롭다운 토글
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
    
    // ARIA 속성 업데이트 (접근성)
    element.setAttribute('aria-expanded', (!isExpanded).toString());
    
    console.log(`🍎 드롭다운 ${isExpanded ? '닫힘' : '열림'}: ${element.textContent.trim()}`);
}

// ===== 터치 제스처 지원 =====

/**
 * 스와이프 제스처 초기화
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

// ===== 키보드 접근성 =====

/**
 * 키보드 접근성 초기화
 */
function initAccessibility() {
    document.addEventListener('keydown', function(e) {
        // 메뉴가 열려있을 때 Tab 키 트래핑
        if (isMenuOpen && e.key === 'Tab') {
            const navMenu = document.querySelector('.nav-menu');
            const focusableElements = navMenu.querySelectorAll(
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

// ===== 스크롤 효과 =====

/**
 * 헤더 스크롤 효과 초기화
 */
function initScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        if (isScrolling) return;
        
        isScrolling = true;
        requestAnimationFrame(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // 헤더 배경 투명도 조절
            if (scrollTop > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.8)';
            }
            
            lastScrollTop = scrollTop;
            isScrolling = false;
        });
    }, { passive: true });
}

// ===== 알림 시스템 =====

/**
 * 애플 스타일 알림 표시
 */
function showAppleNotification(message, type = 'info') {
    // 기존 알림 제거
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) existingNotification.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

    // 알림 스타일 동적 추가
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.innerHTML = `
            .notification {
                position: fixed;
                top: 80px;
                right: 20px;
                background: var(--background);
                border: 1px solid var(--separator);
                border-radius: var(--radius-lg);
                padding: var(--spacing-md);
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                z-index: 2000;
                transform: translateX(400px);
                transition: transform var(--duration-normal) var(--ease-out);
                max-width: 350px;
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: var(--spacing-md);
            }
            .notification-message {
                flex: 1;
                font-size: 15px;
                color: var(--text-primary);
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
                color: var(--text-secondary);
                padding: 4px;
                border-radius: var(--radius-sm);
                transition: all var(--duration-fast) var(--ease-out);
            }
            .notification-close:hover {
                background: var(--surface);
                color: var(--text-primary);
            }
            .notification-info {
                border-left: 4px solid var(--accent);
            }
            .notification-success {
                border-left: 4px solid var(--apple-green);
            }
            .notification-error {
                border-left: 4px solid var(--apple-red);
            }
            .notification-warning {
                border-left: 4px solid var(--apple-orange);
            }
            @media (max-width: 768px) {
                .notification {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // 애니메이션 트리거
    setTimeout(() => notification.classList.add('show'), 10);

    // 자동 제거
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===== 성능 최적화 =====

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
 * 리사이즈 핸들러
 */
function handleResize() {
    // 데스크톱으로 전환 시 모바일 메뉴 닫기
    if (window.innerWidth > 768 && isMenuOpen) {
        closeMobileMenu();
    }
    
    // 비디오 크기 조정 (히어로 섹션용)
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.style.height = window.innerHeight + 'px';
    }
}

// ===== 페이지 네비게이션 =====

/**
 * 페이지 네비게이션 함수 (기존 호환성 유지)
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
        showAppleNotification('페이지를 찾을 수 없습니다.', 'error');
    }
}

/**
 * 준비중 페이지 모달 표시
 */
function showUnderConstruction() {
    showAppleNotification('해당 페이지는 현재 준비 중입니다. 빠른 시일 내에 서비스를 제공하겠습니다.', 'info');
}

// ===== 초기화 =====

/**
 * DOM 로드 완료 시 초기화
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 KOREVO 웹사이트 초기화 중...');
    
    // 핵심 기능 초기화
    initAccessibility();
    initScrollEffects();
    initTouchGestures();
    
    // 메뉴 애니메이션 초기화
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
        item.style.setProperty('--index', index);
    });
    
    // 웰컴 메시지 (개발 환경에서만)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        setTimeout(() => {
            showAppleNotification('모바일 메뉴가 완전히 새롭게 개선되었습니다! 🎉', 'success');
        }, 1000);
    }
    
    console.log('✅ KOREVO 웹사이트 초기화 완료');
});

// ===== 윈도우 이벤트 =====

/**
 * 윈도우 리사이즈 이벤트
 */
window.addEventListener('resize', debounce(handleResize, 250));

/**
 * 윈도우 로드 완료 이벤트
 */
window.addEventListener('load', function() {
    // 성능 측정
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log('🍎 페이지 로드 시간:', loadTime + 'ms');
    }
});

// ===== 기존 코드와의 호환성 =====

// 전역 함수로 등록 (기존 HTML에서 호출하는 함수들)
if (typeof window.navigateToPage === 'undefined') {
    window.navigateToPage = navigateToPage;
}

if (typeof window.toggleMenu === 'undefined') {
    window.toggleMenu = toggleMenu;
}

if (typeof window.toggleMobileDropdown === 'undefined') {
    window.toggleMobileDropdown = toggleMobileDropdown;
