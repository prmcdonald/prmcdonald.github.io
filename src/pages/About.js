import WeatherSky from '../components/WeatherSky';
import MonoLabel from '../components/MonoLabel';
import NavDesktop from '../components/NavDesktop';
import { useHour } from '../hooks/useHour';
import { useWeather } from '../hooks/useWeather';
import { NOW_ITEMS, fontSerif, fontSans, tintForHour } from '../data/posts';

export default function About() {
  const hour = useHour();
  const weather = useWeather();
  const tint = tintForHour(hour);

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#faf6ee', color: '#1a1814', fontFamily: fontSans }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 10 }}>
        <WeatherSky weather={weather} />
        <NavDesktop active="about" />
      </div>

      {/* Header */}
      <div style={{ padding: '48px 56px 32px', borderBottom: '1px solid rgba(26,24,20,0.12)' }}>
        <MonoLabel style={{ marginBottom: 18 }}>About · the long version</MonoLabel>
        <h1 style={{
          fontFamily: fontSerif, fontSize: 96, lineHeight: 0.86,
          letterSpacing: -7, fontWeight: 400, margin: 0, maxWidth: 1100,
        }}>
          Hi, I'm <em>Preston.</em> I do product, and a lot of other things{' '}
          <em>badly enough</em> to enjoy them.
        </h1>
      </div>

      {/* Two-column body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 56, padding: '48px 56px 80px' }}>
        {/* Left: bio text */}
        <div style={{ fontSize: 18, lineHeight: 1.6 }}>
          <p style={{ marginTop: 0 }}>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Day job */}
          <div style={{
            background: tint.accent + '14',
            border: '1px solid ' + tint.accent + '40',
            borderRadius: 14, padding: '20px 22px',
          }}>
            <MonoLabel style={{ marginBottom: 8 }}>Day job</MonoLabel>
            <div style={{ fontFamily: fontSerif, fontSize: 28, lineHeight: 1.15, letterSpacing: -0.5, marginBottom: 6, fontStyle: 'italic' }}>
              Senior PM, ████████
            </div>
            <div style={{ fontSize: 13, opacity: 0.7 }}>2023 → present · I work on the part most people don't see.</div>
          </div>

          {/* Currently */}
          <div style={{ background: '#fff', border: '1px solid rgba(26,24,20,0.12)', borderRadius: 14, padding: '20px 22px' }}>
            <MonoLabel style={{ marginBottom: 12 }}>Currently</MonoLabel>
            {NOW_ITEMS.map((n) => (
              <div key={n.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 13, lineHeight: 1.85 }}>
                <span style={{ opacity: 0.6 }}>{n.label}</span>
                <span style={{ textAlign: 'right' }}>
                  {n.value} <span style={{ opacity: 0.5 }}>· {n.sub}</span>
                </span>
              </div>
            ))}
          </div>

          {/* Find me */}
          <div style={{ background: '#1a1814', color: '#f5f1ea', borderRadius: 14, padding: '20px 22px' }}>
            <MonoLabel style={{ marginBottom: 12, color: '#f5f1ea' }}>Find me</MonoLabel>
            <div style={{ fontSize: 13.5, lineHeight: 1.85 }}>
              {[
                ['email',     'p.mcdonald @ this domain'],
                ['github',    '@prestonmcd'],
                ['letterboxd','@prestonmcd'],
                ['RSS',       '/feed.xml'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ opacity: 0.6 }}>{k}</span>
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
