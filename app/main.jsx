/* global React, ReactDOM,
   I18nProvider, ThemeProvider, RouterProvider, useRouter, useI18n, useTheme,
   TopNav, Footer, HomePage, ProjectsPage, ProjectDetailPage, BlogPage, BlogPostPage,
   GalleryPage, GalleryDetailPage, EventsPage, EventDetailPage, ContactPage,
   TweaksPanel, useTweaks, TweakSection, TweakSlider, TweakColor, TweakRadio, TweakSelect, TweakToggle */
const { useEffect, useMemo } = React;

/* ======================================================================
   Tweakable defaults — block parsed by host for persistence
   ====================================================================== */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#0047AB",
  "glassBlur": 20,
  "glassSaturate": 1.4,
  "gradient": "aurora",
  "density": "normal",
  "type": "spaceGrotesk"
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = ["#0047AB", "#1D4ED8", "#3B5BFF", "#4F46E5", "#0F766E"];
const GRADIENT_OPTIONS = [
  { v: "aurora",    label: "Aurora",   colors: ["#0047AB", "#6D28D9", "#06B6D4"] },
  { v: "cobalt",    label: "Mono blue", colors: ["#001F4D", "#0047AB", "#5A7FFF"] },
  { v: "sunset",    label: "Sunset",   colors: ["#0047AB", "#DB2777", "#F59E0B"] },
  { v: "iceberg",   label: "Iceberg",  colors: ["#0047AB", "#06B6D4", "#A7F3D0"] },
];
const TYPE_OPTIONS = [
  { v: "spaceGrotesk", label: "Space + Instrument", display: "'Space Grotesk', sans-serif", italic: "'Instrument Serif', serif" },
  { v: "neueHaas",     label: "Helvetica + Italic", display: "'Helvetica Neue', Helvetica, Arial, sans-serif", italic: "'Instrument Serif', serif" },
  { v: "manrope",      label: "Manrope + Serif",    display: "'Manrope', sans-serif", italic: "'Instrument Serif', serif" },
];

function Tweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", t.accent);
    root.style.setProperty("--glass-blur", `${t.glassBlur}px`);
    root.style.setProperty("--glass-saturate", t.glassSaturate);
    root.dataset.density = t.density === "normal" ? "" : t.density;

    const grad = GRADIENT_OPTIONS.find(g => g.v === t.gradient) || GRADIENT_OPTIONS[0];
    root.style.setProperty("--aur-violet", grad.colors[1]);
    root.style.setProperty("--aur-cyan", grad.colors[2]);

    const tp = TYPE_OPTIONS.find(o => o.v === t.type) || TYPE_OPTIONS[0];
    root.style.setProperty("--font-display", tp.display);
    root.style.setProperty("--font-italic", tp.italic);
  }, [t]);

  return (
    <TweaksPanel>
      <TweakSection label="Brand">
        <TweakColor label="Accent" value={t.accent}
                    options={ACCENT_OPTIONS}
                    onChange={(v) => setTweak("accent", v)}/>
      </TweakSection>
      <TweakSection label="Aurora">
        <TweakSelect label="Gradient" value={t.gradient}
                     options={GRADIENT_OPTIONS.map(o => ({ value: o.v, label: o.label }))}
                     onChange={(v) => setTweak("gradient", v)}/>
      </TweakSection>
      <TweakSection label="Glass">
        <TweakSlider label="Blur" min={6} max={40} step={2} value={t.glassBlur} unit="px"
                     onChange={(v) => setTweak("glassBlur", v)}/>
        <TweakSlider label="Saturation" min={1} max={2} step={0.05} value={t.glassSaturate}
                     onChange={(v) => setTweak("glassSaturate", v)}/>
      </TweakSection>
      <TweakSection label="Density">
        <TweakRadio label="Spacing" value={t.density}
                    options={[{value:"compact",label:"Tight"},{value:"normal",label:"Normal"},{value:"roomy",label:"Roomy"}]}
                    onChange={(v) => setTweak("density", v)}/>
      </TweakSection>
      <TweakSection label="Typography">
        <TweakSelect label="Pairing" value={t.type}
                     options={TYPE_OPTIONS.map(o => ({ value: o.v, label: o.label }))}
                     onChange={(v) => setTweak("type", v)}/>
      </TweakSection>
    </TweaksPanel>
  );
}

/* ======================================================================
   Router → page resolver
   ====================================================================== */
function Routes() {
  const { path } = useRouter();
  const segs = path.split("/").filter(Boolean);

  if (segs.length === 0) return <HomePage/>;
  const [head, sub] = segs;

  switch (head) {
    case "projects":  return sub ? <ProjectDetailPage id={sub}/> : <ProjectsPage/>;
    case "blog":      return sub ? <BlogPostPage id={sub}/>      : <BlogPage/>;
    case "gallery":   return sub ? <GalleryDetailPage id={sub}/> : <GalleryPage/>;
    case "events":    return sub ? <EventDetailPage id={sub}/>   : <EventsPage/>;
    case "contact":   return <ContactPage/>;
    case "collab":    return <ContactPage/>;
    default:          return <HomePage/>;
  }
}

/* ======================================================================
   Page wrapper that adds a fade transition on route change
   ====================================================================== */
function PageFrame() {
  const { path } = useRouter();
  return (
    <main key={path} data-screen-label={path === "/" ? "01 Home" : path} className="page-fade">
      <Routes/>
    </main>
  );
}

/* ======================================================================
   App
   ====================================================================== */
function App() {
  return (
    <I18nProvider>
      <ThemeProvider>
        <RouterProvider>
          <Tweaks/>
          <TopNav/>
          <PageFrame/>
          <Footer/>
        </RouterProvider>
      </ThemeProvider>
    </I18nProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
