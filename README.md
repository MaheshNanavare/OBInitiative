# Obuyisi bw'Omu Initiative website

The website for [obuyisibwomuinitiative.org](https://obuyisibwomuinitiative.org), migrated from WordPress.

- **Framework:** [Astro](https://astro.build) builds the site as fast, static HTML. Images are resized and converted to WebP automatically.
- **Hosting:** [Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/) serves the static files. A small Worker (`worker/index.ts`) handles form submissions and saves them to Cloudflare KV.
- **No database, no plugins, no PHP.** Content lives in this repository as plain files.

## Quick start

Requires Node.js 22.12 or newer.

```sh
npm install
npm run dev        # local preview with hot reload at http://localhost:4321 (forms won't submit here)
npm run preview    # build, then run on the real Cloudflare runtime at http://localhost:8787 (forms work)
npm run check      # type-check the site and the Worker
npm run deploy     # build and deploy to Cloudflare
```

## Where things live

| What you want to change | File |
| --- | --- |
| Donate link, social links, fundraising goal and budget, **Story Competition deadline**, menu | `src/config.ts` |
| Campaign film on Fund Us (and its still "poster" frame) | `src/assets/video/`. Keep the same file names, or update the imports at the top of `src/pages/fund-us.astro`. The film plays silently on a loop with no controls, so a replacement doesn't need sound. Keep it small (under 2 MB is ideal) so it loads on slow connections |
| Organisation profile PDF (download link on Fund Us and Support a Project) | `public/downloads/obi-organisation-profile.pdf`. Replace the file, keep the name |
| Team members (name, role, bio, photo) | `src/data/team.ts` + photos in `src/assets/team/` |
| The four projects (cards on Home and Support a Project) | `src/data/projects.ts` |
| Partner logos | `src/data/partners.ts` + `src/assets/partners/` |
| Stories (blog posts) | `src/content/stories/*.md` |
| Page text | `src/pages/*.astro` (one file per page) |
| Colours, fonts, spacing | `src/styles/global.css` (the `:root` block at the top) |
| Old-URL redirects | `public/_redirects` |

### Adding a story

Create `src/content/stories/my-new-story.md`. The file name becomes the URL (`/my-new-story/`).

```md
---
title: 'Story title'
date: 2026-10-01
excerpt: 'One or two sentences shown on the story cards.'
cover: '../../assets/photos/some-photo.jpg'
coverAlt: 'Describe the photo for screen readers'
category: 'Education'   # Mental Health | Education | Livelihoods | W.A.S.H | Climate
---

Story text goes here. Leave a blank line between paragraphs.
```

Put the cover photo in `src/assets/photos/`. Large originals are fine, since the build resizes them.

### Adding a team member

Add the photo to `src/assets/team/`, import it at the top of `src/data/team.ts`, and add an entry to the list. If the face is small or off-centre in the round crop, adjust `focus` (for example `'50% 20%'` moves the crop up) and `zoom` (for example `1.6`).

## Forms

The Volunteer/Intern form, Story Competition form and newsletter sign-up post to `/api/submit/`. The Worker checks the fields, drops spam caught by the hidden honeypot field, stores each submission in the `SUBMISSIONS` KV namespace, and redirects to `/thank-you/`.

**One-time setup** (until this is done, forms show a "being set up" message):

```sh
npx wrangler login
npx wrangler kv namespace create SUBMISSIONS
```

Copy the returned `id` into `wrangler.jsonc` (uncomment the `kv_namespaces` block), then deploy.

**Reading submissions:** open the Cloudflare dashboard → Storage & Databases → KV → SUBMISSIONS. Keys look like `volunteer:2026-10-01T09:30:00.000Z:ab12cd34`, so they sort by form and date. You can also use the CLI:

```sh
npx wrangler kv key list --binding SUBMISSIONS --remote --prefix story:
npx wrangler kv key get  --binding SUBMISSIONS --remote "story:2026-10-01T09:30:00.000Z:ab12cd34"
```

## Deploying and switching the domain

1. `npx wrangler login`, then `npm run deploy`. The site goes live on a `*.workers.dev` URL, where you can check it.
2. Add the domain to Cloudflare if it isn't there already. Then, in the Worker's **Settings → Domains & Routes**, add `obuyisibwomuinitiative.org` and `www.obuyisibwomuinitiative.org` as custom domains.
3. Once the new site is live on the domain, the WordPress hosting can be retired.

### URLs kept from WordPress

Every page and story keeps its old address (`/our-story/`, `/fund-us/`, `/storycompetition/`, `/meet-and-know-muzeyi-ashraf/`, …), so existing links and search results keep working. The theme's leftover demo post and `/wp-admin` redirect to sensible pages (`public/_redirects`).

## Content notes from the migration

- **Story Competition deadline:** the WordPress page showed a literal `[DATE]` placeholder. The site shows "To be announced" until you set `storyCompetitionDeadline` in `src/config.ts`.
- **Support a Project cards:** on WordPress, the titles and descriptions didn't match (e.g. "Quality Education" described wells). The new cards use descriptions written from each project's own text on the Our Projects page. Review them in `src/data/projects.ts`.
- **Story Competition license text:** the old form had a "License Agreement" checkbox, but its wording wasn't in the export. The new wording (see `src/pages/storycompetition.astro`) should be checked by the Legal Officer.
- **Story title limit:** the old form capped titles at 20 characters, and that limit is kept. Change `maxlength="20"` in the form and `title: 20` in `worker/index.ts` if you meant 20 words.
- **The 2021 demo post** ("The strength of a people…") was theme filler text and was not migrated.
- **No contact email or phone** appeared on the old site, so none is shown. Add one to the footer (`src/components/Footer.astro`) if you want one.
