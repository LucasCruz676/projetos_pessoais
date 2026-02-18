document.addEventListener('DOMContentLoaded', function() {
  const scrollDownBtn = document.getElementById('scrollDownBtn');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  
  if (!scrollDownBtn || !scrollTopBtn) {
    console.warn('Botões de scroll não encontrados na página');
    return;
  }
  
  function scrollToPosition(position) {
    window.scrollTo({
      top: position,
      behavior: 'smooth'
    });
  }
  
  scrollDownBtn.addEventListener('click', function() {
    scrollToPosition(window.innerHeight);
  });
  
  scrollTopBtn.addEventListener('click', function() {
    scrollToPosition(0);
  });
  
  function handleScroll() {
    const scrollPosition = window.scrollY;
    
    if (scrollPosition < 100) {
      scrollDownBtn.style.opacity = '1';
      scrollDownBtn.style.visibility = 'visible';
    } else {
      scrollDownBtn.style.opacity = '0';
      scrollDownBtn.style.visibility = 'hidden';
    }
    
    if (scrollPosition > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  
  handleScroll();
  
  console.log('Script de scroll buttons carregado com sucesso!');
});