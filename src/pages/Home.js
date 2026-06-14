import { Link } from 'react-router-dom';
import WeatherSky from '../components/WeatherSky';
import GlassCard from '../components/GlassCard';
import MonoLabel from '../components/MonoLabel';
import RatingChip from '../components/RatingChip';
import NavDrawer from '../components/NavDrawer';
import { useHour } from '../hooks/useHour';
import { useWeather } from '../hooks/useWeather';
import { POSTS, NOW_ITEMS, fmtDate, tintForHour } from '../data/posts';
import styles from './Home.module.css';

const NAV_ROUTES = { About: '/about', Writing: '/writing', Projects: '/projects' };

export default function Home() {
  const hour = useHour();
  const weather = useWeather();
  const isNight = hour < 6.5 || hour > 19;
  const tint = tintForHour(hour);

  const fg = isNight ? '#fff' : '#1a1814';
  const subFg = isNight ? 'rgba(255,255,255,0.78)' : 'rgba(26,24,20,0.7)';
  const stroke = isNight ? 'rgba(255,255,255,0.12)' : 'rgba(26,24,20,0.08)';

  const hh = Math.floor(hour).toString().padStart(2, '0');
  const mm = Math.floor((hour % 1) * 60).toString().padStart(2, '0');

  // One ordered list — featured first, then the four most recent
  const cards = POSTS.slice(0, 5);

  return (
    <div
      className={styles.page}
      data-night={isNight}
      style={{ '--fg': fg, '--sub-fg': subFg, '--stroke': stroke, '--accent': tint.accent }}
    >
      <div className={styles.sky}>
        <WeatherSky weather={weather} />
      </div>

      {/* Top meta bar */}
      <div className={styles.meta}>
        <MonoLabel style={{ color: fg, opacity: 0.85 }}>
          <span className={styles.metaLabelShort}>{`◐ Chicago · ${hh}:${mm}`}</span>
          <span className={styles.metaLabelFull}>{`◐ Chicago · ${hh}:${mm} · ${weather} · ${tint.name}`}</span>
        </MonoLabel>

        <div className={styles.links}>
          {Object.entries(NAV_ROUTES).map(([label, to]) => (
            <Link key={label} to={to} className={styles.link}>{label}</Link>
          ))}
        </div>

        <NavDrawer
          routes={Object.entries(NAV_ROUTES)}
          fg={fg}
          isNight={isNight}
          stroke={stroke}
          triggerClassName={styles.menuButton}
        />
      </div>

      {/* Body */}
      <main className={styles.body}>
        <div className={styles.topRegion}>
          {/* Hero */}
          <section className={styles.hero}>
            <h1 className={styles.heroName}>
              <span className={styles.heroFirst}>Preston</span>
              <span className={styles.heroLast}>McDonald</span>
            </h1>
            <p className={styles.heroTagline}>
              Product manager, reluctant baker, game-finisher — keeping notes on
              everything I'm actually spending time on.
            </p>
          </section>

          {/* Now widget */}
          <aside className={styles.now}>
            <GlassCard dark={isNight}>
              <MonoLabel style={{ marginBottom: 10, color: fg }}>◉ Right now</MonoLabel>
              {NOW_ITEMS.map((n) => (
                <div key={n.label} className={styles.nowRow}>
                  <span>{n.label}</span>
                  <span>{n.value}</span>
                </div>
              ))}
            </GlassCard>
          </aside>
        </div>

        {/* Recent writing */}
        <GlassCard dark={isNight} padding={0}>
          <div className={styles.recentHeader}>
            <MonoLabel style={{ color: fg, opacity: 0.75 }}>▼ Recent writing</MonoLabel>
            <Link to="/writing" className={styles.recentBrowse}>
              Browse all {POSTS.length} →
            </Link>
          </div>
          <div className={styles.recentGrid}>
            {cards.map((p, i) => (
              <Link
                key={p.id}
                to={`/writing/${p.id}`}
                className={`${styles.card} ${i === 0 ? styles.featured : ''}`}
              >
                <MonoLabel className={styles.cardMeta} style={{ color: fg }}>
                  {p.sub} · {i === 0 ? 'Featured' : fmtDate(p.date)}
                </MonoLabel>
                <div className={styles.cardTitle}>{p.title}</div>
                <div className={styles.cardBlurb}>{p.blurb}</div>
                {p.rating && <div className={styles.cardRating}><RatingChip kind={p.rating} /></div>}
              </Link>
            ))}
          </div>
        </GlassCard>
      </main>
    </div>
  );
}
