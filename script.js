// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initNavigation();
    initScrollEffects();
    initSkillBars();
    initProjectModals();
    initContactForm(); // ahora con envío real
    initMobileMenu();
    initSmoothScrolling();
});


const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'RDXNBMIIxbZVCa8gh',
    SERVICE_ID: 'service_vfnlgl9',
    TEMPLATE_ID: 'template_p6uvgna',
    TO_EMAIL: 'sangaunkim1@gmail.com'
};

// Navegación y scroll effects
function initNavigation() {
    const nav = document.querySelector('.floating-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Efecto de transparencia en navegación al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.9)';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
        }

        // Actualizar enlace activo basado en la sección visible
        updateActiveNavLink(sections, navLinks);
    });

    // Click en enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Actualizar enlace activo de navegación
function updateActiveNavLink(sections, navLinks) {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Efectos de scroll y animaciones
function initScrollEffects() {
    // Intersection Observer para animaciones al entrar en vista
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animaciones específicas para diferentes elementos
                if (entry.target.classList.contains('about-card')) {
                    animateCard(entry.target);
                }
                if (entry.target.classList.contains('project-card')) {
                    animateProjectCard(entry.target);
                }
                if (entry.target.classList.contains('skill-category')) {
                    animateSkillCategory(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observar elementos que necesitan animación
    const elementsToAnimate = document.querySelectorAll('.about-card, .project-card, .skill-category, .contact-item');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Parallax effect para formas flotantes
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const rate = scrolled * -0.5 * (index + 1) * 0.1;
            shape.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    });
}

// Animaciones para cards
function animateCard(card) {
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    setTimeout(() => {
        card.style.transform = 'translateY(0) scale(1)';
    }, Math.random() * 200);
}

function animateProjectCard(card) {
    card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    setTimeout(() => {
        card.style.transform = 'translateY(0) rotateX(0)';
    }, Math.random() * 300);
}

function animateSkillCategory(category) {
    const skillBars = category.querySelectorAll('.skill-progress');
    setTimeout(() => {
        skillBars.forEach(bar => {
            const width = bar.dataset.width;
            bar.style.width = width + '%';
        });
    }, 200);
}

// Barras de habilidades animadas
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.dataset.width;
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Sistema de modales para proyectos
function initProjectModals() {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.querySelector('.close-modal');

    // Datos detallados de proyectos
    const projectDetails = {
      hospital: {
        title: "병원 재고 요청 자동화",
        description:
          '<div style="text-align: left; margin-top: 1rem;">동물병원 재고 요청과 내부 DB 간의 불일치 문제를 해결하기 위해, <strong>Six Sigma</strong> 기반의 프로세스 개선 프로젝트를 주도적으로 수행했습니다. <br><br> 문제 진단부터 사용자 인터뷰, <strong>GAS(Google Apps Script)</strong> 기반 추적 시스템 제안, 그리고 <strong>SPC</strong> 분석까지 엔드 투 엔드<strong>(End-to-End)</strong>로 실질적인 개선안을 설계하고 적용하였습니다.</div>',
        details: `
                <div class="modal-project-detail">
     
                    <h3>주요 작업 및 역할</h3>
                    <ul>
                        <li><strong>문제 정의 및 프로젝트 기획:</strong>
                            <ul>
                                <li>병원 재고 요청 과정에서 입력 누락, 기입 오류, 데이터 유실 등 반복적인 문제가 발생함을 파악하고, 이를 개선하기 위한 <strong>자동화 기반 재고관리 프로젝트</strong>를 주도적으로 기획하였습니다.</li>
                            </ul>
                        </li>
                        <li><strong>현황 분석 및 요구사항 도출:</strong>
                            <ul>
                                <li>업무 흐름을 <strong>SIPOC 모델</strong>에 따라 구조화하고, 현장 실무자 대상 <strong>인터뷰</strong>를 통해 실제 업무 환경에서의 <strong>병목 지점과 비효율 요소</strong>를 파악하였습니다.</li>
                            </ul>
                        </li>
                    </ul>

                    <img src="./static/sixgma1.webp" alt=" 병원 재고 자동화" style="width:100%;border-radius:12px;margin-bottom:1rem;" />
                 
                            <ul>
                                <li>특히, <strong>수기 입력 방식의 한계, 중복 요청 발생, 요청 상태 추적의 어려움</strong> 등이 주요 문제로 도출되었습니다.</li>
                            </ul>

                    <h3>자동화 시스템 설계 및 적용:</h3>
                        <ul>
                            <li> <strong>Google Apps Script</strong>를 활용하여, 재고 요청 내용이 <strong>Web App</strong>을 통해 자동 수집되고, <strong>Google Sheets</strong>에 실시간으로 정리되도록 시스템을 개발했습니다.</li>
                            <li> <strong>Figma</strong>를 활용해 사용자 요청 흐름(UI)을 시각화하여, 정보 입력 과정에서 혼란이 없도록 구조적 설계를 병행했습니다.</li>
                        </ul>

                     <img src="./static/sixgma2.png" alt="병원 재고 자동화" style="width:100%;border-radius:12px;margin-bottom:1rem;" />

                        <ul>
                            <li>데이터는 자동으로 <strong>날짜·항목·장소별</strong>로 분류되어, 재고 요청 흐름을 <strong>시간 순</strong>으로 추적할 수 있도록 설계하였습니다.</li>
                        </ul>
                    <img src="./static/sixgma3.webp" alt="병원 재고 자동화" style="width:100%;border-radius:12px;margin-bottom:1rem;" />

                    <h3>사용자 중심 설계 및 테스트:</h3>
                        <ul>
                            <li>1개월 간의 테스트 결과, 업무 담당자가 입력한 내용이 누락 없이 저장되었고, 관리자는 요청 이력을 한눈에 파악할 수 있었습니다. </li>
                            <li>이를 통해 프로젝트의 KPI 중 하나였던 오류율이 약 6%p 감소하며, <strong>약 20%</strong> 수준의 상대적 개선 효과가 나타났습니다.</li>
                            <li>Figma 기반 프로토타입 설계를 통해 사용자의 실제 업무 플로우와 일치하는 입력 구조를 구현하였고, 이를 팀원 및 이해관계자에게 공유하여 빠른 피드백 사이클을 가능케 했습니다.
                        </ul>

                    <img src="./static/sixgma4.webp" alt="병원 재고 자동화" style="width:100%;border-radius:12px;margin-bottom:1rem;" />

                    <h3>프로젝트 운영 및 협업:</h3>
                        <ul>
                            <li><strong>Milestone 기반 일정 관리</strong>와 주기적인 공유 회의를 통해 팀 내 협업 체계를 정비하였습니다.</li>
                        </ul>

                    <img src="./static/sixgma5.webp" alt="병원 재고 자동화" style="width:100%;border-radius:12px;margin-bottom:1rem;" />
                    <img src="./static/sixgma6.webp" alt="병원 재고 자동화" style="width:100%;border-radius:12px;margin-bottom:1rem;" />
                    <ul>
                        <li>PM 관점에서 <strong>업무 정렬과 우선순위 조율, 업데이트 주기 관리, 팀원 피드백 반영</strong>을 주도하였습니다.</li>
                    </ul>

                    <h3>개선 전후 프로세스 비교 (BPM):</h3>
                    <img src="./static/sixgma.webp" alt="병원 재고 자동화" style="width:100%;border-radius:12px;margin-bottom:1rem;" />
                    <ul>
                        <li>개선 전 수작업 흐름과 개선 후 Google 연동 자동화 구조를 BPM으로 시각화하여, 병목 구간과 자동화 흐름의 차이를 명확히 드러냈습니다.</li>
                    </ul>

                    <h3>사용 기술 및 도구</h3>
                    <ul>
                        <li><strong>OneDrive 기반 공동 편집</strong>: 팀원 간 실시간 문서 협업 및 피드백 관리</li>
                        <li><strong>Google GAS Web App</strong>: 사용자 입력 기반 재고 요청 시스템 구축 및 자동화</li>
                        <li><strong>SPC Chart (Statistical Process Control)</strong>: 입력 오류율 등 품질 지표의 변화 시각화 및 분석</li>
                    </ul>

                    <h3>인사이트 도출</h3>
                    <ul>
                        <li><strong>정성 기반 인사이트</strong>
                            <ul>
                                <li>기존 수작업 기반 입력 재고 요청 방식은 <strong>반복적 실수</strong>나 <strong>누락 발생</strong> 가능성이 높아, <strong>재고 흐름을 실시간으로 파악</strong>하거나 <strong>수요를 정확히 예측</strong>하기에 어려움이 있었습니다.</li>
                                <li>자동화된 시스템 도입 이후에는, <strong>입력 데이터가 자동으로 항목별·장소별로 분류</strong>되며 시각화되어, 관리자 입장에서도 <strong>수요 추이 및 재고 보충 주기를 보다 명확하게 파악</strong>할 수 있게 되었습니다. 또한 <strong>출고-소진 간 gap이 커지는 것을 방지할 수 있는 기반을 마련</strong>했습니다.</li>
                                <li>특히 본 프로젝트는 <strong>Google Apps Script</strong> 기반으로 구현되었으며, <strong>PM</strong> 입장에서 <strong>실제 사용자의 요구</strong>를 기술적으로 연결해 실행한 사례로서도 의미가 큽니다.</li>
                            </ul>
                        </li>

                        <li><strong>기술적 한계 및 의사결정 배경</strong>
                            <ul>
                                <li>초기에는 동물병원 <strong>내부 IT 부서와의 협업</strong>을 통해, 재고 관리 데이터베이스와의 <strong>API 연동</strong>을 검토했습니다.</li>
                                <li>그러나 내부 보안 정책상 외부 스크립트 접근이 제한되어 해당 방식은 도입이 어렵다는 회신을 받았고, 이로 인해 <strong>기술적 협업의 현실적인 장벽</strong>을 마주하게 되었습니다.</li>
                                <li>이에 따라, 외부 서버나 클라우드 DB 없이도 빠르게 배포 가능하고 보안 리스크가 적은 솔루션이 필요했고, 한정된 리소스 내에서 Google Apps Script를 활용한 클라이언트 중심 자동화 시스템을 구현하게 되었습니다.</li>
                                <li>결과적으로, <strong>도입과 운영 비용을 최소화</strong>하면서도 실제 업무 흐름에 적용 가능한 시스템을 구현할 수 있었으며, 의사결정 과정에서의 <strong>기술적 현실과 사용자 환경</strong>을 종합적으로 고려했다는 점에서 의미 있는 경험이 되었습니다.</li>
                                <li>그러나 내부 IT 부서와의 API 연동 시도가 보안 정책상 거절된 사례를 통해, <strong>기술 협업의 장벽과 SaaS 기반 자동화 구현 시 고려해야 할 보안 및 인프라 요건</strong>에 대해 구체적으로 체감할 수 있었습니다. </li>
                                <li>따라서 이 경험을 통해 유사한 프로젝트를 기획하거나 사전 커뮤니케이션 전략을 수립할 때 유의해야 할 점들을 미리 배울 수 있었습니다</li>
                            </ul>
                        </li>

                    </ul>

                    <a href="https://script.google.com/macros/s/AKfycbxvFa1OWCf41WeabD4g6-iTVP7acxA0mAFQnMeHnFalXvublsW4U0ln8yZP9krje5Cmsg/exec" target="_blank" style="color:var(--primary-purple);font-weight:500; text-decoration: none;">
                        <h3>🔗 GAS Web App에서 열람</h3>
                    </a>
                    <a href="https://docs.google.com/spreadsheets/d/1KGbFoDs84DnIDngsXaD-C7qpBlM97vy4ThlcIukmFjY/edit?gid=1810104433#gid=1810104433" target="_blank" style="color:var(--primary-purple);font-weight:500; text-decoration: none;">
                        <h3>🔗 Google Sheets에서 열람</h3>
                    </a>
                </div>
            `,
      },
      spotify: {
        title: "Spotify UX 테스트",
        description:
          '<div style="text-align: left; margin-top: 1rem;">5명의 Spotify 고급 사용자를 대상으로 사용성 테스트를 설계·실행하여, Android 환경에서의 플레이리스트 생성 가이드라인이 실제로 얼마나 효과적인지, 정량적 지표와 정성적 반응을 통해 분석했습니다.<br><br>단순한 문서 평가에 그치지 않고, 테스트 중 사용자들이 겪는 혼란과 행동 패턴을 바탕으로 Spotify 인터페이스 전반의 UX 문제까지 도출했습니다.<br><br>사용자 행동 데이터를 기반으로 사용성 문제를 진단하고, 스크린샷 추가, 용어 정리 등 구체적인 개선안을 제안한 후 재테스트를 통해 30%의 시간 단축을 확보했습니다.</div>',
        details: `
                <div class="modal-project-detail">
                    <h3> 주요 작업 및 역할</h3>
                        <ul>
                            <li><strong>사용성 테스트 설계 및 실행:</strong>
                                <ul>
                                    <li>18–25세 Android Spotify 고급 사용자 5명을 대상으로, Spotify Wrapped (연말 결산) / AI 추천 / Daylist (데이리스트) / 필터 / Collaborative Playlist (협업 플레이리스트) / 자동 재생과 같이 6단계 개인화 흐름에 대해 인지·행동 기반 테스트를 설계하고 실행했습니다. 사용자 반응을 녹화하고, 이해도·유용함·확신 정도(Clarity / Usefulness / Confidence) 등 정량 데이터를 수집했습니다.</li>
                                </ul>
                            </li>
                            <li><strong>정성적 관찰 및 문제 도출:</strong>
                                <ul>
                                    <li>Think-Aloud 프로토콜을 활용해 실시간 혼란 지점 및 행동 흐름을 관찰하고, 총 17건의 에러를 분석했습니다. 특히, Task 1 (Spotify Wrapped 찾기), Task 3 (Daylist 오해), Task 5 (Request Collaboration 탐색 실패)에서 UX 설계에 따른 인지적 혼란이 반복됨을 확인했습니다.</li>
                                </ul>
                            </li>
                            <li><strong>UX 인사이트 확장 도출:</strong>
                                <ul>
                                    <li>테스트는 문서의 명확성 검증이 목적이었지만, 그 과정에서 Spotify 인터페이스 자체의 구조적 문제가 반복적으로 드러났습니다</li>   
                                    <li> <strong>예:</strong>
                                        <ul>
                                            <li>Wrapped (연말 결산)와 Daylist (데이리스트)와 같은 기능은 앱 내에서 잘 드러나 있지 않아 사용자 스스로 발견하기 어려웠습니다.</li>
                                            <li>Collaborative Playlist (협업 플레이리스트)는 기능 명칭 자체가 명확하지 않아 오해를 유발했습니다.</li>
                                            <li><strong>결론</strong>: 명확한 가이드가 있어도 UX가 비직관적이면 사용자 혼란은 해결되지 않습니다.<br>따라서, 기획자는 문서가 아닌 제품 자체의 정보 구조를 우선 고려해야 한다는 인사이트를 확보했습니다.</li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li><strong>구체적 개선안 설계 및 검증 계획 제안:</strong>
                                <ul>
                                    <li>
                                        스크린샷 추가, 용어 설명 및 강조를 통해 30% 완료시간 단축 효과를 도출했습니다.
                                        <ul>
                                            <li>기존 가이드라인 대비 탐색 시간 분석을 통해 스크린샷과 용어 설명이 사용자 혼란을 줄여 완료 시간을 단축시킬 수 있음을 확인했습니다.</li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li><strong>협업 및 리더십 경험</strong>
                                <ul>
                                    <li>Biology (생물학), Computer Engineering (컴퓨터공학) , Computer Information and Technology (컴퓨터정보기술) 전공의 팀원들과 함께 정성·정량 데이터를 분석하고, 최종 개선안 도출을 주도했습니다.</li>
                                    <li>저는 테스트 시나리오 설계, 사용자 행동 분석, 개선안 제안 및 보고서 구조화 작업을 총괄적으로 주도했습니다.</li>
                                    <ul>
                                        <li>특히, 정성 데이터(행동 중 발화, 혼란 반응 등) 분석과 이를 UX 이슈로 연결하는 과정,<br> 그리고 결과를 논리적 구조로 정리해 개선안 도출까지 이끄는 문서화 작업을 중심적으로 맡아 팀 내 핵심 기획 역할을 수행했습니다.</li>
                                    </ul>
                                </ul>
                            </li>
                        </ul>
                    
                     <h3>개선 전후 사용자 플로우 비교</h3>

                    <ul>
                        <li><strong>개선 전</strong>:
                            <ul>
                                <li>기존 가이드라인은 설명이 텍스트 위주로 구성되어 있어, 사용자들이 핵심 지시사항을 빠르게 파악하기 어려웠습니다.</li>
                                <li>특히, ‘Daylist (데이리스트)’나 ‘Request Collaboration (콜라보레이션 요청)’과 같이 Spotify 내에서 잘 드러나지 않는 기능들은 <strong>용어</strong>나 <strong>위치</strong> 자체가 <strong>익숙하지 않아</strong>, 기능을 찾는 데 <strong>혼란</strong>을 겪거나 <strong>여러 번 반복 탐색</strong>을 시도하는 경우가 많았습니다.</li>
                            </ul>
                        </li>
                        <li><strong>개선 후</strong>:
                            <ul>
                                <li>단계별 스크린샷과 핵심 지시사항을 시각적으로 구분하여 제공함으로써, 사용자가 지금 무엇을 해야 하는지, 어디를 찾아야 하는지를 보다 쉽게 이해할 수 있도록 구성했습니다.</li>
                                <li>또한, 생소한 용어에는 간단한 설명을 함께 제공하고, 디바이스 환경 (모바일 Android)도 명확히 안내하여 사용 흐름의 직관성을 높였습니다.</li>
                                <li>이러한 개선을 통해 <strong>30% 완료시간 단축</strong>과 함께, 감소한 사용자의 불확실성과 반복 탐색으로 전반적인 사용 효율성을 향상시킬 수 있음을 확인했습니다.</li>
                            </ul>
                        </li>
                    </ul>

                    <h3>사용 기술 및 도구</h3>

                    <ul>
                        <li><strong>OneDrive 기반 공동 편집</strong>: 팀원 간 실시간 문서 협업 및 피드백 관리
                            <ul>
                                <li><strong>Microsoft Excel</strong>: 태스크별 소요시간, 에러율 등 정량 데이터 수집 및 시각화</li>
                                <li><strong>Microsoft Word</strong>: 사용자 행동 기록 및 최종 보고서 구조화</li>
                            </ul>
                        </li>
                    </ul>

                    <h3>인사이트 도출</h3>

                    <ul>
                        <li>참가자 전원이 모든 과업을 성공적으로 완료하여 <strong>완료율</strong>은 <strong>100%</strong>를 기록했지만, <strong>평균 만족도</strong>는 <strong>3.8점</strong>에 머물렀습니다.</li>
                        <li>이는 사용자들이 기능을 수행하는 데에는 큰 문제가 없었지만, 과정 중 <strong>혼란</strong>이나 <strong>불확실성</strong>으로 인해 전반적인 사용자 경험이 <strong>저하</strong>되었음을 의미합니다.
                            <ul>
                                <li>특히 혼란이 반복적으로 발생한 지점은 <strong>앱 내에서 쉽게 탐색되지 않는 기능들</strong>이었으며, 이는 단순히 지침서의 명확성 문제가 아닌, <strong>Spotify 인터페이스 자체의 발견성(discoverability) 문제</strong>로 해석될 수 있었습니다.</li>
                            </ul>
                        </li>
                        <li>이러한 테스트 경험을 통해, <strong>문서를 명확하게 작성하는 것</strong>만으로는 사용자 경험을 온전히 개선하기 <strong>어렵다</strong>는 점을 인식하게 되었으며, PM은 <strong>콘텐츠 구조, 정보 탐색 흐름, 용어 설계</strong> 등 <strong>제품 전반의 UX 구조에 대한 이해와 설계 능력</strong>이 필요하다는 점을 깨달았습니다.</li>
                        <li>이 프로젝트를 통해, 가이드를 잘 써주는 것보다 <strong>가이드 없이도 자연스럽게 사용할 수 있는 환경을 만드는 것</strong>이 더 중요하다는 PM 관점을 확립하게 되었으며, 이는 곧 <strong>효과적인 온보딩 경험 설계의 핵심</strong>과도 맞닿아 있다는 점을 배울 수 있었습니다.</li>
                    </ul>
                        </div>  

                    <a href="https://drive.google.com/file/d/10bpgAxIYAbd85ERkgOLQe4NoW20Aa4ub/view" target="_blank" style="color:var(--primary-purple);font-weight:500; text-decoration: none;">
                        <h3>🔗 Usability Test Report에서 열람</h3>
                    </a>
            `,
      },
      uno: {
        title: "UNO 사용자 테스트 기반 개발",
        description: " <div style='text-align: left;'> 실제 사용자 플레이 데이터를 기반으로, Java 기반 UNO 게임의 초기 프로토타입을 기획·개발했습니다. <br><br>초기에는 턴 흐름과 반응성 등 핵심 기능만으로 구성된 최소 기능 버전을 구현하고, 3회 이상 반복 플레이테스트를 통해 사용자 혼란 요소(지연·이탈·순서 꼬임 등)를 확인한 후 UX 및 통신 구조를 중심으로 개선을 설계하였습니다. <br><br> 이 과정에서 PM 관점에서의 문제 정의, 기능 우선순위 설정, 피드백 수렴 및 리팩토링 사이클을 실제 경험할 수 있었습니다. </div>",
        details: `
                <div class="modal-project-detail">
                <h3>주요 작업 및 역할</h3>
                <ul>
                    <li>MVP 범위 정의 및 구조 설계:
                        <ul>
                            <li>턴 전환, 실시간 반응성, 게임 루프 등 <strong>핵심 기능에 집중하여 MVP 스코프를 설정</strong>하였으며, UML 다이어그램을 기반으로 시스템 구조를 설계하였습니다.</li>
                        </ul>
                    </li>
                </ul>

                <img src="./static/uno.webp" alt="병원 재고 자동화" style="width:100%;border-radius:12px;margin-bottom:1rem;" />
                <ul>
                    <ul>
                        <li>Java Socket을 활용하여 클라이언트-서버 간 통신 구조를 직접 구현하였습니다.</li>
                    </ul>
                </ul>
                <ul>
                    <li><strong>사용자 피드백 기반 기능 개선:</strong>
                        <ul>
                            <li>팀원 4명을 대상으로 총 3회에 걸친 플레이테스트를 진행하였고, 이를 통해 턴 흐름 인식 실패 및 대기 중 이탈과 같은 UX 저해 요소를 식별하였습니다.</li>
                            <li>사용자 행동 패턴 분석을 통해 카운트다운 타이머를 도입하고, 보다 직관적인 인터랙션 흐름으로 화면 전환을 개선하였습니다.</li>
                        </ul>
                    </li>
                    <li><strong>네트워크 예외처리 및 구조 개선:</strong>
                        <ul>
                            <li>실시간 게임 환경에서 발생할 수 있는 턴 중복, 순서 꼬임, 중도 이탈 등 3가지 주요 오류 시나리오를 체계적으로 분류하고, 이에 대한 예외 처리 로직을 구현하였습니다.</li>
                            <li>클라이언트-서버 간의 비동기 통신 병목 현상을 해소하기 위한 구조 최적화 작업도 함께 수행하였습니다.</li>
                        </ul>
                    </li>
                </ul>

                <h3>주요 작업 및 역할</h3>
                <ul>
                    <li>Java, Socket Programming</li>
                    <li>Java Swing (GUI), Event-driven Programming</li>
                </ul>

                <h3>인사이트 도출</h3>
                <ul>
                    <li>정량 기반 인사이트</li>
                    <ul>
                    <li>MVP 방식으로 핵심 기능(턴 전환, 실시간 반응성 등)에 집중한 결과, 4인 테스트 기준에서 플레이 완주율 100%, 턴 인식 실패율 0%로 UX 개선이 명확히 드러났습니다.</li>
                    <li>반복 테스트를 통해 턴 흐름 구조, 화면 전환 방식, 대기 시간 UX 등을 세밀하게 조정할 수 있었으며, 사용자의 몰입감 유지와 오류 경험 최소화에 기여했습니다.</li>
                    </ul> 
                </ul>

                <div style="text-align: center;">
                    <div style="position: relative; width: 100%; max-width: 560px; padding-bottom: 56.25%; height: 0; margin: 0 auto;">
                        <iframe 
                            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                            src="https://www.youtube.com/embed/5K3aRwGJhDA?controls=0&showinfo=0&rel=0&modestbranding=1"
                            title="YouTube video player" 
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>

                    <h3> 사용자 행동 기반 인사이트</h3>
                    <ul>
                        <li>실사용 시나리오에서 턴 중복, 순서 꼬임, 중도 이탈 등 세 가지 주요 오류 시나리오가 발견되었으며, 이는 사용자 몰입 저하의 핵심 원인으로 작용했습니다.</li>
                        <li>이를 바탕으로 예외 처리 구조를 리팩토링하고, 사용자 대기 시간을 시각적으로 안내하는 카운트다운 UX를 도입해 사용자 이탈을 유발할 수 있는 UX 리스크 요인을 최소화했습니다.</li>
                    </ul>

                    <h3> PM 관점에서의 학습</h3>
                    <ul>
                        <li>단순한 기능 구현을 넘어, UX 흐름을 사용자 시나리오 기반으로 설계하고 검증하는 과정의 중요성을 실감했습니다.</li>
                        <li>특히, 기능의 완성도보다 사용자 경험의 흐름을 우선시하고, 플레이 테스트 결과를 근거로 기능 수정 및 우선순위를 조정하는 사이클을 경험하며, 실질적인 PM 업무의 축소판을 수행해보았다고 생각합니다.</li>
                        <li>또한 MVP 구현 이후에는, 사용자별 게임 상태 저장을 위한 AWS 연동 및 다양한 유저를 고려한 다국어 지원 인터페이스 등 확장 방향성도 함께 구상하였습니다.
                            <ul>
                                <li>작은 규모의 프로젝트였지만, 이를 통해 사용자 요구 기반 기획 → MVP 개발 → 피드백 반영 → 향후 로드맵 설계까지 이어지는 전반적인 PM 사이클을 경험적으로 이해할 수 있었습니다.</li>
                            </ul>
                        </li>
                    </ul>

                    <a href="https://github.com/rachelsakim/cnit325_project" target="_blank" style="color:var(--primary-purple);font-weight:500; text-decoration: none;">
                        <h3>🔗 GitHub에서 열람</h3>
                    </a>
            `,
      },
      youtube: {
        title: "YouTube 트렌드 분석",
        description: '<div style="text-align: left; margin-top: 1rem;">YouTube 콘텐츠 트렌드를 실질적으로 반영할 수 있는 전략 수립을 목표로, 채널 메타데이터 및 댓글 데이터를 분석하였습니다.<br><br>업로드 타이밍, 언어 사용 패턴, 시청자 반응 표현 등을 정량 기반으로 파악하고, 이를 콘텐츠 기획에 반영 가능한 인사이트로 도출하는 전 과정을 주도했습니다.<br><br>SQL을 활용해 실시간 트렌드 흐름을 구조화하고, 사용자 피드백에서 의미 있는 메시지 패턴을 추출하였습니다.</div>',
        details: `
                <div class="modal-project-detail">
                    <h3>프로젝트 개요</h3>
                    <p>YouTube 콘텐츠 트렌드를 실질적으로 반영할 수 있는 전략 수립을 목표로 채널 메타데이터 및 댓글 데이터를 분석했습니다.</p>
                    <h3>주요 작업 및 역할</h3>
                    <ul>
                        <li>프로젝트 기획 및 분석 목표 설정</li>
                        <ul>
                            <li>YouTube 채널 데이터를 기반으로 <strong>콘텐츠 전략 수립</strong>을 목표로 분석 프로젝트를 설계하고 주도하였습니다.</li>
                            <li>팀이 설정한 분석 질문에 따라 <strong>SQL 기반 질의문</strong>을 직접 작성하여, 총 <strong>901개의 트렌딩 영상 데이터를 처리</strong>하였습니다.</li>
                        </ul>
                    </ul>
                    <ul>
                        <li><strong>데이터 분석 및 인사이트 도출</strong></li>
                        <ul>
                            <li><strong>트렌드 시차 분석</strong></li>
                            <ul>
                                <li>콘텐츠 업로드 이후 트렌딩까지 걸리는 <strong>시간 간격</strong>을 분석하여, <strong>노출 최적 시점</strong>에 대한 전략적 인사이트를 도출하였습니다.</li>
                            </ul>
                        </ul>
                    </ul>
                    <img src="./static/youtube1.webp" alt=" 병원 재고 자동화" style="width:100%;border-radius:12px;margin-bottom:1rem;" />
                    <ul>
                        <li><strong>댓글 반응 분석</strong></li>
                        <ul>
                            <li>전체 콘텐츠 중 <strong>사용 언어 분포</strong>를 집계하고, 각 언어가 <strong>트렌딩에 기여한 비율</strong>을 비교 분석하였습니다.</li>
                        </ul>
                    </ul>
                    <img src="./static/youtube2.webp" alt=" 병원 재고 자동화" style="width:100%;border-radius:12px;margin-bottom:1rem;" />
                    <ul>
                        <li><strong>언어별 트렌딩 비율 비교</strong></li>
                        <ul>
                            <li>댓글 중 <strong>좋아요 수가 많은 표현</strong>을 추출하고, 커뮤니티를 유도할 수 있는 <strong>언어 패턴</strong>을 도출하여, <strong>콘텐츠 메시지 설계 방향</strong>에 참고하였습니다.</li>
                        </ul>
                    </ul>
                    <img src="./static/youtube3.webp" alt=" 병원 재고 자동화" style="width:100%;border-radius:12px;margin-bottom:1rem;" />
                    <ul>
                        <li><strong>결과 정리 및 발표</strong></li>
                        <ul>
                            <li>도출한 분석 결과를 기반으로, <strong>전략적 개선 방향</strong>을 제시하였고, 이를 토대로 팀 내 <strong>의사결정 지원용 보고서 초안</strong>을 작성하였습니다.</li>
                            <li>최종 발표를 통해 팀원들과 <strong>분석 인사이트를 공유</strong>하며, 프로젝트의 <strong>방향성 설정을 주도</strong>하였습니다.</li>
                        </ul>
                    </ul>
                    <h3>사용 기술 및 도구</h3>
                    <ul>
                        <li><strong>트렌딩 진입 시간의 편차</strong></li>
                        <ul>
                            <li>901개의 영상 데이터를 분석한 결과, 트렌딩에 진입하기까지 걸리는 시간은 콘텐츠 유형에 따라 차이를 보였으며, 특히 감정적 몰입 유도 콘텐츠(가족 소개, 고백, 이별 등)가 평균 4시간 내 빠르게 반응을 얻는 경향을 보였습니다.</li>
                            <li>트렌드 반응을 고려할 때, 사용자 감정 자극형 콘텐츠는 빠른 확산을 위한 프론트 로딩 전략(주말 오전 업로드 등)으로 활용 가능하다는 인사이트를 얻었습니다.</li>
                        </ul>
                        <li><strong>언어 분포 분석 결과</strong></li>
                        <ul>
                            <li>전체 트렌딩 영상 중 영어 콘텐츠가 압도적이었으며, 다른 언어의 비율은 현저히 낮았습니다.</li>
                            <li>글로벌 타깃을 고려할 경우, 영어 기반 자막 또는 내레이션 추가가 콘텐츠의 트렌드 적중 확률을 높일 수 있습니다.</li>
                        </ul>
                        <li><strong>댓글 반응 패턴 분석</strong></li>
                        <ul>
                            <li>가장 높은 좋아요 수를 기록한 댓글 유형은 "구독하면 돈 얼마 준다"는 식의 자극적/밈성 문구였으며, 유사 댓글이 상위권에 반복 출현했습니다.</li>
                            <li>콘텐츠 내 밈 요소 반영 혹은 커뮤니티 유도형 문구 삽입을 통해 시청자 참여를 유도하고 알고리즘 반응을 강화할 수 있음을 배웠습니다.</li>
                        </ul>
                        <li><strong>PM 관점에서의 학습</strong></li>
                        <ul>
                            <li>분석 목적을 명확히 정의하고, 데이터로 검증하는 기획 습관을 기를 수 있었습니다. 단순히 수치를 확인하는 데서 끝나는 것이 아니라, "무엇을 개선하려는가?"에 집중하면서 분석 방향을 정리했던 경험이 특히 인상 깊었습니다.</li>
                            <li>트렌드 반응, 댓글 패턴, 언어 분포 등의 데이터를 통해 사용자 행동과 콘텐츠 전략 간의 연결을 파악했으며, 초기 가설 없이도 데이터 기반으로 인사이트를 도출하고 전략화하는 과정을 경험하며 PM 관점의 데이터 활용법을 익힐 수 있었습니다.</li>
                            <li>실무 상황이라면 이 분석을 기반으로 A/B 테스트, 썸네일/카피 전략, 업로드 스케줄 조정 등으로 연결될 수 있다는 점에서, 데이터가 제품 전략 수립의 실질적인 의사결정 도구가 될 수 있다는 걸 직접 체감한 프로젝트였습니다.</li>
                        </ul>    
                   </ul>

                    <a href="https://github.com/jollief/cnit372_project" target="_blank" style="color:var(--primary-purple);font-weight:500; text-decoration: none;">
                        <h3>🔗 GitHub에서 열람</h3>
                    </a>

                `,
      },
    };

    // 프로젝트 카드 클릭 이벤트
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectType = card.dataset.project;
            const project = projectDetails[projectType];
            
            if (project) {
                modalContent.innerHTML = `
                    <div class="modal-header">
                        <h2>${project.title}</h2>
                        <p class="modal-description">${project.description}</p>
                    </div>
                    ${project.details}
                `;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Animación de entrada del modal
                setTimeout(() => {
                    modal.querySelector('.modal-content').style.transform = 'scale(1)';
                    modal.querySelector('.modal-content').style.opacity = '1';
                }, 10);
            }
        });
    });

    // Cerrar modal
    closeModal.addEventListener('click', closeModalFunction);
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunction();
        }
    });

    function closeModalFunction() {
        modal.querySelector('.modal-content').style.transform = 'scale(0.9)';
        modal.querySelector('.modal-content').style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // Escape key para cerrar modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModalFunction();
        }
    });
}

// Formulario de contacto
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('contactSubmit');
    const statusEl = document.getElementById('formStatus');
    if (!form) return;

    const { PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID, TO_EMAIL } = EMAILJS_CONFIG;

    if (window.emailjs && !PUBLIC_KEY.startsWith('REEMPLAZA')) {
        emailjs.init(PUBLIC_KEY);
    } else {
        console.warn('[EmailJS] Reemplaza las claves PUBLIC_KEY / SERVICE_ID / TEMPLATE_ID para habilitar el envío real.');
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validación básica
        const formData = new FormData(form);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const subject = formData.get('subject').trim();
        const message = formData.get('message').trim();

        if (!name || !email || !subject || !message) {
            showNotification('Todos los campos son obligatorios.', 'info');
            return;
        }

        // Estado de carga
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 전송 중...';
        statusEl.textContent = '메일을 보내는 중입니다...';

        // Si no han sido reemplazados los IDs, simulamos el envío.
    const usingPlaceholders = PUBLIC_KEY.startsWith('REEMPLAZA') || SERVICE_ID.startsWith('REEMPLAZA') || TEMPLATE_ID.startsWith('REEMPLAZA');

        try {
            if (!usingPlaceholders && window.emailjs) {
                const composedSubject = `${subject} | De: ${name} <${email}>`;
                await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
                    from_name: name,
                    from_email: email, // asegúrate de usar {{from_email}} en la plantilla
                    reply_to: email,   // configura reply-to en EmailJS con esta variable
                    subject: composedSubject,
                    original_subject: subject, // opcional si quieres conservar original
                    message: message,
                    to_email: TO_EMAIL
                });
            } else {
                // Simulación (elimina este bloque cuando configures EmailJS real)
                await new Promise(res => setTimeout(res, 1500));
            }

            submitBtn.innerHTML = '<i class="fas fa-check"></i> 전송 완료!';
            submitBtn.style.background = '#48bb78';
            statusEl.style.color = '#2f855a';
            statusEl.textContent = '메시지가 성공적으로 전송되었습니다!';
            showNotification('메시지가 성공적으로 전송되었습니다!', 'success');

            setTimeout(() => {
                form.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = '메시지 보내기';
                submitBtn.style.background = '';
                statusEl.textContent = '';
            }, 3000);
        } catch (err) {
            console.error('Email error:', err);
            submitBtn.disabled = false;
            submitBtn.innerHTML = '메시지 보내기';
            statusEl.style.color = '#e53e3e';
            statusEl.textContent = '오류가 발생했습니다. 나중에 다시 시도하세요.';
            showNotification('오류: 메시지를 보낼 수 없습니다.', 'info');
        }
    });
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Estilos inline para la notificación
    Object.assign(notification.style, {
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        background: type === 'success' ? '#48bb78' : '#667eea',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        zIndex: '3000',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    });
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove después de 5 segundos
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Botón de cerrar
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Menú móvil
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('.floating-nav');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            nav.classList.toggle('mobile-active');
        });
        
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                nav.classList.remove('mobile-active');
            });
        });
    }
}

// Scroll suave mejorado
function initSmoothScrolling() {
    // Botones CTA del hero
    const ctaPrimary = document.querySelector('.cta-primary');
    const ctaSecondary = document.querySelector('.cta-secondary');
    
    if (ctaPrimary) {
        ctaPrimary.addEventListener('click', () => {
            document.querySelector('#projects').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    
    if (ctaSecondary) {
        ctaSecondary.addEventListener('click', () => {
            // Simular descarga de CV
            showNotification('이력서 다운로드가 시작됩니다.', 'success');
        });
    }
    
    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('#about').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
}

// Efectos adicionales y easter eggs
function initAdditionalEffects() {
    // Efecto de typing en el título principal
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleLines = heroTitle.querySelectorAll('.title-line, .title-highlight');
        titleLines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateY(20px)';
            setTimeout(() => {
                line.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    // Efecto de contador para los achievements
    const achievementNumbers = document.querySelectorAll('.achievement-number');
    const achievementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    achievementNumbers.forEach(number => {
        achievementObserver.observe(number);
    });
}

// Animación de contador
function animateCounter(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/[^0-9]/g, ''));
    const suffix = text.replace(/[0-9]/g, '');
    
    if (!isNaN(number)) {
        let current = 0;
        const increment = number / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                element.textContent = number + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    }
}

// Efecto de cursor personalizado (opcional)
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    Object.assign(cursor.style, {
        position: 'fixed',
        width: '20px',
        height: '20px',
        background: 'var(--primary-purple)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: '9999',
        opacity: '0.5',
        transform: 'translate(-50%, -50%)',
        transition: 'all 0.1s ease'
    });
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Hover effects para elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .about-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.opacity = '0.8';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.opacity = '0.5';
        });
    });
}

// Performance optimization
function optimizePerformance() {
    // Lazy loading para imágenes
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Throttle scroll events
    let ticking = false;
    function updateOnScroll() {
        // Aquí van las funciones que se ejecutan en scroll
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Inicializar efectos adicionales cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initAdditionalEffects();
        // initCustomCursor(); // Descomenta si quieres el cursor personalizado
        optimizePerformance();
    }, 1000);
});

// Agregar estilos CSS adicionales para el menú móvil
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .floating-nav.mobile-active .nav-links {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border-radius: 0 0 20px 20px;
        padding: 1rem;
        box-shadow: var(--shadow);
        margin-top: 0.5rem;
    }
    
    .modal-project-detail {
        line-height: 1.8;
    }
    
    .modal-project-detail h3 {
        color: var(--primary-purple);
        margin: 2rem 0 1rem 0;
        font-size: 1.3rem;
    }
    
    .modal-project-detail ul {
        margin: 1rem 0;
        padding-left: 1.5rem;
    }
    
    .modal-project-detail li {
        margin: 0.5rem 0;
        color: var(--text-gray);
    }
    
    .modal-header {
        text-align: center;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid var(--light-purple);
    }
    
    .modal-description {
        font-size: 1.1rem;
        color: var(--text-gray);
        margin-top: 0.5rem;
    }
    
    .modal-content {
        transform: scale(0.9);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;

document.head.appendChild(mobileStyles);