import WeatherSky from '../components/WeatherSky';
import MonoLabel from '../components/MonoLabel';
import NavDesktop from '../components/NavDesktop';
import { usePageTheme } from '../hooks/usePageTheme';
import { useContent } from '../content/useContent';
import styles from './About.module.css';

const CONTACT_KEYS = ['email', 'github', 'letterboxd', 'RSS'];

export default function About() {
  const { weather, tint, isNight, vars } = usePageTheme();
  const { about, now } = useContent();

  return (
    <div className={styles.page} data-night={isNight} style={vars}>
      <div className={styles.skyHeader}>
        <WeatherSky weather={weather} />
        <NavDesktop active="about" />
      </div>

      {/* Header */}
      <div className={styles.header}>
        <MonoLabel style={{ marginBottom: 18 }}>About · the long version</MonoLabel>
        <h1 className={styles.title}>{about.title}</h1>
      </div>

      {/* Body */}
      <div className={styles.body}>
        {/* Left: bio text */}
        <div className={styles.bio}>
          {about.bio.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Right: info cards */}
        <div className={styles.cards}>
          {/* Day job */}
          <div
            className={styles.card}
            style={{
              background: tint.accent + (isNight ? '25' : '14'),
              border: '1px solid ' + tint.accent + (isNight ? '50' : '40'),
            }}
          >
            <MonoLabel style={{ marginBottom: 8 }}>Day job</MonoLabel>
            <div className={styles.cardTitle}>{about.dayJob.title}</div>
            <div className={styles.cardSub}>{about.dayJob.sub}</div>
          </div>

          {/* Currently */}
          <div
            className={styles.card}
            style={{
              background: isNight ? 'rgba(255,255,255,0.06)' : '#fff',
              border: '1px solid var(--stroke)',
            }}
          >
            <MonoLabel style={{ marginBottom: 12 }}>Currently</MonoLabel>
            {now.map((n) => (
              <div key={n.label} className={styles.row}>
                <span>{n.label}</span>
                <span>
                  {n.value} <span style={{ opacity: 0.5 }}>· {n.sub}</span>
                </span>
              </div>
            ))}
          </div>

          {/* Find me */}
          <div
            className={styles.card}
            style={{
              background: isNight ? 'rgba(255,255,255,0.08)' : '#1a1814',
              color: '#f5f1ea',
            }}
          >
            <MonoLabel style={{ marginBottom: 12, color: '#f5f1ea' }}>Find me</MonoLabel>
            <div style={{ fontSize: 13.5, lineHeight: 1.85 }}>
              {CONTACT_KEYS.map((k) => (
                <div key={k} className={styles.row}>
                  <span>{k}</span>
                  <span>{about.contact[k]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
