# Hackathon Univassouras · Campus Maricá

Site de divulgação do **Hackathon** dos cursos de **Engenharia de Software** e **Análise e Desenvolvimento de Sistemas** da Universidade de Vassouras, Campus Maricá. O evento acontece de **19 a 21 de outubro de 2026**.

> Para quem vai continuar o projeto, comece pelo [`HANDOFF.md`](./HANDOFF.md).

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | [Astro 7](https://astro.build) (site 100% estático) |
| Estilo | [Tailwind CSS 4](https://tailwindcss.com) via `@tailwindcss/vite` + CSS próprio |
| Linguagem | TypeScript (strict) |
| Fontes | Fontsource (self-hosted): Chakra Petch, IBM Plex Sans, IBM Plex Mono |
| Imagens | `astro:assets` (gera WebP otimizado no build) |
| Hospedagem | Vercel |

## Como rodar

Requer **Node.js 22+**.

```bash
npm install        # instala dependências
npm run dev        # servidor local em http://localhost:4321
npm run build      # gera o site estático em dist/
npm run preview    # serve o dist/ localmente
npm run check      # checagem de tipos do Astro/TS
```

## Estrutura

```
src/
├─ assets/          logos e fotos (otimizadas no build)
├─ components/      seções e componentes visuais
├─ data/            ← TODO O CONTEÚDO EDITÁVEL FICA AQUI
│  ├─ event.ts       datas, local, link do Google Forms
│  ├─ schedule.ts    programação dos 3 dias
│  ├─ organizers.ts  professores organizadores
│  └─ faq.ts         FAQ, regras e premiação
├─ layouts/         layout base (head, header, footer)
├─ pages/           rotas: / e /organizadores
└─ styles/          tokens de design (cores, fontes) e estilos globais
docs/               changelog, decisões e referências
```

## Documentação

- [`HANDOFF.md`](./HANDOFF.md): estado atual, onde editar cada coisa, pendências.
- [`docs/CHANGELOG.md`](./docs/CHANGELOG.md): histórico por etapa.
- [`docs/DECISOES.md`](./docs/DECISOES.md): decisões técnicas e de design.
