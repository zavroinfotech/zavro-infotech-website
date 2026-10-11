"use client";

import { useRef, useState } from "react";

/** Copies the public email to the clipboard. The mailto link remains the primary action. */
export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number | undefined>(undefined);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2200);
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-12 items-center justify-center rounded-full border border-porcelain/60 px-6 text-[0.9375rem] font-semibold text-porcelain transition-colors duration-200 hover:bg-porcelain hover:text-ink active:scale-[0.98]"
      >
        {state === "copied" ? "Copied" : "Copy email"}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {state === "copied" && "Email address copied to clipboard"}
        {state === "failed" && "Could not copy. Please use the email link."}
      </span>
    </>
  );
}
