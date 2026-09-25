import { profile } from "@/content/profile";

export default function Footer() {
  return (
    <footer className="w-full border-t border-ink/10">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © 2026 {profile.name} — {profile.location}
        </p>
        <p>
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-accent"
          >
            {profile.email}
          </a>{" "}
          ·{" "}
          <a href={profile.github} className="hover:text-accent">
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
