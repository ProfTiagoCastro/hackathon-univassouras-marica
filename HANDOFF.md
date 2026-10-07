# HANDOFF: Site do Hackathon Univassouras Maricá

> Documento de passagem de bastão. Atualizado a cada etapa concluída.
> **Última atualização:** 2026-10-07 · **Etapa atual:** 7 de 8 concluídas

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
| 8 | Deploy na Vercel | ⏳ |
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
| Domínio final (SEO) | `astro.config.mjs` + `public/robots.txt` | `site` / linha `Sitemap:` |

Campos vazios ou `null` aparecem no site com o selo **EM CONSTRUÇÃO**.

## 4. Pendências de conteúdo (aguardando a organização)
- [ ] Link do Google Forms
- [ ] Horários e atividades dos 3 dias
- [ ] Dados e fotos de mais 5 professores
- [ ] Regras, premiação e respostas do FAQ
- [ ] Endereço completo e sala
- [ ] Contato oficial
- [ ] Fotos e vídeos do Mural (durante/depois do evento)

## 5. Deploy na Vercel (etapa 8, aguardando aprovação)
O site é estático, então a Vercel detecta o Astro sozinha (build `npm run build`, saída `dist/`).

**Opção A: GitHub + Vercel (recomendada; cada push publica sozinho)**
1. Criar um repositório no GitHub e enviar o código: `git remote add origin <url>` e depois `git push -u origin main`.
2. Em vercel.com → *Add New → Project* → importar o repositório → *Deploy*.

**Opção B: CLI**
1. `npm i -g vercel` e depois `vercel login`
2. `vercel` (gera uma URL de preview) e, depois de conferir, `vercel --prod`

**Depois do primeiro deploy:** atualize o domínio em `astro.config.mjs` (`site`) e em `public/robots.txt`, se a URL final for diferente de `hackathon-univassouras-marica.vercel.app`.

## 6. Como testar localmente
- `npm run dev`, depois abrir http://localhost:4321
- Testar os estados da contagem: `http://localhost:4321/?agora=2026-10-20T10:00` (durante) e `?agora=2026-10-25T10:00` (encerrado)
- Cartões: passar o mouse, clicar (fixa), clicar fora (solta), Esc (solta)

## 7. Observações
- **Fotos do Mural:** prefira JPG de até ~3 MB. O build gera versões WebP otimizadas sozinho. Vídeos longos ficam melhor no YouTube (o repositório e o deploy ficam leves).
- O PDF do Lattes fica em `docs/referencias/` e **não** vai para o git nem para o site.
- A pasta está no OneDrive. Se a `node_modules` deixar a sincronização lenta, pause a sincronização durante o desenvolvimento.
