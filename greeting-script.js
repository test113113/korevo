// ===== GREETING PAGE SPECIFIC SCRIPTS =====

// ===== PAGE NAVIGATION FUNCTIONS =====
function navigateToPage(page) {
    // Close mobile menu if open
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.remove('active');
    
    // Page routing logic
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
        // Show loading indicator
        showLoadingIndicator();
        
        // Simulate page transition delay
        setTimeout(() => {
            // For now, show alert that page is under construction
            hideLoadingIndicator();
            showPageUnderConstruction(page);
        }, 500);
    } else {
        console.error(`Page not found: ${page}`);
    }
}

// ===== LOADING INDICATOR =====
function showLoadingIndicator() {
    if (document.querySelector('.loading-indicator')) return;
    
    const loader = document.createElement('div');
    loader.className = 'loading-indicator';
    loader.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>페이지를 불러오는 중...</p>
        </div>
    `;
    
    // Add loading styles
    const style = document.createElement('style');
    style.innerHTML = `
        .loading-indicator {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }
        
        .loading-spinner {
            text-align: center;
        }
        
        .spinner {
            width: 50px;
            height: 50px;
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
        
        .loading-spinner p {
            color: #2c5530;
            font-weight: 500;
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(loader);
}

function hideLoadingIndicator() {
    const loader = document.querySelector('.loading-indicator');
    if (loader) {
        loader.remove();
    }
}

// ===== UNDER CONSTRUCTION MODAL =====
function showPageUnderConstruction(pageName) {
    const modal = document.createElement('div');
    modal.className = 'construction-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>🚧 페이지 준비 중</h3>
                <button class="modal-close" onclick="closeConstructionModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="construction-icon">🏗️</div>
                <p><strong>${getPageDisplayName(pageName)}</strong> 페이지를 준비하고 있습니다.</p>
                <p>빠른 시일 내에 완성하여 제공하겠습니다.</p>
                <div class="modal-actions">
                    <button class="btn-primary" onclick="closeConstructionModal()">확인</button>
                    <button class="btn-secondary" onclick="window.location.href='index.html'">홈으로 이동</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.innerHTML = `
        .construction-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow: hidden;
            animation: slideUp 0.3s ease;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid #f0f0f0;
            background: linear-gradient(135deg, #f8fafe 0%, #ffffff 100%);
        }
        
        .modal-header h3 {
            margin: 0;
            color: #2c5530;
            font-size: 1.25rem;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
            padding: 0;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }
        
        .modal-close:hover {
            background: #f0f0f0;
            color: #333;
        }
        
        .modal-body {
            padding: 2rem;
            text-align: center;
        }
        
        .construction-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
        }
        
        .modal-body p {
            margin-bottom: 1rem;
            color: #666;
            line-height: 1.6;
        }
        
        .modal-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 2rem;
        }
        
        .btn-primary,
        .btn-secondary {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 25px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #FFD700 0%, #B8860B 100%);
            color: #2c5530;
        }
        
        .btn-primary:hover {
            background: linear-gradient(135deg, #FFA500 0%, #FF8C00 100%);
            transform: translateY(-2px);
        }
        
        .btn-secondary {
            background: transparent;
            color: #666;
            border: 1px solid #ddd;
        }
        
        .btn-secondary:hover {
            background: #f8f9fa;
            color: #2c5530;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeConstructionModal() {
    const modal = document.querySelector('.construction-modal');
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
        'onyu-brand': '온유(溫鍮) 브랜드',
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

// ===== RELATED PAGES INTERACTIONS =====
function initRelatedPagesAnimations() {
    const relatedCards = document.querySelectorAll('.related-page-card');
    
    relatedCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.related-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            
            const readMore = this.querySelector('.read-more');
            readMore.style.transform = 'translateX(5px)';
            readMore.style.color = '#2c5530';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.related-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
            
            const readMore = this.querySelector('.read-more');
            readMore.style.transform = 'translateX(0)';
            readMore.style.color = '#FFD700';
        });
    });
}

// ===== BREADCRUMB INTERACTIONS =====
function initBreadcrumbInteractions() {
    const breadcrumbItems = document.querySelectorAll('.breadcrumb-item:not(.active)');
    
    breadcrumbItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.color = '#FFD700';
            this.style.transform = 'translateX(3px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.color = '#666';
            this.style.transform = 'translateX(0)';
        });
    });
}

// ===== PAGE SCROLL EFFECTS =====
function initPageScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header background opacity based on scroll
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
}

// ===== ENHANCED CEO IMAGE INTERACTIONS =====
function initEnhancedCEOInteractions() {
    const ceoImage = document.querySelector('.ceo-image');
    if (ceoImage) {
        let rotationAngle = 0;
        
        ceoImage.addEventListener('click', function() {
            rotationAngle += 360;
            this.style.transform = `scale(1.1) rotate(${rotationAngle}deg)`;
            
            // Create sparkle effect
            createSparkleEffect(this);
            
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
                rotationAngle = 0;
            }, 600);
        });
        
        // Double click for special effect
        let clickCount = 0;
        ceoImage.addEventListener('click', function() {
            clickCount++;
            setTimeout(() => {
                if (clickCount === 2) {
                    createConfettiEffect();
                }
                clickCount = 0;
            }, 400);
        });
    }
}

function createSparkleEffect(element) {
    const sparkles = ['✨', '⭐', '🌟', '💫'];
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.position = 'fixed';
        sparkle.style.left = rect.left + rect.width / 2 + 'px';
        sparkle.style.top = rect.top + rect.height / 2 + 'px';
        sparkle.style.fontSize = '1.5rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.animation = `sparkleFloat${i} 1s ease-out forwards`;
        
        // Add sparkle animation styles
        if (!document.querySelector('#sparkle-styles')) {
            const style = document.createElement('style');
            style.id = 'sparkle-styles';
            style.innerHTML = `
                @keyframes sparkleFloat0 { to { transform: translate(-30px, -40px); opacity: 0; } }
                @keyframes sparkleFloat1 { to { transform: translate(30px, -40px); opacity: 0; } }
                @keyframes sparkleFloat2 { to { transform: translate(-40px, 0px); opacity: 0; } }
                @keyframes sparkleFloat3 { to { transform: translate(40px, 0px); opacity: 0; } }
                @keyframes sparkleFloat4 { to { transform: translate(-20px, 30px); opacity: 0; } }
                @keyframes sparkleFloat5 { to { transform: translate(20px, 30px); opacity: 0; } }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}

function createConfettiEffect() {
    const colors = ['#FFD700', '#2c5530', '#4a7c59', '#FFA500', '#B8860B'];
    const emojis = ['🎉', '🎊', '🏺', '✨', '🌟'];
    
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.fontSize = '1.5rem';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        
        if (Math.random() > 0.5) {
            confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        } else {
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
        }
        
        confetti.style.animation = `confettiFall 3s linear forwards`;
        
        // Add confetti animation styles
        if (!document.querySelector('#confetti-styles')) {
            const style = document.createElement('style');
            style.id = 'confetti-styles';
            style.innerHTML = `
                @keyframes confettiFall {
                    to {
                        transform: translateY(${window.innerHeight + 100}px) rotate(720deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// ===== GREETING PAGE INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('KOREVO Greeting Page initialized');
    
    // Initialize greeting page specific features
    initRelatedPagesAnimations();
    initBreadcrumbInteractions();
    initPageScrollEffects();
    initEnhancedCEOInteractions();
    
    // Add welcome message
    setTimeout(() => {
        console.log('Welcome to KOREVO CEO Message Page! 🏺✨');
    }, 1000);
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(e) {
    // ESC key to close modal
    if (e.key === 'Escape') {
        closeConstructionModal();
    }
    
    // H key to go home
    if (e.key === 'h' || e.key === 'H') {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            window.location.href = 'index.html';
        }
    }
});

// ===== EXPORT FOR MODULE USE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        navigateToPage,
        showPageUnderConstruction,
        closeConstructionModal
    };
}