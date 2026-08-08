"""Is this BuilderPrime name a person, or a capture surface? -- added 2026-08-08.

WHY THIS EXISTS
A BuilderPrime record created by a capture surface carries the SURFACE's name,
not a person's. lib/homepage-email-capture.js:55-56 deliberately writes
firstName="Homepage Email", lastName="Capture" so a rep scanning the CRM list
knows what the row is. That convention is correct and is NOT what changed here.

What was wrong is every CONSUMER that assumed firstName held a human name. The
nurture drip texted and emailed people as "Hi Homepage Email,". This tool has
the identical defect at send_review_sms.py:125, where a bare `or "there"` only
catches an EMPTY name and happily passes a label through to a real handset.

PORT NOTE
This is a Python port of the same rule that lives in
~/Desktop/JRONE/jrone-outreach/scripts/leads_common.py (is_system_generated_name
/ safe_first_name). The two cannot import each other -- separate repositories --
so they are kept deliberately identical in behaviour. The precedent for this
duplication is leads_common.py:36-38, which is itself a port of this repo's
lib/lead-spam.js. If you change the rule, change it in BOTH places.
"""
import re

# Tokens that describe the RECORD or the SURFACE rather than the human.
_SYSTEM_NAME_TOKENS = {
    # the capture surface itself
    "homepage", "landing", "website", "web", "site", "webform", "form", "forms",
    "popup", "modal", "widget", "footer", "header", "banner", "chat", "chatbot",
    "bot", "sms", "email", "mail", "inbox", "online", "portal", "app",
    # what the record IS
    "capture", "captured", "submission", "submitted", "submit", "lead", "leads",
    "inquiry", "enquiry", "request", "contact", "prospect", "signup", "subscribe",
    "newsletter", "optin", "quote", "estimate", "estimator", "calculator", "roi",
    "booking", "appointment", "response", "import", "sync", "api", "webhook",
    # placeholders a system writes when it has nothing
    "unknown", "none", "null", "nil", "undefined", "blank", "empty", "na",
    "tbd", "pending", "default", "placeholder", "sample", "test", "testing",
    "demo", "example", "temp", "temporary", "provided", "notprovided",
    # generic stand-ins for a person
    "guest", "user", "customer", "client", "visitor", "anonymous", "anon",
    "admin", "system", "noreply", "nobody", "resident", "homeowner",
}

# Characters no human given name contains. Apostrophe, hyphen, period and space
# are all legitimate (O'Brien, Jean-Luc, St. John, Mary Ann).
_NON_NAME_CHARS = set("0123456789@/\\|<>[]{}()_=+*#$%^~;:\"?!,")

_COMPACT_LABELS = (
    "homepage", "webform", "leadcapture", "webcapture", "contactform",
    "quoteform", "emailcapture", "formsubmission", "newlead", "unknownname",
    "noname", "notprovided",
)

_MAX_NAME_TOKENS = 3


def is_system_generated_name(name):
    """True when a name field holds a system label rather than a person.

    Structural, not a denylist of one string. Every new capture surface invents
    its own label, so a string list would be stale the day it ships.
    """
    raw = (name or "").strip()
    if not raw:
        return True
    if any(c in _NON_NAME_CHARS for c in raw):
        return True

    words = [w for w in re.split(r"[\s.]+", raw.lower()) if w]
    if not words or len(words) > _MAX_NAME_TOKENS:
        return True
    for w in words:
        # Checked with punctuation stripped AND with internal hyphens closed up,
        # so "no-reply" is caught by the "noreply" token. Jean-Luc and Mary-Ann
        # survive, because neither compacts to anything in the vocabulary.
        if w.strip("'-") in _SYSTEM_NAME_TOKENS:
            return True
        if w.replace("-", "").replace("'", "") in _SYSTEM_NAME_TOKENS:
            return True

    compact = re.sub(r"[^a-z]", "", raw.lower())
    for token in _COMPACT_LABELS:
        if token in compact:
            return True

    for w in words:
        letters = re.sub(r"[^a-z]", "", w)
        if len(letters) >= 4 and not re.search(r"[aeiouy]", letters):
            return True
    return False


def safe_first_name(first_name, last_name="", fallback="there"):
    """A first name safe to send to a handset, else the caller's fallback.

    Behaviour for a real name is byte-identical to the old
    `(firstName or lastName.split()[0] or "there").strip()` expression. Only
    the system-label case changes.
    """
    first = (first_name or "").strip()
    if first and not is_system_generated_name(first):
        return first
    # The old code fell back to the first word of the last name. Keep that, but
    # only when that word is itself a plausible human name.
    first_of_last = (last_name or "").strip().split(" ", 1)[0].strip()
    if first_of_last and not is_system_generated_name(first_of_last):
        return first_of_last
    return fallback
