/* global React, useI18n, useRouter, I, Aurora, Reveal, SectionHead, PROJECTS, POSTS, EVENTS, BentoArt */
const { useState, useEffect, useRef, useMemo } = React;

/* ======================================================================
   PROJECTS INDEX
   ====================================================================== */
const ALL_PROJECTS = [
  ...PROJECTS,
  { id: "northwind", name: "Northwind Console", tag: "Engineer", year: "2022", desc: "Internal tooling for ops teams running on a budget.", color: "blue", size: "md", stack: ["Vue", "Node"] },
  { id: "atelier",   name: "Atelier Eight",     tag: "Tech advisor", year: "2022", desc: "A vinyl record label's e-commerce, redone with care.", color: "magenta", size: "sm", stack: ["Next.js"] },
  { id: "cobalt",    name: "Cobalt SDK",        tag: "Engineer", year: "2021", desc: "TypeScript SDK for streaming infra. 50KB gzipped, runs on every JS runtime.", color: "cyan", size: "sm", stack: ["TS", "Streams"] },
];

function ProjectsPage() {
  const { t } = useI18n();
  const { go } = useRouter();
  const [filter, setFilter] = useState("all");
  const filters = [
    { k: "all", label: "All", count: ALL_PROJECTS.length },
    { k: "founder", label: "As Founder", count: ALL_PROJECTS.filter(p => p.tag.includes("Founder")).length },
    { k: "engineer", label: "As Engineer", count: ALL_PROJECTS.filter(p => p.tag.includes("Engineer") || p.tag.includes("Tech")).length },
    { k: "open", label: "Open Source", count: ALL_PROJECTS.filter(p => p.tag.includes("Open")).length },
  ];
  const list = useMemo(() => {
    if (filter === "all") return ALL_PROJECTS;
    if (filter === "founder") return ALL_PROJECTS.filter(p => p.tag.includes("Founder"));
    if (filter === "engineer") return ALL_PROJECTS.filter(p => p.tag.includes("Engineer") || p.tag.includes("Tech"));
    if (filter === "open") return ALL_PROJECTS.filter(p => p.tag.includes("Open"));
    return ALL_PROJECTS;
  }, [filter]);

  return (
    <section className="page-projects aurora-stage">
      <Aurora/>
      <div className="container page-head">
        <p className="t-eyebrow">Index · {ALL_PROJECTS.length} projects</p>
        <h1 className="t-display-xl page-title">{t("nav_projects")}<em className="t-italic">.</em></h1>
        <p className="t-lead" style={{ maxWidth: 640 }}>
          A working catalog of what I've shipped, broken, and shipped again. Filter by hat — engineer, founder, open source — or scan the whole shelf.
        </p>
        <div className="filter-row">
          {filters.map(f => (
            <button key={f.k} className={`filter-pill ${filter === f.k ? "is-active" : ""}`}
                    onClick={() => setFilter(f.k)}>
              <span>{f.label}</span>
              <span className="filter-count">{f.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="container projects-grid">
        {list.map((p, i) => (
          <Reveal as="article" key={p.id} className="project-row glass glass-edge" delay={i*40}
                  onClick={() => go(`/projects/${p.id}`)}>
            <div className="project-row-art" aria-hidden="true">
              <BentoArt color={p.color === 'blue' ? 'var(--accent)' : p.color === 'violet' ? 'var(--aur-violet)' : p.color === 'cyan' ? 'var(--aur-cyan)' : 'var(--aur-magenta)'} variant={p.id}/>
            </div>
            <div className="project-row-body">
              <div className="project-row-meta">
                <span className="t-mono">{p.tag}</span>
                <span className="t-mono">{p.year}</span>
              </div>
              <h2 className="t-display-md project-row-title">{p.name}</h2>
              <p className="project-row-desc">{p.desc}</p>
              <div className="bento-stack">
                {p.stack.map(s => <span key={s} className="chip">{s}</span>)}
              </div>
            </div>
            <div className="project-row-arrow"><I.ArrowUR size={22}/></div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ======================================================================
   PROJECT DETAIL
   ====================================================================== */
function ProjectDetailPage({ id }) {
  const { t } = useI18n();
  const { go } = useRouter();
  const project = ALL_PROJECTS.find(p => p.id === id) || ALL_PROJECTS[0];
  const colorMap = { blue: "var(--accent)", violet: "var(--aur-violet)", cyan: "var(--aur-cyan)", magenta: "var(--aur-magenta)" };

  return (
    <section className="page-detail aurora-stage">
      <Aurora/>
      <div className="container">
        <button className="btn btn-glass btn-back" onClick={() => go("/projects")}>
          <I.ArrowL size={14}/> {t("cta_back")} to {t("nav_projects").toLowerCase()}
        </button>

        <header className="detail-head">
          <div className="detail-head-text">
            <p className="t-eyebrow">{project.tag} · {project.year}</p>
            <h1 className="t-display-xl detail-title">
              {project.name}<em className="t-italic" style={{ color: colorMap[project.color] }}>.</em>
            </h1>
            <p className="t-lead" style={{ maxWidth: 720 }}>{project.desc}</p>
            <div className="detail-meta">
              <div className="detail-meta-card glass">
                <p className="t-eyebrow">Role</p>
                <p>{project.tag}</p>
              </div>
              <div className="detail-meta-card glass">
                <p className="t-eyebrow">Stack</p>
                <p>{project.stack.join(" · ")}</p>
              </div>
              <div className="detail-meta-card glass">
                <p className="t-eyebrow">Year</p>
                <p>{project.year}</p>
              </div>
              <div className="detail-meta-card glass">
                <p className="t-eyebrow">Status</p>
                <p><span className="status-dot"/>Live</p>
              </div>
            </div>
          </div>
        </header>

        <div className="detail-hero glass glass-edge">
          <BentoArt color={colorMap[project.color]} variant={project.id}/>
        </div>

        <div className="detail-grid">
          <aside className="detail-aside">
            <p className="t-eyebrow">Contents</p>
            <a href="#overview">Overview</a>
            <a href="#problem">Problem</a>
            <a href="#approach">Approach</a>
            <a href="#outcome">Outcome</a>
          </aside>
          <div className="detail-body">
            <section id="overview">
              <h2 className="t-display-md">Overview</h2>
              <p className="t-lead">
                {project.name} began as a hunch — a feeling that the existing tools in this space were too clever for their own good and not clever enough for their users.
                Over the course of {project.year.includes("→") ? "an ongoing build" : "several months"}, it grew into a small but uncompromising product.
              </p>
            </section>
            <section id="problem">
              <h2 className="t-display-md">The problem</h2>
              <p>Teams were stuck juggling three tools to do one job, and the cracks between those tools were where all the actual work fell through. Most products were optimized for adding features. We wanted to ship the absence of features — fewer steps, fewer surfaces, fewer surprises.</p>
              <ul className="detail-list">
                <li>Existing solutions felt heavy, even on the empty state.</li>
                <li>Teams under 20 people were paying enterprise pricing.</li>
                <li>Power users needed shortcuts that interns couldn't break.</li>
              </ul>
            </section>
            <section id="approach">
              <h2 className="t-display-md">The approach</h2>
              <p>I started with a one-page <em className="t-italic">user fable</em> — a story about Maya, a 31-year-old ops lead at a 12-person startup. Every product decision had to make Maya's day better. Anything that didn't, we cut. We shipped the first usable build in 14 days.</p>
              <div className="detail-pullquote glass glass-edge">
                <I.Quote size={22} style={{ color: 'var(--accent)', opacity: 0.7, marginBottom: 8 }}/>
                <p>&ldquo;We didn't write a roadmap until we had ten users who would scream if we deleted the product overnight.&rdquo;</p>
              </div>
            </section>
            <section id="outcome">
              <h2 className="t-display-md">Outcome</h2>
              <div className="detail-stats">
                <div className="detail-stat glass"><span className="detail-stat-num">14</span><span className="t-mono">days to v1</span></div>
                <div className="detail-stat glass"><span className="detail-stat-num">62%</span><span className="t-mono">setup time saved</span></div>
                <div className="detail-stat glass"><span className="detail-stat-num">200+</span><span className="t-mono">teams using it</span></div>
              </div>
              <p>The product is alive, used daily, and still small enough to fit in one head — which is exactly the size I want it to stay.</p>
            </section>
          </div>
        </div>

        <div className="detail-next">
          <p className="t-eyebrow">Next case</p>
          <a className="next-row" href={`#/projects/${ALL_PROJECTS[(ALL_PROJECTS.indexOf(project) + 1) % ALL_PROJECTS.length].id}`}
             onClick={(e) => { e.preventDefault(); go(`/projects/${ALL_PROJECTS[(ALL_PROJECTS.indexOf(project) + 1) % ALL_PROJECTS.length].id}`); }}>
            <span className="t-display-lg">{ALL_PROJECTS[(ALL_PROJECTS.indexOf(project) + 1) % ALL_PROJECTS.length].name}</span>
            <I.ArrowUR size={28}/>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ======================================================================
   BLOG INDEX
   ====================================================================== */
const ALL_POSTS = [
  ...POSTS,
  { id: "bug-archaeology",   title: "Bug archaeology: how to read a codebase like a poem",        date: "Mar 18, 2026", read: 7, tag: "Engineering" },
  { id: "remote-rituals",    title: "The three rituals of remote teams that actually ship",      date: "Feb 28, 2026", read: 8, tag: "Building" },
  { id: "design-debt",       title: "Design debt is real, and it costs more than you think",     date: "Feb 12, 2026", read: 5, tag: "Design" },
  { id: "first-employee",    title: "Hiring your first employee when you've never been a boss",  date: "Jan 22, 2026", read: 12, tag: "Founding" },
];

function BlogPage() {
  const { t } = useI18n();
  const { go } = useRouter();
  const [tag, setTag] = useState("All");
  const tags = ["All", ...new Set(ALL_POSTS.map(p => p.tag))];
  const list = tag === "All" ? ALL_POSTS : ALL_POSTS.filter(p => p.tag === tag);

  return (
    <section className="page-blog aurora-stage">
      <Aurora/>
      <div className="container page-head">
        <p className="t-eyebrow">Notes · {ALL_POSTS.length} entries</p>
        <h1 className="t-display-xl page-title">From the <em className="t-italic">journal</em></h1>
        <p className="t-lead" style={{ maxWidth: 640 }}>
          Long-form thinking about engineering, founding, design, and the strange overlap between them. Updated when I have something to say, not on a schedule.
        </p>
        <div className="filter-row">
          {tags.map(t2 => (
            <button key={t2} className={`filter-pill ${tag === t2 ? "is-active" : ""}`}
                    onClick={() => setTag(t2)}>
              {t2}
            </button>
          ))}
        </div>
      </div>

      <div className="container">
        <article className="blog-feature glass glass-edge"
                 onClick={() => go(`/blog/${ALL_POSTS[0].id}`)}>
          <div className="blog-feature-art" aria-hidden="true">
            <svg viewBox="0 0 600 380" preserveAspectRatio="xMidYMid slice">
              <defs>
                <radialGradient id="bf1" cx="30%" cy="30%">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.65"/>
                  <stop offset="100%" stopColor="var(--aur-violet)" stopOpacity="0"/>
                </radialGradient>
              </defs>
              <rect width="600" height="380" fill="url(#bf1)"/>
              <g transform="translate(300 190)" stroke="white" strokeOpacity="0.5" fill="none">
                {Array.from({length: 24}).map((_,i) => {
                  const a = (i/24) * Math.PI * 2;
                  return <line key={i} x1={0} y1={0} x2={Math.cos(a)*180} y2={Math.sin(a)*180} strokeWidth="0.6"/>;
                })}
                {[1,2,3,4].map(r => <circle key={r} r={r*38} strokeWidth="0.8" opacity={0.6 - r*0.1}/>)}
              </g>
            </svg>
          </div>
          <div className="blog-feature-body">
            <span className="chip"><span className="chip-dot"/>Featured · {ALL_POSTS[0].tag}</span>
            <h2 className="t-display-lg">{ALL_POSTS[0].title}</h2>
            <p className="t-mono">{ALL_POSTS[0].date} · {ALL_POSTS[0].read} {t("reading_time")}</p>
            <span className="link-u">{t("cta_read")}<I.ArrowUR size={14}/></span>
          </div>
        </article>

        <div className="blog-list">
          {list.slice(1).map((p, i) => (
            <Reveal as="article" key={p.id} className="blog-row" delay={i*40}
                    onClick={() => go(`/blog/${p.id}`)}>
              <span className="blog-row-num">0{i+2}</span>
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

/* ======================================================================
   BLOG POST
   ====================================================================== */
function BlogPostPage({ id }) {
  const { t } = useI18n();
  const { go } = useRouter();
  const post = ALL_POSTS.find(p => p.id === id) || ALL_POSTS[0];

  return (
    <section className="page-post aurora-stage">
      <Aurora/>
      <div className="container-tight">
        <button className="btn btn-glass btn-back" onClick={() => go("/blog")}>
          <I.ArrowL size={14}/> {t("cta_back")} to {t("nav_blog").toLowerCase()}
        </button>
        <header className="post-head">
          <span className="chip"><span className="chip-dot"/>{post.tag}</span>
          <h1 className="t-display-lg post-title">{post.title}</h1>
          <p className="post-meta">
            <span>{t("by")} <strong>Joshua U. Dickson</strong></span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.read} {t("reading_time")}</span>
          </p>
        </header>

        <div className="post-art glass glass-edge" aria-hidden="true">
          <BentoArt color="var(--accent)" variant="techmural"/>
        </div>

        <article className="post-body">
          <p className="post-lede">There's a particular shape to a piece of software that someone <em className="t-italic">cared</em> about. You can feel it before you understand it.</p>

          <p>I've started telling young engineers something that might sound a little dramatic: <strong>code is art</strong>. Not in the cute way — not a metaphor about how programmers are creative, blah blah. I mean it literally. The act of arranging logic on a screen is, structurally, the same act as arranging paint on canvas. You're constructing something out of materials that have personality.</p>

          <h2>The brushstroke is real</h2>
          <p>When you read a function written by someone who was really paying attention, you can hear them thinking. The variable names have rhythm. The early returns are placed where they relieve tension. The comment explains the <em className="t-italic">why</em> instead of restating the what. There is a brushstroke.</p>

          <pre className="post-code"><code>{`// from a real production codebase, names changed
function thawCart(stale) {
  if (!stale) return null;          // nothing to do
  if (stale.frozen_at < cutoff()) {
    return reloadFromSource(stale); // too old to trust
  }
  return Cart.from(stale);          // good as new
}`}</code></pre>

          <p>That's a tiny function. It's also a small painting. Three lines, three feelings — caution, suspicion, relief — arranged in a shape that's easy to read and impossible to misuse.</p>

          <h2>What this means in practice</h2>
          <p>If you accept that code is art, a lot of engineering disagreements get clearer. "Why do you care so much about this rename?" Because the wrong name is the wrong note. "Why are we refactoring instead of shipping?" Because the painting needs another pass before it leaves the studio. "Why does style matter?" Because <em className="t-italic">it's the thing</em>.</p>

          <p>None of this is at odds with shipping. It's the whole engine of shipping — at the speed of a craftsperson who knows their materials.</p>

          <blockquote className="post-pull">
            <I.Quote size={22} style={{ color: 'var(--accent)', opacity: 0.7, marginBottom: 8 }}/>
            <p>You don't get taste from rules. You get it from looking — at code, at users, at your own old work — until your own discomfort starts to be useful.</p>
          </blockquote>

          <h2>So how do you build it?</h2>
          <p>The same way painters do. You read more than you write. You keep a sketchbook (mine is a folder of half-built projects). You look at what you made six months ago until it makes you wince — and then you fix it.</p>
          <p>And when someone says <em className="t-italic">"isn't this overthinking it?"</em> — sometimes they're right, and you should ship. And sometimes they're wrong, and you should keep painting.</p>
        </article>

        <div className="post-foot">
          <div className="post-share">
            <span className="t-eyebrow">Share</span>
            <a href="#" onClick={(e)=>e.preventDefault()} className="btn btn-glass btn-icon"><I.X size={14}/></a>
            <a href="#" onClick={(e)=>e.preventDefault()} className="btn btn-glass btn-icon"><I.LinkedIn size={14}/></a>
            <a href="#" onClick={(e)=>e.preventDefault()} className="btn btn-glass btn-icon"><I.Copy size={14}/></a>
          </div>
        </div>
      </div>
    </section>
  );
}

window.ProjectsPage = ProjectsPage;
window.ProjectDetailPage = ProjectDetailPage;
window.BlogPage = BlogPage;
window.BlogPostPage = BlogPostPage;
window.ALL_PROJECTS = ALL_PROJECTS;
window.ALL_POSTS = ALL_POSTS;
