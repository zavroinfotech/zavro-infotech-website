"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import type { Screenshot } from "@/content/projects";

/** Realistic limits for the phone screen's width-to-height ratio (tall/narrow to compact). */
const MIN_ASPECT = 9 / 19.5;
const MAX_ASPECT = 0.64;

/**
 * Phone preview with a small screenshot selector (previous/next and dots).
 * - The frame keeps one width and bezel; the screen's height follows each screenshot's own
 *   proportions (within realistic phone limits), so a screenshot fills the screen with its
 *   bottom navigation near the bottom instead of leaving a large blank area.
 * - Screenshots are shown whole (never stretched or cropped) and clipped by the rounded screen.
 * - The stage follows the active phone's height (no reserved empty space). The screen's
 *   aspect-ratio transition makes a change between slides resize smoothly, not jump.
 * - Works with touch (swipe and 44px tap targets), keyboard (arrow keys) and screen readers.
 */
export function PhoneGallery({ images }: { images: Screenshot[] }) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const count = images.length;
  const go = (i: number) => setIndex(((i % count) + count) % count);
  const many = count > 1;

  const screenAspect = (img: Screenshot) =>
    Math.min(MAX_ASPECT, Math.max(MIN_ASPECT, img.width / img.height));

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!many) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    }
  };

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || !many) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
  };

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Project screenshots"
      onKeyDown={onKeyDown}
      // relative z-10 keeps the controls above the card's stretched link
      className="relative z-10 mx-auto w-full max-w-[230px] md:max-w-[250px] lg:max-w-[272px]"
    >
      {/* Stage: hugs the active phone, so no empty band is left above or below it */}
      <div className="flex items-center justify-center">
        <div
          className="relative w-full touch-pan-y rounded-[2.6rem] bg-ink p-[6px] shadow-[0_24px_40px_-24px_rgba(25,26,28,0.5)]"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Side buttons */}
          <span aria-hidden="true" className="absolute -left-[2px] top-24 h-8 w-[3px] rounded-l bg-ink" />
          <span aria-hidden="true" className="absolute -left-[2px] top-36 h-12 w-[3px] rounded-l bg-ink" />
          <span aria-hidden="true" className="absolute -right-[2px] top-32 h-16 w-[3px] rounded-r bg-ink" />

          <div
            className="relative overflow-hidden rounded-[2.15rem] bg-white transition-[aspect-ratio] duration-300 ease-out"
            style={{ aspectRatio: screenAspect(images[index]) }}
          >
            {/* Status area keeps the camera island clear of the screenshot */}
            <div className="absolute inset-x-0 bottom-0 top-[22px]">
              {images.map((img, i) => (
                <Image
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 272px, (min-width: 768px) 250px, 230px"
                  aria-hidden={i !== index}
                  className={`object-contain object-top transition-opacity duration-300 ${
                    i === index ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-[7px] h-[10px] w-[54px] -translate-x-1/2 rounded-full bg-ink"
            />
          </div>
        </div>
      </div>

      {many ? (
        <div className="mt-3 flex items-center justify-center">
          <button
            type="button"
            aria-label="Previous screenshot"
            onClick={() => go(index - 1)}
            className="grid h-11 w-11 place-items-center rounded-full text-ink/70 transition-colors hover:text-oxide active:scale-95"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 3 5 8l5 5" />
            </svg>
          </button>
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              aria-label={`Show screenshot ${i + 1} of ${count}: ${img.caption}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => go(i)}
              className="grid h-11 w-8 place-items-center"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-oxide" : "w-2 bg-ink/30"
                }`}
              />
            </button>
          ))}
          <button
            type="button"
            aria-label="Next screenshot"
            onClick={() => go(index + 1)}
            className="grid h-11 w-11 place-items-center rounded-full text-ink/70 transition-colors hover:text-oxide active:scale-95"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 3 5 5-5 5" />
            </svg>
          </button>
        </div>
      ) : null}

      <p role="status" aria-live="polite" className="mt-1 text-center text-xs text-ink/70">
        {images[index].caption}
        {many ? ` · ${index + 1} of ${count}` : ""}
      </p>
    </div>
  );
}
