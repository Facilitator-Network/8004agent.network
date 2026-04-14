# Image Analysis — running ledger

Session accumulator for image analysis. User delivers images in batches of up to 5; each batch appends to this file. Chat responses stay short — all details live here.

## How to read this file

- **One section per batch**, numbered in delivery order.
- Each image gets its own subsection with an identifier (`B{batch}-I{index}`) so later references can point at it.
- Per image I try to capture:
  - **What it shows** — subject, context, viewport if recognizable
  - **Key observations** — things that stand out or would affect a design call
  - **Visible design elements** — layout / typography / color / motion cues / interactions
  - **Comparison to current 8004agents landing state** — alignment with the audit work
  - **Actionable follow-ups** — things worth changing, if any
- **Open questions** at the end of each batch if clarification is needed before analyzing.

---

## Batch 1 — Dark mode, full landing page walkthrough

**Context given by user:** "this all screen for darkmode"
**Interpretation:** 18 desktop screenshots of `localhost:3000` walking through every landing section in dark mode, roughly in render order. No mobile, no light mode. Viewport looks 1440–1800px wide across most captures (some are narrower/browser-zoomed).

**Overall read:** the landing page is rendering cleanly post-audit work. Every fix I landed earlier is visibly reflected (hero CTA rewrite, `.human` framing, `> MISSION BRIEF` eyebrow, pulsing-dot hero eyebrow, readable agent names, trust copy rewrite, trust cards brought up, ForBuilders `<br />` removal, etc.). Two concrete carryovers to flag below: **the Arena stage-monitor cards still have snake_case labels I missed in the earlier terminal-voice cleanup**, and **the DataIndex category card art slots render as empty frames** (missing imagery).

---

### B1-I1 · Hero section

**What it shows.** Top of the landing page. Nav bar, hero frame, status bar all visible.

**Key observations.**
- **`EXPERT AI AGENTS` is on one line** — my earlier `white-space: nowrap` + clamp(24, 5vw, 76) change works at this viewport. No wrap.
- **`FOR ANY JOB` sits on line 2 in the violet accent gradient**, with phosphor glow visible around it. Load-bearing accent confirmed.
- **Eyebrow is `● Pre-launch alpha`** (pulsing dot + clean text, no `//` or symbols). My `.hero-frame__spec-id::before` rule renders as a glowing dot to the left of the text.
- **Ticker inside the HudFrame** shows `YOU USE · IN SECONDS · CARD OR STABLECOIN · NO SIGNUP · NO COMM...` — that's the MISSION_BRIEF ticker, truncated by the frame edge as intended (it scrolls).
- **Two CTAs** side-by-side: `CLAIM YOUR .HUMAN` (primary) and `FIND AGENTS` (secondary repurposed from LIST AGENT). Both render as HudButtons with clip-path cuts.
- **HudFrame corners visible** — top-right has the angled cut, bottom-left has a small `+` star marker, top-left has another `+`. The hud-frame trace line animation is stationary in this snapshot but should be pulsing.
- **Status bar** at bottom shows `SYS: V1.14 · LIVE: 0 · ARENA: OFFLINE · FUJI TESTNET · BLK: 48,291,064` — intentional per Batch 1 Q3.
- **Nav** shows `HOME DEPLOY AGENTS ARENA EXPLORER DOCS` with HOME underlined (active-route), wordmark `8004agents est. 2025` left, `CONNECT` pill right.

**Visible design elements.**
- Archivo Black display face for the headline (confirmed post-revert of FIX-22).
- JetBrains Mono for the eyebrow, ticker, nav, and status bar.
- Instrument Serif italic for the `8004agents` wordmark.
- Violet `#8B6CFF` used only on the accent line + eyebrow dot + some button borders — not decorative.
- Film grain visible in the background (subtle, non-distracting).
- Heavy empty space above and below the hero frame — intentional, gives the frame room to breathe.

**Comparison to audit work.** Every fix I landed on the hero is confirmed:
- FIX-02 (CTA rewrite to `.human`) ✅
- FIX-03 (secondary CTA → `FIND AGENTS`) ✅
- Terminal-voice cleanup (`Pre-launch alpha` pulsing dot, `> MISSION BRIEF` ticker marker) ✅
- Hero headline `white-space: nowrap` + smaller clamp ✅

**Actionable follow-ups.** None. Hero is in its target state.

---

### B1-I2 · How It Works section

**What it shows.** Full section with live-activity ticker band visible at top.

**Key observations.**
- **Live-activity ticker** scrolling across the top shows cleaned-up copy: `MULTI-AGENT WORKFLOWS`, `NEW AGENT LISTED — SQL WIZARD`, `DEEP RESEARCHER COMPLETED A JOB — $0.07`, `ARENA MATCH STARTING IN 04:12 — WRITER PR…`. All my `_` cleanup is applied — no more `SQL_WIZARD_V2` or hex maker addresses.
- **Eyebrow `> HOW IT WORKS`** visible with pulsing dot to the left (the `.eyebrow::before` rule).
- **Title `THREE STEPS / ZERO FRICTION`** with `ZERO FRICTION` in accent violet on the second line. Hard `<br />` is load-bearing (accent IS the whole second line), so I kept it per Batch 2 rules.
- **Left column:** eyebrow → title → body → `START NOW` PillButton. Clean left-aligned vertical rhythm.
- **Right column:** 3-card bento grid with `01 SEARCH FOR WHAT YOU NEED`, `02 APPROVE A BUDGET`, `03 USE THE AGENT. RATE IT.`. Each card has a big violet number top-left and a heading + body below. Cards use the HudFrame treatment with angled corner cuts.

**Visible design elements.**
- Asymmetric layout (left text, right bento) — consistent with payments and for-builders as the "explanatory" sections.
- The `01 / 02 / 03` numbers in each card are in Archivo Black violet — a rare non-headline use of the display face as a visual anchor.
- Card bodies are in muted mono (`--fg-muted-d`) — readable but subordinate.

**Comparison to audit work.** Section matches audit expectations. Nothing flagged.

**Actionable follow-ups.** None. This section is clean.

---

### B1-I3 · Payments section (default state)

**What it shows.** Payments section hero view — big title + 4 cover cards below, nothing hovered.

**Key observations.**
- **Title `PAY HOWEVER / YOU WANT.`** with `YOU WANT.` in accent. Huge display type (clamp 48–132px).
- **Dynamic hint `[ ALL METHODS SUPPORTED ]`** sitting between title and cover cards. This is the default state when nothing is hovered.
- **4 cover cards** laid out in a row: `01 CARD OR STABLECOIN`, `02 PAY BY THE CALL`, `03 PRE-APPROVE A BUDGET`, `04 NO SIGNUP, NO ACCOUNTS`. Each has:
  - Number `01` / `02` / etc. top-left in violet
  - Centered placeholder art showing a violet crosshair over a dark background
  - Title + first body line visible below the art
  - Corner brackets at top-left and bottom-right of each card (the `pay-cover__corner` spans)
- **Section eyebrow `> PAYMENTS`** is NOT visible in the screenshot — it must be above the viewport crop. Based on my earlier fix it should be there.

**Visible design elements.**
- The cover art is intentionally abstract (crosshair over dark violet) — no real product imagery yet.
- Card-to-card spacing is even; 4-column grid is symmetric.
- Title dominates the section weight — bigger than Hero's headline by absolute pixel size (clamp max is 132px vs hero's 76px).

**Comparison to audit work.** Matches. The `payments-v2` structure is unchanged; copy updates (`> PAYMENTS` eyebrow) were earlier fixes.

**Actionable follow-ups.**
- **Card art is a placeholder crosshair.** At some point real payment-method imagery (Visa/Mastercard/USDC/Apple Pay) should go here — but the crosshair abstraction is fine for the pre-launch alpha stage and on-brand.
- Optional: the hint text `[ ALL METHODS SUPPORTED ]` has `[ ]` bracket symbols. Per the user's earlier "no symbols" rule on the header eyebrow, those brackets are mild "symbols" — but the user specifically exempted non-header eyebrows from that rule in Batch 2, so this is fine as-is.

---

### B1-I4 · Payments section (hover state on card 2)

**What it shows.** Same section as B1-I3 but with card `02 PAY BY THE CALL` hovered.

**Key observations.**
- **Card 02 is highlighted** — the crosshair art has a much stronger violet glow, the card frame has brightened, and the card is clearly visually selected.
- **Hint text changed to `[ PAY BY THE CALL ]`** — confirming the dynamic `hoveredIdx`-driven hint works. The active state CSS class fires.
- Other 3 cards stay in their default state (subtle).

**Visible design elements.** Hover interaction is working as intended. The brightness/saturate filter shift is pronounced but not flashy.

**Comparison to audit work.** The pay-cover interaction is one of the positive findings from the audit (A11Y-14 in audit.md — "gold standard keyboard-accessible pattern"). Visible confirmation that it's working.

**Actionable follow-ups.** None.

---

### B1-I5 · DataIndex section — intro panel (sticky scroll start)

**What it shows.** Desktop sticky parallax start state — intro panel only, before the carousel slides in.

**Key observations.**
- **Eyebrow `● > DATA INDEX`** (pulsing dot + `>` prefix + sentence-case label) — confirms my cleanup from the earlier `8004 · DATA_INDEX`.
- **Title `BROWSE THE / SPECIALIST INDEX`** with `SPECIALIST INDEX` in accent. Hard `<br />` kept (accent IS the whole second line — load-bearing).
- **Center-aligned layout** — consistent with hero/finalCTA-style "hero beats."
- Massive display text (probably clamp 48–120px given section's dramatic feel).
- Pure black background with no distracting elements; the intro is a clean reveal.

**Visible design elements.** The pulsing violet dot next to `> DATA INDEX` is clearly visible on the dark background — high contrast and on-brand.

**Comparison to audit work.**
- Eyebrow cleanup ✅
- Title break preservation ✅

**Actionable follow-ups.** None. Clean intro.

---

### B1-I6 · DataIndex section — research card sliding in

**What it shows.** Mid-scroll into the parallax carousel. The intro panel is sliding off to the left (`WSE THE / LIST INDEX` visible truncated), and the first category card `RESEARCH` is now centered on the right.

**Key observations.**
- **Parallax scrolling works** — the horizontal strip translate3d is in motion, intro panel partially off-screen.
- **Research card structure visible:**
  - **Empty card art slot** — a framed rectangle with accent violet border, but **NO content inside**. Should be an icon, illustration, or image representing "Research & Analysis."
  - **Card label `[ 01 ] RESEARCH`** at the bottom of the art frame — good.
  - **Text panel on the right** with:
    - Eyebrow `> CATEGORY` (pulsing dot + text) — my fix applied ✅
    - Headline `RESEARCH & ANALYSIS`
    - Body copy `Deep research, market analysis, competitive intel, paper summarization.`
    - CTA `→ EXPLORE` (which is the cleaned-up `INIT_SEARCH` → `Explore` label from my earlier fix)
- The intro panel's accent `LIST INDEX` gradient is still visible during the transition.

**Visible design elements.**
- The card art's accent-violet frame pulses or glows (hard to tell in a still).
- Text panel is left-aligned with strong hierarchy.

**Comparison to audit work.**
- `> CATEGORY` eyebrow ✅
- `Explore` CTA label ✅
- Category numbers `[ 01 ]` — cleaned up from `CAT_001` ✅

**Actionable follow-ups.**
- 🔧 **Missing card art for all 6 categories.** Every DataIndex card shows an empty accent-framed rectangle. Needs actual illustrations or iconography per category (Research / Code / Content / Data / Design / Finance). This is a **content/design debt**, not a code bug — but it's very visible on desktop because the cards are the section's main visual. Flag for asset delivery.

---

### B1-I7 · DataIndex — research + code + content cards visible mid-scroll

**What it shows.** Further into the parallax. `RESEARCH` card on the left (sliding off), `CODE` card centered, `CONTENT` card on the right just appearing.

**Key observations.**
- **All 3 visible cards have empty art slots** — same issue as B1-I6.
- **Alternating up/down positions** (`is-up` / `is-down` class per the code I read earlier) — cards are visually offset vertically to create a zig-zag rhythm during parallax. `RESEARCH` is up, `CODE` is down, `CONTENT` is up.
- **Code card panel:**
  - Eyebrow: `> CATEGORY`
  - Headline: `CODE & ENGINEERING`
  - Body: `Code review, debugging, refactoring, architecture, documentation.`
  - CTA: `→ EXPLORE`
- Card label strips show `[ 02 ] CODE` and `[ 03 ] CONTENT` at the bottom.

**Visible design elements.** Parallax flow is smooth; the alternating vertical offsets give motion-depth during horizontal scroll.

**Actionable follow-ups.**
- Same as B1-I6: art slots need real imagery.

---

### B1-I8 · DataIndex — design + data + finance cards visible

**What it shows.** End of the parallax scroll. `DATA` card truncated on left, `DESIGN` card center, `FINANCE` card right.

**Key observations.**
- **All 6 categories rendered through the parallax.** The carousel completes successfully.
- Each panel text block reads cleanly: `DESIGN & CREATIVE`, `DATA & ANALYTICS`, `FINANCE & TRADING`.
- Body copy is concise and scannable.
- Same empty art slots as before.

**Comparison to audit work.** All 6 categories present and accounted for. Content labels (`001` through `006`) confirmed via numbers visible in earlier frames.

**Actionable follow-ups.** Same missing-art issue.

---

### B1-I9 · Arena teaser

**What it shows.** The ArenaTeaser marquee section between DataIndex and Arena story.

**Key observations.**
- **Giant marquee text `UR AGENT IN THE A`** — mid-scroll of the looping `TEST YOUR AGENT IN THE ARENA` marquee. The text is truncated by the viewport because it's horizontally scrolling and only a slice is visible at any moment.
- **Sub-text `BENCHMARKS · HEAD-TO-HEAD · PREDICTION MARKETS`** visible below the marquee in smaller mono.
- **Bottom line strip** visible — the `.arena-teaser__line` elements.
- **Very dark background** with subtle radial gradient glow behind the marquee (the vignette).

**Visible design elements.**
- Single-line marquee at display-size type, huge.
- Section is intentionally minimal — just the marquee and subtitle. Acts as a "transition" between DataIndex and the full Arena story.

**Comparison to audit work.** Unchanged from baseline — this section wasn't touched by any fix.

**Actionable follow-ups.** None.

---

### B1-I10 · Arena section — Phase 1 Matchmaking (stage.monitor cards)

**What it shows.** First of three phases in the scroll-driven Arena story. Left column has the section title + step progression; right column shows three HudFrame cards stacked vertically as the "stage monitor."

**Key observations.**
- **Left column:**
  - Eyebrow: `ARENA · COMING_SOON` with pulsing dot (still has underscore! flag below)
  - Title: `WATCH AGENTS / COMPETE` with `COMPETE` in accent
  - 3-step progression: `01 MATCHMAKING` (active, accent background), `02 EXECUTION` (dim), `03 PREDICTION` (dim)
  - Body text under active step explains the phase
  - Vertical line down the left with `+` crosshair markers at start/end
- **Right column ([ STAGE.MONITOR ] label):**
  - Header: `[ STAGE.MONITOR ]` · `01 / 03 · MATCHMAKING` · `REAL_TIME · FUJI`
  - 3 stacked HudFrame cards:
    - Card 1: eyebrow `> REGISTER_CHALLENGE`, body shows a `$ arena register` terminal line, `→ task: "write 200w fintech hero"`, and option pills `WRITING / CODE / RESEARCH`
    - Card 2: eyebrow `> DEPLOY_IN_TEE`, body shows `agent: Deep Researcher`, progress pills `BUILD / SEAL / ATTEST`, a progress bar, and `⬡ TEE · VERIFIED`
    - Card 3: eyebrow `> EXEC_DETERMINISTIC`, body shows `Writer_pro` and `Copy_agent` progress bars with `OUTPUT_READY · 50.2s`

**🔧 Issues found — snake_case labels I missed in the underscore cleanup:**

The terminal-voice cleanup I did earlier missed several strings in this section:

| Location | Current string | Suggested fix |
|---|---|---|
| Left eyebrow | `ARENA · COMING_SOON` | `ARENA · COMING SOON` |
| Stage-monitor header | `REAL_TIME · FUJI` | `REAL TIME · FUJI` |
| Card 1 eyebrow | `> REGISTER_CHALLENGE` | `> REGISTER CHALLENGE` |
| Card 2 eyebrow | `> DEPLOY_IN_TEE` | `> DEPLOY IN TEE` |
| Card 3 eyebrow | `> EXEC_DETERMINISTIC` | `> EXEC DETERMINISTIC` |
| Exec progress bar labels | `Writer_pro` / `Copy_agent` | `Writer Pro` / `Copy Agent` |
| Output label | `OUTPUT_READY` | `OUTPUT READY` |
| Stage-monitor bracket label | `[ STAGE.MONITOR ]` | probably fine as-is (single period, visually consistent with `[ 01 ]` etc.) — leave unless flagged |

These appear to be hardcoded strings in `arena-section.tsx` inside the StepRegister, StepDeploy, and StepExecute render functions (or similar). I'll need to grep for them before fixing.

**Visible design elements.**
- Left/right split, 50/50ish.
- Step progression is keyboard/focus-driven (per FIX-27 extension? — let me check — actually FIX-27 was for trust cards, not arena steps. Arena steps were already keyboard-accessible per pre-audit code.)
- The `+` crosshair markers between left and right columns are purely decorative but consistent with the HUD motif.

**Comparison to audit work.** Most arena copy is intentional (Batch 4 said "Keep — Arena is the technical hook"), but the underscores are a voice-cleanup miss, not a jargon decision. The user's earlier "remove excessive `_`" ask was unconditional.

**Actionable follow-ups.**
- 🔧 **Remove the 7 snake_case strings listed above.** Fix in a follow-up pass. These fall under the earlier "no underscores" rule, not the Arena-jargon Batch 4 decision.

---

### B1-I11 · Arena section — Phase 1 Matchmaking (agent grid variant)

**What it shows.** Same Phase 1 but the right column now shows a **different view** — instead of the three stage.monitor cards, it shows a 2×2 grid of agent cards with a `VS` badge in the middle.

**Key observations.**
- This appears to be a later part of the Matchmaking phase (the scroll-progress bucket 0.12–0.40 has sub-animations). The stage.monitor cards scroll out and the agent tile grid scrolls in.
- **4 agent cards:**
  - `AGENT · 01` header, `WRITER PRO` name, `by ink studio` maker, `91.8` score, progress bar
  - `AGENT · 02`, `COPY AGENT`, `by Bolt`, `86.4`
  - `AGENT · 03`, `DEEP RESEARCHER`, `by Helix Labs`, `94.2`
  - `AGENT · 04`, `SQL WIZARD`, `by Codex Labs`, `87.2`
- **`VS` badge** centered between the cards, violet, small round.
- All agent names are sentence case in source → CSS uppercase at render.
- All maker names are readable (no more `0x44a…f1`).

**Comparison to audit work.** My earlier fixes are visible:
- `AGENT · CAT_{id}` → `AGENT · {id}` ✅
- Agent names readable ✅
- Maker `0x44a…f1` → `Codex Labs` ✅

**Actionable follow-ups.** None for this view. (The earlier `REGISTER_CHALLENGE` etc. underscores still apply to the stage.monitor variant shown in B1-I10.)

---

### B1-I12 · Arena section — Phase 2 Execution

**What it shows.** Scrolled further — step 02 `EXECUTION` is now active, step 01 `MATCHMAKING` is dim, step 03 `PREDICTION` is still dim.

**Key observations.**
- **Body text under the active step:** `Every run is registered on-chain, sealed inside a TEE, and executed deterministically. The full pipeline is attested and reproducible.`
- **"on-chain" is still present** in this body copy — intentional per Batch 4 Q15 answer ("Keep — Arena is the technical hook"). I only rewrote the **Trust** body copy to drop "on-chain"; Arena keeps it.
- Right column is showing the same three stage.monitor HudFrame cards as in B1-I10. No change to the right column between Phase 1 stage.monitor variant and Phase 2 — the card contents are the same, only the step indicator on the left changes.

**Visible design elements.** Step progression left-column updates while the right column animates between stage.monitor (pre-match) and agent cards (during matchmaking) — the interplay is driven by scroll progress.

**Comparison to audit work.** The `on-chain` decision is consistent with Batch 4.

**Actionable follow-ups.** Same snake_case issues as B1-I10 still apply.

---

### B1-I13 · Arena section — Phase 3 Prediction

**What it shows.** Final phase — `03 PREDICTION` is active. Right column has swapped to the prediction market view.

**Key observations.**
- **Left body:** `Spectators stake on outcomes before the match resolves. Odds move live, payouts settle on verifiable results — a real market for agent skill.`
- **Right column:**
  - `> PREDICT THE WINNER` header
  - Two fighter cards:
    - `> FIGHTER A` eyebrow, `WRITER PRO` h5, `1.62×` odds (big violet), `$842 staked`, `STAKE →` CTA
    - `> FIGHTER B` eyebrow, `COPY AGENT` h5, `2.34×` odds, `$461 staked`, `STAKE →` CTA
  - `VS` badge in middle (big violet circle)
  - Below the cards: `● TOTAL POOL · $1,303 · OPEN` with a pulsing dot
- **Fighter eyebrows are now `> FIGHTER A` / `> FIGHTER B`** — confirms my fix replacing `// FIGHTER_A` ✅
- **No underscores in this view** — unlike B1-I10 which had them in the stage.monitor cards.

**Comparison to audit work.**
- `> FIGHTER A/B` ✅
- `> PREDICT THE WINNER` ✅
- `Writer Pro` / `Copy Agent` readable ✅

**Actionable follow-ups.** None for this view. (Phase 3 is clean.)

---

### B1-I14 · Trust section — default state

**What it shows.** Trust section with headline and body visible above the 5-card fan.

**Key observations.**
- **Eyebrow `> TRUST · LAYER`** with pulsing dot (the existing `.trust-v2__tag-dot` element).
- **Title `HOW WE KEEP / AGENTS HONEST`** — the text wraps after "KEEP" because of the container width, even though I removed the hard `<br />`. This is natural wrapping rather than forced. `HONEST` is in accent violet. Good — my Batch 2 removal of the break still gives the visually-desired two-line layout at this viewport.
- **Body copy reads:** `An agent has to earn its place. Every listing is verified on sign-up, sealed inside hardware enclaves, and continuously monitored and publicly logged — so users trust the output, not the hype.`
  - **"publicly logged" confirmed** — my FIX-29 (drop "on-chain") is in. ✅
- **5 trust cards fanned out below the body** — each with crosshair art and a tag (`TEE`, `PROOF`, `MONITOR`, `AUDIT`, `REPUTATION`). Cards are clearly BELOW the body text now, not floating at the bottom of the section.
  - This matches my earlier CSS change (`align-items: flex-start` + `margin-top: 24px`, `flex: 0 0 auto`).
- **One card in the center appears to be the hovered state** — it shows a label `LIVE MONITORING` clearly while the others are dim/tilted.
- **Below the fan:** a horizontal ticker with `ATTESTED · DETERMINISTIC · REPLAY · SEALED · HARDWARE · PUBLIC · AUDIT · CONTINUOUS · MONITORING · ZERO TRUST INPUTS · REPUTATION …`

**Visible design elements.**
- Title left-aligned within a `max-w-[560px]` container (per CSS).
- Card fan is center-aligned in its own container.
- The active/hovered card lifts up and brightens.

**Comparison to audit work.**
- `<br />` removal (title wraps naturally) ✅
- Body copy rewrite ("on-chain" → "publicly logged") ✅
- Cards brought up from below (now sit right under the body) ✅
- Hover fan interaction ✅

**Actionable follow-ups.** None.

---

### B1-I15 · Trust section — center card hovered

**What it shows.** Trust cards fan out with the 3rd/center card (`PUBLIC AUDIT`) expanded/tilted forward.

**Key observations.**
- The center card is visibly larger and has a stronger violet drop-shadow.
- The other 4 cards are tilted away / dimmed (the `getCardStyle()` per-card layout math).
- **Below the fan:** `> FOR BUILDERS` eyebrow is visible at the bottom of the viewport — the trust section transitions into the ForBuilders panel.
- A partial "builders panel" shape is visible at the very bottom — the clipped polygon with accent gradient.

**Visible design elements.** The fan-out interaction is clearly working. The visual hierarchy shift is pronounced — viewers immediately see the center card is "selected."

**Comparison to audit work.** Matches expectations.

**Actionable follow-ups.** None.

---

### B1-I16 · Trust section — rightmost card hovered

**What it shows.** Same as B1-I15 but with the rightmost card (`REPUTATION`) expanded.

**Key observations.**
- Far-right card is lifted and tilted forward.
- Other cards shift position in response (the `getCardStyle()` "push away from hover" logic).
- The fan-out is asymmetric when hovering non-center cards — the hovered card's neighbors move further away than the opposite-side cards.

**Actionable follow-ups.** None — this confirms the hover logic works across all positions.

---

### B1-I17 · ForBuilders section

**What it shows.** ForBuilders panel — left column copy, right column code editor.

**Key observations.**
- **Eyebrow `> FOR BUILDERS`** visible above the panel.
- **Title** renders as `BUILT AN AGENT? / MAKE IT EARN` — two lines at this viewport. Earlier I removed the `<br />` but the text wraps naturally here (the string `"Built an agent? Make it earn"` is too wide for the panel at this viewport). Good — same visual as before, without the forced break.
- **Body:** `Think Shopify, but for AI agents. Register your agent, set your prices, and we route paying traffic to your endpoint. You host. We handle discovery, billing, and trust.`
  - Shopify framing kept per Batch 4 Q16 ✅
- **Perks** rendered as a 2×2 list:
  - `+ PER-CALL OR SUBSCRIPTION`
  - `+ AUTO-PAYOUTS`
  - `+ REPUTATION BUILT-IN`
  - `+ A2A STANDARD`
  - The `+` bullet is in accent violet; these are `<ul>`/`<li>` per FIX-13.
- **CTA `> LIST YOUR AGENT`** PillButton primary.
- **Right column — code editor mockup:**
  - Terminal-style header bar with traffic lights (`● ● ●`) and `agent-cli · deep-researcher`
  - Syntax-highlighted lines showing:
    - `$ 8004 init deep-researcher`
    - `→ scaffolding project structure`
    - `→ generating agent.toml`
    - `→ creating Circle wallet`
    - `$ 8004 deploy --network fuji`
    - `→ verifying endpoint`
    - `→ minting identity NFT (sponsored)`
    - `→ listing to marketplace`
    - `✓ agent live · 8004.network/deep-researcher`
- **Builders panel shape** has the angled clip-path corner cuts at TL, TR, BR, BL — on-brand HUD chrome.
- **Background scanlines** subtly visible inside the panel.

**Visible design elements.**
- Title uses `.h-section` class (my FIX-25) — same display type scale as other section titles.
- Code editor uses mono font with violet keyword highlighting.
- The `→` arrow prefix on the terminal log lines is a nice bit of character.

**Comparison to audit work.**
- `<br />` removed from title ✅
- Perks as `<ul>` ✅
- `.h-section` class on title ✅
- "Think Shopify" kept ✅

**Actionable follow-ups.** None.

---

### B1-I18 / B1-I19 · FinalCTA section (two near-identical captures)

**What it shows.** Closing section of the page. These two images appear identical (possibly a duplicate screenshot) — I'll treat them as one.

**Key observations.**
- **Above the title:** the bottom edge of the ForBuilders builders panel is visible, showing the angular clip-path cut and the bottom of the code editor and `> LIST YOUR AGENT` CTA (so this is right below ForBuilders in scroll).
- **Title `STOP SEARCHING / START HIRING`** — `START HIRING` in accent gradient (violet to darker violet). Load-bearing break kept ✅
- **Body:** `Find an expert AI for any job in seconds. Pay only for what you use. No signup required.`
- **Two CTAs:**
  - `● CLAIM YOUR .HUMAN` (primary, filled — PillButton primary)
  - `● LIST YOUR AGENT` (secondary, outlined — PillButton secondary)
  - Both have the accent dot indicator to the left of the label.
- **Center-aligned** with generous padding (`py-32`).
- **No status bar visible** in the lower section — the screenshot crops just before the footer, showing the CTAs are close to the end of the section.

**Visible design elements.**
- Title is the largest type on the page (`clamp(48px, 8vw, 112px)`).
- Phosphor glow on `START HIRING` is visible.
- CTAs are clearly primary/secondary via fill vs outline.

**Comparison to audit work.**
- FIX-02 applied to the primary CTA (`Try a free call` → `Claim your .human`) ✅
- Secondary CTA unchanged (`List your agent`) — intentional, builder CTA lives here per Batch 1 answers ✅
- `<br />` kept (accent IS second line) ✅

**Actionable follow-ups.** None.

---

## Batch 1 — Cross-image notes & summary

### Fixes visible in these screenshots (all applied correctly)

| Audit finding / user directive | Section(s) | Status |
|---|---|---|
| `TRY A CALL` → `CLAIM YOUR .HUMAN` (FIX-02) | Hero, FinalCTA | ✅ |
| Builder CTA → `FIND AGENTS` (FIX-03 reinterpreted) | Hero | ✅ |
| Hero eyebrow → pulsing dot + `Pre-launch alpha` | Hero | ✅ |
| `//` → `>` in eyebrows | LiveActivity ticker, HowItWorks, Payments, DataIndex, Arena Phase 3, Trust | ✅ |
| Remove `_` and excessive `.` | LiveActivity (agent names), DataIndex labels, Arena agent cards, Arena predict eyebrows | ✅ (mostly — see issues below) |
| `EXPERT AI AGENTS` on one line | Hero | ✅ |
| Trust body copy drop "on-chain" (FIX-29) | Trust | ✅ (`publicly logged`) |
| Trust cards brought up from below | Trust | ✅ |
| Trust title `<br />` removed (wraps naturally) | Trust | ✅ |
| ForBuilders title `<br />` removed (wraps naturally) | ForBuilders | ✅ |
| DataIndex `> CATEGORY` / `Explore` CTA / category numbers cleanup | DataIndex | ✅ |
| Arena `> FIGHTER A/B`, agent card `AGENT · {id}`, readable names | Arena (predict, matchmaking agent grid) | ✅ |

### Issues found worth fixing

#### 🔧 Snake_case labels still present in Arena stage.monitor cards

Not seen in earlier grep passes because these are in `arena-section.tsx` inside deeper step render functions. Visible in B1-I10 and B1-I12.

Strings to clean up:
- `ARENA · COMING_SOON` → `ARENA · COMING SOON`
- `REAL_TIME · FUJI` → `REAL TIME · FUJI`
- `> REGISTER_CHALLENGE` → `> REGISTER CHALLENGE`
- `> DEPLOY_IN_TEE` → `> DEPLOY IN TEE`
- `> EXEC_DETERMINISTIC` → `> EXEC DETERMINISTIC`
- `Writer_pro` / `Copy_agent` → `Writer Pro` / `Copy Agent`
- `OUTPUT_READY` → `OUTPUT READY`

These fall under the earlier unconditional "no underscores" rule, not the Batch 4 Arena-jargon decision (which was about TEE/attested/deterministic vocab, not snake_case formatting).

**Proposed FIX-30:** Single pass over `arena-section.tsx` to replace these 7 strings. XS effort.

#### 🎨 DataIndex category card art is empty

All 6 category cards (Research / Code / Content / Data / Design / Finance) show empty accent-bordered rectangles where the category illustration should be. This is the most visually prominent unfinished element on the landing.

Not a code bug — it's missing asset delivery. The art slot renders via CSS `scene-research` / `scene-code` / etc. classes that appear to be defined in `globals.css` but without real imagery inside. This is **content/design debt**, not audit scope.

**Recommendation:** flag to design — when real illustrations exist for the 6 categories, they slot into `.data-card__art.scene-{id}` in `globals.css`. Meantime the empty frames read as "coming soon" placeholders, which is acceptable for a pre-launch alpha.

### Things that look great and should NOT be changed

- Hero layout, typography, CTA arrangement
- Pulsing dot eyebrow pattern (replicated from header spec to other eyebrows via `.eyebrow::before`)
- Payments interactive hover switcher with dynamic hint
- DataIndex parallax (the motion is smooth and on-brand)
- Arena 3-phase progression with step indicators
- Trust fan-out interaction with hover card lift
- ForBuilders code editor mockup (visually rich, on-brand)
- FinalCTA type scale and CTA separation

### Things I cannot verify from this batch

- **Mobile layout.** No mobile-width screenshots in this batch. The mobile-specific FIX-27 (Trust tap-to-expand) and FIX-28 (DataIndex chip row) are not visually confirmed.
- **Keyboard focus rings.** Static screenshots don't show focus state. FIX-06 (focus-visible propagation) can only be verified with live keyboard nav.
- **Animation cadences.** Hero glitch cadence (every 12s), trust card spring animations, marquee tempos — static captures don't reveal timing.
- **Light mode.** User said "this all screen for darkmode" — light mode unverified post-audit.

### Open questions

None — the user labeled the batch and the content is unambiguous.

---

## Batch 2 — Light mode, full landing page walkthrough

**Context given by user:** "this all for the light mode"
**Interpretation:** 15 desktop screenshots of the same landing sections walked through in Batch 1, now rendered with the light theme toggled on. Same sections, same render order (Hero → HowItWorks → Payments → DataIndex × 4 → ArenaTeaser → Arena × 3 → Trust × 2 → ForBuilders → FinalCTA). No mobile.

**Main thing I'm checking:** whether the light-mode palette changes I landed in FIX-16 (`--bg-d: #FFFFFF` → `#F5F2EC`) and FIX-26 (`--accent-d: #7C5CFF` → `#6F4DFF`) are visibly applied, whether contrast looks right on the warm paper background, and whether any layout/color choices read worse in light mode than dark.

---

### Palette verification up front

Comparing against DESIGN.md §Color tokens and my FIX-16/FIX-26 edits:

| Token | Value in code (post-FIX) | Visible in screenshots? |
|---|---|---|
| `--bg-d` | `#F5F2EC` (warm cream paper) | ✅ Background is clearly cream, NOT pure white. Compare to the surrounding black OS chrome — the content area is warm-toned. |
| `--fg-d` | `#000000` (unchanged, not synced to DESIGN.md's `#0A0A0A` per my FIX-16 scope guard) | ✅ Headlines render near-black on cream. |
| `--accent-d` | `#6F4DFF` (bumped from `#7C5CFF` for contrast) | ✅ Accent violet appears saturated and visibly darker than the dark-mode `#8B6CFF` — load-bearing on "FOR ANY JOB", "ZERO FRICTION", "SPECIALIST INDEX", "START HIRING", etc. |
| `--surface-d` | `#FFFFFF` (kept white — cards sit on cream bg) | ✅ Cards/panels appear as lighter rectangles against the warm paper. |
| `--border-d` | `#0A0A0A` (unchanged per FIX-16 scope) | ✅ Hero frame outlines, nav border-bottom, status bar border-top all visible as near-black. |
| `--grain-opacity` | `0.05` (light) vs `0.08` (dark) | ✅ Grain is subtler — visible as a soft texture but not dominant. |
| `--phosphor-neutral` | `none` in light mode | ✅ Less text-shadow on headlines vs dark mode — the huge display type reads as flat dark ink rather than glowing phosphor. Consistent with the "light is paper, dark is console" dual-mode concept in DESIGN.md. |

**Net:** the DESIGN.md "warm paper" intent is clearly achieved. Light mode is visibly distinct from a browser-default white page and reads as a brand choice rather than a negation of dark mode.

---

### B2-I1 · Hero section (light mode)

**What it shows.** Same layout as B1-I1 but light.

**Key observations.**
- **Cream background** behind the hero frame, with subtle grain texture.
- **HudFrame outlines** render as dark near-black with the clip-path angled cut at top-right. Very crisp against the cream.
- **Title `EXPERT AI AGENTS`** in near-black Archivo Black, tight and bold. Still on one line (nowrap fix holds in light mode).
- **Accent line `FOR ANY JOB`** renders in `#6F4DFF` — visibly darker and more saturated than dark mode's `#8B6CFF`. On cream, this reads as a deliberate violet highlight rather than a glow.
- **Eyebrow `● Pre-launch alpha`** — the pulsing dot is a solid violet circle, and the text is violet. Good contrast against the cream.
- **Ticker inside frame** reads as muted dark-on-light — slightly lower contrast than the headline but clearly legible.
- **Two CTAs** — `CLAIM YOUR .HUMAN` (filled dark) and `FIND AGENTS` (outlined). In light mode the filled primary reads as a dark button, the outlined secondary as a subtle outline on cream. Clear hierarchy.
- **Nav and status bar** render with dark ink on cream. Wordmark `8004agents` still italic serif. `CONNECT` pill button has dark outline.

**Comparison to dark mode.**
- Dark mode hero feels "console-glowing."
- Light mode hero feels "editorial paper" — same type, same layout, inverted palette. Both are coherent brand expressions.

**Actionable follow-ups.** None. FIX-16 + FIX-26 both visibly applied.

---

### B2-I2 · How It Works section (light mode)

**What it shows.** Same as B1-I2 — live-activity ticker, left text column, right bento.

**Key observations.**
- **Live-activity ticker** at top is visible against cream. Status dots (green/amber/violet) pop against the light background — stronger visual weight than on dark mode.
- **Title `THREE STEPS / ZERO FRICTION`** with `ZERO FRICTION` in darker violet (`#6F4DFF`). Contrast is strong against cream.
- **Eyebrow `> HOW IT WORKS`** visible in violet with pulsing dot.
- **Body copy** in muted gray (`--fg-muted-d: #6B6B6B`) on cream. Readable at body size.
- **`START NOW` PillButton** — outlined with dark border.
- **Bento cards** (01/02/03):
  - Background is light (either `--surface-d` white or a very pale violet tint — looks slightly tinted).
  - Big violet numbers top-left.
  - Dark HudFrame outlines with angled corner cuts.
  - Card titles in dark weight, bodies in muted gray.
- **Top-right of card 2 has a subtle violet glow** — possibly a hover state or the card's angled corner rendering.

**Comparison to dark mode.** Layout and content identical. Only palette inverts — confirms DESIGN.md "light and dark modes are twins, palette only inverts."

**Actionable follow-ups.** None.

---

### B2-I3 · Payments section (light mode, one card visually different)

**What it shows.** Same as B1-I3/I4 — title + 4 cover cards.

**Key observations.**
- **Eyebrow `> PAYMENTS`** with pulsing dot is visible at top-left (in dark mode screenshots it was cropped).
- **Title `PAY HOWEVER / YOU WANT.`** — massive dark type with `YOU WANT.` in the darker violet accent. The period is non-accent, keeping the rhythm.
- **Dynamic hint `[ PAY BY THE CALL ]`** is visible, meaning card 02 is in the hover state.
- **4 cover cards:**
  - Card 01, 03, 04 render in default state: violet-tinted backgrounds, violet crosshair art, number label, body text below.
  - **Card 02 has a darker more-saturated treatment** — visibly different from the others, confirming the hover state. The crosshair is brighter, the card frame has a stronger violet glow around it.
- **Payment card backgrounds in light mode are a pale violet tint** (probably a `color-mix(var(--accent-d), white)` formula) rather than white. Creates a deliberate "card island" effect against the cream bg.

**Comparison to dark mode.**
- Dark: cards are dark violet on black, very HUD-console.
- Light: cards are pale violet on cream, more "magazine spread."
- Both are coherent.

**Actionable follow-ups.** None.

---

### B2-I4 · DataIndex intro panel (light mode)

**What it shows.** Sticky intro start state.

**Key observations.**
- **Eyebrow `● > DATA INDEX`** at center top — pulsing dot is visible against cream.
- **Title `BROWSE THE / SPECIALIST INDEX`** massive dark display type with `SPECIALIST INDEX` in darker accent violet.
- **Pure cream background** — no decorations, no gradient, just the title.
- Center-aligned layout identical to dark mode.

**Actionable follow-ups.** None.

---

### B2-I5 · DataIndex mid-scroll — Research card (light mode)

**What it shows.** Intro sliding off left (`VSE THE / LIST INDEX` truncated), Research card centered.

**Key observations.**
- **Research card:**
  - Art slot is an **empty white rectangle with dark + violet borders** (vs dark mode's violet border on dark fill). Still empty, same asset issue.
  - Label `[ 01 ] RESEARCH` at bottom in dark text.
  - Right-side text panel:
    - `> CATEGORY` eyebrow in violet with pulsing dot
    - `RESEARCH & ANALYSIS` heading in near-black
    - Body in muted gray
    - `→ EXPLORE` CTA in violet
- **Code card** appearing on right, also empty art slot.
- **Intro accent text** `LIST INDEX` still in violet gradient during transition.

**Observations specific to light mode.**
- The empty art slots are even more visible in light mode than dark — on cream, an empty white rectangle with thin borders reads as "missing content" very clearly. In dark mode, the empty dark rectangle with violet border reads more like "decorative placeholder."
- The category text panels have strong contrast and are easy to read.

**Actionable follow-ups.**
- 🎨 **Same missing card art** noted in Batch 1 — **more visually obvious in light mode** because empty white rectangles against cream read as unfinished in a way that dark empty rectangles don't. Flag priority: if the site ships in light mode before the real illustrations are delivered, these empty slots look conspicuously incomplete.

---

### B2-I6 · DataIndex — Research + Code + Content (light mode)

**What it shows.** Same mid-parallax state as B1-I7.

**Key observations.**
- Alternating up/down zig-zag rhythm visible.
- All 3 cards have the same empty white-rectangle-with-border art issue.
- Text panels read clean and legible.
- The vertical offset (`is-up` / `is-down`) creates a clear depth illusion during parallax.

**Actionable follow-ups.** Same missing-art issue as B2-I5.

---

### B2-I7 · DataIndex — Design + Data + Finance (light mode)

**What it shows.** End of parallax, final 3 cards.

**Key observations.**
- `DESIGN & CREATIVE` visible with body and CTA.
- `DATA & ANALYTICS` text panel visible on the left (card art off-screen).
- `FINANCE & TRADING` card on the right.
- Same empty art slot issue.

**Actionable follow-ups.** Same.

---

### B2-I8 · ArenaTeaser (light mode)

**What it shows.** Marquee mid-scroll, text `TEST YOUR AG` cropped.

**Key observations.**
- **Marquee text** reads as near-black on cream with subtle soft grid lines visible in the background.
- **Subtitle `BENCHMARKS · HEAD-TO-HEAD · PREDICTION MARKETS`** below the marquee in muted gray.
- **Background grid pattern** more visible in light mode than dark (the grid is a `--dot-color` pattern which has different alpha in each mode).
- **Bottom frame line** is dark.

**Comparison to dark mode.** Dark mode has a radial vignette + soft accent glow behind the marquee. Light mode has a grid pattern instead. Different treatments — confirmed the section respects theme duality.

**Actionable follow-ups.** None.

---

### B2-I9 · Arena Phase 1 — Agent matchmaking grid (light mode)

**What it shows.** Same as B1-I11 — 4 fighter cards in 2x2 with VS badge.

**Key observations.**
- **Left column:**
  - Eyebrow `ARENA · COMING_SOON` (still has underscore — from FIX-30 pending)
  - Title `WATCH AGENTS / COMPETE` in dark display type with `COMPETE` in darker violet
  - Step progression with 01 MATCHMAKING active
  - Body copy in muted gray
- **Right column 2×2 agent grid:**
  - `AGENT · 01` `WRITER PRO` `by ink studio` `91.8`
  - `AGENT · 02` `COPY AGENT` `by Bolt` `86.4`
  - `AGENT · 03` `DEEP RESEARCHER` `by Helix Labs` `94.2` — **the text renders clean and readable** (earlier in dark mode I thought there might be an "RESBARCHER" artifact — not present here, it's clearly "RESEARCHER")
  - `AGENT · 04` `SQL WIZARD` `by Codex Labs` `87.2`
- **VS badge** in violet center.
- **Agent card frames** render as pale-violet-tinted rectangles with dark borders and violet accent outlines on hover states.

**Comparison to dark mode.** Layout and copy identical; palette inverted. Accent violet is more saturated in light mode making the progress bars and VS badge pop.

**Actionable follow-ups.**
- Same `COMING_SOON` underscore issue from Batch 1 FIX-30 — still pending.

---

### B2-I10 · Arena Phase 2 — Execution (stage.monitor cards, light mode)

**What it shows.** Same as B1-I12 — step 02 EXECUTION active, right column showing 3 stacked stage.monitor HudFrame cards.

**Key observations.**
- **Left column body:** `Every run is registered on-chain, sealed inside a TEE, and executed deterministically. The full pipeline is attested and reproducible.`
  - "on-chain" still present — **intentional** per Batch 4 Q15 (keep Arena technical). Confirmed not a bug.
- **Right column 3 stage.monitor cards:**
  - Same `> REGISTER_CHALLENGE`, `> DEPLOY_IN_TEE`, `> EXEC_DETERMINISTIC` underscore issues
  - Same `Writer_pro` / `Copy_agent` / `OUTPUT_READY` issues
  - Stage header shows `[ STAGE.MONITOR ]` · `02 / 03 · EXECUTION` · `REAL_TIME · FUJI` (still `REAL_TIME` with underscore)
- Progress bars are visible (accent violet on card backgrounds).
- `BUILD / SEAL / ATTEST` pills — SEAL is highlighted (active).
- `⬡ TEE · VERIFIED` at the bottom.

**Actionable follow-ups.**
- 🔧 Same FIX-30 snake_case cleanup still pending. Light mode confirms the strings are hardcoded — not theme-dependent.

---

### B2-I11 · Arena Phase 3 — Prediction (light mode)

**What it shows.** Same as B1-I13 — fighter cards with odds.

**Key observations.**
- Left: step 03 PREDICTION active.
- Right:
  - `> PREDICT THE WINNER` header in violet
  - Two fighter cards: `> FIGHTER A` `WRITER PRO` `1.62×` `$842 staked` `STAKE →` and `> FIGHTER B` `COPY AGENT` `2.34×` `$461 staked` `STAKE →`
  - VS badge between
  - `● TOTAL POOL · $1,303 · OPEN` below
- Fighter card backgrounds in light mode are a pale violet tint (different from dark mode's dark fill). Looks like the card background is theme-responsive.
- Odds numbers are big violet display type, very readable.

**Actionable follow-ups.** None — Phase 3 is clean in both modes.

---

### B2-I12 · Trust section — center card hovered (light mode)

**What it shows.** Trust section with headline, body, and 5-card fan with one center card expanded.

**Key observations.**
- **Headline `HOW WE KEEP / AGENTS HONEST`** wraps naturally (my `<br />` removal holds). `HONEST` in darker violet.
- **Body copy:** `An agent has to earn its place. Every listing is verified on sign-up, sealed inside hardware enclaves, and continuously monitored and publicly logged — so users trust the output, not the hype.`
  - **`publicly logged` confirmed** — FIX-29 applied and visible in light mode too. ✅
- **5-card fan:** **IMPORTANT — the cards render as DARK VIOLET in light mode too.** The card backgrounds are intentionally kept dark even when the surrounding page is light. This is a deliberate visual inversion — the cards feel like "console panels embedded in paper." It's the one spot on the site where dark chrome persists in light mode.
- One card is lifted/expanded (hovered or focused state).
- Below the fan: ticker with brand keywords `ATTESTED · DETERMINISTIC · REPLAY · SEALED · HARDWARE · PUBLIC · AUDIT · CONTINUOUS · MONITORING · ZERO TRUST INPUTS · REPUTATION · INDEX` — the ticker label text is violet/accent on light bg.

**Comparison to dark mode.**
- In dark mode (B1-I14): cards are dark violet on black — the cards almost camouflage into the bg.
- In light mode (B2-I12): cards are dark violet on cream — the cards pop dramatically as "dark insets."
- **The light-mode treatment is arguably more interesting visually** because the contrast is inverted from the rest of the page.

**Actionable follow-ups.** None. The trust cards staying dark in light mode is a deliberate design move that works.

---

### B2-I13 · Trust section — rightmost card hovered (light mode)

**What it shows.** Same as B1-I16 — rightmost card expanded.

**Key observations.**
- Cards fan out with the rightmost lifted/tilted forward.
- Card that was being hovered shows a violet crosshair glow.
- Other 4 cards tilt away per `getCardStyle()` logic.
- In light mode, the card drop-shadows are more prominent — they create a clear "lifted from paper" effect.

**Actionable follow-ups.** None.

---

### B2-I14 · ForBuilders section (light mode)

**What it shows.** Same as B1-I17 — builders panel with copy left, code editor right.

**Key observations.**
- **Builders panel background** — a pale violet/lavender tint on cream. The clipped polygon shape is clear.
- **Title `BUILT AN AGENT? / MAKE IT EARN`** wraps naturally (br removed).
- **Body** and **perks list** all legible in muted dark on the pale violet panel.
- **Code editor mockup:**
  - White/light background (`--surface-d`)
  - Dark syntax highlighting (keywords in violet, strings in... hard to tell but colored)
  - Terminal prompts `$ 8004 init deep-researcher`, `→ scaffolding project structure`, etc.
  - Final line `✓ agent live · 8004.network/deep-researcher`
- **`> LIST YOUR AGENT` PillButton** in dark fill — contrasts well against the pale violet panel.

**Actionable follow-ups.** None.

---

### B2-I15 · FinalCTA section (light mode)

**What it shows.** Same as B1-I18 — closing section.

**Key observations.**
- Bottom of ForBuilders builders panel visible above (showing the angled clip-path).
- **Title `STOP SEARCHING / START HIRING`** with `START HIRING` in darker violet accent.
- **Body** in muted gray.
- **Two CTAs:**
  - `● CLAIM YOUR .HUMAN` — filled dark button with violet dot
  - `● LIST YOUR AGENT` — outlined with dark border
- Center-aligned.

**Actionable follow-ups.** None.

---

## Batch 2 — Cross-image notes & summary

### Palette inversion verified end-to-end

All 15 sections render cleanly in light mode. The DESIGN.md dual-theme concept ("light and dark are twins, palette inverts, layout stays") holds. FIX-16 (warm paper bg) and FIX-26 (darker accent) are both visibly applied.

**The one deliberate exception:** Trust section cards stay dark violet even in light mode. This is intentional visual contrast — the cards feel like "HUD console panels embedded in the paper." It works.

### Issues found

| Issue | Light mode severity | Note |
|---|---|---|
| **Arena snake_case labels** (B2-I9, B2-I10) | Same as dark mode | FIX-30 still pending; not theme-dependent |
| **DataIndex empty card art** (B2-I5, I6, I7) | **Worse in light mode** | Empty white rectangles against cream read as "unfinished" more obviously than empty dark rectangles on black. Flag for prioritization if light mode ships before real assets. |
| Status bar legibility in light | Probably fine | Dark mono on cream reads OK at the base 11px, but worth a visual check at mobile/zoom levels |

### Net finding

**The light mode palette is correct and coherent.** Nothing new to fix beyond the already-flagged FIX-30 (arena snake_case cleanup). The only light-mode-specific observation is that the **missing DataIndex card art is more visible in light mode** — not a code bug, but a content delivery priority.

### Open questions

None — user labeled the batch and content is unambiguous.

---

## Batch 3 — Mobile (phone) walkthrough

**Context given by user:** "these for phone"
**Interpretation:** 18 mobile-width screenshots of the same landing sections — appears to be iPhone-ish narrow viewport (roughly 390–420px wide based on the aspect ratio). Light mode is active (cream background visible). Status bar is truncated to `SYS: V1.14 · ARENA: OFFLINE` as expected per FIX-12. A MENU button is visible in the nav — **FIX-01 mobile nav is working**.

**Critical findings:** mobile reveals two significant responsive issues that weren't visible at desktop widths — the **Hero CTAs crop/overflow** and the **Arena section is substantially broken at mobile width** (title cropped, body text overflowing the viewport, stage.monitor cards colliding). The DataIndex chip row (FIX-28) works beautifully and is probably the cleanest part of mobile. Trust, ForBuilders, HowItWorks, FinalCTA all render fine.

---

### B3-I1 · Hero section (mobile)

**What it shows.** Top of landing on a phone viewport.

**Key observations.**
- **Nav shows `MENU` button** — between the wordmark and the `CONNECT` pill. FIX-01 is visibly applied. ✅
- **Wordmark `8004agents | EST 2025 | MENU | CONNECT`** — all 4 elements fit across the top.
- **Status bar at bottom** shows `SYS: V1.14 · ARENA: OFFLINE` — mobile truncation per FIX-12 ✅.
- **Hero eyebrow `● PRE-LAUNCH ALPHA`** with pulsing dot — rendered correctly.
- **Headline** `EXPERT AI AGENTS / FOR ANY JOB` — `EXPERT AI AGENTS` is on one line (nowrap fix holds), `FOR ANY JOB` in accent violet on line 2. Good.
- **Ticker row** shows `[:LSE BROWSE SPECIALIST AGENTS BUILT B` — mid-scroll truncated text, fine since the ticker is scrolling.
- **🔧 CRITICAL ISSUE — Hero CTAs are cropped/overflowing the hero frame.** I see `IM YOUR .HUMAN` and `IND AGENTS` instead of `CLAIM YOUR .HUMAN` and `FIND AGENTS`. The buttons are either:
  - Overflowing the hero frame container horizontally, with `overflow: hidden` on the frame clipping the button text, OR
  - The hero-frame's `__row` layout (which puts ticker + buttons side-by-side on desktop) is still trying to fit all three elements in a row at mobile width, causing the buttons to be pushed off the left edge.

**Actionable follow-ups.**
- 🔧 **Hero CTA mobile overflow is a real bug.** The `hero-frame__row` layout needs to stack ticker + buttons vertically below ~500px viewport, OR the buttons need their own container that wraps to a new line on narrow widths. See the cross-image notes at the end of this batch for proposed fix.

---

### B3-I2 · How It Works (mobile, top view)

**What it shows.** HowItWorks section start — section eyebrow, title, body, CTA, and the tail of the live-activity ticker at top.

**Key observations.**
- **Live activity ticker** visible at the top showing `VAULT · UI AGENT HIRED 12 TIMES IN TH…` — mid-scroll crop, fine.
- **Eyebrow `● HOW IT WORKS`** with pulsing dot in violet.
- **Title `THREE STEPS / ZERO FRICTION`** — stacks properly, `ZERO FRICTION` in accent.
- **Body:** "Find an agent that fits your task, set a budget, and start the work. You only pay for what you use — anything left over stays with you." Wraps cleanly across 4–5 lines.
- **CTA `START NOW`** as an outlined pill button.

**Visible design elements.** Left column collapses to full-width on mobile, single column stack.

**Comparison to audit work.** Mobile responsive stacking works fine here — no overflow.

**Actionable follow-ups.** None.

---

### B3-I3 · How It Works (mobile, cards scroll)

**What it shows.** The 3 bento cards stacked vertically — `01 SEARCH FOR WHAT YOU NEED` visible in full, `02 APPROVE A BUDGET` partially visible below.

**Key observations.**
- **Cards are stacked 1-per-row** on mobile (correct — the bento grid from `grid-cols-3` or similar collapses to 1 col).
- **Card structure preserved:** big violet `01` / `02` number, title, body.
- **HudFrame angled corners** visible on each card.

**Actionable follow-ups.** None.

---

### B3-I4 · Payments section (mobile, title + first cover)

**What it shows.** Section title and the first cover card.

**Key observations.**
- **Breadcrumb/eyebrow `● > PAYMENTS`** at the top — the eyebrow pulsing dot renders.
- **Title `PAY HOWEVER / YOU WANT.`** with `YOU WANT.` in accent.
- **Hint `[ ALL METHODS SUPPORTED ]`** below the title.
- **Cover card 01** with crosshair art, `// PLACEHOLDER` label inside the art, `01` number top-left.
- **Observation:** the art has `// PLACEHOLDER` text inside it — that's visible on the cover card mid-art. I didn't touch this earlier — it's embedded in the `.pay-cover__art` or similar. It's clearly a placeholder string. Flag below.

**Actionable follow-ups.**
- Minor: there's a `// PLACEHOLDER` text visible inside the cover art. Remove it or replace with actual art labels. Not a user-facing error, but it's confusing vocab (literally the word "placeholder" on a production-facing page). Flag for cleanup.

---

### B3-I5 · Payments section (mobile, cover cards stacked)

**What it shows.** Covers 02 and 03 stacked.

**Key observations.**
- Cards stack 1-per-row on mobile (per the `@media (max-width: 540px)` rule in globals.css).
- Each cover card shows its crosshair art with the `// PLACEHOLDER` label inside.
- The spacing between covers looks correct.

**Actionable follow-ups.** Same `// PLACEHOLDER` issue.

---

### B3-I6 · Payments section (mobile, cover 04 + option detail 01 transition)

**What it shows.** Cover card 04 at top, then the options list begins below with `01 CARD OR STABLECOIN` detail.

**Key observations.**
- **Mobile UX disconnect:** covers render as 4 vertically stacked art cards, then options render as 4 vertically stacked detail cards BELOW them. The user scrolls through 4 nearly-identical violet-crosshair cards, then 4 text-heavy detail panels, and has to correlate them mentally by number.
- **On desktop** the covers and options are side-by-side or in grid alignment so the correlation is spatial.
- **On mobile** the correlation breaks — hover-to-switch doesn't work on touch either.

**Actionable follow-ups.**
- 🔧 **Payments mobile flow is a real UX issue.** The disconnected cover-then-options stack doesn't work the same way the desktop hover-switcher does. Options (in rough priority order):
  1. On mobile, interleave each cover art with its option detail (cover 01 art → 01 detail → cover 02 art → 02 detail → …) so each pair is adjacent.
  2. On mobile, drop the cover arts entirely and render only the 4 option details as simple cards with titles + bodies (most aggressive simplification).
  3. On mobile, make the covers tappable to scroll to the matching detail (complex, least clean).
- I'd recommend option 2 (drop covers on mobile, keep options as cards) — matches the simpler mobile-chip approach taken in FIX-28 for DataIndex.

---

### B3-I7 · Payments section (mobile, options list)

**What it shows.** All 4 option details stacked vertically: `01 CARD OR STABLECOIN`, `02 PAY BY THE CALL`, `03 PRE-APPROVE A BUDGET`, `04 NO SIGNUP, NO ACCOUNTS`.

**Key observations.**
- Option cards stack cleanly with number badge + title + body.
- Each option is readable.
- Numbers on the options don't connect to the cover arts above visually.

**Actionable follow-ups.** Same as B3-I6.

---

### B3-I8 · DataIndex mobile chip row — FIX-28 CONFIRMED ✅

**What it shows.** The mobile chip-row version of the DataIndex section.

**Key observations.**
- **Eyebrow `● > DATA INDEX`** with pulsing dot at top.
- **Title `BROWSE THE / SPECIALIST INDEX`** stacks clean (multi-line but natural wrap), `SPECIALIST INDEX` in accent.
- **2×3 chip grid** with 6 tappable chips: `RESEARCH | CODE`, `CONTENT | DATA`, `DESIGN | FINANCE`.
- **Each chip is a centered uppercase mono label** inside a cream outlined rectangle.
- **Hit targets look generous** — each chip is roughly half the viewport width × 50px height.
- **No empty art slots** (unlike the desktop parallax) — the chip row replaces them entirely on mobile.

**Comparison to audit work.**
- **FIX-28 is visibly working.** ✅
- The empty-card-art issue flagged in Batches 1 and 2 is **irrelevant on mobile** — mobile users never see the parallax cards at all, they just see the chip grid.

**Actionable follow-ups.** None. This is arguably the cleanest mobile section on the page.

---

### B3-I9 · Arena teaser (mobile)

**What it shows.** Arena teaser marquee mid-scroll showing `T YOUR AGE` truncated.

**Key observations.**
- **Marquee works** at mobile width — the horizontal scroll loop is unaffected.
- **Subtitle `BENCHMARKS · HEAD-TO-HEAD · PREDICTION MARKETS`** wraps to 2 lines on mobile.
- **Background grid** faintly visible behind the marquee.

**Actionable follow-ups.** None.

---

### B3-I10 · Arena section Phase 1 (mobile) — 🔧 BROKEN

**What it shows.** Arena story Phase 1 trying to render on mobile.

**Key observations.**
- **Eyebrow `● ARENA · COMING_SOON`** — still has underscore (FIX-30 pending, confirmed across themes/viewports).
- **Title `WATCH AGENTS / COMPE`** — **the word `COMPETE` is cropped at the right edge.** The accent word is cut off.
- **Step progression** `01 MATCHMAKING`, `02 EXECUTION`, `03 PREDICTION` visible on the left, but `02` and `03` have overlapping labels with the body text to their right.
- **Body text under active step:** `Agents are paired head-to-head / identical tasks — same inputs, / clock, same constraints. No ch / picking, no hand-tuned demos.` — **every line is cropped at the right edge.** "head-to-head" shows without "on", "identical tasks" without "same", "clock" without "same", "No ch" without "erry-".
- **Below the body:** a stage.monitor card showing `ARENA PREDI OTON` — this is actually "ARENA PREDICTION" cropped, BUT this should be the Phase 1 MATCHMAKING view not PREDICTION — there's a layout bug where phases are overlapping OR the mobile view is rendering a different phase than the step indicator says.
- **`WRITER PRO` agent name** visible on a card inside the stage.monitor section.
- **`[STAGE MONITOR]` label** visible with `01 / 03 · MATCHMAKING` sub-label.
- **The whole right column (stage.monitor)** appears to be rendering on top of / overlapping the left column (title + body) — the layout is confused.

**Root cause (inferred from code):**
- `arena-section.tsx` uses a desktop-first two-column layout. The left column has the step progression and body; the right column has the scroll-driven stage.monitor + agent cards + prediction cards.
- On mobile the two columns appear to be colliding — either because the grid doesn't collapse to 1 column, or because the sticky-scroll math is calculating positions based on desktop dimensions and overlapping.
- I did NOT audit or fix Arena's mobile layout in any of my fix batches. It's broken out of the box.

**Actionable follow-ups.**
- 🔧 **CRITICAL — Arena section is broken on mobile.** Needs a dedicated mobile layout. Options:
  1. **Full mobile fallback** (analogous to FIX-28 for DataIndex): detect mobile and render a simplified version — title + 3-step summary + "Coming soon" card. Skip the full sticky-scroll story on mobile.
  2. **Stack columns**: convert the `grid-cols-[1fr_1fr]` (or whatever CSS Grid the desktop uses) to a single column on mobile, with the left column content on top and the right column stage.monitor stacked below. This is more work because the scroll-driven phase transitions need to still work in a single-column mode.
  3. **Hide section on mobile**: `display: none` below 820px. Most aggressive. Loses the hook on mobile entirely.
- My recommendation: **Option 1 (simplified mobile version)**. It matches the pattern we already established with FIX-28 for DataIndex. The Arena story is too complex to shoehorn into a narrow viewport.

---

### B3-I11 · Arena Phase 2 (mobile) — 🔧 also broken

**What it shows.** Arena Phase 2 Execution.

**Key observations.**
- Same layout overlap issue as B3-I10.
- **Body text:** `Every run is registered on-cha / sealed inside a TEE, and execu / deterministically. The full pi / is attested and reproducible` — every line cropped at the right edge.
- Stage.monitor card showing `$ arena register → task: "write 200w fintech hero"` with `WRITING / CODE / RESEARCH` option pills — but the card is overlapping with the body text.
- `STAGE MONITOR 02 / 03 · REAL` — label cropped at right edge.
- Phase is labeled `EXECUTION` active.

**Actionable follow-ups.** Same as B3-I10 — same root cause.

---

### B3-I12 · Arena Phase 3 (mobile) — 🔧 also broken

**What it shows.** Arena Phase 3 Prediction.

**Key observations.**
- Title still `WATCH AGENTS / COMPE` (cropped).
- Steps: `01 MATCHMAKING`, `02 EXECUTION`, `03 PREDICTION` (active).
- **Body:** `Spectators stake on outcomes b / the match resolves. Odds move / payouts settle on verifiable / a real mark for agent ski` — every line cropped.
- **Right column** trying to show `> PREDICT THE WINNER` + fighter cards, but only `1.62x` is visible (the Writer Pro odds) — everything else is cut off or overlapping.
- `STAGE MONITOR · 03 / 03 PREDICTION` — visible but cramped.

**Actionable follow-ups.** Same as B3-I10 and I11.

---

### B3-I13 · Trust section (mobile, hero view)

**What it shows.** Top of Trust section with headline + body + the first card appearing below.

**Key observations.**
- **Eyebrow `● TRUST · LAYER`** with pulsing dot.
- **Title `HOW WE KEEP AGENTS / HONEST`** — note this wraps differently than in dark/light desktop; on mobile `HOW WE KEEP AGENTS` is on line 1 and `HONEST` on line 2 alone. The natural wrap is driven by container width. `HONEST` accent is clear and load-bearing.
- **Body:** `An agent has to earn its place. Every listing is verified on sign-up, sealed inside hardware enclaves, and continuously monitored and publicly logged — so users trust the output, not the hype.`
  - ✅ **FIX-29 "publicly logged" confirmed in mobile light mode.**
- **First trust card** visible at the bottom of the viewport — a dark violet card with crosshair art. One of the cards is starting the stack.

**Actionable follow-ups.** None for this view.

---

### B3-I14 · Trust section (mobile, cards stack)

**What it shows.** Multiple trust cards stacked vertically below the headline area. Visible: `02 · PROOF ON-CHAIN PROOF`, `03 · MONITOR LIVE MONITORING`, `04 · AUDIT PUBLIC AUDIT`.

**Key observations.**
- **Trust cards stack 1-per-row on mobile** — per the `@media (max-width: 820px) { .trust-v2__cards { flex-wrap: wrap; ... } }` rule in globals.css. Cards wrap cleanly.
- **🔍 Observation — the card title for card 02 still reads `ON-CHAIN PROOF`.** The Batch 4 FIX-29 rewrote the section BODY COPY to drop "on-chain" but the **individual card titles** in the `CARDS` array still include `On-Chain Proof`. The user's explicit ask was body copy; I didn't touch the card titles. But for consistency with the "plain English on hirer surfaces" intent, this might be worth a follow-up.
- **Cards visible:** 02 `On-Chain Proof`, 03 `Live Monitoring`, 04 `Public Audit`. Card 01 `Sealed Execution` and 05 `Reputation Index` are above/below the current viewport.
- **Each card shows:** tag badge `[ 02 · PROOF ]` at top, crosshair art with the `// PLACEHOLDER` text inside, title at the bottom.
- **Dark violet card treatment preserved in light mode** — the cards stay dark even on the cream background. Same observation as B2-I12.

**Actionable follow-ups.**
- Minor: `On-Chain Proof` card title still contains "on-chain". Not strictly wrong — FIX-29 scope was body copy only per user's exact answer — but inconsistent with the spirit. Flag as a small follow-up only IF the user wants full consistency.
- Same `// PLACEHOLDER` text visible inside every card art — needs to go.

---

### B3-I15 · Trust → ForBuilders transition (mobile)

**What it shows.** Bottom of Trust section (tail of the brand keyword ticker `REPUTATION · INDEX · TEE`) transitioning into the ForBuilders eyebrow.

**Key observations.**
- The trust ticker (brand keywords scrolling) is visible at the bottom of the trust section.
- **ForBuilders eyebrow `● FOR BUILDERS`** with pulsing dot.
- **Title partial:** `BUILT AN / AGENT? MAKE IT / EARN` — hmm actually at this crop it's `BUILT AN AGENT? MAKE IT EARN` wrapping across several lines on the mobile panel.
- **Body start:** `Think Shopify, but for AI agents. Register your agent, set your prices, and we route paying traffic to your`

**Actionable follow-ups.** None for the transition itself.

---

### B3-I16 · ForBuilders section (mobile, body + perks)

**What it shows.** ForBuilders panel with body copy and the perks grid.

**Key observations.**
- **Title `BUILT AN AGENT? MAKE IT EARN`** wraps across 2–3 lines on mobile naturally.
- **Body full:** "Think Shopify, but for AI agents. Register your agent, set your prices, and we route paying traffic to your endpoint. You host. We handle discovery, billing, and trust."
- **Perks 2-column list:**
  - `+ PER-CALL OR SUBSCRIPTION` · `+ AUTO-PAYOUTS`
  - `+ REPUTATION BUILT-IN` · `+ A2A STANDARD`
  - Renders as a 2-col grid even on mobile (no forced 1-col collapse — probably fine, but verify legibility at very narrow widths).
- **CTA `+ LIST YOUR AGENT`** visible at the bottom.
- **Builders panel** has the pale violet tint background and clipped angled corners.

**Actionable follow-ups.** None.

---

### B3-I17 · ForBuilders code editor (mobile)

**What it shows.** The code editor mockup stacks below the builders panel body on mobile.

**Key observations.**
- Full-width code editor pane with terminal chrome: `● ● ●` traffic lights, `SHELL` tab, `AGENT.TOML` tab, line numbers, syntax-highlighted terminal commands.
- **Content:**
  - `# scaffold a new agent and deploy it`
  - `$ 8004 init deep-researcher`
  - `→ scaffolding project structure`
  - `→ generating agent.toml`
  - `→ creating Circle wallet`
  - `$ 8004 deploy --network fuji`
  - `→ verifying endpoint`
  - `→ minting identity NFT (sponsored)`
  - `→ listing to marketplace`
- **Footer bar:** `READY | UTF-8 | LF | SHELL | 8004 | V1.14`
- **Legible** at mobile width — text is readable, syntax colors are visible.

**Actionable follow-ups.** None. Code editor works well on mobile.

---

### B3-I18 · Final CTA (mobile)

**What it shows.** Closing section.

**Key observations.**
- **Title `STOP SEARCHING / START HIRING`** with `START HIRING` in accent gradient. Stacks cleanly.
- **Body:** "Find an expert AI for any job in seconds. Pay only for what you use. No signup required."
- **Two CTAs stacked vertically:**
  - `CLAIM YOUR .HUMAN` (filled dark button, full width)
  - `LIST YOUR AGENT` (outlined, full width)
- Center-aligned.

**Actionable follow-ups.** None.

---

## Batch 3 — Cross-image notes & summary

### What's visibly working on mobile ✅

- **FIX-01 mobile nav** — `MENU` button present in every top-of-page screenshot
- **FIX-12 status bar mobile truncation** — only `SYS: V1.14` and `ARENA: OFFLINE` visible, per user's Batch 1 confirmation
- **FIX-28 DataIndex chip row** — 2×3 grid of 6 labeled chips, clean and functional. Cleanest section on mobile.
- **Terminal voice cleanup** — `● PRE-LAUNCH ALPHA`, `● HOW IT WORKS`, `● > PAYMENTS`, `● > DATA INDEX`, `● TRUST · LAYER`, `● FOR BUILDERS` all render with pulsing dots.
- **FIX-29 trust body "publicly logged"** — visible on mobile light mode.
- **EXPERT AI AGENTS nowrap** — holds at mobile width, stays on one line.
- **Trust card mobile wrap** — 5 cards stack cleanly in single column via the 820px media query.
- **HowItWorks, ForBuilders, FinalCTA** — all respond cleanly, no layout issues.
- **Live activity ticker** — scrolls at mobile width without breaking.

### Issues found — mobile only

#### 🔧 CRITICAL — Hero CTAs crop at mobile width (B3-I1)

The two hero CTAs `CLAIM YOUR .HUMAN` and `FIND AGENTS` are cropping at the left edge of the hero frame — visible as `IM YOUR .HUMAN` and `IND AGENTS`. The `hero-frame__row` layout tries to keep the ticker and button group side-by-side, which doesn't fit at narrow widths.

**Proposed FIX-31:** Edit `globals.css` `.hero-frame__row` to switch from horizontal flex to vertical stack below ~600px viewport. Ticker goes first, CTAs on their own row below.

```css
@media (max-width: 600px) {
  .hero-frame__row {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  .hero-frame__btns {
    flex-direction: column;
    width: 100%;
  }
}
```

XS effort. Single media query block.

#### 🔧 CRITICAL — Arena section is substantially broken on mobile (B3-I10, I11, I12)

Title cropped, body text overflowing the viewport at every line, left column and right stage.monitor column visually colliding. The desktop-first two-column scroll-driven story doesn't respond to mobile.

This is the single biggest responsive issue on the site. Options in priority order:

**Proposed FIX-32 (recommended):** Arena section mobile fallback. On viewports ≤820px, render a simplified version:
- Title + accent
- 3 static cards (one per phase: Matchmaking / Execution / Prediction) with phase title + body text
- A single `> COMING SOON` label
- Drop the sticky scroll, drop the stage.monitor animation, drop the agent grid, drop the prediction market cards

This matches the pattern established by FIX-28 for DataIndex. Desktop keeps the signature experience; mobile gets the essential story. ~1-2 hours work in `arena-section.tsx` + some CSS.

**Alternative — FIX-32b:** Fix the existing two-column layout to collapse properly to single column below 820px. More complex because the scroll-driven phase transitions need to work in single-column mode — the sticky-scroll math calculates positions based on viewport dimensions.

**Alternative — FIX-32c:** Hide Arena entirely on mobile (`display: none`). Most aggressive. Loses the feature hook but unblocks ship.

#### 🔧 Payments mobile UX (B3-I4 through B3-I7)

On mobile, the 4 cover cards and the 4 option details are rendered as two separate vertical stacks. Users scroll through 4 nearly-identical crosshair covers, then 4 detail panels below — the correlation between them (which desktop makes obvious via hover + spatial alignment) is broken.

**Proposed FIX-33:** On mobile (≤820px), drop the cover art row entirely and render only the option details as 4 standalone cards with their number + title + body. Matches the FIX-28 simplification pattern. Small effort.

OR: interleave covers and options so each pair sits adjacent on mobile (cover 01 → detail 01 → cover 02 → detail 02 → …). Requires restructuring the payments-section component.

#### 🔧 `// PLACEHOLDER` text visible inside every card art slot

The payments cover cards (B3-I4, I5, I6) and the trust cards (B3-I14) all show `// PLACEHOLDER` text inside the art area. This is clearly a literal string in the component code or CSS content, not a comment.

**Proposed FIX-34:** Grep `// PLACEHOLDER` across the repo and remove the string from whatever renders it. Likely in the `.pay-cover__art` pseudo-element or similar.

#### 🔍 `On-Chain Proof` trust card title still contains "on-chain" (B3-I14)

Not strictly a bug — FIX-29 scope was trust section body copy per user's explicit Batch 4 answer. But for consistency with "plain English on hirer surfaces," the card title `On-Chain Proof` arguably should also go.

**NOT proposing as a fix** — this is outside the scope of Batch 4 and needs a user decision. Flagged only.

### Issues carrying over from Batches 1 & 2

- **FIX-30 arena snake_case cleanup** — still pending. Visible on mobile too (`COMING_SOON`, `STAGE.MONITOR`, etc.). Theme/viewport-independent.
- **DataIndex empty card art** — **actually irrelevant on mobile** because FIX-28 chip row replaces the cards. Only a desktop concern now.

### Mobile-specific follow-ups, ranked by priority

| Priority | FIX | Issue | Effort |
|---|---|---|---|
| 🔥 Critical | FIX-32 | Arena section broken on mobile | M–L |
| 🔥 Critical | FIX-31 | Hero CTA overflow on mobile | XS |
| High | FIX-33 | Payments mobile UX disconnect | S |
| Medium | FIX-34 | `// PLACEHOLDER` text in art slots | XS |
| Medium | FIX-30 | Arena snake_case labels (carries from Batch 1) | XS |
| Low | (flagged) | `On-Chain Proof` card title consistency | Needs user call |

### What I still can't verify

- Keyboard focus rings on mobile (even less relevant — no keyboard on touch devices, but external keyboards on tablets exist).
- Trust card tap-to-expand interaction (FIX-27) in action — static screenshots show stacked cards but not the interaction.
- Animation cadences.

### Open questions

None — batch is clear.

---

_Awaiting batch 4 (or specific fixes to land)._
