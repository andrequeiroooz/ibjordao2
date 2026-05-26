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
        let posicaoExata = gridCards.scrollLeft; // Cria a memória para aceitar números quebrados

        function scrollContinuo() {
            if (!isPaused && window.innerWidth < 992) {
                
                // 👇 Aqui você pode colocar 0.3, 0.5, 0.2... Agora ele aceita qualquer velocidade lenta!
                posicaoExata += 0.3; 
                
                // Passa o valor acumulado para a barra de rolagem
                gridCards.scrollLeft = posicaoExata; 
                
                if (gridCards.scrollLeft >= (gridCards.scrollWidth - gridCards.clientWidth) - 1) {
                    posicaoExata = 0; // Zera a memória ao voltar para o começo
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
                // Quando o visitante solta o dedo, avisamos o JavaScript onde a barra parou
                posicaoExata = gridCards.scrollLeft; 
                isPaused = false;
            }, 1000); 
        }, { passive: true });
    }
});