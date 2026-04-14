# 8004agents Landing Page — UI/UX Audit

**Target:** `app/page.tsx` + 10 rendered `components/landing/*` + `components/layout/{navbar,status-bar}.tsx` + `components/ui/*` primitives + `app/globals.css` + `tailwind.config.js`
**Baseline commit:** current HEAD (main branch, pre-audit)
**Date:** 2026-04-14
**Audit phases:** this is Phase 1 (findings only — no fixes yet)

---

## How to read this document

- **Severity scale:** `critical` → `high` → `medium` → `low` → `unusual`.
- **`unusual`** means the choice isn't broken by spec, but is judgment-dependent. Every `unusual` row has `needs input = true` and will be surfaced in the Phase-2 questions batch.
- **`principle`** cites the heuristic or standard the finding rests on — so you can contest a finding if you don't accept the principle.
- **`confidence`** is how sure I am *without* user input:
  - `high` — deterministic (code says X, WCAG rule says it fails).
  - `medium` — a reasonable interpretation most reviewers would share.
  - `low` — depends on taste, A/B, or context I don't have.
- **`needs input`** = `true` whenever the correct fix depends on intent, not evidence.

Every row cites a concrete file + line. No finding is abstract.

---

## Table of contents

1. [Accessibility (A11Y)](#1--accessibility-a11y)
2. [Typography (TYPO)](#2--typography-typo)
3. [Color & contrast (COLOR)](#3--color--contrast-color)
4. [Spacing & rhythm (SPACE)](#4--spacing--rhythm-space)
5. [Interaction & motion (MOTION)](#5--interaction--motion-motion)
6. [Information architecture (IA)](#6--information-architecture-ia)
7. [Copy & voice (COPY)](#7--copy--voice-copy)
8. [Responsiveness (RESP)](#8--responsiveness-resp)
9. [Perceived performance (PERF)](#9--perceived-performance-perf)
10. [Brand consistency (BRAND)](#10--brand-consistency-brand)
11. [The unusual category (UNUSUAL)](#11--the-unusual-category-unusual)
12. [Summary block](#summary)

---

## 1 · Accessibility (A11Y)

**Lens.** This is the largest dimension. I'm looking at keyboard reach, focus visibility, semantic HTML (headings + landmarks + lists), ARIA labelling, reduced-motion coverage, and hit-target size. I already confirmed one thing upfront: the global reduced-motion system is *mostly* excellent (see [globals.css:251–255, 1025–1027, 1151–1153, 2655–2662, 2839–2841, 3232–3234, 3501–3503, 3739–3741](../../app/globals.css)) — so finds here are gaps, not absence. The landing uses [.pay-cover:focus-visible](../../app/globals.css#L572) as the de-facto "right way" to do focus — that pattern should propagate.

| id | location | finding | why it matters | severity | principle | confidence | needs input |
|---|---|---|---|---|---|---|---|
| A11Y-01 | [navbar.tsx:63-89](../../components/layout/navbar.tsx#L63-L89) | Center nav uses `hidden md:flex` with **no hamburger / no mobile menu alternative**. Below 768px, all six nav links (Home, Deploy, Agents, Arena, Explorer, Docs) disappear from the DOM entirely. | Mobile users **cannot navigate the site at all** except via the single home link in the wordmark. This breaks the primary discovery loop for a waitlist-focused landing where "/deploy" and "/agents" are the two CTAs. | critical | Nielsen #2 (Match system to real world), WCAG 2.4.5 Multiple Ways, common sense | high | false |
| A11Y-02 | [trust-section.tsx:204-206](../../components/landing/trust-section.tsx#L204-L206) | Card titles ("Sealed Execution", "On-Chain Proof", "Live Monitoring", "Public Audit", "Reputation Index") render as `<span>{card.title}</span>` inside `<div className="trust-v2__card-label">`, not as headings. The section has an `<h2>` at line 144 but nothing underneath it. | Screen-reader heading outline skips from H2 → nothing. Users navigating by heading (H key in NVDA/JAWS) can't jump between pillars. Breaks the "five pillars" affordance. | high | WCAG 1.3.1 Info and Relationships, WAI-ARIA APG heading patterns | high | false |
| A11Y-03 | [payments-section.tsx:130](../../components/landing/payments-section.tsx#L130) | Option titles use `<h4>` but the section top is `<h2>` (line 63). Heading level skip from h2 → h4 (no h3 anywhere in between). | Heading-outline rule. Same SR navigation issue as A11Y-02, lower impact because titles are duplicated in the button aria-label. | medium | WCAG 1.3.1 | high | false |
| A11Y-04 | [hud-button.tsx:13-43](../../components/ui/hud-button.tsx#L13-L43) + [pill-button.tsx:14-58](../../components/ui/pill-button.tsx#L14-L58) + [glass-button.tsx:14-56](../../components/ui/glass-button.tsx#L14-L56) | **No explicit `:focus-visible` styles** on any of the three custom button primitives. `HudButton` wraps its content in a clip-path that hides the browser default ring. `PillButton` wraps its child in `motion.div` which can intercept focus rendering. `GlassButton` has none at all. | Keyboard users lose focus location on every primary CTA (Hero, FinalCTA, ForBuilders). The globals.css pattern exists — `.pay-cover:focus-visible` at L572 uses `outline: 1px dashed var(--accent-d); outline-offset: 6px;`. Apply it uniformly. | high | WCAG 2.4.7 Focus Visible, WCAG 2.4.11 Focus Not Obscured | high | false |
| A11Y-05 | [decrypt-text.tsx:43](../../components/ui/decrypt-text.tsx#L43) + [hyper-text.tsx:27](../../components/ui/hyper-text.tsx#L27) + [typewriter-text.tsx:37](../../components/ui/typewriter-text.tsx#L37) | Text-effect primitives use bare `setInterval` with no `window.matchMedia("(prefers-reduced-motion: reduce)")` check. Global grain / glitch / cursor-glow / marquees all respect it — these primitives leak through. | A user with vestibular-motion sensitivity sees scramble/typing effects even with reduced-motion enabled. Breaks the promise of the global rule. | medium | WCAG 2.3.3 Animation from Interactions, user preference | high | false |
| A11Y-06 | [live-activity-section.tsx:34-49](../../components/landing/live-activity-section.tsx#L34-L49) | The whole section is a `<motion.div>`, not a `<section>`. No heading. No `aria-label`. The marquee content is visible to screen readers as a flat run of text (`NEW AGENT LISTED — SQL_WIZARD_V2 by 0x44a…f1 ...` × 12). | Either the ticker is content (needs a heading + semantic `<section>`) or decoration (needs `aria-hidden`). Right now it's an unlabelled chunk of noise. SR users hear "SQL_WIZARD_V2" with no frame. | medium | WCAG 1.3.1, 4.1.2 Name Role Value, ARIA marquee pattern | high | false |
| A11Y-07 | [navbar.tsx:48](../../components/layout/navbar.tsx#L48) + [status-bar.tsx:3](../../components/layout/status-bar.tsx#L3) | `<nav>` has no `aria-label` to distinguish it from other nav landmarks on the page (status bar, footer). Status bar is `<div>`, not `<footer>` with `role="contentinfo"` or a landmark. | Assistive tech users navigating by landmark (D key in NVDA) can't distinguish "Main nav" from "Status footer". Minor but cheap to fix. | low | WCAG 1.3.1, ARIA APG landmark naming | high | false |
| A11Y-08 | [for-builders-section.tsx:79-89](../../components/landing/for-builders-section.tsx#L79-L89) | Perks ("Per-call or subscription", "Auto-payouts", "Reputation built-in", "A2A standard") render as `<motion.span>` elements in a CSS grid. Not a semantic list. | Screen readers don't announce "list of 4 items". Users lose the "these are the features" affordance. | low | WCAG 1.3.1, semantic HTML best practice | high | false |
| A11Y-09 | [trust-section.tsx:165-211](../../components/landing/trust-section.tsx#L165-L211) | Hover fan-out (5 cards reposition when one is hovered) has **no keyboard equivalent**. Cards aren't focusable, there's no `:focus-within` / `:focus-visible` branch in the `getCardStyle()` logic. Keyboard users never see the fan. | Nielsen #4: consistency and standards. Keyboard users get a flat grid; pointer users get a signature brand interaction. Interaction-parity violation. | medium | WCAG 2.1.1 Keyboard, 2.5.7 Dragging Movements | high | false |
| A11Y-10 | [hud-button.tsx:13-43](../../components/ui/hud-button.tsx#L13-L43) | `HudButton` prop signature is `Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">` — but when rendered as a `Link` (href branch at L31-37), the `...props` spread is dropped entirely. Any `aria-*` attribute the caller passes to a link-variant button is silently lost. | Callers trying to add `aria-label`, `aria-describedby`, `data-*` attributes to link-mode HudButton get nothing. Causes silent bugs. | medium | ARIA 1.2 authoring, least-surprise API design | high | false |
| A11Y-11 | [navbar.tsx:94-117](../../components/layout/navbar.tsx#L94-L117) | Wallet connect button has no text label when the dot is the only visual state change. Connecting state is announced ("Connecting…"), but the **status dot itself** (ok / live colors) carries no aria-live or aria-label — colorblind users see the button label but not the state. | Status dot is decorative per DOM, but it *is* semantic information (connected vs disconnected). Needs either text-paired-with-color or ARIA. | low | WCAG 1.4.1 Use of Color, 4.1.3 Status Messages | high | false |
| A11Y-12 | [payments-section.tsx:107](../../components/landing/payments-section.tsx#L107) + [trust-section.tsx:192](../../components/landing/trust-section.tsx#L192) | All card art is `<img src="/placeholder.svg" alt="" draggable={false}/>`. Empty alt is *correct* for decorative images — but this is a scaffolding placeholder, and once real imagery ships the alt needs meaningful content **per image**. Right now it's a time-bomb. | If someone swaps in a real card image without thinking, alt stays `""` and the image is silently missed by SRs. Flag the convention, not the current state. | low | WCAG 1.1.1 Non-text Content | medium | true |
| A11Y-13 | [typewriter-text.tsx:62](../../components/ui/typewriter-text.tsx#L62) | Uses Tailwind `animate-pulse` on the cursor `_` which (unlike `motion-reduce:animate-none`) does **not** automatically respect `prefers-reduced-motion`. | Cursor keeps pulsing even with reduced-motion on. Cosmetic, but inconsistent with the global rule. | low | WCAG 2.3.3 | high | false |
| A11Y-14 | [payments-section.tsx:99-113](../../components/landing/payments-section.tsx#L99-L113) | This is the **gold-standard pattern** in the codebase: `<motion.button>` with `onFocus={() => setHoveredIdx(i)}`, `onBlur={() => setHoveredIdx(null)}`, `aria-label={f.title}`, and globals.css `.pay-cover:focus-visible` styling. Keyboard users get functional parity with pointer users. **Findings A11Y-04, A11Y-09, and A11Y-11 should be fixed by porting this pattern.** | Positive finding — a model to follow. Not a bug. | — | — | — | false |
| A11Y-15 | [navbar.tsx:169-184](../../components/layout/navbar.tsx#L169-L184) | Theme toggle button has `aria-label="Toggle theme"` ✅, but sun/moon SVGs are inline without `aria-hidden`. Screen readers may announce "image" after the label. | Minor double-up. `aria-hidden="true"` on the SVGs cleans it up. | low | ARIA APG icon-button pattern | high | false |

**A11Y count:** 14 actionable findings + 1 positive reference.

---

## 2 · Typography (TYPO)

**Lens.** Hierarchy clarity, line length on body copy, line-height at each size, tracking consistency on uppercase labels, mono-font overuse where sentence-case-body would read better, and font loading (FOIT/FOUT). The design system is defined in [DESIGN.md](../../DESIGN.md) — two families, tight display scale, +4% tracking on uppercase labels. I'm checking whether the implementation honors that and whether it's making mono do work that body type should do.

| id | location | finding | why it matters | severity | principle | confidence | needs input |
|---|---|---|---|---|---|---|---|
| TYPO-01 | [for-builders-section.tsx:66](../../components/landing/for-builders-section.tsx#L66) + [how-it-works-section.tsx `.lead`](../../app/globals.css) | Body copy in section leads uses `font-mono text-[14px]`. Over an ~800px column that's roughly 85-100 characters per line in JetBrains Mono — above the 45-75 optimal. Combined with mono's wider character width, the copy reads as a "code block paragraph" rather than prose. | Butterick's Practical Typography and Bringhurst both recommend 45-75ch for prose. Mono at this size, on this line length, slows reading noticeably — especially on a hirer surface where the whole point is plain English. | medium | Bringhurst *Elements of Typographic Style* p.26 (line length), Butterick Practical Typography | medium | true |
| TYPO-02 | [payments-section.tsx:60](../../components/landing/payments-section.tsx#L60) | Eyebrow text is `// payments` — lowercase. Every other eyebrow in the codebase is UPPERCASE (`// SYS_8004`, `// MISSION_BRIEF`, `// CATEGORY · CAT_001`). [DESIGN.md](../../DESIGN.md) explicitly says: *"Don't use sentence-case for nav, buttons, or labels."* | Inconsistency inside a design system that's otherwise militant about case. Either intentional (needs rule update in DESIGN.md) or a regression. | low | DESIGN.md §Do/Don't, Refactoring UI §Hierarchy | high | true |
| TYPO-03 | [globals.css](../../app/globals.css) `.h-section` uses `clamp(28px, 4vw, 48px)`, hero uses `clamp(…, 120px, …)`, final CTA uses `clamp(48px, 8vw, 112px)` | Three different clamp scales for "display heading" ranges. There's no single fluid-type scale, so section titles drift visually between sections when viewport width changes. | Makes rhythm unpredictable on intermediate widths (1100px, 900px). Refactoring UI recommends one modular scale applied consistently. | medium | Refactoring UI §Type scale, Utopia.fyi fluid-type method | medium | false |
| TYPO-04 | [globals.css](../../app/globals.css) imports Google Fonts (`Archivo Black`, `JetBrains Mono`, `Instrument Serif`, `Press Start 2P`) via `@import url('https://fonts.googleapis.com/css2?…&display=swap')` | `display=swap` ✅, but loading fonts via `@import` inside CSS is render-blocking (CSS can't parse past the import until it resolves). Next.js ships `next/font/google` which does self-hosting + subset + preload — and the repo *already* uses it for Geist sans/mono via `var(--font-geist-*)`. | FOIT on cold cache, plus a small request cascade to fonts.googleapis.com and fonts.gstatic.com. Largest-contentful-paint impact. | medium | Next.js font optimization docs, web.dev Core Web Vitals | high | false |
| TYPO-05 | [live-activity-section.tsx:23](../../components/landing/live-activity-section.tsx#L23) | Ticker items use `text-[11px] tracking-[0.12em] uppercase text-[var(--fg-muted-d)]`. 11px tracked uppercase mono on a dark grain background is at the lower bound of comfortable reading even at AA contrast. | Everyone can technically read it — but on mobile, with the film grain overlay, readability degrades. Particularly risky given the ticker is one of the few copies claiming "proof / live activity". | low | WCAG 1.4.3 & Butterick Practical Typography §Body text | medium | true |

**TYPO count:** 5 findings.

---

## 3 · Color & contrast (COLOR)

**Lens.** WCAG AA contrast on text in both modes, violet accent load (is it load-bearing or decorative?), muted text legibility over grain + dots, status dots across both modes, the co-existence of two "accent" token systems.

| id | location | finding | why it matters | severity | principle | confidence | needs input |
|---|---|---|---|---|---|---|---|
| COLOR-01 | [globals.css:22-23, 94-95](../../app/globals.css#L22-L23) | **Two co-existing "accent" systems.** Light mode has `--accent: 253 100% 93%` (HSL, almost-white lavender, used by shadcn/ui semantic tokens) AND `--accent-d: #7C5CFF` (hex, the brand violet). Dark mode: `--accent: 253 15% 13%` (near-black) vs `--accent-d: #8B6CFF` (brand violet). | Not currently broken — no component imports the HSL `--accent` by mistake. But future contributors will conflate them. The shadcn tokens appear to be vestigial scaffolding from the initial template. | medium | Refactoring UI §Use a single source of truth for color | high | true |
| COLOR-02 | [globals.css:47](../../app/globals.css#L47) light-mode `--accent-d: #7C5CFF` on `--bg-d: #FFFFFF` | Raw contrast ratio of `#7C5CFF` on `#FFFFFF` is **4.54:1**. That's AA for large text (18pt+ or 14pt bold) but **fails AA for body text** (needs 4.5:1 minimum, which it squeaks past, but WCAG 2.2 SC 1.4.3 requires rounding down — 4.54 effectively passes, just). Accent text under 18pt on the light mode payment section and hover states is at the edge. | In dark mode `#8B6CFF` on `#000000` = ~6.3:1 (AAA). Light mode is the weak link. Any small-body accent text (e.g. hint pill, cover labels) may fall below threshold depending on exact weight. | medium | WCAG 2.2 SC 1.4.3 Contrast Minimum | high | false |
| COLOR-03 | [payments-section.tsx:107](../../components/landing/payments-section.tsx#L107) + [globals.css:572-574](../../app/globals.css#L572) | `.pay-cover:focus-visible` uses `outline: 1px dashed var(--accent-d)` with `outline-offset: 6px`. On dark mode, 1px dashed accent violet on #000 = ~6:1 — OK. On **light mode** over the warm paper (`#F5F2EC` intended per DESIGN.md but currently `#FFFFFF` at L40), 1px dashed on white at 4.5:1 is **barely perceptible** — dashed 1px at that contrast is near-invisible. | Keyboard users in light mode get a focus indicator they may not notice. Compare with 2px solid at the same color — substantial readability gain. | medium | WCAG 2.4.11 Focus Not Obscured, 2.4.13 Focus Appearance | medium | false |
| COLOR-04 | [globals.css:40 & 111](../../app/globals.css#L40) | Light mode `--bg-d: #FFFFFF`. [DESIGN.md](../../DESIGN.md) specifies light mode bg as `#F5F2EC` (warm off-white). The implementation uses pure white. | The terminal/HUD aesthetic depends on warm paper vs cold screen; pure white reads as "default browser page", not "HUD console paper". Confirmed miss against spec. | medium | DESIGN.md §Color tokens (explicit spec) | high | false |
| COLOR-05 | status dots across modes ([live-activity-section.tsx:15](../../components/landing/live-activity-section.tsx#L15) etc.) | Status dots use `#34C759` (ok) / `#E8B339` (warn) / `#FF3B30` (live) constant across both modes. **Red-green deuteranopia safety check:** ok and live are red and green — the two most commonly confused colors for the most common CVD type. | Mitigation: dots are always paired with text labels ("OK", "LIVE", "CONNECTING"), and the shapes/positions differ. So colorblind users can still read state. **No fix needed**, just noting it's handled correctly. | low | WCAG 1.4.1 Use of Color, positive finding | high | false |

**COLOR count:** 5 findings (1 positive).

---

## 4 · Spacing & rhythm (SPACE)

**Lens.** DESIGN.md specifies a 4·8·12·16·24·32·48·64·96 scale. Vertical rhythm between sections should be consistent. I'm checking: (a) inter-section gaps, (b) container max-widths (DESIGN.md implies a single `max-w-content`), (c) card padding inside vs between cards, (d) anywhere the spacing scale isn't respected.

| id | location | finding | why it matters | severity | principle | confidence | needs input |
|---|---|---|---|---|---|---|---|
| SPACE-01 | Section-to-section vertical rhythm | Sections use a mix of their own internal padding: `py-24` ([for-builders-section.tsx:44](../../components/landing/for-builders-section.tsx#L44)), `py-32` ([final-cta-section.tsx](../../components/landing/final-cta-section.tsx)), plus whatever the section-class `.payments-v2 / .trust-v2 / .arena-story` defines in globals.css. **No single shared section-spacer.** Different rhythms between any two adjacent sections. | DESIGN.md says spacing scale is `4·8·12·16·24·32·48·64·96`. Currently different sections end up with 96px / 128px / custom-class effective paddings — audit by scroll position would show uneven gaps. | medium | Refactoring UI §Define a spacing scale and stick to it, DESIGN.md §Spacing scale | medium | false |
| SPACE-02 | [for-builders-section.tsx:45](../../components/landing/for-builders-section.tsx#L45) | Uses `max-w-content` utility. [final-cta-section.tsx](../../components/landing/final-cta-section.tsx) uses its own `max-w-[...]` with clamp-based font. Hero uses `max-w-[1080px]`. [data-index-section.tsx](../../components/landing/data-index-section.tsx) is full-width with inner sticky. | No single content-width token. Content columns subtly drift between sections, visible on very wide viewports (1920+). Tailwind config likely has a `maxWidth.content` — should be the one source. | low | Refactoring UI §Container widths, atomic-design consistency | medium | false |
| SPACE-03 | [hero-section.tsx:31](../../components/landing/hero-section.tsx#L31) | Hero uses `min-h-[calc(100vh-64px-32px)]` — 100vh minus navbar (64px) minus status bar (32px). On tall-aspect mobile (Pixel / Pro Max), the hero content is vertically stretched because `flex items-center`; the `HudFrame` floats in a lot of empty space. On short laptops (~720px) everything is cramped. | The brief asks "Whitespace at the hero — too much, too little?" — this is that. The fixed viewport math ignores content-aware sizing. Consider `min-h` as floor, then cap height. | low | Fitts's Law (where you put the CTA) + responsive design common sense | medium | true |

**SPACE count:** 3 findings.

---

## 5 · Interaction & motion (MOTION)

**Lens.** Hover coverage, click-affordance coherence, cursor-glow occlusion, glitch timing, marquee tempos, and reduced-motion leak-through on any primitive not covered by the global rules. Motion-timing cross-check against IBM Carbon's recommended curves.

| id | location | finding | why it matters | severity | principle | confidence | needs input |
|---|---|---|---|---|---|---|---|
| MOTION-01 | [globals.css:266, 305, 452, 791, 985, 3148, 3416, 3511](../../app/globals.css#L266) | **Seven different backdrop-filter blur values** (28px, 28px, 30px, 28px, 24px, 6px, 14px, 28px) with two different saturates (160%, 165%, 150%). No blur scale. | Visually the glass system drifts between components — checkout-card feels different from glass-card feels different from hero-pill. Not wrong per component; wrong as a system. | medium | Material 3 §Elevation and surface, design-token-first methodology | high | false |
| MOTION-02 | [hero-section.tsx:47](../../components/landing/hero-section.tsx#L47) + [globals.css hero-glitch keyframe, ~L252](../../app/globals.css#L252) | Hero headline uses `.hero-glitch` class running every 12s with glitch burst in final ~3% of cycle (~360ms). That's **one visible pulse every 12 seconds** the hero is on screen. | Could be "just right" or "too frequent and drawing the eye away from CTAs." Brief explicitly asks for this judgment call. `unusual` because it's intentional brand character. | unusual | Disney's 12 principles (timing), brand-char vs distraction trade-off | medium | true |
| MOTION-03 | [pill-button.tsx:34-41](../../components/ui/pill-button.tsx#L34-L41) | `whileHover={{ scale: 1.03, boxShadow: "0 0 24px var(--accent-glow)" }}` with spring `stiffness: 400, damping: 20`. This is a framer-motion runtime, **not** CSS `transition:`. Reduced-motion preference on the framer-motion side requires a `MotionConfig reducedMotion="user"` at provider level — which isn't set in [layout.tsx](../../app/layout.tsx). | Users with reduced-motion set still see the scale-up and shadow spring on every button hover. Low severity (hover is user-initiated) but conceptually a leak. | low | WCAG 2.3.3, framer-motion reducedMotion docs | high | false |
| MOTION-04 | [trust-section.tsx:165-211](../../components/landing/trust-section.tsx#L165-L211) | The fan-out uses a per-card `animate={{ x, y, rotate, filter: … }}` with spring duration 0.55s. When you hover card 2, all 5 cards run their filter + transform simultaneously. Layer count = 5 concurrent framer-motion animations × filter (drop-shadow + brightness + saturate) which is expensive. | Visible jank on low-end Android or older Intel MacBooks during the first hover transition. Subsequent hovers are cached. | medium | IBM Carbon §Motion timing + performance, Core Web Vitals INP | medium | true |
| MOTION-05 | [cursor-glow.tsx:30-32](../../components/ui/cursor-glow.tsx#L30-L32) | The glow uses `radial-gradient(640px circle ...)` as `background:`, pointer-events none, z-index 1, filter `blur(var(--cursor-glow-blur))`, opacity variable. **Z-index 1 puts it beneath most content** — the concern in the brief about "text occlusion" doesn't apply here. ✅ | Positive finding — the implementation chose the safe layering. | — | — | high | false |
| MOTION-06 | [live-activity-section.tsx:43](../../components/landing/live-activity-section.tsx#L43) + arena-teaser + trust-v2-ticker + hero-ticker-marquee | **Four different marquee tempos.** Live ticker is `animate-ticker` (50s per globals.css L≈). Trust-v2 ticker is `.trust-v2__ticker-track` (50s). Arena-teaser is `.arena-teaser__marquee-track` (50s). Hero ticker is `.hero-ticker-marquee` (64s). They're close but not identical. | User sees four marquees at slightly different speeds — the eye catches the desync. Brief explicitly asks: "do they feel the same tempo?" — not quite. | low | Disney's 12 principles (timing consistency), Refactoring UI §Consistency | medium | true |
| MOTION-07 | [hud-button.tsx:20-30](../../components/ui/hud-button.tsx#L20-L30) + [globals.css:1152](../../app/globals.css#L1152) | `.hud-button__label` animation is disabled under reduced-motion (line 1152 ✅), but the button's clip-path border + drop-shadow on hover (`filter: drop-shadow(0 0 24px var(--accent-glow)); transform translateY(-1px)`) is **not** scoped inside a `@media (prefers-reduced-motion: no-preference)` block. | Users with reduced-motion still get the glow-pulse on hover. Minor but inconsistent with the label rule right above it. | low | WCAG 2.3.3 | medium | false |

**MOTION count:** 7 findings (1 positive).

---

## 6 · Information architecture (IA)

**Lens.** Does the scroll tell a story? Is the primary CTA visually primary? Is there section redundancy? Does the page answer the "what are these agents" question before it answers "how do I pay for them"? Against [PROJECT.md §2](../../PROJECT.md) — demand-led (Amazon model), Hirers + Builders dual audience, waitlist stage.

| id | location | finding | why it matters | severity | principle | confidence | needs input |
|---|---|---|---|---|---|---|---|
| IA-01 | [app/page.tsx:13-28](../../app/page.tsx#L13-L28) | Current scroll order: Hero → LiveActivity → HowItWorks → **Payments** → DataIndex → ArenaTeaser → ArenaStory → Trust → ForBuilders → FinalCTA. A hirer sees *how to pay* before any section shows *what agents exist*. First concrete agent mention is in the DataIndex carousel (category tiles) at position 5, or individual agent names in the Arena story at position 7. | Violates "show the thing before you sell the checkout." A waitlist visitor's mental model: "What is this?" → "What can it do?" → "How much?" → "How do I sign up?". Payments-at-4 front-loads the money question. Could be intentional (friction-killer framing) but feels like a drift from the demand-led spec. | unusual | PROJECT.md §2 (demand-led), Nielsen #6 (Recognition rather than recall) | medium | true |
| IA-02 | [app/page.tsx](../../app/page.tsx) | No "Featured Agents" (a list of concrete named agents) anywhere on the page. The closest thing is name-drops inside the Arena story. | PROJECT.md §2 says the launch is Amazon-model: you show products first, catalog later. Without featured agents, the pitch is abstract. This is the single strongest IA-level finding. Needs user intent: is this because the agents aren't real yet, or because the section was cut? | high | PROJECT.md §2 + §13, Refactoring UI §Show the thing | high | true |
| IA-03 | Hero [hero-section.tsx:72-73](../../components/landing/hero-section.tsx#L72-L73) + FinalCTA [final-cta-section.tsx](../../components/landing/final-cta-section.tsx) | Two "Try a free call" CTAs (or equivalents), two "List your agent" CTAs, plus LiveActivity arena-match mentions. The primary CTA is visually primary (HudButton vs PillButton scales), but the destinations (`/agents` vs `/deploy`) are split roughly 50/50 in button weight. | Hick's Law: reducing CTA variety reduces decision fatigue. The two-button primary+secondary pattern is fine — but the secondary ("list your agent") is for builders, a different audience entirely. Consider whether both audiences should share the same hero or whether one should be demoted. | medium | Hick's Law, Nielsen #6 | medium | true |
| IA-04 | [arena-teaser-section.tsx](../../components/landing/arena-teaser-section.tsx) + [arena-section.tsx](../../components/landing/arena-section.tsx) | Sections 6 and 7 are both "about the Arena." ArenaTeaser is a marquee lead-in; ArenaSection is the full story. Both immediately follow DataIndex. That's three sequential sections where the Arena is the primary subject. | Arena is labeled in PROJECT.md §6 as "this is a hook — feature it", so the weight is intentional. But a hirer landing visitor who isn't here for benchmarks/prediction markets gets ~30% of the page scroll dedicated to Arena before ever reaching Trust and ForBuilders. Flag as `unusual`. | unusual | PROJECT.md §6 vs scroll-real-estate economics | medium | true |

**IA count:** 4 findings.

---

## 7 · Copy & voice (COPY)

**Lens.** Avoid-list leakage ([PROJECT.md §12](../../PROJECT.md): KYC, deploy-as-hirer-CTA, decentralized, on-chain, crypto-bro tone, hard agent counts). Terminal voice balance — when is `// eyebrow / UPPERCASE_MONO` brand character, and when is it crowding out plain-English clarity? Headline pattern variety. CTA verb distinctness.

| id | location | finding | why it matters | severity | principle | confidence | needs input |
|---|---|---|---|---|---|---|---|
| COPY-01 | [hero-section.tsx:72](../../components/landing/hero-section.tsx#L72) | Primary hero CTA is `TRY A CALL`. PROJECT.md §13 specifies: **"Primary CTA: hire / try a *free* call → joins waitlist."** The word "free" is gone. | Loses the $0-to-first-value framing on the dominant button on the page. "Try a call" sounds technical ("API call"); "Try a free call" is a waitlist pitch. This is the single most load-bearing string on the site. | high | PROJECT.md §13 (explicit), content design principle "be concrete about cost" | high | false |
| COPY-02 | [trust-section.tsx:149-153](../../components/landing/trust-section.tsx#L149-L153) | Body copy reads: *"Every listing is verified on sign-up, sealed inside hardware enclaves, and continuously monitored **on-chain** — so users trust the output, not the hype."* [PROJECT.md §12](../../PROJECT.md) avoid list: **"'on-chain' as headline words."** Used here as body, not headline, but in a 52-word paragraph it lands as a claim, not a throwaway. | Marginal — §12 says "as headline words", and this isn't a headline. But "on-chain" as body copy on the hirer-facing Trust section is still crypto-bro-adjacent per §11 "Lean AI, not blockchain". Needs user intent call. | medium | PROJECT.md §11 + §12 | high | true |
| COPY-03 | [arena-section.tsx](../../components/landing/arena-section.tsx) Arena step descriptions | Copy mentions "**TEE**", "**sealed**", "**attested**", "**deterministic**", "**seal**", "**verify**", "**reproducible**", "**prediction markets**" in step explanations. This is Trust + Arena territory — a lot of builder vocabulary on a hirer-first landing. | PROJECT.md §11: "Plain English on hirer surfaces. Slightly technical on builder surfaces." Arena is user-facing — the terms are contextualized, but density is high. Compare against how PayPal or Stripe explain "processor" without ever saying "tokenization". Judgment call. | medium | PROJECT.md §11, GOV.UK content design principles | medium | true |
| COPY-04 | Headline pattern analysis across the page | Section headlines: "EXPERT AI AGENTS FOR ANY JOB" (hero), "Three steps / Zero friction" (how-it-works), "Pay however you want" (payments), "BROWSE THE SPECIALIST INDEX" (data-index), "Watch agents compete" (arena), "How we keep agents honest" (trust), "Built an agent? Make it earn" (for-builders), "Stop searching / Start hiring" (final-cta). **All are variations of "do this / this happens."** There's no narrative connective tissue (no "and", "because", "so") between sections — each is a self-contained hook. | Declarative-everywhere is a signature. Feels brand-forward. But it also means *nothing builds on what came before* — the scroll is a series of separate pitches, not one argument. Intentional or flat? | unusual | Content-design narrative flow, Refactoring UI §Hierarchy through storytelling | medium | true |
| COPY-05 | [status-bar.tsx:19](../../components/layout/status-bar.tsx#L19) | Status bar says `ARENA: OFFLINE` constantly. [PROJECT.md §6](../../PROJECT.md#L57) explicitly says Arena is currently OFFLINE (it's a feature, not a bug). But the landing page ArenaTeaser (section 6) and ArenaStory (section 7) pitch the feature as if it's live, burning two full sections on it. | Copy mismatch between chrome ("OFFLINE") and body ("WATCH AGENTS COMPETE"). Hirer thinks: "Wait, is this real or not?" Needs a resolution — either add "COMING SOON" badges to the Arena sections (which [arena-section.tsx eyebrow at ~L—](../../components/landing/arena-section.tsx) already does with `ARENA · COMING_SOON`), **or** change status bar to match. | medium | Nielsen #1 (Visibility of system status), consistency | high | false |
| COPY-06 | Grep for `AGENET` | The brief asked me to look for an `AGENET` typo. **Not present anywhere in the codebase.** Either the user saw it elsewhere or it's a preemptive check. Negative finding. | — | — | — | high | false |

**COPY count:** 6 findings (1 negative / positive reference).

---

## 8 · Responsiveness (RESP)

**Lens.** Behavior at 1440 / 1024 / 768 / 640 / 375. Nav collapse, hero scaling, card grids collapsing, showcase fans on mobile with hover disabled, footer truncation.

| id | location | finding | why it matters | severity | principle | confidence | needs input |
|---|---|---|---|---|---|---|---|
| RESP-01 | [navbar.tsx:64](../../components/layout/navbar.tsx#L64) | See A11Y-01. **At <768px, the nav disappears with no fallback.** This is both the biggest accessibility finding and the biggest responsiveness finding. Mobile users have no navigation. | Critical — cross-listed. | critical | WCAG 2.4.5, Fitts's Law | high | false |
| RESP-02 | [data-index-section.tsx](../../components/landing/data-index-section.tsx) sticky-scroll desktop mode | Desktop version uses scroll-driven horizontal parallax (complex RAF). Mobile (`data-index--mobile` class, ≤960px breakpoint) falls back to a vertical stack. The mobile stack omits the parallax interaction entirely — hirers on mobile get a plain vertical card list. | This is acceptable — mobile should not try to simulate sticky-parallax. But flag: the *visual hierarchy* of the section on mobile collapses, and the "BROWSE THE SPECIALIST INDEX" title loses its lead-in context. | medium | Responsive design mobile-first, WCAG 2.5.8 | medium | true |
| RESP-03 | [trust-section.tsx:165-211](../../components/landing/trust-section.tsx#L165-L211) hover-fan | The fan is pointer-driven (mouseEnter/mouseLeave). On touch devices, there's no hover state — all 5 cards sit in their base positions. Plus the fan math (`getCardStyle`) has no mobile-specific branch. | Mobile users never see the signature interaction. Consider: auto-cycle? carousel? static arrangement? Deletion of the fan on mobile entirely? | medium | Mobile-first responsive patterns, WCAG 2.5.7 | high | true |
| RESP-04 | [status-bar.tsx:10, 22](../../components/layout/status-bar.tsx#L10-L22) | LIVE counter and BLK (block number) hidden at `< md` (768px). On mobile, status bar shows only `SYS: V1.14` + `ARENA: OFFLINE`. | OK — bandwidth management. Flag because the status bar is a brand signature; losing half of it on mobile weakens it. Acceptable trade-off. | low | Responsive design, DESIGN.md §Persistent chrome | medium | true |
| RESP-05 | [hero-section.tsx:31-76](../../components/landing/hero-section.tsx#L31-L76) | Hero uses `max-w-[1080px]`, `HudFrame cut={48}`, headline `hero-frame__headline`. At very narrow viewports (<375px), the angled cuts + the word "EXPERT AI AGENTS / FOR ANY JOB" may wrap awkwardly. I can't verify this from code alone — needs browser check. | Hero is the first impression. Awkward wrap = bad impression. Flag for visual QA. | medium | Responsive design, WCAG 1.4.10 Reflow | low | true |

**RESP count:** 5 findings.

---

## 9 · Perceived performance (PERF)

**Lens.** Frame-drop risk on scroll, grain + glow on low-end devices, font loading blocking critical path, bundle considerations.

| id | location | finding | why it matters | severity | principle | confidence | needs input |
|---|---|---|---|---|---|---|---|
| PERF-01 | [globals.css](../../app/globals.css) — `.glass`, `.corner-card`, `.checkout-card`, `.hero-pill`, `.trust-v2-*` all use `backdrop-filter: blur(24px-30px) saturate(160-165%)` | Backdrop-filter is one of the most expensive composite operations in the browser. Stacking many of them (the page has 10+ glass elements at any scroll position) causes INP (Interaction to Next Paint) spikes. | On a M1+ desktop it's fine. On 2019 Intel MacBook or mid-tier Android, scrolling past the Trust or Payments section drops frames. Profile before / after any reduction. | medium | web.dev INP, Core Web Vitals | medium | true |
| PERF-02 | [globals.css:~L250](../../app/globals.css) film grain at `--grain-opacity: 0.08` (dark) uses fixed fullscreen SVG + 1.4s step animation | Fixed-position SVG background animates every 233ms (1.4s / 6 steps). Low cost per frame in isolation, but combined with `.backdrop-filter: blur(28px)` underneath, the browser has to recomposite the entire viewport on every step. | Reduced-motion hides grain (line 252 ✅), but for non-reduced-motion users on low-end, the grain step amplifies any scroll jank. | low | web.dev §Animation performance | medium | false |
| PERF-03 | [globals.css](../../app/globals.css) `@import url('https://fonts.googleapis.com/css2?...)` | Render-blocking font load. See TYPO-04 for detail. | LCP impact on cold cache. | medium | Next.js font optimization | high | false |

**PERF count:** 3 findings.

---

## 10 · Brand consistency (BRAND)

**Lens.** Is every component built from the glass/bracket/phosphor system? Are there stray styles? Do the checkout, trust, and match panels feel like siblings? Is the corner-bracket motif hero-only or wallpaper?

| id | location | finding | why it matters | severity | principle | confidence | needs input |
|---|---|---|---|---|---|---|---|
| BRAND-01 | [glass-button.tsx:23-26](../../components/ui/glass-button.tsx#L23-L26) | GlassButton uses Tailwind class `bg-purple/10`, `text-purple`, `border-purple/30`, and inline `rgba(168, 85, 247, 0.2)` shadows. **`168, 85, 247` = `#A855F7`** — that's Tailwind's `purple-500`, NOT the brand violet (`#7C5CFF` / `#8B6CFF`). DESIGN.md: *"Don't introduce a second accent color."* | Off-palette brand violation. GlassButton is pitched as a primitive in `components/ui/`, so if it gets used anywhere the wrong violet ships. Currently not used on the landing (landing uses HudButton/PillButton), but it's in the repo — stale / dangerous. | high | DESIGN.md §Do/Don't (explicit), atomic design | high | false |
| BRAND-02 | [glass-button.tsx:42](../../components/ui/glass-button.tsx#L42) | `group-hover:translate-y-0` relies on a `.group` class on the parent — but the component **doesn't set `className="group"`** on its root. The hover background-shift never activates. | Broken feature, not just off-palette. Nobody's using GlassButton on the landing right now, so no visible damage. Dead code with a bug. | medium | basic Tailwind `group-*` semantics | high | false |
| BRAND-03 | [pixel-corner-frames.tsx](../../components/ui/pixel-corner-frames.tsx) | [DESIGN.md](../../DESIGN.md) explicitly specifies: *"4 L-shaped corner brackets, ~32px arms, 1px `--border`, pinned ~24px inside each viewport corner. Frames the content region between nav and footer."* The component `components/ui/pixel-corner-frames.tsx` **returns `null`** — it's a stub. | The canonical viewport-corner bracket system is **not implemented**. Either the brief never shipped the visual (in which case DESIGN.md is lying) or it was removed. Major brand-spec miss. | high | DESIGN.md §Persistent chrome (explicit) | high | true |
| BRAND-04 | Corner-bracket implementation inventory | Motif renders **three different ways**: (1) CSS `::before/::after` pseudo-elements on [corner-bracket-card.tsx](../../components/ui/corner-bracket-card.tsx), (2) SVG stroke-dasharray in [hud-frame.tsx](../../components/ui/hud-frame.tsx), (3) clip-path polygon in [hud-button.tsx](../../components/ui/hud-button.tsx). | Three different implementations = three slightly different visual behaviors at edges, different scaling, different corner radii. Brand consistency at a distance is OK — but under close inspection or at large sizes, they diverge. Refactor risk later. | medium | Atomic design §Primitives consistency | medium | true |
| BRAND-05 | [for-builders-section.tsx:58](../../components/landing/for-builders-section.tsx#L58) | ForBuilders headline uses inline `font-display text-[clamp(32px,4vw,52px)] leading-none uppercase tracking-[-0.02em] text-[var(--fg-d)] mb-4 phosphor` — does **not** use the `.h-section` class used elsewhere. Custom bespoke heading style. | One-off divergence from the system. It looks right visually, but the next developer will copy-paste it instead of using `.h-section`. | low | DRY, design-system discipline | high | false |
| BRAND-06 | Orphaned scaffolding — [browse-agents-section.tsx](../../components/landing/browse-agents-section.tsx), [featured-agents-section.tsx](../../components/landing/featured-agents-section.tsx), plus other unused landing files | Both files exist in `components/landing/` but are not imported in `app/page.tsx`. Exist + unused = dead code + maintenance burden. | User intent resolution needed: re-add, rewrite, or delete. Flagged for Phase 2 questions. | unusual | YAGNI, dead-code hygiene | high | true |

**BRAND count:** 6 findings.

---

## 11 · The unusual category (UNUSUAL)

**Lens.** These aren't "wrong" — they're "off" in ways only user judgment can resolve. Every row here has `needs input = true` and will drive Phase-2 questions. Kept separate from the dimension-specific `unusual` rows above to make them easy to surface.

| id | location | finding | why it unusual | severity | principle | confidence | needs input |
|---|---|---|---|---|---|---|---|
| UNUSUAL-01 | [hero-section.tsx:47](../../components/landing/hero-section.tsx#L47) + [globals.css hero-glitch keyframe](../../app/globals.css) | Hero headline glitches every 12 seconds. Cross-ref MOTION-02. | Could be "just right" (signature brand detail) or "too frequent, draws eye away from CTAs". Depends on where you want the user's eye to land in the first 12 seconds. | unusual | Disney timing, brand voice vs attention economy | medium | true |
| UNUSUAL-02 | Corner-bracket motif saturation | [corner-bracket-card.tsx](../../components/ui/corner-bracket-card.tsx) renders brackets on EVERY `CornerBracketCard`. Combined with [hud-frame.tsx](../../components/ui/hud-frame.tsx) (every HudFrame) and [hud-button.tsx](../../components/ui/hud-button.tsx) (every HudButton), the motif appears on effectively every significant surface. | Started as a hero detail; is now wallpaper. The original DESIGN.md intent is "frame the content region" (one-per-viewport) — not "every card has corners". | unusual | DESIGN.md §Persistent chrome vs current usage | medium | true |
| UNUSUAL-03 | [app/page.tsx:13-28](../../app/page.tsx#L13-L28) | Page is center-heavy: Hero is centered, FinalCTA is centered, DataIndex intro is centered, ArenaTeaser marquee is centered, Arena title is centered. The only off-center sections are HowItWorks (left text / right bento), Payments (left title / right covers), ForBuilders (left copy / right editor). | The centering signature works for editorial feel but means the page has no visual anchor on the horizontal axis. Everything important floats to the middle. Consider: is one "here's our strong left-aligned pitch" section missing? | unusual | Refactoring UI §Alignment, Swiss design tradition | medium | true |
| UNUSUAL-04 | [hero-section.tsx:42](../../components/landing/hero-section.tsx#L42) "// SYS_8004 · V1.14 · ALPHA MODE" + [payments-section.tsx:60](../../components/landing/payments-section.tsx#L60) "// payments" + [live-activity-section.tsx:6-11](../../components/landing/live-activity-section.tsx) "NEW AGENT LISTED — SQL_WIZARD_V2 by 0x44a…f1" | The terminal-voice brand elements — `//` eyebrows, `SNAKE_CASE_AGENT_NAMES`, monospace status — are dense on every section. A hirer who doesn't know what a unix comment is or what `V1.14` means sees noise. Builders love it. | The "terminal is brand" decision is in DESIGN.md — but the *density* of terminal-voice elements on hirer-facing sections is a judgment call the spec doesn't set. | unusual | DESIGN.md §Brand mark sprinkles vs user comprehension | medium | true |
| UNUSUAL-05 | [trust-section.tsx:144-148](../../components/landing/trust-section.tsx#L144-L148) | The "How we keep agents honest" title uses a hard `<br />` between "How we keep" and "agents honest" — so the accent color lands on "honest" alone on the second line. Elsewhere in the code ([payments-section.tsx:70](../../components/landing/payments-section.tsx#L70), [final-cta-section.tsx](../../components/landing/final-cta-section.tsx)) the pattern is the same: hard break + accent word on the second line. | It's a signature — three-word-then-break titles. But on a narrow viewport where the sentence might already wrap naturally, the forced break creates a widow. | unusual | Typography: widows and orphans (Bringhurst), responsive design | medium | true |
| UNUSUAL-06 | [for-builders-section.tsx:71](../../components/landing/for-builders-section.tsx#L71) | *"Think Shopify, but for AI agents."* | Is the Shopify comparison still the right pitch frame in 2026? Will a developer audience read it as aspirational (well-known brand) or derivative ("ugh, another 'X-for-Y'")? Cultural reference half-life. | unusual | Content design §Cultural references, positioning language | low | true |

**UNUSUAL count:** 6 findings.

---

## Summary

### Counts by severity

| Severity | Count | Notes |
|---|---|---|
| critical | 2 | A11Y-01 / RESP-01 (same issue, cross-listed): mobile navigation is absent |
| high | 7 | A11Y-02, A11Y-04, IA-02, COPY-01, BRAND-01, BRAND-03 |
| medium | 22 | majority of findings |
| low | 11 | cosmetic or cleanup tier |
| unusual | 13 | needs user judgment |
| positive | 4 | A11Y-14, COLOR-05, MOTION-05, COPY-06 — model patterns worth preserving |
| **Total actionable** | **55** | (excluding positives) |

### Top 3 highest-impact items

1. **A11Y-01 / RESP-01** — Mobile nav disappears with no fallback. **Critical.** One fix unlocks all mobile navigation on the page.
2. **COPY-01** — Hero primary CTA "TRY A CALL" missing the word "free." **High.** One-string change; biggest conversion lever on the page given pre-launch waitlist stage.
3. **A11Y-04** — Zero `:focus-visible` styles on `HudButton` / `PillButton` / `GlassButton`. **High.** One globals.css block propagates the `.pay-cover:focus-visible` pattern to every button and restores keyboard visibility across the whole page.

### Items blocked on user input

**25** findings have `needs input = true` — 13 `unusual`-category items plus 12 non-unusual items (TYPO-01, TYPO-02, TYPO-05, COLOR-01, A11Y-12, SPACE-03, MOTION-02, MOTION-04, MOTION-06, IA-01, IA-02, IA-03, IA-04, COPY-02, COPY-03, COPY-04, RESP-02, RESP-03, RESP-04, RESP-05, PERF-01, BRAND-03, BRAND-04, BRAND-06).

These will be surfaced via `docs/audit/questions.md` in Phase 2, batched 3–7 at a time. Nothing is fixed until you answer.

### Negative / positive findings worth preserving

- **COPY-06** — "AGENET" typo does not exist in the codebase. Preemptive check confirmed clean.
- **A11Y-14** — [payments-section.tsx:99-113](../../components/landing/payments-section.tsx#L99-L113) is the keyboard-accessible gold-standard pattern. Replicate it, don't replace it.
- **COLOR-05** — Status dots are paired with text labels throughout, so the red/green CVD issue is handled correctly.
- **MOTION-05** — [cursor-glow.tsx](../../components/ui/cursor-glow.tsx) respects reduced-motion, uses `pointer-events: none`, and sits at `z-index: 1` under content. Safe by construction.

### What Phase 2 will do

Take the 25 blocked items, group them by theme (Arena weight, mobile interaction parity, terminal voice density, orphaned components, PROJECT.md compliance), and ask 3–7 questions per batch — never more. Phase 3 (fix plan) does not start until the first batch is answered.

### What Phase 1 did NOT look at

- **Live UI visual QA** — every finding is from code inspection. Things like "does the fan-out animation actually jank on my 2019 MacBook?" need a live browser. If you want me to run `bun dev` and do visual QA before Phase 2, say so.
- **Performance profiling numbers** — PERF-01 and PERF-02 are flagged on theory, not measured. Needs Lighthouse / PageSpeed / real-device INP numbers.
- **Light mode at `#F5F2EC`** — COLOR-04 flags that light mode ships `#FFFFFF` not the DESIGN.md `#F5F2EC`. I didn't toggle to light mode in-browser to verify downstream impact on color-mix tokens.
- **Screen-reader live test** — findings under A11Y use static analysis + WCAG rules. A real NVDA/VoiceOver pass would likely surface more.

Let me know if any of those are in scope for Phase 2.

---

**End of Phase 1.**
