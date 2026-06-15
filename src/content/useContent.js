import { useMemo } from 'react';
import { POSTS, NOW_ITEMS } from '../data/posts';
import { useContentMode } from './ContentModeContext';
import ai from './ai';
import placeholder from './placeholder';

const SETS = { ai, placeholder };

/**
 * Returns the active content for the current mode, with prose merged back onto
 * structural data:
 *  - posts: POSTS order/fields preserved, title/blurb/body overlaid from the set
 *    (also exposed as postsById for O(1) lookup in Post.js).
 *  - now: NOW_ITEMS label kept, value/sub overlaid from the set.
 * Structural fields (id/date/cat/sub/tags/rating/read, NOW_ITEMS label) never
 * come from the content sets.
 */
export function useContent() {
  const { mode } = useContentMode();

  return useMemo(() => {
    const set = mode === 'ai' ? SETS.ai : SETS.placeholder;

    const posts = POSTS.map((p) => {
      const c = set.posts[p.id] || {};
      return { ...p, title: c.title, blurb: c.blurb, body: c.body || null };
    });

    const postsById = {};
    posts.forEach((p) => { postsById[p.id] = p; });

    const now = NOW_ITEMS.map((n) => {
      const c = set.now[n.label] || {};
      return { label: n.label, value: c.value, sub: c.sub };
    });

    return {
      mode,
      home: set.home,
      about: set.about,
      writing: set.writing,
      projects: set.projects,
      posts,
      postsById,
      now,
    };
  }, [mode]);
}
