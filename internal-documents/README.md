# Internal documents

Files here are **in the repo but not on the website**. Nothing outside `public/`
is served by Next.js, so there is no URL that reaches them. That is the point:
these are documents JR One needs on hand for bid packets, portal submissions and
prequalification forms, but does not publish to homeowners.

| File | Why it is not public |
| --- | --- |
| `JR_One_Sunbiz_Active_Status_2026.pdf` | State of Florida Certificate of Status. It states the LLC filing date, and a date in that position reads to a visitor as a founding year, which is a claim the brand does not make. The record itself is a state document and must never be altered, so it was unpublished instead. Decision: 2026-08-07, see `decisions-log.md`. |
| `JR_One_COI_Workers_Comp_Auto_2026.pdf` | Combined workers' compensation and commercial auto certificate of insurance. A certificate of insurance is issued to a named certificate holder for a specific project, it carries policy numbers, and a dated copy goes stale on its own with no signal to the visitor that it has. It was served from `public/` but linked from no page, so it was reachable only by direct URL. It stays in the repo for bid packets and portal submissions. The three certificates the site does publish are linked from `/resources` and are separate files. Decision: 2026-08-07, see `decisions-log.md`. |

Do not move a file back into `public/` to "fix a broken link". If a page needs to
link to one of these, that is a brand decision, not a build fix.
