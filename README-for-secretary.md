# Updating the church website (for the church secretary)

Everything that changes week to week lives in **one file**:

**`data/updates.txt`**

You never need to touch any other file. Edit that one, save it, and the
Home, Events, Bulletins and Watch pages update on their own within a
minute or two.

---

## How to edit it (about 2 minutes)

1. Open the file on GitHub: `data/updates.txt`.
2. Click the **pencil** icon (✏️ "Edit this file").
3. Make your changes (see below).
4. Click the green **Commit changes…** button, then **Commit changes** again.

That's it. If something looks wrong afterward, open the file again and fix
the line. Nothing can "break" the site permanently; GitHub keeps every
earlier version (click **History** to see or restore one).

## The three rules

1. **One item per line.** Separate the parts with a straight bar: `|`
2. **Dates are YEAR-MONTH-DAY**, for example `2026-10-31`.
3. Lines starting with `#` are notes to you. The website ignores them.

Leave a part empty by putting nothing between the bars, e.g. `| |`.

---

## Events  `[events]`

```
date | time | event name | where or details
2026-11-08 | 12–3 p.m. | Apple Festival | Pies, cinnamon rolls, apple sauce and cider
```

- Add new events anywhere in the list; the site sorts them by date.
- **Past events hide themselves.** You don't have to delete them (you can,
  to keep the file tidy).
- The home page shows the next 4 events; the Events page shows all of them.

## Bulletins  `[bulletins]`

```
date | title (optional) | link to the PDF | link to the web version (optional)
2026-10-31 | Reformation Sabbath | https://…/103126.pdf |
```

- Put the **newest at the top.** The top line becomes "This week's
  bulletin"; the rest become the archive list.
- Where the PDF can live:
  - wherever you upload it today (for example AdventistConnect). Copy the
    link to the PDF and paste it in; **or**
  - in this website itself: on GitHub open the `bulletins` folder,
    choose **Add file → Upload files**, and type `files/` in front of the
    file name so it goes into `bulletins/files/`. Then write the link as
    `files/2026-10-31.pdf`.

## Sermons  `[sermons]`

```
date | sermon title | speaker | YouTube link
2026-10-31 | Title of the message | Speaker name | https://www.youtube.com/watch?v=XXXXXXXXXXX
```

- Newest at the top. The top one is featured on the Watch page and the home
  page. The picture comes from YouTube automatically.
- The **live stream** button always points to the church's YouTube channel,
  so you never need to change it for a new Sabbath.

## Weekly activities  `[weekly]`

```
day(s) | time | activity | where
Wednesday | 7:00 p.m. | Prayer Meeting & Bible Study | Youth Room
```

Only change these when a regular activity starts, stops or moves.

## Settings  `[settings]`

- `notice:` A one-line announcement across the top of the home page, for
  example a weather closure or a special guest. Leave it empty for none:
  `notice:`
- `calendar:` *(optional)* If the church keeps a shared Google Calendar,
  paste its embed link here and it will appear on the Events page.
  In Google Calendar: **Settings → (your calendar) → Integrate calendar →
  Embed code**, and copy only the address inside `src="…"`. The calendar
  must be set to public. Leave empty to hide it.

---

## Things that are *not* in the file

Service times, address, phone, giving link and page wording are set by the
web volunteer (see `README.md`). Ask them if any of those change.

## Need help?

Send the web volunteer the line you were trying to add, and a screenshot.
