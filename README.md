# prmcdonald.github.io

Preston McDonald's personal website. A weather-reactive, time-aware personal site built with React.

## Design

**Conservatory** direction — atmospheric, full-bleed weather sky, glassy cards. Inspired by the Apple Weather app: the homepage background mirrors the time of day and weather conditions in real time.

- Typography: Instrument Serif (headings), Inter (body), JetBrains Mono (metadata)
- Color: Light cream base (`#faf6ee`) with time-of-day accent colors (sunrise orange → day blue → sunset red → night purple)
- 3-tier rating system: Highly recommend (●●●) · Recommend situationally (●●○) · Do not recommend (●○○)

## Pages

| Route | Page |
|-------|------|
| `/` | Home — full-viewport weather sky with hero name, Now widget, recent posts strip |
| `/writing` | Writing index — search + filter by type, rating, and tag; posts grouped by year |
| `/writing/:id` | Single post — centered article with sidenotes |
| `/about` | About — two-column layout with bio and info cards |
| `/now` | Now — current reading, listening, playing, baking |

## Stack

- React (CRA)
- React Router v7
- Canvas-based weather animation (no external dependencies)
- Google Fonts: Instrument Serif, Inter, JetBrains Mono

## Development

```bash
npm start     # dev server at localhost:3000
npm run build # production build
npm run deploy # deploy to GitHub Pages
```
