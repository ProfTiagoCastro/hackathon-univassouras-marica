/**
 * Padroniza as logos dos apoiadores: extrai o desenho de cada uma e gera uma silhueta
 * numa cor só (paper do tema), com fundo transparente, em src/assets/apoio/<id>.png.
 *
 * Uso: node scripts/make-sponsor-logos.mjs <pasta-com-os-originais>
 * Cada logo tem sua própria regra de extração (`alpha`), porque os originais vêm com
 * fundos e cores diferentes (preto, branco, selo colorido, print de celular).
 */
import sharp from 'sharp';
import { join } from 'node:path';

const src = process.argv[2];
if (!src) {
  console.error('Informe a pasta com as logos originais.');
  process.exit(1);
}

/** Cor final das logos: --color-paper (#eee9e6). */
const INK = [0xee, 0xe9, 0xe6];
const clamp = (v) => Math.max(0, Math.min(255, Math.round(v)));
const lum = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

/** Regras por apoiador. `crop` em px do original; `circle` zera tudo fora do selo redondo. */
const logos = [
  { id: 'nerd-ideias', file: '411992841_1420164848923105_2893224034822288775_n.jpg', alpha: (r, g, b) => clamp((lum(r, g, b) - 40) * 1.4) },
  {
    id: 'kintal-do-sabor',
    file: 'kintal.jpeg',
    crop: { left: 6, top: 414, width: 726, height: 728 },
    circle: 0.97,
    // creme e laranja ("Sabor") saem com a mesma força
    alpha: (r, g, b) => clamp((Math.max(r, g, b) - 90) * 2.6),
  },
  // inset tira a moldura cinza clara do arquivo original
  { id: 'lacell', file: 'WhatsApp Image 2026-10-18 at 13.26.58.jpeg', inset: 8, alpha: (r, g, b) => clamp((200 - lum(r, g, b)) * 1.6) },
  // só o contorno branco e o violão: as letras ficam vazadas
  { id: 'marica-tem-samba', file: 'WhatsApp Image 2026-10-18 at 13.26.59.jpeg', alpha: (r, g, b) => clamp((Math.min(r, g, b) - 150) * 2.2) },
  {
    id: 'todah-joias',
    file: 'WhatsApp Image 2026-10-18 at 13.31.12.jpeg',
    circle: 0.9,
    // traço do diamante (mais claro que o fundo) e o nome (mais escuro)
    alpha: (r, g, b) => clamp((Math.abs(lum(r, g, b) - 190) - 12) * 9),
  },
  { id: 'zion', file: 'WhatsApp Image 2026-10-18 at 13.34.17.jpeg', inset: 4, alpha: (r, g, b) => clamp((185 - Math.min(r, g, b)) * 2.2) },
  {
    id: 'spetfire-lanches',
    file: 'WhatsApp Image 2026-10-18 at 14.09.12.jpeg',
    circle: 0.83,
    alpha: (r, g, b) => clamp((g - 140) * 2.2),
  },
];

for (const l of logos) {
  let img = sharp(join(src, l.file)).removeAlpha();
  if (l.crop) img = img.extract(l.crop);
  if (l.inset) {
    const m = await img.clone().metadata();
    img = img.extract({ left: l.inset, top: l.inset, width: m.width - 2 * l.inset, height: m.height - 2 * l.inset });
  }
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: c } = info;
  const out = Buffer.alloc(w * h * 4);
  const cx = w / 2;
  const cy = h / 2;
  const rad = (Math.min(w, h) / 2) * (l.circle ?? Infinity);

  for (let i = 0, p = 0; i < w * h; i++, p += c) {
    const x = i % w;
    const y = (i / w) | 0;
    const inside = !l.circle || Math.hypot(x - cx, y - cy) <= rad;
    out[i * 4] = INK[0];
    out[i * 4 + 1] = INK[1];
    out[i * 4 + 2] = INK[2];
    out[i * 4 + 3] = inside ? l.alpha(data[p], data[p + 1], data[p + 2]) : 0;
  }

  const dest = `src/assets/apoio/${l.id}.png`;
  await sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .trim({ threshold: 1 })
    .resize({ height: 240, width: 480, fit: 'inside', withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(dest);
  console.log('ok', dest);
}
