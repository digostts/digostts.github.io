const projectCategories = { dashboards: 'Dashboard', predicoes: 'Predição', aplicativos: 'Aplicativo', automacoes: 'Automação' };

const hub = document.querySelector('.projetos-hub .container');
const template = document.getElementById('project-cards');
if (hub && template) hub.append(template.content.cloneNode(true));

function openProject(card) {
  const projectId = card.dataset.projectId;
  if (projectId) window.location.href = `projeto.html?id=${projectId}`;
}

document.querySelectorAll('.project-panel').forEach(panel => {
  const category = projectCategories[panel.dataset.projectPanel];
  const categoryProjects = projectData.filter(project => project.category === category);
  panel.querySelectorAll('.projeto-card').forEach((card, index) => {
    const project = categoryProjects[index];
    if (!project) return;
    card.dataset.projectId = project.id;
    card.querySelector('.projeto-header h3').textContent = project.title;
  });
});

document.querySelectorAll('.projeto-card').forEach(card => {
  card.tabIndex = 0;
  card.setAttribute('role', 'link');
  card.setAttribute('aria-label', `Abrir case: ${card.querySelector('h3').textContent.trim()}`);
  card.addEventListener('click', () => openProject(card));
  card.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openProject(card); } });
});

document.querySelectorAll('.project-tab').forEach(tab => tab.addEventListener('click', () => {
  const category = tab.dataset.projectCategory;
  document.querySelectorAll('.project-tab').forEach(item => { item.classList.toggle('active', item === tab); item.setAttribute('aria-selected', item === tab); });
  document.querySelectorAll('.project-panel').forEach(panel => panel.classList.toggle('active', panel.dataset.projectPanel === category));
  requestAnimationFrame(() => document.querySelector(`[data-project-panel="${category}"] .project-carousel`)?.updateControls());
}));

function setupCarousel(carousel, controls, previousButton, nextButton) {
  if (!carousel || !controls) return;

  const updateControls = () => {
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    const hasOverflow = maxScroll > 1;
    controls.hidden = !hasOverflow;
    if (!hasOverflow) return;
    const atStart = carousel.scrollLeft <= 4;
    const atEnd = carousel.scrollLeft >= maxScroll - 4;
    previousButton.style.visibility = atStart ? 'hidden' : 'visible';
    nextButton.style.visibility = atEnd ? 'hidden' : 'visible';
    previousButton.disabled = atStart;
    nextButton.disabled = atEnd;
    previousButton.setAttribute('aria-disabled', atStart);
    nextButton.setAttribute('aria-disabled', atEnd);
  };

  carousel.updateControls = updateControls;
  previousButton?.addEventListener('click', () => carousel.scrollBy({ left: -carousel.clientWidth * .85, behavior: 'smooth' }));
  nextButton?.addEventListener('click', () => carousel.scrollBy({ left: carousel.clientWidth * .85, behavior: 'smooth' }));
  carousel.addEventListener('scroll', updateControls, { passive: true });
  window.addEventListener('resize', updateControls);
  const resizeObserver = new ResizeObserver(updateControls);
  resizeObserver.observe(carousel);
  requestAnimationFrame(updateControls);
}

document.querySelectorAll('.project-panel').forEach(panel => {
  const controls = panel.querySelector('.carousel-controls div');
  setupCarousel(panel.querySelector('.project-carousel'), controls, panel.querySelector('.carousel-prev'), panel.querySelector('.carousel-next'));
});

document.querySelectorAll('[data-skill-carousel]').forEach(carousel => {
  const category = carousel.closest('.skills-category');
  setupCarousel(carousel, category.querySelector('.skills-carousel-controls div'), category.querySelector('.skill-carousel-prev'), category.querySelector('.skill-carousel-next'));
});
