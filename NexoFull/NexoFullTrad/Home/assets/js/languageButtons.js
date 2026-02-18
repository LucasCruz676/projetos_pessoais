// languageButtons.js
document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const navButtons = document.querySelectorAll('.nav-btn');
    
    // Funcionalidade dos botões de idioma
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedLang = this.textContent;
            
            // Não fazer nada se já está ativo
            if (this.classList.contains('active')) {
                return;
            }
            
            // Remove active de todos os botões primeiro
            langButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Adicionar animação de troca ao botão clicado
            this.classList.add('switching');
            
            // Após a animação, ativar o botão
            setTimeout(() => {
                this.classList.remove('switching');
                this.classList.add('active');
            }, 800);
            
            console.log(`Idioma selecionado: ${selectedLang}`);
            
            // Lógica para mudar o idioma do site
            if (selectedLang === 'EN') {
                changeLanguage('en');
            } else if (selectedLang === 'PT') {
                changeLanguage('pt');
            }
        });
    });
    
    // Funcionalidade dos botões de navegação
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            
            if (buttonText === 'ABOUT') {
                // Scroll para seção sobre ou redirecionar
                console.log('Navegando para About');
                // Exemplo: document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            } else if (buttonText === 'CONTACT') {
                // Scroll para seção contato ou redirecionar
                console.log('Navegando para Contact');
                // Exemplo: document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    function changeLanguage(lang) {
        // Salvar preferência no localStorage
        localStorage.setItem('preferredLanguage', lang);
        
        // Aqui você implementaria a lógica de tradução
        if (lang === 'en') {
            console.log('🇺🇸 Changing to English');
            // Exemplo: Trocar textos para inglês
            // document.title = 'Nexo - Technology Hub';
        } else {
            console.log('🇧🇷 Mudando para Português');
            // Exemplo: Trocar textos para português (padrão)
            // document.title = 'Nexo - Hub Tecnológico';
        }
    }
    
    // Inicializar com PT como idioma padrão SEMPRE
    function initializeLanguage() {
        // PT é sempre o padrão, independente do localStorage
        const defaultLang = 'pt';
        
        // Encontrar e ativar o botão PT
        const ptButton = Array.from(langButtons).find(btn => 
            btn.textContent.toLowerCase() === 'pt'
        );
        
        if (ptButton) {
            langButtons.forEach(btn => btn.classList.remove('active'));
            ptButton.classList.add('active');
            changeLanguage(defaultLang);
        }
        
        console.log('🇧🇷 Site inicializado em Português (idioma principal)');
    }
    
    // Inicializar idioma
    initializeLanguage();
});
