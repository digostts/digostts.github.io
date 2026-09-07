const projects = projectData.map(project => [project.id, project.title, project.category, project.summary, project.image, project.tags]);
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
hamburger?.addEventListener('click', () => {
	navMenu.classList.toggle('active');
	hamburger.setAttribute('aria-expanded', navMenu.classList.contains('active'));
});
navMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
	navMenu.classList.remove('active');
	hamburger?.setAttribute('aria-expanded', 'false');
}));
const id = new URLSearchParams(location.search).get('id'); const index = Math.max(0, projects.findIndex(p => p[0] === id)); const p = projects[index];
const $ = selector => document.querySelector(selector); document.title = `${p[1]} | Rodrigo Santos`;
$('#caseCategory').textContent = p[2]; $('#caseTitle').textContent = p[1]; $('#caseSummary').textContent = p[3]; $('#caseImage').src = p[4]; $('#caseImage').alt = `Visão geral: ${p[1]}`; $('#caseOverview').textContent = `O case reúne dados e contexto operacional em uma experiência clara, permitindo que a equipe acompanhe prioridades e atue com mais confiança.`;
$('#caseTags').innerHTML = p[5].map(tag => `<span class="tag">${tag}</span>`).join('');
const predictive = p[2] === 'Predição', automation = p[2] === 'Automação'; const values = predictive ? [['Tendência','Previsão'],['Variáveis','Análise'],['Cenários','Simulação']] : automation ? [['Etapas','Automatizadas'],['Tempo','Otimizado'],['Processo','Padronizado']] : [['Dados','Consolidados'],['Indicadores','Monitorados'],['Decisões','Apoiadas']];
['One','Two','Three'].forEach((n,i) => { $(`#kpi${n}`).textContent = values[i][0]; $(`#kpi${n}Label`).textContent = values[i][1]; });
$('#caseGoal').textContent = `Disponibilizar uma solução confiável e objetiva para transformar dados em informações acionáveis no contexto de ${p[1]}.`;
const indicatorsByProject = {
	carnaval: ['Atendimentos por período e local', 'Perfil dos atendimentos realizados', 'Ocorrências para priorização operacional'],
	tuberculose: ['Casos acompanhados por período', 'Ações de busca ativa realizadas', 'Distribuição por território e perfil'],
	'saude-coletiva': ['Evolução dos indicadores epidemiológicos', 'Recortes por período e território', 'Tendências para apoio à gestão'],
	'planejamento-recursos': ['Pessoas planejadas, alocadas e efetivas', 'Capacidade disponível por projeto', 'Demanda e distribuição de recursos'],
	'pmo-dados': ['Projetos por status e prioridade', 'Entregas realizadas por período', 'Performance da equipe de desenvolvimento'],
	'obitos-predicao': ['Óbitos observados e projetados', 'Variáveis relevantes para a previsão', 'Tendências por período'],
	'previsao-gasto-empresa': ['Gastos históricos por categoria', 'Projeção de gastos futuros', 'Variação entre realizado e previsto'],
	'previsao-valor-acao': ['Histórico de preços e tendências', 'Variação do ativo por período', 'Cenários para apoio à decisão'],
	zapflow: ['Mensagens processadas por campanha', 'Status dos envios realizados', 'Tempo economizado na operação'],
	horacerta: ['Horas trabalhadas e compensadas', 'Saldo do banco de horas', 'Simulações por período'],
	flowproject: ['Demandas por status e prioridade', 'Entregas por projeto e período', 'Distribuição das atividades da equipe'],
	'governanca-acesso': ['Solicitações por status', 'Perfis e permissões concedidos', 'Pendências de aprovação'],
	'preenchimento-formularios': ['Formulários processados por lote', 'Registros concluídos e pendentes', 'Exceções identificadas no fluxo'],
	'disparo-email-massa': ['E-mails enviados por campanha', 'Status de entrega e falhas', 'Volume processado por período']
};
const indicators = indicatorsByProject[p[0]] || (predictive ? ['Tendências históricas e projeções', 'Variáveis relevantes ao modelo', 'Cenários para apoio à decisão'] : automation ? ['Volume processado por período', 'Status e exceções do fluxo', 'Tempo economizado na operação'] : ['Evolução dos indicadores-chave', 'Recortes por período e perfil', 'Alertas para priorização de ações']);
$('#caseIndicators').innerHTML = indicators.map(item => `<li>${item}</li>`).join('');
$('#caseFlow').innerHTML = ['Entendimento do contexto e das perguntas de negócio','Mapeamento, tratamento e validação das fontes de dados','Construção da solução e dos indicadores prioritários','Validação com usuários e refinamento da experiência'].map(item => `<li>${item}</li>`).join('');
$('#caseChallenges').textContent = automation ? 'Padronizar regras e exceções do processo sem perder rastreabilidade, preservando uma experiência simples para o usuário.' : predictive ? 'Equilibrar a qualidade dos dados, a interpretação das variáveis e a comunicação responsável das projeções.' : 'Consolidar dados de diferentes origens e traduzir necessidades operacionais em indicadores fáceis de acompanhar.';
$('#caseInsights').textContent = predictive ? 'A leitura de tendências e cenários torna a conversa de planejamento mais antecipatória e orientada por evidências.' : automation ? 'A automação reduz atividades repetitivas, aumenta a consistência e libera tempo para análise e decisão.' : 'Uma visão centralizada facilita a identificação de prioridades, desvios e oportunidades de melhoria.';
const linkFor = i => `projeto.html?id=${projects[(i + projects.length) % projects.length][0]}`; $('#previousProject').href = linkFor(index-1); $('#previousProject').querySelector('span').textContent = projects[(index-1+projects.length)%projects.length][1]; $('#nextProject').href = linkFor(index+1); $('#nextProject').querySelector('span').textContent = projects[(index+1)%projects.length][1];
