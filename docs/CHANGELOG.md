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

## Etapa 6: Local, FAQ e 404 (2026-10-07)
- `Location`: ficha com campus, cidade, endereço e sala ("EM CONSTRUÇÃO" enquanto vazios) e mapa do Google embutido com filtro escuro, mais o link "Abrir no Google Maps". Quando `location.address` for preenchido, o mapa passa a usar o endereço exato.
- `Faq`: acordeão nativo (`<details>`), acessível e sem JS. Respostas `null` mostram "EM CONSTRUÇÃO".
- `404.astro`: página de erro no visual do site.
- `astro check`: 0 erros e 0 avisos. Build ok.

## Etapa 7: Polimento, SEO, acessibilidade e performance (2026-10-07)
- `public/og-image.png` (1200×630), gerada por `npm run og` (`scripts/make-og-image.mjs`, com sharp).
- JSON-LD `schema.org/Event` na home. A oferta de inscrição entra sozinha quando o link do Forms existir.
- `public/robots.txt` e sitemap (`@astrojs/sitemap`).
- Correção de contraste no rodapé (Lighthouse).
- Texto de instrução dos cartões vale para mouse e toque.
- **Resultados (build de produção, mobile):** Lighthouse Acessibilidade 97 → 100 após a correção, Boas práticas 100, SEO 100. LCP 189 ms, CLS 0. Sem rolagem horizontal em 375 px. Toque nos cartões testado com emulação touch.

## Extra: aba Mural (2026-10-07)
- Nova página `/mural` com o item "Mural" no menu: fotos e vídeos separados por dia, com as mesmas abas da Programação.
- **Fotos sem código:** basta colocar os arquivos em `src/assets/mural/dia-1|dia-2|dia-3/`. Elas são carregadas por `import.meta.glob` em `src/data/mural.ts`, em ordem alfabética, com legenda opcional em `captions`.
- **Vídeos:** YouTube (o player só carrega no clique, com `youtube-nocookie`) ou arquivo `.mp4` em `public/mural/`, listados em `videos`.
- Galeria em colunas (masonry) e lightbox em `<dialog>` com anterior/próxima, setas do teclado, Esc, clique fora para fechar e foco devolvido à miniatura.
- Dia sem conteúdo: blocos fantasma com câmera e o aviso "EM CONSTRUÇÃO".
- **Refatoração:** as abas de dias viraram o componente `src/components/ui/DayTabs.astro`, usado pela Programação e pelo Mural. O estilo `.day-panel` foi para `global.css`.
- Header: menu mais compacto entre 1024 e 1280 px (6 itens). Botão de inscrição sem quebra de linha.
- Testado com fotos e um vídeo temporários (removidos depois): galeria, lightbox (com volta do fim ao início) e player do YouTube funcionando.

## Ajuste de conteúdo (2026-10-07)
- Especialidades do Prof. Tiago: "Computação em Nuvem" trocada por "Desenvolvimento de Jogos 2D/3D", a pedido dele.
- Texto de apresentação do hero trocado a pedido: "**Três dias. Grandes desafios. Ideias que podem transformar o futuro.**" (negrito) + "Forme sua equipe, desenvolva sua solução e viva uma experiência de inovação, tecnologia e colaboração." Os nomes dos cursos continuam na ficha "Sobre" e no rodapé.
- Removida a frase "Escolha um dia para ver as atividades e os horários." da Programação (as abas já são autoexplicativas).
- Removido o texto de instrução da página Organizadores ("Passe o mouse (ou toque)...").

## Novo organizador e correção dos cartões (2026-10-07)
- **Prof. Wellington Ávila**, coordenador dos cursos de Eng. de Software e ADS, adicionado como **primeiro** cartão. Foto em `src/assets/professores/wellington-avila.jpeg` e dados tirados do resumo do Lattes (`docs/referencias/lattes-wellington-avila.pdf`, fora do git). Ele ocupou um dos cartões "EM CONSTRUÇÃO": continuam 6 cartões, 2 preenchidos e 4 a definir.
- **Correção de layout (bug que já existia):** entre ~640 e 700 px os cartões se sobrepunham e a página rolava para o lado. O `aspect-ratio` com `min-height` forçava largura mínima de 333 px.
- **Cartão flip reestruturado:** frente e verso ficam empilhados na mesma célula de grid (`grid-area: 1/1`), em vez de `position: absolute`. O cartão cresce até caber o lado com mais conteúdo, então o verso nunca é cortado. Os cartões da mesma linha têm a mesma altura e a proporção de 4:5 continua (`min-height: max(26rem, 125cqw)`).
- Verificado em 375, 640 e 1440 px: sem estouro, sem rolagem lateral, e fixar/trocar/clicar fora/Esc funcionando.
