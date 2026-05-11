import { useState } from 'react';
import { fontMono } from '../data/posts';

export default function FilterPill({ label, value, options, onChange, accent, fg = '#1a1814', bg = '#faf6ee' }) {
  const [open, setOpen] = useState(false);
  const cur = options.find((o) => o[0] === value) || options[0];
  const borderColor = value === 'all' ? fg + '30' : accent;

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          background: value === 'all' ? 'transparent' : accent + '18',
          color: fg,
          border: '1px solid ' + borderColor,
          borderRadius: 999, padding: '7px 14px', cursor: 'pointer',
          fontFamily: fontMono, fontSize: 11.5, letterSpacing: 0.5, textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', gap: 8,
        }}
      >
        <span style={{ opacity: 0.55 }}>{label}</span>
        <span>{cur[1]}</span>
        <span style={{ opacity: 0.5, fontSize: 9 }}>▾</span>
      </button>
      {open && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 19 }}
            onClick={() => setOpen(false)}
          />
          <div style={{
            position: 'absolute', top: 'calc(100% + 6px)', left: 0, zIndex: 20,
            background: bg, border: '1px solid ' + fg + '25', borderRadius: 10,
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)', padding: 4, minWidth: 180,
          }}>
            {options.map((o) => (
              <button
                key={o[0]}
                onClick={() => { onChange(o[0]); setOpen(false); }}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  background: o[0] === value ? accent + '18' : 'transparent',
                  color: fg, border: 'none', borderRadius: 6,
                  padding: '7px 10px', cursor: 'pointer',
                  fontFamily: fontMono, fontSize: 12, letterSpacing: 0.3,
                }}
              >
                {o[1]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
