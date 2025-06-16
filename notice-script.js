// ===== NOTICE BOARD JAVASCRIPT =====

// ===== 공지사항 데이터 =====
const noticeData = {
    1: {
        title: "2025년 설 연휴 배송 및 고객센터 운영 안내",
        author: "관리자",
        date: "2025-01-15",
        views: 1234,
        content: `
            <h3>🎊 2025년 설 연휴 배송 및 고객센터 운영 안내</h3>
            <br>
            <p>안녕하세요. KOREVO입니다.</p>
            <p>다가오는 설 연휴에 따른 배송 및 고객센터 운영 일정을 안내드립니다.</p>
            <br>
            <h4>📦 배송 안내</h4>
            <ul>
                <li><strong>주문 마감:</strong> 2025년 1월 27일(월) 오후 2시</li>
                <li><strong>배송 중단:</strong> 2025년 1월 28일(화) ~ 2월 2일(일)</li>
                <li><strong>배송 재개:</strong> 2025년 2월 3일(월)부터 순차 배송</li>
            </ul>
            <br>
            <h4>☎️ 고객센터 운영</h4>
            <ul>
                <li><strong>운영 중단:</strong> 2025년 1월 29일(수) ~ 2월 1일(토)</li>
                <li><strong>운영 재개:</strong> 2025년 2월 3일(월) 오전 9시</li>
                <li><strong>긴급 문의:</strong> 온라인 문의게시판 또는 이메일 이용</li>
            </ul>
            <br>
            <div style="background: #fff8dc; padding: 1rem; border-radius: 8px; border-left: 4px solid #FFD700;">
                <p><strong>💡 참고사항</strong></p>
                <p>연휴 기간 중 주문하신 상품은 2월 3일(월)부터 순차적으로 배송됩니다. 급하신 주문은 1월 27일 오후 2시 이전에 완료해 주시기 바랍니다.</p>
            </div>
            <br>
            <p>고객 여러분의 양해를 부탁드리며, 건강하고 행복한 설 연휴 보내시기 바랍니다.</p>
            <br>
            <p>감사합니다.</p>
            <p><strong>KOREVO 드림</strong></p>
        `
    },
    2: {
        title: "온유 신제품 출시 기념 할인 이벤트 안내",
        author: "마케팅팀",
        date: "2025-01-14",
        views: 987,
        content: `
            <h3>🎉 온유 신제품 출시 기념 할인 이벤트</h3>
            <br>
            <p>온유(溫鍮) 브랜드의 새로운 제품 출시를 기념하여 특별 할인 이벤트를 진행합니다!</p>
            <br>
            <h4>🆕 신제품 소개</h4>
            <ul>
                <li><strong>온유 프리미엄 괄사 세트</strong> - AI 맞춤 설계</li>
                <li><strong>온열 기능 업그레이드 모델</strong> - 더욱 정밀한 온도 조절</li>
                <li><strong>휴대용 미니 괄사</strong> - 언제 어디서나 간편하게</li>
            </ul>
            <br>
            <h4>💰 할인 혜택</h4>
            <ul>
                <li><strong>신제품 전체 20% 할인</strong></li>
                <li><strong>2개 이상 구매 시 추가 10% 할인</strong></li>
                <li><strong>무료 배송</strong> (5만원 이상 구매 시)</li>
                <li><strong>선착순 100명 한정 선물</strong> - 온유 전용 파우치</li>
            </ul>
            <br>
            <h4>📅 이벤트 기간</h4>
            <p>2025년 1월 15일(수) ~ 1월 31일(금) 23:59까지</p>
            <br>
            <div style="text-align: center; background: linear-gradient(135deg, #FFD700, #FFA500); padding: 1.5rem; border-radius: 12px; color: white;">
                <h4 style="margin-bottom: 0.5rem;">지금 바로 주문하세요!</h4>
                <p>할인 코드: <strong>ONYU2025</strong></p>
            </div>
        `
    },
    3: {
        title: "쇼핑몰 시스템 점검 안내 (1/20 02:00~06:00)",
        author: "기술팀",
        date: "2025-01-13",
        views: 456,
        content: `
            <h3>🔧 쇼핑몰 시스템 점검 안내</h3>
            <br>
            <p>서비스 품질 향상을 위한 시스템 점검을 실시합니다.</p>
            <br>
            <h4>📅 점검 일정</h4>
            <ul>
                <li><strong>일시:</strong> 2025년 1월 20일(월) 02:00 ~ 06:00 (4시간)</li>
                <li><strong>대상:</strong> 온라인 쇼핑몰 전체</li>
            </ul>
            <br>
            <h4>🚫 점검 중 이용 불가 서비스</h4>
            <ul>
                <li>상품 주문 및 결제</li>
                <li>회원가입 및 로그인</li>
                <li>장바구니 및 위시리스트</li>
                <li>고객센터 채팅 상담</li>
            </ul>
            <br>
            <h4>✅ 점검 후 개선사항</h4>
            <ul>
                <li>페이지 로딩 속도 30% 개선</li>
                <li>모바일 사용성 향상</li>
                <li>결제 시스템 안정성 강화</li>
                <li>새로운 검색 필터 기능 추가</li>
            </ul>
            <br>
            <p>점검 시간 중 불편을 드려 죄송합니다. 더 나은 서비스로 보답하겠습니다.</p>
        `
    },
    4: {
        title: "맞춤 제작 서비스 이용 가이드 업데이트",
        author: "고객서비스팀",
        date: "2025-01-12",
        views: 678,
        content: `
            <h3>📦 맞춤 제작 서비스 이용 가이드</h3>
            <br>
            <p>고객 여러분의 편의를 위해 맞춤 제작 서비스 가이드를 업데이트했습니다.</p>
            <br>
            <h4>📱 AI 분석 프로세스</h4>
            <ul>
                <li><strong>1단계:</strong> 스마트폰 앱 다운로드</li>
                <li><strong>2단계:</strong> 얼굴 촬영 (정면, 측면)</li>
                <li><strong>3단계:</strong> AI 분석 결과 확인</li>
                <li><strong>4단계:</strong> 맞춤 디자인 선택</li>
            </ul>
            <br>
            <h4>⏱️ 제작 기간</h4>
            <ul>
                <li><strong>AI 분석:</strong> 즉시</li>
                <li><strong>디자인 확정:</strong> 1-2일</li>
                <li><strong>제작 기간:</strong> 7-10일</li>
                <li><strong>배송:</strong> 2-3일</li>
            </ul>
            <br>
            <p>자세한 내용은 고객센터로 문의해 주세요.</p>
        `
    },
    5: {
        title: "배송비 정책 변경 안내",
        author: "물류팀",
        date: "2025-01-11",
        views: 1567,
        content: `
            <h3>🚚 배송비 정책 변경 안내</h3>
            <br>
            <p>2025년 2월 1일부터 배송비 정책이 일부 변경됩니다.</p>
            <br>
            <h4>📋 변경 내용</h4>
            <ul>
                <li><strong>무료배송 기준:</strong> 3만원 → 5만원</li>
                <li><strong>일반 배송비:</strong> 2,500원 → 3,000원</li>
                <li><strong>제주/도서지역:</strong> 3,000원 → 5,000원</li>
            </ul>
            <br>
            <h4>💡 변경 사유</h4>
            <p>택배비 인상 및 포장재 비용 상승으로 인한 불가피한 조치입니다.</p>
            <br>
            <p>고객 여러분의 양해 부탁드립니다.</p>
        `
    }
};

// ===== 공지사항 열기 =====
function openNotice(noticeId) {
    const notice = noticeData[noticeId];
    if (!notice) {
        console.warn(`Notice ID ${noticeId} not found`);
        return;
    }

    // 모달 내용 업데이트
    document.getElementById('modalTitle').textContent = notice.title;
    document.getElementById('modalDate').textContent = notice.date;
    document.getElementById('modalAuthor').textContent = notice.author;
    document.getElementById('modalViews').textContent = notice.views.toLocaleString();
    document.getElementById('modalContent').innerHTML = notice.content;

    // 모달 표시
    const modal = document.getElementById('noticeModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // 조회수 증가
    notice.views++;
    updateNoticeViews(noticeId, notice.views);

    // 모달 열림 애니메이션
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.transform = 'translateY(0) scale(1)';
    });
}

// ===== 모달 닫기 =====
function closeModal() {
    const modal = document.getElementById('noticeModal');
    
    // 닫힘 애니메이션
    modal.style.opacity = '0';
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.transform = 'translateY(-20px) scale(0.95)';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

// ===== 조회수 업데이트 =====
function updateNoticeViews(noticeId, newViews) {
    const noticeItems = document.querySelectorAll('.notice-item');
    noticeItems.forEach((item, index) => {
        if (index + 1 === noticeId) {
            const viewsElement = item.querySelector('.notice-views span:last-child');
            if (viewsElement) {
                viewsElement.textContent = newViews.toLocaleString();
            }
        }
    });
}

// ===== 검색 기능 =====
function searchNotices() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const noticeItems = document.querySelectorAll('.notice-item');
    let visibleCount = 0;

    noticeItems.forEach(item => {
        const title = item.querySelector('.notice-title').textContent.toLowerCase();
        const author = item.querySelector('.notice-author').textContent.toLowerCase();
        const category = item.querySelector('.notice-category').textContent.toLowerCase();
        
        const isMatch = title.includes(searchTerm) || 
                       author.includes(searchTerm) || 
                       category.includes(searchTerm);
        
        if (isMatch || searchTerm === '') {
            item.style.display = 'grid';
            visibleCount++;
            
            // 검색어 하이라이트
            if (searchTerm !== '') {
                highlightSearchTerm(item, searchTerm);
            } else {
                removeHighlight(item);
            }
        } else {
            item.style.display = 'none';
        }
    });

    updateStats(visibleCount);
    
    // 검색 결과 메시지
    showSearchResult(searchTerm, visibleCount);
}

// ===== 검색어 하이라이트 =====
function highlightSearchTerm(item, searchTerm) {
    const titleElement = item.querySelector('.notice-title span:last-child');
    if (titleElement) {
        const originalText = titleElement.textContent;
        const highlightedText = originalText.replace(
            new RegExp(`(${searchTerm})`, 'gi'),
            '<span class="search-highlight">$1</span>'
        );
        titleElement.innerHTML = highlightedText;
    }
}

// ===== 하이라이트 제거 =====
function removeHighlight(item) {
    const titleElement = item.querySelector('.notice-title span:last-child');
    if (titleElement) {
        titleElement.innerHTML = titleElement.textContent;
    }
}

// ===== 검색 결과 메시지 =====
function showSearchResult(searchTerm, count) {
    const existingMessage = document.querySelector('.search-result-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    if (searchTerm !== '') {
        const message = document.createElement('div');
        message.className = 'search-result-message';
        message.style.cssText = `
            padding: 1rem;
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(44, 85, 48, 0.1));
            border: 1px solid rgba(255, 215, 0, 0.3);
            border-radius: 12px;
            margin-bottom: 1rem;
            text-align: center;
            color: #2c5530;
            font-weight: 500;
        `;
        
        message.innerHTML = `
            🔍 "<strong>${searchTerm}</strong>" 검색 결과: <strong>${count}</strong>개의 공지사항을 찾았습니다.
        `;
        
        const noticeList = document.querySelector('.notice-list');
        noticeList.parentNode.insertBefore(message, noticeList);
    }
}

// ===== 카테고리 필터 =====
function filterNotices() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const noticeItems = document.querySelectorAll('.notice-item');
    let visibleCount = 0;

    noticeItems.forEach(item => {
        const category = item.querySelector('.notice-category');
        if (!category) return;

        const categoryClass = Array.from(category.classList).find(cls => 
            ['general', 'important', 'event', 'system'].includes(cls)
        );

        if (selectedCategory === 'all' || categoryClass === selectedCategory) {
            item.style.display = 'grid';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });

    updateStats(visibleCount);
    
    // 필터 결과 메시지
    showFilterResult(selectedCategory, visibleCount);
}

// ===== 필터 결과 메시지 =====
function showFilterResult(category, count) {
    const existingMessage = document.querySelector('.filter-result-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    if (category !== 'all') {
        const categoryNames = {
            'general': '일반',
            'important': '중요',
            'event': '이벤트',
            'system': '시스템'
        };

        const message = document.createElement('div');
        message.className = 'filter-result-message';
        message.style.cssText = `
            padding: 1rem;
            background: linear-gradient(135deg, rgba(44, 85, 48, 0.1), rgba(255, 215, 0, 0.1));
            border: 1px solid rgba(44, 85, 48, 0.3);
            border-radius: 12px;
            margin-bottom: 1rem;
            text-align: center;
            color: #2c5530;
            font-weight: 500;
        `;
        
        message.innerHTML = `
            📂 "<strong>${categoryNames[category]}</strong>" 카테고리: <strong>${count}</strong>개의 공지사항
        `;
        
        const noticeList = document.querySelector('.notice-list');
        noticeList.parentNode.insertBefore(message, noticeList);
    }
}

// ===== 통계 업데이트 =====
function updateStats(customCount = null) {
    let visibleCount;
    
    if (customCount !== null) {
        visibleCount = customCount;
    } else {
        const visibleItems = document.querySelectorAll('.notice-item[style*="grid"], .notice-item:not([style*="none"])');
        visibleCount = visibleItems.length;
    }
    
    const totalElement = document.getElementById('totalCount');
    if (totalElement) {
        totalElement.textContent = visibleCount;
    }
}

// ===== 보기 모드 변경 =====
function setViewMode(mode) {
    const viewButtons = document.querySelectorAll('.view-btn');
    const noticeList = document.getElementById('noticeList');

    // 버튼 상태 업데이트
    viewButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (mode === 'card') {
        // 카드 뷰 스타일 적용
        noticeList.style.display = 'grid';
        noticeList.style.gridTemplateColumns = 'repeat(auto-fit, minmax(350px, 1fr))';
        noticeList.style.gap = '1.5rem';
        
        const header = noticeList.querySelector('.notice-header');
        if (header) header.style.display = 'none';
        
        const items = noticeList.querySelectorAll('.notice-item');
        items.forEach(item => {
            item.style.display = 'block';
            item.style.padding = '1.5rem';
            item.style.borderRadius = '12px';
            item.style.background = 'white';
            item.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            item.style.border = '1px solid #f0f0f0';
        });
    } else {
        // 리스트 뷰 스타일 복원
        noticeList.style.display = 'block';
        noticeList.style.gridTemplateColumns = '';
        noticeList.style.gap = '';
        
        const header = noticeList.querySelector('.notice-header');
        if (header) header.style.display = 'grid';
        
        const items = noticeList.querySelectorAll('.notice-item');
        items.forEach(item => {
            item.style.display = 'grid';
            item.style.padding = '1.5rem 2rem';
            item.style.borderRadius = '';
            item.style.background = '';
            item.style.boxShadow = '';
            item.style.border = '';
        });
    }
}

// ===== 글쓰기 모달 =====
function showWriteModal() {
    const modal = document.createElement('div');
    modal.className = 'write-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>✏️ 새 공지사항 작성</h3>
                <button class="modal-close" onclick="closeWriteModal()">&times;</button>
            </div>
            <div class="modal-body">
                <p>🔒 관리자만 공지사항을 작성할 수 있습니다.</p>
                <p>문의사항이 있으시면 고객센터를 이용해 주세요.</p>
                <div style="margin-top: 2rem; text-align: center;">
                    <button onclick="closeWriteModal()" style="padding: 0.75rem 2rem; background: #2c5530; color: white; border: none; border-radius: 25px; cursor: pointer;">확인</button>
                </div>
            </div>
        </div>
    `;

    modal.style.cssText = `
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
        z-index: 10001;
        padding: 2rem;
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

// ===== 글쓰기 모달 닫기 =====
function closeWriteModal() {
    const modal = document.querySelector('.write-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// ===== 맨 위로 스크롤 =====
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== 준비 중 페이지 알림 =====
function showUnderConstruction() {
    const modal = document.createElement('div');
    modal.className = 'construction-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>🚧 페이지 준비 중</h3>
                <button class="modal-close" onclick="closeConstructionModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div style="text-align: center; font-size: 4rem; margin-bottom: 1rem;">🏗️</div>
                <p>해당 페이지는 현재 준비 중입니다.</p>
                <p>빠른 시일 내에 서비스를 제공하겠습니다.</p>
                <div style="margin-top: 2rem; text-align: center;">
                    <button onclick="closeConstructionModal()" style="padding: 0.75rem 2rem; background: #FFD700; color: #2c5530; border: none; border-radius: 25px; cursor: pointer; font-weight: 600;">확인</button>
                </div>
            </div>
        </div>
    `;

    modal.style.cssText = `
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
        z-index: 10001;
        padding: 2rem;
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

// ===== 준비 중 모달 닫기 =====
function closeConstructionModal() {
    const modal = document.querySelector('.construction-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// ===== 모바일 메뉴 토글 =====
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// ===== 초기화 함수 =====
function initNoticeBoard() {
    // 검색 입력창에 포커스
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.focus();
    }
    
    // 애니메이션 지연 설정
    const noticeItems = document.querySelectorAll('.notice-item');
    noticeItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // 초기 통계 설정
    updateStats();

    console.log('공지사항 게시판 초기화 완료');
}

// ===== 키보드 이벤트 핸들러 =====
function handleKeyboardEvents() {
    document.addEventListener('keydown', function(e) {
        // ESC 키로 모달 닫기
        if (e.key === 'Escape') {
            closeModal();
            closeWriteModal();
            closeConstructionModal();
        }
        
        // Enter 키로 검색
        if (e.key === 'Enter' && e.target.id === 'searchInput') {
            e.preventDefault();
            searchNotices();
        }

        // Ctrl+F로 검색창 포커스
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
    });
}

// ===== 모달 외부 클릭 이벤트 =====
function handleModalOutsideClick() {
    document.addEventListener('click', function(e) {
        // 공지사항 상세 모달
        const noticeModal = document.getElementById('noticeModal');
        if (noticeModal && e.target === noticeModal) {
            closeModal();
        }

        // 글쓰기 모달
        const writeModal = document.querySelector('.write-modal');
        if (writeModal && e.target === writeModal) {
            closeWriteModal();
        }

        // 준비 중 모달
        const constructionModal = document.querySelector('.construction-modal');
        if (constructionModal && e.target === constructionModal) {
            closeConstructionModal();
        }
    });
}

// ===== 스크롤 이벤트 핸들러 =====
function handleScrollEvents() {
    let ticking = false;
    
    function updateScrollElements() {
        const fab = document.querySelector('.fab');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (fab) {
            if (scrollTop > 300) {
                fab.style.opacity = '1';
                fab.style.transform = 'scale(1)';
                fab.style.pointerEvents = 'auto';
            } else {
                fab.style.opacity = '0.7';
                fab.style.transform = 'scale(0.8)';
                fab.style.pointerEvents = 'auto';
            }
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollElements);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// ===== 반응형 대응 =====
function handleResponsiveDesign() {
    function checkResponsive() {
        if (window.innerWidth <= 768) {
            // 모바일에서는 자동으로 카드 뷰 비활성화 (리스트 뷰가 더 적합)
            const listBtn = document.querySelector('.view-btn:first-child');
            if (listBtn && !listBtn.classList.contains('active')) {
                const viewButtons = document.querySelectorAll('.view-btn');
                viewButtons.forEach(btn => btn.classList.remove('active'));
                listBtn.classList.add('active');
                setViewMode('list');
            }
        }
    }
    
    window.addEventListener('resize', checkResponsive);
    checkResponsive(); // 초기 실행
}

// ===== 디바운스 유틸리티 =====
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

// ===== 실시간 검색 =====
function initRealTimeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const debouncedSearch = debounce(searchNotices, 300);
        searchInput.addEventListener('input', debouncedSearch);
    }
}

// ===== 페이지 로드 시 초기화 =====
document.addEventListener('DOMContentLoaded', function() {
    try {
        initNoticeBoard();
        handleKeyboardEvents();
        handleModalOutsideClick();
        handleScrollEvents();
        handleResponsiveDesign();
        initRealTimeSearch();
        
        console.log('공지사항 페이지 로드 완료');
    } catch (error) {
        console.error('공지사항 페이지 초기화 중 오류:', error);
    }
});

// ===== 오류 처리 =====
window.addEventListener('error', function(e) {
    console.error('공지사항 페이지 오류:', e.error);
});

// ===== 성능 모니터링 =====
window.addEventListener('load', function() {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        console.log('페이지 새로고침됨');
    }
    
    // 페이지 로드 시간 측정
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`페이지 로드 시간: ${loadTime}ms`);
});

// ===== 모듈 내보내기 (필요한 경우) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        openNotice,
        closeModal,
        searchNotices,
        filterNotices,
        setViewMode,
        scrollToTop
    };
}