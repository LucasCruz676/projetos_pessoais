document.addEventListener('DOMContentLoaded', function () {
    // Tab functionality for Windows XP
    const tabButtons = document.querySelectorAll('.tab-button-xp');
    const tabContents = document.querySelectorAll('.tab-content-xp');

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Windows 8 See More functionality
    const seeMoreButtons = document.querySelectorAll('.see-more-btn');

    seeMoreButtons.forEach(button => {
        button.addEventListener('click', function () {
            const box = this.closest('.windows-8-box');
            box.classList.toggle('expanded');
        });
    });

    // Scroll Reveal Animation
    function initScrollReveal() {
        const scrollElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
        
        const elementInView = (el, dividend = 1) => {
            const elementTop = el.getBoundingClientRect().top;
            return (
                elementTop <= 
                (window.innerHeight || document.documentElement.clientHeight) / dividend
            );
        };

        const displayScrollElement = (element) => {
            element.classList.add('revealed');
        };

        const hideScrollElement = (element) => {
            element.classList.remove('revealed');
        };

        const handleScrollAnimation = () => {
            scrollElements.forEach((el) => {
                if (elementInView(el, 1.2)) {
                    displayScrollElement(el);
                } else {
                    // Opcional: remover a classe para reanimar ao scrollar de volta
                    // hideScrollElement(el);
                }
            });
        };

        // Initial check
        handleScrollAnimation();
        
        // Listen for scroll events with throttle
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScrollAnimation();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Add scroll-reveal classes to elements
    function addScrollRevealClasses() {
        // Hero section
        document.querySelector('.hero-title')?.classList.add('scroll-reveal');
        
        // Main sections
        document.querySelectorAll('.section-title').forEach(el => {
            el.classList.add('scroll-reveal');
        });
        
        // Cards and features
        document.querySelectorAll('.os-feature-card').forEach((el, index) => {
            el.classList.add(index % 2 === 0 ? 'scroll-reveal-left' : 'scroll-reveal-right');
        });
        
        // Windows XP section
        document.querySelectorAll('.feature-card').forEach((el, index) => {
            el.classList.add('scroll-reveal');
        });
        
        // Windows 8 boxes
        document.querySelectorAll('.windows-8-box').forEach((el, index) => {
            el.classList.add(index % 2 === 0 ? 'scroll-reveal-left' : 'scroll-reveal-right');
        });
        
        // Images
        document.querySelectorAll('.xp-image').forEach(el => {
            el.classList.add('scroll-reveal');
        });
    }

    // Initialize everything
    addScrollRevealClasses();
    initScrollReveal();

    // Add loading animation to body
    document.body.classList.add('fade-in');
});