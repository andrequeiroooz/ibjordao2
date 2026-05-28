/* =========================================
   SCRIPTS DA PÁGINA (Vanilla JS)
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. MENU MOBILE (HAMBÚRGUER)
    // =========================================
    const btnMenu = document.getElementById('btn-menu');
    const navMenu = document.getElementById('nav-menu');
    const menuLinks = document.querySelectorAll('.nav-menu a');

    if (btnMenu && navMenu) {
        btnMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            if (navMenu.classList.contains('active')) {
                btnMenu.innerHTML = '✕';
                btnMenu.setAttribute('aria-label', 'Fechar menu');
            } else {
                btnMenu.innerHTML = '☰';
                btnMenu.setAttribute('aria-label', 'Abrir menu');
            }
        });

        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    btnMenu.innerHTML = '☰';
                }
            });
        });

        document.addEventListener('click', (event) => {
            const cliqueNoMenu = navMenu.contains(event.target);
            const cliqueNoBotao = btnMenu.contains(event.target);

            if (!cliqueNoMenu && !cliqueNoBotao && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                btnMenu.innerHTML = '☰';
            }
        });
    }

    // =========================================
    // 2. ANIMAÇÃO DE REVEAL CARD A CARD (PC)
    // =========================================
    const cards = document.querySelectorAll('.card');

    if (cards.length > 0) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aparecer');
                    cardObserver.unobserve(entry.target); 
                }
            });
        }, {
            threshold: 0.1,             
            rootMargin: '0px 0px -20px 0px' 
        });

        cards.forEach(card => cardObserver.observe(card));
    }

    // =========================================
    // 3. ESTEIRA CONTÍNUA E ARRASTÁVEL (MOBILE)
    // =========================================
    const gridCards = document.querySelector('.cards-grid');
    
    if (gridCards && cards.length > 0) {
        let isPaused = false;
        let posicaoExata = gridCards.scrollLeft; 

        function scrollContinuo() {
            if (!isPaused && window.innerWidth < 992) {
                posicaoExata += 0.3; 
                gridCards.scrollLeft = posicaoExata; 
                if (gridCards.scrollLeft >= (gridCards.scrollWidth - gridCards.clientWidth) - 1) {
                    posicaoExata = 0; 
                    gridCards.scrollLeft = 0; 
                }
            }
            requestAnimationFrame(scrollContinuo);
        }

        scrollContinuo();

        gridCards.addEventListener('touchstart', () => {
            isPaused = true; 
        }, { passive: true });
        
        gridCards.addEventListener('touchend', () => {
            setTimeout(() => {
                posicaoExata = gridCards.scrollLeft; 
                isPaused = false;
            }, 1000); 
        }, { passive: true });
    }

    // =========================================
    // 4. ANIMAÇÃO DE SURGIR TIPO APP (GLOBAL)
    // =========================================
    const elementosSurgir = document.querySelectorAll('.hero-texto, .hero-imagem-wrapper, .titulo-secao, .sobre-texto, .simbolo-significado, .info-card, .convite-texto, .convite-mapa, .footer-col');

    if (elementosSurgir.length > 0) {
        elementosSurgir.forEach(el => el.classList.add('efeito-surgir'));

        const observadorSurgir = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visivel'); 
                    }, 150 + (index * 100)); 
                    observadorSurgir.unobserve(entry.target); 
                }
            });
        }, {
            threshold: 0.1, 
            rootMargin: "0px 0px -40px 0px" 
        });

        elementosSurgir.forEach(el => observadorSurgir.observe(el));
    }

});