import { profile } from "@/content/profile";

export default function ProofBar() {
  return (
    <section aria-label="Results" className="site-rule-y w-full">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4">
        {profile.proof.map((stat) => (
          <div key={stat.label}>
            <p className="proof-value font-display text-3xl font-bold tracking-tight">
              {stat.value}
            </p>
            <p className="proof-label mt-1 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
