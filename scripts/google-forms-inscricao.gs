/**
 * Monta o formulário de inscrição do Hackathon ESW & ADS 2026 (Univassouras Maricá).
 * Baseado no item 5.2 do edital: equipe, integrantes (nome, curso, período, matrícula),
 * líder e contato, e 3 desafios em ordem de preferência. Inscrição individual (item 4.6).
 *
 * Como usar: Google Apps Script → colar este código → executar a função montarFormulario.
 * ATENÇÃO: apaga todas as perguntas existentes no formulário antes de montar.
 */
const FORM_ID = '1GIeUVz3WX6q7avka3A9ka076pCp5UKpccfIRzjLvC1E';
const SITE = 'https://hackathon-univassouras-marica.vercel.app';

const CURSOS_TI = ['Engenharia de Software', 'Análise e Desenvolvimento de Sistemas'];
const PERIODOS = ['1º período', '2º período', '3º período', '4º período', '5º período', '6º período', '7º período', '8º período'];

const DESAFIOS = [
  '1 · Mobilidade Urbana em Maricá (Software · Intermediário)',
  '2 · Comunicação Segura: Enigma × Criptografia Moderna (Software · Avançado)',
  '3 · Monitoramento Remoto de Pacientes (IoT · Avançado)',
  '4 · Horta Inteligente (IoT · Intermediário)',
  '5 · Monitoramento Inteligente de Ambientes (IoT · Intermediário)',
  '6 · Monitoramento de Desempenho Esportivo (IoT · Intermediário)',
  '7 · Cuidado Inteligente de Animais (IoT · Intermediário)',
  '8 · Qualidade da Água da Lagoa de Maricá (IoT · Avançado)',
  '9 · Serious Game Educativo (Software · Intermediário)',
  '10 · Economia Local: Vitrine Digital da Moeda Social (Software · Básico)',
  '11 · Acessibilidade Digital (Software · Intermediário)',
];

function montarFormulario() {
  const form = FormApp.openById(FORM_ID);

  // limpa o formulário
  form.getItems().forEach((it) => form.deleteItem(it));

  form
    .setTitle('Inscrição · Hackathon ESW & ADS 2026')
    .setDescription(
      [
        '</ Univassouras · Campus Maricá >',
        '',
        '19, 20 e 21 de outubro de 2026 · das 18h às 21h',
        'Três dias. Grandes desafios. Ideias que podem transformar o futuro.',
        '',
        'Forme sua equipe (3 a 5 integrantes), escolha um dos 11 desafios com problemas reais de Maricá e desenvolva um protótipo funcional com mentoria dos professores.',
        '',
        '• Quem pode participar: estudantes de Engenharia de Software e de Análise e Desenvolvimento de Sistemas. Cada equipe pode ter até 2 estudantes de outros cursos (Enfermagem, Nutrição, Educação Física, Administração…).',
        '• Ainda sem equipe? Inscreva-se individualmente: a organização forma as equipes no primeiro dia.',
        '• A inscrição implica a aceitação integral das normas do edital.',
        '',
        'Programação, desafios e regras: ' + SITE,
        'Dúvidas: coordengsoftware.marica@univassouras.edu.br',
      ].join('\n'),
    )
    .setCollectEmail(true)
    .setProgressBar(true)
    .setShowLinkToRespondAgain(false)
    .setConfirmationMessage(
      'Inscrição recebida! 🚀\n\nObrigado por se inscrever no Hackathon ESW & ADS 2026. A alocação dos desafios considera a ordem de preferência e a ordem de inscrição, e será divulgada pela organização.\n\nAcompanhe a programação em ' +
        SITE +
        '\n\nNos vemos dia 19/10!',
    );

  // ---------- Página 1: tipo de inscrição ----------
  const tipo = form
    .addMultipleChoiceItem()
    .setTitle('Como você vai participar?')
    .setHelpText('Escolha a opção que descreve a sua situação agora.')
    .setRequired(true);

  // ---------- Página 2: equipe ----------
  const pgEquipe = form
    .addPageBreakItem()
    .setTitle('Dados da equipe')
    .setHelpText('Equipes de 3 a 5 integrantes, com a maioria de estudantes de ESW ou ADS. Cada estudante pode integrar apenas uma equipe.');

  form.addTextItem().setTitle('Nome da equipe').setHelpText('Pode ser provisório. Seja criativo!').setRequired(true);

  form.addSectionHeaderItem().setTitle('Líder da equipe').setHelpText('O líder é o contato da equipe com a organização e assina o termo de empréstimo dos kits IoT, quando houver.');
  form.addTextItem().setTitle('Nome completo do líder').setRequired(true);
  addEmail(form, 'E-mail do líder');
  addWhatsApp(form, 'WhatsApp do líder');
  form.addListItem().setTitle('Curso do líder').setChoiceValues(CURSOS_TI).setRequired(true);
  form.addListItem().setTitle('Período do líder').setChoiceValues(PERIODOS).setRequired(true);
  addMatricula(form, 'Matrícula do líder');

  form
    .addMultipleChoiceItem()
    .setTitle('Quantos integrantes a equipe terá (contando o líder)?')
    .setChoiceValues(['3 integrantes', '4 integrantes', '5 integrantes'])
    .setRequired(true);

  form
    .addSectionHeaderItem()
    .setTitle('Demais integrantes')
    .setHelpText('Informe nome completo, curso, período e matrícula de cada integrante.\nExemplo: Maria Souza · Análise e Desenvolvimento de Sistemas · 3º período · 2024123456');
  [2, 3, 4, 5].forEach((n) => {
    form
      .addTextItem()
      .setTitle('Integrante ' + n)
      .setHelpText(n <= 3 ? 'Obrigatório.' : 'Deixe em branco se a equipe tiver menos integrantes.')
      .setRequired(n <= 3);
  });

  form
    .addMultipleChoiceItem()
    .setTitle('A equipe tem integrantes de outros cursos da universidade?')
    .setHelpText('Até 2 estudantes de outros cursos podem atuar como especialistas de domínio. Equipes multidisciplinares concorrem ao prêmio especial Destaque Multidisciplinar.')
    .setChoiceValues(['Não', 'Sim, 1 integrante', 'Sim, 2 integrantes'])
    .setRequired(true);

  // ---------- Página 3: individual ----------
  const pgIndividual = form
    .addPageBreakItem()
    .setTitle('Inscrição individual')
    .setHelpText('Sem problema começar sozinho! A organização promove a formação das equipes no primeiro dia do evento.');

  form.addTextItem().setTitle('Nome completo').setRequired(true);
  addEmail(form, 'E-mail');
  addWhatsApp(form, 'WhatsApp');
  form.addListItem().setTitle('Curso').setChoiceValues(CURSOS_TI.concat(['Outro curso da Univassouras (Enfermagem, Nutrição, Educação Física, Administração…)'])).setRequired(true);
  form.addListItem().setTitle('Período').setChoiceValues(PERIODOS).setRequired(true);
  addMatricula(form, 'Matrícula');
  form
    .addCheckboxItem()
    .setTitle('Em quais áreas você gostaria de atuar na equipe?')
    .setHelpText('Ajuda a organização a montar equipes equilibradas. Marque quantas quiser.')
    .setChoiceValues([
      'Front-end / interfaces web',
      'Back-end / APIs e banco de dados',
      'Desenvolvimento mobile',
      'IoT / hardware (ESP32, sensores)',
      'Jogos digitais',
      'Dados e inteligência artificial',
      'UX/UI design',
      'Segurança da informação',
      'Gestão do projeto e pitch',
      'Conhecimento de domínio (saúde, esporte, gestão…)',
    ])
    .setRequired(true);

  // ---------- Página 4: desafios ----------
  const pgDesafios = form
    .addPageBreakItem()
    .setTitle('Escolha dos desafios')
    .setHelpText(
      'Indique 3 desafios diferentes em ordem de preferência. A alocação considera essa ordem e a ordem de inscrição.\n\nNível orientativo: Básico (10) · Intermediário (1, 4, 5, 6, 7, 9 e 11) · Avançado (2, 3 e 8). Equipes de períodos iniciais devem priorizar Básico ou Intermediário.\nDesafios 3 a 8 (IoT) usam kits com ESP32 e sensores emprestados pela universidade.\n\nDetalhes de cada desafio no edital e em ' +
        SITE,
    );
  ['1ª opção de desafio', '2ª opção de desafio', '3ª opção de desafio'].forEach((t) =>
    form.addListItem().setTitle(t).setChoiceValues(DESAFIOS).setRequired(true),
  );
  form
    .addParagraphTextItem()
    .setTitle('Observações (opcional)')
    .setHelpText('Necessidades de acessibilidade, restrições de horário ou qualquer informação útil para a organização.');

  // ---------- Página 5: termos ----------
  const pgTermos = form.addPageBreakItem().setTitle('Confirmação').setHelpText('Último passo! Leia e confirme para concluir a inscrição.');
  form
    .addCheckboxItem()
    .setTitle('Termos de participação')
    .setChoiceValues([
      'Li e aceito integralmente as normas do edital do Hackathon ESW & ADS 2026.',
      'Autorizo o uso da minha imagem e voz, captadas durante o evento, em materiais de divulgação institucional da universidade (item 15.2 do edital).',
      'Concordo com o uso dos dados desta inscrição pela organização, exclusivamente para a gestão do evento, conforme a LGPD.',
    ])
    .setValidation(FormApp.createCheckboxValidation().requireSelectAtLeast(3).setHelpText('Marque as três opções para concluir a inscrição.').build())
    .setRequired(true);

  // ---------- Navegação ----------
  tipo.setChoices([
    tipo.createChoice('Já tenho equipe formada (3 a 5 integrantes)', pgEquipe),
    tipo.createChoice('Ainda não tenho equipe: quero me inscrever individualmente', pgIndividual),
  ]);
  // ao terminar a página da equipe, pula a página individual
  pgIndividual.setGoToPage(pgDesafios);
  pgTermos.setGoToPage(FormApp.PageNavigationType.CONTINUE);

  Logger.log('Formulário montado: ' + form.getItems().length + ' itens');
  Logger.log('Link para responder: ' + form.getPublishedUrl());
  Logger.log('Link curto: ' + form.shortenFormUrl(form.getPublishedUrl()));
}

function addEmail(form, title) {
  form
    .addTextItem()
    .setTitle(title)
    .setValidation(FormApp.createTextValidation().requireTextIsEmail().setHelpText('Informe um e-mail válido.').build())
    .setRequired(true);
}

function addWhatsApp(form, title) {
  form
    .addTextItem()
    .setTitle(title)
    .setHelpText('Com DDD. Ex.: (21) 99999-9999')
    .setValidation(FormApp.createTextValidation().requireTextMatchesPattern('^\\(?\\d{2}\\)?\\s?9?\\d{4}-?\\d{4}$').setHelpText('Use o formato (21) 99999-9999.').build())
    .setRequired(true);
}

function addMatricula(form, title) {
  form
    .addTextItem()
    .setTitle(title)
    .setValidation(FormApp.createTextValidation().requireTextMatchesPattern('^\\d{4,15}$').setHelpText('Informe apenas os números da matrícula.').build())
    .setRequired(true);
}
