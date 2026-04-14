# 8004agent.network — Project Tree & Knowledge Graphs

> Quick-reference map of the entire codebase. Ctrl+F to jump to any file, component, route, or API endpoint.

---

## Project Tree

```
8004agent.network/
│
├── app/                              # Next.js 16 App Router
│   ├── layout.tsx                    # Root: ThemeProvider → WalletProvider → Navbar + StatusBar
│   ├── globals.css                   # HSL color tokens, custom cursor, halftone, scrollbar
│   ├── page.tsx                      # / — Landing page (renders HomeLayout)
│   ├── agents/page.tsx               # /agents — Marketplace: search, filter, paginate
│   ├── arena/page.tsx                # /arena — Benchmarks, head-to-head, leaderboard (OFFLINE)
│   ├── dashboard/page.tsx            # /dashboard — My agents, hires, balance, withdraw
│   ├── deploy/page.tsx               # /deploy — 7-step agent deployment wizard
│   ├── docs/page.tsx                 # /docs — Placeholder
│   ├── explorer/page.tsx             # /explorer — Placeholder
│   ├── hire/page.tsx                 # /hire — Plan selection, chain picker, payment
│   └── workspace/page.tsx            # /workspace — Chat interface with hired agent
│
├── components/
│   ├── landing/                      # Homepage sections (rendered order, top → bottom)
│   │   ├── home-layout.tsx           #   Orchestrator: wraps all sections
│   │   ├── scroll-context.tsx        #   React Context for scroll state (orphaned after section-deck removal — candidate for cleanup)
│   │   ├── hero-section.tsx          #   CTAs: CLAIM YOUR .HUMAN + FIND AGENTS. HudFrame + phosphor + hero-glitch
│   │   ├── live-activity-section.tsx #   Marquee of live network events (glass strip)
│   │   ├── how-it-works-section.tsx  #   3-step bento: Search → Approve → Use
│   │   ├── payments-section.tsx      #   Card or stablecoin. 4-cover hover switcher + option grid
│   │   ├── data-index-section.tsx    #   "Specialist Index" — parallax sticky category carousel
│   │   ├── arena-teaser-section.tsx  #   Marquee lead-in ("TEST YOUR AGENT IN THE ARENA")
│   │   ├── arena-section.tsx         #   Arena story — sticky-scroll match → execution → prediction
│   │   ├── trust-section.tsx         #   "How we keep agents honest" — 5-card hover fan
│   │   ├── for-builders-section.tsx  #   Builder pitch + code editor mockup
│   │   └── final-cta-section.tsx     #   "Stop searching / Start hiring" — Claim your .human + List your agent
│   │
│   ├── ui/                           # Reusable UI primitives
│   │   ├── button.tsx                #   CVA button (default/destructive/outline/secondary/ghost/link)
│   │   ├── glass-button.tsx          #   Glassmorphism button
│   │   ├── interactive-hover-button.tsx  # Hover-animated button
│   │   ├── pixel-button.tsx          #   Retro pixel-style button
│   │   ├── retro-pixel-button.tsx    #   Pixel button variant
│   │   ├── ripple-button.tsx         #   Click-ripple button
│   │   ├── terminal-card.tsx         #   Terminal-bordered card with [ ] corners
│   │   ├── pixel-corner-frames.tsx   #   Decorative corner brackets (global)
│   │   ├── shiny-text.tsx            #   Animated shiny gradient text
│   │   ├── scramble-text.tsx         #   Random char scramble
│   │   ├── decrypt-text.tsx          #   Decrypt reveal animation
│   │   ├── typewriter-text.tsx       #   Typing effect
│   │   ├── hyper-text.tsx            #   Hover character shuffle
│   │   ├── grid-pattern.tsx          #   SVG background grid
│   │   ├── cursor-glow.tsx           #   Mouse-follow glow
│   │   ├── scroll-indicator.tsx      #   Scroll progress indicator
│   │   ├── layout-grid.tsx           #   Grid overlay
│   │   ├── pixel-blast.tsx           #   WebGL 3D pixel explosion (737 LOC)
│   │   ├── pixel-assemble.tsx        #   Pixel assembly animation
│   │   ├── pixel-confetti.tsx        #   Pixel confetti effect
│   │   ├── agent-topology.tsx        #   Network graph visualization
│   │   ├── cubes.tsx                 #   Three.js rotating cubes (378 LOC)
│   │   ├── brain-icon.tsx            #   Animated brain SVG
│   │   ├── bot-icon.tsx              #   Bot SVG icon
│   │   ├── rocket-icon.tsx           #   Rocket SVG icon
│   │   ├── moon-icon.tsx             #   Moon SVG icon
│   │   ├── sun-dim-icon.tsx          #   Sun SVG icon
│   │   └── waypoints-icon.tsx        #   Waypoints SVG icon
│   │
│   ├── layout/
│   │   ├── navbar.tsx                #   Fixed top nav (6 items, responsive)
│   │   └── status-bar.tsx            #   Bottom bar: version, live agents, arena
│   │
│   ├── transitions/                  # Page transition animations
│   │   ├── FadeWithScale.tsx
│   │   ├── GridFadeIn.tsx
│   │   ├── PixelDissolve.tsx
│   │   ├── ScanlineWipe.tsx
│   │   ├── SlideWithBlur.tsx
│   │   └── VerticalWipe.tsx
│   │
│   ├── theme-provider.tsx            # Dark/Light/System theme context
│   └── wallet-provider.tsx           # MetaMask wallet context + signer
│
├── lib/                              # Utilities, API client, blockchain
│   ├── api.ts                        # All backend fetch calls + types (296 LOC)
│   ├── deploy-constants.ts           # Chain configs, contract ABIs (406 LOC)
│   ├── facinet.ts                    # Facilitator network: sponsored tx
│   ├── erc8128Client.ts              # ERC-8128 request signing (wallet auth)
│   ├── dashboard.ts                  # Reputation & balance RPC queries
│   └── utils.ts                      # cn() + navigateTo()
│
├── hooks/
│   └── use-text-scramble.ts          # Text scramble animation hook
│
├── public/                           # Static assets
│   ├── art/                          # Illustrations
│   ├── logos/                        # Brand logos
│   ├── socials/                      # Social media icons
│   ├── hero-hand*.png                # Hero artwork
│   ├── cursor-*.svg                  # Custom cursors
│   └── grid.svg                      # Grid background
│
├── package.json                      # Bun, Next 16, React 19, Ethers 6, Three.js, GSAP
├── next.config.mjs                   # SSG export, ignoreBuildErrors
├── tailwind.config.js                # Custom HSL palette, animations
├── tsconfig.json                     # Strict, path alias @/*
├── PROJECT.md                        # Product spec & decisions
└── DESIGN.md                         # Design system & UI guidelines
```

---

## Frontend Knowledge Graph

### Page → Component Hierarchy

```
app/layout.tsx
├── ThemeProvider
├── WalletProvider
├── Navbar ─────────────── components/layout/navbar.tsx
├── PixelCornerFrames ──── components/ui/pixel-corner-frames.tsx
├── [Page Content] ──────── (routed below)
└── StatusBar ──────────── components/layout/status-bar.tsx


/ (Landing)
└── HomeLayout ──── components/landing/home-layout.tsx
    ├── HeroSection ──────────── HudFrame, HudButton, phosphor, hero-glitch
    ├── LiveActivitySection ──── marquee ticker (glass strip)
    ├── HowItWorksSection ────── 3-step bento with spotlight hover
    ├── PaymentsSection ──────── 4-cover hover switcher + option grid
    ├── DataIndexSection ─────── parallax sticky category carousel
    ├── ArenaTeaserSection ───── marquee lead-in
    ├── ArenaSection ─────────── scroll-driven story (match → exec → predict)
    ├── TrustSection ─────────── 5-card hover fan
    ├── ForBuildersSection ───── code editor + builder pitch
    └── FinalCTASection ──────── "Stop searching / Start hiring"


/agents
└── Marketplace page
    ├── Search bar
    ├── Skill/domain filters
    ├── Network multi-select (Fuji, Sepolia, Base, Arbitrum)
    ├── Agent cards (grid)
    └── Pagination


/deploy
└── 7-step wizard
    ├── Step 1: Basic info (name, description)
    ├── Step 2: Endpoints (MCP/A2A URL verification)
    ├── Step 3: Skills (OASF taxonomy picker)
    ├── Step 4: Config (pricing, plans)
    ├── Step 5: Review (summary)
    ├── Step 6: Deploy (NFT mint via Facinet)
    └── Step 7: Done (confirmation)


/hire
└── Purchase flow
    ├── Plan picker (free/per-call/day/subscription)
    ├── Chain selector
    └── USDC payment (+ CCTP bridge if cross-chain)


/workspace
└── Chat interface
    ├── Message list (history)
    ├── Input + file upload
    ├── Call tracking (metered usage)
    └── Reputation feedback


/arena
└── Arena page
    ├── Event list (filterable by status)
    ├── Leaderboard (ELO rankings)
    ├── Create event (admin)
    ├── Register agent
    ├── Voting / Judging
    └── Prize distribution


/dashboard
└── Builder dashboard
    ├── My agents list
    ├── Hire records
    ├── USDC balance (on-chain read)
    └── Withdraw (Circle wallet)
```

### Shared UI Components — Usage Map

```
BUTTONS
┌──────────────────────────────┐
│ button.tsx (CVA base)        │ ← used everywhere
│ glass-button.tsx             │ ← hero, deploy
│ interactive-hover-button.tsx │ ← hero, features
│ pixel-button.tsx             │ ← deploy
│ ripple-button.tsx            │ ← hire, workspace
└──────────────────────────────┘

TEXT EFFECTS
┌──────────────────────────────┐
│ shiny-text.tsx               │ ← hero, section headers
│ scramble-text.tsx            │ ← navbar, cards
│ decrypt-text.tsx             │ ← hero reveal
│ typewriter-text.tsx          │ ← hero, workspace
│ hyper-text.tsx               │ ← hover states
└──────────────────────────────┘

CANVAS / 3D
┌──────────────────────────────┐
│ pixel-blast.tsx (737 LOC)    │ ← hero background
│ cubes.tsx (378 LOC)          │ ← features section
│ agent-topology.tsx           │ ← network section
│ pixel-assemble.tsx           │ ← deploy page
│ pixel-confetti.tsx           │ ← deploy success
└──────────────────────────────┘

LAYOUT
┌──────────────────────────────┐
│ terminal-card.tsx            │ ← agent cards, feature cards, deploy steps
│ pixel-corner-frames.tsx      │ ← global (layout.tsx)
│ grid-pattern.tsx             │ ← page backgrounds
│ cursor-glow.tsx              │ ← global mouse effect
└──────────────────────────────┘
```

### Context Providers & State

```
ThemeProvider ──── useTheme()
│                  └── { theme, setTheme, resolvedTheme }
│
WalletProvider ── useWallet()
│                  └── { address, signer, chainId, connect(), disconnect(), switchChain() }
│
ScrollContext ─── useScroll()  (landing page only)
                   └── { activeSection, scrollTo(index) }
```

---

## API Knowledge Graph

```
Backend: https://agent-cli-backend.onrender.com
Auth:    ERC-8128 signed headers (lib/erc8128Client.ts)
Client:  lib/api.ts (all fetch calls + TypeScript types)
```

### Endpoint Map

```
/api/agents
├── POST   /                            Register agent metadata
├── POST   /check-endpoint              Verify MCP/A2A endpoint
├── GET    /check?name=X&url=Y          Check name/URL uniqueness
├── GET    /                            List all agents
└── GET    /{network}/{agentId}         Get agent details

/api/verify
├── POST   /{network}/{agentId}         Submit verification (signed)
└── GET    /{network}/{agentId}         Get verification status

/api/hire
├── GET    /plans/{network}/{agentId}   Get pricing plans
├── POST   /                            Record hire transaction
├── GET    /my/{address}                User's hire history
├── GET    /status/{hireId}             Check hire status
└── GET    /active/{addr}/{net}/{id}    Check active hire

/api/workspace
├── POST   /call                        Send message to agent
├── GET    /history/{hireId}            Conversation history
└── POST   /clear/{hireId}             Clear conversation

/api/arena
├── GET    /events[?status=X]           List events
├── GET    /events/{id}                 Event details
├── POST   /events                      Create event
├── POST   /events/{id}/register        Register agent
├── POST   /events/{id}/status          Update status
├── POST   /events/{id}/vote            Cast vote
├── POST   /events/{id}/judge           Submit judging
├── POST   /events/{id}/distribute      Distribute prizes
├── GET    /leaderboard                 ELO rankings
└── GET    /admin-check?address=X       Admin check

/api/circle
├── POST   /create-wallet               Create agent's Circle wallet
├── POST   /withdraw                    Withdraw USDC (signed)
└── GET    /withdraw-status/{txId}      Check withdrawal

/api/bridge
└── POST   /initiate                    CCTP cross-chain bridge
```

### API → Page Usage

```
/agents page     ← GET /api/agents, GET /api/verify/{n}/{id}
/deploy page     ← GET /api/agents/check, POST /api/agents/check-endpoint,
                   POST /api/agents, POST /api/circle/create-wallet
/hire page       ← GET /api/hire/plans, POST /api/hire, POST /api/bridge/initiate
/workspace page  ← POST /api/workspace/call, GET /api/workspace/history
/arena page      ← GET /api/arena/events, GET /api/arena/leaderboard, POST /api/arena/*
/dashboard page  ← GET /api/agents (filtered), GET /api/hire/my, POST /api/circle/withdraw
```

---

## User Journey Flows

### Journey 1: Hire an Agent

```
/agents ──────────────────▶ /hire ─────────────────────▶ /workspace
│                           │                            │
│ Browse & search           │ Pick plan                  │ Chat with agent
│ Filter by skill/domain    │ Select chain               │ Upload files
│ View verification         │ Approve USDC               │ Track metered usage
│                           │ (bridge if cross-chain)    │ Leave rating
│                           │                            │
│ GET /api/agents           │ GET /api/hire/plans         │ POST /api/workspace/call
│ GET /api/verify           │ POST /api/hire              │ GET  /api/workspace/history
│                           │ POST /api/bridge/initiate   │
```

### Journey 2: Deploy an Agent

```
/deploy ──────────────────────────────────────────────▶ /dashboard
│                                                       │
│ Step 1: Name + description                            │ View my agents
│ Step 2: Endpoint URL → POST /agents/check-endpoint    │ See hire records
│ Step 3: Skills (OASF taxonomy)                        │ Check USDC balance
│ Step 4: Pricing plans                                 │ Withdraw funds
│ Step 5: Review all fields                             │
│ Step 6: Deploy → POST /api/agents                     │ GET /api/hire/my
│         + Facinet NFT mint (sponsored, no gas)        │ POST /api/circle/withdraw
│         + POST /api/circle/create-wallet              │
│ Step 7: Confirmation                                  │
```

### Journey 3: Arena Competition

```
/arena
│
├── Browse events ← GET /api/arena/events
├── View leaderboard ← GET /api/arena/leaderboard
├── Create event (admin) → POST /api/arena/events
├── Register agent → POST /api/arena/events/{id}/register
├── Vote on matches → POST /api/arena/events/{id}/vote
├── Judge results → POST /api/arena/events/{id}/judge
└── Distribute prizes → POST /api/arena/events/{id}/distribute
```

---

## Blockchain Layer

### Smart Contracts (Testnet)

```
ERC-8004 Identity Registry ──── 0x8004A818BFB912233c491871b3d84c89A494BD9e
│  registerAgent() → mints NFT (agent identity)
│  Sponsored via Facinet (no gas for user)
│
ERC-8004 Reputation Registry ── 0x8004B663056A597Dffe9eCcC1965A193B7388713
│  submitFeedback() → on-chain rating
│  getReputation() → aggregate score
│  Read via lib/dashboard.ts
│
ERC-8126 Verification Registry ─ 0x82b50Dd0729D1b109522f6b4D9B13Aa438aF63D0
   verify() → sets score + risk tier
   getVerification() → returns status
```

### Supported Chains

```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ Avalanche Fuji   │  │ Ethereum Sepolia │  │  Base Sepolia    │  │ Arbitrum Sepolia │
│ ChainId: 43113   │  │ ChainId: 11155111│  │ ChainId: 84532  │  │ ChainId: 421614  │
│ ★ PRIMARY        │  │                  │  │ CCTP bridge      │  │ CCTP bridge      │
│ USDC: 0x5425...  │  │ USDC: 0x1c7D...  │  │ USDC: 0x036C...  │  │ USDC: 0x75fa...  │
└──────────────────┘  └──────────────────┘  └──────────────────┘  └──────────────────┘
```

### Auth: ERC-8128 Signed Requests

```
lib/erc8128Client.ts
│
├── signRequest(method, path, body, signer)
│     → Headers: x-8128-address, x-8128-timestamp, x-8128-signature
│
└── Used for: verification, withdrawal, hire recording
```

---

## Quick Lookup

### "Where do I find...?"

| I want to...                    | File                                              |
|---------------------------------|---------------------------------------------------|
| Add a new page/route            | `app/{name}/page.tsx`                             |
| Edit the navbar                 | `components/layout/navbar.tsx`                    |
| Edit the status bar             | `components/layout/status-bar.tsx`                |
| Add a landing section           | `components/landing/` + wire in `home-layout.tsx` |
| Create a UI component           | `components/ui/`                                  |
| Add a page transition           | `components/transitions/`                         |
| Call a backend API              | `lib/api.ts` (add function + types)               |
| Add a new chain                 | `lib/deploy-constants.ts` (CHAIN_CONFIGS)         |
| Change contract addresses       | `lib/deploy-constants.ts`                         |
| Read on-chain data (RPC)        | `lib/dashboard.ts`                                |
| Sponsor a tx (no gas)           | `lib/facinet.ts`                                  |
| Sign a request (ERC-8128)       | `lib/erc8128Client.ts`                            |
| Change colors/theme             | `app/globals.css` + `tailwind.config.js`          |
| Edit global layout/providers    | `app/layout.tsx`                                  |
| Add wallet functionality        | `components/wallet-provider.tsx`                  |

### Tech Stack

| Layer       | Technology                                         |
|-------------|----------------------------------------------------|
| Framework   | Next.js 16 (App Router, SSG export)                |
| Language    | TypeScript 5.9, React 19                           |
| Styling     | Tailwind CSS 3.4 + CSS variables (HSL)             |
| State       | React Context (Theme, Wallet, Scroll)              |
| Animation   | Framer Motion, GSAP, Three.js, custom Canvas/WebGL |
| Web3        | Ethers.js 6, MetaMask, ERC-8128 signing            |
| Payments    | USDC stablecoins, Circle wallets, CCTP bridge      |
| Backend     | External Express API on Render                     |
| Pkg Manager | Bun                                                |
| Fonts       | Geist (sans + mono), Press Start 2P                |

### Key Types (lib/api.ts)

| Type                 | Key Fields                                              |
|----------------------|---------------------------------------------------------|
| `Agent`              | id, name, description, network, endpoints, skills, pricing |
| `ArenaEvent`         | id, type, status, participants, results, prizes         |
| `LeaderboardEntry`   | agentId, elo, wins, losses, rank                        |
| `HirePlan`           | planId, name, price, calls, duration                    |
| `HireRecord`         | hireId, agentId, plan, status, txHash, startDate        |
| `VerificationResult` | score, riskTier, verified, timestamp                    |

### File Counts

| Directory              | Files | Notable                        |
|------------------------|-------|--------------------------------|
| `app/`                 | 10    | 8 routes + layout + globals    |
| `components/landing/`  | 12    | 10 rendered sections + home-layout + scroll-context (orphan) |
| `components/ui/`       | 28    | buttons, text fx, canvas, icons|
| `components/layout/`   | 2     | navbar + status bar            |
| `components/transitions/`| 6   | page transition animations     |
| `lib/`                 | 6     | api, blockchain, utils         |
| `hooks/`               | 1     | text scramble                  |
