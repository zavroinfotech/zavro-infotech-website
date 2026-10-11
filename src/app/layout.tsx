import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { BrandIntro } from "@/components/BrandIntro";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/content/site";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Websites and mobile apps`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  // Pre-launch: keep search engines out until the domain and content are approved.
  // Remove this line at launch (see docs/05-delivery/Content_Assets_and_Launch_Checklist.md).
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // data-intro is set by the inline script below before first paint
      suppressHydrationWarning
      className={`${manrope.variable} ${dmSans.variable} ${instrumentSerif.variable}`}
    >
      <head>
        {/* Skips the brand intro for repeat visits in this session and reduced-motion users. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement,s=false,r=false;try{s=!!sessionStorage.getItem('zavro-intro-seen')}catch(e){}try{r=matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}if(s||r)d.setAttribute('data-intro','off')})();`,
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col">
        <BrandIntro />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-porcelain"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
