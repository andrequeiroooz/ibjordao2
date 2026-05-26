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
        // Evento para abrir/fechar o menu ao clicar no botão "Hambúrguer"
        btnMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Alterna o ícone visual entre ☰ e ✕ para ficar mais responsivo
            if (navMenu.classList.contains('active')) {
                btnMenu.innerHTML = '✕';
                btnMenu.setAttribute('aria-label', 'Fechar menu');
            } else {
                btnMenu.innerHTML = '☰';
                btnMenu.setAttribute('aria-label', 'Abrir menu');
            }
        });

        // Fechar o menu mobile automaticamente após clicar em um dos links
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    btnMenu.innerHTML = '☰';
                }
            });
        });

        // Fechar o menu mobile ao clicar fora dele (UX Premium)
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
    // 2. ANIMAÇÃO DE REVEAL (CASCATA DOS CARDS)
    // =========================================
    const cards = document.querySelectorAll('.card');
    const containerGrid = document.querySelector('.cards-grid');

    // Só ativa o observador se os elementos realmente existirem na página
    if (cards.length > 0 && containerGrid) {
        const dispararAnimacao = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    
                    // Executa o efeito cascata card por card com atraso (stagger)
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('aparecer');
                        }, index * 120); // 120 milissegundos de intervalo
                    });

                    // Uma vez animado, desativa o observador para poupar memória
                    dispararAnimacao.disconnect();
                }
            });
        }, {
            // Dispara quando 15% da seção de ministérios entra na tela
            threshold: 0.15 
        });

        // Inicia o monitoramento do grid de cards
        dispararAnimacao.observe(containerGrid);
    }
});