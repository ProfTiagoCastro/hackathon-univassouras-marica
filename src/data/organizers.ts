import type { ImageMetadata } from 'astro';
import wellington from '../assets/professores/wellington-avila.jpeg';
import marcio from '../assets/professores/marcio-garrido.jpg';
import tiago from '../assets/professores/tiago-ruiz-de-castro.jpg';
import rafael from '../assets/professores/rafael-mynssem.jpg';

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
    lattes: 'https://lattes.cnpq.br/9415369722030148',
  },
  {
    id: 'marcio-garrido',
    name: 'Marcio Garrido',
    role: 'Professor · Eng. de Software e ADS',
    photo: marcio,
    education: [
      'Doutorando em Engenharia Elétrica · CEFET-RJ',
      'Mestre em Eng. Elétrica e Telecomunicações · UFF',
      'Graduado em Eng. de Software, Sistemas de Informação e ADS',
    ],
    specialties: [
      'Engenharia e Teste de Software',
      'Arquitetura de Software',
      'IoT e Sensoriamento Remoto',
      'Data Science',
      'Python, C/C++ e JavaScript',
      'Bancos de Dados SQL',
      'AWS Academy Educator',
    ],
    lattes: 'https://lattes.cnpq.br/7310316924480839',
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
    lattes: 'https://lattes.cnpq.br/2893734599338416',
  },
  {
    id: 'rafael-mynssem',
    name: 'Rafael Mynssem',
    role: 'Professor · Eng. de Software e ADS',
    photo: rafael,
    education: ['Doutor em Física · UFF (2018)', 'Mestre em Física · UFF (2014)', 'Graduado em Física · UFF (2012)'],
    specialties: [
      'Ciência de Dados',
      'Física Estatística',
      'Sistemas Complexos',
      'Modelos Baseados em Agentes',
      'Redes Complexas',
      'Simulação de Monte Carlo',
      'Consultoria em Dados',
    ],
    lattes: 'https://lattes.cnpq.br/9858650975484255',
  },
  pending(5),
  pending(6),
];
