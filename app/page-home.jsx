/* global React, useI18n, useRouter, I, Aurora, GlassSphere, GlassKnot, GlassPrism, Reveal */
const { useState, useEffect, useRef, useMemo } = React;

/* ======================================================================
   HOME PAGE
   ====================================================================== */
function HomePage() {
  return (
    <div className="page-home">
      <Hero/>
      <SelectedWork/>
      <Companies/>
      <WorldConstellation/>
      <Reviews/>
      <BlogTeaser/>
      <EventsTeaser/>
      <AboutStrip/>
    </div>
  );
}

/* -------------------- Hero -------------------- */
function Hero() {
  const { t } = useI18n();
  const [time, setTime] = useState("");

  // Live Lagos clock — small editorial detail
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const lagos = new Date(now.toLocaleString("en-US", { timeZone: "Africa/Lagos" }));
      const hh = String(lagos.getHours()).padStart(2, "0");
      const mm = String(lagos.getMinutes()).padStart(2, "0");
      const ss = String(lagos.getSeconds()).padStart(2, "0");
      setTime(`${hh}:${mm}:${ss}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero-v2">
      {/* Subtle aurora wash, no heavy bubbles */}
      <div className="hero-v2-wash" aria-hidden="true"/>
      <div className="hero-v2-grain" aria-hidden="true"/>

      <div className="container hero-v2-inner">
        {/* Top meta row — editorial */}
        <div className="hero-v2-topbar">
          <span className="t-mono">— Portfolio · 2026 / Edition I</span>
          <span className="t-mono hero-v2-clock"><span className="hero-v2-clock-dot"/>Lagos {time} WAT</span>
        </div>

        <div className="hero-v2-grid">
          {/* LEFT — Text column */}
          <div className="hero-v2-text">
            <p className="t-eyebrow hero-v2-eyebrow">
              <span className="hero-v2-num">①</span> Software Engineer &nbsp;·&nbsp; Founder &nbsp;·&nbsp; Builder of unreasonable things
            </p>

            <h1 className="hero-v2-title">
              <span className="hero-v2-line">Joshua</span>
              <span className="hero-v2-line">
                <span className="hero-v2-amp">U.</span>
                <em className="hero-v2-italic">Dickson</em>
              </span>
            </h1>

            <div className="hero-v2-rule" aria-hidden="true"/>

            <p className="hero-v2-tagline">
              I write <em className="t-italic">code</em> like it's <em className="t-italic">art</em> &mdash; founding{" "}
              <a href="#" className="hero-v2-link">Rexpond</a>, building{" "}
              <a href="#" className="hero-v2-link">The Tech Mural</a>, painting with logic and pixels from Lagos to anywhere.
            </p>

            <div className="hero-v2-cta-row">
              <a href="#/projects" className="btn btn-primary"
                 onClick={(e) => { e.preventDefault(); window.location.hash = "/projects"; }}>
                See selected work
                <I.Arrow size={14}/>
              </a>
              <a href="#/contact" className="btn btn-ghost-line"
                 onClick={(e) => { e.preventDefault(); window.location.hash = "/contact"; }}>
                Available for select projects
                <span className="hero-v2-status-dot"/>
              </a>
            </div>

            {/* Inline stat strip */}
            <dl className="hero-v2-stats">
              <div>
                <dt className="t-mono">Currently</dt>
                <dd>Founder &mdash; <em className="t-italic">Rexpond</em></dd>
              </div>
              <div>
                <dt className="t-mono">Building</dt>
                <dd><em className="t-italic">The Tech Mural</em></dd>
              </div>
              <div>
                <dt className="t-mono">Shipped with</dt>
                <dd>Teams in 15 countries</dd>
              </div>
            </dl>
          </div>

          {/* RIGHT — Portrait */}
          <div className="hero-v2-portrait-col">
            <figure className="hero-v2-portrait">
              <span className="hero-v2-portrait-tag t-mono">Joshua, 2025 &nbsp;·&nbsp; Lagos, NG</span>
              <div className="hero-v2-portrait-img-wrap">
                <img src="assets/joshua.jpg" alt="Joshua U. Dickson" className="hero-v2-portrait-img"/>
                <div className="hero-v2-portrait-overlay" aria-hidden="true"/>
                <div className="hero-v2-portrait-noise" aria-hidden="true"/>
              </div>
              <div className="hero-v2-portrait-caption">
                <span className="t-mono">N° 001</span>
                <span className="t-mono">★ self-portrait</span>
              </div>
            </figure>

            {/* Floating side notes */}
            <div className="hero-v2-note hero-v2-note-1">
              <span className="t-mono">— Now</span>
              <p>Founding <em className="t-italic">Rexpond</em>. <br/>Open to one collab in Q3.</p>
            </div>
          </div>
        </div>

        {/* Bottom marquee strip */}
        <div className="hero-v2-bottom">
          <div className="hero-v2-bottom-left">
            <span className="t-mono">Scroll</span>
            <span className="hero-v2-arrow-down">↓</span>
          </div>
          <div className="hero-v2-bottom-marks">
            <span>Engineering</span>
            <span className="hero-v2-bullet">●</span>
            <span><em className="t-italic">Founding</em></span>
            <span className="hero-v2-bullet">●</span>
            <span>Design</span>
            <span className="hero-v2-bullet">●</span>
            <span><em className="t-italic">Writing</em></span>
          </div>
          <div className="hero-v2-bottom-right t-mono">
            (01) &mdash; Hello.
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Selected Work — Bento -------------------- */
const PROJECTS = [
  { id: "rexpond", name: "Rexpond", tag: "Founder · Product", year: "2024 →", desc: "A response engine for fast-moving teams. Real-time collab, AI-assisted threads, sub-second renders.", color: "blue", size: "lg", stack: ["TypeScript", "Postgres", "WebSockets"] },
  { id: "techmural", name: "The Tech Mural", tag: "Founding", year: "2026", desc: "A visual canvas for engineering knowledge — half wiki, half art piece.", color: "violet", size: "md", stack: ["React", "Canvas", "WebGL"] },
  { id: "lumen", name: "Lumen", tag: "Engineer", year: "2024", desc: "Lighting-fast spatial search for indie commerce.", color: "cyan", size: "sm", stack: ["Rust", "FAISS"] },
  { id: "drift", name: "Drift Studio", tag: "Tech lead", year: "2023", desc: "Animation-first design tool for non-designers.", color: "magenta", size: "sm", stack: ["Svelte", "WASM"] },
  { id: "harbor", name: "Harbor", tag: "Open source", year: "2023", desc: "A lightweight container orchestrator for personal servers.", color: "blue", size: "md", stack: ["Go", "Docker"] },
];

function SelectedWork() {
  const { t } = useI18n();
  const { go } = useRouter();
  return (
    <section className="section section-projects aurora-stage">
      <Aurora/>
      <div className="container">
        <SectionHead eyebrow="01 · WORK" title={<>{t("section_projects")}<sup className="t-italic" style={{fontSize:'0.5em', verticalAlign:'super', opacity:0.6}}>(05)</sup></>}
                     desc={<>A taste of what I've built lately — products that ship, ideas that survive contact with users.</>}
                     action={<a href="#/projects" className="btn btn-ghost" onClick={(e)=>{e.preventDefault();go("/projects");}}>{t("cta_view_all")}<I.Arrow size={14}/></a>}/>

        <div className="bento">
          {PROJECTS.map((p) => <BentoCard key={p.id} project={p}/>)}
        </div>
      </div>
    </section>
  );
}

function BentoCard({ project: p }) {
  const { go } = useRouter();
  const colorMap = { blue: "var(--accent)", violet: "var(--aur-violet)", cyan: "var(--aur-cyan)", magenta: "var(--aur-magenta)" };
  return (
    <Reveal as="article" className={`bento-card glass glass-edge bento-${p.size}`} onClick={() => go(`/projects/${p.id}`)}>
      <div className="bento-aura" style={{ background: `radial-gradient(circle at 30% 20%, ${colorMap[p.color]}, transparent 65%)` }}/>
      <div className="bento-head">
        <span className="t-mono">{p.tag}</span>
        <span className="t-mono">{p.year}</span>
      </div>
      <div className="bento-art" aria-hidden="true">
        <BentoArt color={colorMap[p.color]} variant={p.id}/>
      </div>
      <div className="bento-body">
        <h3 className="t-display-md bento-name">{p.name}</h3>
        <p className="bento-desc">{p.desc}</p>
        <div className="bento-stack">
          {p.stack.map(s => <span key={s} className="chip">{s}</span>)}
        </div>
      </div>
      <div className="bento-cta">
        <span className="link-u">Case study<I.ArrowUR size={12}/></span>
      </div>
    </Reveal>
  );
}

/* Per-project decorative SVG art */
function BentoArt({ color, variant }) {
  // Different shapes per variant for visual variety
  if (variant === "rexpond") {
    return (
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id="ra" cx="30%" cy="40%"><stop offset="0%" stopColor={color} stopOpacity="0.85"/><stop offset="100%" stopColor={color} stopOpacity="0"/></radialGradient>
          <linearGradient id="rb" x1="0" x2="1"><stop offset="0%" stopColor="rgba(255,255,255,0.7)"/><stop offset="100%" stopColor="rgba(255,255,255,0.1)"/></linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#ra)" opacity="0.6"/>
        <g transform="translate(200 120)">
          {[0,1,2,3,4].map(i => (
            <circle key={i} r={30 + i*22} fill="none" stroke="url(#rb)" strokeWidth="1" opacity={0.7 - i*0.12}/>
          ))}
          <circle r="14" fill="white" opacity="0.9"/>
          <circle r="6" fill={color}/>
        </g>
      </svg>
    );
  }
  if (variant === "techmural") {
    return (
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
        <defs><radialGradient id="ta" cx="50%" cy="30%"><stop offset="0%" stopColor={color} stopOpacity="0.7"/><stop offset="100%" stopColor={color} stopOpacity="0"/></radialGradient></defs>
        <rect width="400" height="240" fill="url(#ta)"/>
        <g stroke="rgba(255,255,255,0.45)" strokeWidth="1" fill="none">
          {Array.from({length: 12}).map((_,i) => <line key={i} x1={i*36} y1="0" x2={i*36+60} y2="240"/>)}
          {Array.from({length: 8}).map((_,i) => <line key={i} x1="0" y1={i*36} x2="400" y2={i*36-30}/>)}
        </g>
        <g fill="white">
          <circle cx="120" cy="80" r="6" opacity="0.95"/>
          <circle cx="280" cy="140" r="9" opacity="0.95"/>
          <circle cx="200" cy="180" r="4" opacity="0.95"/>
          <circle cx="320" cy="60" r="5" opacity="0.85"/>
        </g>
      </svg>
    );
  }
  if (variant === "lumen") {
    return (
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
        <defs><linearGradient id="la" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.7"/><stop offset="100%" stopColor="rgba(255,255,255,0)"/></linearGradient></defs>
        <rect width="400" height="240" fill="url(#la)"/>
        <g transform="translate(200 120)" stroke="white" strokeWidth="1.2" fill="none" opacity="0.85">
          <path d="M -80 0 Q -40 -60 0 0 T 80 0"/>
          <path d="M -80 20 Q -40 -40 0 20 T 80 20"/>
          <path d="M -80 -20 Q -40 -80 0 -20 T 80 -20"/>
        </g>
      </svg>
    );
  }
  if (variant === "drift") {
    return (
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
        <defs><radialGradient id="da" cx="60%" cy="50%"><stop offset="0%" stopColor={color} stopOpacity="0.8"/><stop offset="100%" stopColor={color} stopOpacity="0"/></radialGradient></defs>
        <rect width="400" height="240" fill="url(#da)"/>
        <g transform="translate(200 120)" fill="none" stroke="white" strokeWidth="1" opacity="0.7">
          {Array.from({length: 30}).map((_,i) => {
            const a = (i/30) * Math.PI * 2;
            const r1 = 30, r2 = 90 + i*1.5;
            return <line key={i} x1={Math.cos(a)*r1} y1={Math.sin(a)*r1} x2={Math.cos(a)*r2} y2={Math.sin(a)*r2}/>;
          })}
        </g>
      </svg>
    );
  }
  // harbor
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
      <defs><linearGradient id="ha" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.6"/><stop offset="100%" stopColor="rgba(0,0,0,0)"/></linearGradient></defs>
      <rect width="400" height="240" fill="url(#ha)"/>
      <g fill="white" opacity="0.85">
        {[0,1,2,3,4].map(r => (
          [0,1,2,3,4,5,6,7].map(c => {
            const x = 60 + c * 40 + (r % 2 ? 20 : 0);
            const y = 60 + r * 30;
            const op = 0.2 + Math.sin((r+c)*1.7)*0.5 + 0.5;
            return <rect key={`${r}-${c}`} x={x} y={y} width="22" height="14" rx="3" fill="white" opacity={Math.max(0.15, Math.min(0.9, op*0.5))}/>;
          })
        ))}
      </g>
    </svg>
  );
}

/* -------------------- Companies marquee -------------------- */
const COMPANIES = [
  "Rexpond", "The Tech Mural", "Lumen Labs", "Drift Studio", "Harbor",
  "Northwind Co.", "Cobalt", "Helio Systems", "Atelier Eight", "Cascade",
];

function Companies() {
  const { t } = useI18n();
  const items = [...COMPANIES, ...COMPANIES];
  return (
    <section className="section-tight section-companies">
      <div className="container">
        <p className="t-eyebrow companies-eyebrow">02 · {t("section_companies")}</p>
      </div>
      <div className="marquee-track">
        <div className="marquee">
          {items.map((c, i) => (
            <div key={i} className="company-item">
              <span className="company-mark"></span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '-0.02em' }}>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- World constellation -------------------- */
const PINS = [
  { name: "Nigeria",       x: 53.5, y: 56, lit: true,  flag: "🇳🇬" },
  { name: "United States", x: 22,   y: 38, lit: true },
  { name: "Canada",        x: 22,   y: 28, lit: true },
  { name: "Brazil",        x: 33,   y: 64, lit: true },
  { name: "United Kingdom",x: 47,   y: 30, lit: true },
  { name: "Germany",       x: 51,   y: 32, lit: true },
  { name: "France",        x: 49,   y: 35, lit: true },
  { name: "Spain",         x: 47,   y: 38, lit: true },
  { name: "Kenya",         x: 57,   y: 60, lit: true },
  { name: "South Africa",  x: 55,   y: 76, lit: true },
  { name: "UAE",           x: 64,   y: 45, lit: true },
  { name: "India",         x: 71,   y: 50, lit: true },
  { name: "Singapore",     x: 79,   y: 60, lit: true },
  { name: "Japan",         x: 86,   y: 41, lit: true },
  { name: "Australia",     x: 87,   y: 73, lit: true },
];

function WorldConstellation() {
  const { t } = useI18n();
  return (
    <section className="section section-world aurora-stage">
      <Aurora/>
      <div className="container">
        <SectionHead eyebrow="03 · GLOBAL" title={<>{t("section_world")}<em className="t-italic">.</em></>}
                     desc={<>15 countries, dozens of teams, one shared timezone — the internet. Each pin is a team I've shipped with.</>}/>
        <div className="world glass glass-edge">
          <div className="world-stats">
            <div><span className="world-stat-num">15</span><span className="t-mono">countries</span></div>
            <div><span className="world-stat-num">42</span><span className="t-mono">collaborators</span></div>
            <div><span className="world-stat-num">∞</span><span className="t-mono">timezones</span></div>
          </div>
          <div className="world-map">
            <WorldDots/>
            <svg className="world-overlay" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {/* Connection arcs from Nigeria (home base) to other pins */}
              {PINS.filter(p => p.name !== "Nigeria").map((p) => {
                const home = PINS.find(p => p.name === "Nigeria");
                const cx = (home.x + p.x) / 2;
                const cy = Math.min(home.y, p.y) - 12;
                return (
                  <path key={p.name} d={`M ${home.x} ${home.y} Q ${cx} ${cy} ${p.x} ${p.y}`}
                        stroke="var(--accent)" strokeOpacity="0.35" strokeWidth="0.15" fill="none"/>
                );
              })}
            </svg>
            {PINS.map((p, i) => (
              <div key={p.name} className={`world-pin ${p.name === "Nigeria" ? "is-home" : ""}`}
                   style={{ left: `${p.x}%`, top: `${p.y}%`, animationDelay: `${i * 0.18}s` }}>
                <span className="world-pin-pulse"/>
                <span className="world-pin-dot"/>
                <span className="world-pin-label glass">{p.name}</span>
              </div>
            ))}
          </div>
          <div className="world-foot">
            <span className="t-mono">● home base — Lagos, Nigeria</span>
            <span className="t-mono">○ teams shipped with</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Stylized dot map — generated from a tiny continent mask */
function WorldDots() {
  // 60 cols x 28 rows mask. '#' = land, '.' = water. Approximate continent shapes.
  const MASK = [
    "............................................................",
    "...####.####...##############..............................",
    "..#####.######.################........#####...............",
    ".########.################################.................",
    "..#####################################...................",
    "....##############################.......#######...........",
    ".....##########################.........#########..........",
    "........###################...........##############.......",
    "..........###############.............################.....",
    "...........############...............#################....",
    "..............#######.................#################....",
    "...............######.............#####################....",
    "...............######...........#######################...#",
    "................######........#########################.##.",
    ".................######......##########################.##.",
    "..................#####.....##########################.##..",
    "...................###.....######################.....#....",
    "...................###....#####################............",
    "....................##....###############.....#............",
    "....................##.....##########.....................",
    "....................##.....######...........#######.......",
    ".....................#......####............#######.......",
    "..............................##.............#####........",
    ".............................................####.........",
    "..............................................##..........",
    "............................................................",
    "............................................................",
    "............................................................",
  ];
  const dots = [];
  for (let r = 0; r < MASK.length; r++) {
    for (let c = 0; c < MASK[r].length; c++) {
      if (MASK[r][c] === "#") {
        dots.push({ x: (c + 0.5) / 60 * 100, y: (r + 0.5) / 28 * 100 });
      }
    }
  }
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="world-dots" aria-hidden="true">
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="0.45" fill="currentColor" opacity="0.6"/>
      ))}
    </svg>
  );
}

/* -------------------- Reviews -------------------- */
const REVIEWS = [
  { name: "Adaeze Okonkwo", role: "PM at Northwind", q: "Joshua thinks at three layers at once: pixels, product, and platform. He shipped a feature in two weeks that our last vendor couldn't in six months." },
  { name: "Marcus Tellez",  role: "CTO, Drift",       q: "He's the rare engineer who gives you taste *and* throughput. The codebase actually got prettier as it grew." },
  { name: "Sara Lindgren",  role: "Founder, Atelier", q: "I described a feeling, he came back with a working prototype. Twice. I stopped giving briefs and started giving vibes." },
  { name: "Daniel Park",    role: "Eng lead, Cobalt", q: "Joshua is the person you want in the room when nobody knows what to build yet." },
];

function Reviews() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  return (
    <section className="section section-reviews aurora-stage">
      <Aurora/>
      <div className="container">
        <SectionHead eyebrow="04 · WORDS" title={<>{t("section_reviews")}<em className="t-italic">.</em></>}/>
        <div className="reviews-grid">
          {REVIEWS.map((r, i) => (
            <Reveal key={i} as="figure" className="review-card glass glass-edge" delay={i*60}>
              <I.Quote size={28} style={{ color: 'var(--accent)', opacity: 0.7, marginBottom: 12 }}/>
              <blockquote className="review-q">{r.q}</blockquote>
              <figcaption className="review-cap">
                <div className="review-avatar"><span>{r.name.split(' ').map(n=>n[0]).join('')}</span></div>
                <div>
                  <p className="review-name">{r.name}</p>
                  <p className="t-mono">{r.role}</p>
                </div>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Blog teaser -------------------- */
const POSTS = [
  { id: "logic-pixels",   title: "Code is art: a manifesto for engineers who care about the canvas", date: "Apr 24, 2026", read: 9, tag: "Essay" },
  { id: "founder-mode",   title: "What founder mode looks like in week 3 (it's mostly emails)",       date: "Apr 12, 2026", read: 6, tag: "Building" },
  { id: "small-systems",  title: "Small systems beat big frameworks (a case for the 200-line file)", date: "Mar 30, 2026", read: 11, tag: "Engineering" },
];

function BlogTeaser() {
  const { t } = useI18n();
  const { go } = useRouter();
  return (
    <section className="section section-blog">
      <div className="container">
        <SectionHead eyebrow="05 · JOURNAL" title={<>{t("section_blog")}<em className="t-italic">.</em></>}
                     action={<a href="#/blog" className="btn btn-ghost" onClick={(e)=>{e.preventDefault();go("/blog");}}>{t("cta_view_all")}<I.Arrow size={14}/></a>}/>
        <div className="blog-list">
          {POSTS.map((p, i) => (
            <Reveal as="article" key={p.id} className="blog-row" delay={i*60}
                    onClick={() => go(`/blog/${p.id}`)}>
              <span className="blog-row-num">0{i+1}</span>
              <div className="blog-row-body">
                <p className="t-mono">{p.tag} · {p.date} · {p.read} {t("reading_time")}</p>
                <h3 className="blog-row-title">{p.title}</h3>
              </div>
              <span className="blog-row-arrow"><I.ArrowUR size={20}/></span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Events teaser -------------------- */
const EVENTS = [
  { id: "lagos-devfest",     title: "DevFest Lagos 2026", date: "Sep 21, 2026", loc: "Lagos, NG", role: "Speaker", status: "upcoming", topic: "Founding while engineering" },
  { id: "remote-summit",     title: "Remote Builders Summit", date: "Jul 14, 2026", loc: "Virtual", role: "Panelist", status: "upcoming", topic: "Building globally distributed teams" },
  { id: "techmural-launch",  title: "The Tech Mural — Open Studio", date: "Jun 02, 2026", loc: "Online", role: "Host", status: "upcoming", topic: "Launch event + AMA" },
  { id: "rexpond-meetup",    title: "Rexpond Year One", date: "Mar 12, 2026", loc: "Lagos, NG", role: "Host", status: "past", topic: "What we shipped, what we learned" },
];

function EventsTeaser() {
  const { t } = useI18n();
  const { go } = useRouter();
  return (
    <section className="section-tight section-events aurora-stage">
      <Aurora/>
      <div className="container">
        <SectionHead eyebrow="06 · STAGE" title={<>{t("section_events")}<em className="t-italic">.</em></>}
                     action={<a href="#/events" className="btn btn-ghost" onClick={(e)=>{e.preventDefault();go("/events");}}>{t("cta_view_all")}<I.Arrow size={14}/></a>}/>
        <div className="events-grid">
          {EVENTS.slice(0,3).map((e, i) => (
            <Reveal as="article" key={e.id} className="event-card glass glass-edge" delay={i*80}
                    onClick={() => go(`/events/${e.id}`)}>
              <div className="event-card-head">
                <span className="chip"><span className="chip-dot"/>{t(e.status === "upcoming" ? "upcoming" : "past")}</span>
                <span className="t-mono">{e.role}</span>
              </div>
              <p className="event-date">
                <I.Calendar size={14}/> {e.date}
              </p>
              <h3 className="event-title">{e.title}</h3>
              <p className="event-topic">{e.topic}</p>
              <p className="event-loc"><I.MapPin size={12}/> {e.loc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- About Strip -------------------- */
function AboutStrip() {
  const { t } = useI18n();
  return (
    <section className="section section-about aurora-stage">
      <Aurora/>
      <div className="container about-grid">
        <div className="about-left">
          <p className="t-eyebrow">07 · {t("section_about")}</p>
          <h2 className="t-display-lg about-title">
            I build <em className="t-italic">unreasonable</em> things, then make them feel inevitable.
          </h2>
        </div>
        <div className="about-right">
          <p className="t-lead">
            I'm a software engineer and founder based in Lagos. I started <strong>Rexpond</strong> to give teams a faster way to handle response loops, and I'm building <em className="t-italic">The Tech Mural</em> to turn engineering knowledge into something you can stand inside.
          </p>
          <p className="t-lead">
            Before that, I shipped products with teams across 15 countries — sometimes as a lead, sometimes as the only engineer in a Discord call at 3am. I care about taste, speed, and the boring parts of systems.
          </p>
          <div className="about-cards">
            <div className="about-card glass glass-edge">
              <I.Code size={22}/>
              <p className="t-eyebrow" style={{ marginTop: 12 }}>Engineering</p>
              <p>Type-safe systems, real-time infra, devtools that disappear into the work.</p>
            </div>
            <div className="about-card glass glass-edge">
              <I.Bolt size={22}/>
              <p className="t-eyebrow" style={{ marginTop: 12 }}>Founding</p>
              <p>Pre-product, hiring, ICP discovery, the first 18 painful months.</p>
            </div>
            <div className="about-card glass glass-edge">
              <I.Compass size={22}/>
              <p className="t-eyebrow" style={{ marginTop: 12 }}>Design</p>
              <p>Interface taste developed by reading too many sci-fi UIs in college.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- SectionHead helper -------------------- */
function SectionHead({ eyebrow, title, desc, action }) {
  return (
    <div className="section-head">
      <div className="section-head-text">
        <p className="t-eyebrow">{eyebrow}</p>
        <h2 className="t-display-lg section-title">{title}</h2>
        {desc && <p className="t-lead section-desc">{desc}</p>}
      </div>
      {action && <div className="section-head-action">{action}</div>}
    </div>
  );
}

window.HomePage = HomePage;
window.SectionHead = SectionHead;
window.PROJECTS = PROJECTS;
window.POSTS = POSTS;
window.EVENTS = EVENTS;
window.REVIEWS = REVIEWS;
window.PINS = PINS;
window.WorldDots = WorldDots;
window.BentoArt = BentoArt;
