document.addEventListener('DOMContentLoaded', function() {

    // Efeito de Cabeçalho que Encolhe ou Muda ao Rolar
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Navegação Suave e Destaque de Link Ativo
    const navLinks = document.querySelectorAll('#main-nav a.nav-link');
    const sections = [];
    navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section) {
            sections.push(section);
            link.addEventListener('click', function(e) {
                e.preventDefault();
                // Fechar menu mobile se estiver aberto (adicionar lógica do menu mobile aqui)
                // const mobileNav = document.getElementById('main-nav ul');
                // if (mobileNav.classList.contains('active')) {
                //    mobileNav.classList.remove('active');
                // }

                window.scrollTo({
                    top: section.offsetTop - header.offsetHeight + 1, // +1 para garantir que o próximo seja ativado
                    behavior: 'smooth'
                });
            });
        }
    });

    function highlightActiveLink() {
        let currentSection = null;
        const scrollPosition = window.scrollY + header.offsetHeight + 50; // Offset para ativar um pouco antes

        sections.forEach(section => {
            if (section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', highlightActiveLink);
    highlightActiveLink(); // Executa uma vez ao carregar


    // Efeito de Digitação para o Nome no Hero
    const heroNameElement = document.querySelector('.hero-name');
    if (heroNameElement && heroNameElement.dataset.text) {
        const textToType = heroNameElement.dataset.text;
        let index = 0;
        heroNameElement.innerHTML = ""; // Limpa para o efeito

        function typeHeroName() {
            if (index < textToType.length) {
                heroNameElement.innerHTML += textToType.charAt(index);
                index++;
                setTimeout(typeHeroName, 120); // Velocidade da digitação
            } else {
                 if (heroNameElement.classList.contains('hero-name')) { // Garante que é o elemento certo
                    heroNameElement.style.borderRight = 'none'; // Remove cursor ao final
                 }
            }
        }
        setTimeout(typeHeroName, 500); // Inicia após um pequeno delay
    }

    // Funcionalidade das Abas de Experiência
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' de todos os botões e painéis
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Adiciona 'active' ao botão clicado e painel correspondente
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
            const targetPanelId = button.getAttribute('aria-controls');
            document.getElementById(targetPanelId).classList.add('active');
        });
         // Acessibilidade: Navegação por teclado nas abas
        button.addEventListener('keydown', (e) => {
            let newIdx;
            const currentIdx = Array.from(tabButtons).indexOf(e.target);

            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                newIdx = (currentIdx + 1) % tabButtons.length;
                tabButtons[newIdx].focus();
                tabButtons[newIdx].click(); // Também ativa a aba
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                newIdx = (currentIdx - 1 + tabButtons.length) % tabButtons.length;
                tabButtons[newIdx].focus();
                tabButtons[newIdx].click(); // Também ativa a aba
            }
        });
    });


    // Animações ao Rolar com Intersection Observer
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observerInstance.unobserve(entry.target); // Anima apenas uma vez
                }
            });
        }, { threshold: 0.1 }); // 10% do elemento visível

        animatedElements.forEach(element => observer.observe(element));
    }

    // Atualizar ano no rodapé
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Menu Mobile Toggle (Básico - precisa ser estilizado no CSS)
    const mobileMenuButton = document.getElementById('mobile-menu-toggle');
    const mainNavUl = document.querySelector('#main-nav ul');

    if (mobileMenuButton && mainNavUl) {
        mobileMenuButton.addEventListener('click', () => {
            mainNavUl.classList.toggle('active'); // 'active' deve ser estilizado no CSS para mostrar o menu
            // Altera o ícone do botão
            const icon = mobileMenuButton.querySelector('i');
            if (mainNavUl.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                mobileMenuButton.setAttribute('aria-label', 'Fechar menu');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                mobileMenuButton.setAttribute('aria-label', 'Abrir menu');
            }
        });
         // Fechar menu ao clicar em um link (para SPAs)
        mainNavUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNavUl.classList.contains('active')) {
                    mainNavUl.classList.remove('active');
                    const icon = mobileMenuButton.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    mobileMenuButton.setAttribute('aria-label', 'Abrir menu');
                }
            });
        });
    }

    console.log("Portfólio inspirado em Brittany Chiang carregado!");
});