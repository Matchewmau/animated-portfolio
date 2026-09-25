export default function Footer() {
  return (
    <footer className="w-full border-t border-ink/10">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 John Mauricio — Zamboanga City, Philippines</p>
        <p>
          <a href="mailto:johnmathewmau@gmail.com" className="hover:text-accent">
            johnmathewmau@gmail.com
          </a>{" "}
          ·{" "}
          <a href="https://github.com/matchewmau" className="hover:text-accent">
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
