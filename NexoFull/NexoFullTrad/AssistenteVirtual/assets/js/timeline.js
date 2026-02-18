(() => {
      // Primeiro, selecionamos o container da linha do tempo
      const timeline = document.querySelector('.timeline-vertical');

      // Função para configurar os atrasos baseados na posição na linha do tempo
      function setupTimelineDelays() {
        if (!timeline) return;

        // Pegamos todos os itens da linha do tempo que têm a classe reveal
        const timelineItems = timeline.querySelectorAll('.reveal');

        // Aplicamos um atraso sequencial para cada item
        timelineItems.forEach((item, index) => {
          item.style.transitionDelay = `${index * 100}ms`;
        });
      }

      // Configuramos os atrasos da linha do tempo
      setupTimelineDelays();

      // Configuração do observer para os elementos reveal
      const elements = document.querySelectorAll('.reveal');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            entry.target.classList.remove('is-hiding');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -15% 0px'
      });

      // Aplicamos o observer a todos os elementos com a classe reveal
      // Os itens da linha do tempo já têm seus atrasos configurados
      elements.forEach((el) => {
        // Se o elemento não está na linha do tempo, aplicamos um atraso padrão
        if (!el.closest('.timeline-vertical')) {
          el.style.transitionDelay = '100ms';
        }
        observer.observe(el);
      });
    })();