/**
 * Perguntas frequentes, regras e premiação.
 * Fonte: Edital Hackathon ESW & ADS 2026 (docs/referencias/edital-hackathon-2026.pdf).
 * Respostas `null` aparecem como "EM CONSTRUÇÃO".
 */
export const faq: { question: string; answer: string | null }[] = [
  {
    question: 'Quem pode participar?',
    answer:
      'Estudantes regularmente matriculados em Engenharia de Software ou Análise e Desenvolvimento de Sistemas da Univassouras, Campus Maricá. Cada equipe pode incluir até 2 estudantes de outros cursos (como Enfermagem, Nutrição, Educação Física ou Administração), que atuam como especialistas de domínio.',
  },
  { question: 'Quanto custa a inscrição?', answer: 'Nada: a inscrição é gratuita. É só preencher o formulário de inscrição.' },
  {
    question: 'Até quando posso me inscrever?',
    answer:
      'Até 19 de outubro. No formulário vão os integrantes (nome, curso, período e matrícula), o líder e três desafios em ordem de preferência. A alocação sai no mesmo dia.',
  },
  {
    question: 'Quantas pessoas por equipe?',
    answer: 'De 3 a 5 integrantes, com a maioria de estudantes de ESW ou ADS. Cada estudante participa de apenas uma equipe, e cada equipe desenvolve um único desafio.',
  },
  {
    question: 'Preciso já ter uma equipe formada?',
    answer: 'Não. Quem não tiver equipe pode se inscrever individualmente: a organização promove a formação das equipes no primeiro dia do evento.',
  },
  {
    question: 'Quais são os desafios?',
    answer:
      'São 11 desafios com problemas reais de Maricá e de áreas parceiras: mobilidade urbana, comunicação segura (Enigma × criptografia moderna), seis desafios de IoT (saúde, horta, segurança, esporte, pets e qualidade da água da lagoa), serious game educativo, vitrine digital da moeda social e acessibilidade digital. Na inscrição, a equipe indica 3 desafios em ordem de preferência.',
  },
  {
    question: 'Posso usar inteligência artificial e qualquer tecnologia?',
    answer:
      'Sim. Linguagens, frameworks, bancos de dados, APIs e ferramentas de IA são de livre escolha. As ferramentas de IA devem ser declaradas no README, e todos os integrantes precisam saber explicar a solução na arguição técnica.',
  },
  {
    question: 'Preciso levar hardware para os desafios de IoT?',
    answer: 'Não. Nos desafios 3 a 8, a universidade empresta kits com ESP32 e sensores, já montados e testados, mediante termo de responsabilidade assinado pelo líder da equipe.',
  },
  {
    question: 'Preciso levar notebook?',
    answer: 'Pode levar, sim. Traga seu notebook para desenvolver durante o evento, e não esqueça o carregador.',
  },
  {
    question: 'Vale certificado / horas complementares?',
    answer:
      'Sim. Todas as equipes que concluírem a apresentação recebem certificado de participação de 20 horas, válido como atividade complementar ou de extensão conforme o regulamento do curso. As equipes premiadas recebem também certificado de premiação.',
  },
];

/** Regras. Lista vazia aparece como "EM CONSTRUÇÃO". */
export const rules: string[] = [
  'Equipes de 3 a 5 integrantes, com até 2 de outros cursos.',
  'Repositório público no GitHub desde o início; a banca olha o histórico de commits.',
  'IA, bibliotecas e código aberto valem, declarados no README.',
  'Dados simulados ou anonimizados, conforme a LGPD.',
  'Solução feita fora do evento, plágio ou falta de domínio da própria solução desclassificam a equipe.',
];

/** Premiação. Lista vazia aparece como "EM CONSTRUÇÃO". */
export const prizes: { place: string; prize: string }[] = [
  // texto da bolsa ajustado a pedido do coordenador (19/10/2026)
  { place: '1º', prize: 'Bolsa 100% de curso de aperfeiçoamento na área de IA e Games, pontuação extra nas disciplinas e outros prêmios' },
  { place: '2º', prize: 'Bolsa 100% de curso de aperfeiçoamento na área de IA e Games e outros prêmios' },
  { place: '3º', prize: 'Outros prêmios' },
];

/** Prêmios especiais (não excludentes), exibidos numa linha abaixo do pódio. */
export const specialPrizes = ['Melhor Solução Técnica', 'Solução Mais Inovadora', 'Melhor Experiência do Usuário', 'Destaque Multidisciplinar', 'Prêmio do Público'];

/** Observação exibida no cartão de premiação. */
export const prizesNote = 'Pódio em cada categoria, Software e IoT.';
