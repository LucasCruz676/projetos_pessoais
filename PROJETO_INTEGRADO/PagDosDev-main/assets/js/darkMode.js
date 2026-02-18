// darkMode.js
document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.querySelector('#checkbox');
    
    if (!toggleSwitch) {
        console.error('Toggle switch não encontrado!');
        return;
    }
    
    const currentTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Aplicar tema inicial
    applyTheme(currentTheme, systemPrefersDark);

    // Event listener para o toggle switch
    toggleSwitch.addEventListener('change', function(e) {
        if (e.target.checked) {
            applyTheme('dark');
        } else {
            applyTheme('light');
        }
    });

    // Observar mudanças na preferência do sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    function applyTheme(theme, systemPrefersDark = false) {
        if (!theme) {
            theme = systemPrefersDark ? 'dark' : 'light';
        }
        
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (toggleSwitch) {
            toggleSwitch.checked = (theme === 'dark');
        }
    }
});