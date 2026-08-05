import { NextResponse } from "next/server";
import crypto from "crypto";
import { spoolNotice } from "@/lib/notify-spool";

// =============================================================================
// JR One, CompanyCam Webhook Receiver
// =============================================================================
// Receives CompanyCam events (project.label_added, todo_list.completed) and
// fires an internal ops email when a project is labeled Complete, which queues
// it for the marketing loop + review-request pipeline (both human-gated).
//
// Security model (secret-handling.md Rule 2, webhook class):
//   - HMAC-SHA1 over the RAW body, base64 digest, header X-CompanyCam-Signature.
//   - Key = the self-provisioned token supplied when the webhook is registered
//     (POST /v2/webhooks {token: COMPANYCAM_WEBHOOK_SECRET}).
//   - Fail closed: missing env secret, missing header, or mismatch => 401.
//   - CompanyCam expects EXACTLY 200; it retries non-200 up to 10x and
//     auto-disables the webhook after 25 accumulated errors, so recognized
//     but uninteresting events return 200 no-ops.

export const dynamic = "force-dynamic";

function safeEqualB64(a, b) {
  try {
    const aBuf = Buffer.from(a, "utf8");
    const bBuf = Buffer.from(b, "utf8");
    if (aBuf.length !== bBuf.length) return false;
    return crypto.timingSafeEqual(aBuf, bBuf);
  } catch {
    return false;
  }
}

// Recursively look for a label value inside the event payload. CompanyCam
// documents the payload as "the associated resource object" but the label
// envelope shape is not documented; search defensively.
function findLabelValues(node, out = []) {
  if (!node || typeof node !== "object") return out;
  if (Array.isArray(node)) {
    node.forEach((n) => findLabelValues(n, out));
    return out;
  }
  for (const [key, val] of Object.entries(node)) {
    if ((key === "display_value" || key === "value") && typeof val === "string") {
      out.push(val.toLowerCase());
    } else if (typeof val === "object") {
      findLabelValues(val, out);
    }
  }
  return out;
}

export async function POST(request) {
  const secret = process.env.COMPANYCAM_WEBHOOK_SECRET;
  if (!secret) {
    console.error("companycam-webhook: COMPANYCAM_WEBHOOK_SECRET not set, rejecting");
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const rawBody = await request.text();
  const signature = (request.headers.get("x-companycam-signature") || "").trim();
  if (!signature) {
    console.error("companycam-webhook: missing signature header");
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const expected = crypto.createHmac("sha1", secret).update(rawBody).digest("base64");
  if (!safeEqualB64(expected, signature)) {
    console.error("companycam-webhook: signature mismatch");
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    // Authenticated but malformed; 200 to avoid burning the 25-error budget.
    console.error("companycam-webhook: body not JSON");
    return NextResponse.json({ ok: true, ignored: "not-json" });
  }

  const eventType = event?.event_type || "unknown";
  const payload = event?.payload || {};
  const projectName = payload?.name || payload?.project?.name || "";
  const projectId = payload?.id || payload?.project_id || "";
  console.log(`companycam-webhook: ${eventType} project=${projectId} ${projectName}`);

  const isCompleteLabel =
    eventType === "project.label_added" &&
    findLabelValues(payload).some((v) => v.includes("complete"));
  const isChecklistDone = eventType === "todo_list.completed";

  if (isCompleteLabel || isChecklistDone) {
    try {
      // CHANGED 2026-08-04: this used to email info@ on every completed
      // project. It is an INTAKE SIGNAL for two pipelines that are both
      // human-gated anyway - nothing downstream happens faster because Popeye
      // read it within the hour. So it spools and rides the daily digest.
      const what = isCompleteLabel ? "labeled COMPLETE" : "checklist completed";
      await spoolNotice({
        source: "companycam",
        tag: `project-${projectId}`,
        subject: `CompanyCam: ${projectName || projectId} ${what}`,
        severity: "info",
        body:
          `Project: ${projectName} (id ${projectId})\n` +
          `Event: ${eventType}\n` +
          `Queued for: marketing before/after staging + review-request candidate list.\n` +
          `Both pipelines stay human-gated; this is the intake signal.\n` +
          `Open: https://app.companycam.com/projects/${projectId}`,
      });
    } catch (err) {
      // Internal alert failure must not 500 the webhook (error budget).
      console.error("companycam-webhook: ops email failed:", err.message);
    }
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ error: "method-not-allowed" }, { status: 405 });
}
