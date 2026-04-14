# Phase 2 — Clarifying Questions

**Status:** Waiting on answers to **Batch 1**.
**Scope:** These questions cover the 25 findings in [audit.md](audit.md) that need user intent before a fix direction can be chosen. No fix plan (Phase 3) will be written until Batch 1 is answered.

Batches 2–4 are drafted below but **deferred** — don't answer them yet. I'll walk through them one at a time once Batch 1 resolves, because later batches may be reframed by the decisions in Batch 1.

---

## Batch 1 — Section-level structure & intent

**Why this batch first:** These are the largest-blast-radius decisions in the audit. If the answer to Q1 is "section order is intentional", I don't touch `app/page.tsx`. If the answer to Q2 is "featured agents should come back", that's Phase 4 work and reshapes IA entirely. Answering these first means every subsequent fix is scoped against the right IA baseline.

### Q1 · Payments at position 4 *(covers IA-01)*

**Finding.** Current scroll order is Hero → LiveActivity → HowItWorks → **Payments** → DataIndex → ArenaTeaser → ArenaStory → Trust → ForBuilders → FinalCTA. A hirer sees *how to pay* before any section shows *what agents exist* (first concrete agents appear in DataIndex at #5, first named agents in the ArenaStory at #7).

**What I'd like to know.**

1. Was Payments-before-Discovery intentional — a "friction-killer first" move so hirers see "no signup, pay by the call" before they look at agents?
2. Or is this a drift from the original demand-led model ([PROJECT.md §2](../../PROJECT.md)) that should be corrected?
3. If it's intentional, is the implicit assumption "our target hirer is already sold on the idea and just needs the friction removed"?

**What this unblocks.** Whether I propose an `app/page.tsx` reorder or leave it alone.

---

### Q2 · Missing "Featured Agents" section *(covers IA-02)*

**Finding.** There is no section on the page showing concrete named agents with maker, rating, price, and a "Try free" button. The closest thing is agent name-drops inside the ArenaStory at position 7. [featured-agents-section.tsx](../../components/landing/featured-agents-section.tsx) exists in the repo but isn't imported.

**What I'd like to know.**

1. Is the section missing because the agents aren't real yet, and showing fake names felt dishonest?
2. Is it missing because it was cut for brevity?
3. Is it missing because the DataIndex / "Specialist Index" was judged a better replacement (category-led discovery vs agent-led)?
4. If real agents existed tomorrow, where would you want this section to live in the scroll?

**What this unblocks.** Whether Phase 4 re-adds the section, leaves it missing, or deletes the orphaned file.

---

### Q3 · Arena taking two sections *(covers IA-04, COPY-05)*

**Finding.** ArenaTeaser (section 6) and ArenaStory (section 7) are sequential, both about the Arena feature. Together they occupy roughly 30% of the scroll. Meanwhile the status bar says `ARENA: OFFLINE` the entire time ([status-bar.tsx:19](../../components/layout/status-bar.tsx#L19)) and ArenaSection uses a `COMING_SOON` eyebrow. So a hirer reads: big feature-pitch × 2 sections, *and* the feature is flagged offline.

**What I'd like to know.**

1. [PROJECT.md §6](../../PROJECT.md) says "this is a hook — feature it" — so Arena weight is deliberate. Is two full sections the right weight, or is one of them (teaser vs story) redundant?
2. Should the status bar change to `ARENA: SOON` or `ARENA: PREVIEW` so chrome and body copy agree? Or keep the honest-but-jarring `OFFLINE`?
3. If Arena weren't offline, would you collapse the teaser into the story, or keep both?

**What this unblocks.** Whether I touch the section list, the copy, or the status bar.

---

### Q4 · Orphaned scaffolding *(covers BRAND-06)*

**Finding.** These files exist in `components/landing/` but are not imported in `app/page.tsx`:
- [browse-agents-section.tsx](../../components/landing/browse-agents-section.tsx)
- [featured-agents-section.tsx](../../components/landing/featured-agents-section.tsx)
- Plus the earlier-mentioned unused scaffolding: `differentiation-section.tsx`, `features-section.tsx`, `naming-section.tsx`, `network-section.tsx`, `pipeline-section.tsx`, `problem-section.tsx`, `section-deck.tsx`

**What I'd like to know.**

1. For each cluster (agent-grid sections vs the other scaffolding), are they: (a) shelved for a future iteration, (b) A/B variants, (c) forgotten cleanup from an older design?
2. Can I delete the files that are clearly (c)?
3. For the agent-grid ones, if the answer to Q2 is "re-add Featured Agents", should I build on top of the existing file or start fresh?

**What this unblocks.** Whether BRAND-06 becomes a delete, a rewrite, or a "leave it alone" line in the fix plan.

---

### Q5 · Hero dual-audience CTA weight *(covers IA-03)*

**Finding.** Hero has two HudButtons: "TRY A CALL" (hirer) and "LIST AGENT" (builder). FinalCTA repeats: "Try a free call" (hirer) and "List your agent" (builder). Both buttons are visually weighted almost equally (HudButton primary variants).

**What I'd like to know.**

1. [PROJECT.md §13](../../PROJECT.md) says primary is hirer, secondary is builder. Should the visual weight reflect that more clearly — e.g. filled primary for hirer, outlined/ghosted secondary for builder?
2. Or is the 50/50 weight intentional because the waitlist-stage goal is maximum signups from either audience?
3. Should the builder CTA drop out of the Hero entirely and live only in ForBuilders + FinalCTA — cleaner demand-led pitch at first paint?

**What this unblocks.** Whether Hero + FinalCTA get a CTA rework, or stay as-is.

---

**Please answer Batch 1. Once I have your answers I'll turn them into the Phase-3 fix plan and then walk you through Batch 2.**

---

## Batch 2 — Unusual brand character *(deferred, don't answer yet)*

Draft only — will finalize after Batch 1 reshapes the context.

- **Q6** — Hero glitch every 12 seconds (UNUSUAL-01 / MOTION-02). Keep, reduce to every 24s, remove entirely, or gate behind first-scroll so it fires once and doesn't repeat?
- **Q7** — Corner-bracket motif as wallpaper (UNUSUAL-02). Is the motif intentionally everywhere, or should it retreat to hero-level elements only?
- **Q8** — Terminal voice density on hirer surfaces (UNUSUAL-04). Should `//`-eyebrows and `SNAKE_CASE_NAMES` stay as dense as they are, or pull back on the non-Arena sections where hirers need plain language?
- **Q9** — Declarative headlines everywhere (COPY-04). Keep the uniform "verb + thing" pattern, or break the rhythm with one or two contrasting shapes?
- **Q10** — Centering signature (UNUSUAL-03). Is the page-wide horizontal centering deliberate or a drift?

---

## Batch 3 — Mobile interaction parity *(deferred)*

- **Q11** — Trust hover-fan on mobile (RESP-03, A11Y-09). On touch devices there's no hover, so the fan never activates. Options: auto-cycle, carousel, static stack, or delete the interaction on mobile entirely. Also: should there be a keyboard-equivalent (focus-driven fan)?
- **Q12** — DataIndex mobile fallback (RESP-02). Desktop parallax doesn't translate to mobile — mobile gets a plain vertical stack. Is that acceptable, or should mobile get a purpose-built layout?
- **Q13** — Status bar mobile truncation (RESP-04). LIVE counter and BLK number hidden below 768px. Is losing half the brand-signature chrome acceptable for mobile users?

---

## Batch 4 — Copy voice edge cases *(deferred)*

- **Q14** — "On-chain" in Trust body copy (COPY-02). [PROJECT.md §12](../../PROJECT.md) avoids it "as headline words"; it's used as body. Acceptable, or rewrite?
- **Q15** — Jargon density in ArenaStory (COPY-03). TEE, sealed, attested, deterministic, prediction markets — all on a hirer surface. Keep (Arena is the technical hook) or simplify for the first-time visitor?
- **Q16** — "Think Shopify, but for AI agents" (UNUSUAL-06). Still the right frame in 2026, or has the comparison aged out?

---

## Findings that are NOT in any batch

These are deterministic — I don't need user input to know the fix direction, only approval. I'll list them in the Phase-3 fix plan for you to check off:

- A11Y-01 / RESP-01 — mobile nav (add hamburger)
- A11Y-02 — trust card titles → `<h3>`
- A11Y-03 — payments `<h4>` → `<h3>`
- A11Y-04 — focus-visible propagation (apply `.pay-cover` pattern globally)
- A11Y-05 — reduced-motion in text-effect primitives
- A11Y-06 — live activity `aria-label` or `aria-hidden`
- A11Y-07 — nav + status-bar landmark labels
- A11Y-08 — for-builders perks as `<ul>`
- A11Y-10 — HudButton Link-branch prop forwarding
- A11Y-11 — wallet button ARIA state
- A11Y-13 — typewriter cursor reduced-motion
- A11Y-15 — theme toggle SVGs `aria-hidden`
- COPY-01 — hero CTA "TRY A CALL" → "TRY A FREE CALL" (or equivalent with "free")
- COLOR-02 — light-mode accent contrast (bump weight or saturation)
- COLOR-04 — light mode bg `#FFFFFF` → `#F5F2EC` per DESIGN.md
- TYPO-03 — unify fluid type scale
- TYPO-04 — migrate Google Fonts to `next/font`
- BRAND-01 — GlassButton off-palette purple
- BRAND-02 — GlassButton broken `group-hover`
- BRAND-03 — pixel-corner-frames stub → implement per DESIGN.md
- BRAND-05 — ForBuilders headline → use `.h-section`
- MOTION-01 — consolidate backdrop-filter blur values
- MOTION-03 — framer-motion `MotionConfig reducedMotion="user"` at provider
- MOTION-07 — HudButton hover glow under reduced-motion
- SPACE-01 — shared section-spacer
- SPACE-02 — shared `max-w-content` token

These will show up in the Phase-3 fix plan as a pre-approved roster. You can remove any you don't want touched.
