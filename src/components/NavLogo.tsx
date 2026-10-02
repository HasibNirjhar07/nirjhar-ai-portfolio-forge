/**
 * Monogram mark + rolling wordmark. The "N" stroke redraws and every letter
 * rolls to a duplicate on hover.
 */
const WORD = "Nirjhar";

const NavLogo = () => (
  <a href="#hero" className="nv-logo" aria-label="Nirjhar.dev, back to top">
    <span className="nv-mark" aria-hidden="true">
      <svg viewBox="0 0 40 40" width="40" height="40">
        <defs>
          <linearGradient id="nv-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#b9a8ff" />
            <stop offset="0.55" stopColor="#9b87f5" />
            <stop offset="1" stopColor="#38e1ff" />
          </linearGradient>
        </defs>
        <rect className="nv-mark-bg" x="1" y="1" width="38" height="38" rx="12" />
        <rect x="1" y="1" width="38" height="38" rx="12" fill="none" stroke="url(#nv-grad)" strokeWidth="1.2" opacity="0.7" />
        <path className="nv-mark-n" d="M13 28V12.5L27 27.5V12" fill="none" stroke="url(#nv-grad)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
        <circle className="nv-mark-dot" cx="27" cy="12" r="2.4" />
      </svg>
    </span>
    <span className="nv-word">
      <span className="nv-letters" aria-hidden="true">
        {WORD.split("").map((c, i) => (
          <span className="nv-letter" key={i} style={{ "--i": i } as React.CSSProperties}>
            <span>{c}</span>
            <span>{c}</span>
          </span>
        ))}
      </span>
      <span className="nv-tld" aria-hidden="true">.dev</span>
    </span>
  </a>
);

export default NavLogo;
