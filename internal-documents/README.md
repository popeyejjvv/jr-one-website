# Internal documents

Files here are **in the repo but not on the website**. Nothing outside `public/`
is served by Next.js, so there is no URL that reaches them. That is the point:
these are documents JR One needs on hand for bid packets, portal submissions and
prequalification forms, but does not publish to homeowners.

| File | Why it is not public |
| --- | --- |
| `JR_One_Sunbiz_Active_Status_2026.pdf` | State of Florida Certificate of Status. It states the LLC filing date, and a date in that position reads to a visitor as a founding year, which is a claim the brand does not make. The record itself is a state document and must never be altered, so it was unpublished instead. Decision: 2026-08-07, see `decisions-log.md`. |

Do not move a file back into `public/` to "fix a broken link". If a page needs to
link to one of these, that is a brand decision, not a build fix.
