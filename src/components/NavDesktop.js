import { NavLink } from 'react-router-dom';
import { fontSerif, fontMono } from '../data/posts';
import NavDrawer from './NavDrawer';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { useHour } from '../hooks/useHour';

const NAV_LINKS = [
  { label: 'About',    to: '/about'    },
  { label: 'Writing',  to: '/writing'  },
  { label: 'Projects', to: '/projects' },
];

export default function NavDesktop({ active }) {
  const width = useWindowWidth();
  const hour = useHour();
  const isNight = hour < 6.5 || hour > 19;
  const fg = isNight ? '#fff' : '#1a1814';
  const stroke = isNight ? 'rgba(255,255,255,0.15)' : 'rgba(26,24,20,0.08)';

  return (
    <div style={{
      padding: width < 768 ? '16px 20px' : '24px 56px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      color: fg,
      borderBottom: '1px solid ' + stroke,
      background: 'transparent',
      position: 'relative', zIndex: 1,
    }}>
      <NavLink to="/" style={{ textDecoration: 'none', color: fg }}>
        <div style={{ fontFamily: fontSerif, fontSize: 22, letterSpacing: -0.4, fontStyle: 'italic' }}>
          preston <span style={{ fontStyle: 'normal' }}>·</span> mcdonald
        </div>
      </NavLink>

      {width >= 768 ? (
        <div style={{ display: 'flex', gap: 30, alignItems: 'center', fontSize: 12, fontFamily: fontMono, letterSpacing: 0.5, textTransform: 'uppercase' }}>
          {NAV_LINKS.map(({ label, to }) => {
            const isActive = active === label.toLowerCase();
            return (
              <NavLink
                key={label}
                to={to}
                style={{
                  color: fg, textDecoration: 'none',
                  opacity: isActive ? 1 : 0.6,
                  borderBottom: isActive ? '1px solid ' + fg : 'none',
                  paddingBottom: 2,
                }}
              >
                {label}
              </NavLink>
            );
          })}
        </div>
      ) : (
        <NavDrawer
          routes={NAV_LINKS.map(({ label, to }) => [label, to])}
          fg={fg}
          isNight={isNight}
          stroke={stroke}
        />
      )}
    </div>
  );
}
