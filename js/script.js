// ===== MENU MOBILE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
});

// ===== MENU ATIVO BASEADO NA SEÇÃO =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== BOTÃO VOLTAR AO TOPO =====
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== ANIMAÇÃO AO SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s ease forwards';
        }
    });
}, observerOptions);

// Observar elementos
document.querySelectorAll('.skill-card, .projeto-card, .method-card, .icon-box').forEach(el => {
    observer.observe(el);
});

// ===== ANIMAÇÃO DAS BARRAS DE SKILL =====
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBar = entry.target.querySelector('.skill-bar');
            if (skillBar) {
                const width = skillBar.style.width;
                skillBar.style.width = '0';
                setTimeout(() => {
                    skillBar.style.width = width;
                }, 200);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card').forEach(card => {
    skillObserver.observe(card);
});

// ===== CONTADOR ANIMADO (Stats) =====
const animateCounter = (element, target) => {
    const numberSpan = element.querySelector('.stat-number');
    const plusSpan = element.querySelector('.plus');
    
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            numberSpan.textContent = target;
            clearInterval(timer);
        } else {
            numberSpan.textContent = Math.floor(current);
        }
    }, 30);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItems = entry.target.querySelectorAll('.stat-item h3');
            statItems.forEach(item => {
                const numberSpan = item.querySelector('.stat-number');
                const target = parseInt(numberSpan.textContent);
                animateCounter(item, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ===== MODAL PARA IMAGENS DOS PROJETOS =====
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');

// Array com informações dos projetos (em ordem)
const projectImages = [
    { image: 'imagens/governança.png', title: 'Arquitetura de Governança de Dados em BI' },
    { image: 'imagens/automacao.png', title: 'Automação de Processos BI' },
    { image: 'imagens/pipeline.png', title: 'Pipeline de Dados Automatizado' },
    { image: 'imagens/dashboard.png', title: 'Dashboard Executivo Consolidado' },
    { image: 'imagens/extensao.png', title: 'Extensão Customizada' },
    { image: 'imagens/app.png', title: 'App de Coleta de Dados' }
];

let currentImageIndex = 0;

// Abrir modal com imagem
function openImageModal(imagePath, projectName) {
    // Encontra o índice da imagem
    currentImageIndex = projectImages.findIndex(proj => proj.image === imagePath);
    if (currentImageIndex === -1) currentImageIndex = 0;
    
    displayCurrentImage();
    imageModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Exibir imagem atual
function displayCurrentImage() {
    const project = projectImages[currentImageIndex];
    modalImage.src = project.image;
    modalTitle.textContent = project.title;
}

// Próxima imagem
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % projectImages.length;
    displayCurrentImage();
}

// Imagem anterior
function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + projectImages.length) % projectImages.length;
    displayCurrentImage();
}

// Fechar modal de imagem
function closeImageModal() {
    imageModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners para botões de visualizar
document.querySelectorAll('.btn-visualizar').forEach(btn => {
    btn.addEventListener('click', function() {
        const imagePath = this.getAttribute('data-image');
        const projectCard = this.closest('.projeto-card');
        const projectName = projectCard.querySelector('.projeto-header h3').textContent;
        openImageModal(imagePath, projectName);
    });
});

// Fechar modal ao clicar fora
imageModal.addEventListener('click', function(e) {
    if (e.target === imageModal) {
        closeImageModal();
    }
});

// Fechar modal ao pressionar ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeImageModal();
    }
    // Navegação com setas do teclado
    if (imageModal.classList.contains('active')) {
        if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            previousImage();
        }
    }
});

// ===== BOTÃO CURRÍCULO =====
const btnCurriculo = document.getElementById('btnCurriculo');

if (btnCurriculo) {
    btnCurriculo.addEventListener('click', function() {
        // Abre o PDF para visualizar em uma nova aba
        window.open('curriculo/Curriculo.pdf', '_blank');
    });
}


