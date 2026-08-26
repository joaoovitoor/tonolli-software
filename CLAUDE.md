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

## PENDÊNCIAS ABERTAS (auditoria iniciada 26/08/2026 — nada disto foi corrigido ainda)

Achados de uma revisão de português/consistência em todo o conteúdo. Cada um precisa de uma decisão do
João antes de mexer — não são só erros de digitação, envolvem dado real ou escolha de tom.

1. **Erro de concordância real:** `projects.json` → `cta.title`: *"Quer um projeto como **estes**?"* —
   "estes" (plural) não concorda com "um projeto" (singular). Devia ser "como **este**". Fix mecânico,
   sem decisão pendente.

2. **Clientes nomeados que contradizem a própria regra do site:** `services.json`, descrição do serviço
   `modernizacao`, cita *"Já entregamos para Sony Music e Banco do Brasil"*. A seção "Cases citáveis"
   (histórico deste arquivo) registra que João decidiu **não citar clientes externos nominalmente** —
   só projetos próprios (PrevAgro, ClimIA, Currify) são citáveis. Precisa confirmar: essa menção é
   verdadeira e autorizada pelo cliente, ou é resquício que deveria ter sido genérico
   ("empresas de entretenimento e do setor financeiro")? Risco de credibilidade/jurídico se não for
   autorizado.

3. **Inconsistência de voz (eu vs. nós):** o hero da home fala em primeira pessoa ("sou eu", "fale
   comigo"), mas `about.json`, `services.json`, `sistema-legado.json` e o CTA de `projects.json` usam
   voz corporativa plural o tempo todo ("Nascemos", "Atuamos", "Oferecemos", "Construímos", "Já
   fizemos", "Não entregamos e sumimos"). Um cliente que lê a home e depois `/sobre` ou `/servicos` vai
   notar a contradição. Decisão do João: manter "nós" como voz da empresa (comum em consultorias solo)
   ou migrar tudo para "eu" pra bater com o hero? Nenhuma opção está certa por padrão — é escolha de
   tom.

4. **Honestidade do stat "50+ projetos":** João apontou que 50 projetos em {anos}+ anos soa pouco.
   Preciso do número real (ou de um stat substituto verdadeiro) antes de mudar — não posso simplesmente
   aumentar o número. Also `99% clientes satisfeitos` nunca foi trocado por um dado verificável, apesar
   de já estar anotado como problema em versões anteriores deste arquivo.

5. **Projetos em destaque com link morto:** `prevagro.com.br` e `climia.com.br` **não respondem**
   (confirmado via curl em 26/08/2026 — só `currify.app` está no ar). Isso por si só já é motivo pra
   tirar os dois cards ou pelo menos remover o link/URL clicável, independente da decisão maior de
   remover "Projetos em destaque" da home (João sugeriu isso — ver próxima seção).

6. **Home sem "Projetos em destaque":** proposta do João é tirar a seção de projetos da home e usar
   aquele espaço pra reforçar a solução/serviço (mais alinhado com "atendo qualquer demanda", já que
   projetos são vitrine estática e o trabalho é dinâmico). Falta decidir: tira só da home (mantém
   `/projetos` no nav para quem quiser ver cases) ou tira a página inteira? E os dois links mortos
   (PrevAgro/ClimIA) somem da listagem também, ou ficam como "descontinuado"?

**Não fixar nada da lista acima sem confirmar com o João** (exceto o item 1, que é gramática pura sem
ambiguidade).

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
