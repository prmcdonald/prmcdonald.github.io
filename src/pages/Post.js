import { useParams, Link } from 'react-router-dom';
import WeatherSky from '../components/WeatherSky';
import MonoLabel from '../components/MonoLabel';
import NavDesktop from '../components/NavDesktop';
import RatingChip from '../components/RatingChip';
import { usePageTheme } from '../hooks/usePageTheme';
import { POSTS, fmtDate } from '../data/posts';
import styles from './Post.module.css';

const OUTER_WILDS_BODY = (
  <>
    <p style={{ marginTop: 0 }}>
      I am four years late to <em>Outer Wilds</em>, which is the kind of late
      where two friends have already given up trying to convince me. I started
      it on a Saturday, said "just an hour," and woke up on a Sunday morning
      having seen the sun explode{' '}
      <span className={styles.highlight}>thirty-one times</span>.
    </p>
    <p>
      The thing the game gets right — the thing I keep thinking about, in a
      way I have not been able to shake at work — is that it never gives you a
      quest. There is no checklist. The only thing pushing you forward is your
      own curiosity, plus the gentle pressure of knowing the universe is going
      to end in twenty-two minutes whether you are ready or not.
    </p>
    <p className={styles.sidenoteAnchor}>
      At work I have been calling this the <strong>curiosity loop</strong>. Most
      roadmaps optimize for <em>execution</em> — making sure the next thing is
      the right thing.
      <span className={styles.sidenote}>
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
  const { weather, isNight, vars } = usePageTheme();

  const post = POSTS.find((p) => p.id === id) || POSTS[0];
  const postIndex = POSTS.findIndex((p) => p.id === post.id);
  const nextPost = POSTS[postIndex + 1] || null;

  return (
    <div className={styles.page} data-night={isNight} style={vars}>
      <div className={styles.skyHeader}>
        <WeatherSky weather={weather} />
        <NavDesktop active="writing" />
      </div>

      <div className={styles.layout}>
        <article className={styles.article}>
          <Link to="/writing" className={styles.back}>← back to writing</Link>

          {/* Meta */}
          <div className={styles.meta}>
            <span className={styles.metaAccent}>{post.sub} · {post.cat}</span>
            <span className={styles.dot}>·</span>
            <span className={styles.metaDim}>{fmtDate(post.date)} · {post.read} min</span>
          </div>

          {/* Title */}
          <h1 className={styles.title}>{post.title}</h1>

          {post.rating && (
            <div className={styles.ratingWrap}>
              <RatingChip kind={post.rating} size="lg" dark={isNight} />
            </div>
          )}

          {/* Lede */}
          <p className={styles.lede}>{post.blurb}</p>

          <hr className={styles.rule} />

          {/* Body */}
          <div className={styles.body}>
            {post.id === 'outer-wilds' ? OUTER_WILDS_BODY : (
              <p style={{ marginTop: 0, fontStyle: 'italic', opacity: 0.6 }}>
                Full post coming soon.
              </p>
            )}
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <div>
              <MonoLabel>Tagged</MonoLabel>
              <div className={styles.tagList}>
                {post.tags.map((t) => <span key={t}>#{t}</span>)}
              </div>
            </div>
            {nextPost && (
              <Link to={`/writing/${nextPost.id}`} className={styles.next}>
                <MonoLabel>Next</MonoLabel>
                <div className={styles.nextTitle}>{nextPost.title} →</div>
              </Link>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
