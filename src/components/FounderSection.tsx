import Image from "next/image";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { site } from "@/content/site";

// Founder copy is DRAFT wording for the founder's approval. It states no qualifications,
// years of experience, awards, client results or testimonials.
const founder = {
  name: "Kaviyan S",
  role: `Founder, ${site.name}`,
  linkedin: "https://www.linkedin.com/in/kaviyan-s/",
  intro:
    "I build websites and mobile applications for startups and small businesses in India and internationally. At Zavro Infotech I stay hands-on from planning and design through to development, so good ideas become dependable products.",
  vision:
    "Technology should be thoughtfully designed and purposefully built, so small teams can launch with confidence.",
} as const;

/** "Meet the Founder": supplied portrait (unaltered) on an arch, with intro, vision and LinkedIn. */
export function FounderSection() {
  return (
    <section
      id="founder"
      aria-labelledby="founder-title"
      className="overflow-hidden border-t border-stone/30 bg-clay/50"
    >
      <div className="mx-auto grid max-w-page items-end gap-10 px-5 pt-14 sm:px-8 sm:pt-20 md:pt-28 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Portrait */}
        <Reveal className="order-2 mx-auto w-full max-w-[420px] lg:order-1">
          <div className="relative">
            {/* Arch behind the figure; the head rises above it */}
            <div
              aria-hidden="true"
              className="absolute inset-x-[5%] bottom-0 top-[15%] rounded-t-full border border-stone/40 bg-porcelain"
            />
            <span
              aria-hidden="true"
              className="absolute left-[3%] top-[38%] h-4 w-4 rounded-full bg-oxide"
            />
            {/* Photo as supplied: shown whole at its own proportions, never cropped or retouched */}
            <Image
              src="/founder/kaviyan-s.webp"
              alt={`Portrait of ${founder.name}, founder of ${site.name}`}
              width={1145}
              height={1374}
              unoptimized
              sizes="(min-width: 480px) 420px, 90vw"
              className="relative block h-auto w-full"
            />
          </div>
        </Reveal>

        {/* Words */}
        <div className="order-1 pb-2 lg:order-2 lg:pb-24">
          <SectionHeading id="founder-title" eyebrow="Founder" title="Meet the Founder" />
          <Reveal delay={100}>
            <p className="mt-8 font-heading text-2xl font-bold">{founder.name}</p>
            <p className="text-ink/70">{founder.role}</p>
            <p className="mt-6 max-w-xl text-lg text-ink/80">{founder.intro}</p>
            <blockquote className="mt-8 max-w-xl border-l-2 border-oxide pl-5">
              <p className="font-serif text-2xl italic leading-snug md:text-[1.75rem]">
                &ldquo;{founder.vision}&rdquo;
              </p>
            </blockquote>
            <a
              href={founder.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${founder.name} on LinkedIn (opens in a new tab)`}
              className="group mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink px-6 text-[0.9375rem] font-semibold text-ink transition-[background-color,color,transform] duration-200 hover:bg-ink hover:text-porcelain active:scale-[0.98]"
            >
              Connect on LinkedIn
              <span aria-hidden="true" className="link-arrow">
                ↗
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
