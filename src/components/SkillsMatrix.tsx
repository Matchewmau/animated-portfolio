import { skillGroups } from "@/content/skills";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";

function levelToPercent(level: string): number {
  const normalized = level.toLowerCase();
  if (normalized.includes("advanced")) return 90;
  if (normalized.includes("intermediate")) return 70;
  if (normalized.includes("beginner")) return 50;
  return 75;
}

export default function SkillsMatrix() {
  return (
    <section id="skills" className="w-full">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Skills"
            title="Hire-ready stack"
            description="What I use daily to ship full-time quality work."
          />
        </ScrollReveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {skillGroups.map((group, i) => (
            <ScrollReveal key={group.title} delay={i * 0.08}>
              <div className="rounded-2xl border border-ink/10 bg-white p-6">
                <h3 className="font-display text-lg font-bold tracking-tight">
                  {group.title}
                </h3>
                <ul className="mt-5 space-y-4">
                  {group.skills.map((skill) => {
                    const percent = levelToPercent(skill.level);
                    return (
                      <li key={skill.name}>
                        <div className="flex items-baseline justify-between gap-2">
                          <p className="text-sm font-semibold">{skill.name}</p>
                          <p className="text-xs text-muted">
                            {skill.level} · {percent}%
                          </p>
                        </div>
                        <div
                          className="mt-2 h-2 overflow-hidden rounded-full bg-ink/10"
                          role="progressbar"
                          aria-valuenow={percent}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${skill.name} proficiency`}
                        >
                          <div
                            className="h-full rounded-full bg-accent"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
