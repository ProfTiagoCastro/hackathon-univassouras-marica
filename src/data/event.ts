/**
 * Informações gerais do evento.
 * Tudo que estiver como `null` ou string vazia aparece no site com o selo "EM CONSTRUÇÃO".
 */

export const event = {
  name: 'Hackathon Univassouras',
  edition: 'Campus Maricá · 2026',
  tagline: 'Ideias que transformam',
  /** Tema da edição (aparece logo abaixo da tagline, no hero). Parte antes dos ":" fica em destaque. */
  theme: 'Softwares e IoT em Ação: Soluções Inteligentes para Desafios Reais',
  courses: ['Engenharia de Software', 'Análise e Desenvolvimento de Sistemas'],

  /** Início e fim do evento (horário de Brasília, UTC-3). Encontros diários das 18h às 21h. */
  startsAt: '2026-10-19T18:00:00-03:00',
  endsAt: '2026-10-21T21:00:00-03:00',

  /**
   * LINK DO GOOGLE FORMS DE INSCRIÇÃO.
   * Enquanto estiver vazio, os botões mostram "Inscrições em breve".
   * Exemplo: 'https://forms.gle/xxxxxxxxxxxx'
   */
  registrationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdvVLW9DMshuGJ5jWtaNKXuuD5kTVjdGU3o6Z_4J9sxm3egpA/viewform',

  /** Período de inscrição e divulgação da alocação dos desafios (edital, itens 5.1, 5.3 e 11). */
  registrationPeriod: 'de 17 a 19 de outubro de 2026',
  allocationDate: '19 de outubro',

  /** Edital oficial em PDF (arquivo em public/). Para trocar, substitua o arquivo mantendo o nome e atualize o tamanho. */
  edital: { url: '/edital-hackathon-2026.pdf', label: 'Edital nº 002/2026', size: '690 KB' },

  location: {
    name: 'Univassouras – Campus Maricá',
    city: 'Maricá – RJ',
    /** Endereço completo (rua, número, bairro). */
    address: 'Av. Governador Roberto Silveira, nº 1954, Flamengo, Maricá – RJ' as string | null,
    /** Sala/auditório onde o evento acontece. */
    room: 'Campus 2: Auditório, Sala 513 (Bloco 5) e Laboratório de Informática 3' as string | null,
    /** Texto usado na busca do mapa embutido do Google. */
    mapQuery: 'Universidade de Vassouras Campus Maricá',
  },

  /**
   * Contato oficial do evento (e-mail ou Instagram). Com `null` a linha "contato" some da ficha.
   * O e-mail da coordenação foi retirado a pedido do coordenador em 17/10/2026.
   */
  contact: null as string | null,
} as const;

export const hasRegistration = event.registrationUrl.trim().length > 0;
