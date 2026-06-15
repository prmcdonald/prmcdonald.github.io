import { RATINGS, fontMono } from '../data/posts';

export default function RatingChip({ kind, size = 'sm', dark = false }) {
  if (!kind) return null;
  const r = RATINGS[kind];
  const padY = size === 'sm' ? 3 : 5;
  const padX = size === 'sm' ? 8 : 11;
  const fs   = size === 'sm' ? 9.5 : 11;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: dark ? r.darkBg : r.lightBg, color: dark ? r.darkText : r.lightText,
      padding: `${padY}px ${padX}px`, borderRadius: 4,
      fontFamily: fontMono, fontSize: fs, letterSpacing: 1, textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    }}>
      <span style={{ letterSpacing: 0 }}>{r.glyph}</span>
      <span>{r.label}</span>
    </span>
  );
}
