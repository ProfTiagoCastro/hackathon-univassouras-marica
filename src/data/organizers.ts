import type { ImageMetadata } from 'astro';
import wellington from '../assets/professores/wellington-avila.jpeg';
import tiago from '../assets/professores/tiago-ruiz-de-castro.jpg';

/**
 * Professores organizadores.
 *
 * Para adicionar alguém:
 *  1. Coloque a foto (quadrada, mín. 600×600) em `src/assets/professores/nome-sobrenome.jpg`
 *  2. Importe a foto no topo deste arquivo
 *  3. Substitua um item `pending(...)` (ou adicione um novo) com os dados.
 * A grade se ajusta sozinha a qualquer quantidade de cartões.
 */

export interface Organizer {
  id: string;
  name: string | null;
  role: string | null;
  photo: ImageMetadata | null;
  education: string[];
  specialties: string[];
  lattes?: string;
}

const pending = (n: number): Organizer => ({
  id: `organizador-${n}`,
  name: null,
  role: null,
  photo: null,
  education: [],
  specialties: [],
});

export const organizers: Organizer[] = [
  {
    id: 'wellington-avila',
    name: 'Wellington Ávila',
    role: 'Coordenador · Eng. de Software e ADS',
    photo: wellington,
    education: [
      'Mestre em Gestão do Trabalho (Qualidade do Ambiente Construído)',
      'MBA Executivo em Defesa Cibernética',
      'Graduado em Tecnologia da Informação',
    ],
    specialties: [
      'Governança de TI (COBIT)',
      'Segurança Cibernética',
      'Auditoria em Segurança da Informação',
      'Redes de Computadores',
      'Gerenciamento de Projetos',
      'Educação a Distância',
    ],
    lattes: 'http://lattes.cnpq.br/9415369722030148',
  },
  {
    id: 'tiago-ruiz-de-castro',
    name: 'Tiago Ruiz de Castro',
    role: 'Professor · Eng. de Software e ADS',
    photo: tiago,
    education: ['Bacharel em Engenharia de Software · Univassouras (2023)', 'MBA em Big Data · Faculeste (2025)'],
    specialties: [
      'Desenvolvimento de Sistemas',
      'Banco de Dados (MySQL)',
      'Dados com Python',
      'BI com Power BI',
      'Desenvolvimento de Jogos 2D/3D',
      'IA & Machine Learning',
      'Empreendedorismo Tecnológico',
    ],
    lattes: 'http://lattes.cnpq.br/2893734599338416',
  },
  pending(3),
  pending(4),
  pending(5),
  pending(6),
];
