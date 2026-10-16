// Gera docs/form-header.png (1600×400): cabeçalho do Google Forms de inscrição,
// no visual do site (fundo escuro, trilhas de circuito, HACK bordô + ATHON azul, logo).
// Rodar: node scripts/make-form-header.mjs
import sharp from 'sharp';

const W = 1600;
const H = 400;

const bg = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="a" cx="88%" cy="0%" r="75%"><stop offset="0" stop-color="#14336e" stop-opacity=".95"/><stop offset="1" stop-color="#14336e" stop-opacity="0"/></radialGradient>
    <radialGradient id="b" cx="0%" cy="100%" r="70%"><stop offset="0" stop-color="#7a1530" stop-opacity=".8"/><stop offset="1" stop-color="#7a1530" stop-opacity="0"/></radialGradient>
    <linearGradient id="t" x1="0" x2="1"><stop offset="0" stop-color="#e0577a"/><stop offset="1" stop-color="#7fa2ee"/></linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="#060b18"/>
  <rect width="100%" height="100%" fill="url(#a)"/>
  <rect width="100%" height="100%" fill="url(#b)"/>
  <g fill="none" stroke-width="2" opacity=".45">
    <path d="M0 70h140l40 40h120" stroke="#e0577a"/><circle cx="306" cy="110" r="6" stroke="#e0577a"/>
    <path d="M0 384h420l14-14h120" stroke="#7fa2ee"/><circle cx="560" cy="370" r="6" stroke="#7fa2ee"/>
  </g>
  <text x="90" y="170" font-family="Consolas, monospace" font-size="24" letter-spacing="5" fill="#e0577a">&lt;/ <tspan fill="#a39a96">UNIVASSOURAS · CAMPUS MARICÁ</tspan> &gt;</text>
  <text x="84" y="262" font-family="Arial Black, Arial, sans-serif" font-size="96" font-weight="900" fill="#e0577a">HACK<tspan fill="#7fa2ee">ATHON</tspan></text>
  <rect x="90" y="288" width="560" height="3" fill="url(#t)"/>
  <text x="90" y="330" font-family="Consolas, monospace" font-size="26" fill="#eee9e6">19 · 20 · 21 out 2026 <tspan fill="#a39a96">· 18h às 21h</tspan></text>
</svg>`);

const LOGO_W = 420;
const logo = await sharp('src/assets/logos/logo-hackathon.png').resize({ width: LOGO_W }).toBuffer();
const meta = await sharp(logo).metadata();
const pad = 20;
const cw = LOGO_W + pad * 2;
const ch = meta.height + pad * 2;
const card = await sharp({ create: { width: cw, height: ch, channels: 4, background: '#ffffff' } })
  .composite([{ input: logo, left: pad, top: pad }])
  .png()
  .toBuffer();
const mask = Buffer.from(`<svg width="${cw}" height="${ch}"><rect width="100%" height="100%" rx="24" fill="#fff"/></svg>`);
const rounded = await sharp(card).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();

await sharp(bg)
  .composite([{ input: rounded, left: W - cw - 90, top: Math.round((H - ch) / 2) }])
  .png({ compressionLevel: 9 })
  .toFile('docs/form-header.png');
console.log('docs/form-header.png', cw, ch);
