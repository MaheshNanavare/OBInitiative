# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Website for Obuyisi bw'Omu Initiative (a Ugandan non-profit), migrated from WordPress to Astro on Cloudflare Workers. `README.md` is written for the non-technical volunteers who maintain the content. Keep it accurate when behaviour changes.

## Commands

```sh
npm run dev       # Astro dev server, http://localhost:4321. Forms do NOT work here (no Worker)
npm run preview   # astro build + wrangler dev, http://localhost:8787. Real Cloudflare runtime, forms work
npm run check     # astro check (site) + tsc -p worker (Worker). This is the only verification step; there are no tests or linter
npm run build     # static output to dist/
npm run deploy    # build + wrangler deploy
```

To test forms locally, `wrangler.jsonc` needs a `SUBMISSIONS` KV binding. It's commented out until the real namespace exists. Without it, `/api/submit/` returns 503 by design. For a local test, copy the config with the binding uncommented (any id works locally) and run `npx wrangler dev -c <copy>`. Delete the copy afterwards.

## Architecture

**Two layers, one deployment.** Astro builds a fully static site (no SSR adapter) into `dist/`. `wrangler.jsonc` serves `dist/` as Workers static assets, and `run_worker_first: ["/api/*"]` means `worker/index.ts` runs **only** for `/api/*`. Everything else never touches the Worker. The Worker has its own `worker/tsconfig.json` with Workers types, and the root `tsconfig.json` excludes `worker/`.

**URLs must match the old WordPress permalinks.** `trailingSlash: 'always'` + `build.format: 'directory'` in `astro.config.mjs`, and `html_handling: force-trailing-slash` in wrangler. Page files are named after the old slugs (`storycompetition.astro`, `apply-as-a-volunteer-or-intern.astro`). Stories are served at the **site root**, not under `/our-stories/`: `src/pages/[story].astro` generates `/<md-filename>/` from the `stories` collection (`src/content.config.ts`, files in `src/content/stories/`). Don't rename story files or pages without adding a redirect in `public/_redirects`.

**Form contract is duplicated in two places.** Each form in `src/pages/*.astro` and `src/components/Footer.astro` posts to `formEndpoint` (`/api/submit/`) with a hidden `form` field (`volunteer` | `story` | `newsletter`) and a honeypot `website` field. `worker/index.ts` validates against its `FORMS` spec (required/optional field names, max lengths) and stores JSON in KV under `<form>:<ISO date>:<id>`, then 303-redirects to `/thank-you/?form=<name>`. A client script on the thank-you page picks the message from that query param. **When adding or renaming a form field, update both the HTML and `FORMS`**, or the field gets silently dropped or rejected. Keep the `maxlength` attributes in sync with `maxLengths`.

**Content and config are separated from markup.**
- `src/config.ts`: site-wide values (donate URL, which is an external Meaningful.ca page, socials, fundraiser numbers, the story competition deadline, and the `nav` structure used by `Header.astro`).
- `src/data/team.ts`, `projects.ts`, `partners.ts`: typed arrays that import images. Team entries have optional `focus` (object-position), which `our-story.astro` uses to frame faces in circular crops. Headshots are never zoomed or scaled; if a face is too small in the frame, use a tighter photo instead.
- Every page wraps `src/layouts/Base.astro`, which handles head/SEO/OG image (generated via `getImage`), JSON-LD, header and footer. Pass `image` for the OG card, and `noindex` for utility pages.

**Images.** All site images live in `src/assets/` and are rendered through `astro:assets` (`<Image>` with `widths`/`sizes`) so they're resized to WebP at build time. Originals were pre-shrunk to 2000px max, because Astro also emits a full-size fallback. `public/` only holds favicons, `_redirects`, `_headers`, `robots.txt` and `downloads/` (PDFs that need a stable, shareable URL). The Fund Us campaign film is in `src/assets/video/`, imported with `?url` so it gets a hashed, long-cached filename. It autoplays muted on a loop with no controls (`pointer-events: none`), so it's encoded with no audio track at 360px wide, H.264 CRF 29, 24 fps, `-movflags +faststart` (~1.7 MB). Keep it small for slow connections, and well under Workers' 25 MiB per-file asset limit. `Useful Images for new website/` and `OBI content text.pdf` are the raw WordPress export (gitignored source material). Copy what you need into `src/assets/` rather than referencing them.

**Styling.** No CSS framework. Design tokens (brand purple/green/amber, fonts, spacing) and shared utility classes (`.container`, `.section`, `.btn-*`, `.card`, `.grid-*`, `.eyebrow`, `.prose`, `.checklist`, form `.field`) are in `src/styles/global.css`. Everything page-specific is in scoped `<style>` blocks. Fonts are self-hosted via `@fontsource-variable/fraunces` (headings; imported as `opsz.css` + `opsz-italic.css` so the optical-size axis and a real italic load) and `inter` (body). Design conventions: amber is reserved for giving (donate buttons, donation amounts); eyebrows are sentence-case Fraunces italic, not uppercase labels; cards are flat (border, no shadow, no hover lift); feature photos take the signature "arch" corner via `.photo.arch` / `var(--arch)`. Keep `backdrop-filter` off `.site-header` itself (it's on `::before`), or the fixed mobile menu gets trapped inside the header.

## Windows environment notes

- In Git Bash, arguments starting with `/` get rewritten to Windows paths. Prefix with `MSYS_NO_PATHCONV=1` when passing URL paths to scripts.
- sharp keeps file handles open on Windows. When rewriting an image in place, read it into a buffer first and call `sharp.cache(false)`.
- `wrangler dev` leaves `workerd` child processes running that lock `.wrangler/`. Stop them before deleting that folder.
