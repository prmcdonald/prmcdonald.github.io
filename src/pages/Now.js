import WeatherSky from '../components/WeatherSky';
import MonoLabel from '../components/MonoLabel';
import NavDesktop from '../components/NavDesktop';
import { useHour } from '../hooks/useHour';
import { NOW_ITEMS, fontSerif, fontSans, fontMono, tintForHour } from '../data/posts';

export default function Now() {
  const hour = useHour();
  const tint = tintForHour(hour);

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#faf6ee', color: '#1a1814', fontFamily: fontSans }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 10, background: '#faf6ee' }}>
        <div style={{ position: 'relative', height: 10, overflow: 'hidden' }}>
          <WeatherSky weather="clear" />
        </div>
        <NavDesktop active="now" />
      </div>

      <div style={{ padding: '48px 56px 80px', maxWidth: 800 }}>
        <MonoLabel style={{ marginBottom: 18 }}>Now · updated May 2026</MonoLabel>
        <h1 style={{ fontFamily: fontSerif, fontSize: 76, lineHeight: 0.94, letterSpacing: -2, margin: '0 0 48px' }}>
          What I'm <em>actually</em> doing.
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {NOW_ITEMS.map((n) => (
            <div key={n.label} style={{
              display: 'grid', gridTemplateColumns: '120px 1fr',
              gap: 24, paddingBottom: 24,
              borderBottom: '1px dashed rgba(26,24,20,0.18)',
              alignItems: 'baseline',
            }}>
              <div style={{ fontFamily: fontMono, fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', opacity: 0.55 }}>
                {n.label}
              </div>
              <div>
                <div style={{ fontFamily: fontSerif, fontSize: 36, lineHeight: 1.1, letterSpacing: -0.8, marginBottom: 4 }}>
                  {n.value}
                </div>
                <div style={{ fontFamily: fontMono, fontSize: 12, opacity: 0.55, letterSpacing: 0.5 }}>
                  {n.sub}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p style={{ marginTop: 48, fontSize: 16, lineHeight: 1.6, opacity: 0.7 }}>
          Inspired by{' '}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: tint.accent }}
          >
            nownownow.com
          </a>.
          A snapshot, not a dashboard. Updated when things actually change.
        </p>
      </div>
    </div>
  );
}
