// ===== ONYU BRAND PAGE SPECIFIC SCRIPTS =====

// ===== PAGE INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('온유 브랜드 페이지 로드 완료');
    
    // 모든 기능 초기화
    initFeatureCardsAnimation();
    initStatisticsAnimation();
    initScrollAnimations();
    initHoverEffects();
    initSmoothScrolling();
    initParallaxEffects();
    initAccessibilityFeatures();
});

// ===== FEATURE CARDS ANIMATION =====
function initFeatureCardsAnimation() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    // Intersection Observer로 카드 등장 애니메이션
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animated');
                }, index * 200);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    // 카드 초기 상태 설정 및 관찰 시작
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        cardObserver.observe(card);
        
        // 호버 효과 개선
        card.addEventListener('mouseenter', function() {
            if (this.classList.contains('animated')) {
                this.style.transform = 'translateY(-20px) scale(1.03)';
                this.style.boxShadow = '0 30px 60px rgba(255, 215, 0, 0.2)';
                
                // 아이콘 회전 효과
                const icon = this.querySelector('.feature-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.15) rotate(10deg)';
                }
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('animated')) {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
                
                // 아이콘 원래 상태로
                const icon = this.querySelector('.feature-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            }
        });

        // 클릭 시 리플 효과 (모바일 대응)
        card.addEventListener('click', function(e) {
            createRippleEffect(this, e);
        });
    });
}

// ===== RIPPLE EFFECT =====
function createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
        z-index: 10;
    `;
    
    // 리플 애니메이션 CSS 추가
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.innerHTML = `
            @keyframes rippleEffect {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 600);
}

// ===== STATISTICS ANIMATION =====
function initStatisticsAnimation() {
    const statCards = document.querySelectorAll('.stat-card');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.classList.contains('animated')) {
                    animateNumber(statNumber);
                    statNumber.classList.add('animated');
                    
                    // 카드 애니메이션
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    entry.target.style.opacity = '1';
                }
            }
        });
    }, observerOptions);

    statCards.forEach((card, index) => {
        // 초기 상태 설정
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.9)';
        card.style.transition = `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
        
        statsObserver.observe(card);
        
        // 호버 효과
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
            this.style.boxShadow = '0 25px 50px rgba(255, 215, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
}

// ===== NUMBER ANIMATION =====
function animateNumber(element) {
    const finalValue = element.textContent.trim();
    const numericValue = parseFloat(finalValue.replace(/[^0-9.]/g, ''));
    const suffix = finalValue.replace(/[0-9.]/g, '');
    const isDecimal = finalValue.includes('.');
    
    let currentValue = 0;
    const increment = numericValue / 60; // 60프레임으로 나누어 부드럽게
    const duration = 2000; // 2초 동안 애니메이션
    const stepTime = duration / 60;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numericValue) {
            currentValue = numericValue;
            clearInterval(timer);
        }
        
        const displayValue = isDecimal ? 
            currentValue.toFixed(1) : 
            Math.floor(currentValue);
        
        element.textContent = displayValue + suffix;
        
        // 애니메이션 중 색상 변화
        const progress = currentValue / numericValue;
        const hue = Math.floor(45 * progress); // 골드 색상으로 변화
        element.style.color = `hsl(${hue}, 80%, 40%)`;
    }, stepTime);
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.heritage-item, .innovation-feature, .story-visual, .story-content'
    );
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('scroll-animated');
            }
        });
    }, { 
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach((element, index) => {
        // 초기 상태 설정
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px)';
        element.style.transition = `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
        
        scrollObserver.observe(element);
    });
}

// ===== HOVER EFFECTS =====
function initHoverEffects() {
    // 혁신 기능 호버 효과
    const innovationFeatures = document.querySelectorAll('.innovation-feature');
    innovationFeatures.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(15px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(255, 215, 0, 0.2)';
            
            const icon = this.querySelector('.innovation-feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            }
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
            
            const icon = this.querySelector('.innovation-feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // 비즈니스 카드 호버 효과
    const businessCards = document.querySelectorAll('.business-card');
    businessCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-20px) scale(1.02)';
            
            const icon = this.querySelector('.business-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            const icon = this.querySelector('.business-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                // 부드러운 스크롤 애니메이션
                smoothScrollTo(targetPosition, 1000);
                
                // 포커스 이동 (접근성)
                targetElement.focus();
            }
        });
    });
}

// ===== SMOOTH SCROLL FUNCTION =====
function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;

    function animateScroll(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuart(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animateScroll);
    }

    function easeInOutQuart(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t + b;
        t -= 2;
        return -c / 2 * (t * t * t * t - 2) + b;
    }

    requestAnimationFrame(animateScroll);
}

// ===== PARALLAX EFFECTS =====
function initParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrollTop = window.pageYOffset;
        
        // 히어로 섹션 패럴랙스
        const hero = document.querySelector('.brand-hero');
        if (hero) {
            const heroOffset = scrollTop * 0.5;
            hero.style.transform = `translateY(${heroOffset}px)`;
        }
        
        // 스토리 비주얼 패럴랙스
        const storyVisuals = document.querySelectorAll('.story-visual');
        storyVisuals.forEach((visual, index) => {
            const rect = visual.getBoundingClientRect();
            if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                const offset = (window.innerHeight - rect.top) * 0.1;
                visual.style.transform = `translateY(${offset}px)`;
            }
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    // 스크롤 이벤트 최적화
    window.addEventListener('scroll', requestTick, { passive: true });
}

// ===== ACCESSIBILITY FEATURES =====
function initAccessibilityFeatures() {
    // 키보드 네비게이션 개선
    const focusableElements = document.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid #FFD700';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
    
    // 고대비 모드 감지
    if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
        document.body.classList.add('high-contrast');
    }
    
    // 애니메이션 감소 모드 감지
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
        
        // 모든 애니메이션 비활성화
        const style = document.createElement('style');
        style.innerHTML = `
            .reduced-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== NAVIGATION FUNCTIONS =====
function navigateToPage(page) {
    console.log(`Navigate to: ${page}`);
    
    // 페이지 네비게이션 로직
    const pageMap = {
        'vision': 'vision.html',
        'history': 'history.html',
        'team': 'team.html',
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
        // 로딩 인디케이터 표시
        showLoadingIndicator();
        
        // 실제 환경에서는 페이지 이동
        // window.location.href = targetPage;
        
        // 현재는 개발 중 알림
        setTimeout(() => {
            hideLoadingIndicator();
            showPageUnderConstruction(page);
        }, 800);
    } else {
        console.error(`Page not found: ${page}`);
    }
}

// ===== LOADING INDICATOR =====
function showLoadingIndicator() {
    if (document.querySelector('.onyu-loading-indicator')) return;
    
    const loader = document.createElement('div');
    loader.className = 'onyu-loading-indicator';
    loader.innerHTML = `
        <div class="onyu-loading-content">
            <div class="onyu-spinner"></div>
            <p>페이지를 불러오는 중...</p>
        </div>
    `;
    
    const style = document.createElement('style');
    style.innerHTML = `
        .onyu-loading-indicator {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        }
        
        .onyu-loading-content {
            text-align: center;
        }
        
        .onyu-spinner {
            width: 60px;
            height: 60px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #FFD700;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .onyu-loading-content p {
            color: #1a3d1f;
            font-weight: 600;
            font-size: 1.1rem;
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(loader);
}

function hideLoadingIndicator() {
    const loader = document.querySelector('.onyu-loading-indicator');
    if (loader) {
        loader.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => {
            loader.remove();
        }, 300);
    }
}

// ===== UNDER CONSTRUCTION MODAL =====
function showPageUnderConstruction(pageName) {
    const modal = document.createElement('div');
    modal.className = 'onyu-construction-modal';
    modal.innerHTML = `
        <div class="onyu-modal-content">
            <div class="onyu-modal-header">
                <h3>🚧 페이지 준비 중</h3>
                <button class="onyu-modal-close" onclick="closeOnyuConstructionModal()">&times;</button>
            </div>
            <div class="onyu-modal-body">
                <div class="onyu-construction-icon">🏗️</div>
                <p><strong>${getPageDisplayName(pageName)}</strong> 페이지를 열심히 준비하고 있습니다.</p>
                <p>곧 멋진 모습으로 찾아뵙겠습니다!</p>
                <div class="onyu-modal-actions">
                    <button class="onyu-btn-primary" onclick="closeOnyuConstructionModal()">확인</button>
                    <button class="onyu-btn-secondary" onclick="window.location.href='index.html'">홈으로 이동</button>
                </div>
            </div>
        </div>
    `;
    
    const modalStyle = document.createElement('style');
    modalStyle.innerHTML = `
        .onyu-construction-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(26, 61, 31, 0.8);
            backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .onyu-modal-content {
            background: white;
            border-radius: 20px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow: hidden;
            animation: slideUp 0.4s ease;
        }
        
        .onyu-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem;
            border-bottom: 1px solid #f0f0f0;
            background: linear-gradient(135deg, #fff8dc 0%, #ffffff 100%);
        }
        
        .onyu-modal-header h3 {
            margin: 0;
            color: #1a3d1f;
            font-size: 1.5rem;
            font-weight: 700;
        }
        
        .onyu-modal-close {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #666;
            padding: 0;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }
        
        .onyu-modal-close:hover {
            background: #f0f0f0;
            color: #1a3d1f;
            transform: rotate(90deg);
        }
        
        .onyu-modal-body {
            padding: 2.5rem;
            text-align: center;
        }
        
        .onyu-construction-icon {
            font-size: 4rem;
            margin-bottom: 1.5rem;
            animation: bounce 2s ease-in-out infinite;
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
        
        .onyu-modal-body p {
            margin-bottom: 1rem;
            color: #333;
            line-height: 1.6;
            font-size: 1.1rem;
        }
        
        .onyu-modal-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 2rem;
        }
        
        .onyu-btn-primary,
        .onyu-btn-secondary {
            padding: 1rem 2rem;
            border: none;
            border-radius: 30px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
            font-size: 1rem;
        }
        
        .onyu-btn-primary {
            background: linear-gradient(135deg, #FFD700 0%, #B8860B 100%);
            color: #1a3d1f;
        }
        
        .onyu-btn-primary:hover {
            background: linear-gradient(135deg, #FFA500 0%, #FF8C00 100%);
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(255, 165, 0, 0.3);
        }
        
        .onyu-btn-secondary {
            background: transparent;
            color: #666;
            border: 2px solid #ddd;
        }
        
        .onyu-btn-secondary:hover {
            background: #f8f9fa;
            color: #1a3d1f;
            border-color: #FFD700;
        }
        
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fadeOut {
            to { opacity: 0; transform: scale(0.95); }
        }
    `;
    
    document.head.appendChild(modalStyle);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function closeOnyuConstructionModal() {
    const modal = document.querySelector('.onyu-construction-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

function getPageDisplayName(pageName) {
    const displayNames = {
        'vision': '비전 & 미션',
        'history': '연혁',
        'team': '팀 소개',
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

// ===== PERFORMANCE OPTIMIZATION =====
// 디바운스 함수
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

// 스로틀 함수
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

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('온유 브랜드 페이지 오류:', e.error);
    // 에러 리포팅 로직을 여기에 추가할 수 있습니다
});

// ===== EXPORT FOR MODULE USE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        navigateToPage,
        showLoadingIndicator,
        hideLoadingIndicator,
        smoothScrollTo
    };
}