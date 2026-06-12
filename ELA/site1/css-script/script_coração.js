// coração 

const body = document.querySelector("body");

function createHeart() {
    const heart = document.createElement("div");
    heart.className = "fas fa-heart";
    heart.style.left = (Math.random() * 100) + "vw";
    heart.style.animationDuration = (Math.random() * 3) + 2 + "s"
    body.appendChild(heart);
}
setInterval(createHeart, 100);
setInterval(function name(params) {
    var heartArr = document.querySelectorAll(".fa-heart")
    if (heartArr.length > 200) {
        heartArr[0].remove()
    }
}, 100)

// clique me 


function abrirPopup() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("popup").style.display = "block";
}

function fecharPopup() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("popup").style.display = "none";
}

// envelope 


const envelope = document.querySelector('.envelope-wrapper');
envelope.addEventListener('click', () => {
    envelope.classList.toggle('flap');
});


// tempo juntos


// Data e hora que vocês se conheceram (ANO, MES-1, DIA, HORA, MINUTO, SEGUNDO)
const dataQueSeConheceram = new Date(2026, 2, 31, 6, 39, 0); // 31/03/2026 às 06:39

function atualizarTempo() {
    const agora = new Date();
    let diff = agora - dataQueSeConheceram;

    // Converter milissegundos
    const segundosTotais = Math.floor(diff / 1000);

    const dias = Math.floor(segundosTotais / (60 * 60 * 24));
    const horas = Math.floor((segundosTotais % (60 * 60 * 24)) / (60 * 60));
    const minutos = Math.floor((segundosTotais % (60 * 60)) / 60);
    const segundos = segundosTotais % 60;

    document.getElementById("dias").innerText = dias;
    document.getElementById("horas").innerText = horas.toString().padStart(2, '0');
    document.getElementById("minutos").innerText = minutos.toString().padStart(2, '0');
    document.getElementById("segundos").innerText = segundos.toString().padStart(2, '0');
}

// Atualiza a cada 1 segundo
setInterval(atualizarTempo, 1000);
atualizarTempo();

// chuva de corações

(function () {
    const emojis = ["❤️", "🩷", "💕", "💗", "💖", "💝", "🌹"];
    let chuvaAtiva = false;
    let intervalId = null;
    let timeoutId = null;

    function criarCoracao() {
        const heart = document.createElement("div");
        heart.className = "chuva-heart";
        heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        // posição horizontal aleatória
        heart.style.left = (Math.random() * 100) + "vw";

        // duração e tamanho aleatórios
        const duration = (Math.random() * 2 + 2).toFixed(2);
        const size = (Math.random() * 18 + 16).toFixed(0);
        heart.style.animationDuration = duration + "s";
        heart.style.fontSize = size + "px";

        document.body.appendChild(heart);

        // remove do DOM após cair
        setTimeout(() => heart.remove(), parseFloat(duration) * 1000 + 100);
    }

    function iniciarChuva() {
        if (chuvaAtiva) return;
        chuvaAtiva = true;

        // dispara muitos corações rápido no início
        for (let i = 0; i < 18; i++) {
            setTimeout(criarCoracao, i * 60);
        }

        // continua caindo por 4 segundos
        intervalId = setInterval(criarCoracao, 120);

        timeoutId = setTimeout(() => {
            clearInterval(intervalId);
            chuvaAtiva = false;
        }, 4000);
    }

    document.getElementById("btnChuva").addEventListener("click", () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
        chuvaAtiva = false;
        iniciarChuva();
    });
})();