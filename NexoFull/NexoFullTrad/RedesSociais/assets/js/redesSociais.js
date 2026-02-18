// redesSociais.js - VERSÃO COM SUPORTE A MÚLTIPLOS IDIOMAS

// Dados das redes sociais em múltiplos idiomas
const redesSociaisInfo = {
    'instagram': {
        nome: {
            'pt': 'Instagram',
            'en': 'Instagram'
        },
        criador: {
            'pt': 'Kevin Systrom e Mike Krieger',
            'en': 'Kevin Systrom and Mike Krieger'
        },
        anoCriacao: 2010,
        usuarios: {
            'pt': '1.4 bilhões',
            'en': '1.4 billion'
        },
        descricao: {
            'pt': 'Plataforma para compartilhamento de fotos e vídeos.',
            'en': 'Platform for sharing photos and videos.'
        }
    },
    'youtube': {
        nome: {
            'pt': 'YouTube',
            'en': 'YouTube'
        },
        criador: {
            'pt': 'Chad Hurley, Steve Chen e Jawed Karim',
            'en': 'Chad Hurley, Steve Chen and Jawed Karim'
        },
        anoCriacao: 2005,
        usuarios: {
            'pt': '2.5 bilhões',
            'en': '2.5 billion'
        },
        descricao: {
            'pt': 'Maior plataforma de compartilhamento de vídeos do mundo.',
            'en': 'Largest video sharing platform in the world.'
        }
    },
    'facebook': {
        nome: {
            'pt': 'Facebook',
            'en': 'Facebook'
        },
        criador: {
            'pt': 'Mark Zuckerberg',
            'en': 'Mark Zuckerberg'
        },
        anoCriacao: 2004,
        usuarios: {
            'pt': '2.9 bilhões',
            'en': '2.9 billion'
        },
        descricao: {
            'pt': 'Rede social que conecta pessoas ao redor do mundo.',
            'en': 'Social network that connects people around the world.'
        }
    },
    'whatsapp': {
        nome: {
            'pt': 'WhatsApp',
            'en': 'WhatsApp'
        },
        criador: {
            'pt': 'Jan Koum e Brian Acton',
            'en': 'Jan Koum and Brian Acton'
        },
        anoCriacao: 2009,
        usuarios: {
            'pt': '2 bilhões',
            'en': '2 billion'
        },
        descricao: {
            'pt': 'Aplicativo de mensagens instantâneas.',
            'en': 'Instant messaging application.'
        }
    },
    'tiktok': {
        nome: {
            'pt': 'TikTok',
            'en': 'TikTok'
        },
        criador: {
            'pt': 'Zhang Yiming',
            'en': 'Zhang Yiming'
        },
        anoCriacao: 2016,
        usuarios: {
            'pt': '1.2 bilhões',
            'en': '1.2 billion'
        },
        descricao: {
            'pt': 'Plataforma de vídeos curtos e entretenimento.',
            'en': 'Short video and entertainment platform.'
        }
    },
    'discord': {
        nome: {
            'pt': 'Discord',
            'en': 'Discord'
        },
        criador: {
            'pt': 'Jason Citron',
            'en': 'Jason Citron'
        },
        anoCriacao: 2015,
        usuarios: {
            'pt': '350 milhões',
            'en': '350 million'
        },
        descricao: {
            'pt': 'Plataforma de comunicação para comunidades e gamers.',
            'en': 'Communication platform for communities and gamers.'
        }
    }
};

// Labels dos pop-ups em múltiplos idiomas
const popupLabels = {
    'criador': {
        'pt': 'Criador:',
        'en': 'Creator:'
    },
    'anoCriacao': {
        'pt': 'Ano de Criação:',
        'en': 'Creation Year:'
    },
    'usuarios': {
        'pt': 'Usuários Ativos:',
        'en': 'Active Users:'
    },
    'descricao': {
        'pt': 'Descrição:',
        'en': 'Description:'
    }
};

// Função para detectar o idioma da página
function detectarIdioma() {
    const currentPath = window.location.pathname;
    const isEnglishPage = currentPath.includes('index-en.html');
    return isEnglishPage ? 'en' : 'pt';
}

// Função para obter texto traduzido
function getTexto(tipo, chave) {
    const idioma = detectarIdioma();
    
    if (tipo === 'label') {
        return popupLabels[chave][idioma] || popupLabels[chave]['pt'];
    }
    
    // Para dados das redes sociais
    const info = redesSociaisInfo[chave];
    if (!info) return chave;
    
    if (typeof info[tipo] === 'object') {
        return info[tipo][idioma] || info[tipo]['pt'] || info[tipo];
    }
    
    return info[tipo];
}

// Função para abrir pop-up
function abrirPopup(rede) {
    console.log('Tentando abrir pop-up para:', rede);
    
    const info = redesSociaisInfo[rede];
    if (!info) {
        console.log('Rede não encontrada:', rede);
        return;
    }

    const idioma = detectarIdioma();
    const labels = popupLabels;

    // Criar overlay
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    overlay.innerHTML = `
        <div class="popup-content">
            <button class="fechar-popup">&times;</button>
            <h2>${getTexto('nome', rede)}</h2>
            <div class="popup-info">
                <p><strong>${getTexto('label', 'criador')}</strong> ${getTexto('criador', rede)}</p>
                <p><strong>${getTexto('label', 'anoCriacao')}</strong> ${info.anoCriacao}</p>
                <p><strong>${getTexto('label', 'usuarios')}</strong> ${getTexto('usuarios', rede)}</p>
                <p><strong>${getTexto('label', 'descricao')}</strong> ${getTexto('descricao', rede)}</p>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    // Mostrar pop-up
    setTimeout(() => overlay.classList.add('active'), 10);

    // Configurar fechamento
    const fecharBtn = overlay.querySelector('.fechar-popup');
    fecharBtn.onclick = () => fecharPopup(overlay);
    
    overlay.onclick = (e) => {
        if (e.target === overlay) fecharPopup(overlay);
    };

    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') fecharPopup(overlay, escHandler);
    });
}

// Função para fechar pop-up
function fecharPopup(overlay, escHandler) {
    overlay.classList.remove('active');
    setTimeout(() => {
        if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
        }
        if (escHandler) {
            document.removeEventListener('keydown', escHandler);
        }
    }, 300);
}

// Animação de scroll para a página
function configurarAnimacaoScroll() {
    // Elementos que serão animados
    const elementos = [
        { selector: '.redes-titulo', delay: 0 },
        { selector: '.redes-linha', delay: 100 },
        { selector: '.redes-divider', delay: 200 },
        { selector: '.rede-item-com-imagem', delay: 300 }
    ];

    // Função para verificar se o elemento está visível na tela
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9
        );
    }

    // Função para adicionar a classe de animação
    function handleScroll() {
        elementos.forEach(item => {
            const elements = document.querySelectorAll(item.selector);
            elements.forEach((element, index) => {
                if (isElementInViewport(element)) {
                    // Adiciona a classe com um pequeno atraso para cada elemento
                    setTimeout(() => {
                        element.classList.add('animate-in');
                    }, item.delay + (index * 100));
                }
            });
        });
    }

    // Adiciona um pequeno atraso para garantir que o DOM esteja pronto
    setTimeout(() => {
        // Adiciona as classes iniciais
        elementos.forEach(item => {
            const elements = document.querySelectorAll(item.selector);
            elements.forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            });
        });

        // Verifica o scroll inicial
        handleScroll();

        // Adiciona o event listener para o scroll
        window.addEventListener('scroll', handleScroll);
    }, 300);
}

// Função para inicializar os eventos de clique
function inicializarEventosPopups() {
    console.log('Inicializando eventos de popup...');
    
    // Adicionar eventos de clique a todos os itens de rede social
    const itens = document.querySelectorAll('.rede-item-com-imagem');
    console.log('Itens encontrados para configuração:', itens.length);
    
    if (itens.length === 0) {
        console.warn('Nenhum item .rede-item-com-imagem encontrado no DOM');
        return;
    }
    
    itens.forEach((item, index) => {
        const nomeElemento = item.querySelector('.rede-nome');
        if (!nomeElemento) {
            console.warn('Elemento .rede-nome não encontrado no item', index, item);
            return;
        }
        
        const nomeRede = nomeElemento.textContent.trim().toLowerCase();
        console.log(`Configurando item ${index + 1}:`, nomeRede);
        
        // Remover event listeners antigos para evitar duplicação
        const novoItem = item.cloneNode(true);
        item.parentNode.replaceChild(novoItem, item);
        
        // Adicionar novo event listener
        novoItem.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Clicou em:', nomeRede);
            abrirPopup(nomeRede);
        });
        
        novoItem.style.cursor = 'pointer';
        
        // Adicionar classe para indicar que o item é clicável
        novoItem.classList.add('item-clicavel');
    });
}

// ÚNICA função DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM completamente carregado - Iniciando configuração de pop-ups');
    
    // Inicializar eventos após um pequeno atraso para garantir que o DOM esteja pronto
    setTimeout(inicializarEventosPopups, 100);
    
    // Configurar animação de scroll
    configurarAnimacaoScroll();
    
    // Garantir que o conteúdo esteja visível
    setTimeout(() => {
        document.querySelectorAll('.redes-conteudo').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }, 100);
});