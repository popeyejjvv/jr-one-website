# JR One SMS Review-Ask Cadence

Sends a Google review ask via SMS the day after every JR One install
completes in BuilderPrime. Sends a follow-up 72 hours later if no review
appeared. Closes the review-count gap that Phase 3 of the SEO audit
flagged as JR One's #1 authority signal weakness (55 reviews vs Westfall
1,871 vs Rain Control 500+).

**Target:** +20 Google reviews / month → 55 → 150 in 12 months.

## What this directory is

A standalone Python script that runs on a cron. Pulls customers from
BuilderPrime, picks the right SMS template (EN or ES), sends via Twilio,
and logs every send to a local JSON file for TCPA retention.

The script is part of the JR One website repo because:
- The BP API integration mirrors the existing `jrone-outreach/scripts/`
  pattern (same auth header, same client pull, same E.164 phone normalization).
- The voice and TCPA rules already live alongside the other JR One brand
  surfaces in this repo.

This is the **fallback path** from the SMS implementation spec
(`drafts/jrone/2026-05-23/sms-review-cadence/implementation-spec.md`).
Before deploying this, Popeye should first:
1. Check whether BuilderPrime Professional tier includes native 2-way
   SMS (Option A — zero engineering, zero recurring cost beyond BP).
2. If not, check whether Maton.ai can do the same flow via webhook +
   Twilio connector (Option B — fits the in-stack rule).
3. Only fall back to this Python+Twilio path if A and B are unavailable.

## Files

| File | Purpose |
|---|---|
| `messages.py` | Locked EN + ES SMS copy with `render()` and `pick()` helpers; enforces 160-char single-segment limit. |
| `config.py` | Env-loaded Twilio + BP config; `validate()` raises if anything's missing. |
| `send_review_sms.py` | Main cadence. Defaults to dry run. Use `--send` to actually send. |
| `requirements.txt` | `twilio` + `requests`. |
| `README.md` | This file. |

A `sms-review-send-log.json` file appears here the first time `--send`
runs. It's the TCPA retention log (4-year requirement). Never delete it.

## Setup — first-time, before any sends

### 1. Install dependencies

```
cd ~/Desktop/JRONE/jr-one-website/tools/sms-review-sender
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 2. Get a Twilio account + phone number

a. Go to [twilio.com/try-twilio](https://www.twilio.com/try-twilio) and
   create a free trial account. You'll get $15 of credit.
b. Buy a US 10DLC-eligible phone number (~$1/month). Twilio Console →
   Phone Numbers → Buy a number. Filter by US, SMS-capable, local
   (10-digit US number, not toll-free for this use case).
c. Note the phone number in E.164 format (e.g. `+18135551234`).

### 3. Register a 10DLC A2P campaign (REQUIRED — 1-3 weeks)

US carriers require Application-to-Person SMS to be pre-registered.
Skipping this means messages get rate-limited or blocked.

Twilio Console → Messaging → Trust Hub:
- **Business Profile:** JR One Aluminum LLC, EIN, 3420 W Cherry St Tampa
  FL 33607, [info@jronegutters.com](mailto:info@jronegutters.com), website
  jronegutters.com.
- **Brand Registration:** submit your business profile. ~$4 one-time fee.
- **Campaign Registration:** create a campaign with use-case
  "Customer Care" or "Account Notifications". Submit sample messages —
  paste these:
  ```
  Hi {name}, Chris at JR One. Thanks for the job. A quick Google review helps a small family business: g.page/r/CY6n_O44YfbUEAE/review. STOP to opt out.

  Hola {name}, Chris de JR One. Gracias por el trabajo. Una resena Google ayuda a un negocio familiar: g.page/r/CY6n_O44YfbUEAE/review. STOP para cancelar.
  ```
- ~$10 setup + $1.50/month per campaign.
- Approval window: 1-3 weeks. The script will rate-limit until approved.

### 4. Set env vars

Create a `.env` file in this directory (it's git-ignored — see `.gitignore`):

```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_FROM_NUMBER=+18135551234
BUILDERPRIME_API_KEY=<from ~/Desktop/JRONE/jrone-outreach/scripts/.env>
BUILDERPRIME_SUBDOMAIN=jronegutters
```

Then `chmod 600 .env`.

For shell loading, `source .env` or use `set -a; . ./.env; set +a` before
running the script. Or use `python-dotenv` (add it to requirements.txt
and import at the top of config.py).

### 5. Confirm BP eligible-status names with Jo

The script considers a customer eligible when their BP `leadStatusCategoryName`
matches one of: `Customer`, `Job Sold`, `Customers`. Jo (or Popeye)
should confirm which status JR One actually uses for "the install is done
and the customer is now eligible for a review ask." Adjust
`config.BP_ELIGIBLE_STATUSES` if a different status name is canonical.

## Usage

### Dry run (always do this first)

```
cd ~/Desktop/JRONE/jr-one-website/tools/sms-review-sender
source venv/bin/activate
source ../../.env   # or however you load Twilio + BP env vars

python3 send_review_sms.py
```

You'll see output like:

```
SMS-1 eligible customers found: 8
  [DRY] sms1 → +18135551111: Hi Mike, Chris at JR One. Thanks for the job...
  [DRY] sms1 → +18135552222: Hi Maria, Chris at JR One. Thanks for the job...
SMS-2 candidates found: 3
  [DRY] sms2 → +18135553333: Hi Bob, Chris at JR One again. If you have a minute...

[DRY] Would have logged 11 sends.
```

Read the previews. Confirm the names and phone numbers look right.
Confirm the messages render under 160 chars.

### Real run

```
python3 send_review_sms.py --send --limit 5
```

Start with `--limit 5` for the first real run. If everything looks good
(check Twilio Console → Messaging → Logs to confirm delivery status), then
remove the limit on subsequent runs (default is 20 per run).

### Cron schedule

Run every 3 hours during business hours, Mon-Sat. The script itself enforces
the Mon-Sat 9 AM - 8 PM ET window — outside that, it exits without sending.

Example crontab entry:

```
0 9,12,15,18 * * 1-6   cd /Users/popeye/Desktop/JRONE/jr-one-website/tools/sms-review-sender && /Users/popeye/Desktop/JRONE/jr-one-website/tools/sms-review-sender/venv/bin/python3 send_review_sms.py --send --limit 20 >> sms-review.log 2>&1
```

## Daily / weekly monitoring

- **Daily**: glance at `sms-review-send-log.json` (jq it or tail it). Confirm
  sends went out and no obvious errors.
- **Weekly**: check Twilio Console → Messaging → Logs for delivery
  failures (carrier filtering, invalid numbers, etc.). The first month
  expects ~5% failure rate as bad phones get filtered.
- **Monthly**: count net new Google reviews. Target: +20 / month after
  the cadence is steady-state. If under +10 / month, the issue is usually
  one of: BP status eligibility not matching reality (Jo flagging
  completion differently), phones not in E.164 format (BP data hygiene),
  or 10DLC registration not approved yet.

## Compliance + TCPA

Every message includes a `STOP to opt out` (EN) or `STOP para cancelar`
(ES) keyword. Twilio carrier-level handles the carrier-side STOP
automatically; the script logs any inbound STOP/UNSUBSCRIBE/CANCEL/QUIT
reply and sets `sms_opt_out=true` on the customer for cross-channel
suppression.

If a customer says "stop texting me" via email or phone, Jo or Em must
flag the BP record manually with a custom field `sms_opt_out=true`. The
cadence script checks this flag before every send.

Retention: keep `sms-review-send-log.json` permanently (TCPA discovery
requires 4 years; we keep forever as the safer floor).

## Review detection (for SMS-2 skip logic)

The current implementation does NOT auto-detect when a customer leaves a
review. For the first 30 days of operation, Jo or Em should manually
review the GBP reviews tab each morning and mark BP customer records as
`review_received=true` (custom field). The cadence script reads that flag
and skips SMS-2 for those customers.

After 30 days of manual validation, wire up Google Places API (New)
polling to auto-detect new reviews. See the implementation spec for the
detailed approach.

## Cross-references

- Spec: `drafts/jrone/2026-05-23/sms-review-cadence/implementation-spec.md`
- Brand-brain (voice + banned phrases): `references/brand-brains/jrone.md`
- TCPA notes: `.claude/rules/secret-handling.md`
- BuilderPrime integration wiki: `wiki/entities/tools/builderprime.md`
- Existing email review-ask: `~/Desktop/JRONE/jrone-outreach/scripts/review_request.py`
