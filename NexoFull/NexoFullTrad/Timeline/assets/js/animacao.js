// Timeline com Scroll Suave e Animações
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const navDots = document.querySelectorAll('.nav-dot');
    const progressBar = document.querySelector('.progress-bar');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    let currentIndex = 0;
    let isScrolling = false;
    let scrollTimeout;

    // Criar bolinha móvel
    const timelineMarker = document.createElement('div');
    timelineMarker.className = 'timeline-marker';
    document.body.appendChild(timelineMarker);

    // Configuração inicial
    function initTimeline() {
        setActiveItem(0);
        setupTechChips();
        updateMarkerPosition();
        
        // Event listeners
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('keydown', handleKeydown);
        window.addEventListener('resize', updateMarkerPosition);
        
        navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSection(index));
        });
    }

    // Scroll com wheel - controle suave
    function handleWheel(e) {
        if (isScrolling) return;
        
        // Clear existing timeout
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            if (e.deltaY > 50 && currentIndex < timelineItems.length - 1) {
                e.preventDefault();
                goToSection(currentIndex + 1);
            } else if (e.deltaY < -50 && currentIndex > 0) {
                e.preventDefault();
                goToSection(currentIndex - 1);
            }
        }, 100);
    }

    // Scroll automático com detecção suave
    function handleScroll() {
        if (isScrolling) return;
        
        updateMarkerPosition();
        
        const scrollY = window.scrollY + (window.innerHeight * 0.3); // 30% da tela
        
        timelineItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const itemTop = rect.top + window.scrollY;
            const itemBottom = itemTop + rect.height;
            
            if (scrollY >= itemTop && scrollY < itemBottom) {
                if (index !== currentIndex) {
                    setActiveItem(index);
                }
            }
        });
    }

    // Atualizar posição da bolinha
    function updateMarkerPosition() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        
        if (documentHeight > 0) {
            const scrollPercentage = Math.min(scrollY / documentHeight, 1);
            const markerTop = 10 + (scrollPercentage * 80); // 10% a 90% da tela
            
            timelineMarker.style.top = `${markerTop}vh`;
        }
    }

    // Ir para seção com animação
    function goToSection(index) {
        if (isScrolling || index < 0 || index >= timelineItems.length) return;
        
        isScrolling = true;
        
        timelineItems[index].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        setActiveItem(index);
        
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }

    // Definir item ativo com animações
    function setActiveItem(index) {
        currentIndex = index;
        
        timelineItems.forEach((item, i) => {
            if (i === index) {
                setTimeout(() => {
                    item.classList.add('active');
                }, 300);
            } else {
                item.classList.remove('active');
            }
        });
        
        updateNavDots();
        updateProgress();
        
        scrollIndicator.classList.toggle('hidden', currentIndex === timelineItems.length - 1);
    }

    // Atualizar dots
    function updateNavDots() {
        navDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Atualizar progresso
    function updateProgress() {
        const progress = (currentIndex / (timelineItems.length - 1)) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Teclado
    function handleKeydown(e) {
        if (isScrolling) return;
        
        if (e.key === 'ArrowDown' && currentIndex < timelineItems.length - 1) {
            e.preventDefault();
            goToSection(currentIndex + 1);
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            goToSection(currentIndex - 1);
        } else if (e.key >= '1' && e.key <= '5') {
            e.preventDefault();
            goToSection(parseInt(e.key) - 1);
        }
    }

    // Tech Chips
    function setupTechChips() {
        // Cria o HTML do popup diretamente
        const popupHTML = `
            <div class="popup-overlay"></div>
            <div class="tech-popup">
                <div class="popup-header">
                    <h3 class="popup-title"></h3>
                    <button class="popup-close">&times;</button>
                </div>
                <div class="popup-content">
                    <p></p>
                </div>
            </div>
        `;
        
        // Adiciona o popup ao final do body
        document.body.insertAdjacentHTML('beforeend', popupHTML);
        
        // Referências aos elementos
        const popupOverlay = document.querySelector('.popup-overlay');
        const techPopup = document.querySelector('.tech-popup');
        const popupTitle = document.querySelector('.popup-title');
        const popupContent = document.querySelector('.popup-content p');
        const popupClose = document.querySelector('.popup-close');
        const techChips = document.querySelectorAll('.tech-chip');
        
        // Função para abrir o popup
        function openPopup(tech, description) {
            console.log('Abrindo popup:', {tech, description});
            
            // Define o conteúdo do popup
            if (popupTitle) {
                popupTitle.textContent = tech || 'Tecnologia';
                popupTitle.style.color = '#ffffff';
            }
            
            if (popupContent) {
                popupContent.textContent = description || 'Descrição não disponível';
                popupContent.style.color = '#ffffff';
            }
            
            // Mostra o popup
            if (popupOverlay) popupOverlay.classList.add('active');
            if (techPopup) techPopup.classList.add('active');
            
            // Adiciona evento de tecla ESC
            document.addEventListener('keydown', handleEscapeKey);
        }
        
        // Função para fechar o popup
        function closePopup() {
            if (popupOverlay) popupOverlay.classList.remove('active');
            if (techPopup) techPopup.classList.remove('active');
            document.removeEventListener('keydown', handleEscapeKey);
        }
        
        // Função para lidar com a tecla ESC
        function handleEscapeKey(e) {
            if (e.key === 'Escape') closePopup();
        }
        
        // Adiciona eventos de clique aos tech chips
        if (techChips && techChips.length > 0) {
            techChips.forEach(chip => {
                chip.addEventListener('click', function() {
                    const tech = this.getAttribute('data-tech');
                    const description = this.getAttribute('data-description');
                    openPopup(tech, description);
                });
            });
        }
        
        // Adiciona eventos de clique ao botão de fechar e overlay
        if (popupClose) popupClose.addEventListener('click', closePopup);
        if (popupOverlay) popupOverlay.addEventListener('click', closePopup);
        if (techPopup) {
            techPopup.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }

    // Inicializar
    initTimeline();
    
    // Animar título
    const timelineTitle = document.querySelector('.timeline-title');
    if (timelineTitle) {
        setTimeout(() => {
            timelineTitle.style.animation = 'titleEntry 1s ease-out 0.5s forwards';
        }, 300);
    }
});