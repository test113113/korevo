// ===== 다국어 자동 번역 시스템 =====

// ===== 번역 언어 설정 =====
const TRANSLATION_CONFIG = {
    'ko': {
        code: 'ko',
        name: '한국어',
        flag: '🇰🇷',
        isDefault: true
    },
    'en': {
        code: 'en',
        name: 'English',
        flag: '🇺🇸',
        isDefault: false
    },
    'zh': {
        code: 'zh',
        name: '中文',
        flag: '🇨🇳',
        isDefault: false
    },
    'ja': {
        code: 'ja',
        name: '日本語',
        flag: '🇯🇵',
        isDefault: false
    }
};

// ===== 번역 캐시 시스템 =====
class TranslationCache {
    constructor() {
        this.cache = new Map();
        this.maxSize = 1000;
        this.loadFromStorage();
    }

    getCacheKey(text, targetLang) {
        return `${targetLang}:${text.trim().toLowerCase()}`;
    }

    get(text, targetLang) {
        const key = this.getCacheKey(text, targetLang);
        return this.cache.get(key);
    }

    set(text, targetLang, translation) {
        const key = this.getCacheKey(text, targetLang);
        
        if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        
        this.cache.set(key, translation);
        this.saveToStorage();
    }

    saveToStorage() {
        try {
            const cacheData = Array.from(this.cache.entries());
            localStorage.setItem('translationCache', JSON.stringify(cacheData));
        } catch (e) {
            console.warn('번역 캐시 저장 실패:', e);
        }
    }

    loadFromStorage() {
        try {
            const stored = localStorage.getItem('translationCache');
            if (stored) {
                const cacheData = JSON.parse(stored);
                this.cache = new Map(cacheData);
            }
        } catch (e) {
            console.warn('번역 캐시 로드 실패:', e);
        }
    }
}

// ===== 번역 서비스 클래스 =====
class TranslationService {
    constructor() {
        this.cache = new TranslationCache();
        this.isTranslating = false;
        this.currentLanguage = 'ko';
        this.originalTexts = new Map();
        this.excludeSelectors = [
            '.no-translate',
            '.logo',
            '[data-no-translate]',
            'input',
            'textarea',
            'select',
            '.lang-btn',
            '.menu-toggle',
            '.breadcrumb-separator',
            'script',
            'style'
        ];
    }

    getTranslatableElements() {
        const selectors = [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'p', 'span:not(.lang-btn)', 'div',
            'a:not(.logo):not(.lang-btn)', 
            '.nav-link',
            '.dropdown-item',
            '.cta-btn',
            '.section-title',
            '.page-title',
            '.page-subtitle',
            '.brand-subtitle',
            '.brand-description',
            '.message-text',
            '.vision-title',
            '.vision-text',
            '.feature-card h3',
            '.feature-card p',
            '.business-card h3',
            '.business-card p',
            '.footer-section h3',
            '.footer-section p:not(.no-translate)',
            '.breadcrumb-item:not(.active)',
            'button:not(.menu-toggle):not(.modal-close):not(.lang-btn)',
            '.highlight-text',
            '.ceo-name',
            '.ceo-title',
            '.credential-badge',
            '.feature-tag',
            '.stat-label',
            '.innovation-feature h4',
            '.innovation-feature p',
            '.story-content h2',
            '.story-content p',
            '.story-visual h3',
            '.story-visual p',
            '.heritage-title',
            '.heritage-desc',
            '.cta-title',
            '.cta-text',
            '.brand-logo',
            '.loader-text',
            '.success-name',
            '.success-desc'
        ];

        const elements = document.querySelectorAll(selectors.join(', '));
        return Array.from(elements).filter(element => {
            return !this.excludeSelectors.some(excludeSelector => 
                element.matches(excludeSelector) || 
                element.closest(excludeSelector)
            );
        });
    }

    saveOriginalTexts() {
        this.originalTexts.clear();
        const elements = this.getTranslatableElements();
        elements.forEach((element, index) => {
            const text = element.textContent.trim();
            if (text && text.length > 0) {
                this.originalTexts.set(`element_${index}`, {
                    element: element,
                    originalText: text
                });
            }
        });
        console.log(`${this.originalTexts.size}개 원본 텍스트 저장됨`);
    }

    async translateText(text, targetLang) {
        const cached = this.cache.get(text, targetLang);
        if (cached) {
            return cached;
        }

        try {
            // Google Translate API 사용
            const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
            const data = await response.json();
            
            if (data && data[0] && data[0][0] && data[0][0][0]) {
                const translation = data[0][0][0];
                this.cache.set(text, targetLang, translation);
                return translation;
            } else {
                throw new Error('번역 응답 형식 오류');
            }
        } catch (error) {
            console.warn('Google Translate 실패, 대체 API 시도:', error);
            return await this.translateTextFallback(text, targetLang);
        }
    }

    async translateTextFallback(text, targetLang) {
        try {
            // MyMemory API 사용 (무료 대체)
            const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=ko|${targetLang}`);
            const data = await response.json();
            
            if (data && data.responseData && data.responseData.translatedText) {
                const translation = data.responseData.translatedText;
                this.cache.set(text, targetLang, translation);
                return translation;
            } else {
                return text;
            }
        } catch (error) {
            console.error('대체 번역 API도 실패:', error);
            return text;
        }
    }

    async translatePage(targetLang) {
        if (this.isTranslating) {
            console.log('이미 번역 진행 중...');
            return;
        }

        this.isTranslating = true;
        this.showTranslationLoader();

        try {
            // 한국어로 복원
            if (targetLang === 'ko') {
                this.restoreOriginalTexts();
                this.hideTranslationLoader();
                this.isTranslating = false;
                this.currentLanguage = targetLang;
                this.dispatchTranslationEvent('complete', targetLang);
                return;
            }

            // 원본 텍스트가 저장되지 않았다면 저장
            if (this.originalTexts.size === 0) {
                this.saveOriginalTexts();
            }

            this.dispatchTranslationEvent('start', targetLang);

            const elements = this.getTranslatableElements();
            const translations = [];

            // 번역할 텍스트 수집
            for (let element of elements) {
                const text = element.textContent.trim();
                if (text && text.length > 0 && this.shouldTranslate(text, element)) {
                    translations.push({
                        element: element,
                        text: text
                    });
                }
            }

            console.log(`${translations.length}개 요소 번역 시작 (${targetLang})`);

            // 배치 번역 (3개씩으로 조정하여 안정성 향상)
            const batchSize = 3;
            for (let i = 0; i < translations.length; i += batchSize) {
                const batch = translations.slice(i, i + batchSize);
                await this.translateBatch(batch, targetLang);
                
                const progress = Math.min(((i + batchSize) / translations.length) * 100, 100);
                this.updateTranslationProgress(progress);
                
                // API 제한 방지를 위한 지연
                await this.delay(300);
            }

            this.currentLanguage = targetLang;
            this.dispatchTranslationEvent('complete', targetLang);
            console.log('번역 완료');

        } catch (error) {
            console.error('페이지 번역 오류:', error);
            this.showTranslationError();
            this.dispatchTranslationEvent('error', targetLang);
        } finally {
            this.hideTranslationLoader();
            this.isTranslating = false;
        }
    }

    async translateBatch(batch, targetLang) {
        const promises = batch.map(async item => {
            try {
                let translation = await this.translateText(item.text, targetLang);
                
                if (translation && translation !== item.text) {
                    item.element.textContent = translation;
                }
            } catch (error) {
                console.error('개별 번역 오류:', error);
            }
        });

        await Promise.all(promises);
    }

    shouldTranslate(text, element) {
        // 빈 텍스트 제외
        if (!text || text.trim().length === 0) return false;
        
        // 너무 짧은 텍스트 제외 (1글자)
        if (text.trim().length === 1) return false;
        
        // 숫자만 있는 텍스트 제외
        if (/^\d+$/.test(text.trim())) return false;
        
        // 이메일, URL 제외
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.trim())) return false;
        if (/^https?:\/\//.test(text.trim())) return false;
        
        // 전화번호 제외
        if (/^\d{4}-\d{4}$/.test(text.trim())) return false;
        if (/^1588-\d{4}$/.test(text.trim())) return false;
        
        // 사업자등록번호 제외
        if (/^\d{3}-\d{2}-\d{5}$/.test(text.trim())) return false;
        
        // 특수문자만 있는 텍스트 제외
        if (/^[^\w\s가-힣]+$/.test(text.trim())) return false;
        
        // KOREVO 브랜드명 제외
        if (text.trim() === 'KOREVO') return false;
        
        // 날짜 패턴 제외
        if (/^\d{4}년/.test(text.trim())) return false;
        
        // 온유 브랜드명 제외
        if (text.trim() === '온유(溫鍮)' || text.trim() === '온유') return false;
        
        // 제외 클래스나 속성 확인
        if (element.classList.contains('no-translate') || 
            element.hasAttribute('data-no-translate') ||
            element.closest('.no-translate')) {
            return false;
        }
        
        return true;
    }

    restoreOriginalTexts() {
        this.originalTexts.forEach(data => {
            if (data.element && data.originalText) {
                data.element.textContent = data.originalText;
            }
        });
        console.log('원본 텍스트 복원 완료');
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    dispatchTranslationEvent(type, language) {
        const event = new CustomEvent(`translation${type.charAt(0).toUpperCase() + type.slice(1)}`, {
            detail: { language, service: this }
        });
        document.dispatchEvent(event);
    }

    showTranslationLoader() {
        if (document.querySelector('.translation-loader')) return;

        const loader = document.createElement('div');
        loader.className = 'translation-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <div class="loader-text">페이지를 번역하고 있습니다...</div>
                <div class="loader-progress">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <div class="progress-text">0%</div>
                </div>
            </div>
        `;

        this.addLoaderStyles();
        document.body.appendChild(loader);
        document.body.style.overflow = 'hidden';
    }

    addLoaderStyles() {
        if (document.querySelector('#translation-loader-styles')) return;

        const style = document.createElement('style');
        style.id = 'translation-loader-styles';
        style.innerHTML = `
            .translation-loader {
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
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .loader-content {
                text-align: center;
                max-width: 400px;
                padding: 2rem;
                background: white;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            }
            
            .loader-spinner {
                width: 60px;
                height: 60px;
                border: 4px solid #f3f3f3;
                border-top: 4px solid #FFD700;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 1.5rem;
            }
            
            .loader-text {
                font-size: 1.2rem;
                color: #2c5530;
                font-weight: 600;
                margin-bottom: 1.5rem;
            }
            
            .loader-progress {
                width: 100%;
            }
            
            .progress-bar {
                width: 100%;
                height: 8px;
                background: #f0f0f0;
                border-radius: 4px;
                overflow: hidden;
                margin-bottom: 0.5rem;
            }
            
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #FFD700, #B8860B);
                border-radius: 4px;
                width: 0%;
                transition: width 0.3s ease;
            }
            
            .progress-text {
                font-size: 0.9rem;
                color: #666;
                font-weight: 500;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    updateTranslationProgress(progress) {
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (progressFill && progressText) {
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `${Math.round(progress)}%`;
        }
    }

    hideTranslationLoader() {
        const loader = document.querySelector('.translation-loader');
        if (loader) {
            loader.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.remove();
                }
                document.body.style.overflow = '';
            }, 300);
        }
    }

    showTranslationError() {
        const existingAlert = document.querySelector('.translation-error');
        if (existingAlert) existingAlert.remove();

        const errorAlert = document.createElement('div');
        errorAlert.className = 'translation-error';
        errorAlert.innerHTML = `
            <div class="error-content">
                <span class="error-icon">⚠️</span>
                <span class="error-text">번역 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</span>
                <button class="error-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        this.addErrorStyles();
        document.body.appendChild(errorAlert);

        setTimeout(() => {
            if (errorAlert.parentNode) {
                errorAlert.remove();
            }
        }, 5000);
    }

    addErrorStyles() {
        if (document.querySelector('#translation-error-styles')) return;

        const style = document.createElement('style');
        style.id = 'translation-error-styles';
        style.innerHTML = `
            .translation-error {
                position: fixed;
                top: 100px;
                right: 2rem;
                background: linear-gradient(135deg, #ff6b6b, #ee5a52);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(255, 107, 107, 0.3);
                z-index: 10001;
                animation: slideInRight 0.5s ease forwards;
                max-width: 350px;
            }
            
            .error-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            
            .error-icon {
                font-size: 1.2rem;
                flex-shrink: 0;
            }
            
            .error-text {
                flex: 1;
                font-size: 0.9rem;
                line-height: 1.4;
            }
            
            .error-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.2s ease;
                flex-shrink: 0;
            }
            
            .error-close:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            @keyframes slideInRight {
                from { opacity: 0; transform: translateX(100%); }
                to { opacity: 1; transform: translateX(0); }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== 언어 선택기 클래스 =====
class LanguageSelector {
    constructor(translationService) {
        this.translationService = translationService;
        this.init();
    }

    init() {
        const langButtons = document.querySelectorAll('.lang-btn');
        
        langButtons.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                await this.handleLanguageChange(btn);
            });

            btn.addEventListener('mouseenter', () => {
                this.showLanguageTooltip(btn);
            });

            btn.addEventListener('mouseleave', () => {
                this.hideLanguageTooltip(btn);
            });
        });

        this.loadSavedLanguage();
        this.addLanguageStyles();
    }

    async handleLanguageChange(button) {
        const langButtons = document.querySelectorAll('.lang-btn');
        const selectedFlag = button.textContent.trim();
        
        const flagToLang = {
            '🇰🇷': 'ko',
            '🇺🇸': 'en', 
            '🇨🇳': 'zh',
            '🇯🇵': 'ja'
        };

        const selectedLang = flagToLang[selectedFlag];
        if (!selectedLang) return;

        // 현재 언어와 같으면 무시
        if (this.translationService.currentLanguage === selectedLang) return;

        // 버튼 상태 업데이트
        langButtons.forEach(b => b.classList.remove('active'));
        button.classList.add('active');

        // 번역 실행
        await this.translationService.translatePage(selectedLang);

        // 언어 설정 저장
        localStorage.setItem('selectedLanguage', selectedLang);

        // 성공 메시지 표시
        this.showLanguageChangeSuccess(TRANSLATION_CONFIG[selectedLang]);
    }

    showLanguageTooltip(button) {
        const flagToLang = {
            '🇰🇷': 'ko',
            '🇺🇸': 'en',
            '🇨🇳': 'zh', 
            '🇯🇵': 'ja'
        };

        const selectedFlag = button.textContent.trim();
        const langCode = flagToLang[selectedFlag];
        const langConfig = TRANSLATION_CONFIG[langCode];

        if (!langConfig) return;

        const tooltip = document.createElement('div');
        tooltip.className = 'lang-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-content">
                <span class="tooltip-flag">${langConfig.flag}</span>
                <span class="tooltip-name">${langConfig.name}</span>
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
            border-radius: 8px;
            font-size: 0.85rem;
            white-space: nowrap;
            z-index: 1002;
            opacity: 0;
            animation: fadeInTooltip 0.3s ease forwards;
            pointer-events: none;
            box-shadow: 0 8px 20px rgba(44, 85, 48, 0.3);
        `;

        button.style.position = 'relative';
        button.appendChild(tooltip);
    }

    hideLanguageTooltip(button) {
        const tooltip = button.querySelector('.lang-tooltip');
        if (tooltip) {
            tooltip.style.animation = 'fadeInTooltip 0.3s ease reverse';
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.remove();
                }
            }, 300);
        }
    }

    showLanguageChangeSuccess(langConfig) {
        const existingMessage = document.querySelector('.lang-success-message');
        if (existingMessage) existingMessage.remove();

        const message = document.createElement('div');
        message.className = 'lang-success-message';
        message.innerHTML = `
            <div class="success-content">
                <span class="success-flag">${langConfig.flag}</span>
                <div class="success-text-content">
                    <span class="success-name">${langConfig.name}</span>
                    <span class="success-desc">번역이 완료되었습니다</span>
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
            z-index: 10001;
            opacity: 0;
            transform: translateX(100%);
            animation: slideInRightSuccess 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            min-width: 200px;
        `;

        document.body.appendChild(message);

        setTimeout(() => {
            message.style.animation = 'slideInRightSuccess 0.5s ease reverse';
            setTimeout(() => {
                if (message.parentNode) {
                    message.remove();
                }
            }, 500);
        }, 3000);
    }

    addLanguageStyles() {
        if (document.querySelector('#language-selector-styles')) return;

        const style = document.createElement('style');
        style.id = 'language-selector-styles';
        style.innerHTML = `
            @keyframes slideInRightSuccess {
                to { opacity: 1; transform: translateX(0); }
            }
            
            .success-content {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            
            .success-flag {
                font-size: 1.5rem;
            }
            
            .success-text-content {
                display: flex;
                flex-direction: column;
                flex: 1;
            }
            
            .success-name {
                font-weight: bold;
                color: #FFD700;
                font-size: 0.9rem;
                margin-bottom: 0.2rem;
            }
            
            .success-desc {
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
            }
            
            @keyframes fadeInTooltip {
                from { opacity: 0; transform: translate(-50%, 10px); }
                to { opacity: 1; transform: translate(-50%, 0); }
            }
            
            .tooltip-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .tooltip-flag {
                font-size: 1rem;
            }
            
            .tooltip-name {
                font-weight: 500;
            }

            .lang-btn {
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            }

            .lang-btn:hover {
                transform: translateY(-2px) scale(1.05) !important;
                box-shadow: 0 8px 20px rgba(255, 215, 0, 0.3) !important;
            }

            .lang-btn.active {
                box-shadow: 0 0 20px rgba(255, 215, 0, 0.5) !important;
                transform: scale(1.1) !important;
            }
        `;
        document.head.appendChild(style);
    }

    loadSavedLanguage() {
        const savedLang = localStorage.getItem('selectedLanguage') || 'ko';
        const langButtons = document.querySelectorAll('.lang-btn');
        
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

        this.translationService.currentLanguage = savedLang;
    }
}

// ===== 전역 변수 =====
let translationService;
let languageSelector;

// ===== 초기화 =====
function initTranslationSystem() {
    console.log('번역 시스템 초기화 중...');
    
    translationService = new TranslationService();
    languageSelector = new LanguageSelector(translationService);
    
    // 페이지 로드 완료 후 원본 텍스트 저장
    setTimeout(() => {
        translationService.saveOriginalTexts();
        console.log('번역 시스템 준비 완료');
        
        // 저장된 언어가 한국어가 아니면 자동 번역
        const savedLang = localStorage.getItem('selectedLanguage');
        if (savedLang && savedLang !== 'ko') {
            setTimeout(() => {
                translationService.translatePage(savedLang);
            }, 1000);
        }
    }, 1000);
}

// DOM 로드 완료 시 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTranslationSystem);
} else {
    initTranslationSystem();
}

// 번역 이벤트 리스너
document.addEventListener('translationStart', (e) => {
    console.log(`번역 시작: ${e.detail.language}`);
});

document.addEventListener('translationComplete', (e) => {
    console.log(`번역 완료: ${e.detail.language}`);
});

document.addEventListener('translationError', (e) => {
    console.error(`번역 오류: ${e.detail.language}`);
});

// 전역 접근을 위한 window 객체에 할당
window.translationService = translationService;
window.languageSelector = languageSelector;
window.TRANSLATION_CONFIG = TRANSLATION_CONFIG;