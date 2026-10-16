/**
 * Programação do evento, dia a dia.
 * Fonte: edital (item 12, programação indicativa) + palestras enviadas pela coordenação.
 *
 * `activities`: blocos com horário (ex.: { start: '08:00', end: '09:00', title: '...', type: 'abertura' }).
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

/** Aviso exibido abaixo das abas (edital, item 12.1). */
export const scheduleNote = 'Programação indicativa, sujeita a ajustes pela organização.';

export const schedule: EventDay[] = [
  {
    id: 'dia-1',
    date: '2026-10-19',
    weekday: 'Segunda',
    label: '19 out',
    theme: 'Abertura e início do desenvolvimento',
    activities: [
      { start: '08:00', end: '09:00', title: 'Credenciamento e abertura', description: 'Recepção dos participantes e palestra de abertura.', type: 'abertura' },
      { start: '09:00', end: '10:00', title: 'Apresentação dos desafios e das regras', type: 'abertura' },
      { start: '10:00', end: '10:30', title: 'Formação final das equipes', description: 'Retirada dos kits IoT e das amostras da Lagoa de Maricá.', type: 'abertura' },
      { start: '10:30', end: '12:00', title: 'Início do desenvolvimento', description: 'Criação dos repositórios no GitHub.', type: 'desenvolvimento' },
      { start: '13:30', end: '18:00', title: 'Desenvolvimento com plantão de mentores', type: 'mentoria' },
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
      { start: '08:00', end: '12:00', title: 'Desenvolvimento', description: 'Minicursos em paralelo.', type: 'desenvolvimento' },
      { start: '13:30', end: '17:00', title: 'Desenvolvimento com plantão de mentores', description: 'Minicursos em paralelo.', type: 'mentoria' },
      { start: '17:00', end: '18:00', title: 'Checkpoint obrigatório', description: 'Cada equipe apresenta o progresso a um mentor.', type: 'apresentacao' },
    ],
    talks: [
      { time: null, title: null, speaker: 'Sandro', role: 'Palestrante', kind: 'palestra' },
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
      { start: '08:00', end: '11:00', title: 'Sprint final de desenvolvimento', type: 'desenvolvimento' },
      { start: '11:00', end: '12:00', title: 'Oficina de pitch técnico', type: 'mentoria' },
      { start: '13:30', title: 'Prazo final de entrega', description: 'Congelamento dos repositórios.', type: 'apresentacao' },
      { start: '13:30', end: '17:00', title: 'Avaliação dos desafios das equipes', description: 'Apresentações e arguição técnica perante a banca.', type: 'apresentacao' },
      { start: '17:00', end: '17:30', title: 'Deliberação da banca', description: 'Votação do Prêmio do Público.', type: 'apresentacao' },
      { start: '17:30', end: '18:30', title: 'Encerramento e premiação', description: 'Devolução dos kits IoT.', type: 'premiacao' },
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
