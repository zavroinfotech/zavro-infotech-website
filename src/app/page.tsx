import { Button } from "@/components/Button";
import { CopyEmail } from "@/components/CopyEmail";
import { FounderSection } from "@/components/FounderSection";
import { HeroVisual } from "@/components/HeroVisual";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceIcon } from "@/components/ServiceIcon";
import { projects } from "@/content/projects";
import { aboutFacts, mailto, processSteps, services, site } from "@/content/site";

const wrap = "mx-auto max-w-page px-5 sm:px-8";
const section = "py-14 sm:py-20 md:py-28";
const delay = (s: number) => ({ ["--d" as string]: `${s}s` });

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        <div className={`${wrap} grid items-center gap-12 pb-12 pt-10 md:pb-24 md:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8`}>
          <div>
            <p
              className="fade-up flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink/70"
              style={delay(0)}
            >
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-oxide" />
              Website &amp; mobile app development
            </p>
            <h1
              id="hero-title"
              className="mt-6 text-[clamp(2.75rem,7.2vw,5.5rem)] leading-[1.02]"
            >
              <span className="mask-line">
                <span style={delay(0.08)}>Thoughtfully designed.</span>
              </span>
              <span className="mask-line">
                <span style={delay(0.2)}>
                  Purposefully{" "}
                  <em className="font-serif font-normal italic tracking-normal text-oxide">
                    built.
                  </em>
                </span>
              </span>
            </h1>
            <p
              className="fade-up mt-8 max-w-xl text-lg text-ink/80 md:text-xl"
              style={delay(0.45)}
            >
              {site.subheadline}
            </p>
            <div className="fade-up mt-10 flex flex-col gap-3 sm:flex-row" style={delay(0.6)}>
              <Button href="/#work" arrow>
                View our work
              </Button>
              <Button href={mailto} variant="secondary">
                Start a project
              </Button>
            </div>
            <ul
              className="fade-up mt-12 flex flex-wrap gap-x-8 gap-y-2 border-t border-stone/40 pt-6 text-sm text-ink/70"
              style={delay(0.8)}
            >
              <li>Websites</li>
              <li>Mobile apps</li>
              <li>India &amp; international</li>
            </ul>
          </div>

          <HeroVisual className="mx-auto w-full max-w-[300px] sm:max-w-[460px] lg:max-w-none" />
        </div>
      </section>

      {/* Selected work */}
      <section id="work" aria-labelledby="work-title" className="border-t border-stone/30">
        <div className={`${wrap} ${section}`}>
          <SectionHeading
            id="work-title"
            eyebrow="Selected work"
            title="What we are building"
            intro="Every project is labelled with its real status. We only show work that is approved for public viewing."
          />
          <div className="mt-10 space-y-6 md:mt-12">
            {projects.map((project) => (
              <Reveal key={project.slug}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" aria-labelledby="services-title" className="bg-clay/50">
        <div className={`${wrap} ${section}`}>
          <SectionHeading
            id="services-title"
            eyebrow="Services"
            title="Two things, done properly"
            intro="We focus on websites and mobile apps for startups and small businesses."
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((service, i) => (
              <Reveal
                as="li"
                key={service.title}
                delay={i * 120}
                className="group rounded-xl border border-stone/40 bg-porcelain p-8 transition-[translate,border-color] duration-300 hover:-translate-y-1 hover:border-ink sm:p-10"
              >
                <div className="flex items-start justify-between">
                  <ServiceIcon name={service.icon} />
                  <span className="font-heading text-sm font-semibold text-ink/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-8 text-2xl md:text-3xl">{service.title}</h3>
                <p className="mt-4 text-ink/80">{service.description}</p>
                <p className="mt-8 border-t border-stone/40 pt-6 text-xs font-semibold uppercase tracking-[0.14em] text-ink/70">
                  Typically includes
                </p>
                <ul className="mt-4 space-y-2">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[0.9375rem]">
                      <span
                        aria-hidden="true"
                        className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-oxide"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section id="process" aria-labelledby="process-title">
        <div className={`${wrap} ${section}`}>
          <SectionHeading
            id="process-title"
            eyebrow="Process"
            title="Six steps from idea to launch"
            intro="A clear path, with you involved at each stage."
          />
          <ol className="mt-14 grid gap-10 md:grid-cols-6 md:gap-6">
            {processSteps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 110} className="step">
                <span className="step-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] text-ink/80">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* About */}
      <section id="about" aria-labelledby="about-title" className="border-t border-stone/30">
        <div className={`${wrap} ${section} grid gap-12 lg:grid-cols-[1.2fr_0.8fr]`}>
          <div>
            <SectionHeading id="about-title" eyebrow="About" title="About Zavro Infotech" />
            <Reveal delay={120}>
              <p className="mt-8 max-w-2xl text-xl leading-relaxed text-ink/90 md:text-2xl">
                {site.name} is an independent digital studio helping startups and small
                businesses plan, design and develop{" "}
                <em className="font-serif italic">websites and mobile applications</em>.
              </p>
            </Reveal>
          </div>
          <Reveal as="div" delay={200} className="lg:pt-12">
            <dl className="divide-y divide-stone/40 border-y border-stone/40">
              {aboutFacts.map((fact) => (
                <div key={fact.label} className="grid gap-1 py-5 sm:grid-cols-[9rem_1fr]">
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/70">
                    {fact.label}
                  </dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <FounderSection />

      {/* Contact */}
      <section
        id="contact"
        aria-labelledby="contact-title"
        className="on-ink relative overflow-hidden bg-ink text-porcelain"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 hidden h-80 w-80 md:block rounded-full border border-porcelain/15"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -top-8 hidden h-48 w-48 md:block rounded-full bg-oxide/90"
        />
        <div className={`${wrap} ${section} relative`}>
          <SectionHeading
            id="contact-title"
            eyebrow="Contact"
            title="Have a website or app in mind?"
            intro="Send us a short email about your project and we will get back to you."
            invert
          />
          <Reveal delay={150} className="mt-10">
            <a
              href={mailto}
              className="block break-all font-heading text-[clamp(1.5rem,5vw,3.25rem)] font-bold leading-tight underline decoration-oxide decoration-2 underline-offset-8 transition-colors hover:text-clay"
            >
              {site.email}
            </a>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={mailto} arrow>
                Write to us
              </Button>
              <CopyEmail email={site.email} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
