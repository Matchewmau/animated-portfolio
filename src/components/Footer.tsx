import { profile } from "@/content/profile";

export default function Footer() {
  return (
    <footer className="site-footer w-full">
      <div className="site-footer-inner mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          © 2026 {profile.name} — {profile.location}
        </p>
        <p>
          <a href={`mailto:${profile.email}`} className="site-footer-link">
            {profile.email}
          </a>{" "}
          ·{" "}
          <a href={profile.github} className="site-footer-link">
            GitHub
          </a>{" "}
          ·{" "}
          <a
            href={profile.resumeUrl}
            download
            className="site-footer-link"
          >
            Resume
          </a>
        </p>
      </div>
    </footer>
  );
}
