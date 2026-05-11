import { Link } from 'react-router-dom';
import WeatherSky from '../components/WeatherSky';
import GlassCard from '../components/GlassCard';
import MonoLabel from '../components/MonoLabel';
import RatingChip from '../components/RatingChip';
import NavDrawer from '../components/NavDrawer';
import { useHour } from '../hooks/useHour';
import { useWeather } from '../hooks/useWeather';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { POSTS, NOW_ITEMS, fontSerif, fontSans, fontMono, fmtDate, tintForHour } from '../data/posts';

const NAV_ROUTES = { About: '/about', Writing: '/writing', Projects: '/projects' };

export default function Home() {
  const hour = useHour();
  const weather = useWeather();
  const width = useWindowWidth();
  const isMobile = width < 768;
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
    <div style={isMobile ? {
      width: '100%', minHeight: '100dvh', position: 'relative',
      fontFamily: fontSans, color: fg,
    } : {
      width: '100vw', height: '100vh',
      position: 'relative', overflow: 'hidden',
      fontFamily: fontSans, color: fg,
    }}>
      {/* WeatherSky: fixed on mobile so it covers the full viewport while content scrolls */}
      {isMobile
        ? <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}><WeatherSky weather={weather} /></div>
        : <WeatherSky weather={weather} />
      }

      {/* Top meta bar — fixed on mobile so it stays visible while content scrolls */}
      <div style={{
        position: isMobile ? 'fixed' : 'absolute', top: 0, left: 0, right: 0,
        padding: isMobile ? '16px 20px' : '20px 48px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        color: fg,
        textShadow: isNight ? '0 1px 8px rgba(0,0,0,0.4)' : 'none',
        zIndex: 10,
      }}>
        <MonoLabel style={{ color: fg, opacity: 0.85 }}>
          {isMobile ? `◐ Chicago · ${hh}:${mm}` : `◐ Chicago · ${hh}:${mm} · ${weather} · ${tint.name}`}
        </MonoLabel>
        {width >= 768
          ? (
            <div style={{ display: 'flex', gap: 28, fontSize: 12, fontFamily: fontMono, letterSpacing: 0.5, textTransform: 'uppercase' }}>
              {Object.entries(NAV_ROUTES).map(([label, to]) => (
                <Link key={label} to={to} style={{ color: fg, textDecoration: 'none', opacity: 0.78 }}>
                  {label}
                </Link>
              ))}
            </div>
          )
          : <NavDrawer routes={Object.entries(NAV_ROUTES)} fg={fg} isNight={isNight} stroke={stroke} />
        }
      </div>

      {/* ── Desktop layout ── */}
      {!isMobile && (
        <>
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
                overflow: 'hidden',
              }}>
                {/* Featured */}
                <Link to={`/writing/${featured.id}`} style={{ textDecoration: 'none', color: fg, minWidth: 0 }}>
                  <div style={{
                    paddingTop: 6, paddingBottom: 18,
                    paddingLeft: 'clamp(10px, 1.6vw, 22px)',
                    paddingRight: 'clamp(10px, 1.6vw, 22px)',
                    borderRight: '1px solid ' + stroke,
                  }}>
                    <MonoLabel style={{ color: fg, opacity: 0.6, marginBottom: 8 }}>
                      {featured.sub} · Featured
                    </MonoLabel>
                    <div style={{
                      fontFamily: fontSerif, fontSize: 'clamp(18px, 2.2vw, 30px)',
                      lineHeight: 1.05, letterSpacing: -0.6, marginBottom: 8,
                      display: '-webkit-box', WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
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
                  <Link key={p.id} to={`/writing/${p.id}`} style={{ textDecoration: 'none', color: fg, minWidth: 0 }}>
                    <div style={{
                      paddingTop: 6, paddingBottom: 18,
                      paddingLeft: 'clamp(8px, 1.3vw, 18px)',
                      paddingRight: 'clamp(8px, 1.3vw, 18px)',
                      borderRight: i < recent.length - 1 ? '1px solid ' + stroke : 'none',
                    }}>
                      <MonoLabel style={{ color: fg, opacity: 0.55, marginBottom: 8 }}>
                        {p.sub} · {fmtDate(p.date)}
                      </MonoLabel>
                      <div style={{ fontFamily: fontSerif, fontSize: 'clamp(14px, 1.6vw, 22px)', lineHeight: 1.1, letterSpacing: -0.4, marginBottom: 8 }}>
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
        </>
      )}

      {/* ── Mobile layout ── */}
      {isMobile && (
        <div style={{
          position: 'relative', zIndex: 1,
          padding: '68px 20px 48px',
          display: 'flex', flexDirection: 'column', gap: 28,
        }}>
          {/* Hero */}
          <div style={{ textShadow: isNight ? '0 2px 22px rgba(0,0,0,0.5)' : 'none' }}>
            <h1 style={{
              fontFamily: fontSerif, fontWeight: 400,
              lineHeight: 0.86, letterSpacing: -3,
              fontSize: 'clamp(56px, 14vw, 80px)',
              margin: 0,
            }}>
              <span style={{ display: 'block' }}>Preston</span>
              <span style={{ display: 'block', fontStyle: 'italic', marginLeft: '0.18em' }}>McDonald</span>
            </h1>
            <p style={{
              fontFamily: fontSerif, fontSize: 17, fontStyle: 'italic',
              lineHeight: 1.35, margin: '14px 0 0', opacity: 0.92,
            }}>
              Product manager, reluctant baker, game-finisher — keeping notes on
              everything I'm actually spending time on.
            </p>
          </div>

          {/* Now widget */}
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

          {/* Recent writing — stacked */}
          <GlassCard dark={isNight} padding={0}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 18px 10px',
            }}>
              <MonoLabel style={{ color: fg, opacity: 0.75 }}>▼ Recent writing</MonoLabel>
              <Link to="/writing" style={{
                fontFamily: fontMono, fontSize: 11, letterSpacing: 0.5,
                color: fg, opacity: 0.7, textDecoration: 'none',
              }}>
                Browse all {POSTS.length} →
              </Link>
            </div>
            {[featured, ...recent].map((p, i) => (
              <Link key={p.id} to={`/writing/${p.id}`} style={{ textDecoration: 'none', color: fg, display: 'block' }}>
                <div style={{ padding: '10px 18px 14px', borderTop: '1px solid ' + stroke }}>
                  <MonoLabel style={{ color: fg, opacity: 0.55, marginBottom: 6 }}>
                    {p.sub} · {i === 0 ? 'Featured' : fmtDate(p.date)}
                  </MonoLabel>
                  <div style={{
                    fontFamily: fontSerif, fontSize: 20, lineHeight: 1.1,
                    letterSpacing: -0.3, marginBottom: i === 0 ? 6 : 0,
                  }}>
                    {p.title}
                  </div>
                  {i === 0 && (
                    <div style={{
                      fontSize: 12, color: subFg, lineHeight: 1.45, marginBottom: 8,
                      display: '-webkit-box', WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                      {p.blurb}
                    </div>
                  )}
                  {p.rating && <div style={{ marginTop: 6 }}><RatingChip kind={p.rating} /></div>}
                </div>
              </Link>
            ))}
          </GlassCard>
        </div>
      )}
    </div>
  );
}
