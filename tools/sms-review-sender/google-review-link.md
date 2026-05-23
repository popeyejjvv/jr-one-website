# Google Review Short Link — JR One Aluminum

**Locked canonical link:** `g.page/r/CY6n_O44YfbUEAE/review`

Full URL: `https://g.page/r/CY6n_O44YfbUEAE/review`

When a customer taps the link in the SMS, it opens the Google review
composer directly on JR One Aluminum's GBP listing. No password, no
search step, no account lookup.

The token `CY6n_O44YfbUEAE` is JR One's unique GBP review identifier,
distinct from the GBP `place_id`. The two work together — `place_id`
is used for API access (citations, business profile reads), `g.page/r`
is used for customer-facing review prompts.

## If the short link breaks

Google occasionally rotates these tokens. If the link ever returns 404
or "business not found":

1. Open Google Business Profile (business.google.com) → JR One Aluminum.
2. Click "Read reviews" or "Share review link".
3. Copy the new short link (it'll start with `g.page/r/` followed by a
   different token).
4. Update `REVIEW_URL` in `messages.py` to the new short link.
5. Commit the change so future SMS sends use the working URL.

## Alternative direct review link (more verbose, never rotates)

If the short link is unstable, swap for the full direct-write URL:

```
https://search.google.com/local/writereview?placeid=ChIJJ5X3uyzDwogRjqf87jhh9tQ
```

This is 78 characters compared to the short link's 36 characters. It
pushes every SMS over the 160-char single-segment limit, so the short
link is preferred when it works.

## Cross-references

- GBP place_id: `ChIJJ5X3uyzDwogRjqf87jhh9tQ` (in `seo-aeo-runner/configs/jrone.yaml`)
- BP review email automation: `~/Desktop/JRONE/jrone-outreach/scripts/review_request.py` (line 53)
- Existing playbook: `projects/jarr-one-ad-automation/2026-04-15-organic-traffic-playbook.md` action #2
