# Changelog

Uma entrada por etapa de desenvolvimento (cada etapa = um commit).

## Etapa 1: Setup do projeto (2026-10-07)
- Projeto Astro 7 + Tailwind 4 + TypeScript strict criado manualmente (`package.json`, `astro.config.mjs`, `tsconfig.json`).
- Fontes via Fontsource e `@astrojs/sitemap` instalados.
- Arquivos da raiz organizados:
  - `logo_hackathon.png` → `src/assets/logos/logo-hackathon.png`
  - `Marca-Univassouras-...png` → `src/assets/logos/univassouras-marica.png`
  - `Foto_Tiago_Ruiz_de_Castro.jpg` → `src/assets/professores/tiago-ruiz-de-castro.jpg`
  - `lattes_atualizado.pdf` → `docs/referencias/lattes-tiago-ruiz-de-castro.pdf` (fora do build e ignorado pelo git)
- Camada de dados criada: `src/data/event.ts`, `schedule.ts`, `organizers.ts`, `faq.ts`.
- Documentação: `README.md`, `HANDOFF.md`, `docs/DECISOES.md`, `docs/CHANGELOG.md`.
