import { profile } from "@/content/profile";
import MobileNavMenu, { type NavLink } from "./MobileNavMenu";

const links: NavLink[] = [
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  return (
    <header className="site-nav sticky top-0 z-50 w-full">
      <nav className="site-nav-inner mx-auto flex max-w-5xl items-center justify-between gap-3 px-6 py-2.5 sm:py-4">
        <a
          href="/#top"
          className="site-nav-logo shrink-0 font-display text-lg font-bold tracking-tight"
        >
          JM.
        </a>
        <div className="flex items-center gap-2 text-sm sm:gap-5">
          <div className="site-nav-links hidden items-center gap-x-5 sm:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="site-nav-link whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href={profile.resumeUrl}
            download
            className="site-nav-resume inline-flex min-h-11 items-center whitespace-nowrap font-medium sm:min-h-0"
          >
            Resume
          </a>
          <MobileNavMenu links={links} />
        </div>
      </nav>
    </header>
  );
}
