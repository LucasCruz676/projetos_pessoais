// darkMode.js
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se localStorage está disponível
    let localStorageAvailable;
    try {
        localStorageAvailable = window.localStorage !== "undefined";
    } catch (e) {
        localStorageAvailable = false;
    }

    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) {
        console.error('Botão de tema não encontrado!');
        return;
    }

    // Função para determinar preferência de tema
    const themePreference = () => {
        const hasLocalStorage = localStorageAvailable && localStorage.getItem("theme");
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        let theme = undefined;

        if (hasLocalStorage) {
            theme = hasLocalStorage === "dark" ? "dark" : "light";
        } else if (systemPrefersDark) {
            theme = "dark";
        } else {
            theme = "light";
        }

        return { theme };
    };

    // Aplicar tema inicial
    const setTheme = () => {
        if (themePreference().theme === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
            themeToggle.checked = true;
            applyTheme('dark');
        } else {
            document.documentElement.removeAttribute("data-theme");
            themeToggle.checked = false;
            applyTheme('light');
        }
    };

    // Configurar tema inicial
    setTheme();

    // Event listener para o botão de tema
    themeToggle.addEventListener('click', function() {
        if (themeToggle.checked) {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorageAvailable && localStorage.setItem("theme", "dark");
            applyTheme('dark');
        } else {
            document.documentElement.removeAttribute("data-theme");
            localStorageAvailable && localStorage.setItem("theme", "light");
            applyTheme('light');
        }
    });

    // Observar mudanças na preferência do sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    function applyTheme(theme) {
        if (!theme) {
            theme = 'light';
        }
        
        // Aplicar fade out na imagem atual
        const bgImg = document.querySelector('.background img');
        if (bgImg) {
            bgImg.style.transition = 'opacity 0.3s ease';
            bgImg.style.opacity = '0';
            
            setTimeout(() => {
                if (theme === 'light') {
                    bgImg.src = 'assets/img/fadein1.png';
                } 
                else if (theme === 'dark') {
                    bgImg.src = 'assets/img/background.png';
                }
                
                setTimeout(() => {
                    bgImg.style.opacity = '1';
                }, 50);
            }, 300);
        }
        
        // Aplicar o tema ao DOM
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
});