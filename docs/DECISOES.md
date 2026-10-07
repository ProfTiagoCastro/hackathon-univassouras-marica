# Decisões técnicas e de design

## Stack

| Decisão | Motivo |
|---|---|
| **Astro** em vez de Next.js/React | O site é só de divulgação, sem backend nem login. O Astro gera HTML estático e manda JS apenas para as partes interativas (partículas, contagem, abas e cartões), o que deixa o carregamento rápido e o SEO bom. |
| **Tailwind CSS 4** | Os tokens de design (cores, fontes) ficam no `@theme` de `src/styles/global.css`, numa fonte única. |
| **Conteúdo em `src/data/*.ts`** | Quem for atualizar horários, professores ou o link do Forms não precisa mexer em HTML. Valores vazios ou `null` mostram "EM CONSTRUÇÃO" automaticamente. |
| **Partículas em canvas próprio** | Uma lib (tsParticles) pesaria 40 KB ou mais. O script próprio tem poucos KB, desenha o motivo de circuito da logo, pausa fora da tela e respeita `prefers-reduced-motion`. |
| **Fontes self-hosted (Fontsource)** | Não depende do Google Fonts, sem requisição a terceiros e melhor para LGPD e performance. |
| **Vercel** | Deploy gratuito, HTTPS e preview automático a cada push. |

## Identidade visual

O site junta duas marcas:

| Token | Hex | Origem |
|---|---|---|
| `wine` | `#7A1530` | bordô da logo do Hackathon ("HACK", setas `< >`) |
| `brick` | `#8B2C2E` | vermelho do escudo Univassouras |
| `navy` | `#14336E` | azul da logo do Hackathon ("ATHON") |
| `stone` | `#A39A96` | cinza do logotipo Univassouras |
| `ink` | `#060B18` | fundo, um navy quase preto (derivado do `navy`) |
| `paper` | `#EEE9E6` | texto principal, branco quente puxado para o `stone` |
| `rose` | `#E0577A` | versão clara do `wine`, para textos/destaques legíveis no fundo escuro (contraste AA) |
| `sky` | `#7FA2EE` | versão clara do `navy`, para links e detalhes no escuro |

**Tipografia**
- *Chakra Petch*: títulos. É geométrica e angulosa, parecida com o "HACKATHON" da logo.
- *IBM Plex Sans*: texto corrido, de origem técnica e boa leitura.
- *IBM Plex Mono*: horários, rótulos e detalhes "de código".

**Assinatura visual: o traço de circuito.** As trilhas de circuito com terminais redondos da logo aparecem em três lugares:
1. nas partículas do fundo (nós que se conectam e reagem ao mouse);
2. na linha do tempo da programação (cada atividade é um "pad" na trilha);
3. nos divisores e nos detalhes `< >` dos títulos.

**Logo do Hackathon no fundo escuro:** o PNG original tem fundo branco e textos escuros. Ele fica num painel claro no hero, porque é a forma mais fiel à marca.
