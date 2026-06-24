# Site Ângela Grübel Bandeira — Psicóloga

**Portfólio profissional** para psicóloga em Porto Alegre/RS com 19 anos de experiência. Foco em psicoterapia individual (adolescentes e adultos), de casal e sexualidade humana.

---

## Estrutura do Projeto

```
site_Angela/
├── index.html           # Página principal (desktop)
├── textos.html          # Artigos/textos
├── videos.html          # Vídeos
├── podcasts.html        # Podcasts
├── livros.html          # Indicações de leitura
├── styles.css           # Estilos principais (desktop-first, responsivo)
├── script.js            # JS principal (menu mobile, form, reveal, header scroll)
├── vers_mobile/         # Versão mobile-first (PWA-like)
│   ├── index.html
│   ├── textos.html
│   ├── videos.html
│   ├── podcasts.html
│   ├── livros.html
│   ├── styles.css
│   └── script.js
├── imgs/                # Imagens gerais
└── assets/
    ├── LEIA-ME.txt      # Instruções para foto da profissional
    └── angela.jpg       # Foto do hero (não versionada — adicionar localmente)
```

---

## Tecnologias & Decisões

| Camada | Escolha |
|--------|---------|
| **HTML** | Semântico, acessível (ARIA, skip-link, landmarks) |
| **CSS** | Custom properties, mobile-first via `@media`, grid/flex, fluid typography (`clamp()`) |
| **JS** | Vanilla (ES6+), IntersectionObserver para reveal, sem dependências |
| **Fonts** | Google Fonts: Fraunces (display) + Inter (corpo) |
| **Ícones** | Emoji + SVG inline (WhatsApp) — sem icon font |
| **Deploy** | Estático — Netlify, Vercel, GitHub Pages, Apache/Nginx |

---

## Paleta & Design System

```css
:root {
  --green-900: #2e4f45;  /* Texto escuro / headers */
  --green-700: #3f6b5e;  /* Primária / CTAs */
  --green-500: #5b8a7a;  /* Destaques / borders focus */
  --green-100: #e8efe9;  /* Fundos de seção tint */
  --sand-50:  #faf7f1;   /* Base background */
  --sand-100: #f3ece1;   /* Cards / form */
  --sand-200: #e8ddca;   /* Borders / divisores */
  --terra:    #c98a6a;   /* Accent (em itálico h1, anos timeline) */
  --ink:      #283330;   /* Texto principal */
  --ink-soft: #55615c;   /* Texto secundário */
}
```

- **Raio padrão**: 18px / 28px (mobile: 14px / 22px)
- **Sombras**: 2 níveis (sm/md) com `var(--green-900)` alpha
- **Easing**: `cubic-bezier(.2, .7, .3, 1)` — suave, natural

---

## Funcionalidades Principais

### 1. Header Sticky + Sicky + Sombra ao Rolar
```js
// script.js:5-8
header.classList.toggle("is-scrolled", window.scrollY > 8);
```

### 2. Menu Mobile (Hambúrguer)
- Desktop: nav inline
- ≤900px: drawer fixo topo, animação `transform`, fecha ao clicar link/ESC

### 3. Formulário de Contato (Sem Back-end)
- Dois botões: **WhatsApp** / **E-mail**
- Monta `mailto:` ou `wa.me/` com dados preenchidos
- Validação simples (nome + mensagem obrigatórios)

### 4. Reveal on Scroll
- Classe `.reveal` + `IntersectionObserver` (threshold 12%, rootMargin -40px)
- Fallback timeout 1.2s garante visibilidade

### 5. SEO & Acessibilidade
- Meta tags completas (description, OG, theme-color)
- **Schema.org Psychologist** (LD+JSON) no `<head>`
- Skip-link, ARIA labels, `prefers-reduced-motion`

### 6. WhatsApp Flutuante
- Fixo canto inferior direito, pulse animation
- Abre conversa pré-preenchida

---

## Versão Mobile (`vers_mobile/`)

Diferenças-chave:
- **Bottom Nav** fixa (5 itens + home central destacado)
- Top bar enxuta (brand + WhatsApp)
- Espaçamentos/tipografia compactos
- `env(safe-area-inset-bottom)` para notch
- Touch feedback: `navigator.vibrate(6)` no tap do bottom nav
- Scroll reveal aplica direto no style (sem classe `.reveal` no HTML)

---

## Como Rodar Localmente

```bash
# Qualquer static server
npx serve .
# ou
python -m http.server 8000
# ou
php -S localhost:8000
```

Acesse `http://localhost:8000` (desktop) ou `http://localhost:8000/vers_mobile/` (mobile).

---

## Checklist de Entrega / Produção

- [ ] Adicionar `assets/angela.jpg` (ver `assets/LEIA-ME.txt`)
- [ ] Substituir textos de exemplo em `textos.html`, `videos.html`, `podcasts.html`, `livros.html`
- [ ] Configurar domínio + HTTPS
- [ ] Testar Core Web Vitals (LCP, CLS, INP)
- [ ] Validar HTML (W3C) e acessibilidade (axe / Lighthouse)
- [ ] Configurar `robots.txt` + `sitemap.xml` se necessário
- [ ] Adicionar favicon / apple-touch-icon / manifest.json (PWA opcional)

---

## Manutenção Comum

| Tarefa | Onde |
|--------|------|
| Atualizar ano rodapé | Automático (`script.js:2`) |
| Trocar WhatsApp/email | `index.html` (múltiplos links) + `script.js:37-38` |
| Adicionar serviço | `index.html` + `vers_mobile/index.html` (cards) |
| Editar formação | Timeline em ambas versões |
| Publicar conteúdo | Editar `textos.html` / `videos.html` / etc. |

---

## Contato do Projeto

- **Profissional**: Ângela Grübel Bandeira — CRP 07/12420
- **WhatsApp**: (51) 9 9604-0806
- **E-mail**: angelagrubelbandeira@gmail.com
- **Endereço**: Rua Fernando Gomes, 128 — sala 604, Moinhos de Vento, Porto Alegre/RS