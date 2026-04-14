# Project Memory — 8004agents

> Source of truth for hero + section drafts. All decisions captured here.

---

## 1. What it is (one sentence)
A place to find an expert AI agent for any job, pay only for what you use, and trust that it works. For builders, it's like Shopify for AI agents — list your agent, set your prices, get paid when people use it.

## 2. Audiences
- **A — Hirers (non-technical):** people who need work done by an AI but don't want to build it.
- **B — Developers:** building apps that need to call out to specialized agents.
- **C — Agent builders:** want a storefront, plans, and payouts without running their own infra.
- **Launch focus:** **demand-led** (Amazon model — users first, listings follow).

## 3. Problem
The agent ecosystem is fragmented:
- Users can't find the right specialist agent.
- Agents can't discover other agents to compose with.
- Even when found, no way to verify if it's any good.

8004agents = single discovery + trust + payment layer.

## 4. How it works

### Hire flow (users)
1. Search for the agent you need.
2. Filter by maker, reputation, # of users, price.
3. Select an agent.
4. Approve a stablecoin amount for the session.
5. Use the agent — chat, upload, whatever. Output streams back.
6. Cost is metered out of the approved amount as you go. Unused stays with you.

### Build flow (builders)
1. Register on the platform.
2. Create your A2A card (agent manifest) and upload it.
3. 8004 verifies endpoints + card.
4. Whitelist 8004's domain so traffic can route to your server.
5. 8004 monitors uptime, performance, ratings.
6. Set pricing: free trial calls, per-call, day pass, subscriptions, mix. 8004 helps suggest plans.
7. 8004 routes user traffic to your server. You host. 8004 handles discovery + billing + trust.

## 5. Trust & verification
All of:
- On-chain reputation (ERC-8004 reputation registry).
- User ratings after each job.
- **Arena** — see section 6.
- Endpoint + card verification at listing.
- Continuous monitoring after listing.

## 6. Arena (this is a hook — feature it)
Three things in one:
- **Benchmarks** — agents tested against standard tasks, scored, ranked on a leaderboard.
- **Head-to-head matches** — same prompt to two agents, users vote (LMSYS Chatbot Arena style).
- **Prediction market** — users can bet on which agent will win an upcoming match.

Currently `OFFLINE`. When live, this is one of the most marketing-friendly features on the site.

## 7. Pricing
- Set by builder. Free trial calls / per-call / day pass / subscriptions / mixed.
- **Card** (Visa/Mastercard/Apple Pay → auto-converts to USDC) **and stablecoins direct** (USDC).
- **Session model:** user pre-approves an amount; cost is metered as they use; unused stays.
- 8004 takes a cut. (Internal — not on the page.)

## 8. Differentiators
- vs. **ChatGPT:** specialist agents per task, ranked by real performance — not one general model.
- vs. **Fiverr:** instant, machine-speed, micropayment-priced.
- vs. **building it yourself:** discovery + trust + payments solved out of the box.
- vs. **closed agent stores (GPT Store, etc.):** open standard, builders own their stack, 8004 just routes.
- vs. **Zapier / no-code:** you don't wire up workflows; you hire an agent that already knows the job.

## 9. Stage
- Pre-launch but functional.
- **Hire side:** waitlist + 1–2 free calls on listed agents.
- **Build side:** builders can register and deploy today.
- Agents listed: small but growing — avoid hard numbers in copy until real.

## 10. Site structure (nav map)
| Nav item | What it is | Audience |
|---|---|---|
| **HOME** | Demand-side landing (hirers) | A + B |
| **DEPLOY** | Build-side landing (Shopify-for-agents pitch) | C |
| **AGENTS** | The marketplace itself — browse, search, filter | A + B |
| **ARENA** | Benchmarks + head-to-head + prediction market | All |
| **EXPLORER** | Blockchain-explorer-style view of agents, users, reputation, payments | All (tech-curious) |
| **DOCS** | Docs | B + C |

## 11. Brand voice — calibrated
- **Lean AI, not blockchain.** Stablecoins are framed as **"instant payments"** or **"pay by the call"** — not as "crypto" or "web3."
- **ERC-8004 / A2A:** kept **quiet**. Footer badge + a single line on `/deploy`. Not on the homepage hero.
- **Plain English on hirer surfaces.** Verbs: find, hire, pay, use, browse, try.
- **Slightly technical on builder surfaces.** A2A, endpoint, manifest are fine on `/deploy`.
- **Brand mark sprinkles allowed:** `// SECTION_NAME` eyebrows, uppercase mono labels, status footer — these are visual signature, not user-facing copy.

## 12. Avoid
- "KYC", "decentralized", "on-chain" as headline words.
- "Deploy" as a CTA on the hirer side.
- Hard agent counts before they're real.
- Crypto-bro tone. We're building a marketplace; stablecoins are a payment rail.

## 13. Page goal
- **Primary CTA:** hire / try a free call → joins waitlist for full access.
- **Secondary CTA:** list your agent → goes to `/deploy`.
- **Success metric:** hirer waitlist signups + builder registrations.

---

## Landing page section list (HOME) — as currently shipped

> Reflects what `app/page.tsx` actually renders today. An earlier draft of this
> spec listed "Browse by category" and "Featured agents" as separate sections;
> both are intentionally absent from the current render — the former replaced
> by the `DataIndexSection` parallax carousel (#5 below), the latter deferred
> until real named agents exist on the platform.

| # | Section | Purpose | One-line description |
|---|---|---|---|
| 1 | **Hero** | Hook + 2 hirer CTAs | "Expert AI agents for any job." Primary: `CLAIM YOUR .HUMAN` → /agents (pre-launch handle reservation / waitlist). Secondary: `FIND AGENTS` → /agents (browse marketplace). Builder CTA intentionally absent — lives in ForBuilders + FinalCTA. HUD-style frame with glow + glitch effects. |
| 2 | **Live activity bar** | Proof | Scrolling marquee of live network events — new listings, completed jobs, Arena match countdowns, builder payouts. |
| 3 | **How hiring works** | Comprehension | Three steps with spotlight bento: Search → Approve Budget → Use & Rate. Plain English. |
| 4 | **Pay your way** | Payment friction killer | Card or stablecoin. Pay per call. Pre-approve a budget. Interactive cover-card switcher. |
| 5 | **Specialist index** (`DataIndexSection`) | Discovery | Sticky parallax carousel of 6 agent categories: Research, Code, Content, Data, Design, Finance. Each links into the marketplace. Stacks vertically on mobile. |
| 6 | **Arena teaser** | Wow factor (lead-in) | High-impact marquee transition — "Test your agent in the Arena." |
| 7 | **Arena (story)** | Wow factor (depth) | Sticky-scroll experience walking through Matchmaking → Execution (sealed TEE) → Prediction market phases. Currently `COMING_SOON`. |
| 8 | **Trust layer** | Objection handling | "How we keep agents honest." Five-card hover fan: Sealed Execution (TEE), On-Chain Proof, Live Monitoring, Public Audits, Reputation Index. |
| 9 | **For builders (sliver)** | Cross-sell to supply side | "Built an agent? Make it earn." Interactive code-editor mockup. CTA → `/deploy`. |
| 10 | **Final CTA** | Conversion | "Stop searching / Start hiring." Primary: `Claim your .human` → /agents. Secondary: `List your agent` → /deploy. |
| — | **Footer / status bar** | Persistent chrome | Fixed bottom status bar — system version, live count, Arena status, chain info. Rendered from `app/layout.tsx`, stays across all pages. |

---

## File plan
- `project.md` ← this file (memory)
- `hero.md` ← Section 1 spec (drafted next, on your "finalize" command)
- `section-02-live-bar.md` ... `section-11-footer.md` ← drafted in order, one at a time, on your command