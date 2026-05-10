import { NavLink } from 'react-router-dom';
import { fontSerif, fontMono } from '../data/posts';

const NAV_LINKS = [
  { label: 'About',    to: '/about'    },
  { label: 'Writing',  to: '/writing'  },
  { label: 'Projects', to: '/projects' },
];

export default function NavDesktop({ active }) {
  return (
    <div style={{
      padding: '24px 56px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      color: '#1a1814',
      borderBottom: '1px solid rgba(26,24,20,0.08)',
      background: 'transparent',
      position: 'relative', zIndex: 1,
    }}>
      <NavLink to="/" style={{ textDecoration: 'none', color: '#1a1814' }}>
        <div style={{ fontFamily: fontSerif, fontSize: 22, letterSpacing: -0.4, fontStyle: 'italic' }}>
          preston <span style={{ fontStyle: 'normal' }}>·</span> mcdonald
        </div>
      </NavLink>
      <div style={{ display: 'flex', gap: 30, fontSize: 12, fontFamily: fontMono, letterSpacing: 0.5, textTransform: 'uppercase' }}>
        {NAV_LINKS.map(({ label, to }) => {
          const isActive = active === label.toLowerCase();
          return (
            <NavLink
              key={label}
              to={to}
              style={{
                color: '#1a1814', textDecoration: 'none',
                opacity: isActive ? 1 : 0.6,
                borderBottom: isActive ? '1px solid #1a1814' : 'none',
                paddingBottom: 2,
              }}
            >
              {label}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
