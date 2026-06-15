/*
  Placeholder content set — lorem ipsum shown BY DEFAULT. This is the set the site
  owner rewrites by hand over time; the real copy stays in ai.js behind the star
  toggle. Same shape as ai.js. Lengths roughly match the real copy so layouts hold.
*/

const placeholder = {
  home: {
    tagline:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit — sed do eiusmod tempor incididunt ut labore et dolore magna.',
  },

  about: {
    title: (
      <>
        Lorem <em>ipsum.</em> Dolor sit amet, consectetur adipiscing{' '}
        <em>elit sed</em> do eiusmod tempor.
      </>
    ),
    bio: [
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
      </>,
      <>
        Duis aute <em>irure</em> dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
        non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum sed ut perspiciatis.
      </>,
      <>
        Unde omnis iste natus <em>error</em> sit voluptatem accusantium doloremque
        laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis
        et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
        voluptatem quia voluptas sit aspernatur aut odit aut fugit.
      </>,
      <>
        Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi
        nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
      </>,
    ],
    dayJob: {
      title: 'Lorem ipsum, ████████',
      sub: 'MMXX → present · consectetur adipiscing elit sed do.',
    },
    contact: {
      email: 'lorem.ipsum @ example.com',
      github: '@loremipsum',
      letterboxd: '@loremipsum',
      RSS: '/lorem.xml',
    },
  },

  writing: {
    title: (
      <>
        Lorem ipsum <em>dolor sit amet</em>.
      </>
    ),
    lede: 'Lorem, ipsum, dolor. Consectetur adipiscing elit sed do eiusmod tempor.',
  },

  projects: {
    title: (
      <>
        Lorem ipsum <em>dolor</em>.
      </>
    ),
  },

  now: {
    Reading: { value: 'Lorem Ipsum', sub: 'Dolor Sit' },
    Listening: { value: 'Consectetur', sub: 'OST' },
    Playing: { value: 'Adipiscing', sub: '12h, lost' },
    Baking: { value: 'Eiusmod loaf', sub: 'batch 4 of ?' },
  },

  posts: {
    'outer-wilds': {
      title: 'Lorem ipsum dolor sit amet',
      blurb:
        'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam quis nostrud.',
      body: (s) => (
        <>
          <p style={{ marginTop: 0 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation{' '}
            <span className={s.highlight}>ullamco laboris</span>.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className={s.sidenoteAnchor}>
            Sed ut perspiciatis unde omnis iste natus{' '}
            <strong>error voluptatem</strong>, totam rem aperiam eaque ipsa quae ab
            illo inventore.
            <span className={s.sidenote}>
              Lorem · neque porro quisquam est qui dolorem ipsum quia dolor sit
              amet consectetur adipiscing velit.
            </span>
          </p>
          <p>
            <em>Nemo enim</em> ipsam voluptatem quia voluptas sit aspernatur aut
            odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt.
          </p>
          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti.
          </p>
        </>
      ),
    },
    'roadmaps-fiction': { title: 'Lorem ipsum dolor sit', blurb: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', body: null },
    'view-transitions': { title: 'Sed do eiusmod tempor', blurb: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.', body: null },
    'sourdough-65': { title: 'Ut labore et dolore', blurb: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.', body: null },
    'mom-test': { title: 'Quis nostrud exercitation', blurb: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.', body: null },
    'attention-budgets': { title: 'Magna aliqua ut enim', blurb: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.', body: null },
    'tunic': { title: 'Adipiscing elit sed', blurb: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet consectetur adipiscing.', body: null },
    'no-meeting-wednesdays': { title: 'Veniam quis nostrud', blurb: 'Ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit voluptate.', body: null },
    'piranesi': { title: 'Dolore magna', blurb: 'Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.', body: null },
    'shortcuts-tax': { title: 'Commodo consequat', blurb: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.', body: null },
    'won-want-pho': { title: 'Tempor incididunt · Lorem', blurb: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.', body: null },
    'half-baked': { title: 'In voluptate velit esse', blurb: 'Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores.', body: null },
  },
};

export default placeholder;
