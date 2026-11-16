# animated-portfolio: notes for coding agents

Next.js 14 (App Router) + React 18 + Tailwind 3 + GSAP/Lenis/motion. Vitest + Testing Library (jsdom). npm (`package-lock.json`). No CI. Node 22 (`.nvmrc`; `engines` allows 20.17–22.x, both verified, but 20 is EOL since 2026-04-30).

## Commands (verified 2026-11-17)
- Install: `npm ci`
- Dev server: `npm run dev` (port 3000)
- All checks: `npm test && npm run lint && npm run typecheck && npm run build`
- Tests: `npm test` (one file: `npx vitest run src/lib/scramble.test.ts`)
- Lint / types: `npm run lint` / `npm run typecheck`
- Build: `npm run build`

## Gotchas
- `next dev` and `next build` share `.next/`: stop the dev server before building, or the running dev server breaks.
- `@/` means `src/` only. tsconfig `paths` and the `vitest.config.ts` alias must match; `src/test/aliases.test.ts` fails if they drift.
- `vitest.config.ts` needs `esbuild.jsx: "automatic"` because tsconfig uses `jsx: "preserve"` for Next and no component imports `React`; without it, component tests fail.
- `docs/`, `.superpowers/` and `public/reference/` are gitignored on purpose ("never commit"). Files written there are never tracked.
- Tailwind scans `app/**/*.ts`, so deleting a file under `app/` while `next dev` runs can 500 the CSS build (ENOENT). Restart the dev server.
- `app/resume/route.ts` serves the hard-coded file `public/Mauricio_Resume.pdf`; renaming the PDF breaks `/resume`.
- Test stderr shows React warnings ("Received `true` for a non-boolean attribute `fill`") from the `next/image` mocks in component tests. They predate this file and the tests still pass.

## UI checks
- Open the app via `.claude/launch.json` (desktop app browser pane) or Playwright. Check phone (~375px) and desktop (~1280px) widths.
- Animated components honor `prefers-reduced-motion`; check both settings when changing motion.
- Judge scroll, focus-scroll and animation timing only in a visible page. A hidden desktop-app browser pane runs as a background page that stalls native smooth scroll and Lenis, faking "focus lands off-screen" bugs. If the pane is hidden, drive headless Edge/Chrome over CDP.

## Layout
- `app/`: routes: home, `projects/[slug]` case studies, `resume` (PDF download), robots, sitemap, not-found.
- `src/components/`: UI components, tests co-located as `*.test.tsx`.
- `src/content/`: site copy and data (profile, experience, projects, skills).
- `src/lib/`: hero grid canvas renderer, "world" palettes/theme tokens, session-storage persistence, text scramble, SEO helpers.
- `public/`: resume PDF, portrait, project images, OG cover.

## Conventions
- Conventional Commits (`feat:`, `fix:`, `style:`, `content:`, `chore:`, `test:`, `refactor:`).
- Colors come from `--world-*` CSS variables that `app/layout.tsx` injects from `src/lib/worldTheme.ts` (switched via `data-world`). Components hold no hex colors; use `bg-[color:var(--world-…)]`-style classes.
