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

const projectImagesByCategory = {
    dashboards: [
        { image: 'imagens/dashboards-em-destaque/carnaval.svg', title: 'Carnaval' },
        { image: 'imagens/dashboards-em-destaque/tuberculose.svg', title: 'Tuberculose' },
        { image: 'imagens/dashboards-em-destaque/saude-coletiva.svg', title: 'Saúde Coletiva' },
        { image: 'imagens/dashboards-em-destaque/planejamento-recursos.svg', title: 'Planejamento de Recursos' },
        { image: 'imagens/dashboards-em-destaque/pmo-dados.svg', title: 'PMO da equipe de desenvolvimento de dados' }
    ],
    predicoes: [
        { image: 'imagens/predicoes-em-destaque/obitos-predicao.svg', title: 'Óbitos com Predição' },
        { image: 'imagens/predicoes-em-destaque/previsao-gasto-empresa.svg', title: 'Previsão de Gasto da Empresa' },
        { image: 'imagens/predicoes-em-destaque/previsao-valor-acao.svg', title: 'Previsão de Valor de Ação' }
    ],
    aplicativos: [
        { image: 'imagens/aplicativos-desenvolvidos/zapflow.svg', title: 'Zapflow' },
        { image: 'imagens/aplicativos-desenvolvidos/horacerta.svg', title: 'HoraCerta' }
    ],
    automacoes: [
        { image: 'imagens/automacoes-desenvolvidas/governanca-acesso.svg', title: 'Governança de Acesso com Power Platform' },
        { image: 'imagens/automacoes-desenvolvidas/preenchimento-formularios.svg', title: 'Preenchimento de Formulários em Massa' },
        { image: 'imagens/automacoes-desenvolvidas/disparo-email-massa.svg', title: 'Disparo de E-mails em Massa' }
    ]
};

let activeProjectImages = [];
let currentImageIndex = 0;

function getProjectCategory(imagePath) {
    if (imagePath.includes('dashboards-em-destaque')) return 'dashboards';
    if (imagePath.includes('predicoes-em-destaque')) return 'predicoes';
    if (imagePath.includes('aplicativos-desenvolvidos')) return 'aplicativos';
    if (imagePath.includes('automacoes-desenvolvidas')) return 'automacoes';
    return 'dashboards';
}

// Abrir modal com imagem
function openImageModal(imagePath, projectName, category = getProjectCategory(imagePath)) {
    activeProjectImages = projectImagesByCategory[category] || projectImagesByCategory.dashboards;
    currentImageIndex = activeProjectImages.findIndex(proj => proj.image === imagePath);
    if (currentImageIndex === -1) currentImageIndex = 0;

    modalImage.src = imagePath;
    modalTitle.textContent = projectName || activeProjectImages[currentImageIndex].title;
    imageModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Exibir imagem atual
function displayCurrentImage() {
    const project = activeProjectImages[currentImageIndex];
    if (!project) return;
    modalImage.src = project.image;
    modalTitle.textContent = project.title;
}

// Próxima imagem
function nextImage() {
    if (!activeProjectImages.length) return;
    currentImageIndex = (currentImageIndex + 1) % activeProjectImages.length;
    displayCurrentImage();
}

// Imagem anterior
function previousImage() {
    if (!activeProjectImages.length) return;
    currentImageIndex = (currentImageIndex - 1 + activeProjectImages.length) % activeProjectImages.length;
    displayCurrentImage();
}

// Fechar modal de imagem
function closeImageModal() {
    imageModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners para botões de visualizar
document.querySelectorAll('.btn-visualizar').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Se é um link (tem href), não abre o modal de imagem
        if (this.tagName === 'A' || this.getAttribute('href')) {
            return;
        }

        e.preventDefault();
        const imagePath = this.getAttribute('data-image');
        const projectCard = this.closest('.projeto-card');
        const projectName = projectCard.querySelector('.projeto-header h3').textContent;
        const category = this.getAttribute('data-category') || getProjectCategory(imagePath);
        openImageModal(imagePath, projectName, category);
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

// Navegação entre seções com setas (↑/↓), PageUp/PageDown, Home/End
(function sectionArrowNavigation() {
  const sectionSelector = 'section[id]'; // usa todas as <section id="...">
  let isScrolling = false;

  function getSections() {
    return Array.from(document.querySelectorAll(sectionSelector))
      // se quiser ignorar alguma seção, filtre aqui
      .filter(sec => sec.offsetParent !== null);
  }

  // Define a "seção atual" como a que tem o topo mais próximo do topo da viewport
  function getCurrentSectionIndex(sections) {
    const viewportTop = 0;
    let bestIndex = 0;
    let bestDistance = Infinity;

    sections.forEach((sec, idx) => {
      const rect = sec.getBoundingClientRect();
      const distance = Math.abs(rect.top - viewportTop);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = idx;
      }
    });

    return bestIndex;
  }

  function scrollToSection(index) {
    const sections = getSections();
    if (!sections.length) return;

    const target = sections[Math.max(0, Math.min(index, sections.length - 1))];
    if (!target) return;

    isScrolling = true;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // cooldown para evitar múltiplos disparos enquanto anima
    window.setTimeout(() => {
      isScrolling = false;
    }, 700);
  }

  function scrollNext() {
    const sections = getSections();
    const current = getCurrentSectionIndex(sections);
    scrollToSection(current + 1);
  }

  function scrollPrev() {
    const sections = getSections();
    const current = getCurrentSectionIndex(sections);
    scrollToSection(current - 1);
  }

  // Expor funções se você quiser ligar em botões (opcional)
  window.scrollNextSection = scrollNext;
  window.scrollPrevSection = scrollPrev;

  window.addEventListener('keydown', (e) => {
    // não interferir quando estiver digitando
    const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
    const isTypingField = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;
    if (isTypingField) return;

    if (isScrolling) return;

    // ↓ ou PageDown: próxima seção
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      scrollNext();
    }

    // ↑ ou PageUp: seção anterior
    if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      scrollPrev();
    }

    // Home: primeira; End: última
    if (e.key === 'Home') {
      e.preventDefault();
      scrollToSection(0);
    }
    if (e.key === 'End') {
      e.preventDefault();
      const sections = getSections();
      scrollToSection(sections.length - 1);
    }
  }, { passive: false });
})();

