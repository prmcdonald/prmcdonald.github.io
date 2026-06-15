export const POSTS = [
  { id: 'outer-wilds', date: '2026-05-02', cat: 'review', sub: 'Game',
    title: 'Outer Wilds, four years late',
    blurb: 'Finishing a game everyone else finished half a decade ago, and what it taught me about how curiosity gets metabolized into product decisions.',
    tags: ['games', 'curiosity'], rating: 'highly', read: 6 },
  { id: 'roadmaps-fiction', date: '2026-04-28', cat: 'essay', sub: 'Essay',
    title: 'Roadmaps are a kind of fiction',
    blurb: 'On the stories we tell each other so a team can move. Why the lie is load-bearing, and how to keep it honest.',
    tags: ['product', 'craft'], rating: null, read: 11 },
  { id: 'view-transitions', date: '2026-04-21', cat: 'blog', sub: 'Dev',
    title: 'A weekend with view transitions',
    blurb: 'Surprisingly delightful, surprisingly fiddly. A walk-through of three patterns that hold up.',
    tags: ['code', 'web'], rating: 'recommend', read: 9 },
  { id: 'sourdough-65', date: '2026-04-14', cat: 'review', sub: 'Recipe',
    title: 'The 65% hydration loaf',
    blurb: 'My current default. The crumb is still uneven but the crust finally cracks the way I wanted.',
    tags: ['baking', 'sourdough'], rating: 'situational', read: 4 },
  { id: 'mom-test', date: '2026-04-06', cat: 'review', sub: 'Book',
    title: 'The Mom Test, on a re-read',
    blurb: 'Five years of PM work later, the parts I underlined are not the parts I would underline now.',
    tags: ['books', 'product'], rating: 'highly', read: 5 },
  { id: 'attention-budgets', date: '2026-03-29', cat: 'essay', sub: 'Essay',
    title: 'Attention is the only budget that matters',
    blurb: 'Notes on writing PRDs nobody reads, status updates nobody opens, and what to do instead.',
    tags: ['product', 'writing'], rating: null, read: 8 },
  { id: 'tunic', date: '2026-03-22', cat: 'review', sub: 'Game',
    title: 'Tunic, halfway in',
    blurb: 'A game that respects you enough to confuse you. Notes from twelve hours of being lost on purpose.',
    tags: ['games'], rating: 'highly', read: 7 },
  { id: 'no-meeting-wednesdays', date: '2026-03-15', cat: 'essay', sub: 'Essay',
    title: 'On no-meeting Wednesdays',
    blurb: 'Why the team-wide focus day works for our team, and the three meetings that stubbornly survived.',
    tags: ['product', 'craft'], rating: null, read: 6 },
  { id: 'piranesi', date: '2026-03-08', cat: 'review', sub: 'Book',
    title: 'Piranesi',
    blurb: 'A short novel about a man, a house, a sea. I will be thinking about its rooms for a long time.',
    tags: ['books'], rating: 'highly', read: 5 },
  { id: 'shortcuts-tax', date: '2026-03-01', cat: 'blog', sub: 'Dev',
    title: 'The shortcuts tax',
    blurb: 'The hidden cost of "we will productize the prototype later." A small audit of one team\'s drift.',
    tags: ['code', 'product'], rating: 'recommend', read: 7 },
  { id: 'won-want-pho', date: '2026-02-22', cat: 'review', sub: 'Restaurant',
    title: 'Wonton Want · Sunset Park',
    blurb: 'Nothing fancy, nothing hidden. Just very good wontons in very good broth, fifteen minutes from my apartment.',
    tags: ['food', 'brooklyn'], rating: 'highly', read: 3 },
  { id: 'half-baked', date: '2026-02-15', cat: 'essay', sub: 'Essay',
    title: 'In praise of half-baked ideas',
    blurb: 'A working theory about why my best thinking happens at the kitchen counter and not in the spreadsheet.',
    tags: ['craft', 'writing'], rating: null, read: 5 },
];

// Each rating carries WCAG-AA contrast pairs for both themes (text ≥ 4.5:1 on its
// chip background). Light text is used on the dark/night theme, dark text on light.
export const RATINGS = {
  highly:      { label: 'Highly recommend', glyph: '●●●●', lightText: '#1e5070', lightBg: 'rgba(42,110,154,0.12)', darkText: '#8ecbf0', darkBg: 'rgba(86,160,205,0.22)' },
  recommend:   { label: 'Recommend',        glyph: '●●●○', lightText: '#155248', lightBg: 'rgba(31,122,107,0.12)', darkText: '#74d6c0', darkBg: 'rgba(45,170,150,0.22)' },
  situational: { label: 'Neutral',          glyph: '●●○○', lightText: '#7e5a18', lightBg: 'rgba(192,138,44,0.14)', darkText: '#e6c172', darkBg: 'rgba(200,150,60,0.22)' },
  not:         { label: 'Do not recommend', glyph: '●○○○', lightText: '#7a2d2d', lightBg: 'rgba(154,58,58,0.10)',  darkText: '#f0a3a3', darkBg: 'rgba(190,90,90,0.22)' },
};

export const NOW_ITEMS = [
  { label: 'Reading',   value: 'Piranesi',     sub: 'Susanna Clarke' },
  { label: 'Listening', value: 'Hadestown',    sub: 'OBC'            },
  { label: 'Playing',   value: 'Tunic',        sub: '12h, lost'      },
  { label: 'Baking',    value: 'BB choc-chip', sub: 'batch 4 of ?'   },
];

export const fontSerif = '"Instrument Serif", Georgia, serif';
export const fontSans  = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';
export const fontMono  = '"JetBrains Mono", "SF Mono", monospace';

export const fmtDate = (iso) => {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const d = new Date(iso);
  return months[d.getMonth()] + ' ' + d.getDate();
};

export function tintForHour(h) {
  if (h < 5)    return { accent: '#5a4ea0', name: 'pre-dawn' };
  if (h < 8)    return { accent: '#d97a3c', name: 'sunrise'  };
  if (h < 17)   return { accent: '#2c6c8c', name: 'day'      };
  if (h < 19.5) return { accent: '#c84e2a', name: 'sunset'   };
  return                { accent: '#3a4ea0', name: 'night'    };
}
