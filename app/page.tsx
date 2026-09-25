import { profile } from "@/content/profile";

export default function Home() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">
        {profile.title}
      </p>
      <h1 className="mt-4 font-display text-5xl font-bold tracking-tight">
        {profile.name}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{profile.headline}</p>
      <p className="mt-2 max-w-2xl">{profile.subhead}</p>
      <p className="mt-8 rounded-lg border border-ink/10 bg-white p-4 text-sm">
        Scaffold OK. Sections land in Tasks 2-4.
      </p>
    </section>
  );
}
