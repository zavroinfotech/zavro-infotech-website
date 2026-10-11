import Image from "next/image";
import Link from "next/link";
import { mailto, navLinks, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="on-ink bg-ink text-porcelain">
      <div className="mx-auto grid max-w-page gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          {/* Supplied logo artwork, unchanged. */}
          <Image
            src="/brand/zavro-logo-white-bg.png"
            alt={site.name}
            width={2048}
            height={739}
            sizes="144px"
            className="h-12 w-auto"
          />
          <p className="mt-6 max-w-xs font-serif text-2xl italic leading-snug text-porcelain">
            Websites and mobile applications, thoughtfully built.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-porcelain/70">
            Explore
          </h2>
          <ul className="mt-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block py-2 underline-offset-4 hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-porcelain/70">
            Contact
          </h2>
          <p className="mt-3">
            <a
              href={mailto}
              className="inline-block break-all py-2 underline underline-offset-4"
            >
              {site.email}
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-porcelain/20">
        <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-3 px-5 py-4 text-sm text-porcelain/70 sm:px-8">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <a href="#" className="inline-block py-2 underline-offset-4 hover:underline">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
