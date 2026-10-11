"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { mailto, navLinks } from "@/content/site";

/**
 * Accessible mobile menu:
 *  - button reports expanded/collapsed state to screen readers
 *  - Escape closes it and returns focus to the button
 *  - Tab/Shift+Tab stay inside the open menu
 *  - closes after choosing a link, and when the screen grows to desktop size
 *  - page behind does not scroll while open
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close(true);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = [
        buttonRef.current,
        ...(panelRef.current?.querySelectorAll<HTMLElement>("a") ?? []),
      ].filter((el): el is HTMLElement => el !== null);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    mq.addEventListener("change", onChange);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      mq.removeEventListener("change", onChange);
    };
  }, [open, close]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink px-4 text-sm font-semibold"
      >
        {open ? "Close" : "Menu"}
        <span aria-hidden="true" className="flex w-4 flex-col gap-1">
          <span
            className={`h-0.5 bg-ink transition-transform duration-200 ${open ? "translate-y-1.5 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 bg-ink transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 bg-ink transition-transform duration-200 ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
          />
        </span>
      </button>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-16 z-40 h-[calc(100dvh-4rem)] overflow-y-auto border-t border-stone/30 bg-porcelain px-5 py-8 sm:px-8"
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-stone/30">
                <Link
                  href={link.href}
                  onClick={() => close(false)}
                  className="block py-4 font-heading text-2xl font-bold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={mailto}
          onClick={() => close(false)}
          className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-oxide px-6 font-semibold text-porcelain"
        >
          Start a project
        </a>
      </div>
    </div>
  );
}
