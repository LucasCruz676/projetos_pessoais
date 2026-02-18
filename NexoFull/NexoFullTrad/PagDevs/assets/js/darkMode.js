// darkMode.js
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) {
        console.error('Botão de tema não encontrado!');
        return;
    }

    // Função para verificar se o tema escuro está ativo
    function isDarkMode() {
        return document.documentElement.getAttribute('data-theme') === 'dark' || 
               (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }

    // Aplicar tema
    function setTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.checked = true;
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeToggle.checked = false;
        }
        localStorage.setItem('theme', theme);
        updateIcon();
    }
    // Atualizar ícone baseado no tema
    function updateIcon() {
        const icon = themeToggle.nextElementSibling;
        if (isDarkMode()) {
            icon.textContent = 'dark_mode';
        } else {
            icon.textContent = 'light_mode';
        }
    }
    
    // Verificar tema salvo ou preferência do sistema
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            setTheme(systemPrefersDark ? 'dark' : 'light');
        }
    }

    // Inicializar tema
    initTheme();

    // Alternar tema ao clicar no botão
    themeToggle.addEventListener('change', function() {
        const newTheme = this.checked ? 'dark' : 'light';
        setTheme(newTheme);
    });

    // Adicionar transição suave
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';

    // Observar mudanças na preferência do sistema (apenas se não houver preferência salva)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Inicializar tema
    initTheme();
});