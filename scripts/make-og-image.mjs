// Gera public/og-image.png (1200×630), a imagem que aparece ao compartilhar o link
// no WhatsApp, Instagram, LinkedIn etc. Rodar: npm run og
import sharp from 'sharp';

const W = 1200;
const H = 630;

const bg = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="a" cx="90%" cy="0%" r="70%"><stop offset="0" stop-color="#14336e" stop-opacity=".9"/><stop offset="1" stop-color="#14336e" stop-opacity="0"/></radialGradient>
    <radialGradient id="b" cx="0%" cy="100%" r="70%"><stop offset="0" stop-color="#7a1530" stop-opacity=".75"/><stop offset="1" stop-color="#7a1530" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="#060b18"/>
  <rect width="100%" height="100%" fill="url(#a)"/>
  <rect width="100%" height="100%" fill="url(#b)"/>
  <g fill="none" stroke-width="2" opacity=".55">
    <path d="M40 120h120l40 40h80" stroke="#e0577a"/><circle cx="290" cy="160" r="7" stroke="#e0577a"/>
    <path d="M40 580h90l30-30h70" stroke="#7fa2ee"/><circle cx="240" cy="550" r="7" stroke="#7fa2ee"/>
  </g>
  <text x="80" y="300" font-family="Arial Black, Arial, sans-serif" font-size="74" font-weight="900" fill="#e0577a">HACK<tspan fill="#7fa2ee">ATHON</tspan></text>
  <text x="84" y="360" font-family="Arial, sans-serif" font-size="30" letter-spacing="6" fill="#eee9e6">IDEIAS QUE TRANSFORMAM</text>
  <text x="84" y="440" font-family="Consolas, monospace" font-size="34" fill="#eee9e6">19 · 20 · 21 de outubro de 2026</text>
  <text x="84" y="486" font-family="Consolas, monospace" font-size="24" fill="#a39a96">Univassouras · Campus Maricá</text>
</svg>`);

const logo = await sharp('src/assets/logos/logo-hackathon.png').resize({ width: 380 }).toBuffer();
const logoMeta = await sharp(logo).metadata();
const pad = 22;
const card = await sharp({
  create: { width: 380 + pad * 2, height: logoMeta.height + pad * 2, channels: 4, background: '#ffffff' },
})
  .composite([{ input: logo, left: pad, top: pad }])
  .png()
  .toBuffer();
const mask = Buffer.from(`<svg width="${380 + pad * 2}" height="${logoMeta.height + pad * 2}"><rect width="100%" height="100%" rx="26" fill="#fff"/></svg>`);
const rounded = await sharp(card).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();

await sharp(bg)
  .composite([{ input: rounded, left: W - 380 - pad * 2 - 50, top: Math.round((H - logoMeta.height - pad * 2) / 2) }])
  .png({ compressionLevel: 9 })
  .toFile('public/og-image.png');

console.log('public/og-image.png gerado');
