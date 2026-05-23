"""
Locked SMS copy for the JR One Aluminum review-ask cadence.

Source: drafts/jrone/2026-05-23/sms-review-cadence/sms-copy-en-es.md
Brand-brain compliance: no banned phrases, no em-dashes, no curly quotes.
TCPA: every message includes a STOP opt-out keyword.

Variables substituted at send time:
  {name}       — BP firstName, or first word of lastName if first missing
  {review_url} — fixed: g.page/r/CY6n_O44YfbUEAE/review

Character budget: 160 chars per SMS (single-segment).
"""

REVIEW_URL = "g.page/r/CY6n_O44YfbUEAE/review"

# ── SMS-1: initial ask, +24 hours after job marked complete ───────────────
SMS1_EN = (
    "Hi {name}, Chris at JR One. Thanks for the job. A quick Google review "
    "helps a small family business: " + REVIEW_URL + ". STOP to opt out."
)

SMS1_ES = (
    "Hola {name}, Chris de JR One. Gracias por el trabajo. Una resena Google "
    "ayuda a un negocio familiar: " + REVIEW_URL + ". STOP para cancelar."
)

# ── SMS-2: follow-up, +72 hours after SMS-1, only if no review yet ────────
SMS2_EN = (
    "Hi {name}, Chris at JR One again. If you have a minute for that Google "
    "review, would mean a lot: " + REVIEW_URL + ". STOP to opt out."
)

SMS2_ES = (
    "Hola {name}, Chris de JR One otra vez. Si tiene un minuto para esa "
    "resena Google, lo agradezco: " + REVIEW_URL + ". STOP para cancelar."
)


def render(template: str, name: str) -> str:
    """Substitute {name} and verify the rendered message is under 160 chars.

    Returns the rendered text. Raises ValueError if the result exceeds 160
    chars (so callers can decide whether to truncate the name or accept a
    two-segment SMS billing).
    """
    rendered = template.format(name=name)
    if len(rendered) > 160:
        raise ValueError(
            f"Rendered SMS is {len(rendered)} chars (over 160 single-segment limit). "
            f"Customer name '{name}' pushes the message into 2 segments. "
            f"Either shorten the name OR confirm two-segment billing OK."
        )
    return rendered


def pick(stage: str, lang: str) -> str:
    """Look up the template by stage ('sms1' or 'sms2') and lang ('en' or 'es')."""
    table = {
        ("sms1", "en"): SMS1_EN,
        ("sms1", "es"): SMS1_ES,
        ("sms2", "en"): SMS2_EN,
        ("sms2", "es"): SMS2_ES,
    }
    template = table.get((stage, lang))
    if not template:
        raise ValueError(f"Unknown stage/lang: {stage}/{lang}")
    return template


# Opt-out keywords that the carrier (Twilio) auto-detects and that we also
# check ourselves in case the customer replies via a non-Twilio channel.
OPT_OUT_KEYWORDS = {"STOP", "STOPALL", "UNSUBSCRIBE", "CANCEL", "END", "QUIT"}


def is_opt_out(reply_text: str) -> bool:
    """True if any opt-out keyword appears in the reply (case-insensitive)."""
    if not reply_text:
        return False
    tokens = {w.strip().upper() for w in reply_text.split()}
    return bool(tokens & OPT_OUT_KEYWORDS)
