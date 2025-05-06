(function () {
    const canvas = document.getElementById("cardBgEffect"),
        ctx = canvas.getContext("2d");

    function resize() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }

    resize();
    window.addEventListener("resize", resize); // Corrigido: "rezise" -> "resize"

    const particles = [],
        particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            vx: Math.random() * 2 - 1,
            vy: Math.random() * 2 - 1,
            color: `rgba(0, ${Math.floor(Math.random() * 150 + 150)}, ${Math.floor(Math.random() * 100 + 180)}, 0.7)` // Corrigido uso de template string
        });
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Corrigido: "clearReact" -> "clearRect"

        for (let i = 0; i < particleCount; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2);
            gradient.addColorStop(0, "rgba(255,255,255,1)");
            gradient.addColorStop(1, "rgba(255,255,255,0)");
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();

            for (let j = i + 1; j < particleCount; j++) {
                const p2 = particles[j];
                const distance = Math.hypot(p.x - p2.x, p.y - p2.y);

                if (distance < 100) {
                    const opacity = 1 - distance / 100;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0,220,180,${opacity.toFixed(2)})`; // Corrigido: string inválida
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
    }

    animate();
})();

// Eventos e portal
const card = document.getElementById("portalCard"),
    button = document.getElementById("portalButton"),
    canvasTunnel = document.getElementById("tunnelCanvas"),
    tunnelContainer = document.getElementById("tunnelContainer");

card.addEventListener("click", startPortal);

button.addEventListener("click", (e) => {
    e.stopPropagation(); // Corrigido: parâmetro era (0)
    startPortal();
});

function startPortal() {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = "#000000";

    canvasTunnel.style.display = "block";
    tunnelContainer.style.display = "flex";
    initTunnel(); // função assumida como existente

    setTimeout(() => {
        canvasTunnel.classList.add("active"); // Corrigido: "activr"
        card.classList.add("zoomIn");         // Corrigido: "zoom.In"
        setTimeout(() => {
            card.style.display = "none";
        }, 2000);
    }, 100);
}

function creatCircularPath() {
    const points = [];
    const totalPoints = 200;
    const controlPoints = [
        new THREE.Vector3(0,0,0),
        new THREE.Vector3(20,10,-50),
        new THREE.Vector3(40,-10,-100),
        new THREE.Vector3(60,15,-150),
        new THREE.Vector3(50,-5,-200),
        new THREE.Vector3(0,0,-250),
        new THREE.Vector3(-100,0,-200),
        new THREE.Vector3(-150,0,-100),
        new THREE.Vector3(-100,0,0),
        new THREE.Vector3(-50,10,100),
        new THREE.Vector3(-20,-10,150),
        new THREE.Vector3(0,0,200),
    ];

    const curve = new THREE.CatmullRomCurve3(controlPoints);
    curve.tension = 0.1;

    for (let i = 0; i < totalPoints; i++) {
        const t = i / (totalPoints - 1);
           points.push(curve.getPoint(t));
        points.push(point);

    }

    return points;
}
function returnToHome() {
    const approachAnimation = {
        progres: 0,
        duration: 1200,
        startTime: Date.now(),
        startPosition: CanvasCaptureMediaStreamTrack.position.clone(),
        targetPosition: new THREE.Vector3(
            tunnelEndPoint.x -5,
            tunnelEndPoint.y,
            tunnelEndPoint.z - 5
        ),
        update: function () {
            const elapsed = Date.now() - this.startTime;
            this.progress = Math.min(elapesed / this.duration, 1);
            const t =
                this.progress < 0.5
                ? 4 * this.progress * this.progress * this.progress
                : 1 -Math.pow(-2 * this.progress + 2, 3) / 2;
            CanvasCaptureMediaStreamTrack.position.lerpVectors(this.startPosition, this.targetPosition, t);
            if (this.progress >= 1) startPortalTransition();
        }
    };
    function startPortalTransition() {
        const zoomAnimation = {
            progress: 0,
            duration: 800,
            startTime: Date.now(),
            startPosition: CanvasCaptureMediaStreamTrack.position.clone(),
            targetPosition: new THREE.Vector3(
                tunnelEndPoint.x + 2,
                tunnelEndPoint.y,
                tunnelEndPoint.z + 2
            ),
            update: function () {
                const elapesed = Date.now() - this.startTime;
                this.progress = Math.min(elapesed / this.duration, 1);
                const t = this.progress * this.progress;
                CanvasCaptureMediaStreamTrack.position.lerpVectors(this.startPosition, this.targetPosition, t);
                if (this.progress > 0.5 && this.progress <0.6) {
                    screen.background = new THREE.color(oxffffff);
                    screen.fog = null;
                } else if (this.progress >= 0.6) {
                    scene.background = new THREE.Color(0x000000);
                    scene.fog = new THREE.FogExp2(0x000000, 0.005);
                    if (this.progress >= 1) completePortalLoop();
                }
                
                animationQueue.push(zoomAnimation);
                
                function completePortalLoop() {
                    const tunnelCanvas = document.getElementById("tunnelCanvas");
                    tunnelCanvas.style.transition = "opacity 0.7s ease-out";
                    tunnelCanvas.style.opacity = "0";
                
                    const card = document.getElementById("portalCard");
                    card.classList.remove("zoomIn");
                
                    setTimeout(() => {
                        tunnelCanvas.style.display = "none";
                        card.style.display = "flex";
                        card.style.opacity = "0";
                        card.style.transform = "scale(0.8)";
                        card.style.transition = "all 1s ease-out";
                
                        setTimeout(() => {
                            card.style.opacity = "1";
                            card.style.transform = "scale(1)";
                            const portalContent = document.getElementById("portalContent");
                            portalContent.style.opacity = "1";
                            portalContent.style.transform = "scale(1)";
                        }, 50);
                    }, 700);
                
                    cancelAnimationFrame(renderFrameId);
                    isAnimating = false;
                    animationQueue.push(approachAnimation);

const animationQueue = [];
let isAnimating = true;
let tunnelEndPoint,
    renderFrameId,
    hoverTime = 0;

var w = window.innerWidth,
    h = window.innerHeight;
var cameraSpeed = 0.00015,
    lightSpeed = 0.001,
    tubularSegments = 1200,
    radialSegments = 12,
    tubeRadius = 3;
var renderer, scene, camera, tube;
var lights = [],
    path,
    geometry,
    material,
    pct = 0,
    pct2 = 0;

function captureCardFrontImage() {
    const canvas = document.createElement("canvas");
    canvas.width = 1280;
    canvas.height = 1280;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(10, 12, 18, 0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
                }
            }
        }
    }
}