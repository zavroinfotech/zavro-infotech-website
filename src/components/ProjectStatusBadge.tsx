import type { ProjectStatus } from "@/content/projects";

/** Status is always shown as text, so it never relies on colour alone. */
export function ProjectStatusBadge({
  status,
  label,
}: {
  status: ProjectStatus;
  /** More specific wording than the status itself, e.g. "In Development and Testing". */
  label?: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em]">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-oxide" />
      <span className="sr-only">Status: </span>
      {label ?? status}
    </span>
  );
}
