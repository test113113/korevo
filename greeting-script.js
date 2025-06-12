// ===== ENHANCED LANGUAGE SELECTOR FOR GREETING PAGE =====
function initGreetingLanguageSelector() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Language configuration with greeting-specific content
    const languages = {
        '🇰🇷': {
            code: 'ko',
            name: '한국어',
            flag: '🇰🇷',
            greeting: '안녕하십니까'
        },
        '🇺🇸': {
            code: 'en',
            name: 'English',
            flag: '🇺🇸',
            greeting: 'Hello'
        },
        '🇨🇳': {
            code: 'zh',
            name: '中文',
            flag: '🇨🇳',
            greeting: '您好'
        },
        '🇯🇵': {
            code: 'ja',
            name: '日本語',
            flag: '🇯🇵',
            greeting: 'こんにちは'
        }
    };

    langButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all buttons
            langButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get selected language info
            const selectedFlag = this.textContent.trim();
            const selectedLang = languages[selectedFlag];
            
            if (selectedLang) {
                console.log(`Language selected: ${selectedLang.name} (${selectedLang.code})`);
                
                // Store language preference
                if (typeof Storage !== 'undefined') {
                    localStorage.setItem('selectedLanguage', selectedLang.code);
                }
                
                // Add visual feedback with greeting
                showGreetingLanguageAnimation(this, selectedLang);
                
                // Update page content for greeting page
                updateGreetingPageContent(selectedLang);
            }
        });

        // Enhanced hover effect for greeting page
        btn.addEventListener('mouseenter', function() {
            const flag = this.textContent.trim();
            const lang = languages[flag];
            if (lang) {
                showGreetingTooltip(this, lang);
            }
        });

        btn.addEventListener('mouseleave', function() {
            hideGreetingTooltip(this);
        });
    });

    // Load saved language preference
    loadSavedGreetingLanguage();
}

// ===== GREETING-SPECIFIC LANGUAGE ANIMATION =====
function showGreetingLanguageAnimation(button, langInfo) {
    // Create enhanced ripple effect
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, rgba(255, 215, 0, 0.2) 70%);
        transform: scale(0);
        animation: greetingRipple 0.8s ease-out;
        left: 50%;
        top: 50%;
        width: 40px;
        height: 40px;
        margin-left: -20px;
        margin-top: -20px;
        pointer-events: none;
        z-index: 1;
    `;
    
    button.style.position = 'relative';
    button.appendChild(ripple);
    
    // Show greeting success message
    showGreetingSuccessMessage(langInfo);
    
    // Add sparkle effect around button
    createGreetingSparkles(button);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 800);
}

// ===== GREETING TOOLTIP =====
function showGreetingTooltip(element, langInfo) {
    const tooltip = document.createElement('div');
    tooltip.className = 'greeting-lang-tooltip';
    tooltip.innerHTML = `
        <div class="tooltip-content">
            <span class="tooltip-greeting">${langInfo.greeting}</span>
            <span class="tooltip-name">${langInfo.name}</span>
        </div>
    `;
    
    tooltip.style.cssText = `
        position: absolute;
        bottom: 120%;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, rgba(44, 85, 48, 0.95), rgba(74, 124, 89, 0.95));
        color: white;
        padding: 0.75rem 1rem;
        border-radius: 12px;
        font-size: 0.8rem;
        white-space: nowrap;
        z-index: 1002;
        opacity: 0;
        animation: fadeInGreetingTooltip 0.3s ease forwards;
        pointer-events: none;
        box-shadow: 0 8px 20px rgba(44, 85, 48, 0.3);
        border: 1px solid rgba(255, 215, 0, 0.3);
    `;
    
    // Add CSS for greeting tooltip if not exists
    if (!document.querySelector('#greeting-tooltip-styles')) {
        const style = document.createElement('style');
        style.id = 'greeting-tooltip-styles';
        style.innerHTML = `
            @keyframes fadeInGreetingTooltip {
                from { opacity: 0; transform: translate(-50%, 10px); }
                to { opacity: 1; transform: translate(-50%, 0); }
            }
            @keyframes greetingRipple {
                to { transform: scale(3); opacity: 0; }
            }
            .tooltip-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.2rem;
            }
            .tooltip-greeting {
                font-weight: bold;
                color: #FFD700;
                font-size: 0.9rem;
            }
            .tooltip-name {
                font-size: 0.7rem;
                opacity: 0.9;
            }
        `;
        document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.appendChild(tooltip);
}

function hideGreetingTooltip(element) {
    const tooltip = element.querySelector('.greeting-lang-tooltip');
    if (tooltip) {
        tooltip.style.animation = 'fadeInGreetingTooltip 0.3s ease reverse';
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.remove();
            }
        }, 300);
    }
}

// ===== GREETING SUCCESS MESSAGE =====
function showGreetingSuccessMessage(langInfo) {
    const message = document.createElement('div');
    message.className = 'greeting-success-message';
    message.innerHTML = `
        <div class="success-content">
            <span class="success-flag">${langInfo.flag}</span>
            <div class="success-text-content">
                <span class="success-greeting">${langInfo.greeting}!</span>
                <span class="success-name">${langInfo.name} 선택됨</span>
            </div>
            <span class="success-icon">✓</span>
        </div>
    `;
    
    message.style.cssText = `
        position: fixed;
        top: 120px;
        right: 2rem;
        background: linear-gradient(135deg, rgba(44, 85, 48, 0.95), rgba(74, 124, 89, 0.95));
        backdrop-filter: blur(10px);
        color: white;
        padding: 1.25rem 1.75rem;
        border-radius: 16px;
        box-shadow: 0 15px 35px rgba(44, 85, 48, 0.4);
        border: 1px solid rgba(255, 215, 0, 0.3);
        z-index: 1003;
        opacity: 0;
        transform: translateX(100%);
        animation: slideInRightGreeting 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        font-weight: 500;
        min-width: 200px;
    `;

    // Add CSS for greeting success message
    if (!document.querySelector('#greeting-success-styles')) {
        const style = document.createElement('style');
        style.id = 'greeting-success-styles';
        style.innerHTML = `
            @keyframes slideInRightGreeting {
                to { opacity: 1; transform: translateX(0); }
            }
            .success-content {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            .success-flag {
                font-size: 1.5rem;
                animation: flagWave 0.5s ease-in-out 0.3s;
            }
            @keyframes flagWave {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(-5deg); }
                75% { transform: rotate(5deg); }
            }
            .success-text-content {
                display: flex;
                flex-direction: column;
                flex: 1;
            }
            .success-greeting {
                font-weight: bold;
                color: #FFD700;
                font-size: 0.9rem;
                margin-bottom: 0.2rem;
            }
            .success-name {
                font-size: 0.8rem;
                opacity: 0.9;
            }
            .success-icon {
                background: #FFD700;
                color: #2c5530;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.9rem;
                font-weight: bold;
                animation: checkMark 0.5s ease-in-out 0.6s both;
            }
            @keyframes checkMark {
                0% { transform: scale(0) rotate(180deg); }
                100% { transform: scale(1) rotate(0deg); }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(message);

    // Auto remove after 4 seconds
    setTimeout(() => {
        message.style.animation = 'slideInRightGreeting 0.5s ease reverse';
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 500);
    }, 4000);
}

// ===== GREETING SPARKLES EFFECT =====
function createGreetingSparkles(element) {
    const sparkles = ['✨', '⭐', '🌟', '💫', '🎊'];
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            font-size: 1.2rem;
            pointer-events: none;
            z-index: 9999;
            animation: greetingSparkle${i} 1.2s ease-out forwards;
        `;
        
        // Add sparkle animation styles if not exists
        if (!document.querySelector('#greeting-sparkle-styles')) {
            const style = document.createElement('style');
            style.id = 'greeting-sparkle-styles';
            style.innerHTML = `
                @keyframes greetingSparkle0 { to { transform: translate(-40px, -50px) rotate(360deg); opacity: 0; } }
                @keyframes greetingSparkle1 { to { transform: translate(40px, -50px) rotate(-360deg); opacity: 0; } }
                @keyframes greetingSparkle2 { to { transform: translate(-50px, 0px) rotate(180deg); opacity: 0; } }
                @keyframes greetingSparkle3 { to { transform: translate(50px, 0px) rotate(-180deg); opacity: 0; } }
                @keyframes greetingSparkle4 { to { transform: translate(-30px, 40px) rotate(270deg); opacity: 0; } }
                @keyframes greetingSparkle5 { to { transform: translate(30px, 40px) rotate(-270deg); opacity: 0; } }
                @keyframes greetingSparkle6 { to { transform: translate(-60px, -20px) rotate(45deg); opacity: 0; } }
                @keyframes greetingSparkle7 { to { transform: translate(60px, -20px) rotate(-45deg); opacity: 0; } }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.remove();
            }
        }, 1200);
    }
}

// ===== UPDATE GREETING PAGE CONTENT =====
function updateGreetingPageContent(langInfo) {
    // This function can be expanded to update actual page content
    // For now, it's a placeholder for future internationalization
    console.log(`Updating greeting page content to: ${langInfo.name}`);
    
    // Example: Update specific elements based on language
    const greetingElements = document.querySelectorAll('[data-greeting]');
    greetingElements.forEach(element => {
        if (element.dataset.greeting === 'hello') {
            element.textContent = langInfo.greeting;
        }
    });
}

// ===== LOAD SAVED GREETING LANGUAGE =====
function loadSavedGreetingLanguage() {
    if (typeof Storage === 'undefined') return;
    
    const savedLang = localStorage.getItem('selectedLanguage') || 'ko';
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Map language codes to flags
    const langToFlag = {
        'ko': '🇰🇷',
        'en': '🇺🇸',
        'zh': '🇨🇳',
        'ja': '🇯🇵'
    };

    langButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.trim() === langToFlag[savedLang]) {
            btn.classList.add('active');
        }
    });
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

// ===== ENHANCED LANGUAGE SELECTOR FOR GREETING PAGE =====
function initGreetingLanguageSelector() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Language configuration with greeting-specific content
    const languages = {
        '🇰🇷': {
            code: 'ko',
            name: '한국어',
            flag: '🇰🇷',
            greeting: '안녕하십니까'
        },
        '🇺🇸': {
            code: 'en',
            name: 'English',
            flag: '🇺🇸',
            greeting: 'Hello'
        },
        '🇨🇳': {
            code: 'zh',
            name: '中文',
            flag: '🇨🇳',
            greeting: '您好'
        },
        '🇯🇵': {
            code:
