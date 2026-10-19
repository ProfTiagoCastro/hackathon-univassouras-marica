/**
 * Apoiadores do evento (faixa "Apoio" no rodapé de todas as páginas).
 *
 * As logos em src/assets/apoio/ são versões padronizadas numa cor só, geradas a partir
 * dos arquivos originais por `node scripts/make-sponsor-logos.mjs <pasta-dos-originais>`.
 * Para incluir um apoiador: acrescente a regra dele no script, gere a logo e adicione aqui.
 *
 * `scale` equilibra o peso visual: selos redondos e logos quadradas ficam um pouco maiores
 * que as logos largas, para todas parecerem do mesmo tamanho.
 */
import type { ImageMetadata } from 'astro';
import jully from '../assets/apoio/dra-jully-santos.png';
import gbc from '../assets/apoio/gbc-coffee.png';
import nerd from '../assets/apoio/nerd-ideias.png';
import kintal from '../assets/apoio/kintal-do-sabor.png';
import lacell from '../assets/apoio/lacell.png';
import samba from '../assets/apoio/marica-tem-samba.png';
import todah from '../assets/apoio/todah-joias.png';
import zion from '../assets/apoio/zion.png';
import spetfire from '../assets/apoio/spetfire-lanches.png';

export interface Sponsor {
  name: string;
  logo: ImageMetadata;
  scale: number;
  url?: string;
}

export const sponsors: Sponsor[] = [
  { name: 'Dra. Jully Santos Odontologia Integrada', logo: jully, scale: 1, url: 'https://www.instagram.com/drajullysan_tos/' },
  { name: 'GBC Coffee', logo: gbc, scale: 0.95, url: 'https://www.instagram.com/gbccoffee/' },
  { name: 'Kintal do Sabor', logo: kintal, scale: 1.1, url: 'https://www.instagram.com/kintaldosabor/' },
  { name: 'Lacell Centro Especializado', logo: lacell, scale: 1.1, url: 'https://www.instagram.com/lacell_smart/' },
  { name: 'Maricá Tem Samba', logo: samba, scale: 0.72, url: 'https://www.instagram.com/maricatemsamba/' },
  { name: 'Nerd Ideias', logo: nerd, scale: 1.15, url: 'https://www.instagram.com/nerdideias_/' },
  { name: 'Spetfire Lanches', logo: spetfire, scale: 1.3, url: 'https://www.instagram.com/spetfire/' },
  { name: 'Todah Jóias', logo: todah, scale: 1.2, url: 'https://www.instagram.com/todahjoias/' },
  { name: 'Zion Escola de Entretenimento', logo: zion, scale: 1, url: 'https://escolazion.com' },
];
