/**
 * Programação do evento, dia a dia.
 *
 * Para preencher um dia, adicione itens em `activities`, por exemplo:
 *   { start: '08:00', end: '09:00', title: 'Credenciamento', type: 'abertura',
 *     description: 'Retirada de crachás e formação das equipes.' }
 *
 * Enquanto `activities` estiver vazio, o dia mostra os blocos "EM CONSTRUÇÃO".
 */

export type ActivityType = 'abertura' | 'palestra' | 'mentoria' | 'desenvolvimento' | 'intervalo' | 'apresentacao' | 'premiacao';

export interface Activity {
  start: string; // 'HH:MM'
  end?: string; // 'HH:MM'
  title: string;
  description?: string;
  type: ActivityType;
}

export interface EventDay {
  id: string;
  date: string; // 'AAAA-MM-DD'
  weekday: string;
  label: string;
  /** Resumo do dia (aparece no topo da aba). */
  theme: string | null;
  activities: Activity[];
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

export const schedule: EventDay[] = [
  { id: 'dia-1', date: '2026-10-19', weekday: 'Segunda', label: '19 out', theme: null, activities: [] },
  { id: 'dia-2', date: '2026-10-20', weekday: 'Terça', label: '20 out', theme: null, activities: [] },
  { id: 'dia-3', date: '2026-10-21', weekday: 'Quarta', label: '21 out', theme: null, activities: [] },
];
