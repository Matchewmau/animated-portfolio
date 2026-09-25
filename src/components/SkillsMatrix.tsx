import { skillGroups } from "@/content/skills";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";

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
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, i) => (
            <ScrollReveal key={group.title} delay={i * 0.08}>
              <div className="rounded-2xl border border-ink/10 bg-white p-6">
                <h3 className="font-display text-lg font-bold tracking-tight">
                  {group.title}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="rounded-full border border-ink/10 bg-paper px-3 py-1 text-sm font-medium"
                    >
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
