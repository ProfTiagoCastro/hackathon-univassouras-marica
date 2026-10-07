// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Troque `site` pelo domínio final depois do deploy (usado em SEO/sitemap/Open Graph).
export default defineConfig({
  site: 'https://hackathon-univassouras-marica.vercel.app',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
