"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "zavro-intro-seen";
const LETTERS = ["Z", "A", "V", "R", "O"];

/**
 * Animated brand intro.
 * - The animation itself is pure CSS (see globals.css), so it never waits for JavaScript
 *   and the homepage underneath is already rendered and reachable.
 * - An inline script in the layout sets <html data-intro="off"> for repeat visits in the
 *   same browser session and for visitors who prefer reduced motion.
 * - The wordmark is decorative (aria-hidden). Only the Skip button is exposed.
 */
export function BrandIntro() {
  const [mounted, setMounted] = useState(true);
  const [skipping, setSkipping] = useState(false);

  const finish = useCallback(() => {
    // If the visitor skipped with the keyboard, keep focus somewhere sensible.
    if (document.activeElement?.classList.contains("intro-skip-btn")) {
      document.getElementById("main")?.focus({ preventScroll: true });
    }
    setMounted(false);
  }, []);

  const skip = useCallback(() => {
    // "skip": hero content starts right away while the overlay fades out (see globals.css).
    document.documentElement.dataset.intro = "skip";
    setSkipping(true);
  }, []);

  useEffect(() => {
    const off = document.documentElement.dataset.intro === "off";
    if (off) {
      // Cleanup only; CSS already hides the overlay.
      const t = window.setTimeout(() => setMounted(false), 0);
      return () => window.clearTimeout(t);
    }
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* storage can be blocked; the intro then simply replays next visit */
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    };
    document.addEventListener("keydown", onKey);
    // No wall-clock fallback on purpose: in a background tab animations pause, and removing
    // the overlay early would leave the hero blank when the visitor returns. The overlay is
    // removed when its exit animation actually finishes (see onAnimationEnd below).
    return () => document.removeEventListener("keydown", onKey);
  }, [skip]);

  if (!mounted) return null;

  return (
    <div
      className={`intro${skipping ? " intro-skip" : ""}`}
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget) finish();
      }}
    >
      <button type="button" className="intro-skip-btn" onClick={skip}>
        Skip intro
      </button>
      <div aria-hidden="true">
        <div className="intro-word">
          {LETTERS.map((letter, i) => (
            <span key={letter} className="intro-letter">
              <span style={{ ["--i" as string]: i }}>{letter}</span>
            </span>
          ))}
          <span className="intro-dot" />
        </div>
        <p className="intro-sub">Infotech</p>
      </div>
    </div>
  );
}
