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
- Home, bloco Organizadores: o texto "6 professores…" virou "Especialistas, mestres e doutores dos cursos de Engenharia de Software e ADS." Os avatares (incluindo os "?") continuam como estavam, a pedido.
- Home, bloco Organizadores: no hover, a seta da bolinha vermelha agora desliza para a direita em vez de girar 45° (girando, parecia apontar para cima).

## Revisão pré-deploy (2026-10-07)
- `astro check`: 0 erros, 0 avisos e 0 dicas. Build com 4 páginas e 1,4 MB. 20 links internos checados, nenhum quebrado.
- **Lighthouse (mobile, build de produção):** Home, Organizadores e Mural com 100 em Acessibilidade, Boas práticas e SEO. Console sem erros. O único aviso vem de dentro do iframe do Google Maps.
- SEO:
  - `trailingSlash: 'never'`: endereços canônicos e sitemap sem barra final (`/mural`), iguais aos links do menu, para evitar URL duplicada.
  - `vercel.json` com `trailingSlash: false`: a Vercel redireciona `/mural/` para `/mural`.
  - 404 com `noindex` e sem canonical. O `BaseLayout` ganhou a prop `noindex`.
- Links do Lattes trocados para `https`.

## Etapa 8: Deploy na Vercel (2026-10-07)
- **No ar:** https://hackathon-univassouras-marica.vercel.app (primeiro deploy `dpl_DbhvFUyXNUXuGaRaD7VoV6cK24Cy`).
- Repositório `ProfTiagoCastro/hackathon-univassouras-marica` criado e depois tornado **público**. Antes, o histórico foi auditado: nenhum PDF ou segredo.
- Ligação GitHub ↔ Vercel: o app Vercel foi instalado na ProfTiagoCastro (só este repositório) e o GitHub do login da Vercel trocado de oBombista para ProfTiagoCastro. Detalhes no HANDOFF, seção 5.
- Verificado em produção: `/`, `/organizadores` e `/mural` com 200, `/mural/` redireciona (308) para `/mural`, 404 funcionando, `og-image`, `sitemap` e `robots` ok, canonical correto, cartões fixam e soltam, fotos carregando.
- Publicação automática: cada `git push` na `main` publica sozinho.

## Correções nos cartões dos organizadores (2026-10-07)
- **Bug no celular (Safari/iPhone):** depois de virar o cartão, o nome do professor e o botão "Ver especializações" apareciam espelhados no verso. O `backface-visibility: hidden` do WebKit não esconde filhos com camada própria (nome, botão, degradê). **Correção:** a face de costas também recebe `visibility: hidden`, trocada perto da metade do giro (`transition: visibility 0s 0.1s`). O `backface-visibility` continua como reforço.
- **Novo:** clicar ou tocar de novo no cartão aberto **desvira**. Também desvira com clique fora ou Esc. Clicar no link do Lattes não desvira. No computador, o hover continua virando o cartão.
- O verso fechado agora fica fora da navegação por Tab. O teclado usa o botão "Ver especializações" (Enter alterna, `aria-pressed`).
- Testado: hover no desktop, clique e toque alternando, troca entre cartões, clique fora, Esc e link do Lattes. Em cada estado, a face de costas fica `visibility: hidden`.

## Correção do menu "sanduíche" no iPhone (2026-10-07)
- No Safari do iPhone, as 3 linhas do botão de menu não apareciam: flexbox dentro de `<button>` deixava as `<span>` com largura 0. **Correção:** o botão passou a usar `display: grid` e as linhas têm tamanho explícito (20×2 px). O "X" ao abrir foi recalculado (deslocamento de 7 px).
- Testado com emulação mobile: 3 linhas visíveis (20×2 px cada), abrir vira "X" ("Fechar menu"), menu aparece, e o botão continua oculto a partir de 1024 px.
- `HANDOFF.md` atualizado: checklist detalhado de pendências para a próxima sessão, textos a validar, comportamento atual dos cartões e seção de compatibilidade com iPhone.

## Novo organizador: Prof. Marcio Garrido (2026-10-07)
- **Marcio Garrido** (Marcio Alexandre Dias Garrido), professor de Engenharia de Software, adicionado como **segundo** cartão. O Prof. Tiago passou para o terceiro. Ordem atual: Wellington → Marcio → Tiago → 3 cartões "a definir" (6 no total).
- Foto em `src/assets/professores/marcio-garrido.jpg` (2048×2048). Dados tirados do resumo do Lattes (`docs/referencias/lattes-marcio-garrido.pdf`, fora do git): doutorando no CEFET-RJ, mestre pela UFF, graduações em Eng. de Software, Sistemas de Informação e ADS. Especialidades: Eng./Teste e Arquitetura de Software, IoT, Data Science, linguagens, SQL, AWS Academy Educator.
- Verificado em 1440, 640 e 375 px: verso cabe inteiro e sem rolagem lateral.
- Cargo do Prof. Marcio corrigido para "Professor · Eng. de Software e ADS", a pedido. Ele dá aula nos dois cursos.

## Logo FACMAR no rodapé e banner do HackEnf no hero (2026-10-07)
- **Rodapé:** a logo da Univassouras ficou menor (320 → 224 px de largura no desktop), e a logo da **FACMAR** (Faculdade de Ciências Médicas de Maricá) entrou ao lado, separada por uma trilha de circuito vertical com terminais. As alturas são diferentes para equilibrar o peso visual (Univassouras 40 px, FACMAR 60 px). A logo original de 9496 px foi recortada e reduzida para 1400 px (`src/assets/logos/facmar.png`).
- **Hero, "deck de crachás":** o banner do **HackEnf FACMAR 2026** (`src/assets/banners/hackenf.jpg`, reduzido para 1600 px) fica empilhado com o crachá do Hackathon. O da frente fica nítido e levemente girado; o de trás fica menor, escurecido e "espiando". Clicar no cartão de trás ou nos botões "Hackathon" / "HackEnf · FACMAR" traz o cartão para a frente com um pequeno salto (`aria-pressed`, sem animação com `prefers-reduced-motion`).
- Para os dois crachás caberem com destaque, o hero passou a ter **colunas 50/50** e o título "HACKATHON" no desktop agora é `clamp(3.6rem, 6.2vw, 5.5rem)`, ajustado à coluna. No celular, nada muda.
- Testado em 1440, 1024 e 375 px: título dentro da coluna, sem rolagem lateral, troca por clique e pelos botões funcionando, logos carregando. Lighthouse mobile: Acessibilidade 100, SEO 100. Boas práticas 77 por causa de cookies de terceiros do iframe do Google Maps (seção Local), que já existia antes desta mudança.
- Rodapé: texto passou a ser "…dos cursos de Engenharia de Software, Análise e Desenvolvimento de Sistemas e Enfermagem.", a pedido.

## Hero: "Três dias. Grandes desafios. Ideias…" redesenhado (2026-10-07)
- Antes era um texto corrido em negrito com pontos no meio, e as três frases tinham o mesmo peso. Agora são **três batidas**, uma por linha, na fonte de títulos, presas numa **trilha vertical de circuito** com um pad para cada uma. Os pads mudam de bordô para azul ao longo da frase.
- A última batida, "Ideias que podem transformar o futuro", é maior, com degradê rosa → azul e o pad preenchido.
- Os pontos saíram do visual, porque a quebra de linha faz esse papel, mas continuam para leitores de tela (`sr-only`).
- Entrada escalonada das três linhas, desligada com `prefers-reduced-motion`.
- Testado em 1440 e 375 px.
- Hero: o crachá do HackEnf ganhou os 4 terminais (pads) nos cantos, como o do Hackathon, com as cores invertidas (azul em cima à esquerda e embaixo à direita). O `overflow: hidden` saiu do quadro, porque cortaria os pads, e o arredondamento passou para a própria imagem.

## Novo organizador: Prof. Rafael Mynssem (2026-10-07)
- **Rafael Mynssem** (Rafael Mynssem Brum) adicionado como **quarto** cartão, depois do Prof. Tiago. Ordem atual: Wellington → Marcio → Tiago → Rafael → 2 cartões "a definir".
- Foto em `src/assets/professores/rafael-mynssem.jpg`. Dados do resumo do Lattes (`docs/referencias/lattes-rafael-mynssem.pdf`, fora do git): graduação, mestrado e doutorado em Física pela UFF. Especialidades: ciência de dados, física estatística, sistemas complexos, modelos baseados em agentes, redes complexas, Monte Carlo e consultoria em dados.
- Cargo "Professor · Eng. de Software e ADS", igual ao dos demais. O Lattes, atualizado em 09/2024, não cita o vínculo, então falta confirmar.
- Verificado em 1440 e 375 px: verso cabe inteiro, sem rolagem lateral.

## Nova organizadora: Coord. Kíssyla Harley (Enfermagem FACMAR) (2026-10-07)
- **Kíssyla Harley** (Kíssyla Harley Della Pascôa França), coordenadora acadêmica de Enfermagem da FACMAR, adicionada em **segundo**, ao lado do coordenador Wellington, a pedido. Ordem atual: Wellington → Kíssyla → Marcio → Tiago → Rafael → 1 cartão "a definir" (6 no total, duas linhas completas de 3).
- Foto em `src/assets/professores/kissyla-harley.jpg`. Dados do resumo do Lattes (`docs/referencias/lattes-kissyla-harley.pdf`, fora do git): doutoranda em Enfermagem (UERJ), mestre em Enfermagem (EEAN/UFRJ), especialista em Oncologia. Especialidades: educação em saúde, segurança do paciente, tecnologias em saúde, SAE, terapia intensiva, oncologia, saúde do idoso.
- Grafia "Kíssyla", com acento, como está no Lattes.
- Verificado em 1440 e 375 px: verso cabe inteiro, sem rolagem lateral.

## Seção "Parceria HackEnf FACMAR" em /organizadores (2026-10-07)
- A Coord. **Kíssyla Harley** saiu da grade da equipe do Hackathon e foi para uma **seção própria**, "Parceria HackEnf FACMAR", abaixo da equipe. A seção é separada por uma trilha de circuito, tem título centralizado e o cartão dela vem sozinho no centro.
- O cartão da parceria tem **tom azul**, com as cores do crachá HackEnf do hero: botão, cantos e verso em azul/navy (prop `partner` no `OrganizerCard`).
- Equipe do Hackathon reorganizada: Wellington → Marcio → Tiago → Rafael → 2 cartões "a definir" (duas linhas completas de 3).
- Dados: `organizers.ts` passou a ter duas listas, `organizers` (equipe do Hackathon) e `partners` (parceria HackEnf).
- `OrganizersGrid` agora recebe `items`, `single` (cartão único centralizado) e `partner`. A lógica de virar e fixar vale para todos os cartões da página: fixar um cartão de uma grade solta o da outra.
- Testado em 1440 e 375 px: ordem, centralização, troca entre grades, clique fora, verso sem estouro e sem rolagem lateral.
