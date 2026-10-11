import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-page px-5 py-24 sm:px-8 md:py-32">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/70">Error 404</p>
      <h1 className="mt-4 text-[clamp(2.25rem,6vw,4rem)]">This page could not be found.</h1>
      <p className="mt-6 max-w-xl text-ink/80">
        The link may be wrong or the page may have moved. You can head back to the homepage or
        see our work.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button href="/">Back to home</Button>
        <Button href="/#work" variant="secondary">
          View our work
        </Button>
      </div>
    </section>
  );
}
