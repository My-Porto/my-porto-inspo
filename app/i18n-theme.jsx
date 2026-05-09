/* global React */
const { useState, useEffect, useMemo, useCallback, useRef, createContext, useContext } = React;

/* ======================================================================
   i18n — translation context + language switcher
   ====================================================================== */
const LANGS = [
  { code: "en", label: "English", short: "EN" },
  { code: "ig", label: "Igbo", short: "IG" },
  { code: "es", label: "Español", short: "ES" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "fr", label: "Français", short: "FR" },
];

const STRINGS = {
  // nav
  nav_home:     { en: "Home",     ig: "Ụlọ",       es: "Inicio",    de: "Start",    fr: "Accueil" },
  nav_projects: { en: "Projects", ig: "Ọrụ",       es: "Proyectos", de: "Projekte", fr: "Projets" },
  nav_blog:     { en: "Blog",     ig: "Blọgụ",     es: "Blog",      de: "Blog",     fr: "Blog" },
  nav_gallery:  { en: "Gallery",  ig: "Ihe ngosi", es: "Galería",   de: "Galerie",  fr: "Galerie" },
  nav_events:   { en: "Events",   ig: "Mmemme",    es: "Eventos",   de: "Termine",  fr: "Événements" },
  nav_about:    { en: "About",    ig: "Banyere",   es: "Sobre mí",  de: "Über",     fr: "À propos" },

  cta_collab:   { en: "Let's collab",      ig: "Ka anyị rụkọọ",    es: "Colaborar",     de: "Zusammenarbeit",  fr: "Collaborons" },
  cta_book:     { en: "Book a call",       ig: "Debe oku",         es: "Agendar",       de: "Termin",          fr: "Réserver" },
  cta_view_all: { en: "View all",          ig: "Lee niile",        es: "Ver todo",      de: "Alle ansehen",    fr: "Tout voir" },
  cta_read:     { en: "Read",              ig: "Gụọ",              es: "Leer",          de: "Lesen",           fr: "Lire" },
  cta_explore:  { en: "Explore",           ig: "Chọpụta",          es: "Explorar",      de: "Erkunden",        fr: "Explorer" },
  cta_back:     { en: "Back",              ig: "Laghachi",         es: "Atrás",         de: "Zurück",          fr: "Retour" },

  eyebrow_role:        { en: "Software Engineer · Founder", ig: "Onye nrụpụta sọftwia · Onye guzobere", es: "Ingeniero · Fundador", de: "Softwareingenieur · Gründer", fr: "Ingénieur · Fondateur" },
  hero_tagline:        { en: "Code is art —", ig: "Koodu bụ nka —", es: "El código es arte —", de: "Code ist Kunst —", fr: "Le code est un art —" },
  hero_tagline_italic: { en: "I love painting with logic & pixels.", ig: "Ana m enwe mmasị iji ezi uche na piksel ese.", es: "Me encanta pintar con lógica y píxeles.", de: "Ich male gern mit Logik und Pixeln.", fr: "J'aime peindre avec logique et pixels." },

  section_projects:  { en: "Selected work", ig: "Ọrụ ahọpụtara", es: "Trabajo seleccionado", de: "Ausgewählte Arbeiten", fr: "Travaux sélectionnés" },
  section_companies: { en: "Companies & teams I've built with", ig: "Ụlọ ọrụ m sooro rụọ", es: "Empresas con las que he trabajado", de: "Unternehmen, mit denen ich gebaut habe", fr: "Entreprises avec qui j'ai construit" },
  section_reviews:   { en: "Kind words", ig: "Okwu ọma", es: "Palabras amables", de: "Gute Worte", fr: "Mots aimables" },
  section_blog:      { en: "From the journal", ig: "Site na akwụkwọ akụkọ", es: "Del diario", de: "Aus dem Journal", fr: "Du journal" },
  section_events:    { en: "Talks & events", ig: "Okwu na mmemme", es: "Charlas y eventos", de: "Vorträge & Termine", fr: "Conférences & événements" },
  section_world:     { en: "Working from anywhere", ig: "Ịrụ ọrụ site na ebe ọ bụla", es: "Trabajando desde cualquier lugar", de: "Arbeiten von überall", fr: "Travailler depuis partout" },
  section_about:     { en: "About me", ig: "Banyere m", es: "Sobre mí", de: "Über mich", fr: "À propos" },
  section_collab:    { en: "Want to build something?", ig: "Ịchọrọ iwu ihe?", es: "¿Quieres construir algo?", de: "Lust, etwas zu bauen?", fr: "Envie de construire ?" },
  section_gallery:   { en: "Gallery", ig: "Ihe ngosi", es: "Galería", de: "Galerie", fr: "Galerie" },

  footer_copy:    { en: "Built with care.", ig: "Wuru ya nlezianya.", es: "Hecho con cuidado.", de: "Sorgsam gemacht.", fr: "Fait avec soin." },
  copy_email:     { en: "Copy email", ig: "Detuo email", es: "Copiar email", de: "E-Mail kopieren", fr: "Copier l'email" },
  copied:         { en: "Copied!", ig: "Edetuolu!", es: "¡Copiado!", de: "Kopiert!", fr: "Copié !" },

  reading_time:   { en: "min read", ig: "nkeji ọgụgụ", es: "min de lectura", de: "Min. Lesezeit", fr: "min de lecture" },
  by:             { en: "by", ig: "site na", es: "por", de: "von", fr: "par" },
  upcoming:       { en: "Upcoming", ig: "Na-abịa", es: "Próximo", de: "Bevorstehend", fr: "À venir" },
  past:           { en: "Past", ig: "Gara aga", es: "Pasado", de: "Vergangen", fr: "Passé" },
};

const I18nCtx = createContext({ lang: "en", t: (k) => k, setLang: () => {} });
const useI18n = () => useContext(I18nCtx);
const t = (key, lang) => (STRINGS[key]?.[lang] ?? STRINGS[key]?.en ?? key);

function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("portfolio.lang") || "en");
  useEffect(() => {
    localStorage.setItem("portfolio.lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);
  const value = useMemo(() => ({ lang, setLang, t: (k) => t(k, lang) }), [lang]);
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

/* ======================================================================
   Theme provider
   ====================================================================== */
const ThemeCtx = createContext({ theme: "light", setTheme: () => {} });
const useTheme = () => useContext(ThemeCtx);

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("portfolio.theme") || "light");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio.theme", theme);
  }, [theme]);
  return <ThemeCtx.Provider value={{ theme, setTheme }}>{children}</ThemeCtx.Provider>;
}

/* Hash router (very small) */
const RouterCtx = createContext({ path: "/", go: () => {} });
const useRouter = () => useContext(RouterCtx);
function RouterProvider({ children }) {
  const [path, setPath] = useState(() => window.location.hash.replace(/^#/, "") || "/");
  useEffect(() => {
    const onHash = () => {
      setPath(window.location.hash.replace(/^#/, "") || "/");
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const go = useCallback((p) => { window.location.hash = p; }, []);
  return <RouterCtx.Provider value={{ path, go }}>{children}</RouterCtx.Provider>;
}

Object.assign(window, { I18nProvider, ThemeProvider, RouterProvider, useI18n, useTheme, useRouter, LANGS, STRINGS });
