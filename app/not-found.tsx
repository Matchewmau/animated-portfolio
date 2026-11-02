import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="section-eyebrow">404</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        This page wandered off
      </h1>
      <p className="muted-copy mt-4 text-lg">
        The page you are looking for does not exist or was moved. Let&apos;s get you back to
        the good stuff.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="btn-primary">
          Return home
        </Link>
        <Link href="/#work" className="btn-secondary">
          View selected work
        </Link>
      </div>
    </div>
  );
}
