import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">404</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        This page wandered off
      </h1>
      <p className="mt-4 text-lg text-muted">
        The page you are looking for does not exist or was moved. Let&apos;s get you back to
        the good stuff.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent"
        >
          Return home
        </Link>
        <Link
          href="/#work"
          className="rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold transition hover:border-accent hover:text-accent"
        >
          View selected work
        </Link>
      </div>
    </div>
  );
}
