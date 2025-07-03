/**
 * KOREVO 통합 JavaScript 파일
 * 모든 HTML 페이지에서 사용하는 공용 스크립트
 */

'use strict';

// ===== GLOBAL VARIABLES =====
let isMenuOpen = false;
let scrollTimeout = null;
let resizeTimeout = null;

// ===== UTILITY FUNCTIONS =====

/**
 * 디바운스 유틸리티 함수
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
 * 스로틀 유틸리티 함수
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
 * 모바일 디바이스 감지
 */
function isMobileDevice() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * 축소된 모션 설정 감지
 */
function isReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * 요소가 뷰포트에 있는지 확인
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

// ===== NAVIGATION FUNCTIONS =====

/**
 * 모바일 메뉴 토글
 */
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (!navMenu || !menuToggle) return;
    
    isMenuOpen = !isMenuOpen;
    
    navMenu.classList.toggle('active', isMenuOpen);
    menuToggle.classList.toggle('active', isMenuOpen);
    
    // 접근성: aria-expanded 속성 업데이트
    menuToggle.setAttribute('aria-expanded', isMenuOpen);
    
    // 메뉴가 열렸을 때 첫 번째 링크에 포커스
    if (isMenuOpen) {
        const firstLink = navMenu.querySelector('.nav-link');
        if (firstLink) {
            setTimeout(() => firstLink.focus(), 100);
        }
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

/**
 * 페이지 네비게이션
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
        // 로딩 인디케이터 표시
        showLoadingIndicator();
        
        // 페이지 이동
        setTimeout(() => {
            window.location.href = targetPage;
        }, 300);
    } else {
        // 페이지가 준비되지 않은 경우
        showNotification(`${getPageDisplayName(page)} 페이지는 준비 중입니다.`, 'info');
    }
}

/**
 * 페이지 표시 이름 가져오기
 */
function getPageDisplayName(pageName) {
    const displayNames = {
        'vision': '비전 & 미션',
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
 * 비디오 에러 핸들링
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

/**
 * 비디오 초기화
 */
function initializeVideo() {
    const video = document.querySelector('.hero-video');
    
    if (!video) return;

    // 모바일 지원을 위한 속성 설정
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('playsinline', '');
    video.muted = true;
    video.defaultMuted = true;

    // 비디오 파일 존재 확인
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
 * 헤더 스크롤 효과
 */
const handleHeaderScroll = throttle(function() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.borderBottom = '1px solid rgba(0, 0, 0, 0.12)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.8)';
        header.style.borderBottom = '1px solid rgba(0, 0, 0, 0.08)';
    }
}, 16);

/**
 * 부드러운 스크롤
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 72;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 스크롤 애니메이션
 */
function initScrollAnimations() {
    if (isReducedMotion()) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 애니메이션 대상 요소들 관찰
    document.querySelectorAll('.animate-on-scroll, .fade-in').forEach(el => {
        if (!el.classList.contains('visible')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        observer.observe(el);
    });
}

// ===== FORM HANDLING =====

/**
 * 연락처 폼 제출
 */
function submitForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // 폼 검증
    if (!validateForm(data)) {
        return;
    }
    
    // 로딩 상태 표시
    const submitBtn = form.querySelector('.submit-btn, .btn-primary');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '전송중...';
    submitBtn.disabled = true;
    
    // 실제 구현에서는 서버로 데이터 전송
    setTimeout(() => {
        showNotification('문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변드리겠습니다.', 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

/**
 * 폼 검증
 */
function validateForm(data) {
    const required = ['name', 'email', 'phone', 'category', 'subject', 'message'];
    const missing = required.filter(field => !data[field] || data[field].trim() === '');
    
    if (missing.length > 0) {
        showNotification(`다음 필드를 입력해주세요: ${missing.join(', ')}`, 'error');
        return false;
    }
    
    // 이메일 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('올바른 이메일 주소를 입력해주세요.', 'error');
        return false;
    }
    
    // 전화번호 검증 (한국 형식)
    const phoneRegex = /^[\d-\s()]+$/;
    if (!phoneRegex.test(data.phone)) {
        showNotification('올바른 전화번호를 입력해주세요.', 'error');
        return false;
    }
    
    return true;
}

// ===== PRODUCT FUNCTIONS =====

/**
 * 제품 필터링
 */
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    let visibleCount = 0;
    
    products.forEach(product => {
        const productCategory = product.dataset.category;
        const shouldShow = category === 'all' || productCategory === category;
        
        if (shouldShow) {
            product.style.display = 'block';
            visibleCount++;
        } else {
            product.style.display = 'none';
        }
    });
    
    // 필터 버튼 활성화 상태 업데이트
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.classList.toggle('active', tag.dataset.category === category);
    });
    
    console.log(`Filtered products: ${visibleCount} visible`);
}

/**
 * 제품 정렬
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
    
    // DOM 재정렬
    products.forEach(product => container.appendChild(product));
}

/**
 * 장바구니에 추가
 */
function addToCart(productId) {
    // 실제 구현에서는 로컬 스토리지나 서버에 저장
    console.log(`Adding product ${productId} to cart`);
    
    // 시각적 피드백
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = '추가됨!';
    button.style.background = '#28a745';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 2000);
    
    showNotification('제품이 장바구니에 추가되었습니다.', 'success');
    updateCartCount();
}

/**
 * 장바구니 개수 업데이트
 */
function updateCartCount() {
    // 실제 구현에서는 저장된 장바구니 데이터에서 개수 계산
    const cartCount = Math.floor(Math.random() * 5) + 1; // 임시 데이터
    const cartBadge = document.querySelector('.cart-count');
    if (cartBadge) {
        cartBadge.textContent = cartCount;
        cartBadge.style.display = cartCount > 0 ? 'inline' : 'none';
    }
}

// ===== NOTICE FUNCTIONS =====

/**
 * 공지사항 데이터
 */
const noticeData = {
    1: {
        title: "KOREVO 온유 브랜드 공식 런칭 안내",
        author: "관리자",
        date: "2025.01.15",
        views: 156,
        content: `
            <h3>🎉 KOREVO 온유 브랜드 공식 런칭</h3>
            <br>
            <p>안녕하세요, KOREVO입니다.</p>
            <br>
            <p>드디어 저희가 오랫동안 준비해온 온유(溫鍮) 브랜드를 공식적으로 런칭하게 되었습니다.</p>
            <br>
            <h4>📅 런칭 일정</h4>
            <ul>
                <li><strong>공식 런칭:</strong> 2025년 2월 1일</li>
                <li><strong>사전 예약:</strong> 2025년 1월 20일부터</li>
                <li><strong>매장 오픈:</strong> 2025년 2월 15일</li>
            </ul>
            <br>
            <h4>🏺 출시 제품</h4>
            <ul>
                <li>온유 프리미엄 식기 세트</li>
                <li>온유 개인 맞춤 수저</li>
                <li>온유 티 컬렉션</li>
                <li>온유 선물 세트</li>
            </ul>
            <br>
            <p>많은 관심과 기대 부탁드립니다.</p>
        `
    },
    2: {
        title: "온유 식기 컬렉션 신제품 출시 안내",
        author: "제품팀",
        date: "2025.01.14",
        views: 89,
        content: `
            <h3>🍽️ 온유 식기 컬렉션 신제품 출시</h3>
            <br>
            <p>전통 유기 기법으로 제작된 새로운 식기 컬렉션을 출시합니다.</p>
            <br>
            <h4>🆕 신제품 라인업</h4>
            <ul>
                <li><strong>온유 밥그릇 세트:</strong> 89,000원</li>
                <li><strong>온유 국그릇 세트:</strong> 124,000원</li>
                <li><strong>온유 개인 수저:</strong> 55,000원</li>
            </ul>
            <br>
            <p>모든 제품은 전통 장인의 수작업으로 제작되어 품질을 보장합니다.</p>
        `
    },
    3: {
        title: "ERP 솔루션 업데이트 및 유지보수 안내",
        author: "기술팀",
        date: "2025.01.13",
        views: 124,
        content: `
            <h3>💻 ERP 솔루션 업데이트</h3>
            <br>
            <p>시스템 성능 향상을 위한 업데이트를 진행합니다.</p>
            <br>
            <h4>📋 업데이트 내용</h4>
            <ul>
                <li>데이터베이스 최적화</li>
                <li>사용자 인터페이스 개선</li>
                <li>보안 기능 강화</li>
                <li>새로운 리포트 기능 추가</li>
            </ul>
            <br>
            <h4>⏰ 유지보수 일정</h4>
            <p><strong>일시:</strong> 2025년 1월 20일 (일) 02:00 ~ 06:00</p>
            <p>해당 시간 동안 시스템 접속이 제한될 수 있습니다.</p>
        `
    }
};

/**
 * 공지사항 열기
 */
function openNotice(noticeId) {
    const notice = noticeData[noticeId];
    if (!notice) {
        console.warn(`Notice ID ${noticeId} not found`);
        return;
    }

    // 모달 내용 업데이트
    const modal = document.getElementById('noticeModal');
    if (!modal) return;

    document.getElementById('modalTitle').textContent = notice.title;
    document.getElementById('modalDate').textContent = notice.date;
    document.getElementById('modalAuthor').textContent = notice.author;
    document.getElementById('modalViews').textContent = `조회수: ${notice.views.toLocaleString()}`;
    document.getElementById('modalContent').innerHTML = notice.content;

    // 모달 표시
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // 조회수 증가
    notice.views++;
    updateNoticeViews(noticeId, notice.views);

    // 모달 열림 애니메이션
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.transform = 'translateY(0) scale(1)';
        }
    });
}

/**
 * 모달 닫기
 */
function closeModal() {
    const modal = document.getElementById('noticeModal');
    if (!modal) return;
    
    // 닫힘 애니메이션
    modal.style.opacity = '0';
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.transform = 'translateY(-20px) scale(0.95)';
    }
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

/**
 * 공지사항 검색
 */
function searchNotices() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const notices = document.querySelectorAll('.notice-item');
    let visibleCount = 0;

    notices.forEach(notice => {
        const title = notice.querySelector('.notice-title')?.textContent.toLowerCase() || '';
        const content = notice.textContent.toLowerCase();
        
        if (title.includes(searchTerm) || content.includes(searchTerm)) {
            notice.style.display = '';
            visibleCount++;
        } else {
            notice.style.display = 'none';
        }
    });

    updateNoticeStats(visibleCount);
    console.log(`Search results: ${visibleCount} notices found`);
}

/**
 * 공지사항 필터링
 */
function filterNotices() {
    const category = document.getElementById('categoryFilter')?.value || '';
    const notices = document.querySelectorAll('.notice-item');
    let visibleCount = 0;

    notices.forEach(notice => {
        const noticeCategory = notice.dataset.category || '';
        
        if (!category || noticeCategory === category) {
            notice.style.display = '';
            visibleCount++;
        } else {
            notice.style.display = 'none';
        }
    });

    updateNoticeStats(visibleCount);
}

/**
 * 공지사항 정렬
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

    notices.forEach(notice => container.appendChild(notice));
}

/**
 * 공지사항 보기 모드 변경
 */
function setViewMode(mode) {
    const noticeList = document.getElementById('noticeList');
    if (!noticeList) return;

    // 버튼 상태 업데이트
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.includes(mode === 'list' ? '목록' : '카드'));
    });

    if (mode === 'card') {
        noticeList.style.display = 'grid';
        noticeList.style.gridTemplateColumns = 'repeat(auto-fit, minmax(350px, 1fr))';
        noticeList.style.gap = '1.5rem';
    } else {
        noticeList.style.display = 'block';
        noticeList.style.gridTemplateColumns = '';
        noticeList.style.gap = '';
    }
}

/**
 * 공지사항 통계 업데이트
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
 * 공지사항 조회수 업데이트
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
 * 알림 표시
 */
function showNotification(message, type = 'info') {
    // 기존 알림 제거
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;

    // 스타일 적용
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1100;
        max-width: 400px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(notification);

    // 애니메이션
    requestAnimationFrame(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    });

    // 자동 제거
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/**
 * 알림 아이콘 가져오기
 */
function getNotificationIcon(type) {
    const icons = {
        'success': '✅',
        'error': '❌',
        'warning': '⚠️',
        'info': 'ℹ️'
    };
    return icons[type] || icons.info;
}

/**
 * 알림 색상 가져오기
 */
function getNotificationColor(type) {
    const colors = {
        'success': '#28a745',
        'error': '#dc3545',
        'warning': '#ffc107',
        'info': '#007bff'
    };
    return colors[type] || colors.info;
}

/**
 * 로딩 인디케이터 표시
 */
function showLoadingIndicator() {
    if (document.querySelector('.loading-indicator')) return;

    const loader = document.createElement('div');
    loader.className = 'loading-indicator';
    loader.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p>페이지를 로드하는 중...</p>
        </div>
    `;

    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(5px);
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
        color: #2c5530;
    `;

    const spinner = loader.querySelector('.loading-spinner');
    spinner.style.cssText = `
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #2c5530;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    `;

    document.body.appendChild(loader);
    requestAnimationFrame(() => {
        loader.style.opacity = '1';
    });
}

/**
 * 로딩 인디케이터 숨기기
 */
function hideLoadingIndicator() {
    const loader = document.querySelector('.loading-indicator');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }
}

// ===== EVENT LISTENERS =====

/**
 * 키보드 이벤트 핸들러
 */
function initKeyboardEvents() {
    document.addEventListener('keydown', function(e) {
        // ESC 키로 모달 닫기
        if (e.key === 'Escape') {
            closeModal();
            if (isMenuOpen) {
                toggleMenu();
            }
        }
        
        // Enter 키로 검색
        if (e.key === 'Enter' && e.target.id === 'searchInput') {
            e.preventDefault();
            searchNotices();
        }

        // 접근성: Tab 키 트랩 (모달이 열려있을 때)
        if (e.key === 'Tab') {
            const modal = document.getElementById('noticeModal');
            if (modal && modal.style.display === 'flex') {
                trapTabKey(e, modal);
            }
        }
    });
}

/**
 * Tab 키 트랩 (모달 접근성)
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
 * 모바일 메뉴 외부 클릭 핸들러
 */
function initMenuCloseEvents() {
    document.addEventListener('click', function(e) {
        const navMenu = document.getElementById('navMenu');
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('.nav-container');
        
        if (isMenuOpen && nav && !nav.contains(e.target)) {
            toggleMenu();
        }
    });
}

/**
 * 폼 이벤트 초기화
 */
function initFormEvents() {
    // 연락처 폼
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', submitForm);
    }

    // 실시간 폼 검증
    document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

/**
 * 개별 필드 검증
 */
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let message = '';

    // 필수 필드 검증
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        message = '이 필드는 필수입니다.';
    }

    // 이메일 필드 검증
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = '올바른 이메일 주소를 입력해주세요.';
        }
    }

    // 전화번호 필드 검증
    if (fieldName === 'phone' && value) {
        const phoneRegex = /^[\d-\s()]+$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            message = '올바른 전화번호를 입력해주세요.';
        }
    }

    // 검증 결과 표시
    showFieldValidation(field, isValid, message);
}

/**
 * 필드 검증 결과 표시
 */
function showFieldValidation(field, isValid, message) {
    // 기존 메시지 제거
    const existingMessage = field.parentElement.querySelector('.field-error');
    if (existingMessage) {
        existingMessage.remove();
    }

    if (!isValid) {
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #dc3545;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        `;
        field.parentElement.appendChild(errorElement);
        field.style.borderColor = '#dc3545';
    } else {
        field.style.borderColor = '';
    }
}

/**
 * 제품 관련 이벤트 초기화
 */
function initProductEvents() {
    // 필터 태그 이벤트
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const category = this.dataset.category;
            filterProducts(category);
        });
    });

    // 정렬 선택 이벤트
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortProducts(this.value);
        });
    }

    // 뷰 모드 변경 이벤트
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view || (this.textContent.includes('목록') ? 'list' : 'grid');
            setViewMode(view);
        });
    });

    // 가격 필터 이벤트
    const priceFilter = document.getElementById('priceFilter');
    if (priceFilter) {
        priceFilter.addEventListener('change', function() {
            filterProductsByPrice(this.value);
        });
    }
}

/**
 * 가격별 제품 필터링
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

        product.style.display = shouldShow ? 'block' : 'none';
    });
}

/**
 * 공지사항 이벤트 초기화
 */
function initNoticeEvents() {
    // 검색 입력 실시간 처리
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const debouncedSearch = debounce(searchNotices, 300);
        searchInput.addEventListener('input', debouncedSearch);
    }

    // 필터 변경 이벤트
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterNotices);
    }

    // 정렬 변경 이벤트
    const sortOrder = document.getElementById('sortOrder');
    if (sortOrder) {
        sortOrder.addEventListener('change', sortNotices);
    }
}

// ===== MAIN INITIALIZATION =====

/**
 * 디바이스별 최적화
 */
function optimizeForDevice() {
    if (isMobileDevice()) {
        console.log('Mobile device detected - optimizing experience');
        
        // 모바일 비디오 최적화
        const video = document.querySelector('.hero-video');
        if (video) {
            video.style.opacity = '0.4';
            video.preload = 'metadata';
        }
    }

    if (isReducedMotion()) {
        console.log('Reduced motion preference detected');
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    }
}

/**
 * 리사이즈 핸들러
 */
const handleResize = debounce(function() {
    // 모바일 메뉴 상태 초기화
    if (window.innerWidth > 768 && isMenuOpen) {
        toggleMenu();
    }

    // 반응형 레이아웃 조정
    adjustResponsiveLayouts();
}, 250);

/**
 * 반응형 레이아웃 조정
 */
function adjustResponsiveLayouts() {
    const isMobile = window.innerWidth <= 768;
    
    // 공지사항 뷰 모드 자동 조정
    if (isMobile) {
        const listBtn = document.querySelector('.view-btn[data-view="list"], .view-btn:first-child');
        if (listBtn && !listBtn.classList.contains('active')) {
            setViewMode('list');
        }
    }
}

/**
 * 페이지 로드 완료 시 초기화
 */
function initializePage() {
    console.log('KOREVO JavaScript initialized');
    
    // 기본 기능 초기화
    optimizeForDevice();
    initializeVideo();
    initSmoothScroll();
    initScrollAnimations();
    initKeyboardEvents();
    initMenuCloseEvents();
    initFormEvents();
    initProductEvents();
    initNoticeEvents();
    
    // 이벤트 리스너 등록
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    // 페이지별 특화 초기화
    const pathname = window.location.pathname;
    if (pathname.includes('notice')) {
        initNoticeBoard();
    } else if (pathname.includes('dining-set')) {
        initProductCatalog();
    } else if (pathname.includes('contact')) {
        initContactPage();
    }
    
    // 로드 완료 클래스 추가
    document.body.classList.add('js-loaded', 'loaded');
    
    // 초기 애니메이션 트리거
    setTimeout(() => {
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('visible');
            }
        });
    }, 100);
}

/**
 * 공지사항 페이지 초기화
 */
function initNoticeBoard() {
    console.log('Notice board initialized');
    
    // 검색 입력창에 포커스
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.focus();
    }
    
    // 초기 통계 설정
    updateNoticeStats();
}

/**
 * 제품 카탈로그 초기화
 */
function initProductCatalog() {
    console.log('Product catalog initialized');
    
    // 초기 제품 개수 표시
    const products = document.querySelectorAll('.product-card');
    console.log(`${products.length} products loaded`);
}

/**
 * 연락처 페이지 초기화
 */
function initContactPage() {
    console.log('Contact page initialized');
    
    // 첫 번째 입력 필드에 포커스
    const firstInput = document.querySelector('.form-input');
    if (firstInput) {
        firstInput.focus();
    }
}

// ===== ERROR HANDLING =====

/**
 * 전역 에러 핸들러
 */
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    
    // 비디오 에러 처리
    if (e.error && e.error.message && e.error.message.includes('video')) {
        const video = document.querySelector('.hero-video');
        if (video) {
            handleVideoError(video);
        }
    }
});

/**
 * Promise 거부 핸들러
 */
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// ===== PERFORMANCE MONITORING =====

/**
 * 성능 모니터링
 */
window.addEventListener('load', function() {
    console.log('Page fully loaded');
    
    if (performance.timing) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    }
    
    // 비디오 상태 로깅
    const video = document.querySelector('.hero-video');
    if (video) {
        console.log('Video element status:', {
            readyState: video.readyState,
            networkState: video.networkState,
            error: video.error
        });
    }
});

// ===== INITIALIZATION =====

// DOM 준비 완료 시 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
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
        showNotification
    };
}
