"""
Environment-loaded configuration for the SMS review-ask cadence.

Secrets are pulled from env vars; nothing is hardcoded. See README.md for
how to set them in a .env file or your shell.

Per .claude/rules/secret-handling.md: every public/exposed boundary that
touches a paid API needs origin + rate + validation gates. This script
runs on a cron (no public HTTP surface), so the relevant gates here are:
  - origin: env-var presence check (this file's load_env)
  - rate: send loop in send_review_sms.py caps per-run sends + day
  - validation: messages.render() enforces 160-char limit + name presence
"""

import os
from pathlib import Path

# ── Twilio ────────────────────────────────────────────────────────────────
TWILIO_ACCOUNT_SID = os.environ.get("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.environ.get("TWILIO_AUTH_TOKEN")
TWILIO_FROM_NUMBER = os.environ.get("TWILIO_FROM_NUMBER")  # E.164 format, e.g. "+18135551234"

# ── BuilderPrime ──────────────────────────────────────────────────────────
BP_API_KEY = os.environ.get("BUILDERPRIME_API_KEY")
BP_SUBDOMAIN = os.environ.get("BUILDERPRIME_SUBDOMAIN", "jronegutters")
BP_API_BASE = f"https://{BP_SUBDOMAIN}.builderprime.com/api"

# ── Send window (Mon-Sat 9 AM - 8 PM ET) ──────────────────────────────────
SEND_WINDOW_HOUR_OPEN = 9
SEND_WINDOW_HOUR_CLOSE = 20
SEND_WINDOW_TIMEZONE = "America/New_York"
SEND_SKIP_WEEKDAYS = {6}  # Sunday only — 0=Mon, 6=Sun

# ── Trigger ──────────────────────────────────────────────────────────────
# Customer must transition to one of these BP lead-status names to be
# eligible. Confirm with Jo which exact status JR One uses for "job complete"
# before flipping --send mode on.
BP_ELIGIBLE_STATUSES = {"Customer", "Job Sold", "Customers"}

# ── Delays ───────────────────────────────────────────────────────────────
SMS1_DELAY_HOURS = 24    # send first SMS 24 hours after status flip
SMS2_DELAY_HOURS = 72    # send follow-up 72 hours after SMS-1
LOOKBACK_DAYS = 14       # don't go further back than this when scanning BP

# ── Rate caps (defensive) ────────────────────────────────────────────────
MAX_SENDS_PER_RUN = 20
MAX_SENDS_PER_DAY = 60

# ── Local files ──────────────────────────────────────────────────────────
SCRIPT_DIR = Path(__file__).parent
SEND_LOG_PATH = SCRIPT_DIR / "sms-review-send-log.json"


def validate():
    """Raise a clear error if any required secret is missing.

    Call this at the top of every entry point. Never let the script try to
    call Twilio / BP with a None auth value — that produces opaque errors.
    """
    missing = []
    if not TWILIO_ACCOUNT_SID:
        missing.append("TWILIO_ACCOUNT_SID")
    if not TWILIO_AUTH_TOKEN:
        missing.append("TWILIO_AUTH_TOKEN")
    if not TWILIO_FROM_NUMBER:
        missing.append("TWILIO_FROM_NUMBER")
    if not BP_API_KEY:
        missing.append("BUILDERPRIME_API_KEY")
    if missing:
        raise RuntimeError(
            "Missing required environment variables: "
            + ", ".join(missing)
            + ". See tools/sms-review-sender/README.md for setup."
        )
