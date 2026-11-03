import { profile } from "@/content/profile";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  return (
    <header className="site-nav sticky top-0 z-50 w-full">
      <nav className="site-nav-inner mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="/#top"
          className="site-nav-logo font-display text-lg font-bold tracking-tight"
        >
          JM.
        </a>
        <div className="site-nav-links flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-sm sm:gap-x-5">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="site-nav-link">
              {link.label}
            </a>
          ))}
          <a
            href={profile.resumeUrl}
            download
            className="site-nav-resume font-medium"
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
