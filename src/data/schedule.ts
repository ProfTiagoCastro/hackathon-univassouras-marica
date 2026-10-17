/**
 * Programação do evento, dia a dia.
 * Fonte: edital (item 12, programação indicativa) + palestras enviadas pela coordenação.
 *
 * `activities`: blocos com horário (ex.: { start: '18:00', end: '18:30', title: '...', type: 'abertura' }).
 * `talks`: palestras e minicursos do dia. `time` pode ficar null enquanto o horário não estiver definido
 *          (aparece "Horário a definir" no site).
 * Dia sem `activities` e sem `talks` mostra os blocos "EM CONSTRUÇÃO".
 * Fotos dos palestrantes: src/assets/palestrantes/ (quadradas, ~480 px, rosto centralizado).
 */
import type { ImageMetadata } from 'astro';
import karen from '../assets/palestrantes/karen-olinto.jpg';
import rafael from '../assets/palestrantes/rafael-de-souza.jpg';
import lais from '../assets/palestrantes/lais-bordallo.jpg';
import anderson from '../assets/palestrantes/anderson-souza.jpg';
import sandro from '../assets/palestrantes/sandro-carvalho.jpg';
import claudio from '../assets/palestrantes/claudio-barral.jpg';

export type ActivityType = 'abertura' | 'palestra' | 'mentoria' | 'desenvolvimento' | 'intervalo' | 'evento' | 'apresentacao' | 'premiacao';

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
  /** Sala/auditório (null = local a definir) */
  location: string | null;
  /** Foto quadrada (aparece redonda no cartão). Sem foto, mostra as iniciais. */
  photo?: ImageMetadata;
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
  evento: { label: 'Integração' },
  apresentacao: { label: 'Apresentação' },
  premiacao: { label: 'Premiação' },
};

/** Janela diária do evento, definida pela coordenação. */
export const dailyWindow = { start: '18:00', end: '21:00' };

/** Aviso exibido abaixo das abas. */
export const scheduleNote =
  'Horários do edital, sujeitos a ajustes da organização.';

export const schedule: EventDay[] = [
  {
    id: 'dia-1',
    date: '2026-10-19',
    weekday: 'Segunda',
    label: '19 out',
    theme: 'Abertura e início do desenvolvimento',
    activities: [
      { start: '18:00', end: '18:30', title: 'Credenciamento e abertura', description: 'Recepção dos participantes e palestra de abertura.', type: 'abertura' },
      { start: '19:00', end: '20:00', title: 'Desafios, regras e formação das equipes', description: 'Retirada dos kits IoT e das amostras da lagoa.', type: 'abertura' },
      { start: '19:00', end: '21:00', title: 'Início do desenvolvimento com plantão de mentores', description: 'Criação dos repositórios no GitHub. Palestras em paralelo.', type: 'desenvolvimento' },
    ],
    talks: [
      {
        time: '19:00 – 20:00',
        title: 'Das redes neurais aos LLMs: Quem domina a linguagem, domina a IA',
        speaker: 'Laís Bordallo',
        photo: lais,
        role: 'Palestrante',
        kind: 'palestra',
        location: 'Auditório · Campus 2',
      },
      {
        time: '19:30 – 20:30',
        title: 'Empreendedorismo na Era Digital: Oportunidades e Desafios para os Negócios do Futuro',
        speaker: 'Cláudio Eduardo Barral',
        photo: claudio,
        role: 'Palestrante',
        kind: 'palestra',
        location: 'Sala 513 · Bloco 5 · Campus 2',
      },
      {
        time: '20:00 – 21:00',
        title: 'Quando a Máquina Aprende a Ouvir: Inteligência Artificial na Escuta Psiquiátrica',
        speaker: 'Rafael de Souza',
        photo: rafael,
        role: 'Palestrante',
        kind: 'palestra',
        location: 'Auditório · Campus 2',
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
      { start: '18:00', end: '21:00', title: 'Experiências gamers, sorteios e outros eventos', type: 'evento' },
      { start: '19:00', end: '21:00', title: 'Desenvolvimento com plantão de mentores', description: 'Palestra e minicurso em paralelo.', type: 'desenvolvimento' },
      { start: '20:00', end: '21:00', title: 'Checkpoint obrigatório', description: 'Cada equipe apresenta o progresso a um mentor.', type: 'mentoria' },
    ],
    talks: [
      {
        time: '19:00 – 21:00',
        title: 'GitHub e Versionamento de Código: Colaboração, Projetos Reais e Valorização Curricular',
        speaker: 'Anderson Souza',
        photo: anderson,
        role: 'Instrutor',
        kind: 'minicurso',
        location: 'Laboratório de Informática 3 · Campus 2',
      },
      {
        time: '19:30 – 20:30',
        title: 'Estratégia, Competências e Excelência Profissional na Carreira em Tecnologia da Informação',
        speaker: 'Sandro Carvalho',
        photo: sandro,
        role: 'Palestrante',
        kind: 'palestra',
        location: 'Auditório · Campus 2',
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
      { start: '18:00', end: '20:00', title: 'Sprint final e oficina de pitch', description: 'Entrega às 19h00, com o congelamento dos repositórios.', type: 'desenvolvimento' },
      { start: '19:00', end: '20:00', title: 'Apresentações para a banca', type: 'apresentacao' },
      { start: '20:00', end: '20:30', title: 'Deliberação e voto do público', type: 'apresentacao' },
      { start: '20:30', end: '21:00', title: 'Encerramento e premiação', description: 'Devolução dos kits IoT.', type: 'premiacao' },
    ],
    talks: [
      {
        time: '19:00 – 20:00',
        title: 'Robótica Inteligente e ROS: A Ponte de Comunicação entre Programas e Sistemas Robóticos',
        speaker: 'Karen Olinto',
        photo: karen,
        role: 'Palestrante',
        kind: 'palestra',
        location: 'Auditório · Campus 2',
      },
      {
        time: '19:00 – 20:00',
        title: 'Avaliação dos Desafios das Equipes',
        speaker: 'Membros da Banca Avaliadora',
        role: 'Banca',
        kind: 'banca',
        location: 'Dependências do Campus 2',
      },
    ],
  },
];
