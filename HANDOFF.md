# HANDOFF: Site do Hackathon Univassouras Maricá

> Documento de passagem de bastão. Atualizado a cada etapa concluída.
> **Última atualização:** 2026-10-18 (22/10: NPV Sign, Pipoca Deliciosa e Hoje é o Dia do Dogão na faixa "Apoio", agora com 12 apoiadores, e banners do Instagram refeitos; 19/10: Dra. Jully Santos na faixa "Apoio"; texto da bolsa do 1º e 2º lugar trocado por "Bolsa 100% de curso de aperfeiçoamento na área de IA e Games", a pedido do coordenador, diferente do edital; 18/10: faixa "Apoio", cartão do Prof. Victor; antes: edital assinado, e-mail da coordenação retirado, cartão do Prof. Marcio, seção Desafios) · **Etapa atual:** 8 de 8 concluídas + ajustes mobile · **No ar:** https://hackathon-univassouras-marica.vercel.app

## 1. Resumo
Site estático de divulgação do Hackathon (19, 20 e 21/10/2026) dos cursos de Engenharia de Software e ADS da Univassouras, Campus Maricá. Ele mostra a programação dos três dias, o botão de inscrição (Google Forms), os professores organizadores em cartões que giram, o **Mural** de fotos e vídeos por dia, o local e o FAQ.

Stack: **Astro 7 + Tailwind 4 + TypeScript**, com deploy na **Vercel**. Detalhes em `README.md` e `docs/DECISOES.md`.

## 2. Status das etapas
| # | Etapa | Status |
|---|---|---|
| 1 | Setup, organização dos arquivos, docs | ✅ concluída |
| 2 | Design system + layout (header, footer, partículas) | ✅ concluída |
| 3 | Hero + contagem regressiva + CTA de inscrição | ✅ concluída |
| 4 | Sobre/Regras/Premiação + Programação | ✅ concluída |
| 5 | Organizadores (cartões flip) | ✅ concluída |
| 6 | Local/Mapa + FAQ + 404 | ✅ concluída |
| 7 | Polimento: SEO, acessibilidade, performance | ✅ concluída |
| 8 | Deploy na Vercel | ✅ concluída (07/10/2026) |
| + | Aba Mural (fotos e vídeos por dia) | ✅ concluída (aguardando conteúdo) |
| + | Seção Desafios (11 desafios, níveis, critérios da banca) | ✅ concluída (17/10/2026) |

## 3. Onde editar cada informação
| O que | Arquivo | Campo |
|---|---|---|
| **Link do Google Forms** | `src/data/event.ts` | `registrationUrl` |
| **Equipes formadas** (página `/equipes`) | `src/data/teams.ts` | 16 equipes por desafio, do PDF da coordenação de 19/10. Quando um "Grupo 1–4" escolher nome, troque `name` e tire `provisional`. A página tem busca por nome e fica **fora do Google** (`noindex` + fora do sitemap em `astro.config.mjs`), porque lista o nome completo dos alunos |
| **Inscrições encerradas** (desde 19/10) | `src/data/event.ts` | `registrationClosed: true` deixa os botões como "Inscrições encerradas" (com cadeado, sem link), troca o texto do bloco de inscrição, do FAQ e da ficha, e tira o link da descrição para buscadores. Para reabrir, volte para `false` |
| Endereço / sala | `src/data/event.ts` | `location.address`, `location.room` (com o endereço preenchido, o pino do mapa fica exato; hoje a busca genérica acha duas unidades) |
| Contato | `src/data/event.ts` | `contact` (hoje `null`: com `null` a linha some da ficha, sem selo "em construção") |
| Horários de cada dia | `src/data/schedule.ts` | `activities` de cada dia (o exemplo está no comentário do arquivo) |
| Professores | `src/data/organizers.ts` | equipe do Hackathon em `organizers` (trocar um `pending(n)`); parceria HackEnf FACMAR em `partners` (seção própria, cartão azul) |
| Fotos dos professores | `src/assets/professores/` | jpg quadrado, mín. 600×600 |
| FAQ, regras, premiação | `src/data/faq.ts` | `faq`, `rules`, `prizes` |
| Desafios, níveis, critérios da banca | `src/data/challenges.ts` | `challenges`, `criteria` (seção em `Challenges.astro`) |
| Período de inscrição | `src/data/event.ts` | `registrationPeriod`, `allocationDate` |
| **Fotos do Mural** | `src/assets/mural/dia-1`, `dia-2`, `dia-3` | é só colocar os arquivos .jpg/.png/.webp na pasta do dia (ordem alfabética; ex.: `01-abertura.jpg`) |
| Legendas das fotos | `src/data/mural.ts` | `captions` (ex.: `'dia-1/01-abertura.jpg': 'Abertura'`) |
| **Vídeos do Mural** | `src/data/mural.ts` | `videos` → `{ title, youtube: 'ID' }` ou `{ title, file: '/mural/video.mp4' }` (arquivo em `public/mural/`) |
| Cores e fontes | `src/styles/global.css` | bloco `@theme` |
| Imagem de compartilhamento | `scripts/make-og-image.mjs` | editar e rodar `npm run og` |
| Banner do HackEnf (hero) | `src/assets/banners/hackenf.jpg` | trocar o arquivo mantendo o nome; o deck fica em `Hero.astro` |
| Logos do rodapé | `src/assets/logos/` (`univassouras-marica.png`, `facmar.png`) | tamanhos em `Footer.astro` (`.logo--univ`, `.logo--facmar`) |
| Domínio final (SEO) | `astro.config.mjs` + `public/robots.txt` | `site` / linha `Sitemap:` |
| **Edital (PDF para download)** | `public/edital-hackathon-2026.pdf` + `src/data/event.ts` › `edital` | trocar o arquivo mantendo o nome e atualizar `size`; link na ficha do "Sobre" e no bloco de inscrição. Desde 17/10 é a versão **assinada** (gov.br, Wellington Avila), 690 KB |
| **Apoiadores (faixa "Apoio" no rodapé)** | `src/data/sponsors.ts` + `src/assets/apoio/` | logos padronizadas numa cor só (paper) por `node scripts/make-sponsor-logos.mjs <pasta-dos-originais>`; para incluir alguém: regra no script, gerar a logo, adicionar em `sponsors` (com `scale` para equilibrar o tamanho e `url` do Instagram/site, que abre em nova aba). Os originais ficam fora do repositório (estavam em `Downloads\apoio`) |
| Config. da Vercel | `vercel.json` | só `trailingSlash: false` (URLs sem barra final) |

Campos vazios ou `null` aparecem no site com o selo **EM CONSTRUÇÃO**.

## 4. Pendências de conteúdo: próxima sessão
O site está no ar, e o próximo passo é **alimentar as informações**. Itens a trazer, por prioridade:

**Antes do evento (19/10):**
- [x] **Link do Google Forms** ligado: https://forms.gle/sEAVnj7edWpJw6Rz7 (respostas em Forms › Respostas; para encerrar, desmarque "Aceitando respostas")
- [x] **Palestras e minicurso:** horários e locais oficiais preenchidos → `schedule.ts` › `talks` (`time`, `location`). Fotos dos palestrantes em `src/assets/palestrantes/` (quadradas, rosto centralizado), ligadas pelo campo `photo`; sem foto, o cartão mostra as iniciais.
- [x] **Linha do tempo das atividades** (`activities`): agora segue exatamente os horários do edital (item 12), por decisão do Tiago em 17/10. Inclui os eventos/experiências gamers/sorteios do dia 20, a entrega às 19h00 do dia 21 e a banca das 19h às 20h (o cartão da banca também passou para 19h–20h) → `schedule.ts`
- [x] **Edital cruzado com o site** (17/10): premiação por colocação, período de inscrição (17 a 19/10), certificado de 20 h, regra de desclassificação, seção Desafios. Depois veio um enxugamento com a skill frontend-design: cada informação aparece num lugar só (kits na nota IoT e na programação, 7+5 min só na banca, checkpoint só na programação), os desafios abrem ao tocar (`<details>`) e atividades no mesmo horário foram unidas. Os 9 minicursos do edital (item 13) **não** foram incluídos, por decisão do Tiago; o site mantém só os confirmados.
- [x] **Regras** do hackathon (do edital) → `faq.ts` › `rules`
- [x] **Premiação**: prêmios de cada colocação conforme o edital (item 10) → `faq.ts` › `prizes`
- [x] **Respostas do FAQ**: todas respondidas (notebook: pode levar) → `faq.ts` › `faq`
- [x] **Público** e **formato** (ficha "Sobre") → `About.astro` › `specs`
- [x] **Endereço completo**: Av. Governador Roberto Silveira, nº 1954, Flamengo, Maricá – RJ (confirmado pelo Tiago) → `event.ts` › `location`
- [x] **Contato oficial**: o e-mail da coordenação foi **retirado do site** a pedido do coordenador (17/10). Ele continua no item 16.3 do edital assinado, que não pode ser editado sem invalidar a assinatura → `event.ts` › `contact`
- [ ] **Demais professores organizadores** (equipe do Hackathon com 8; na grade de 3 colunas a última linha fica centralizada sozinha quando sobram 1 ou 2 cartões, via 6 trilhas em `OrganizersGrid.astro`; para incluir mais, adicione em `organizers` (pode usar `pending(n)` para um cartão "a definir"); parceiros HackEnf vão na lista `partners` de organizers.ts): nome, cargo, foto quadrada, formação, 4 a 7 especialidades, link do Lattes. O PDF do Lattes também serve, porque eu extraio os dados. → `organizers.ts` e `src/assets/professores/`

**Durante e depois do evento:**
- [ ] **Fotos** de cada dia → `src/assets/mural/dia-1`, `dia-2` e `dia-3`
- [ ] **Vídeos** (links do YouTube) → `mural.ts` › `videos`

**Textos para validar** (escritos por mim, sem confirmação ainda):
- [ ] Bloco "Sobre": título "Três dias para tirar uma ideia do papel" e o parágrafo de apresentação
- [ ] Mural: manter ou tirar a frase "Escolha uma data para ver os registros" (a frase equivalente já saiu da Programação)

**Já concluído:**
- [x] Cartões preenchidos, nesta ordem: equipe do Hackathon: Coord. Wellington Ávila, Prof. Marcio Garrido, Prof. Tiago Ruiz de Castro, Prof. Rafael Mynssem, Profa. Isabel Cristina, Profa. Laís Cristine, Prof. Delguel Arcanjo, Prof. Victor Silveira (incluído em 18/10, dados do Lattes); seção Parceria HackEnf FACMAR: Coord. Kíssyla Harley

## 5. Deploy (Vercel) e como publicar atualizações
- **Site:** https://hackathon-univassouras-marica.vercel.app
- **Repositório (público):** https://github.com/ProfTiagoCastro/hackathon-univassouras-marica
- **Vercel:** equipe *TeamBombista* (conta tiagoflp1@hotmail.com), projeto `hackathon-univassouras-marica`, preset Astro (build `npm run build`, saída `dist`).
- **Publicar uma atualização:** é só `git push` na branch `main`. A Vercel faz o build e publica sozinha em ~30 s. Pushes em outras branches geram URLs de preview.
- **Dois computadores:** o projeto também é editado num segundo computador (`C:\Users\Tiago\Desktop\SiteHackaton`, fora do OneDrive), com a mesma identidade git (*Tiago Ruiz de Castro <tiago.castro@univassouras.edu.br>*) e push pela conta ProfTiagoCastro. Antes de editar em qualquer um deles, rode `git pull`.
- **Último deploy:** 18/10/2026, faixa de apoiadores (ver o commit mais recente em `git log`), conferida no ar. Deploys anteriores: `1ee0da5` (edital assinado e retirada do e-mail), `76f0010` (cartão do Prof. Marcio), `900f9a6` (edital cruzado e seção Desafios).
- O `package-lock.json` desse segundo computador ficou com 7 linhas a mais, por causa do `npm install` no Windows. Elas **não** foram commitadas e podem ser descartadas com `git checkout package-lock.json`.

**Como a ligação ficou configurada (para não quebrar):**
- O login da Vercel usa o GitHub **ProfTiagoCastro** (Account Settings → Authentication). Antes era a oBombista, mas a Vercel só enxerga instalações do app que pertencem à conta GitHub do login.
- O app "Vercel" está instalado na ProfTiagoCastro com acesso **só** a este repositório.
- A conta **oBombista** é colaboradora (write) do repositório. Foi uma tentativa durante o deploy e não é mais necessária; pode ser removida em *Settings → Collaborators* no GitHub (pendente de decisão).
- Domínio próprio: se a universidade apontar um domínio, adicione em Vercel → Project → Domains e atualize `site` em `astro.config.mjs` e a linha `Sitemap:` em `public/robots.txt`.

## 6. Como testar localmente
- `npm run dev`, depois abrir http://localhost:4321
- Testar os estados da contagem: `http://localhost:4321/?agora=2026-10-20T10:00` (durante) e `?agora=2026-10-25T10:00` (encerrado)
- Cartões: no computador, o hover vira o cartão; clicar fixa e clicar de novo desvira; clicar fora ou Esc solta. No celular, o toque vira e o novo toque desvira.
- Para simular o celular: Chrome DevTools → Toggle device toolbar (375 px, touch).
- Se o servidor local for encerrado (por exemplo, por falta de memória), basta rodar `npm run dev` de novo.

## 7. Compatibilidade com iPhone (Safari/WebKit): não reverter
Duas correções específicas para o Safari, explicadas nos comentários do código:
- **Cartões flip** (`OrganizerCard.astro`): a face de costas recebe `visibility: hidden`, trocada no meio do giro. Só o `backface-visibility` deixava o nome e o botão espelhados no verso.
- **Menu sanduíche** (`Header.astro`): o botão usa `display: grid` e as linhas têm largura e altura fixas. Com flexbox dentro de `<button>`, as linhas ficavam com largura 0 e o ícone sumia.

Testado com emulação mobile no Chrome. O usuário aprovou a correção dos cartões ("perfeito"); a do menu ainda precisa ser conferida num iPhone real.

## 8. Observações
- **GitHub ProfTiagoCastro:** a verificação em duas etapas (2FA) é obrigatória a partir de **07/11/2026**. Ative antes disso, ou a conta fica restrita, e com ela os deploys.
- **Fotos do Mural:** prefira JPG de até ~3 MB. O build gera versões WebP otimizadas sozinho. Vídeos longos ficam melhor no YouTube (o repositório e o deploy ficam leves).
- O PDF do Lattes fica em `docs/referencias/` e **não** vai para o git nem para o site.
- **Skills de front-end:** antes de qualquer alteração visual, carregue a skill `frontend-design` (plugin `frontend-design@claude-plugins-official`, já instalado) e as skills de design (`design:design-system`, `design:ux-copy`, `design:design-critique`). Regra adotada no enxugamento: cada informação aparece num lugar só.
- No primeiro computador, a pasta está no OneDrive. Se a `node_modules` deixar a sincronização lenta, pause a sincronização durante o desenvolvimento.
