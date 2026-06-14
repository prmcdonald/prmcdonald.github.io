import { NavLink } from 'react-router-dom';
import NavDrawer from './NavDrawer';
import { useHour } from '../hooks/useHour';
import styles from './NavDesktop.module.css';

const NAV_LINKS = [
  { label: 'About',    to: '/about'    },
  { label: 'Writing',  to: '/writing'  },
  { label: 'Projects', to: '/projects' },
];

export default function NavDesktop({ active }) {
  const hour = useHour();
  const isNight = hour < 6.5 || hour > 19;
  const fg = isNight ? '#fff' : '#1a1814';
  const stroke = isNight ? 'rgba(255,255,255,0.15)' : 'rgba(26,24,20,0.08)';

  return (
    <div className={styles.bar} style={{ '--nav-fg': fg, '--nav-stroke': stroke }}>
      <NavLink to="/" className={styles.logo}>
        preston <span className={styles.logoDot}>·</span> mcdonald
      </NavLink>

      {/* Inline links — CSS shows these from 768px up */}
      <div className={styles.links}>
        {NAV_LINKS.map(({ label, to }) => (
          <NavLink
            key={label}
            to={to}
            className={`${styles.link} ${active === label.toLowerCase() ? styles.linkActive : ''}`}
          >
            {label}
          </NavLink>
        ))}
      </div>

      {/* Hamburger drawer — CSS hides this from 768px up */}
      <NavDrawer
        routes={NAV_LINKS.map(({ label, to }) => [label, to])}
        fg={fg}
        isNight={isNight}
        stroke={stroke}
        triggerClassName={styles.menuButton}
      />
    </div>
  );
}
