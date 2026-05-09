/* global React, useI18n, useTheme, useRouter, LANGS, I, Aurora */
const { useState, useEffect, useRef } = React;

/* ======================================================================
   Top navigation — glass bar with theme + language switchers
   ====================================================================== */
function TopNav() {
  const { t, lang, setLang } = useI18n();
  const { theme, setTheme } = useTheme();
  const { path, go } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const links = [
    { key: "nav_home", path: "/" },
    { key: "nav_projects", path: "/projects" },
    { key: "nav_blog", path: "/blog" },
    { key: "nav_gallery", path: "/gallery" },
    { key: "nav_events", path: "/events" },
  ];

  const isActive = (p) => {
    if (p === "/") return path === "/" || path === "";
    return path === p || path.startsWith(p + "/");
  };

  return (
    <header className={`top-nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="top-nav-inner">
        <a href="#/" className="brand" onClick={(e) => { e.preventDefault(); go("/"); }}>
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-dot"></span>
          </span>
          <span className="brand-name">
            <span style={{ fontWeight: 600 }}>Joshua</span>
            <span className="brand-name-italic">Dickson</span>
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => (
            <a key={l.path} href={`#${l.path}`}
               onClick={(e) => { e.preventDefault(); go(l.path); }}
               className={`nav-link ${isActive(l.path) ? "is-active" : ""}`}>
              {t(l.key)}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          {/* Language */}
          <div className="lang-wrap" ref={langRef}>
            <button className="btn btn-glass btn-sm lang-btn"
                    onClick={() => setLangOpen((v) => !v)}
                    aria-haspopup="listbox" aria-expanded={langOpen}>
              <I.Globe size={14}/>
              <span className="lang-short">{LANGS.find(l => l.code === lang)?.short}</span>
              <I.Chevron size={12} style={{ transform: langOpen ? "rotate(90deg)" : "rotate(90deg)" }}/>
            </button>
            {langOpen && (
              <div className="lang-menu glass" role="listbox">
                {LANGS.map((l) => (
                  <button key={l.code}
                          className={`lang-item ${l.code === lang ? "is-active" : ""}`}
                          onClick={() => { setLang(l.code); setLangOpen(false); }}
                          role="option" aria-selected={l.code === lang}>
                    <span className="lang-item-short">{l.short}</span>
                    <span className="lang-item-label">{l.label}</span>
                    {l.code === lang && <I.Check size={14}/>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme */}
          <button className="btn btn-glass btn-icon"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  aria-label="Toggle theme">
            {theme === "light" ? <I.Moon size={16}/> : <I.Sun size={16}/>}
          </button>

          {/* CTA */}
          <a href="#/contact" onClick={(e) => { e.preventDefault(); go("/contact"); }}
             className="btn btn-primary btn-cta">
            {t("cta_collab")}
            <I.Arrow size={14}/>
          </a>

          <button className="btn btn-glass btn-icon nav-burger"
                  onClick={() => setMobileOpen(true)}
                  aria-label="Menu">
            <I.Menu size={16}/>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="mobile-drawer" onClick={() => setMobileOpen(false)}>
          <div className="mobile-panel glass-strong" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-head">
              <span className="t-mono">Menu</span>
              <button className="btn btn-icon btn-glass" onClick={() => setMobileOpen(false)}><I.Close size={16}/></button>
            </div>
            <nav className="mobile-links">
              {links.map((l) => (
                <a key={l.path} href={`#${l.path}`}
                   onClick={(e) => { e.preventDefault(); go(l.path); setMobileOpen(false); }}
                   className={`mobile-link ${isActive(l.path) ? "is-active" : ""}`}>
                  <span>{t(l.key)}</span>
                  <I.Arrow size={16}/>
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

window.TopNav = TopNav;

/* ======================================================================
   Footer
   ====================================================================== */
function Footer() {
  const { t, lang } = useI18n();
  const { go } = useRouter();
  const [copied, setCopied] = useState(false);
  const email = "joshua@thetechmural.com";
  const copy = () => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <footer className="footer aurora-stage">
      <Aurora/>
      <div className="container footer-inner">
        <div className="footer-cta glass glass-edge">
          <div className="footer-cta-text">
            <p className="t-eyebrow">{t("section_collab")}</p>
            <h3 className="t-display-lg">
              Let's build something <em className="t-italic">extraordinary</em>.
            </h3>
            <p className="t-lead" style={{ maxWidth: 540 }}>
              I'm always up for a conversation about products, founding teams, and elegant systems.
            </p>
          </div>
          <div className="footer-cta-actions">
            <button className="btn btn-primary" onClick={copy}>
              {copied ? t("copied") : email}
              {copied ? <I.Check size={14}/> : <I.Copy size={14}/>}
            </button>
            <a href="#/contact" onClick={(e) => { e.preventDefault(); go("/contact"); }}
               className="btn btn-glass">{t("cta_book")}<I.ArrowUR size={14}/></a>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <div className="brand">
              <span className="brand-mark"><span className="brand-dot"></span></span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>Joshua Dickson</span>
            </div>
            <p className="t-meta" style={{ marginTop: 16 }}>{t("footer_copy")} © {new Date().getFullYear()}</p>
          </div>
          <div className="footer-col">
            <p className="t-eyebrow">Site</p>
            <a href="#/" onClick={(e)=>{e.preventDefault();go("/");}}>{t("nav_home")}</a>
            <a href="#/projects" onClick={(e)=>{e.preventDefault();go("/projects");}}>{t("nav_projects")}</a>
            <a href="#/blog" onClick={(e)=>{e.preventDefault();go("/blog");}}>{t("nav_blog")}</a>
            <a href="#/gallery" onClick={(e)=>{e.preventDefault();go("/gallery");}}>{t("nav_gallery")}</a>
            <a href="#/events" onClick={(e)=>{e.preventDefault();go("/events");}}>{t("nav_events")}</a>
          </div>
          <div className="footer-col">
            <p className="t-eyebrow">Ventures</p>
            <a href="#" onClick={(e)=>e.preventDefault()}>Rexpond <I.ArrowUR size={12}/></a>
            <a href="#" onClick={(e)=>e.preventDefault()}>The Tech Mural <I.ArrowUR size={12}/></a>
          </div>
          <div className="footer-col">
            <p className="t-eyebrow">Elsewhere</p>
            <a href="#" onClick={(e)=>e.preventDefault()}><I.Github size={14}/>github</a>
            <a href="#" onClick={(e)=>e.preventDefault()}><I.X size={14}/>twitter</a>
            <a href="#" onClick={(e)=>e.preventDefault()}><I.LinkedIn size={14}/>linkedin</a>
            <a href="#" onClick={(e)=>e.preventDefault()}><I.Mail size={14}/>email</a>
          </div>
        </div>

        <div className="footer-meta">
          <span className="t-mono">v2026.05 · {lang.toUpperCase()}</span>
          <span className="t-mono"><span style={{ color: "var(--accent)" }}>●</span> Available for collab</span>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
