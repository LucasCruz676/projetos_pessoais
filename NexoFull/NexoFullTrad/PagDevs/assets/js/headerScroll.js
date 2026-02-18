let lastScrollTop = 0;
const header = document.querySelector('.header');
const navHeader = document.querySelector('.navHeader');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (navHeader.classList.contains('active')) {
        header.classList.remove('hidden');
        return;
    }
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.classList.add('hidden');
    } 
    else if (scrollTop < lastScrollTop) {
        header.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop;
});