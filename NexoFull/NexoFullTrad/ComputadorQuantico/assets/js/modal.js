function abrirModal(id) {
    document.getElementById(id).style.display = 'flex';
}

function fecharModal(id) {
    document.getElementById(id).style.display = 'none';
}

window.onclick = function (event) {
    const modais = document.querySelectorAll('.modal');
    modais.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}
function abrirModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("show"), 10);
}

function fecharModal(id) {
    const modal = document.getElementById(id);
    modal.classList.remove("show");
    setTimeout(() => modal.style.display = "none", 300);
}