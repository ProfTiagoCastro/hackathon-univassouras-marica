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

## Etapa 2: Design system e layout (2026-10-07)
- Tokens de cor e fonte no `@theme` (`src/styles/global.css`), com utilitários `.shell`, `.eyebrow` (`</ … >`), `.trace` (trilha de circuito) e `.panel`.
- `BaseLayout`: meta tags de SEO e Open Graph, link "pular para o conteúdo", favicon `< >`.
- `Header`: fixo, ganha blur ao rolar, menu mobile acessível (aria-expanded, Esc fecha) e botão de inscrição compacto.
- `Footer`: logo Univassouras Maricá e dados do evento.
- `ParticlesBackground`: canvas próprio com nós ligados por trilhas de 45° que reagem ao mouse. Pausa com a aba oculta e fica estático com `prefers-reduced-motion`.
- `UnderConstruction` (selo e bloco "EM CONSTRUÇÃO"), `RegisterButton` (lê `registrationUrl`, "Inscrições em breve" quando vazio), `SectionTitle`.

## Etapa 3: Hero, contagem regressiva e CTA de inscrição (2026-10-07)
- `Hero`: título "HACKATHON" nas cores da logo (HACK bordô, ATHON azul), lema, datas como "pads" ligados por uma trilha, logo oficial num painel claro com terminais de circuito.
- `Countdown`: contagem até `event.startsAt`. Mostra "Acontecendo agora!" entre o início e o fim e "Evento encerrado" depois. Para testar, use `?agora=2026-10-20T10:00` na URL.
- `RegisterCta`: faixa de inscrição com recorte angular (inspirado na faixa "IDEIAS QUE TRANSFORMAM").
- `.gitattributes` (LF) adicionado.
- Correção: o `<style>` de componente (sem layer) vence as utilities do Tailwind, então a visibilidade responsiva é controlada no CSS do componente ou num wrapper.

## Etapa 4: Sobre, Regras, Premiação e Programação (2026-10-07)
- `About`: ficha do evento em estilo `hackathon.config` (quando, onde, cursos, público, formato) e cartões de Regras e Premiação (lidos de `faq.ts`, com "EM CONSTRUÇÃO" enquanto vazios).
- `Schedule`: abas acessíveis por dia (ARIA tabs, setas, Home e End). Cada atividade é um pad numa trilha vertical, com cor por tipo. Sem atividades, o dia mostra linhas fantasma e o selo "Horários em construção". Durante o evento, a aba do dia atual abre sozinha (fuso America/Sao_Paulo).

## Etapa 5: Organizadores com cartões flip (2026-10-07)
- Página `/organizadores` com a grade `OrganizersGrid` (colunas automáticas, aceita qualquer quantidade de professores).
- `OrganizerCard`:
  - frente: foto, cargo, nome e botão "Ver especializações";
  - verso: formação, especializações em chips e link do Lattes;
  - cartões sem dados: silhueta, selo "EM CONSTRUÇÃO" e verso "Informações em breve".
- Interação, testada no navegador:
  - hover (apenas dispositivos com mouse): gira, levanta o cartão e esmaece os demais;
  - clique/toque: fixa virado (`data-pinned`, `aria-pressed=true`); clicar de novo mantém; clicar em outro cartão troca;
  - clique fora de qualquer cartão ou Esc: solta;
  - teclado: Tab até o botão, Enter fixa e Esc solta. O Tab até o link do Lattes também vira o cartão.
- Entrada escalonada ao rolar (IntersectionObserver). Sem JS, os cartões aparecem normalmente (classe `.js` no `<html>`).
- Home: bloco `OrganizersTeaser` com avatares, levando para `/organizadores`.
