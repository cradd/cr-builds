<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

- The Node app lives in `landing/` (the repo root has no `package.json`). Run all `npm` commands from `landing/`. Package manager is npm (`package-lock.json`).
- Dev/build/lint/start commands are the standard ones in `landing/package.json` (`npm run dev` serves on http://localhost:3000).
- This is a static, presentational Next.js 16 app: two marketing routes (`/` InvoiceFlow, `/spec-slimmer` SlimSpec), no API routes, no DB/auth/env vars, no external services. Running the dev server alone is enough to test it end-to-end. Beta-signup email inputs are non-functional UI (submit nowhere).
- `npm run lint` currently reports pre-existing errors/warnings in `src/app/page.tsx` and `src/components/retroui/Button.tsx`. These are not environment issues. `next build` does not fail on them.
- No test framework is configured (no Jest/Vitest/Playwright).
- `scripts/slim_spec.py` is a standalone, stdlib-only Python 3 CLI (no `requirements.txt`); unrelated to the web app. Run it directly: `python3 scripts/slim_spec.py <spec-url-or-file>`.
