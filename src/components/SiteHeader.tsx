import Image from "next/image";
import Link from "next/link";
import { mailto, navLinks, site } from "@/content/site";
import { MobileNav } from "./MobileNav";
import { MusicToggle } from "./MusicToggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone/30 bg-porcelain">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-3 px-5 sm:gap-6 sm:px-8">
        <Link href="/" aria-label={`${site.name} — home`} className="shrink-0">
          {/* Supplied logo, unchanged; only scaled with its original proportions. */}
          <Image
            src="/brand/zavro-logo-white-bg.png"
            alt={site.name}
            width={2048}
            height={739}
            sizes="112px"
            priority
            className="h-10 w-auto"
          />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="nav-link text-[0.9375rem] font-medium">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <MusicToggle />
          <a
            href={mailto}
            className="hidden min-h-11 items-center rounded-full bg-oxide px-5 text-[0.9375rem] font-semibold text-porcelain transition-[background-color,transform] duration-200 hover:bg-ink active:scale-[0.98] md:inline-flex"
          >
            Start a project
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
