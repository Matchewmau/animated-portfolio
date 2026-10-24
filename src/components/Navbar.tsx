import { profile } from "@/content/profile";

const links = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-ink/10 bg-paper/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          JM.
        </a>
        <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-sm sm:gap-x-5">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-accent">
              {link.label}
            </a>
          ))}
          <a
            href={profile.resumeUrl}
            download
            className="rounded-full border border-ink/15 px-3 py-1.5 font-medium hover:border-accent hover:text-accent sm:px-4"
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
