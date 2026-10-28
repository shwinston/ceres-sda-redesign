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

## Photos (samples for the elders' mockup)

Every photo is a stand-in and carries a small "Sample photo" / "AI sample"
tag. Replace them with the church's own photos (same file names in
`assets/img/`, WebP) and remove the tag (`simg()` → `img()` in build.py).

| File | Where | Source |
|---|---|---|
| greeter | Home hero | AI-generated generic scene (not real members) |
| family | Home "What to expect" | Pexels 36674941, Jonathan Goncalves |
| kids | Home teaser, Visit "What about my kids?" | Pexels 8613091, Yan Krukau |
| field | Home "Find us" | Pexels 12153162, Soly Moses |
| exterior | Visit, top | AI-generated generic building (NOT the Ceres church) |
| sanctuary | Visit "What to expect" | AI-generated generic sanctuary (not ours) |
| study | About › Get involved | Pexels 8674206, RDNE Stock project |
| service | About › Get involved | Pexels 6646900, RDNE Stock project |
| fellowship | About › Get involved | Pexels 30477307, Daniel & Hannah Snipes |

Pexels photos are used under the Pexels License (free, commercial use OK,
credit given in the footer).

## Forms (preview only, nothing is sent)

"Let us know you're coming" (Plan your visit), Prayer request and Contact
are UI only. Submitting shows a confirmation on the page and sends nothing:
no form service, no Turnstile, no email. "Add to calendar" and "Subscribe"
build a standard .ics file on the visitor's device from data/updates.txt
(`data/events.ics` is also written at build time as a no-JS fallback).

## Future items (not connected yet, on purpose)

- **Form backend:** a Pages Function / Worker with Turnstile that emails each
  form to the right person (office, prayer team, greeters).
- **Analytics:** Cloudflare Web Analytics (cookie-free) if the church wants
  visit counts. No analytics script is on the site today.
- **Sermons:** the latest sermon is typed into updates.txt. Later, a scheduled
  Worker could read the YouTube channel feed and update it automatically.
- **Calendar:** a live subscribable feed (webcal://) or a shared Google
  Calendar, instead of the one-time .ics download.
- **Map:** the Visit page shows a standard Google Maps embed (no API key).
  It could become a static map image if the church prefers no third-party embeds.

## Hosting on Cloudflare

Connect this repo to Cloudflare Pages (no build command, output directory
`/`). `_headers` is honored there. Each commit, including the
secretary's edits to `data/updates.txt`, deploys automatically.
