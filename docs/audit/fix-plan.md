# Phase 3 — Fix Plan (v1)

**Status:** Pending your approval. Phase 4 implementation begins only after you say "go" or approve specific rows.
**Covers:** Batch 1 resolutions from [questions.md](questions.md) + the deterministic roster (fixes that never needed user input).
**Does not cover:** Batches 2, 3, 4 — still deferred. Those will generate fix-plan v2 once answered.

---

## Batch 1 — Resolutions applied

How your five answers changed the audit's open findings:

| Audit ID | Question | Your answer | Resolution |
|---|---|---|---|
| IA-01 | Payments at position 4 | "Intentional so people can find it faster." | **Closed — no fix.** Intentional friction-killer. Section order stays. |
| IA-02 | Featured Agents section missing | "No, as agents aren't real yet." | **Closed — no fix.** Section stays absent until real agents exist. |
| IA-04 | Arena taking two sections | "No 'offline feature' — OFFLINE just means 'not active right now'." | **Closed — no fix.** Two Arena sections and the `ARENA: OFFLINE` status chip are both correct. Weight stays. |
| COPY-05 | Status bar `OFFLINE` vs Arena body copy | (implicit from Q3) | **Closed — no fix.** Chrome and body are both honest; OFFLINE = pre-launch, Arena sections = preview pitch. |
| BRAND-06 | Orphaned scaffolding | "Remove all 9 (full cleanup)." | **New fix FIX-04** — delete 9 files + update PROJECT_MAP.md. |
| COPY-01 | Hero CTA missing "free" | "Make 'try a call' → claim your .human name." | **Rewritten as FIX-02** — Hero primary CTA becomes `CLAIM YOUR .HUMAN`. Introduces new concept (user-claimable handle, ENS/Farcaster-style). |
| IA-03 | Hero dual-audience CTA weight | "Demote builder, change primary to .human framing." | **New fix FIX-03** — Hero secondary CTA (`LIST AGENT`) drops to visual secondary. |

Net change: **4 findings closed as intentional**, **3 become concrete fixes** (one is a content rewrite, two are new structural changes).

---

## Approved fix plan — ordered by severity × effort

Legend:
- **Effort:** `XS` (one-liner) · `S` (single-file small edit) · `M` (multi-file or new logic) · `L` (new component / substantial work)
- **Approve?** = check when you want me to implement. Unchecked rows stay pending.

### CRITICAL

| Rank | Approve? | ID | Severity | Effort | What it touches | What it does NOT touch | Rollback note |
|---|---|---|---|---|---|---|---|
| 1 | ☐ | **FIX-01** (A11Y-01 / RESP-01) | critical | M | [navbar.tsx:63-89](../../components/layout/navbar.tsx#L63-L89) — add a mobile menu button + slide-out panel for viewports <768px. New small component under [components/layout/](../../components/layout/). Matches terminal voice (uppercase mono list). | Nav link list / order / destinations. Wordmark. Theme toggle. Wallet button. Desktop layout. | Single revert — new component is additive; navbar edit is a 5-line conditional. |

### HIGH

| Rank | Approve? | ID | Severity | Effort | What it touches | What it does NOT touch | Rollback note |
|---|---|---|---|---|---|---|---|
| 2 | ☐ | **FIX-02** (COPY-01 — Batch 1) | high | XS | [hero-section.tsx:72](../../components/landing/hero-section.tsx#L72) — change `TRY A CALL` → `CLAIM YOUR .HUMAN`. **Also update [final-cta-section.tsx](../../components/landing/final-cta-section.tsx)** primary CTA to match framing (`Claim your .human` or similar — I'll propose exact string in the edit and let you approve). | Button component, HudFrame, marquee copy, destination (`/agents`). | Single string revert. |
| 3 | ☐ | **FIX-03** (IA-03 — Batch 1) | high | XS | [hero-section.tsx:73](../../components/landing/hero-section.tsx#L73) — change `<HudButton href="/deploy">LIST AGENT</HudButton>` from default primary variant to `variant="secondary"` (outlined / ghosted). Builder CTA still present but visually subordinate. | Destination (`/deploy`), text, HudFrame. FinalCTA builder CTA stays as-is (PillButton secondary). | One-prop change. |
| 4 | ☐ | **FIX-04** (BRAND-06 — Batch 1) | high | S | **Delete 9 files:** [browse-agents-section.tsx](../../components/landing/browse-agents-section.tsx), [featured-agents-section.tsx](../../components/landing/featured-agents-section.tsx), [differentiation-section.tsx](../../components/landing/differentiation-section.tsx), [features-section.tsx](../../components/landing/features-section.tsx), [naming-section.tsx](../../components/landing/naming-section.tsx), [network-section.tsx](../../components/landing/network-section.tsx), [pipeline-section.tsx](../../components/landing/pipeline-section.tsx), [problem-section.tsx](../../components/landing/problem-section.tsx), [section-deck.tsx](../../components/landing/section-deck.tsx). **Update** [PROJECT_MAP.md](../../PROJECT_MAP.md) to stop referencing them. | scroll-context.tsx (used?), home-layout.tsx, rendered sections. | Git revert — files are pure deletions. |
| 5 | ☐ | **FIX-05** (A11Y-02) | high | XS | [trust-section.tsx:205-206](../../components/landing/trust-section.tsx#L205-L206) — wrap `{card.title}` in `<h3>`. Add CSS so `.trust-v2__card-label h3` inherits the current span styling. | Fan-out logic, card images, ticker, motion. | One-line markup change. |
| 6 | ☐ | **FIX-06** (A11Y-04) | high | S | [globals.css](../../app/globals.css) — add `.hud-button:focus-visible`, `.pill-button:focus-visible` (or the wrapping motion element), `.glass-button:focus-visible` rules matching the existing `.pay-cover:focus-visible` pattern (dashed 1px accent, 6px offset). Possibly add helper classes on the TSX primitives too. | TSX button logic, hover states, color palette. | Revert the CSS block. |
| 7 | ☐ | **FIX-07** (BRAND-01 + BRAND-02) | high | S | [glass-button.tsx:23-26, 42](../../components/ui/glass-button.tsx#L23-L26) — replace Tailwind `purple`, hardcoded `rgba(168, 85, 247, …)` with `var(--accent-d)` + `var(--accent-glow)`. Either add `className="group"` on the root, or delete the broken translate-y hover layer (my preference: delete — it's dead code). | Size variants, API surface, any landing component (none use it). | Revert file. Low risk — GlassButton is not used on landing today. |
| 8 | ☐ | **FIX-08** (BRAND-03) | high | L | [pixel-corner-frames.tsx](../../components/ui/pixel-corner-frames.tsx) — implement the 4-corner viewport bracket system per [DESIGN.md §Persistent chrome](../../DESIGN.md): 32px L-arms, 1px border, pinned 24px inside each viewport corner. Mount in [app/layout.tsx](../../app/layout.tsx) so it persists across all pages. Must respect reduced-motion + both themes. | Any existing layout chrome, nav, status bar, grain overlay. | Component is currently `return null` — new logic is additive, easy revert. |

### MEDIUM

| Rank | Approve? | ID | Severity | Effort | What it touches | What it does NOT touch | Rollback note |
|---|---|---|---|---|---|---|---|
| 9 | ☐ | **FIX-09** (A11Y-03) | medium | XS | [payments-section.tsx:130](../../components/landing/payments-section.tsx#L130) — `<h4>` → `<h3>`. | Visual styling (add h3 rule if needed). | One-line. |
| 10 | ☐ | **FIX-10** (A11Y-05) | medium | S | [decrypt-text.tsx](../../components/ui/decrypt-text.tsx), [hyper-text.tsx](../../components/ui/hyper-text.tsx), [typewriter-text.tsx](../../components/ui/typewriter-text.tsx) — add a `prefers-reduced-motion` short-circuit at the top of each `useEffect` that skips the interval and renders the final string. | Animation cadence for non-reduced-motion users, props API. | Per-file revert. |
| 11 | ☐ | **FIX-11** (A11Y-06) | medium | XS | [live-activity-section.tsx:36](../../components/landing/live-activity-section.tsx#L36) — wrap in `<section aria-label="Live activity">` or add `aria-hidden="true"` if the ticker is purely decorative. I'll recommend `aria-label` (it's genuine content). | Ticker content, motion, styling. | One-line. |
| 12 | ☐ | **FIX-12** (A11Y-07) | medium | XS | [navbar.tsx:48](../../components/layout/navbar.tsx#L48) — add `aria-label="Main"`. [status-bar.tsx:3](../../components/layout/status-bar.tsx#L3) — change `<div>` to `<footer aria-label="System status">` or add `role="contentinfo"`. | Layout, nested content. | Two one-line changes. |
| 13 | ☐ | **FIX-13** (A11Y-08) | medium | XS | [for-builders-section.tsx:73-89](../../components/landing/for-builders-section.tsx#L73-L89) — convert perks container + items from `motion.div`/`motion.span` to `motion.ul`/`motion.li`. | Grid layout, motion, existing styling. | One-file revert. |
| 14 | ☐ | **FIX-14** (A11Y-10) | medium | XS | [hud-button.tsx:31-37](../../components/ui/hud-button.tsx#L31-L37) — forward `{...props}` into the `Link` branch too. Add type guard for props that are `button`-only. | Visual behavior, primary-variant rendering. | File revert. |
| 15 | ☐ | **FIX-15** (A11Y-11) | medium | XS | [navbar.tsx:94-117](../../components/layout/navbar.tsx#L94-L117) — add `aria-live="polite"` wrapper + explicit `aria-label` that includes connection state. | Wallet button text, dropdown logic, motion. | One-file revert. |
| 16 | ☐ | **FIX-16** (COLOR-04) | medium | XS | [globals.css:40](../../app/globals.css#L40) — change `--bg-d: #FFFFFF` (light mode) → `#F5F2EC` per DESIGN.md. **Risk:** any `color-mix(... var(--bg-d))` calls will shift. I'll grep them before committing. | Dark mode background, all other tokens. | Single-line revert; grep confirms impact scope. |
| 17 | ☐ | **FIX-17** (MOTION-01) | medium | M | [globals.css](../../app/globals.css) multiple lines — introduce `--blur-sm` (12px), `--blur-md` (18px), `--blur-lg` (28px) tokens; replace all 7 call sites. | The visual effect may subtly change — acceptance criteria = blur looks no worse on any glass element. | Per-site revert possible; big-bang commit strongly discouraged. |
| 18 | ☐ | **FIX-18** (MOTION-03) | medium | XS | [app/layout.tsx](../../app/layout.tsx) — wrap the app in `<MotionConfig reducedMotion="user">` from `motion/react`. Single import, single wrapper. | Individual motion components, framer-motion versions. | Two-line revert. |
| 19 | ☐ | **FIX-19** (MOTION-07) | medium | XS | [globals.css:1151-1153](../../app/globals.css#L1151-L1153) — extend the existing `prefers-reduced-motion` rule to also disable `.hud-button`'s hover glow (translateY + drop-shadow). | Non-reduced-motion hover behavior. | Line addition. |
| 20 | ☐ | **FIX-20** (SPACE-01) | medium | M | Introduce `.section` class in [globals.css](../../app/globals.css) with single `padding-block` token. Migrate each landing section to use it. | Per-section internal padding, intentional hero/finalCTA overrides. | Per-section revert. Test at every breakpoint before merging. |
| 21 | ☐ | **FIX-21** (SPACE-02) | medium | XS | [tailwind.config.js](../../tailwind.config.js) + consumers — define `maxWidth.content` once; replace each per-section `max-w-[...]` with it. | Per-section layout intent. | Per-file revert. |
| 22 | ☐ | **FIX-22** (TYPO-04) | medium | M | [globals.css](../../app/globals.css) — delete Google Fonts `@import` lines. Add Next.js `next/font/google` imports for Archivo Black, JetBrains Mono, Instrument Serif in [app/layout.tsx](../../app/layout.tsx) following the existing Geist pattern. Wire CSS variables. | Typography scale, existing Geist sans/mono loads. | Font-stack may temporarily FOUT; revert = re-add imports. |

### LOW

| Rank | Approve? | ID | Severity | Effort | What it touches | What it does NOT touch | Rollback note |
|---|---|---|---|---|---|---|---|
| 23 | ☐ | **FIX-23** (A11Y-13) | low | XS | [typewriter-text.tsx:62](../../components/ui/typewriter-text.tsx#L62) — `animate-pulse` → `motion-safe:animate-pulse` (or `motion-reduce:animate-none`). | Cursor rendering. | One-class change. |
| 24 | ☐ | **FIX-24** (A11Y-15) | low | XS | [navbar.tsx:174-184](../../components/layout/navbar.tsx#L174-L184) — add `aria-hidden="true"` to the two inline SVGs. | Icon rendering. | Two one-word additions. |
| 25 | ☐ | **FIX-25** (BRAND-05) | low | XS | [for-builders-section.tsx:58](../../components/landing/for-builders-section.tsx#L58) — replace inline font/tracking/size classes with `className="h-section"` (+ keep `phosphor`). | Visual alignment (should be identical if h-section is correct). | Line revert. |
| 26 | ☐ | **FIX-26** (COLOR-02) | low | S | [globals.css:47](../../app/globals.css#L47) — light-mode `--accent-d` gets a saturation/darkness bump (proposed: `#6F4DFF` — verify contrast ≥ 4.5 on white *and* on #F5F2EC after FIX-16). | Dark mode accent, hover/focus dependent rules. | Single-line revert + revalidate. |

---

## Still deferred

These findings are blocked on Batches 2, 3, or 4. They do **not** enter the current fix plan:

| Batch | Findings waiting |
|---|---|
| Batch 2 (unusual brand character) | UNUSUAL-01 / MOTION-02, UNUSUAL-02, UNUSUAL-03, UNUSUAL-04, UNUSUAL-05, COPY-04 |
| Batch 3 (mobile interaction parity) | RESP-02, RESP-03, A11Y-09, RESP-04, RESP-05, MOTION-04 |
| Batch 4 (copy voice edge cases) | COPY-02, COPY-03, UNUSUAL-06 |
| Other (non-batched, needs input) | TYPO-01, TYPO-02, TYPO-05, COLOR-01, A11Y-12, SPACE-03, MOTION-06, BRAND-04, PERF-01 |

Once Batch 1 fixes are done and you want to move on, I'll re-open [questions.md](questions.md) with Batch 2.

---

## Phase 4 implementation protocol

Once you approve rows (check the `Approve?` boxes or say "go on 1, 2, 5–8"), each approved row lands as:

1. **One focused commit per row.** No bundling unless two rows must move together (e.g., FIX-02 and FIX-03 both touch hero; one commit is fine if they don't conflict).
2. **After each edit:** I report (a) the diff summary, (b) what I *didn't* touch that you might expect me to touch, (c) any cascading risks observed.
3. **[docs/audit/changelog.md](changelog.md)** gets one entry per merged fix, with the FIX-NN id, the finding id, and a one-line delta.
4. **If any fix cascades beyond what's in the "touches" column**, I stop and re-confirm before continuing.
5. **If a pre-commit hook fails**, I fix the underlying issue and create a *new* commit — never `--amend`.
6. **Type-check / lint** after every commit. If the project has `bun run lint` / `bun run typecheck` I run it; otherwise I'll ask.

## Implementation order recommendation

If you approve everything, I'd suggest executing in this order — smallest-blast-radius first so we can catch regressions early:

1. **FIX-09, FIX-11, FIX-12, FIX-14, FIX-24** — all XS, all single-line, zero visual impact. ~5 minutes total.
2. **FIX-05, FIX-13, FIX-15, FIX-23, FIX-25** — XS edits with small visual touch.
3. **FIX-03** (demote builder CTA) — isolated visual change to one button.
4. **FIX-02** (`.human` CTA rewrite) — isolated copy change; please approve final string in edit preview.
5. **FIX-18, FIX-19** — reduced-motion consistency (low risk).
6. **FIX-10** — text-effect primitives reduced-motion.
7. **FIX-04** — delete orphaned files. Safer to do after edits land so git history clearly separates "features" from "cleanup".
8. **FIX-16** — light mode bg change. Risky; grep + visual QA before commit.
9. **FIX-07** (GlassButton) — unused component fix; safe.
10. **FIX-06** (focus-visible propagation) — run tab-through test after.
11. **FIX-01** (mobile nav) — biggest change; do it when everything else is stable so regressions are easy to isolate.
12. **FIX-08** (viewport corner brackets) — new component; visible change across whole layout.
13. **FIX-26, FIX-21, FIX-17** — token consolidation. Medium blast radius.
14. **FIX-20, FIX-22** — largest-blast-radius spacing/font-loading changes. Save for last.

Rows 27+ (TYPO-03, TYPO-04 part 2, etc.) can follow.

---

**What I need from you now:**

Approve specific rows (say "go on 1–10" or "approve FIX-02, FIX-05, FIX-11") or say "approve everything" and I'll execute in the recommended order. For any row you don't want touched, say so explicitly — I'll drop it from the plan and note it in the changelog as "user declined".
