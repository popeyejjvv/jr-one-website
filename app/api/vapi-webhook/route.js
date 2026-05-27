// =============================================================================
// JR One, /api/vapi-webhook -- legacy alias for /api/vapi-call-complete
// =============================================================================
// The Vapi webhook route was renamed to /api/vapi-call-complete, but external
// VAPI dashboard configuration may still point at the old /api/vapi-webhook
// URL. Before this alias existed, those events returned 404 silently.
//
// Forwarding via raw import (not HTTP proxy) keeps HMAC verification working
// because the handler still reads the original request body bytes for signature
// validation. A redirect would not survive POSTs through Vercel's edge.
//
// Remove this file once the VAPI dashboard webhook URL is updated to point at
// /api/vapi-call-complete directly (see manual-steps-for-popeye.md).
// =============================================================================

// `dynamic` must be a literal export per Next.js route segment config rules,
// so we mirror the underlying handler's setting here. POST is a pure re-export.
export const dynamic = "force-dynamic";
export { POST } from "../vapi-call-complete/route.js";
