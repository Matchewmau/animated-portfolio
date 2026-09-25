import { profile } from "@/content/profile";

export default function ProofBar() {
  return (
    <section aria-label="Results" className="w-full border-y border-ink/10 bg-white">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4">
        {profile.proof.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-3xl font-bold tracking-tight text-ink">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
