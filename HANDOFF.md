# HANDOFF: Site do Hackathon Univassouras Maricá

> Documento de passagem de bastão. Atualizado a cada etapa concluída.
> **Última atualização:** 2026-10-07 (fim do dia) · **Etapa atual:** 8 de 8 concluídas + ajustes mobile · **No ar:** https://hackathon-univassouras-marica.vercel.app

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

## 3. Onde editar cada informação
| O que | Arquivo | Campo |
|---|---|---|
| **Link do Google Forms** | `src/data/event.ts` | `registrationUrl` |
| Endereço / sala | `src/data/event.ts` | `location.address`, `location.room` (com o endereço preenchido, o pino do mapa fica exato; hoje a busca genérica acha duas unidades) |
| Contato | `src/data/event.ts` | `contact` |
| Horários de cada dia | `src/data/schedule.ts` | `activities` de cada dia (o exemplo está no comentário do arquivo) |
| Professores | `src/data/organizers.ts` | trocar um `pending(n)` pelos dados reais (o passo a passo está no comentário) |
| Fotos dos professores | `src/assets/professores/` | jpg quadrado, mín. 600×600 |
| FAQ, regras, premiação | `src/data/faq.ts` | `faq`, `rules`, `prizes` |
| **Fotos do Mural** | `src/assets/mural/dia-1`, `dia-2`, `dia-3` | é só colocar os arquivos .jpg/.png/.webp na pasta do dia (ordem alfabética; ex.: `01-abertura.jpg`) |
| Legendas das fotos | `src/data/mural.ts` | `captions` (ex.: `'dia-1/01-abertura.jpg': 'Abertura'`) |
| **Vídeos do Mural** | `src/data/mural.ts` | `videos` → `{ title, youtube: 'ID' }` ou `{ title, file: '/mural/video.mp4' }` (arquivo em `public/mural/`) |
| Cores e fontes | `src/styles/global.css` | bloco `@theme` |
| Imagem de compartilhamento | `scripts/make-og-image.mjs` | editar e rodar `npm run og` |
| Banner do HackEnf (hero) | `src/assets/banners/hackenf.jpg` | trocar o arquivo mantendo o nome; o deck fica em `Hero.astro` |
| Logos do rodapé | `src/assets/logos/` (`univassouras-marica.png`, `facmar.png`) | tamanhos em `Footer.astro` (`.logo--univ`, `.logo--facmar`) |
| Domínio final (SEO) | `astro.config.mjs` + `public/robots.txt` | `site` / linha `Sitemap:` |
| Config. da Vercel | `vercel.json` | só `trailingSlash: false` (URLs sem barra final) |

Campos vazios ou `null` aparecem no site com o selo **EM CONSTRUÇÃO**.

## 4. Pendências de conteúdo: próxima sessão
O site está no ar, e o próximo passo é **alimentar as informações**. Itens a trazer, por prioridade:

**Antes do evento (19/10):**
- [ ] **Link do Google Forms** de inscrição → `event.ts` › `registrationUrl` (os 3 botões passam a funcionar sozinhos)
- [ ] **Horários e atividades** de cada dia (início, fim, título, descrição curta, tipo: abertura, palestra, mentoria, mão na massa, intervalo, apresentação, premiação) → `schedule.ts`
- [ ] **Regras** do hackathon (lista de itens) → `faq.ts` › `rules`
- [ ] **Premiação** (colocação e prêmio) → `faq.ts` › `prizes`
- [ ] **Respostas do FAQ** (perguntas já criadas: quem pode participar, custo, pessoas por equipe, equipe formada, notebook, certificado; dá para trocar ou incluir perguntas) → `faq.ts` › `faq`
- [ ] **Público** e **formato** (ficha "Sobre") → `About.astro` › `specs`
- [ ] **Endereço completo e sala/auditório** (deixa o pino do mapa exato) → `event.ts` › `location`
- [ ] **Contato oficial** (e-mail ou Instagram) → `event.ts` › `contact`
- [ ] **Demais professores organizadores** (2 cartões "a definir" hoje): nome, cargo, foto quadrada, formação, 4 a 7 especialidades, link do Lattes. O PDF do Lattes também serve, porque eu extraio os dados. → `organizers.ts` e `src/assets/professores/`

**Durante e depois do evento:**
- [ ] **Fotos** de cada dia → `src/assets/mural/dia-1`, `dia-2` e `dia-3`
- [ ] **Vídeos** (links do YouTube) → `mural.ts` › `videos`

**Textos para validar** (escritos por mim, sem confirmação ainda):
- [ ] Bloco "Sobre": título "Três dias para tirar uma ideia do papel" e o parágrafo de apresentação
- [ ] Mural: manter ou tirar a frase "Escolha uma data para ver os registros" (a frase equivalente já saiu da Programação)

**Já concluído:**
- [x] Cartões preenchidos, nesta ordem: Coordenador Wellington Ávila, Prof. Marcio Garrido, Prof. Tiago Ruiz de Castro, Prof. Rafael Mynssem

## 5. Deploy (Vercel) e como publicar atualizações
- **Site:** https://hackathon-univassouras-marica.vercel.app
- **Repositório (público):** https://github.com/ProfTiagoCastro/hackathon-univassouras-marica
- **Vercel:** equipe *TeamBombista* (conta tiagoflp1@hotmail.com), projeto `hackathon-univassouras-marica`, preset Astro (build `npm run build`, saída `dist`).
- **Publicar uma atualização:** é só `git push` na branch `main`. A Vercel faz o build e publica sozinha em ~30 s. Pushes em outras branches geram URLs de preview.

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
- A pasta está no OneDrive. Se a `node_modules` deixar a sincronização lenta, pause a sincronização durante o desenvolvimento.
