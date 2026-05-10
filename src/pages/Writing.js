import { useState } from 'react';
import { Link } from 'react-router-dom';
import WeatherSky from '../components/WeatherSky';
import MonoLabel from '../components/MonoLabel';
import NavDesktop from '../components/NavDesktop';
import RatingChip from '../components/RatingChip';
import FilterPill from '../components/FilterPill';
import { useHour } from '../hooks/useHour';
import { useWeather } from '../hooks/useWeather';
import { POSTS, fontSerif, fontSans, fontMono, fmtDate, tintForHour } from '../data/posts';

function PostRow({ p, accent, last }) {
  return (
    <Link to={`/writing/${p.id}`} style={{ textDecoration: 'none', color: '#1a1814' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '90px 1fr 220px', gap: 24, alignItems: 'baseline',
        padding: '20px 0',
        borderBottom: last ? 'none' : '1px dashed rgba(26,24,20,0.18)',
        cursor: 'pointer',
      }}>
        <div style={{ fontFamily: fontMono, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', opacity: 0.55 }}>
          {fmtDate(p.date)}
        </div>
        <div>
          <div style={{ fontFamily: fontSerif, fontSize: 32, lineHeight: 1.05, letterSpacing: -0.6, marginBottom: 6 }}>
            {p.title}
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.45, opacity: 0.7, marginBottom: 8, maxWidth: 700 }}>
            {p.blurb}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: fontMono, fontSize: 10.5, letterSpacing: 0.6, textTransform: 'uppercase', color: accent }}>
              {p.sub}
            </span>
            {p.tags.map((t) => (
              <span key={t} style={{ fontFamily: fontMono, fontSize: 10.5, opacity: 0.5 }}>#{t}</span>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
          {p.rating && <RatingChip kind={p.rating} />}
          <div style={{ fontFamily: fontMono, fontSize: 10.5, opacity: 0.5, letterSpacing: 0.5, textTransform: 'uppercase' }}>
            {p.read} min
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Writing() {
  const hour = useHour();
  const weather = useWeather();
  const tint = tintForHour(hour);

  const [q, setQ] = useState('');
  const [type, setType] = useState('all');
  const [rating, setRating] = useState('all');
  const [tag, setTag] = useState('all');

  const allTags = Array.from(new Set(POSTS.flatMap((p) => p.tags))).sort();

  const filtered = POSTS.filter((p) => {
    if (type !== 'all' && p.cat !== type) return false;
    if (rating !== 'all' && p.rating !== rating) return false;
    if (tag !== 'all' && !p.tags.includes(tag)) return false;
    if (q && !((p.title + ' ' + p.blurb + ' ' + p.tags.join(' ')).toLowerCase().includes(q.toLowerCase()))) return false;
    return true;
  });

  const byYear = {};
  filtered.forEach((p) => {
    const y = p.date.slice(0, 4);
    (byYear[y] = byYear[y] || []).push(p);
  });
  const years = Object.keys(byYear).sort().reverse();

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#faf6ee', color: '#1a1814', fontFamily: fontSans }}>
      {/* Sticky header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10 }}>
        <WeatherSky weather={weather} />
        <NavDesktop active="writing" />
      </div>

      {/* Page heading */}
      <div style={{ padding: '48px 56px 32px' }}>
        <MonoLabel style={{ marginBottom: 18 }}>
          The index · {filtered.length} of {POSTS.length} posts
        </MonoLabel>
        <h1 style={{ fontFamily: fontSerif, fontSize: 76, lineHeight: 0.86, letterSpacing: -7, fontWeight: 400, margin: 0 }}>
          Everything I've <em>bothered to write down</em>.
        </h1>
        <p style={{ marginTop: 18, fontSize: 16, lineHeight: 1.55, maxWidth: 600, opacity: 0.75 }}>
          Reviews, essays, dev notes. Filter by what you're in the mood for, or just scroll.
        </p>
      </div>

      {/* Sticky search + filter bar */}
      <div style={{
        padding: '0 56px 28px',
        position: 'sticky', top: 86, zIndex: 9,
        background: 'rgba(250,246,238,0.92)',
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
      }}>
        <div style={{
          display: 'flex', gap: 14, alignItems: 'center',
          borderTop: '1px solid rgba(26,24,20,0.12)',
          borderBottom: '1px solid rgba(26,24,20,0.12)',
          padding: '14px 0',
        }}>
          {/* Search input */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, fontFamily: fontMono, fontSize: 14 }}>
            <span style={{ opacity: 0.45 }}>⌕</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="search titles, blurbs, tags…"
              style={{
                border: 'none', background: 'transparent', outline: 'none',
                fontFamily: fontMono, fontSize: 14, color: '#1a1814', flex: 1,
              }}
            />
            {q && (
              <button onClick={() => setQ('')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', opacity: 0.5, fontFamily: fontMono, fontSize: 13 }}>
                ×
              </button>
            )}
            <span style={{ opacity: 0.4, fontSize: 11 }}>⌘K</span>
          </div>

          <FilterPill
            label="Type" value={type} onChange={setType} accent={tint.accent}
            options={[['all','All'],['review','Reviews'],['essay','Essays'],['blog','Dev blog']]}
          />
          <FilterPill
            label="Rating" value={rating} onChange={setRating} accent={tint.accent}
            options={[['all','Any'],['highly','●●●● Highly'],['recommend','●●●○ Recommend'],['situational','●●○○ Sometimes'],['not','●○○○ Skip']]}
          />
          <FilterPill
            label="Tag" value={tag} onChange={setTag} accent={tint.accent}
            options={[['all','All'], ...allTags.map((t) => [t, '#' + t])]}
          />
        </div>
      </div>

      {/* Posts grouped by year */}
      <div style={{ padding: '0 56px 80px' }}>
        {years.length === 0 && (
          <div style={{ padding: '60px 0', textAlign: 'center', fontFamily: fontSerif, fontSize: 32, fontStyle: 'italic', opacity: 0.5 }}>
            Nothing matches. Loosen up?
          </div>
        )}
        {years.map((y) => (
          <div key={y} style={{ marginBottom: 36 }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '120px 1fr', gap: 32,
              alignItems: 'start', borderTop: '1px solid #1a1814', paddingTop: 14,
            }}>
              <div style={{
                fontFamily: fontSerif, fontSize: 48, lineHeight: 1, fontStyle: 'italic',
                position: 'sticky', top: 168,
              }}>
                {y}
              </div>
              <div>
                {byYear[y].map((p, i) => (
                  <PostRow key={p.id} p={p} accent={tint.accent} last={i === byYear[y].length - 1} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
