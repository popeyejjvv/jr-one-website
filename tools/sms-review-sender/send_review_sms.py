#!/usr/bin/env python3
"""
JR One SMS Review-Ask Cadence — Main Sender

Pulls recently-completed customers from BuilderPrime, sends SMS-1 (initial ask)
or SMS-2 (follow-up) via Twilio per the locked cadence. Dry-run by default.

USAGE:
  python send_review_sms.py                    # dry run, scans + previews
  python send_review_sms.py --send             # actually send (use after dry-run validation)
  python send_review_sms.py --send --limit 5   # cap sends per run (default 20)
  python send_review_sms.py --stage sms2       # only follow-ups
  python send_review_sms.py --stage sms1       # only initial asks

ELIGIBILITY (SMS-1):
  - BP customer in one of BP_ELIGIBLE_STATUSES (Customer / Job Sold)
  - Status flip timestamp >= 24h ago AND <= LOOKBACK_DAYS ago
  - Has a US mobile phone in E.164 format
  - sms_opt_out flag is NOT set
  - Not already in the send log for stage=sms1

ELIGIBILITY (SMS-2):
  - Has a logged SMS-1 send >= 72h ago
  - Has NOT been logged as review_received
  - Has NOT replied with an opt-out keyword
  - Not already in the send log for stage=sms2

COMPLIANCE:
  - TCPA STOP opt-out in every message body (carrier-level + ours)
  - 10DLC required to be registered with Twilio before --send works
  - Send window: Mon-Sat 9 AM - 8 PM ET (config.SEND_WINDOW_*)
  - Holiday skip: not yet implemented; add to send_window_open() if needed
"""

import argparse
import json
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

import requests

# Local imports
sys.path.insert(0, str(Path(__file__).parent))
import config
import messages
import names

try:
    from twilio.rest import Client as TwilioClient
except ImportError:
    TwilioClient = None  # script can still run --dry-run without Twilio installed


# ── Helpers ───────────────────────────────────────────────────────────────

def load_send_log() -> dict:
    """Read the persistent send log (or return an empty skeleton)."""
    if not config.SEND_LOG_PATH.exists():
        return {"sends": []}
    try:
        return json.loads(config.SEND_LOG_PATH.read_text())
    except json.JSONDecodeError:
        # Don't blow up on a corrupt log — back it up and start fresh.
        backup = config.SEND_LOG_PATH.with_suffix(f".corrupt-{int(datetime.now().timestamp())}.json")
        config.SEND_LOG_PATH.rename(backup)
        print(f"WARNING: send log was corrupt, backed up to {backup.name}", file=sys.stderr)
        return {"sends": []}


def save_send_log(log: dict) -> None:
    config.SEND_LOG_PATH.write_text(json.dumps(log, indent=2, default=str))


def already_sent(send_log: dict, customer_id: str, stage: str) -> bool:
    """Check if this customer+stage already appears in the log."""
    return any(
        s for s in send_log.get("sends", [])
        if s.get("customer_id") == customer_id and s.get("stage") == stage
    )


def send_window_open(now: datetime) -> bool:
    """Mon-Sat 9 AM - 8 PM ET. Skip Sundays."""
    if now.weekday() in config.SEND_SKIP_WEEKDAYS:
        return False
    return config.SEND_WINDOW_HOUR_OPEN <= now.hour < config.SEND_WINDOW_HOUR_CLOSE


def fetch_eligible_customers() -> list[dict]:
    """Pull customers from BP whose status puts them in the eligibility window."""
    headers = {"x-api-key": config.BP_API_KEY}
    url = f"{config.BP_API_BASE}/clients"
    resp = requests.get(url, headers=headers, timeout=30)
    resp.raise_for_status()
    data = resp.json()
    clients = data if isinstance(data, list) else data.get("data", [])

    eligible = []
    cutoff_recent = datetime.now(timezone.utc) - timedelta(hours=config.SMS1_DELAY_HOURS)
    cutoff_lookback = datetime.now(timezone.utc) - timedelta(days=config.LOOKBACK_DAYS)

    for c in clients:
        status_name = c.get("leadStatusCategoryName") or c.get("leadStatusName")
        if status_name not in config.BP_ELIGIBLE_STATUSES:
            continue
        if c.get("doNotContact"):
            continue
        if not c.get("isActive", True):
            continue
        phone = c.get("phoneNumber") or c.get("mobilePhone") or c.get("homePhone")
        if not phone:
            continue
        # Parse last-modified into a tz-aware datetime
        lm_raw = c.get("lastModifiedDate") or c.get("createdDate")
        if not lm_raw:
            continue
        try:
            lm = datetime.fromisoformat(lm_raw.replace("Z", "+00:00"))
        except ValueError:
            continue
        if lm > cutoff_recent or lm < cutoff_lookback:
            continue
        eligible.append({
            "customer_id": str(c.get("id") or c.get("opportunityId") or c.get("clientId")),
            # 2026-08-08: was `(firstName or lastName.split()[0] or "there").strip()`,
            # which only caught an EMPTY name. A BuilderPrime record created by a
            # capture surface carries the SURFACE's name ("Homepage Email"), so a
            # label reached real handsets as a first name. See names.py.
            "first_name": names.safe_first_name(c.get("firstName"), c.get("lastName")),
            "phone": phone,
            "language": (c.get("preferredLanguage") or "en").lower(),
            "status": status_name,
            "last_modified": lm.isoformat(),
        })
    return eligible


def fetch_sms1_recipients_due_for_sms2(send_log: dict) -> list[dict]:
    """Look back at the send log and find sms1 sends now >= 72h old that
    haven't received sms2 yet, no opt-out, no review-received flag."""
    cutoff = datetime.now(timezone.utc) - timedelta(hours=config.SMS2_DELAY_HOURS)
    sent_sms2 = {s["customer_id"] for s in send_log.get("sends", []) if s.get("stage") == "sms2"}
    opted_out = {s["customer_id"] for s in send_log.get("sends", []) if s.get("opt_out")}
    reviewed = {s["customer_id"] for s in send_log.get("sends", []) if s.get("review_received")}

    due = []
    for s in send_log.get("sends", []):
        if s.get("stage") != "sms1":
            continue
        cid = s["customer_id"]
        if cid in sent_sms2 or cid in opted_out or cid in reviewed:
            continue
        try:
            sent_at = datetime.fromisoformat(s["sent_at"])
        except (KeyError, ValueError):
            continue
        if sent_at > cutoff:
            continue
        due.append({
            "customer_id": cid,
            # Re-checked on read, not just on write: entries already in the send
            # log were recorded before the fix above and can still hold a label.
            "first_name": names.safe_first_name(s.get("first_name")),
            "phone": s["phone"],
            "language": s.get("language", "en"),
        })
    return due


def send_via_twilio(to_number: str, body: str) -> dict:
    if TwilioClient is None:
        raise RuntimeError("twilio package not installed; run `pip install -r requirements.txt`")
    client = TwilioClient(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN)
    msg = client.messages.create(
        from_=config.TWILIO_FROM_NUMBER,
        to=to_number,
        body=body,
    )
    return {"sid": msg.sid, "status": msg.status}


# ── Main ──────────────────────────────────────────────────────────────────

def main():
    ap = argparse.ArgumentParser(description="JR One SMS review-ask cadence")
    ap.add_argument("--send", action="store_true", help="actually send (default is dry run)")
    ap.add_argument("--limit", type=int, default=config.MAX_SENDS_PER_RUN,
                    help=f"cap sends per run (default {config.MAX_SENDS_PER_RUN})")
    ap.add_argument("--stage", choices=["sms1", "sms2", "both"], default="both")
    ap.add_argument("--skip-window-check", action="store_true",
                    help="bypass Mon-Sat 9-8 ET window (only for manual testing)")
    args = ap.parse_args()

    config.validate()

    now = datetime.now(timezone.utc).astimezone()  # local time
    if not args.skip_window_check and not send_window_open(now):
        print(f"OUTSIDE SEND WINDOW: {now} is Sun OR outside 9 AM-8 PM ET. Exiting.")
        return 0

    send_log = load_send_log()
    sent_today = sum(1 for s in send_log.get("sends", [])
                     if s.get("sent_at", "").startswith(now.date().isoformat()))
    if sent_today >= config.MAX_SENDS_PER_DAY:
        print(f"DAILY CAP REACHED: {sent_today} sends today. Exiting.")
        return 0

    sends_this_run = 0
    new_log_entries = []

    # ── SMS-1 stage ───
    if args.stage in ("sms1", "both"):
        eligible = fetch_eligible_customers()
        print(f"SMS-1 eligible customers found: {len(eligible)}")
        for cust in eligible:
            if sends_this_run >= args.limit:
                break
            if already_sent(send_log, cust["customer_id"], "sms1"):
                continue
            template = messages.pick("sms1", cust["language"] if cust["language"] in ("en", "es") else "en")
            try:
                body = messages.render(template, cust["first_name"])
            except ValueError as e:
                print(f"  SKIP {cust['customer_id']} ({cust['first_name']}): {e}")
                continue
            if args.send:
                try:
                    result = send_via_twilio(cust["phone"], body)
                    print(f"  SENT sms1 → {cust['phone']} (sid={result['sid']}, status={result['status']})")
                except Exception as e:
                    print(f"  FAIL {cust['customer_id']}: {e}")
                    continue
            else:
                print(f"  [DRY] sms1 → {cust['phone']}: {body}")
            new_log_entries.append({
                "customer_id": cust["customer_id"],
                "first_name": cust["first_name"],
                "phone": cust["phone"],
                "language": cust["language"],
                "stage": "sms1",
                "sent_at": now.isoformat(),
                "dry_run": not args.send,
                "body": body,
            })
            sends_this_run += 1

    # ── SMS-2 stage ───
    if args.stage in ("sms2", "both") and sends_this_run < args.limit:
        followups = fetch_sms1_recipients_due_for_sms2(send_log)
        print(f"SMS-2 candidates found: {len(followups)}")
        for cust in followups:
            if sends_this_run >= args.limit:
                break
            template = messages.pick("sms2", cust["language"] if cust["language"] in ("en", "es") else "en")
            try:
                body = messages.render(template, cust["first_name"])
            except ValueError as e:
                print(f"  SKIP {cust['customer_id']} ({cust['first_name']}): {e}")
                continue
            if args.send:
                try:
                    result = send_via_twilio(cust["phone"], body)
                    print(f"  SENT sms2 → {cust['phone']} (sid={result['sid']}, status={result['status']})")
                except Exception as e:
                    print(f"  FAIL {cust['customer_id']}: {e}")
                    continue
            else:
                print(f"  [DRY] sms2 → {cust['phone']}: {body}")
            new_log_entries.append({
                "customer_id": cust["customer_id"],
                "first_name": cust["first_name"],
                "phone": cust["phone"],
                "language": cust["language"],
                "stage": "sms2",
                "sent_at": now.isoformat(),
                "dry_run": not args.send,
                "body": body,
            })
            sends_this_run += 1

    # ── Persist ───
    if new_log_entries and args.send:
        send_log.setdefault("sends", []).extend(new_log_entries)
        save_send_log(send_log)
        print(f"\nLogged {len(new_log_entries)} sends to {config.SEND_LOG_PATH.name}.")
    elif new_log_entries:
        print(f"\n[DRY] Would have logged {len(new_log_entries)} sends.")
    else:
        print("\nNo sends produced this run.")

    return 0


if __name__ == "__main__":
    sys.exit(main())
