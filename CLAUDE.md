# CLAUDE.md — Tonolli Software Website

> Especialista em UI/UX e Conversão B2B para este repositório.
> Última atualização: 22/03/2026

---

## PAPEL DESTE ARQUIVO

Este documento funciona como um co-piloto especialista em:
- **UX de conversão B2B** — como decisores corporativos navegam e decidem
- **Copy orientada a dor** — o que faz um CEO/CTO clicar em "Entrar em contato"
- **Diagnóstico do site atual** — o que está funcionando, o que está matando conversão
- **Roadmap de mudanças** — o que fazer primeiro, com maior impacto, rodando localmente

Leia `DESIGN.md` para princípios visuais e stack técnica. Este arquivo é sobre **estratégia e decisões de conteúdo**.

---

## QUEM VISITA ESTE SITE (E POR QUE IMPORTA)

### Perfil B — o visitante que converte (foco total)

> "Meu sistema atual está me travando. A equipe tem medo de mexer nele. Custa caro manter. E eu não sei se consigo confiar numa empresa externa para isso."

**Cargo:** CEO, CTO, Diretor de TI de empresa com 50-500 funcionários
**Situação:** Sistema legado em produção há 5-10+ anos. Lento, frágil, sem documentação.
**Motivação para buscar:** Crescimento travado OU crise iminente (sistema quebrando).
**Medo primário:** Contratar errado e piorar a situação.
**Como decide:** Pesquisa no Google → lê o site → avalia credibilidade → pede proposta.

**O que ele precisa ver no site para tomar ação:**
1. Que a Tonolli já fez isso antes (prova, não promessa)
2. Que entende a dor específica (linguagem familiar, não genérica)
3. Que tem experiência suficiente para não quebrar o que está funcionando
4. Uma próxima ação de baixo risco (conversar, não assinar)

### Perfil A — visitante que chega mas não é o foco

Empreendedor querendo construir MVP, desenvolvedor pesquisando tecnologias, startups com budget < R$30k. O site não precisa afastá-los, mas também **não deve ser otimizado para eles** — isso dilui a mensagem para o Perfil B.

---

## DIAGNÓSTICO DO SITE ATUAL

### Homepage — o que está fraco

**Hero atual:**
```
Badge:    "Software House em São Paulo"
Título:   "Transformamos ideias em software que gera resultado"
Subtítulo: "Desenvolvimento sob medida com inteligência artificial, arquitetura escalável..."
```

**Problemas:**
- "Transformamos ideias" → fala com Perfil A (quem tem ideia nova). O Perfil B não tem "uma ideia" — tem um sistema quebrado.
- "Inteligência artificial" na primeira dobra → atrai curiosos e devs, não decisores com sistema legado.
- Genérico demais — qualquer software house poderia ter este headline.
- Não nomeia a dor. O visitante lê e pensa "ok, mas você resolve meu problema específico?".

**Services Preview — o que está fraco:**
- "Inteligência Artificial" como segundo card (posição de destaque) → sinal errado para Perfil B.
- Descrição de "Modernização de Sistemas" é boa em conteúdo mas enterrada em terceiro lugar.
- As descrições mencionam tecnologias (Node.js, React, LangChain) — o decisor corporativo não sabe o que isso significa e não deveria precisar saber.

**Stats (19+, 50+, 6+, 99%):**
- São bons mas vagos. "50+ projetos entregues" não diz nada. Qual tipo de projeto? Para quem?
- "99% clientes satisfeitos" é uma métrica sem fonte — o visitante cético ignora.
- Oportunidade perdida: nenhum número fala diretamente ao Perfil B (ex: "12 sistemas legados modernizados").

**Trust Bar (Fintech, Entretenimento, Agronegócio, Saúde, Marketing Digital):**
- Bom conceito, execução fraca. Setores sem logos reais não constroem confiança.
- Se não há logos de clientes reais, substituir por depoimentos reais ou cases nomeados.

**CTA final:**
- "Tem um projeto em mente?" → assume Perfil A (quem está construindo algo novo).
- "Avaliamos cada projeto individualmente" → boa linha, mas perdida no subtítulo.

### O que está funcionando

- Estrutura de seções está correta (Hero → Stats → Services → Projects → CTA).
- Conteúdo em JSON — facilita edição sem tocar em componentes.
- Página de Contato com campos de budget e timeline → qualifica o lead de forma inteligente.
- Página de Projetos com casos reais (PrevAgro, ClimIA) → prova de capacidade técnica.
- "19 anos de experiência" e "6 países atendidos" → credenciais sólidas, mas subutilizadas.

### Páginas de serviço — estado atual

Cada serviço tem id, description e features listadas com tecnologias. O problema é que **features e tecnologias são o que a Tonolli faz, não o que o cliente ganha**. Exemplo real:

```
Feature atual: "Migração de sistemas legados para arquiteturas modernas com microserviços"
O que o cliente quer ler: "Seu sistema atual continua funcionando durante toda a migração"
```

### Página de Contato — estado atual

**Muito boa estrutura.** O wizard com tipo de projeto, budget e timeline é exatamente o certo para qualificação B2B. Não mudar a lógica — apenas ajustar copy de suporte.

---

## ESTRATÉGIA DE COPY — PRINCÍPIOS

### 1. Falar com a dor, não com a solução

Regra: o visitante do Perfil B não está comprando tecnologia, está comprando **redução de risco** e **retomada do crescimento**.

| Errado (feature) | Certo (dor/resultado) |
|---|---|
| "Migração para microsserviços" | "Seu sistema legado fica operando enquanto modernizamos" |
| "Arquitetura escalável" | "Sistema que aguenta 10x mais sem cair" |
| "Code review e DevOps" | "Equipe deixa de ter medo de subir código em produção" |
| "19 anos de experiência" | "19 anos modernizando sistemas que ninguém mais queria tocar" |
| "50+ projetos entregues" | "12 sistemas legados modernizados sem interrupção de operação" |

### 2. O headline do hero precisa fazer uma pergunta ou nomear uma dor

Referência: Linear — "Purpose-built tool for planning and building products." Direto. Sem metáforas.

Para Tonolli Perfil B, algumas opções:

```
Opção A (dor direta):
"Seu sistema legado está travando o crescimento da empresa?"

Opção B (proposta de valor):
"Modernizamos sistemas legados. Sem parar sua operação."

Opção C (credencial + dor):
"19 anos modernizando sistemas que empresas tinham medo de tocar."

Opção D (resultado):
"Transformamos sistemas legados em plataformas que escalam."
```

> **Recomendação:** Opção B ou D. Diretas, específicas, sem interrogação que pode afastar quem não se identifica como "travado". Testar ambas.

### 3. Subtítulo: contexto + prova, não lista de tecnologias

```
Atual:
"Desenvolvimento sob medida com inteligência artificial, arquitetura escalável e
experiência comprovada em projetos de alta complexidade para empresas no Brasil e exterior."

Proposto:
"Refatoramos, migramos e modernizamos sistemas corporativos com zero downtime.
19 anos de experiência. Projetos entregues no Brasil, EUA e Europa."
```

### 4. CTAs — baixo risco, ação clara

O Perfil B não vai "fechar negócio" no primeiro acesso. Ele quer iniciar uma conversa.

| Errado | Certo |
|---|---|
| "Contratar agora" | "Falar sobre o meu sistema" |
| "Solicitar proposta" | "Avaliar meu projeto" |
| "Iniciar projeto" | "Conversa sem compromisso" |

O CTA primário atual "Falar sobre meu projeto" é adequado. Manter. O secundário "Ver projetos" também funciona bem como opção de baixo risco.

---

## HOMEPAGE — MUDANÇAS RECOMENDADAS (em ordem de impacto)

### PRIORIDADE 1 — Hero (alto impacto, mudança mínima)

**Arquivo:** `src/content/home.json`

```json
// ANTES
"hero": {
  "badge": "Software House em São Paulo",
  "title": "Transformamos ideias em software que gera resultado",
  "subtitle": "Desenvolvimento sob medida com inteligência artificial, arquitetura escalável e experiência comprovada em projetos de alta complexidade para empresas no Brasil e exterior."
}

// DEPOIS
"hero": {
  "badge": "Software House B2B — São Paulo",
  "title": "Modernizamos sistemas legados. Sem parar sua operação.",
  "subtitle": "Refatoramos, migramos e modernizamos sistemas corporativos com 19 anos de experiência. Projetos entregues para empresas no Brasil, EUA e Europa."
}
```

**Por que funciona:**
- Nomeia o serviço principal para Perfil B (modernização de sistema legado)
- "Sem parar sua operação" elimina o maior medo do decisor
- Subtítulo tem credencial (19 anos) + prova geográfica (Brasil, EUA, Europa)
- Remove "IA" da primeira dobra (não é o foco do Perfil B)

### PRIORIDADE 2 — Reordenar Services Preview

O Perfil B precisa ver "Modernização de Sistemas" como primeiro ou segundo card, não terceiro.

```json
// Ordem proposta:
1. Modernização de Sistemas  ← mover para primeiro
2. Desenvolvimento Sob Medida
3. Consultoria & Arquitetura
4. Inteligência Artificial   ← mover para último
```

**Descrição do card de Modernização — reescrever:**
```json
// ANTES
"description": "Migração de sistemas legados para arquiteturas modernas com microserviços, serverless e cloud."

// DEPOIS
"description": "Refatoramos e migramos sistemas legados sem interromper sua operação. Seu time continua trabalhando enquanto modernizamos a base do sistema."
```

### PRIORIDADE 3 — Stats: trocar "99% clientes satisfeitos" por dado real

```json
// ANTES
{ "value": "99%", "label": "Clientes satisfeitos" }

// DEPOIS (escolher o que for verdade)
{ "value": "12+", "label": "Sistemas legados modernizados" }
// ou
{ "value": "0", "label": "Projetos abandonados" }
// ou
{ "value": "8+", "label": "Anos de projetos recorrentes" }
```

> **Regra:** só usar número que seja verificável e verdadeiro. Um número específico e honesto vale mais que "99%" genérico.

### PRIORIDADE 4 — CTA final: mudar headline

```json
// ANTES
"cta": {
  "title": "Tem um projeto em mente?",
  "subtitle": "Avaliamos cada projeto individualmente para propor a melhor solução técnica e comercial."
}

// DEPOIS
"cta": {
  "title": "Seu sistema legado precisa de atenção?",
  "subtitle": "Avaliamos seu sistema sem compromisso e apresentamos um diagnóstico técnico em até 48 horas."
}
```

### PRIORIDADE 5 — Trust Bar: substituir setores por resultado

Se não há logos reais disponíveis, trocar setores por afirmações específicas que o Perfil B valoriza:

```json
// Opção A — manter setores mas ser mais específico
"companies": ["Fintech — sistemas de pagamento", "Agronegócio — plataformas de dados", "Saúde — prontuários eletrônicos", "Entretenimento — streaming", "EUA / Europa"]

// Opção B — trocar por claims verificáveis
"companies": ["Zero downtime em migrações", "Suporte pós-entrega incluso", "Código documentado e auditável", "NDA disponível", "Reunião de diagnóstico grátis"]
```

---

## NOVA LANDING PAGE PROPOSTA: `/sistema-legado`

Esta página é o destino prioritário dos anúncios Google Ads (aumenta Quality Score) e captura Perfil B que busca diretamente no Google.

**URL:** `/sistema-legado`
**Objetivo único:** levar ao formulário de contato
**Estrutura sugerida (sem scroll desnecessário):**

```
[HERO]
Headline:    "Seu sistema legado está travando o crescimento?"
Subheadline: "A Tonolli Software tem 19 anos modernizando sistemas corporativos
              sem interromper a operação. Sem reescrever tudo do zero."
CTA:         [Falar sobre meu sistema] → /contato?origem=sistema-legado

[3 MEDOS ELIMINADOS]
Card 1: "Medo: o sistema vai parar durante a migração"
        Resposta: "Modernizamos em paralelo. Seu sistema continua operando."
Card 2: "Medo: a equipe vai perder o contexto do código"
        Resposta: "Documentamos tudo. Transferência total de conhecimento."
Card 3: "Medo: vai custar mais do que foi orçado"
        Resposta: "Diagnóstico gratuito. Proposta com escopo fechado antes de iniciar."

[COMO FUNCIONA — 3 PASSOS]
1. Diagnóstico gratuito (até 48h)
2. Proposta com escopo e prazo fechados
3. Modernização sem parar a operação

[PROVA SOCIAL]
Case resumido de 1 projeto real de modernização com resultado mensurável

[CTA FINAL]
"Agende um diagnóstico gratuito do seu sistema"
[Falar com especialista] → /contato?origem=sistema-legado
```

**Arquivo a criar:** `src/app/sistema-legado/page.tsx`
**Conteúdo a criar:** `src/content/sistema-legado.json`

---

## PÁGINA DE SERVIÇOS — MUDANÇAS RECOMENDADAS

**Arquivo:** `src/content/services.json`

### Serviço de Modernização — reescrever description e features

```json
// ANTES — description
"Modernizamos sistemas e plataformas legadas para arquiteturas modernas.
Combinamos estratégia de migração, refatoração progressiva e novas tecnologias
para revitalizar sistemas críticos sem interromper as operações."

// DEPOIS
"Sistemas legados travam o crescimento porque ninguém quer tocar neles.
A Tonolli tem 19 anos fazendo exatamente isso — modernizar sistemas críticos
sem parar a operação. Diagnóstico gratuito. Proposta com escopo fechado."
```

```json
// Features — antes (orientadas a tech)
"Análise de arquitetura e mapeamento de dependências"
"Refatoração progressiva sem interrupção de operações"
"Migração para cloud (AWS, GCP, Azure)"

// Features — depois (orientadas ao decisor)
"Seu sistema continua operando durante toda a modernização"
"Mapeamos todas as dependências antes de tocar em qualquer código"
"Documentação completa entregue junto com o sistema modernizado"
"Escopo e prazo fechados antes de assinar — sem surpresas de custo"
"Diagnóstico técnico gratuito em até 48 horas"
```

---

## PÁGINA DE CONTATO — AJUSTES MENORES

A estrutura está muito boa. Pequenos ajustes de copy:

```json
// ANTES
"hero": {
  "title": "Fale conosco",
  "subtitle": "Conte-nos sobre seu projeto. Respondemos em até 24 horas..."
}

// DEPOIS
"hero": {
  "title": "Vamos avaliar seu sistema",
  "subtitle": "Descreva o que está travando. Respondemos em até 24 horas com uma avaliação inicial e os próximos passos sem compromisso."
}
```

**O campo "Modernização de Sistema Legado" no projectType já existe — manter como primeira opção** para reforçar o foco do Perfil B.

---

## UX — PRINCÍPIOS PARA ESTE SITE ESPECIFICAMENTE

### Hierarquia visual que converte para B2B corporativo

1. **Headline = dor ou resultado** (não nome da empresa, não tecnologia)
2. **Subheadline = credencial + especificidade** (19 anos + tipo de projeto)
3. **CTA primário = ação de baixo risco** (conversar, não comprar)
4. **CTA secundário = prova** (ver projetos, ver cases)
5. **Social proof = concreto** (números reais, setores reais, não "99% satisfeitos")
6. **Benefícios = resultado do cliente** (não features do serviço)

### Cognitive load para o Perfil B

O decisor corporativo chega cansado, ocupado, desconfiado. Cada seção deve responder uma pergunta implícita:

| Seção | Pergunta implícita do visitante |
|---|---|
| Hero | "Essa empresa resolve meu problema?" |
| Stats | "Posso confiar nessa empresa?" |
| Services | "Eles já fizeram o que eu preciso?" |
| Projects | "Tem prova disso?" |
| CTA | "Qual é o próximo passo sem risco?" |

### Micro-copy que constrói confiança

Adicionar em locais estratégicos (abaixo dos CTAs principais):

```
Abaixo do botão "Falar sobre meu projeto":
→ "Diagnóstico inicial sem compromisso. Respondemos em até 24h."

Abaixo do formulário de contato:
→ "Seus dados são confidenciais. NDA disponível mediante solicitação."

Na página de sistema legado:
→ "Mais de 12 sistemas legados modernizados sem downtime."
```

### Friction zero no formulário

O ContactWizard atual é bom. Garantir que:
- O primeiro passo peça apenas nome + email (não assusta)
- O tipo de projeto apareça cedo (qualifica sem sentir interrogatório)
- Mensagem de sucesso seja específica ("Recebemos. Retorno em até 24h úteis.")

---

## DESIGN SYSTEM — DIRETRIZES ESPECÍFICAS

### Hierarquia tipográfica para páginas de serviço

```
H1 (hero): font-bold, text-4xl md:text-5xl lg:text-6xl — máx 8 palavras
H2 (seção): font-semibold, text-3xl — deve completar "Como [H2] resolve [dor]"
H3 (card): font-medium, text-xl — benefício, não feature
Body: text-base, leading-relaxed — frase curta, parágrafo curto (máx 3 linhas)
```

### Cores e sinalização visual

- **CTA primário:** cor sólida com alto contraste — deve ser o elemento mais visível na viewport
- **CTA secundário:** ghost/outlined — visível mas não compete com primário
- **Cards de serviço:** borda sutil, hover com elevação leve (shadow-md)
- **Stats:** número em destaque (text-4xl font-bold), label em muted (text-sm text-muted)

### Espaçamento entre seções

Manter `py-24` para seções principais. Aumentar para `py-32` na hero e no CTA final — essas seções precisam de "respiração" para parecerem premium (referência: Stripe, Vercel).

### Padrão para cards de benefício (nova landing page)

```tsx
// Estrutura sugerida para cards de "Medo Eliminado":
<div className="rounded-2xl border border-border bg-card p-6">
  <div className="flex items-start gap-4">
    <div className="rounded-lg bg-primary/10 p-2">
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <div>
      <p className="text-sm font-medium text-muted-foreground mb-1">
        A preocupação comum:
      </p>
      <p className="font-semibold text-foreground mb-2">{fear}</p>
      <p className="text-sm text-muted-foreground">{answer}</p>
    </div>
  </div>
</div>
```

---

## COMO RODAR LOCAL E TESTAR

```bash
# Na raiz do projeto
npm run dev

# Acessar em:
http://localhost:3000          → homepage
http://localhost:3000/servicos → página de serviços
http://localhost:3000/contato  → formulário de contato
http://localhost:3000/sistema-legado → nova landing page (quando criada)
```

### Checklist de revisão local antes de subir

**Homepage:**
- [ ] Hero headline nomeia modernização de sistemas ou legado
- [ ] Nenhuma menção a "IA" ou tecnologia específica above the fold
- [ ] Serviço de Modernização aparece como 1º ou 2º card
- [ ] CTA primário diz "Falar sobre meu sistema" ou similar
- [ ] Stats têm números verificáveis e específicos

**Serviços:**
- [ ] Description do serviço de modernização fala com Perfil B
- [ ] Features listam benefícios (o que o cliente ganha) não features técnicas
- [ ] Nenhuma descrição de serviço menciona linguagens/frameworks no texto principal

**Contato:**
- [ ] Título da página não é "Fale conosco" genérico
- [ ] "Modernização de Sistema Legado" é a primeira opção no projectType
- [ ] Mensagem de confirmação é específica

**Nova landing page `/sistema-legado`:**
- [ ] Headline nomeia a dor diretamente
- [ ] Três medos eliminados com respostas concretas
- [ ] Um case ou prova social real
- [ ] CTA único e claro para /contato

---

## O QUE NAO MUDAR

| Elemento | Motivo |
|---|---|
| Estrutura de rotas (`/servicos`, `/projetos`, `/sobre`, `/contato`) | URLs indexadas — mudar afeta SEO |
| ContactWizard — lógica de campos e etapas | Já é bem qualificado, só ajustar copy |
| Stats de números verificáveis (19+, 50+, 6+) | São credenciais reais e fortes |
| Página de Projetos — conteúdo dos cases | Cases reais são prova social — não mexer |
| Componentes UI (botões, cards, inputs) | Stack estável, não há ganho em refatorar |
| Dados do fundador em `/sobre` | Autenticidade é ativo — não generivar |

---

## ROADMAP DE IMPLEMENTACAO

### Fase 1 — Mudanças em JSON (sem criar nada novo, testar local primeiro)
- [ ] `home.json`: hero title + subtitle + services order + CTA title
- [ ] `services.json`: description + features do serviço de modernização
- [ ] `contact.json`: hero title + subtitle + mensagem de sucesso
- [ ] Testar local → revisar → subir

### Fase 2 — Nova landing page `/sistema-legado`
- [ ] Criar `src/content/sistema-legado.json` com todo o conteúdo
- [ ] Criar `src/app/sistema-legado/page.tsx`
- [ ] Criar componentes específicos se necessário (FearCard, ProcessStep)
- [ ] Testar local → revisar → subir
- [ ] Atualizar URL de destino dos anúncios Google Ads para `/sistema-legado`

### Fase 3 — Micro-copy e trust signals
- [ ] Adicionar texto de suporte abaixo dos CTAs principais
- [ ] Revisar todas as meta descriptions (SEO) para linguagem Perfil B
- [ ] Adicionar structured data para LocalBusiness

### Fase 4 — Medição (após subir)
- [ ] Configurar evento de conversão no Google Ads para formulário enviado
- [ ] Checar Google Analytics: taxa de saída no hero (bounce acima de 70% = hero fraco)
- [ ] Checar scroll depth: até onde os usuários chegam antes de sair

---

## HISTORICO DE MUDANCAS

### 22/03/2026 — Criação deste arquivo
- Diagnóstico completo do site atual
- Estratégia de copy definida para Perfil B
- Roadmap de implementação em 4 fases
- Nova landing page `/sistema-legado` proposta
