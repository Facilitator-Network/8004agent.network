# Design System — UI Guidelines

Terminal-inspired, brutalist-utilitarian. Light and dark modes are **twins**: identical layout, identical chrome, identical background — only the palette inverts. Status semantics (dot colors) stay constant across modes.

---

## 1. Color Tokens

Same token names in both modes; values flip. Violet is the **only** chromatic accent.

### Light Mode
| Token | Value |
|---|---|
| `--bg` | `#F5F2EC` |
| `--fg` | `#0A0A0A` |
| `--fg-muted` | `#6B6B6B` |
| `--surface` | `#FFFFFF` |
| `--border` | `#1A1A1A` |
| `--accent` | `#7C5CFF` |
| `--accent-soft` | `#C9B8FF` |

### Dark Mode
| Token | Value |
|---|---|
| `--bg` | `#0B0B0F` |
| `--fg` | `#F2F2F5` |
| `--fg-muted` | `#8A8A95` |
| `--surface` | `#16161E` |
| `--border` | `#2A2A33` |
| `--accent` | `#8B6CFF` |
| `--accent-soft` | `#5A3FB8` |

### Status (constant across modes)
| Token | Value | Meaning |
|---|---|---|
| `--status-ok` | `#34C759` | online / healthy |
| `--status-warn` | `#E8B339` | idle / empty |
| `--status-live` | `#FF3B30` | offline / disconnected |

---

## 2. Typography

Two families. No third family, ever.

- **Display:** Heavy condensed grotesque (Druk Wide Heavy / Antonio Black / Helvetica Inserat). Hero only. Weight 800–900, uppercase, tracking -2%.
- **UI / Mono:** Monospace (JetBrains Mono / Geist Mono / IBM Plex Mono). Everything else — nav, body, buttons, labels, status, logs.
- **Wordmark exception:** italic lowercase grotesk. Single italic in the system.

### Scale
| Role | Size | Weight | Case | Tracking |
|---|---|---|---|---|
| Hero | 96–120px | 900 | UPPER | -2% |
| Section title | 20–24px | 700 | UPPER | 0 |
| Card title | 16–18px | 700 | UPPER | 0 |
| Body | 14–15px | 400 | sentence | 0 |
| Nav / Button | 12–13px | 500 | UPPER | +4% |
| Status / Meta | 11–12px | 500 | UPPER | +4% |

---

## 3. Layout Primitives

- **Frame:** 4 L-shaped corner brackets, ~32px arms, 1px `--border`, pinned ~24px inside each viewport corner. Frames the content region between nav and footer.
- **Spacing scale:** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96.
- **Radius:** 0 (default), 4px (cards), 6px (inputs), 999px (pills only).
- **Borders:** 1px, hairline, `--border`. Never thicker.
- **Grid:** 12-col, 24px gutter, max content width ~1280px.

---

## 4. Persistent Chrome

### Top Nav
- No background fill.
- **Left:** wordmark · vertical divider · meta tag (uppercase mono, muted).
- **Center:** uppercase mono links, ~28px gap. Active = `--fg`. Inactive = `--fg-muted`. No underline, no pill — color weight only.
- **Right:** outlined pill button (with leading status dot when stateful) · 16px theme toggle icon (sun/moon).

### Footer / Status Bar
- ~32px tall, flush bottom, no top border.
- Sequence of chips: `● LABEL: VALUE`, wide spacing.
- Dot color = state (`--status-ok` / `--status-warn` / `--status-live`).
- Label in `--fg-muted`, value in `--fg`.

### Background
- Halftone dot-grid world map, centered, baked texture.
- Soft `--accent-soft` bloom drifts across, brightest near density centers.
- Same asset both modes; palette only swaps.

---

## 5. Components

### Buttons
- **Pill (marketing):** rounded 999px, `--surface` fill, 1px `--border`, leading violet bullet, uppercase mono label.
- **Rectangle (system):** sharp corners, white fill / black text for primary, transparent + 1px border for secondary.
- Hover: invert fg/bg, ≤80ms.

### Status Pill (inline)
Outlined rounded pill, leading glyph or dot, uppercase mono. Used for eyebrows and inline state tags.

### Card
- 1px `--border` on `--surface`, radius 4px.
- Optional violet left bar (3px) for "primary."
- Slot order: meta row → title → body → footer row (price left, status right).

### Input / Command Bar
- 1px `--border`, radius 6px, mono text.
- Optional prefix label on the left (e.g. `OP_01>`).
- Helper line below in `--fg-muted` with optional state indicator on right.

### Data Table
- Mono throughout.
- Hairline row dividers only — no zebra striping.
- Numeric columns right-aligned, often in `--accent`.

### Progress Bar
- 4px track on `--surface`.
- `--accent` fill.
- Numeric percentage right-aligned above.

### Log Stream
- Black panel, mono 12px.
- Every line prefixed with `>`.
- Inline severity tags: `[WARN]` in `--status-warn`, `[ERR]` in `--status-live`.
- `● LIVE` indicator top-right.

### Sidebar Rail (system UI)
- 56px wide.
- Stacked icon + 3-letter mono label.
- Active = subtle violet outline on icon tile.

---

## 6. Iconography

- Line icons only, 1.5px stroke, square proportions.
- No filled, rounded, or "friendly" icon styles.

---

## 7. Motion

- Hover transitions ≤80ms.
- Theme swap ≤120ms.
- Map: subtle parallax + occasional node pulse.
- Status dots: never animate.
- Caret in command bar: blocky blink.

---

## 8. Light vs Dark — What Changes

| | Same | Inverts |
|---|---|---|
| Layout / structure | ✅ | — |
| Nav, footer, brackets, map | ✅ | palette only |
| Component shapes | ✅ | palette only |
| Status dot colors | ✅ | — |
| Theme toggle icon | — | sun ↔ moon |

**Rule:** the same design rendered against opposite walls.

---

## 9. Do / Don't

**Do**
- Use mono for any data, status, or system-state text.
- Keep violet rare and load-bearing.
- Show numeric precision wherever possible.
- Frame regions with corner brackets, not heavy borders.

**Don't**
- Don't introduce a second accent color.
- Don't round corners past 6px outside pill components.
- Don't use sentence-case for nav, buttons, or labels.
- Don't redesign chrome per mode — palette only.
- Don't soften the display font.