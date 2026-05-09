/* global React */
const { useState, useEffect, useRef } = React;

/* ======================================================================
   Icons — thin line, monoweight (1.5px stroke, 24px viewBox)
   ====================================================================== */
const Icon = ({ children, size = 18, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...rest}>{children}</svg>
);

const I = {
  Sun: (p) => <Icon {...p}><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4"/></Icon>,
  Moon: (p) => <Icon {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></Icon>,
  Globe: (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></Icon>,
  Arrow: (p) => <Icon {...p}><path d="M5 12h14M13 6l6 6-6 6"/></Icon>,
  ArrowUR: (p) => <Icon {...p}><path d="M7 17 17 7M9 7h8v8"/></Icon>,
  ArrowL: (p) => <Icon {...p}><path d="M19 12H5M11 18l-6-6 6-6"/></Icon>,
  Sparkle: (p) => <Icon {...p}><path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.2 4.2M14.2 14.2l4.2 4.2M5.6 18.4l4.2-4.2M14.2 9.8l4.2-4.2"/></Icon>,
  Code: (p) => <Icon {...p}><path d="m8 6-6 6 6 6M16 6l6 6-6 6M14 4 10 20"/></Icon>,
  Cube: (p) => <Icon {...p}><path d="M12 2 3 7v10l9 5 9-5V7l-9-5z"/><path d="M3 7l9 5 9-5M12 22V12"/></Icon>,
  Bolt: (p) => <Icon {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/></Icon>,
  Compass: (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="m15 9-2 6-6 2 2-6 6-2z"/></Icon>,
  Calendar: (p) => <Icon {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></Icon>,
  MapPin: (p) => <Icon {...p}><path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></Icon>,
  Mail: (p) => <Icon {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></Icon>,
  Github: (p) => <Icon {...p}><path d="M9 19c-4 1.5-4-2-6-2m12 5v-3.5a3 3 0 0 0-.9-2.4c3-.3 6-1.5 6-6.5a5 5 0 0 0-1.4-3.5 4.6 4.6 0 0 0-.1-3.4S17.4 2 15 3.7a13 13 0 0 0-7 0C5.6 2 4.4 2.4 4.4 2.4a4.6 4.6 0 0 0-.1 3.4A5 5 0 0 0 3 9.3c0 5 3 6.2 6 6.5a3 3 0 0 0-.9 2.4V22"/></Icon>,
  X: (p) => <Icon {...p}><path d="M3 3l8 9-8 9M21 3l-8 9 8 9"/></Icon>,
  LinkedIn: (p) => <Icon {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 11v6M8 7.5v.01M12 17v-4a2 2 0 1 1 4 0v4M12 17v-6"/></Icon>,
  Search: (p) => <Icon {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></Icon>,
  Check: (p) => <Icon {...p}><path d="M4 12l5 5L20 6"/></Icon>,
  Copy: (p) => <Icon {...p}><rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></Icon>,
  Plus: (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>,
  Quote: (p) => <Icon {...p}><path d="M7 7h4v6a4 4 0 0 1-4 4M13 7h4v6a4 4 0 0 1-4 4"/></Icon>,
  Camera: (p) => <Icon {...p}><path d="M3 8a2 2 0 0 1 2-2h2l2-2h6l2 2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="4"/></Icon>,
  Play: (p) => <Icon {...p}><path d="M6 4l14 8-14 8z"/></Icon>,
  Layers: (p) => <Icon {...p}><path d="m12 2 10 6-10 6L2 8l10-6zM2 14l10 6 10-6M2 18l10 6 10-6"/></Icon>,
  Star: (p) => <Icon {...p}><path d="m12 3 2.6 6 6.4.6-4.8 4.4 1.4 6.4L12 17l-5.6 3.4L7.8 14 3 9.6 9.4 9 12 3z"/></Icon>,
  Menu: (p) => <Icon {...p}><path d="M4 7h16M4 12h16M4 17h16"/></Icon>,
  Close: (p) => <Icon {...p}><path d="M6 6l12 12M18 6 6 18"/></Icon>,
  Chevron: (p) => <Icon {...p}><path d="m9 6 6 6-6 6"/></Icon>,
  Briefcase: (p) => <Icon {...p}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/></Icon>,
};

window.I = I;

/* ======================================================================
   Aurora wrapper
   ====================================================================== */
function Aurora({ variant = "default" }) {
  return (
    <div className="aurora" aria-hidden="true">
      <div className="aurora-orb o1"/>
      <div className="aurora-orb o2"/>
      <div className="aurora-orb o3"/>
      <div className="aurora-orb o4"/>
    </div>
  );
}
window.Aurora = Aurora;

/* ======================================================================
   3D Glass shapes (decorative SVG/CSS)
   ====================================================================== */
function GlassSphere({ size = 220, hue = "blue", style }) {
  return (
    <div className="glass-shape" style={{ width: size, height: size, ...style }} aria-hidden="true"/>
  );
}

function GlassKnot({ size = 240, style }) {
  // Stylized SVG torus/knot rendered with gradients + filters
  return (
    <svg width={size} height={size} viewBox="0 0 240 240" style={style} aria-hidden="true">
      <defs>
        <radialGradient id="gk1" cx="35%" cy="30%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)"/>
          <stop offset="35%" stopColor="rgba(160,180,255,0.7)"/>
          <stop offset="70%" stopColor="var(--accent)" stopOpacity="0.85"/>
          <stop offset="100%" stopColor="var(--aur-violet)" stopOpacity="0.95"/>
        </radialGradient>
        <radialGradient id="gk2" cx="50%" cy="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.6)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
        <filter id="gk-blur"><feGaussianBlur stdDeviation="0.5"/></filter>
      </defs>
      <ellipse cx="120" cy="120" rx="100" ry="60" fill="url(#gk1)" transform="rotate(-25 120 120)" filter="url(#gk-blur)"/>
      <ellipse cx="120" cy="120" rx="100" ry="60" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" transform="rotate(-25 120 120)"/>
      <ellipse cx="120" cy="120" rx="60" ry="100" fill="url(#gk1)" opacity="0.85" transform="rotate(35 120 120)" filter="url(#gk-blur)"/>
      <ellipse cx="120" cy="120" rx="60" ry="100" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" transform="rotate(35 120 120)"/>
      <ellipse cx="100" cy="100" rx="22" ry="14" fill="url(#gk2)" transform="rotate(-25 100 100)"/>
    </svg>
  );
}

function GlassPrism({ size = 200, style }) {
  return <div className="glass-prism" style={{ width: size, height: size, ...style }} aria-hidden="true"/>;
}

window.GlassSphere = GlassSphere;
window.GlassKnot = GlassKnot;
window.GlassPrism = GlassPrism;

/* ======================================================================
   Scroll reveal helper
   ====================================================================== */
function Reveal({ children, delay = 0, as: As = "div", ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add("in"), delay);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <As ref={ref} className={`reveal ${rest.className || ""}`} {...rest}>{children}</As>;
}
window.Reveal = Reveal;
