# Responsive CSS Refactor — Design

**Date:** 2026-06-14
**Status:** Approved, in implementation

## Problem

The site does not respond well between screen sizes. Root cause: the entire UI is
styled with **inline styles in JS**, and every page switches layout with a single
**JavaScript breakpoint** (`width < 768` via `useWindowWidth`). There are effectively
two layouts — "phone" and "big desktop" — and the desktop one is hand-tuned for
~1200px+ using absolute positioning and fixed pixel offsets. Only 2 `@media` queries
exist in the codebase, both in stale starter CSS (`Pages.css`) that no routed page uses.

Everything between ~768px and ~1240px (small laptops, tablets, half-screen windows)
gets the big-desktop layout at a size it was never designed for.

### Concrete breakages
- **Home** (`Home.js`): hero `position:absolute; left:48; right:320`; "Right now" widget
  pinned `right:48; width:250`. Below ~950px they overlap. Recent strip is a fixed
  5-column grid that never collapses until 768 → 5 unreadable slivers at mid widths.
- **Home desktop** is locked to `height:100vh; overflow:hidden` with hero at `top:88`
  and recent strip at `bottom:48` → overlap and clipped content on short/wide windows.
- **Post** (`Post.js`): sidenote `position:absolute; right:-260px` outside a fixed 720px
  column → pokes past the screen edge and causes horizontal scroll below ~1240px.
- Abrupt jumps (e.g. letter-spacing snaps -2 → -7 at exactly 768).
- `FilterPill` dropdowns can overflow the right edge at narrow widths.
- Inner pages use `100vh` instead of `100dvh` (mobile browser chrome clips content).

## Decisions

- **Full CSS refactor.** Move layout and breakpoints out of JS into real CSS.
- **Mid sizes (768–1240px): clean but borrowed.** Phone + full desktop get the polish;
  the middle range must be bug-free but borrows the stacked/desktop layout at its
  natural breakpoint rather than getting bespoke tuning.
- **Delete dead code**: `Pages.css` and the unrouted orphan pages (`Blog`, `Portfolio`,
  `Resume`, `Now`).

## Architecture

- **CSS Modules** (`*.module.css`, built into CRA) for per-page/component scoping.
- **One global stylesheet** for tokens (colors, fonts, breakpoint values as comments),
  resets (already in `index.css`).
- **Theming bridge:** dynamic values (time-of-day colors, weather tint) stay computed in
  JS but are set once as CSS custom properties on each page's root wrapper, e.g.
  `style={{ '--fg': fg, '--bg': bg, '--accent': accent, '--sub-fg': subFg, '--stroke': stroke }}`
  plus `data-night={isNight}`. CSS references `var(--fg)` etc. A small `usePageTheme()`
  hook returns this style object so the four inner pages stop duplicating theme math.
  **JS owns theming; CSS owns layout.**

## Breakpoints (per page)

Standardized values: **640 / 768 / 1024 / 1240px**.

| Page    | Stacked (mobile/tablet)        | Multi-column desktop        |
|---------|--------------------------------|-----------------------------|
| Home    | < 1024px (roomier stacked)     | ≥ 1024px (rich layout)      |
| About   | < 768px                        | ≥ 768px (bio + cards 2-col) |
| Writing | < 768px                        | ≥ 768px (year gutter)       |
| Post    | inline sidenote < 1240px       | gutter sidenote ≥ 1240px    |

Tablets/half-screen windows (768–1024) borrow the clean stacked layout and never hit
the overlap zone.

## Per-file changes

- **Delete `useWindowWidth`.** Its three jobs move to CSS: nav swap, Home dual layout,
  and all `isMobile ? a : b` style branches. Removes resize re-render thrash.
- **Nav** (`NavDesktop`/`NavDrawer`): always render both the link list and the hamburger;
  CSS toggles `display` at 768px. Drawer open/close stays in JS state.
- **Home**: collapse two DOM trees into one styled by CSS. Desktop layout converts from
  absolute-in-`100vh`-`overflow:hidden` → a grid/flex column filling `100dvh` that scrolls
  gracefully when the window is short. Recent strip → `repeat(auto-fit, minmax(...))`.
- **Post**: single sidenote markup; CSS places it inline (<1240) or in the right gutter
  (≥1240).
- **About / Writing / Projects**: inline style objects → CSS Module classes; `clamp()`
  typography preserved; fluid letter-spacing so it stops snapping at the breakpoint.
- Inner pages: `100vh` → `100dvh`.
- **WeatherSky / GlassCard / MonoLabel / RatingChip / FilterPill**: keep inline styles for
  genuinely dynamic per-instance values; move layout bits to CSS. FilterPill dropdown gets
  edge-collision handling so it doesn't overflow on narrow screens.

## Verification

Drive the site with Playwright at **375 / 768 / 1024 / 1280 / 1440** plus a short-height
desktop window, on Home / About / Writing / Post, in day and night themes. Check for
overlap, clipping, and horizontal scroll. Existing `App.test.js` must still pass.
Capture screenshots as evidence before declaring done.

## Out of scope

- Visual redesign of any page (layout fixes only; preserve the Conservatory aesthetic).
- Bespoke tablet-specific layouts.
- Wiring up the deleted orphan pages.
