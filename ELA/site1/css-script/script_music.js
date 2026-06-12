(function () {
    const audio = new Audio(); // ← dentro da função agora

    // ✏️ EDITE AQUI com as suas músicas
    const tracks = [
        {
            name: "Saturno",
            artist: "BIN",
            album: "Para todas as mulheres que já rimei",
            src: "musics/Saturno.mp3",
            duration: 193,
            cover: "img/Saturno.jpg",
            color: "#7c3aed",
        },
        {
            name: "Imprevisto",
            artist: "Yago Oproprio",
            album: "Single",
            src: "musics/Imprevisto.mp3",
            duration: 210,
            cover: "img/Imprevisto.jpg",
            color: "#e05a8a",
        },
        {
            name: "Paladar infantil",
            artist: "G.A",
            album: "Single",
            src: "musics/Paladar_infantil.mp3",
            duration: 185,
            cover: "img/Paladar_infantil.jpg",
            color: "#0637d9",
        },
        {
            name: "Diario de um cafajeste",
            artist: "DJ Oreia",
            album: "Single",
            src: "musics/Diario_Cafajeste.mp3",
            album: "Album",
            duration: 200,
            cover: "img/Diario_Cafajeste.jpg",
            color: "#e91e4a",
        },
    ];

    // ── Build sidebar list ──────────────────────────────────────────
    const sidebar = document.getElementById("playlistSidebar");
    tracks.forEach((t, i) => {
        const div = document.createElement("div");
        div.className = "pl-track";
        div.dataset.i = i;
        div.innerHTML = `
            <span class="pl-num">${i + 1}</span>
            <div class="pl-info">
                <div class="pl-name">${t.name}</div>
                <div class="pl-artist">${t.artist}</div>
            </div>`;
        div.addEventListener("click", () => openPlayer(i));
        sidebar.appendChild(div);
    });

    // ── Player state ──────────────────────────────────────────────
    let cur = -1;

    function fmt(s) {
        s = Math.floor(s);
        const m = Math.floor(s / 60), sec = s % 60;
        return `${m}:${sec.toString().padStart(2, "0")}`;
    }

    // Progresso usando o tempo REAL do audio
    audio.addEventListener("timeupdate", () => {
        if (cur < 0) return;
        const total = audio.duration || tracks[cur].duration;
        const pct = Math.min((audio.currentTime / total) * 100, 100);
        document.getElementById("iosFill").style.width = pct + "%";
        document.getElementById("iosElapsed").textContent = fmt(audio.currentTime);
        document.getElementById("iosRemain").textContent = "-" + fmt(total - audio.currentTime);
    });

    // Avança para próxima ao terminar
    audio.addEventListener("ended", () => {
        openPlayer((cur + 1) % tracks.length);
    });

    function updateIcon() {
        const icon = document.getElementById("iosPlayIcon");
        if (!audio.paused) {
            icon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
        } else {
            icon.innerHTML = '<path d="M8 5v14l11-7z"/>';
        }
    }

    function openPlayer(idx) {
        cur = idx;
        const t = tracks[idx];

        // sidebar ativa
        document.querySelectorAll(".pl-track").forEach(el => el.classList.remove("pl-active"));
        const active = document.querySelector(`.pl-track[data-i="${idx}"]`);
        if (active) active.classList.add("pl-active");

        // UI do player
        const cover = document.getElementById("iosCover");
        if (t.cover) {
            cover.innerHTML = `<img src="${t.cover}" alt="${t.name}">`;
            cover.style.background = "transparent";
        } else {
            cover.innerHTML = t.emoji;
            cover.style.background = t.color + "33";
        }
        document.getElementById("iosGlow").style.background = t.color;
        document.getElementById("iosTitle").textContent = t.name;
        document.getElementById("iosSub").textContent = `${t.artist} — ${t.album}`;

        // mostrar overlay
        document.getElementById("iosOverlay").classList.add("active");

        // tocar áudio
        audio.src = t.src;
        audio.load();
        audio.play().catch(e => console.warn("Erro ao tocar:", e));

        updateIcon();
    }

    function closePlayer() {
        document.getElementById("iosOverlay").classList.remove("active");
        audio.pause();
        updateIcon();
    }

    // controles
    document.getElementById("iosClose").addEventListener("click", closePlayer);
    document.getElementById("iosOverlay").addEventListener("click", function (e) {
        if (e.target === this) closePlayer();
    });

    document.getElementById("iosPlay").addEventListener("click", () => {
        if (cur < 0) return;
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        updateIcon();
    });

    document.getElementById("iosNext").addEventListener("click", () => {
        openPlayer((cur + 1) % tracks.length);
    });

    document.getElementById("iosPrev").addEventListener("click", () => {
        if (audio.currentTime > 3) {
            audio.currentTime = 0;
        } else {
            openPlayer((cur - 1 + tracks.length) % tracks.length);
        }
    });

    // volume
    document.querySelector(".ios-vol-slider").addEventListener("input", function () {
        audio.volume = this.value / 100;
    });

    // heart toggle
    document.getElementById("iosHeart").addEventListener("click", function () {
        this.classList.toggle("liked");
        this.textContent = this.classList.contains("liked") ? "♥" : "♡";
    });
})();
