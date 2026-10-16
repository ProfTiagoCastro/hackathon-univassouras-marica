/**
 * Informações gerais do evento.
 * Tudo que estiver como `null` ou string vazia aparece no site com o selo "EM CONSTRUÇÃO".
 */

export const event = {
  name: 'Hackathon Univassouras',
  edition: 'Campus Maricá · 2026',
  tagline: 'Ideias que transformam',
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

  location: {
    name: 'Univassouras – Campus Maricá',
    city: 'Maricá – RJ',
    /** Endereço completo (rua, número, bairro). */
    address: null as string | null,
    /** Sala/auditório onde o evento acontece. */
    room: null as string | null,
    /** Texto usado na busca do mapa embutido do Google. */
    mapQuery: 'Universidade de Vassouras Campus Maricá',
  },

  /** Contato oficial do evento (e-mail ou Instagram). */
  contact: 'coordengsoftware.marica@univassouras.edu.br' as string | null,
} as const;

export const hasRegistration = event.registrationUrl.trim().length > 0;
