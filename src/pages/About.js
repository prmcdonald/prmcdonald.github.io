import WeatherSky from '../components/WeatherSky';
import MonoLabel from '../components/MonoLabel';
import NavDesktop from '../components/NavDesktop';
import { usePageTheme } from '../hooks/usePageTheme';
import { NOW_ITEMS } from '../data/posts';
import styles from './About.module.css';

export default function About() {
  const { weather, tint, isNight, vars } = usePageTheme();

  return (
    <div className={styles.page} data-night={isNight} style={vars}>
      <div className={styles.skyHeader}>
        <WeatherSky weather={weather} />
        <NavDesktop active="about" />
      </div>

      {/* Header */}
      <div className={styles.header}>
        <MonoLabel style={{ marginBottom: 18 }}>About · the long version</MonoLabel>
        <h1 className={styles.title}>
          Hi, I'm <em>Preston.</em> I do product, and a lot of other things{' '}
          <em>badly enough</em> to enjoy them.
        </h1>
      </div>

      {/* Body */}
      <div className={styles.body}>
        {/* Left: bio text */}
        <div className={styles.bio}>
          <p>
            I'm a product manager, currently shipping things at a software company in
            New York. Before that: a couple of startups, a brief stint as the worst
            engineer on a small team, a degree I am not going to bring up.
          </p>
          <p>
            What I'm <em>about</em>, professionally, is the part of product work that
            doesn't fit on the roadmap. The "huh, that's strange" moments. The user
            interview where someone says one offhand thing that quietly invalidates
            your entire quarter. I write about that here, in the essays.
          </p>
          <p>
            What I'm about, <em>off</em>-clock, is harder to summarize, which is why
            this site exists. I read a lot. I bake bread that comes out about 70% of
            the way to what I'm trying to do. I play games four years after everyone
            else, when they've already gone on sale and I can buy them guilt-free. I
            cook things from cookbooks I bought at estate sales.
          </p>
          <p>
            None of this is monetized. I'm not building a personal brand. This is a
            place I park my thinking so it doesn't all live in the Notes app.
          </p>
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
            <div className={styles.cardTitle}>Senior PM, ████████</div>
            <div className={styles.cardSub}>2023 → present · I work on the part most people don't see.</div>
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
            {NOW_ITEMS.map((n) => (
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
              {[
                ['email',     'p.mcdonald @ this domain'],
                ['github',    '@prestonmcd'],
                ['letterboxd','@prestonmcd'],
                ['RSS',       '/feed.xml'],
              ].map(([k, v]) => (
                <div key={k} className={styles.row}>
                  <span>{k}</span>
                  <span>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
