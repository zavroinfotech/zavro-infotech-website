/**
 * Hero illustration: an abstract browser window and phone, drawn in the brand palette.
 * Purely decorative (no real UI, no text) and animated with CSS only: outlines draw in,
 * fills fade in, then the phone floats gently. Respects reduced motion (see globals.css).
 */
export function HeroVisual({ className = "" }: { className?: string }) {
  const d = (s: number) => ({ ["--d" as string]: `${s}s` });
  return (
    <svg
      viewBox="0 0 560 520"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Soft backdrop shape */}
      <circle cx="300" cy="270" r="230" className="hv-fade fill-clay/45" style={d(0)} />

      {/* Browser window */}
      <g>
        <rect x="24" y="40" width="380" height="290" rx="16" className="hv-fade fill-porcelain" style={d(0.1)} />
        <rect x="24" y="40" width="380" height="290" rx="16" pathLength={1} className="hv-draw stroke-ink" strokeWidth="1.5" style={d(0.15)} />
        <path d="M24 92H404" pathLength={1} className="hv-draw stroke-ink" strokeWidth="1.5" style={d(0.5)} />
        <circle cx="52" cy="66" r="5" className="hv-pop fill-stone" style={d(0.8)} />
        <circle cx="72" cy="66" r="5" className="hv-pop fill-stone" style={d(0.9)} />
        <circle cx="92" cy="66" r="5" className="hv-pop fill-oxide" style={d(1.0)} />
        <rect x="52" y="124" width="190" height="16" rx="8" className="hv-fade fill-ink" style={d(0.9)} />
        <rect x="52" y="156" width="240" height="8" rx="4" className="hv-fade fill-ink/25" style={d(1.0)} />
        <rect x="52" y="174" width="200" height="8" rx="4" className="hv-fade fill-ink/25" style={d(1.1)} />
        <rect x="52" y="206" width="112" height="36" rx="18" className="hv-pop fill-oxide" style={d(1.2)} />
        <rect x="52" y="262" width="96" height="40" rx="8" className="hv-fade fill-clay" style={d(1.3)} />
        <rect x="160" y="262" width="96" height="40" rx="8" className="hv-fade fill-clay" style={d(1.4)} />
      </g>

      {/* Phone */}
      <g className="hv-float">
        <rect x="318" y="150" width="190" height="350" rx="34" className="hv-fade fill-porcelain" style={d(0.5)} />
        <rect x="318" y="150" width="190" height="350" rx="34" pathLength={1} className="hv-draw stroke-ink" strokeWidth="1.5" style={d(0.55)} />
        <rect x="378" y="166" width="70" height="8" rx="4" className="hv-fade fill-ink" style={d(1.2)} />
        <rect x="338" y="196" width="150" height="124" rx="14" className="hv-fade fill-clay" style={d(1.3)} />
        <rect x="338" y="338" width="100" height="10" rx="5" className="hv-fade fill-ink" style={d(1.45)} />
        <rect x="338" y="360" width="150" height="7" rx="3.5" className="hv-fade fill-ink/25" style={d(1.55)} />
        <rect x="338" y="376" width="120" height="7" rx="3.5" className="hv-fade fill-ink/25" style={d(1.65)} />
        <rect x="338" y="408" width="70" height="52" rx="10" className="hv-fade fill-clay" style={d(1.7)} />
        <rect x="418" y="408" width="70" height="52" rx="10" className="hv-fade fill-clay" style={d(1.8)} />
        <rect x="378" y="478" width="70" height="5" rx="2.5" className="hv-fade fill-ink/40" style={d(1.9)} />
      </g>

      {/* Accent: Oxide dot with a hairline ring */}
      <circle cx="78" cy="428" r="66" pathLength={1} className="hv-draw stroke-stone" strokeWidth="1" style={d(0.8)} />
      <circle cx="78" cy="428" r="34" className="hv-pop fill-oxide" style={d(1.6)} />
    </svg>
  );
}
