/**
 * Renders text as masked characters (`.ch`) or words (`.wd`) for GSAP reveals.
 * Characters are grouped per word so lines only ever break between words.
 */
export const SplitChars = ({ text, className = "" }: { text: string; className?: string }) => (
  <span className={`split ${className}`} aria-label={text}>
    {text.split(" ").map((word, w, words) => (
      <span className="word" key={w} aria-hidden="true">
        {word.split("").map((c, i) => (
          <span className="mask" key={i}>
            <span className="ch">{c}</span>
          </span>
        ))}
        {w < words.length - 1 && <span className="mask">{" "}</span>}
      </span>
    ))}
  </span>
);

export const SplitWords = ({ text, className = "" }: { text: string; className?: string }) => (
  <span className={`split ${className}`} aria-label={text}>
    {text.split(" ").map((w, i) => (
      <span className="wd" key={i} aria-hidden="true">
        {w}{" "}
      </span>
    ))}
  </span>
);
