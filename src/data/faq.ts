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
  { question: 'Quanto custa a inscrição?', answer: null },
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
  { question: 'Preciso levar notebook?', answer: null },
  {
    question: 'Vale certificado / horas complementares?',
    answer:
      'Sim. Todas as equipes que concluírem a apresentação recebem certificado de participação, válido como atividade complementar ou de extensão conforme o regulamento do curso. As equipes premiadas recebem também certificado de premiação.',
  },
];

/** Regras. Lista vazia aparece como "EM CONSTRUÇÃO". */
export const rules: string[] = [
  'Equipes de 3 a 5 integrantes, com até 2 estudantes de outros cursos.',
  'Cada equipe cria no início do evento um repositório público no GitHub, informado à organização.',
  'O protótipo é desenvolvido durante o evento; o histórico de commits é considerado pela banca.',
  'Uso de bibliotecas, frameworks, código aberto e IA é permitido, com créditos e declaração no README.',
  'Respeito à LGPD: preferência por dados simulados ou anonimizados, sem uso de marcas de terceiros.',
  'Checkpoint obrigatório com um mentor ao final do segundo dia.',
  'Apresentação de 7 minutos com demonstração ao vivo, seguida de 5 minutos de arguição técnica.',
];

/** Premiação. Lista vazia aparece como "EM CONSTRUÇÃO". */
export const prizes: { place: string; prize: string }[] = [
  { place: '1º, 2º e 3º', prize: 'Em cada categoria: Software e IoT' },
  { place: 'Especiais', prize: 'Melhor Solução Técnica · Solução Mais Inovadora' },
  { place: 'Especiais', prize: 'Melhor Experiência do Usuário · Destaque Multidisciplinar' },
  { place: 'Público', prize: 'Prêmio do Público, votado por participantes e visitantes' },
  { place: 'Todos', prize: 'Certificado para as equipes que concluírem a apresentação' },
];

/** Observação exibida no cartão de premiação. */
export const prizesNote = 'Os prêmios de cada colocação serão divulgados pela organização.';
