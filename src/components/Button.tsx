import type { ReactNode } from "react";
import { HashLink } from "./HashLink";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  /** Adds a small arrow that nudges on hover. */
  arrow?: boolean;
  className?: string;
};

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.9375rem] font-semibold transition-[background-color,color,transform] duration-200 active:scale-[0.98]";

const variants = {
  // Oxide is reserved for the single most important action.
  primary: "bg-oxide text-porcelain hover:bg-ink",
  secondary: "border border-ink text-ink hover:bg-ink hover:text-porcelain",
};

export function Button({
  href,
  children,
  variant = "primary",
  arrow = false,
  className = "",
}: Props) {
  const classes = `${base} ${variants[variant]} ${className}`;
  const content = (
    <>
      {children}
      {arrow ? (
        <span aria-hidden="true" className="link-arrow">
          →
        </span>
      ) : null}
    </>
  );
  // Plain anchors for mailto: and same-page links; Link for client routes.
  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }
  return (
    <HashLink href={href} className={classes}>
      {content}
    </HashLink>
  );
}
