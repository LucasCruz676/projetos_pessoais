// menuBG.js
document.addEventListener('DOMContentLoaded', function() {
    const hamburguer = document.querySelector('.hamburguer');
    
    if (hamburguer) {
        hamburguer.addEventListener('click', () => {
            document.querySelector('.navHeader').classList.toggle('active');
            hamburguer.classList.toggle('active');
        });
    }

    // Scroll de cards (apenas se existir na página)
    const scrollContainer = document.querySelector('.scroll');
    const btnLeft = document.querySelector('.scroll-btn.left');
    const btnRight = document.querySelector('.scroll-btn.right');

    if (scrollContainer && btnLeft && btnRight) {
        const card = document.querySelector('.card');
        if (card) {
            const gap = parseInt(getComputedStyle(document.querySelector('.scroll-container')).gap) || 18;
            const scrollAmount = card.offsetWidth + gap;

            function smoothScrollBy(container, distance, duration = 800) {
                const start = container.scrollLeft;
                const startTime = performance.now();

                function animate(time) {
                    const elapsed = time - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    container.scrollLeft = start + distance * easeInOutQuad(progress);
                    if (progress < 1) requestAnimationFrame(animate);
                }

                function easeInOutQuad(t) {
                    return t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t;
                }

                requestAnimationFrame(animate);
            }

            btnLeft.addEventListener('click', () => smoothScrollBy(scrollContainer, -scrollAmount));
            btnRight.addEventListener('click', () => smoothScrollBy(scrollContainer, scrollAmount));
        }
    }
});