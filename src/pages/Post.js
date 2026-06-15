import { useParams, Link } from 'react-router-dom';
import WeatherSky from '../components/WeatherSky';
import MonoLabel from '../components/MonoLabel';
import NavDesktop from '../components/NavDesktop';
import RatingChip from '../components/RatingChip';
import { usePageTheme } from '../hooks/usePageTheme';
import { useContent } from '../content/useContent';
import { fmtDate } from '../data/posts';
import styles from './Post.module.css';

export default function Post() {
  const { id } = useParams();
  const { weather, isNight, vars } = usePageTheme();
  const { posts, postsById } = useContent();

  const post = postsById[id] || posts[0];
  const postIndex = posts.findIndex((p) => p.id === post.id);
  const nextPost = posts[postIndex + 1] || null;

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
              <RatingChip kind={post.rating} size="lg" />
            </div>
          )}

          {/* Lede */}
          <p className={styles.lede}>{post.blurb}</p>

          <hr className={styles.rule} />

          {/* Body */}
          <div className={styles.body}>
            {post.body ? post.body(styles) : (
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
