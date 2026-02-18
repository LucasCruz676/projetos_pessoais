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
const dataQueSeConheceram = new Date(2025, 10, 10, 16, 0, 0); // 10/11/2025 às 16:00

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