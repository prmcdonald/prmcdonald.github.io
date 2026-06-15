import { useState } from 'react';
import { Link } from 'react-router-dom';
import WeatherSky from '../components/WeatherSky';
import MonoLabel from '../components/MonoLabel';
import NavDesktop from '../components/NavDesktop';
import RatingChip from '../components/RatingChip';
import FilterPill from '../components/FilterPill';
import { usePageTheme } from '../hooks/usePageTheme';
import { useContent } from '../content/useContent';
import { fmtDate } from '../data/posts';
import styles from './Writing.module.css';

function PostRow({ p, last, dark }) {
  return (
    <Link to={`/writing/${p.id}`} className={`${styles.row} ${last ? styles.rowLast : ''}`}>
      <time className={styles.rowDate}>{fmtDate(p.date)}</time>

      <div>
        {/* Mobile meta line */}
        <div className={styles.metaMobile}>
          <span className={styles.sub}>{p.sub}</span>
          <span className={styles.dot}>·</span>
          <span className={styles.metaDate}>{fmtDate(p.date)}</span>
          <span className={styles.metaRead}>{p.read}m</span>
        </div>

        <div className={styles.rowTitle}>{p.title}</div>
        <div className={styles.rowBlurb}>{p.blurb}</div>

        {/* Desktop sub + tags */}
        <div className={styles.tagsDesktop}>
          <span className={styles.sub}>{p.sub}</span>
          {p.tags.map((t) => (
            <span key={t} className={styles.tag}>#{t}</span>
          ))}
        </div>

        {/* Mobile rating */}
        {p.rating && <div className={styles.ratingMobile}><RatingChip kind={p.rating} dark={dark} /></div>}
      </div>

      {/* Desktop aside: rating + read time */}
      <div className={styles.aside}>
        {p.rating && <RatingChip kind={p.rating} dark={dark} />}
        <div className={styles.readMin}>{p.read} min</div>
      </div>
    </Link>
  );
}

export default function Writing() {
  const { weather, tint, isNight, vars } = usePageTheme();
  const { posts, writing } = useContent();

  const fg = isNight ? '#f5f1ea' : '#1a1814';
  const bg = isNight ? '#1a1814' : '#faf6ee';
  const filterBg = isNight ? 'rgba(26,24,20,0.92)' : 'rgba(250,246,238,0.92)';

  const [q, setQ] = useState('');
  const [type, setType] = useState('all');
  const [rating, setRating] = useState('all');
  const [tag, setTag] = useState('all');

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort();

  const filtered = posts.filter((p) => {
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
    <div className={styles.page} data-night={isNight} style={{ ...vars, '--filter-bg': filterBg }}>
      <div className={styles.skyHeader}>
        <WeatherSky weather={weather} />
        <NavDesktop active="writing" />
      </div>

      {/* Page heading */}
      <div className={styles.heading}>
        <MonoLabel style={{ marginBottom: 18 }}>
          The index · {filtered.length} of {posts.length} posts
        </MonoLabel>
        <h1 className={styles.title}>{writing.title}</h1>
        <p className={styles.lede}>{writing.lede}</p>
      </div>

      {/* Sticky search + filter bar */}
      <div className={styles.filterWrap}>
        <div className={styles.filterInner}>
          <div className={styles.search}>
            <span style={{ opacity: 0.45 }}>⌕</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="search titles, blurbs, tags…"
              className={styles.searchInput}
            />
            {q && (
              <button onClick={() => setQ('')} className={styles.searchClear}>×</button>
            )}
          </div>

          <FilterPill
            label="Type" value={type} onChange={setType} accent={tint.accent} fg={fg} bg={bg}
            options={[['all','All'],['review','Reviews'],['essay','Essays'],['blog','Dev blog']]}
          />
          <FilterPill
            label="Rating" value={rating} onChange={setRating} accent={tint.accent} fg={fg} bg={bg}
            options={[['all','Any'],['highly','●●●● Highly'],['recommend','●●●○ Recommend'],['situational','●●○○ Neutral'],['not','●○○○ Skip']]}
          />
          <FilterPill
            label="Tag" value={tag} onChange={setTag} accent={tint.accent} fg={fg} bg={bg}
            options={[['all','All'], ...allTags.map((t) => [t, '#' + t])]}
          />
        </div>
      </div>

      {/* Posts grouped by year */}
      <div className={styles.posts}>
        {years.length === 0 && (
          <div className={styles.empty}>Nothing matches. Loosen up?</div>
        )}
        {years.map((y) => (
          <div key={y} className={styles.yearGroup}>
            <div className={styles.yearInner}>
              <div className={styles.yearLabel}>{y}</div>
              <div>
                {byYear[y].map((p, i) => (
                  <PostRow key={p.id} p={p} last={i === byYear[y].length - 1} dark={isNight} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
