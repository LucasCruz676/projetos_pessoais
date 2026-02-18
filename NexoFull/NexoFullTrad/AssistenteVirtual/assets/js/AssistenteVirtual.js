// AssistenteVirtual.js - ARQUIVO COMPLETO ATUALIZADO
document.addEventListener('DOMContentLoaded', function() {
    // Registrar elementos para tradução
    registerPageSpecificElements();
    
    // Inicializar funcionalidades específicas da página
    initializeAssistenteVirtual();
    
    // Ouvir mudanças de idioma
    document.addEventListener('languageChanged', function(event) {
        updateAssistenteContent(event.detail.language);
    });
});

function registerPageSpecificElements() {
    if (typeof languageManager !== 'undefined') {
        // Títulos principais
        languageManager.registerElementBySelector('assistentes_virtuais_titulo', '.titulo');
        languageManager.registerElementBySelector('assistentes_descricao', '.primeirotexto');
        
        // Botão Saiba Mais
        languageManager.registerElementBySelector('saiba_mais_btn', '.btn-primary-custom');
        
        // Seção "O que são assistentes virtuais"
        languageManager.registerElementBySelector('oq_sao_titulo', '.resumo2 span');
        languageManager.registerElementBySelector('oq_sao_descricao', '.resumo h1');
        
        // Cards de Benefícios, História e Aplicações
        languageManager.registerElementBySelector('beneficios_titulo', '.glass-card:nth-child(1) h3');
        languageManager.registerElementBySelector('beneficios_desc', '.glass-card:nth-child(1) p');
        
        languageManager.registerElementBySelector('historia_titulo', '.glass-card:nth-child(2) h3');
        languageManager.registerElementBySelector('historia_desc', '.glass-card:nth-child(2) p');
        
        languageManager.registerElementBySelector('aplicacoes_titulo', '.glass-card:nth-child(3) h3');
        languageManager.registerElementBySelector('aplicacoes_desc', '.glass-card:nth-child(3) p');
        
        // Linha do Tempo
        languageManager.registerElementBySelector('linha_tempo_titulo', '.section-title');
        
        // Itens da linha do tempo
        languageManager.registerElementBySelector('timeline_1960', '.t-row:nth-child(1) strong');
        languageManager.registerElementBySelector('timeline_1960_desc', '.t-row:nth-child(1) .small');
        
        languageManager.registerElementBySelector('timeline_2000', '.t-row:nth-child(2) strong');
        languageManager.registerElementBySelector('timeline_2000_desc', '.t-row:nth-child(2) .small');
        
        languageManager.registerElementBySelector('timeline_2011', '.t-row:nth-child(3) strong');
        languageManager.registerElementBySelector('timeline_2011_desc', '.t-row:nth-child(3) .small');
        
        languageManager.registerElementBySelector('timeline_hoje', '.t-row:nth-child(4) strong');
        languageManager.registerElementBySelector('timeline_hoje_desc', '.t-row:nth-child(4) .small');
        
        // Seção Detalhada - Como funcionam
        languageManager.registerElementBySelector('como_funcionam_titulo', '#detail-how h3');
        languageManager.registerElementBySelector('como_funcionam_item1', '#detail-how ol li:nth-child(1)');
        languageManager.registerElementBySelector('como_funcionam_item2', '#detail-how ol li:nth-child(2)');
        languageManager.registerElementBySelector('como_funcionam_item3', '#detail-how ol li:nth-child(3)');
        languageManager.registerElementBySelector('como_funcionam_item4', '#detail-how ol li:nth-child(4)');
        
        // Seção Detalhada - Aplicações
        languageManager.registerElementBySelector('aplicacoes_detalhes_titulo', '#detail-apps h3');
        languageManager.registerElementBySelector('app_lembretes', '.app-item:nth-child(1) span');
        languageManager.registerElementBySelector('app_casa_inteligente', '.app-item:nth-child(2) span');
        languageManager.registerElementBySelector('app_educacao', '.app-item:nth-child(3) span');
        languageManager.registerElementBySelector('app_acessibilidade', '.app-item:nth-child(4) span');
    }
}

function initializeAssistenteVirtual() {
    // Inicializar funcionalidades específicas da página
    console.log('Página de Assistentes Virtuais inicializada');
    
    // Adicionar interatividade aos cards se necessário
    initializeInteractiveCards();
}

function initializeInteractiveCards() {
    // Adicionar efeitos interativos aos cards
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function updateAssistenteContent(lang) {
    // Atualizar conteúdo dinâmico quando idioma mudar
    console.log('Conteúdo de Assistentes Virtuais atualizado para:', lang);
    
    // Atualizar ícones ou conteúdo dinâmico se necessário
    updateTimelineIcons(lang);
}

function updateTimelineIcons(lang) {
    // Se precisar atualizar ícones baseados no idioma
    const timelineIcon = document.querySelector('.section-title i');
    if (timelineIcon && lang === 'en') {
        // Pode adicionar lógica para mudar ícones se necessário
        console.log('Ícones da timeline atualizados para inglês');
    }
}