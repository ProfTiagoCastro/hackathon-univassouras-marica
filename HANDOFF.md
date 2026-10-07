# HANDOFF: Site do Hackathon Univassouras Maricá

> Documento de passagem de bastão. Atualizado a cada etapa concluída.
> **Última atualização:** 2026-10-07 · **Etapa atual:** 4 de 8 concluídas

## 1. Resumo
Site estático de divulgação do Hackathon (19, 20 e 21/10/2026) dos cursos de Engenharia de Software e ADS da Univassouras, Campus Maricá. Ele mostra a programação dos três dias, o botão de inscrição (Google Forms), os professores organizadores em cartões que giram, o local e o FAQ.

Stack: **Astro 7 + Tailwind 4 + TypeScript**, com deploy na **Vercel**. Detalhes em `README.md` e `docs/DECISOES.md`.

## 2. Status das etapas
| # | Etapa | Status |
|---|---|---|
| 1 | Setup, organização dos arquivos, docs | ✅ concluída |
| 2 | Design system + layout (header, footer, partículas) | ✅ concluída |
| 3 | Hero + contagem regressiva + CTA de inscrição | ✅ concluída |
| 4 | Sobre/Regras/Premiação + Programação | ✅ concluída |
| 5 | Organizadores (cartões flip) | ⏳ |
| 6 | Local/Mapa + FAQ + 404 | ⏳ |
| 7 | Polimento: SEO, acessibilidade, performance | ⏳ |
| 8 | Deploy na Vercel | ⏳ |

## 3. Onde editar cada informação
| O que | Arquivo | Campo |
|---|---|---|
| **Link do Google Forms** | `src/data/event.ts` | `registrationUrl` |
| Endereço / sala | `src/data/event.ts` | `location.address`, `location.room` |
| Contato | `src/data/event.ts` | `contact` |
| Horários de cada dia | `src/data/schedule.ts` | `activities` de cada dia (o exemplo está no comentário do arquivo) |
| Professores | `src/data/organizers.ts` | trocar um `pending(n)` pelos dados reais (o passo a passo está no comentário) |
| Fotos dos professores | `src/assets/professores/` | jpg quadrado, mín. 600×600 |
| FAQ, regras, premiação | `src/data/faq.ts` | `faq`, `rules`, `prizes` |
| Cores e fontes | `src/styles/global.css` | bloco `@theme` |

Campos vazios ou `null` aparecem no site com o selo **EM CONSTRUÇÃO**.

## 4. Pendências de conteúdo (aguardando a organização)
- [ ] Link do Google Forms
- [ ] Horários e atividades dos 3 dias
- [ ] Dados e fotos de mais 5 professores
- [ ] Regras, premiação e respostas do FAQ
- [ ] Endereço completo e sala
- [ ] Contato oficial

## 5. Observações
- O PDF do Lattes fica em `docs/referencias/` e **não** vai para o git nem para o site.
- A pasta está no OneDrive. Se a `node_modules` deixar a sincronização lenta, pause a sincronização durante o desenvolvimento.
