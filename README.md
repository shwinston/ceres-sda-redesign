# Ceres SDA Church: website redesign mockup (preview)

Static HTML/CSS/JS mockup of a proposed redesign of https://ceresadventist.org, for church board review.
This is **not** the live site. Forms are not connected, and items highlighted in yellow are placeholders the church needs to confirm.

- GitHub Pages preview: https://shwinston.github.io/ceres-sda-redesign/
- Cloudflare preview: https://ceres-sda-preview.weathered-feather-4569.workers.dev

## Theme: "Golden Hour Fields"
Warm, cinematic late-afternoon farm look tied to Ceres, CA (a wheat-and-railroad town since the 1870s, home of California's first irrigation district, TID, 1887).
- Palette: soil `#1F1712`, cream `#F5EEE2`, wheat `#E2B866`, sage `#4E6450`, brown `#7A4E2A`, ink `#2A2019` (text pairs meet WCAG AA; ink on cream is about 13.8:1).
- Type: Fraunces (headings, lining numerals), Inter (body, 18px). Neither font uses a slashed zero.
- Full-height photo hero on the home page; shorter cinematic photo headers on inner pages, each with a strong warm gradient overlay for readable text.
- Frosted-glass cards on dark sections (they turn more opaque on phones so they stay legible); clean white rounded cards on warm neutral sections; a faint topographic line pattern.
- Subtle fade-up motion on scroll, switched off for visitors who ask for reduced motion.
- Footer: emblem with Genesis 8:22.

## Structure
- `index.html`: Home
- `plan-your-visit/`, `about/`, `what-we-believe/`, `leadership-contact/`
- `ministries/` plus `sabbath-school/`, `pathfinders/`, `adventurers/`, `youth/`, `young-at-heart/`, `small-groups/`, `community-services/`, `school/`
- `events/`, `sermons/`, `bulletins/`, `prayer/`, `give/`, `members/`
- `assets/site.css`, `assets/site.js` (mobile menu, header scroll state, reveal motion, preview form handling), `img/` (WebP), `favicon.svg`
- `404.html`, `sitemap.xml` (production URLs), `robots.txt` (preview: disallow), `.nojekyll`

All internal links are **relative**, so the site works from a subpath such as `https://shwinston.github.io/ceres-sda-redesign/`.
`404.html` sets its base URL at runtime (`/ceres-sda-redesign/` on GitHub Pages, `/` elsewhere), so its links and styles work at any missing path.

## Preview only: search engines blocked
Every page has `<meta name="robots" content="noindex,nofollow">` and `robots.txt` disallows crawling. **Keep these while this is a preview.**

## Before going live / porting to Frame (Adventist Connect)
- Remove the noindex meta from every page and change `robots.txt` to `Allow: /`.
- Replace all yellow placeholders and photo placeholders with real, permission-cleared photos.
- On Frame: rebuild these layouts with the page builder; use The Events Calendar for events, Gravity Forms for the visit/prayer/contact forms, the YouTube block with the uploads playlist for the livestream, and AdventistGiving for giving.

## Photo credits
- `img/sanctuary.webp`: cropped from the church's own YouTube livestream graphic (confirm it shows our sanctuary).
- `img/sermon-*.webp`: the church's YouTube sermon thumbnails.
- `img/bible.webp`: "Open Bible with pen" by Ryk Neethling, CC BY 2.0, via Wikimedia Commons.
- `img/potluck.webp`: "Potluck with Friends", San Bernardino National Forest, public domain, via Wikimedia Commons (illustrative; not our members).
- `img/canal.webp`, `img/gatewheel.webp`: Modesto Irrigation District canal and headgate, USDA photos (July 2015), public domain, via Wikimedia Commons.
- `img/tractor.webp`: tractor at Mota Ranch almond orchard, Livingston, CA, USDA NRCS photo, public domain, via Wikimedia Commons.
- `img/orchard.webp`: "Almond orchard in California" (NRCSCA06034), USDA NRCS photo, public domain, via Wikimedia Commons.
- `img/harvest.webp`: almond harvest windrows, California, USDA NRCS photo, public domain, via Wikimedia Commons.
(All illustrative; they do not depict our members.)
