import Link from "next/link";
import type { Project } from "@/content/projects";
import { PhoneFrame } from "./PhoneFrame";
import { PhoneGallery } from "./PhoneGallery";
import { ProjectStatusBadge } from "./ProjectStatusBadge";
import { TitleText } from "./TitleText";

/** Featured project card: story on the left, phone frame on the right. */
export function ProjectCard({ project }: { project: Project }) {
  const images = project.previewImages ?? project.images ?? [];
  return (
    <article className="group relative overflow-hidden rounded-xl border border-stone/40 bg-clay/50 transition-[translate,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-ink hover:bg-clay/70">
      <div className="grid gap-10 p-6 sm:p-10 md:grid-cols-[1.25fr_0.75fr] md:items-center md:p-14">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <ProjectStatusBadge status={project.status} label={project.statusLabel} />
            {project.statusNote ? (
              <span className="text-sm text-ink/70">{project.statusNote}</span>
            ) : null}
          </div>
          <p className="mt-6 text-sm text-ink/70">{project.category}</p>
          <h3 className="mt-2 text-[clamp(2rem,4.5vw,3.25rem)]">
            {/* The stretched link makes the whole card tappable. */}
            <Link
              href={`/work/${project.slug}`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              <TitleText text={project.title} />
            </Link>
          </h3>
          <p className="mt-4 max-w-xl text-ink/80">{project.summary}</p>

          {project.techStack?.length ? (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technology">
              {project.techStack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-ink/25 px-3 py-1 text-xs font-medium"
                >
                  {tech}
                </li>
              ))}
            </ul>
          ) : null}

          <span
            aria-hidden="true"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-oxide"
          >
            View case study <span className="link-arrow">→</span>
          </span>
        </div>

        {images.length ? (
          <PhoneGallery images={images} />
        ) : (
          <div className="mx-auto w-full max-w-[230px] md:max-w-[250px]">
            <PhoneFrame />
          </div>
        )}
      </div>
    </article>
  );
}
