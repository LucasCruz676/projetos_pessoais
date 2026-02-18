// Script para controlar o comportamento dos botões de scroll
document.addEventListener('DOMContentLoaded', function() {
  const scrollDownBtn = document.getElementById('scrollDownBtn');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  
  // Verificar se os botões existem na página
  if (!scrollDownBtn || !scrollTopBtn) {
    console.warn('Botões de scroll não encontrados na página');
    return;
  }
  
  // Função para rolar suavemente para uma posição específica
  function scrollToPosition(position) {
    window.scrollTo({
      top: position,
      behavior: 'smooth'
    });
  }
  
  // Evento para o botão de scroll para baixo
  scrollDownBtn.addEventListener('click', function() {
    scrollToPosition(window.innerHeight);
  });
  
  // Evento para o botão de scroll para o topo
  scrollTopBtn.addEventListener('click', function() {
    scrollToPosition(0);
  });
  
  // Controlar a visibilidade dos botões baseado na posição do scroll
  function handleScroll() {
    const scrollPosition = window.scrollY;
    
    // Mostrar/ocultar o botão de scroll para baixo
    if (scrollPosition < 100) {
      scrollDownBtn.style.opacity = '1';
      scrollDownBtn.style.visibility = 'visible';
    } else {
      scrollDownBtn.style.opacity = '0';
      scrollDownBtn.style.visibility = 'hidden';
    }
    
    // Mostrar/ocultar o botão de scroll para o topo
    if (scrollPosition > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  }
  
  // Adicionar event listener para o scroll
  window.addEventListener('scroll', handleScroll);
  
  // Verificar estado inicial
  handleScroll();
  
  console.log('Script de scroll buttons carregado com sucesso!');
});