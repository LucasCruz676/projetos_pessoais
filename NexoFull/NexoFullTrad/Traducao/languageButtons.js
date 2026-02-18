// languageButtons.js - VERSÃO COM REDIRECIONAMENTO
document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const navButtons = document.querySelectorAll('.nav-btn');
    
    // Mapeamento das páginas
    const pageMappings = {
        // Português para Inglês
        'index.html': 'index-en.html',
        'index-en.html': 'index.html'
    };

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
            
            // Redirecionar após a animação
            setTimeout(() => {
                this.classList.remove('switching');
                this.classList.add('active');
                
                if (selectedLang === 'EN') {
                    redirectToEnglish();
                } else if (selectedLang === 'PT') {
                    redirectToPortuguese();
                }
            }, 400);
        });
    });
    
    function redirectToEnglish() {
        const currentPath = window.location.pathname;
        const currentFile = currentPath.split('/').pop();
        
        // Se já está em inglês, não faz nada
        if (currentFile === 'index-en.html') {
            return;
        }
        
        // Redireciona para a versão em inglês
        const newFile = pageMappings[currentFile] || 'index-en.html';
        const newPath = currentPath.replace(currentFile, newFile);
        
        window.location.href = newPath;
    }
    
    function redirectToPortuguese() {
        const currentPath = window.location.pathname;
        const currentFile = currentPath.split('/').pop();
        
        // Se já está em português, não faz nada
        if (currentFile === 'index.html') {
            return;
        }
        
        // Redireciona para a versão em português
        const newFile = pageMappings[currentFile] || 'index.html';
        const newPath = currentPath.replace(currentFile, newFile);
        
        window.location.href = newPath;
    }
    
    // Funcionalidade dos botões de navegação
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            
            if (buttonText === 'ABOUT US' || buttonText === 'SOBRE-NÓS') {
                console.log('Navegando para About/Sobre');
            } else if (buttonText === 'CONTACT' || buttonText === 'CONTATO') {
                console.log('Navegando para Contact/Contato');
            }
        });
    });
    
    // Inicializar botão ativo baseado na página atual
    function initializeLanguageButton() {
        const currentFile = window.location.pathname.split('/').pop();
        const isEnglishPage = currentFile === 'index-en.html';
        
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            
            if ((isEnglishPage && btn.textContent === 'EN') || 
                (!isEnglishPage && btn.textContent === 'PT')) {
                btn.classList.add('active');
            }
        });
    }
    
    // Inicializar
    initializeLanguageButton();
});