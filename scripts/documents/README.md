# Branded document source

The six branded PDFs served from `public/documents/` are **build artifacts**. Their
words live here, in plain markdown, one file per PDF:

| Source | Output |
| --- | --- |
| `JR_One_Consumer_Warranty.md` | `public/documents/JR_One_Consumer_Warranty.pdf` |
| `JR_One_Commercial_Warranty.md` | `public/documents/JR_One_Commercial_Warranty.pdf` |
| `JR_One_Maintenance_Care_Guide.md` | `public/documents/JR_One_Maintenance_Care_Guide.pdf` |
| `es-JR_One_Consumer_Warranty.md` | `public/documents/es-JR_One_Consumer_Warranty.pdf` |
| `es-JR_One_Commercial_Warranty.md` | `public/documents/es-JR_One_Commercial_Warranty.pdf` |
| `es-JR_One_Maintenance_Care_Guide.md` | `public/documents/es-JR_One_Maintenance_Care_Guide.pdf` |

Everything else in `public/documents/` (COIs, Sunbiz certificate, Peak 301 and
insurance-rights sheets) is **not** generated here. Those are third-party or state
records. Do not try to rebuild them.

## Build

    npm run build:documents        # rewrites the six PDFs in public/documents
    npm run check:documents        # builds to a temp dir, fails if it differs

Requires Python 3 with `reportlab` (and `pymupdf` for `--check`):

    python3 -m pip install reportlab pymupdf

`check:documents` is the guard that keeps source and binary in sync. If it reports
DRIFT, somebody edited a PDF by hand or edited a source file without rebuilding.

## Editing

Fix the markdown, run the build, commit both the `.md` and the `.pdf`. That is the
whole loop. Never edit a PDF directly.

Shared chrome (header bar, tagline, signature block, footer) is **not** in the
markdown, because it has to stay consistent across all six. It lives in the constants
at the top of `scripts/generate_documents.py`, keyed by the `lang:` in the front
matter, so a Spanish document renders Spanish chrome. What deliberately does *not*
translate: the company name, the street address, the phone, the email, the domain,
and the FL document number. Those are facts, not copy.

`assert_header_fits()` runs on every build. The tagline and the tenure line share a
baseline with the right-aligned phone and domain, and translating them makes them
longer, so the build fails rather than shipping a header collision. If it fires,
shorten `TAGLINE` or `TENURE` for that language.

### Block syntax

Front matter is `key: value` lines terminated by a `---` line:

    output: JR_One_Consumer_Warranty.pdf
    lang: en                     # en | es, picks the signature contact line
    template: warranty           # warranty | guide
    eyebrow: CONSUMER WARRANTY   # small right-aligned label in the header bar
    title: Consumer Warranty
    subtitle: Residential installations by JR One Aluminum LLC
    ---

Then blocks. Each starts with `::name` on its own line; the text under it is one
logical paragraph and is wrapped at build time, so write it as a single long line.

| Block | What it renders |
| --- | --- |
| `::lead` | 11pt opening paragraph |
| `::section Coverage` | 13pt navy heading with the gold rule under it |
| `::subhead Why it matters` | 10.5pt navy bold heading, no rule (guide only) |
| `::body` | 10.5pt paragraph |
| `::item A` / `::item 1` | hanging-label list item; the label gets its own `.` |
| `::callout` | cream box with the gold left bar; `--` on its own line starts a second paragraph |
| `::note` | 9pt italic slate line |
| `::signature` | hairline rule + the shared CEO signature block |
| `::pagebreak` | starts a new page; the next block must be a `::section` |

## Rules that apply to the content

- **No founding year, anywhere.** Not "since 1990", not "active since 2010", not a
  formation year. The sanctioned tenure line is the one already in the header:
  *over 30 years in the Tampa Bay gutter industry*, family-owned.
- **Never invent or adjust a warranty term.** The covered terms are 3-year
  workmanship and 20-year manufacturer paint on painted aluminum. Those numbers,
  and the phone, email, address, and document number, are facts. Changing one is a
  customer-facing legal change, not a copy edit.
- **Spanish stays idiomatic Spanish with real accents.** The `es-` files are written
  in Spanish, not translated word-for-word from the English.
- ASCII everywhere else, apart from the accented Spanish, the `•` separators and the
  `—` em dashes that the original documents already used.

## Known issues

- **`es-JR_One_Maintenance_Care_Guide.pdf` page 2 has a layout collision**, inherited
  from the 2026-04-08 original and reproduced here on purpose so the rebuild stayed a
  provable no-op. The second callout ("Cuándo llamar a JR One") is taller than the
  space left above the footer, so its last two lines overlap the footer text. The
  English guide has the same box shape but shorter copy, so it only overlaps the
  footer hairline, not the text. Fixing it means either shortening that Spanish
  paragraph or moving the box up, both of which change the page, so it is left as a
  flagged decision rather than a silent edit.
