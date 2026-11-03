import { profile } from "@/content/profile";
import SectionHeading from "@/components/SectionHeading";
import CopyEmailButton from "@/components/CopyEmailButton";

export default function Contact() {
  return (
    <section id="contact" className="w-full text-center">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-16 sm:py-20">
        <SectionHeading
          eyebrow="Contact"
          title="Open to full-time roles"
          description="Based in Zamboanga City, open to remote or on-site full-time roles. Replies within 24 hours."
        />
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${profile.email}?subject=Full-time%20opportunity%20for%20${encodeURIComponent(profile.name)}`}
            className="btn-primary"
          >
            Email me
          </a>
          <a
            href={`tel:${profile.phone.replace(/[^\d+]/g, "")}`}
            className="btn-secondary"
          >
            Call
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
          >
            GitHub
          </a>
          <CopyEmailButton email={profile.email} />
        </div>
        <p className="mt-6 text-sm text-muted">
          <a href={`mailto:${profile.email}`} className="world-link">
            {profile.email}
          </a>
        </p>
      </div>
    </section>
  );
}
