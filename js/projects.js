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

const skillsSection = document.querySelector('#skills');
if (skillsSection) {
  const categories = [...skillsSection.querySelectorAll(':scope > .container > .skills-category')];
  const skillTabLabels = ['Ferramentas BI', 'Ciência de Dados', 'Engenharia de Dados', 'Power Platform', 'Programação & Web', 'Idiomas', 'Metodologias'];
  const tabs = document.createElement('div');
  tabs.className = 'skills-tabs';
  tabs.setAttribute('role', 'tablist');
  tabs.setAttribute('aria-label', 'Categorias de habilidades');

  categories.forEach((category, index) => {
    const heading = category.querySelector(':scope > h3');
    const categoryId = `skill-category-${index}`;
    const tabId = `skill-tab-${index}`;
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'skill-tab';
    tab.id = tabId;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', categoryId);
    tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    const icon = heading.querySelector('i')?.outerHTML || '';
    tab.innerHTML = `${icon}<span>${skillTabLabels[index] || heading.textContent.trim()}</span>`;
    tab.setAttribute('aria-label', heading.textContent.trim());
    category.id = categoryId;
    category.setAttribute('role', 'tabpanel');
    category.setAttribute('aria-labelledby', tabId);
    category.classList.toggle('has-carousel-controls', Boolean(category.querySelector('.skills-carousel-controls')));
    category.classList.toggle('active', index === 0);
    heading.remove();
    tabs.append(tab);

    tab.addEventListener('click', () => {
      categories.forEach(item => item.classList.toggle('active', item === category));
      tabs.querySelectorAll('.skill-tab').forEach(item => item.classList.toggle('active', item === tab));
      tabs.querySelectorAll('.skill-tab').forEach(item => item.setAttribute('aria-selected', item === tab ? 'true' : 'false'));
      requestAnimationFrame(() => category.querySelector('.skills-carousel')?.updateControls?.());
    });
  });

  tabs.querySelector('.skill-tab').classList.add('active');
  categories[0]?.before(tabs);
}

const experienceSection = document.querySelector('#experiencia');
if (experienceSection) {
  const wrapper = experienceSection.querySelector('.experiencia-wrapper');
  const columns = [...experienceSection.querySelectorAll('.experiencia-coluna')];
  const tabs = document.createElement('div');
  tabs.className = 'experience-tabs';
  tabs.setAttribute('role', 'tablist');
  tabs.setAttribute('aria-label', 'Categorias de experiência');
  const labels = ['Profissional', 'Acadêmica'];

  const actionRow = document.createElement('div');
  actionRow.className = 'experience-heading-row';
  const title = experienceSection.querySelector('.section-title');
  title.parentElement.insertBefore(actionRow, title.nextSibling);
  actionRow.append(tabs);

  const resumeButton = experienceSection.querySelector('#btnCurriculo');
  if (resumeButton) {
    resumeButton.className = 'experience-download';
    resumeButton.innerHTML = '<i class="fas fa-file-pdf"></i><span>Baixar currículo PDF</span>';
    resumeButton.setAttribute('aria-label', 'Baixar currículo em PDF');
    actionRow.append(resumeButton);
  }

  columns.forEach((column, index) => {
    const tab = document.createElement('button');
    const tabId = `experience-tab-${index}`;
    const panelId = `experience-panel-${index}`;
    tab.type = 'button';
    tab.className = 'experience-tab';
    tab.id = tabId;
    tab.textContent = labels[index];
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panelId);
    tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    column.id = panelId;
    column.setAttribute('role', 'tabpanel');
    column.setAttribute('aria-labelledby', tabId);
    column.classList.toggle('active', index === 0);
    tabs.append(tab);

    tab.addEventListener('click', () => {
      columns.forEach(item => item.classList.toggle('active', item === column));
      tabs.querySelectorAll('.experience-tab').forEach(item => {
        item.classList.toggle('active', item === tab);
        item.setAttribute('aria-selected', item === tab ? 'true' : 'false');
      });
    });
  });
  tabs.querySelector('.experience-tab').classList.add('active');

  const professionalList = experienceSection.querySelector('.profissional-content .experience-list');
  if (professionalList) {
    const professionalContent = experienceSection.querySelector('.profissional-content');
    const timelineContent = professionalList.closest('.timeline-content');
    const items = [...professionalList.querySelectorAll(':scope > li')];
    const grid = document.createElement('div');
    grid.className = 'experience-card-grid';

    const overview = document.createElement('article');
    overview.className = 'experience-card experience-overview';
    overview.innerHTML = '<h4>Experiência consolidada</h4><p>Atuação em empresas dos setores público e privado, transformando dados em soluções analíticas para gestão, monitoramento e tomada de decisão.</p><ul class="experience-list"><li>3+ anos de experiência em Business Intelligence</li><li>50+ dashboards interativos desenvolvidos em Qlik Sense e Power BI</li><li>200+ relatórios analíticos entregues para áreas de negócio</li><li>10+ projetos de BI implementados de ponta a ponta</li></ul>';
    grid.append(overview);

    const createExperienceItem = text => {
      const item = document.createElement('li');
      item.innerHTML = `<i class="fas fa-check-circle"></i> ${text}`;
      return item;
    };
    const groups = [
      ['BI, Governança e Soluções', [
        ...items.slice(3, 6),
        createExperienceItem('Gestão de acessos de pessoas a fluxos, aplicações e pastas de BI')
      ]],
      ['Automação, ETL e Modelagem', [
        ...items.slice(6),
        createExperienceItem('Desenvolvimento de softwares de automação para simplificar rotinas e reduzir tarefas manuais')
      ]]
    ];
    groups.forEach(([heading, groupedItems]) => {
      const card = document.createElement('article');
      card.className = 'experience-card';
      card.innerHTML = `<h4>${heading}</h4>`;
      const list = document.createElement('ul');
      list.className = 'experience-list';
      groupedItems.forEach(item => list.append(item));
      card.append(list);
      grid.append(card);
    });

    professionalContent.innerHTML = '<h3 class="experiencia-subtitle">Profissional</h3>';
    professionalContent.append(grid);
  }
  experienceSection.querySelectorAll('.academia-section').forEach(section => section.classList.add('experience-card'));
}

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
