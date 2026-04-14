# Standardization Plan — Headings, Components, Animations

Derived from a fresh pass over all 10 rendered landing sections + primitives.
Each row is a **STD-xx** ID, a one-line description, and exactly what it
touches. Execution follows the same batched workflow as `fix-plan.md`.

## Snapshot of drift

- **Headings:** 6 distinct section-title implementations (`.h-section`,
  `.hero-frame__headline`, `.payments-v2__title`, `.trust-v2__title`,
  `.data-index__intro-title`, inline `font-display text-[clamp(...)]`).
  5 eyebrow variants (`.eyebrow`, `.hero-frame__spec-id`, `.trust-v2__tag`,
  `.arena-story__eyebrow`, `.data-text__eyebrow`). Accent-span gradients
  drift between sections.
- **Components:** Two CTA families (`HudButton` vs `PillButton`) with overlap
  but inconsistent section-to-section usage. Five card families, no shared
  container, no shared eyebrow primitive.
- **Animation:** Four easings (mostly `[0.16, 1, 0.3, 1]`, but `easeOut`
  string and two exit-only curves leak through). Nine distinct duration
  values between `0.4s` and `0.9s`. Four stagger values.

---

## Group H — Headings & eyebrow

| id | what | touches | doesn't touch |
|---|---|---|---|
| STD-H1 | Collapse all section titles onto `.h-section`. Replace `.hero-frame__headline`, `.payments-v2__title`, `.trust-v2__title`, `.data-index__intro-title`, final-cta inline clamp with `<h2 className="h-section">` (hero keeps `<h1>`). | hero/payments/trust/data-index/final-cta section files + globals.css token cleanup | copy, section order |
| STD-H2 | Introduce a single `<Eyebrow>` primitive in `components/ui/eyebrow.tsx` with `dot` + text. Replace `.hero-frame__spec-id`, `.trust-v2__tag`, `.arena-story__eyebrow`, `.data-text__eyebrow` usages with it. Keep existing `.eyebrow` CSS as the class it renders. | new file + 5 section files | navbar, status-bar eyebrows (if different purpose) |
| STD-H3 | Normalize the accent highlight: single `.accent` rule used by every `<span class="accent">` inside an h1/h2. Currently drifts between `phosphor-accent` gradient and plain color. | globals.css only | text content |

## Group C — Components & containers

| id | what | touches | doesn't touch |
|---|---|---|---|
| STD-C1 | Pick one CTA family. Recommend **HudButton for primary**, **PillButton retired** → replace `PillButton` usages in final-cta + for-builders with HudButton variants. Delete `pill-button.tsx`. | final-cta-section, for-builders-section, pill-button.tsx | HudButton internals, GlassButton (deploy page) |
| STD-C2 | Introduce `<SectionShell>` wrapper: `<section>` + optional eyebrow + title + subcopy slot with consistent padding/max-width. Adopt in how-it-works, payments, for-builders, final-cta first; leave scroll-driven sections (arena, data-index) on their own wrappers. | new components/landing/section-shell.tsx + 4 section files | arena, data-index, hero (hero is special) |
| STD-C3 | Consolidate card families. Land on **HudFrame as the only "card frame" primitive**. Custom frames (`.trust-v2__card-frame`, `.data-card`, `.pay-cover` inner) either become `<HudFrame>` or stay as local flourish while removing ad-hoc border/padding drift. | trust/data-index/payments section files + small globals.css tidy | HudFrame props |

## Group A — Animation tokens

| id | what | touches | doesn't touch |
|---|---|---|---|
| STD-A1 | Add a central motion tokens file (`lib/motion.ts`) exporting: `easeOut` (single cubic `[0.16, 1, 0.3, 1]`), `durations.fast / base / slow` (0.35 / 0.6 / 0.8), `stagger.tight / base` (0.06 / 0.1). Every framer `transition={{}}` in landing/* imports from here. | new lib file + 10 section files (replace inline tuples) | CSS keyframes, scroll-driven logic |
| STD-A2 | Replace `easeOut` (string) and any `0.4/0.5/0.65/0.9` durations with the new tokens. Exit curves (`[0.5, 0, 0.75, 0]`) stay per-section — they are intentional. | same 10 files | arena scroll math, for-builders missing-ease rows |
| STD-A3 | Single `fadeUp` / `fadeIn` / `staggerContainer` variant pack in `lib/motion.ts`, used by every section. Retires per-section copies of `headerVariants`, `gridVariants`, `cardVariants`. | 10 section files + hooks/use-reveal.ts | per-section custom variants that encode unique motion (arena phases, trust fan-out) |

---

## Execution notes

- **Blast radius ranking:** A1 > C2 > H1 > C1 > H2 > H3 > C3 > A3 > A2.
  A1 touches every section but is mechanical; C2 changes section skeletons.
- **Per group, one commit.** Each STD-xx adds a row to `changelog.md`.
- **No new copy or section order changes.** This pass is purely structural.
- **Dark-mode + light-mode parity check after each group.** Token rename
  can silently break one theme.
- **Retain visual result.** Goal: the page looks identical but the code
  converges on one way of doing each thing.

## Out of scope

- Arena scroll-driven motion internals — unique and intentional.
- Hero-specific phosphor/glitch effects — signature, not drift.
- Trust-section fan-out choreography — unique interaction.
- Mobile chip row for data-index (FIX-28) — already standardized.
- Navbar / status-bar — separate layer.
