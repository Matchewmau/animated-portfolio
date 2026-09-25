import { experience } from "@/content/experience";
import SectionHeading from "@/components/SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="w-full border-y border-ink/10 bg-white">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <SectionHeading eyebrow="Experience" title="Where I've delivered" />
        <div className="mt-10 grid gap-6">
          {experience.map((item) => (
            <article
              key={`${item.role}-${item.organization}`}
              className="rounded-2xl border border-ink/10 p-6 sm:p-8"
            >
              <h3 className="font-display text-xl font-bold tracking-tight">
                {item.role} — {item.organization}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {item.period} · {item.location}
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-ink/10 p-6 sm:p-8">
            <h3 className="font-display text-xl font-bold tracking-tight">
              Education
            </h3>
            <p className="mt-2 font-semibold">
              Western Mindanao State University
            </p>
            <p className="mt-1 text-sm text-muted">
              B.S. Computer Science · 2022–2026 · Zamboanga City, Philippines
            </p>
          </article>
          <article className="rounded-2xl border border-ink/10 p-6 sm:p-8">
            <h3 className="font-display text-xl font-bold tracking-tight">
              Certifications
            </h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
              <li>CSC Professional</li>
              <li>Google Gemini</li>
              <li>Vercel</li>
              <li>DICT</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
