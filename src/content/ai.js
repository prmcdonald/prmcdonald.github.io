/*
  AI content set — the original AI-written copy. Frozen reference, shown when the
  star toggle is switched on. Same shape as placeholder.js. Only swappable PROSE
  lives here; structural post fields (id/date/cat/sub/tags/rating/read) stay in
  src/data/posts.js and are merged in by useContent().

  Rich blocks use generic <em>/<strong> (no CSS coupling). The one real post body
  is a function (s) => JSX so it can use Post.module.css classes passed by Post.js.
*/

const ai = {
  home: {
    tagline:
      "Product manager, reluctant baker, game-finisher — keeping notes on everything I'm actually spending time on.",
  },

  about: {
    title: (
      <>
        Hi, I'm <em>Preston.</em> I do product, and a lot of other things{' '}
        <em>badly enough</em> to enjoy them.
      </>
    ),
    bio: [
      <>
        I'm a product manager, currently shipping things at a software company in
        New York. Before that: a couple of startups, a brief stint as the worst
        engineer on a small team, a degree I am not going to bring up.
      </>,
      <>
        What I'm <em>about</em>, professionally, is the part of product work that
        doesn't fit on the roadmap. The "huh, that's strange" moments. The user
        interview where someone says one offhand thing that quietly invalidates
        your entire quarter. I write about that here, in the essays.
      </>,
      <>
        What I'm about, <em>off</em>-clock, is harder to summarize, which is why
        this site exists. I read a lot. I bake bread that comes out about 70% of
        the way to what I'm trying to do. I play games four years after everyone
        else, when they've already gone on sale and I can buy them guilt-free. I
        cook things from cookbooks I bought at estate sales.
      </>,
      <>
        None of this is monetized. I'm not building a personal brand. This is a
        place I park my thinking so it doesn't all live in the Notes app.
      </>,
    ],
    dayJob: {
      title: 'Senior PM, ████████',
      sub: '2023 → present · I work on the part most people don\'t see.',
    },
    contact: {
      email: 'p.mcdonald @ this domain',
      github: '@prestonmcd',
      letterboxd: '@prestonmcd',
      RSS: '/feed.xml',
    },
  },

  writing: {
    title: (
      <>
        Everything I've <em>bothered to write down</em>.
      </>
    ),
    lede: 'Reviews, essays, dev notes. Filter by what you\'re in the mood for, or just scroll.',
  },

  projects: {
    title: (
      <>
        Things I've <em>built</em>.
      </>
    ),
  },

  // keyed by NOW_ITEMS label (label stays real; value + sub swap)
  now: {
    Reading: { value: 'Piranesi', sub: 'Susanna Clarke' },
    Listening: { value: 'Hadestown', sub: 'OBC' },
    Playing: { value: 'Tunic', sub: '12h, lost' },
    Baking: { value: 'BB choc-chip', sub: 'batch 4 of ?' },
  },

  // keyed by post id; only swappable fields. body: (styles) => JSX | null
  posts: {
    'outer-wilds': {
      title: 'Outer Wilds, four years late',
      blurb:
        'Finishing a game everyone else finished half a decade ago, and what it taught me about how curiosity gets metabolized into product decisions.',
      body: (s) => (
        <>
          <p style={{ marginTop: 0 }}>
            I am four years late to <em>Outer Wilds</em>, which is the kind of late
            where two friends have already given up trying to convince me. I started
            it on a Saturday, said "just an hour," and woke up on a Sunday morning
            having seen the sun explode{' '}
            <span className={s.highlight}>thirty-one times</span>.
          </p>
          <p>
            The thing the game gets right — the thing I keep thinking about, in a
            way I have not been able to shake at work — is that it never gives you a
            quest. There is no checklist. The only thing pushing you forward is your
            own curiosity, plus the gentle pressure of knowing the universe is going
            to end in twenty-two minutes whether you are ready or not.
          </p>
          <p className={s.sidenoteAnchor}>
            At work I have been calling this the <strong>curiosity loop</strong>. Most
            roadmaps optimize for <em>execution</em> — making sure the next thing is
            the right thing.
            <span className={s.sidenote}>
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
      ),
    },
    'roadmaps-fiction': { title: 'Roadmaps are a kind of fiction', blurb: 'On the stories we tell each other so a team can move. Why the lie is load-bearing, and how to keep it honest.', body: null },
    'view-transitions': { title: 'A weekend with view transitions', blurb: 'Surprisingly delightful, surprisingly fiddly. A walk-through of three patterns that hold up.', body: null },
    'sourdough-65': { title: 'The 65% hydration loaf', blurb: 'My current default. The crumb is still uneven but the crust finally cracks the way I wanted.', body: null },
    'mom-test': { title: 'The Mom Test, on a re-read', blurb: 'Five years of PM work later, the parts I underlined are not the parts I would underline now.', body: null },
    'attention-budgets': { title: 'Attention is the only budget that matters', blurb: 'Notes on writing PRDs nobody reads, status updates nobody opens, and what to do instead.', body: null },
    'tunic': { title: 'Tunic, halfway in', blurb: 'A game that respects you enough to confuse you. Notes from twelve hours of being lost on purpose.', body: null },
    'no-meeting-wednesdays': { title: 'On no-meeting Wednesdays', blurb: 'Why the team-wide focus day works for our team, and the three meetings that stubbornly survived.', body: null },
    'piranesi': { title: 'Piranesi', blurb: 'A short novel about a man, a house, a sea. I will be thinking about its rooms for a long time.', body: null },
    'shortcuts-tax': { title: 'The shortcuts tax', blurb: 'The hidden cost of "we will productize the prototype later." A small audit of one team\'s drift.', body: null },
    'won-want-pho': { title: 'Wonton Want · Sunset Park', blurb: 'Nothing fancy, nothing hidden. Just very good wontons in very good broth, fifteen minutes from my apartment.', body: null },
    'half-baked': { title: 'In praise of half-baked ideas', blurb: 'A working theory about why my best thinking happens at the kitchen counter and not in the spreadsheet.', body: null },
  },
};

export default ai;
