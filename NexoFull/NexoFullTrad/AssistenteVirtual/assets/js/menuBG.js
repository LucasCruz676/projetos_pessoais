// menuBG.js - Versão otimizada
// Otimizado para melhor desempenho do menu

document.addEventListener('DOMContentLoaded', function() {
    // Cache de elementos do DOM
    const hamburguer = document.querySelector('.hamburguer');
    const navHeader = document.querySelector('.navHeader');
    
    // Adiciona o evento de clique apenas uma vez
    if (hamburguer && navHeader) {
        hamburguer.addEventListener('click', function() {
            // Usando classList.toggle com force para melhor performance
            const isActive = navHeader.classList.toggle('active');
            hamburguer.classList.toggle('active', isActive);
            
            // Previne o comportamento padrão para melhor performance
            return false;
        });
    }
});