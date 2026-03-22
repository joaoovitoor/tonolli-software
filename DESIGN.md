# DESIGN.md — Tonolli Software Website

> Referência técnica de design, tipografia, performance visual e backlog de otimizações.
> Última atualização: 22/03/2026

---

## STACK DE DESIGN

| Camada | Tecnologia | Notas |
|---|---|---|
| CSS utility | Tailwind CSS v4 | CSS-first (`@import "tailwindcss"`) — sem `tailwind.config.ts` |
| Fontes | next/font/google | Inter (headings) + Plus Jakarta Sans (body) |
| Ícones | lucide-react | — |
| Animações | CSS puro em globals.css | fade-in-up, shimmer-sweep |
| Imagens | next/image | lazy por padrão; `priority` no logo do header |

---

## SISTEMA DE FONTES

### Configuração atual — `src/app/layout.tsx`

```ts
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  // ⚠️ PESOS NÃO DECLARADOS — carrega todos (100–900)
});

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  display: 'swap',
  // ⚠️ PESOS NÃO DECLARADOS — carrega todos (100–900)
});
```

**Aplicação no CSS:**
- `body` → `var(--font-jakarta)` — parágrafos, labels, corpo
- `h1–h6` → `var(--font-inter)` — headlines, títulos de seção
- `.brand-name` → Inter uppercase + `letter-spacing: 0.08em`

### Problema #1 — pesos não declarados

Sem `weight`, o Next.js baixa todos os pesos da fonte. Para duas fontes = 2× download desnecessário.

**Fix (arquivo: `src/app/layout.tsx`):**

```ts
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
});
```

Estimativa de ganho: ~40–60kB a menos no carregamento inicial.

### Problema #2 — dois downloads para diferença visual pequena

Inter e Plus Jakarta Sans são fontes similares (ambas geométricas, sans-serif modernas). A diferença visual entre elas no corpo de texto é mínima para a maioria dos usuários.

**Opção A (simplificar — recomendada):** Usar apenas Inter para tudo.

```ts
// Remove jakarta, usa inter em body também
// globals.css: body { font-family: var(--font-inter), ... }
```

**Opção B (manter o par):** Manter como está, mas declarar pesos (fix #1 acima).

### Escala tipográfica em uso

| Elemento | Classes Tailwind | Regra |
|---|---|---|
| Hero h1 | `text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight` | Máx 8–10 palavras |
| Section h2 | `text-2xl md:text-3xl font-bold` | Responde "o que essa seção resolve?" |
| Card h3 | `text-xl font-semibold` | Benefício, não feature técnica |
| Eyebrow/label | `text-sm font-semibold uppercase tracking-wider text-gray-*` | Sempre `<p>`, nunca `<h4>` |
| Body | `text-base md:text-lg leading-relaxed text-gray-400` | Máx 65ch por linha |
| Caption | `text-sm text-gray-400` | Subtexto de cards |
| Micro | `text-xs text-gray-500` | CNPJ, copyright, badges |

**Regra crítica:** `<h4>` nunca deve ser usado como label visual (eyebrow/uppercase/tracking-wider).
Sempre usar `<p>` com classes visuais. H4 é um heading de conteúdo, não de decoração.

---

## SISTEMA DE CORES

### Paleta base (definida em `globals.css`)

```css
:root {
  --color-background: #050505;  /* near-black */
  --color-foreground: #ededed;  /* near-white */
}
```

### Escala Tailwind em uso

| Token | Uso principal |
|---|---|
| `white` | Títulos, textos de alta prioridade |
| `gray-300` | Texto de boa legibilidade em fundos escuros |
| `gray-400` | Corpo de texto secundário, parágrafos |
| `gray-500` | Texto muted — verificar contraste (ver abaixo) |
| `gray-700` | Bordas sutis |
| `gray-800` | Bordas de cards, separadores |
| `gray-900` | Fundo de cards, seções alternadas |
| `gray-950` | Header, footer, seções primárias |
| `blue-600` | Cor primária — botões, badges de destaque |
| `blue-500` | Hover states, bordas de foco |
| `blue-400` | Ícones, links, texto de destaque |
| `blue-500/10` | Background de icon badges, tags |
| `emerald-500` | Check marks, estados de sucesso |
| `violet-600/6` | Glow decorativo no hero (background blur) |

### Contraste WCAG

| Texto | Fundo | Ratio | WCAG AA (4.5:1) |
|---|---|---|---|
| `white` | `#050505` | ~20:1 | ✅ |
| `gray-300` | `#050505` | ~11:1 | ✅ |
| `gray-400` | `#050505` | ~7:1 | ✅ |
| `gray-500` | `#050505` | ~4.5:1 | ✅ (no limite) |
| `gray-500` | `gray-900` (#111827) | ~3.5:1 | ❌ para texto < 18px |
| `gray-400` | `gray-900` | ~5.5:1 | ✅ |

**Regra prática:** Nunca usar `text-gray-500` em fundos `bg-gray-900` ou mais escuros para texto abaixo de 18px. Usar `text-gray-400` como mínimo.

### Gradient heading

```css
.gradient-heading {
  background: linear-gradient(180deg, #ffffff 0%, #9ca3af 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

Funciona bem em textos grandes (hero h1). Em textos menores o gradiente some.

**Variante com brand color (ainda não implementada):**

```css
.gradient-heading-brand {
  background: linear-gradient(160deg, #ffffff 0%, #93c5fd 100%); /* white → blue-300 */
}
```

Alternativa que cria mais identidade visual da marca, especialmente no hero.

---

## PADRÕES DE COMPONENTE

### Background decorativo (Hero)

```css
.bg-dot-grid {
  background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
  background-size: 28px 28px;
}
```

Usado só no Hero. Máximo 1 por página — mais do que isso vira ruído.

### Shimmer sweep (botões primários)

```css
.shimmer-sweep::before {
  animation: shimmer-sweep 3.5s ease-in-out infinite;
  animation-delay: 1.2s;
}
```

Efeito sutil de brilho. Se múltiplos botões primários ficarem visíveis ao mesmo tempo, desativar em alguns para não poluir.

### Cards — padrões existentes

| Padrão | Classes |
|---|---|
| Card padrão | `rounded-2xl border border-gray-800 bg-gray-900/50 p-6 md:p-8` |
| Card com hover | + `hover:border-gray-700 transition-colors` |
| Tech tag | `px-3 py-1 text-xs rounded-full bg-gray-800 text-gray-400 border border-gray-700` |
| Pill (TrustBar) | `px-4 py-1.5 rounded-full text-sm bg-gray-800/60 border border-gray-700/50` |
| Badge de status | `px-4 py-1.5 rounded-full text-sm font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20` |

### Botões (`src/components/ui/Button.tsx`)

| Variant | Aparência | Uso |
|---|---|---|
| primary (default) | `bg-blue-600 text-white` + shimmer | CTA principal — 1 por seção |
| outline | `border border-gray-700 text-gray-300` | CTA secundário |
| ghost | sem borda, hover sutil | Nav links |

**Tamanhos:** `sm` (header), `md` (default), `lg` (hero e CTAs de seção)

---

## SISTEMA DE ANIMAÇÕES

### Animações definidas em `globals.css`

```css
/* Entrada — usado em Hero e primeiros elementos de seção */
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
  opacity: 0; /* elemento começa invisível */
}

/* Delays escalonados disponíveis */
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-400 { animation-delay: 0.4s; }
```

**Problema:** `opacity: 0` no CSS causa flash em SSR se o JS atrasar. Em Next.js App Router é mínimo, mas pode aparecer em conexões lentas.

**Fix sugerido (adicionar em globals.css):**

```css
/* Visível para usuários sem JavaScript */
@media (scripting: none) {
  .animate-fade-in-up { opacity: 1; animation: none; }
}
```

### prefers-reduced-motion

Já implementado corretamente em `globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in-up { animation: none; opacity: 1; }
  .shimmer-sweep::before { animation: none; }
}
```

Não remover isso. É requisito de acessibilidade (usuários com epilepsia, vestibular disorders).

### Scroll-triggered animations (não implementado)

As animações atuais disparam no page load. Para elementos em seções longas (Serviços, Projetos), o efeito de fade-in já passou quando o usuário chega lá. Scroll-trigger tornaria isso mais relevante.

**Opções por esforço:**

| Opção | Esforço | Resultado |
|---|---|---|
| `IntersectionObserver` custom hook | Médio | Controle total, sem dependência |
| `motion/react` (ex-Framer Motion, pacote leve) | Baixo | `whileInView` prop nos componentes |
| `@starting-style` CSS nativo | Baixo | Suporte parcial ainda (Chrome 117+, Firefox 129+) |

---

## PERFORMANCE VISUAL

### LCP — Largest Contentful Paint

O LCP da homepage é o `<h1>` do hero. Depende de:
1. Inter carregada (`next/font` adiciona `<link rel="preload">` automaticamente ✅)
2. Gradient text via `-webkit-background-clip` — custo de compositing leve
3. `display: swap` pode causar FOUT (Flash of Unstyled Text) brevemente

**Meta:** LCP < 2.5s em 4G.

### CLS — Cumulative Layout Shift

`next/font` adiciona `size-adjust` automaticamente para compensar a troca de fonte fallback → web font. Não precisa de intervenção manual.

Risco maior: imagens sem `width`/`height` declarados. Verificar todos os `<Image>` nos ProjectCards.

### Bundle CSS

Tailwind v4 usa tree-shaking automático. Apenas classes usadas são incluídas no build. Sem configuração adicional necessária.

### Recursos — status

| Recurso | Caminho | Status |
|---|---|---|
| Logo header | `/icon.svg` | ✅ Existe |
| Logo footer | `/images/logo-white.svg` | ✅ Existe |
| Logo JSON-LD | `/images/logo.png` | ✅ Existe |
| Manifest icon | `/icon.svg` | ✅ Corrigido 22/03 |
| OG Image | `/public/og-image.png` | ⚠️ Verificar se existe |

**Ação:** Verificar `/public/og-image.png`. Se não existir, o preview ao compartilhar o link no WhatsApp/LinkedIn aparece em branco. Criar uma imagem 1200×630px com logo + headline no fundo escuro com o dot grid.

---

## BACKLOG DE MELHORIAS — PRIORIZADO

### P1 — Alto impacto, esforço baixo (< 1h cada)

#### Declarar pesos das fontes
**Arquivo:** `src/app/layout.tsx`
**Ganho:** ~40–60kB a menos no bundle de fontes, melhora LCP
**Como:** Adicionar `weight: ['400', '500', '600', '700']` no Inter e `weight: ['400', '500', '600']` no Jakarta

#### Focus visible acessível
**Arquivo:** `src/app/globals.css`
**Ganho:** Acessibilidade para usuários de teclado — sem isso o outline do browser pode ser invisível no fundo escuro
```css
:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
  border-radius: 4px;
}
```

#### Skip-to-content
**Arquivo:** `src/app/layout.tsx`
**Ganho:** Acessibilidade — usuários de screen reader e teclado podem pular o header
```tsx
// Antes do <Header />:
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg"
>
  Pular para o conteúdo
</a>
// No <main>:
<main id="main-content" className="min-h-screen">
```

#### OG Image
**Criar:** `/public/og-image.png` (1200×630px)
**Ganho:** Preview visual no WhatsApp, LinkedIn, Twitter ao compartilhar o link
**Conteúdo sugerido:** Logo Tonolli + headline "Modernizamos sistemas legados." em fundo #050505 com dot grid

### P2 — Médio impacto, esforço médio (1–4h)

#### Scroll-reveal nos cards de serviços e projetos
**Componentes:** `ServicesGrid.tsx`, `ProjectCard.tsx`
**Ganho:** Animação de entrada quando o elemento entra na viewport — mais impactante que animar no page load
**Abordagem:** `IntersectionObserver` custom hook ou `motion/react`

#### Gradient com brand color no hero h1
**Arquivo:** `globals.css`
**Ganho:** Mais identidade visual — cria associação entre o título principal e a cor da marca
**Como:** Adicionar `.gradient-heading-brand` e usar no `<h1>` do Hero

#### Transições de page navigation
**Ganho:** UX suave ao navegar entre páginas — sem o flash branco entre rotas
**Como:** CSS `@view-transition` (Chrome 111+) ou `next/navigation` com `startTransition`

### P3 — Médio impacto, alto esforço (> 4h)

#### Modo de alto contraste (`forced-colors`)
```css
@media (forced-colors: active) {
  .gradient-heading {
    -webkit-text-fill-color: ButtonText;
    background: none;
  }
  .bg-dot-grid { background: none; }
}
```

#### Design tokens como CSS variables semânticas
O site é always-dark agora. Se houver planos de light mode no futuro, migrar para tokens semânticos agora é muito mais barato do que refatorar depois:
```css
:root {
  --surface-bg: #050505;
  --surface-card: #111827;
  --surface-border: #1f2937;
  --text-primary: #ededed;
  --text-secondary: #9ca3af;
  --accent-primary: #3b82f6;
}
```

#### Print stylesheet
Para clientes que imprimem páginas de serviços ou contato:
```css
@media print {
  header, footer, .shimmer-sweep::before { display: none; }
  .bg-dot-grid { background: none; }
  body { background: white; color: black; }
  a[href]::after { content: " (" attr(href) ")"; }
}
```

---

## CHECKLIST DE QUALIDADE VISUAL

Usar antes de subir qualquer mudança:

### Tipografia
- [ ] H1 tem no máximo 8–10 palavras
- [ ] Nenhum `<h4>` usado como eyebrow/label — usar `<p>` com `.uppercase.tracking-wider`
- [ ] Hierarquia de headings sequencial (h1 → h2 → h3), sem saltos
- [ ] Corpo de texto com `max-w-2xl` ou `max-w-prose` — nunca linha de 100% em desktop

### Cores e contraste
- [ ] `text-gray-500` em `bg-gray-900` → substituir por `text-gray-400`
- [ ] CTAs primários: verificar contraste mínimo 4.5:1
- [ ] Links distinguíveis do texto ao redor (cor OU sublinhado)

### Espaçamento
- [ ] Seções principais: `py-24` mínimo
- [ ] Hero e CTA final (homepage): padding full — não usar `compact` aqui
- [ ] Cards em mobile: padding mínimo `p-5`

### Mobile (390px)
- [ ] Nenhum texto truncado ou cortado
- [ ] Área de toque dos botões ≥ 44×44px
- [ ] Imagens não extrapolam viewport
- [ ] Footer legível sem zoom
- [ ] Menu mobile fecha ao clicar em link

### Performance
- [ ] `next/image` com `width` e `height` explícitos em todas as imagens
- [ ] Pesos de fontes declarados (não carregar todos)
- [ ] `/public/og-image.png` existe (1200×630px)
- [ ] Sem `console.error` de recursos 404

### Acessibilidade
- [ ] `:focus-visible` visível (azul, não o padrão do browser)
- [ ] Skip-to-content presente
- [ ] `alt` texto em todas as imagens (exceto decorativas com `alt=""`)
- [ ] `prefers-reduced-motion` respeitado

---

## HISTÓRICO

### 22/03/2026 — Criação
- Substituído conteúdo genérico de agent prompt por documentação específica do projeto
- Análise completa da stack atual: Inter + Jakarta, Tailwind v4, globals.css
- Identificado problema de pesos não declarados nas fontes (~40–60kB desnecessários)
- Documentado sistema de cores com tabela de contraste WCAG
- Backlog de melhorias priorizado em P1/P2/P3

### 22/03/2026 — Fixes implementados
- `Footer.tsx`: `<p role="heading">` ×2 → `<h3>`; logo alt corrigido
- `Header.tsx`: active state via `usePathname()`; "Falar com especialista" → "Diagnóstico gratuito"
- `Hero.tsx`: prop `compact` para páginas internas
- `TrustBar.tsx`: texto plano → pills estilizados
- `sobre/page.tsx` + `servicos/page.tsx`: eyebrow `<h4>` → `<p>`
- `seo.ts` + `manifest.ts`: `logo.svg` (404) → `logo.png` / `icon.svg`
- `ContactWizard.tsx`: Modernização → primeira opção
- `services.json`: reordenação — Modernização primeiro
- `contact.json`: hero copy atualizado para Perfil B
- `page.tsx` (home): meta title atualizado
