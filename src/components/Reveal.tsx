"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Props = {
  as?: "div" | "li" | "section" | "article" | "ul" | "ol" | "header";
  delay?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Scroll-triggered entrance. Content is always rendered visible by the server; only after
 * the page loads are elements that sit below the fold set to "hidden", then eased in as they
 * scroll into view. Reduced-motion visitors, and anything already on screen, are untouched.
 */
export function Reveal({ as = "div", delay = 0, className = "", children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // Every allowed tag takes the same props here, so a single element type is enough.
  const Tag = as as "div";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.dataset.reveal = "hidden";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.reveal = "in";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
