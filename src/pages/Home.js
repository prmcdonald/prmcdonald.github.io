import { Link } from 'react-router-dom';
import WeatherSky from '../components/WeatherSky';
import GlassCard from '../components/GlassCard';
import MonoLabel from '../components/MonoLabel';
import RatingChip from '../components/RatingChip';
import { useHour } from '../hooks/useHour';
import { useWeather } from '../hooks/useWeather';
import { POSTS, NOW_ITEMS, fontSerif, fontSans, fontMono, fmtDate, tintForHour } from '../data/posts';

const NAV_ROUTES = { About: '/about', Writing: '/writing', Projects: '/projects' };

export default function Home() {
  const hour = useHour();
  const weather = useWeather();
  const isNight = hour < 6.5 || hour > 19;
  const fg = isNight ? '#fff' : '#1a1814';
  const subFg = isNight ? 'rgba(255,255,255,0.78)' : 'rgba(26,24,20,0.7)';
  const tint = tintForHour(hour);
  const stroke = isNight ? 'rgba(255,255,255,0.12)' : 'rgba(26,24,20,0.08)';
  const featured = POSTS[0];
  const recent = POSTS.slice(1, 5);
  const hh = Math.floor(hour).toString().padStart(2, '0');
  const mm = Math.floor((hour % 1) * 60).toString().padStart(2, '0');

  return (
    <div style={{
      width: '100vw', height: '100vh',
      position: 'relative', overflow: 'hidden',
      fontFamily: fontSans, color: fg,
    }}>
      <WeatherSky weather={weather} />

      {/* Top meta bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '20px 48px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        color: fg,
        textShadow: isNight ? '0 1px 8px rgba(0,0,0,0.4)' : 'none',
        zIndex: 5,
      }}>
        <MonoLabel style={{ color: fg, opacity: 0.85 }}>
          ◐ Chicago · {hh}:{mm} · {weather} · {tint.name}
        </MonoLabel>
        <div style={{ display: 'flex', gap: 28, fontSize: 12, fontFamily: fontMono, letterSpacing: 0.5, textTransform: 'uppercase' }}>
          {Object.entries(NAV_ROUTES).map(([label, to]) => (
            <Link key={label} to={to} style={{ color: fg, textDecoration: 'none', opacity: 0.78 }}>
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Hero name */}
      <div style={{
        position: 'absolute', left: 48, right: 320, top: 88,
        textShadow: isNight ? '0 2px 22px rgba(0,0,0,0.5)' : 'none',
      }}>
        <h1 style={{
          fontFamily: fontSerif, fontWeight: 400,
          lineHeight: 0.86, letterSpacing: -7,
          fontSize: 'clamp(72px, 9vw, 130px)',
          margin: 0,
        }}>
          <span style={{ display: 'block' }}>Preston</span>
          <span style={{ display: 'block', fontStyle: 'italic', marginLeft: '0.18em' }}>McDonald</span>
        </h1>
        <p style={{
          fontFamily: fontSerif, fontSize: 22, fontStyle: 'italic',
          lineHeight: 1.35, margin: '18px 0 0', opacity: 0.92, maxWidth: 640,
        }}>
          Product manager, reluctant baker, game-finisher — keeping notes on
          everything I'm actually spending time on.
        </p>
      </div>

      {/* Now widget */}
      <div style={{ position: 'absolute', top: 80, right: 48, width: 250, zIndex: 5 }}>
        <GlassCard dark={isNight}>
          <MonoLabel style={{ marginBottom: 10, color: fg }}>◉ Right now</MonoLabel>
          {NOW_ITEMS.map((n) => (
            <div key={n.label} style={{
              display: 'flex', justifyContent: 'space-between', gap: 12,
              fontSize: 13, lineHeight: 1.7, color: fg,
            }}>
              <span style={{ opacity: 0.6 }}>{n.label}</span>
              <span style={{ textAlign: 'right' }}>{n.value}</span>
            </div>
          ))}
        </GlassCard>
      </div>

      {/* Recent strip */}
      <div style={{ position: 'absolute', bottom: 48, left: 48, right: 48, zIndex: 5 }}>
        <GlassCard dark={isNight} padding={0}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 22px 10px',
          }}>
            <MonoLabel style={{ color: fg, opacity: 0.75 }}>▼ Recent writing</MonoLabel>
            <Link to="/writing" style={{
              fontFamily: fontMono, fontSize: 11, letterSpacing: 0.5,
              color: fg, opacity: 0.7, textDecoration: 'none',
            }}>
              Browse all {POSTS.length} →
            </Link>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr',
          }}>
            {/* Featured */}
            <Link to={`/writing/${featured.id}`} style={{ textDecoration: 'none', color: fg }}>
              <div style={{ padding: '6px 22px 18px', borderRight: '1px solid ' + stroke }}>
                <MonoLabel style={{ color: fg, opacity: 0.6, marginBottom: 8 }}>
                  {featured.sub} · Featured
                </MonoLabel>
                <div style={{ fontFamily: fontSerif, fontSize: 30, lineHeight: 1.05, letterSpacing: -0.6, marginBottom: 8 }}>
                  {featured.title}
                </div>
                <div style={{ fontSize: 13, color: subFg, lineHeight: 1.5, marginBottom: 12 }}>
                  {featured.blurb}
                </div>
                <RatingChip kind={featured.rating} />
              </div>
            </Link>

            {/* Recent posts */}
            {recent.map((p, i) => (
              <Link key={p.id} to={`/writing/${p.id}`} style={{ textDecoration: 'none', color: fg }}>
                <div style={{
                  padding: '6px 18px 18px',
                  borderRight: i < recent.length - 1 ? '1px solid ' + stroke : 'none',
                }}>
                  <MonoLabel style={{ color: fg, opacity: 0.55, marginBottom: 8 }}>
                    {p.sub} · {fmtDate(p.date)}
                  </MonoLabel>
                  <div style={{ fontFamily: fontSerif, fontSize: 22, lineHeight: 1.1, letterSpacing: -0.4, marginBottom: 8 }}>
                    {p.title}
                  </div>
                  <div style={{
                    fontSize: 11.5, color: subFg, lineHeight: 1.5,
                    display: '-webkit-box', WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {p.blurb}
                  </div>
                  {p.rating && <div style={{ marginTop: 8 }}><RatingChip kind={p.rating} /></div>}
                </div>
              </Link>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
