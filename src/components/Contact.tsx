import { profile } from "@/content/profile";
import SectionHeading from "@/components/SectionHeading";

export default function Contact() {
  return (
    <section id="contact" className="w-full text-center">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-16 sm:py-20">
        <SectionHeading
          eyebrow="Contact"
          title="Open to full-time roles"
          description="Based in Zamboanga City, open to full-time. Replies within 24 hours."
        />
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${profile.email}?subject=Full-time%20opportunity%20for%20${encodeURIComponent(profile.name)}`}
            className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:bg-accent"
          >
            Email me
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold transition hover:border-accent hover:text-accent"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold transition hover:border-accent hover:text-accent"
          >
            GitHub
          </a>
        </div>
        <p className="mt-6 text-sm text-muted">
          <a href={`mailto:${profile.email}`} className="hover:text-accent">
            {profile.email}
          </a>
        </p>
      </div>
    </section>
  );
}
