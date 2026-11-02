import { experience } from "@/content/experience";
import SectionHeading from "@/components/SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="w-full">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <SectionHeading eyebrow="Experience" title="Where I've delivered" />
        <div className="mt-10 grid gap-6">
          {experience.map((item) => (
            <article
              key={`${item.role}-${item.organization}`}
              className="glass-panel experience-panel p-6 sm:p-8"
            >
              <h3 className="font-display text-xl font-bold tracking-tight">
                {item.role} — {item.organization}
              </h3>
              <p className="experience-meta mt-1 text-sm">
                {item.period} · {item.location}
              </p>
              <ul className="experience-bullets mt-4 list-disc space-y-2 pl-5">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="glass-panel experience-panel p-6 sm:p-8">
            <h3 className="font-display text-xl font-bold tracking-tight">
              Education
            </h3>
            <p className="mt-2 font-semibold">
              Western Mindanao State University
            </p>
            <p className="experience-meta mt-1 text-sm">
              B.S. Computer Science · 2022–2026 · Zamboanga City, Philippines
            </p>
            <p className="experience-meta mt-2 text-sm">
              Relevant coursework: Data Structures &amp; Algorithms, Software Engineering,
              Database Systems, Web Designing, Web Programming, AI
            </p>
          </article>
          <article className="glass-panel experience-panel p-6 sm:p-8">
            <h3 className="font-display text-xl font-bold tracking-tight">
              Certifications
            </h3>
            <ul className="experience-bullets mt-4 list-disc space-y-2 pl-5">
              <li>Civil Service Eligibility — Professional Level (CSC PH)</li>
              <li>Published Presenter — ECAI 2026 International Conference</li>
              <li>Google Platform for AI: Gemini &amp; Vercel (Google Groups)</li>
              <li>Dual-Platform App Development (DICT Region IX)</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
