import { useParams, Link } from 'react-router-dom';
import WeatherSky from '../components/WeatherSky';
import MonoLabel from '../components/MonoLabel';
import NavDesktop from '../components/NavDesktop';
import RatingChip from '../components/RatingChip';
import { useHour } from '../hooks/useHour';
import { useWeather } from '../hooks/useWeather';
import { POSTS, fontSerif, fontSans, fontMono, fmtDate, tintForHour } from '../data/posts';

const OUTER_WILDS_BODY = (accent) => (
  <>
    <p style={{ marginTop: 0 }}>
      I am four years late to <em>Outer Wilds</em>, which is the kind of late
      where two friends have already given up trying to convince me. I started
      it on a Saturday, said "just an hour," and woke up on a Sunday morning
      having seen the sun explode{' '}
      <span style={{ background: accent + '22', padding: '0 4px', borderRadius: 3 }}>
        thirty-one times
      </span>.
    </p>
    <p>
      The thing the game gets right — the thing I keep thinking about, in a
      way I have not been able to shake at work — is that it never gives you a
      quest. There is no checklist. The only thing pushing you forward is your
      own curiosity, plus the gentle pressure of knowing the universe is going
      to end in twenty-two minutes whether you are ready or not.
    </p>
    <p style={{ position: 'relative' }}>
      At work I have been calling this the <strong>curiosity loop</strong>. Most
      roadmaps optimize for <em>execution</em> — making sure the next thing is
      the right thing.
      <span style={{
        position: 'absolute', right: -260, top: 0, width: 220,
        fontFamily: fontMono, fontSize: 11.5, lineHeight: 1.5, color: '#5a5854',
        borderLeft: '2px solid ' + accent, paddingLeft: 12,
      }}>
        Sidenote · the only roadmap technique I trust is the one where every
        quarter, three things on it embarrass me later. Otherwise it was
        fiction all the way down.
      </span>
    </p>
    <p>
      <em>Outer Wilds</em> optimizes for the moment <em>before</em> execution
      — the moment where you notice a thing that doesn't quite fit, and you go
      "huh." That moment is, I think, what good product work feels like, and
      also what almost no PM tool is set up to encourage.
    </p>
    <p>
      I won't spoil the ending. I will say: the ending is the only ending the
      game could have had, which is the highest praise I know how to give.
    </p>
  </>
);

export default function Post() {
  const { id } = useParams();
  const hour = useHour();
  const weather = useWeather();
  const tint = tintForHour(hour);

  const post = POSTS.find((p) => p.id === id) || POSTS[0];
  const postIndex = POSTS.findIndex((p) => p.id === post.id);
  const nextPost = POSTS[postIndex + 1] || null;

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#faf6ee', color: '#1a1814', fontFamily: fontSans }}>
      {/* Sticky nav */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10 }}>
        <WeatherSky weather={weather} />
        <NavDesktop active="writing" />
      </div>

      {/* Article layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 720px 1fr', padding: '40px 0' }}>
        <div />
        <article>
          <Link
            to="/writing"
            style={{
              fontFamily: fontMono, fontSize: 11, opacity: 0.55,
              letterSpacing: 0.5, textTransform: 'uppercase',
              textDecoration: 'none', color: '#1a1814',
            }}
          >
            ← back to writing
          </Link>

          {/* Meta */}
          <div style={{ marginTop: 28, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: fontMono, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: tint.accent }}>
              {post.sub} · {post.cat}
            </span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span style={{ fontFamily: fontMono, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', opacity: 0.6 }}>
              {fmtDate(post.date)} · {post.read} min
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: fontSerif, fontSize: 80, lineHeight: 0.86,
            letterSpacing: -7, fontWeight: 400, margin: '14px 0 18px',
          }}>
            {post.title}
          </h1>

          {post.rating && (
            <div style={{ marginBottom: 28 }}>
              <RatingChip kind={post.rating} size="lg" />
            </div>
          )}

          {/* Lede */}
          <p style={{
            fontFamily: fontSerif, fontSize: 26, lineHeight: 1.35,
            fontStyle: 'italic', margin: '0 0 32px', opacity: 0.85,
          }}>
            {post.blurb}
          </p>

          <hr style={{ border: 0, borderTop: '1px solid rgba(26,24,20,0.18)', margin: '0 0 32px' }} />

          {/* Body */}
          <div style={{ fontSize: 18, lineHeight: 1.65 }}>
            {post.id === 'outer-wilds' ? OUTER_WILDS_BODY(tint.accent) : (
              <p style={{ marginTop: 0, fontStyle: 'italic', opacity: 0.6 }}>
                Full post coming soon.
              </p>
            )}
          </div>

          {/* Footer */}
          <div style={{
            marginTop: 56, padding: '24px 0',
            borderTop: '1px solid rgba(26,24,20,0.18)',
            borderBottom: '1px solid rgba(26,24,20,0.18)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <MonoLabel>Tagged</MonoLabel>
              <div style={{ marginTop: 6, fontFamily: fontMono, fontSize: 13 }}>
                {post.tags.map((t) => <span key={t} style={{ marginRight: 12 }}>#{t}</span>)}
              </div>
            </div>
            {nextPost && (
              <Link to={`/writing/${nextPost.id}`} style={{ textDecoration: 'none', color: '#1a1814', textAlign: 'right' }}>
                <MonoLabel>Next</MonoLabel>
                <div style={{ fontFamily: fontSerif, fontSize: 22, fontStyle: 'italic', marginTop: 4 }}>
                  {nextPost.title} →
                </div>
              </Link>
            )}
          </div>
        </article>
        <div />
      </div>
    </div>
  );
}
