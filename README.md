# Ceres SDA Church: website redesign mockup (preview)

Static HTML/CSS/JS mockup of a proposed redesign of https://ceresadventist.org, for church board review.
This is **not** the live site. Forms are not connected, and items highlighted in yellow are placeholders the church needs to confirm.

- GitHub Pages preview: https://shwinston.github.io/ceres-sda-redesign/
- Cloudflare preview: https://ceres-sda-preview.weathered-feather-4569.workers.dev

## Theme: "Rugged Valley Harvest"
Working-ranch / irrigation-canal look tied to Ceres, CA (a wheat-and-railroad town since the 1870s, home of California's first irrigation district, TID, 1887).
- Palette: navy `#1C2B3A`, charcoal `#1E2328`, barn red `#9B2B22`, wheat gold `#D9A22E`, canvas `#EFE6D2`, tan `#DCCBA8`, olive `#4A5A26`, rust `#8E4320` (all text pairs meet WCAG AA).
- Type: Oswald (headings), Roboto Slab (card titles), Source Sans 3 (body, 19px), Stardos Stencil (small accents).
- Cards: square, steel-plate navy top band with bolt heads; schedules list the time in bold in a left column.
- Footer: horizon line drawing (orchards, canal, water tower, foothills, tractor) with Genesis 8:22.

## Structure
- `index.html`: Home
- `plan-your-visit/`, `about/`, `what-we-believe/`, `leadership-contact/`
- `ministries/` plus `sabbath-school/`, `pathfinders/`, `adventurers/`, `youth/`, `young-at-heart/`, `small-groups/`, `community-services/`, `school/`
- `events/`, `sermons/`, `bulletins/`, `prayer/`, `give/`, `members/`
- `assets/site.css`, `assets/site.js` (mobile menu + preview form handling), `img/` (WebP), `favicon.svg`
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
- `img/harvest.webp`: almond harvest windrows, California, USDA NRCS photo, public domain, via Wikimedia Commons.
(All illustrative; they do not depict our members.)
