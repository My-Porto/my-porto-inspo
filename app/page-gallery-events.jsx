/* global React, useI18n, useRouter, I, Aurora, Reveal, EVENTS */
const { useState, useMemo } = React;

/* ======================================================================
   GALLERY INDEX
   ====================================================================== */
const GALLERIES = [
  { id: "studio-2026",       title: "Studio, 2026",            count: 14, date: "Apr 2026", tag: "Workspace", color: "blue" },
  { id: "lagos-nights",      title: "Lagos nights",             count: 22, date: "Mar 2026", tag: "City",      color: "violet" },
  { id: "rexpond-launch",    title: "Rexpond launch day",      count: 18, date: "Feb 2026", tag: "Event",     color: "cyan" },
  { id: "build-process",     title: "The build process",        count: 9,  date: "Jan 2026", tag: "Behind",    color: "magenta" },
  { id: "speaking-tour",     title: "Speaking tour 2025",       count: 30, date: "Dec 2025", tag: "Travel",    color: "blue" },
  { id: "sketches",          title: "Sketchbook",               count: 41, date: "2024–25",  tag: "Process",   color: "violet" },
];

function GalleryPage() {
  const { t } = useI18n();
  const { go } = useRouter();
  return (
    <section className="page-gallery aurora-stage">
      <Aurora/>
      <div className="container page-head">
        <p className="t-eyebrow">Visual log · {GALLERIES.length} sets</p>
        <h1 className="t-display-xl page-title">{t("section_gallery")}<em className="t-italic">.</em></h1>
        <p className="t-lead" style={{ maxWidth: 640 }}>
          Photos from studios, events, sketchbooks, and the occasional well-lit lunch. Mostly process, some product, no filters.
        </p>
      </div>

      <div className="container gallery-grid">
        {GALLERIES.map((g, i) => {
          const colorMap = { blue: "var(--accent)", violet: "var(--aur-violet)", cyan: "var(--aur-cyan)", magenta: "var(--aur-magenta)" };
          return (
            <Reveal as="article" key={g.id} className="gallery-card glass glass-edge" delay={i*60}
                    onClick={() => go(`/gallery/${g.id}`)}>
              <div className="gallery-card-art" aria-hidden="true">
                <div className="gallery-card-bg" style={{ background: `radial-gradient(circle at 30% 30%, ${colorMap[g.color]}, transparent 70%)` }}/>
                <div className="gallery-card-stack">
                  <div className="gallery-thumb img-placeholder" style={{ transform: 'rotate(-4deg)' }}>{g.tag} 01</div>
                  <div className="gallery-thumb img-placeholder" style={{ transform: 'rotate(2deg) translateY(8px)' }}>{g.tag} 02</div>
                  <div className="gallery-thumb img-placeholder" style={{ transform: 'rotate(-1deg) translateY(-4px)' }}>{g.tag} 03</div>
                </div>
              </div>
              <div className="gallery-card-body">
                <div className="gallery-card-meta">
                  <span className="t-mono">{g.tag}</span>
                  <span className="t-mono">{g.count} photos</span>
                </div>
                <h3 className="t-display-md gallery-title">{g.title}</h3>
                <p className="t-mono" style={{ color: 'var(--fg-muted)' }}>{g.date}</p>
              </div>
              <div className="gallery-card-arrow"><I.ArrowUR size={20}/></div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ======================================================================
   GALLERY DETAIL
   ====================================================================== */
function GalleryDetailPage({ id }) {
  const { t } = useI18n();
  const { go } = useRouter();
  const g = GALLERIES.find(x => x.id === id) || GALLERIES[0];
  const [active, setActive] = useState(null);
  const layouts = ["lg", "sm", "md", "sm", "md", "lg", "sm", "md", "sm", "md", "lg", "sm", "md", "sm"];
  const items = Array.from({ length: g.count }, (_, i) => ({ idx: i, layout: layouts[i % layouts.length] }));

  return (
    <section className="page-gallery-detail aurora-stage">
      <Aurora/>
      <div className="container">
        <button className="btn btn-glass btn-back" onClick={() => go("/gallery")}>
          <I.ArrowL size={14}/> {t("cta_back")} to {t("nav_gallery").toLowerCase()}
        </button>

        <header className="detail-head">
          <span className="chip"><I.Camera size={12}/>{g.tag} · {g.date}</span>
          <h1 className="t-display-xl detail-title">{g.title}<em className="t-italic">.</em></h1>
          <p className="t-lead" style={{ maxWidth: 640 }}>
            {g.count} frames from this set. Drop me a note if you want one in print.
          </p>
        </header>

        <div className="masonry">
          {items.map((it, i) => (
            <Reveal key={i} className={`masonry-item m-${it.layout}`} delay={i*30}
                    onClick={() => setActive(i)}>
              <div className="masonry-img img-placeholder">
                <span>{g.title} · {String(i + 1).padStart(2, '0')}</span>
              </div>
              <span className="masonry-overlay"><I.Plus size={20}/></span>
            </Reveal>
          ))}
        </div>
      </div>

      {active !== null && (
        <div className="lightbox" onClick={() => setActive(null)}>
          <button className="lightbox-close btn btn-glass btn-icon"><I.Close size={16}/></button>
          <div className="lightbox-frame img-placeholder" onClick={(e) => e.stopPropagation()}>
            <span>{g.title} · {String(active + 1).padStart(2, '0')} / {g.count}</span>
          </div>
          <div className="lightbox-nav">
            <button className="btn btn-glass btn-icon" onClick={(e) => { e.stopPropagation(); setActive((active - 1 + g.count) % g.count); }}><I.ArrowL size={16}/></button>
            <span className="t-mono">{active + 1} / {g.count}</span>
            <button className="btn btn-glass btn-icon" onClick={(e) => { e.stopPropagation(); setActive((active + 1) % g.count); }}><I.Arrow size={16}/></button>
          </div>
        </div>
      )}
    </section>
  );
}

/* ======================================================================
   EVENTS INDEX
   ====================================================================== */
const ALL_EVENTS = [
  ...EVENTS,
  { id: "design-week",   title: "Africa Design Week", date: "Nov 18, 2025", loc: "Accra, GH",  role: "Speaker",   status: "past", topic: "Designing tools for the next billion users" },
  { id: "stripe-sessions", title: "Stripe Sessions West Africa", date: "Oct 03, 2025", loc: "Lagos, NG", role: "Panelist", status: "past", topic: "Payments infra for indie founders" },
  { id: "react-conf",   title: "React Conf 2025",     date: "May 15, 2025", loc: "Henderson, US", role: "Attendee", status: "past", topic: "Front-row of the future" },
];

function EventsPage() {
  const { t } = useI18n();
  const { go } = useRouter();
  const [tab, setTab] = useState("upcoming");
  const list = ALL_EVENTS.filter(e => e.status === tab);

  return (
    <section className="page-events aurora-stage">
      <Aurora/>
      <div className="container page-head">
        <p className="t-eyebrow">Calendar · {ALL_EVENTS.length} entries</p>
        <h1 className="t-display-xl page-title">{t("section_events")}<em className="t-italic">.</em></h1>
        <p className="t-lead" style={{ maxWidth: 640 }}>
          Stages I've been on, panels I've crashed, and meetups I'd like you to crash with me. Reach out if you're hosting something I'd love.
        </p>
        <div className="filter-row">
          <button className={`filter-pill ${tab === "upcoming" ? "is-active" : ""}`} onClick={() => setTab("upcoming")}>
            {t("upcoming")}<span className="filter-count">{ALL_EVENTS.filter(e => e.status === "upcoming").length}</span>
          </button>
          <button className={`filter-pill ${tab === "past" ? "is-active" : ""}`} onClick={() => setTab("past")}>
            {t("past")}<span className="filter-count">{ALL_EVENTS.filter(e => e.status === "past").length}</span>
          </button>
        </div>
      </div>

      <div className="container events-list">
        {list.map((e, i) => (
          <Reveal as="article" key={e.id} className="event-row glass glass-edge" delay={i*60}
                  onClick={() => go(`/events/${e.id}`)}>
            <div className="event-row-date">
              <span className="event-day">{e.date.split(' ')[1].replace(',','')}</span>
              <span className="t-mono">{e.date.split(' ')[0]}</span>
              <span className="t-mono">{e.date.split(' ')[2]}</span>
            </div>
            <div className="event-row-body">
              <div className="event-row-meta">
                <span className="chip"><span className="chip-dot"/>{t(e.status)}</span>
                <span className="t-mono">{e.role}</span>
                <span className="t-mono"><I.MapPin size={12}/> {e.loc}</span>
              </div>
              <h2 className="t-display-md event-row-title">{e.title}</h2>
              <p className="event-row-topic">{e.topic}</p>
            </div>
            <div className="event-row-arrow"><I.ArrowUR size={22}/></div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ======================================================================
   EVENT DETAIL
   ====================================================================== */
function EventDetailPage({ id }) {
  const { t } = useI18n();
  const { go } = useRouter();
  const e = ALL_EVENTS.find(x => x.id === id) || ALL_EVENTS[0];

  return (
    <section className="page-event-detail aurora-stage">
      <Aurora/>
      <div className="container">
        <button className="btn btn-glass btn-back" onClick={() => go("/events")}>
          <I.ArrowL size={14}/> {t("cta_back")} to {t("nav_events").toLowerCase()}
        </button>

        <header className="detail-head">
          <span className="chip"><span className="chip-dot"/>{t(e.status)} · {e.role}</span>
          <h1 className="t-display-xl detail-title">{e.title}<em className="t-italic">.</em></h1>
          <p className="t-lead" style={{ maxWidth: 720 }}>{e.topic}</p>

          <div className="detail-meta">
            <div className="detail-meta-card glass">
              <p className="t-eyebrow">Date</p>
              <p>{e.date}</p>
            </div>
            <div className="detail-meta-card glass">
              <p className="t-eyebrow">Location</p>
              <p>{e.loc}</p>
            </div>
            <div className="detail-meta-card glass">
              <p className="t-eyebrow">Role</p>
              <p>{e.role}</p>
            </div>
            <div className="detail-meta-card glass">
              <p className="t-eyebrow">Status</p>
              <p>{t(e.status)}</p>
            </div>
          </div>
        </header>

        <div className="detail-hero glass glass-edge event-hero">
          <div className="event-hero-bg" aria-hidden="true">
            <svg viewBox="0 0 600 380" preserveAspectRatio="xMidYMid slice">
              <defs>
                <radialGradient id="eh1" cx="40%" cy="50%">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.7"/>
                  <stop offset="100%" stopColor="var(--aur-violet)" stopOpacity="0"/>
                </radialGradient>
              </defs>
              <rect width="600" height="380" fill="url(#eh1)"/>
              <g stroke="white" strokeOpacity="0.3" fill="none">
                {Array.from({length: 30}).map((_,i) => <line key={i} x1={0} y1={i*14} x2={600} y2={i*14 + 100} strokeWidth="0.5"/>)}
              </g>
            </svg>
          </div>
          <div className="event-hero-content">
            <p className="t-mono">{e.date} · {e.loc}</p>
            <h2 className="t-display-lg" style={{ color: 'white', maxWidth: 700 }}>{e.topic}</h2>
          </div>
        </div>

        <div className="detail-grid">
          <aside className="detail-aside">
            <p className="t-eyebrow">Talk details</p>
            <div className="event-info-card glass">
              <I.Calendar size={16}/>
              <div><p className="t-mono">When</p><p>{e.date}</p></div>
            </div>
            <div className="event-info-card glass">
              <I.MapPin size={16}/>
              <div><p className="t-mono">Where</p><p>{e.loc}</p></div>
            </div>
            <div className="event-info-card glass">
              <I.Briefcase size={16}/>
              <div><p className="t-mono">Role</p><p>{e.role}</p></div>
            </div>
            {e.status === "upcoming" && (
              <a href="#" onClick={(ev)=>ev.preventDefault()} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Add to calendar<I.ArrowUR size={14}/>
              </a>
            )}
          </aside>

          <div className="detail-body">
            <h2 className="t-display-md">About the talk</h2>
            <p className="t-lead">{e.topic}. This session digs into what actually works when you're standing between an idea and a real shipping product, with a specific lens on the realities of building from anywhere.</p>

            <h2 className="t-display-md">What we'll cover</h2>
            <ul className="detail-list">
              <li>The five-question test for ideas worth chasing</li>
              <li>Why "founder mode" is a posture, not a job title</li>
              <li>How to tell whether your team needs a process or a conversation</li>
              <li>Real examples from Rexpond's first 18 months</li>
            </ul>

            <h2 className="t-display-md">Who it's for</h2>
            <p>Engineers thinking about founding something. Founders who haven't shipped yet. Designers tired of pitching upward. Anyone who's been called "too early."</p>

            <div className="detail-pullquote glass glass-edge">
              <I.Quote size={22} style={{ color: 'var(--accent)', opacity: 0.7, marginBottom: 8 }}/>
              <p>&ldquo;The first 90 days of a startup is mostly bookkeeping. The work that matters is what you do with the next 900.&rdquo;</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ======================================================================
   CONTACT (lightweight)
   ====================================================================== */
function ContactPage() {
  const { t } = useI18n();
  const { go } = useRouter();
  const [step, setStep] = useState("idea");
  const [form, setForm] = useState({ name: "", email: "", idea: "", budget: "", timeline: "" });
  const [sent, setSent] = useState(false);

  const submit = (ev) => {
    ev.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <section className="page-contact aurora-stage">
        <Aurora/>
        <div className="container-tight contact-success">
          <div className="success-mark"><I.Check size={32}/></div>
          <h1 className="t-display-lg">Got it<em className="t-italic">.</em></h1>
          <p className="t-lead">I read every message — usually within 48 hours. If your project sounds like a fit, I'll reply with a short proposal and a calendar link. Otherwise I'll send a thoughtful no.</p>
          <button className="btn btn-glass" onClick={() => go("/")}>{t("cta_back")} home<I.Arrow size={14}/></button>
        </div>
      </section>
    );
  }

  return (
    <section className="page-contact aurora-stage">
      <Aurora/>
      <div className="container-tight">
        <div className="page-head">
          <p className="t-eyebrow">Collab · {t("cta_collab")}</p>
          <h1 className="t-display-xl page-title">Let's build <em className="t-italic">something</em></h1>
          <p className="t-lead" style={{ maxWidth: 640 }}>
            Tell me a bit about what you're working on. I take 2-3 collaborations a quarter, and I prefer projects where the brief is half-formed.
          </p>
        </div>
        <form className="contact-form glass glass-edge" onSubmit={submit}>
          <div className="contact-progress">
            <div className={`contact-step ${step === "idea" ? "is-active" : ""}`} onClick={() => setStep("idea")}><span>01</span>The idea</div>
            <div className={`contact-step ${step === "you" ? "is-active" : ""}`} onClick={() => setStep("you")}><span>02</span>About you</div>
            <div className={`contact-step ${step === "send" ? "is-active" : ""}`} onClick={() => setStep("send")}><span>03</span>Send</div>
          </div>

          {step === "idea" && (
            <div className="form-step">
              <label className="form-field">
                <span className="t-eyebrow">What are you building?</span>
                <textarea required value={form.idea} onChange={e => setForm({...form, idea: e.target.value})}
                          placeholder="A sentence is enough. A paragraph is great." rows={5}/>
              </label>
              <div className="form-row">
                <label className="form-field">
                  <span className="t-eyebrow">Budget range</span>
                  <select value={form.budget} onChange={e => setForm({...form, budget: e.target.value})}>
                    <option value="">Select...</option>
                    <option>Pre-revenue / equity</option>
                    <option>$5k – $20k</option>
                    <option>$20k – $80k</option>
                    <option>$80k+</option>
                  </select>
                </label>
                <label className="form-field">
                  <span className="t-eyebrow">Timeline</span>
                  <select value={form.timeline} onChange={e => setForm({...form, timeline: e.target.value})}>
                    <option value="">Select...</option>
                    <option>This week (impossible)</option>
                    <option>This month</option>
                    <option>This quarter</option>
                    <option>Just exploring</option>
                  </select>
                </label>
              </div>
              <button type="button" className="btn btn-primary" onClick={() => setStep("you")}>
                Next<I.Arrow size={14}/>
              </button>
            </div>
          )}

          {step === "you" && (
            <div className="form-step">
              <label className="form-field">
                <span className="t-eyebrow">Your name</span>
                <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="What should I call you?"/>
              </label>
              <label className="form-field">
                <span className="t-eyebrow">Email</span>
                <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@somewhere.com"/>
              </label>
              <div className="form-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setStep("idea")}><I.ArrowL size={14}/>Back</button>
                <button type="button" className="btn btn-primary" onClick={() => setStep("send")}>Review<I.Arrow size={14}/></button>
              </div>
            </div>
          )}

          {step === "send" && (
            <div className="form-step">
              <div className="form-review">
                <p className="t-eyebrow">From</p>
                <p>{form.name || "—"} · {form.email || "—"}</p>
                <p className="t-eyebrow">The idea</p>
                <p style={{ whiteSpace: 'pre-wrap' }}>{form.idea || "—"}</p>
                <p className="t-eyebrow">Budget · Timeline</p>
                <p>{form.budget || "—"} · {form.timeline || "—"}</p>
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setStep("you")}><I.ArrowL size={14}/>Back</button>
                <button type="submit" className="btn btn-primary">Send<I.ArrowUR size={14}/></button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

window.GalleryPage = GalleryPage;
window.GalleryDetailPage = GalleryDetailPage;
window.EventsPage = EventsPage;
window.EventDetailPage = EventDetailPage;
window.ContactPage = ContactPage;
window.GALLERIES = GALLERIES;
window.ALL_EVENTS = ALL_EVENTS;
