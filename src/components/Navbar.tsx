export default function Navbar() {
  return (
    <header className="w-full border-b border-ink/10">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="/" className="font-display font-bold tracking-tight">
          JOHN MATHEW B. MAURICIO
        </a>
        <div className="flex items-center gap-5 text-sm">
          <a href="#projects" className="hover:text-accent">
            Projects
          </a>
          <a href="#skills" className="hover:text-accent">
            Skills
          </a>
          <a href="#experience" className="hover:text-accent">
            Experience
          </a>
          <a href="/resume.pdf" className="hover:text-accent">
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
