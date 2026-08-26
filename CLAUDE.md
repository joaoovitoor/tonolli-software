# CLAUDE.md — Tonolli Software Website

> Especialista em UI/UX, conversão e posicionamento para este repositório.
> Última reescrita: 26/08/2026 — este arquivo documenta o estado e a estratégia ATUAIS.
> Não se prenda a raciocínios antigos: se algo aqui parecer desatualizado frente ao código, o código manda.

---

## PAPEL DESTE ARQUIVO

Co-piloto para decisões de:
- **Posicionamento** — o que o site diz que a Tonolli é, e pra quem
- **Copy de conversão** — o que faz alguém preencher o formulário de contato
- **Consistência** — pegar erro de português, contradição de tom ou dado antes do cliente
- **Convenções técnicas do conteúdo** — regras que não podem regredir (token `{anos}`, imports, etc.)

Leia `DESIGN.md` para stack visual/técnica. Este arquivo é sobre conteúdo e estratégia.

---

## QUEM É A TONOLLI SOFTWARE (contexto de negócio real)

João Vitor é **engenheiro de software sênior, pessoa física, com CNPJ próprio** (Tonolli Software LTDA,
CNPJ 48.512.403/0001-46). Atende individualmente — não há equipe por trás. O site é intencionalmente
**híbrido**: tem estrutura de empresa (CNPJ, contrato, nota fiscal — o que dá segurança jurídica pra quem
contrata) mas o atendimento, do orçamento à entrega, é direto com ele.

**Objetivo do site:** ranquear bem para quem procura contratar um programador/desenvolvedor para
qualquer demanda de desenvolvimento — não é currículo, não é vitrine só do emprego atual, não é um site
que só faz sentido para um nicho estreito de cliente.

---

## POSICIONAMENTO ATUAL

### O wedge identificado (pesquisa de concorrentes, 26/08/2026)

Existem dois arquétipos ocupando o mercado de busca:

1. **Freelancer pessoa física genérico** (ex: alanfernds.com.br) — sem CNPJ/empresa formal, menos
   credibilidade para contratação por empresa que precisa de nota fiscal/contrato.
2. **"Software house" corporativa anônima** (ex: comhub.com.br, is-desenvolvimento.com.br) — copy vaga
   e intercambiável ("impulsione seu negócio"), sem rosto, sem prova social concreta, e o cliente nunca
   sabe se vai falar com quem realmente programa.

**Nenhum dos dois ocupa o meio-termo real da Tonolli: empresa formal + atendimento individual direto.**
Termos de cauda longa ligados a isso (`contratar programador direto com CNPJ`, `programador PJ para
sistemas de empresas`, `desenvolvedor freelancer com nota fiscal`) apareceram nas buscas sem nenhuma
página comercial concorrente — só conteúdo informativo de blog. É a âncora de SEO prioritária.

Termos genéricos de altíssima concorrência (`programador freelancer são paulo`, `contratar programador`)
são dominados por marketplaces (99Freelas, Workana, Indeed, LinkedIn) — não vale mirar ranking #1 aí.
`software house são paulo` é ganhável mas genérico demais para diferenciar.

### A mensagem central (repetir em várias seções do site)

> Empresa formal (CNPJ, contrato, nota fiscal) + atendimento sem intermediário (quem orça e programa é
> quem atende, não passa por vendedor/account/dev júnior).

Isso responde às duas objeções que cada arquétipo concorrente deixa em aberto: "e se for freelancer sem
estrutura?" e "vou falar com um vendedor e nunca mais ver quem programa?".

**Risco a vigiar na copy:** não fingir ser um "time" (evitar "nossa equipe", "Nascemos", "Trabalhamos"
como voz corporativa plural) quando na prática é uma pessoa só — isso quebra a confiança assim que o
cliente descobre. Ver auditoria de consistência de voz abaixo — ainda não resolvida em todo o site.

### Legado como oferta, não como carro-chefe

A modernização de sistemas legados **deixou de ser o posicionamento principal da home** (era o foco
antes de 26/08/2026). Agora é uma oferta entre outras — a landing `/sistema-legado` continua no ar para
quem chega buscando especificamente isso (ex: Ads), mas o hero e a mensagem-guarda-chuva do site são
generalistas.

---

## ESTADO ATUAL DA HOMEPAGE (pós 26/08/2026)

```
Hero:      "Contrate direto quem vai programar o seu sistema."
           badge: "Programador com CNPJ — sem agência no meio"
           CTA primário: "Falar comigo sobre o projeto" → /contato
           CTA secundário: "Ver projetos" → /projetos

whyMe:     3 cards respondendo objeções (freelancer sem estrutura / vendedor no meio / demanda genérica)

Stats:     {anos}+ anos, 50+ projetos, 6+ países, 99% clientes satisfeitos  ← em auditoria, ver pendências

Services:  Desenvolvimento Sob Medida (1º) → Modernização de Sistemas (2º) →
           Consultoria & Arquitetura (3º) → Inteligência Artificial (4º)

Projetos em destaque:  PrevAgro, ClimIA, Currify  ← em auditoria, ver pendências (dois links mortos)

CTA final + Trust bar (setores, sem logos reais)
```

Conteúdo em `src/content/*.json`, consumido via `@/lib/content` (nunca importar `@/content/*.json`
direto — ver convenção do token `{anos}` abaixo).

---

## PENDÊNCIAS ABERTAS

Resolvidas em 26/08/2026:
- ~~Erro de concordância "projeto como estes"~~ → corrigido para "este".
- ~~`/projetos`, `ProjectCard`, `projects.json`~~ → removidos por completo (dois dos três cases,
  PrevAgro e ClimIA, tinham link morto — confirmado via curl). Home e `/sistema-legado` não apontam
  mais pra lá; CTAs redirecionados pra `/servicos`. Decisão do João: focar em serviço/solução e
  marketing pra captar cliente novo, não em vitrine de entregas passadas.
- ~~Inconsistência de voz eu/nós~~ → migrado tudo pra primeira pessoa ("eu"), a pedido do João. `about`,
  `services`, `sistema-legado` e os CTAs de header/footer agora falam em "eu"/"comigo", consistente com
  o hero.
- ~~"50+ projetos" sem lastro~~ → virou `{projetos}+`, calculado como `anosDeExperiencia * 12` (~1
  projeto/mês nos últimos {anos} anos, conforme estimativa do João) em `src/lib/content.ts`. Dinâmico
  igual ao `{anos}`, nunca mais hardcoded.

Ainda em aberto:

1. **Clientes nomeados em `services.json`:** a descrição do serviço `modernizacao` citava *"Já
   entregamos para Sony Music e Banco do Brasil"*, o que contradiz a regra já registrada de não citar
   clientes externos nominalmente (só PrevAgro/ClimIA/Currify são citáveis). **Removi a menção nominal
   por padrão** (ficou "com casos de redução de até 70% em custos de infraestrutura", sem nomear
   ninguém) até o João confirmar se era verdadeiro e autorizado — se sim, dá pra reintroduzir de forma
   genérica ou nominal.
2. **`99% clientes satisfeitos`** (home + o quanto isso aparece em `about.json`) continua sem fonte
   verificável — mesmo problema apontado em versões anteriores deste arquivo, nunca resolvido.
3. **Estrutura do site** (pergunta do João, 26/08/2026): manter páginas separadas (Home, Sobre,
   Serviços, Contato, Sistema Legado) ou consolidar em landing única? Ver resposta/recomendação na
   conversa — decisão ainda não fechada.
4. **Pesquisa de design/layout** (pergunta do João, 26/08/2026): qual padrão visual de site
   individual/consultoria chama mais atenção globalmente — ainda não pesquisado a fundo, próximo passo.

---

## CONVENÇÕES TÉCNICAS CRÍTICAS

### Anos de experiência — cálculo automático

`src/lib/content.ts`: `anosDeExperiencia = ano atual - 2006`, substitui o token `{anos}` em toda string
dos JSONs de conteúdo.

1. **Nunca hardcodar anos** ("20 anos", "21+") em JSON ou TSX — usar `{anos}` nos JSONs ou importar
   `anosDeExperiencia`.
2. **Sempre importar de `@/lib/content`** (`siteData`, `homeData`, `aboutData`, `servicesData`,
   `projectsData`, `contactData`, `sistemaLegadoData`) — nunca `@/content/*.json` direto, senão o token
   `{anos}` vaza cru na tela.
3. Cron anual no `deploy.yml` (02/jan, 06h UTC) rebuilda na virada do ano.
4. **Distinção factual:** empresa fundada em **2022** (`foundingDate` no schema); "desde 2006" é a
   **experiência do fundador**, não da empresa. Nunca alegar "empresa desde 2006".

### Deploy e SEO

- Push na `main` → GitHub Actions → Cloudflare Pages (`tonolli-software`). Static export
  (`output: "export"`, trailingSlash).
- Indexado no Google, #1 para a marca própria (ainda não para termos genéricos — essa é a lacuna que o
  reposicionamento de 26/08 mira).
- Sitemap/robots em `public/` são manuais — atualizar ao criar página nova.
- Domínio canônico sem `www`, URLs com barra final.
- Maior alavanca de SEO local pendente: Google Business Profile (não existe ainda; ação do João).

---

## O QUE NÃO MUDAR (sem pedido explícito)

| Elemento | Motivo |
|---|---|
| Estrutura de rotas (`/servicos`, `/projetos`, `/sobre`, `/contato`, `/sistema-legado`) | URLs indexadas — mudar afeta SEO |
| `ContactWizard` — lógica de campos e etapas | Já é bem qualificado, só copy pode mudar |
| Token `{anos}` e o import de `@/lib/content` | Ver convenção técnica acima |
| Componentes UI genéricos (`Button`, `Card`, `SectionTitle`, etc.) | Stack estável |
| Dados do fundador em `/sobre` | Autenticidade é ativo |

Note que **os números de stats (50+, 99%) saíram desta lista** — estão em auditoria (pendência 4 acima),
não são mais "intocáveis por padrão".

---

## COMO RODAR LOCAL E TESTAR

```bash
npm run dev
# http://localhost:3000            → homepage
# http://localhost:3000/servicos   → serviços
# http://localhost:3000/contato    → contato
# http://localhost:3000/sistema-legado → landing legado
```

Antes de subir qualquer mudança de copy: `npm run build` (pega erro de tipo/rota) + rodar local e ler a
página de verdade — não só confiar no JSON.

---

## HISTÓRICO DE MUDANÇAS

Only entradas a partir da reescrita deste arquivo. Contexto anterior (diagnóstico do site antigo, roadmap
de 4 fases, criação da `/sistema-legado`) está preservado no `git log` deste arquivo, não repetido aqui.

### 26/08/2026 — Reposicionamento generalista + híbrido CNPJ
- Pesquisa de concorrentes (2 arquétipos, nenhum ocupa o meio-termo CNPJ + atendimento direto).
- `home.json`: hero, nova seção `whyMe`, `servicesPreview` já estava com Desenvolvimento Sob Medida em
  1º.
- `services.json`: reordenado (Desenvolvimento Sob Medida primeiro, Modernização vira 2ª oferta).
- `site.json`: `description`/`shortDescription` atualizados para o wedge CNPJ/direto-sem-agência.
- Auditoria de português/consistência iniciada no mesmo dia — ver "PENDÊNCIAS ABERTAS" acima. Achados:
  erro de concordância em `projects.json`, clientes nomeados (Sony Music, Banco do Brasil) que
  contradizem a regra de não citar clientes externos, inconsistência de voz eu/nós entre home e o resto
  do site, stat "50+ projetos" questionado, dois links de projeto mortos (PrevAgro, ClimIA).
- Este arquivo foi reescrito do zero a pedido do João para não ficar preso ao raciocínio antigo.
