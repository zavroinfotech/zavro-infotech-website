import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { PhoneFrame } from "@/components/PhoneFrame";
import { ProjectStatusBadge } from "@/components/ProjectStatusBadge";
import { TitleText } from "@/components/TitleText";
import { Reveal } from "@/components/Reveal";
import {
  countFeatureStates,
  featureStateHelp,
  featureStateLabel,
  getProject,
  projects,
  type FeatureState,
} from "@/content/projects";
import { mailto } from "@/content/site";

// Only projects listed in src/content/projects.ts get a page; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

const labelClass = "text-xs font-semibold uppercase tracking-[0.14em] text-ink/70";
const h2Class = "text-[clamp(1.5rem,3.5vw,2.25rem)]";

// Built is the only filled pill; the rest are outlined, so state never relies on colour alone.
const pillClass: Record<FeatureState, string> = {
  built: "bg-ink text-porcelain",
  partial: "border border-ink",
  planned: "border border-ink/40 text-ink/80",
  unverified: "border border-dashed border-ink/40 text-ink/80",
};

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const counts = countFeatureStates(project);
  const states = Object.keys(featureStateLabel) as FeatureState[];

  const facts: { label: string; value: string }[] = [
    {
      label: "Status",
      value: [project.statusLabel ?? project.status, project.statusNote].filter(Boolean).join(" · "),
    },
    ...(project.projectType ? [{ label: "Project type", value: project.projectType }] : []),
    ...(project.role ? [{ label: "Our role", value: project.role }] : []),
    ...(project.format ? [{ label: "Format", value: project.format }] : []),
    ...(project.techStack?.length
      ? [{ label: "Technology", value: project.techStack.join(", ") }]
      : []),
    ...(project.hosting ? [{ label: "Hosting", value: project.hosting }] : []),
  ];

  return (
    <article className="mx-auto max-w-page px-5 py-14 sm:px-8 md:py-20">
      <Link href="/#work" className="nav-link inline-block text-sm font-semibold">
        ← Back to work
      </Link>

      {/* Header */}
      <header className="mt-10 grid items-center gap-12 md:grid-cols-[1.3fr_0.7fr]">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <ProjectStatusBadge status={project.status} label={project.statusLabel} />
            {project.statusNote ? (
              <span className="text-sm text-ink/70">{project.statusNote}</span>
            ) : null}
          </div>
          <p className="mt-6 text-sm text-ink/70">{project.category}</p>
          <h1 className="mt-2 text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.04]"><TitleText text={project.title} /></h1>
          <p className="mt-6 max-w-xl text-lg text-ink/80">{project.summary}</p>
        </div>
        <div className="mx-auto w-full max-w-[240px]">
          <PhoneFrame image={project.images?.[0]} />
        </div>
      </header>

      {/* Facts (only verified fields render) */}
      <Reveal as="section" className="mt-16 border-t border-ink pt-8">
        <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className={labelClass}>{fact.label}</dt>
              <dd className="mt-2">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* Overview and goals */}
      {project.overview ? (
        <Reveal as="section" className="mt-16 grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className={h2Class}>Overview</h2>
            <p className="mt-4 max-w-xl text-ink/80">{project.overview}</p>
          </div>
          {project.goals?.length ? (
            <div>
              <h2 className={h2Class}>Goals</h2>
              <ul className="mt-4 space-y-3">
                {project.goals.map((goal) => (
                  <li key={goal} className="flex items-start gap-3 text-ink/80">
                    <span
                      aria-hidden="true"
                      className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-oxide"
                    />
                    {goal}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-ink/70">
                These are planning goals, not measured outcomes.
              </p>
            </div>
          ) : null}
        </Reveal>
      ) : null}

      {/* Launch scope vs current status */}
      {project.launchScope ? (
        <Reveal as="section" className="mt-16 rounded-xl bg-clay/60 p-6 sm:p-10">
          <h2 className={h2Class}>Planned launch scope vs. current status</h2>
          <p className="mt-4 max-w-3xl text-ink/80">{project.launchScope}</p>
        </Reveal>
      ) : null}

      {/* Feature status */}
      {project.featureGroups?.length ? (
        <section className="mt-16" aria-labelledby="features-title">
          <Reveal>
            <h2 id="features-title" className={h2Class}>
              Where the build stands
            </h2>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2" aria-label="Summary of feature status">
              {states.map((state) => (
                <li key={state} className="flex items-center gap-2 text-sm">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] ${pillClass[state]}`}
                  >
                    {featureStateLabel[state]}
                  </span>
                  <span className="text-ink/70">
                    {counts[state]} · {featureStateHelp[state]}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-10 grid gap-x-12 gap-y-10 lg:grid-cols-2">
            {project.featureGroups.map((group, i) => (
              <Reveal key={group.title} delay={(i % 2) * 100}>
                <h3 className="text-xl">{group.title}</h3>
                <ul className="mt-4 divide-y divide-stone/40 border-y border-stone/40">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3.5"
                    >
                      <span className="min-w-0 flex-1 basis-56">
                        <span className="font-medium">{item.name}</span>
                        {item.note ? (
                          <span className="mt-0.5 block text-sm text-ink/70">{item.note}</span>
                        ) : null}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] ${pillClass[item.state]}`}
                      >
                        <span className="sr-only">Status: </span>
                        {featureStateLabel[item.state]}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm text-ink/70">
            Status reflects a review of the requirements document and the current build in October
            2026. &ldquo;Built&rdquo; means a feature exists, not that it has been fully tested or is
            ready for production.
          </p>
        </section>
      ) : null}

      {/* Screenshots */}
      <Reveal as="section" className="mt-16">
        <h2 className={h2Class}>Screenshots</h2>
        {project.images?.length ? (
          <>
            <ul className="mt-8 flex flex-wrap items-start gap-10">
              {project.images.map((img) => (
                <li key={img.src} className="w-full max-w-[250px]">
                  <PhoneFrame image={img} />
                  <p className="mt-4 text-sm text-ink/70">{img.caption} — development build</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="mt-4 max-w-2xl text-ink/80">
            Screenshots from the development build will appear here once they have been approved
            for public use.
          </p>
        )}
      </Reveal>

      {/* Testing and next steps */}
      <Reveal as="section" className="mt-16 grid gap-10 lg:grid-cols-2">
        {project.testing ? (
          <div>
            <h2 className={h2Class}>Testing</h2>
            <p className="mt-4 max-w-xl text-ink/80">{project.testing}</p>
          </div>
        ) : null}
        {project.next?.length ? (
          <div>
            <h2 className={h2Class}>What is next</h2>
            <ul className="mt-4 space-y-3">
              {project.next.map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink/80">
                  <span
                    aria-hidden="true"
                    className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-oxide"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Reveal>

      {/* Results (intentionally empty until launch) */}
      <Reveal as="section" className="mt-16 max-w-3xl rounded-xl border border-stone/40 p-6 sm:p-8">
        <h2 className={h2Class}>Results</h2>
        <p className="mt-3 text-ink/80">
          Not measured / not available. This project has not launched. Results will be added only
          with real, approved data.
        </p>
      </Reveal>

      <div className="mt-14 flex flex-col gap-3 sm:flex-row">
        {project.externalUrl ? (
          <Button href={project.externalUrl} variant="secondary" arrow>
            Visit project
          </Button>
        ) : null}
        <Button href={mailto} arrow>
          Start a project
        </Button>
      </div>
    </article>
  );
}
