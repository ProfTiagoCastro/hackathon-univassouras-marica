/**
 * Programação do evento, dia a dia.
 * Fonte: edital (item 12, programação indicativa) + palestras enviadas pela coordenação.
 *
 * `activities`: blocos com horário (ex.: { start: '18:00', end: '18:30', title: '...', type: 'abertura' }).
 * `talks`: palestras e minicursos do dia. `time` pode ficar null enquanto o horário não estiver definido
 *          (aparece "Horário a definir" no site).
 * Dia sem `activities` e sem `talks` mostra os blocos "EM CONSTRUÇÃO".
 */

export type ActivityType = 'abertura' | 'palestra' | 'mentoria' | 'desenvolvimento' | 'intervalo' | 'apresentacao' | 'premiacao';

export interface Activity {
  start: string; // 'HH:MM'
  end?: string; // 'HH:MM'
  title: string;
  description?: string;
  type: ActivityType;
}

export interface Talk {
  /** null = horário a definir */
  time: string | null;
  /** null = título em definição */
  title: string | null;
  speaker: string;
  /** 'Palestrante' | 'Instrutor' | 'Banca' ... */
  role: string;
  kind: 'palestra' | 'minicurso' | 'banca';
}

export interface EventDay {
  id: string;
  date: string; // 'AAAA-MM-DD'
  weekday: string;
  label: string;
  /** Resumo do dia (aparece no topo da aba). */
  theme: string | null;
  activities: Activity[];
  talks: Talk[];
}

export const activityTypes: Record<ActivityType, { label: string }> = {
  abertura: { label: 'Abertura' },
  palestra: { label: 'Palestra' },
  mentoria: { label: 'Mentoria' },
  desenvolvimento: { label: 'Mão na massa' },
  intervalo: { label: 'Intervalo' },
  apresentacao: { label: 'Apresentação' },
  premiacao: { label: 'Premiação' },
};

/** Janela diária do evento, definida pela coordenação. */
export const dailyWindow = { start: '18:00', end: '21:00' };

/** Aviso exibido abaixo das abas. */
export const scheduleNote =
  'Encontros diários das 18h às 21h. Programação indicativa (sequência do edital adaptada a esse horário), sujeita a ajustes pela organização.';

export const schedule: EventDay[] = [
  {
    id: 'dia-1',
    date: '2026-10-19',
    weekday: 'Segunda',
    label: '19 out',
    theme: 'Abertura e início do desenvolvimento',
    activities: [
      { start: '18:00', end: '18:30', title: 'Credenciamento e abertura', description: 'Recepção dos participantes e palestra de abertura.', type: 'abertura' },
      { start: '18:30', end: '19:00', title: 'Apresentação dos desafios e das regras', type: 'abertura' },
      { start: '19:00', end: '19:20', title: 'Formação final das equipes', description: 'Retirada dos kits IoT e das amostras da Lagoa de Maricá.', type: 'abertura' },
      { start: '19:20', end: '21:00', title: 'Início do desenvolvimento com plantão de mentores', description: 'Criação dos repositórios no GitHub.', type: 'desenvolvimento' },
    ],
    talks: [
      {
        time: null,
        title: 'Empreendedorismo na Era Digital: Oportunidades e Desafios para os Negócios do Futuro',
        speaker: 'Cláudio Eduardo Barral',
        role: 'Palestrante',
        kind: 'palestra',
      },
      {
        time: null,
        title: 'Das redes neurais aos LLMs: Quem domina a linguagem, domina a IA',
        speaker: 'Laís Bordallo',
        role: 'Palestrante',
        kind: 'palestra',
      },
      {
        time: null,
        title: 'Quando a Máquina Aprende a Ouvir: Inteligência Artificial na Escuta Psiquiátrica',
        speaker: 'Rafael',
        role: 'Palestrante',
        kind: 'palestra',
      },
    ],
  },
  {
    id: 'dia-2',
    date: '2026-10-20',
    weekday: 'Terça',
    label: '20 out',
    theme: 'Desenvolvimento e minicursos',
    activities: [
      { start: '18:00', end: '20:20', title: 'Desenvolvimento com plantão de mentores', description: 'Palestra e minicurso em paralelo.', type: 'desenvolvimento' },
      { start: '20:20', end: '21:00', title: 'Checkpoint obrigatório', description: 'Cada equipe apresenta o progresso a um mentor.', type: 'mentoria' },
    ],
    talks: [
      {
        time: null,
        title: 'Da sala de aula ao mercado de tecnologia: construindo uma carreira em constante evolução',
        speaker: 'Sandro Carvalho do Nascimento',
        role: 'Palestrante',
        kind: 'palestra',
      },
      {
        time: null,
        title: 'GitHub e Versionamento de Código: Colaboração, Projetos Reais e Valorização Curricular',
        speaker: 'Anderson Souza',
        role: 'Instrutor',
        kind: 'minicurso',
      },
    ],
  },
  {
    id: 'dia-3',
    date: '2026-10-21',
    weekday: 'Quarta',
    label: '21 out',
    theme: 'Entrega, apresentações e premiação',
    activities: [
      { start: '18:00', end: '18:40', title: 'Sprint final e oficina de pitch', type: 'desenvolvimento' },
      { start: '18:40', title: 'Prazo final de entrega', description: 'Congelamento dos repositórios.', type: 'apresentacao' },
      { start: '18:40', end: '20:15', title: 'Avaliação dos desafios das equipes', description: 'Apresentações e arguição técnica perante a banca.', type: 'apresentacao' },
      { start: '20:15', end: '20:30', title: 'Deliberação da banca', description: 'Votação do Prêmio do Público.', type: 'apresentacao' },
      { start: '20:30', end: '21:00', title: 'Encerramento e premiação', description: 'Devolução dos kits IoT.', type: 'premiacao' },
    ],
    talks: [
      {
        time: null,
        title: 'Robótica Inteligente e ROS: A Ponte de Comunicação entre Programas e Sistemas Robóticos',
        speaker: 'Karen',
        role: 'Palestrante',
        kind: 'palestra',
      },
      { time: null, title: 'Avaliação dos Desafios das Equipes', speaker: 'Membros a definir', role: 'Banca', kind: 'banca' },
    ],
  },
];
