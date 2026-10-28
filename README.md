# Ceres Seventh-day Adventist Church — website (preview)

A small, fast, dependency-free static site. **Preview only:** every page is
`noindex` (meta tag, `robots.txt` and `X-Robots-Tag` in `_headers`), and
yellow-highlighted text marks details still to confirm.

- **Weekly updates:** the secretary edits only `data/updates.txt`.
  See [README-for-secretary.md](README-for-secretary.md).
- **Pages:** `/` · `plan-your-visit/` · `events/` · `bulletins/` · `watch/` ·
  `give/` · `contact/` (prayer requests + messages) · `404.html`.
  Redirect stubs: `calendar/` → events, `sermons/` → watch,
  `prayer/` → contact#prayer, `visit/` → plan-your-visit.
- All links are relative, so the site works at a domain root, under
  `/ceres-sda-redesign/` on GitHub Pages, or on Cloudflare.

## How the data file works

`assets/site.js` contains a tiny parser (`CeresUpdates`). The HTML is
pre-rendered from `data/updates.txt` when the site is built, so pages work
without JavaScript and load instantly. In the browser the script re-fetches
`data/updates.txt` (no-cache) and re-renders any region whose content hash
(`data-sig`) differs. That means an edit to the text file shows up even with
no rebuild, and past events drop off automatically by date.

## Design

- System font stack (San Francisco on Apple devices); Inter (latin subset,
  48 KB, `assets/inter-latin.woff2`) only where the system lacks it.
- Palette (all text pairs WCAG AA): stone `#F7F4EE` / `#EFEAE1`, card `#FFFFFF`,
  line `#E4DDD1`, ink `#1F2621`, muted `#5A6158`, sage `#4D6A4B`,
  deep sage `#2E4232`, tint `#E6EDE3`, leaf `#8FA68A` (decorative only).
- Radii 16 / 22 / 28 px, pill buttons, frosted sticky header, full-screen
  mobile menu, bottom quick bar on phones (Visit, Watch, Events, Give).
- No frameworks. One CSS file, one small JS file. Images are WebP with
  `srcset` and lazy loading. `prefers-reduced-motion` respected.

## Photos

Stock photos from Pexels (Pexels License), credited in the footer:
Askar Abayev, Daniel & Hannah Snipes, Soly Moses. Replace them with the
church's own photos when available (same file names in `assets/img/`).

## Forms

The prayer-request and contact forms are UI only in this preview. On
Cloudflare, each would POST to a Pages Function (or Worker) protected by
Turnstile, which emails the message to the church inbox via Cloudflare Email
Routing / Email Service. No database needed.

## Hosting on Cloudflare

Connect this repo to Cloudflare Pages (no build command, output directory
`/`). `_headers` is honored there. Each commit, including the
secretary's edits to `data/updates.txt`, deploys automatically.
