document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Efeito de Scroll no Header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        // Adiciona fundo ao descer a página (ajusta conforme a classe .header-active no seu CSS)
        header.classList.toggle('header-active', window.scrollY > 50);
    });

    // 2. Reveal Animation (Interseção para animar a entrada dos elementos)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, observerOptions);

    // Seleciona os elementos que devem "subir" suavemente
    const elementsToAnimate = document.querySelectorAll('.section, .card, .hero h2, .hero p, .team-member');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('hidden-up');
        revealOnScroll.observe(el);
    });
});





// Função que simula a chamada de uma API
async function fetchAquaData() {
    // Simulando um delay de rede de 1 segundo
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                litrosMonitorados: 125480, // Valor que viria do banco de dados
                sensoresAtivos: 185,
                precisao: 99.8
            });
        }, 1000);
    });
}

// Função para atualizar o contador na tela
async function updateDashboard() {
    const litrosElement = document.getElementById('litros-count');
    
    try {
        // "Chamando" a API
        const data = await fetchAquaData();
        
        // Atualiza o valor no HTML
        litrosElement.innerText = data.litrosMonitorados;
        
        // Se você tiver uma função de animação de números (counter), 
        // você pode dispará-la aqui:
        // startCounterAnimation(); 

    } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
        litrosElement.innerText = "Erro";
    }
}

// Inicia a busca quando a página carrega
document.addEventListener('DOMContentLoaded', updateDashboard);