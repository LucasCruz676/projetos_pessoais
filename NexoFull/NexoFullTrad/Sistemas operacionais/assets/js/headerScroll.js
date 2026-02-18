// Script para esconder/mostrar o header durante a rolagem
let lastScrollTop = 0;
const header = document.querySelector('.header');
const navHeader = document.querySelector('.navHeader');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Não esconder o header se o menu estiver aberto
    if (navHeader.classList.contains('active')) {
        header.classList.remove('hidden');
        return;
    }
    
    // Se estiver rolando para baixo e já tiver rolado mais de 100px
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.classList.add('hidden');
    } 
    // Se estiver rolando para cima
    else if (scrollTop < lastScrollTop) {
        header.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop;
});