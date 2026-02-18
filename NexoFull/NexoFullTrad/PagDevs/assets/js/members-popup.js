// assets/js/members-popup.js - BILINGUAL VERSION
const teamMembers = {
    'pt': {
        'yoshio': {
            name: 'Yoshio',
            age: '15 anos',
            description: 'líder do projeto, designou tarefas, desenvolveu a Página Inicial, a página dos Devs, criou o botão de acessibilidade.',
            image: './assets/img/yoshio.png'
        },
        'davi-rocha': {
            name: 'Davi Rocha',
            age: '16 anos',
            description: 'responsável pelas páginas de Android e IOS, e pelo Quiz.',
            image: './assets/img/davi.png'
        },
        'eduardo': {
            name: 'Eduardo',
            age: '16 anos',
            description: 'responsável pelas páginas de Computadores Quânticos, Inteligência Artificial, Assistentes Virtuais, Releitura da Capa e auxiliou no quiz.',
            image: './assets/img/dudu.png'
        },
        'gabriel-agustinelli': {
            name: 'Gabriel Agustinelli',
            age: '16 anos',
            description: 'responsável pelas páginas de Redes Sociais, Linha do Tempo, modo claro e escuro e tradução das páginas.',
            image: './assets/img/gabriel.png'
        },
        'lucas-cruz': {
            name: 'Lucas Cruz',
            age: '16 anos',
            description: 'responsável pelas páginas de Sistemas Operacionais, Linguagens de Programações e rodapé das páginas.',
            image: './assets/img/lucas.png'
        }
    },
    'en': {
        'yoshio': {
            name: 'Yoshio',
            age: '15 years old',
            description: 'project leader, assigned tasks, developed the Home Page, the Developers page, created the accessibility button.',
            image: './assets/img/yoshio.png'
        },
        'davi-rocha': {
            name: 'Davi Rocha',
            age: '16 years old',
            description: 'responsible for the Android vs iOS pages and the Quiz.',
            image: './assets/img/davi.png'
        },
        'eduardo': {
            name: 'Eduardo',
            age: '16 years old',
            description: 'responsible for the Quantum Computers, Artificial Intelligence, Virtual Assistants, Cover Recreation pages and assisted with the quiz.',
            image: './assets/img/dudu.png'
        },
        'gabriel-agustinelli': {
            name: 'Gabriel Agustinelli',
            age: '16 years old',
            description: 'responsible for the Social Media, Timeline, light and dark mode and page translations.',
            image: './assets/img/gabriel.png'
        },
        'lucas-cruz': {
            name: 'Lucas Cruz',
            age: '16 years old',
            description: 'responsible for the Operating Systems, Programming Languages pages and page footers.',
            image: './assets/img/lucas.png'
        }
    }
};

// Interface texts
const interfaceTexts = {
    'pt': {
        closeLabel: 'Fechar pop-up',
        years: 'anos'
    },
    'en': {
        closeLabel: 'Close pop-up',
        years: 'years old'
    }
};

// Detect current language
function getCurrentLanguage() {
    const currentFile = window.location.pathname.split('/').pop();
    return currentFile === 'index-en.html' ? 'en' : 'pt';
}

let currentLang = getCurrentLanguage();

function openPopup(memberId) {
    const member = teamMembers[currentLang][memberId];
    if (member) {
        document.getElementById('popupImage').src = member.image;
        document.getElementById('popupName').textContent = member.name;
        document.getElementById('popupAge').textContent = member.age;
        document.getElementById('popupDescription').textContent = member.description;
        document.getElementById('memberPopup').style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Update close button label
        document.getElementById('closePopup').setAttribute('aria-label', interfaceTexts[currentLang].closeLabel);
    }
}

function closePopup() {
    document.getElementById('memberPopup').style.display = 'none';
    document.body.style.overflow = 'auto';
}

document.addEventListener('DOMContentLoaded', function() {
    const members = document.querySelectorAll('.member');
    const memberIds = ['yoshio', 'davi-rocha', 'eduardo', 'gabriel-agustinelli', 'lucas-cruz'];
    
    members.forEach((member, index) => {
        member.setAttribute('data-member-id', memberIds[index]);
        member.addEventListener('click', function() {
            const memberId = this.getAttribute('data-member-id');
            openPopup(memberId);
        });
        
        // Add keyboard support
        member.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const memberId = this.getAttribute('data-member-id');
                openPopup(memberId);
            }
        });
    });
    
    document.getElementById('closePopup').addEventListener('click', closePopup);
    
    document.getElementById('memberPopup').addEventListener('click', function(e) {
        if (e.target === this) {
            closePopup();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePopup();
        }
    });
    
    // Update page title based on language
    const pageTitle = document.querySelector('title');
    if (currentLang === 'en') {
        pageTitle.textContent = 'Developers - Nexo';
    }
});