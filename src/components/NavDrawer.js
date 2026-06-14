import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { fontMono } from '../data/posts';

export default function NavDrawer({ routes, fg, isNight, stroke, triggerClassName }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const bg = isNight ? 'rgba(20,18,32,0.92)' : 'rgba(250,246,238,0.96)';

  return (
    <>
      {/* Hamburger button — wrapper class controls responsive visibility */}
      <span className={triggerClassName}>
        <button
          onClick={() => setOpen(true)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: 4, display: 'flex', flexDirection: 'column', gap: 5,
          }}
          aria-label="Open menu"
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ display: 'block', width: 20, height: 2, background: fg, borderRadius: 1 }} />
          ))}
        </button>
      </span>

      {createPortal(
        <>
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 90,
              background: 'rgba(0,0,0,0.35)',
              backdropFilter: 'blur(2px)',
              WebkitBackdropFilter: 'blur(2px)',
              pointerEvents: open ? 'auto' : 'none',
              opacity: open ? 1 : 0,
              transition: 'opacity 0.28s ease',
            }}
          />

          {/* Drawer */}
          <div style={{
            position: 'fixed', top: 0, right: 0, bottom: 0,
            width: 'min(280px, 80vw)',
            zIndex: 100,
            background: bg,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderLeft: '1px solid ' + stroke,
            transform: open ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            flexDirection: 'column',
            padding: '28px 32px',
          }}>
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              style={{
                alignSelf: 'flex-end',
                background: 'none', border: 'none', cursor: 'pointer',
                color: fg, fontSize: 22, lineHeight: 1, padding: 4,
                marginBottom: 32,
              }}
              aria-label="Close menu"
            >
              ×
            </button>

            {/* Nav links */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {routes.map(([label, to]) => (
                <Link
                  key={label}
                  to={to}
                  onClick={() => setOpen(false)}
                  style={{
                    color: fg,
                    textDecoration: 'none',
                    fontFamily: fontMono,
                    fontSize: 14,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    opacity: 0.85,
                  }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </>,
        document.body
      )}
    </>
  );
}
