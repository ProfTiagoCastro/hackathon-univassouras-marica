import type { ImageMetadata } from 'astro';
import { schedule } from './schedule';

/**
 * MURAL: fotos e vídeos de cada dia do evento.
 *
 * FOTOS: é só colocar os arquivos (.jpg, .jpeg, .png, .webp) na pasta do dia:
 *   src/assets/mural/dia-1/   → 19/out
 *   src/assets/mural/dia-2/   → 20/out
 *   src/assets/mural/dia-3/   → 21/out
 * Elas entram em ordem alfabética do nome do arquivo (dica: 01-abertura.jpg, 02-equipes.jpg…).
 * Legenda opcional: adicione em `captions` abaixo, usando o nome do arquivo.
 *
 * VÍDEOS: adicione em `videos`, no dia correspondente:
 *   { title: 'Abertura', youtube: 'ID_DO_VIDEO' }      ← vídeo do YouTube (o ID vem depois de "v=" no link)
 *   { title: 'Pitch final', file: '/mural/pitch.mp4' } ← arquivo .mp4 colocado em public/mural/
 *
 * Dias sem fotos e sem vídeos aparecem como "EM CONSTRUÇÃO".
 */

export interface MuralVideo {
  title: string;
  youtube?: string;
  file?: string;
}

export interface MuralPhoto {
  src: ImageMetadata;
  name: string;
  caption?: string;
}

const videos: Record<string, MuralVideo[]> = {
  'dia-1': [],
  'dia-2': [],
  'dia-3': [],
};

/** Legendas opcionais: { 'dia-1/01-abertura.jpg': 'Abertura do Hackathon' } */
const captions: Record<string, string> = {};

// Carrega automaticamente todas as imagens das pastas do mural
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/mural/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
});

const photosByDay: Record<string, MuralPhoto[]> = {};
for (const [path, mod] of Object.entries(files).sort(([a], [b]) => a.localeCompare(b))) {
  const [, day, name] = path.match(/mural\/([^/]+)\/([^/]+)$/) ?? [];
  if (!day) continue;
  (photosByDay[day] ??= []).push({ src: mod.default, name, caption: captions[`${day}/${name}`] });
}

export const mural = schedule.map((d) => ({
  ...d,
  photos: photosByDay[d.id] ?? [],
  videos: videos[d.id] ?? [],
}));

export const muralHasContent = mural.some((d) => d.photos.length || d.videos.length);
