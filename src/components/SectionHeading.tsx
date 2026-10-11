import { Reveal } from "./Reveal";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  /** Use on dark (Ink) sections. */
  invert?: boolean;
};

export function SectionHeading({ id, eyebrow, title, intro, invert = false }: Props) {
  return (
    <Reveal className="max-w-2xl">
      <p
        className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] ${invert ? "text-porcelain/70" : "text-ink/70"}`}
      >
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-oxide" />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-4 text-[clamp(1.875rem,4.5vw,3rem)]">
        {title}
      </h2>
      {intro ? (
        <p className={`mt-4 ${invert ? "text-porcelain/80" : "text-ink/80"}`}>{intro}</p>
      ) : null}
    </Reveal>
  );
}
