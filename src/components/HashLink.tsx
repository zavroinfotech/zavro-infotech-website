"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";

/**
 * A normal Next.js <Link> that also works when the visitor clicks it again.
 *
 * Why this exists: Next's router only scrolls to a hash when the hash CHANGES. After the first
 * click on e.g. "View our work" the address bar says /#work, and scrolling away does not change
 * it, so every later click points at the hash the URL already has and Next does nothing.
 * For that one case this scrolls to the target itself, the same way Next does for a first click
 * (scrollIntoView, with the page's smooth scrolling and the header offset from scroll-padding).
 * Every other click is left entirely to Next.
 */
export function HashLink({ href, onClick, ...props }: ComponentProps<typeof Link>) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    // Leave new-tab / modified clicks to the browser
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (typeof href !== "string" || !href.includes("#")) return;

    const url = new URL(href, window.location.href);
    const sameHashAsNow =
      url.hash.length > 1 &&
      url.pathname === window.location.pathname &&
      url.search === window.location.search &&
      url.hash === window.location.hash;
    if (!sameHashAsNow) return;

    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView();
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
